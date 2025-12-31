'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export default function SupersonicDesign15() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Video Banner */}
      <section className="relative h-[500px] md:h-[600px] flex items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Tax Experts At Your Service
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Tax Preparation and Financial Services
            </p>
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-block px-10 py-4 bg-orange-500 text-white text-lg font-bold rounded hover:bg-orange-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Service Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tax Returns */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tax Returns</h3>
              <p className="text-gray-600 mb-4">
                Assistance with your personal and business tax matters, in a responsive and accurate manner.
              </p>
            </div>

            {/* Payroll */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payroll</h3>
              <p className="text-gray-600 mb-4">
                Pay your employees quickly and easily with our Payroll Services. Our plans are designed to swiftly create paychecks and calculate payroll taxes.
              </p>
            </div>

            {/* Bookkeeping */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bookkeeping</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive bookkeeping and accounting services to guarantee your business operates at maximum potential.
              </p>
            </div>

            {/* Business Planning */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Business Planning</h3>
              <p className="text-gray-600 mb-4">
                Business planning and management services, including start-up and entity selection services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Supersonic Fast Cash
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We believe in the value of relationships. We view every client relationship like a partnership and truly believe that our success is a result of your success. We are committed to providing close, personal attention to our clients.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We provide a variety of services including Income Tax Preparation for all types of businesses and individuals, IRS and State Audit Representation, Payroll Reporting, QuickBooks® setup, support and training, Business startup services, Monthly bookkeeping, Financial statements – making sure your financial records are timely and accurate.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our continual investment of time and resources in professional continuing education, state-of-the-art computer technology, and extensive business relationships is indicative of our commitment to excellence.
              </p>
              <Link
                href="/supersonic-fast-cash/services"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
              >
                Read More
              </Link>
            </div>
            <div className="relative h-96">
              <Image
                src="/images/artlist/hero-training-1.jpg"
                alt="Tax preparation services"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Feature Boxes */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Service</h3>
              <p className="text-blue-100">
                A full range of accounting services while giving you the individual attention that you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Years of Experience</h3>
              <p className="text-blue-100">
                Volumes of experience working through IRS audit strategies and financial issues. We guarantee that your business is in good hands at all times.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Serving Your Business</h3>
              <p className="text-blue-100">
                Support in all areas of business consulting. Let our team guide you with a financial strategy that leads to business growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Staff */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            OUR STAFF
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team-new/team-1.jpg"
                  alt="Tax Professional"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed EA</h3>
              <p className="text-blue-600 font-semibold mb-3">Enrolled Agent</p>
              <p className="text-gray-600 text-sm">
                IRS-authorized tax professional with full representation rights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team-new/team-2.jpg"
                  alt="Tax Preparer"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tax Preparer</h3>
              <p className="text-blue-600 font-semibold mb-3">Senior Preparer</p>
              <p className="text-gray-600 text-sm">
                Experienced in individual and business tax preparation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/team-new/team-3.jpg"
                  alt="Client Services"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Client Services</h3>
              <p className="text-blue-600 font-semibold mb-3">Customer Support</p>
              <p className="text-gray-600 text-sm">
                Dedicated to providing excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            HAVE A QUESTION? WE'RE HERE TO HELP
          </h2>
          <Link
            href="/supersonic-fast-cash/contact"
            className="inline-block px-10 py-4 bg-white text-orange-500 font-bold rounded hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
