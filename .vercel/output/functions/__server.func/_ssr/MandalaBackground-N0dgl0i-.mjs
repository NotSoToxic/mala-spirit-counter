import { g as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MandalaBackground-N0dgl0i-.js
var import_jsx_runtime = require_jsx_runtime();
function MandalaBackground() {
	const petals = Array.from({ length: 16 });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-(--gradient-shrine)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 400 400",
			className: "absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.07]",
			children: [petals.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "200",
				cy: "110",
				rx: "26",
				ry: "88",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1",
				transform: `rotate(${360 / petals.length * i} 200 200)`
			}, i)), [
				60,
				105,
				150,
				185
			].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "200",
				cy: "200",
				r,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.75"
			}, r))]
		})]
	});
}
//#endregion
export { MandalaBackground as t };
