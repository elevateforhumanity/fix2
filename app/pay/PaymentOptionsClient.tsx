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
    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://cdn1.affirm.com/js/v2/affirm.js"]'
      );
      const publicKey = process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY;

      if (existing) {
        window.affirm?.ui?.refresh?.();
        setAffirmLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
      script.async = true;
      script.onload = () => {
        try {
          if (window.affirm && publicKey) {
            window.affirm.config({
              public_api_key: publicKey,
              script: script.src,
            });
          }
          window.affirm?.ui?.refresh?.();
          setAffirmLoaded(true);
        } catch (e) {
          console.error('Affirm init error:', e);
        }
      };
      script.onerror = () => setError('Affirm script failed to load.');
      document.body.appendChild(script);
    } catch (e) {
      console.error('Affirm loader error:', e);
      setError('Problem initializing Affirm.');
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
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      script.onload = () => setStripeLoaded(true);
      script.onerror = () => setError('Stripe script failed to load.');
      document.body.appendChild(script);
    } catch (e) {
      console.error('Stripe loader error:', e);
      setError('Problem initializing Stripe.');
    }
  }, []);

  return (
    <div className="space-y-8">
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

      {/* Affirm */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 1 — Monthly Payments with Affirm
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          See monthly payment options for tuition around{' '}
          <span className="font-semibold">
            ${TUITION_AMOUNT.toLocaleString()}
          </span>
          . Checking eligibility won't affect your credit score.
        </p>

        <div
          className="affirm-as-low-as"
          data-page-type="product"
          data-amount={AMOUNT_CENTS}
          data-affirm-color="blue"
        ></div>

        {!affirmLoaded && (
          <p className="mt-2 text-sm text-slate-500">Loading Affirm options…</p>
        )}
        <p className="mt-3 text-[11px] text-slate-500">
          Subject to credit check and approval. Down payment may be required.
          Payment options depend on purchase amount and may vary by lender.
        </p>
      </div>

      {/* Stripe */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 2 — Pay in Full with Card (Stripe)
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3">
          {error}
        </div>
      )}
    </div>
  );
}
