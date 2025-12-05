// app/page.tsx - Clean Homepage (No Images - Awaiting Facility Photos)
import Link from "next/link";
import HighlightStrip from "@/components/home/HighlightStrip";
import HomeProgramsSection from "@/components/home/HomeProgramsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO BANNER - Clean White, No Images */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Career training that works.
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-10 max-w-3xl mx-auto">
              WIOA-approved programs. Real careers. 100% funded training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-lg"
              >
                View Programs
              </Link>
              <Link
                href="https://www.indianacareerconnect.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-4 bg-gray-100 text-slate-900 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all text-lg"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workforce credibility strip */}
      <HighlightStrip />

      {/* Dynamic Programs Section from centralized data */}
      <HomeProgramsSection />


      {/* WHY CHOOSE US - No Images */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Elevate</h2>
            <p className="text-xl text-slate-600">Built for people navigating real barriers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">100% Fundable</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                WIOA, WRG, JRI, and ETPL approved. Most students pay $0 out of pocket.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">DOL Registered</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Federally recognized apprenticeships in barber, healthcare, and skilled trades.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Wraparound Support</h3>
              <p className="text-slate-600 leading-relaxed text-center">
                Life coaching, housing assistance, childcare navigation, and mental health referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Text Only */}
      <section className="py-20 px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600">Hear from our graduates</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <div className="mb-6">
                <p className="font-bold text-2xl text-slate-900">J. Moore</p>
                <p className="text-sm text-slate-600">Barber Apprentice</p>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "Elevate helped me restart my life. I went from struggling to becoming a licensed barber apprentice. They believed in me when no one else did."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <div className="mb-6">
                <p className="font-bold text-2xl text-slate-900">L. Anderson</p>
                <p className="text-sm text-slate-600">CNA Graduate</p>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                "The staff is amazing. They helped me get funding, childcare support, and confidence. I'm now working in healthcare and supporting my family."
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA SECTION - Bold and Clean */}
      <section className="py-40 px-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto">
            Funding is available. Programs fill fast. Take the first step today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/apply"
              className="px-10 py-4 bg-white text-slate-900 font-semibold rounded-full hover:bg-white transition-all shadow-lg text-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/advising"
              className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-slate-900 transition-all text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>

          <div className="text-slate-100">
            <p className="mb-2">Questions? We're here to help.</p>
            <p>
              Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or 
              email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold hover:text-white">elevateforhumanity.edu@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
