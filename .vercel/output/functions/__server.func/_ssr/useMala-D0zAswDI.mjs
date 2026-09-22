import { i as __toESM } from "../_runtime.mjs";
import { _ as saveData, a as defaultData, f as loadData, g as playTick, h as playChime, m as normalizeDay, x as vibrate, y as todayKey } from "./mala-BEsTiUoh.mjs";
import { _ as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useMala-D0zAswDI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var IDLE_TIMEOUT_MS = 6e4;
function useMala() {
	const [data, setData] = (0, import_react.useState)(defaultData);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [celebrating, setCelebrating] = (0, import_react.useState)(false);
	const celebTimer = (0, import_react.useRef)(null);
	const sessionStart = (0, import_react.useRef)(null);
	const lastTap = (0, import_react.useRef)(null);
	const idleTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setData(loadData());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (ready) saveData(data);
	}, [data, ready]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		document.documentElement.classList.toggle("dark", data.settings.dark);
	}, [ready, data.settings.dark]);
	(0, import_react.useEffect)(() => () => {
		if (celebTimer.current) clearTimeout(celebTimer.current);
	}, []);
	(0, import_react.useEffect)(() => () => {
		if (idleTimer.current) clearTimeout(idleTimer.current);
	}, []);
	/** Flush accumulated session seconds into today's minutes. */
	const flushSession = (0, import_react.useCallback)(() => {
		if (!sessionStart.current || !lastTap.current) return;
		const elapsed = lastTap.current - sessionStart.current;
		const mins = Math.round(elapsed / 6e4);
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
					[key]: {
						...day,
						minutes: day.minutes + mins
					}
				}
			};
		});
	}, []);
	/** Mark a tap for the session timer. Starts session on first tap, resets idle timeout. */
	const recordTap = (0, import_react.useCallback)(() => {
		const now = Date.now();
		if (!sessionStart.current) sessionStart.current = now;
		lastTap.current = now;
		if (idleTimer.current) clearTimeout(idleTimer.current);
		idleTimer.current = setTimeout(flushSession, IDLE_TIMEOUT_MS);
	}, [flushSession]);
	(0, import_react.useEffect)(() => {
		const onVisChange = () => {
			if (document.visibilityState === "hidden") flushSession();
		};
		document.addEventListener("visibilitychange", onVisChange);
		return () => document.removeEventListener("visibilitychange", onVisChange);
	}, [flushSession]);
	const increment = (0, import_react.useCallback)(() => {
		recordTap();
		setData((prev) => {
			const { sound, vibration, malaLength } = prev.settings;
			const key = todayKey();
			const day = normalizeDay(prev.history[key]);
			const next = prev.count + 1;
			const complete = next >= malaLength;
			if (sound) {
				if (complete) playChime();
				else playTick();
			}
			if (vibration) vibrate(complete ? [
				30,
				60,
				30,
				60,
				120
			] : 12);
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
					[key]: {
						...day,
						jaaps: day.jaaps + 1,
						malas: day.malas + (complete ? 1 : 0)
					}
				}
			};
		});
	}, [recordTap]);
	const decrement = (0, import_react.useCallback)(() => {
		setData((prev) => {
			if (prev.count <= 0) return prev;
			if (prev.settings.vibration) vibrate(8);
			const key = todayKey();
			const day = normalizeDay(prev.history[key]);
			return {
				...prev,
				count: prev.count - 1,
				totalJaaps: Math.max(0, prev.totalJaaps - 1),
				history: {
					...prev.history,
					[key]: {
						...day,
						jaaps: Math.max(0, day.jaaps - 1)
					}
				}
			};
		});
	}, []);
	const resetRound = (0, import_react.useCallback)(() => setData((p) => ({
		...p,
		count: 0
	})), []);
	const resetAll = (0, import_react.useCallback)(() => setData((p) => ({
		...defaultData(),
		settings: p.settings
	})), []);
	const updateSettings = (0, import_react.useCallback)((patch) => setData((p) => ({
		...p,
		settings: {
			...p.settings,
			...patch
		}
	})), []);
	const setSankalpa = (0, import_react.useCallback)((text) => {
		setData((prev) => {
			const key = todayKey();
			const day = normalizeDay(prev.history[key]);
			return {
				...prev,
				history: {
					...prev.history,
					[key]: {
						...day,
						sankalpa: text
					}
				}
			};
		});
	}, []);
	return {
		data,
		ready,
		celebrating,
		sessionMinutes: (() => {
			if (!sessionStart.current || !lastTap.current) return 0;
			return Math.round((lastTap.current - sessionStart.current) / 6e4);
		})(),
		increment,
		decrement,
		resetRound,
		resetAll,
		updateSettings,
		setSankalpa
	};
}
//#endregion
export { useMala as t };
