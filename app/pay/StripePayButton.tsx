// app/pay/StripePayButton.tsx
"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
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

export default function StripePayButton() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://js.stripe.com/v3/buy-button"]'
    );

    if (existing) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => {
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="space-y-2">
      {!loaded && (
        <p className="text-xs text-slate-500">
          Loading secure payment button…
        </p>
      )}

      <stripe-buy-button
        buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
        publishable-key="pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx"
      ></stripe-buy-button>

      <p className="text-[11px] text-slate-500">
        By completing your payment you agree to Elevate for Humanity&apos;s
        refund policy and enrollment terms.
      </p>
    </div>
  );
}
