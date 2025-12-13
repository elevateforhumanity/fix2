import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Briefcase,
  Heart,
  Download,
  Target,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '2024 Annual Report - Our Impact | Elevate for Humanity',
  description:
    'Our 2024 impact: 1,200+ students served, 87% employment rate, $42K average salary, and 150+ employer partnerships. Transparent financials and community impact.',
};

export default function AnnualReportPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">2024 Annual Report</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Impact</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Transforming lives through education, one student at a time.
              Here&apos;s what we accomplished together in 2024.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg">
              <Download className="w-5 h-5" />
              Download Full Report (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Executive Summary
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                2024 was a landmark year for Elevate for Humanity. We served
                over 1,200 students, achieved an 87% employment rate, and
                expanded our programs to meet growing community needs. Our
                graduates earned an average starting salary of $42,000—a
                life-changing increase for individuals and families across
                Indianapolis.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Through partnerships with 150+ employers and $4.2M in workforce
                funding, we provided 100% free training to individuals facing
                barriers to employment. Every dollar invested in our programs
                returns $7 to the local economy through increased wages and
                reduced social services costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              2024 By the Numbers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  1,200+
                </div>
                <div className="text-slate-600 font-semibold">
                  Students Served
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  ↑ 25% from 2023
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  87%
                </div>
                <div className="text-slate-600 font-semibold">
                  Employment Rate
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Within 6 months
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  $42K
                </div>
                <div className="text-slate-600 font-semibold">
                  Avg Starting Salary
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  ↑ $5K from 2023
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  92%
                </div>
                <div className="text-slate-600 font-semibold">
                  Completion Rate
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Industry leading
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2">150+</div>
                <div className="text-slate-600 font-semibold">
                  Employer Partners
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  ↑ 30 new in 2024
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  5,000+
                </div>
                <div className="text-slate-600 font-semibold">
                  Volunteer Hours
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  150 volunteers
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-pink-600" />
                </div>
                <div className="text-4xl font-bold text-pink-600 mb-2">85%</div>
                <div className="text-slate-600 font-semibold">
                  1-Year Retention
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Still employed
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-4xl font-bold text-teal-600 mb-2">8</div>
                <div className="text-slate-600 font-semibold">
                  Programs Offered
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  +1 new in 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Financial Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Revenue */}
              <div className="bg-slate-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Revenue Sources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">WIOA Funding</span>
                      <span className="font-bold">$2.1M (50%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">WRG Funding</span>
                      <span className="font-bold">$1.3M (31%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: '31%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">JRI Funding</span>
                      <span className="font-bold">$630K (15%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Donations & Grants</span>
                      <span className="font-bold">$168K (4%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-orange-600 h-3 rounded-full"
                        style={{ width: '4%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-300">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total Revenue</span>
                      <span className="font-bold text-lg text-blue-600">
                        $4.2M
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expenses */}
              <div className="bg-slate-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Program Expenses</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Direct Training</span>
                      <span className="font-bold">$2.9M (70%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Student Support</span>
                      <span className="font-bold">$630K (15%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Administration</span>
                      <span className="font-bold">$420K (10%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full"
                        style={{ width: '10%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">
                        Facilities & Equipment
                      </span>
                      <span className="font-bold">$210K (5%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-orange-600 h-3 rounded-full"
                        style={{ width: '5%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-300">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total Expenses</span>
                      <span className="font-bold text-lg text-blue-600">
                        $4.16M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-lg text-blue-900">
                <strong>85% of every dollar</strong> goes directly to student
                training and support services. We maintain one of the lowest
                administrative overhead rates in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              2024 Program Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  New Medical Assistant Program
                </h3>
                <p className="text-slate-700 mb-4">
                  Launched in Q4 2024, our Medical Assistant program addresses
                  the critical shortage of healthcare workers in Indianapolis.
                  First cohort of 25 students begins January 2025.
                </p>
                <Link
                  href="/programs/direct-support-professional"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  JRI Program Expansion
                </h3>
                <p className="text-slate-700 mb-4">
                  Increased JRI funding allowed us to serve 50% more
                  justice-involved individuals. 73% reduction in recidivism for
                  program participants.
                </p>
                <Link
                  href="/jri"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  CDL Program Excellence
                </h3>
                <p className="text-slate-700 mb-4">
                  Achieved 95% first-time pass rate on state licensing exams,
                  well above the 70% national average. 100% of graduates
                  received job offers.
                </p>
                <Link
                  href="/programs/cdl"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  Employer Partnerships
                </h3>
                <p className="text-slate-700 mb-4">
                  Added 30 new employer partners including Community Health
                  Network, Ryder, and Comfort Systems. Hosted 4 hiring events
                  connecting 200+ students with jobs.
                </p>
                <Link
                  href="/employers"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Partner with Us →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
            <p className="text-lg text-slate-600 mb-8">
              Behind every statistic is a real person whose life was
              transformed. Here are just a few of their stories.
            </p>
            <Link
              href="/success-stories"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition"
            >
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Looking Forward */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Looking Forward: 2025 Goals
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Serve 1,500 Students
                  </h3>
                  <p className="text-slate-700">
                    Expand capacity by 25% through additional funding and
                    program optimization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Launch Building Maintenance Program
                  </h3>
                  <p className="text-slate-700">
                    New program starting Q2 2025 to address skilled trades
                    shortage.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Achieve 90% Employment Rate
                  </h3>
                  <p className="text-slate-700">
                    Enhanced job placement services and employer partnerships to
                    increase employment outcomes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Expand to Second Location
                  </h3>
                  <p className="text-slate-700">
                    Open satellite training center on Indianapolis east side to
                    serve more communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Help Us Reach More People in 2025
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Your support helps us provide free training and change lives.
              Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-slate-50 transition shadow-lg"
              >
                Partner with Us
              </Link>
              <Link
                href="/volunteer"
                className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/20 transition"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
