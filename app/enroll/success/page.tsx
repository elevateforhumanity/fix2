import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Successful | Elevate For Humanity',
  description: 'Your enrollment payment was successful',
};

export default function EnrollmentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Thank you for enrolling in our program.
          </p>

          {/* Details */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-bold text-lg mb-4">What Happens Next:</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">1.</span>
                <span>You'll receive a confirmation email within 24 hours with your enrollment details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">2.</span>
                <span>Our team will contact you to schedule your start date</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">3.</span>
                <span>You'll receive login credentials for the student portal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">4.</span>
                <span>Training materials will be sent before your start date</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="border-t border-slate-200 pt-6 mb-6">
            <p className="text-slate-600 mb-4">
              Questions about your enrollment?
            </p>
            <div className="space-y-2">
              <p className="text-lg">
                <strong>Call:</strong>{' '}
                <a href="tel:3173143757" className="text-orange-600 font-bold hover:text-orange-700">
                  317-314-3757
                </a>
              </p>
              <p className="text-lg">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@elevateforhumanity.org" className="text-orange-600 font-bold hover:text-orange-700">
                  info@elevateforhumanity.org
                </a>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lms/dashboard"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Go to Student Portal
            </Link>
            <Link
              href="/programs"
              className="px-8 py-3 bg-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-300 transition-all"
            >
              View Programs
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>
            Your payment receipt has been sent to your email address.
          </p>
          <p className="mt-2">
            If you don't receive an email within 24 hours, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
