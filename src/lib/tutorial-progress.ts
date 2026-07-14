export const tutorialStorage = {
  version: 'ainight.version', done: 'ainight.done', position: 'ainight.position', last: 'ainight.last', app: 'ainight.app', completed: 'ainight.completed',
} as const;

const parse = <T>(value: string | null, fallback: T): T => {
  try { return JSON.parse(value || '') as T; } catch { return fallback; }
};

export function migrateTutorialProgress(storage: Storage): boolean {
  try {
    if (storage.getItem(tutorialStorage.version) === '3') return true;
    const done = parse<unknown[]>(storage.getItem(tutorialStorage.done), []).map(Number).filter((day) => Number.isInteger(day) && day >= 6 && day <= 20);
    const position = parse<Record<string, unknown>>(storage.getItem(tutorialStorage.position), {});
    for (const key of Object.keys(position)) if (/^[1-5](?:\.(?:claude|codex))?$/.test(key)) delete position[key];
    const last = Number(storage.getItem(tutorialStorage.last));
    const app = storage.getItem(tutorialStorage.app);
    storage.setItem(tutorialStorage.done, JSON.stringify([...new Set(done)].sort((a, b) => a - b)));
    storage.setItem(tutorialStorage.position, JSON.stringify(position));
    if (last >= 1 && last <= 5) storage.removeItem(tutorialStorage.last);
    if (app !== 'claude' && app !== 'codex') storage.removeItem(tutorialStorage.app);
    storage.setItem(tutorialStorage.version, '3');
    return true;
  } catch { return false; }
}
