import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, DollarSign, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Start Your Tax Filing | Elevate for Humanity',
  description:
    'Begin your tax filing process with our professional tax preparation services.',
};

export default function TaxFilingStartPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-green-600 to-brand-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Start Your Tax Filing</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Professional tax preparation services to maximize your refund.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-brand-green-600 transition">
            <FileText className="w-16 h-16 text-brand-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-black mb-3">Free VITA</h3>
            <p className="text-gray-700 mb-6">
              For individuals earning $60,000 or less
            </p>
            <Link
              href="/vita/get-help"
              className="inline-flex items-center gap-2 text-brand-green-600 font-bold hover:underline"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-brand-blue-600 transition">
            <DollarSign className="w-16 h-16 text-brand-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-black mb-3">
              Professional Service
            </h3>
            <p className="text-gray-700 mb-6">Full-service tax preparation</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-brand-blue-600 font-bold hover:underline"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-brand-orange-600 transition">
            <Clock className="w-16 h-16 text-brand-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-black mb-3">DIY Online</h3>
            <p className="text-gray-700 mb-6">File your own taxes online</p>
            <Link
              href="/tax-self-prep"
              className="inline-flex items-center gap-2 text-brand-orange-600 font-bold hover:underline"
            >
              Start Filing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-black mb-6">
            What You'll Need
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">
                  W-2 forms from all employers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">
                  1099 forms (if applicable)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Social Security numbers</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Prior year tax return</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Bank account information</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-gray-700">Photo ID</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
