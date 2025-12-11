// SINGLE ENROLL PAGE - NO DUPLICATES
// Last updated: Dec 11, 2024
import Link from 'next/link';
import { PayNowSection } from './PayNowSection';

export default function EnrollPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Video Hero - Preload video before page starts */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/barber-hero.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Enrollment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* FREE Option */}
            <div className="bg-white rounded-lg border-2 border-green-500 p-8">
              <div className="text-3xl font-bold text-green-700 mb-4">Apply for FREE Training</div>
              <p className="text-lg text-slate-700 mb-4">
                Most students qualify for 100% free training through:
              </p>
              <ul className="space-y-2 mb-6 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>WRG</strong> - Workforce Ready Grant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>WIOA</strong> - Workforce Innovation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>JRI</strong> - Justice Reinvestment</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mb-6">
                No tuition. No debt. We help you apply and handle all paperwork.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Free Training
              </Link>
            </div>

            {/* PAID Option - Using PayNowSection component */}
            <PayNowSection />
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-2">Questions?</p>
            <a href="tel:3173143757" className="text-2xl font-bold text-orange-600 hover:text-orange-700">
              Call 317-314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
