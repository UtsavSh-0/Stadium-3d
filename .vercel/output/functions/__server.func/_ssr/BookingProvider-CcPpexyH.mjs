import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BookingProvider-CcPpexyH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Inner bowl edge (the grass ends here). */
var BOWL = {
	halfX: 60,
	halfZ: 42,
	cornerR: 9
};
var CORE = {
	x: BOWL.halfX - BOWL.cornerR,
	z: BOWL.halfZ - BOWL.cornerR
};
var TIERS = [
	{
		name: "Lower",
		d0: 3,
		y0: 1.4,
		rows: 16,
		tread: .8,
		rise: .36
	},
	{
		name: "Middle",
		d0: 17,
		y0: 11,
		rows: 13,
		tread: .85,
		rise: .48
	},
	{
		name: "Upper",
		d0: 30.5,
		y0: 19.6,
		rows: 15,
		tread: .85,
		rise: .58
	}
];
var tierEnd = (t) => ({
	d: t.d0 + t.rows * t.tread,
	y: t.y0 + (t.rows - 1) * t.rise
});
tierEnd(TIERS[0]).y, tierEnd(TIERS[1]).y;
/** Centre of corner arc k (0..3, loop order). */
function cornerAt(k) {
	return [k === 0 || k === 3 ? CORE.x : -CORE.x, k < 2 ? CORE.z : -CORE.z];
}
/** Length of the straight side that ends at corner k. */
var sideLength = (k) => k % 2 === 0 ? 2 * CORE.z : 2 * CORE.x;
/** Deterministic RNG so seat colours never change between loads. */
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 >>> 0;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var SEAT = {
	pitch: .52,
	blockSeats: 18,
	aisle: 1.3
};
/** Aisle centre positions along a straight side of length L (centred at 0). */
function straightAisles(L) {
	const blockLen = SEAT.blockSeats * SEAT.pitch;
	const n = Math.floor((L - SEAT.aisle) / (blockLen + SEAT.aisle));
	let s = -(n * blockLen + (n + 1) * SEAT.aisle) / 2;
	const aisles = [];
	const blocks = [];
	for (let i = 0; i < n; i++) {
		aisles.push(s + SEAT.aisle / 2);
		s += SEAT.aisle;
		blocks.push([s, s + blockLen]);
		s += blockLen;
	}
	aisles.push(s + SEAT.aisle / 2);
	return {
		aisles,
		blocks
	};
}
/** Radial aisle angle fractions inside each corner, per tier. */
var CORNER_AISLES = [
	[.5],
	[1 / 3, 2 / 3],
	[
		.25,
		.5,
		.75
	]
];
var cornerAisles = (ti) => CORNER_AISLES[ti] ?? [];
/** Every seat in the stadium, row by row, with aisles left clear for stairways. */
function buildSeats(seed = 7) {
	const rng = mulberry32(seed);
	const xs = [];
	const perTier = [];
	const blue = [];
	const shade = [];
	const push = (x, y, z, nx, nz) => {
		xs.push(x, y, z, Math.atan2(-nx, -nz));
		blue.push(rng() < .09 ? 1 : 0);
		shade.push(.9 + rng() * .15);
	};
	TIERS.forEach((tier, ti) => {
		const before = blue.length;
		for (let row = 0; row < tier.rows; row++) {
			const d = tier.d0 + row * tier.tread + tier.tread * .42;
			const y = tier.y0 + row * tier.rise;
			const r = BOWL.cornerR + d;
			for (let k = 0; k < 4; k++) {
				const [cx, cz] = cornerAt(k);
				const a0 = k * Math.PI / 2;
				const nx = Math.cos(a0);
				const nz = Math.sin(a0);
				const tx = -Math.sin(a0);
				const tz = Math.cos(a0);
				const L = sideLength(k);
				const { blocks } = straightAisles(L);
				for (const [s0, s1] of blocks) for (let s = s0 + SEAT.pitch / 2; s < s1; s += SEAT.pitch) {
					const along = L / 2 - s;
					const ox = cx - tx * along;
					const oz = cz - tz * along;
					push(ox + nx * r, y, oz + nz * r, nx, nz);
				}
				const arcLen = Math.PI / 2 * r;
				const cuts = [
					0,
					...cornerAisles(ti),
					1
				];
				const margin = .9;
				for (let c = 0; c < cuts.length - 1; c++) {
					const sa = (cuts[c] ?? 0) * arcLen + (c === 0 ? margin : SEAT.aisle / 2);
					const sb = (cuts[c + 1] ?? 0) * arcLen - (c === cuts.length - 2 ? margin : SEAT.aisle / 2);
					const n = Math.floor((sb - sa) / SEAT.pitch);
					if (n <= 0) continue;
					const pad = (sb - sa - n * SEAT.pitch) / 2;
					for (let i = 0; i < n; i++) {
						const a = a0 + (sa + pad + (i + .5) * SEAT.pitch) / r;
						const cnx = Math.cos(a);
						const cnz = Math.sin(a);
						push(cx + cnx * r, y, cz + cnz * r, cnx, cnz);
					}
				}
			}
		}
		perTier.push(blue.length - before);
	});
	return {
		count: blue.length,
		transforms: new Float32Array(xs),
		blue: Uint8Array.from(blue),
		shade: Float32Array.from(shade),
		perTier
	};
}
var matches = [
	{
		id: "demo-01",
		home: "OMNYA FC",
		away: "LAB UNITED",
		homeCode: "OFC",
		awayCode: "LU",
		competition: "Stadium Invitational",
		date: "2026-12-05",
		time: "19:30",
		price: 1200,
		multiplier: 1,
		label: "Opening night",
		status: "On sale"
	},
	{
		id: "demo-02",
		home: "LAB UNITED",
		away: "OMNYA FC",
		homeCode: "LU",
		awayCode: "OFC",
		competition: "Winter Cup",
		date: "2026-12-12",
		time: "20:00",
		price: 1500,
		multiplier: 1.25,
		label: "Under the lights",
		status: "On sale"
	},
	{
		id: "demo-03",
		home: "OMNYA FC",
		away: "LAB UNITED",
		homeCode: "OFC",
		awayCode: "LU",
		competition: "Stadium Invitational",
		date: "2026-12-19",
		time: "18:30",
		price: 1320,
		multiplier: 1.1,
		label: "The season finale",
		status: "On sale"
	}
];
var stands = [
	"North",
	"South",
	"East",
	"West"
];
var geometry = buildSeats();
var rowCounters = /* @__PURE__ */ new Map();
var seats = Array.from({ length: geometry.count }, (_, index) => {
	const x = geometry.transforms[index * 4] ?? 0;
	const y = geometry.transforms[index * 4 + 1] ?? 0;
	const z = geometry.transforms[index * 4 + 2] ?? 0;
	const stand = Math.abs(x) / 60 > Math.abs(z) / 42 ? x > 0 ? "East" : "West" : z > 0 ? "South" : "North";
	const tierIndex = y >= TIERS[2].y0 ? 2 : y >= TIERS[1].y0 ? 1 : 0;
	const tier = TIERS[tierIndex] ?? TIERS[0];
	const row = Math.round((y - tier.y0) / tier.rise) + 1;
	const along = stand === "North" || stand === "South" ? x : z;
	const extent = stand === "North" || stand === "South" ? 98 : 78;
	const blockIndex = Math.min(7, Math.max(0, Math.floor((along + extent) / (extent * 2) * 8)));
	const block = `${stand[0]}${tierIndex + 1}${blockIndex + 1}`;
	const key = `${block}-${row}`;
	const number = (rowCounters.get(key) ?? 0) + 1;
	rowCounters.set(key, number);
	const vip = tierIndex === 1 && stand === "South" && Math.abs(x) < 22;
	return {
		id: `seat-${index}`,
		index,
		stand,
		tier: tier.name,
		block,
		row,
		number,
		category: vip ? "Executive" : tierIndex === 1 ? "Premium" : tierIndex === 2 ? "Standard" : "Pitch-side",
		position: [
			x,
			y,
			z
		],
		rotation: geometry.transforms[index * 4 + 3] ?? 0,
		capacity: 1
	};
});
var skyboxes = [
	-15,
	-5,
	5,
	15
].map((x, index) => ({
	id: `skybox-${index + 1}`,
	index: geometry.count + index,
	stand: "South",
	tier: "Skybox",
	block: `VIP${index + 1}`,
	row: 1,
	number: index + 1,
	category: "Private Skybox",
	position: [
		x,
		7.3,
		63
	],
	rotation: Math.PI,
	capacity: 8
}));
var allSeats = [...seats, ...skyboxes];
var seatById = new Map(allSeats.map((s) => [s.id, s]));
function matchById(id) {
	return matches.find((m) => m.id === id) ?? matches[0];
}
function seatStatus(seat, matchId, reserved = []) {
	if (reserved.includes(`${matchId}:${seat.id}`)) return "booked";
	if (seat.category === "Private Skybox") return seat.number === 4 ? "booked" : "available";
	const seed = (seat.index * 37 + (matchId === "demo-02" ? 41 : matchId === "demo-03" ? 73 : 0)) % 100;
	if (seat.block.endsWith("1") && seat.tier === "Upper") return "soldout";
	return seed < 16 ? "soldout" : seed < 43 ? "booked" : "available";
}
function seatPrice(seat, match) {
	const base = seat.category === "Private Skybox" ? 8e4 : seat.category === "Executive" ? 7500 : seat.tier === "Middle" ? 2500 : seat.tier === "Upper" ? 1200 : 1800;
	const standPremium = seat.stand === "South" || seat.stand === "North" ? 1.15 : 1;
	return Math.round(base * (seat.category === "Private Skybox" ? 1 : standPremium) * match.multiplier / 10) * 10;
}
function seatView(seat) {
	const [x, y, z] = seat.position;
	return {
		pos: [
			x,
			y + 1.15,
			z
		],
		target: [
			0,
			1,
			0
		],
		distance: Math.round(Math.hypot(x, z)),
		angle: Math.round(Math.atan2(y + 1.15, Math.hypot(x, z)) * 180 / Math.PI),
		perspective: seat.stand === "East" || seat.stand === "West" ? "Behind the goal" : Math.abs(x) < 25 ? "Central pitch view" : "Corner-side view"
	};
}
function reserveDemo(ids, matchId, reserved) {
	if (!ids.length) throw new Error("Please select at least one seat.");
	const unique = [...new Set(ids)];
	for (const id of unique) {
		const seat = seatById.get(id);
		if (!seat || seatStatus(seat, matchId, reserved) !== "available") throw new Error("A selected seat is no longer available. Please choose another.");
	}
	return [...reserved, ...unique.map((id) => `${matchId}:${id}`)];
}
var money = (value) => `₹${value.toLocaleString("en-IN")}`;
var matchDate = (date) => (/* @__PURE__ */ new Date(`${date}T12:00:00Z`)).toLocaleDateString("en-GB", {
	day: "numeric",
	month: "short",
	timeZone: "UTC"
});
function simulatePayment(amount, method, outcome) {
	if (!Number.isFinite(amount) || amount <= 0) throw new Error("The payment amount must be greater than zero.");
	if (outcome === "declined") throw new Error("Demo payment declined. Your seats are still selected. Please try again.");
	return {
		mode: "demo",
		status: "succeeded",
		method,
		reference: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
		amount,
		currency: "INR"
	};
}
function validateDemoPayment(payment, total) {
	if (payment.mode !== "demo" || payment.status !== "succeeded" || payment.amount !== total || payment.currency !== "INR") throw new Error("Your booking total changed. Please retry the demo payment.");
}
var initial = {
	matchId: matches[0].id,
	selected: [],
	reserved: [],
	receipt: null
};
var BookingContext = (0, import_react.createContext)(null);
var storageKey = "omnya-demo-booking-v1";
function BookingProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(initial);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(storageKey);
			if (raw) {
				const saved = JSON.parse(raw);
				if (matches.some((m) => m.id === saved.matchId) && Array.isArray(saved.selected) && Array.isArray(saved.reserved)) setState({
					...saved,
					selected: saved.selected.filter((id) => seatById.has(id)),
					receipt: saved.receipt ?? null
				});
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) try {
			localStorage.setItem(storageKey, JSON.stringify(state));
		} catch {}
	}, [state, hydrated]);
	const selectedSeats = state.selected.flatMap((id) => {
		const seat = seatById.get(id);
		return seat ? [seat] : [];
	});
	const total = selectedSeats.reduce((sum, seat) => sum + seatPrice(seat, matchById(state.matchId)), 0);
	const value = {
		...state,
		hydrated,
		selectedSeats,
		total,
		selectMatch: (id) => setState((old) => ({
			...old,
			matchId: matchById(id).id,
			selected: old.matchId === id ? old.selected : []
		})),
		toggleSeat: (id) => setState((old) => {
			const seat = seatById.get(id);
			if (!seat || seatStatus(seat, old.matchId, old.reserved) !== "available") return old;
			return {
				...old,
				selected: old.selected.includes(id) ? old.selected.filter((s) => s !== id) : [...old.selected, id]
			};
		}),
		removeSeat: (id) => setState((old) => ({
			...old,
			selected: old.selected.filter((s) => s !== id)
		})),
		complete: (name, payment) => {
			validateDemoPayment(payment, total);
			let latest = state.reserved;
			try {
				const raw = localStorage.getItem(storageKey);
				if (raw) {
					const stored = JSON.parse(raw);
					if (Array.isArray(stored.reserved)) latest = [.../* @__PURE__ */ new Set([...latest, ...stored.reserved])];
				}
			} catch {}
			const reserved = reserveDemo(state.selected, state.matchId, latest);
			const receipt = {
				reference: `OM-${Date.now().toString(36).toUpperCase()}`,
				matchId: state.matchId,
				seatIds: state.selected,
				name,
				total,
				payment
			};
			const next = {
				...state,
				reserved,
				selected: [],
				receipt
			};
			try {
				localStorage.setItem(storageKey, JSON.stringify(next));
			} catch {}
			setState(next);
			return receipt;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingContext.Provider, {
		value,
		children
	});
}
function useBooking() {
	const value = (0, import_react.useContext)(BookingContext);
	if (!value) throw new Error("Booking context is missing");
	return value;
}
//#endregion
export { matches as a, seatPrice as c, seats as d, simulatePayment as f, useBooking as h, matchDate as i, seatStatus as l, stands as m, allSeats as n, money as o, skyboxes as p, matchById as r, seatById as s, BookingProvider as t, seatView as u };
