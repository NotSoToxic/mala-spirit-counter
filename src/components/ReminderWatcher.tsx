import { useEffect } from "react";
import { loadData, todayKey } from "@/lib/mala";
import { maybeFireWebReminder } from "@/lib/reminder";

/** Checks periodically whether today's reminder should be shown. */
export function ReminderWatcher() {
  useEffect(() => {
    const check = () => {
      const data = loadData();
      maybeFireWebReminder({
        enabled: data.settings.reminder,
        time: data.settings.reminderTime,
        jaapsToday: data.history[todayKey()]?.jaaps ?? 0,
      });
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
