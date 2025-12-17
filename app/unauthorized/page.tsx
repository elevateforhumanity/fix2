import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Access Denied | Elevate For Humanity',
  description: 'You do not have permission to access this page',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500">
            This dashboard is restricted to specific user roles. If you believe
            this is an error, please contact support.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Go to Your Dashboard
          </Link>
          <Link
            href="/"
            className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Need help?</p>
          <a
            href="tel:3173143757"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Call 317-314-3757
          </a>
          <span className="text-gray-400 mx-2">or</span>
          <Link
            href="/contact"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
