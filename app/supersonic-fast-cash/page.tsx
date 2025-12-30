import { Metadata } from 'next';
import Image from 'next/image';
import { sanitizeHtml } from '@/lib/sanitize';
import Link from 'next/link';
import {
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Award,
  TrendingUp,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { InstallPWAButton } from '@/components/InstallPWAButton';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
  },
  title:
    'Tax Refund Advance Indianapolis | Get $6,000 Fast | Supersonic Fast Cash',
  description:
    'Get your tax refund advance TODAY! Up to $6,000 in minutes. Professional tax preparation included. No credit check. Same-day cash. IRS-certified preparers. Serving all 50 states online. Indianapolis office: 7009 E 56th St.',
  keywords: [
    // Primary Keywords - High Volume
    'tax refund advance Indianapolis',
    'tax preparation Indianapolis',
    'tax services Indianapolis',
    'tax filing Indianapolis',
    'tax refund loan Indianapolis',
    'instant tax refund Indianapolis',

    // Alternative Keywords
    'tax service alternative Indianapolis',
    'online tax filing Indianapolis',
    'tax preparer alternative Indianapolis',
    'free tax filing Indianapolis',
    'affordable tax preparation Indianapolis',
    'low cost tax service Indianapolis',

    // Speed & Urgency Keywords
    'same day tax refund Indianapolis',
    'fast tax refund Indianapolis',
    'quick tax refund Indianapolis',
    'instant tax refund Indianapolis',
    'emergency tax refund Indianapolis',
    'get tax refund today Indianapolis',
    'tax refund in minutes Indianapolis',
    '24 hour tax refund Indianapolis',

    // Refund Advance Keywords
    'tax advance loan Indianapolis',
    'tax refund anticipation loan Indianapolis',
    'RAL Indianapolis',
    'tax refund cash advance Indianapolis',
    'early tax refund Indianapolis',
    'get tax refund early Indianapolis',
    'tax advance near me',
    'no credit check tax advance',
    'guaranteed tax refund advance',

    // Location-Based Keywords - Indianapolis
    'tax services Marion County',
    'tax preparation 46226',
    'tax preparation 46220',
    'tax services 46208',
    'tax services 46218',
    'tax services 46219',
    'tax services 46201',
    'tax services 46202',
    'tax services 46203',
    'tax services 46204',
    'tax services 46205',
    'tax services near me Indianapolis',
    'tax preparer Indianapolis Indiana',
    'Indianapolis tax office',
    'east side Indianapolis tax services',
    'north side Indianapolis tax services',
    'downtown Indianapolis tax services',
    '56th street tax services',
    'Meridian street tax services',

    // Nationwide Keywords
    'online tax preparation USA',
    'virtual tax filing nationwide',
    'remote tax services United States',
    'online tax preparer all states',
    'nationwide tax preparation',
    'tax services all 50 states',
    'online tax filing any state',
    'virtual tax help USA',
    'remote tax refund advance',
    'online tax professional nationwide',

    // State-Specific Keywords (Major Markets)
    'tax preparation Indiana',
    'tax services Ohio',
    'tax filing Illinois',
    'tax preparer Michigan',
    'tax services Kentucky',
    'tax preparation Tennessee',
    'tax services Wisconsin',
    'tax filing Missouri',
    'tax preparer Pennsylvania',
    'tax services New York',
    'tax preparation California',
    'tax services Texas',
    'tax filing Florida',
    'tax preparer Georgia',
    'tax services North Carolina',

    // Major Cities Nationwide
    'tax services Chicago',
    'tax preparation New York City',
    'tax filing Los Angeles',
    'tax preparer Houston',
    'tax services Phoenix',
    'tax preparation Philadelphia',
    'tax services San Antonio',
    'tax filing San Diego',
    'tax preparer Dallas',
    'tax services San Jose',
    'tax preparation Austin',
    'tax services Jacksonville',
    'tax filing Fort Worth',
    'tax preparer Columbus',
    'tax services Charlotte',

    // Hybrid/Online Service Keywords
    'online tax preparation',
    'virtual tax filing',
    'remote tax services',
    'video tax consultation',
    'online tax help',
    'virtual tax appointment',
    'online tax refund advance',
    'remote tax filing',
    'video call tax help',
    'work from home tax service',
    'file taxes online with professional',
    'virtual tax preparer',
    'online CPA tax help',
    'remote enrolled agent',

    // Service-Specific Keywords
    'IRS certified tax preparer Indianapolis',
    'professional tax preparation Indianapolis',
    'tax expert Indianapolis',
    'tax specialist Indianapolis',
    'VITA tax preparation Indianapolis',
    'free tax help Indianapolis',
    'walk in tax services Indianapolis',
    'no appointment tax filing Indianapolis',

    // Problem-Solving Keywords
    'need money fast Indianapolis',
    'emergency cash Indianapolis',
    'tax problems Indianapolis',
    'owe IRS money Indianapolis',
    'tax debt help Indianapolis',
    'amended tax return Indianapolis',
    'back taxes Indianapolis',

    // Demographic Keywords
    'low income tax help Indianapolis',
    'EITC Indianapolis',
    'child tax credit Indianapolis',
    'self employed tax help Indianapolis',
    'small business taxes Indianapolis',
    'gig worker taxes Indianapolis',
    '1099 tax help Indianapolis',

    // Seasonal Keywords
    'tax season 2025 Indianapolis',
    'tax deadline Indianapolis',
    'last minute tax filing Indianapolis',
    'tax extension Indianapolis',

    // Trust & Quality Keywords
    'trusted tax preparer Indianapolis',
    'best tax service Indianapolis',
    'top rated tax preparer Indianapolis',
    'honest tax service Indianapolis',
    'accurate tax filing Indianapolis',
    'guaranteed tax refund Indianapolis',
  ],
  openGraph: {
    title: 'Tax Refund Advance Indianapolis | Get $6,000 Fast Today',
    description:
      'Same-day tax refund advance up to $6,000. Professional tax prep included. No credit check. Walk-ins welcome. 7009 E 56th St, Indianapolis.',
    url: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
    type: 'website',
    locale: 'en_US',
    siteName: 'Supersonic Fast Cash',
    images: [
      {
        url: 'https://www.elevateforhumanity.org/images/supersonic-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Tax Refund Advance Indianapolis - Get Cash Fast',
      },
    ],
  },
};

export default function SupersonicFastCashPage() {
  // Schema markup for tax service
  const taxServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': 'https://www.elevateforhumanity.org/supersonic-fast-cash#service',
    name: 'Supersonic Fast Cash - Tax Refund Advance powered by EPS Financial',
    alternateName: [
      'Supersonic Fast Cash Tax Services',
      'EPS Financial Tax Advance Indianapolis',
    ],
    description:
      'Same-day tax refund advance. Powered by EPS Financial and Pathward Bank. Professional tax preparation with IRS-certified preparers serving all 50 states online. Indianapolis office available.',
    url: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
    telephone: '+1-317-314-3757',
    // Pricing determined per customer - no fixed prices displayed
    image: 'https://www.elevateforhumanity.org/images/supersonic-hero.jpg',
    brand: {
      '@type': 'Brand',
      name: 'EPS Financial',
    },
    provider: {
      '@type': 'Organization',
      name: 'Pathward, N.A.',
      description: 'Member FDIC',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7009 East 56th Street, Suite EE1',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46226',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8386,
      longitude: -86.0586,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'State',
        name: 'All 50 US States',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tax Refund Advance Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LoanOrCredit',
            name: 'Tax Refund Advance',
            description:
              'Fast tax refund advance powered by EPS Financial and Pathward Bank. Terms and amounts determined per customer.',
            maxValue: '7500',
          },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '36',
            priceCurrency: 'USD',
            unitText: 'PERCENT_APR',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Tax Preparation',
            description: 'IRS-certified tax preparers using Drake Tax Software',
          },
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'VITA Tax Preparation',
            description:
              'Free tax preparation for eligible individuals earning under $60,000',
          },
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Same-Day Tax Filing',
            description:
              'E-file your taxes and get your refund advance the same day',
          },
          price: '0',
          priceCurrency: 'USD',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '89',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How fast can I get my tax refund advance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can receive your tax refund advance in as little as 15 minutes after your tax return is filed. Same-day cash available.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much can I get with a tax refund advance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tax refund advances are available up to $6,000, depending on your expected refund amount.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need good credit for a tax refund advance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No credit check required. Tax refund advances are based on your expected IRS refund, not your credit score.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Supersonic Fast Cash located in Indianapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are located at 7009 East 56th Street, Suite EE1, Indianapolis, IN 46226. Walk-ins welcome during business hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is tax preparation included with the refund advance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Professional tax preparation by IRS-certified preparers is included at no additional cost.',
        },
      },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.elevateforhumanity.org/supersonic-fast-cash#business',
    name: 'Supersonic Fast Cash',
    image: 'https://www.elevateforhumanity.org/images/supersonic-hero.jpg',
    telephone: '+1-317-314-3757',
    email: 'Elevate4humanityedu@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7009 East 56th Street, Suite EE1',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      postalCode: '46226',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.8386,
      longitude: -86.0586,
    },
    url: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
    priceRange: 'FREE',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'USD',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(sanitizeHtml(JSON.stringify(taxServiceSchema))),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(sanitizeHtml(JSON.stringify(faqSchema))),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Hero Section - Brand Colors */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-4">
                TAX SEASON 2025 - APPLY NOW
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight uppercase">
                Get Your Tax Refund
                <span className="block text-orange-400 text-5xl md:text-6xl">
                  Today!
                </span>
              </h1>

              <div className="bg-white text-blue-900 p-6 rounded-lg mb-6 shadow-xl">
                <p className="text-lg font-bold">UP TO</p>
                <p className="text-5xl md:text-6xl font-black text-orange-500">
                  $7,500
                </p>
                <p className="text-sm font-bold">SAME DAY CASH*</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold">
                    No Credit Check Required
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold">
                    Free Professional Tax Prep
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold">IRS-Certified Preparers</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="px-8 py-4 bg-orange-500 text-white text-lg font-bold rounded-md hover:bg-orange-600 transition-all shadow-lg text-center uppercase"
                >
                  Apply Now
                </Link>
                <Link
                  href="tel:+13173143757"
                  className="px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-md hover:bg-gray-100 transition-all shadow-lg text-center uppercase"
                >
                  📞 Call Now
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 uppercase">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-orange-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">15-Minute Approval</div>
                    <div className="text-blue-100">
                      Fast processing guaranteed
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-orange-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Secure & Licensed</div>
                    <div className="text-blue-100">
                      FDIC insured through Pathward
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-orange-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold">Trusted Service</div>
                    <div className="text-blue-100">
                      4.8★ rating from 89 reviews
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-black text-blue-600 mb-2">
                $2.1B+
              </div>
              <div className="text-sm font-bold text-gray-700">
                Advanced to Taxpayers
              </div>
              <div className="text-xs text-gray-500">
                Powered by EPS Financial
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-orange-500 mb-2">
                44,000+
              </div>
              <div className="text-sm font-bold text-gray-700">
                Tax Offices Nationwide
              </div>
              <div className="text-xs text-gray-500">
                Trusted by professionals
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-blue-600 mb-2">
                15 MIN
              </div>
              <div className="text-sm font-bold text-gray-700">
                Average Approval
              </div>
              <div className="text-xs text-gray-500">Fast & easy process</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-black text-orange-500 mb-2">
                0% APR
              </div>
              <div className="text-sm font-bold text-gray-700">
                On Small Loans
              </div>
              <div className="text-xs text-gray-500">$250, $500, $1,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - Traditional vs Supersonic */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900 uppercase">
            Why Choose Supersonic Fast Cash?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Compare us to traditional tax services
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Tax Service */}
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-700">
                  Traditional Tax Services
                </h3>
                <p className="text-sm text-gray-500">
                  Typical Industry Standard
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">High fees ($200-$400+)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">
                    Wait 21+ days for refund
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Limited advance amounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">
                    Strict credit requirements
                  </span>
                </li>
              </ul>
            </div>

            {/* Supersonic Fast Cash */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-6 border-4 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 px-4 py-1 rounded-full text-sm font-bold">
                BEST CHOICE
              </div>
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold">Supersonic Fast Cash</h3>
                <p className="text-sm text-blue-200">
                  Powered by EPS Financial
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-semibold">FREE tax preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-semibold">Get cash TODAY (15 min)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-semibold">Up to $7,500 advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-semibold">
                    NO credit check required
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="block w-full px-6 py-3 bg-orange-500 text-white text-center font-bold rounded-md hover:bg-orange-600 transition-all uppercase"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900 uppercase">
            Our Services
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need for tax season
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <DollarSign className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 group-hover:text-blue-600">
                Tax Refund Advance
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Get up to $7,500 in as little as 15 minutes. No credit check
                required.
              </p>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block text-center text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>

            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <CheckCircle className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 group-hover:text-blue-600">
                Professional Tax Prep
              </h3>
              <p className="text-gray-600 text-center mb-4">
                IRS-certified preparers handle your taxes. Free with refund
                advance.
              </p>
              <Link
                href="/supersonic-fast-cash/services"
                className="block text-center text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>

            <div className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Clock className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-center mb-3 group-hover:text-blue-600">
                Same-Day Filing
              </h3>
              <p className="text-gray-600 text-center mb-4">
                E-file your return and get your advance the same day you apply.
              </p>
              <Link
                href="/supersonic-fast-cash/how-it-works"
                className="block text-center text-blue-600 font-semibold hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pages/Services Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 uppercase">
            Explore Our Site
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/supersonic-fast-cash/apply"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-orange-500"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Apply Now
              </h3>
              <p className="text-gray-600 text-sm">
                Start your application for a tax refund advance
              </p>
            </Link>

            <Link
              href="/supersonic-fast-cash/calculator"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Refund Calculator
              </h3>
              <p className="text-gray-600 text-sm">
                Estimate your tax refund amount
              </p>
            </Link>

            <Link
              href="/supersonic-fast-cash/how-it-works"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How It Works
              </h3>
              <p className="text-gray-600 text-sm">
                Learn about our simple 3-step process
              </p>
            </Link>

            <Link
              href="/supersonic-fast-cash/pricing"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pricing</h3>
              <p className="text-gray-600 text-sm">
                View our transparent pricing and fees
              </p>
            </Link>

            <Link
              href="/supersonic-fast-cash/locations"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-600"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Locations
              </h3>
              <p className="text-gray-600 text-sm">
                Find our Indianapolis offices
              </p>
            </Link>

            <Link
              href="/supersonic-fast-cash/book-appointment"
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-orange-500"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Book Appointment
              </h3>
              <p className="text-gray-600 text-sm">
                Schedule your tax preparation session
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900 uppercase">
            Trusted Partners
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Backed by industry leaders
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                EPS Financial
              </h3>
              <p className="text-gray-700 mb-4">
                Our tax refund advances are powered by EPS Financial, a leader
                in tax-related financial products with over $2.1 billion
                advanced to taxpayers nationwide.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Serving 44,000+ tax offices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Industry-leading technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Trusted since 1989</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg border-2 border-orange-200">
              <h3 className="text-2xl font-bold text-orange-900 mb-4">
                Pathward, N.A.
              </h3>
              <p className="text-gray-700 mb-4">
                All refund advances are issued by Pathward, N.A., Member FDIC,
                ensuring your funds are secure and protected.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span>FDIC Insured</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span>Equal Housing Lender</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span>Regulated financial institution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Social Section */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Call Us</h3>
              <a
                href="tel:+13173143757"
                className="text-2xl font-bold hover:text-orange-400 transition-colors"
              >
                (317) 314-3757
              </a>
              <p className="text-sm text-blue-200 mt-2">Mon-Fri 9AM-5PM EST</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <a
                href="mailto:supersonicfastcash@gmail.com"
                className="text-lg hover:text-orange-400 transition-colors"
              >
                supersonicfastcash@gmail.com
              </a>
              <p className="text-sm text-blue-200 mt-2">
                24-hour response time
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/share/1Be4LrVfJw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-orange-400 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                </a>
                <a
                  href="https://www.instagram.com/supersonicfastcash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-orange-400 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              *Tax Refund Advance: Advances are provided by Pathward, N.A.,
              Member FDIC. Loan amounts range from $250 to $7,500 based on
              expected refund. 0% APR on loans $250-$1,000; 36% APR on loans
              $1,001-$7,500. Terms and conditions apply. Not all applicants will
              qualify.
            </p>
            <p>
              **Professional Tax Preparation: Free tax preparation is included
              with approved refund advance applications. Standard tax
              preparation fees apply for customers who do not qualify for or
              choose not to receive a refund advance.
            </p>
            <p className="font-semibold">
              Pathward, N.A., Member FDIC | Equal Housing Lender | Visit{' '}
              <a
                href="https://www.pathward.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Pathward.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
