// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Users, Briefcase, GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description: "100% free workforce training through WIOA, WRG, and apprenticeships. CNA, HVAC, Barber, CDL and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-emerald-400 uppercase mb-4">
              Indianapolis Workforce Training
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Free Career Training.<br />
              Real Jobs Waiting.
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              100% free training through WIOA, WRG, JRI, and registered apprenticeships. 
              No tuition. No debt. Just real credentials and a clear path to employment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
              >
                Apply Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition"
              >
                View Programs
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              📞 Questions? Call us at <span className="font-semibold text-white">317-314-3757</span>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">100%</div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">4-12</div>
              <div className="text-sm text-slate-600">Weeks to Complete</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">$0</div>
              <div className="text-sm text-slate-600">Out of Pocket</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-1">Real</div>
              <div className="text-sm text-slate-600">Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              High-Demand Career Programs
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from healthcare, skilled trades, business, and more. All programs are 
              connected to real employers and job opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Barber Program */}
            <Link
              href="/programs/barber-apprenticeship"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">💈</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  Barber Apprenticeship
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Earn while you learn. Work in a real barbershop and get paid while completing your 1,500 hours.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    12-18 months
                  </span>
                  <span>•</span>
                  <span>Hybrid</span>
                </div>
              </div>
            </Link>

            {/* CNA Program */}
            <Link
              href="/programs/cna"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🏥</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  CNA / Healthcare
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Fast-track to healthcare. Get certified and start working in hospitals, nursing homes, and clinics.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    4-8 weeks
                  </span>
                  <span>•</span>
                  <span>Hybrid</span>
                </div>
              </div>
            </Link>

            {/* HVAC Program */}
            <Link
              href="/programs/hvac-technician"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-red-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🔧</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  HVAC Technician
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  High-paying skilled trade. Learn heating, cooling, and refrigeration systems with hands-on training.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    8-12 weeks
                  </span>
                  <span>•</span>
                  <span>Hybrid</span>
                </div>
              </div>
            </Link>

            {/* CDL Program */}
            <Link
              href="/programs/cdl"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-yellow-500 to-orange-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🚛</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  CDL / Transportation
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get your commercial driver's license. High demand, good pay, and opportunities nationwide.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    4-6 weeks
                  </span>
                  <span>•</span>
                  <span>In-person</span>
                </div>
              </div>
            </Link>

            {/* Medical Assistant */}
            <Link
              href="/programs/medical-assistant"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-pink-500 to-rose-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">⚕️</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  Medical Assistant
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Work in doctor's offices and clinics. Handle patient care, admin tasks, and medical procedures.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    8-12 weeks
                  </span>
                  <span>•</span>
                  <span>Hybrid</span>
                </div>
              </div>
            </Link>

            {/* Tax & Finance */}
            <Link
              href="/programs/tax-preparation"
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">💼</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition">
                  Tax & Finance
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Start your own tax business. Learn tax prep, bookkeeping, and business setup.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    8-12 weeks
                  </span>
                  <span>•</span>
                  <span>Online</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Funding Pathways */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How You Get Free Training
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We help you access government funding so you can train for free. Most students pay $0 out of pocket.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* WIOA */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WIOA Funding</h3>
              <p className="text-sm text-slate-600 mb-4">
                Federal funding for unemployed or underemployed workers. Covers tuition, books, 
                transportation, and support services.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>100% tuition coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Case management support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Job placement assistance</span>
                </li>
              </ul>
            </div>

            {/* WRG */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Workforce Ready Grant</h3>
              <p className="text-sm text-slate-600 mb-4">
                Indiana residents get 100% free short-term training (4-12 weeks). No income limits. No age limits.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Fast-track certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Hybrid online + hands-on</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Industry credentials</span>
                </li>
              </ul>
            </div>

            {/* Apprenticeships */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Registered Apprenticeships</h3>
              <p className="text-sm text-slate-600 mb-4">
                Earn while you learn. Work in real jobs, get paid, complete online coursework, and graduate with experience.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Get paid while training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Real work experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>No student debt</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/funding"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              Learn More About Funding
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              You're Welcome Here
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand barriers. We work with justice-involved individuals, parents, people starting over, 
              and anyone ready for a better future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Justice-Involved Individuals</h3>
              <p className="text-sm text-slate-700">
                Through our JRI partnership, we provide training, certifications, and wrap-around support 
                at no cost. Everyone deserves a second chance and a clear path to employment.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Parents & Caregivers</h3>
              <p className="text-sm text-slate-700">
                Our hybrid programs let you train online at your own pace and complete hands-on requirements 
                on a flexible schedule. We understand childcare and work challenges.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Career Changers</h3>
              <p className="text-sm text-slate-700">
                Whether you're leaving a dead-end job or starting completely over, our short-term programs 
                (4-12 weeks) get you into a new career fast.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Young Adults</h3>
              <p className="text-sm text-slate-700">
                Skip the debt of traditional college. Get real skills, real credentials, and real jobs 
                in months, not years. Start earning sooner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Future?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Take 2-3 minutes to apply. We'll help you find the right program and funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-emerald-600 bg-white rounded-full hover:bg-slate-50 transition shadow-lg"
            >
              Apply Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
          <p className="mt-6 text-sm text-emerald-100">
            📞 Call us at <span className="font-semibold text-white">317-314-3757</span> — we're here to help.
          </p>
        </div>
      </section>
    </main>
  );
}
