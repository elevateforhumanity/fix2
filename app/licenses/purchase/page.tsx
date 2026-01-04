'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/licenses?success=true`,
      },
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </form>
  );
}

export default function PurchaseLicensePage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [licenseType, setLicenseType] = useState('internal');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const licenseOptions = [
    {
      value: 'external',
      label: 'External LMS (Free)',
      price: 0,
      description: 'Use your own LMS',
    },
    {
      value: 'internal',
      label: 'Internal LMS ($99/mo)',
      price: 99,
      description: 'Create courses in our system',
    },
    {
      value: 'scorm_only',
      label: 'SCORM Only ($149/mo)',
      price: 149,
      description: 'Upload SCORM packages',
    },
    {
      value: 'hybrid',
      label: 'Hybrid ($199/mo)',
      price: 199,
      description: 'Full access to all features',
    },
    {
      value: 'unlimited',
      label: 'Unlimited ($499/mo)',
      price: 499,
      description: 'Unlimited enrollments',
    },
  ];

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => setPrograms(data.programs || []));
  }, []);

  const handlePurchase = async () => {
    if (!selectedProgram || !licenseType) {
      setError('Please select a program and license type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/licenses/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program_id: selectedProgram,
          license_type: 'multi',
          lms_model: licenseType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Purchase failed');
      }

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        // Free license created
        window.location.href = '/licenses?success=true';
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">Complete Payment</h1>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Purchase License
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Program *
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a program</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select License Type *
              </label>
              <div className="space-y-3">
                {licenseOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setLicenseType(option.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      licenseType === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {option.price === 0 ? 'FREE' : `$${option.price}`}
                        </p>
                        {option.price > 0 && (
                          <p className="text-sm text-gray-500">per month</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={loading || !selectedProgram || !licenseType}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
