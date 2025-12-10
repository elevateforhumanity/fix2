'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Clock, DollarSign, Users } from 'lucide-react';

export default function BarberApprenticeCheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'barber-apprentice',
          programName: 'Barber Apprenticeship Program',
          amount: 489000, // $4,890 in cents
        }),
      });

      const session = await response.json();
      
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to process checkout. Please call us at 317-314-3757');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Barber Apprenticeship Program
          </h1>
          <p className="text-lg md:text-xl mb-4">
            2,000 hours • 12-18 Months • $4,890 Total
          </p>
          <p className="text-white/90">
            Earn while you learn. Build your future.
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Option 1: Free Government Funded */}
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Option 1: FREE Training</h3>
              </div>
              <p className="text-lg text-slate-700 mb-6">
                100% government-funded through WIOA, WRG, or JRI. No cost to you.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Completely free - $0 out of pocket</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Must qualify for workforce funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Apply through WorkOne or Indiana Career Connect</span>
                </li>
              </ul>
              <Link
                href="/apply"
                className="block w-full text-center px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* Option 2: Pay in Full */}
            <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Option 2: Pay in Full</h3>
              </div>
              <p className="text-lg text-slate-700 mb-6">
                Pay $4,890 and start training immediately. Payment plans available at checkout.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-slate-900 mb-2">$4,890</div>
                <div className="text-slate-600 mb-4">Complete program - everything included</div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-green-800 mb-2">✅ Includes:</div>
                  <ul className="text-xs text-green-700 space-y-1">
                    <li>• 2,000-hour apprenticeship program</li>
                    <li>• Milady CIMA platform access</li>
                    <li>• RISE certification (FREE with promo code)</li>
                    <li>• All training materials</li>
                    <li>• Student dashboard access</li>
                    <li>• Certificate upon completion</li>
                  </ul>
                </div>
                <div className="text-sm text-slate-600 bg-slate-50 rounded p-3">
                  💳 <strong>Payment options available:</strong> Pay in full or choose a payment plan through Stripe checkout (Affirm, Klarna, or Afterpay available based on eligibility)
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Start training immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>No waiting for funding approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Secure checkout powered by Stripe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Flexible payment plans available at checkout</span>
                </li>
              </ul>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="block w-full text-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout - $4,890'}
              </button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Secure checkout powered by Stripe. Payment plans subject to approval.
              </p>

              {/* RISE Course Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">FREE Milady RISE Certification</h4>
                    <p className="text-sm text-orange-800 mb-2">
                      After enrollment, you'll receive instructions to access your FREE RISE certification (normally $29.95) using our exclusive promo code.
                    </p>
                    <p className="text-xs text-orange-700">
                      No additional payment required - included with your enrollment!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What's Included</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">2,000 Hours of Training</div>
                  <div className="text-slate-600">Complete apprenticeship program (12-18 months)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">On-the-Job Training</div>
                  <div className="text-slate-600">Work in real barbershops with experienced mentors</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">Indiana Barber License</div>
                  <div className="text-slate-600">Prepare for state licensing exam</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-slate-900">Business Training</div>
                  <div className="text-slate-600">Learn to manage your own shop or booth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Have Questions?</h3>
            <p className="text-lg text-slate-600 mb-6">
              Our team is here to help you choose the best payment option for your situation.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all"
            >
              Contact Us
            </Link>
            <p className="text-slate-600 mt-4">
              Call us at <a href="tel:3173143757" className="text-blue-600 font-semibold">317-314-3757</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
