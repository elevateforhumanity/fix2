import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CPR, AED & First Aid Certification | Elevate For Humanity',
  description: 'Get CPR certified in just 1 day. $575 total cost. Industry-recognized certification that opens doors.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/cpr-certification',
  },
};

export default function CPRCertificationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Simple Header */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CPR, AED & First Aid Certification
          </h1>
          <p className="text-xl">Get certified in 1 day. Start saving lives.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xl text-slate-700 mb-6 leading-relaxed">
            Every job application asks: "Do you have CPR certification?" This one-day course gives you 
            the answer employers want to hear: Yes.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Whether you're applying for healthcare jobs, childcare positions, fitness centers, or security work—CPR 
            certification shows you're prepared, responsible, and ready to help in an emergency.
          </p>
          <p className="text-lg text-slate-600">
            One day. Industry-recognized certification. Opens doors to dozens of careers.
          </p>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Program Details</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1 Day</div>
              <div className="text-slate-600">Complete in one session</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$575</div>
              <div className="text-slate-600">Total cost</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">CPR</div>
              <div className="text-slate-600">Industry-Recognized</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>CPR for adults, children, and infants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>AED (Automated External Defibrillator) use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>First aid for choking, bleeding, and shock</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>Emergency response procedures</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Your Certification & Career Paths</h3>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="font-bold text-orange-900 mb-2">📜 Industry-Recognized CPR Certification</p>
              <p className="text-orange-800 text-sm">
                Nationally recognized credential accepted by employers across healthcare, education, fitness, and public safety sectors.
              </p>
            </div>

            <h4 className="font-bold text-lg mb-3">Jobs That Require or Prefer CPR Certification:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-900 mb-2">Healthcare:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Nursing Assistant (CNA)</li>
                  <li>• Medical Assistant</li>
                  <li>• Home Health Aide</li>
                  <li>• Dental Assistant</li>
                  <li>• Pharmacy Technician</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-2">Other Fields:</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Childcare Provider</li>
                  <li>• Personal Trainer</li>
                  <li>• Lifeguard</li>
                  <li>• Security Officer</li>
                  <li>• School Staff</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>💡 Pro Tip:</strong> CPR certification is often the first requirement listed on job applications. 
                Get certified now, apply for jobs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Payment Options */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Path</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE Option */}
            <div className="bg-white border-2 border-green-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-green-700 mb-4">100% FREE</div>
              <p className="text-lg mb-4">
                If you qualify for government funding through:
              </p>
              <ul className="space-y-2 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>WRG</strong> - Workforce Ready Grant (Indiana residents)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>WIOA</strong> - Workforce Innovation (unemployed/underemployed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Other grants</strong> - We help you apply</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID Option */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-blue-700 mb-4">$575</div>
              <p className="text-lg mb-4">
                Don't qualify for free training? Pay directly and start immediately.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-2">💳 Flexible Payment Options:</p>
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
                Pay $575 Now
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-600 mb-2">Not sure which option is right for you?</p>
            <p className="text-lg">
              Call us at <a href="tel:3173143757" className="text-orange-600 font-bold hover:text-orange-700">317-314-3757</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
