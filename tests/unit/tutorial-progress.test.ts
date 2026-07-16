import { describe, expect, it } from 'vitest';
import { runCourseMigrations, tutorialStorage } from '../../src/lib/tutorial-progress';

const storage = (initial: Record<string, string>): Storage => {
  const values = new Map(Object.entries(initial));
  return {
    get length() { return values.size; }, clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null, key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => { values.delete(key); }, setItem: (key, value) => { values.set(key, String(value)); },
  };
};

describe('tutorial copy-fix migration', () => {
  it('only clears renamed common positions and is idempotent', () => {
    const local = storage({
      [tutorialStorage.version]: '5', [tutorialStorage.done]: '[11,15,19]', [tutorialStorage.last]: '19',
      [tutorialStorage.app]: 'codex', [tutorialStorage.position]: '{"11.common":"old","15.common":"old","19.common":"old","11.codex":"keep","12.common":"keep"}',
      [tutorialStorage.draft]: '{"d11-01":{"x":1}}', [tutorialStorage.migrations]: '{}',
    });
    expect(runCourseMigrations(local)).toBe(true);
    expect(local.getItem(tutorialStorage.position)).toBe('{"11.codex":"keep","12.common":"keep"}');
    expect(local.getItem(tutorialStorage.done)).toBe('[11,15,19]');
    expect(local.getItem(tutorialStorage.app)).toBe('codex');
    expect(local.getItem(tutorialStorage.last)).toBe('19');
    expect(local.getItem(tutorialStorage.draft)).toBe('{"d11-01":{"x":1}}');
    const afterFirst = JSON.stringify([...Array(local.length)].map((_, index) => [local.key(index), local.getItem(local.key(index)!)]));
    expect(runCourseMigrations(local)).toBe(true);
    expect(JSON.stringify([...Array(local.length)].map((_, index) => [local.key(index), local.getItem(local.key(index)!)]))).toBe(afterFirst);
  });
});
