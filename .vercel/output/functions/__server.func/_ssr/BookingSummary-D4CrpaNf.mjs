import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as seatPrice, h as useBooking, o as money, r as matchById } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Crown, V as ArrowRight, c as ShieldCheck, i as Ticket, t as X, w as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BookingSummary-D4CrpaNf.js
var import_jsx_runtime = require_jsx_runtime();
function BookingSummary({ onPreview, checkout = false }) {
	const booking = useBooking();
	const match = matchById(booking.matchId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "booking-summary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "eyebrow",
				children: "YOUR MATCH-DAY EXPERIENCE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "summary-heading mt-3",
				children: "YOUR BOOKING"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 border-b border-border pb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs font-bold",
						children: [
							match.home,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground mx-1",
								children: "vs"
							}),
							" ",
							match.away
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-muted-foreground mt-2",
						children: [
							match.date,
							" · ",
							match.time,
							" IST"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground mt-1",
						children: "OMNYA LAB STADIUM"
					})
				]
			}),
			booking.selectedSeats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {
						className: "mx-auto mb-4 text-primary",
						size: 30
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your match. Your perfect seat." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "No seats selected yet."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: booking.selectedSeats.map((seat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-seat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "text-xs",
							children: [
								seat.stand,
								" Stand · ",
								seat.tier,
								seat.tier !== "Skybox" && " Tier"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "h-6 w-6",
							"aria-label": `Remove ${seat.id}`,
							onClick: () => booking.removeSeat(seat.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] text-muted-foreground mt-2",
						children: [
							"Block ",
							seat.block,
							" · Row ",
							seat.row,
							" · Seat ",
							seat.number
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground",
							children: [seat.category === "Executive" || seat.category === "Private Skybox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
								size: 12,
								className: "inline text-seat-vip mr-1"
							}) : null, seat.category]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-sm",
							children: money(seatPrice(seat, match))
						})]
					}),
					seat.capacity > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-seat-vip mt-2",
						children: "8 guests · Private lounge · Premium dining"
					}),
					onPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "stadium",
						className: "w-full mt-3 h-8 px-2 text-[9px]",
						onClick: () => onPreview(seat),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), seat.category === "Executive" || seat.capacity > 1 ? "PREVIEW VIP VIEW" : "PREVIEW MY SEAT VIEW"]
					})
				]
			}, seat.id)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "summary-total",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs font-semibold",
					children: [
						booking.selectedSeats.length,
						" selected ",
						booking.selectedSeats.length === 1 ? "ticket" : "tickets"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[9px] text-muted-foreground mt-2",
					children: "Total amount · INR"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: money(booking.total) })]
			}),
			!checkout && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ticket",
				className: `w-full ${booking.selectedSeats.length ? "" : "pointer-events-none opacity-40"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: booking.selectedSeats.length ? "/checkout" : "/stadium",
					"aria-disabled": !booking.selectedSeats.length,
					children: ["CONTINUE TO CHECKOUT ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[9px] text-muted-foreground mt-4 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Demo booking · No payment collected"]
			})
		]
	});
}
//#endregion
export { BookingSummary as t };
