import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax-filing/locations',
  },
  title:
    'Tax Filing Locations | Find Tax Preparers in All 50 States | Elevate for Humanity',
  description:
    'Find professional tax preparers near you. Drake Software certified. $100 flat fee. Available in all 50 states. Local tax experts in your area.',
  keywords:
    'tax preparer near me, tax filing locations, local tax service, tax preparation by state, Drake software tax preparer',
  robots: {
    index: true,
    follow: true,
  },
};

const states = [
  {
    name: 'Alabama',
    slug: 'alabama',
    cities: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'],
    preparers: 45,
  },
  {
    name: 'Alaska',
    slug: 'alaska',
    cities: ['Anchorage', 'Fairbanks', 'Juneau'],
    preparers: 12,
  },
  {
    name: 'Arizona',
    slug: 'arizona',
    cities: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
    preparers: 78,
  },
  {
    name: 'Arkansas',
    slug: 'arkansas',
    cities: ['Little Rock', 'Fort Smith', 'Fayetteville'],
    preparers: 34,
  },
  {
    name: 'California',
    slug: 'california',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    preparers: 234,
  },
  {
    name: 'Colorado',
    slug: 'colorado',
    cities: ['Denver', 'Colorado Springs', 'Aurora'],
    preparers: 67,
  },
  {
    name: 'Connecticut',
    slug: 'connecticut',
    cities: ['Hartford', 'New Haven', 'Stamford'],
    preparers: 43,
  },
  {
    name: 'Delaware',
    slug: 'delaware',
    cities: ['Wilmington', 'Dover', 'Newark'],
    preparers: 18,
  },
  {
    name: 'Florida',
    slug: 'florida',
    cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    preparers: 189,
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    cities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah'],
    preparers: 98,
  },
  {
    name: 'Hawaii',
    slug: 'hawaii',
    cities: ['Honolulu', 'Hilo', 'Kailua'],
    preparers: 23,
  },
  {
    name: 'Idaho',
    slug: 'idaho',
    cities: ['Boise', 'Meridian', 'Nampa'],
    preparers: 28,
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    cities: ['Chicago', 'Aurora', 'Naperville', 'Rockford'],
    preparers: 145,
  },
  {
    name: 'Indiana',
    slug: 'indiana',
    cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend'],
    preparers: 87,
  },
  {
    name: 'Iowa',
    slug: 'iowa',
    cities: ['Des Moines', 'Cedar Rapids', 'Davenport'],
    preparers: 42,
  },
  {
    name: 'Kansas',
    slug: 'kansas',
    cities: ['Wichita', 'Overland Park', 'Kansas City'],
    preparers: 38,
  },
  {
    name: 'Kentucky',
    slug: 'kentucky',
    cities: ['Louisville', 'Lexington', 'Bowling Green'],
    preparers: 52,
  },
  {
    name: 'Louisiana',
    slug: 'louisiana',
    cities: ['New Orleans', 'Baton Rouge', 'Shreveport'],
    preparers: 61,
  },
  {
    name: 'Maine',
    slug: 'maine',
    cities: ['Portland', 'Lewiston', 'Bangor'],
    preparers: 19,
  },
  {
    name: 'Maryland',
    slug: 'maryland',
    cities: ['Baltimore', 'Columbia', 'Germantown'],
    preparers: 73,
  },
  {
    name: 'Massachusetts',
    slug: 'massachusetts',
    cities: ['Boston', 'Worcester', 'Springfield'],
    preparers: 91,
  },
  {
    name: 'Michigan',
    slug: 'michigan',
    cities: ['Detroit', 'Grand Rapids', 'Warren', 'Ann Arbor'],
    preparers: 112,
  },
  {
    name: 'Minnesota',
    slug: 'minnesota',
    cities: ['Minneapolis', 'St. Paul', 'Rochester'],
    preparers: 68,
  },
  {
    name: 'Mississippi',
    slug: 'mississippi',
    cities: ['Jackson', 'Gulfport', 'Southaven'],
    preparers: 36,
  },
  {
    name: 'Missouri',
    slug: 'missouri',
    cities: ['Kansas City', 'St. Louis', 'Springfield'],
    preparers: 74,
  },
  {
    name: 'Montana',
    slug: 'montana',
    cities: ['Billings', 'Missoula', 'Great Falls'],
    preparers: 15,
  },
  {
    name: 'Nebraska',
    slug: 'nebraska',
    cities: ['Omaha', 'Lincoln', 'Bellevue'],
    preparers: 31,
  },
  {
    name: 'Nevada',
    slug: 'nevada',
    cities: ['Las Vegas', 'Henderson', 'Reno'],
    preparers: 56,
  },
  {
    name: 'New Hampshire',
    slug: 'new-hampshire',
    cities: ['Manchester', 'Nashua', 'Concord'],
    preparers: 22,
  },
  {
    name: 'New Jersey',
    slug: 'new-jersey',
    cities: ['Newark', 'Jersey City', 'Paterson'],
    preparers: 103,
  },
  {
    name: 'New Mexico',
    slug: 'new-mexico',
    cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho'],
    preparers: 29,
  },
  {
    name: 'New York',
    slug: 'new-york',
    cities: ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
    preparers: 198,
  },
  {
    name: 'North Carolina',
    slug: 'north-carolina',
    cities: ['Charlotte', 'Raleigh', 'Greensboro'],
    preparers: 95,
  },
  {
    name: 'North Dakota',
    slug: 'north-dakota',
    cities: ['Fargo', 'Bismarck', 'Grand Forks'],
    preparers: 11,
  },
  {
    name: 'Ohio',
    slug: 'ohio',
    cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
    preparers: 128,
  },
  {
    name: 'Oklahoma',
    slug: 'oklahoma',
    cities: ['Oklahoma City', 'Tulsa', 'Norman'],
    preparers: 47,
  },
  {
    name: 'Oregon',
    slug: 'oregon',
    cities: ['Portland', 'Salem', 'Eugene'],
    preparers: 54,
  },
  {
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    cities: ['Philadelphia', 'Pittsburgh', 'Allentown'],
    preparers: 134,
  },
  {
    name: 'Rhode Island',
    slug: 'rhode-island',
    cities: ['Providence', 'Warwick', 'Cranston'],
    preparers: 16,
  },
  {
    name: 'South Carolina',
    slug: 'south-carolina',
    cities: ['Charleston', 'Columbia', 'North Charleston'],
    preparers: 58,
  },
  {
    name: 'South Dakota',
    slug: 'south-dakota',
    cities: ['Sioux Falls', 'Rapid City', 'Aberdeen'],
    preparers: 13,
  },
  {
    name: 'Tennessee',
    slug: 'tennessee',
    cities: ['Nashville', 'Memphis', 'Knoxville'],
    preparers: 79,
  },
  {
    name: 'Texas',
    slug: 'texas',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    preparers: 267,
  },
  {
    name: 'Utah',
    slug: 'utah',
    cities: ['Salt Lake City', 'West Valley City', 'Provo'],
    preparers: 44,
  },
  {
    name: 'Vermont',
    slug: 'vermont',
    cities: ['Burlington', 'South Burlington', 'Rutland'],
    preparers: 9,
  },
  {
    name: 'Virginia',
    slug: 'virginia',
    cities: ['Virginia Beach', 'Norfolk', 'Richmond'],
    preparers: 89,
  },
  {
    name: 'Washington',
    slug: 'washington',
    cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver'],
    preparers: 93,
  },
  {
    name: 'West Virginia',
    slug: 'west-virginia',
    cities: ['Charleston', 'Huntington', 'Morgantown'],
    preparers: 24,
  },
  {
    name: 'Wisconsin',
    slug: 'wisconsin',
    cities: ['Milwaukee', 'Madison', 'Green Bay'],
    preparers: 71,
  },
  {
    name: 'Wyoming',
    slug: 'wyoming',
    cities: ['Cheyenne', 'Casper', 'Laramie'],
    preparers: 8,
  },
];

export default function LocationsPage() {
  const totalPreparers = states.reduce(
    (sum, state) => sum + state.preparers,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/gallery/image8.jpg"
          alt="Locations"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0   " />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Locations
          </h1>
          <p className="text-base md:text-lg md:text-xl mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="   text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-3xl md:text-4xl lg:text-5xl">
            Find Tax Preparers Near You
          </h1>
          <p className="text-base md:text-lg text-blue-100 mb-6">
            {totalPreparers.toLocaleString()}+ certified tax preparers in all 50
            states. Drake Software certified. $100 flat fee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              Content="Enter your city or ZIP code"
              className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-96"
            />
            <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-bold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-blue-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                {totalPreparers.toLocaleString()}+
              </div>
              <div className="text-gray-600">Tax Preparers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                50
              </div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                $100
              </div>
              <div className="text-gray-600">Flat Fee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-orange-600 mb-2 text-2xl md:text-3xl lg:text-4xl">
                4.9★
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-2xl md:text-3xl lg:text-4xl">
            Browse by State
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/tax-filing/locations/${state.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-xl transition-all p-6 border-2 border-gray-100 hover:border-blue-500"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {state.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {state.preparers} tax preparers
                </p>
                <div className="text-xs text-gray-500">
                  Top cities: {state.cities.slice(0, 2).join(', ')}
                </div>
                <div className="mt-4 text-brand-blue-600 font-semibold text-sm">
                  View locations →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-2xl md:text-3xl lg:text-4xl">
            Popular Cities
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              'New York, NY',
              'Los Angeles, CA',
              'Chicago, IL',
              'Houston, TX',
              'Phoenix, AZ',
              'Philadelphia, PA',
              'San Antonio, TX',
              'San Diego, CA',
              'Dallas, TX',
              'San Jose, CA',
              'Austin, TX',
              'Jacksonville, FL',
              'Fort Worth, TX',
              'Columbus, OH',
              'Indianapolis, IN',
              'Charlotte, NC',
              'San Francisco, CA',
              'Seattle, WA',
              'Denver, CO',
              'Washington, DC',
              'Boston, MA',
              'El Paso, TX',
              'Nashville, TN',
              'Detroit, MI',
              'Oklahoma City, OK',
              'Portland, OR',
              'Las Vegas, NV',
              'Memphis, TN',
              'Louisville, KY',
              'Baltimore, MD',
            ].map((city) => (
              <Link
                key={city}
                href={`/tax-filing/locations/${city.toLowerCase().replace(/[, ]/g, '-')}`}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-center"
              >
                <div className="font-semibold text-gray-900">{city}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20    text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-2xl md:text-3xl lg:text-4xl">
            Can't Find a Location Near You?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            We offer virtual tax filing nationwide. File from anywhere!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tax-filing/start"
              className="inline-block bg-white text-brand-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-bold"
            >
              File Taxes Online
            </a>
            <a
              href="/tax-filing/join-team"
              className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-bold"
            >
              Become a Tax Preparer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
