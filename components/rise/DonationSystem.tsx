'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function DonationSystem() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/donations/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: customAmount || amount }),
    });
    const { sessionId } = await response.json();
    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6">Support RISE Foundation</h3>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[25, 50, 100, 250].map(amt => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className={`px-4 py-3 border-2 rounded-lg font-bold ${amount === amt ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
          >
            ${amt}
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Custom amount"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />
      <button
        onClick={handleDonate}
        className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        Donate ${customAmount || amount}
      </button>
    </div>
  );
}
