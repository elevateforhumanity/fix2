import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/founder",
  },
  title: 'Elizabeth L. Greene - Founder | Elevate For Humanity',
  description: 'Meet Elizabeth L. Greene, founder and CEO of Elevate For Humanity.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* Bio Section with Both Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                alt="Elizabeth L. Greene - Professional Portrait"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-2xl md:text-3xl lg:text-2xl md:text-3xl">Visionary Leader & Community Builder</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Elizabeth Greene is a visionary leader, workforce innovator, and community builder dedicated to transforming lives through education, opportunity, and equitable access. As the Chief Executive Officer of Elevate for Humanity Technical & Career Institute, she drives the organization's mission to uplift individuals, strengthen families, and create sustainable career pathways across Indiana and beyond.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                With a unique blend of business leadership, technical expertise, and human-centered strategy, Elizabeth has built a powerful, fully integrated ecosystem that includes state-approved workforce programs, federal apprenticeship pathways, community empowerment services, and trauma-informed support.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Elizabeth is known for her ability to envision what a community needs before it exists, and then build it with precision, compliance, and compassion. Her leadership philosophy centers on removing barriers, opening doors, and creating real opportunities for individuals who are often overlooked or underserved.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Registered Apprenticeship Sponsor</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>RAPIDS-Approved Provider</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>ETPL Approved - WIOA, WRG, JRI Eligible</span>
                  </li>
                </ul>
              <Link href="/contact" className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all hover:scale-105 shadow-lg">
                Start Your Journey Today
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">Transforming Communities Through Education</h2>
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Under her leadership, Elevate for Humanity has become a federally aligned Registered Apprenticeship sponsor, a RAPIDS-approved provider, and a fully fundable ETPL program—eligible for WIOA, WRG, and JRI initiatives.
            </p>
            <p>
              Driven by purpose and grounded in integrity, Elizabeth's work continues to impact hundreds of lives through education, training, mentorship, and strategic community partnerships. Her commitment is simple: create pathways, eliminate barriers, and elevate humanity—one person at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from industry-standard professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
