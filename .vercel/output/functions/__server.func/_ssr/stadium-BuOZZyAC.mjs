import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as seatPrice, h as useBooking, l as seatStatus, m as stands, n as allSeats, o as money, p as skyboxes, r as matchById, u as seatView } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, E as Crown, H as ArrowLeft, M as Check, d as Plus, l as RotateCcw, p as Minus, w as Eye } from "../_libs/lucide-react.mjs";
import { t as BookingSummary } from "./BookingSummary-D4CrpaNf.mjs";
import { t as CanvasStage } from "./CanvasStage-BnzG0FkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stadium-BuOZZyAC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var seatsBySection = /* @__PURE__ */ new Map();
var seatsByBlock = /* @__PURE__ */ new Map();
for (const seat of allSeats) {
	const sectionKey = `${seat.stand}:${seat.tier}`;
	const section = seatsBySection.get(sectionKey) ?? [];
	section.push(seat);
	seatsBySection.set(sectionKey, section);
	const block = seatsByBlock.get(seat.block) ?? [];
	block.push(seat);
	seatsByBlock.set(seat.block, block);
}
function countBlock(list, matchId, reserved) {
	const result = {
		total: list.length,
		available: 0,
		booked: 0,
		soldout: 0
	};
	for (const seat of list) result[seatStatus(seat, matchId, reserved)]++;
	return result;
}
var tiers = [
	"Lower",
	"Middle",
	"Upper",
	"Skybox"
];
function StadiumPage() {
	const booking = useBooking();
	const match = matchById(booking.matchId);
	const [stand, setStand] = (0, import_react.useState)("North");
	const [tier, setTier] = (0, import_react.useState)("Lower");
	const [block, setBlock] = (0, import_react.useState)("");
	const [row, setRow] = (0, import_react.useState)(1);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [cameraTarget, setCameraTarget] = (0, import_react.useState)();
	const sectionSeats = (0, import_react.useMemo)(() => seatsBySection.get(`${tier === "Skybox" ? "South" : stand}:${tier}`) ?? [], [stand, tier]);
	const blocks = (0, import_react.useMemo)(() => [...new Set(sectionSeats.map((s) => s.block))], [sectionSeats]);
	const currentBlock = blocks.includes(block) ? block : blocks[Math.floor(blocks.length / 2)] ?? "";
	const blockSeats = (0, import_react.useMemo)(() => seatsByBlock.get(currentBlock) ?? [], [sectionSeats, currentBlock]);
	const rows = [...new Set(blockSeats.map((s) => s.row))];
	const currentRow = rows.includes(row) ? row : rows[0] ?? 1;
	const rowSeats = blockSeats.filter((s) => s.row === currentRow);
	const blockCounts = (0, import_react.useMemo)(() => new Map(blocks.map((id) => [id, countBlock(seatsByBlock.get(id) ?? [], booking.matchId, booking.reserved)])), [
		blocks,
		booking.matchId,
		booking.reserved
	]);
	const hoverBlock = hover?.block;
	const hoverCounts = (0, import_react.useMemo)(() => hoverBlock ? countBlock(seatsByBlock.get(hoverBlock) ?? [], booking.matchId, booking.reserved) : null, [
		hoverBlock,
		booking.matchId,
		booking.reserved
	]);
	function aerial() {
		setPreview(null);
		setCameraTarget({
			key: `reset-${Date.now()}`,
			pos: [
				182,
				164,
				199
			],
			target: [
				0,
				12,
				0
			]
		});
	}
	function focusStand(nextStand, nextTier = tier) {
		setStand(nextStand);
		setPreview(null);
		setBlock("");
		setRow(1);
		const y = nextTier === "Upper" ? 31 : nextTier === "Middle" ? 22 : 16;
		const pos = nextStand === "North" ? [
			0,
			y,
			-25
		] : nextStand === "South" ? [
			0,
			y,
			25
		] : nextStand === "East" ? [
			42,
			y,
			0
		] : [
			-42,
			y,
			0
		];
		const target = nextStand === "North" ? [
			0,
			y - 8,
			-67
		] : nextStand === "South" ? [
			0,
			y - 8,
			67
		] : nextStand === "East" ? [
			83,
			y - 8,
			0
		] : [
			-83,
			y - 8,
			0
		];
		setCameraTarget({
			key: `${nextStand}-${nextTier}-${Date.now()}`,
			pos,
			target
		});
	}
	function focusBlock(id) {
		setBlock(id);
		setPreview(null);
		const candidates = seatsByBlock.get(id) ?? [];
		const seat = candidates[Math.floor(candidates.length / 2)];
		if (!seat) return;
		const [x, y, z] = seat.position;
		setCameraTarget({
			key: `${id}-${Date.now()}`,
			pos: [
				x * .72,
				y + 9,
				z * .72
			],
			target: [
				x,
				y,
				z
			]
		});
	}
	function previewSeat(seat) {
		setPreview(seat);
		const view = seatView(seat);
		setCameraTarget({
			pos: view.pos,
			target: view.target,
			key: `preview-${seat.id}-${Date.now()}`
		});
	}
	function zoom(factor) {
		setCameraTarget((old) => {
			const pos = old?.pos ?? [
				182,
				164,
				199
			];
			const target = old?.target ?? [
				0,
				12,
				0
			];
			return {
				pos: [
					target[0] + (pos[0] - target[0]) * factor,
					target[1] + (pos[1] - target[1]) * factor,
					target[2] + (pos[2] - target[2]) * factor
				],
				target,
				key: `zoom-${Date.now()}`
			};
		});
	}
	const interaction = (0, import_react.useMemo)(() => ({
		matchId: booking.matchId,
		selected: booking.selected,
		reserved: booking.reserved,
		onSeat: booking.toggleSeat,
		onHover: setHover
	}), [
		booking.matchId,
		booking.selected,
		booking.reserved
	]);
	const info = preview ? seatView(preview) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "match-strip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "eyebrow mb-1",
			children: "02 / FIND YOUR PERFECT SEAT"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "match-strip-title",
			children: [
				match.home,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground mx-2",
					children: "VS"
				}),
				" ",
				match.away
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-5 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[10px] text-muted-foreground",
				children: [
					match.date,
					" · ",
					match.time,
					" IST",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-seat-available",
						children: "Demo match availability"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "stadium",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/matches",
					children: ["CHANGE MATCH ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
				})
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "booking-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stadium-workspace",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stadium-toolbar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 flex-wrap",
						children: stands.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: stand === s ? "ticket" : "ghost",
							className: "text-[10px]",
							onClick: () => focusStand(s),
							children: [s, " Stand"]
						}, s))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Seating tier",
						className: "filter-select py-2 min-h-9",
						value: tier,
						onChange: (e) => {
							setTier(e.target.value);
							if (e.target.value === "Skybox") {
								setStand("South");
								const first = skyboxes[0];
								if (first) previewSeat(first);
							} else focusStand(stand, e.target.value);
						},
						children: tiers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: t,
							children: [t, t !== "Skybox" && " Tier"]
						}, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stadium-viewport",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasStage, {
							interaction,
							lounge: true,
							...cameraTarget ? { cameraTarget } : {}
						}),
						preview && info && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "view-banner",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-primary text-[9px] uppercase tracking-[1px] font-bold",
									children: "YOUR ACTUAL SEAT VIEW"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl mt-1",
									children: [
										preview.stand,
										" · ",
										preview.block,
										" · R",
										preview.row,
										" · S",
										preview.number
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-muted-foreground mt-1",
									children: [
										info.perspective,
										" · ",
										info.distance,
										"m to centre · ",
										info.angle,
										"° elevation"
									]
								}),
								preview.capacity > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-seat-vip text-[9px] mt-2",
									children: "Private lounge · 8 guests · Panoramic glazing"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "stadium",
								size: "sm",
								onClick: aerial,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " AERIAL VIEW"]
							})]
						}),
						hover && !preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "seat-tooltip",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									hover.stand.toUpperCase(),
									" · BLOCK ",
									hover.block
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Row ",
									hover.row,
									" · Seat ",
									hover.number,
									" · ",
									hover.category
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-primary",
									children: [
										money(seatPrice(hover, match)),
										" · ",
										seatStatus(hover, match.id, booking.reserved)
									]
								}),
								hoverCounts && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground mt-2 leading-5",
									children: [
										"Total ",
										hoverCounts.total,
										" · Available ",
										hoverCounts.available,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Booked ",
										hoverCounts.booked,
										" · Sold out ",
										hoverCounts.soldout,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Availability ",
										Math.round(hoverCounts.available / hoverCounts.total * 100),
										"% · Demo inventory"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "canvas-tools",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "stadium",
									size: "icon",
									title: "Zoom in",
									"aria-label": "Zoom in",
									onClick: () => zoom(.8),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "stadium",
									size: "icon",
									title: "Zoom out",
									"aria-label": "Zoom out",
									onClick: () => zoom(1.25),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "stadium",
									size: "icon",
									title: "Reset camera",
									"aria-label": "Reset camera",
									onClick: aerial,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "availability-legend",
					children: [[
						{
							label: "Available",
							color: "bg-seat-available"
						},
						{
							label: "Selected",
							color: "bg-primary"
						},
						{
							label: "Booked",
							color: "bg-seat-booked"
						},
						{
							label: "Sold out",
							color: "bg-seat-soldout"
						},
						{
							label: "VIP",
							color: "bg-seat-vip"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `legend-dot ${l.color}` }), l.label] }, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto",
						children: "MATCH-SPECIFIC DEMO INVENTORY"
					})]
				}),
				preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 px-6 pt-5 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ticket",
						onClick: () => {
							if (!booking.selected.includes(preview.id)) booking.toggleSeat(preview.id);
							aerial();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), " CONFIRM THIS SEAT"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "stadium",
						onClick: aerial,
						children: "CHANGE SEAT"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "block-browser",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold",
								children: tier === "Skybox" ? "PRIVATE SKYBOXES" : `${stand.toUpperCase()} STAND · ${tier.toUpperCase()} TIER`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "link",
								size: "sm",
								className: "text-[9px]",
								onClick: () => {
									setTier("Middle");
									focusStand("South", "Middle");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {}), " UPGRADE TO VIP"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "block-list",
							children: blocks.map((id) => {
								const counts = blockCounts.get(id);
								const percent = counts?.total ? Math.round(counts.available / counts.total * 100) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: id === currentBlock ? "ticket" : "stadium",
									size: "sm",
									className: "h-12 flex-col gap-1 px-3 text-[10px]",
									title: `Demo block ${id}: Total ${counts?.total}, Available ${counts?.available}, Booked ${counts?.booked}, Sold out ${counts?.soldout}`,
									onClick: () => focusBlock(id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["BLOCK ", id] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[8px] font-normal",
										children: [percent, "% AVAILABLE"]
									})]
								}, id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4 mb-4 text-[10px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-foreground",
									children: ["BLOCK ", currentBlock]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [blockCounts.get(currentBlock)?.total, " seats"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-seat-available",
									children: [blockCounts.get(currentBlock)?.available, " available"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [blockCounts.get(currentBlock)?.booked, " booked"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [blockCounts.get(currentBlock)?.soldout, " sold out"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "ml-auto flex items-center gap-2",
									children: ["ROW ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": "Seat row",
										className: "filter-select py-1 min-h-8",
										value: currentRow,
										onChange: (e) => setRow(Number(e.target.value)),
										children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seat-grid",
							children: rowSeats.map((seat) => {
								const status = seatStatus(seat, booking.matchId, booking.reserved);
								const chosen = booking.selected.includes(seat.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "seat-grid-button",
									variant: chosen ? "ticket" : status === "available" ? seat.category === "Executive" || seat.capacity > 1 ? "vip" : "available" : status === "booked" ? "booked" : "soldout",
									disabled: status !== "available",
									"aria-label": `${seat.capacity > 1 ? "Skybox" : "Seat"} ${seat.number}, row ${seat.row}, block ${seat.block}, ${money(seatPrice(seat, match))}, ${status}`,
									"aria-pressed": chosen,
									title: `${seat.stand} · ${seat.tier} · ${seat.block} · Row ${seat.row} · Seat ${seat.number} · ${seat.category} · ${money(seatPrice(seat, match))} · ${status}`,
									onMouseEnter: () => setHover(seat),
									onMouseLeave: () => setHover(null),
									onClick: () => booking.toggleSeat(seat.id),
									children: chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }) : seat.number
								}, seat.id);
							})
						}),
						tier === "Skybox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-seat-vip text-xs mt-4",
							children: "8 guests per suite · Exclusive entrance · Lounge access · Premium dining · Package price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[9px] text-muted-foreground mt-4 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 12 }),
								currentBlock,
								" · ",
								tier === "Skybox" ? "Private hospitality suites" : "Reserved seating",
								" · ",
								money(rowSeats[0] ? seatPrice(rowSeats[0], match) : 0),
								" ",
								tier === "Skybox" ? "per package" : "per ticket"
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSummary, { onPreview: previewSeat })]
	})] });
}
//#endregion
export { StadiumPage as component };
