import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax-filing',
  },
  title: 'File Your Taxes for $100 | Drake Tax Software | Elevate for Humanity',
  description:
    'Professional tax filing powered by Drake Software. File federal and state taxes for just $100. Maximum refund guaranteed. Expert support included.',
  keywords:
    'tax filing, Drake software, tax preparation, file taxes online, tax refund, federal taxes, state taxes, tax return, TurboTax alternative',
  openGraph: {
    title: 'File Your Taxes for $100 - Drake Tax Software',
    description:
      'Professional tax filing for just $100. Maximum refund guaranteed.',
    url: 'https://elevateforhumanity.org/tax-filing',
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TaxFilingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Tax Filing"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Tax Filing
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative    text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <span className="font-semibold">
                  Powered by Drake Tax Software
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-6 text-3xl md:text-4xl lg:text-5xl">
                File Your Taxes for Just $100
              </h1>
              <p className="text-base md:text-lg text-green-100 mb-8">
                Professional tax preparation with Drake Software. Federal +
                State included. Maximum refund guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/tax-filing/start"
                  className="inline-flex items-center justify-center bg-white text-brand-green-600 px-8 py-4 rounded-lg hover:bg-green-50 font-bold text-lg"
                >
                  Start Your Return
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 font-bold text-lg"
                >
                  See Pricing
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-lg md:text-lg font-bold mb-6">
                Why Choose Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-300 mr-3">✓</span>
                  <span>$100 flat fee - Federal + State</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3">✓</span>
                  <span>Drake Software - Used by professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3">✓</span>
                  <span>Maximum refund guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3">✓</span>
                  <span>Expert tax support included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-300 mr-3">✓</span>
                  <span>E-file with IRS in minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Simple, Honest Pricing
          </h2>
          <p className="text-base md:text-lg text-gray-600 text-center mb-12">
            Compare us to TurboTax and H&R Block
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* TurboTax */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-lg md:text-lg font-bold mb-4">TurboTax</h3>
              <div className="text-4xl font-bold mb-2 text-2xl md:text-3xl lg:text-4xl">
                $119+
              </div>
              <p className="text-gray-600 mb-6">Deluxe (Federal + State)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Federal filing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">State filing ($59 extra)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-sm">Live support ($89 extra)</span>
                </li>
              </ul>
              <div className="text-center text-sm text-gray-500">
                Total: $119-$267
              </div>
            </div>

            {/* Our Service */}
            <div className="   rounded-xl shadow-2xl p-8 border-4 border-green-400 transform scale-105">
              <div className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                BEST VALUE
              </div>
              <h3 className="text-lg md:text-lg font-bold text-white mb-4">
                Elevate Tax Filing
              </h3>
              <div className="text-5xl font-bold text-white mb-2 text-3xl md:text-4xl lg:text-5xl">
                $100
              </div>
              <p className="text-green-100 mb-6">Everything Included</p>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Federal filing included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">State filing included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Expert support included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">
                    Drake Software (professional grade)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Maximum refund guarantee</span>
                </li>
              </ul>
              <a
                href="/tax-filing/start"
                className="block w-full bg-white text-brand-green-600 text-center py-3 rounded-lg font-bold hover:bg-green-50"
              >
                Start Filing Now
              </a>
            </div>

            {/* H&R Block */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-lg md:text-lg font-bold mb-4">H&R Block</h3>
              <div className="text-4xl font-bold mb-2 text-2xl md:text-3xl lg:text-4xl">
                $115+
              </div>
              <p className="text-gray-600 mb-6">Deluxe Online</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Federal filing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">State filing ($54 extra)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-sm">In-person ($200+ extra)</span>
                </li>
              </ul>
              <div className="text-center text-sm text-gray-500">
                Total: $115-$369
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-base md:text-lg font-bold text-brand-green-600">
              Save $19-$267 compared to competitors!
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-12 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            What's Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Drake Tax Software</h3>
              <p className="text-gray-600">
                Professional-grade software used by CPAs and tax preparers
                nationwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Maximum Refund</h3>
              <p className="text-gray-600">
                We guarantee you'll get every dollar you deserve or we'll refund
                our fee
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Tax professionals available to answer questions and review your
                return
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-12 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-base font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Create Account</h3>
              <p className="text-sm text-gray-600">
                Sign up and pay $100 flat fee
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-base font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Enter Information</h3>
              <p className="text-sm text-gray-600">
                Answer simple questions about your income
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-base font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Review & Approve</h3>
              <p className="text-sm text-gray-600">
                Expert reviews your return for accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-base font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">E-File</h3>
              <p className="text-sm text-gray-600">
                We file with IRS and state electronically
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drake Software Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="   rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Powered by Drake Tax Software
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Drake Software is the #1 choice of professional tax preparers.
                  Trusted by over 80,000 tax professionals nationwide.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-2">✓</span>
                    <span>IRS-approved e-file provider</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-2">✓</span>
                    <span>Supports all tax forms and schedules</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-2">✓</span>
                    <span>Automatic error checking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-300 mr-2">✓</span>
                    <span>Maximum deduction finder</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">What You Can File</h3>
                <ul className="space-y-2 text-sm">
                  <li>• W-2 wages</li>
                  <li>• 1099 income (contractor, gig work)</li>
                  <li>• Self-employment income</li>
                  <li>• Investment income</li>
                  <li>• Rental property income</li>
                  <li>• Education credits</li>
                  <li>• Child tax credit</li>
                  <li>• Earned Income Credit (EIC)</li>
                  <li>• Itemized deductions</li>
                  <li>• Business expenses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-12 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">
                Is $100 really all I pay?
              </h3>
              <p className="text-gray-600">
                Yes! $100 includes federal AND state filing. No hidden fees, no
                upsells, no surprises.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">
                What is Drake Software?
              </h3>
              <p className="text-gray-600">
                Drake is professional tax software used by CPAs and tax
                preparers. It's more accurate and comprehensive than consumer
                software like TurboTax.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">Do I get expert help?</h3>
              <p className="text-gray-600">
                Yes! Our tax professionals review every return and are available
                to answer questions. This is included in your $100 fee.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">
                How fast will I get my refund?
              </h3>
              <p className="text-gray-600">
                Most refunds arrive in 8-21 days when e-filed. We can also set
                up direct deposit for faster processing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold text-lg mb-2">
                What if I made a mistake?
              </h3>
              <p className="text-gray-600">
                We offer free amendments if needed. Our software also checks for
                errors before filing to prevent issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20    text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold mb-6 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Ready to File Your Taxes?
          </h2>
          <p className="text-base md:text-lg text-green-100 mb-8">
            Join thousands who've saved money with our $100 flat-fee tax filing
          </p>
          <a
            href="/tax-filing/start"
            className="inline-block bg-white text-brand-green-600 px-12 py-4 rounded-lg hover:bg-green-50 font-bold text-xl"
          >
            Start Your Tax Return Now
          </a>
          <p className="text-sm text-green-200 mt-6">
            Questions? Call us at (317) 314-3757
          </p>
        </div>
      </section>
    </div>
  );
}
