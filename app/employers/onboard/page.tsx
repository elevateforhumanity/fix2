'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Upload, FileText } from 'lucide-react';

export default function EmployerOnboardPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      business_name: formData.get('business_name'),
      contact_name: formData.get('contact_name'),
      contact_email: formData.get('contact_email'),
      contact_phone: formData.get('contact_phone'),
      employer_id: crypto.randomUUID(), // Generate temporary ID
      documents: {
        license: formData.get('license'),
        insurance: formData.get('insurance'),
        mou: formData.get('mou'),
      },
    };

    try {
      const res = await fetch('/api/employers/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Submission Received
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Thank you for your interest in hosting apprentices. We'll review your
            submission and contact you within 1-2 business days.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Employer Onboarding
          </h1>
          <p className="text-lg text-slate-600">
            Complete this form to become an approved apprenticeship host
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Business Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="business_name"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="ABC Barbershop"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="john@abcbarbershop.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="(317) 555-1234"
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Required Documents
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Please provide URLs to your documents (Google Drive, Dropbox, etc.)
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Business License URL
                  </label>
                  <input
                    type="url"
                    name="license"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="https://drive.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Insurance Certificate URL
                  </label>
                  <input
                    type="url"
                    name="insurance"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="https://drive.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Signed MOU URL (if available)
                  </label>
                  <input
                    type="url"
                    name="mou"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    Content="https://drive.google.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
              <p className="text-sm text-slate-600 text-center mt-4">
                We'll review your submission within 1-2 business days
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
