import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>404 - Page Not Found | Elevate for Humanity</title>
      </Helmet>
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-beige-200">404</h1>
          <h2 className="text-2xl font-bold text-brown-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-brown-600 mb-8">
            The page you're looking for doesn't exist in our Elevate Learn2Earn
            Workforce ecosystem.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Hub
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-white text-brown-900 border border-brown-300 py-3 px-6 rounded-lg hover:bg-beige-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
        <div className="mt-8 text-sm text-brown-500">
          <p>
            Need help? Visit our{' '}
            <Link to="/connect" className="text-green-600 hover:text-green-700">
              Connect
            </Link>{' '}
            community for support.
          </p>
        </div>
      </div>
    </div>
  );
}
