import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Professional Esthetician Training | Elevate For Humanity',
  description:
    'Become a licensed Esthetician in 5 weeks. $4,575. Skincare, facials, waxing, makeup. Build your beauty career.',
  alternates: {
    canonical:
      'https://www.elevateforhumanity.org/programs/professional-esthetician',
  },
};

export default function ProfessionalEstheticianPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Esthetician Training
          </h1>
          <p className="text-xl">
            5 weeks to licensed. Build your beauty empire.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            The beauty industry is booming. Skincare is a $17 billion industry
            in the U.S. alone. People want glowing skin, professional facials,
            expert waxing—and they're willing to pay for it.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            As a licensed Esthetician, you can work in spas, salons, medical
            offices, or build your own business. Set your own hours. Be your own
            boss. Make people feel confident in their skin.
          </p>
          <p className="text-lg text-slate-600">
            This isn't just a job—it's a career with unlimited potential. And
            you can start in just 5 weeks.
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
                5 Weeks
              </div>
              <div className="text-slate-600">Full-time training</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,575
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Licensed
              </div>
              <div className="text-slate-600">State certification</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Skincare analysis and facial treatments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Hair removal (waxing, threading, tweezing)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Makeup application and color theory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Chemical peels and advanced treatments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Product knowledge and retail sales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Sanitation, safety, and state regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  Business skills: booking clients, pricing services, marketing
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Your License & Career Paths
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="font-bold text-purple-900 mb-1">
                  📜 Indiana Esthetician License
                </p>
                <p className="text-purple-800 text-sm">
                  State-issued professional license to practice esthetics
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs You Can Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Employment Options:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Spa Esthetician ($30K-$50K + tips)</li>
                  <li>• Salon Esthetician</li>
                  <li>• Medical Esthetician (dermatology offices)</li>
                  <li>• Resort/Hotel Spa Specialist</li>
                  <li>• Makeup Artist</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Business Opportunities:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Open your own spa</li>
                  <li>• Mobile esthetician services</li>
                  <li>• Rent a booth in a salon</li>
                  <li>• Freelance makeup artist</li>
                  <li>• Skincare product sales</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Earning Potential:</strong> Experienced estheticians
                can earn $60K-$80K+ per year, especially with a loyal client
                base and retail product sales. Many build six-figure businesses.
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
                $4,575
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
                Pay $4,575 Now
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
