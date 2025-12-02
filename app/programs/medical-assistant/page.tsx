import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Medical Assistant Training | Elevate For Humanity',
  description: '100% free Medical Assistant training. Learn clinical and administrative skills. Get certified and start your healthcare career.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/medical-assistant/large/ma-large-02.jpg"
            alt="Medical Assistant Training"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/85 to-slate-900/90" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Medical Assistant Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn clinical and administrative skills. Get certified and start your healthcare career.</p>
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
            <h2 className="text-4xl font-bold text-center mb-12">8-12 Week Medical Assistant Training Program</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">Comprehensive clinical and administrative healthcare training</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-teal-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Medical Fundamentals & Administrative Skills</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Medical terminology and anatomy/physiology basics</li>
                  <li>• Healthcare law, ethics, and HIPAA compliance</li>
                  <li>• Patient communication and customer service</li>
                  <li>• Medical office procedures and workflow</li>
                  <li>• Electronic Health Records (EHR) systems - Epic, Cerner, Athenahealth</li>
                  <li>• Appointment scheduling and patient registration</li>
                  <li>• Medical billing and coding basics (ICD-10, CPT)</li>
                  <li>• Insurance verification and authorization</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Clinical Skills & Patient Care</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Vital signs: blood pressure, pulse, temperature, respiration, oxygen saturation</li>
                  <li>• Patient intake and medical history documentation</li>
                  <li>• Infection control and sterilization techniques</li>
                  <li>• Phlebotomy: venipuncture and capillary puncture</li>
                  <li>• EKG/ECG administration and interpretation basics</li>
                  <li>• Injections: intramuscular, subcutaneous, intradermal</li>
                  <li>• Medication administration and dosage calculations</li>
                  <li>• Specimen collection: urine, blood, throat cultures</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Advanced Clinical Procedures</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Assisting with minor surgical procedures</li>
                  <li>• Wound care and dressing changes</li>
                  <li>• Suture and staple removal</li>
                  <li>• Respiratory treatments and nebulizer administration</li>
                  <li>• Vision and hearing screening</li>
                  <li>• Laboratory procedures: urinalysis, blood glucose testing</li>
                  <li>• Pharmacology and medication management</li>
                  <li>• Emergency procedures and first aid</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Specialty Areas & Certification Prep</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pediatric and geriatric patient care</li>
                  <li>• Women's health and OB/GYN procedures</li>
                  <li>• Radiology safety and X-ray assistance</li>
                  <li>• Physical therapy and rehabilitation basics</li>
                  <li>• 160+ hours clinical externship at healthcare facilities</li>
                  <li>• CCMA/RMA certification exam preparation</li>
                  <li>• Resume building and interview preparation</li>
                  <li>• Job placement and career services</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Certified Clinical Medical Assistant (CCMA)</h4>
                    <p className="text-gray-700">National Healthcareer Association (NHA) certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">BLS for Healthcare Providers</h4>
                    <p className="text-gray-700">American Heart Association CPR and AED certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phlebotomy Certification</h4>
                    <p className="text-gray-700">Venipuncture and capillary puncture competency</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">EKG Technician Certification</h4>
                    <p className="text-gray-700">12-lead EKG administration and basic interpretation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Clinical Equipment & Software You'll Master</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Medical Equipment:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Blood pressure cuffs (manual & automatic)</li>
                    <li>• Pulse oximeters and thermometers</li>
                    <li>• EKG machines (12-lead)</li>
                    <li>• Phlebotomy supplies and vacutainer systems</li>
                    <li>• Glucometers and urinalysis equipment</li>
                    <li>• Nebulizers and spirometers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">EHR Systems:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Epic (most widely used)</li>
                    <li>• Cerner/Oracle Health</li>
                    <li>• Athenahealth</li>
                    <li>• eClinicalWorks</li>
                    <li>• NextGen Healthcare</li>
                    <li>• Practice Fusion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Office Software:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Microsoft Office Suite</li>
                    <li>• Medical billing software</li>
                    <li>• Insurance verification systems</li>
                    <li>• Scheduling platforms</li>
                    <li>• Lab result management</li>
                    <li>• Prescription e-prescribing</li>
                  </ul>
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
            <p className="text-center text-gray-600 mb-12 text-lg">Direct placement with Indianapolis area hospitals, clinics, and medical practices</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">IU Health</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Outpatient Clinics</p>
                <p className="text-green-600 font-bold text-lg">$16-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Tuition reimbursement • Career ladder • 401k match</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Ascension St. Vincent</h3>
                <p className="text-gray-700 mb-2">Clinical Medical Assistant</p>
                <p className="text-green-600 font-bold text-lg">$15-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • PTO • Shift differentials • Education assistance</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Community Health Network</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Primary Care</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Sign-on bonus • Flexible scheduling • Advancement opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Eskenazi Health</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Specialty Clinics</p>
                <p className="text-green-600 font-bold text-lg">$15-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Public service loan forgiveness • Benefits • Diverse patient population</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Franciscan Health</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Family Medicine</p>
                <p className="text-green-600 font-bold text-lg">$14-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Faith-based environment • Benefits • Career development</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Private Medical Practices</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Various Specialties</p>
                <p className="text-green-600 font-bold text-lg">$14-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Smaller teams • Variety of specialties • Flexible hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Urgent Care Centers</h3>
                <p className="text-gray-700 mb-2">Medical Assistant - Fast-Paced Environment</p>
                <p className="text-green-600 font-bold text-lg">$15-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Evening/weekend shifts • Variety of cases • Quick decision-making</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-2">Specialty Clinics</h3>
                <p className="text-gray-700 mb-2">MA - Cardiology, Orthopedics, OB/GYN</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Specialized training • Higher pay • Focused patient care</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-2">Telehealth Companies</h3>
                <p className="text-gray-700 mb-2">Remote Medical Assistant</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Work from home • Flexible schedule • Tech-forward environment</p>
              </div>
            </div>

            <div className="mt-12 bg-teal-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Services & Job Placement</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Professional resume and cover letter development</li>
                    <li>• Mock interviews with healthcare professionals</li>
                    <li>• Job search strategies and online applications</li>
                    <li>• Networking with clinical externship sites</li>
                    <li>• Certification exam preparation and scheduling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">After Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Direct connections to hiring managers at partner facilities</li>
                    <li>• On-site job fairs with healthcare employers</li>
                    <li>• 90-day follow-up and career coaching</li>
                    <li>• Continuing education and specialty certification opportunities</li>
                    <li>• Alumni network and career advancement support</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-center text-lg font-bold text-gray-800">
                90%+ of our graduates are employed within 60 days of certification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Entry-Level Medical Assistant (0-2 years)</h3>
                <p className="text-teal-100 text-lg mb-2">$30,000-$38,000/year ($14-$18/hour)</p>
                <p className="text-teal-50">Start in primary care or specialty clinics. Build clinical skills and EHR proficiency. Learn office workflows and patient care protocols.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Medical Assistant (2-5 years)</h3>
                <p className="text-teal-100 text-lg mb-2">$38,000-$48,000/year ($18-$23/hour)</p>
                <p className="text-teal-50">Move to specialty clinics (cardiology, orthopedics, OB/GYN) or supervisory roles. Train new MAs. Handle complex procedures and patient cases.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Lead/Senior Medical Assistant (5-8 years)</h3>
                <p className="text-teal-100 text-lg mb-2">$48,000-$58,000/year ($23-$28/hour)</p>
                <p className="text-teal-50">Supervise MA teams. Coordinate clinic operations. Assist with quality improvement initiatives. Mentor and train staff.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement Options</h3>
                <p className="text-teal-100 text-lg mb-2">$50,000-$80,000+/year</p>
                <p className="text-teal-50">Bridge to RN (2-4 years), LPN (1 year), or specialized roles: Practice Manager, Clinical Coordinator, Healthcare Administrator, Physician Assistant (with additional education).</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-teal-100 mb-6">
                Medical Assistants are one of the fastest-growing healthcare professions, with 16% job growth projected through 2031.
              </p>
              <Link href="/apply" className="inline-block bg-white text-teal-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-50 shadow-2xl">
                Start Your Healthcare Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Medical Assistant Career?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Join our next class and start your journey in healthcare
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 text-lg">
                Apply Now - 100% Free
              </Link>
              <Link href="/contact" className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 text-lg">
                Schedule a Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}