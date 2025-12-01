import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'CDL Training Program | Elevate For Humanity',
  description: 'Get your Commercial Driver License with our 100% funded CDL training program',
};

export default function CDLProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Commercial Driver License (CDL) Training</h1>
            <p className="text-xl mb-8 text-orange-100">
              Start a high-paying trucking career with our comprehensive, 100% funded CDL program
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 text-lg">
                Apply Now - Free Training
              </Link>
              <Link href="/contact" className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 border-2 border-white text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4-8 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">90%+</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$45-65K</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
                <p className="text-gray-700 mb-4">
                  Our CDL training program prepares you for a lucrative career in the trucking industry. You'll learn 
                  to operate commercial vehicles safely and professionally, meeting all federal and state requirements 
                  for Class A or Class B CDL certification.
                </p>
                <p className="text-gray-700 mb-6">
                  With hands-on driving experience, classroom instruction, and expert mentorship, you'll be ready to 
                  pass your CDL exam and start earning immediately with major trucking companies nationwide.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>DOT-approved training facility</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Behind-the-wheel training with modern equipment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>CDL exam preparation and testing support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Direct connections to hiring companies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Vehicle inspection and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Safe driving techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Federal motor carrier regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Backing and maneuvering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Hours of service and logbook management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Cargo handling and securement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Emergency procedures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Map reading and trip planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Career Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Long-Haul Trucking</h3>
                <p className="text-gray-600">Interstate routes with competitive pay and benefits</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
                <p className="text-gray-600">Home daily with regional delivery routes</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialized Transport</h3>
                <p className="text-gray-600">Hazmat, tanker, or oversized load operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Program Requirements</h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Must be at least 21 years old (18 for intrastate)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Valid driver's license with clean driving record</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pass DOT physical examination</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pass drug screening and background check</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Commitment to complete all training hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Join the thousands of professional truck drivers earning great pay with excellent benefits
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 text-lg">
                Apply Now
              </Link>
              <Link href="/contact" className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 border-2 border-white text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
