import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Funding Programs | Elevate For Humanity",
  description: "Free training through WIOA, WRG, Apprenticeships, and JRI funding programs.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Banner */}
      <section className="relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt="Funding Programs"
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
              100% Free Training Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
              Your training is funded through government workforce development programs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link 
                href="/programs" 
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 text-lg shadow-2xl transition-all"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Available Funding Programs</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* WIOA */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white">WIOA</h3>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Workforce Innovation & Opportunity Act</h3>
                  <p className="text-gray-700 mb-4">
                    Federal funding for job training and employment services. Covers tuition, materials, and support services.
                  </p>
                  <Link 
                    href="/funding/wioa" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* WRG */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white">WRG</h3>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Workforce Ready Grant</h3>
                  <p className="text-gray-700 mb-4">
                    Indiana state funding for high-demand career training. Covers tuition and fees for eligible programs.
                  </p>
                  <Link 
                    href="/funding/wrg" 
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Apprenticeships */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">Apprenticeships</h3>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Registered Apprenticeships</h3>
                  <p className="text-gray-700 mb-4">
                    Earn while you learn. Get paid on-the-job training while building skills toward certification.
                  </p>
                  <Link 
                    href="/programs/barber-apprenticeship" 
                    className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition-all"
                  >
                    View Programs
                  </Link>
                </div>
              </div>

              {/* JRI */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <h3 className="text-4xl font-bold text-white">JRI</h3>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Justice Reinvestment Initiative</h3>
                  <p className="text-gray-700 mb-4">
                    Reentry support and job training for justice-involved individuals. Includes stipends and wraparound services.
                  </p>
                  <Link 
                    href="/funding/jri" 
                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How Funding Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Apply</h3>
                <p className="text-gray-700">
                  Submit your application and we'll help determine which funding program you qualify for
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Approved</h3>
                <p className="text-gray-700">
                  We handle the paperwork and funding approval process for you
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-600">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Start Training</h3>
                <p className="text-gray-700">
                  Begin your free training with all costs covered by the funding program
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
            alt="Apply for free training"
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
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Apply today and we'll help you access free training through available funding programs
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/apply" 
                className="bg-white text-red-600 px-10 py-5 rounded-full font-bold hover:bg-red-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold hover:bg-white/20 border-2 border-white text-lg shadow-2xl transition-all"
              >
                Contact Us
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
