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

      {/* Two Options - Simple */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Path</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* FREE */}
            <div className="bg-white border-2 border-green-500 rounded-xl p-6">
              <div className="text-2xl font-bold text-green-700 mb-3">100% FREE</div>
              <p className="text-slate-600 mb-4">
                If you qualify for WIOA, WRG, or JRI funding. No tuition. No debt.
              </p>
              <Link
                href="/apply"
                className="block w-full text-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID */}
            <div className="bg-white border-2 border-blue-500 rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-700 mb-3">$4,890</div>
              <p className="text-slate-600 mb-4">
                Start immediately. 13 payment options. Includes FREE Milady RISE certification.
              </p>
              <Link
                href="/checkout/prog-barber-apprentice"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
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
              href="/apply"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/checkout/prog-barber-apprentice"
              className="px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 border-2 border-white"
            >
              Enroll Now - $4,890
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
