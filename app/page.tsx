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

        {/* Featured Programs with Images */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Our Training Programs
              </h2>
              <p className="text-xl text-slate-600">
                Fast-track your career with hands-on training in high-demand
                fields
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* CNA Program */}
              <Link href="/programs/cna" className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/media/programs/cna.jpg"
                      alt="CNA Training Program"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">
                      Healthcare
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Certified Nursing Assistant
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span>6-8 weeks</span>
                      <span>•</span>
                      <span>$32K+ starting</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* HVAC Program */}
              <Link href="/programs/hvac" className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/media/programs/hvac.jpg"
                      alt="HVAC Training Program"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-orange-600 mb-2">
                      Skilled Trades
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      HVAC Technician
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span>12 weeks</span>
                      <span>•</span>
                      <span>$48K+ starting</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Barber Program */}
              <Link href="/programs/barber" className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/media/programs/barber.jpg"
                      alt="Barber Apprenticeship Program"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-purple-600 mb-2">
                      Skilled Trades
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Barber Apprenticeship
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span>12-18 months</span>
                      <span>•</span>
                      <span>$35K+ starting</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* CDL Program */}
              <Link href="/programs/truck-driving" className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/media/programs/cdl.jpg"
                      alt="CDL Training Program"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-green-600 mb-2">
                      Transportation
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Commercial Truck Driving
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span>4 weeks</span>
                      <span>•</span>
                      <span>$55K+ starting</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-lg transition-all"
              >
                View All Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Real Students, Real Success
              </h2>
              <p className="text-xl text-slate-600">
                See what our graduates are saying about their training
                experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Success Story 1 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src="/media/testimonials/student1.jpg"
                    alt="CNA Graduate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    "I went from no job to working at a hospital in just 8
                    weeks. The training was hands-on and the job placement team
                    got me interviews before I even graduated."
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">Sarah M.</div>
                    <div className="text-slate-600">CNA Graduate</div>
                  </div>
                </div>
              </div>

              {/* Success Story 2 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src="/media/programs/barber.jpg"
                    alt="Barber Apprentice"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    "I'm earning money while I learn. My mentor taught me the
                    business side too. Now I'm planning to open my own shop next
                    year."
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">
                      Marcus J.
                    </div>
                    <div className="text-slate-600">Barber Apprentice</div>
                  </div>
                </div>
              </div>

              {/* Success Story 3 */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src="/media/testimonials/student3.jpg"
                    alt="HVAC Graduate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    "Best decision I ever made. I doubled my income and have job
                    security. Companies are constantly calling me with
                    opportunities."
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">David R.</div>
                    <div className="text-slate-600">HVAC Graduate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workforce Funding */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Free Training Through Workforce Funding
                </h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Most students pay $0 for training through WIOA, WRG, and JRI
                  programs. We handle all the paperwork.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 bg-slate-50 rounded-lg p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WIOA Funding</h3>
                      <p className="text-slate-600 text-sm">
                        Covers full tuition for eligible students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-slate-50 rounded-lg p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Workforce Ready Grant (WRG)
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Up to $5,000 for high-demand careers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-slate-50 rounded-lg p-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Job Ready Indiana (JRI)
                      </h3>
                      <p className="text-slate-600 text-sm">
                        State-funded training for career advancement
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all"
                >
                  Check Your Eligibility
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border-2 border-blue-100">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        $0
                      </div>
                      <div className="text-sm text-slate-700">
                        Average Cost for Students
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-100">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        $5K
                      </div>
                      <div className="text-sm text-slate-700">
                        Max WRG Grant
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border-2 border-purple-100">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        100%
                      </div>
                      <div className="text-sm text-slate-700">
                        WIOA Coverage
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border-2 border-orange-100">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        2 min
                      </div>
                      <div className="text-sm text-slate-700">
                        Application Time
                      </div>
                    </div>
                  </div>
                </div>
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
