'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* VIDEO HERO */}
      <section className="relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-auto"
          style={{ display: 'block', maxHeight: '600px', objectFit: 'cover' }}
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
      </section>

      {/* MISSION & STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            We See Your Potential, Not Your Past
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            At Elevate for Humanity, we believe everyone deserves a shot at a
            better future. Whether you're starting over, breaking barriers, or
            building something new—we're here to help you get there.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                100%
              </div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                4-12
              </div>
              <div className="text-sm text-slate-600">Weeks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                $0
              </div>
              <div className="text-sm text-slate-600">Debt</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2">
                Real
              </div>
              <div className="text-sm text-slate-600">Jobs Waiting</div>
            </div>
          </div>
          <p className="text-lg text-slate-600">
            Through partnerships with WIOA, WRG, JRI, and registered
            apprenticeships, most students pay{' '}
            <span className="font-bold text-slate-900">
              nothing out of pocket
            </span>
            . No loans. No debt. Just real training and real opportunity.
          </p>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Real Skills. Real Careers. Real Fast.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our programs are designed for people with real lives—parents,
              workers, people starting over. Train online at your pace, practice
              hands-on, and step into a career that's waiting for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-6.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Work in a real barbershop. Get paid while you train. Build
                    your clientele. Own your chair or open your own shop. 12-18
                    months.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-2.jpg"
                    alt="CNA Healthcare Training"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get certified fast. Work in hospitals, nursing homes, or
                    home health. Stable income, flexible schedules, room to
                    grow. 4-8 weeks.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/artlist/hero-training-3.jpg"
                    alt="HVAC Technician"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Learn heating, cooling, and refrigeration. High demand, good
                    pay, job security. Start your own business or work for a
                    company. 8-12 weeks.
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange-600 text-white font-bold text-base rounded-lg">
                    Learn More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold hover:text-brand-orange-700"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              You Don't Need Perfect. You Just Need to Start.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We work with people who've been told "no" their whole lives.
              Justice-involved individuals. Parents juggling childcare. People
              with gaps in their work history. You're welcome here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Second Chances
              </h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, justice-involved individuals get
                free training, certifications, and wrap-around support. Everyone
                deserves a path forward.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Parents & Caregivers
              </h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and
                complete hands-on requirements on a flexible schedule. We get
                it—life is complicated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Career Changers
              </h3>
              <p className="text-sm text-slate-700">
                Stuck in a dead-end job? Starting completely over? Our
                short-term programs (4-12 weeks) get you into a new career
                fast—no years wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ELEVATION MESSAGE - Second Hero */}
      <section className="relative bg-black text-white px-6 sm:px-10 lg:px-12 py-32 lg:py-40 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2081181154&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=VwkyRzCrV6H1PWfgEOAjdlFRKVaLggSXiMJuEMfNgBvs0LcsogkXMuXNj05nyyCnO0JFmYNadPeQ5vIijEMU2LbBsiMH3dIfehwfMaBjjn5Ffphrc-BjoKc1cazP744W4YMM3MrDtBLqzQPphVXiQutv71uegGfie3jzq6jD8CwLAaCpZgEY7Ujo0e4JeJ7BZBv1WFTtOZVQDbMXHe~61~mGhAlH9eH9Z-fFjf4Wu51RNAFhlewsDWHbxyO6Qk5lIJ1pTv8jB-BQMqNNzzenXMWWW5AGhbFtd0D85-zWC2f~rUz8fuNx3jqV~99wh005J0XK6XTTJIxsgSB5o2ZT6w__"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
            This Is Not Graduation.
          </h2>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-orange-600 leading-tight mb-12">
            This Is Elevation.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            We don't just hand you a certificate. We elevate you to a new
            level—with skills, confidence, and a career that changes everything.
          </p>
        </div>
      </section>

      {/* MORE PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              More Ways to Build Your Future
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/artlist/hero-training-4.jpg"
                alt="Tax Business Training"
                fill
                quality={70}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/70 flex items-end">
                <div className="p-8 text-white w-full bg-black/80">
                  <h3
                    className="text-4xl font-black mb-4 text-white"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                  >
                    Tax & Finance
                  </h3>
                  <p
                    className="text-lg mb-5 font-semibold leading-relaxed"
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}
                  >
                    Launch your own tax prep business. Work from home. Earn
                    $40k-$100k+ per year. Tax season is busy, but the rest of
                    the year is yours.
                  </p>
                  <Link
                    href="/programs/tax-preparation"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange-600 text-white font-bold text-lg rounded-lg hover:bg-brand-orange-700 transition"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/artlist/hero-training-5.jpg"
                alt="Business & Entrepreneurship"
                fill
                quality={70}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/70 flex items-end">
                <div className="p-8 text-white w-full bg-black/80">
                  <h3
                    className="text-4xl font-black mb-4 text-white"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
                  >
                    Business Startup
                  </h3>
                  <p
                    className="text-lg mb-5 font-semibold leading-relaxed"
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}
                  >
                    Turn your idea into a real business. Learn marketing,
                    branding, finances, and how to actually make money doing
                    what you love.
                  </p>
                  <Link
                    href="/programs/business-startup"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange-600 text-white font-bold text-lg rounded-lg hover:bg-brand-orange-700 transition"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-brand-orange-600 font-semibold hover:text-brand-orange-700 text-lg"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Most students qualify for 100% free training through WIOA, WRG, or
            apprenticeships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-orange-600 bg-white rounded-lg hover:bg-slate-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/90">
            📞 Call us at{' '}
            <span className="font-semibold text-white">317-314-3757</span>
          </p>
        </div>
      </section>
    </main>
  );
}
