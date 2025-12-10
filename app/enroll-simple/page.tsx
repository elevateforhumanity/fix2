'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SimpleEnrollPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName: 'Barber Apprenticeship Program',
          programSlug: 'barber-apprentice',
          price: 4890,
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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Enroll in Barber Program</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Option */}
          <div className="bg-white rounded-lg border-2 border-green-500 p-8">
            <div className="text-3xl font-bold text-green-700 mb-4">FREE</div>
            <p className="text-lg mb-6">
              If you qualify for government funding (WIOA, WRG, JRI)
            </p>
            <Link
              href="/contact-simple"
              className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
            >
              Contact Us About Free Training
            </Link>
          </div>

          {/* Paid Option */}
          <div className="bg-white rounded-lg border-2 border-blue-500 p-8">
            <div className="text-3xl font-bold text-blue-700 mb-4">$4,890</div>
            <p className="text-lg mb-2">Start immediately</p>
            <p className="text-sm text-slate-600 mb-6">
              13 payment methods available • Includes FREE Milady RISE certification
            </p>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'Loading Checkout...' : 'Pay $4,890 Now'}
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Questions?</p>
          <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
            Call 317-314-3757
          </a>
        </div>
      </div>
    </div>
  );
}
