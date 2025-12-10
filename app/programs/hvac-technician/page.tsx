import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HVAC Technician Training | Elevate For Humanity',
  description:
    'Become an HVAC Technician in 60 days. $5,000. WRG eligible. Residential HVAC, OSHA 30, CPR certified.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/hvac-technician',
  },
};

export default function HVACTechnicianPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            HVAC Technician Training
          </h1>
          <p className="text-xl">
            60 days to a high-demand career. Start at $40K-$60K.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Every home needs heating and cooling. Every business needs climate
            control. Every building needs an HVAC technician—and there aren't
            enough of them.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            HVAC technicians are in massive demand. Companies are hiring
            immediately, offering sign-on bonuses, and paying for ongoing
            training. This isn't a job that gets outsourced or automated—it
            requires skilled hands-on work that only you can do.
          </p>
          <p className="text-lg text-slate-600">
            In 60 days, you'll earn industry certifications in residential HVAC,
            refrigeration diagnostics, and workplace safety. Graduate ready to
            work, with employers competing for your skills.
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
                60 Days
              </div>
              <div className="text-slate-600">Full-time training</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $5,000
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">WRG</div>
              <div className="text-slate-600">Eligible for FREE</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Residential HVAC system installation and repair</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Refrigeration cycle and diagnostics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Electrical systems and troubleshooting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>EPA refrigerant handling certification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>OSHA 30 workplace safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Customer service and business basics</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Your Certifications & Career Paths
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <p className="font-bold text-orange-900 mb-1">
                  📜 Residential HVAC Certification 1
                </p>
                <p className="text-orange-800 text-sm">
                  Industry-recognized credential for HVAC installation and
                  maintenance
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-bold text-blue-900 mb-1">
                  📜 Residential HVAC Certification 2 - Refrigeration
                  Diagnostics
                </p>
                <p className="text-blue-800 text-sm">
                  Advanced troubleshooting and repair certification
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-green-900 mb-1">
                  📜 RISE Up Certificate
                </p>
                <p className="text-green-800 text-sm">
                  Client safety and professional conduct certification
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <p className="font-bold text-purple-900 mb-1">
                  📜 CPR + OSHA 30
                </p>
                <p className="text-purple-800 text-sm">
                  Safety certifications required for construction and service
                  work
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs You Can Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  HVAC Careers:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• HVAC Technician ($40K-$60K)</li>
                  <li>• Service Technician</li>
                  <li>• Installation Specialist</li>
                  <li>• Maintenance Technician</li>
                  <li>• Field Service Tech</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Career Growth:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Lead Technician ($60K-$80K)</li>
                  <li>• HVAC Supervisor</li>
                  <li>• Service Manager</li>
                  <li>• Start Your Own Business</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Job Market:</strong> HVAC technicians are in critical
                shortage nationwide. Most graduates receive multiple job offers
                before completing training. Average starting salary: $40K-$60K
                with benefits.
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
              <div className="bg-green-100 border border-green-400 rounded-lg p-3 mb-4">
                <p className="text-sm font-bold text-green-900">
                  ✓ WRG ELIGIBLE - Workforce Ready Grant
                </p>
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
                $5,000
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
                Pay $5,000 Now
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
