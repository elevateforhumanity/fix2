import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Barber Training Program | Elevate For Humanity',
  description: '100% free barber training program. Learn cutting, styling, and business skills. Get licensed and start your career.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Modern Design */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/patterns/barber-tools.svg')] bg-repeat opacity-20"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6">
                <div className="inline-block px-4 py-2 bg-red-600 rounded-full text-sm font-semibold mb-4">
                  100% Free Training
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Master the Art of
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                    Barbering
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                  Transform your passion into a profession. Learn cutting-edge techniques, build your clientele, and launch your career in just 4-12 weeks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link 
                    href="/apply" 
                    className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-center"
                  >
                    Start Your Journey
                  </Link>
                  <Link 
                    href="#program-details" 
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 text-lg border-2 border-white/30 text-center"
                  >
                    View Curriculum
                  </Link>
                </div>
                <div className="flex items-center gap-6 pt-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>State Licensed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Job Placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Tools Included</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">4-12 Weeks</div>
                          <div className="text-slate-600">Flexible Schedule</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">$0 Cost</div>
                          <div className="text-slate-600">100% Free</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">Licensed</div>
                          <div className="text-slate-600">State Certified</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">1500-Hour Barber Training Program</h2>
            <p className="text-center text-gray-600 mb-8 text-lg">Indiana State Board of Barber Examiners approved curriculum</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
                <h3 className="text-2xl font-bold mb-3">Months 1-3: Fundamentals & Theory (500 hours)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Sanitation, sterilization, and infection control (Indiana State Board requirements)</li>
                  <li>• Anatomy and physiology of hair, skin, and scalp</li>
                  <li>• Hair cutting fundamentals: clipper techniques, scissor-over-comb, fading</li>
                  <li>• Basic hairstyling: blow-drying, brushing, combing techniques</li>
                  <li>• Shampoo and scalp treatments</li>
                  <li>• Professional ethics, customer service, and barbershop conduct</li>
                  <li>• Product knowledge: shampoos, conditioners, styling products</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold mb-3">Months 4-6: Advanced Cutting & Styling (500 hours)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced clipper work: tapers, fades (low, mid, high), skin fades</li>
                  <li>• Scissor techniques: point cutting, slide cutting, texturizing</li>
                  <li>• Beard trimming and shaping (full beards, goatees, mustaches)</li>
                  <li>• Straight razor shaving and hot towel treatments</li>
                  <li>• Men's hairstyling: pompadours, quiffs, slick backs, modern styles</li>
                  <li>• Hair and scalp analysis and treatment</li>
                  <li>• Chemical services: relaxers, texturizers, permanent waves</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
                <h3 className="text-2xl font-bold mb-3">Months 7-9: Color, Business & Client Services (500 hours)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Hair coloring: permanent, semi-permanent, highlights, gray coverage</li>
                  <li>• Color theory and color correction</li>
                  <li>• Facial hair design and line-ups</li>
                  <li>• Client consultation and communication skills</li>
                  <li>• Barbershop management and business operations</li>
                  <li>• Retail sales and product recommendations</li>
                  <li>• State board exam preparation (written and practical)</li>
                  <li>• Portfolio development and job interview skills</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Certifications & Licenses Earned</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Indiana State Barber License</h4>
                    <p className="text-gray-700">Registered with Indiana Professional Licensing Agency (PLA)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Bloodborne Pathogens Certification</h4>
                    <p className="text-gray-700">OSHA-compliant safety training for barbering services</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Milady RISE Certification</h4>
                    <p className="text-gray-700">Client safety and well-being standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-lg mb-1">First Aid & CPR</h4>
                    <p className="text-gray-700">Emergency response certification</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Professional Tools & Products You'll Master</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Cutting Tools:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Wahl, Andis, Oster clippers (cordless & corded)</li>
                    <li>• Professional shears (Mizutani, Kasho, Joewell)</li>
                    <li>• Thinning shears and texturizing scissors</li>
                    <li>• Straight razors and safety razors</li>
                    <li>• Trimmers and edgers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Styling Products:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Pomades (Suavecito, Layrite, Uppercut)</li>
                    <li>• Clays and waxes (Hanz de Fuko, American Crew)</li>
                    <li>• Gels and sprays</li>
                    <li>• Beard oils and balms</li>
                    <li>• Professional shampoos and conditioners</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Color Products:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Permanent hair color (Wella, Redken)</li>
                    <li>• Semi-permanent color</li>
                    <li>• Gray coverage systems</li>
                    <li>• Highlighting products</li>
                    <li>• Color correction techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Barbershop & Salon Partners</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Job placement with Indianapolis area shops and national chains</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Sport Clips</h3>
                <p className="text-gray-700 mb-2">Barber / Stylist</p>
                <p className="text-green-600 font-bold text-lg">$30,000-$45,000/year + tips</p>
                <p className="text-sm text-gray-600 mt-2">Flexible hours • Benefits • Training program • Tips average $5-10/hour</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Great Clips</h3>
                <p className="text-gray-700 mb-2">Licensed Barber</p>
                <p className="text-green-600 font-bold text-lg">$28,000-$42,000/year + tips</p>
                <p className="text-sm text-gray-600 mt-2">Health insurance • 401k • Paid training • Flexible scheduling</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-2">Supercuts</h3>
                <p className="text-gray-700 mb-2">Barber Stylist</p>
                <p className="text-green-600 font-bold text-lg">$27,000-$40,000/year + tips</p>
                <p className="text-sm text-gray-600 mt-2">Paid vacation • Product discounts • Career advancement</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">Independent Barbershops</h3>
                <p className="text-gray-700 mb-2">Chair Rental / Commission</p>
                <p className="text-green-600 font-bold text-lg">$35,000-$60,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Build your clientele • Set your schedule • Higher earning potential</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-2">High-End Barbershops</h3>
                <p className="text-gray-700 mb-2">Master Barber</p>
                <p className="text-green-600 font-bold text-lg">$45,000-$75,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Premium clientele • Higher service prices • Luxury environment</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-2">Mobile Barber Services</h3>
                <p className="text-gray-700 mb-2">Independent Contractor</p>
                <p className="text-green-600 font-bold text-lg">$40,000-$70,000/year</p>
                <p className="text-sm text-gray-600 mt-2">Be your own boss • Flexible schedule • Corporate clients</p>
              </div>
            </div>

            <div className="mt-12 bg-purple-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Career Support Services</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Professional portfolio development</li>
                    <li>• Resume and cover letter writing</li>
                    <li>• Interview skills and mock interviews</li>
                    <li>• State board exam preparation and scheduling</li>
                    <li>• Business plan development for booth rental</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">After Graduation:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Job placement with partner barbershops</li>
                    <li>• Booth rental negotiations and contracts</li>
                    <li>• Client-building strategies and marketing</li>
                    <li>• Continuing education opportunities</li>
                    <li>• Business ownership mentorship</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Progression */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Career Path & Earning Potential</h2>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Entry-Level Barber (0-2 years)</h3>
                <p className="text-purple-100 text-lg mb-2">$28,000-$40,000/year ($13-$19/hour + tips)</p>
                <p className="text-purple-50">Start at chain salons or barbershops. Build skills, speed, and client base. Average 10-15 clients per day.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Experienced Barber (2-5 years)</h3>
                <p className="text-purple-100 text-lg mb-2">$40,000-$60,000/year</p>
                <p className="text-purple-50">Develop loyal clientele. Move to booth rental or commission-based positions. Specialize in fades, beard work, or color. Average 15-20 clients per day.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Master Barber / Booth Owner (5-10 years)</h3>
                <p className="text-purple-100 text-lg mb-2">$60,000-$90,000/year</p>
                <p className="text-purple-50">Rent your own booth or chair. Set your own prices and schedule. Build premium clientele willing to pay $40-$80 per service.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">Shop Owner / Educator (10+ years)</h3>
                <p className="text-purple-100 text-lg mb-2">$75,000-$150,000+/year</p>
                <p className="text-purple-50">Open your own barbershop. Hire and train other barbers. Teach at barber schools. Multiple revenue streams from services, retail, and education.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-purple-100 mb-6">
                The barbering industry is growing 8% annually. With the right skills and business mindset, you can build a six-figure career.
              </p>
              <Link href="/apply" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 shadow-2xl">
                Start Your Barbering Career Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Lives Through Barbering?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Join our next class and start your journey to becoming a licensed barber
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/apply" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 text-lg">
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