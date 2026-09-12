export type BeadTheme = "rudraksha" | "tulsi" | "sandalwood" | "gold";

export type MalaSettings = {
  sound: boolean;
  vibration: boolean;
  bead: BeadTheme;
  malaLength: number;
  dark: boolean;
  reminder: boolean;
  reminderTime: string;
  mantra: string;
  dailyTarget: number;
};

export type DayEntry = {
  jaaps: number;
  malas: number;
  minutes: number;
  sankalpa: string;
};

export type MalaData = {
  count: number;
  totalJaaps: number;
  totalMalas: number;
  history: Record<string, DayEntry>;
  settings: MalaSettings;
};

export const STORAGE_KEY = "mala-jaap-v1";

export const MALA_LENGTHS = [27, 54, 108, 1008];

export const DAILY_TARGETS = [0, 1, 3, 5, 11] as const;

export const BEAD_THEMES: { id: BeadTheme; label: string; swatch: string; image: string }[] = [
  { id: "rudraksha", label: "Rudraksha", swatch: "var(--bead-rudraksha)", image: "/bead-rudraksha.jpg" },
  { id: "tulsi", label: "Tulsi", swatch: "var(--bead-tulsi)", image: "/bead-tulsi.jpg" },
  { id: "sandalwood", label: "Sandalwood", swatch: "var(--bead-sandalwood)", image: "/bead-sandalwood.jpg" },
  { id: "gold", label: "Gold", swatch: "var(--bead-gold)", image: "/bead-gold.jpg" },
];

/** Create a blank DayEntry with all fields initialized. */
export function emptyDay(): DayEntry {
  return { jaaps: 0, malas: 0, minutes: 0, sankalpa: "" };
}

/** Merge a potentially legacy DayEntry (missing new fields) with defaults. */
export function normalizeDay(raw: Partial<DayEntry> | undefined): DayEntry {
  const base = emptyDay();
  if (!raw) return base;
  return {
    jaaps: raw.jaaps ?? base.jaaps,
    malas: raw.malas ?? base.malas,
    minutes: raw.minutes ?? base.minutes,
    sankalpa: raw.sankalpa ?? base.sankalpa,
  };
}

export const defaultData = (): MalaData => ({
  count: 0,
  totalJaaps: 0,
  totalMalas: 0,
  history: {},
  settings: {
    sound: true,
    vibration: true,
    bead: "rudraksha",
    malaLength: 108,
    dark: false,
    reminder: false,
    reminderTime: "07:00",
    mantra: "",
    dailyTarget: 0,
  },
});

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function shiftDay(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

export function formatDay(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function currentStreak(history: Record<string, DayEntry>): number {
  let cursor = todayKey();
  if (!history[cursor]?.jaaps) {
    cursor = shiftDay(cursor, -1);
    if (!history[cursor]?.jaaps) return 0;
  }
  let streak = 0;
  while (history[cursor]?.jaaps) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function longestStreak(history: Record<string, DayEntry>): number {
  const days = Object.keys(history)
    .filter((k) => history[k]!.jaaps > 0)
    .sort();
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of days) {
    run = prev && shiftDay(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  return best;
}

export function lastNDays(history: Record<string, DayEntry>, n: number) {
  const out: { key: string; entry: DayEntry }[] = [];
  let cursor = todayKey();
  for (let i = 0; i < n; i++) {
    out.push({ key: cursor, entry: normalizeDay(history[cursor]) });
    cursor = shiftDay(cursor, -1);
  }
  return out.reverse();
}

/** Normalize all entries so legacy records gain new fields. */
function normalizeHistory(raw: Record<string, Partial<DayEntry>>): Record<string, DayEntry> {
  const out: Record<string, DayEntry> = {};
  for (const [k, v] of Object.entries(raw)) out[k] = normalizeDay(v);
  return out;
}

export function loadData(): MalaData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw) as Partial<MalaData>;
    const base = defaultData();
    return {
      ...base,
      ...parsed,
      history: normalizeHistory(parsed.history ?? {}),
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return defaultData();
  }
}

export function saveData(data: MalaData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}
