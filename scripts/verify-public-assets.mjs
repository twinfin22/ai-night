import { readdir, readFile, lstat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const captureFields = [
  'accessToken', 'cryptoAuthToken', 'csrf_token', 'csrftoken', 'logoutToken',
  'sessionID', 'sessionId', 'xdt_viewer', '__viewer', '__session',
];
const fields = new RegExp(`(?:["'](?:${captureFields.join('|')})["']|\\b(?:${captureFields.join('|')})\\b)\\s*[:=]`, 'gi');

// Report paths and field names only: never include captured values in build logs.
export async function verifyPublicAssets(root) {
  const violations = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      const label = relative(root, path);
      if (entry.name.toLowerCase() === 'ai-bookclub.htm') {
        violations.push(`${label}: forbidden authenticated capture filename`);
        continue;
      }
      const stat = await lstat(path);
      if (stat.isSymbolicLink()) {
        violations.push(`${label}: publishable symlink is not allowed`);
      } else if (stat.isDirectory()) {
        await walk(path);
      } else if (stat.isFile()) {
        // Inspect every file, including captures renamed with an image extension.
        const data = await readFile(path);
        const encoding = data[0] === 0xff && data[1] === 0xfe ? 'utf-16le'
          : data[0] === 0xfe && data[1] === 0xff ? 'utf-16be' : 'utf-8';
        const text = new TextDecoder(encoding).decode(data)
          .replace(/&quot;|&#0*34;|&#x0*22;/gi, '"')
          .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'")
          // Keys, as well as quotes, may use JSON/JavaScript escapes.
          .replace(/\\+u\{([0-9a-f]{1,6})\}/gi, (match, hex) => {
            const code = Number.parseInt(hex, 16);
            return code <= 0x10ffff ? String.fromCodePoint(code) : match;
          })
          .replace(/\\+u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
          .replace(/\\+x([0-9a-f]{2})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
          .replace(/\\+"/g, '"');
        const matches = [...text.matchAll(fields)];
        const names = [...new Set(matches.map((match) => match[0].replace(/["'\s:=]/g, '')))];
        if (names.length) violations.push(`${label}: authenticated bootstrap fields ${names.join(', ')}`);
      }
    }
  }
  await walk(root);
  if (violations.length) throw new Error(`Publishable asset check failed:\n${violations.join('\n')}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const roots = process.argv.slice(2);
  try {
    for (const root of roots.length ? roots : ['public', 'dist']) await verifyPublicAssets(resolve(root));
    console.log('Publishable asset check passed.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Publishable asset check failed.');
    process.exitCode = 1;
  }
}
