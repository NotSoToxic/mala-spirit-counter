import { d as lastNDays, i as currentStreak, o as formatDay, p as longestStreak } from "./mala-BEsTiUoh.mjs";
import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
import { t as useMala } from "./useMala-D0zAswDI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-CCH1pq6I.js
var import_jsx_runtime = require_jsx_runtime();
function StatsScreen() {
	const { data } = useMala();
	const days = lastNDays(data.history, 30);
	const max = Math.max(1, ...days.map((d) => d.entry.jaaps));
	const recent = [...days].reverse().filter((d) => d.entry.jaaps > 0);
	const totalMinutes = Object.values(data.history).reduce((sum, d) => sum + (d.minutes ?? 0), 0);
	const totalHours = Math.floor(totalMinutes / 60);
	const remainMins = totalMinutes % 60;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen px-5 pb-12 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-md space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Back to counter",
						className: "rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl text-foreground",
						children: "Your journey"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: "Total jaaps",
							value: data.totalJaaps
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: "Total malas",
							value: data.totalMalas
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: "Current streak",
							value: `${currentStreak(data.history)} d`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: "Longest streak",
							value: `${longestStreak(data.history)} d`
						}),
						totalMinutes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
							label: "Practice time",
							value: totalHours > 0 ? `${totalHours}h ${remainMins}m` : `${remainMins} min`,
							span2: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shrine-card rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-foreground",
						children: "Last 30 days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex h-24 items-end gap-1",
						children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							title: `${formatDay(d.key)} - ${d.entry.jaaps} jaaps`,
							className: "flex-1 rounded-t bg-accent/70",
							initial: { height: 0 },
							animate: { height: `${Math.max(3, d.entry.jaaps / max * 100)}%` },
							transition: {
								duration: .5,
								ease: "easeOut"
							}
						}, d.key))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-foreground",
							children: "Daily log"
						}),
						recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No jaaps logged yet. Your practice will appear here."
						}),
						recent.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrine-card flex items-center justify-between rounded-xl px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-foreground",
								children: formatDay(d.key)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: [
									d.entry.malas,
									" malas · ",
									d.entry.jaaps,
									" jaaps",
									d.entry.minutes > 0 ? ` · ${d.entry.minutes} min` : ""
								]
							})]
						}, d.key))
					]
				})
			]
		})]
	});
}
function Tile({ label, value, span2 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `shrine-card rounded-2xl px-4 py-5 text-center${span2 ? " col-span-2" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-3xl text-primary",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { StatsScreen as component };
