//#region node_modules/.nitro/vite/services/ssr/assets/mala-BEsTiUoh.js
function isNative() {
	if (typeof window === "undefined") return false;
	const cap = window.Capacitor;
	return Boolean(cap?.isNativePlatform?.());
}
/** Native haptic tap. Returns false when unavailable so callers can fall back. */
function nativeHaptic(strength = "light") {
	if (!isNative()) return false;
	(async () => {
		try {
			const { Haptics, ImpactStyle } = await import("../_libs/capacitor__haptics.mjs").then((n) => n.t);
			const style = strength === "heavy" ? ImpactStyle.Heavy : strength === "medium" ? ImpactStyle.Medium : ImpactStyle.Light;
			await Haptics.impact({ style });
		} catch {}
	})();
	return true;
}
/** Configure status bar and dismiss the splash screen once the app is ready. */
function initNativeShell() {
	if (!isNative()) return;
	(async () => {
		try {
			const { StatusBar, Style } = await import("../_libs/capacitor__status-bar.mjs").then((n) => n.t);
			await StatusBar.setStyle({ style: Style.Dark });
			await StatusBar.setOverlaysWebView({ overlay: true });
		} catch {}
		try {
			const { SplashScreen } = await import("../_libs/capacitor__splash-screen.mjs").then((n) => n.t);
			await SplashScreen.hide();
		} catch {}
	})();
}
var ctx = null;
var state = "locked";
var listeners = /* @__PURE__ */ new Set();
function setState(next) {
	if (state === next) return;
	state = next;
	listeners.forEach((l) => l(next));
}
function getAudioState() {
	return state;
}
function subscribeAudioState(fn) {
	listeners.add(fn);
	fn(state);
	return () => listeners.delete(fn);
}
function ctor() {
	if (typeof window === "undefined") return null;
	return window.AudioContext ?? window.webkitAudioContext ?? null;
}
/**
* iOS Safari only allows an AudioContext to start inside a user gesture.
* Call this from a real tap/click handler; it creates + resumes the context
* and plays a silent buffer to fully unlock playback.
*/
function unlockAudio() {
	const Ctor = ctor();
	if (!Ctor) {
		setState("unsupported");
		return false;
	}
	try {
		if (!ctx) ctx = new Ctor();
		ctx.resume();
		const buf = ctx.createBuffer(1, 1, 22050);
		const src = ctx.createBufferSource();
		src.buffer = buf;
		src.connect(ctx.destination);
		src.start(0);
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
var listening = false;
/** Registers one-shot listeners so the very first tap anywhere enables sound. */
function initAudioUnlock() {
	if (typeof window === "undefined" || listening) return;
	listening = true;
	if (!ctor()) {
		setState("unsupported");
		return;
	}
	const handler = () => unlockAudio();
	const opts = { passive: true };
	window.addEventListener("pointerdown", handler, opts);
	window.addEventListener("touchend", handler, opts);
	window.addEventListener("keydown", handler);
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible" && ctx && ctx.state !== "running") setState("locked");
	});
}
function audio() {
	const Ctor = ctor();
	if (!Ctor) {
		setState("unsupported");
		return null;
	}
	if (!ctx) ctx = new Ctor();
	if (ctx.state === "suspended") {
		ctx.resume();
		setState("locked");
	} else if (ctx.state === "running") setState("ready");
	return ctx;
}
function tone(freq, duration, gainPeak, delay = 0) {
	const ac = audio();
	if (!ac) return;
	const osc = ac.createOscillator();
	const gain = ac.createGain();
	osc.type = "sine";
	osc.frequency.value = freq;
	const start = ac.currentTime + delay;
	gain.gain.setValueAtTime(1e-4, start);
	gain.gain.exponentialRampToValueAtTime(gainPeak, start + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, start + duration);
	osc.connect(gain).connect(ac.destination);
	osc.start(start);
	osc.stop(start + duration + .05);
}
/** Soft wooden bead click on each jaap. */
function playTick() {
	tone(660, .16, .06);
	tone(990, .1, .025);
}
/** Temple-bell style chime on mala completion. */
function playChime() {
	tone(528, 2.4, .14);
	tone(792, 2, .07, .02);
	tone(1056, 1.6, .035, .05);
	tone(396, 2.8, .06, .1);
}
function vibrate(pattern) {
	const total = Array.isArray(pattern) ? pattern.reduce((a, b) => a + b, 0) : pattern;
	if (nativeHaptic(total > 200 ? "heavy" : total > 40 ? "medium" : "light")) return;
	if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
	try {
		navigator.vibrate(pattern);
	} catch {}
}
var STORAGE_KEY = "mala-jaap-v1";
var MALA_LENGTHS = [
	27,
	54,
	108,
	1008
];
var DAILY_TARGETS = [
	0,
	1,
	3,
	5,
	11
];
var BEAD_THEMES = [
	{
		id: "rudraksha",
		label: "Rudraksha",
		swatch: "var(--bead-rudraksha)",
		image: "/bead-rudraksha.jpg"
	},
	{
		id: "tulsi",
		label: "Tulsi",
		swatch: "var(--bead-tulsi)",
		image: "/bead-tulsi.jpg"
	},
	{
		id: "sandalwood",
		label: "Sandalwood",
		swatch: "var(--bead-sandalwood)",
		image: "/bead-sandalwood.jpg"
	},
	{
		id: "gold",
		label: "Gold",
		swatch: "var(--bead-gold)",
		image: "/bead-gold.jpg"
	}
];
/** Create a blank DayEntry with all fields initialized. */
function emptyDay() {
	return {
		jaaps: 0,
		malas: 0,
		minutes: 0,
		sankalpa: ""
	};
}
/** Merge a potentially legacy DayEntry (missing new fields) with defaults. */
function normalizeDay(raw) {
	const base = emptyDay();
	if (!raw) return base;
	return {
		jaaps: raw.jaaps ?? base.jaaps,
		malas: raw.malas ?? base.malas,
		minutes: raw.minutes ?? base.minutes,
		sankalpa: raw.sankalpa ?? base.sankalpa
	};
}
var defaultData = () => ({
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
		dailyTarget: 0
	}
});
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function shiftDay(key, days) {
	const [y, m, d] = key.split("-").map(Number);
	const date = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
	date.setDate(date.getDate() + days);
	return todayKey(date);
}
function formatDay(key) {
	const [y, m, d] = key.split("-").map(Number);
	return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).toLocaleDateString(void 0, {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
}
function currentStreak(history) {
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
function longestStreak(history) {
	const days = Object.keys(history).filter((k) => history[k].jaaps > 0).sort();
	let best = 0;
	let run = 0;
	let prev = null;
	for (const day of days) {
		run = prev && shiftDay(prev, 1) === day ? run + 1 : 1;
		best = Math.max(best, run);
		prev = day;
	}
	return best;
}
function lastNDays(history, n) {
	const out = [];
	let cursor = todayKey();
	for (let i = 0; i < n; i++) {
		out.push({
			key: cursor,
			entry: normalizeDay(history[cursor])
		});
		cursor = shiftDay(cursor, -1);
	}
	return out.reverse();
}
/** Normalize all entries so legacy records gain new fields. */
function normalizeHistory(raw) {
	const out = {};
	for (const [k, v] of Object.entries(raw)) out[k] = normalizeDay(v);
	return out;
}
function loadData() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultData();
		const parsed = JSON.parse(raw);
		const base = defaultData();
		return {
			...base,
			...parsed,
			history: normalizeHistory(parsed.history ?? {}),
			settings: {
				...base.settings,
				...parsed.settings ?? {}
			}
		};
	} catch {
		return defaultData();
	}
}
function saveData(data) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch {}
}
//#endregion
export { saveData as _, defaultData as a, unlockAudio as b, initAudioUnlock as c, lastNDays as d, loadData as f, playTick as g, playChime as h, currentStreak as i, initNativeShell as l, normalizeDay as m, DAILY_TARGETS as n, formatDay as o, longestStreak as p, MALA_LENGTHS as r, getAudioState as s, BEAD_THEMES as t, isNative as u, subscribeAudioState as v, vibrate as x, todayKey as y };
