import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as ANDROID_STEPS, r as IOS_STEPS } from "./router-kxbmTZL7.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-lTqLHLjm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InstallScreen() {
	const [platform, setPlatform] = (0, import_react.useState)("ios");
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
						children: "Install on your phone"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: "Mala Jaap Counter works best when installed on your home screen. It opens full-screen, works offline, and feels like a native app - no app store needed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-2xl bg-secondary p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformTab, {
						active: platform === "ios",
						onClick: () => setPlatform("ios"),
						children: "iPhone / iPad"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformTab, {
						active: platform === "android",
						onClick: () => setPlatform("android"),
						children: "Android"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-4",
					"aria-label": `${platform === "ios" ? "iPhone" : "Android"} install steps`,
					children: (platform === "ios" ? IOS_STEPS : ANDROID_STEPS).map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						id: `${platform}-step-${index + 1}`,
						className: "shrine-card flex items-start gap-4 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, {
									className: "h-4 w-4 text-saffron",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-base text-foreground",
									children: step.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: step.body
							})]
						})]
					}, step.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrine-card rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-base text-foreground",
						children: "Why install?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-1 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One-tap access from your home screen" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Works offline without internet" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No store account or download required" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your data stays on your device" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: [
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
				})
			]
		})]
	});
}
function PlatformTab({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
		children
	});
}
//#endregion
export { InstallScreen as component };
