import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sterile Processing Training | Elevate For Humanity',
  description: '100% free Sterile Processing training. Learn medical equipment sterilization, infection control, and safety protocols. Get certified.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Image */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/medical-assistant/large/ma-large-05.jpg"
            alt="Sterile Processing Training"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
          
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Sterile Processing Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">100% free training. Learn medical equipment sterilization, infection control, and safety protocols. Get certified.</p>
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
            <h2 className="text-4xl font-bold text-center mb-12">8-12 Week Sterile Processing Technician Training</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 1-3: Decontamination & Cleaning</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Role of sterile processing in patient safety</li>
                  <li>• Infection prevention and control principles</li>
                  <li>• Decontamination area workflow and procedures</li>
                  <li>• Manual and automated cleaning processes</li>
                  <li>• Personal protective equipment (PPE) usage</li>
                  <li>• Instrument identification and handling</li>
                  <li>• Quality assurance and documentation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 4-6: Preparation & Packaging</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Instrument assembly and inspection</li>
                  <li>• Surgical instrument sets and trays</li>
                  <li>• Packaging materials and techniques</li>
                  <li>• Chemical and biological indicators</li>
                  <li>• Sterilization wrap and pouches</li>
                  <li>• Labeling and tracking systems</li>
                  <li>• Inventory management</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 7-9: Sterilization & Distribution</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Steam sterilization (autoclave) operation</li>
                  <li>• Low-temperature sterilization methods</li>
                  <li>• Sterilization monitoring and validation</li>
                  <li>• Sterile storage and handling</li>
                  <li>• Case cart preparation and delivery</li>
                  <li>• Point-of-use processing</li>
                  <li>• Regulatory compliance (AAMI, AORN, CDC)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 10-12: Advanced Topics & Certification</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Endoscope reprocessing</li>
                  <li>• High-level disinfection procedures</li>
                  <li>• Surgical instrumentation specialties</li>
                  <li>• Equipment maintenance and troubleshooting</li>
                  <li>• 120+ hours clinical externship</li>
                  <li>• CRCST certification exam preparation</li>
                  <li>• Job placement assistance</li>
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
                    <h4 className="font-bold text-lg mb-1">Certified Registered Central Service Technician (CRCST)</h4>
                    <p className="text-gray-700">HSPA (Healthcare Sterile Processing Association) certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">BLS for Healthcare Providers</h4>
                    <p className="text-gray-700">CPR and AED certification</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">OSHA Bloodborne Pathogens</h4>
                    <p className="text-gray-700">Safety and infection control</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Optional: CER, CIS, CHL</h4>
                    <p className="text-gray-700">Advanced certifications in endoscopy, instruments, leadership</p>
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
            <p className="text-center text-gray-600 mb-12 text-lg">Critical role in every hospital and surgical center</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">IU Health</h3>
                <p className="text-gray-700 mb-2">Sterile Processing Technician</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Shift differentials • Tuition reimbursement • Career advancement</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Ascension St. Vincent</h3>
                <p className="text-gray-700 mb-2">Central Sterile Supply Tech</p>
                <p className="text-green-600 font-bold text-lg">$16-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • PTO • Education assistance • Sign-on bonus</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Community Health Network</h3>
                <p className="text-gray-700 mb-2">SPD Technician</p>
                <p className="text-green-600 font-bold text-lg">$17-$24/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Flexible scheduling • Growth opportunities</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Eskenazi Health</h3>
                <p className="text-gray-700 mb-2">Sterile Processing Tech</p>
                <p className="text-green-600 font-bold text-lg">$16-$21/hour</p>
                <p className="text-sm text-gray-600 mt-2">Public service • Benefits • Diverse experience</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Franciscan Health</h3>
                <p className="text-gray-700 mb-2">Central Supply Technician</p>
                <p className="text-green-600 font-bold text-lg">$16-$22/hour</p>
                <p className="text-sm text-gray-600 mt-2">Benefits • Career development • Faith-based environment</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Ambulatory Surgery Centers</h3>
                <p className="text-gray-700 mb-2">SPD Technician</p>
                <p className="text-green-600 font-bold text-lg">$17-$23/hour</p>
                <p className="text-sm text-gray-600 mt-2">Outpatient setting • Regular hours • Benefits</p>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support</h3>
              <p className="text-gray-700 mb-4">95%+ of graduates employed within 30 days</p>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>• Resume and interview preparation</li>
                <li>• Direct connections to hiring hospitals</li>
                <li>• Clinical externship-to-hire opportunities</li>
                <li>• CRCST exam prep and scheduling support</li>
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
                <h3 className="text-2xl font-bold mb-2">Entry-Level SPD Technician (0-2 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$33,000-$44,000/year ($16-$21/hour)</p>
                <p className="text-blue-50">Start in decontamination or prep/pack areas. Learn instrument processing and sterilization.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced SPD Tech (2-5 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$44,000-$54,000/year ($21-$26/hour)</p>
                <p className="text-blue-50">Specialize in endoscopy, surgical instruments, or quality assurance. Train new staff.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Lead/Senior SPD Tech (5-10 years)</h3>
                <p className="text-blue-100 text-lg mb-2">$54,000-$65,000/year ($26-$31/hour)</p>
                <p className="text-blue-50">Lead technician, shift supervisor, or quality coordinator roles.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">SPD Manager/Director (10+ years)</h3>
                <p className="text-blue-100 text-lg mb-2">$65,000-$90,000+/year</p>
                <p className="text-blue-50">Manage entire sterile processing department, staff, budget, and compliance programs.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/apply" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 shadow-2xl">
                Start Your Sterile Processing Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}