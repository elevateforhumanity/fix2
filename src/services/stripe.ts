import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
);

export interface CheckoutSessionData {
  programId: string;
  programName: string;
  price: number;
  userId?: string;
}

/**
 * Create a Stripe Checkout session for program enrollment
 * Note: This requires a backend API endpoint to create the session
 */
export async function createCheckoutSession(data: CheckoutSessionData) {
  try {
    // Call Netlify function to create Stripe checkout session
    const response = await fetch(
      '/.netlify/functions/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId: data.programId,
          programName: data.programName,
          price: data.price,
          userId: data.userId,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancelled`,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
}

/**
 * Handle free enrollment (no payment required)
 */
export async function enrollFree(programId: string, userId: string) {
  try {
    // Call Netlify function to create free enrollment
    const response = await fetch(
      '/.netlify/functions/create-enrollment-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId,
          userId,
          price: 0,
          isFree: true,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to enroll');
    }

    return await response.json();
  } catch (error) {
    console.error('Free enrollment error:', error);
    throw error;
  }
}
