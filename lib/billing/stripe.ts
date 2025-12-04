// lib/billing/stripe.ts
import Stripe from 'stripe';

// Use placeholder during build, will fail at runtime if not set in production
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production') {
  console.warn('STRIPE_SECRET_KEY not set - Stripe functionality will not work');
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia' as any,
});
