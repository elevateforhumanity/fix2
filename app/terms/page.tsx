import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/terms',
  },
  title: 'Terms of Service | Elevate For Humanity',
  description: 'Terms of use for Elevate for Humanity services and website.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Use</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            By using this website and submitting information, you agree to:
          </p>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Provide accurate information</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Participate respectfully in programs and services</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Understand that placement, funding, and outcomes are not guaranteed</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Comply with partner and workforce requirements</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Elevate for Humanity reserves the right to update services, eligibility, and policies as required by funding partners and regulations.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Disclaimers</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>No Guaranteed Outcomes:</strong> While we work to connect participants with opportunities, employment, program completion, and funding approval are not guaranteed.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Funding Eligibility:</strong> Funding availability depends on external agencies and their requirements. Elevate for Humanity does not control funding decisions.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>Partner Services:</strong> Some training is delivered by partner organizations. Elevate for Humanity coordinates but does not directly control all aspects of partner-delivered services.</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Questions? Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
