'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function MarketplaceApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    payoutEmail: '',
    payoutMethod: 'paypal',
    productDescription: '',
    contentOwnership: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.contentOwnership) {
      setError('You must confirm content ownership');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/marketplace/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Application failed');
      }

      router.push('/marketplace/apply/success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">Become a Creator</h1>
        <p className="text-gray-600 mb-8">
          Join our marketplace and sell your digital products to our community.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name *
            </label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              Content="How you'll appear to buyers"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              required
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              Content="Tell buyers about yourself and your expertise"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What will you sell? *
            </label>
            <textarea
              required
              value={formData.productDescription}
              onChange={(e) =>
                setFormData({ ...formData, productDescription: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              Content="Describe the digital products you plan to offer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Email *
            </label>
            <input
              type="email"
              required
              value={formData.payoutEmail}
              onChange={(e) =>
                setFormData({ ...formData, payoutEmail: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              Content="Where you'll receive payments"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Payout Method *
            </label>
            <select
              value={formData.payoutMethod}
              onChange={(e) =>
                setFormData({ ...formData, payoutMethod: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="paypal">PayPal</option>
              <option value="ach">ACH Bank Transfer</option>
              <option value="zelle">Zelle</option>
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Revenue Split</h3>
            <p className="text-sm text-blue-800">
              Creators earn <strong>70%</strong> of each sale. Platform fee is
              30%.
            </p>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="ownership"
              checked={formData.contentOwnership}
              onChange={(e) =>
                setFormData({ ...formData, contentOwnership: e.target.checked })
              }
              className="mt-1 mr-3"
            />
            <label htmlFor="ownership" className="text-sm text-gray-700">
              I confirm that I own all rights to the content I will sell, and I
              agree to the{' '}
              <a
                href="/legal/creator-agreement"
                className="text-brand-blue-600 underline"
              >
                Creator Agreement
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Applications are reviewed within 2-3 business days.
        </p>
      </div>
    </div>
  );
}
