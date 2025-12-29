import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/career-services',
  },
  title: 'Career Services | Elevate For Humanity',
  description:
    'Explore Career Services and discover opportunities for career growth and development.',
};

export default async function CareerServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden bg-gradient-to-r from-purple-900 to-purple-700">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Career Services"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white uppercase tracking-wide">
              CAREER SERVICES
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8">
              From Training to Employment - We Support Your Journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link
                href="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white hover:bg-white hover:text-purple-900 transition-all transform hover:scale-105 uppercase"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Our Career Services
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From training to employment, we support you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resume Building */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Resume Building</h3>
              <p className="text-gray-600 text-center">
                Professional resume writing and review services to showcase your skills
              </p>
            </div>

            {/* Interview Prep */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Interview Preparation</h3>
              <p className="text-gray-600 text-center">
                Mock interviews and coaching to help you ace your job interviews
              </p>
            </div>

            {/* Job Placement */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Job Placement</h3>
              <p className="text-gray-600 text-center">
                Direct connections to employers actively hiring our graduates
              </p>
            </div>

            {/* Career Counseling */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Career Counseling</h3>
              <p className="text-gray-600 text-center">
                One-on-one guidance to plan your career path and set goals
              </p>
            </div>

            {/* Networking Events */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Networking Events</h3>
              <p className="text-gray-600 text-center">
                Connect with employers, alumni, and industry professionals
              </p>
            </div>

            {/* Ongoing Support */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Ongoing Support</h3>
              <p className="text-gray-600 text-center">
                Continued career support even after you're employed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-700 font-semibold">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">$45K+</div>
              <div className="text-gray-700 font-semibold">Average Starting Salary</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-700 font-semibold">Employer Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-700 font-semibold">Free Services</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Join thousands who have launched successful careers through our
              programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
