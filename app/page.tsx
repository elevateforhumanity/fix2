"use client";

import Image from "next/image";
import Link from "next/link";
import { WelcomeAudio } from "@/components/WelcomeAudio";

export default function HomePage() {
  return (
    <main className="bg-white">
      <WelcomeAudio />
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
                    src="/images/barber-professional.jpg"
                    alt="Barber Apprenticeship - Professional barber training"
                    fill
                    quality={90}
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Work in a real barbershop. Get paid while you train. Build your clientele. 
                    Own your chair or open your own shop. 12-18 months.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/healthcare/program-cna-training.jpg"
                    alt="CNA Healthcare Training - Certified Nursing Assistant"
                    fill
                    quality={90}
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Get certified fast. Work in hospitals, nursing homes, or home health. 
                    Stable income, flexible schedules, room to grow. 4-8 weeks.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/hvac-highlight.png"
                    alt="HVAC Technician - Heating and Cooling Training"
                    fill
                    quality={90}
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Learn heating, cooling, and refrigeration. High demand, good pay, job security. 
                    Start your own business or work for a company. 8-12 weeks.
                  </p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-extrabold text-lg rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all tracking-wide antialiased">
                    Learn More →
                  </div>
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

      {/* MORE PATHWAYS - STORYTELLING */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              More Ways to Change Your Future
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real people. Real transformations. Real opportunities waiting for you.
            </p>
          </div>

          {/* Story 1: Tax Preparation */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Tax preparation training"
                  fill
                  quality={80}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                  Tax & Finance
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I went from working retail to running my own tax business"
                </h3>
                <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                  Sarah was tired of minimum wage and unpredictable hours. After 8 weeks of tax prep training, 
                  she started her own business from home. Now she earns $60k+ during tax season and has her 
                  summers free to spend with her kids.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-orange-500">8 Weeks</div>
                      <div className="text-sm text-slate-600">Training Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">$60k+</div>
                      <div className="text-sm text-slate-600">First Year Income</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/programs/tax-preparation"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition"
                >
                  Start Your Tax Business →
                </Link>
              </div>
            </div>
          </div>

          {/* Story 2: HVAC */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  Skilled Trades
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I was unemployed. Now I'm making $55k with benefits"
                </h3>
                <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                  Marcus lost his job during the pandemic. He enrolled in HVAC training, got certified in 
                  10 weeks, and landed a union job with full benefits. Companies are desperate for skilled 
                  technicians—he had three job offers before he even finished.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-500">10 Weeks</div>
                      <div className="text-sm text-slate-600">To Certification</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">3 Offers</div>
                      <div className="text-sm text-slate-600">Before Graduation</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/programs/hvac"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition"
                >
                  Explore HVAC Training →
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2 bg-slate-100">
                <Image
                  src="/images/gallery/image5.jpg"
                  alt="HVAC training"
                  fill
                  quality={80}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Story 3: Healthcare */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                <Image
                  src="/images/gallery/image7.jpg"
                  alt="Healthcare training"
                  fill
                  quality={80}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  Healthcare
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  "I wanted to help people. Now I do—and I get paid for it"
                </h3>
                <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                  Jennifer always wanted to work in healthcare but thought she needed years of school. 
                  She became a CNA in just 4 weeks and now works at a hospital making $18/hour with 
                  room to grow into nursing.
                </p>
                <div className="bg-slate-50 p-6 rounded-xl mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-500">4 Weeks</div>
                      <div className="text-sm text-slate-600">To CNA License</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">$18/hr</div>
                      <div className="text-sm text-slate-600">Starting Pay</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/programs/cna"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition"
                >
                  Start Healthcare Career →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <p className="text-lg text-slate-600 mb-6">
              These are real pathways. Real timelines. Real outcomes.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-lg hover:bg-orange-700 transition shadow-lg hover:shadow-xl"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* GET STARTED HERO BANNER */}
      <section className="relative overflow-hidden">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          {/* Hero Banner Image */}
          <Image
            src="/images/talk-to-advisor.jpg"
            alt="Ready to start your career transformation - Talk to an advisor"
            fill
            quality={95}
            priority={false}
            className="object-cover"
          />
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-block px-6 py-2 bg-red-600 rounded-full text-white font-bold text-sm mb-6 shadow-lg">
                  🚀 Ready to Start?
                </div>
                
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Your Future<br />Starts Today
                </h2>
                
                {/* Subheading */}
                <p className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-8 leading-relaxed font-light">
                  Most students qualify for <span className="font-bold text-white">100% free training</span> through WIOA, WRG, or apprenticeships.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-600/50 hover:scale-105"
                  >
                    Apply Now →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white rounded-xl hover:bg-white/20 transition-all shadow-xl"
                  >
                    Talk to an Advisor
                  </Link>
                </div>
                
                {/* Phone Number Card */}
                <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
                  <p className="text-sm text-white/90 mb-2 font-semibold">
                    Or call us directly:
                  </p>
                  <a 
                    href="tel:317-314-3757" 
                    className="text-3xl md:text-4xl font-bold text-white hover:text-red-400 transition-colors flex items-center gap-3"
                  >
                    📞 317-314-3757
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
