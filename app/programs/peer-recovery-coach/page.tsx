import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Peer Recovery Coach Training | Elevate For Humanity',
  description:
    'Turn your recovery story into a career. 45 days, $4,750. Help others find hope and healing.',
  alternates: {
    canonical:
      'https://www.elevateforhumanity.org/programs/peer-recovery-coach',
  },
};

export default function PeerRecoveryCoachPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Peer Recovery Coach Training
          </h1>
          <p className="text-xl">
            Your story can save lives. Get certified in 45 days.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            You've been there. You know what it's like to struggle, to fight, to
            rebuild your life one day at a time. That experience—that lived
            knowledge—is exactly what makes you qualified to help others.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Peer Recovery Coaches don't just understand addiction and recovery
            from textbooks. They've lived it. And that authenticity creates
            trust, hope, and real change for people who need it most.
          </p>
          <p className="text-lg text-slate-600">
            Treatment centers, hospitals, community organizations, and courts
            are actively hiring Peer Recovery Coaches. Your past doesn't
            disqualify you—it's your greatest asset.
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
                45 Days
              </div>
              <div className="text-slate-600">6+ weeks training</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,750
              </div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                Certified
              </div>
              <div className="text-slate-600">State credential</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Recovery support principles and ethics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Active listening and motivational interviewing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Crisis intervention and de-escalation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Trauma-informed care practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Building recovery plans and goal setting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Connecting clients to resources and services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Professional boundaries and self-care</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Your Certification & Career Paths
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-bold text-green-900 mb-1">
                  📜 Peer Recovery Coach Certification
                </p>
                <p className="text-green-800 text-sm">
                  State-recognized credential to work in recovery support
                  services
                </p>
              </div>
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs You Can Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Treatment Settings:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Peer Recovery Coach ($32K-$45K)</li>
                  <li>• Recovery Support Specialist</li>
                  <li>• Residential Treatment Counselor</li>
                  <li>• Outpatient Recovery Coach</li>
                  <li>• Sober Living House Manager</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Community Programs:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Community Health Worker</li>
                  <li>• Reentry Specialist (justice system)</li>
                  <li>• Hospital Recovery Navigator</li>
                  <li>• Mobile Crisis Team Member</li>
                  <li>• Recovery Community Center Staff</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Career Growth:</strong> Many Peer Recovery Coaches
                advance to become Licensed Addiction Counselors (LAC) or
                Clinical Supervisors. Your lived experience combined with formal
                training opens doors.
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
                $4,750
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
                Pay $4,750 Now
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
