import { describe, expect, it } from 'vitest';
import { simulatePayment, validateDemoPayment } from './demo-payment';
describe('simulated payment gateway', () => {
  it('creates only a demo payment for the exact ticket amount', () => {
    const payment = simulatePayment(5000, 'card', 'success');
    expect(payment).toMatchObject({ mode: 'demo', status: 'succeeded', amount: 5000, currency: 'INR', method: 'card' });
    expect(payment.reference).toMatch(/^DEMO-/);
  });
  it('supports a simulated UPI payment', () => {
    expect(simulatePayment(2500, 'upi', 'success').method).toBe('upi');
  });
  it('does not produce a payment on decline', () => {
    expect(() => simulatePayment(5000, 'card', 'declined')).toThrow('Demo payment declined');
  });
  it('rejects a changed total before reservation', () => {
    const payment = simulatePayment(2500, 'card', 'success');
    expect(() => validateDemoPayment(payment, 5000)).toThrow('total changed');
    expect(() => validateDemoPayment(payment, 2500)).not.toThrow();
  });
  it('rejects empty or invalid amounts', () => {
    expect(() => simulatePayment(0, 'card', 'success')).toThrow('greater than zero');
    expect(() => simulatePayment(NaN, 'upi', 'success')).toThrow('greater than zero');
  });
});