import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "HVAC Technician Training | Elevate For Humanity",
  description: "100% free HVAC training program. Learn heating, ventilation, and air conditioning systems. Get certified and start your career.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/programs/hvac-hero.jpg"
            alt="HVAC Technician Training"
            fill
            className="object-cover"
            priority quality={95} sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">HVAC Technician Training</h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              100% free training. Learn heating, ventilation, and air conditioning systems. Get certified and start your career.
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
              <div className="text-3xl font-bold text-orange-600 mb-2">8-12 Weeks</div>
              <div className="text-gray-600">Program Duration</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
              <div className="text-gray-600">100% Funded</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">90%+</div>
              <div className="text-gray-600">Job Placement</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$45K+</div>
              <div className="text-gray-600">Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Program Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Program Overview */}
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-8">Complete HVAC Training Program</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Our 8-12 week intensive HVAC program trains you on residential and commercial heating, cooling, and ventilation systems. You'll work hands-on with Carrier, Trane, Lennox, and Rheem equipment in our 5,000 sq ft training facility.
                  </p>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Train Monday-Friday, 8am-4pm with evening classes available. Small class sizes (max 12 students) ensure personalized instruction from EPA-certified master technicians with 15+ years field experience.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Certifications Earned:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      <span className="text-lg">EPA 608 Universal Certification (required by law)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      <span className="text-lg">OSHA 10-Hour Safety Certification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      <span className="text-lg">R-410A Refrigerant Handling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      <span className="text-lg">Electrical Safety & NEC Code</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week by Week Curriculum */}
            <div className="mb-16">
              <h3 className="text-3xl font-extrabold mb-8">Week-by-Week Training Schedule</h3>
              <div className="space-y-4">
                <div className="bg-white border-l-4 border-orange-600 p-6 shadow-lg rounded-r-xl">
                  <h4 className="text-xl font-bold mb-2">Weeks 1-2: HVAC Fundamentals</h4>
                  <p className="text-gray-700 mb-2">Learn psychrometrics, heat transfer, refrigeration cycle, and system components. Study residential split systems, package units, and ductwork design.</p>
                  <p className="text-sm text-gray-600">Tools: Manifold gauges, digital multimeters, refrigerant scales</p>
                </div>
                
                <div className="bg-white border-l-4 border-orange-600 p-6 shadow-lg rounded-r-xl">
                  <h4 className="text-xl font-bold mb-2">Weeks 3-4: Electrical Systems</h4>
                  <p className="text-gray-700 mb-2">Master electrical circuits, contactors, relays, transformers, and control boards. Read wiring diagrams and troubleshoot electrical failures using multimeters and amp clamps.</p>
                  <p className="text-sm text-gray-600">Tools: Wire strippers, voltage testers, circuit analyzers</p>
                </div>
                
                <div className="bg-white border-l-4 border-orange-600 p-6 shadow-lg rounded-r-xl">
                  <h4 className="text-xl font-bold mb-2">Weeks 5-6: Installation & Service</h4>
                  <p className="text-gray-700 mb-2">Install complete residential systems including condensers, air handlers, thermostats, and ductwork. Practice brazing copper lines, pulling vacuum, and charging systems with R-410A refrigerant.</p>
                  <p className="text-sm text-gray-600">Tools: Torch sets, vacuum pumps, recovery machines, leak detectors</p>
                </div>
                
                <div className="bg-white border-l-4 border-orange-600 p-6 shadow-lg rounded-r-xl">
                  <h4 className="text-xl font-bold mb-2">Weeks 7-8: Troubleshooting & Repair</h4>
                  <p className="text-gray-700 mb-2">Diagnose and repair common failures: compressor issues, refrigerant leaks, airflow problems, and control malfunctions. Work on real service calls in our simulated home environment.</p>
                  <p className="text-sm text-gray-600">Tools: Temperature probes, airflow meters, combustion analyzers</p>
                </div>

                <div className="bg-white border-l-4 border-orange-600 p-6 shadow-lg rounded-r-xl">
                  <h4 className="text-xl font-bold mb-2">Weeks 9-10: Commercial Systems (Optional)</h4>
                  <p className="text-gray-700 mb-2">Learn rooftop units, chillers, boilers, and building automation systems. Study 3-phase power, VFD drives, and commercial refrigeration.</p>
                  <p className="text-sm text-gray-600">Equipment: 5-ton RTU, 20-ton chiller, DDC controls</p>
                </div>
              </div>
            </div>

            {/* Job Placement Details */}
            <div className="mb-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10">
              <h3 className="text-3xl font-extrabold mb-8">Real Jobs with Real Companies</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-2xl font-bold mb-4">Hiring Partners:</h4>
                  <ul className="space-y-2 text-lg">
                    <li>• Carrier Enterprise - Starting $22/hr</li>
                    <li>• Trane Technologies - $45K-$55K/year</li>
                    <li>• Service Experts - $48K + commission</li>
                    <li>• Local HVAC contractors - $20-$28/hr</li>
                    <li>• Property management companies</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-4">Job Titles:</h4>
                  <ul className="space-y-2 text-lg">
                    <li>• HVAC Installation Technician</li>
                    <li>• Service Technician</li>
                    <li>• Maintenance Mechanic</li>
                    <li>• Refrigeration Technician</li>
                    <li>• Building Maintenance Engineer</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <p className="text-xl font-semibold mb-2">Career Growth Path:</p>
                <p className="text-lg text-gray-700">Entry Level ($45K) → Journeyman ($55K-$65K in 2-3 years) → Master Tech ($70K-$85K in 5 years) → Service Manager ($80K-$100K+)</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-orange-50 rounded-3xl p-10">
              <h3 className="text-3xl font-extrabold mb-8">Everything Included - $0 Cost to You</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3">Training Materials</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Textbooks & manuals</li>
                    <li>• Tool kit (yours to keep)</li>
                    <li>• Safety equipment</li>
                    <li>• Online resources</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3">Certifications</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• EPA 608 exam & card</li>
                    <li>• OSHA 10 certification</li>
                    <li>• All testing fees</li>
                    <li>• License applications</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3">Job Support</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Resume writing</li>
                    <li>• Interview coaching</li>
                    <li>• Job placement assistance</li>
                    <li>• Employer connections</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-600 to-red-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-extrabold mb-6">Start Your $45K+ HVAC Career</h2>
            <p className="text-2xl mb-10">Next class starts in 2 weeks. Apply today - spots fill fast!</p>
            <Link href="/apply" className="inline-block bg-white text-orange-600 px-12 py-6 rounded-full font-bold hover:bg-orange-50 text-xl shadow-2xl hover:scale-105 transition-all">
              Apply Now - 100% Free Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
