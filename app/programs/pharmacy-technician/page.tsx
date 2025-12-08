
import EnrollmentProcess from '@/components/EnrollmentProcess';
import ProgramCTA from '@/components/ProgramCTA';
import ProgramHighlights from '@/components/ProgramHighlights';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/programs/pharmacy-technician",
  },
  title: 'Pharmacy Technician Training | Elevate For Humanity',
  description: '100% free Pharmacy Technician training. Learn medication dispensing, inventory management, and patient service. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[400px] sm:h-[500px] md:h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/media/hero-slide-healthcare.jpg"
            alt="Pharmacy Technician Training"
            fill
            className="object-cover"
            priority quality={100} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Pharmacy Technician Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn medication dispensing, inventory management, and patient service. Get certified.</p>
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
            <h2 className="text-4xl font-bold text-center mb-12">8-12 Week Pharmacy Technician Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Pharmacy Fundamentals & Medication Basics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pharmacy law and ethics (HIPAA, DEA regulations)</li>
                  <li>• Medical and pharmaceutical terminology</li>
                  <li>• Drug classifications and therapeutic categories</li>
                  <li>• Prescription interpretation and processing</li>
                  <li>• Pharmacy calculations and conversions</li>
                  <li>• Measurement systems (metric, household, apothecary)</li>
                  <li>• Dosage forms and routes of administration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Dispensing & Compounding</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Prescription filling procedures and workflow</li>
                  <li>• Medication counting and measuring techniques</li>
                  <li>• Compounding non-sterile preparations</li>
                  <li>• Sterile compounding and IV admixture</li>
                  <li>• USP 797 and USP 800 compliance</li>
                  <li>• Aseptic technique and cleanroom procedures</li>
                  <li>• Quality assurance and error prevention</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Pharmacy Operations & Technology</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pharmacy management systems (QS/1, PioneerRx, Liberty)</li>
                  <li>• Insurance billing and third-party adjudication</li>
                  <li>• Inventory management and purchasing</li>
                  <li>• Controlled substance handling and documentation</li>
                  <li>• Medication therapy management (MTM)</li>
                  <li>• Patient counseling support and communication</li>
                  <li>• Pharmacy automation and robotics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Specialized Practice & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hospital pharmacy operations</li>
                  <li>• Long-term care pharmacy</li>
                  <li>• Specialty pharmacy (oncology, infusion)</li>
                  <li>• Medication safety and error reporting</li>
                  <li>• 160+ hours clinical externship</li>
                  <li>• PTCB/ExCPT certification exam preparation</li>
                  <li>• State pharmacy law review</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Pharmacy Technician (CPhT)</h4>
                    <p className="text-gray-700">PTCB (Pharmacy Technician Certification Board) national certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Indiana Pharmacy Technician License</h4>
                    <p className="text-gray-700">State registration with Indiana Board of Pharmacy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Sterile Compounding Certification</h4>
                    <p className="text-gray-700">USP 797 and USP 800 compliance training</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor"
viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Immunization Certification</h4>
                    <p className="text-gray-700">Vaccine administration training (where state-approved)</p>
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
            <h2 className="text-4xl font-bold text-center mb-4">Pharmacy Employer Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Job placement with retail, hospital, and specialty pharmacies</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">CVS Pharmacy</h3>
                <p className="text-gray-700 mb-2">Pharmacy Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • 401k • Tuition reimbursement • Career advancement</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Walgreens</h3>
                <p className="text-gray-700 mb-2">Certified Pharmacy Technician</p>
                <p className="text-green-600 font-bold text-lg">$15-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • Employee discounts • Flexible scheduling</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Kroger Pharmacy</h3>
                <p className="text-gray-700 mb-2">Pharmacy Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Union benefits • Pension • Paid training</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 mb-2">Hospital Pharmacy Technician</p>
                <p className="text-green-600 font-bold text-lg">$18-$24/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Tuition assistance • IV/sterile compounding</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 mb-2">Inpatient Pharmacy Tech</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Shift differentials • Benefits • Career growth</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Specialty Pharmacies</h3>
                <p className="text-gray-700 mb-2">Specialty Pharmacy Technician</p>
                <p className="text-green-600 font-bold text-lg">$19-$26/hour</p>
                <p className="text-sm text-gray-600 mt-2">Oncology, infusion, specialty medications • Higher pay</p>
              </div>
            </div>

            <div className="mt-12 bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">90%+ of graduates employed within 30 days of certification</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and interview preparation</li>
                <li>• Direct connections to hiring pharmacies</li>
                <li>• Externship-to-hire opportunities</li>
                <li>• PTCB exam prep and scheduling support</li>
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
                <h3 className="text-2xl font-bold mb-2">Enstart-Level Pharmacy Technician (0-2 years)</h3>
                <p className="text-green-50">Start in retail pharmacy. Learn prescription processing, insurance billing, and customer service.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Pharmacy Technician (2-5 years)</h3>
                <p className="text-green-50">Move to hospital pharmacy, specialty pharmacy, or lead technician roles. Handle complex medications and IV compounding.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Senior/Specialized Pharmacy Technician (5+ years)</h3>
                <p className="text-green-100 text-lg mb-2">$50,000-$60,000+/year ($24-$29/hour)</p>
                <p className="text-green-50">Specialty areas (oncology, nuclear, compounding), pharmacy supervisor, or inventory management specialist.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-green-100 text-lg mb-2">$60,000-$130,000+/year</p>
                <p className="text-green-50">Pharmacy Manager, Pharmacist (with PharmD degree), Pharmaceutical Sales, or Clinical Research Coordinator.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 shadow-2xl">
                Start Your Pharmacy Career Today
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