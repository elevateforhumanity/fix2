import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/refund',
  },
  title: 'Refund Policy | Elevate For Humanity',
  description:
    'Refund eligibility and payment policy for Elevate for Humanity programs and services.',
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            General Policy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Refund eligibility depends on the program, funding source, and stage
            of enrollment.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Many programs offered through Elevate for Humanity are grant-funded,
            employer-sponsored, or workforce-funded, which may limit or
            eliminate refund eligibility.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tuition & Fees
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Fees paid directly by individuals may be refundable only if
                services have not yet been delivered
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Once training, advising, or enrollment services begin, refunds
                may be limited or unavailable
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Workforce-funded tuition (WIOA, WRG, JRI, etc.) follows funding
                authority rules, not retail refund standards
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Non-Refundable Items
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Application fees (if applicable)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Registration or processing fees</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Services already rendered</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Partner-delivered coursework</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How to Request a Refund
              </h3>
              <p className="text-gray-700 mb-4">
                Requests must be submitted in writing to:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-blue-600" />
                  <a
                    href="mailto:elevate4humanityedu@gmail.com"
                    className="text-brand-blue-600 hover:underline font-semibold"
                  >
                    elevate4humanityedu@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold mb-2">Include:</p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Full name</li>
                  <li>• Program name</li>
                  <li>• Payment date</li>
                  <li>• Reason for request</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-4 font-semibold">
                All requests are reviewed individually.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-brand-blue-600 text-white rounded-lg text-lg font-bold hover:bg-brand-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
