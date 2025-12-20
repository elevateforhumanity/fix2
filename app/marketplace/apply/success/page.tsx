import Link from 'next/link';


export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-brand-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
        <p className="text-gray-600 mb-6">
          We'll review your application and notify you via email within 2-3
          business days.
        </p>

        <div className="space-y-3">
          <Link
            href="/marketplace"
            className="block w-full bg-brand-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
