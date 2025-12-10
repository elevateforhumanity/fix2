import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Medical Assistant Training | Elevate For Humanity',
  description:
    'Become a Medical Assistant in 21 days. $4,325. CCHW, CPR, RISE Up certified. Start your healthcare career fast.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/medical-assistant',
  },
};

export default function MedicalAssistantPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Medical Assistant Training
          </h1>
          <p className="text-xl">
            21 days to healthcare career. Clinics are hiring now.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Medical Assistants are the backbone of every doctor's office,
            clinic, and urgent care center. You're the first person patients
            see, the one who takes vitals, prepares exam rooms, and keeps
            everything running smoothly.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Healthcare is booming. Every new clinic needs Medical Assistants.
            Every doctor's office is hiring. This is one of the fastest-growing
            careers in America—and you can start in just 21 days.
          </p>
          <p className="text-lg text-slate-600">
            No years of school. No massive debt. Just focused training that gets
            you certified and working fast.
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
                21 Days
              </div>
              <div className="text-slate-600">3 weeks to certified</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $4,325
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
                <span>
                  Taking vital signs (blood pressure, temperature, pulse)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Patient intake and medical history documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Preparing exam rooms and assisting physicians</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Medical terminology and healthcare communication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Electronic health records (EHR) systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Infection control and safety protocols</span>
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
                  📜 Certified Community Healthcare Worker (CCHW)
                </p>
                <p className="text-orange-800 text-sm">
                  Industry-recognized certification for healthcare support roles
                </p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="font-bold text-blue-900 mb-1">
                  📜 CPR Certification
                </p>
                <p className="text-blue-800 text-sm">
                  Required for all healthcare positions
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
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs You Can Get:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Clinical Settings:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Medical Assistant ($32K-$42K)</li>
                  <li>• Clinical Assistant</li>
                  <li>• Patient Care Coordinator</li>
                  <li>• Front Office Medical Assistant</li>
                  <li>• Back Office Medical Assistant</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">
                  Specialty Areas:
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Urgent Care Assistant</li>
                  <li>• Pediatric Medical Assistant</li>
                  <li>• Dermatology Assistant</li>
                  <li>• Orthopedic Assistant</li>
                  <li>• OB/GYN Assistant</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Career Path:</strong> Many Medical Assistants advance
                to become Licensed Practical Nurses (LPN) or Registered Nurses
                (RN). Start earning immediately while continuing your education.
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
                $4,325
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
                Pay $4,325 Now
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
