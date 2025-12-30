import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  GraduationCap,
  Briefcase,
  DollarSign,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

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
  // JSON-LD structured data for organization
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
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section - Video Banner */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-5xl w-full">
            <div className="mb-6 inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-100 font-semibold">
                WIOA-Funded Training Programs
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white uppercase tracking-tight leading-tight">
              LIMITLESS OPPORTUNITIES
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              WHERE LEARNING LEADS TO EARNING!
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Free career training in Indianapolis. Get trained, get hired, get
              paid. No cost, no debt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/apply"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 uppercase"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/hire-graduates"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-3 border-white bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-black text-white hover:bg-white hover:text-green-900 transition-all transform hover:scale-105 uppercase"
              >
                Hire A Student
                <Users className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-black text-white mb-1">
                  5,000+
                </div>
                <div className="text-sm text-gray-200">Students Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-black text-white mb-1">85%</div>
                <div className="text-sm text-gray-200">Job Placement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-black text-white mb-1">$0</div>
                <div className="text-sm text-gray-200">Tuition Cost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-3xl font-black text-white mb-1">50+</div>
                <div className="text-sm text-gray-200">Programs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Features */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase">
              Why Choose Elevate?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We remove barriers and create pathways to meaningful careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-green-100 hover:border-green-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                100% Free Training
              </h3>
              <p className="text-gray-600 leading-relaxed">
                WIOA-funded programs mean zero tuition, zero debt. We cover
                everything so you can focus on learning.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">No upfront costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Books & materials included
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Certification fees covered
                  </span>
                </li>
              </ul>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-orange-100 hover:border-orange-500">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Job Placement Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We don't just train you—we help you land the job. 85% of our
                graduates are employed within 6 months.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Resume & interview prep</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Employer connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Career counseling</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-blue-100 hover:border-blue-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                High-Demand Skills
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Train for careers that are hiring now. Our programs align with
                Indianapolis's fastest-growing industries.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Healthcare & medical</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Skilled trades (HVAC, electrical)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Technology & business</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAREER OPPORTUNITIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase">
              CAREER OPPORTUNITIES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our career pathways options and find the best fit for your future!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link href="/programs" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-green-500">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                    alt="Industry Alignment"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Briefcase className="w-12 h-12 text-white mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    Industry Alignment
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We collaborate with business leaders to address current and future workforce demands.
                  </p>
                  <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-3 transition-all">
                    <span>Explore Programs</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/locations" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-orange-500">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                    alt="Locations"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <GraduationCap className="w-12 h-12 text-white mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    Find a Location
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Programs available in multiple locations across Indiana to serve you better.
                  </p>
                  <div className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-3 transition-all">
                    <span>View Locations</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/employers" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-blue-500">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                    alt="Hire Graduates"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Users className="w-12 h-12 text-white mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Hire Graduates
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Our candidates are credentialed, trained, and ready to contribute to your team.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                    <span>Partner With Us</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PROGRAMS & PATHWAYS - Exact SkilledUS Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              We Have A Path For You!
            </h2>
            <p className="text-lg text-gray-700 font-semibold">
              Discover why Elevate is right for you. Take a look below at
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program Cards - SkilledUS Style */}
            <Link
              href="/programs#manufacturing"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/manufacturing.jpg"
                  alt="Advanced Manufacturing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Advanced Manufacturing
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>

            <Link
              href="/programs#construction"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/construction.jpg"
                  alt="Building & Construction"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Building & Construction
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>

            <Link
              href="/programs#business"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/business.jpg"
                  alt="Business & IT Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Business & IT Services
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>

            <Link
              href="/programs#entrepreneurship"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/entrepreneurship.jpg"
                  alt="Entrepreneurship"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Entrepreneurship
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>

            <Link
              href="/programs#healthcare"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/healthcare.jpg"
                  alt="Healthcare & Life Sciences"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Healthcare & Life Sciences
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>

            <Link
              href="/programs#transportation"
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <Image
                  src="/images/programs/transportation.jpg"
                  alt="Transportation & Logistics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Transportation & Logistics
                </h3>
                <p className="text-orange-500 font-semibold group-hover:text-orange-600">
                  Learn More &gt;
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. LOCATIONS - Exact SkilledUS Style */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase">
              Elevate is everywhere!
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Elevate is a 100% Tuition-Free Program that offers a wide array of
              career training options for individuals over the age of 17.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Indianapolis', href: '/locations/indianapolis' },
              { name: 'Fort Wayne', href: '/locations/fort-wayne' },
              { name: 'Evansville', href: '/locations/evansville' },
              { name: 'South Bend', href: '/locations/south-bend' },
              { name: 'Bloomington', href: '/locations/bloomington' },
            ].map((location) => (
              <Link
                key={location.name}
                href={location.href}
                className="group block text-center p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <svg
                    className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {location.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS - Exact SkilledUS Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Thank you everyone. Thank all of you with helping me accomplish and obtaining my license. I can grow more to help create stability for myself and children.',
                name: 'Barbara B.',
                link: '#',
              },
              {
                quote:
                  'They provided an extremely informative and a hospitable environment. I really enjoyed my classes with Elevate. Thank you so much!',
                name: 'Timothy S.',
                link: '#',
              },
              {
                quote:
                  'I greatly appreciated the opportunity to receive a grant to help me move forward into a field that I have wanted to pursue for a long time. Thank You!',
                name: 'William T.',
                link: '#',
              },
            ].map((testimonial, i) => (
              <Link
                key={i}
                href={testimonial.link}
                className="block bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 leading-relaxed">
                  {testimonial.quote}
                </h3>
                <p className="text-gray-700 font-semibold">
                  {testimonial.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA - Exact SkilledUS Style */}
      <section className="relative py-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/elevate-overview.mp4" type="video/mp4" />
        </video>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
              Are you ready to change your life?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto font-light">
              Elevate is here to help you reach your fullest potential. If
              you're ready to change your life, we are here to help!
            </p>
            <Link
              href="/enroll"
              className="inline-flex items-center justify-center rounded-md bg-orange-500 px-12 py-5 text-lg font-bold text-white shadow-2xl hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
