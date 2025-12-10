import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Health & Safety Technician | Elevate For Humanity',
  description:
    'Become an Emergency Medical Responder in 4 weeks. $4,950. CPR, EMR, and OSHA 10 certified.',
  alternates: {
    canonical:
      'https://www.elevateforhumanity.org/programs/emergency-health-safety-tech',
  },
};

export default function EmergencyHealthSafetyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Emergency Health & Safety Technician
          </h1>
          <p className="text-xl">
            Be the first responder. Save lives. Get hired.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            When someone collapses at work. When a child stops breathing. When
            seconds matter and 911 is still minutes away—you'll be the one who
            knows what to do.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Emergency Medical Responders are the critical first link in the
            emergency medical services chain. You'll work on ambulances, at
            events, in industrial settings, and anywhere people need immediate
            medical help before paramedics arrive.
          </p>
          <p className="text-lg text-slate-600">
            In just 4 weeks, you'll earn three industry certifications that open
            doors to emergency services, healthcare facilities, construction
            sites, and security companies.
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
                4 Weeks
              </div>
              <div className="text-slate-600">Full-time training</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,950
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                3 Certs
              </div>
              <div className="text-slate-600">Industry credentials</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Patient assessment and vital signs monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Airway management and oxygen administration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Bleeding control and shock management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Spinal immobilization and patient transport</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Workplace safety and OSHA compliance</span>
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
                  📜 CPR Certification
                </p>
                <p className="text-orange-800 text-sm">
                  Industry-recognized CPR for healthcare providers
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-bold text-blue-900 mb-1">
                  📜 Emergency Medical Responder (EMR)
                </p>
                <p className="text-blue-800 text-sm">
                  National Registry certification - work on ambulances and
                  emergency response teams
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-green-900 mb-1">
                  📜 OSHA 10 - Career Safe
                </p>
                <p className="text-green-800 text-sm">
                  Workplace safety certification required for construction and
                  industrial sites
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs You Can Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Emergency Services:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Ambulance Crew Member</li>
                  <li>• Emergency Medical Responder</li>
                  <li>• Event Medical Staff</li>
                  <li>• Fire Department EMR</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Industrial & Safety:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Construction Site Safety Officer</li>
                  <li>• Industrial First Responder</li>
                  <li>• Security/Safety Personnel</li>
                  <li>• Workplace Safety Coordinator</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Career Path:</strong> Many EMRs use this as a
                stepping stone to become EMTs or Paramedics. Start earning
                immediately while continuing your education.
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
