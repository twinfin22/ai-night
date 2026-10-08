import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import handler from '../../api/contact';
import { reserveContactAttempt } from '../../server/contact-admission';
import { contactFailureMessage } from '../../src/lib/contact-feedback';

const environment = {
  VERCEL: '1', VERCEL_ENV: 'production', VERCEL_URL: 'build-one.vercel.app',
  UPSTASH_REDIS_REST_URL: 'https://contact-test.upstash.io', UPSTASH_REDIS_REST_TOKEN: 'synthetic-token',
  CONTACT_LIMIT_HASH_SECRET: 'synthetic-test-secret-at-least-32-characters', CONTACT_LIMIT_NAMESPACE: 'test',
  RESEND_API_KEY: 'synthetic-resend-key',
};
const ordinary = { email: 'Student@Example.com', name: 'Student', pain: 'A question' };
const tutorial = { type: 'tutorial', email: 'Student@Example.com', question: 'A question', requestId: 'same-id', context: { day: 1, stepId: 'd01-start', stepTitle: 'Start', app: 'codex', os: 'macos' } };
function response() {
  return { code: 0, body: null as any, headers: {} as Record<string, string>, setHeader(key: string, value: string) { this.headers[key] = value; }, status(code: number) { this.code = code; return this; }, json(body: unknown) { this.body = body; return this; } };
}
async function submit(body: unknown, headers: Record<string, unknown> = { 'x-vercel-forwarded-for': '203.0.113.1' }) {
  const result = response();
  await handler({ method: 'POST', body, headers }, result);
  return result;
}
describe('shared contact admission', () => {
  beforeEach(() => {
    for (const [key, value] of Object.entries(environment)) vi.stubEnv(key, value);
    for (const key of ['CONTACT_LIMIT_IP', 'CONTACT_LIMIT_EMAIL', 'CONTACT_LIMIT_GLOBAL']) vi.stubEnv(key, undefined);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
  for (const body of [ordinary, tutorial]) {
    it(`admits a legitimate ${'type' in body ? 'tutorial' : 'ordinary'} submission before provider invocation`, async () => {
      const calls: string[] = [];
      const fetcher = vi.fn(async (url: any) => {
        calls.push(String(url));
        return String(url).includes('upstash.io') ? Response.json({ result: [1, 0] }) : Response.json({ id: 'mail' });
      });
      vi.stubGlobal('fetch', fetcher);
      expect((await submit(body)).code).toBe(200);
      expect(calls).toEqual(['https://contact-test.upstash.io/', 'https://api.resend.com/emails']);
      const sent = fetcher.mock.calls[1] as any[];
      if ('type' in body) expect(sent[1].headers['Idempotency-Key']).toBe('same-id');
    });
    it(`rejects exhausted ${'type' in body ? 'tutorial' : 'ordinary'} without sending`, async () => {
      const fetcher = vi.fn().mockResolvedValue(Response.json({ result: [0, 61] }));
      vi.stubGlobal('fetch', fetcher);
      const result = await submit(body);
      expect(result.code).toBe(429);
      expect(result.headers['Retry-After']).toBe('61');
      expect(result.headers['Cache-Control']).toBe('no-store');
      expect(fetcher).toHaveBeenCalledTimes(1);
    });
    it(`fails closed for unavailable Redis on ${'type' in body ? 'tutorial' : 'ordinary'}`, async () => {
      const fetcher = vi.fn().mockRejectedValue(new Error('offline'));
      vi.stubGlobal('fetch', fetcher);
      expect((await submit(body)).code).toBe(503);
      expect(fetcher).toHaveBeenCalledTimes(1);
    });
  }
  it('invalid requests consume neither Redis capacity nor provider calls', async () => {
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    for (const body of [{ ...ordinary, email: 'invalid' }, { ...tutorial, question: '' }, { ...tutorial, requestId: 'bad\nkey' }, { ...tutorial, context: { ...tutorial.context, app: 'unknown' } }]) {
      expect((await submit(body)).code).toBe(400);
    }
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('both branches share aggregate, IP, and normalized keyed email identities across deployments', async () => {
    const commands: any[][] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: any, init: any) => {
      if (String(url).includes('upstash.io')) { commands.push(JSON.parse(init.body)); return Response.json({ result: [1, 0] }); }
      return Response.json({ id: 'mail' });
    }));
    await submit(ordinary);
    vi.stubEnv('VERCEL_URL', 'build-two.vercel.app');
    await submit({ ...tutorial, email: 'student@example.com' });
    expect(commands[0].slice(3, 6)).toEqual(commands[1].slice(3, 6));
    expect(commands[0].join(' ')).not.toContain('Student@Example.com');
    expect(commands[0].join(' ')).not.toContain('203.0.113.1');
  });
  it('failed providers and repeated or new requestIds each reserve a fresh attempt', async () => {
    const commands: any[][] = [];
    const providerHeaders: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: any, init: any) => {
      if (String(url).includes('upstash.io')) { commands.push(JSON.parse(init.body)); return Response.json({ result: [1, 0] }); }
      providerHeaders.push(init.headers['Idempotency-Key']);
      return Response.json({}, { status: 500 });
    }));
    for (const requestId of ['same-id', 'same-id', 'new-id']) expect((await submit({ ...tutorial, requestId })).code).toBe(502);
    expect(new Set(commands.map((command) => command.at(-1))).size).toBe(3);
    expect(commands.every((command) => JSON.stringify(command.slice(3, 6)) === JSON.stringify(commands[0].slice(3, 6)))).toBe(true);
    expect(providerHeaders).toEqual(['same-id', 'same-id', 'new-id']);
  });
  it('isolates previews from production and from other preview deployments', async () => {
    const commands: any[][] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: any, init: any) => { commands.push(JSON.parse(init.body)); return Response.json({ result: [1, 0] }); }));
    await reserveContactAttempt({ headers: { 'x-vercel-forwarded-for': '203.0.113.1' } }, ordinary.email);
    vi.stubEnv('VERCEL_ENV', 'preview');
    await reserveContactAttempt({ headers: { 'x-vercel-forwarded-for': '203.0.113.1' } }, ordinary.email);
    vi.stubEnv('VERCEL_URL', 'build-two.vercel.app');
    await reserveContactAttempt({ headers: { 'x-vercel-forwarded-for': '203.0.113.1' } }, ordinary.email);
    expect(new Set(commands.map((command) => command[5])).size).toBe(3);
  });
  it('canonicalizes IPv6 and mapped IPv4 representations', async () => {
    const commands: any[][] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: any, init: any) => { commands.push(JSON.parse(init.body)); return Response.json({ result: [1, 0] }); }));
    for (const ip of ['2001:0db8:0000:0000:0000:0000:0000:0001', '2001:db8::1', '203.0.113.1', '::ffff:203.0.113.1', '::ffff:cb00:7101']) {
      await reserveContactAttempt({ headers: { 'x-vercel-forwarded-for': ip } }, ordinary.email);
    }
    expect(commands[0][3]).toBe(commands[1][3]);
    expect(commands[2][3]).toBe(commands[3][3]);
    expect(commands[2][3]).toBe(commands[4][3]);
  });
  it('rejects spoofable, missing, multiple, or malformed IPs before Redis', async () => {
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    for (const headers of [{ 'x-forwarded-for': '203.0.113.1' }, {}, { 'x-vercel-forwarded-for': ['203.0.113.1'] }, { 'x-vercel-forwarded-for': '203.0.113.1, 203.0.113.2' }]) {
      expect((await submit(ordinary, headers)).code).toBe(503);
    }
    vi.stubEnv('VERCEL', '0');
    expect((await submit(ordinary)).code).toBe(503);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('rejects malformed Redis results and invalid configuration', async () => {
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    for (const payload of [{ result: [1, 5] }, { result: [0, 0] }, { result: ['1', 0] }, { error: 'ERR', result: [1, 0] }, {}]) {
      fetcher.mockResolvedValue(Response.json(payload));
      expect((await submit(ordinary)).code).toBe(503);
    }
    fetcher.mockClear();
    vi.stubEnv('CONTACT_LIMIT_IP', '0');
    expect((await submit(ordinary)).code).toBe(503);
    expect(fetcher).not.toHaveBeenCalled();
    vi.stubEnv('CONTACT_LIMIT_IP', '5');
    vi.stubEnv('CONTACT_LIMIT_HASH_SECRET', '');
    expect((await submit(ordinary)).code).toBe(503);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('aborts an unresponsive datastore without contacting the provider', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn((_url: any, init: any) => new Promise((_resolve, reject) => init.signal.addEventListener('abort', () => reject(new Error('timeout')))));
    vi.stubGlobal('fetch', fetcher);
    const pending = submit(ordinary);
    await vi.advanceTimersByTimeAsync(2_000);
    expect((await pending).code).toBe(503);
    expect(fetcher).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

it('shows bounded retry guidance and fallback for both contact interfaces', () => {
  expect(contactFailureMessage(429, '61')).toContain('2분 후');
  expect(contactFailureMessage(429, 'junk')).toContain('잠시 후');
  expect(contactFailureMessage(503, null)).toContain('입력 내용은 유지됩니다');
  expect(contactFailureMessage(503, null)).toContain('hello@ai-night.study');
});
