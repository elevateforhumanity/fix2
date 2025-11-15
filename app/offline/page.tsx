'use client';

import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <WifiOff size={40} className="text-gray-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You're Offline
        </h1>

        <p className="text-gray-600 mb-6">
          It looks like you've lost your internet connection. Some features may be limited until you're back online.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-transform"
        >
          <RefreshCw size={20} />
          Try Again
        </button>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-left">
          <h3 className="font-semibold text-blue-900 mb-2">
            What you can still do:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• View previously loaded courses</li>
            <li>• Continue watching downloaded videos</li>
            <li>• Review your progress and achievements</li>
            <li>• Access cached content</li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Your progress will sync automatically when you're back online.
        </p>
      </div>
    </div>
  );
}
