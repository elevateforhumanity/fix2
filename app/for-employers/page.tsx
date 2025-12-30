import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Phone,
  ArrowRight,
  Briefcase,
  Award,
  TrendingUp,
  Building2,
  Target,
  Zap
} from 'lucide-react';
import {
  Container,
  Section,
  Button,
  Card,
} from '@/components/ui/design-system';

export const metadata: Metadata = {
  title: 'For Employers | Hire Trained Workers | No Fees',
  description:
    'Hire job-ready workers trained in healthcare, skilled trades, and technology. No recruiting fees. Build apprenticeship programs.',
};

export default function ForEmployersPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-orange-900 text-white py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
            alt="Business team"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Animated Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-orange-500/30 mb-6">
              <Building2 className="w-5 h-5 text-orange-400" />
              <span className="text-orange-100 font-semibold">For Employers & Hiring Managers</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-tight">
              Hire Trained Workers.
              <span className="block text-orange-400">No Recruiting Fees.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-100 mb-8">
              Access job-ready candidates with industry credentials
            </p>
            <p className="text-xl text-gray-200 mb-10 max-w-3xl">
              We train workers in healthcare, skilled trades, and technology. You get pre-screened, certified candidates at zero cost.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-5 text-lg font-black text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 uppercase"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#benefits"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border-3 border-white bg-white/10 backdrop-blur-sm px-10 py-5 text-lg font-black text-white hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 uppercase"
              >
                Learn More
                <Briefcase className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <DollarSign className="w-10 h-10 text-green-400 mb-2" />
                <div className="text-2xl font-black mb-1">No Fees</div>
                <div className="text-sm text-gray-200">Zero Cost Hiring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Users className="w-10 h-10 text-blue-400 mb-2" />
                <div className="text-2xl font-black mb-1">Pre-Screened</div>
                <div className="text-sm text-gray-200">Qualified Candidates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Award className="w-10 h-10 text-yellow-400 mb-2" />
                <div className="text-2xl font-black mb-1">Certified</div>
                <div className="text-sm text-gray-200">Industry Ready</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Zap className="w-10 h-10 text-orange-400 mb-2" />
                <div className="text-2xl font-black mb-1">Fast</div>
                <div className="text-sm text-gray-200">Quick Placement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PROBLEMS WE SOLVE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Three Problems We Solve
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can't Find Qualified Workers
              </h3>
              <p className="text-slate-700 mb-4">
                We train them for you in high-demand fields
              </p>
              <div className="text-green-600 font-semibold">
                → Pre-screened candidates with credentials
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can't Afford Recruiting Fees
              </h3>
              <p className="text-slate-700 mb-4">
                No placement fees, no contracts required
              </p>
              <div className="text-green-600 font-semibold">
                → Direct hire, zero fees
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Can't Wait 6 Months
              </h3>
              <p className="text-slate-700 mb-4">
                Candidates ready in 2-4 weeks after training
              </p>
              <div className="text-green-600 font-semibold">
                → Average time-to-hire: 14 days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET (ROI) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            What You Get
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Pre-Screened Candidates with Industry Credentials
                </h3>
                <p className="text-slate-700">
                  Every candidate has completed training and earned recognized
                  certifications (CNA, HVAC, CDL, etc.)
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Average Time-to-Hire: 14 Days
                </h3>
                <p className="text-slate-700">
                  vs. 42 days industry average. We match you with qualified
                  candidates fast.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Optional Apprenticeship Programs with Wage Reimbursement
                </h3>
                <p className="text-slate-700">
                  Build your own talent pipeline. Potential wage reimbursement +
                  federal tax credits available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Call Us
                </h3>
                <p className="text-slate-700">
                  Tell us what positions you need to fill and what skills you're
                  looking for.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  We Match Candidates
                </h3>
                <p className="text-slate-700">
                  Pre-screened, credential-verified workers ready to interview.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  You Interview
                </h3>
                <p className="text-slate-700">
                  Direct hire, no placement fees, no contracts.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  We Support Onboarding
                </h3>
                <p className="text-slate-700">
                  Optional apprenticeship setup and ongoing support available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPRENTICESHIP OPTION */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
            Want to Train Your Own Workers?
          </h2>
          <p className="text-xl text-center text-slate-700 mb-12">
            Build a registered apprenticeship program with our support
          </p>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  What We Provide
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      One simple MOU (agreement)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      One transparent wage schedule
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      One point of contact (no runaround)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Potential wage reimbursement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">
                      Federal tax credit eligibility
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Why This Works
                </h3>
                <div className="space-y-4 text-slate-700">
                  <p>
                    <strong className="text-slate-900">
                      Simple = Scalable.
                    </strong>{' '}
                    One MOU, one schedule, one contact. That's how you build a
                    talent pipeline.
                  </p>
                  <p>
                    <strong className="text-slate-900">
                      Business Language.
                    </strong>{' '}
                    We translate workforce policy into business value. You hear
                    "funded training" and "tax credits," not jargon.
                  </p>
                  <p>
                    <strong className="text-slate-900">Fast Activation.</strong>{' '}
                    No 6-month onboarding. Sign MOU, get checklist, start
                    hosting apprentices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF (METRICS) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Proven Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                200+
              </div>
              <div className="text-slate-700 text-lg">Employer Partners</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                1,500+
              </div>
              <div className="text-slate-700 text-lg">
                Workers Placed Since 2020
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-slate-700 text-lg">
                Retention After 6 Months
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONE CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Talk About Your Hiring Needs
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Call us to discuss open positions, apprenticeship programs, or
            workforce development goals.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-lg font-bold text-xl hover:bg-purple-50 transition shadow-2xl"
          >
            <Phone className="h-6 w-6" />
            Call (317) 314-3757
          </a>
          <p className="mt-6 text-purple-100">
            Or email{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="underline font-semibold hover:text-white"
            >
              elevate4humanityedu@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
