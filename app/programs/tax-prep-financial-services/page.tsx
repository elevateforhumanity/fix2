import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tax Prep & Financial Services Training | Elevate For Humanity',
  description:
    'Become a certified Tax Preparer in 10 weeks. $4,950. Work from home, earn seasonal income, help families save money.',
  alternates: {
    canonical:
      'https://www.elevateforhumanity.org/programs/tax-prep-financial-services',
  },
};

export default function TaxPrepFinancialServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tax Prep & Financial Services
          </h1>
          <p className="text-xl">
            10 weeks to certified. Work from home. Earn year-round.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Every year, millions of Americans need help filing taxes. They're
            confused by forms, worried about mistakes, and want to maximize
            their refunds. That's where you come in.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Tax preparers earn serious money during tax season (January-April),
            then many expand into bookkeeping, payroll, and financial consulting
            year-round. You can work from home, set your own hours, and build a
            loyal client base.
          </p>
          <p className="text-lg text-slate-600">
            This isn't just seasonal work—it's a business you can grow. Start
            with tax prep, expand into full financial services.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Program Details
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                10 Weeks
              </div>
              <div className="text-slate-600">Part-time flexible</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,950
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Certified
              </div>
              <div className="text-slate-600">IRS recognized</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Federal and state tax law fundamentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Individual tax return preparation (1040 forms)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  Business tax returns (Schedule C, partnerships, corporations)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Tax software training (TurboTax, H&R Block, Drake)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Deductions, credits, and refund maximization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Bookkeeping and QuickBooks basics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Starting your own tax prep business</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Your Certification & Career Paths
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-bold text-blue-900 mb-1">
                  📜 Tax Preparer Certification
                </p>
                <p className="text-blue-800 text-sm">
                  IRS-recognized credential to prepare federal and state tax
                  returns
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">
              Jobs & Business Opportunities:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Employment Options:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Tax Preparer ($35K-$55K seasonal)</li>
                  <li>• H&R Block / Jackson Hewitt</li>
                  <li>• Accounting Firm Assistant</li>
                  <li>• Bookkeeper ($40K-$60K year-round)</li>
                  <li>• Payroll Specialist</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Self-Employment:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Start your own tax prep business</li>
                  <li>• Mobile tax services</li>
                  <li>• Virtual bookkeeping</li>
                  <li>• Small business consulting</li>
                  <li>• Financial coaching</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>💡 Earning Potential:</strong> Tax preparers charge
                $150-$500+ per return. Prepare just 100 returns during tax
                season = $15,000-$50,000 in 4 months.
              </p>
              <p className="text-sm text-blue-900">
                <strong>💡 Year-Round Income:</strong> Add bookkeeping
                ($300-$500/month per client) and you can earn $50K-$80K+
                annually working from home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Choose Your Path
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE */}
            <div className="bg-white border-2 border-green-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-green-700 mb-4">
                100% FREE
              </div>
              <p className="text-lg mb-4">
                If you qualify for government funding through:
              </p>
              <ul className="space-y-2 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>WRG</strong> - Workforce Ready Grant (Indiana
                    residents)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>WIOA</strong> - Workforce Innovation
                    (unemployed/underemployed)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>
                    <strong>Other grants</strong> - We help you apply
                  </span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-blue-700 mb-4">
                $4,950
              </div>
              <p className="text-lg mb-4">
                Don't qualify for free training? Pay directly and start
                immediately.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  💳 Flexible Payment Options:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Split into payments with Affirm, Klarna, Afterpay</li>
                  <li>• PayPal, Venmo, Cash App Pay</li>
                  <li>• Credit/Debit cards</li>
                  <li>• ACH bank transfer</li>
                </ul>
              </div>
              <Link
                href="/enroll-simple"
                className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Pay $4,950 Now
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-600 mb-2">
              Not sure which option is right for you?
            </p>
            <p className="text-lg">
              Call us at{' '}
              <a
                href="tel:3173143757"
                className="text-orange-600 font-bold hover:text-orange-700"
              >
                317-314-3757
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
