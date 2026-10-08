import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { verifyPublicAssets } from '../../scripts/verify-public-assets.mjs';
import { fileURLToPath } from 'node:url';

async function fixture(run) {
  const root = await mkdtemp(join(process.env.SECURITY_TEST_TMP || tmpdir(), 'asset-gate-'));
  try { await run(root); } finally { await rm(root, { recursive: true, force: true }); }
}

test('rejects forbidden filenames regardless of case', () => fixture(async (root) => {
  await writeFile(join(root, 'AI-BOOKCLUB.HTM'), '<html>synthetic capture</html>');
  await assert.rejects(verifyPublicAssets(root), /forbidden authenticated capture filename/);
}));

test('rejects renamed, escaped and entity-encoded bootstrap captures without disclosing values', () => fixture(async (root) => {
  for (const content of ['{"csrf_token":"SYNTHETIC_PRIVATE_VALUE"}',
    '{&quot;xdt_viewer&quot;:{}}', '{\\"sessionId\\":\\"SYNTHETIC_PRIVATE_VALUE\\"}',
    '{\\u0022accessToken\\u0022:\\u0022SYNTHETIC_PRIVATE_VALUE\\u0022}',
    '{"access\\u0054oken":"SYNTHETIC_PRIVATE_VALUE","session\\u0049d":"SYNTHETIC_PRIVATE_VALUE"}',
    '{"csrf_\\x74oken":"SYNTHETIC_PRIVATE_VALUE"}',
    '{"xdt_\\u{76}iewer":{}}']) {
    await writeFile(join(root, 'renamed.png'), content);
    try { await verifyPublicAssets(root); assert.fail('capture passed'); }
    catch (error) {
      assert.match(error.message, /authenticated bootstrap fields/);
      assert.ok(!error.message.includes('SYNTHETIC_PRIVATE_VALUE'));
    }
  }
}));

test('rejects symlinked files and directories rather than following external content', () => fixture(async (root) => {
  await symlink('/nonexistent/synthetic-capture', join(root, 'external.png'));
  await assert.rejects(verifyPublicAssets(root), /publishable symlink/);
}));

test('rejects browser-recognized UTF-16 captures without logging values', () => fixture(async (root) => {
  const content = '{"accessToken":"SYNTHETIC_PRIVATE_VALUE","sessionId":"SYNTHETIC_PRIVATE_VALUE"}';
  const littleEndian = Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(content, 'utf16le')]);
  const bigEndian = Buffer.from(littleEndian).swap16();
  for (const bytes of [littleEndian, bigEndian]) {
    await writeFile(join(root, 'encoded.html'), bytes);
    await assert.rejects(verifyPublicAssets(root), (error) => {
      assert.match(error.message, /authenticated bootstrap fields accessToken, sessionId/);
      assert.ok(!error.message.includes('SYNTHETIC_PRIVATE_VALUE'));
      return true;
    });
  }
}));

test('preserves ordinary HTML, poster binaries and tutorial session prose', () => fixture(async (root) => {
  await mkdir(join(root, 'assets'));
  await writeFile(join(root, 'index.html'), '<img src="/assets/ai-bookclub.png"><p>sessionId is a session identifier</p>');
  await writeFile(join(root, 'assets/ai-bookclub.png'), Buffer.from([137,80,78,71,0,1,2]));
  await writeFile(join(root, 'assets/ai-bookclub-800.webp'), 'RIFF synthetic WEBP');
  await verifyPublicAssets(root);
}));

test('direct Astro builds reject source and generated captures through shared hooks', () => fixture(async (root) => {
  const repository = fileURLToPath(new URL('../../', import.meta.url));
  await mkdir(join(root, 'public'));
  await mkdir(join(root, 'scripts'));
  await mkdir(join(root, 'src/pages'), { recursive: true });
  await symlink(join(repository, 'node_modules'), join(root, 'node_modules'));
  for (const file of ['astro.config.mjs', 'scripts/verify-public-assets.mjs']) {
    await writeFile(join(root, file), await readFile(join(repository, file)));
  }
  await writeFile(join(root, 'package.json'), '{"type":"module"}');
  await writeFile(join(root, 'src/pages/index.astro'), '<html><body>Safe fixture</body></html>');
  const build = () => spawnSync(process.execPath, [join(repository, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    cwd: root, encoding: 'utf8', timeout: 30_000,
  });
  await writeFile(join(root, 'public/renamed.html'), '{"csrf_token":"SYNTHETIC_PRIVATE_VALUE"}');
  let result = build();
  assert.notEqual(result.status, 0);
  assert.match(result.stdout + result.stderr, /authenticated bootstrap fields csrf_token/);
  assert.ok(!(result.stdout + result.stderr).includes('SYNTHETIC_PRIVATE_VALUE'));
  await rm(join(root, 'public/renamed.html'));
  await writeFile(join(root, 'src/pages/index.astro'), '<html><body><script type="application/json">{"xdt_viewer":{}}</script></body></html>');
  result = build();
  assert.notEqual(result.status, 0);
  assert.match(result.stdout + result.stderr, /authenticated bootstrap fields xdt_viewer/);
}));
