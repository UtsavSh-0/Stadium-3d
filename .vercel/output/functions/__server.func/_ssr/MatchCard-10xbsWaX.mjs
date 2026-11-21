import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as useBooking, i as matchDate, o as money } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, F as CalendarDays, O as Clock, _ as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchCard-10xbsWaX.js
var import_jsx_runtime = require_jsx_runtime();
function TeamCrest({ code, away = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `crest ${away ? "crest-away" : ""}`,
		"aria-label": `${code} demo team crest`,
		children: code
	});
}
function MatchCard({ match, compact = false }) {
	const { selectMatch } = useBooking();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "match-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "match-card-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: match.competition
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "status",
					children: match.status
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "team-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "team",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, { code: match.homeCode }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: match.home })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl text-muted-foreground",
						children: "VS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "team",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, {
							code: match.awayCode,
							away: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: match.away })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "match-details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 12 }),
							matchDate(match.date),
							", 2026"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-border",
						children: "|"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 12 }),
							match.time,
							" IST"
						]
					})
				]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "match-details mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), "OMNYA LAB STADIUM"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "match-card-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "price-label",
					children: "TICKETS FROM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "price",
					children: money(match.price)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ticket",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stadium",
						onClick: () => selectMatch(match.id),
						children: [compact ? "BOOK NOW" : "SELECT MATCH", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
					})
				})]
			})
		]
	});
}
//#endregion
export { MatchCard as t };
