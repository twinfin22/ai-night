import { execFile, spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { CONTACT_ADMISSION_SCRIPT } from '../../server/contact-admission';
import handler from '../../api/contact';

const execute = promisify(execFile);
const serverBinary = process.env.REDIS_SERVER_BIN || 'redis-server';
const cliBinary = process.env.REDIS_CLI_BIN || 'redis-cli';
const available = spawnSync(serverBinary, ['--version']).status === 0 && spawnSync(cliBinary, ['--version']).status === 0;

// Optional only when the real Redis binaries are absent. No managed service is created.
describe.skipIf(!available)('real Redis atomic rolling contact budgets', () => {
  let directory: string, socket: string, server: ChildProcess;
  const redis = async (args: string[]) => JSON.parse((await execute(cliBinary, ['-s', socket, '--json', ...args], { maxBuffer: 1_000_000 })).stdout);
  const reserve = (keys: string[], limits: number[], id = randomUUID()) => redis(['EVAL', CONTACT_ADMISSION_SCRIPT, '3', ...keys, ...limits.map(String), id]);
  beforeAll(async () => {
    // macOS Unix sockets have a short pathname limit; /private/tmp is writable.
    directory = await mkdtemp(join(process.platform === 'darwin' ? '/private/tmp' : tmpdir(), 'contact-redis-'));
    socket = join(directory, 'redis.sock');
    let startup = '';
    server = spawn(serverBinary, ['--port', '0', '--unixsocket', socket, '--unixsocketperm', '700', '--save', '', '--appendonly', 'no', '--dir', directory], { stdio: ['ignore', 'pipe', 'pipe'] });
    server.stdout?.on('data', (data) => { startup += String(data); });
    server.stderr?.on('data', (data) => { startup += String(data); });
    for (let count = 0; count < 100; count += 1) {
      try { if (await redis(['PING']) === 'PONG') return; } catch { /* startup */ }
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    throw new Error(`Local Redis did not start: ${startup}`);
  });
  afterAll(async () => {
    if (server && server.exitCode === null) {
      const exited = new Promise((resolve) => server.once('exit', resolve));
      server.kill('SIGTERM'); await exited;
    }
    if (directory) await rm(directory, { recursive: true, force: true });
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
  for (const dimension of [0, 1, 2]) {
    it(`concurrent reservations cannot exceed dimension ${dimension}`, async () => {
      const prefix = randomUUID();
      const limits = [100, 60_000, 100, 60_000, 100, 60_000];
      limits[dimension * 2] = 3;
      const keys = [0, 1, 2].map((index) => `${prefix}:${index}`);
      const results = await Promise.all(Array.from({ length: 40 }, () => reserve(keys, limits)));
      expect(results.filter((result) => result[0] === 1)).toHaveLength(3);
      expect(results.filter((result) => result[0] === 0 && result[1] > 0)).toHaveLength(37);
      for (const key of keys) expect(await redis(['ZCARD', key])).toBe(3);
    });
  }
  it('rejected attempts reserve no other dimension and exhausted windows release capacity', async () => {
    const prefix = randomUUID();
    const limits = [1, 100, 3, 100, 50, 100];
    const keys = [`${prefix}:ip`, `${prefix}:email`, `${prefix}:all`];
    expect(await reserve(keys, limits)).toEqual([1, 0]);
    expect((await reserve([keys[0], `${prefix}:other-email`, keys[2]], limits))[0]).toBe(0);
    expect(await redis(['ZCARD', `${prefix}:other-email`])).toBe(0);
    expect(await redis(['ZCARD', keys[2]])).toBe(1);
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(await reserve(keys, limits)).toEqual([1, 0]);
    for (const key of keys) expect(await redis(['ZCARD', key])).toBe(1);
  });
  it('both handler branches share atomic aggregate capacity, counting failed providers and new IDs', async () => {
    const env = { VERCEL: '1', VERCEL_ENV: 'production', CONTACT_LIMIT_NAMESPACE: randomUUID(), CONTACT_LIMIT_HASH_SECRET: 'synthetic-test-secret-at-least-32-characters', UPSTASH_REDIS_REST_URL: 'https://contact-test.upstash.io', UPSTASH_REDIS_REST_TOKEN: 'synthetic-token', RESEND_API_KEY: 'synthetic-key', CONTACT_LIMIT_IP: '100', CONTACT_LIMIT_EMAIL: '100', CONTACT_LIMIT_GLOBAL: '3' };
    for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let sends = 0;
    vi.stubGlobal('fetch', vi.fn(async (url: any, init: any) => {
      if (String(url).includes('upstash.io')) return Response.json({ result: await redis(JSON.parse(init.body)) });
      sends += 1; return Response.json({}, { status: 500 });
    }));
    const results = await Promise.all(Array.from({ length: 30 }, async (_, index) => {
      const body = index % 2 ? { type: 'tutorial', email: `student${index}@example.com`, question: 'question', requestId: `new-id-${index}`, context: { day: 1, stepId: 'start', stepTitle: 'Start' } } : { email: `student${index}@example.com`, name: 'Student' };
      const response = { code: 0, headers: {} as Record<string, string>, setHeader(key: string, value: string) { this.headers[key] = value; }, status(code: number) { this.code = code; return this; }, json(_body: unknown) { return this; } };
      await handler({ method: 'POST', headers: { 'x-vercel-forwarded-for': '203.0.113.1' }, body }, response);
      return response.code;
    }));
    expect(sends).toBe(3);
    expect(results.filter((status) => status === 502)).toHaveLength(3);
    expect(results.filter((status) => status === 429)).toHaveLength(27);
  });
});
