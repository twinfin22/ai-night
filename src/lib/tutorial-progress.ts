export const tutorialStorage = {
  version: 'ainight.version', done: 'ainight.done', position: 'ainight.position', last: 'ainight.last', app: 'ainight.app', draft: 'ainight.draft', migrations: 'ainight.migrations', completed: 'ainight.completed',
} as const;

type Json = Record<string, unknown> | unknown[];
const parse = <T extends Json>(value: string | null, fallback: T): T => {
  try { const parsed = JSON.parse(value || ''); return parsed && typeof parsed === 'object' ? parsed as T : fallback; } catch { return fallback; }
};

/** Runs in both the course list and every day route. Safe to repeat. */
export function runCourseMigrations(storage: Storage): boolean {
  try {
    const version = storage.getItem(tutorialStorage.version);
    const done = parse<unknown[]>(storage.getItem(tutorialStorage.done), []).map(Number).filter(Number.isInteger);
    const position = parse<Record<string, unknown>>(storage.getItem(tutorialStorage.position), {});
    const markers = parse<Record<string, string>>(storage.getItem(tutorialStorage.migrations), {});

    // v2 -> v3: only the incompatible first-week index positions are reset.
    if (version !== '3' && version !== '4' && version !== '5') {
      for (const key of Object.keys(position)) if (/^[1-5](?:\.(?:claude|codex))?$/.test(key)) delete position[key];
      const retained = done.filter((day) => day >= 6 && day <= 20);
      storage.setItem(tutorialStorage.done, JSON.stringify([...new Set(retained)].sort((a, b) => a - b)));
      if (Number(storage.getItem(tutorialStorage.last)) <= 5) storage.removeItem(tutorialStorage.last);
    }

    // Copy-only fixes: clear only the three renamed common positions, never progress or app choice.
    if (markers['qa-copy-fixes'] !== '1') {
      for (const key of ['11.common', '15.common', '19.common']) delete position[key];
      storage.setItem(tutorialStorage.position, JSON.stringify(position));
      markers['qa-copy-fixes'] = '1';
      storage.setItem(tutorialStorage.migrations, JSON.stringify(markers));
    }
    const app = storage.getItem(tutorialStorage.app);
    if (app !== 'claude' && app !== 'codex') storage.removeItem(tutorialStorage.app);
    storage.setItem(tutorialStorage.version, '5');
    return true;
  } catch { return false; }
}
