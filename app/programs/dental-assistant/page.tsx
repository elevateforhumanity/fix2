import { Metadata } from 'next';
import ProgramHero from '@/components/ProgramHero';

export const metadata: Metadata = {
  title: 'Dental Assistant Training | Elevate For Humanity',
  description: '100% free training. Learn chairside assisting, X-rays, and patient care. Get certified and start your career.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProgramHero
        title="Dental Assistant Training"
        description="100% free training. Learn chairside assisting, X-rays, and patient care. Get certified and start your career."
        imageSrc="/images/healthcare/healthcare-professional-portrait-2.jpg"
        imageAlt="Dental Assistant Training"
        duration="8-12 Weeks"
        cost="$0"
        placement="85%+"
        salary="$38K+"
      />
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
            <h2 className="text-4xl font-bold text-center mb-12">10-12 Week Dental Assistant Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Dental Fundamentals & Office Procedures</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dental terminology and tooth anatomy</li>
                  <li>• Infection control and OSHA bloodborne pathogens</li>
                  <li>• Dental office management and patient scheduling</li>
                  <li>• Insurance billing and treatment planning</li>
                  <li>• Patient communication and chairside manner</li>
                  <li>• Dental software: Dentrix, Eaglesoft, Open Dental</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Chairside Assisting & Procedures</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Four-handed dentistry techniques</li>
                  <li>• Instrument identification and tray setups</li>
                  <li>• Dental materials: amalgam, composite, cement</li>
                  <li>• Impressions and bite registrations</li>
                  <li>• Suction techniques and moisture control</li>
                  <li>• Assisting with restorative procedures (fillings, crowns)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Radiology & Specialized Procedures</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dental X-ray safety and radiation protection</li>
                  <li>• Intraoral radiography: bitewing, periapical, occlusal</li>
                  <li>• Panoramic and cephalometric imaging</li>
                  <li>• Digital radiography systems</li>
                  <li>• Assisting with extractions and oral surgery</li>
                  <li>• Endodontic procedures (root canals)</li>
                  <li>• Periodontal treatments and scaling assistance</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Advanced Skills & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Orthodontic assisting and bracket placement</li>
                  <li>• Pediatric dentistry techniques</li>
                  <li>• Coronal polishing and fluoride application</li>
                  <li>• Dental laboratory procedures</li>
                  <li>• 120+ hours clinical externship</li>
                  <li>• DANB certification exam preparation</li>
                  <li>• CPR and medical emergency protocols</li>
                </ul>
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
                    <h4 className="font-bold text-lg mb-1">Certified Dental Assistant (CDA)</h4>
                    <p className="text-gray-700">DANB (Dental Assisting National Board) certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Radiation Health & Safety (RHS)</h4>
                    <p className="text-gray-700">X-ray certification for dental radiography</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Infection Control (ICE)</h4>
                    <p className="text-gray-700">OSHA bloodborne pathogens and sterilization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">CPR & First Aid</h4>
                    <p className="text-gray-700">Healthcare provider level certification</p>
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
            <h2 className="text-4xl font-bold text-center mb-4">Dental Office Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Job placement with Indianapolis area dental practices</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Aspen Dental</h3>
                <p className="text-gray-700 mb-2">Dental Assistant</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Paid training • Career advancement • Flexible scheduling</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Heartland Dental</h3>
                <p className="text-gray-700 mb-2">Dental Assistant</p>
                <p className="text-green-600 font-bold text-lg">$17-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • 401k • Continuing education • Growth opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Gentle Dental</h3>
                <p className="text-gray-700 mb-2">Chairside Dental Assistant</p>
                <p className="text-green-600 font-bold text-lg">$15-$20/hour</p>
                <p className="text-sm text-gray-600 mt-2">PTO • Employee discounts • Team environment</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Private Dental Practices</h3>
                <p className="text-gray-700 mb-2">General & Specialty Dentistry</p>
                <p className="text-green-600 font-bold text-lg">$16-$24/hour</p>
                <p className="text-sm text-gray-600 mt-2">Smaller teams • Variety of procedures • Personal relationships</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Orthodontic Offices</h3>
                <p className="text-gray-700 mb-2">Orthodontic Assistant</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Specialized training • Predictable procedures • Family-friendly hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Pediatric Dental Offices</h3>
                <p className="text-gray-700 mb-2">Pediatric Dental Assistant</p>
                <p className="text-green-600 font-bold text-lg">$16-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Work with children • Fun environment • Rewarding work</p>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">85%+ of graduates employed within 30 days of certification</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and portfolio development</li>
                <li>• Interview preparation with dental professionals</li>
                <li>• Direct connections to hiring dental offices</li>
                <li>• Externship-to-hire opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Entry-Level Dental Assistant (0-2 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$32,000-$40,000/year ($15-$19/hour)</p>
                <p className="text-blue-50">Start in general dentistry. Learn chairside assisting, X-rays, and office procedures.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Dental Assistant (2-5 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$40,000-$50,000/year ($19-$24/hour)</p>
                <p className="text-blue-50">Move to specialty practices (orthodontics, oral surgery, pediatrics) or lead assistant roles.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Specialized/Lead Dental Assistant (5+ years)</h3>
                <p className="text-blue-100 text-lg mb-2">$50,000-$60,000+/year ($24-$29/hour)</p>
                <p className="text-blue-50">Office manager, treatment coordinator, or expanded functions dental assistant (EFDA).</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement</h3>
                <p className="text-blue-100 text-lg mb-2">$55,000-$80,000+/year</p>
                <p className="text-blue-50">Dental Hygienist (2-year degree), Office Manager, Dental Sales, or Dental School.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 shadow-2xl">
                Start Your Dental Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
