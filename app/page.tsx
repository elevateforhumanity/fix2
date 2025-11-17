import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Star,
} from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Enterprise LMS Style */}
        <section className="relative bg-gradient-to-br from-slate-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
                  Close workforce gaps faster with DOL-aligned Elevate
                </h1>

                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Need workforce training backed by industry-leading compliance
                  and partners? Your best student, employer, and agency
                  experience awaits.
                </p>

                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg transition-all text-lg"
                >
                  Get Started
                </Link>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/media/hero/homepage.jpg"
                    alt="Workforce training in action"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">
                  U.S. DOL
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">
                  DWD Indiana
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Briefcase className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">
                  WorkOne
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">
                  EmployIndy
                </span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-slate-600 mb-2" />
                <span className="text-sm font-semibold text-slate-700">
                  ETPL Approved
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Make Strategic Learning Your Advantage */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Make workforce training your advantage
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Equip your community with the key pillars of a future-proof
                workforce development experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Bridge Gaps */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Bridge Gaps
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Close skill gaps faster with DOL-registered apprenticeships
                  and ETPL-approved programs.
                </p>
              </div>

              {/* Engage Learners */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Engage Learners
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Hands-on training in real facilities with industry partners
                  and job placement support.
                </p>
              </div>

              {/* Reduce Admin */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Reduce Admin
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Automated reporting for WorkOne, EmployIndy, and DWD with
                  seamless compliance tracking.
                </p>
              </div>

              {/* Reliable Support */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Reliable Support
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Dedicated support for students, employers, and workforce
                  agencies throughout the journey.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg transition-all text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions for Every Learning Program */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Programs for every workforce need
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Healthcare */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Healthcare
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  CNA training with state certification and immediate job
                  placement in hospitals and nursing homes.
                </p>
                <Link
                  href="/programs/cna"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Skilled Trades */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Skilled Trades
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  HVAC, Barber, and Building Maintenance programs with
                  DOL-registered apprenticeships.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Transportation */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Transportation
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  CDL Class A training in 4 weeks with companies offering
                  sign-on bonuses up to $10K.
                </p>
                <Link
                  href="/programs/truck-driving"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
                >
                  Explore Program
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Employers */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  For Employers
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Host apprentices, access OJT/WEX programs, and build your
                  skilled talent pipeline.
                </p>
                <Link
                  href="/employers"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Agencies */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  For Agencies
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  ETPL, WRG, WIOA, and JRI compliance with automated reporting
                  for WorkOne and EmployIndy.
                </p>
                <Link
                  href="/agencies"
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                >
                  Agency Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* For Students */}
              <div className="bg-white rounded-xl p-8 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  For Students
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Free training through WIOA, hands-on learning, and job
                  placement assistance.
                </p>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to start your workforce training?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Apply now to see if you qualify for free training through WIOA,
              WRG, or JRI.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-12 py-5 rounded-lg text-lg transition-all"
            >
              Apply Now
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-6 text-blue-100 text-sm">
              Takes 2 minutes • No commitment required • Find out if you qualify
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
