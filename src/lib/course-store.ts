export type CourseApp = 'claude' | 'codex';
export type ActionState = 'confirmed' | 'deferred';
export type StorageBackend = 'local' | 'session' | 'memory';

export const courseStorageKeys = {
  version: 'ainight.version',
  done: 'ainight.done',
  position: 'ainight.position',
  last: 'ainight.last',
  action: 'ainight.action',
  choice: 'ainight.choice',
  app: 'ainight.app',
  backend: 'ainight.storage',
} as const;

/** Old course-owned keys. Keep this registry explicit: never clear unrelated storage. */
const legacyKeys = [
  ...Object.values(courseStorageKeys).filter((key) => key !== courseStorageKeys.backend),
  'ainight.completed',
  'ainight.actionState',
  'ainight.choices',
  'ainight.draft',
] as const;

export interface CourseState {
  version: '4';
  done: number[];
  position: Record<string, string>;
  last: number | null;
  actionState: Record<string, ActionState>;
  choice: Record<string, string>;
  app: CourseApp | null;
}

export interface CourseStoreOptions {
  localStorage?: Storage;
  sessionStorage?: Storage;
  /** Lets the UI announce the one-time storage degradation through aria-live. */
  onStorageWarning?: (message: string) => void;
}

interface StorageTarget {
  name: StorageBackend;
  storage: Storage;
}

const emptyState = (app: CourseApp | null = null): CourseState => ({
  version: '4', done: [], position: {}, last: null, actionState: {}, choice: {}, app,
});

const memoryStorage = (): Storage => {
  const values = new Map<string, string>();
  return {
    get length() { return values.size; },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => { values.delete(key); },
    setItem: (key, value) => { values.set(key, String(value)); },
  };
};

const readBrowserStorage = (name: 'localStorage' | 'sessionStorage'): Storage | undefined => {
  if (typeof window === 'undefined') return undefined;
  try { return window[name]; } catch { return undefined; }
};

const parse = (value: string | null): unknown => {
  try { return JSON.parse(value || ''); } catch { return undefined; }
};

const recordOfStrings = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, item]) => Boolean(key) && typeof item === 'string' && item.length > 0));
};

const actionRecord = (value: unknown): Record<string, ActionState> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, item]) => Boolean(key) && (item === 'confirmed' || item === 'deferred'))) as Record<string, ActionState>;
};

const validApp = (value: string | null): CourseApp | null => value === 'claude' || value === 'codex' ? value : null;
const validDay = (value: unknown): value is number => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 20;

const normalise = (storage: Storage): CourseState => {
  const done = parse(storage.getItem(courseStorageKeys.done));
  const last = Number(storage.getItem(courseStorageKeys.last));
  return {
    version: '4',
    done: Array.isArray(done) ? [...new Set(done.map(Number).filter(validDay))].sort((a, b) => a - b) : [],
    position: recordOfStrings(parse(storage.getItem(courseStorageKeys.position))),
    last: validDay(last) ? last : null,
    actionState: actionRecord(parse(storage.getItem(courseStorageKeys.action))),
    choice: recordOfStrings(parse(storage.getItem(courseStorageKeys.choice))),
    app: validApp(storage.getItem(courseStorageKeys.app)),
  };
};

const writeState = (storage: Storage, state: CourseState): void => {
  storage.setItem(courseStorageKeys.done, JSON.stringify(state.done));
  storage.setItem(courseStorageKeys.position, JSON.stringify(state.position));
  if (state.last === null) storage.removeItem(courseStorageKeys.last); else storage.setItem(courseStorageKeys.last, String(state.last));
  storage.setItem(courseStorageKeys.action, JSON.stringify(state.actionState));
  storage.setItem(courseStorageKeys.choice, JSON.stringify(state.choice));
  if (state.app === null) storage.removeItem(courseStorageKeys.app); else storage.setItem(courseStorageKeys.app, state.app);
  // Version is deliberately last: a failed write remains eligible for migration.
  storage.setItem(courseStorageKeys.version, '4');
};

const canWrite = (storage: Storage): boolean => {
  const key = `__ainight_probe_${Date.now()}_${Math.random()}`;
  try {
    storage.setItem(key, '1');
    const available = storage.getItem(key) === '1';
    storage.removeItem(key);
    return available;
  } catch { return false; }
};

export class CourseStore {
  private readonly localStorage?: Storage;
  private readonly sessionStorage?: Storage;
  private readonly memory = memoryStorage();
  private readonly warned = new Set<StorageBackend>();
  private readonly onStorageWarning?: (message: string) => void;
  private target: StorageTarget;

  constructor(options: CourseStoreOptions = {}) {
    this.localStorage = options.localStorage ?? readBrowserStorage('localStorage');
    this.sessionStorage = options.sessionStorage ?? readBrowserStorage('sessionStorage');
    this.onStorageWarning = options.onStorageWarning;
    this.target = this.chooseInitialTarget();
  }

  get backend(): StorageBackend { return this.target.name; }

  /** Runs the destructive, whole-course v4 migration exactly once per storage backend. */
  migrate(): CourseState {
    const app = this.safeReadApp(this.target.storage);
    const alreadyV4 = this.safeVersion() === '4';
    const existing = alreadyV4 ? this.safeState() : emptyState(app);
    try {
      if (alreadyV4) {
        writeState(this.target.storage, existing);
        return existing;
      }
      for (const key of legacyKeys) this.target.storage.removeItem(key);
      const state = emptyState(app);
      writeState(this.target.storage, state);
      return state;
    } catch {
      // Do not copy a partially migrated payload. Start the migration again on one fallback backend.
      this.moveToFallback();
      try {
        if (alreadyV4) {
          writeState(this.target.storage, existing);
          return existing;
        }
        for (const key of legacyKeys) this.target.storage.removeItem(key);
        const state = emptyState(app);
        writeState(this.target.storage, state);
        return state;
      } catch {
        // Memory storage is deterministic; this is a defensive final fallback for hostile Storage mocks.
        this.target = { name: 'memory', storage: this.memory };
        const state = alreadyV4 ? existing : emptyState(app);
        writeState(this.memory, state);
        return state;
      }
    }
  }

  read(): CourseState {
    this.migrate();
    try { return normalise(this.target.storage); }
    catch { this.moveToFallback(); return this.migrate(); }
  }

  write(next: CourseState): CourseState {
    const state = this.sanitiseState(next);
    this.migrate();
    const previous = this.safeState();
    try {
      writeState(this.target.storage, state);
      return state;
    } catch {
      this.moveToFallback();
      return this.retryWrite(previous, state);
    }
  }

  update(change: (state: CourseState) => CourseState): CourseState {
    return this.write(change(this.read()));
  }

  setDone(done: number[]): CourseState { return this.update((state) => ({ ...state, done })); }
  markDone(day: number): CourseState { return this.update((state) => ({ ...state, done: [...state.done, day] })); }
  setPosition(key: string, pageId: string | null): CourseState {
    return this.update((state) => {
      const position = { ...state.position };
      if (pageId) position[key] = pageId; else delete position[key];
      return { ...state, position };
    });
  }
  setLast(day: number | null): CourseState { return this.update((state) => ({ ...state, last: day })); }
  setAction(pageId: string, value: ActionState | null): CourseState {
    return this.update((state) => {
      const actionState = { ...state.actionState };
      if (value) actionState[pageId] = value; else delete actionState[pageId];
      return { ...state, actionState };
    });
  }
  setChoice(key: string, value: string | null): CourseState {
    return this.update((state) => {
      const choice = { ...state.choice };
      if (value) choice[key] = value; else delete choice[key];
      return { ...state, choice };
    });
  }
  setApp(app: CourseApp | null): CourseState { return this.update((state) => ({ ...state, app })); }

  private chooseInitialTarget(): StorageTarget {
    if (this.hasSessionMarker() && this.sessionStorage && canWrite(this.sessionStorage)) {
      return { name: 'session', storage: this.sessionStorage };
    }
    if (this.localStorage && canWrite(this.localStorage)) return { name: 'local', storage: this.localStorage };
    return this.sessionTargetOrMemory();
  }

  private sessionTargetOrMemory(): StorageTarget {
    if (this.sessionStorage && canWrite(this.sessionStorage)) {
      try {
        this.sessionStorage.setItem(courseStorageKeys.backend, 'session');
        this.warn('session');
        return { name: 'session', storage: this.sessionStorage };
      } catch { /* Fall through to memory. */ }
    }
    this.warn('memory');
    return { name: 'memory', storage: this.memory };
  }

  private moveToFallback(): void {
    if (this.target.name === 'local') this.target = this.sessionTargetOrMemory();
    else if (this.target.name === 'session') {
      this.warn('memory');
      this.target = { name: 'memory', storage: this.memory };
    }
  }

  private warn(backend: StorageBackend): void {
    if (backend === 'local' || this.warned.has(backend)) return;
    this.warned.add(backend);
    this.onStorageWarning?.(backend === 'session'
      ? '이 브라우저에서는 이 탭을 닫기 전까지만 진도가 저장됩니다.'
      : '이 브라우저에서는 현재 화면을 닫기 전까지만 진도가 저장됩니다.');
  }

  private safeReadApp(storage: Storage): CourseApp | null {
    try { return validApp(storage.getItem(courseStorageKeys.app)); } catch { return null; }
  }

  private safeVersion(): string | null {
    try { return this.target.storage.getItem(courseStorageKeys.version); } catch { return null; }
  }

  private hasSessionMarker(): boolean {
    try { return this.sessionStorage?.getItem(courseStorageKeys.backend) === 'session'; }
    catch { return false; }
  }

  private safeState(): CourseState {
    try { return normalise(this.target.storage); } catch { return emptyState(); }
  }

  private retryWrite(previous: CourseState, state: CourseState): CourseState {
    try {
      this.migrate();
      // Preserve the last valid snapshot, then retry the whole requested operation on one backend.
      writeState(this.target.storage, previous);
      writeState(this.target.storage, state);
      return state;
    } catch {
      if (this.target.name === 'memory') throw new Error('Course storage is unavailable.');
      this.moveToFallback();
      this.migrate();
      writeState(this.target.storage, state);
      return state;
    }
  }

  private sanitiseState(state: CourseState): CourseState {
    const memory = memoryStorage();
    writeState(memory, { ...emptyState(), ...state, version: '4' });
    return normalise(memory);
  }
}

export const createCourseStore = (options?: CourseStoreOptions): CourseStore => new CourseStore(options);
