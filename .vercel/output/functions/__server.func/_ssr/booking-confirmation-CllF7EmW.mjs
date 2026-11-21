import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as useBooking, o as money, r as matchById, s as seatById } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, M as Check, T as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking-confirmation-CllF7EmW.js
var import_jsx_runtime = require_jsx_runtime();
function Confirmation() {
	const { receipt, hydrated } = useBooking();
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-container py-20",
		children: "Loading confirmation…"
	});
	if (!receipt) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "confirmation page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-heading page-title",
				children: "YOUR NEXT MATCH AWAITS."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground my-6",
				children: "No booking confirmation yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ticket",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/matches",
					children: ["EXPLORE MATCHES ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
				})
			})
		]
	});
	const match = matchById(receipt.matchId);
	function download() {
		if (!receipt) return;
		const content = `OMNYA LAB STADIUM\nDEMO RESERVATION - NOT VALID FOR ENTRY\nReference: ${receipt.reference}\nGuest: ${receipt.name}\n${match.home} vs ${match.away}\n${match.date} ${match.time} IST\n${receipt.seatIds.map((id) => {
			const s = seatById.get(id);
			return s ? `${s.stand} / ${s.tier} / Block ${s.block} / Row ${s.row} / Seat ${s.number}` : "";
		}).join("\n")}\nTotal: ${money(receipt.total)}\nNo payment collected.`;
		const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = `${receipt.reference}-demo.txt`;
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "confirmation page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-seat-available/15 text-seat-available rounded-full w-16 h-16 mx-auto flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 30 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow justify-center mt-6",
				children: "DEMO RESERVATION CONFIRMED"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-heading page-title",
				children: [
					"YOU'RE IN, ",
					receipt.name.split(" ")[0],
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-5",
				children: "A perfect seat. An unforgettable match-day feeling."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "confirmation-ticket",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary font-display text-2xl",
							children: "OMNYA LAB STADIUM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: receipt.reference
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-3xl",
						children: [
							match.home,
							" VS ",
							match.away
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-2",
						children: [
							match.date,
							" · ",
							match.time,
							" IST"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-5 border-y border-dashed border-border py-4 space-y-3",
						children: receipt.seatIds.map((id) => {
							const s = seatById.get(id);
							return s ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									s.stand,
									" Stand · ",
									s.tier,
									" · ",
									s.block
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Row ",
									s.row,
									" · Seat ",
									s.number
								] })]
							}, id) : null;
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [receipt.seatIds.length, " tickets"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: money(receipt.total) })]
					}),
					receipt.payment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-t border-border pt-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-seat-available",
								children: "Demo payment successful"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground uppercase",
								children: receipt.payment.method
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-muted-foreground mt-2",
							children: [
								"Transaction ",
								receipt.payment.reference,
								" · Simulated ",
								money(receipt.payment.amount)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground mt-6",
						children: "DEMO ONLY · Not valid for entry · No payment collected · No email sent"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3 justify-center flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "stadium",
					onClick: download,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " DOWNLOAD SUMMARY"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ticket",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/matches",
						children: ["EXPLORE MORE MATCHES ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
					})
				})]
			})
		]
	});
}
//#endregion
export { Confirmation as component };
