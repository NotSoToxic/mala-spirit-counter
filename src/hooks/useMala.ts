import { useCallback, useEffect, useRef, useState } from "react";
import {
  defaultData,
  emptyDay,
  loadData,
  normalizeDay,
  saveData,
  todayKey,
  type MalaData,
  type MalaSettings,
} from "@/lib/mala";
import { playChime, playTick, vibrate } from "@/lib/feedback";

const IDLE_TIMEOUT_MS = 60_000; // flush session after 60 s of no taps

export function useMala() {
  const [data, setData] = useState<MalaData>(defaultData);
  const [ready, setReady] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const celebTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Session timer refs (not in state — avoids re-renders every second)
  const sessionStart = useRef<number | null>(null);
  const lastTap = useRef<number | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setData(loadData());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveData(data);
  }, [data, ready]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", data.settings.dark);
  }, [ready, data.settings.dark]);

  useEffect(() => () => { if (celebTimer.current) clearTimeout(celebTimer.current); }, []);

  // Clean up idle timer on unmount
  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  /** Flush accumulated session seconds into today's minutes. */
  const flushSession = useCallback(() => {
    if (!sessionStart.current || !lastTap.current) return;
    const elapsed = lastTap.current - sessionStart.current;
    const mins = Math.round(elapsed / 60_000);
    sessionStart.current = null;
    lastTap.current = null;
    if (mins <= 0) return;
    setData((prev) => {
      const key = todayKey();
      const day = normalizeDay(prev.history[key]);
      return {
        ...prev,
        history: {
          ...prev.history,
          [key]: { ...day, minutes: day.minutes + mins },
        },
      };
    });
  }, []);

  /** Mark a tap for the session timer. Starts session on first tap, resets idle timeout. */
  const recordTap = useCallback(() => {
    const now = Date.now();
    if (!sessionStart.current) sessionStart.current = now;
    lastTap.current = now;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(flushSession, IDLE_TIMEOUT_MS);
  }, [flushSession]);

  // Flush session when the page is hidden (user switches app / locks phone)
  useEffect(() => {
    const onVisChange = () => {
      if (document.visibilityState === "hidden") flushSession();
    };
    document.addEventListener("visibilitychange", onVisChange);
    return () => document.removeEventListener("visibilitychange", onVisChange);
  }, [flushSession]);

  const increment = useCallback(() => {
    recordTap();
    setData((prev) => {
      const { sound, vibration, malaLength } = prev.settings;
      const key = todayKey();
      const day = normalizeDay(prev.history[key]);
      const next = prev.count + 1;
      const complete = next >= malaLength;

      if (sound) complete ? playChime() : playTick();
      if (vibration) vibrate(complete ? [30, 60, 30, 60, 120] : 12);

      if (complete) {
        setCelebrating(true);
        if (celebTimer.current) clearTimeout(celebTimer.current);
        celebTimer.current = setTimeout(() => setCelebrating(false), 2600);
      }

      return {
        ...prev,
        count: complete ? 0 : next,
        totalJaaps: prev.totalJaaps + 1,
        totalMalas: prev.totalMalas + (complete ? 1 : 0),
        history: {
          ...prev.history,
          [key]: { ...day, jaaps: day.jaaps + 1, malas: day.malas + (complete ? 1 : 0) },
        },
      };
    });
  }, [recordTap]);

  const decrement = useCallback(() => {
    setData((prev) => {
      if (prev.count <= 0) return prev;
      if (prev.settings.vibration) vibrate(8);
      const key = todayKey();
      const day = normalizeDay(prev.history[key]);
      return {
        ...prev,
        count: prev.count - 1,
        totalJaaps: Math.max(0, prev.totalJaaps - 1),
        history: { ...prev.history, [key]: { ...day, jaaps: Math.max(0, day.jaaps - 1) } },
      };
    });
  }, []);

  const resetRound = useCallback(() => setData((p) => ({ ...p, count: 0 })), []);

  const resetAll = useCallback(
    () => setData((p) => ({ ...defaultData(), settings: p.settings })),
    [],
  );

  const updateSettings = useCallback(
    (patch: Partial<MalaSettings>) =>
      setData((p) => ({ ...p, settings: { ...p.settings, ...patch } })),
    [],
  );

  const setSankalpa = useCallback((text: string) => {
    setData((prev) => {
      const key = todayKey();
      const day = normalizeDay(prev.history[key]);
      return {
        ...prev,
        history: { ...prev.history, [key]: { ...day, sankalpa: text } },
      };
    });
  }, []);

  /** Active session duration in minutes (live, for display). */
  const sessionMinutes = (() => {
    if (!sessionStart.current || !lastTap.current) return 0;
    return Math.round((lastTap.current - sessionStart.current) / 60_000);
  })();

  return {
    data,
    ready,
    celebrating,
    sessionMinutes,
    increment,
    decrement,
    resetRound,
    resetAll,
    updateSettings,
    setSankalpa,
  };
}
