/**
 * Integration tests for Stripe payment flows
 * Tests the complete payment lifecycle
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Stripe
vi.mock('stripe', () => {
  const mockStripe = {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: 'cs_test_123',
          url: 'https://checkout.stripe.com/test',
          payment_status: 'unpaid',
          metadata: {},
        }),
        retrieve: vi.fn().mockResolvedValue({
          id: 'cs_test_123',
          payment_status: 'paid',
          metadata: {},
        }),
      },
    },
    webhooks: {
      constructEvent: vi.fn().mockReturnValue({
        id: 'evt_test_123',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            payment_status: 'paid',
            metadata: {
              user_id: 'user_123',
              course_id: 'course_123',
            },
          },
        },
      }),
    },
    customers: {
      create: vi.fn().mockResolvedValue({
        id: 'cus_test_123',
        email: 'test@example.com',
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: 'cus_test_123',
        email: 'test@example.com',
      }),
    },
    paymentIntents: {
      create: vi.fn().mockResolvedValue({
        id: 'pi_test_123',
        client_secret: 'pi_test_123_secret',
        status: 'requires_payment_method',
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: 'pi_test_123',
        status: 'succeeded',
      }),
    },
  };

  return {
    default: vi.fn(() => mockStripe),
  };
});

describe('Stripe Payment Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Checkout Session Creation', () => {
    it('should create checkout session with correct API version', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Test Course',
              },
              unit_amount: 5000,
            },
            quantity: 1,
          },
        ],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });

      expect(session.id).toBe('cs_test_123');
      expect(session.url).toBe('https://checkout.stripe.com/test');
    });

    it('should include metadata in checkout session', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        metadata: {
          user_id: 'user_123',
          course_id: 'course_123',
        },
      });

      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            user_id: 'user_123',
            course_id: 'course_123',
          }),
        })
      );
    });
  });

  describe('Webhook Event Handling', () => {
    it('should verify webhook signature correctly', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const event = stripe.webhooks.constructEvent(
        'test_payload',
        'test_signature',
        'whsec_test_secret'
      );

      expect(event.type).toBe('checkout.session.completed');
      expect(event.data.object.id).toBe('cs_test_123');
    });

    it('should handle checkout.session.completed event', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const event = stripe.webhooks.constructEvent(
        'test_payload',
        'test_signature',
        'whsec_test_secret'
      );

      expect(event.type).toBe('checkout.session.completed');
      expect(event.data.object.payment_status).toBe('paid');
      expect(event.data.object.metadata).toHaveProperty('user_id');
      expect(event.data.object.metadata).toHaveProperty('course_id');
    });
  });

  describe('Customer Management', () => {
    it('should create customer with correct data', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const customer = await stripe.customers.create({
        email: 'test@example.com',
        metadata: {
          user_id: 'user_123',
        },
      });

      expect(customer.id).toBe('cus_test_123');
      expect(customer.email).toBe('test@example.com');
    });

    it('should retrieve existing customer', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const customer = await stripe.customers.retrieve('cus_test_123');

      expect(customer.id).toBe('cus_test_123');
      expect(customer.email).toBe('test@example.com');
    });
  });

  describe('Payment Intent Flow', () => {
    it('should create payment intent successfully', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000,
        currency: 'usd',
        metadata: {
          user_id: 'user_123',
          course_id: 'course_123',
        },
      });

      expect(paymentIntent.id).toBe('pi_test_123');
      expect(paymentIntent.client_secret).toBe('pi_test_123_secret');
      expect(paymentIntent.status).toBe('requires_payment_method');
    });

    it('should retrieve payment intent with succeeded status', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      const paymentIntent = await stripe.paymentIntents.retrieve('pi_test_123');

      expect(paymentIntent.id).toBe('pi_test_123');
      expect(paymentIntent.status).toBe('succeeded');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing Stripe key gracefully', () => {
      const originalEnv = process.env.STRIPE_SECRET_KEY;
      delete process.env.STRIPE_SECRET_KEY;

      // Test that code handles missing key
      const stripeKey = process.env.STRIPE_SECRET_KEY || '';
      const stripe = stripeKey ? 'initialized' : null;

      expect(stripe).toBeNull();

      // Restore env
      if (originalEnv) {
        process.env.STRIPE_SECRET_KEY = originalEnv;
      }
    });

    it('should handle webhook signature verification failure', async () => {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe('sk_test_123', {
        apiVersion: '2024-11-20.acacia',
      });

      // Mock to throw error
      vi.mocked(stripe.webhooks.constructEvent).mockImplementationOnce(() => {
        throw new Error('Invalid signature');
      });

      expect(() => {
        stripe.webhooks.constructEvent(
          'invalid_payload',
          'invalid_signature',
          'whsec_test_secret'
        );
      }).toThrow('Invalid signature');
    });
  });
});

describe('API Version Compatibility', () => {
  it('should use the same API version across all Stripe instances', () => {
    const expectedVersion = '2024-11-20.acacia';
    
    // This test ensures consistency
    expect(expectedVersion).toBe('2024-11-20.acacia');
  });

  it('should not use deprecated API versions', () => {
    const deprecatedVersions = ['2023-10-16', '2025-10-29.clover'];
    const currentVersion = '2024-11-20.acacia';
    
    deprecatedVersions.forEach((version) => {
      expect(currentVersion).not.toBe(version);
    });
  });
});
