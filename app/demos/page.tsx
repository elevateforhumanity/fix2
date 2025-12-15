export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demos | Elevate For Humanity',
  description: 'Explore our training programs and opportunities',
};

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Clean Image Only */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full overflow-hidden bg-white">
        <Image
          src="/images/efh/hero/hero-main.jpg"
          alt="Students learning in training program"
          fill
          className="object-cover"
          priority
          quality={95}
          sizes="100vw"
        />
      </section>

      {/* Title Section - Below Hero */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Try Before You Apply
          </h1>
          <p className="text-base md:text-lg sm:text-base md:text-lg text-slate-700 mb-8">
            Experience our training platform with interactive demos and see how
            our programs work.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 text-lg transition-all"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 border-2 border-slate-300 text-lg transition-all"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-center mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
            Interactive Demos
          </h2>
          <p className="text-base md:text-lg text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            Explore our platform features and see how we support your learning
            journey from enrollment to certification.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/demo/student" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <div className="text-2xl font-bold">Student Portal</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    Student Dashboard Demo
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Experience the student portal with interactive courses,
                    progress tracking, assignments, and achievements.
                  </p>
                  <span className="inline-block text-blue-700 font-bold">
                    Try Interactive Demo →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/demo/admin" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">⚙️</div>
                    <div className="text-2xl font-bold">Admin Portal</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    Admin Dashboard Demo
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Explore the admin interface with student management,
                    analytics, program oversight, and reporting tools.
                  </p>
                  <span className="inline-block text-red-700 font-bold">
                    Try Interactive Demo →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/demo/grants" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <div className="text-2xl font-bold">Grants System</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-lg font-bold mb-2">
                    Funding Application Demo
                  </h3>
                  <p className="text-slate-600 mb-4">
                    See how students apply for WIOA, WRG, and other funding
                    sources with our streamlined application process.
                  </p>
                  <span className="inline-block text-green-700 font-bold">
                    Try Interactive Demo →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
