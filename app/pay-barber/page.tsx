'use client';

import { useState, useEffect } from 'react';

export default function PayBarberPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Auto-start checkout on page load
    handlePayNow();
  }, []);

  const handlePayNow = async () => {
    setIsProcessing(true);

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
        window.location.href = data.url;
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Redirecting to Checkout...</h1>
          <p className="text-slate-600">
            Please wait while we prepare your payment for Barber Apprenticeship ($4,890)
          </p>
        </div>

        {!isProcessing && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-semibold mb-2">Unable to load checkout</p>
            <p className="text-sm text-red-700 mb-4">
              Please call us to complete your payment
            </p>
            <a 
              href="tel:3173143757" 
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700"
            >
              Call 317-314-3757
            </a>
          </div>
        )}

        <button
          onClick={handlePayNow}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
