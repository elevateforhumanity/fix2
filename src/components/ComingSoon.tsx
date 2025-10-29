/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  launchDate?: string;
}

export default function ComingSoon({
  title,
  description,
  icon = '🚀',
  features = [],
  launchDate = 'Soon',
}: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>{title} - Coming Soon | Elevate for Humanity</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6 animate-bounce">{icon}</div>
            <h1 className="text-5xl font-bold text-brand-900 mb-4">{title}</h1>
            <p className="text-xl text-brand-700 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          {/* Coming Soon Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="text-center mb-8">
              <div className="inline-block bg-brand-100 text-brand-800 px-6 py-3 rounded-full font-semibold text-lg mb-4">
                Launching {launchDate}
              </div>
              <h2 className="text-2xl font-bold text-brand-900 mb-4">
                Be the First to Know
              </h2>
              <p className="text-brand-600">
                Sign up to get notified when this feature launches and receive
                exclusive early access.
              </p>
            </div>
            {/* Email Signup Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 border border-brand-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Notify Me'}
                  </button>
                </div>
                <p className="text-sm text-brand-500 mt-3 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    You're on the list!
                  </h3>
                  <p className="text-green-700">
                    We'll notify you as soon as this feature is available.
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Features Preview */}
          {features.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-brand-900 mb-6 text-center">
                What to Expect
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-brand-50 rounded-lg"
                  >
                    <div className="text-2xl">✨</div>
                    <p className="text-brand-700 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Back to Home */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              <span>←</span>
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
