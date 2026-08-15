import { nativeHaptic } from "./native";

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, gainPeak: number, delay = 0) {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  const start = ac.currentTime + delay;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainPeak, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

/** Soft wooden bead click on each jaap. */
export function playTick() {
  tone(660, 0.16, 0.06);
  tone(990, 0.1, 0.025);
}

/** Temple-bell style chime on mala completion. */
export function playChime() {
  tone(528, 2.4, 0.14);
  tone(792, 2.0, 0.07, 0.02);
  tone(1056, 1.6, 0.035, 0.05);
  tone(396, 2.8, 0.06, 0.1);
}

export function vibrate(pattern: number | number[]) {
  // In the native app shell, use real device haptics instead of the web API.
  const total = Array.isArray(pattern) ? pattern.reduce((a, b) => a + b, 0) : pattern;
  if (nativeHaptic(total > 200 ? "heavy" : total > 40 ? "medium" : "light")) return;
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* unsupported */
  }
}
