export const tutorialStorage = {
  version: 'ainight.version',
  done: 'ainight.done',
  position: 'ainight.position',
  last: 'ainight.last',
  app: 'ainight.app',
  os: 'ainight.os',
  draft: 'ainight.draft',
  migrations: 'ainight.migrations',
  completed: 'ainight.completed',
} as const;

export type TutorialApp = 'claude' | 'codex' | 'common';
export type TutorialOs = 'macos' | 'windows';

export const persistenceFailureMessage = '진도를 저장하지 못해도 수업은 계속할 수 있습니다. 재접속하면 지금 위치가 유지되지 않을 수 있습니다.';

type Json = Record<string, unknown> | unknown[];
type PositionMap = Record<string, string>;

const parse = <T extends Json>(value: string | null, fallback: T): T => {
  try {
    const parsed = JSON.parse(value || '');
    return parsed && typeof parsed === 'object' ? parsed as T : fallback;
  } catch {
    return fallback;
  }
};

const isDay = (day: number) => Number.isInteger(day) && day >= 1 && day <= 20;
const isApp = (app: string): app is TutorialApp => app === 'claude' || app === 'codex' || app === 'common';
const isOs = (os: string | null): os is TutorialOs => os === 'macos' || os === 'windows';
const positionKey = (day: number, app: TutorialApp) => `${day}.${app}`;

const readPositions = (storage: Storage): PositionMap => {
  const parsed = parse<Record<string, unknown>>(storage.getItem(tutorialStorage.position), {});
  const positions: PositionMap = {};
  for (const [key, value] of Object.entries(parsed)) if (typeof value === 'string') positions[key] = value;
  return positions;
};

/**
 * Saves the location as a stable page ID whenever a learner changes steps.
 * `false` means the caller should keep the lesson open and show the persistence warning.
 */
export function saveTutorialPosition(
  storage: Storage,
  { day, app, stepId }: { day: number; app: TutorialApp; stepId: string },
): boolean {
  if (!isDay(day) || !isApp(app) || !stepId) return false;

  try {
    const position = readPositions(storage);
    position[positionKey(day, app)] = stepId;
    storage.setItem(tutorialStorage.position, JSON.stringify(position));
    storage.setItem(tutorialStorage.last, String(day));
    return true;
  } catch {
    return false;
  }
}

/** Returns a saved stable page ID, never a legacy numeric index. */
export function readTutorialPosition(storage: Storage, day: number, app: TutorialApp): string | null {
  if (!isDay(day) || !isApp(app)) return null;
  try {
    return readPositions(storage)[positionKey(day, app)] ?? null;
  } catch {
    return null;
  }
}

/**
 * Call only from the learner's final "수업 완료" action. Reaching the final page
 * must not call this function.
 */
export function markTutorialComplete(storage: Storage, day: number): boolean {
  if (!isDay(day)) return false;

  try {
    const done = parse<unknown[]>(storage.getItem(tutorialStorage.done), [])
      .map(Number)
      .filter(isDay);
    if (!done.includes(day)) done.push(day);
    storage.setItem(tutorialStorage.done, JSON.stringify([...new Set(done)].sort((a, b) => a - b)));
    return true;
  } catch {
    return false;
  }
}

/** Runs in both the course list and every day route. Safe to repeat. */
export function runCourseMigrations(storage: Storage): boolean {
  try {
    const version = storage.getItem(tutorialStorage.version);
    const position = parse<Record<string, unknown>>(storage.getItem(tutorialStorage.position), {});
    const markers = parse<Record<string, string>>(storage.getItem(tutorialStorage.migrations), {});

    // v2 used numeric page indices for week 1. Stable page IDs (and every completion)
    // remain valid, so remove only those untranslatable numeric locations.
    if (version !== '3' && version !== '4' && version !== '5') {
      for (const key of Object.keys(position)) {
        if (/^[1-5](?:\.(?:claude|codex|common))?$/.test(key) && typeof position[key] === 'number') delete position[key];
      }
    }

    // Day 1 split its former single folder page by OS. Do not guess when OS has
    // not been chosen: a later migration run after selection will complete it.
    const hasLegacyFolder = Object.values(position).some((value) => value === 'd01-folder');
    const os = storage.getItem(tutorialStorage.os);
    if (markers['d01-folder-by-os-2026-09-29'] !== '1' && (!hasLegacyFolder || isOs(os))) {
      if (hasLegacyFolder) {
        for (const key of Object.keys(position)) {
          if (position[key] === 'd01-folder') position[key] = `d01-folder-${os}`;
        }
      }
      markers['d01-folder-by-os-2026-09-29'] = '1';
    }

    // Week 3 page changes had no reliable ID correspondence. Keep completion,
    // environment choices, and other days; the affected lessons reopen at start.
    if (markers['week3-page-ids-2026-07-16'] !== '1') {
      for (const key of ['12.common', '13.common', '14.common', '15.common', '15.codex', '15.claude']) delete position[key];
      markers['week3-page-ids-2026-07-16'] = '1';
    }
    const app = storage.getItem(tutorialStorage.app);
    if (app !== null && !isApp(app)) storage.removeItem(tutorialStorage.app);
    storage.setItem(tutorialStorage.position, JSON.stringify(position));
    storage.setItem(tutorialStorage.migrations, JSON.stringify(markers));
    storage.setItem(tutorialStorage.version, '5');
    return true;
  } catch { return false; }
}
