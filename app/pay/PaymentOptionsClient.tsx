// app/pay/PaymentOptionsClient.tsx
'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    affirm?: any;
    StripeBuyButton?: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

// Adjust this one number to change the displayed tuition
const TUITION_AMOUNT = 4890; // dollars
const AMOUNT_CENTS = TUITION_AMOUNT * 100; // Affirm requires cents

export default function PaymentOptionsClient() {
  const [affirmLoaded, setAffirmLoaded] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Affirm SDK once and refresh widgets
  useEffect(() => {
    // Set config before loading script
    const publicKey = 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI';
    
    (window as any)._affirm_config = {
      public_api_key: publicKey,
      script: 'https://cdn1.affirm.com/js/v2/affirm.js',
      locale: 'en_US',
      country_code: 'USA',
    };

    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://cdn1.affirm.com/js/v2/affirm.js"]'
      );

      if (existing) {
        if (window.affirm?.ui?.refresh) {
          window.affirm.ui.refresh();
        }
        setAffirmLoaded(true);
        console.log('[Affirm] ✅ Already loaded');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
      script.async = true;
      script.onload = () => {
        try {
          if (window.affirm?.ui?.refresh) {
            window.affirm.ui.refresh();
          }
          setAffirmLoaded(true);
          console.log('[Affirm] ✅ Loaded and configured');
        } catch (e) {
          console.error('[Affirm] Init error:', e);
        }
      };
      script.onerror = (e) => {
        console.error('[Affirm] Script failed to load:', e);
        // Don't show error to user - just log it
      };
      document.body.appendChild(script);
    } catch (e) {
      console.error('[Affirm] Loader error:', e);
    }
  }, []);

  // Load Stripe Buy Button
  useEffect(() => {
    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://js.stripe.com/v3/buy-button"]'
      );
      if (existing) {
        setStripeLoaded(true);
        console.log('[Stripe] ✅ Script already loaded');
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      script.onload = () => {
        setStripeLoaded(true);
        console.log('[Stripe] ✅ Script loaded successfully');
      };
      script.onerror = (e) => {
        console.error('[Stripe] Script failed to load:', e);
        setError('Stripe script failed to load.');
      };
      document.body.appendChild(script);
    } catch (e) {
      console.error('[Stripe] Loader error:', e);
      setError('Problem initializing Stripe.');
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Tuition summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Tuition Summary
        </h2>
        <p className="text-slate-700">
          Typical tuition:{' '}
          <span className="font-semibold">
            ${TUITION_AMOUNT.toLocaleString()}
          </span>
          . If public funding isn't available in your county, choose one of the
          secure payment options below.
        </p>
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          <strong>Tip:</strong> Talk with your WorkOne / workforce case manager
          first. Many students qualify for <strong>100% free training</strong>.
        </p>
      </div>

      {/* Stripe - Option 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 1: Pay in Full with Card
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay securely with debit or credit. Processed by Stripe.
        </p>

        {!stripeLoaded && (
          <p className="mb-3 text-sm text-slate-500">
            Loading secure payment button…
          </p>
        )}

        <stripe-buy-button
          buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
          publishable-key="pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx"
        ></stripe-buy-button>

        <p className="mt-3 text-[11px] text-slate-500">
          By completing your payment you agree to Elevate for Humanity's refund
          policy and enrollment terms.
        </p>
      </div>

      {/* Affirm - Option 2 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 2: Monthly Payments with Affirm
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay over time with flexible monthly payments. See your options for tuition around{' '}
          <span className="font-semibold">${TUITION_AMOUNT.toLocaleString()}</span>.
        </p>

        <div className="my-4">
          <div
            className="affirm-as-low-as"
            data-page-type="product"
            data-amount={AMOUNT_CENTS}
            data-affirm-color="blue"
            id="affirm-widget-container"
          ></div>
        </div>

        {!affirmLoaded && (
          <p className="mt-2 text-sm text-slate-500">Loading Affirm options…</p>
        )}

        <button
          onClick={() => {
            console.log('[Affirm Button] Clicked. Affirm loaded:', !!window.affirm);
            if (window.affirm) {
              window.affirm.checkout({
                merchant: {
                  user_confirmation_url: `${window.location.origin}/payment/affirm/confirm`,
                  user_cancel_url: `${window.location.origin}/payment/affirm/cancel`,
                  user_confirmation_url_action: 'POST',
                  name: 'Elevate for Humanity',
                },
                items: [{
                  display_name: 'Barber Apprenticeship Tuition',
                  sku: 'barber-tuition',
                  unit_price: AMOUNT_CENTS,
                  qty: 1,
                }],
                metadata: {
                  platform: 'elevate-for-humanity',
                },
                order_id: `EFH-${Date.now()}`,
                shipping_amount: 0,
                tax_amount: 0,
                total: AMOUNT_CENTS,
              });
              window.affirm.checkout.open();
            } else {
              alert('Affirm is still loading. Please wait a moment and try again.');
            }
          }}
          className="w-full mt-4 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          Continue with Affirm
        </button>

        <p className="mt-3 text-[11px] text-slate-500">
          Subject to credit check and approval. Down payment may be required.
          Checking eligibility won't affect your credit score.
        </p>
      </div>

      {/* Stripe */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Pay in Full with Card (Stripe)
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay securely with debit or credit. Processed by Stripe.
        </p>

        {!stripeLoaded && (
          <p className="mb-3 text-sm text-slate-500">
            Loading secure payment button…
          </p>
        )}

        <stripe-buy-button
          buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
          publishable-key="pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx"
        ></stripe-buy-button>

        <p className="mt-3 text-[11px] text-slate-500">
          By completing your payment you agree to Elevate for Humanity's refund
          policy and enrollment terms.
        </p>
      </div>


    </div>
  );
}
