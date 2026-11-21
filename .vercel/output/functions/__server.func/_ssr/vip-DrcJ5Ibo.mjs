import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as seatPrice, d as seats, h as useBooking, l as seatStatus, o as money, p as skyboxes, r as matchById, u as seatView } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, E as Crown, M as Check, w as Eye } from "../_libs/lucide-react.mjs";
import { t as CanvasStage } from "./CanvasStage-BnzG0FkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vip-DrcJ5Ibo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Vip() {
	const booking = useBooking();
	const match = matchById(booking.matchId);
	const [cameraTarget, setCameraTarget] = (0, import_react.useState)({
		key: "vip-arrival",
		pos: [
			0,
			8.3,
			66
		],
		target: [
			0,
			1,
			0
		]
	});
	const [active, setActive] = (0, import_react.useState)("THE SKYBOX EXPERIENCE");
	const executive = seats.find((s) => s.category === "Executive" && seatStatus(s, match.id, booking.reserved) === "available");
	const lower = seats.find((s) => s.stand === "South" && s.tier === "Lower" && Math.abs(s.position[0]) < 15 && seatStatus(s, match.id, booking.reserved) === "available");
	const skybox = skyboxes.find((s) => seatStatus(s, match.id, booking.reserved) === "available");
	const packages = [
		{
			name: "PREMIUM CENTRAL",
			seat: lower,
			guests: 1,
			text: "Close to the action. A central pitch-side perspective.",
			benefits: [
				"Premium central seat",
				"Exclusive entrance",
				"Lounge access"
			]
		},
		{
			name: "EXECUTIVE CLUB",
			seat: executive,
			guests: 1,
			text: "An elevated perspective. Exceptional hospitality.",
			benefits: [
				"Executive middle-tier seat",
				"Hospitality lounge",
				"Premium dining"
			]
		},
		{
			name: "PRIVATE SKYBOX",
			seat: skybox,
			guests: 8,
			text: "Your own suite. The game, on your terms.",
			benefits: [
				"Private glass-fronted suite",
				"8 guests per package",
				"Luxury lounge & premium dining"
			]
		}
	];
	function preview(seat, name) {
		const v = seatView(seat);
		setCameraTarget({
			key: `vip-${seat.id}-${Date.now()}`,
			pos: v.pos,
			target: v.target
		});
		setActive(name);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-intro",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "BEYOND THE ORDINARY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display-heading page-title",
						children: ["A LEAGUE OF ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-seat-vip",
							children: "YOUR OWN."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-4",
						children: "The finest view. The finest company. Your VIP match-day experience."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[480px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasStage, {
				cameraTarget,
				lounge: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "view-banner",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-seat-vip text-[10px] flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { size: 12 }), active]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mt-2",
					children: [
						match.home,
						" vs ",
						match.away,
						" · Demo VIP availability"
					]
				})] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "vip-package-grid",
				children: packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "vip-package",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
							className: "text-seat-vip mb-5",
							size: 25
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-6 mt-3 mb-5",
							children: p.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3 text-xs",
							children: p.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 12,
									className: "text-seat-vip"
								}), b]
							}, b))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 mb-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl",
									children: p.seat ? money(seatPrice(p.seat, match)) : "Sold out"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground ml-2",
									children: p.guests > 1 ? "per 8-guest package" : "per person"
								}),
								p.seat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-seat-available mt-2",
									children: [
										p.seat.block,
										" · ",
										p.seat.capacity > 1 ? `Suite ${p.seat.number}` : `Row ${p.seat.row} · Seat ${p.seat.number}`,
										" · Available"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "stadium",
							className: "w-full mb-3",
							disabled: !p.seat,
							onClick: () => {
								if (p.seat) preview(p.seat, p.name);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), " PREVIEW VIP VIEW"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ticket",
							className: `w-full ${p.seat ? "" : "pointer-events-none opacity-40"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/stadium",
								onClick: () => {
									if (p.seat && !booking.selected.includes(p.seat.id)) booking.toggleSeat(p.seat.id);
								},
								children: ["SELECT EXPERIENCE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							})
						})
					]
				}, p.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "demo-note mb-12",
				children: [
					"Demo hospitality packages. Availability and prices are specific to ",
					match.home,
					" vs ",
					match.away,
					"."
				]
			})]
		})
	] });
}
//#endregion
export { Vip as component };
