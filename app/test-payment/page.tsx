'use client';

import { useState } from 'react';

export default function TestPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  const testPayment = async () => {
    setIsProcessing(true);
    setResult('Creating checkout session...');

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
        <h1 className="text-2xl font-bold mb-4">Stripe Payment Test</h1>
        <p className="text-slate-600 mb-6">
          Click the button below to test the Stripe checkout flow for Barber Apprenticeship ($4,890)
        </p>
        
        <button
          onClick={testPayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isProcessing ? 'Testing...' : 'Test Stripe Payment'}
        </button>

        {result && (
          <div className={`p-4 rounded-lg ${result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-200">
          <h2 className="font-bold mb-2">Quick Links:</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/programs" className="text-blue-600 hover:underline">
                → All Programs
              </a>
            </li>
            <li>
              <a href="/enroll" className="text-blue-600 hover:underline">
                → Enrollment Page
              </a>
            </li>
            <li>
              <a href="tel:3173143757" className="text-orange-600 hover:underline font-bold">
                → Call: 317-314-3757
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
