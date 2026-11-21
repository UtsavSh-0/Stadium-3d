import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as ClientOnly } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CanvasStage-BnzG0FkA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function CanvasStage({ view = "aerial", cameraTarget, interaction, lounge = false }) {
	const [ready, ,] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(false);
	const container = (0, import_react.useRef)(null);
	const isMobile = useIsMobile();
	(0, import_react.useEffect)(() => {
		const element = container.current;
		if (!element) return;
		const observer = new IntersectionObserver((entries) => setVisible(entries.some((entry) => entry.isIntersecting)), { threshold: .05 });
		observer.observe(element);
		return () => observer.disconnect();
	}, []);
	const loading = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "canvas-loading",
		children: "Loading stadium visualization…"
	});
	const mobileLoading = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "canvas-loading",
		children: "Open to explore"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: container,
		className: "relative h-full w-full",
		children: [visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: !isMobile ? loading : mobileLoading }), (!ready || !visible) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: !visible ? isMobile ? mobileLoading : loading : loading
		})]
	});
}
//#endregion
export { CanvasStage as t };
