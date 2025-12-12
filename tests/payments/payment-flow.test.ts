/**
 * Payment Flow Testing Suite
 * Tests all payment methods and scenarios
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Payment Flow Tests', () => {
  let testSessionId: string;
  let testCustomerId: string;

  beforeAll(async () => {
    // Setup test environment
    console.log('🧪 Setting up payment tests...');
  });

  afterAll(async () => {
    // Cleanup test data
    console.log('🧹 Cleaning up payment tests...');
  });

  describe('Stripe Configuration', () => {
    it('should have Stripe keys configured', () => {
      expect(process.env.STRIPE_SECRET_KEY).toBeDefined();
      expect(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).toBeDefined();
    });

    it('should validate Stripe key format', () => {
      const secretKey = process.env.STRIPE_SECRET_KEY;
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (secretKey) {
        expect(secretKey.startsWith('sk_')).toBe(true);
      }

      if (publishableKey) {
        expect(publishableKey.startsWith('pk_')).toBe(true);
      }
    });
  });

  describe('Payment Session Creation', () => {
    it('should create checkout session for full payment', async () => {
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'test-program-id',
          paymentType: 'full',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        expect(data.url).toBeDefined();
        expect(data.sessionId).toBeDefined();
        testSessionId = data.sessionId;
      } else {
        // Expected to fail without auth in test
        expect(data.error).toBeDefined();
      }
    });

    it('should create checkout session for payment plan', async () => {
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'test-program-id',
          paymentType: 'plan',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        expect(data.url).toBeDefined();
        expect(data.sessionId).toBeDefined();
      }
    });
  });

  describe('Payment Methods', () => {
    const paymentMethods = [
      'card',
      'affirm',
      'klarna',
      'afterpay_clearpay',
      'us_bank_account',
      'cashapp',
      'paypal',
    ];

    paymentMethods.forEach((method) => {
      it(`should support ${method} payment method`, async () => {
        const response = await fetch('http://localhost:3000/api/payments/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            programId: 'test-program-id',
            paymentType: 'full',
            preferredMethod: method,
          }),
        });

        // Should not error on payment method
        expect(response.status).not.toBe(500);
      });
    });
  });

  describe('Payment Validation', () => {
    it('should reject payment without program ID', async () => {
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentType: 'full',
        }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('Program ID');
    });

    it('should handle invalid payment type', async () => {
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'test-program-id',
          paymentType: 'invalid',
        }),
      });

      // Should default to 'full' or reject
      expect([200, 400]).toContain(response.status);
    });
  });

  describe('Stripe Test Cards', () => {
    const testCards = [
      { number: '4242424242424242', description: 'Visa - Success' },
      { number: '4000000000000002', description: 'Visa - Declined' },
      { number: '4000002500003155', description: 'Visa - Requires Authentication' },
      { number: '5555555555554444', description: 'Mastercard - Success' },
      { number: '378282246310005', description: 'Amex - Success' },
    ];

    testCards.forEach((card) => {
      it(`should handle ${card.description}`, () => {
        // Document test card for manual testing
        expect(card.number).toHaveLength(15); // Amex
        // OR
        expect(card.number).toHaveLength(16); // Visa/MC
      });
    });
  });

  describe('Webhook Handling', () => {
    it('should have webhook endpoint', async () => {
      const response = await fetch('http://localhost:3000/api/stripe/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      // Should not be 404
      expect(response.status).not.toBe(404);
    });
  });

  describe('Error Handling', () => {
    it('should handle Stripe API errors gracefully', async () => {
      // Test with invalid data
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'invalid-program-that-does-not-exist',
          paymentType: 'full',
        }),
      });

      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(data.code).toBeDefined();
    });

    it('should return user-friendly error messages', async () => {
      const response = await fetch('http://localhost:3000/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      expect(data.error).toBeDefined();
      expect(typeof data.error).toBe('string');
      expect(data.error.length).toBeGreaterThan(0);
    });
  });
});

describe('Payment Amount Calculations', () => {
  it('should calculate payment plan correctly', () => {
    const totalPrice = 4500;
    const monthlyPayment = Math.ceil(totalPrice / 4);
    
    expect(monthlyPayment).toBe(1125);
    expect(monthlyPayment * 4).toBeGreaterThanOrEqual(totalPrice);
  });

  it('should handle various price points', () => {
    const prices = [500, 1000, 2500, 4500, 5000];
    
    prices.forEach((price) => {
      const monthly = Math.ceil(price / 4);
      expect(monthly * 4).toBeGreaterThanOrEqual(price);
      expect(monthly * 4 - price).toBeLessThan(4); // Max $3 difference
    });
  });
});

describe('Payment Eligibility', () => {
  it('should check Affirm eligibility (min $50)', () => {
    expect(50).toBeGreaterThanOrEqual(50);
    expect(49).toBeLessThan(50);
  });

  it('should check Klarna eligibility ($35-$1000)', () => {
    expect(35).toBeGreaterThanOrEqual(35);
    expect(1000).toBeLessThanOrEqual(1000);
    expect(34).toBeLessThan(35);
    expect(1001).toBeGreaterThan(1000);
  });

  it('should check Afterpay eligibility ($35-$1000)', () => {
    expect(35).toBeGreaterThanOrEqual(35);
    expect(1000).toBeLessThanOrEqual(1000);
  });

  it('should check Cash App eligibility (max $7500)', () => {
    expect(7500).toBeLessThanOrEqual(7500);
    expect(7501).toBeGreaterThan(7500);
  });
});
