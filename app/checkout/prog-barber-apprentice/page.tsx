'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function BarberApprenticeCheckoutPage() {
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
        alert('Unable to create checkout session. Please call us at 317-314-3757');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to process checkout. Please call us at 317-314-3757');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Barber Apprenticeship Program</h1>
          <p className="text-white/90">2,000 hours • 12-18 Months • Earn while you learn</p>
        </div>
      </div>

      {/* Main Content - Side by Side */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* FREE Option */}
          <div className="bg-white rounded-lg border-2 border-green-500 p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold">Option 1: FREE Training</h2>
            </div>
            <p className="text-slate-600 mb-4">
              100% government-funded through WIOA, WRG, or JRI.
            </p>
            <Link
              href="/apply"
              className="block w-full text-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
            >
              Apply for Free Training
            </Link>
          </div>

          {/* PAID Option */}
          <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Option 2: $4,890</h2>
            </div>
            <p className="text-slate-600 mb-2">
              Start immediately. Payment plans available.
            </p>
            <div className="bg-blue-50 rounded p-3 mb-4 text-sm">
              <strong>Includes:</strong> 2,000-hour program, Milady CIMA access, FREE RISE certification, all materials
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Checkout - $4,890'}
            </button>
            <p className="text-xs text-slate-500 mt-2 text-center">
              13 payment methods available at checkout
            </p>
          </div>
        </div>

        {/* What's Included - Compact */}
        <div className="bg-white rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">What's Included</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>2,000 hours of training</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Work in real barbershops</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Indiana Barber License prep</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Milady CIMA platform</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>FREE RISE certification</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Business training</span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="text-center mt-6">
          <p className="text-slate-600 mb-3">
            Questions? Call us at <a href="tel:3173143757" className="text-blue-600 font-semibold">317-314-3757</a>
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all text-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
