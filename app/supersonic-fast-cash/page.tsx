import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, DollarSign, Clock, Shield, Award, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/supersonic-fast-cash",
  },
  title: 'Tax Refund Advance - Get Up to $6,000 Fast | Supersonic Fast Cash',
  description: 'Get your tax refund advance in minutes. Professional tax preparation with fast cash advances up to $6,000. No credit check required.',
};

export default function SupersonicFastCashPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Professional Tax Service Style */}
      <section className="relative    text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                TAX SEASON 2024
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get Your Refund Fast
              </h1>
              <p className="text-2xl mb-8 text-green-100">
                Tax refund advance up to $6,000 in minutes. Professional tax preparation included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="inline-block px-8 py-4 bg-yellow-400 text-green-900 text-lg font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl text-center"
                >
                  Get Started Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white text-center"
                >
                  Call 317-314-3757
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Fast Approval</div>
                    <div className="text-green-100">Get approved in minutes</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">No Credit Check</div>
                    <div className="text-green-100">Bad credit? No problem</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Professional Service</div>
                    <div className="text-green-100">Certified tax preparers</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your refund advance in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">File Your Taxes</h3>
              <p className="text-gray-600">
                Bring your documents and we'll prepare your taxes professionally
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Approved</h3>
              <p className="text-gray-600">
                Instant approval for your refund advance - no credit check needed
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Your Cash</h3>
              <p className="text-gray-600">
                Walk out with cash in hand - up to $6,000 in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tax Preparation Services
            </h2>
            <p className="text-xl text-gray-600">
              Professional tax filing with maximum refund guarantee
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold text-green-700 mb-6">$79</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>W-2 income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Standard deduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>E-file included</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-green-700 text-white rounded-xl p-8 relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-green-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Deluxe</h3>
              <div className="text-4xl font-bold mb-6">$149</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Itemized deductions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Self-employment income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Refund advance eligible</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-yellow-400 text-green-900 font-bold rounded-lg hover:bg-yellow-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold text-green-700 mb-6">$249</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Everything in Deluxe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Rental property income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Investment income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Audit protection</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">IRS Certified</h3>
              <p className="text-sm text-gray-600">All preparers are IRS certified</p>
            </div>
            <div>
              <Award className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Maximum Refund</h3>
              <p className="text-sm text-gray-600">Guaranteed or your money back</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Fast Service</h3>
              <p className="text-sm text-gray-600">Most returns done same day</p>
            </div>
            <div>
              <DollarSign className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Competitive rates guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Your Refund?
          </h2>
          <p className="text-xl mb-8">
            Visit us today or call to schedule your appointment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-block px-10 py-5 bg-yellow-400 text-green-900 text-xl font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl"
            >
              Start Your Taxes
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-white text-green-900 text-xl font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Call 317-314-3757
            </Link>
          </div>
          <p className="mt-8 text-green-100">
            Walk-ins welcome • Open 7 days a week • Evening appointments available
          </p>
        </div>
      </section>
    </div>
  );
}
