'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

// Declare Stripe Buy Button custom element
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

const PROGRAMS = [
  { 
    id: 'barber', 
    label: 'Barber Apprenticeship', 
    slug: 'barber-apprentice', 
    price: 4890,
    stripeLink: 'https://buy.stripe.com/bJe7sMbNM02X0CGbWv8EM00'
  },
  { 
    id: 'ma', 
    label: 'Medical Assistant', 
    slug: 'medical-assistant', 
    price: 4325,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'hvac', 
    label: 'HVAC Technician', 
    slug: 'hvac-technician', 
    price: 5000,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'cpr', 
    label: 'CPR Certification', 
    slug: 'cpr-certification', 
    price: 575,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'ehst', 
    label: 'Emergency Health & Safety Tech', 
    slug: 'emergency-health-safety', 
    price: 4950,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'esth', 
    label: 'Professional Esthetician', 
    slug: 'professional-esthetician', 
    price: 4575,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'prc', 
    label: 'Peer Recovery Coach', 
    slug: 'peer-recovery-coach', 
    price: 4750,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'tax', 
    label: 'Tax Prep & Financial Services', 
    slug: 'tax-prep-financial', 
    price: 4950,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
  { 
    id: 'biz', 
    label: 'Business Startup & Marketing', 
    slug: 'business-startup-marketing', 
    price: 4550,
    stripeLink: 'https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK'
  },
];

export default function PayPage() {
  const [selectedProgramId, setSelectedProgramId] = useState(PROGRAMS[0].id);
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  const selectedProgram = PROGRAMS.find((p) => p.id === selectedProgramId) ?? PROGRAMS[0];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(selectedProgram.price);

  const handlePayNow = () => {
    // Redirect directly to Stripe payment link
    window.location.href = 'https://buy.stripe.com/bJe7sMbNM02X0CGbWv8EM00';
  };

  return (
    <>
      {/* Load Stripe Buy Button Script */}
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      
      <main className="min-h-screen bg-slate-50">
      {/* Video Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pay for Training
            </h1>
            <p className="text-xl">
              Start your career training today
            </p>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Complete Your Enrollment
            </h2>

            {/* How It Works */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-blue-900 mb-4">How Payment Works:</h3>
              <ol className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Select your training program below</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Click "Pay Now" to go to secure Stripe checkout</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Choose your payment method (credit card, Affirm, Klarna, PayPal, etc.)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Complete payment and receive instant access to your training</span>
                </li>
              </ol>
            </div>

            {/* Program Selection */}
            <div className="mb-6">
              <label htmlFor="program" className="block text-sm font-bold text-slate-900 mb-2">
                Select Your Program:
              </label>
              <select
                id="program"
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              >
                {PROGRAMS.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.label} - {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(program.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* What's Included */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-3">Your Training Includes:</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Complete course materials and resources</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Industry certifications upon completion</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Instructor support throughout your training</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Job placement assistance</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Lifetime access to course updates</span>
                </li>
              </ul>
            </div>

            {/* Price and Payment */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-slate-900">Total:</span>
                <span className="text-3xl font-bold text-blue-700">{formattedPrice}</span>
              </div>

              <button
                onClick={handlePayNow}
                className="w-full px-6 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-all mb-3"
              >
                Pay Now - $4,890
              </button>

              <p className="text-sm text-slate-500 text-center">
                🔒 You'll be redirected to secure Stripe checkout
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-4 text-center">Available Payment Methods:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-slate-600">
              <div>💳 Credit/Debit Cards</div>
              <div>💰 Affirm (Pay over time)</div>
              <div>🛍️ Klarna</div>
              <div>💵 Afterpay</div>
              <div>🏦 ACH Bank Transfer</div>
              <div>📱 PayPal</div>
              <div>💸 Venmo</div>
              <div>💵 Cash App</div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-slate-600 mb-2">Questions about payment?</p>
            <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              Call 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
