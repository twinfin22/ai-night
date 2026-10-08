import { createHmac, randomUUID } from 'node:crypto';
import { isIP } from 'node:net';

// One script checks every rolling budget before reserving any send attempt.
// Use Redis time and a server-created member: requestId is never a counter key.
export const CONTACT_ADMISSION_SCRIPT = `
local time = redis.call('TIME')
local now = tonumber(time[1]) * 1000 + math.floor(tonumber(time[2]) / 1000)
local retry = 0
for i = 1, 3 do
  local limit = tonumber(ARGV[i * 2 - 1])
  local window = tonumber(ARGV[i * 2])
  redis.call('ZREMRANGEBYSCORE', KEYS[i], '-inf', now - window)
  local count = redis.call('ZCARD', KEYS[i])
  if count >= limit then
    local oldest = redis.call('ZRANGE', KEYS[i], count - limit, count - limit, 'WITHSCORES')
    retry = math.max(retry, math.ceil((tonumber(oldest[2]) + window - now) / 1000))
  end
end
if retry > 0 then return {0, retry} end
for i = 1, 3 do
  redis.call('ZADD', KEYS[i], now, ARGV[7])
  redis.call('PEXPIRE', KEYS[i], tonumber(ARGV[i * 2]))
end
return {1, 0}
`;

type Environment = Record<string, string | undefined>;
type Admission = { allowed: true } | { allowed: false; status: 429 | 503; retryAfter?: number };

function positiveInteger(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback;
  if (!/^[1-9]\d*$/.test(value)) throw new Error('Invalid contact limit');
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number > 1_000_000) throw new Error('Invalid contact limit');
  return number;
}

function normalizedIp(value: unknown) {
  if (typeof value !== 'string' || !isIP(value.trim())) throw new Error('Missing trusted client IP');
  const ip = value.trim();
  if (isIP(ip) === 4) return ip;
  const canonical = new URL(`http://[${ip}]/`).hostname.slice(1, -1);
  // IPv4-mapped IPv6 and its plain IPv4 representation share one identity.
  const mapped = /^::ffff:([0-9a-f]+):([0-9a-f]+)$/.exec(canonical);
  if (!mapped) return canonical;
  const high = parseInt(mapped[1], 16), low = parseInt(mapped[2], 16);
  return `${high >> 8}.${high & 255}.${low >> 8}.${low & 255}`;
}

export async function reserveContactAttempt(
  request: { headers?: Record<string, unknown> },
  email: string,
  env: Environment = process.env,
): Promise<Admission> {
  try {
    // Only the Vercel ingress header is trusted; never accept client XFF or body IP.
    if (env.VERCEL !== '1') throw new Error('Trusted ingress required');
    const ip = normalizedIp(request.headers?.['x-vercel-forwarded-for']);
    const namespace = env.CONTACT_LIMIT_NAMESPACE;
    const secret = env.CONTACT_LIMIT_HASH_SECRET;
    const token = env.UPSTASH_REDIS_REST_TOKEN;
    const url = new URL(env.UPSTASH_REDIS_REST_URL || '');
    if (!namespace || !/^[a-zA-Z0-9_-]{1,80}$/.test(namespace) || !secret || secret.length < 32 || !token ||
      url.protocol !== 'https:' || !url.hostname.endsWith('.upstash.io') || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash || url.port) throw new Error('Contact admission not configured');
    let scope: string;
    if (env.VERCEL_ENV === 'production') scope = 'production';
    else if (env.VERCEL_ENV === 'preview' && env.VERCEL_URL && /^[a-zA-Z0-9.-]+$/.test(env.VERCEL_URL)) {
      scope = `preview:${env.VERCEL_URL}`;
    } else throw new Error('Contact environment not configured');
    const hash = (kind: string, value: string) => createHmac('sha256', secret).update(`${kind}:${value}`).digest('hex');
    const prefix = `contact:${namespace}:${scope}`;
    const keys = [`${prefix}:ip:${hash('ip', ip)}`, `${prefix}:email:${hash('email', email.trim().normalize('NFC').toLowerCase())}`, `${prefix}:all`];
    const limits = [
      positiveInteger(env.CONTACT_LIMIT_IP, 5), 10 * 60 * 1000,
      positiveInteger(env.CONTACT_LIMIT_EMAIL, 3), 60 * 60 * 1000,
      positiveInteger(env.CONTACT_LIMIT_GLOBAL, 50), 24 * 60 * 60 * 1000,
    ];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2_000);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['EVAL', CONTACT_ADMISSION_SCRIPT, '3', ...keys, ...limits.map(String), randomUUID()]),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Contact datastore unavailable');
      const payload = await response.json() as { result?: unknown; error?: unknown };
      const result = payload.result;
      if (payload.error || !Array.isArray(result) || result.length !== 2) throw new Error('Invalid admission response');
      if (result[0] === 1 && result[1] === 0) return { allowed: true };
      if (result[0] === 0 && Number.isSafeInteger(result[1]) && result[1] > 0 && result[1] <= 86_400) {
        return { allowed: false, status: 429, retryAfter: result[1] };
      }
      throw new Error('Invalid admission response');
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    // No request contents, IPs, emails, datastore credentials, or provider errors.
    console.error('Contact admission unavailable');
    return { allowed: false, status: 503 };
  }
}
