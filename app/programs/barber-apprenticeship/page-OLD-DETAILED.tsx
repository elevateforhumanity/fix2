import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Barber Apprenticeship – State-Licensed, Federally Aligned | Elevate For Humanity",
  description: "Become a licensed barber through a federal and state-aligned apprenticeship program. Earn while you learn without student loan debt.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/efh-barber-hero.jpg"
            alt="Barber Apprenticeship Training"
            fill
            className="object-cover"
            priority 
            quality={85} 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/85 to-slate-900/90" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              Barber Apprenticeship
            </h1>
            <p className="text-2xl mb-4 drop-shadow-lg font-semibold">
              State-Licensed, Federally Aligned
            </p>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Become a licensed barber through a federal and state–aligned apprenticeship program that combines classroom training, hands-on shop experience, and job placement support—without taking on student loan debt.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl transition-all"
              >
                Apply for Barber Apprenticeship
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl transition-all"
              >
                Talk With an Advisor
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
              <div className="text-3xl font-bold text-purple-600 mb-2">1,500 Hours</div>
              <div className="text-gray-600">Program Length</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Earn & Learn</div>
              <div className="text-gray-600">Paid Training</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">RAPIDS</div>
              <div className="text-gray-600">DOL Registered</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">WIOA/WRG</div>
              <div className="text-gray-600">Fundable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Program Overview</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The Elevate for Humanity Barber Apprenticeship is a <strong>Registered Apprenticeship program</strong> aligned with U.S. Department of Labor standards and Indiana state licensure requirements. Apprentices earn while they learn in a professional barbershop environment while completing the hours, skills, and exams needed to become a licensed barber.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Program Details</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Format:</strong> Classroom + on-the-job training</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Length:</strong> 1,500-hour program (meets Indiana licensing requirements)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Location:</strong> Indianapolis and partner barbershops</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Funding:</strong> WIOA, Workforce Ready Grant (where eligible), JRI, and employer sponsorship</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Classic and modern haircutting, fades, tapers, and beard design</li>
                    <li>• Shaving, lining, and grooming services</li>
                    <li>• Sanitation, infection control, and state board standards</li>
                    <li>• Client consultation and customer service</li>
                    <li>• Shop management, booking, and retail basics</li>
                    <li>• Entrepreneurship and suite ownership fundamentals</li>
                    <li>• State licensing exam preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Why This Apprenticeship Is Different</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-3">DOL Registered Apprenticeship</h3>
                <p className="text-gray-700">Listed in RAPIDS and aligned to federal standards</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-3">ETPL-Approved & Fundable</h3>
                <p className="text-gray-700">Eligible for WIOA and Workforce Ready Grant where applicable</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-3">Supports JRI Populations</h3>
                <p className="text-gray-700">Structured to work with justice-involved individuals who qualify for JRI funding</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
                <h3 className="text-xl font-bold mb-3">Earn While You Learn</h3>
                <p className="text-gray-700">Opportunities for paid apprenticeship hours with partner shops</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                <h3 className="text-xl font-bold mb-3">Real Job Pipeline</h3>
                <p className="text-gray-700">Employer partners ready to hire licensed barbers and suite owners</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
                <h3 className="text-xl font-bold mb-3">Flexible Career Path</h3>
                <p className="text-gray-700">Work in shops, open your own suite, or build a mobile business</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Who This Program Is For</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold mb-2">Career-Focused Adults</h3>
                  <p className="text-gray-700">Adults and young adults serious about a barbering career</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold mb-2">Skilled Trade Seekers</h3>
                  <p className="text-gray-700">Individuals seeking a skilled trade with strong earning potential</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold mb-2">Justice-Involved Individuals</h3>
                  <p className="text-gray-700">JRI participants looking for a fresh start and stable career</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold mb-2">Entrepreneurs</h3>
                  <p className="text-gray-700">People who want long-term, flexible, entrepreneurship-friendly work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How to Get Started</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Apply for Free Training</h3>
                <p className="text-gray-700">Complete our quick online application</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Meet With an Advisor</h3>
                <p className="text-gray-700">We review your goals, background, and funding options</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Funding</h3>
                <p className="text-gray-700">We work with WorkOne, WRG, and JRI partners to cover tuition</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Begin Your Apprenticeship</h3>
                <p className="text-gray-700">Start training in class and in the shop with support from Elevate</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/efh-barber-card.jpg"
            alt="Start your barber career"
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 to-red-700/95" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Barber Career?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Apply today for free training through WIOA, WRG, or JRI funding
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
              >
                Apply for Barber Apprenticeship
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Talk With an Advisor
              </Link>
            </div>
            
            <p className="text-white/90 mt-8 text-sm">
              Questions? Call <a href="tel:317-314-3757" className="underline font-semibold hover:text-white">317-314-3757</a> or email <a href="mailto:elevateforhumanity.edu@gmail.com" className="underline font-semibold hover:text-white">elevateforhumanity.edu@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
