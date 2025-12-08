import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {

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
          <p className="text-xl sm:text-2xl text-slate-700 mb-8">
            Experience our training platform with interactive demos and see how our programs work.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/apply" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 text-lg transition-all">
              Apply Now
            </Link>
            <Link href="/programs" className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 border-2 border-slate-300 text-lg transition-all">
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demos */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Interactive Demos</h2>
          <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
            Explore our platform features and see how we support your learning journey from enrollment to certification.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/lms" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-blue-50">
                  <Image src="/images/gallery/image3.jpg" alt="Learning Management System" fill className="object-cover group-hover:scale-105 transition-transform duration-500" quality={100} sizes="100vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">LMS Platform</h3>
                  <p className="text-slate-600 mb-4">Explore our learning management system with interactive courses, progress tracking, and certification.</p>
                  <span className="inline-block text-blue-700 font-bold">Explore Platform →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-blue-50">
                  <Image src="/images/gallery/image6.jpg" alt="Training Programs" fill className="object-cover group-hover:scale-105 transition-transform duration-500" quality={100} sizes="100vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Course Preview</h3>
                  <p className="text-slate-600 mb-4">Browse our 30+ career training programs and see what you'll learn in each certification path.</p>
                  <span className="inline-block text-blue-700 font-bold">View Programs →</span>
                </div>
              </div>
            </Link>

            <Link href="/apply" className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-blue-50">
                  <Image src="/images/gallery/image5.jpg" alt="Application Process" fill className="object-cover group-hover:scale-105 transition-transform duration-500" quality={100} sizes="100vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Application Process</h3>
                  <p className="text-slate-600 mb-4">See how easy it is to apply, get approved for funding, and start your training in just days.</p>
                  <span className="inline-block text-blue-700 font-bold">Start Application →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );

}
