"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* VIDEO HERO */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[600px] overflow-hidden bg-gradient-to-br from-orange-500 to-blue-600">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-home.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">4-12</div>
              <div className="text-sm text-slate-600">Weeks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">$0</div>
              <div className="text-sm text-slate-600">Tuition</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">Real</div>
              <div className="text-sm text-slate-600">Jobs</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Popular Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">Earn while you learn. 12-18 months.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <span className="text-6xl">🏥</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">Fast-track certification. 4-8 weeks.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-6xl">🛠️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">High-paying trade. 8-12 weeks.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply</h3>
              <p className="text-slate-600">Quick 2-minute application</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Train</h3>
              <p className="text-slate-600">4-12 weeks. 100% free.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Work</h3>
              <p className="text-slate-600">Real jobs. Real credentials.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Most students qualify for 100% free training through WIOA, WRG, or apprenticeships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-600 bg-white rounded-lg hover:bg-slate-50 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg hover:bg-white/20 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
          <p className="mt-6 text-sm text-orange-100">
            📞 Call us at <span className="font-semibold text-white">317-314-3757</span>
          </p>
        </div>
      </section>
    </main>
  );
}
