'use client';

import AffirmCheckout from '@/components/payments/AffirmCheckout';
import AffirmPromo from '@/components/payments/AffirmPromo';
import { useState } from 'react';
import Link from 'next/link';

export default function TestAffirmPage() {
  const [testAmount, setTestAmount] = useState(2500);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Affirm Payment Test Page
          </h1>
          <p className="text-gray-600">
            Test the Affirm Premium Adaptive Checkout™ integration
          </p>
          <Link
            href="/programs/barber-apprenticeship"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Barber Apprenticeship Page
          </Link>
        </div>

        {/* Amount Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Test Amount
          </h2>
          <div className="flex gap-4 items-center">
            <label className="text-gray-700 font-semibold">Amount:</label>
            <input
              type="number"
              value={testAmount}
              onChange={(e) => setTestAmount(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="100"
              max="10000"
              step="100"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setTestAmount(1000)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
              >
                $1,000
              </button>
              <button
                onClick={() => setTestAmount(2500)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
              >
                $2,500
              </button>
              <button
                onClick={() => setTestAmount(5000)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
              >
                $5,000
              </button>
            </div>
          </div>
        </div>

        {/* Affirm Promo Widget */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Payment Plan Calculator
          </h2>
          <AffirmPromo amount={testAmount} />
        </div>

        {/* Affirm Checkout Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Checkout Button
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Barber Apprenticeship Program
                </h3>
                <p className="text-sm text-gray-600">
                  9-18 months • DOL Registered Apprenticeship
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${testAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  One-time payment
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <AffirmCheckout
                amount={testAmount}
                courseId="barber-apprenticeship"
                courseName="Barber Apprenticeship Program"
                userEmail="test@example.com"
                userName="Test User"
                userPhone="555-1234"
                className="w-full"
                onSuccess={(transactionId) => {
                  alert(`Payment successful! Transaction ID: ${transactionId}`);
                }}
                onError={(error) => {
                  alert(`Payment error: ${error}`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Package Info */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900">
              Premium Adaptive Checkout™
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Package Features:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✅ Pay in 4 interest-free payments</li>
                <li>✅ 0% APR for 3-24 months</li>
                <li>✅ Up to 36 months with rates</li>
                <li>✅ Average 25% cart size lift</li>
                <li>✅ Instant approval decision</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Pricing:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>💰 Transaction Fee: <strong>9.99% + 30¢</strong></li>
                <li>💵 For ${testAmount}: <strong>${(testAmount * 0.0999 + 0.30).toFixed(2)}</strong> fee</li>
                <li>💳 You Receive: <strong>${(testAmount - (testAmount * 0.0999 + 0.30)).toFixed(2)}</strong></li>
                <li>⚡ Paid immediately</li>
                <li>🛡️ Affirm handles credit risk</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-yellow-900 mb-3">
            🧪 Testing Instructions
          </h2>
          <ol className="space-y-2 text-sm text-yellow-900">
            <li>
              <strong>1.</strong> Click the "Pay with Affirm" button above
            </li>
            <li>
              <strong>2.</strong> Affirm modal will open (if SDK loaded successfully)
            </li>
            <li>
              <strong>3.</strong> Use Affirm test credentials for sandbox testing
            </li>
            <li>
              <strong>4.</strong> Complete the checkout flow
            </li>
            <li>
              <strong>5.</strong> You'll be redirected to the confirmation page
            </li>
          </ol>
          
          <div className="mt-4 pt-4 border-t border-yellow-300">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Make sure you have the Affirm private key configured in your environment variables for the backend API to work.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
