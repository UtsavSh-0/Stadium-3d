import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { allSeats, matchById, matches, reserveDemo, seatById, seatPrice, seatStatus, type Seat } from './inventory';
import { validateDemoPayment, type DemoPayment } from './demo-payment';

type Receipt = { reference: string; matchId: string; seatIds: string[]; name: string; total: number; payment?: DemoPayment };
type Stored = { matchId: string; selected: string[]; reserved: string[]; receipt: Receipt | null };
const initial: Stored = { matchId: matches[0].id, selected: [], reserved: [], receipt: null };
type Context = Stored & { hydrated: boolean; selectedSeats: Seat[]; total: number; selectMatch: (id: string) => void; toggleSeat: (id: string) => void; removeSeat: (id: string) => void; complete: (name: string, payment: DemoPayment) => Receipt };
const BookingContext = createContext<Context | null>(null);
const storageKey = 'omnya-demo-booking-v1';
export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Stored>(initial);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Stored;
        if (matches.some(m => m.id === saved.matchId) && Array.isArray(saved.selected) && Array.isArray(saved.reserved)) setState({ ...saved, selected: saved.selected.filter(id => seatById.has(id)), receipt: saved.receipt ?? null });
      }
    } catch { /* A fresh demo remains usable when storage is unavailable. */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) { try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Storage is optional for demo mode. */ } } }, [state, hydrated]);
  const selectedSeats = state.selected.flatMap(id => { const seat = seatById.get(id); return seat ? [seat] : []; });
  const total = selectedSeats.reduce((sum, seat) => sum + seatPrice(seat, matchById(state.matchId)), 0);
  const value: Context = {
    ...state, hydrated, selectedSeats, total,
    selectMatch: id => setState(old => ({ ...old, matchId: matchById(id).id, selected: old.matchId === id ? old.selected : [] })),
    toggleSeat: id => setState(old => {
      const seat = seatById.get(id);
      if (!seat || seatStatus(seat, old.matchId, old.reserved) !== 'available') return old;
      return { ...old, selected: old.selected.includes(id) ? old.selected.filter(s => s !== id) : [...old.selected, id] };
    }),
    removeSeat: id => setState(old => ({ ...old, selected: old.selected.filter(s => s !== id) })),
    complete: (name, payment) => {
      validateDemoPayment(payment, total);
      let latest = state.reserved;
      try { const raw = localStorage.getItem(storageKey); if (raw) { const stored = JSON.parse(raw) as Stored; if (Array.isArray(stored.reserved)) latest = [...new Set([...latest, ...stored.reserved])]; } } catch { /* Use current demo state. */ }
      const reserved = reserveDemo(state.selected, state.matchId, latest);
      const receipt = { reference: `OM-${Date.now().toString(36).toUpperCase()}`, matchId: state.matchId, seatIds: state.selected, name, total, payment };
      const next = { ...state, reserved, selected: [], receipt };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Current session remains usable. */ }
      setState(next);
      return receipt;
    },
  };
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
export function useBooking() { const value = useContext(BookingContext); if (!value) throw new Error('Booking context is missing'); return value; }
export { allSeats };