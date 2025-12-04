import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'CDL Training Program | Elevate For Humanity',
  description: 'Get your Commercial Driver License with our 100% funded CDL training program',
};

export default function CDLProgramPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/trades/hero-program-cdl.jpg"
            alt="Professional CDL truck driver in modern semi-truck on highway"
            fill
            className="object-cover"
            priority quality={85} sizes="100vw"
          />
          
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Commercial Driver License (CDL) Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Start a high-paying trucking career with our comprehensive, 100% funded CDL program
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

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4-8 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">90%+</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$45-65K</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Program Overview</h2>
                <p className="text-gray-700 mb-4">
                  Our CDL training program prepares you for a lucrative career in the trucking industry. You'll learn 
                  to operate commercial vehicles safely and professionally, meeting all federal and state requirements 
                  for Class A or Class B CDL certification.
                </p>
                <p className="text-gray-700 mb-6">
                  With hands-on driving experience, classroom instruction, and expert mentorship, you'll be ready to 
                  pass your CDL exam and start earning immediately with major trucking companies nationwide.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>DOT-approved training facility</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Behind-the-wheel training with modern equipment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>CDL exam preparation and testing support</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Direct connections to hiring companies</span>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Vehicle inspection & safe driving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Federal regulations & logbooks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Backing, maneuvering & parking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Cargo handling & securement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 font-bold mr-2">•</span>
                    <span>Emergency procedures & trip planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">4-8 Week CDL Class A Training Schedule</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-orange-600">
                <h3 className="text-2xl font-bold mb-3">Week 1: CDL Fundamentals & Pre-Trip Inspection</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Federal Motor Carrier Safety Regulations (FMCSR)</li>
                  <li>• Hours of Service (HOS) rules and Electronic Logging Devices (ELD)</li>
                  <li>• Commercial vehicle classifications and endorsements</li>
                  <li>• Complete pre-trip inspection procedures (engine, brakes, lights, tires)</li>
                  <li>• Air brake system components and operation</li>
                  <li>• Vehicle maintenance and breakdown procedures</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Week 2: Basic Vehicle Control & Backing Maneuvers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Straight line backing and alley dock backing</li>
                  <li>• Offset backing (left and right)</li>
                  <li>• Parallel parking (driver side and blind side)</li>
                  <li>• Coupling and uncoupling trailers</li>
                  <li>• Shifting techniques (10-speed and 13-speed transmissions)</li>
                  <li>• Turning radius and off-tracking awareness</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Week 3: Road Driving & Highway Operations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• City and urban driving techniques</li>
                  <li>• Highway merging, lane changes, and passing</li>
                  <li>• Railroad crossings and bridge clearances</li>
                  <li>• Weather conditions and night driving</li>
                  <li>• Space management and following distance</li>
                  <li>• Defensive driving and hazard perception</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Week 4: Cargo Management & Safety</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cargo securement regulations and techniques</li>
                  <li>• Weight distribution and axle weight limits</li>
                  <li>• Hazardous materials awareness (HAZMAT basics)</li>
                  <li>• Tanker operations and liquid surge</li>
                  <li>• Doubles/triples handling (if applicable)</li>
                  <li>• Emergency response and accident procedures</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-600">
                <h3 className="text-2xl font-bold mb-3">Weeks 5-8: Advanced Training & CDL Testing</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 160+ hours of behind-the-wheel driving practice</li>
                  <li>• Interstate and long-distance route planning</li>
                  <li>• Weigh station procedures and DOT inspections</li>
                  <li>• CDL written exam preparation (general knowledge, air brakes, combination vehicles)</li>
                  <li>• CDL skills test practice (pre-trip, basic control, road test)</li>
                  <li>• Job placement assistance and carrier orientation</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-orange-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Licenses & Endorsements Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Class A CDL License</h4>
                    <p className="text-gray-700">Operate tractor-trailers, tankers, flatbeds, and combination vehicles over 26,001 lbs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Air Brakes Endorsement</h4>
                    <p className="text-gray-700">Required for operating vehicles with air brake systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Combination Vehicles Endorsement</h4>
                    <p className="text-gray-700">Operate tractor-trailers and multi-unit combinations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Optional: Tanker, Doubles/Triples, HAZMAT</h4>
                    <p className="text-gray-700">Additional endorsements available for specialized hauling</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Training Equipment</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• Freightliner Cascadia tractors (2020-2023 models)</li>
                  <li>• 53-foot dry van trailers</li>
                  <li>• 10-speed and 13-speed manual transmissions</li>
                  <li>• Automatic transmission options (Eaton UltraShift)</li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>• Electronic Logging Devices (ELD) - Omnitracs, KeepTruckin</li>
                  <li>• GPS navigation systems</li>
                  <li>• Backing cameras and sensors</li>
                  <li>• DOT-compliant safety equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Our Trucking Company Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Guaranteed job offers from major carriers upon graduation</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Schneider National</h3>
                <p className="text-gray-700 mb-2">OTR & Regional Driver</p>
                <p className="text-green-600 font-bold text-lg">$55,000-$75,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Full benefits • Home weekly options • Paid training • $5,000 sign-on bonus</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Swift Transportation</h3>
                <p className="text-gray-700 mb-2">Company Driver - OTR</p>
                <p className="text-green-600 font-bold text-lg">$50,000-$70,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • 401k • Pet policy • Rider program</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Werner Enterprises</h3>
                <p className="text-gray-700 mb-2">Regional & Dedicated Routes</p>
                <p className="text-green-600 font-bold text-lg">$52,000-$72,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Home weekends • Newer equipment • Performance bonuses</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">J.B. Hunt Transport</h3>
                <p className="text-gray-700 mb-2">Intermodal & Dedicated</p>
                <p className="text-green-600 font-bold text-lg">$60,000-$80,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Home daily/weekly • Drop & hook • Excellent benefits</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Prime Inc.</h3>
                <p className="text-gray-700 mb-2">Refrigerated & Flatbed</p>
                <p className="text-green-600 font-bold text-lg">$65,000-$85,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Lease purchase options • Top pay rates • Newer trucks</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Celadon Trucking</h3>
                <p className="text-gray-700 mb-2">OTR & Regional</p>
                <p className="text-green-600 font-bold text-lg">$50,000-$68,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Tuition reimbursement • Flexible home time • Pet friendly</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Roehl Transport</h3>
                <p className="text-gray-700 mb-2">Regional & Home Daily</p>
                <p className="text-green-600 font-bold text-lg">$55,000-$75,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Predictable schedules • Paid orientation • Strong safety culture</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-2">Crete Carrier</h3>
                <p className="text-gray-700 mb-2">OTR & Dedicated</p>
                <p className="text-green-600 font-bold text-lg">$58,000-$78,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Employee-owned • Excellent equipment • Profit sharing</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-2">Local & Regional Carriers</h3>
                <p className="text-gray-700 mb-2">LTL, Food Service, Tanker</p>
                <p className="text-green-600 font-bold text-lg">$45,000-$65,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Home daily • Touchfreight • Local routes in Indianapolis area</p>
              </div>
            </div>

            <div className="mt-12 bg-orange-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Job Placement Guarantee</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Carrier presentations and meet-and-greets</li>
                    <li>• Resume and application assistance</li>
                    <li>• Interview preparation and coaching</li>
                    <li>• Pre-hire letters from multiple carriers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">After Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Direct placement with hiring partners</li>
                    <li>• Orientation and onboarding support</li>
                    <li>• First-year driver mentorship programs</li>
                    <li>• Career advancement opportunities</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-center text-lg font-bold text-gray-800">
                95%+ of our graduates receive job offers before completing training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Entry-Level Company Driver (0-1 year)</h3>
                <p className="text-orange-100 text-lg mb-2">$45,000-$55,000/year</p>
                <p className="text-orange-50">Start with OTR or regional routes. Build experience and safety record. Learn different freight types and routes.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Driver (1-3 years)</h3>
                <p className="text-orange-100 text-lg mb-2">$55,000-$70,000/year</p>
                <p className="text-orange-50">Move to dedicated accounts, specialized freight (tanker, flatbed, refrigerated), or better home-time options. Qualify for performance bonuses.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Specialized or Owner-Operator (3-5 years)</h3>
                <p className="text-orange-100 text-lg mb-2">$70,000-$100,000+/year</p>
                <p className="text-orange-50">HAZMAT, oversized loads, or lease-purchase programs. Owner-operators can earn $150,000+ with their own authority.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Career Advancement Options</h3>
                <p className="text-orange-100 text-lg mb-2">$60,000-$90,000+/year</p>
                <p className="text-orange-50">Transition to driver trainer, safety manager, dispatcher, fleet manager, or operations roles. Many carriers promote from within.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-orange-100 mb-6">
                The trucking industry is facing a driver shortage of 80,000+ drivers. Job security and earning potential have never been better.
              </p>
              <Link href="/apply" className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 shadow-2xl">
                Start Your Trucking Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Career Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Long-Haul Trucking</h3>
                <p className="text-gray-600">Interstate routes with competitive pay and benefits</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
                <p className="text-gray-600">Home daily with regional delivery routes</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialized Transport</h3>
                <p className="text-gray-600">Hazmat, tanker, or oversized load operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Program Requirements</h2>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Must be at least 21 years old (18 for intrastate)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Valid driver's license with clean driving record</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pass DOT physical examination</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pass drug screening and background check</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Commitment to complete all training hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Join the thousands of professional truck drivers earning great pay with excellent benefits
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 text-lg">
                Apply Now
              </Link>
              <Link href="/contact" className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 border-2 border-white text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
