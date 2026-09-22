import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-C7sYnEGC.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen px-5 pb-16 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MandalaBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-md space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settings",
						"aria-label": "Back to settings",
						className: "rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl text-foreground",
						children: "Privacy Policy"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrine-card space-y-5 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground",
							children: "Mala Jaap Counter keeps everything on your device. There are no accounts and no server that receives your practice data."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "What is stored",
							children: "Your current bead count, completed malas, lifetime jaaps, daily history, streaks and preferences (bead style, mala length, sound, vibration, reminder time) are saved in your browser's local storage - a private cache on this device only."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "What we collect",
							children: "Nothing. We do not run analytics, advertising or tracking, and we do not ask for your name, email or location."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Notifications",
							children: "If you turn on the daily reminder, the reminder time is stored locally and the notification is created by your own device. No push service is involved."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Clearing your data",
							children: "You are always in control. Use “Reset all data” in Settings, or clear your browser site data / uninstall the app, and everything is gone permanently. Because the data lives only in this device's cache, it cannot be recovered afterwards and it does not sync between devices."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Contact",
							children: "Questions about this policy can be sent to the app owner through the store listing where you installed the app."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-muted-foreground",
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
							to: "/terms",
							className: "underline underline-offset-4 hover:text-foreground",
							children: "Terms of Use"
						})
					]
				})
			]
		})]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-base text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children })]
	});
}
//#endregion
export { PrivacyScreen as component };
