import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/tax-filing/join-team",
  },
  title: 'Become a Tax Preparer | Join Our Team | Earn $50K-$100K+ | Elevate for Humanity',
  description: 'Start your own tax preparation business. Free training with Drake Software. Earn $50K-$100K+ per season. Work from home. No experience required.',
  keywords: 'tax preparer jobs, tax preparation training, Drake software training, become tax preparer, tax business opportunity, work from home, tax franchise',
  openGraph: {
    title: 'Become a Tax Preparer - Earn $50K-$100K+ Per Season',
    description: 'Free training. Drake Software certification. Start your own tax business.',
    url: 'https://elevateforhumanity.org/tax-filing/join-team',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full mb-4 font-bold">
                🔥 NOW HIRING IN ALL 50 STATES
              </div>
              <h1 className="text-5xl font-extrabold mb-6">
                Become a Certified Tax Preparer
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Free training with Drake Software. Earn $50K-$100K+ per tax season. Work from home or open your own office.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/tax-filing/join-team/apply"
                  className="inline-flex items-center justify-center bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg hover:bg-yellow-300 font-bold text-lg"
                >
                  Apply Now - Free Training
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/30 font-bold text-lg"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">What You'll Earn</h3>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">$50-$150</div>
                  <p className="text-sm text-blue-100">Per tax return filed</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">$50K-$100K+</div>
                  <p className="text-sm text-blue-100">Per tax season (Jan-Apr)</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">$150K+</div>
                  <p className="text-sm text-blue-100">Top earners with own office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Program */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Free Tax Preparation Training</h2>
            <p className="text-xl text-gray-600">Get certified in 6-8 weeks. No experience required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Enroll in Tax Prep Class</h3>
              <p className="text-gray-600 mb-4">
                Sign up for our comprehensive tax preparation course. 100% online, self-paced.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 40 hours of training</li>
                <li>• Drake Software certification</li>
                <li>• IRS PTIN registration</li>
                <li>• Study materials included</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Get Certified</h3>
              <p className="text-gray-600 mb-4">
                Pass the certification exam and get your IRS PTIN (Preparer Tax Identification Number).
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Practice exams included</li>
                <li>• 90% pass rate</li>
                <li>• Unlimited retakes</li>
                <li>• Certificate of completion</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Start Earning</h3>
              <p className="text-gray-600 mb-4">
                Join our network and start preparing taxes. We provide clients, software, and support.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Drake Software license</li>
                <li>• Client referrals</li>
                <li>• Marketing materials</li>
                <li>• Ongoing support</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Training Cost: $499 (Refunded After 10 Returns)</h3>
            <p className="text-lg text-blue-100 mb-6">
              Pay $499 for training. We refund it after you file your first 10 tax returns. Essentially FREE training!
            </p>
            <a
              href="/tax-filing/join-team/apply"
              className="inline-block bg-yellow-400 text-purple-900 px-8 py-3 rounded-lg hover:bg-yellow-300 font-bold"
            >
              Enroll in Training Now
            </a>
          </div>
        </div>
      </section>

      {/* Business Models */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12">Choose Your Business Model</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Work From Home */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Work From Home</h3>
              <div className="text-4xl font-extrabold text-green-600 mb-4">$0</div>
              <p className="text-gray-600 mb-6">Start-up cost</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Work from anywhere</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Virtual client meetings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Drake Software included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">We send you clients</span>
                </li>
              </ul>
              <p className="text-sm font-bold">Earn: $50K-$75K per season</p>
            </div>

            {/* Mobile Tax Service */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-2xl p-8 border-4 border-blue-400 transform scale-105 text-white">
              <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Mobile Tax Service</h3>
              <div className="text-4xl font-extrabold mb-4">$2,500</div>
              <p className="text-blue-100 mb-6">Start-up cost</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Go to clients' homes/offices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Laptop + printer setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Marketing materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">✓</span>
                  <span className="text-sm">Business cards & signage</span>
                </li>
              </ul>
              <p className="text-sm font-bold">Earn: $75K-$100K per season</p>
            </div>

            {/* Storefront Office */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Storefront Office</h3>
              <div className="text-4xl font-extrabold text-purple-600 mb-4">$10K+</div>
              <p className="text-gray-600 mb-6">Start-up cost</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Physical office location</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Hire additional preparers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Full branding package</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">Year-round business</span>
                </li>
              </ul>
              <p className="text-sm font-bold">Earn: $100K-$250K+ per season</p>
            </div>
          </div>
        </div>
      </section>

      {/* State Availability */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-4">Available in All 50 States</h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Join tax preparers nationwide. We're expanding in every state.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
              'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
              'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
              'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
              'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
              'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
              'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
              'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
              'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
              'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ].map((state) => (
              <div key={state} className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow">
                <span className="text-sm font-medium text-gray-700">{state}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/tax-filing/locations"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-bold"
            >
              Find Training in Your State
            </a>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12">Why Join Our Network?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">High Earning Potential</h3>
                <p className="text-gray-600">
                  Earn $50-$150 per return. File 500-1000 returns per season = $50K-$100K+
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Work From Anywhere</h3>
                <p className="text-gray-600">
                  Home, office, or mobile. You choose. Flexible schedule during tax season.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Professional Software</h3>
                <p className="text-gray-600">
                  Drake Software license included. Same software used by CPAs nationwide.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Client Referrals</h3>
                <p className="text-gray-600">
                  We send clients to you. No need to find your own customers initially.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ongoing Training</h3>
                <p className="text-gray-600">
                  Annual tax law updates. Continuing education. Expert support team.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">E&O Insurance</h3>
                <p className="text-gray-600">
                  Errors & Omissions insurance included. Protection for you and clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  SM
                </div>
                <div>
                  <div className="font-bold">Sarah M.</div>
                  <div className="text-sm text-gray-600">Indianapolis, IN</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I earned $78,000 in my first tax season working from home. The training was excellent and Drake Software is so easy to use!"
              </p>
              <div className="text-sm text-gray-500">Filed 650 returns • Year 1</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  JR
                </div>
                <div>
                  <div className="font-bold">James R.</div>
                  <div className="text-sm text-gray-600">Atlanta, GA</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Started mobile, now have 2 offices. Made $185,000 last season. Best career decision I ever made!"
              </p>
              <div className="text-sm text-gray-500">Filed 1,200 returns • Year 3</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  MT
                </div>
                <div>
                  <div className="font-bold">Maria T.</div>
                  <div className="text-sm text-gray-600">Phoenix, AZ</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "No experience needed! I was a teacher before this. Now I make more in 4 months than I did all year teaching."
              </p>
              <div className="text-sm text-gray-500">Filed 520 returns • Year 1</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Start Your Tax Business?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of tax preparers earning $50K-$100K+ per season
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tax-filing/join-team/apply"
              className="inline-block bg-yellow-400 text-purple-900 px-12 py-4 rounded-lg hover:bg-yellow-300 font-bold text-xl"
            >
              Apply for Training Now
            </a>
            <a
              href="tel:3173143757"
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-12 py-4 rounded-lg hover:bg-white/30 font-bold text-xl"
            >
              Call (317) 314-3757
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Training starts monthly. Limited spots available per state.
          </p>
        </div>
      </section>
    </div>
  );
}
