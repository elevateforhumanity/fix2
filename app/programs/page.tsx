import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import Image from "next/image";
export const metadata = {
  title: 'Elevate For Humanity',
  description: 'Career training and development programs'
};

export default async function ProgramsPage() {

  const programs = await getPrograms();
  return (
    <main className="min-h-screen bg-white">
      {/* HERO BANNER - Mobile Optimized */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden bg-white">
        <Image
          src="/media-backup-20251128-043832/programs/multi-training-programs.png"
          alt="Students learning and training together"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </section>

      {/* Content Section - Below Hero */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-full text-xs sm:text-sm font-semibold">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
              </svg>
              Career Training Programs
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Choose Your Career Path
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed">
              {programs.length} workforce development programs. 100% funded through WIOA, grants, and employer partnerships.
            </p>

            <div className="flex flex-wrap gap-6 text-slate-900 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">{programs.length}</div>
                  <div className="text-sm text-slate-600">Programs</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-slate-600">Free Training</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-sm text-slate-600">Students Trained</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-full hover:bg-orange-700 transition-colors shadow-xl"
              >
                Get Started Today
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-full hover:bg-slate-100 transition-colors border-2 border-white shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Program Highlights</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our most popular career training programs with 100% funding available through WIOA, WRG, and partner grants.
            </p>
          </div>

          <div className="space-y-16">
            {/* Healthcare Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/gallery/image4.jpg"
                  alt="Healthcare Training Programs" fill className="object-cover" quality={100} sizes="100vw" />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  Healthcare
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Healthcare Training</h3>
                <p className="text-lg text-slate-600 mb-6" />
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Clinical Experience:</strong> Real hospital and clinic placements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>High Demand:</strong> $35K-$55K starting salaries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/medical-assistant" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition">
                    View Healthcare Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Barber & Beauty Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-4">
                  Beauty & Barbering
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Barber & Beauty Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Master the art of barbering and beauty through our DOL Registered Apprenticeship or traditional school programs. Earn while you learn and build your own clientele.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Earn While Learning:</strong> Get paid during apprenticeship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>State Licensed:</strong> Indiana barber license upon completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Own Your Business:</strong> Suite ownership training included</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/barber-apprenticeship" className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition">
                    View Barber Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
                <Image src="/images/location-1.jpg"
                  alt="Barber Training Programs" fill className="object-cover" quality={100} sizes="100vw" />
              </div>
            </div>

            {/* Skilled Trades Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/gallery/image11.jpg"
                  alt="Skilled Trades Training" fill className="object-cover" quality={100} sizes="100vw" />
              </div>
              <div>
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-4">
                  Skilled Trades
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Skilled Trades Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Build a high-paying career in HVAC, building maintenance, and construction trades. Hands-on training with industry-standard certifications and job placement support.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>High Wages:</strong> $45K-$75K+ earning potential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Indusstart Certs:</strong> EPA, OSHA, and trade certifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Job Ready:</strong> Immediate employment opportunities</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/hvac-technician" className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition">
                    View Trades Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-orange-600 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Business & Professional Programs */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                  Business & Professional
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Business & Workforce Training</h3>
                <p className="text-lg text-slate-600 mb-6">
                  Start your own business or advance your professional career with programs in tax preparation, entrepreneurship, and workforce readiness.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Certifications:</strong> IRS VITA, QuickBooks, Microsoft 365</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700"><strong>Startup Support:</strong> Business mentorship and funding</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href="/programs/tax-prep" className="px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition">
                    View Business Programs
                  </Link>
                  <Link href="/apply" className="px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition">
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
                <Image src="/media-backup-20251128-043832/programs/multi-training-programs.png"
                  alt="Business Training Programs"
                  fill
                  className="object-cover"
                  unoptimized quality={100} sizes="100vw" />
              </div>
            </div>
          </div>

          {/* View All Programs CTA */}
          <div className="mt-16 text-center bg-slate-50 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Explore All {programs.length}+ Programs</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We offer training in healthcare, trades, transportation, beauty, business, and more. All programs include funding assistance and job placement support.
            </p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition text-lg">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Milady RISE Callout for Beauty & Barber */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-pink-600">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">💇</div>
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Milady RISE Partner – Client Safety & Well-Being</h2>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  Our beauty and barber students gain access to Milady RISE training in:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Domestic Violence Awareness</div>
                    <p className="text-sm text-slate-600">Recognize signs and provide support</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Human Trafficking Awareness</div>
                    <p className="text-sm text-slate-600">Identify and respond appropriately</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="font-semibold text-pink-900 mb-1">Infection Control</div>
                    <p className="text-sm text-slate-600">2-hour safety certification course</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">
                  Students and staff who complete all modules earn a <strong>Client Well-Being & Safety Certification</strong> and can apply for Milady's <strong>$500 RISE scholarships</strong>.
                </p>
                <p className="text-slate-600">
                  To enroll, students visit Milady's training portal and use our school code: <code className="bg-slate-100 px-3 py-1 rounded font-mono text-pink-700">efhcti-rise295</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-orange-200 bg-white p-8 lg:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Unsure Which Program Fits You Best?
              </h2>
              <p className="text-lg text-slate-700 mb-8">
                You don&apos;t have to figure it out alone. Our team can help you
                explore options based on your interests, work history, and funding
                eligibility.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-colors shadow-lg"
                >
                  Get Matched to a Program
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Learn How Funding Works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            100% free training. No tuition, no fees, no debt. Just a direct pathway to your career.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="px-10 py-5 bg-white text-orange-600 font-bold rounded-full hover:bg-slate-100 transition-all shadow-2xl text-lg">
              Apply Now - It's Free
            </Link>
            <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 border-2 border-white transition-all shadow-2xl text-lg">
              Contact Us
            </Link>
          </div>
          <p className="text-white/80 mt-8 text-sm">
            Questions? Call <a href="tel:317-314-3757" className="underline font-semibold">317-314-3757</a> or email <a href="mailto:info@elevateforhumanity.org" className="underline font-semibold">info@elevateforhumanity.org</a>
          </p>
        </div>
      </section>

    </main>
  );

}
