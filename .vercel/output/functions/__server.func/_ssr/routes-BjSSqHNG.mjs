import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as matches } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, E as Crown, R as Box, U as Armchair, V as ArrowRight, f as Move3d, k as Circle, z as AudioLines } from "../_libs/lucide-react.mjs";
import { t as MatchCard } from "./MatchCard-10xbsWaX.mjs";
import { t as CanvasStage } from "./CanvasStage-BnzG0FkA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjSSqHNG.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-scene",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasStage, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-shade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "WELCOME TO OMNYA LAB STADIUM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "display-heading hero-title",
								children: [
									"YOUR GAME.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"YOUR STADIUM.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "YOUR PERFECT SEAT."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-description",
								children: "Experience football like never before. Explore our immersive 3D stadium, discover your perfect view and book your match-day experience."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hero-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ticket",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/matches",
										children: ["BOOK YOUR TICKETS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "stadium",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/stadium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {}), " EXPLORE 3D STADIUM"]
									})
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-stat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["40,000", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary text-lg",
								children: "+"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SEATS. ENDLESS MOMENTS." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-l border-border pl-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "360°" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IMMERSIVE STADIUM VIEW" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-l border-border pl-7 hidden sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ONE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UNFORGETTABLE EXPERIENCE" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stadium",
						className: "scene-badge",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
								size: 7,
								className: "text-seat-available fill-seat-available"
							}),
							" LIVE 3D EXPERIENCE ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Move3d, { size: 16 })
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "eyebrow",
							children: "THE NEXT BIG MOMENT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-heading section-title",
							children: "UPCOMING MATCHES"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "link",
							className: "text-[10px] tracking-[1px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matches",
								children: ["VIEW ALL MATCHES ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "demo-note mb-5",
						children: "Demo fixtures · Fictional editable teams · Not a live match schedule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "match-grid",
						children: matches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, {
							match,
							compact: true
						}, match.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-heading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "BUILT FOR THE BEAUTIFUL GAME"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-heading section-title",
						children: "MORE THAN A STADIUM."
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "highlight-grid",
					children: [
						{
							icon: Box,
							title: "EVERY ANGLE. IN 3D.",
							text: "A complete stadium, from the highest tier to the touchline."
						},
						{
							icon: Armchair,
							title: "YOUR PERFECT VIEW.",
							text: "Pitch-side energy or a panoramic view. Make it yours."
						},
						{
							icon: Crown,
							title: "A LEAGUE OF YOUR OWN.",
							text: "Executive seating, private skyboxes and extraordinary hospitality."
						},
						{
							icon: AudioLines,
							title: "FEEL EVERY MOMENT.",
							text: "The roar of the crowd. The lights. The game you came for."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "highlight",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text })
						]
					}, item.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-container vip-band",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vip-media",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasStage, {
						view: "interior",
						lounge: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "eyebrow",
						children: "MATCH DAY. ELEVATED."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display-heading section-title",
						children: [
							"AN EXCEPTIONAL GAME.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-seat-vip",
								children: "AN EXCLUSIVE EXPERIENCE."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-7 my-5 max-w-md",
						children: "The best seats in the house. Private suites, premium dining and a front-row feeling that stays with you long after the final whistle."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ticket",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/vip",
							children: ["EXPLORE VIP ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
						})
					})
				] })]
			})
		})
	] });
}
//#endregion
export { Home as component };
