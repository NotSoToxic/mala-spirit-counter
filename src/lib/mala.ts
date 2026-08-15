export type BeadTheme = "rudraksha" | "tulsi" | "sandalwood" | "gold";

export type MalaSettings = {
  sound: boolean;
  vibration: boolean;
  bead: BeadTheme;
  malaLength: number;
  dark: boolean;
};

export type DayEntry = { jaaps: number; malas: number };

export type MalaData = {
  count: number;
  totalJaaps: number;
  totalMalas: number;
  history: Record<string, DayEntry>;
  settings: MalaSettings;
};

export const STORAGE_KEY = "mala-jaap-v1";

export const MALA_LENGTHS = [27, 54, 108, 1008];

export const BEAD_THEMES: { id: BeadTheme; label: string; swatch: string }[] = [
  { id: "rudraksha", label: "Rudraksha", swatch: "var(--bead-rudraksha)" },
  { id: "tulsi", label: "Tulsi", swatch: "var(--bead-tulsi)" },
  { id: "sandalwood", label: "Sandalwood", swatch: "var(--bead-sandalwood)" },
  { id: "gold", label: "Gold", swatch: "var(--bead-gold)" },
];

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
    out.push({ key: cursor, entry: history[cursor] ?? { jaaps: 0, malas: 0 } });
    cursor = shiftDay(cursor, -1);
  }
  return out.reverse();
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
      history: parsed.history ?? {},
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
