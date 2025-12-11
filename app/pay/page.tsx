'use client';

import { useState } from 'react';

const PROGRAMS = [
  { id: 'barber', label: 'Barber Apprenticeship', slug: 'barber-apprentice', price: 4890 },
  { id: 'ma', label: 'Medical Assistant', slug: 'medical-assistant', price: 4325 },
  { id: 'hvac', label: 'HVAC Technician', slug: 'hvac-technician', price: 5000 },
  { id: 'cpr', label: 'CPR Certification', slug: 'cpr-certification', price: 575 },
  { id: 'ehst', label: 'Emergency Health & Safety Tech', slug: 'emergency-health-safety', price: 4950 },
  { id: 'esth', label: 'Professional Esthetician', slug: 'professional-esthetician', price: 4575 },
  { id: 'prc', label: 'Peer Recovery Coach', slug: 'peer-recovery-coach', price: 4750 },
  { id: 'tax', label: 'Tax Prep & Financial Services', slug: 'tax-prep-financial', price: 4950 },
  { id: 'biz', label: 'Business Startup & Marketing', slug: 'business-startup-marketing', price: 4550 },
];

export default function PayPage() {
  const [selectedProgramId, setSelectedProgramId] = useState(PROGRAMS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProgram = PROGRAMS.find((p) => p.id === selectedProgramId) ?? PROGRAMS[0];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(selectedProgram.price);

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName: selectedProgram.label,
          programSlug: selectedProgram.slug,
          price: selectedProgram.price,
          paymentType: 'full',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Unable to start checkout'));
        setIsProcessing(false);
      }
    } catch (error) {
      alert('Error connecting to payment system. Call 317-314-3757');
      setIsProcessing(false);
    }
  };

  return (
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
              Select your program and complete payment
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Program Selection */}
            <div className="bg-white rounded-lg border-2 border-blue-500 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-blue-700 mb-6">
                Select Program
              </h2>

              {/* Program Select */}
              <div className="mb-6">
                <label htmlFor="program" className="block text-sm font-bold text-slate-900 mb-2">
                  Choose Your Training:
                </label>
                <select
                  id="program"
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  {PROGRAMS.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Options */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">💳 Payment Options:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pay over time with Affirm, Klarna, Afterpay</li>
                  <li>• PayPal, Venmo, Cash App Pay</li>
                  <li>• Credit/debit cards or ACH transfer</li>
                </ul>
              </div>
            </div>

            {/* Right: Cart/Order Summary */}
            <div className="bg-white rounded-lg border-2 border-slate-300 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Item */}
              <div className="border-b border-slate-200 pb-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{selectedProgram.label}</h3>
                    <p className="text-sm text-slate-600">Full Program Access</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formattedPrice}</div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-2 text-sm">What's Included:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>✓ All course materials</li>
                  <li>✓ Industry certifications</li>
                  <li>✓ Instructor support</li>
                  <li>✓ Job placement assistance</li>
                </ul>
              </div>

              {/* Total */}
              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-semibold">{formattedPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Tax:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t border-slate-200 pt-4">
                  <span>Total:</span>
                  <span className="text-blue-700">{formattedPrice}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full px-6 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isProcessing ? 'Loading Stripe...' : 'Proceed to Payment'}
              </button>

              <p className="text-xs text-slate-500 text-center">
                🔒 Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-2">Questions?</p>
            <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              Call 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
