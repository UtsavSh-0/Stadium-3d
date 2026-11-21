import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { f as simulatePayment, h as useBooking, o as money } from "./BookingProvider-CcPpexyH.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as cn, t as Button } from "./button-CSYEzMAx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as FlaskConical, D as CreditCard, S as Info, V as ArrowRight, a as Smartphone, b as LockKeyhole, c as ShieldCheck, t as X, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as BookingSummary } from "./BookingSummary-D4CrpaNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BC-VJV1k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function DemoPaymentGateway({ open, onClose, amount, guest, onSuccess }) {
	const [method, setMethod] = (0, import_react.useState)("card");
	const [outcome, setOutcome] = (0, import_react.useState)("success");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const attempt = (0, import_react.useRef)(0);
	const inFlight = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!open) {
			attempt.current++;
			inFlight.current = false;
			setProcessing(false);
			setError("");
		}
	}, [open]);
	(0, import_react.useEffect)(() => () => {
		attempt.current++;
	}, []);
	async function pay() {
		if (inFlight.current) return;
		inFlight.current = true;
		setProcessing(true);
		setError("");
		const current = ++attempt.current;
		try {
			await new Promise((resolve) => setTimeout(resolve, 900));
			if (current !== attempt.current) return;
			await onSuccess(simulatePayment(amount, method, outcome));
		} catch (err) {
			if (current === attempt.current) setError(err instanceof Error ? err.message : "Demo payment could not be completed. Please retry.");
		} finally {
			if (current === attempt.current) {
				inFlight.current = false;
				setProcessing(false);
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next && !processing) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "payment-dialog",
			onEscapeKeyDown: (e) => {
				if (processing) e.preventDefault();
			},
			onPointerDownOutside: (e) => {
				if (processing) e.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pr-5 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-semibold",
							children: "OMNYA PAY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-[9px] text-primary font-bold tracking-[1px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { size: 12 }), "DEMO MODE"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-3xl",
						children: "YOUR MATCH-DAY PAYMENT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-xs leading-6",
						children: "Simulated payment only. No real money moves, and no card or bank details are collected."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "payment-amount",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground",
						children: "TOTAL · INR"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-display text-4xl",
						children: money(amount)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground truncate max-w-36",
						children: guest
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					role: "group",
					"aria-label": "Payment method",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: processing,
						className: "flex-1",
						variant: method === "card" ? "ticket" : "stadium",
						"aria-pressed": method === "card",
						onClick: () => {
							setMethod("card");
							setError("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {}), "CARD"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						disabled: processing,
						className: "flex-1",
						variant: method === "upi" ? "ticket" : "stadium",
						"aria-pressed": method === "upi",
						onClick: () => {
							setMethod("upi");
							setError("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {}), "UPI"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "payment-instrument",
					children: method === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {
						size: 24,
						className: "text-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold",
						children: "Demo Visa ···· 4242"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground mt-1",
						children: "Sample card · No card entry required"
					})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
						size: 24,
						className: "text-primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold",
						children: "demo@omnya.test"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground mt-1",
						children: "Simulated UPI account · No bank connection"
					})] })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "form-label",
					children: ["Test payment result", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "filter-select w-full",
						"aria-label": "Test payment result",
						disabled: processing,
						value: outcome,
						onChange: (e) => {
							setOutcome(e.target.value === "declined" ? "declined" : "success");
							setError("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "success",
							children: "Successful payment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "declined",
							children: "Declined payment"
						})]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-seat-booked text-xs leading-6",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ticket",
					className: "w-full",
					disabled: processing,
					onClick: pay,
					children: processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "PROCESSING DEMO PAYMENT…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}),
						"PAY ",
						money(amount),
						" · DEMO ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "text-xs text-muted-foreground",
					disabled: processing,
					onClick: onClose,
					children: "Cancel payment"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "demo-note justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "No charge · Not a valid stadium ticket"]
				})
			]
		})
	});
}
function Checkout() {
	const booking = useBooking();
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)("");
	const [guest, setGuest] = (0, import_react.useState)(null);
	if (!booking.hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-container py-20 text-muted-foreground",
		children: "Loading your booking…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "eyebrow",
					children: "03 / YOUR MATCH DAY STARTS HERE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-heading page-title",
					children: "MAKE IT YOURS."
				})]
			}),
			!booking.selectedSeats.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6",
					children: "No tickets selected yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ticket",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stadium",
						children: ["FIND YOUR SEATS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "checkout-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						setError("");
						const data = new FormData(e.currentTarget);
						setGuest(String(data.get("name") ?? "Guest"));
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold mb-6",
							children: "YOUR DETAILS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "checkout-fields",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "form-label",
									children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "form-input",
										name: "name",
										autoComplete: "name",
										required: true,
										minLength: 2,
										placeholder: "Your full name"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "form-label",
									children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "form-input",
										type: "email",
										name: "email",
										autoComplete: "email",
										required: true,
										placeholder: "you@example.com"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "form-label",
									children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "form-input",
										type: "tel",
										name: "phone",
										autoComplete: "tel",
										required: true,
										pattern: "[+0-9 ()-]{7,20}",
										placeholder: "+91"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-y border-border py-6 my-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold mb-3",
								children: "DEMO RESERVATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground leading-6 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									size: 18,
									className: "shrink-0 mt-1 text-primary"
								}), "No payment will be collected. This reservation is saved in this browser only, not with the stadium. It is not a valid entry ticket, and no email will be sent."]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs flex gap-3 text-muted-foreground leading-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									required: true,
									className: "mt-1 accent-primary"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"I agree to the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										className: "text-primary underline",
										children: "terms"
									}),
									" and understand this is a demo booking."
								] })
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-destructive text-sm mt-5",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ticket",
							type: "submit",
							className: "mt-7",
							children: ["CONTINUE TO DEMO PAYMENT ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "demo-note mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "No payment details required."]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSummary, { checkout: true })]
			}),
			guest !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoPaymentGateway, {
				open: true,
				onClose: () => setGuest(null),
				amount: booking.total,
				guest,
				onSuccess: async (payment) => {
					booking.complete(guest, payment);
					await navigate({ to: "/booking-confirmation" });
				}
			})
		]
	});
}
//#endregion
export { Checkout as component };
