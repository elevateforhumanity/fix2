import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Users,
  Building2,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Elevate For Humanity | Workforce Platform',
  description:
    'Government-funded training pathways, employer partnerships, and placement support — all in one system.',
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              A Workforce Platform That Turns People Into Job-Ready Talent —
              Without Student Debt
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600">
              Government-funded training pathways, employer partnerships, and
              placement support — all in one system.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition"
              >
                Apply for Free Training
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center border-2 border-black text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition"
              >
                Partner With Us
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/images/efh/hero/hero-main.jpg"
              alt="Workforce training in action"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* WHAT THIS IS - Clarity Section */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Not a Program. A Workforce Operating System.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate for Humanity connects funding, training providers,
            employers, and participants into one accountable pipeline — from
            intake to job placement.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR - Role Clarity */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Who This Platform Serves
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/apply"
              className="group border-2 border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Individuals
              </h3>
              <p className="text-gray-600 mb-4">
                Tuition-free career training with job placement support.
              </p>
              <span className="inline-flex items-center text-black font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/employers"
              className="group border-2 border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Employers
              </h3>
              <p className="text-gray-600 mb-4">
                Job-ready candidates, apprenticeships, and workforce incentives.
              </p>
              <span className="inline-flex items-center text-black font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/partners/workforce"
              className="group border-2 border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                For Workforce Boards & Agencies
              </h3>
              <p className="text-gray-600 mb-4">
                Compliance-ready reporting, tracking, and outcomes.
              </p>
              <span className="inline-flex items-center text-black font-semibold group-hover:gap-2 transition-all">
                Learn More
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Approved
              </h3>
              <p className="text-gray-600">
                Eligibility through WIOA, WRG, JRI, and apprenticeships.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Train</h3>
              <p className="text-gray-600">
                Industry-aligned programs with real credentials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Get Placed
              </h3>
              <p className="text-gray-600">
                Employers hire directly from the pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SHOWCASE */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Career Training Programs
            </h2>
            <p className="text-lg text-gray-600">
              Industry-aligned pathways to in-demand careers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Healthcare',
                programs: ['CNA', 'Medical Assistant', 'Phlebotomy'],
                duration: '4-12 weeks',
                wage: '$35,000-$45,000',
                href: '/programs/healthcare',
              },
              {
                title: 'Skilled Trades',
                programs: ['HVAC', 'Welding', 'Electrical'],
                duration: '8-16 weeks',
                wage: '$40,000-$60,000',
                href: '/programs/skilled-trades',
              },
              {
                title: 'Technology',
                programs: ['IT Support', 'Cybersecurity', 'Web Development'],
                duration: '12-24 weeks',
                wage: '$45,000-$70,000',
                href: '/programs/technology',
              },
              {
                title: 'Business',
                programs: ['Accounting', 'Project Management', 'HR'],
                duration: '8-16 weeks',
                wage: '$40,000-$55,000',
                href: '/programs/business',
              },
              {
                title: 'Transportation',
                programs: ['CDL-A', 'CDL-B', 'Logistics'],
                duration: '4-8 weeks',
                wage: '$45,000-$65,000',
                href: '/programs/transportation',
              },
              {
                title: 'Apprenticeships',
                programs: ['Barber', 'Cosmetology', 'Trades'],
                duration: '12-24 months',
                wage: '$35,000-$55,000',
                href: '/programs/apprenticeships',
              },
            ].map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group border-2 border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <ul className="space-y-1 mb-4">
                  {program.programs.map((p) => (
                    <li
                      key={p}
                      className="text-gray-600 text-sm flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Duration:</strong> {program.duration}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Typical Wage:</strong> {program.wage}
                  </p>
                </div>
                <span className="inline-flex items-center text-black font-semibold mt-4 group-hover:gap-2 transition-all">
                  View Programs
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center text-black font-semibold text-lg hover:gap-2 transition-all"
            >
              View All Programs
              <ArrowRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF / METRICS */}
      <section className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Building Workforce Pipelines Across Indiana
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-black mb-2">16+</div>
              <p className="text-lg text-gray-600">ETPL-Approved Programs</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-black mb-2">50+</div>
              <p className="text-lg text-gray-600">Employer Partners</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-black mb-2">
                Statewide
              </div>
              <p className="text-lg text-gray-600">Growing Partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 px-6 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Most People Qualify for Free Training
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Take the first step toward a real career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-black px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-black transition"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
