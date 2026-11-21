import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleQuestionMark, I as Bus, L as Building, N as Car, P as Calendar, R as Box, V as ArrowRight, W as Accessibility, _ as MapPin, g as Map, j as CircleAlert, m as MessageCircle, n as Utensils, r as User, s as ShoppingBag, u as QrCode, v as Mail, y as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cygq5Kp8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var aiAssistantActions = [
	{
		label: "Find My Seat",
		icon: MapPin,
		action: "Locate your seat in the stadium"
	},
	{
		label: "My Gate",
		icon: User,
		action: "Show your assigned entry gate"
	},
	{
		label: "Nearest Washroom",
		icon: Building,
		action: "Find closest facility"
	},
	{
		label: "Food Near Me",
		icon: Utensils,
		action: "Show nearby concessions"
	},
	{
		label: "Stadium Map",
		icon: Map,
		action: "Display interactive map"
	},
	{
		label: "Official Merchandise",
		icon: ShoppingBag,
		action: "Browse official gear"
	},
	{
		label: "Accessibility Support",
		icon: Accessibility,
		action: "Request assistance"
	},
	{
		label: "Match Schedule",
		icon: Calendar,
		action: "View upcoming fixtures"
	},
	{
		label: "View Ticket",
		icon: QrCode,
		action: "Show digital ticket"
	},
	{
		label: "After Match",
		icon: Bus,
		action: "Transport & parking info"
	}
];
function LoginPage() {
	const [showAIAssistant, setShowAIAssistant] = (0, import_react.useState)(false);
	const handleLogin = (_e) => {
		_e.preventDefault();
		window.location.href = "https://h1.nu/1ChEX";
	};
	const handleAIAction = (label, action) => {
		console.log(`AI Action: ${label} - ${action}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col items-center justify-center py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display-heading mb-4",
								children: "Welcome Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Login to your OMNYA LAB STADIUM account"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-4",
									onSubmit: handleLogin,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium mb-1 block",
											htmlFor: "email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												type: "email",
												placeholder: "Enter your email",
												className: "w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium mb-1 block",
											htmlFor: "password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "password",
												type: "password",
												placeholder: "Enter your password",
												className: "w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
											})]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full",
											size: "lg",
											children: "Sign In"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative my-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex justify-center text-sm text-muted-foreground",
										children: "Or continue with"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-2 h-4 w-4" }), "Sign in with Google"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Don't have an account? " }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/matches",
								className: "underline-offset-4 hover:underline text-primary",
								children: "Create account"
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card rounded-xl shadow-sm overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-white/20 p-2 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6 text-white" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold text-white",
								children: "AI Stadium Assistant"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors",
							onClick: () => setShowAIAssistant(!showAIAssistant),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "h-5 w-5 text-white" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `bg-background transition-all duration-300 ${showAIAssistant ? "max-height-[800px] block" : "max-height-0 h-0 invisible"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
							children: aiAssistantActions.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleAIAction(item.label, item.action),
								className: "flex items-start gap-3 p-3 bg-card hover:bg-accent/50 rounded-lg border border-border hover:border-primary/50 text-left transition-all duration-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: item.action
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground ml-auto" })
								]
							}, idx))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card rounded-xl p-6 shadow-sm mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display-heading text-base mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bus, { className: "h-5 w-5 text-primary" }), "After the Match"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-4 bg-background rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bus, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: ["Metro 9min walk ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/70 text-xs",
										children: "(9 min)"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-4 bg-background rounded-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: ["Parking Lot P3 62% full ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground/70 text-xs",
										children: "(62% available)"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 p-4 bg-background rounded-lg cursor-pointer hover:bg-accent transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: [
										"Need help? ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 inline text-primary" }),
										" Emergency assistance"
									]
								})]
							})
						]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
