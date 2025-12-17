import Stripe from 'stripe';

// Use a placeholder key during build if not set
// The actual routes will check for the key at runtime
const stripeKey =
  process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build';

export const stripe = new Stripe(stripeKey, {
  // @ts-expect-error TS2322: Type '"2024-12-18.acacia"' is not assignable to type '"2025-10-29.clover"'.
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
