import { useEffect, useRef, useState } from 'react';
import { CreditCard, Smartphone, ShieldCheck, LockKeyhole, LoaderCircle, ArrowRight, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { money } from './inventory';
import { simulatePayment, type DemoOutcome, type DemoPayment, type PaymentMethod } from './demo-payment';

export function DemoPaymentGateway({ open, onClose, amount, guest, onSuccess }: { open: boolean; onClose: () => void; amount: number; guest: string; onSuccess: (payment: DemoPayment) => Promise<void> }) {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [outcome, setOutcome] = useState<DemoOutcome>('success');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const attempt = useRef(0);
  const inFlight = useRef(false);
  useEffect(() => { if (!open) { attempt.current++; inFlight.current = false; setProcessing(false); setError(''); } }, [open]);
  useEffect(() => () => { attempt.current++; }, []);
  async function pay() {
    if (inFlight.current) return;
    inFlight.current = true; setProcessing(true); setError('');
    const current = ++attempt.current;
    try {
      await new Promise(resolve => setTimeout(resolve, 900));
      if (current !== attempt.current) return;
      await onSuccess(simulatePayment(amount, method, outcome));
    } catch (err) {
      if (current === attempt.current) setError(err instanceof Error ? err.message : 'Demo payment could not be completed. Please retry.');
    } finally { if (current === attempt.current) { inFlight.current = false; setProcessing(false); } }
  }
  return <Dialog open={open} onOpenChange={next => { if (!next && !processing) onClose(); }}><DialogContent className="payment-dialog" onEscapeKeyDown={e => { if (processing) e.preventDefault(); }} onPointerDownOutside={e => { if (processing) e.preventDefault(); }}><DialogHeader><div className="flex items-center justify-between pr-5 mb-3"><span className="font-display text-xl font-semibold">OMNYA PAY</span><span className="flex items-center gap-1.5 text-[9px] text-primary font-bold tracking-[1px]"><FlaskConical size={12} />DEMO MODE</span></div><DialogTitle className="font-display text-3xl">YOUR MATCH-DAY PAYMENT</DialogTitle><DialogDescription className="text-xs leading-6">Simulated payment only. No real money moves, and no card or bank details are collected.</DialogDescription></DialogHeader><div className="payment-amount"><div><p className="text-[10px] text-muted-foreground">TOTAL · INR</p><strong className="font-display text-4xl">{money(amount)}</strong></div><span className="text-xs text-muted-foreground truncate max-w-36">{guest}</span></div><div className="flex gap-2" role="group" aria-label="Payment method"><Button disabled={processing} className="flex-1" variant={method === 'card' ? 'ticket' : 'stadium'} aria-pressed={method === 'card'} onClick={() => { setMethod('card'); setError(''); }}><CreditCard />CARD</Button><Button disabled={processing} className="flex-1" variant={method === 'upi' ? 'ticket' : 'stadium'} aria-pressed={method === 'upi'} onClick={() => { setMethod('upi'); setError(''); }}><Smartphone />UPI</Button></div><div className="payment-instrument">{method === 'card' ? <><CreditCard size={24} className="text-primary" /><div><p className="text-xs font-bold">Demo Visa ···· 4242</p><p className="text-[10px] text-muted-foreground mt-1">Sample card · No card entry required</p></div></> : <><Smartphone size={24} className="text-primary" /><div><p className="text-xs font-bold">demo@omnya.test</p><p className="text-[10px] text-muted-foreground mt-1">Simulated UPI account · No bank connection</p></div></>}</div><label className="form-label">Test payment result<select className="filter-select w-full" aria-label="Test payment result" disabled={processing} value={outcome} onChange={e => { setOutcome(e.target.value === 'declined' ? 'declined' : 'success'); setError(''); }}><option value="success">Successful payment</option><option value="declined">Declined payment</option></select></label>{error && <p role="alert" className="text-seat-booked text-xs leading-6">{error}</p>}<Button variant="ticket" className="w-full" disabled={processing} onClick={pay}>{processing ? <><LoaderCircle className="animate-spin" />PROCESSING DEMO PAYMENT…</> : <><LockKeyhole />PAY {money(amount)} · DEMO <ArrowRight /></>}</Button><Button variant="ghost" className="text-xs text-muted-foreground" disabled={processing} onClick={onClose}>Cancel payment</Button><p className="demo-note justify-center"><ShieldCheck size={12} />No charge · Not a valid stadium ticket</p></DialogContent></Dialog>;
}