"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WelcomeAudio } from "@/components/WelcomeAudio";
import PWAInstallSection from "@/components/PWAInstallSection";

export default function HomePage() {
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="bg-white overflow-x-hidden">
      {/* <WelcomeAudio /> */}
      {/* VIDEO HERO WITH TEXT OVERLAY */}
      <section className="relative w-full overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center bg-slate-900">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>

        {/* Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Text Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
            Transform Your Future
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-lg">
            Free Career Training • Real Jobs • No Debt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition shadow-xl"
            >
              Explore Programs
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-xl"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & STORY */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            We See Your Potential, Not Your Past
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            At Elevate for Humanity, we believe everyone deserves a shot at a better future. 
            Whether you're starting over, breaking barriers, or building something new—we're here to help you get there.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
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
      <section className="py-12 bg-slate-50">
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
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    src="/images/barber-professional.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
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
                <div className="relative h-48 overflow-hidden bg-teal-100">
                  <Image
                    src="/images/healthcare/cna-poster.jpg"
                    alt="CNA Healthcare"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
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
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <Image
                    src="/images/hvac-highlight.jpg"
                    alt="HVAC Technician"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
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
      <section className="py-12 bg-white">
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
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__5/generated-image-5ad8936e-e731-44e0-9fb9-459e8166f672.png?Expires=2080939134&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=NRIcy~TEuP1KHxghgJhRfV6TasR2~TYYzH7VPil1mMmPuqO5pvX9R8or-qCmm3r6caPRndtvSlHIAeWU2Ki6Xhsw4df3c86hoBhPrXwKVZ5e3LTzGXBu-vaT7giFPbgSIVIZNCKOOer6LzznxUHHxfnVMa8~8CAq6-8v9RGOxvr54mA2sOv~VRjRBQs~iH~vBk6mm5O2NYUMvneHcpM1x1pm-Lx0yN6S0Fe2Gf9ec8cPa1JnyDN4EOqqn2yuhSAwe3qRqZsa6b58zfaHB7oXSLVjiwEqYQiLnQU5YoBl9ZGuqZ7faq70qFfv2ze7Wob-5MHkS1jqhvlm-Qjqyu1NDA__"
                  alt="Second Chances"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Second Chances</h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, justice-involved individuals get free training, 
                certifications, and wrap-around support. Everyone deserves a path forward.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__3/generated-image-490c99f8-5b92-43d9-b250-d9e0737d9317.png?Expires=2080924478&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=v3QMnx8aJGuSYZtAGmbfHfEzVi95DBWi3ob3iwWiuAe0bROgg8OSQodp9VHjPnu1CWtGu-5tYwmk50uP2xUUaCrsvJyjCH8DxUrSIfR-5LHD3uiP~qmXKJ80EpLTQ~XIxCoRqz9dmGosf2zfZXjhs19NCWbNo0xi1JUaEbyu66HyV25tzPSUFn0X5Y9aDcL9tLJXxyl-gVaIYdOPMlIX0WM3ZVrN0~tgA5XgcoCKwdeR5Y3zjHHZbBG6Uh2bmtbusigFgI2uHd~nu~qLVTkLGPZy1GGXZOYDf-Xm2Dm37XTspUIifLQN6FQ96dexvaqL4vGJfaYE4AyG5s0vE-LKDA__"
                  alt="Parents & Caregivers"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Parents & Caregivers</h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and complete hands-on 
                requirements on a flexible schedule. We get it—life is complicated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src="https://cms-artifacts.artlist.io/content/generated-image-v1/image__7/generated-image-fc4dd113-8a89-4b1a-9bd6-afcac7ac3402.png?Expires=2080939098&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=Rjgc85nThSEZvNbZ02eeQxDxRNWPuoE3E2KKXPQW8Lc3tyQ1sHu010c2Kk28qMLvZ52AgC3Og30m07DkWXJc8ohPpxmuM8rp70gPlMB~nfRFLx78lxZ-gcDBhHUQ5xEQKJ~K1PIHsmdPS3XhAyMdryD04QLOfrton9ZkWfHJ1ApQzXlbE~xgFTxMMtiVusrVqNYpen1NwJhGnnB7OPmU8vYkFtxbao8o51OaUFx8iRUmY~SHYWvEwG-OW5FrFxBUeusvKkx2INqgUQpATKWCAzx0GrSasTilN49UsZARQUBcumMWf7sVGwN6L2RelRvUNu-oHs013UiYBE4qbXtAgg__"
                  alt="Career Changers"
                  fill
                  className="object-cover"
                />
              </div>
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
      <section className="py-12 bg-white">
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
                  src="https://i.imgur.com/c6WzXEy.jpg"
                  alt="Tax preparation training"
                  fill
                  quality={90}
                  className="object-cover"
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
                <div className="bg-slate-50 p-5 rounded-xl mb-6">
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
                <div className="bg-slate-50 p-5 rounded-xl mb-6">
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
                  src="https://i.imgur.com/4JkhUSO.jpg"
                  alt="Healthcare training - helping people"
                  fill
                  quality={90}
                  className="object-cover"
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
                <div className="bg-slate-50 p-5 rounded-xl mb-6">
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

      {/* PWA Install Section */}
      <PWAInstallSection />

      {/* CTA - Talk to an Advisor */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-orange-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-blue-800">
              <Image
                src="https://i.imgur.com/vCYOioP.png"
                alt="Ready to Start"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Most students qualify for 100% free training through WIOA, WRG, or apprenticeships. 
                Let's find the right path for you.
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-50 transition shadow-lg hover:shadow-xl"
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
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/90 mb-2">
                  <span className="font-semibold">Call us directly:</span>
                </p>
                <a href="tel:317-314-3757" className="text-2xl font-bold text-white hover:text-white/90 transition">
                  📞 317-314-3757
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
