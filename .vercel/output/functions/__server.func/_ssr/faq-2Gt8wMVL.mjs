import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { i as FAQS } from "./router-kxbmTZL7.mjs";
import { t as MandalaBackground } from "./MandalaBackground-N0dgl0i-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-2Gt8wMVL.js
var import_jsx_runtime = require_jsx_runtime();
function FaqScreen() {
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
						children: "FAQ"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrine-card space-y-6 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground",
					children: FAQS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base text-foreground",
							children: f.question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.answer })]
					}, f.question))
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
//#endregion
export { FaqScreen as component };
