export type PaymentMethod = 'card' | 'upi';
export type DemoOutcome = 'success' | 'declined';
export type DemoPayment = { mode: 'demo'; status: 'succeeded'; method: PaymentMethod; reference: string; amount: number; currency: 'INR' };

export function simulatePayment(amount: number, method: PaymentMethod, outcome: DemoOutcome): DemoPayment {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('The payment amount must be greater than zero.');
  if (outcome === 'declined') throw new Error('Demo payment declined. Your seats are still selected. Please try again.');
  return { mode: 'demo', status: 'succeeded', method, reference: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, amount, currency: 'INR' };
}

export function validateDemoPayment(payment: DemoPayment, total: number) {
  if (payment.mode !== 'demo' || payment.status !== 'succeeded' || payment.amount !== total || payment.currency !== 'INR') throw new Error('Your booking total changed. Please retry the demo payment.');
}