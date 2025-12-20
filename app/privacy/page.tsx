import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Mail } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/privacy',
  },
  title: 'Privacy Policy | Elevate For Humanity',
  description: 'Privacy and data protection policy for Elevate for Humanity.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-brand-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Privacy & Data Protection
          </h1>
        </div>

        <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 mb-8">
          <p className="text-xl font-semibold text-gray-900">
            We respect your privacy.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Commitment
          </h2>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>We do not sell personal information</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Information is used only for program coordination, advising,
                reporting, and compliance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Data may be shared with partners only as required for
                enrollment, funding, or reporting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Secure systems are used to protect sensitive data</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information necessary to coordinate workforce training
            and support services:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Contact information (name, email, phone, address)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Eligibility information (for funding and program placement)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Program enrollment and progress data</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Employment and outcome information (for reporting requirements)
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How We Use Your Information
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>To coordinate training and support services</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>To connect you with advisors, partners, and employers</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>To meet funding and compliance reporting requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>To track outcomes and improve services</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Data Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We share information only when necessary:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Training Partners:</strong> To coordinate program
                delivery
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Funding Agencies:</strong> To meet reporting
                requirements (WIOA, WRG, JRI, etc.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Employers:</strong> With your consent, for placement
                opportunities
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Service Providers:</strong> Who help us operate our
                platform (with data protection agreements)
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Request access to your information</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Request corrections to your information</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-brand-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Withdraw consent (where applicable, subject to legal
                obligations)
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Questions About Data Use?
              </h3>
              <p className="text-gray-700 mb-2">Contact us:</p>
              <a
                href="mailto:elevate4humanityedu@gmail.com"
                className="text-brand-blue-600 hover:underline font-semibold"
              >
                elevate4humanityedu@gmail.com
              </a>
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
