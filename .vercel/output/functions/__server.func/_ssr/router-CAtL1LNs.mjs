import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as BookingProvider } from "./BookingProvider-CcPpexyH.mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useLocation, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, h as Menu, i as Ticket, r as User, t as X, v as Mail } from "../_libs/lucide-react.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CAtL1LNs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Cnex5l4i.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function Brand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "brand",
		"aria-label": "OMNYA LAB STADIUM home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "brand-mark",
			viewBox: "0 0 40 44",
			fill: "none",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 3 37 11v20L20 41 3 31V11L20 3Z",
				stroke: "currentColor",
				strokeWidth: "2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "m10 28 5-14 5 7 5-7 5 14M10 28h20M20 21v12",
				stroke: "currentColor",
				strokeWidth: "2.5"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "brand-name",
			children: ["OMNYA LAB", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "STADIUM" })]
		})]
	});
}
var nav = [
	{
		to: "/",
		label: "HOME"
	},
	{
		to: "/stadium",
		label: "EXPLORE STADIUM"
	},
	{
		to: "/matches",
		label: "MATCHES"
	},
	{
		to: "/vip",
		label: "VIP EXPERIENCE"
	}
];
function Shell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const location = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "desktop-nav",
					"aria-label": "Main navigation",
					children: [
						nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: "nav-link",
							"data-active": location.pathname === item.to,
							children: item.label
						}, item.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								children: ["LOGIN ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "ml-1.5 h-3 w-3" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ticket",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matches",
								children: ["BOOK TICKETS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mobile-nav",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ticket",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/matches",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, {}), " TICKETS"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								children: ["LOGIN ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "ml-1 h-3 w-3" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": open ? "Close navigation" : "Open navigation",
							onClick: () => setOpen(!open),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mobile-menu",
					"aria-label": "Mobile navigation",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "nav-link",
						onClick: () => setOpen(false),
						children: item.label
					}, item.to))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "site-footer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "footer-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								children: "About the stadium"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/faqs",
								children: "FAQs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/contact",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									size: 12,
									className: "inline mr-1"
								}), "Contact"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								children: "Privacy policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								children: "Terms"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-bottom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 OMNYA LAB STADIUM. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE GAME IS BETTER FROM HERE." })]
				})]
			})
		})
	] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "OMNYA LAB STADIUM" },
			{
				name: "description",
				content: "Your game. Your stadium. Your perfect seat. Explore OMNYA LAB STADIUM in 3D."
			},
			{
				name: "author",
				content: "OMNYA LAB STADIUM"
			},
			{
				property: "og:title",
				content: "OMNYA LAB STADIUM"
			},
			{
				property: "og:description",
				content: "Explore your match-day experience in 3D."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
function pageHead(title, description) {
	const fullTitle = `${title} | OMNYA LAB STADIUM`;
	return { meta: [
		{ title: fullTitle },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: fullTitle
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
var $$splitComponentImporter$11 = () => import("./routes-BjSSqHNG.mjs");
var Route$11 = createFileRoute("/")({
	head: () => pageHead("Football tickets & 3D stadium", "Book your perfect football seat at OMNYA LAB STADIUM. Explore the original 3D stadium, upcoming demo matches and VIP experiences."),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./about-DHcGk1uE.mjs");
var Route$10 = createFileRoute("/about")({
	head: () => pageHead("About the stadium", "About the stadium for OMNYA LAB STADIUM and its clearly labelled demo football booking experience."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./booking-confirmation-CllF7EmW.mjs");
var Route$9 = createFileRoute("/booking-confirmation")({
	head: () => pageHead("Demo booking confirmation", "Your OMNYA LAB STADIUM demo reservation details, selected match, seats and booking reference. This is not a valid stadium entry ticket."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./checkout-BC-VJV1k.mjs");
var Route$8 = createFileRoute("/checkout")({
	head: () => pageHead("Checkout", "Review your selected match and seats at OMNYA LAB STADIUM and complete a clearly labelled demo reservation. No payment is collected."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./contact-TCTBJ4t-.mjs");
var Route$7 = createFileRoute("/contact")({
	head: () => pageHead("Contact", "Contact for OMNYA LAB STADIUM and its clearly labelled demo football booking experience."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./faqs-Da6fLUbc.mjs");
var Route$6 = createFileRoute("/faqs")({
	head: () => pageHead("Frequently asked questions", "Frequently asked questions for OMNYA LAB STADIUM and its clearly labelled demo football booking experience."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-Cygq5Kp8.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => pageHead("Login - OMNYA LAB STADIUM", "Login to your OMNYA LAB STADIUM account to book tickets and access VIP experiences."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./matches-CUIOy4GV.mjs");
var Route$4 = createFileRoute("/matches")({
	head: () => pageHead("Select your match", "Choose your match at OMNYA LAB STADIUM and explore seats in 3D. Clearly labelled demo football fixtures."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-B6Al4Sp5.mjs");
var Route$3 = createFileRoute("/privacy")({
	head: () => pageHead("Privacy policy", "Privacy policy for OMNYA LAB STADIUM and its clearly labelled demo football booking experience."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./stadium-BuOZZyAC.mjs");
var Route$2 = createFileRoute("/stadium")({
	head: () => pageHead("Explore the stadium & select seats", "Explore the original full 3D OMNYA LAB STADIUM, select match-specific demo seats and preview the actual pitch view from your seat."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./terms-DVE8U9_C.mjs");
var Route$1 = createFileRoute("/terms")({
	head: () => pageHead("Terms of use", "Terms of use for OMNYA LAB STADIUM and its clearly labelled demo football booking experience."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./vip-DrcJ5Ibo.mjs");
var Route = createFileRoute("/vip")({
	head: () => pageHead("VIP experience & private skyboxes", "Discover executive seating and private skybox hospitality at OMNYA LAB STADIUM. Preview actual 3D VIP pitch views and demo packages."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$11.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$12
	}),
	AboutRoute: Route$10.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$12
	}),
	BookingConfirmationRoute: Route$9.update({
		id: "/booking-confirmation",
		path: "/booking-confirmation",
		getParentRoute: () => Route$12
	}),
	CheckoutRoute: Route$8.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$12
	}),
	ContactRoute: Route$7.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$12
	}),
	FaqsRoute: Route$6.update({
		id: "/faqs",
		path: "/faqs",
		getParentRoute: () => Route$12
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$12
	}),
	MatchesRoute: Route$4.update({
		id: "/matches",
		path: "/matches",
		getParentRoute: () => Route$12
	}),
	PrivacyRoute: Route$3.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$12
	}),
	StadiumRoute: Route$2.update({
		id: "/stadium",
		path: "/stadium",
		getParentRoute: () => Route$12
	}),
	TermsRoute: Route$1.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$12
	}),
	VipRoute: Route.update({
		id: "/vip",
		path: "/vip",
		getParentRoute: () => Route$12
	})
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
