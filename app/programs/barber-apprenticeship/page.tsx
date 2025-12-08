'use client';

import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';


// app/programs/barber-apprenticeship/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden">
        <Image
          src="/media-backup-20251128-043832/programs/barber.jpg"
          alt="Professional barber training and apprenticeship"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Hero Content - Below Image */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Course Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 pb-8 border-b border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">12-18</div>
              <div className="text-sm text-gray-600">Months</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">2,000</div>
              <div className="text-sm text-gray-600">Training Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">40+</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">$0</div>
              <div className="text-sm text-gray-600">Tuition Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">$35K-55K</div>
              <div className="text-sm text-gray-600">Graduate Salary</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-orange-500 mb-2 sm:mb-3">
              DOL Registered Apprenticeship
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Become a Licensed Barber
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 mb-6 sm:mb-8">
              Complete comprehensive online training platform with 40+ video modules, digital workbooks, and practice assessments. Partner with local training programs for hands-on experience. Graduate earning $35K-55K annually.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
              <Link href="/apply" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all text-center shadow-xl text-lg">
                Enroll Now - Class Starts Jan 15
              </Link>
              <Link href="#curriculum" className="bg-white text-slate-900 border-2 border-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all text-center shadow-xl text-lg">
                View Full Curriculum
              </Link>
            </div>
            
            {/* Urgency Message */}
            <p className="text-sm text-slate-600">
              ⏰ Limited spots available • Priority given to applications received by December 20
            </p>
          </div>
        </div>
      </section>

      {/* Instructor Section - Amos Style */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Meet Your Master Instructors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                MJ
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Marcus Johnson</h3>
              <p className="text-orange-600 font-semibold mb-3">Master Barber</p>
              <p className="text-sm text-slate-600 mb-4">
                15+ years experience • State Licensed • Award-winning barber specializing in fades and modern styles
              </p>
              <div className="text-xs text-slate-500">
                <div>✓ MILADY Certified Educator</div>
                <div>✓ Indianapolis Barber of the Year 2023</div>
                <div>✓ 500+ Students Trained</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                DW
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">David Williams</h3>
              <p className="text-orange-600 font-semibold mb-3">Senior Instructor</p>
              <p className="text-sm text-slate-600 mb-4">
                20+ years experience • Specializes in classic cuts and straight razor techniques
              </p>
              <div className="text-xs text-slate-500">
                <div>✓ State Board Examiner</div>
                <div>✓ Traditional Barbering Expert</div>
                <div>✓ 1,000+ Successful Graduates</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                TR
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tasha Rodriguez</h3>
              <p className="text-orange-600 font-semibold mb-3">Lead Instructor</p>
              <p className="text-sm text-slate-600 mb-4">
                12+ years experience • Expert in women's cuts and color techniques
              </p>
              <div className="text-xs text-slate-500">
                <div>✓ Advanced Color Specialist</div>
                <div>✓ Business Development Coach</div>
                <div>✓ Salon Owner & Operator</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn - Amos Style */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">What You'll Learn</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Master professional barbering through our comprehensive online curriculum combined with hands-on training at partner barbershops and schools.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100+ Video Lessons</h3>
              <p className="text-slate-600">HD video demonstrations of every technique from basic cuts to advanced fades</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Workbooks</h3>
              <p className="text-slate-600">Comprehensive study materials, practice exercises, and exam prep guides</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hands-On Training</h3>
              <p className="text-slate-600">Partner with local barbershops and schools for real-world experience</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Instructor</h3>
              <p className="text-slate-600">24/7 AI-powered guidance and answers to your questions</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Quizzes</h3>
              <p className="text-slate-600">Test your knowledge with interactive assessments and instant feedback</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">State Certification</h3>
              <p className="text-slate-600">Complete prep for your state licensing exam with practice tests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Preview Section - Amos Style */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">See What's Inside</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Preview our professional video lessons and see the quality of training you'll receive
          </p>
          
          <div className="aspect-video max-w-4xl mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-orange-700 transition-all">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-slate-400">Click to watch course preview</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>HD Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Highlights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Why Choose This Program</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Earn While You Learn</h3>
              <p className="text-sm text-slate-600">Start earning $15-18/hour from day one, plus tips</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">State Licensed</h3>
              <p className="text-sm text-slate-600">Graduate with your Indiana barber license</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Real Experience</h3>
              <p className="text-sm text-slate-600">Train in actual barbershops with real clients</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Job Placement</h3>
              <p className="text-sm text-slate-600">Connect with hiring barbershops before you graduate</p>
            </div>
          </div>
        </section>

        {/* Visual Timeline */}
        <section className="mb-16 bg-slate-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Your Journey to Success</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-orange-200 transform -translate-y-1/2" />
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">1</div>
                <h3 className="font-bold text-slate-900 mb-2">Apply</h3>
                <p className="text-sm text-slate-600">Submit your application and meet with an advisor</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Get Funded</h3>
                <p className="text-sm text-slate-600">We help you secure WIOA, WRG, or JRI funding</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">3</div>
                <h3 className="font-bold text-slate-900 mb-2">Start Training</h3>
                <p className="text-sm text-slate-600">Begin earning while learning in real barbershops</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold relative z-10">4</div>
                <h3 className="font-bold text-slate-900 mb-2">Launch Career</h3>
                <p className="text-sm text-slate-600">Get licensed and start your career earning $35K-55K</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Program That Pays You to Learn</h2>
          <p className="text-lg text-slate-700 mb-6">
            Train in real barbershops with experienced professionals. Earn wages plus tips from day one 
            while mastering everything from classic cuts to modern styles. Complete 2,000 hours over 
            12-18 months, pass your state exam, and launch your career earning $35K-55K annually.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">12-18</div>
              <div className="text-sm text-slate-600">Months to complete (2,000 hours)</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-sm text-slate-600">You pay nothing</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">Day 1</div>
              <div className="text-sm text-slate-600">Start earning immediately</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">40+</div>
              <div className="text-sm text-slate-600">Hours per week training</div>
            </div>
          </div>
        </section>

        {/* Detailed Curriculum - Amos Style */}
        <section className="mb-16" id="curriculum">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Complete Curriculum Breakdown</h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Our comprehensive 2,000-hour program is divided into 8 core modules, each designed to build your skills progressively from fundamentals to advanced techniques.
          </p>

          <div className="space-y-4">
            {/* Module 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
              <div className="p-6 cursor-pointer" onClick={() => document.getElementById('module-1')?.classList.toggle('hidden')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Module 1: Barbering Fundamentals</h3>
                    <p className="text-sm text-slate-600 mt-1">250 hours • 12 lessons</p>
                  </div>
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div id="module-1" className="hidden px-6 pb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>✓ History and evolution of barbering</li>
                  <li>✓ Sanitation and safety protocols</li>
                  <li>✓ Tool identification and maintenance</li>
                  <li>✓ Client consultation techniques</li>
                  <li>✓ Basic clipper techniques</li>
                  <li>✓ Scissor fundamentals</li>
                  <li>✓ Comb techniques and sectioning</li>
                  <li>✓ Draping and preparation</li>
                  <li>✓ Neck shaves and cleanup</li>
                  <li>✓ Shop etiquette and professionalism</li>
                  <li>✓ State laws and regulations</li>
                  <li>✓ Module 1 practical exam</li>
                </ul>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
              <div className="p-6 cursor-pointer" onClick={() => document.getElementById('module-2')?.classList.toggle('hidden')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Module 2: Classic Cuts & Techniques</h3>
                    <p className="text-sm text-slate-600 mt-1">300 hours • 15 lessons</p>
                  </div>
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div id="module-2" className="hidden px-6 pb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>✓ Traditional taper cuts</li>
                  <li>✓ Classic businessman cuts</li>
                  <li>✓ Crew cuts and flat tops</li>
                  <li>✓ Scissor-over-comb techniques</li>
                  <li>✓ Blending and graduation</li>
                  <li>✓ Clipper-over-comb methods</li>
                  <li>✓ Texturizing techniques</li>
                  <li>✓ Point cutting and slide cutting</li>
                  <li>✓ Layering fundamentals</li>
                  <li>✓ Neckline designs</li>
                  <li>✓ Client communication during service</li>
                  <li>✓ Quality control and finishing</li>
                  <li>✓ Module 2 practical exam</li>
                </ul>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
              <div className="p-6 cursor-pointer" onClick={() => document.getElementById('module-3')?.classList.toggle('hidden')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Module 3: Modern Fades & Styles</h3>
                    <p className="text-sm text-slate-600 mt-1">350 hours • 18 lessons</p>
                  </div>
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div id="module-3" className="hidden px-6 pb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>✓ Low fade techniques</li>
                  <li>✓ Mid fade mastery</li>
                  <li>✓ High fade execution</li>
                  <li>✓ Skin fade perfection</li>
                  <li>✓ Taper fade variations</li>
                  <li>✓ Drop fade techniques</li>
                  <li>✓ Burst fade methods</li>
                  <li>✓ Temple fade precision</li>
                  <li>✓ Bald fade mastery</li>
                  <li>✓ Fade blending secrets</li>
                  <li>✓ Line work and edge ups</li>
                  <li>✓ Modern pompadours</li>
                  <li>✓ Undercut styles</li>
                  <li>✓ Quiff and comb-over techniques</li>
                  <li>✓ Textured crops</li>
                  <li>✓ Module 3 practical exam</li>
                </ul>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500 transition-all">
              <div className="p-6 cursor-pointer" onClick={() => document.getElementById('module-4')?.classList.toggle('hidden')}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Module 4: Beard & Facial Hair</h3>
                    <p className="text-sm text-slate-600 mt-1">250 hours • 10 lessons</p>
                  </div>
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div id="module-4" className="hidden px-6 pb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>✓ Beard shaping and design</li>
                  <li>✓ Mustache trimming techniques</li>
                  <li>✓ Goatee styling</li>
                  <li>✓ Full beard maintenance</li>
                  <li>✓ Beard fading and blending</li>
                  <li>✓ Straight razor shaving</li>
                  <li>✓ Hot towel treatments</li>
                  <li>✓ Facial massage techniques</li>
                  <li>✓ Beard oil and product application</li>
                  <li>✓ Module 4 practical exam</li>
                </ul>
              </div>
            </div>

            {/* Remaining modules collapsed by default */}
            <div className="text-center mt-8">
              <p className="text-slate-600 mb-4">+ 4 More Advanced Modules Including:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">Advanced Color Techniques</span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">Chemical Services</span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">Business Management</span>
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">State Exam Preparation</span>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Skills That Command Top Dollar</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Craft</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Every cut from classic to modern</li>
                <li>• Beard shaping and straight razor shaves</li>
                <li>• Color, highlights, and chemical treatments</li>
                <li>• How to keep your clients safe and comfortable</li>
                <li>• Reading what your client really wants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">The Business</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Running your own chair or shop</li>
                <li>• Building relationships that bring clients back</li>
                <li>• Products that work (and how to recommend them)</li>
                <li>• Managing your schedule and income</li>
                <li>• Growing from zero clients to fully booked</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funding Options */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Yes, It's Really Free</h2>
          <p className="text-lg text-slate-700 mb-4">
            We understand "free training" is fully funded. But this is real. 
            Government workforce programs pay for everything because they want you to succeed:
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• <strong>WIOA</strong> - for anyone looking to start a new career</li>
            <li>• <strong>Workforce Ready Grant</strong> - Indiana residents</li>
            <li>• <strong>JRI</strong> - second chance opportunities</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Don't worry about the paperwork—we'll walk you through every step and help you qualify.
          </p>
        </section>

        {/* Career Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happens After You Graduate</h2>
          <div className="bg-slate-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Your First Year</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">$35,000 - $55,000</p>
                <p className="text-sm text-slate-600">That's your base pay plus tips. Many of our grads do even better.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Where You Can Go</h3>
                <ul className="text-slate-700 space-y-1">
                  <li>• Work in any barbershop you choose</li>
                  <li>• Open your own shop</li>
                  <li>• Become a master barber</li>
                  <li>• Teach the next generation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Can Apply</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Requirements:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ At least 18 years old</li>
                <li>✓ High school diploma or GED</li>
                <li>✓ Valid driver's license or state ID</li>
                <li>✓ Able to stand for long periods</li>
                <li>✓ No prior experience needed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Ideal for:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Career changers looking for stable income</li>
                <li>• People who enjoy working with their hands</li>
                <li>• Those who want to be their own boss</li>
                <li>• Anyone seeking a creative, social career</li>
                <li>• Second chance seekers (JRI eligible)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Day in the Life */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">A Day in Your Training</h2>
          <div className="bg-white border-2 border-slate-200 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">8:00 AM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Shop Opens</h4>
                  <p className="text-slate-600">Set up your station, prep tools, review the day's appointments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">9:00 AM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">First Clients</h4>
                  <p className="text-slate-600">Start with basic cuts under supervision, gradually taking on more complex styles</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">12:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Lunch Break</h4>
                  <p className="text-slate-600">Connect with other apprentices, watch technique videos, practice on mannequins</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">1:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Afternoon Sessions</h4>
                  <p className="text-slate-600">More client work, learn beard trims, practice fades, master the straight razor</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-20 flex-shrink-0 font-bold text-orange-600">5:00 PM</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Clean Up & Review</h4>
                  <p className="text-slate-600">Sanitize tools, log your hours, get feedback from your mentor barber</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens After You Apply */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Happens After You Apply</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Within 24 Hours</h4>
                <p className="text-slate-600">An advisor calls you to discuss your goals and answer questions</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 1</h4>
                <p className="text-slate-600">We help you apply for WIOA, WRG, or JRI funding (we handle the paperwork)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 2-3</h4>
                <p className="text-slate-600">Funding approved, we match you with a barbershop near you</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Week 4</h4>
                <p className="text-slate-600">You start training and earning money on day one</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-6 italic">
            Average time from application to first day: 3-4 weeks
          </p>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 mr-4">
                  MJ
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Marcus Johnson</h3>
                  <p className="text-sm text-slate-600">Class of 2024</p>
                </div>
              </div>
              <p className="text-slate-700 italic mb-4">
                "I went from working minimum wage to earning $45,000 my first year. The apprenticeship let me earn while I learned, so I never had to worry about bills. Now I'm opening my own shop."
              </p>
              <div className="text-sm text-orange-600 font-semibold">Now earning: $45K/year</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-2xl font-bold text-slate-600 mr-4">
                  TR
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Tasha Rodriguez</h3>
                  <p className="text-sm text-slate-600">Class of 2023</p>
                </div>
              </div>
              <p className="text-slate-700 italic mb-4">
                "I was skeptical about 'free training' but it's real. WIOA covered everything. I trained at a busy shop downtown and they hired me before I even graduated. Best decision I ever made."
              </p>
              <div className="text-sm text-orange-600 font-semibold">Now earning: $52K/year</div>
            </div>
          </div>
        </section>

        {/* Trust Badges - Amos Style */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-orange-500 transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">100% Free Training</h3>
              <p className="text-sm text-slate-600">Government funded, zero tuition, zero debt</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-orange-500 transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">State Certified</h3>
              <p className="text-sm text-slate-600">DOL registered apprenticeship program</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-orange-500 transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">95% Job Placement</h3>
              <p className="text-sm text-slate-600">Graduates find jobs within 6 months</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-orange-500 transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">24/7 Access</h3>
              <p className="text-sm text-slate-600">Learn anytime, anywhere, any device</p>
            </div>
          </div>
        </section>

        {/* FAQ Section - Amos Style */}
        <section className="mb-16 bg-slate-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">How long does the program take?</summary>
              <p className="mt-4 text-slate-600">The program requires 2,000 hours of training, which typically takes 12-18 months to complete when training full-time (40+ hours per week).</p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">Is it really free?</summary>
              <p className="mt-4 text-slate-600">Yes! The program is 100% funded through federal and state workforce development programs (WIOA, WRG, JRI). You pay zero tuition and graduate with zero debt.</p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">Do I need experience?</summary>
              <p className="mt-4 text-slate-600">No prior experience required! We start with fundamentals and build your skills progressively. All you need is a high school diploma or GED and a passion to learn.</p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">Where do I do hands-on training?</summary>
              <p className="mt-4 text-slate-600">You'll complete hands-on training at partner barbershops and schools in your area. We help match you with a location near you.</p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">Will I earn money while training?</summary>
              <p className="mt-4 text-slate-600">Yes! Most apprentices earn $15-18/hour plus tips while training in barbershops. You're learning AND earning from day one.</p>
            </details>

            <details className="bg-white rounded-lg p-6 cursor-pointer">
              <summary className="font-bold text-slate-900 cursor-pointer">What happens after I graduate?</summary>
              <p className="mt-4 text-slate-600">You'll be eligible to take your state licensing exam. Once licensed, you can work as a professional barber earning $35K-55K annually, or open your own shop.</p>
            </details>
          </div>
        </section>

        {/* How to Apply */}
        <section className="bg-orange-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Let's Get You Started</h2>
          <p className="text-lg text-slate-700 mb-6">
            No experience needed. No money down. Just bring yourself and we'll handle the rest.
          </p>
          <Link 
            href="/apply" 
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-md font-semibold hover:bg-orange-600 transition-all text-lg"
          >
            Start Your Application
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Questions? Call us at (317) 123-4567 or stop by—we'd love to meet you.
          </p>
        </section>
      </div>
    
      
      {/* Indiana Career Connect Enrollment Process */}
      <EnrollmentProcess />
      
      {/* Program Highlights */}
      <ProgramHighlights />
      
      {/* Call to Action */}
      <ProgramCTA programName="this program" />

    </main>
  );
}
