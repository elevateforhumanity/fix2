import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { Briefcase, Users, ArrowRight, Star, Heart, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Elevate for Humanity | Free Career Training & Apprenticeships Indiana',
  description:
    'Free career training in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more. Get trained, get hired, get paid. No cost, no debt.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Elevate for Humanity',
    url: 'https://www.elevateforhumanity.org',
    logo: 'https://www.elevateforhumanity.org/images/logo.png',
    description:
      'Free career training and apprenticeships in Indianapolis. WIOA-funded programs in healthcare, trades, business, and more.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Admissions',
      email: 'elevate4humanityedu@gmail.com',
    },
    sameAs: [
      'https://www.facebook.com/elevateforhumanity',
      'https://www.linkedin.com/company/elevate-for-humanity',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Hero />

      {/* Featured Programs */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Explore Our Programs
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ETPL-approved career training programs in healthcare, skilled
              trades, business, and beauty services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Healthcare */}
            <Link href="/programs" className="group">
              <div className="rich-card">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Healthcare Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                    Healthcare
                  </h3>
                  <p className="text-gray-600 mb-4">
                    CNA, Medical Assistant, Phlebotomy, and more
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs" className="group">
              <div className="rich-card overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Skilled Trades Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                    Skilled Trades
                  </h3>
                  <p className="text-gray-600 mb-4">
                    HVAC, Electrical, Plumbing, Welding, and more
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Business */}
            <Link href="/programs" className="group">
              <div className="rich-card overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Business Training"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                    Business & Finance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Accounting, Office Administration, Customer Service
                  </p>
                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Getting started is simple. Here's what happens when you apply:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  1
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Apply
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Fill out our simple application in 5 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  2
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Get Approved
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                We handle all funding paperwork with WIOA
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <span className="text-3xl md:text-4xl font-black text-white">
                  3
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Start Training
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Begin your program and start your new career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-relaxed text-center">
              "This program changed my life. I went from unemployed to earning
              $45,000 a year as a CNA in just 6 weeks. The training was free and
              the support was incredible."
            </blockquote>
            <p className="text-base md:text-lg text-gray-600 text-center font-semibold">
              — Sarah Johnson, CNA Graduate
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6">
              More Than Just Training
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support services to ensure your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Supersonic Fast Cash */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Supersonic Fast Cash
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Professional tax prep and instant refund advances
              </p>
              <Link
                href="/supersonic-fast-cash"
                className="text-orange-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* VITA Tax Prep */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                VITA Tax Prep
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Free IRS-certified tax preparation
              </p>
              <Link
                href="/vita"
                className="text-green-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Career Services */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Career Services
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Resume + LinkedIn optimization, interview coaching, employer
                referrals, and placement support through our partner network
              </p>
              <Link
                href="/career-services"
                className="text-blue-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Support Bundle */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Support Bundle
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Transportation, childcare, and barrier removal
              </p>
              <Link
                href="/support"
                className="text-purple-600 font-bold hover:underline inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <div className="mx-auto w-full max-w-4xl text-center px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join 5,000+ students who chose free career training with Elevate for
            Humanity
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl text-lg md:text-xl font-black shadow-2xl hover:scale-105 transition-all"
          >
            <span>Apply Now - 100% Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-white/80 mt-6 text-sm md:text-base">
            Takes 5 minutes • No commitment required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-gray-900 text-center">
        <p className="text-sm text-gray-300">
          © 2025 Elevate for Humanity. All rights reserved.
        </p>
      </footer>
    </>
  );
}
