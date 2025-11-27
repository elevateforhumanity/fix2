'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const program = searchParams.get('program');
  const mode = searchParams.get('mode');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white border-2 border-green-500 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24"
stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-brandBlack mb-4">
          🎉 Enrollment Successful!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          {mode === 'plan' 
            ? 'Your payment plan has been set up successfully.'
            : 'Your payment has been processed successfully.'}
        </p>

        <div className="bg-blue-50 border-l-4 border-brandBlue p-6 rounded-lg mb-6 text-left">
          <h2 className="text-xl font-bold text-brandBlack mb-3">
            ✅ What Happens Next (Automatic)
          </h2>
          <ol className="space-y-2 text-gray-700">
            <li>✔ Your training seats are being purchased from our partners</li>
            <li>✔ National Drug + CareerSafe credentials are being activated</li>
            <li>✔ JRI soft skills module is being added</li>
            <li>✔ Your program dashboard is being set up</li>
            <li>✔ You'll receive an email with login instructions within 5 minutes</li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 text-left">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> If you don't receive your welcome email within 5 minutes, 
            check your spam folder or contact us at support@elevateforhumanity.org
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center justify-center bg-brandPrimary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brandPrimaryDark transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center border-2 border-brandPrimary text-brandPrimary px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          >
            Browse More Programs
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          Questions? Contact us at{' '}
          <a href="mailto:support@elevateforhumanity.org" className="text-brandPrimary hover:underline">
            support@elevateforhumanity.org
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
