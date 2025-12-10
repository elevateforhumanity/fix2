import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Training | Elevate For Humanity',
  description: '2,000-hour barber apprenticeship. Get paid while you learn. $4,890 or FREE with government funding.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship',
  },
};

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Video Hero */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 h-full flex items-center bg-black/30">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Become a Licensed Barber
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Get PAID while you learn. 2,000 hours. 12-18 months.
            </p>
          </div>
        </div>
      </section>

      {/* Your Story */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Past Doesn't Define Your Future
          </h2>
          <p className="text-xl mb-4 leading-relaxed">
            Maybe you've been turned down for jobs. Maybe you're working two jobs and still can't pay rent. 
            Maybe you're coming home from incarceration and nobody will give you a chance.
          </p>
          <p className="text-2xl font-bold text-orange-400 mb-4">
            We see your potential, not your past.
          </p>
          <p className="text-lg leading-relaxed text-slate-300">
            This program was built for people who deserve a second chance. No judgment. No barriers. 
            Just real training, real skills, and real jobs waiting for you on the other side.
          </p>
        </div>
      </section>

      {/* Two Options - Simple */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Path</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE */}
            <div className="bg-white border-2 border-green-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-green-700 mb-4">Apply for FREE Training</div>
              <p className="text-slate-700 mb-4">
                Most students qualify for 100% free training through government funding programs:
              </p>
              <ul className="space-y-2 mb-6 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>WRG - Workforce Ready Grant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>WIOA - Workforce Innovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>JRI - Justice Reinvestment</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mb-6">
                No tuition. No debt. We help you apply and handle all the paperwork.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-8">
              <div className="text-3xl font-bold text-blue-700 mb-4">Don't Qualify? Pay Now</div>
              <div className="text-2xl font-bold text-slate-900 mb-4">$4,890 Total Cost</div>
              <p className="text-slate-700 mb-4">
                If you don't qualify for free funding, you can pay directly and start immediately.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-3">💳 Pay Over Time Examples:</p>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• <strong>$407/month</strong> for 12 months (0% APR with Affirm)</li>
                  <li>• <strong>$204/month</strong> for 24 months (low interest)</li>
                  <li>• <strong>4 payments of $1,223</strong> (Afterpay/Klarna)</li>
                  <li>• Or pay in full: $4,890</li>
                </ul>
                <p className="text-xs text-blue-700 mt-3">
                  Also accepted: PayPal, Venmo, Cash App Pay, credit/debit cards, ACH bank transfer
                </p>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                <strong>Includes:</strong> All training materials, certifications, and FREE Milady RISE online course ($295 value).
              </p>
              <Link
                href="/enroll-simple"
                className="block w-full text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Compact */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What You'll Learn</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">Foundations (Months 1-3)</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Safety & sanitation</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Tools & equipment</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Basic cutting techniques</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Core Skills (Months 4-8)</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Classic & modern cuts</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Fades & tapers</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Beard grooming & shaves</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Advanced (Months 9-18)</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Hair science & treatments</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Design & artistry</li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Business & licensing prep</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">1</div>
              <h3 className="font-bold mb-2">Enroll & Learn</h3>
              <p className="text-sm text-slate-600">Complete online coursework at your own pace</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">2</div>
              <h3 className="font-bold mb-2">Work in Barbershops</h3>
              <p className="text-sm text-slate-600">Practice on real clients and earn money</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">3</div>
              <h3 className="font-bold mb-2">Get Licensed & Hired</h3>
              <p className="text-sm text-slate-600">Pass state exam and start your career</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-6">
            Questions? Call us at <a href="tel:3173143757" className="underline font-bold">317-314-3757</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/enroll-simple"
              className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 border-2 border-white transition-all"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
