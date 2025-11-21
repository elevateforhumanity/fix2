'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-red-50">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-red-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 font-mono">{error.message}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>

        <div className="text-sm text-slate-500">
          <p>If this problem persists, please contact support at:</p>
          <a href="mailto:support@elevateforhumanity.org" className="text-red-600 hover:underline">
            support@elevateforhumanity.org
          </a>
        </div>
      </div>
    </div>
  );
}
