
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Peer Recovery Coach Training | Elevate For Humanity',
  description: '100% free Peer Recovery Coach training. Learn addiction recovery support, counseling skills, and community resources. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[250px] sm:h-[300px] md:h-[350px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/general/support-services.jpg"
            alt="Peer Recovery Coach Training"
            fill
            className="object-cover"
            priority quality={100} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Peer Recovery Coach Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn addiction recovery support, counseling skills, and community resources. Get certified.</p>
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
                <p className="text-gray-600">Learn from indusstart professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">8-12 Week Peer Recovery Coach Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Recovery Fundamentals & Ethics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Introduction to peer recovery support services</li>
                  <li>• Understanding addiction and recovery process</li>
                  <li>• Ethics, boundaries, and confidentiality</li>
                  <li>• Trauma-informed care principles</li>
                  <li>• Cultural competency and diversity</li>
                  <li>• Self-care and wellness for peer supporters</li>
                  <li>• Recovery capital and strengths-based approach</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Core Competencies & Skills</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Active listening and communication skills</li>
                  <li>• Motivational interviewing techniques</li>
                  <li>• Crisis intervention and de-escalation</li>
                  <li>• Goal setting and action planning</li>
                  <li>• Resource navigation and advocacy</li>
                  <li>• Group facilitation skills</li>
                  <li>• Documentation and record keeping</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Specialized Topics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Co-occurring mental health disorders</li>
                  <li>• Medication-assisted treatment (MAT) support</li>
                  <li>• Family and relationship recovery</li>
                  <li>• Employment and housing assistance</li>
                  <li>• Legal system navigation</li>
                  <li>• Relapse prevention strategies</li>
                  <li>• Community resource mapping</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Practicum & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100+ hours supervised practicum experience</li>
                  <li>• Working with individuals in recovery</li>
                  <li>• Case studies and role-playing</li>
                  <li>• Indiana Credentialing Board exam preparation</li>
                  <li>• Professional development planning</li>
                  <li>• Job placement assistance</li>
                  <li>• Continuing education requirements</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications & Credentials</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Peer Recovery Coach (CPRC)</h4>
                    <p className="text-gray-700">Indiana Credentialing Board certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Mental Health First Aid</h4>
                    <p className="text-gray-700">Crisis intervention certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Trauma-Informed Care Certificate</h4>
                    <p className="text-gray-700">Understanding trauma and recovery</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">CPR & First Aid</h4>
                    <p className="text-gray-700">Emergency response training</p>
                  </div>
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
            <h2 className="text-4xl font-bold text-center mb-4">Employer Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Work with treatment centers, community organizations, and healthcare facilities</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Fairbanks Recovery Center</h3>
                <p className="text-gray-700 mb-2">Peer Recovery Specialist</p>
                <p className="text-green-600 font-bold text-lg">$15-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Supervision • Career growth • Meaningful work</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Eskenazi Health</h3>
                <p className="text-gray-700 mb-2">Peer Support Specialist</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • Benefits • Hospital setting</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Aspire Indiana Health</h3>
                <p className="text-gray-700 mb-2">Certified Peer Recovery Coach</p>
                <p className="text-green-600 font-bold text-lg">$15-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Community mental health • Benefits • Flexible hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Recovery Works</h3>
                <p className="text-gray-700 mb-2">Peer Recovery Coach</p>
                <p className="text-green-600 font-bold text-lg">$14-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Residential treatment • Benefits • Supportive environment</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 mb-2">Peer Support Navigator</p>
                <p className="text-green-600 font-bold text-lg">$16-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Hospital-based • Benefits • Career development</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Recovery Cafes & Drop-In Centers</h3>
                <p className="text-gray-700 mb-2">Peer Recovery Specialist</p>
                <p className="text-green-600 font-bold text-lg">$14-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Community-based • Flexible • Grassroots work</p>
              </div>
            </div>

            <div className="mt-12 bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">85%+ of graduates employed within 60 days</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and interview preparation</li>
                <li>• Direct connections to treatment centers</li>
                <li>• Practicum-to-hire opportunities</li>
                <li>• Ongoing supervision and mentorship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Enstart-Level Peer Recovery Coach (0-2 years)</h3>
                <p className="text-purple-50">Start at treatment centers or community organizations. Provide one-on-one peer support.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Peer Specialist (2-5 years)</h3>
                <p className="text-purple-50">Move to hospital settings, lead support groups, provide specialized services.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Senior/Supervisor (5-10 years)</h3>
                <p className="text-purple-50">Supervise peer staff, coordinate programs, train new peer coaches.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-purple-100 text-lg mb-2">$50,000-$70,000+/year</p>
                <p className="text-purple-50">Program Director, Clinical Supervisor, Licensed Addiction Counselor (with additional education), or start your own recovery support organization.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 shadow-2xl">
                Start Your Peer Recovery Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}