/**
 * UNIVERSAL MARKETING PAGE TEMPLATE
 * 
 * Use for ALL marketing pages (except homepage)
 * Structure: Hero Banner → Highlights with Images → CTA with Images
 * 
 * LEGAL REQUIREMENTS:
 * - NO specific employer names without verified agreements
 * - NO fabricated job placement statistics
 * - NO false partnership claims
 * - Use generic industry language only
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '[PAGE TITLE] | Elevate For Humanity',
  description: '[Brief page description for SEO]',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ========================================
          SECTION 1: HERO BANNER WITH IMAGE
          ======================================== */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/[HERO-IMAGE].jpg"
            alt="[Descriptive alt text]"
            fill
            className="object-cover"
            priority 
            quality={85} 
            sizes="100vw"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              [Main Heading]
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              [Compelling subheading or value proposition]
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl transition-all"
              >
                Apply Now - Free Training
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: HIGHLIGHTS WITH IMAGES
          ======================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">[Section Heading]</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Highlight 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/[HIGHLIGHT-IMAGE-1].jpg"
                    alt="[Descriptive alt text]"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">[Highlight Title 1]</h3>
                  <p className="text-gray-600">[Brief description of this highlight]</p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/[HIGHLIGHT-IMAGE-2].jpg"
                    alt="[Descriptive alt text]"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">[Highlight Title 2]</h3>
                  <p className="text-gray-600">[Brief description of this highlight]</p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src="/images/[HIGHLIGHT-IMAGE-3].jpg"
                    alt="[Descriptive alt text]"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">[Highlight Title 3]</h3>
                  <p className="text-gray-600">[Brief description of this highlight]</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: CTA WITH IMAGE
          ======================================== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/[CTA-BACKGROUND-IMAGE].jpg"
            alt="Call to action background"
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              [CTA Heading]
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              [CTA supporting text]
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link 
                href="/programs" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                View Programs
              </Link>
            </div>
            
            <p className="text-white/90 mt-8 text-sm">
              Questions? Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold hover:text-white">elevateforhumanity.edu@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          OPTIONAL: ADDITIONAL CONTENT SECTION
          ======================================== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">[Optional Section Heading]</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold mb-4">[Subheading]</h3>
                <p className="text-gray-700 mb-4">
                  [Content paragraph 1]
                </p>
                <p className="text-gray-700 mb-6">
                  [Content paragraph 2]
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">[Benefit or feature 1]</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">[Benefit or feature 2]</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">[Benefit or feature 3]</span>
                  </li>
                </ul>
              </div>

              {/* Image */}
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/[CONTENT-IMAGE].jpg"
                  alt="[Descriptive alt text]"
                  fill
                  className="object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
