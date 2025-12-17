import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const stateData: Record<string, any> = {
  indiana: {
    name: 'Indiana',
    abbreviation: 'IN',
    capital: 'Indianapolis',
    population: '6.8 million',
    preparers: 87,
    cities: [
      { name: 'Indianapolis', preparers: 34, zip: '46240' },
      { name: 'Fort Wayne', preparers: 18, zip: '46805' },
      { name: 'Evansville', preparers: 12, zip: '47708' },
      { name: 'South Bend', preparers: 11, zip: '46601' },
      { name: 'Carmel', preparers: 8, zip: '46032' },
      { name: 'Fishers', preparers: 4, zip: '46038' },
    ],
    taxInfo: {
      stateTaxRate: '3.23%',
      filingDeadline: 'April 15',
      standardDeduction: '$1,000 - $2,000',
      specialCredits: [
        "Renter's Deduction",
        'Unified Tax Credit',
        'College Choice 529 Credit',
      ],
    },
  },
  // Add more states as needed
};

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}): Promise<Metadata> {
  const stateInfo = stateData[params.state];

  if (!stateInfo) {
    return {
      title: 'State Not Found',
    };
  }

  return {
    title: `Tax Filing in ${stateInfo.name} | ${stateInfo.preparers} Local Tax Preparers | $100 Flat Fee`,
    description: `Find professional tax preparers in ${stateInfo.name}. Drake Software certified. ${stateInfo.preparers}+ locations across ${stateInfo.name}. File federal + state taxes for $100.`,
    openGraph: {
      title: `Tax Filing in ${stateInfo.name} - $100 Flat Fee`,
      description: `${stateInfo.preparers}+ certified tax preparers across ${stateInfo.name}`,
      url: `https://elevateforhumanity.org/tax-filing/locations/${params.state}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://elevateforhumanity.org/tax-filing/locations/${params.state}`,
    },
  };
}

export default function StatePage() {
  // @ts-expect-error TS2304: Cannot find name 'state'.
  if (!state) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    // @ts-expect-error TS2304: Cannot find name 'state'.
    name: `Elevate Tax Filing - ${state.name}`,
    // @ts-expect-error TS2304: Cannot find name 'state'.
    description: `Professional tax preparation services in ${state.name}`,
    areaServed: {
      '@type': 'State',
      // @ts-expect-error TS2304: Cannot find name 'state'.
      name: state.name,
    },
    priceRange: '$100',
    telephone: '+1-317-314-3757',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      // @ts-expect-error TS2304: Cannot find name 'state'.
      reviewCount: state.preparers * 12,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
          <Image
            src="/images/gallery/image8.jpg"
            alt="[state]"
            fill
            className="object-cover"
            quality={100}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0   " />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
              [state]
            </h1>
            <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
              Transform your career with free training and industry
              certifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
              >
                Get Started Free
              </Link>
              <Link
                href="/programs"
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
              >
                View Programs
              </Link>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="   text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-4">
              <Link
                href="/tax-filing/locations"
                className="text-blue-200 hover:text-white"
              >
                All Locations
              </Link>
              <span className="mx-2">/</span>
              // @ts-expect-error TS2304: Cannot find name 'state'.
              <span>{state.name}</span>
            </nav>
            <h1 className="text-5xl font-bold mb-4 text-3xl md:text-4xl lg:text-5xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              Tax Filing in {state.name}
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-6">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              // @ts-expect-error TS2304: Cannot find name 'state'.
              {state.preparers}+ certified tax preparers across {state.name}.
              Drake Software certified. $100 flat fee for federal + state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/tax-filing/start"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-bold text-center"
              >
                // @ts-expect-error TS2304: Cannot find name 'state'.
                File Your {state.name} Taxes Now
              </a>
              <a
                href="/tax-filing/join-team"
                className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-bold text-center"
              >
                // @ts-expect-error TS2304: Cannot find name 'state'.
                Become a Tax Preparer in {state.name}
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  {state.preparers}+
                </div>
                <div className="text-gray-600">Tax Preparers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  {state.cities.length}
                </div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                  $100
                </div>
                <div className="text-gray-600">Flat Fee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                  4.9★
                </div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-2xl md:text-3xl lg:text-4xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              Tax Preparers by City in {state.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              {state.cities.map((city: any) => (
                <div
                  key={city.name}
                  className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-blue-500 transition-all"
                >
                  <h3 className="text-lg md:text-lg font-bold text-gray-900 mb-2">
                    // @ts-expect-error TS2304: Cannot find name 'state'.
                    {city.name}, {state.abbreviation}
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400 mr-1">★★★★★</span>
                    <span className="text-sm text-gray-600">
                      4.9 ({city.preparers * 12} reviews)
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {city.preparers} certified tax preparers in {city.name}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>📍 Serving ZIP {city.zip} and surrounding areas</div>
                    <div>💰 $100 flat fee (Federal + State)</div>
                    <div>📊 Drake Software certified</div>
                    <div>⚡ Same-day e-filing available</div>
                  </div>
                  <a
                    // @ts-expect-error TS2304: Cannot find name 'params'.
                    href={`/tax-filing/locations/${params.state}/${city.name.toLowerCase().replace(' ', '-')}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 font-bold"
                  >
                    Find Preparers in {city.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State Tax Info */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-2xl md:text-3xl lg:text-4xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              {state.name} Tax Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg md:text-lg font-bold mb-6">
                  State Tax Rates & Deadlines
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">
                      State Income Tax Rate:
                    </span>
                    <span className="text-blue-600 font-bold">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.taxInfo.stateTaxRate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Filing Deadline:</span>
                    <span className="text-blue-600 font-bold">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.taxInfo.filingDeadline}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Standard Deduction:</span>
                    <span className="text-blue-600 font-bold">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.taxInfo.standardDeduction}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Population:</span>
                    <span className="text-blue-600 font-bold">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.population}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg md:text-lg font-bold mb-6">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  {state.name} Tax Credits & Deductions
                </h3>
                <ul className="space-y-3">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  {state.taxInfo.specialCredits.map((credit: string) => (
                    <li key={credit} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{credit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    // @ts-expect-error TS2304: Cannot find name 'state'.
                    <strong>Our {state.name} tax experts</strong> know all
                    state-specific credits and deductions to maximize your
                    refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-2xl md:text-3xl lg:text-4xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              Why Choose Us for {state.name} Tax Filing?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-lg font-bold mb-3">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  Local {state.name} Experts
                </h3>
                <p className="text-gray-600">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  Our tax preparers live and work in {state.name}. They know
                  state tax laws inside and out.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-lg font-bold mb-3">$100 Flat Fee</h3>
                <p className="text-gray-600">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  Federal + {state.name} state return included. No hidden fees
                  or surprises.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Drake Software</h3>
                <p className="text-gray-600">
                  Professional-grade software used by CPAs. Maximum refund
                  guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-2xl md:text-3xl lg:text-4xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              What {state.name} Residents Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    JD
                  </div>
                  <div>
                    <div className="font-bold">John D.</div>
                    <div className="text-sm text-gray-600">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.capital}, {state.abbreviation}
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  "Best tax service in {state.name}! Got my refund in 10 days.
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  The preparer knew all the {state.name} tax credits I qualified
                  for."
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    SM
                  </div>
                  <div>
                    <div className="font-bold">Sarah M.</div>
                    <div className="text-sm text-gray-600">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.cities[1].name}, {state.abbreviation}
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Only $100 for federal AND state! Saved so much compared to
                  TurboTax. Drake Software is amazing."
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    MT
                  </div>
                  <div>
                    <div className="font-bold">Mike T.</div>
                    <div className="text-sm text-gray-600">
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      // @ts-expect-error TS2304: Cannot find name 'state'.
                      {state.cities[2].name}, {state.abbreviation}
                    </div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  // @ts-expect-error TS2304: Cannot find name 'state'.
                  "Filed my {state.name} taxes in 20 minutes. Expert reviewed
                  everything. Got $500 more back than last year!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20    text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-2xl md:text-3xl lg:text-4xl">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              Ready to File Your {state.name} Taxes?
            </h2>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              // @ts-expect-error TS2304: Cannot find name 'state'.
              Join thousands of {state.name} residents who've saved money with
              our $100 flat-fee tax filing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tax-filing/start"
                className="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg hover:bg-blue-50 font-bold text-xl"
              >
                // @ts-expect-error TS2304: Cannot find name 'state'.
                Start Your {state.name} Tax Return
              </a>
              <a
                href="tel:3173143757"
                className="inline-block bg-yellow-400 text-blue-900 px-12 py-4 rounded-lg hover:bg-yellow-300 font-bold text-xl"
              >
                Call (317) 314-3757
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
