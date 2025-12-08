import { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/supersonic-fast-cash",
  },
  title: 'Supersonic Fast Cash | Elevate For Humanity',
  description: 'Explore Supersonic Fast Cash and discover opportunities for career growth and development.',
};

export default async function SupersonicFastCashPage() {
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full Video Background (Industrious Style) */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] flex items-center justify-center text-white overflow-hidden">
        {/* Full Video Background - Maximum Quality */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              filter: 'contrast(1.05) saturate(1.1)',
              imageRendering: 'high-quality'
            }}
          >
            <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__5/generated-video-c913a513-dde0-4ac7-ae3c-53a453b8b83d.mp4?Expires=2080579938&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=bci4L0nUlydNRWrQZU2TXiuNiaTOtWFSTcwDsFXVD1wtGnIjTpHNtF4xoUqNXpgtu3-WdWous6RTH8nkZl4RVvTmNjsWfY--5~x3WnC4QuYxep5iI0eEKuN8WOTXJ5cWryEb7RMnGAIMb5~ir3RcAb7Iaztw9nSl5grVDQSq4WGT1VM~rOpGGxtGlGdy~lraTjHJIEe3BkmkV8Or6RWKUerH4pJ0YFqjtEcIXiBc3SI3Z8s00fo0T9SKd61VrbxkB2v8BVZaOSsNwB4Dp9hBoHHT74FCn5uAMl0-Cpy4Tr8iUH01Cp1Lc2dNKwtzUTy7tfw9V4IS94CtAiHPeMHzcw__" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Supersonic Fast Cash
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 drop-shadow-lg">
            Get your tax refund advance fast - up to $6,000 in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl"
            >
              Apply Now
            </Link>
            <Link
              href="/supersonic-fast-cash/how-it-works"
              className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-105 border-2 border-white/50 shadow-2xl"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Supersonic Fast Cash</h2>
                <p className="text-gray-700 mb-6">Explore Supersonic Fast Cash and discover opportunities for career growth and development.</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% free training programs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Industry-standard certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career support and job placement</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/image3.jpg"
                  alt="Supersonic Fast Cash"
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Learn</h3>
                <p className="text-gray-600">Access quality training programs</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Certify</h3>
                <p className="text-gray-600">Earn industry certifications</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Work</h3>
                <p className="text-gray-600">Get hired in your field</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands who have launched successful careers through our programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 text-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 border-2 border-white text-lg"
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
