#!/usr/bin/env node

/**
 * Static regression checks for the published tutorial artifact.
 *
 * Run after `astro build`: the rendered pages are the source of truth for
 * route, branch, and local-asset checks. This deliberately does not claim to
 * exercise logged-in AI apps or send email.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, process.argv[2] || 'dist');
const publicDir = resolve(root, 'public');
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFileSync(path, 'utf8');
const decodeHtml = (value) => value
  .replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? Number.parseInt(code.slice(1), 16) : Number(code)))
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');
const source = (path) => read(resolve(root, path));
const isTracked = (path) => {
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', path], { cwd: root, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const referencedAssets = new Set(['/favicon.svg']);
let branchPaths = 0;
let renderedPages = 0;

for (let day = 1; day <= 20; day += 1) {
  const slug = `day-${String(day).padStart(2, '0')}`;
  const pagePath = resolve(dist, 'tutorials', slug, 'index.html');
  assert(existsSync(pagePath), `Day ${day}: rendered route is missing (${pagePath})`);
  if (!existsSync(pagePath)) continue;

  const html = read(pagePath);
  for (const match of html.matchAll(/(?:src|href)="(\/(?:assets\/[^"?#]+|favicon\.svg))"/g)) referencedAssets.add(match[1]);
  const rootMatch = html.match(/<main class="one-action"[^>]*\bdata-day="(\d+)"[^>]*\bdata-pages="([\s\S]*?)"/);
  assert(rootMatch, `Day ${day}: one-action lesson data was not rendered`);
  if (!rootMatch) continue;
  assert(Number(rootMatch[1]) === day, `Day ${day}: rendered day value is ${rootMatch[1]}`);

  let pages;
  try {
    pages = JSON.parse(decodeHtml(rootMatch[2]));
  } catch (error) {
    failures.push(`Day ${day}: data-pages JSON cannot be read (${error.message})`);
    continue;
  }
  renderedPages += pages.length;
  assert(pages.length > 0, `Day ${day}: has no lesson pages`);
  const ids = new Set();
  for (const page of pages) {
    assert(typeof page.id === 'string' && page.id.length > 0, `Day ${day}: page without a stable ID`);
    assert(!ids.has(page.id), `Day ${day}: duplicate page ID ${page.id}`);
    ids.add(page.id);
    assert(typeof page.title === 'string' && page.title.trim(), `Day ${day}/${page.id}: missing title`);
    assert(typeof page.description === 'string' && page.description.trim(), `Day ${day}/${page.id}: missing description`);
    assert(page.track === undefined || ['codex', 'claude'].includes(page.track), `Day ${day}/${page.id}: invalid app track`);
    assert(page.platform === undefined || ['macos', 'windows'].includes(page.platform), `Day ${day}/${page.id}: invalid OS branch`);
    for (const image of [...(page.images || []), ...(page.image ? [page.image] : [])]) {
      if (typeof image?.src === 'string' && image.src.startsWith('/')) referencedAssets.add(image.src);
    }
    for (const link of page.downloadLinks || []) if (typeof link?.href === 'string' && link.href.startsWith('/')) referencedAssets.add(link.href);
    for (const link of page.officialLinks || []) {
      try { assert(new URL(link.href).protocol === 'https:', `Day ${day}/${page.id}: official link must use HTTPS`); } catch { failures.push(`Day ${day}/${page.id}: invalid official link`); }
    }
  }

  const controls = new Map();
  for (const page of pages) for (const control of page.controls || []) controls.set(control.id, control);
  const conditionalValues = new Map();
  for (const page of pages.filter((item) => item.visibleWhen)) {
    const condition = page.visibleWhen;
    const control = controls.get(condition.choiceKey);
    assert(control, `Day ${day}/${page.id}: visibility control ${condition.choiceKey} is missing`);
    assert(control?.options?.some((option) => option.value === condition.equals), `Day ${day}/${page.id}: visibility value ${condition.equals} is not selectable`);
    if (!conditionalValues.has(condition.choiceKey)) conditionalValues.set(condition.choiceKey, new Set());
    conditionalValues.get(condition.choiceKey).add(condition.equals);
  }

  const choiceStates = [{}];
  for (const [key, values] of conditionalValues) {
    const next = [];
    for (const state of choiceStates) for (const value of values) next.push({ ...state, [key]: value });
    choiceStates.splice(0, choiceStates.length, ...next);
  }
  for (const app of ['codex', 'claude']) for (const os of ['macos', 'windows']) for (const choices of choiceStates) {
    const visible = pages.filter((page) => (!page.track || page.track === app)
      && (!page.platform || page.platform === os)
      && (!page.visibleWhen || choices[page.visibleWhen.choiceKey] === page.visibleWhen.equals));
    branchPaths += 1;
    assert(visible.length > 0, `Day ${day}: ${app}/${os}/${JSON.stringify(choices)} has no reachable page`);
  }
  for (const page of pages) {
    const reachable = ['codex', 'claude'].some((app) => ['macos', 'windows'].some((os) => choiceStates.some((choices) => !page.track || page.track === app
      ? (!page.platform || page.platform === os) && (!page.visibleWhen || choices[page.visibleWhen.choiceKey] === page.visibleWhen.equals)
      : false)));
    assert(reachable, `Day ${day}/${page.id}: no supported branch reaches this page`);
  }
}

for (const assetPath of referencedAssets) {
  const relative = assetPath.replace(/^\//, '');
  const sourcePath = resolve(publicDir, relative);
  const outputPath = resolve(dist, relative);
  assert(existsSync(sourcePath), `Referenced asset does not exist in public: ${assetPath}`);
  assert(existsSync(outputPath), `Referenced asset was not copied to build output: ${assetPath}`);
  assert(isTracked(`public/${relative}`), `Referenced asset is not committed: public/${relative}`);
}

const component = source('src/components/OneActionTutorial.astro');
const contact = source('api/contact.ts');
const progress = source('src/lib/tutorial-progress.ts');
const has = (text, needle, label) => assert(text.includes(needle), label);

has(component, 'data-help-dialog', 'Help dialog markup is missing');
has(component, 'maxlength="2000"', 'Help question length limit is missing');
has(component, "type: 'tutorial'", 'Help form does not identify tutorial requests');
has(component, "helpDialog?.addEventListener('close'", 'Help dialog close handling is missing');
has(component, 'helpReturnFocus?.focus()', 'Help dialog does not return focus to its trigger');
has(component, "'결과를 확인하고 수업 완료'", 'Explicit completion button label is missing');
has(component, 'if (!markTutorialComplete(localStorage, day))', 'Completion is not saved from the final action');
has(contact, "const DEFAULT_TO = 'hello@ai-night.study';", 'Tutorial recipient is not fixed server-side');
has(contact, 'to: [DEFAULT_TO]', 'Tutorial request accepts a client-controlled recipient');
has(contact, 'reply_to: email', 'Tutorial request does not set the learner reply address');
has(contact, 'requiredText(body.question, 2000)', 'Tutorial question server limit is missing');
has(contact, "tutorialSelection(context.app, ['codex', 'claude'])", 'Tutorial app allowlist is missing');
has(contact, "tutorialSelection(context.os, ['macos', 'windows'])", 'Tutorial OS allowlist is missing');
has(contact, "'Idempotency-Key': requestId", 'Tutorial retry idempotency header is missing');
has(contact, 'REQUEST_TIMEOUT_MS = 10_000', 'Tutorial email timeout is missing');
has(progress, 'd01-folder-by-os-2026-09-29', 'Day 1 folder migration marker is missing');
has(progress, '`d01-folder-${os}`', 'Day 1 folder migration does not preserve selected OS');
has(progress, 'markTutorialComplete', 'Explicit completion persistence function is missing');

if (failures.length) {
  console.error(`Tutorial verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Tutorial verification passed: 20 routes, ${renderedPages} rendered lesson pages, ${branchPaths} app/OS/choice paths, ${referencedAssets.size} local assets, and static help/progress/contact contracts.`);
