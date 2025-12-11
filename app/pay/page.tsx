'use client';

import { useState } from 'react';
import Script from 'next/script';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

export default function PayPage() {
  const [showStripeButton, setShowStripeButton] = useState(false);

  return (
    <>
      <Script src="https://js.stripe.com/v3/buy-button.js" strategy="afterInteractive" />
      
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Barber Apprenticeship
          </h1>
          
          <p className="text-center text-slate-600 mb-6">
            Complete your payment to start training
          </p>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-700 mb-2">$4,890</div>
            <p className="text-sm text-slate-600">One-time payment</p>
          </div>

          {!showStripeButton ? (
            <button
              onClick={() => setShowStripeButton(true)}
              className="w-full px-6 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Pay Now
            </button>
          ) : (
            <div className="flex justify-center">
              <stripe-buy-button
                buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
                publishable-key="pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx"
              >
              </stripe-buy-button>
            </div>
          )}

          <p className="text-xs text-slate-500 text-center mt-4">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </main>
    </>
  );
}
