import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Accreditation, Approvals & Funding Partners | Elevate For Humanity",
  description: "Federal, state, and workforce board approvals. RAPIDS registered, ETPL approved, WIOA and WRG fundable programs.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Accreditation and Approvals"
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
              Accreditation, Approvals & Workforce Partners
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Elevate for Humanity Technical & Career Institute is built to meet federal, state, and workforce board standards so that our students can access free or low-cost training with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Federal & Apprenticeship Alignment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Federal & Apprenticeship Alignment</h2>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4">U.S. Department of Labor Registered Apprenticeship Sponsor</h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Programs listed in <strong>RAPIDS</strong> with active apprenticeship pathways in selected occupations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apprenticeship models built around <strong>earn-while-you-learn</strong> training and employer partnerships</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* State Workforce Alignment */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">State Workforce Alignment (Indiana)</h2>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 border-l-4 border-green-600 mb-8">
              <h3 className="text-2xl font-bold mb-4">Eligible Training Provider List (ETPL) Approved Provider</h3>
              <p className="text-gray-700 text-lg mb-4">Programs fundable through:</p>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>WIOA</strong> (Workforce Innovation and Opportunity Act)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Workforce Ready Grant / Next Level Jobs (WRG)</strong> for eligible short-term programs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>JRI (Justice Reinvestment Initiative)</strong> and re-entry-focused partners</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Active Workforce Partnerships</h3>
              <p className="text-gray-700 text-lg">
                Active collaboration with <strong>WorkOne</strong>, <strong>EmployIndy</strong>, and regional workforce boards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Program Categories Covered</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                <h3 className="text-xl font-bold mb-3">Healthcare</h3>
                <p className="text-gray-700">CNA, Medical Assistant, Phlebotomy, EKG (where approved)</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
                <h3 className="text-xl font-bold mb-3">Skilled Trades</h3>
                <p className="text-gray-700">HVAC, Building Maintenance, Welding (where applicable)</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold mb-3">Transportation & Logistics</h3>
                <p className="text-gray-700">CDL, Warehouse/Logistics</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
                <h3 className="text-xl font-bold mb-3">Beauty & Barber</h3>
                <p className="text-gray-700">Barber Apprenticeship and beauty pathways (WIOA fundable)</p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Student Protections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Compliance & Student Protections</h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 text-lg mb-6">
                Elevate for Humanity is committed to:
              </p>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Transparent tuition and fee structures</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Non-discrimination and equal opportunity in all programs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Accessible services for individuals with disabilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Trauma-informed and student-centered support</span>
                </li>
              </ul>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  For official documentation, policies, and legal notices, visit our <Link href="/docs" className="text-red-600 font-semibold hover:underline">Documents</Link> and <Link href="/terms-of-service" className="text-red-600 font-semibold hover:underline">Legal</Link> pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-banner.jpg"
            alt="Apply for approved training"
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
              Ready to Start Approved Training?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Apply for free training through federally and state-approved programs
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link 
                href="/programs" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                View Programs
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
