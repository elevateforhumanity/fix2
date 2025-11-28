'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TaxVitaCheckout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/enroll/success';
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tax Prep & Financial Services Enrollment
          </h1>
          <p className="text-gray-600 mb-8">
            Complete your enrollment for the Tax Preparation & Financial Services program
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Program Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Program:</span>
                  <span className="font-semibold">Tax Prep & Financial Services</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">10 Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours:</span>
                  <span className="font-semibold">150 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding:</span>
                  <span className="font-semibold">WIOA • WRG • Earn and Learn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-semibold text-green-600">FREE (100% Funded)</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">What's Included:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ IRS VITA/TCE certification</li>
                  <li>✓ QuickBooks Pro Advisor</li>
                  <li>✓ Microsoft 365 training</li>
                  <li>✓ Supervised practicum at VITA site</li>
                  <li>✓ Financial literacy education</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Complete Enrollment
                </button>

                <Link
                  href="/programs/tax-prep-financial-services"
                  className="block text-center text-gray-600 hover:text-gray-900 text-sm"
                >
                  ← Back to Program Details
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
