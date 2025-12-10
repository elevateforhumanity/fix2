import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description: "100% free workforce training. CNA, HVAC, Barber, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Video Hero */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full aspect-[16/9] min-h-[500px] md:min-h-[700px] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
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
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all"
            >
              Apply Now
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
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Healthcare */}
            <Link href="/programs/cna" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/highlights/free-training.jpg"
                  alt="Healthcare Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Healthcare</h3>
                <p className="text-slate-600 text-sm">CNA, Medical Assistant, Phlebotomy</p>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/hvac-technician" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/facilities-new/facility-1.jpg"
                  alt="Skilled Trades Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Skilled Trades</h3>
                <p className="text-slate-600 text-sm">HVAC, Building Maintenance, CDL</p>
              </div>
            </Link>

            {/* Beauty & Barbering */}
            <Link href="/programs/barber-apprenticeship" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <Image
                  src="/images/gallery/image7.jpg"
                  alt="Barber Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Beauty & Barbering</h3>
                <p className="text-slate-600 text-sm">Barber, Esthetics, Cosmetology</p>
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">Apply</h3>
              <p className="text-slate-600">Free application. We check if you qualify for government funding (WIOA, WRG, JRI).</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">Train</h3>
              <p className="text-slate-600">Complete your program. Get real credentials. No tuition, no debt.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">Get Hired</h3>
              <p className="text-slate-600">We connect you with employers. Job placement support until you're hired.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-slate-600">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">85%</div>
              <div className="text-slate-600">Job Placement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-slate-600">Hiring Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">$45K</div>
              <div className="text-slate-600">Avg Starting Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8">Apply now and begin training within 2 weeks</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Apply Now
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
