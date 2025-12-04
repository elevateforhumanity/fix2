import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CNA Training Program | Elevate For Humanity',
  description: 'Become a Certified Nursing Assistant with our 100% funded CNA training program',
};

export default function CNAProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/programs/efh-cna-hero.jpg"
            alt="CNA Training Program"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
          
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight">Certified Nursing Assistant (CNA) Training</h1>
            <p className="text-2xl md:text-3xl mb-8 drop-shadow-lg leading-relaxed">
              Start your healthcare career in just 4-6 weeks. Work in hospitals, nursing homes, and home health. State certification exam included. $30-$35K starting salary.
            </p>
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
              <div className="text-3xl font-bold text-blue-600 mb-2">4-6 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">85%+</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$30-35K</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
                <p className="text-gray-700 mb-4">
                  Our CNA training program prepares you for a rewarding career in healthcare. You'll learn essential 
                  patient care skills, medical terminology, and professional practices needed to excel as a Certified 
                  Nursing Assistant.
                </p>
                <p className="text-gray-700 mb-6">
                  With hands-on clinical experience and expert instruction, you'll be ready to pass the state 
                  certification exam and begin working in hospitals, nursing homes, assisted living facilities, 
                  and home healthcare.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>State-approved curriculum</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Clinical training at real healthcare facilities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Exam preparation and certification support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Job placement assistance</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>Patient care & vital signs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>Infection control & safety</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>Medical terminology & documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>Patient rights & ethics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>Emergency procedures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">4-6 Week Training Schedule</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Week 1: Introduction to Healthcare & Patient Care Basics</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Role and responsibilities of a CNA</li>
                    <li>• Healthcare team dynamics and communication</li>
                    <li>• Patient rights, confidentiality (HIPAA), and ethics</li>
                    <li>• Infection control: handwashing, PPE, standard precautions</li>
                    <li>• Body mechanics and safe patient handling</li>
                    <li>• Medical terminology and abbreviations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="border-l-4 border-green-600 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Week 2: Vital Signs & Basic Nursing Skills</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Taking and recording vital signs (temperature, pulse, respiration, blood pressure)</li>
                    <li>• Height, weight, and intake/output measurements</li>
                    <li>• Bed making (occupied and unoccupied)</li>
                    <li>• Personal hygiene assistance (bathing, oral care, grooming)</li>
                    <li>• Toileting and incontinence care</li>
                    <li>• Positioning and turning patients</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="border-l-4 border-purple-600 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Week 3: Specialized Care & Safety</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nutrition and feeding assistance</li>
                    <li>• Range of motion exercises and ambulation</li>
                    <li>• Transfer techniques (bed to chair, wheelchair)</li>
                    <li>• Fall prevention and safety measures</li>
                    <li>• Emergency procedures and choking response</li>
                    <li>• Observation and reporting changes in patient condition</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="border-l-4 border-orange-600 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Week 4: Special Populations & Clinical Skills</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Caring for elderly patients and dementia care</li>
                    <li>• Mental health and behavioral challenges</li>
                    <li>• End-of-life care and hospice support</li>
                    <li>• Documentation and charting</li>
                    <li>• Rehabilitation and restorative care</li>
                    <li>• Cultural sensitivity and patient-centered care</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="text-2xl font-bold mb-3">Weeks 5-6: Clinical Experience & Exam Prep</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 40+ hours of supervised clinical practice at healthcare facilities</li>
                    <li>• Hands-on patient care under RN supervision</li>
                    <li>• Skills lab practice and competency testing</li>
                    <li>• State certification exam preparation (written and skills)</li>
                    <li>• Job readiness training and interview skills</li>
                    <li>• Resume building and job placement support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Indiana State CNA License</h4>
                    <p className="text-gray-700">Registered with Indiana State Department of Health Nurse Aide Registry</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">CPR & First Aid Certification</h4>
                    <p className="text-gray-700">American Heart Association BLS for Healthcare Providers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Infection Control Certification</h4>
                    <p className="text-gray-700">OSHA Bloodborne Pathogens and Standard Precautions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Skills Competency Certificate</h4>
                    <p className="text-gray-700">Verified proficiency in all 25 essential CNA skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Our Hiring Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">We work directly with top healthcare employers in Indianapolis</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">CNA - Hospital & Outpatient</p>
                <p className="text-green-600 font-bold text-lg">$16-$18/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Tuition reimbursement • Career advancement</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">Patient Care Technician</p>
                <p className="text-green-600 font-bold text-lg">$15-$17/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • 401k match • Shift differentials</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">CNA - Med/Surg Units</p>
                <p className="text-green-600 font-bold text-lg">$16-$19/hour</p>
                <p className="text-sm text-gray-600 mt-2">Sign-on bonus • Flexible scheduling • Education assistance</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Brookdale Senior Living</h3>
                <p className="text-gray-700 mb-2">CNA - Assisted Living</p>
                <p className="text-green-600 font-bold text-lg">$14-$16/hour</p>
                <p className="text-sm text-gray-600 mt-2">Paid training • Flexible hours • Advancement opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">American Senior Communities</h3>
                <p className="text-gray-700 mb-2">CNA - Skilled Nursing</p>
                <p className="text-green-600 font-bold text-lg">$15-$17/hour</p>
                <p className="text-sm text-gray-600 mt-2">Weekend premium • Benefits • Referral bonuses</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Visiting Nurse & Hospice Home</h3>
                <p className="text-gray-700 mb-2">Home Health Aide</p>
                <p className="text-green-600 font-bold text-lg">$16-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">Mileage reimbursement • Flexible schedule • 1-on-1 care</p>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Job Placement Support</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Resume writing and formatting</li>
                    <li>• Interview preparation and mock interviews</li>
                    <li>• Job search strategies and online applications</li>
                    <li>• Professional references and recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">After Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Direct connections to hiring managers</li>
                    <li>• On-site job fairs with healthcare employers</li>
                    <li>• 90-day follow-up and career coaching</li>
                    <li>• Continuing education opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Entry-Level CNA (0-1 year)</h3>
                <p className="text-blue-100 text-lg mb-2">$30,000-$35,000/year ($14-$17/hour)</p>
                <p className="text-blue-50">Start in nursing homes, assisted living, or hospitals. Build foundational skills and patient care experience.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced CNA (1-3 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$35,000-$40,000/year ($17-$19/hour)</p>
                <p className="text-blue-50">Move to specialty units (ICU, ER, pediatrics) or home health. Take on mentoring roles for new CNAs.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Senior CNA / Lead CNA (3-5 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$40,000-$45,000/year ($19-$22/hour)</p>
                <p className="text-blue-50">Supervise other CNAs, coordinate patient care, assist with training programs. Leadership responsibilities.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement Options</h3>
                <p className="text-blue-100 text-lg mb-2">$45,000-$75,000+/year</p>
                <p className="text-blue-50">Bridge to LPN (1 year) or RN (2-4 years) programs. Many employers offer tuition assistance. Medical Assistant, Phlebotomist, or Patient Care Coordinator roles also available.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-blue-100 mb-6">
                Many of our CNA graduates go on to become Licensed Practical Nurses (LPNs) or Registered Nurses (RNs) with employer-sponsored education.
              </p>
              <Link href="/apply" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 shadow-2xl">
                Start Your Healthcare Journey Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Career Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Hospitals</h3>
                <p className="text-gray-600">Work in medical-surgical units, emergency departments, or specialty care areas</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Nursing Homes</h3>
                <p className="text-gray-600">Provide long-term care for elderly and chronically ill patients</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Healthcare</h3>
                <p className="text-gray-600">Deliver personalized care in patients' homes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Program Requirements</h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>High school diploma or GED</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Must be at least 18 years old</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pass background check and drug screening</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Physical exam and immunizations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Commitment to attend all classes and clinical hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Healthcare Career?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of graduates who have launched successful careers as CNAs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 text-lg">
                Apply Now
              </Link>
              <Link href="/contact" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 border-2 border-white text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
