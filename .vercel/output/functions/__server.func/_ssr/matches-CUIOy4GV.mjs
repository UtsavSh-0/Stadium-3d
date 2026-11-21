import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as matches } from "./BookingProvider-CcPpexyH.mjs";
import { S as Info, o as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as MatchCard } from "./MatchCard-10xbsWaX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matches-CUIOy4GV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Matches() {
	const [competition, setCompetition] = (0, import_react.useState)("all");
	const [team, setTeam] = (0, import_react.useState)("all");
	const [date, setDate] = (0, import_react.useState)("");
	const filtered = matches.filter((m) => (competition === "all" || m.competition === competition) && (team === "all" || m.home === team || m.away === team) && (!date || m.date === date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-container pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "01 / CHOOSE YOUR MATCH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display-heading page-title",
						children: "PICK YOUR MOMENT."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-4",
						children: "The atmosphere is waiting. Find your match and make it unforgettable."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "demo-note mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { size: 12 }), "Editable demo fixtures and fictional teams. No live match data connected."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "filters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
						size: 17,
						className: "text-muted-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold mr-3",
						children: "Upcoming matches"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "filter-select",
						"aria-label": "Competition",
						value: competition,
						onChange: (e) => setCompetition(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All competitions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Stadium Invitational" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Winter Cup" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "filter-select",
						"aria-label": "Team",
						value: team,
						onChange: (e) => setTeam(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All teams"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "OMNYA FC" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "LAB UNITED" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "filter-select",
						type: "date",
						"aria-label": "Match date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "match-grid",
				children: filtered.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, { match }, match.id))
			}),
			!filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground py-12 text-center",
				children: "No matches on this date or in this competition."
			})
		]
	});
}
//#endregion
export { Matches as component };
