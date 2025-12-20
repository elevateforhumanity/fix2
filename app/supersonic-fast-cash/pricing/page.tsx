import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, DollarSign, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tax Preparation Pricing | Transparent Rates | Supersonic Fast Cash',
  description:
    'Clear, upfront tax preparation pricing. Base fee plus per-form charges. No hidden fees. Compare our rates to H&R Block, Jackson Hewitt, and TurboTax.',
  keywords: [
    'tax preparation pricing',
    'tax filing cost',
    'how much does tax preparation cost',
    'tax preparer fees',
    'cheaper than H&R Block',
    'Jackson Hewitt pricing alternative',
    'affordable tax services',
  ],
};

export default function TaxPricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Transparent Tax Preparation Pricing
            </h1>
            <p className="text-2xl text-green-100 mb-8">
              No hidden fees. No surprises. Know exactly what you'll pay before
              we start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/supersonic-fast-cash/book-appointment"
                className="inline-block px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
              >
                Book Appointment
              </Link>
              <a
                href="tel:3173143757"
                className="inline-block px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition text-lg border-2 border-white"
              >
                Call for Quote: 317-314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Our Pricing Works</h2>
            <p className="text-xl text-gray-600">
              Base fee + per-form charges = Your total cost
            </p>
          </div>

          {/* Base Fees */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">
              Base Preparation Fees
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
                <h4 className="text-2xl font-bold mb-4">Federal Return</h4>
                <div className="text-5xl font-bold text-green-600 mb-4">
                  $89
                </div>
                <p className="text-gray-600 mb-6">
                  Base fee for federal tax return preparation
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>IRS-certified preparer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>E-filing included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Accuracy guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
                <h4 className="text-2xl font-bold mb-4">State Return</h4>
                <div className="text-5xl font-bold text-blue-600 mb-4">$49</div>
                <p className="text-gray-600 mb-6">
                  Per state return (if required)
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>All 50 states supported</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>E-filing included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-state returns available</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
                <h4 className="text-2xl font-bold mb-4">Simple Return</h4>
                <div className="text-5xl font-bold text-purple-600 mb-4">
                  $69
                </div>
                <p className="text-gray-600 mb-6">
                  W-2 only, standard deduction
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Federal return only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>1 W-2 form included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Fast turnaround</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Per-Form Charges */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">
              Additional Form Fees
            </h3>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Form/Schedule</th>
                    <th className="px-6 py-4 text-left">Description</th>
                    <th className="px-6 py-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4 font-semibold">W-2</td>
                    <td className="px-6 py-4">Wage and tax statement</td>
                    <td className="px-6 py-4 text-right font-bold">$15 each</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">
                      1099-MISC / 1099-NEC
                    </td>
                    <td className="px-6 py-4">Self-employment income</td>
                    <td className="px-6 py-4 text-right font-bold">$25 each</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Schedule C</td>
                    <td className="px-6 py-4">Business income/loss</td>
                    <td className="px-6 py-4 text-right font-bold">$75</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Schedule E</td>
                    <td className="px-6 py-4">Rental property income</td>
                    <td className="px-6 py-4 text-right font-bold">
                      $85 per property
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Schedule D</td>
                    <td className="px-6 py-4">Capital gains/losses</td>
                    <td className="px-6 py-4 text-right font-bold">$50</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Schedule A</td>
                    <td className="px-6 py-4">Itemized deductions</td>
                    <td className="px-6 py-4 text-right font-bold">$45</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Form 8863</td>
                    <td className="px-6 py-4">Education credits</td>
                    <td className="px-6 py-4 text-right font-bold">$35</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Form 2441</td>
                    <td className="px-6 py-4">Child care credit</td>
                    <td className="px-6 py-4 text-right font-bold">$30</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Form 8812</td>
                    <td className="px-6 py-4">Child tax credit</td>
                    <td className="px-6 py-4 text-right font-bold">$25</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">
                      1099-INT / 1099-DIV
                    </td>
                    <td className="px-6 py-4">Interest/dividend income</td>
                    <td className="px-6 py-4 text-right font-bold">$20 each</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">1099-R</td>
                    <td className="px-6 py-4">Retirement distributions</td>
                    <td className="px-6 py-4 text-right font-bold">$25 each</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">1099-G</td>
                    <td className="px-6 py-4">Unemployment income</td>
                    <td className="px-6 py-4 text-right font-bold">$20</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Form 8949</td>
                    <td className="px-6 py-4">Stock sales (per transaction)</td>
                    <td className="px-6 py-4 text-right font-bold">$5 each</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-semibold">Amended Return</td>
                    <td className="px-6 py-4">Form 1040-X</td>
                    <td className="px-6 py-4 text-right font-bold">$150</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">
                      Prior Year Return
                    </td>
                    <td className="px-6 py-4">Previous tax year</td>
                    <td className="px-6 py-4 text-right font-bold">$125</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Example Pricing */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-8">
              Pricing Examples
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
                <h4 className="text-xl font-bold mb-4">Simple Return</h4>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span>Federal base fee</span>
                    <span className="font-bold">$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 W-2 form</span>
                    <span className="font-bold">$15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State return</span>
                    <span className="font-bold">$49</span>
                  </div>
                  <div className="border-t-2 border-blue-300 pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-blue-600">$153</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Compare: H&R Block charges $200-$250 for same return
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                <h4 className="text-xl font-bold mb-4">Self-Employed</h4>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span>Federal base fee</span>
                    <span className="font-bold">$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 x 1099-NEC</span>
                    <span className="font-bold">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule C</span>
                    <span className="font-bold">$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State return</span>
                    <span className="font-bold">$49</span>
                  </div>
                  <div className="border-t-2 border-green-300 pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-green-600">$263</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Compare: Jackson Hewitt charges $300-$400 for same return
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
                <h4 className="text-xl font-bold mb-4">Complex Return</h4>
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span>Federal base fee</span>
                    <span className="font-bold">$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 W-2s</span>
                    <span className="font-bold">$30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule C</span>
                    <span className="font-bold">$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule E (rental)</span>
                    <span className="font-bold">$85</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schedule A (itemized)</span>
                    <span className="font-bold">$45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State return</span>
                    <span className="font-bold">$49</span>
                  </div>
                  <div className="border-t-2 border-purple-300 pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-purple-600">$373</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Compare: H&R Block charges $500-$700 for same return
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            How We Compare to Competitors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-center">
                    Supersonic Fast Cash
                  </th>
                  <th className="px-6 py-4 text-center">H&R Block</th>
                  <th className="px-6 py-4 text-center">Jackson Hewitt</th>
                  <th className="px-6 py-4 text-center">TurboTax Live</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    Simple Return (W-2 only)
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    $153
                  </td>
                  <td className="px-6 py-4 text-center">$200-$250</td>
                  <td className="px-6 py-4 text-center">$180-$230</td>
                  <td className="px-6 py-4 text-center">$169</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Self-Employed</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    $263
                  </td>
                  <td className="px-6 py-4 text-center">$350-$450</td>
                  <td className="px-6 py-4 text-center">$300-$400</td>
                  <td className="px-6 py-4 text-center">$289</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">Rental Property</td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    $223
                  </td>
                  <td className="px-6 py-4 text-center">$350-$500</td>
                  <td className="px-6 py-4 text-center">$300-$450</td>
                  <td className="px-6 py-4 text-center">$289</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold">
                    Refund Advance Available
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    ✅ Up to $7,500
                  </td>
                  <td className="px-6 py-4 text-center">✅ Up to $3,500</td>
                  <td className="px-6 py-4 text-center">✅ Up to $4,000</td>
                  <td className="px-6 py-4 text-center">❌ No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">
                    Online/Video Service
                  </td>
                  <td className="px-6 py-4 text-center text-green-600 font-bold">
                    ✅ All 50 States
                  </td>
                  <td className="px-6 py-4 text-center">⚠️ Limited</td>
                  <td className="px-6 py-4 text-center">⚠️ Limited</td>
                  <td className="px-6 py-4 text-center">✅ Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to File Your Taxes?</h2>
          <p className="text-xl text-green-100 mb-8">
            Get an exact quote in minutes. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="inline-block px-10 py-5 bg-yellow-400 text-green-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
            >
              Book Appointment
            </Link>
            <a
              href="tel:3173143757"
              className="inline-block px-10 py-5 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition text-lg"
            >
              Call for Quote: 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
