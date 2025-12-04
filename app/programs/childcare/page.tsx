import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Childcare Training | Elevate For Humanity',
  description: '100% free Childcare training. Learn early childhood education, child development, and classroom management. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/facilities-new/facility-3.jpg"
            alt="Childcare Training"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
          
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Childcare Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn early childhood education, child development, and classroom management. Get certified.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl">
                Apply Now - Free Training
              </Link>
              <Link href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4-12 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%+</div>
              <div className="text-gray-600">Job Placement</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$35K+</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Program Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from industry professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">120-Hour Child Development Associate (CDA) Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-500">
                <h3 className="text-2xl font-bold mb-3">Child Development & Learning</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Child growth and development (birth-5 years)</li>
                  <li>• Age-appropriate activities and curriculum</li>
                  <li>• Early literacy and language development</li>
                  <li>• Social-emotional development</li>
                  <li>• Cognitive and physical development milestones</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Health, Safety & Nutrition</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• CPR and First Aid certification</li>
                  <li>• Child safety and injury prevention</li>
                  <li>• Nutrition and meal planning</li>
                  <li>• Health screening and illness prevention</li>
                  <li>• Medication administration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Family & Community Partnerships</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Family engagement strategies</li>
                  <li>• Cultural competency and diversity</li>
                  <li>• Communication with families</li>
                  <li>• Community resources and referrals</li>
                  <li>• Professional ethics and confidentiality</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-yellow-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-1">Child Development Associate (CDA)</h4>
                  <p className="text-gray-700">Council for Professional Recognition national credential</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">CPR & First Aid</h4>
                  <p className="text-gray-700">Pediatric emergency response certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Childcare Employer Partners</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Daycare Centers</h3>
                <p className="text-gray-700 mb-2">Lead Teacher / Assistant</p>
                <p className="text-green-600 font-bold text-lg">$13-$18/hour</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Head Start Programs</h3>
                <p className="text-gray-700 mb-2">Early Childhood Educator</p>
                <p className="text-green-600 font-bold text-lg">$15-$20/hour</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">In-Home Childcare</h3>
                <p className="text-gray-700 mb-2">Family Childcare Provider</p>
                <p className="text-green-600 font-bold text-lg">$25,000-$45,000/year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Entry-Level (0-2 years): $26,000-$35,000/year</h3>
                <p>Assistant teacher or aide in daycare centers</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Experienced (2-5 years): $35,000-$45,000/year</h3>
                <p>Lead teacher or program coordinator</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Advanced (5+ years): $45,000-$60,000+/year</h3>
                <p>Center director or own childcare business</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-yellow-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-50 shadow-2xl">
                Start Your Childcare Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}