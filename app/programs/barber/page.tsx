import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, DollarSign, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Training | Elevate For Humanity',
  description: 'Start your barber career with free training. Hands-on practice and job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/barber',
  },
};

export default function BarberPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Simple Hero - No Image */}
      <section className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Become a Professional Barber
          </h1>
          <p className="text-2xl mb-8">
            Free training. Real skills. Start your career in 12-16 weeks.
          </p>
          <Link
            href="/apply?program=barber"
            className="inline-block px-10 py-5 text-xl font-bold text-orange-600 bg-white rounded-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Apply Now - It's Free
          </Link>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">12-16 Weeks</div>
              <div className="text-sm text-slate-600">Complete Training</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <DollarSign className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">100% FREE</div>
              <div className="text-sm text-slate-600">No Tuition</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Award className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">Licensed</div>
              <div className="text-sm text-slate-600">State Certified</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <CheckCircle className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900">Job Ready</div>
              <div className="text-sm text-slate-600">Placement Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Hair Cutting</div>
                <div className="text-slate-600">Clipper work, fades, and scissor techniques</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Shaving & Grooming</div>
                <div className="text-slate-600">Straight razor, beard trimming, hot towels</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Styling</div>
                <div className="text-slate-600">Product knowledge and modern techniques</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-slate-900">Business Skills</div>
                <div className="text-slate-600">Customer service and building clientele</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Simple Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Apply Free</h3>
                <p className="text-slate-600">Quick 5-minute application. No experience needed.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Training</h3>
                <p className="text-slate-600">12-16 weeks of hands-on learning with expert instructors.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Get Licensed & Hired</h3>
                <p className="text-slate-600">Earn your state license and start your career with job placement support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Barber Career?
          </h2>
          <p className="text-xl mb-8">
            Free training, professional certification, and job placement support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply?program=barber"
              className="inline-block px-10 py-5 bg-white text-orange-600 text-xl font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-orange-600 text-white text-xl font-bold rounded-lg hover:bg-orange-700 transition-all border-2 border-white shadow-xl"
            >
              Call 317-314-3757
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
