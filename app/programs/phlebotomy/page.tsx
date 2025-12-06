import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Phlebotomy Training | Elevate For Humanity',
  description: '100% free Phlebotomy training. Learn blood collection, lab procedures, and patient care. Get certified and start your career.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/medical-assistant/large/ma-large-03.jpg"
            alt="Phlebotomy Training"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Phlebotomy Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn blood collection, lab procedures, and patient care. Get certified and start your career.</p>
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
            <h2 className="text-4xl font-bold text-center mb-12">4-8 Week Phlebotomy Training Program</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-2: Phlebotomy Fundamentals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Introduction to phlebotomy and healthcare roles</li>
                  <li>• Medical terminology and anatomy (circulatory system)</li>
                  <li>• Infection control and standard precautions</li>
                  <li>• OSHA bloodborne pathogens certification</li>
                  <li>• Patient identification and safety protocols</li>
                  <li>• Professional ethics and patient communication</li>
                  <li>• Laboratory equipment and supplies</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 3-4: Venipuncture Techniques</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Venipuncture site selection and vein anatomy</li>
                  <li>• Evacuated tube system (Vacutainer) technique</li>
                  <li>• Butterfly needle and syringe methods</li>
                  <li>• Order of draw and tube additives</li>
                  <li>• Tourniquet application and release</li>
                  <li>• Needle insertion angles and techniques</li>
                  <li>• Hands-on practice with training arms</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 5-6: Capillary Puncture & Special Collections</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Capillary puncture (fingerstick and heelstick)</li>
                  <li>• Pediatric and geriatric phlebotomy</li>
                  <li>• Difficult draw techniques and problem-solving</li>
                  <li>• Special collections (glucose tolerance, blood cultures)</li>
                  <li>• Point-of-care testing (glucose, hemoglobin)</li>
                  <li>• Specimen handling, labeling, and transport</li>
                  <li>• Quality assurance and error prevention</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-8: Clinical Externship & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 100+ successful venipunctures on real patients</li>
                  <li>• 25+ successful capillary punctures</li>
                  <li>• Clinical rotation at hospitals and labs</li>
                  <li>• EKG basics (optional add-on)</li>
                  <li>• Certification exam preparation (CPT, PBT)</li>
                  <li>• Resume building and interview skills</li>
                  <li>• Job placement assistance</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-red-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Phlebotomy Technician (CPT)</h4>
                    <p className="text-gray-700">National Healthcareer Association (NHA) certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">OSHA Bloodborne Pathogens</h4>
                    <p className="text-gray-700">Safety and infection control certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">CPR & First Aid</h4>
                    <p className="text-gray-700">American Heart Association BLS certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Clinical Competency Certificate</h4>
                    <p className="text-gray-700">Verified 100+ successful blood draws</p>
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
            <h2 className="text-4xl font-bold text-center mb-4">Healthcare Employer Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Job placement with hospitals, labs, and blood donation centers</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">Phlebotomist</p>
                <p className="text-green-600 font-bold text-lg">$15-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Shift differentials • Career advancement</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Quest Diagnostics</h3>
                <p className="text-gray-700 mb-2">Patient Service Technician</p>
                <p className="text-green-600 font-bold text-lg">$14-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • 401k • Paid training • Flexible hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">LabCorp</h3>
                <p className="text-gray-700 mb-2">Phlebotomist</p>
                <p className="text-green-600 font-bold text-lg">$14-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Career development • National company</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 mb-2">Hospital Phlebotomist</p>
                <p className="text-green-600 font-bold text-lg">$16-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Tuition reimbursement • Shift premiums</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <p className="text-gray-700 mb-2">Phlebotomy Technician</p>
                <p className="text-green-600 font-bold text-lg">$15-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Sign-on bonus • Benefits • Growth opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Versiti Blood Center</h3>
                <p className="text-gray-700 mb-2">Donor Phlebotomist</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Rewarding work • Benefits • Save lives daily</p>
              </div>
            </div>

            <div className="mt-12 bg-red-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">95%+ of graduates employed within 30 days</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and interview preparation</li>
                <li>• Direct connections to hiring labs and hospitals</li>
                <li>• Clinical externship-to-hire opportunities</li>
                <li>• Certification exam prep and scheduling</li>
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
                <h3 className="text-2xl font-bold mb-2">Entry-Level Phlebotomist (0-2 years)</h3>
                <p className="text-red-100 text-lg mb-2">$28,000-$36,000/year ($14-$17/hour)</p>
                <p className="text-red-50">Start in labs, hospitals, or blood donation centers. Build speed and accuracy with blood draws.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Phlebotomist (2-5 years)</h3>
                <p className="text-red-100 text-lg mb-2">$36,000-$44,000/year ($17-$21/hour)</p>
                <p className="text-red-50">Move to specialized areas (pediatrics, oncology, mobile phlebotomy) or lead phlebotomist roles.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Senior/Lead Phlebotomist (5+ years)</h3>
                <p className="text-red-100 text-lg mb-2">$44,000-$52,000+/year ($21-$25/hour)</p>
                <p className="text-red-50">Supervise phlebotomy teams, train new staff, coordinate lab operations.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-red-100 text-lg mb-2">$50,000-$70,000+/year</p>
                <p className="text-red-50">Lab Supervisor, Medical Lab Technician (MLT), Medical Lab Scientist (MLS), or Healthcare Administration.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-red-50 shadow-2xl">
                Start Your Phlebotomy Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}