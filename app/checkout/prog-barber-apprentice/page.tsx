'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Clock, DollarSign, Users } from 'lucide-react';

export default function BarberApprenticeCheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Stripe checkout with Affirm
    const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
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
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Barber Apprenticeship Program
            </h1>
            <p className="text-xl mb-6">
              2,000 hours of hands-on training. Earn while you learn. Build your future.
            </p>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>12-18 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>$4,890 Total</span>
              </div>
            </div>
          </div>
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

            {/* Option 2: Pay with Affirm */}
            <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Option 2: Pay with Affirm</h3>
              </div>
              <p className="text-lg text-slate-700 mb-6">
                Flexible payment plans. Start training immediately.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-slate-900 mb-2">$4,890</div>
                <div className="text-slate-600 mb-4">Total program cost</div>
                <div className="text-sm text-slate-600">
                  As low as <strong className="text-lg text-blue-600">$407/month</strong> with Affirm
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Flexible payment plans (3, 6, or 12 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Start training immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>No waiting for funding approval</span>
                </li>
              </ul>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="block w-full text-center px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Pay with Affirm - $4,890'}
              </button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Secure checkout powered by Stripe. Affirm financing subject to credit approval.
              </p>
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
