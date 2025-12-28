'use client';

import { useState } from 'react';
import { CreditCard, Calendar, Award } from 'lucide-react';

interface ProgramPaymentButtonProps {
  programSlug: string;
  programName: string;
  price: number;
  etplProgramId?: string;
}

export function ProgramPaymentButton({ 
  programSlug, 
  programName, 
  price,
  etplProgramId 
}: ProgramPaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (paymentType: 'full' | 'plan' | 'funding') => {
    setLoading(true);
    
    try {
      if (paymentType === 'funding') {
        // Redirect to funding application
        window.location.href = `/apply?program=${programSlug}`;
        return;
      }

      // Create Stripe checkout session
      const response = await fetch('/api/programs/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug,
          programName,
          price,
          paymentType,
          etplProgramId
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-6 sticky top-4">
      <div className="mb-6">
        <div className="text-sm text-slate-600 mb-1">Program Cost</div>
        <div className="text-4xl font-bold text-slate-900">
          ${price.toLocaleString()}
        </div>
        {etplProgramId && (
          <div className="text-sm text-green-600 mt-2">
            ✓ ETPL Approved - Funding Available
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Free with Funding */}
        {etplProgramId && (
          <button
            onClick={() => handlePayment('funding')}
            disabled={loading}
            className="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5" />
            Apply for 100% Free Training
          </button>
        )}

        {/* Pay in Full */}
        <button
          onClick={() => handlePayment('full')}
          disabled={loading}
          className="w-full py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          Pay ${price.toLocaleString()} Now
        </button>

        {/* Payment Plan */}
        {price >= 500 && (
          <button
            onClick={() => handlePayment('plan')}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            4 Payments of ${Math.ceil(price / 4).toLocaleString()}
          </button>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="text-sm text-slate-600 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Secure payment via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span>Instant access after payment</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a 
          href="/contact" 
          className="text-sm text-blue-600 hover:underline"
        >
          Questions? Contact us
        </a>
      </div>
    </div>
  );
}
