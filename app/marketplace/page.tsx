import Link from 'next/link';

export const metadata = {
  title: 'Marketplace Coming Soon | Elevate For Humanity',
  description: 'Our creator marketplace is launching soon.',
};

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Marketplace Coming Soon</h1>
        <p className="text-gray-600 mb-6">
          We're building an amazing creator marketplace. Check back soon!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Return Home
          </Link>
          <Link
            href="/programs"
            className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            View Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
