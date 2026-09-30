import { describe, expect, it } from 'vitest';
import { CourseStore, courseStorageKeys } from '../../src/lib/course-store';

const storage = (initial: Record<string, string> = {}): Storage => {
  const values = new Map(Object.entries(initial));
  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => { values.delete(key); },
    setItem: (key, value) => { values.set(key, String(value)); },
  };
};

describe('v4 course store', () => {
  it('resets old progress and preserves only a valid app choice', () => {
    const local = storage({
      [courseStorageKeys.version]: '3',
      [courseStorageKeys.done]: '[1,6,20]',
      [courseStorageKeys.position]: '{"6":"d06-retro"}',
      [courseStorageKeys.last]: '6',
      [courseStorageKeys.app]: 'codex',
    });
    const state = new CourseStore({ localStorage: local, sessionStorage: storage() }).read();

    expect(state).toMatchObject({ version: '4', done: [], position: {}, last: null, app: 'codex' });
    expect(local.getItem(courseStorageKeys.version)).toBe('4');
  });

  it('sanitises a damaged v4 payload without resetting valid data', () => {
    const local = storage({
      [courseStorageKeys.version]: '4',
      [courseStorageKeys.done]: '[6,"bad",21]',
      [courseStorageKeys.position]: '{"6":"d06-action-01","bad":2}',
      [courseStorageKeys.action]: '{"d06-action-01":"confirmed","bad":"no"}',
      [courseStorageKeys.choice]: '{"7.output-format":"slides","bad":2}',
      [courseStorageKeys.app]: 'claude',
    });
    const state = new CourseStore({ localStorage: local, sessionStorage: storage() }).read();

    expect(state.done).toEqual([6]);
    expect(state.position).toEqual({ 6: 'd06-action-01' });
    expect(state.actionState).toEqual({ 'd06-action-01': 'confirmed' });
    expect(state.choice).toEqual({ '7.output-format': 'slides' });
    expect(state.app).toBe('claude');
  });
});
