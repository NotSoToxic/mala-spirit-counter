import { isNative } from "./native";
import { todayKey } from "./mala";

export const REMINDER_TITLE = "Time for your jaap 🪔";
export const REMINDER_BODY = "A few quiet minutes with your mala await you.";

const LAST_SHOWN_KEY = "mala-jaap-reminder-last";
const NATIVE_ID = 1081;

export function notificationsSupported(): boolean {
  return typeof window !== "undefined" && ("Notification" in window || isNative());
}

export function notificationPermission(): NotificationPermission | "unsupported" {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  return Notification.permission;
}

/** Ask the OS/browser for permission. Returns true when reminders can fire. */
export async function requestReminderPermission(): Promise<boolean> {
  if (isNative()) {
    try {
      const { LocalNotifications } = await import("@capacitor/local-notifications");
      const res = await LocalNotifications.requestPermissions();
      return res.display === "granted";
    } catch {
      return false;
    }
  }
  if (typeof window === "undefined" || !("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  try {
    return (await Notification.requestPermission()) === "granted";
  } catch {
    return false;
  }
}

function parseTime(time: string): { hour: number; minute: number } {
  const [h, m] = time.split(":").map(Number);
  return { hour: Number.isFinite(h) ? h! : 7, minute: Number.isFinite(m) ? m! : 0 };
}

/** Keep the native daily notification in sync with the user's settings. */
export async function syncNativeReminder(enabled: boolean, time: string): Promise<void> {
  if (!isNative()) return;
  try {
    const { LocalNotifications } = await import("@capacitor/local-notifications");
    await LocalNotifications.cancel({ notifications: [{ id: NATIVE_ID }] }).catch(() => {});
    if (!enabled) return;
    const { hour, minute } = parseTime(time);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: NATIVE_ID,
          title: REMINDER_TITLE,
          body: REMINDER_BODY,
          schedule: { on: { hour, minute }, allowWhileIdle: true },
        },
      ],
    });
  } catch {
    /* plugin unavailable */
  }
}

function alreadyShownToday(): boolean {
  try {
    return localStorage.getItem(LAST_SHOWN_KEY) === todayKey();
  } catch {
    return true;
  }
}

function markShownToday() {
  try {
    localStorage.setItem(LAST_SHOWN_KEY, todayKey());
  } catch {
    /* ignore */
  }
}

/**
 * Web fallback: while the app (or its service worker page) is open, fire a
 * single reminder once the chosen time passes and no jaap was logged today.
 */
export function maybeFireWebReminder(opts: {
  enabled: boolean;
  time: string;
  jaapsToday: number;
}): void {
  if (isNative()) return;
  if (!opts.enabled || opts.jaapsToday > 0) return;
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (alreadyShownToday()) return;

  const { hour, minute } = parseTime(opts.time);
  const now = new Date();
  const due = now.getHours() * 60 + now.getMinutes() >= hour * 60 + minute;
  if (!due) return;

  try {
    new Notification(REMINDER_TITLE, { body: REMINDER_BODY, icon: "/icon-192.png" });
    markShownToday();
  } catch {
    /* ignore */
  }
}
