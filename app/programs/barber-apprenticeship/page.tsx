import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Clock, DollarSign, MapPin, CheckCircle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship',
  description: 'Earn while you learn. Get matched to a licensed barber shop, receive hands-on training, and earn your barber license through our registered apprenticeship program.',
};

export default function BarberApprenticeshipPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
              Free with funding
            </span>
            <span className="px-4 py-1 bg-orange-500 text-white text-sm font-bold rounded-full">
              Earn While You Learn
            </span>
            <span className="px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">
              In-person
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Barber Apprenticeship
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">
            Get matched to a licensed barber shop, receive hands-on training, and earn your barber license through our registered apprenticeship program.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/apply" 
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all text-center"
            >
              Apply Now
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg transition-all text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* At-a-Glance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">At-a-Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Duration</h3>
                <p className="text-gray-700">12-18 months</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <DollarSign className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Cost</h3>
                <p className="text-gray-700">Free with funding when eligible</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Format</h3>
                <p className="text-gray-700">In-person at licensed shop</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-1">Outcome</h3>
                <p className="text-gray-700">Barber License + Job</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Program Is For */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Who This Program Is For</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Individuals interested in barbering as a career</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">No prior experience required</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Justice-impacted individuals welcome</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Must be able to work in-person at a barber shop</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Funding Options</h2>
          <p className="text-gray-700 mb-6">You may qualify for:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WIOA</h3>
              <p className="text-gray-700 text-sm">Workforce Innovation and Opportunity Act funding</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">WRG</h3>
              <p className="text-gray-700 text-sm">Workforce Ready Grant</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">JRI</h3>
              <p className="text-gray-700 text-sm">Justice Reinvestment Initiative</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-black mb-2">Employer Sponsorship</h3>
              <p className="text-gray-700 text-sm">Some shops sponsor apprentices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Support Services</h2>
          <p className="text-gray-700 mb-6">We help coordinate:</p>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Case management</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Justice navigation for returning citizens</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Transportation resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Childcare referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Outcomes</h2>
          <p className="text-gray-700 mb-6">Students typically move into:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Licensed Barber</h3>
              <p className="text-gray-700 text-sm">Full state license</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Shop Employment</h3>
              <p className="text-gray-700 text-sm">Job at training shop or other</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Shop Ownership</h3>
              <p className="text-gray-700 text-sm">Pathway to own business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold mb-1">Apply</h3>
                <p className="text-white/80 text-sm">Submit your application online</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold mb-1">Meet with advisor</h3>
                <p className="text-white/80 text-sm">Discuss your goals and eligibility</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold mb-1">Confirm eligibility</h3>
                <p className="text-white/80 text-sm">We help with funding paperwork</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="font-bold mb-1">Enroll</h3>
                <p className="text-white/80 text-sm">Get matched to a shop and start training</p>
              </div>
            </div>
          </div>
          <Link 
            href="/apply" 
            className="inline-block px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
