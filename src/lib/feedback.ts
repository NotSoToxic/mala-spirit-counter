import { nativeHaptic } from "./native";

let ctx: AudioContext | null = null;

/** unsupported = no Web Audio at all; locked = waiting for a user tap; ready = playing; blocked = tap happened but the browser still refuses. */
export type AudioState = "unsupported" | "locked" | "ready" | "blocked";

let state: AudioState = "locked";
const listeners = new Set<(s: AudioState) => void>();

function setState(next: AudioState) {
  if (state === next) return;
  state = next;
  listeners.forEach((l) => l(next));
}

export function getAudioState(): AudioState {
  return state;
}

export function subscribeAudioState(fn: (s: AudioState) => void) {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function ctor() {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ??
    null
  );
}

/**
 * iOS Safari only allows an AudioContext to start inside a user gesture.
 * Call this from a real tap/click handler; it creates + resumes the context
 * and plays a silent buffer to fully unlock playback.
 */
export function unlockAudio(): boolean {
  const Ctor = ctor();
  if (!Ctor) {
    setState("unsupported");
    return false;
  }
  try {
    if (!ctx) ctx = new Ctor();
    void ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    // Give Safari a tick to settle the state before judging it.
    window.setTimeout(() => {
      setState(ctx && ctx.state === "running" ? "ready" : "blocked");
    }, 120);
    setState(ctx.state === "running" ? "ready" : state === "ready" ? "ready" : "locked");
    return true;
  } catch {
    setState("blocked");
    return false;
  }
}

let listening = false;

/** Registers one-shot listeners so the very first tap anywhere enables sound. */
export function initAudioUnlock() {
  if (typeof window === "undefined" || listening) return;
  listening = true;
  if (!ctor()) {
    setState("unsupported");
    return;
  }
  const handler = () => unlockAudio();
  const opts = { passive: true } as const;
  window.addEventListener("pointerdown", handler, opts);
  window.addEventListener("touchend", handler, opts);
  window.addEventListener("keydown", handler);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && ctx && ctx.state !== "running")
      setState("locked");
  });
}

function audio(): AudioContext | null {
  const Ctor = ctor();
  if (!Ctor) {
    setState("unsupported");
    return null;
  }
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") {
    void ctx.resume();
    setState("locked");
  } else if (ctx.state === "running") {
    setState("ready");
  }
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
