import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, DollarSign, Briefcase, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "For Learners - Free Career Training | Elevate for Humanity",
  description: "Get free career training in healthcare, skilled trades, CDL, and barbering. 100% funded through WIOA, JRI, and workforce grants. No tuition, no debt.",
  keywords: ["free training", "career training", "WIOA", "workforce development", "job training", "career change"],
  openGraph: {
    title: "For Learners - Free Career Training | Elevate for Humanity",
    description: "Get free career training in healthcare, skilled trades, CDL, and barbering. No tuition, no debt.",
    images: ["/images/hero-banner-new.png"],
    type: "website",
  },
};

export default function LearnersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            For Learners
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Path to a Better Career Starts Here
          </h1>
          <p className="text-xl text-emerald-50 mb-8 max-w-3xl">
            Get certified in high-demand careers with 100% funded training. No tuition. No debt. Just real skills that lead to real jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition shadow-lg"
            >
              Check Your Eligibility
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-700 text-white rounded-xl font-semibold hover:bg-emerald-800 transition border-2 border-white/20"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Elevate */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Choose Elevate for Humanity?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">100% Funded Training</h3>
              <p className="text-slate-600">
                No tuition costs for eligible participants. Training is covered through WIOA, JRI, WRG, and other workforce grants.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Job Placement Support</h3>
              <p className="text-slate-600">
                85% job placement rate within 6 months. We connect you with employers who are actively hiring.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Dedicated Support</h3>
              <p className="text-slate-600">
                From enrollment to employment, our team provides coaching, barrier navigation, and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Apply</h3>
              <p className="text-slate-600">
                Complete our simple eligibility check to see which programs you qualify for.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Enroll</h3>
              <p className="text-slate-600">
                Work with our team to choose your program and secure funding through WIOA or other grants.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Train</h3>
              <p className="text-slate-600">
                Complete your training with hands-on experience, dedicated instructors, and ongoing support.
              </p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Get Hired</h3>
              <p className="text-slate-600">
                Connect with employers, ace your interviews, and start your new career with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Popular Training Programs
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Choose from healthcare, skilled trades, CDL, barbering, and more. All programs lead to industry-recognized certifications.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Medical Assistant", duration: "16-24 weeks", path: "/programs/medical-assistant" },
              { name: "HVAC Technician", duration: "4-9 months", path: "/programs/hvac" },
              { name: "Barber Apprenticeship", duration: "12-18 months", path: "/programs/barber" },
              { name: "CNA Certification", duration: "4-6 weeks", path: "/programs/cna" },
              { name: "CDL Training", duration: "4-8 weeks", path: "/programs/cdl" },
              { name: "Phlebotomy", duration: "6-8 weeks", path: "/programs/phlebotomy" },
            ].map((program) => (
              <Link
                key={program.name}
                href={program.path}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{program.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{program.duration}</p>
                <span className="text-red-600 font-medium text-sm flex items-center gap-2">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
            >
              View All Programs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 px-6 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
            Am I Eligible?
          </h2>
          <div className="bg-white rounded-xl border border-red-200 p-8">
            <p className="text-lg text-slate-700 mb-6">
              You may qualify for free training if you meet any of these criteria:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Low-income adult or family",
                "Dislocated worker (laid off, plant closure)",
                "Youth ages 16-24 with barriers to employment",
                "Veteran or individual with disabilities",
                "Justice-involved / re-entry participant",
                "Receiving public assistance (SNAP, TANF, etc.)",
                "Long-term unemployed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Check My Eligibility Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of students who have transformed their careers through our training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
