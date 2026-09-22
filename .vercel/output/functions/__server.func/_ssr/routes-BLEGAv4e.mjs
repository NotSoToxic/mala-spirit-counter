import { i as __toESM } from "../_runtime.mjs";
import { i as currentStreak, m as normalizeDay, t as BEAD_THEMES, y as todayKey } from "./mala-BEsTiUoh.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence, n as useMotionValue, t as useTransform } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { c as RotateCcw, f as Flame, h as ChartColumn, m as Check, n as Undo2, r as Timer, s as Settings } from "../_libs/lucide-react.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
import { t as useMala } from "./useMala-D0zAswDI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BLEGAv4e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RADIUS = 46;
var CIRC = 2 * Math.PI * RADIUS;
var SWIPE_THRESHOLD = 50;
/** Theme-aware particle SVG paths. */
var PARTICLE_SHAPES = {
	rudraksha: {
		d: "M4 0C4 0 8 5 8 8a4 4 0 1 1-8 0C0 5 4 0 4 0Z",
		viewBox: "0 0 8 12"
	},
	tulsi: {
		d: "M5 0C2 2 0 6 0 9c0 2 1 3 2 3s3-1 5-4c2-3 2-6 1-7S6-1 5 0Z",
		viewBox: "0 0 8 12"
	},
	sandalwood: {
		d: "M4 0Q8 4 4 10Q0 4 4 0Z",
		viewBox: "0 0 8 10"
	},
	gold: {
		d: "M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z",
		viewBox: "0 0 8 8"
	}
};
function BeadButton({ count, length, bead, celebrating, onTap, onUndo }) {
	const progress = Math.min(count / length, 1);
	const beadImage = BEAD_THEMES.find((t) => t.id === bead)?.image ?? BEAD_THEMES[0].image;
	const dragY = useMotionValue(0);
	const hintOpacity = useTransform(dragY, [0, SWIPE_THRESHOLD], [0, .7]);
	const handlePanEnd = (_, info) => {
		if (info.offset.y > SWIPE_THRESHOLD && onUndo) onUndo();
		dragY.set(0);
	};
	const handlePan = (_, info) => {
		if (info.offset.y > 0) dragY.set(info.offset.y);
	};
	const particle = PARTICLE_SHAPES[bead];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-bead": bead,
		className: "relative flex items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				className: "absolute h-[min(78vw,22rem)] w-[min(78vw,22rem)] -rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r: RADIUS,
					fill: "none",
					strokeWidth: "1.6",
					className: "stroke-border"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "50",
					cy: "50",
					r: RADIUS,
					fill: "none",
					strokeWidth: "2.4",
					strokeLinecap: "round",
					className: "stroke-accent",
					style: { strokeDasharray: CIRC },
					animate: { strokeDashoffset: CIRC * (1 - progress) },
					transition: {
						type: "spring",
						stiffness: 120,
						damping: 20
					}
				})]
			}),
			onUndo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute bottom-0 translate-y-[calc(100%+0.75rem)] text-muted-foreground",
				style: { opacity: hintOpacity },
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 4v12M5 11l5 5 5-5" })
				})
			}),
			celebrating && Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute",
				initial: {
					opacity: .9,
					scale: 1,
					x: 0,
					y: 0
				},
				animate: {
					opacity: 0,
					scale: .3,
					x: Math.cos(i / 14 * Math.PI * 2) * 180,
					y: Math.sin(i / 14 * Math.PI * 2) * 180,
					rotate: Math.random() * 360
				},
				transition: {
					duration: 1.6,
					ease: "easeOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "12",
					height: "14",
					viewBox: particle.viewBox,
					className: "fill-accent",
					style: { filter: "drop-shadow(0 0 4px var(--saffron))" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: particle.d })
				})
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
				type: "button",
				onClick: onTap,
				onPan: handlePan,
				onPanEnd: handlePanEnd,
				"aria-label": "Count one jaap",
				className: "bead-surface relative flex h-[min(58vw,16rem)] w-[min(58vw,16rem)] select-none items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/60 overflow-hidden",
				whileTap: { scale: .93 },
				animate: {
					scale: celebrating ? [
						1,
						1.06,
						1
					] : [
						1,
						1.015,
						1
					],
					filter: celebrating ? "drop-shadow(0 0 60px var(--saffron))" : "drop-shadow(0 0 22px color-mix(in oklab, var(--saffron) 30%, transparent))"
				},
				transition: { scale: celebrating ? {
					duration: 1.2,
					ease: "easeInOut"
				} : {
					duration: 4.5,
					repeat: Infinity,
					ease: "easeInOut"
				} },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: beadImage,
					alt: "",
					"aria-hidden": true,
					className: "absolute inset-0 h-full w-full rounded-full object-cover",
					style: { mixBlendMode: "multiply" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "pointer-events-none relative flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-6xl font-semibold leading-none text-primary-foreground drop-shadow-md sm:text-7xl",
						children: count
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 text-xs uppercase tracking-[0.35em] text-primary-foreground/70",
						children: ["of ", length]
					})]
				})]
			})
		]
	});
}
function CounterScreen() {
	const { data, ready, celebrating, sessionMinutes, increment, decrement, resetRound, setSankalpa } = useMala();
	const today = normalizeDay(data.history[todayKey()]);
	const streak = currentStreak(data.history);
	const { mantra, dailyTarget } = data.settings;
	const [targetReached, setTargetReached] = (0, import_react.useState)(false);
	const prevMalas = (0, import_react.useRef)(today.malas);
	(0, import_react.useEffect)(() => {
		if (dailyTarget > 0 && today.malas >= dailyTarget && prevMalas.current < dailyTarget) {
			setTargetReached(true);
			const t = setTimeout(() => setTargetReached(false), 3e3);
			return () => clearTimeout(t);
		}
		prevMalas.current = today.malas;
	}, [today.malas, dailyTarget]);
	const [editingSankalpa, setEditingSankalpa] = (0, import_react.useState)(false);
	const [sankalpaText, setSankalpaText] = (0, import_react.useState)(today.sankalpa);
	const sankalpaRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setSankalpaText(today.sankalpa);
	}, [today.sankalpa]);
	(0, import_react.useEffect)(() => {
		if (editingSankalpa && sankalpaRef.current) sankalpaRef.current.focus();
	}, [editingSankalpa]);
	const commitSankalpa = () => {
		setEditingSankalpa(false);
		setSankalpa(sankalpaText.trim());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-5 pb-6 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative flex w-full max-w-md items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl tracking-wide text-foreground",
					children: "Mala Jaap Counter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/stats",
						"aria-label": "Stats and history",
						className: "rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settings",
						"aria-label": "Settings",
						className: "rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col items-center gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: celebrating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "pointer-events-none fixed inset-0 bg-accent",
						initial: { opacity: 0 },
						animate: { opacity: [
							0,
							.35,
							0
						] },
						exit: { opacity: 0 },
						transition: {
							duration: 1.8,
							ease: "easeOut"
						}
					}, "glow") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeadButton, {
						count: data.count,
						length: data.settings.malaLength,
						bead: data.settings.bead,
						celebrating,
						onTap: increment,
						onUndo: decrement
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: celebrating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -8
								},
								className: "font-display text-lg text-primary",
								children: "Mala Complete 🙏 - one more step on your journey"
							}, "done") : targetReached ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -8
								},
								className: "font-display text-lg text-primary",
								children: "Daily goal reached 🙏"
							}, "target") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "flex flex-col items-center gap-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: ready ? "Tap the bead with each mantra" : " "
								}), mantra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-sm italic text-primary/80",
									children: mantra
								})]
							}, "idle")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative w-full max-w-md space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center min-h-8",
						children: editingSankalpa ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								commitSankalpa();
							},
							className: "flex w-full max-w-xs items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: sankalpaRef,
								type: "text",
								value: sankalpaText,
								onChange: (e) => setSankalpaText(e.target.value),
								onBlur: commitSankalpa,
								placeholder: "Your intention for today…",
								maxLength: 120,
								className: "w-full border-b border-transparent bg-transparent px-1 py-1 text-center text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus-visible:border-primary"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEditingSankalpa(true),
							className: "text-center text-sm transition-colors hover:text-foreground",
							children: today.sankalpa ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "italic text-foreground/80",
								children: [
									"“",
									today.sankalpa,
									"”"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground/60",
								children: "Set today's intention…"
							})
						})
					}),
					dailyTarget > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrine-card flex items-center gap-3 rounded-2xl px-4 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-sm text-foreground",
									children: [
										Math.min(today.malas, dailyTarget),
										" / ",
										dailyTarget,
										" malas"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "h-full rounded-full bg-accent",
									initial: { width: 0 },
									animate: { width: `${Math.min(today.malas / dailyTarget * 100, 100)}%` },
									transition: {
										type: "spring",
										stiffness: 80,
										damping: 18
									}
								})
							})]
						}), today.malas >= dailyTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: { scale: 0 },
							animate: { scale: 1 },
							className: "flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrine-card grid grid-cols-3 rounded-2xl px-2 py-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Today",
								value: `${today.malas} malas`,
								sub: sessionMinutes > 0 || today.minutes > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-center gap-1 text-[0.6rem] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "h-3 w-3" }),
										today.minutes + sessionMinutes,
										" min"
									]
								}) : void 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Lifetime",
								value: `${data.totalMalas} malas`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Streak",
								value: `${streak} ${streak === 1 ? "day" : "days"}`,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									animate: {
										scale: [
											1,
											1.15,
											1
										],
										opacity: [
											.75,
											1,
											.75
										]
									},
									transition: {
										duration: 2.4,
										repeat: Infinity,
										ease: "easeInOut"
									},
									className: "text-accent",
									style: { display: "inline-flex" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
										className: "h-4 w-4",
										style: { filter: streak > 0 ? "drop-shadow(0 0 6px var(--saffron))" : "none" }
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionButton, {
							onClick: decrement,
							label: "Undo one",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "h-5 w-5" }), "Undo"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionButton, {
							onClick: resetRound,
							label: "Reset current round",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-5 w-5" }), "Reset round"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-[0.7rem] leading-relaxed text-muted-foreground",
						children: [
							"Saved only on this device's local cache.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/install",
								className: "underline underline-offset-4 hover:text-foreground",
								children: "Install"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/faq",
								className: "underline underline-offset-4 hover:text-foreground",
								children: "FAQ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "underline underline-offset-4 hover:text-foreground",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-1",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "underline underline-offset-4 hover:text-foreground",
								children: "Terms"
							})
						]
					})
				]
			})
		]
	});
}
function Stat({ label, value, icon, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5 font-display text-lg text-foreground",
				children: [icon, value]
			}),
			sub
		]
	});
}
function ActionButton({ onClick, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		type: "button",
		onClick,
		"aria-label": label,
		whileTap: { scale: .95 },
		className: "shrine-card flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-sm text-foreground transition-colors hover:bg-secondary",
		children
	});
}
//#endregion
export { CounterScreen as component };
