import { Link } from 'react-router-dom';
import { CheckCircle, Home, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-beige-50 flex items-center justify-center px-4">
      <Helmet>
        <title>Thank You | Elevate for Humanity</title>
      </Helmet>

      <div className="container max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-brown-900 mb-4">Thank You!</h1>
          <p className="text-xl text-brown-600 mb-8">
            We've received your submission and will be in touch soon.
          </p>
          <div className="bg-beige-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 text-brown-600 mb-2">
              <Mail className="h-5 w-5" />
              <span className="text-sm">Check your email</span>
            </div>
            <p className="text-sm text-brown-500">
              You should receive a confirmation email within the next few
              minutes.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-brown-900 mb-4">What's Next?</h3>
            <ul className="text-left space-y-2 text-brown-600 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Our team will review your information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>We'll contact you within 1-2 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>You'll receive next steps and enrollment details</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <Link
              to="/programs"
              className="px-6 py-3 bg-white text-brown-900 border border-brown-300 rounded-lg hover:bg-beige-50 transition"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
