import { useCallback, useEffect, useRef, useState } from "react";
import {
  defaultData,
  loadData,
  saveData,
  todayKey,
  type MalaData,
  type MalaSettings,
} from "@/lib/mala";
import { playChime, playTick, vibrate } from "@/lib/feedback";

export function useMala() {
  const [data, setData] = useState<MalaData>(defaultData);
  const [ready, setReady] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const increment = useCallback(() => {
    setData((prev) => {
      const { sound, vibration, malaLength } = prev.settings;
      const key = todayKey();
      const day = prev.history[key] ?? { jaaps: 0, malas: 0 };
      const next = prev.count + 1;
      const complete = next >= malaLength;

      if (sound) complete ? playChime() : playTick();
      if (vibration) vibrate(complete ? [30, 60, 30, 60, 120] : 12);

      if (complete) {
        setCelebrating(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCelebrating(false), 2600);
      }

      return {
        ...prev,
        count: complete ? 0 : next,
        totalJaaps: prev.totalJaaps + 1,
        totalMalas: prev.totalMalas + (complete ? 1 : 0),
        history: {
          ...prev.history,
          [key]: { jaaps: day.jaaps + 1, malas: day.malas + (complete ? 1 : 0) },
        },
      };
    });
  }, []);

  const decrement = useCallback(() => {
    setData((prev) => {
      if (prev.count <= 0) return prev;
      if (prev.settings.vibration) vibrate(8);
      const key = todayKey();
      const day = prev.history[key] ?? { jaaps: 0, malas: 0 };
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

  return {
    data,
    ready,
    celebrating,
    increment,
    decrement,
    resetRound,
    resetAll,
    updateSettings,
  };
}
