import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description: "100% free workforce training. CNA, HVAC, Beauty, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Video Hero - No poster */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full aspect-[16/9] min-h-[500px] md:min-h-[700px] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-home.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Breaking Barriers, Building Futures
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            We see your potential, not your past. 100% free career training through government funding. 
            No tuition. No debt. Real credentials. Real jobs waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white border-2 border-slate-900 rounded-lg hover:bg-slate-50 transition-all"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Healthcare */}
            <Link href="/programs/medical-assistant" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/healthcare/hero-program-medical-assistant.jpg"
                  alt="Healthcare Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Healthcare</h3>
                <p className="text-slate-600 text-sm">Medical Assistant, CPR, Emergency Health & Safety</p>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/courses/hvac-technician-10002289-cover.jpg"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
                <p className="text-slate-600 text-sm">HVAC Technician</p>
              </div>
            </Link>


          </div>

          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
            >
              View All Programs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help You Succeed */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Short-Term Training, Real Credentials</h2>
          <p className="text-xl text-center text-slate-300 mb-4">
            Our hybrid programs combine online learning with hands-on training. Most programs take 4-12 weeks, not years.
          </p>
          <p className="text-lg text-center text-orange-400 mb-12 font-semibold">
            100% FREE if you qualify for government funding.
          </p>
          
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-green-400">WRG - Workforce Ready Grant</h3>
                  <p className="text-slate-300 mb-2">
                    Indiana residents get 100% FREE short-term training (4-12 weeks). Study online at your own pace, 
                    complete hands-on requirements, earn industry credentials. No income limits. No age limits.
                  </p>
                  <p className="text-sm text-slate-400">Examples: CNA, HVAC, CDL, Medical Assistant</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-blue-400">WIOA - Workforce Innovation</h3>
                  <p className="text-slate-300 mb-2">
                    Federal funding for unemployed or underemployed workers. Covers tuition, books, transportation, 
                    and support services. Hybrid format: online coursework + in-person skills training. Get certified fast.
                  </p>
                  <p className="text-sm text-slate-400">Timeline: 4-16 weeks depending on program</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-orange-400">Registered Apprenticeships</h3>
                  <p className="text-slate-300 mb-2">
                    Longer programs (12-18 months) where you earn while you learn. Work in real jobs, get paid, 
                    complete online coursework, and graduate with experience + credentials. No student debt.
                  </p>
                  <p className="text-sm text-slate-400">Examples: HVAC Technician, Building Maintenance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-slate-300 mb-4">Not sure which path is right for you?</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8">Contact us and begin training within 2 weeks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 border-2 border-white transition-all"
            >
              Talk to Advisor
            </Link>
          </div>
          <p className="mt-6 text-white/90">
            Questions? Call <a href="tel:3173143757" className="font-bold underline">317-314-3757</a>
          </p>
        </div>
      </section>
    </main>
  );
}
