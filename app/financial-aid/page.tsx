import { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertCircle,
  DollarSign,
  FileText,
  Users,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/financial-aid',
  },
  title: 'Funding Information | Elevate For Humanity',
  description:
    'We do not offer traditional financial aid or student loans. Our programs are 100% funded through government workforce programs like WIOA and Indiana Career Connect.',
};

export default function FinancialAidPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Important Notice */}
      <section className="bg-yellow-50 border-b-4 border-yellow-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-black text-black mb-2">
                Important: We Do NOT Offer Financial Aid
              </h2>
              <p className="text-lg text-black">
                Elevate for Humanity does not offer traditional financial aid,
                student loans, or payment plans. Our programs are{' '}
                <strong>100% FREE</strong> through government workforce funding
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DollarSign className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              100% Free Training
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8">
              No tuition, no loans, no out-of-pocket costs. Our programs are
              fully funded by government workforce programs.
            </p>
            <Link
              href="/funding"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Learn About Funding
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            How We're Different from Traditional Schools
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 border-2 border-red-600 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                ❌ Traditional Schools
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Require tuition payments</li>
                <li>• Offer student loans (debt)</li>
                <li>• Have payment plans</li>
                <li>• Charge application fees</li>
                <li>• Require FAFSA</li>
                <li>• Offer scholarships/grants</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-600 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                ✅ Elevate for Humanity
              </h3>
              <ul className="space-y-3 text-black">
                <li>• 100% FREE training</li>
                <li>• NO student loans</li>
                <li>• NO payment plans needed</li>
                <li>• NO application fees</li>
                <li>• NO FAFSA required</li>
                <li>• Government-funded programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Sources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-6 text-center">
            How Our Programs Are Funded
          </h2>
          <p className="text-xl text-black text-center mb-12 max-w-3xl mx-auto">
            We partner with government workforce programs that pay for your
            training
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-blue-600 rounded-xl p-8">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">WIOA</h3>
              <p className="text-black mb-4">
                Workforce Innovation and Opportunity Act - Federal workforce
                funding program
              </p>
              <Link
                href="/funding"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white border-2 border-green-600 rounded-xl p-8">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Indiana Career Connect
              </h3>
              <p className="text-black mb-4">
                State workforce development program connecting Hoosiers to
                careers
              </p>
              <Link
                href="/funding"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white border-2 border-purple-600 rounded-xl p-8">
              <DollarSign className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">WorkOne</h3>
              <p className="text-black mb-4">
                Indiana's workforce development system providing training
                funding
              </p>
              <Link
                href="/funding"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            What This Means for You
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border-l-4 border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-2">
                ✅ No Tuition
              </h3>
              <p className="text-black">
                You will never receive a bill for training. All costs are
                covered by government funding.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-2">✅ No Debt</h3>
              <p className="text-black">
                You will not take on any student loans or debt. There is nothing
                to pay back.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-2">✅ No FAFSA</h3>
              <p className="text-black">
                You do not need to complete FAFSA or any financial aid
                applications.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-2">
                ✅ Simple Application
              </h3>
              <p className="text-black">
                Just complete our simple application to see if you qualify for
                government funding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8">
            Apply today to see if you qualify for 100% free training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now - It's Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/funding"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              Learn About Funding
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
