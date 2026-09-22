import { i as __toESM } from "../_runtime.mjs";
import { b as unlockAudio, h as playChime, n as DAILY_TARGETS, r as MALA_LENGTHS, s as getAudioState, t as BEAD_THEMES, u as isNative, v as subscribeAudioState } from "./mala-BEsTiUoh.mjs";
import { _ as require_react, a as Overlay2, c as Title2, g as require_jsx_runtime, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, u as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Smartphone, p as ChevronLeft, t as Volume2, u as Info } from "../_libs/lucide-react.mjs";
import { a as requestReminderPermission, o as syncNativeReminder } from "./router-kxbmTZL7.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
import { t as useMala } from "./useMala-D0zAswDI.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CqiVPp0e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function SettingsScreen() {
	const { data, updateSettings, resetAll } = useMala();
	const [confirming, setConfirming] = (0, import_react.useState)(false);
	const [reminderBlocked, setReminderBlocked] = (0, import_react.useState)(false);
	const [noVibrationSupport, setNoVibrationSupport] = (0, import_react.useState)(false);
	const [audioState, setAudioState] = (0, import_react.useState)(() => getAudioState());
	const s = data.settings;
	(0, import_react.useEffect)(() => {
		if (isNative()) return;
		setNoVibrationSupport(typeof navigator !== "undefined" && !("vibrate" in navigator));
	}, []);
	(0, import_react.useEffect)(() => {
		const unsub = subscribeAudioState(setAudioState);
		return () => {
			unsub();
		};
	}, []);
	const toggleReminder = async (on) => {
		if (!on) {
			updateSettings({ reminder: false });
			syncNativeReminder(false, s.reminderTime);
			return;
		}
		const granted = await requestReminderPermission();
		setReminderBlocked(!granted);
		if (!granted) return;
		updateSettings({ reminder: true });
		syncNativeReminder(true, s.reminderTime);
	};
	const changeReminderTime = (time) => {
		updateSettings({ reminderTime: time });
		if (s.reminder) syncNativeReminder(true, time);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen px-5 pb-12 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							children: "Settings"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-1 rounded-2xl p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: ["Sound", s.sound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: audioState === "ready" ? "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-600 dark:text-emerald-400" : "inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-amber-600 dark:text-amber-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3 w-3" }), audioState === "ready" ? "Ready" : audioState === "blocked" ? "Blocked" : audioState === "unsupported" ? "Unsupported" : "Tap to enable"]
									})]
								}),
								hint: "Bead click and completion chime",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.sound,
									onCheckedChange: (v) => {
										if (v) unlockAudio();
										updateSettings({ sound: v });
									}
								})
							}),
							s.sound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-3 mb-3 flex gap-2 rounded-xl bg-secondary/60 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-muted-foreground",
										children: audioState === "unsupported" ? "This browser does not support web audio, so the bead click and chime stay silent." : audioState === "blocked" ? "Your browser is blocking playback. Check the silent switch and volume on iPhone, then tap Enable sound again." : audioState === "ready" ? "Sound is enabled on this device. Tap Test sound to hear the completion chime." : "iPhone and iPad need one tap before sound can play. Tap the button below or your first bead to enable it."
									}), audioState !== "unsupported" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											unlockAudio();
											playChime();
										},
										className: "inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3.5 w-3.5" }), audioState === "ready" ? "Test sound" : "Enable sound"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: ["Vibration", noVibrationSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-amber-600 dark:text-amber-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3 w-3" }), "iOS unsupported"]
									})]
								}),
								hint: "Gentle haptic on each jaap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.vibration,
									onCheckedChange: (v) => updateSettings({ vibration: v })
								})
							}),
							noVibrationSupport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-3 mb-3 flex gap-2 rounded-xl bg-secondary/60 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-relaxed text-muted-foreground",
									children: "iPhone and iPad browsers do not allow web apps to vibrate, so haptics stay silent here. Keep sound on for feedback - real device buzzing will arrive with the native app."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Diya-lit mode",
								hint: "Dark theme for low light",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.dark,
									onCheckedChange: (v) => updateSettings({ dark: v })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-1 rounded-2xl p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Daily reminder",
								hint: "A gentle nudge if you haven't sat with your mala",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: s.reminder,
									onCheckedChange: (v) => void toggleReminder(v)
								})
							}),
							s.reminder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-foreground",
									children: "Reminder time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Scheduled on this device only"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: s.reminderTime,
									onChange: (e) => changeReminderTime(e.target.value),
									"aria-label": "Reminder time",
									className: "rounded-xl bg-secondary px-3 py-2 text-sm text-secondary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
								})]
							}),
							reminderBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-2 text-xs text-destructive",
								children: "Notifications are blocked. Allow them for this app in your browser or device settings, then try again."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-3 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-foreground",
							children: "Bead"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-3",
							children: BEAD_THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => updateSettings({ bead: t.id }),
								"data-bead": t.id,
								className: `flex flex-col items-center gap-2 rounded-xl py-3 transition-colors ${s.bead === t.id ? "bg-secondary ring-2 ring-primary" : "hover:bg-secondary/60"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative h-12 w-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: t.image,
										alt: `${t.label} bead`,
										className: "h-12 w-12 rounded-full object-cover shadow-md"
									}), s.bead === t.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 flex items-center justify-center rounded-full bg-primary/30",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 16 16",
											fill: "none",
											stroke: "white",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.5 8.5L6.5 11.5L12.5 5.5" })
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] text-muted-foreground",
									children: t.label
								})]
							}, t.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-3 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg text-foreground",
								children: "Your Mantra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: s.mantra,
								onChange: (e) => updateSettings({ mantra: e.target.value }),
								placeholder: "e.g. Om Namah Shivaya",
								maxLength: 80,
								className: "w-full rounded-xl bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Shown on the counter screen during your practice."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-3 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg text-foreground",
								children: "Daily goal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-5 gap-2",
								children: DAILY_TARGETS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => updateSettings({ dailyTarget: n }),
									className: `min-h-12 rounded-xl font-display text-lg transition-colors ${s.dailyTarget === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`,
									children: n === 0 ? "Off" : n
								}, n))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Set a daily mala target to stay motivated. Progress appears on the counter screen."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "shrine-card space-y-3 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-foreground",
							children: "Mala length"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-2",
							children: MALA_LENGTHS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => updateSettings({ malaLength: n }),
								className: `min-h-12 rounded-xl font-display text-lg transition-colors ${s.malaLength === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`,
								children: n
							}, n))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirming(true),
						className: "min-h-14 w-full rounded-2xl border border-destructive/40 text-sm text-destructive transition-colors hover:bg-destructive/10",
						children: "Reset all data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2 pt-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Your counts, malas, streaks and history are stored only in this device's local cache - never on a server. Clearing site data or uninstalling the app erases them permanently."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/install",
									className: "underline underline-offset-4 hover:text-foreground",
									children: "Install on phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/faq",
									className: "underline underline-offset-4 hover:text-foreground",
									children: "FAQ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "underline underline-offset-4 hover:text-foreground",
									children: "Privacy Policy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terms",
									className: "underline underline-offset-4 hover:text-foreground",
									children: "Terms of Use"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirming,
				onOpenChange: setConfirming,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "font-display",
					children: "Clear your whole journey?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This permanently erases your lifetime jaaps, malas, streaks and daily history on this device. Your preferences are kept." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep my data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: resetAll,
					children: "Reset everything"
				})] })] })
			})
		]
	});
}
function Row({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: hint
		})] }), children]
	});
}
//#endregion
export { SettingsScreen as component };
