import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  DollarSign,
  Clock,
  Shield,
  Award,
  TrendingUp,
} from 'lucide-react';

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

    // Competitor Alternative Keywords
    'H&R Block alternative Indianapolis',
    'TurboTax alternative Indianapolis',
    'Jackson Hewitt alternative Indianapolis',
    'Liberty Tax alternative Indianapolis',
    'cheaper than H&R Block Indianapolis',
    'better than TurboTax Indianapolis',
    'free tax filing Indianapolis',
    'affordable tax preparation Indianapolis',

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
      'Same-day tax refund advance $250-$7,500. Powered by EPS Financial and Pathward Bank. Professional tax preparation with IRS-certified preparers serving all 50 states online. Indianapolis office available. No credit check required.',
    url: 'https://www.elevateforhumanity.org/supersonic-fast-cash',
    telephone: '+1-317-314-3757',
    priceRange: '$0-$7500',
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
            name: 'Tax Refund Advance $250-$1,000',
            description: 'Fixed amount loans with 0% APR. No interest charged.',
            amount: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              minValue: '250',
              maxValue: '1000',
            },
          },
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LoanOrCredit',
            name: 'Tax Refund Advance up to $7,500',
            description:
              'Percentage-based loans (25%, 50%, 75% of expected refund) with 36% APR',
            amount: {
              '@type': 'MonetaryAmount',
              currency: 'USD',
              minValue: '1250',
              maxValue: '7500',
            },
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
    <div className="min-h-screen bg-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      {/* Hero Section - Professional Tax Service Style */}
      <section className="relative    text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
                TAX SEASON 2025 • POWERED BY EPS FINANCIAL
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get Your Tax Refund Advance Fast
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-bold text-yellow-400">
                $250 - $7,500 Available*
              </p>
              <p className="text-base md:text-lg mb-8 text-green-100">
                Same-day tax refund advance with professional tax preparation.
                No credit check required. Walk-ins welcome!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/supersonic-fast-cash/apply"
                  className="inline-block px-8 py-4 bg-yellow-400 text-green-900 text-lg font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl text-center"
                >
                  Get Started Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-lg hover:bg-white/20 transition-all border-2 border-white text-center"
                >
                  Call 317-314-3757
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <h3 className="text-lg md:text-lg font-bold mb-6">
                Why Choose Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Fast Approval</div>
                    <div className="text-green-100">
                      Get approved in minutes
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">No Credit Check</div>
                    <div className="text-green-100">Bad credit? No problem</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold">Professional Service</div>
                    <div className="text-green-100">
                      Certified tax preparers
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nationwide Online Service */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Serving All 50 States - 100% Online & In-Person
            </h2>
            <p className="text-xl text-blue-100">
              Professional tax preparation from anywhere in the United States
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-bold mb-3">
                100% Online - Any State
              </h3>
              <p className="text-blue-100 mb-4">
                File your taxes from anywhere in the USA via secure video call
              </p>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>✓ All 50 states supported</li>
                <li>✓ Secure video consultation</li>
                <li>✓ Upload documents online</li>
                <li>✓ E-signature available</li>
                <li>✓ Same-day refund advance</li>
                <li>✓ State & federal returns</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-3">
                In-Person (Indianapolis)
              </h3>
              <p className="text-blue-100 mb-4">
                Visit our Indianapolis offices by appointment
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Location 1:</strong> 7009 E 56th St, Suite EE1 (46226)
                </p>
                <p>
                  <strong>Location 2:</strong> 3737 N Meridian St (46208)
                </p>
                <p>
                  <strong>Hours:</strong> Mon-Fri 9AM-5PM, Sat 10AM-2PM
                </p>
                <p className="text-yellow-300 font-bold mt-3">
                  ⚠️ Appointment Required - No Walk-Ins
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Phone & Chat Support</h3>
              <p className="text-blue-100 mb-4">
                Get help via phone, text, or live chat
              </p>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>✓ Phone consultations</li>
                <li>✓ Text message support</li>
                <li>✓ Live chat available</li>
                <li>✓ Email support</li>
                <li>✓ Document upload portal</li>
                <li>✓ Real-time status updates</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">
              States We Serve (All 50 States)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              {[
                'Alabama',
                'Alaska',
                'Arizona',
                'Arkansas',
                'California',
                'Colorado',
                'Connecticut',
                'Delaware',
                'Florida',
                'Georgia',
                'Hawaii',
                'Idaho',
                'Illinois',
                'Indiana',
                'Iowa',
                'Kansas',
                'Kentucky',
                'Louisiana',
                'Maine',
                'Maryland',
                'Massachusetts',
                'Michigan',
                'Minnesota',
                'Mississippi',
                'Missouri',
                'Montana',
                'Nebraska',
                'Nevada',
                'New Hampshire',
                'New Jersey',
                'New Mexico',
                'New York',
                'North Carolina',
                'North Dakota',
                'Ohio',
                'Oklahoma',
                'Oregon',
                'Pennsylvania',
                'Rhode Island',
                'South Carolina',
                'South Dakota',
                'Tennessee',
                'Texas',
                'Utah',
                'Vermont',
                'Virginia',
                'Washington',
                'West Virginia',
                'Wisconsin',
                'Wyoming',
              ].map((state) => (
                <div key={state} className="text-blue-100">
                  ✓ {state}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl mb-6">
              <strong>Nationwide Tax Preparation</strong> - File from anywhere
              in the United States. Federal & state returns for all 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:3173143757"
                className="inline-block px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition text-lg"
              >
                Call 317-314-3757
              </a>
              <Link
                href="/supersonic-fast-cash/book-appointment"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-lg"
              >
                Book Online Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Get your refund advance in 3 simple steps - In-person or online
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h3 className="text-lg font-bold mb-3">File Your Taxes</h3>
              <p className="text-gray-600">
                Bring your documents and we'll prepare your taxes professionally
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Get Approved</h3>
              <p className="text-gray-600">
                Instant approval for your refund advance - no credit check
                needed
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-700">3</span>
              </div>
              <h3 className="text-lg font-bold mb-3">Get Your Cash</h3>
              <p className="text-gray-600">
                Walk out with cash in hand - up to $6,000 in minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Advance Amounts - EPS Financial Style */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tax Refund Advance Loan Amounts
            </h2>
            <p className="text-lg text-gray-600">
              Powered by EPS Financial • No Credit Check Required
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white border-2 border-green-500 rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl font-bold text-green-700 mb-2">$250</div>
              <div className="text-xs text-gray-600 mb-2">0% APR*</div>
              <div className="text-sm text-gray-700">Quick Cash</div>
            </div>
            <div className="bg-white border-2 border-blue-500 rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl font-bold text-blue-700 mb-2">$500</div>
              <div className="text-xs text-gray-600 mb-2">0% APR*</div>
              <div className="text-sm text-gray-700">Popular</div>
            </div>
            <div className="bg-white border-2 border-purple-500 rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl font-bold text-purple-700 mb-2">
                $1,000
              </div>
              <div className="text-xs text-gray-600 mb-2">0% APR*</div>
              <div className="text-sm text-gray-700">Best Value</div>
            </div>
            <div className="bg-white border-2 border-orange-500 rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl font-bold text-orange-700 mb-2">
                $3,500
              </div>
              <div className="text-xs text-gray-600 mb-2">36% APR*</div>
              <div className="text-sm text-gray-700">50% Refund</div>
            </div>
            <div className="bg-white border-2 border-red-500 rounded-xl p-6 text-center hover:shadow-xl transition">
              <div className="text-4xl font-bold text-red-700 mb-2">$7,500</div>
              <div className="text-xs text-gray-600 mb-2">36% APR*</div>
              <div className="text-sm text-gray-700">Maximum</div>
            </div>
          </div>
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-2">
              How Loan Amounts Work:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>$250, $500, $1,000:</strong> Fixed amounts with 0% APR
                  (no interest)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>25%, 50%, 75% of refund:</strong> Percentage-based
                  loans up to $7,500 with 36% APR
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Average loan:</strong> $2,157 for qualified applicants
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>$7,500 maximum:</strong> Requires minimum expected
                  refund of $10,592
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 max-w-4xl mx-auto">
              *The Refund Advance is an optional tax-refund related loan
              provided by Pathward®, N.A., Member FDIC (it is not the actual tax
              refund). Loans in amounts of $250, $500, and $1,000 have an APR of
              0.00%. Loans of 25%, 50% or 75% of expected refund have an APR of
              36.0% with minimum loan of $1,250. Subject to approval and
              underwriting standards. See terms and conditions for details.
            </p>
          </div>
        </div>
      </section>

      {/* Tax Software - Drake/EPS Style */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Professional Tax Software
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              We use industry-leading Drake Tax Software with EPS Tax
              integration
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg md:text-lg font-bold mb-4">
                Drake Tax Software
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>IRS-approved e-file provider</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Handles all tax forms and schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Maximum refund calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Error checking and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Fast e-file transmission</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg md:text-lg font-bold mb-4">
                EPS Tax Integration
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Instant refund advance processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Bank product integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Same-day funding available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Multiple disbursement options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-2xl md:text-3xl lg:text-2xl md:text-3xl">
              Tax Preparation Services
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Professional tax filing with maximum refund guarantee
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-lg md:text-lg font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold text-green-700 mb-6 text-2xl md:text-3xl lg:text-4xl">
                $79
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>W-2 income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Standard deduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>E-file included</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-green-700 text-white rounded-xl p-8 relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-green-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4">Deluxe</h3>
              <div className="text-4xl font-bold mb-6 text-2xl md:text-3xl lg:text-4xl">
                $149
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Itemized deductions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Self-employment income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Refund advance eligible</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-yellow-400 text-green-900 font-bold rounded-lg hover:bg-yellow-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-lg md:text-lg font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold text-green-700 mb-6 text-2xl md:text-3xl lg:text-4xl">
                $249
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Everything in Deluxe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Rental property income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Investment income</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Audit protection</span>
                </li>
              </ul>
              <Link
                href="/supersonic-fast-cash/apply"
                className="block w-full py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-all text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">IRS Certified</h3>
              <p className="text-sm text-gray-600">
                All preparers are IRS certified
              </p>
            </div>
            <div>
              <Award className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Maximum Refund</h3>
              <p className="text-sm text-gray-600">
                Guaranteed or your money back
              </p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Fast Service</h3>
              <p className="text-sm text-gray-600">
                Most returns done same day
              </p>
            </div>
            <div>
              <DollarSign className="w-12 h-12 text-green-700 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">
                Competitive rates guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EPS Financial Partnership Section */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by EPS Financial & Pathward®
            </h2>
            <p className="text-lg text-blue-100">
              Trusted banking partner for tax refund advances nationwide
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">FDIC Insured</h3>
              <p className="text-sm text-blue-100">
                Your funds are protected by Pathward®, N.A., Member FDIC
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Industry Leader</h3>
              <p className="text-sm text-blue-100">
                EPS Financial processes millions of tax refund advances annually
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast Processing</h3>
              <p className="text-sm text-blue-100">
                Advanced technology for instant approval and same-day funding
              </p>
            </div>
          </div>
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 text-center">
              Why Choose EPS Financial?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Over 20 years in tax refund advance industry
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Trusted by thousands of tax professionals nationwide
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Seamless integration with Drake Tax Software
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Competitive rates and transparent terms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      No hidden fees or surprise charges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Dedicated customer support during tax season
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Tax Refund Advance?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Visit us today or call to schedule your appointment. Same-day
            service available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-block px-10 py-5 bg-yellow-400 text-green-900 text-xl font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-xl"
            >
              Apply Now
            </Link>
            <a
              href="tel:3173143757"
              className="inline-block px-10 py-5 bg-white text-green-900 text-xl font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Call 317-314-3757
            </a>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="font-bold mb-1">📍 Location</p>
              <p className="text-green-100">
                7009 E 56th St, Suite EE1
                <br />
                Indianapolis, IN 46226
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="font-bold mb-1">⏰ Hours</p>
              <p className="text-green-100">
                Mon-Fri: 9am-5pm
                <br />
                Sat: 10am-2pm
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="font-bold mb-1">✅ Services</p>
              <p className="text-green-100">
                Walk-ins Welcome
                <br />
                Evening Appointments Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Office & Business Opportunity Section */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Own Tax Business
            </h2>
            <p className="text-lg text-purple-100">
              Join the SupersonicFastCash network and become a sub-office owner
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Become a Sub-Office</h3>
              <p className="text-purple-100 mb-6">
                Own and operate your own SupersonicFastCash location. We provide
                training, software, EPS Financial partnership, and ongoing
                support.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Complete tax preparation training included
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Drake Tax Software license provided
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    EPS Financial refund advance partnership
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Marketing materials and branding support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Ongoing technical and business support
                  </span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-yellow-400 text-purple-900 font-bold rounded-lg hover:bg-yellow-300 transition"
              >
                Inquire About Sub-Office
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Get Certified</h3>
              <p className="text-purple-100 mb-6">
                Take our comprehensive tax preparation course and become an
                IRS-certified tax preparer. Start your own business or work for
                an existing office.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Self-paced online training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    IRS certification exam preparation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Business startup guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Software training included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Lifetime access to course materials
                  </span>
                </li>
              </ul>
              <Link
                href="/programs/tax-prep-financial-services"
                className="inline-block px-8 py-4 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                View Tax Prep Course
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">
              Current Sub-Office Locations
            </h3>
            <p className="text-purple-100 mb-6">
              SupersonicFastCash is expanding across Indiana. Find a location
              near you or inquire about opening one in your area.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-bold mb-2">Indianapolis (Main Office)</div>
                <div className="text-sm text-purple-100">
                  7009 E 56th St, Suite EE1
                  <br />
                  Indianapolis, IN 46226
                  <br />
                  <a
                    href="tel:3173143757"
                    className="text-yellow-400 hover:underline"
                  >
                    317-314-3757
                  </a>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-bold mb-2">Expanding Service</div>
                <div className="text-sm text-purple-100">
                  Additional locations opening
                  <br />
                  across Marion County
                  <br />
                  <Link
                    href="/contact"
                    className="text-yellow-400 hover:underline"
                  >
                    Contact for details
                  </Link>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-bold mb-2">Your Location?</div>
                <div className="text-sm text-purple-100">
                  Interested in opening
                  <br />
                  a sub-office in your area?
                  <br />
                  <Link
                    href="/contact"
                    className="text-yellow-400 hover:underline"
                  >
                    Let's talk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Booking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Appointment Online
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Schedule your tax preparation appointment in just a few clicks.
            Choose in-person or virtual appointments.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl border-2 border-blue-200 p-6 text-left">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-blue-600"
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
              <h3 className="font-bold text-lg mb-2">In-Person Appointments</h3>
              <p className="text-sm text-gray-600 mb-4">
                Visit our office for face-to-face service. Bring your documents
                and we'll handle everything.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Same-day service available</li>
                <li>• Walk-ins welcome</li>
                <li>• Free parking</li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-green-200 p-6 text-left">
              <div className="w-12 h-12 rounded-full bg-brand-green-100 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-brand-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Virtual Appointments</h3>
              <p className="text-sm text-gray-600 mb-4">
                Meet with us via Zoom from anywhere. Upload documents securely
                online.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• No travel required</li>
                <li>• Secure video call</li>
                <li>• Same great service</li>
              </ul>
            </div>
          </div>
          <Link
            href="/tax/book-appointment"
            className="inline-block px-10 py-5 bg-white text-white text-xl font-bold rounded-lg hover:shadow-xl transition-all"
          >
            Book Appointment Now
          </Link>
        </div>
      </section>

      {/* Legal Disclaimer - EPS Financial Style */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs text-gray-600 space-y-2">
            <p className="font-semibold text-gray-800">
              Important Disclosures:
            </p>
            <p>
              <strong>Refund Advance Loan:</strong> The Refund Advance is an
              optional tax-refund related loan provided by Pathward®, N.A.,
              Member FDIC (it is not the actual tax refund) at participating
              locations. Program availability and loan amounts may vary based on
              state and software provider. The amount of the loan and applicable
              interest will be deducted from tax refunds and reduce the amount
              that is paid directly to the taxpayer. Fees for other optional
              products or product features may apply. Tax returns may be filed
              electronically without applying for this loan.
            </p>
            <p>
              <strong>Loan Amounts:</strong> Loans offered in amounts of $250
              (where available), $500, $1,000, 25%, 50%, or 75% of your expected
              tax refund up to $7,500, with interest-based applicants receiving
              an average of $2,157.45; $7,500 available only to well-qualified
              applicants with a minimum expected tax refund of $10,592.
              Underwriting standards subject to change.
            </p>
            <p>
              <strong>APR:</strong> Loans in the amounts of $250, $500, and
              $1,000 have an Annual Percentage Rate (APR) of 0.00%. Loans in the
              amounts of 25%, 50% or 75% of your expected tax refund have an APR
              of 36.0% with a minimum loan of $1,250. For example, $2,500 loan
              representing 50% of expected refund borrowed over 33 day term,
              total amount payable in a single payment is $2,581.37 including
              interest.
            </p>
            <p>
              <strong>Eligibility:</strong> Availability is subject to
              satisfaction of identity verification, eligibility criteria, and
              underwriting standards. No credit check required for approval.
            </p>
            <p className="pt-2 border-t border-gray-300 mt-4">
              Supersonic Fast Cash is an authorized partner of EPS Financial.
              Tax preparation services provided by Elevate for Humanity. Refund
              advances provided by Pathward®, N.A., Member FDIC. All rights
              reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
