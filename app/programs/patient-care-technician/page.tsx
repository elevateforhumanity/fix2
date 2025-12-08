
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/programs/patient-care-technician",
  },
  title: 'Patient Care Technician Training | Elevate For Humanity',
  description: '100% free Patient Care Technician training. Learn patient care, vital signs, and clinical support. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[400px] sm:h-[500px] md:h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/image4.jpg"
            alt="Patient Care Technician Training"
            fill
            className="object-cover"
            priority quality={100} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Patient Care Technician Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn patient care, vital signs, and clinical support. Get certified.</p>
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
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Funded</h3>
                <p className="text-gray-600">All programs completely free through government funding</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Placement</h3>
                <p className="text-gray-600">We help you find employment after training</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Training</h3>
                <p className="text-gray-600">Learn from industry-standard professionals</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">6-10 Week Patient Care Technician Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-teal-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Basic Patient Care & CNA Skills</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Role of Patient Care Technician in healthcare</li>
                  <li>• Infection control and standard precautions</li>
                  <li>• Vital signs: temperature, pulse, respiration, blood pressure</li>
                  <li>• Patient hygiene and personal care</li>
                  <li>• Bed making and patient positioning</li>
                  <li>• Transfer techniques and mobility assistance</li>
                  <li>• Documentation and medical records</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Clinical Skills & Phlebotomy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Phlebotomy: venipuncture and capillary puncture</li>
                  <li>• EKG/ECG administration (12-lead)</li>
                  <li>• Specimen collection and handling</li>
                  <li>• Catheter care and urinary drainage</li>
                  <li>• Wound care and dressing changes</li>
                  <li>• Oxygen therapy and respiratory care basics</li>
                  <li>• Medical equipment operation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-8: Specialized Care & Monitoring</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cardiac monitoring and telemestart basics</li>
                  <li>• Glucose testing and diabetic care</li>
                  <li>• Post-operative patient care</li>
                  <li>• Emergency response and code procedures</li>
                  <li>• Patient safety and fall prevention</li>
                  <li>• Communication with healthcare team</li>
                  <li>• Electronic health records (EHR) systems</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 9-10: Clinical Externship & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 120+ hours clinical experience in hospitals</li>
                  <li>• Hands-on patient care under supervision</li>
                  <li>• Multi-skilled technician competencies</li>
                  <li>• CNA, EKG, and Phlebotomy certification exams</li>
                  <li>• Resume building and interview preparation</li>
                  <li>• Job placement assistance</li>
                  <li>• Career development planning</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Nursing Assistant (CNA)</h4>
                    <p className="text-gray-700">State CNA license and regisstart</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Phlebotomy Technician (CPT)</h4>
                    <p className="text-gray-700">NHA phlebotomy certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified EKG Technician (CET)</h4>
                    <p className="text-gray-700">NHA EKG certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">BLS for Healthcare Providers</h4>
                    <p className="text-gray-700">CPR and AED certification</p>
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
            <h2 className="text-4xl font-bold text-center mb-4">Hospital Employer Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Multi-skilled technicians are in high demand at hospitals</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">Patient Care Technician</p>
                <p className="text-green-600 font-bold text-lg">$17-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Tuition reimbursement • Career ladder • Shift differentials</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">Multi-Skilled Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • PTO • Education assistance • Sign-on bonus</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">PCT - Med/Surg Units</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Flexible scheduling • Advancement opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Eskenazi Health</h3>
                <p className="text-gray-700 mb-2">Patient Care Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Public service • Benefits • Diverse patient population</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Franciscan Health</h3>
                <p className="text-gray-700 mb-2">PCT - ICU/ER</p>
                <p className="text-green-600 font-bold text-lg">$18-$24/hour</p>
                <p className="text-sm text-gray-600 mt-2">Critical care • Higher pay • Benefits • Career development</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Rehabilitation Hospitals</h3>
                <p className="text-gray-700 mb-2">Patient Care Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Rewarding work • Benefits • Regular hours</p>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">95%+ of graduates employed within 30 days</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and interview preparation</li>
                <li>• Direct connections to hiring hospitals</li>
                <li>• Clinical externship-to-hire opportunities</li>
                <li>• Multiple certification exam prep</li>
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
                <h3 className="text-2xl font-bold mb-2">Enstart-Level PCT (0-2 years)</h3>
                <p className="text-teal-50">Start on med/surg floors. Provide basic patient care, vital signs, EKGs, and blood draws.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced PCT (2-5 years)</h3>
                <p className="text-teal-50">Move to specialty units (ICU, ER, cardiac, oncology). Handle more complex patient care.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Senior/Lead PCT (5+ years)</h3>
                <p className="text-teal-100 text-lg mb-2">$52,000-$60,000+/year ($25-$29/hour)</p>
                <p className="text-teal-50">Train new PCTs, coordinate unit operations, assist with quality improvement.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-teal-100 text-lg mb-2">$50,000-$80,000+/year</p>
                <p className="text-teal-50">Bridge to RN (2-4 years), LPN (1 year), Respiratory Therapist, or Surgical Tech with additional education.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-teal-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-50 shadow-2xl">
                Start Your Patient Care Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      
      {/* Indiana Career Connect Enrollment Process */}
      <EnrollmentProcess />
      
      {/* Program Highlights */}
      <ProgramHighlights />
      
      {/* Call to Action */}
      <ProgramCTA programName="this program" />
    </div>
  );
}