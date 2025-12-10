import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Elevate For Humanity',
  description: 'Career training and development programs'
};

export default function JRIPage() {

  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Hero"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome</h1>
          <p className="text-xl mb-8 text-gray-100">Transform your career with free training</p>
        </div>
      </section>

          <Image
            src="/images/gallery/image8.jpg"
            alt="Job Ready Indy Programs"
            fill
            className="object-cover"
            priority
            quality={100}
          
          sizes="100vw"
        />
          
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold mb-4">
              Job Ready Indy Partner
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Job Ready Indy (JRI) Programs
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 drop-shadow-lg leading-relaxed">
              Second-chance career training for justice-involved individuals. 100% funded programs that help you rebuild your life and launch a new career.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition text-lg shadow-2xl"
              >
                Apply for JRI Programs
              </Link>
              <a
                href="tel:3173143757"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition text-lg shadow-2xl border-2 border-white"
              >
                Call 317-314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is JRI */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  What is Job Ready Indy (JRI)?
                </h2>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  Job Ready Indy (JRI) is a workforce development initiative that provides <strong>100% free career training</strong> to justice-involved individuals in Marion County, Indiana.
                </p>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  The program removes barriers to employment by covering all training costs, providing wraparound support services, and connecting participants directly to employers who are ready to hire.
                </p>
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                  <p className="text-slate-900 font-semibold mb-2">
                    ✓ No Cost to You
                  </p>
                  <p className="text-slate-700 text-sm">
                    All training, certifications, and support services are 100% funded through Job Ready Indy. No tuition, no fees, no debt.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="JRI Training Programs"
                  fill
                  className="object-cover"
                  quality={100}
                
          sizes="100vw"
        />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
              Who Qualifies for JRI Programs?
            </h2>
            <p className="text-center text-xl text-slate-600 mb-12">
              JRI is designed for individuals with justice involvement who are ready to rebuild their lives
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Justice-Involved Individuals</h3>
                <p className="text-slate-700">
                  Currently or previously involved in the criminal justice system, including those on probation, parole, or recently released from incarceration.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Marion County Residents</h3>
                <p className="text-slate-700">
                  Must reside in Marion County, Indiana (Indianapolis area) or be willing to relocate for training and employment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ready to Work</h3>
                <p className="text-slate-700">
                  Committed to completing training and securing employment. Must be legally eligible to work in the United States.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Support System</h3>
                <p className="text-slate-700">
                  Access to housing, transportation, and other support services. We help connect you to resources you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JRI Programs Available */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
              JRI-Funded Programs Available
            </h2>
            <p className="text-center text-xl text-slate-600 mb-12">
              Choose from high-demand career paths with immediate job opportunities
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Barber Apprenticeship */}
              <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image
                    src="/images/beauty/hero-program-barber.jpg"
                    alt="Barber Apprenticeship"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={100}
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    JRI Funded
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Barber Apprenticeship</h3>
                  <p className="text-slate-600 mb-4">
                    2,000-hour DOL Registered Apprenticeship. Earn while you learn. Graduate with Indiana barber license.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>12-18 months</span>
                  </div>
                  <Link
                    href="/programs/barber-apprenticeship"
                    className="block text-center px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Building Maintenance */}
              <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image
                    src="/images/hero/hero-skilled-trades.jpg"
                    alt="Building Maintenance"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={100}
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    JRI Funded
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Building Maintenance Tech</h3>
                  <p className="text-slate-600 mb-4">
                    Learn HVAC, electrical, plumbing basics. High-demand skills with immediate job placement.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>8-12 weeks</span>
                  </div>
                  <Link
                    href="/programs/building-maintenance"
                    className="block text-center px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Peer Recovery Coach */}
              <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-48">
                  <Image
                    src="/images/programs/efh-cna-hero.jpg"
                    alt="Peer Recovery Coach"
                    fill
                    className="object-cover"
                    quality={100}
                  
          sizes="100vw"
        />
                  <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    JRI Funded
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Peer Recovery Coach</h3>
                  <p className="text-slate-600 mb-4">
                    Help others in recovery. Turn your experience into a meaningful career supporting your community.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>45 days</span>
                  </div>
                  <Link
                    href="/programs/peer-recovery-coach"
                    className="block text-center px-6 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-600 mb-6">
                Additional JRI-funded programs available in healthcare, transportation, and workforce readiness
              </p>
              <Link
                href="/programs"
                className="inline-block px-8 py-4 border-2 border-green-600 text-green-600 font-bold rounded-full hover:bg-green-50 transition text-lg"
              >
                View All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
              Wraparound Support Services
            </h2>
            <p className="text-center text-xl text-slate-600 mb-12">
              We provide more than just training—we help remove barriers to your success
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Housing Assistance</h3>
                <p className="text-sm text-slate-600">Help finding stable housing during and after training</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Mental Health Services</h3>
                <p className="text-sm text-slate-600">Licensed counseling and support for your wellbeing</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Life Coaching</h3>
                <p className="text-sm text-slate-600">One-on-one coaching to help you stay on track</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Transportation Support</h3>
                <p className="text-sm text-slate-600">Help getting to training and job interviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
              How to Apply for JRI Programs
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-6 bg-slate-50 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us First</h3>
                  <p className="text-slate-700">
                    Contact us at <a href="tel:3173143757" className="text-green-600 font-bold hover:underline">317-314-3757</a> to discuss your situation and which JRI program is right for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-slate-50 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Meet with an Advisor</h3>
                  <p className="text-slate-700">
                    We'll schedule a meeting to review your background, goals, and eligibility for JRI funding. This is confidential and judgment-free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-slate-50 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Application</h3>
                  <p className="text-slate-700">
                    Apply through <a href="https://www.indianaconnectnow.com" target="_blank" rel="noopener noreferrer"
className="text-green-600 font-bold hover:underline">IndianaConnectNow.com</a> to access JRI funding. We'll help you with the paperwork.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 bg-slate-50 rounded-xl p-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Start Training</h3>
                  <p className="text-slate-700">
                    Once approved, begin your training immediately. We'll provide all the support you need to succeed.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center bg-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Rebuild Your Life?</h3>
              <p className="text-lg mb-6 text-white/90">
                Don't let your past define your future. JRI programs give you a real second chance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/apply"
                  className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-slate-100 transition text-lg"
                >
                  Apply Now
                </Link>
                <a
                  href="tel:3173143757"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition text-lg"
                >
                  Call 317-314-3757
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
