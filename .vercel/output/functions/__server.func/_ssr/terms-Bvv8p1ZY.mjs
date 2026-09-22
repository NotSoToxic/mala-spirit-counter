import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-Bvv8p1ZY.js
var import_jsx_runtime = require_jsx_runtime();
function TermsScreen() {
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
						children: "Terms of Use"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrine-card space-y-5 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Using the app",
							children: "Mala Jaap Counter is offered free of charge for personal spiritual practice. You may use it on any device you own."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Your data is yours",
							children: "All counts, history and settings stay in your device's local storage. You are responsible for keeping your device - if you clear the app's cache, reinstall, or use a different device or browser, your history will not be there."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "No warranty",
							children: "The app is provided “as is”, without warranties of any kind. Counts, streaks and reminders may be affected by device settings, storage limits or browser behaviour, and we cannot guarantee uninterrupted or error-free operation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Limitation of liability",
							children: "To the extent permitted by law, the app owner is not liable for any loss of data or any indirect damages arising from use of the app."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Changes",
							children: "These terms may be updated as the app evolves. Continued use after an update means you accept the revised terms."
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
							to: "/privacy",
							className: "underline underline-offset-4 hover:text-foreground",
							children: "Privacy Policy"
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
export { TermsScreen as component };
