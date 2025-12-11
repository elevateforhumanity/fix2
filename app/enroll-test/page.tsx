'use client';

import { useState } from 'react';

export default function EnrollTestPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  const handlePayNow = async () => {
    setIsProcessing(true);
    setResult('Calling Stripe API...');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName: 'Barber Apprenticeship',
          programSlug: 'barber-apprentice',
          price: 4890,
          paymentType: 'full',
        }),
      });

      const data = await response.json();

      if (data.url) {
        setResult('✅ SUCCESS! Redirecting to Stripe...');
        setTimeout(() => {
          window.location.href = data.url;
        }, 1000);
      } else {
        setResult('❌ ERROR: ' + (data.error || 'Unable to start checkout'));
        setIsProcessing(false);
      }
    } catch (error) {
      setResult('❌ ERROR: ' + String(error));
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Enroll Test Page</h1>
        <p className="text-slate-600 mb-6">
          This is a clean test page with ONE Pay Now button.
        </p>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="font-bold">Testing:</p>
          <p className="text-sm">Barber Apprenticeship - $4,890</p>
        </div>

        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isProcessing ? 'Loading Stripe...' : 'Pay Now'}
        </button>

        {result && (
          <div className={`p-4 rounded-lg ${result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600">
          <p className="mb-2">If this works, the issue is with /enroll page caching.</p>
          <p>If this doesn't work, Stripe API has an issue.</p>
        </div>
      </div>
    </div>
  );
}
