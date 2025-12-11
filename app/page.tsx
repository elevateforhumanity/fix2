"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* VIDEO HERO */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[600px] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-home.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* MISSION & STORY */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            We See Your Potential, Not Your Past
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            At Elevate for Humanity, we believe everyone deserves a shot at a better future. 
            Whether you're starting over, breaking barriers, or building something new—we're here to help you get there.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">4-12</div>
              <div className="text-sm text-slate-600">Weeks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">$0</div>
              <div className="text-sm text-slate-600">Debt</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">Real</div>
              <div className="text-sm text-slate-600">Jobs Waiting</div>
            </div>
          </div>
          <p className="text-lg text-slate-600">
            Through partnerships with WIOA, WRG, JRI, and registered apprenticeships, 
            most students pay <span className="font-bold text-slate-900">nothing out of pocket</span>. 
            No loans. No debt. Just real training and real opportunity.
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
              Our programs are designed for people with real lives—parents, workers, people starting over. 
              Train online at your pace, practice hands-on, and step into a career that's waiting for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/barber-highlight-1.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Work in a real barbershop. Get paid while you train. Build your clientele. 
                    Own your chair or open your own shop. 12-18 months.
                  </p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <span className="text-6xl">🏥</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get certified fast. Work in hospitals, nursing homes, or home health. 
                    Stable income, flexible schedules, room to grow. 4-8 weeks.
                  </p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/hvac-highlight.png"
                    alt="HVAC Technician"
                    fill
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Learn heating, cooling, and refrigeration. High demand, good pay, job security. 
                    Start your own business or work for a company. 8-12 weeks.
                  </p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* FACILITY SHOWCASE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Modern Training Facility
            </h2>
            <p className="text-lg text-slate-600">
              Train with real equipment and expert instructors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/facility-hero.jpg"
                alt="Elevate for Humanity Training Facility"
                fill
                quality={70}
                className="object-cover"
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 mb-2">Hands-On Labs</h3>
              <p className="text-sm text-slate-600">
                Practice with real equipment.
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 flex flex-col justify-center">
              <h3 className="font-bold text-slate-900 mb-2">Career Services</h3>
              <p className="text-sm text-slate-600">
                Job placement assistance.
              </p>
            </div>
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
              We work with people who've been told "no" their whole lives. Justice-involved individuals. 
              Parents juggling childcare. People with gaps in their work history. You're welcome here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Second Chances</h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, justice-involved individuals get free training, 
                certifications, and wrap-around support. Everyone deserves a path forward.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Parents & Caregivers</h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and complete hands-on 
                requirements on a flexible schedule. We get it—life is complicated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-sm text-slate-700">
                Stuck in a dead-end job? Starting completely over? Our short-term programs 
                (4-12 weeks) get you into a new career fast—no years wasted.
              </p>
            </div>
          </div>
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
                src="/images/tax-business-highlight.jpg"
                alt="Tax Business Training"
                fill
                quality={70}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Tax & Finance</h3>
                  <p className="text-sm mb-4">
                    Launch your own tax prep business. Work from home. Earn $40k-$100k+ per year. 
                    Tax season is busy, but the rest of the year is yours.
                  </p>
                  <Link
                    href="/programs/tax-preparation"
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-orange-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/business-highlight.jpg"
                alt="Business & Entrepreneurship"
                fill
                quality={70}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Business Startup</h3>
                  <p className="text-sm mb-4">
                    Turn your idea into a real business. Learn marketing, branding, finances, 
                    and how to actually make money doing what you love.
                  </p>
                  <Link
                    href="/programs/business-startup"
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-orange-300"
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
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 text-lg"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Most students qualify for 100% free training through WIOA, WRG, or apprenticeships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-600 bg-white rounded-lg hover:bg-slate-50 transition"
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
          <p className="mt-6 text-sm text-orange-100">
            📞 Call us at <span className="font-semibold text-white">317-314-3757</span>
          </p>
        </div>
      </section>
    </main>
  );
}
