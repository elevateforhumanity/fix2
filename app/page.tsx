import Link from 'next/link';
import Image from 'next/image';
import { PROGRAMS } from '@/lib/programs-data';

export default function HomePage() {
  const programs = PROGRAMS;
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Video Background */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
            alt="Students learning together in a collaborative environment"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 md:px-12 w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-full text-base font-bold mb-6 shadow-2xl animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                100% FREE - Government Funded
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-2xl">
                Get Paid to Learn a New Career
              </h1>
              
              {/* Subheading - The Hook */}
              <p className="text-2xl md:text-3xl text-yellow-300 font-bold mb-6 drop-shadow-lg">
                No Tuition. No Debt. Real Jobs Waiting.
              </p>

              {/* What We Do - Clear Explanation */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-2xl">
                <p className="text-gray-900 text-xl font-bold mb-3">
                  We Connect You to 100% Funded Career Training
                </p>
                <p className="text-gray-700 text-base mb-4 leading-relaxed">
                  Elevate for Humanity is a <strong>workforce training provider</strong> that helps Indiana residents access <strong>free career training</strong> through government-funded programs. We work directly with WorkOne, case managers, and employers to remove barriers and get you trained for high-demand jobs.
                </p>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-gray-900 text-base font-semibold mb-3">
                    ✅ Your training is 100% paid for through:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-50 rounded-lg px-4 py-3 border-l-4 border-blue-600">
                      <strong className="text-blue-900">💼 WIOA (Workforce Innovation & Opportunity Act)</strong>
                      <p className="text-gray-700 mt-1">Federal funding for dislocated workers, low-income adults, and youth. Covers tuition, books, transportation, childcare.</p>
                    </div>
                    <div className="bg-green-50 rounded-lg px-4 py-3 border-l-4 border-green-600">
                      <strong className="text-green-900">🎯 WRG (Workforce Ready Grant)</strong>
                      <p className="text-gray-700 mt-1">Indiana state grant up to $7,500/year for high-demand careers. No student loans required.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg px-4 py-3 border-l-4 border-purple-600">
                      <strong className="text-purple-900">🔄 JRI (Justice Reinvestment Initiative)</strong>
                      <p className="text-gray-700 mt-1">Re-entry program for justice-involved individuals. Provides training, support services, and job placement.</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg px-4 py-3 border-l-4 border-orange-600">
                      <strong className="text-orange-900">💰 DOL Apprenticeships & OJT</strong>
                      <p className="text-gray-700 mt-1">Department of Labor registered apprenticeships. Earn wages while you learn on the job.</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm font-medium bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                  <strong>✨ Second chance friendly!</strong> We specialize in helping re-entry participants, career changers, and people with gaps in work history. If you're ready to work, we're ready to help.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform"
                >
                  Apply Now - It's Free
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all border-2 border-white/30 hover:border-white/50"
                >
                  View All Programs
                </Link>
              </div>

              {/* Quick Stats - Social Proof */}
              <div className="flex flex-wrap gap-4 text-white">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                  <div className="text-3xl font-bold">2,500+</div>
                  <div className="text-sm opacity-90">Students Trained</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm opacity-90">Get Jobs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                  <div className="text-3xl font-bold">$0</div>
                  <div className="text-sm opacity-90">Out of Pocket</div>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
            <span className="text-sm font-medium">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ABOUT ELEVATE SECTION */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Marion County, Indiana
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                <strong>Elevate for Humanity</strong> is an <strong>ETPL-approved workforce training provider</strong> serving Marion County and surrounding areas. We're not a traditional school—we're a <strong>connector</strong> between you, government funding, and real employers.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                We work directly with <strong>WorkOne Indiana</strong>, case managers, re-entry programs, and employer partners to remove barriers and get you trained for <strong>high-demand careers</strong> that actually pay.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm text-slate-700">
                  <strong>🎯 Our Mission:</strong> Bridge the gap between education and employment by connecting Indiana residents to 100% funded career training through WIOA, WRG, JRI, and DOL programs.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">What Makes Us Different</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>We handle all the paperwork for WIOA, WRG, and JRI funding</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Training happens at real job sites—barbershops, clinics, HVAC companies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>We specialize in second-chance hiring and re-entry support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Employers are waiting to hire our graduates—many get offers before completion</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border-2 border-blue-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">2,500+</div>
                  <div className="text-sm text-gray-600">Students Trained</div>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Get Jobs</div>
                </div>
                <div className="bg-white border-2 border-orange-200 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">$0</div>
                  <div className="text-sm text-gray-600">Out of Pocket</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Learn With Elevate for Humanity?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're not just a training provider—we're your partner in career transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                100% Free Training
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We navigate WIOA, WRG, JRI, and DOL funding so you don't pay tuition. We also help with transportation, childcare, and work clothing through support services.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Real Jobs Waiting
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We partner with employers who need trained workers NOW. Many students have job offers before they even graduate. We train for high-demand careers, not dead-end jobs.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Second Chance Friendly
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We specialize in helping re-entry participants, people with gaps in work history, and career changers. We understand barriers and work with you to overcome them.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Hands-On Training
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Learn by doing, not just watching videos. Our programs include real shop experience, clinical rotations, and on-the-job training with actual employers.
              </p>
            </div>

            {/* Reason 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Fast Track to Career
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Most programs are 4-24 weeks, not 2-4 years. Get trained, certified, and employed quickly. Start earning a real income in months, not years.
              </p>
            </div>

            {/* Reason 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-indigo-100">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Wraparound Support
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Case management, career coaching, resume help, interview prep, and job placement assistance. We support you from application to employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Empower Your Future Today
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join our transformative programs and unlock career opportunities that align with industry demands. Flexible, grant-funded options mean more possibilities for growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const programImages = [
                'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', // Medical Assistant
                'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&q=80', // Barber
                'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80', // HVAC
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80', // Building Maintenance
                'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80', // CDL/Truck Driving
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80', // Workforce Readiness
              ];
              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={programImages[index] || programImages[0]}
                      alt={program.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                      {program.blurb}
                    </p>
                    {program.funding && (
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          {program.funding}
                        </span>
                      </div>
                    )}
                    {program.duration && (
                      <p className="text-slate-500 text-xs mb-4">
                        {program.duration}
                      </p>
                    )}
                    <div className="inline-flex items-center text-blue-600 font-semibold text-sm">
                      Learn More
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
            >
              View All Programs
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Partnering For Futures: Testimonials That Inspire
            </h2>
            <p className="text-xl text-slate-600">
              Transforming futures through hands-on learning and career pathways
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jordan Lee",
                text: "The support from Elevate for Humanity has been transformative. Their funding allowed me to enroll in a high-quality apprenticeship program, setting me on a path to a fulfilling career.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
              },
              {
                name: "Alex Morgan",
                text: "Elevate for Humanity provided essential funding that opened doors to my dream apprenticeship. Their commitment to empowering individuals with career opportunities is truly inspiring.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
              },
              {
                name: "Taylor Rivers",
                text: "Elevate for Humanity's funding was a game-changer for me. It enabled my participation in an incredible training program that propelled my career forward.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-blue-600">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have launched successful careers through our funded training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Apply for Free Training
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all border-2 border-white"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Coursera Style */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make the process simple. Our team walks with you from interest
              to employment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Connect & Explore
              </h3>
              <p className="text-gray-600">
                Complete a short interest form. Our team reviews funding options
                and program fit with you.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Enroll & Train
              </h3>
              <p className="text-gray-600">
                Enroll with our training partners. Receive coaching, case
                management, and support.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                Elevate & Advance
              </h3>
              <p className="text-gray-600">
                Transition into jobs, apprenticeships, or next-level credentials
                with ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES - With Photos */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real people, real results. See how our graduates are building careers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Marcus - Barber Graduate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Marcus J.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">Barber Apprenticeship Graduate</p>
                <p className="text-gray-600 text-sm">
                  "From incarceration to owning my own chair. Elevate gave me the structure and support I needed."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80"
                  alt="Sarah - Medical Assistant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Sarah M.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">Medical Assistant Graduate</p>
                <p className="text-gray-600 text-sm">
                  "Single mom to certified MA in 5 months. Now working at a clinic with benefits for my family."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80"
                  alt="James - HVAC Technician"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2">James T.</h3>
                <p className="text-sm text-blue-600 font-semibold mb-3">HVAC Technician Graduate</p>
                <p className="text-gray-600 text-sm">
                  "Went from warehouse work to skilled trades. Making 2x my old salary with room to grow."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/success-stories"
              className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Coursera Style */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers with
            free, funded training programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition shadow-lg text-lg"
            >
              Join for Free
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
