import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const stateData: Record<string, any> = {
  'indiana': {
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
      specialCredits: ['Renter\'s Deduction', 'Unified Tax Credit', 'College Choice 529 Credit'],
    },
  },
  // Add more states as needed
};

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const state = stateData[params.state];
  
  if (!state) {
    return {
      title: 'State Not Found',
    };
  }

  return {
    title: `Tax Filing in ${state.name} | ${state.preparers} Local Tax Preparers | $100 Flat Fee`,
    description: `Find professional tax preparers in ${state.name}. Drake Software certified. ${state.preparers}+ locations across ${state.name}. File federal + state taxes for $100.`,
    keywords: `tax preparer ${state.name}, tax filing ${state.name}, ${state.name} tax service, Drake software ${state.name}, tax preparation ${state.capital}`,
    openGraph: {
      title: `Tax Filing in ${state.name} - $100 Flat Fee`,
      description: `${state.preparers}+ certified tax preparers across ${state.name}`,
      url: `https://elevateforhumanity.org/tax-filing/locations/${params.state}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://elevateforhumanity.org/tax-filing/locations/${params.state}`,
    },
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = stateData[params.state];

  if (!state) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Elevate Tax Filing - ${state.name}`,
    "description": `Professional tax preparation services in ${state.name}`,
    "areaServed": {
      "@type": "State",
      "name": state.name
    },
    "priceRange": "$100",
    "telephone": "+1-317-314-3757",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": state.preparers * 12
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-4">
              <Link href="/tax-filing/locations" className="text-blue-200 hover:text-white">
                All Locations
              </Link>
              <span className="mx-2">/</span>
              <span>{state.name}</span>
            </nav>
            <h1 className="text-5xl font-extrabold mb-4">
              Tax Filing in {state.name}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {state.preparers}+ certified tax preparers across {state.name}. Drake Software certified. $100 flat fee for federal + state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/tax-filing/start"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-bold text-center"
              >
                File Your {state.name} Taxes Now
              </a>
              <a
                href="/tax-filing/join-team"
                className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-bold text-center"
              >
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
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{state.preparers}+</div>
                <div className="text-gray-600">Tax Preparers</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-green-600 mb-2">{state.cities.length}</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-purple-600 mb-2">$100</div>
                <div className="text-gray-600">Flat Fee</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-orange-600 mb-2">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold mb-12">Tax Preparers by City in {state.name}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {state.cities.map((city: any) => (
                <div
                  key={city.name}
                  className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-100 hover:border-blue-500 transition-all"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{city.name}, {state.abbreviation}</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400 mr-1">★★★★★</span>
                    <span className="text-sm text-gray-600">4.9 ({city.preparers * 12} reviews)</span>
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
            <h2 className="text-4xl font-extrabold mb-12">{state.name} Tax Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">State Tax Rates & Deadlines</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">State Income Tax Rate:</span>
                    <span className="text-blue-600 font-bold">{state.taxInfo.stateTaxRate}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Filing Deadline:</span>
                    <span className="text-blue-600 font-bold">{state.taxInfo.filingDeadline}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="font-semibold">Standard Deduction:</span>
                    <span className="text-blue-600 font-bold">{state.taxInfo.standardDeduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Population:</span>
                    <span className="text-blue-600 font-bold">{state.population}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">{state.name} Tax Credits & Deductions</h3>
                <ul className="space-y-3">
                  {state.taxInfo.specialCredits.map((credit: string) => (
                    <li key={credit} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{credit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>Our {state.name} tax experts</strong> know all state-specific credits and deductions to maximize your refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center">
              Why Choose Us for {state.name} Tax Filing?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Local {state.name} Experts</h3>
                <p className="text-gray-600">
                  Our tax preparers live and work in {state.name}. They know state tax laws inside and out.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-3">$100 Flat Fee</h3>
                <p className="text-gray-600">
                  Federal + {state.name} state return included. No hidden fees or surprises.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Drake Software</h3>
                <p className="text-gray-600">
                  Professional-grade software used by CPAs. Maximum refund guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold mb-12 text-center">
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
                    <div className="text-sm text-gray-600">{state.capital}, {state.abbreviation}</div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Best tax service in {state.name}! Got my refund in 10 days. The preparer knew all the {state.name} tax credits I qualified for."
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    SM
                  </div>
                  <div>
                    <div className="font-bold">Sarah M.</div>
                    <div className="text-sm text-gray-600">{state.cities[1].name}, {state.abbreviation}</div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Only $100 for federal AND state! Saved so much compared to TurboTax. Drake Software is amazing."
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    MT
                  </div>
                  <div>
                    <div className="font-bold">Mike T.</div>
                    <div className="text-sm text-gray-600">{state.cities[2].name}, {state.abbreviation}</div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Filed my {state.name} taxes in 20 minutes. Expert reviewed everything. Got $500 more back than last year!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to File Your {state.name} Taxes?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of {state.name} residents who've saved money with our $100 flat-fee tax filing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tax-filing/start"
                className="inline-block bg-white text-blue-600 px-12 py-4 rounded-lg hover:bg-blue-50 font-bold text-xl"
              >
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
