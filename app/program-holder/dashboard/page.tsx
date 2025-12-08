import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/program-holder/dashboard",
  },
  title: 'Dashboard | Elevate For Humanity',
  description: 'Discover more about Dashboard inside the Elevate For Humanity workforce ecosystem.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Dashboard | Elevate For Humanity</h1>
            <p className="text-xl mb-8 text-blue-100">Discover more about Dashboard inside the Elevate For Humanity workforce ecosystem.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 text-lg">
                Get Started
              </Link>
              <Link href="/programs" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white text-lg">
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transform Your Future</h2>
                <p className="text-gray-700 mb-6">Join thousands who have launched successful careers through our programs.</p>
                <ul className="space-y-3">
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100% government-funded training</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No cost to you - completely free</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Flexible scheduling options</span>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Career support from start to finish</span>
                  </li>
                  
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
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
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
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
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from indusstart professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}