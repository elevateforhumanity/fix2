import Link from "next/link";
import Image from "next/image";
import { DollarSign, CheckCircle, Clock, Users, Award, TrendingUp } from "lucide-react";

export default function FundingPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/federal-funding-hero.jpg"
            alt="Funding Options"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-white text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💯 100% FREE TRAINING OPTIONS
            </span>
            <h1 className="text-5xl font-bold mb-6">
              How Your Training Gets Funded
            </h1>
            <p className="text-2xl text-green-100 mb-8">
              We connect you to government workforce programs that pay for EVERYTHING. Here's exactly what each program covers, who qualifies, and how much you can earn.
            </p>
            <Link
              href="/apply"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-xl"
            >
              Apply Now - We'll Find Your Funding
            </Link>
          </div>
        </div>
      </section>

      {/* Main Funding Programs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Our Funding Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WIOA */}
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  W
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">WIOA</h3>
                  <p className="text-sm text-slate-600">Workforce Innovation & Opportunity Act</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What It Covers:</p>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>100% of tuition, books, and supplies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Transportation assistance (gas cards, bus passes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Childcare assistance while in training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Work clothes, tools, uniforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Support services to remove barriers</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Who Qualifies:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Adults (18+) who are unemployed or underemployed</li>
                    <li>• Dislocated workers (laid off, plant closure)</li>
                    <li>• Youth (16-24) not in school</li>
                    <li>• Must apply through WorkOne Career Centers</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">📋 Requirements:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Marion County resident (or surrounding counties)</li>
                    <li>• Eligible to work in the US</li>
                    <li>• Meet income guidelines (we help you check)</li>
                    <li>• Commit to completing training</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-bold text-blue-900 mb-1">💵 Stipends Available:</p>
                  <p className="text-sm text-blue-800">Some WIOA participants may receive stipends during training. Ask us about availability.</p>
                </div>

                <Link
                  href="/funding/wioa"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-4"
                >
                  Learn More About WIOA →
                </Link>
              </div>
            </div>

            {/* Workforce Ready Grant */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  WRG
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Workforce Ready Grant</h3>
                  <p className="text-sm text-slate-600">Indiana State Program</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What It Covers:</p>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>100% of tuition for approved certificate programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Up to $7,500 per year in training costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Books and required materials</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Who Qualifies:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Indiana resident</li>
                    <li>• High school diploma or GED</li>
                    <li>• Do NOT have an associate or bachelor's degree</li>
                    <li>• Enrolled in approved certificate program</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">📋 Requirements:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Must file FAFSA (we help you with this)</li>
                    <li>• Maintain satisfactory academic progress</li>
                    <li>• Complete program within timeframe</li>
                    <li>• Training must be in high-demand field</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-bold text-green-900 mb-1">🎯 Best For:</p>
                  <p className="text-sm text-green-800">People who don't qualify for WIOA but want free training. No income limits!</p>
                </div>

                <Link
                  href="/funding/wrg"
                  className="block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors mt-4"
                >
                  Learn More About WRG →
                </Link>
              </div>
            </div>

            {/* OJT */}
            <div className="bg-white border-2 border-orange-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  OJT
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">On-the-Job Training</h3>
                  <p className="text-sm text-slate-600">Get PAID While You Train</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-start gap-2">
                      <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>$15-$20/hour wages</strong> from employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>You're a REAL employee from day 1</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Government reimburses employer 50% of your wages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Training period: 3-6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Employer keeps you as regular employee after</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Who Qualifies:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Anyone we match with an employer partner</li>
                    <li>• Must be eligible for WIOA funding</li>
                    <li>• Willing to commit to full-time work</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">📋 How It Works:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• We match you with hiring employer</li>
                    <li>• Employer hires you and pays your wages</li>
                    <li>• You work and train on the job</li>
                    <li>• Government reimburses employer for training costs</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-bold text-orange-900 mb-1">💵 Earn While Learning:</p>
                  <p className="text-sm text-orange-800">Example: $18/hr × 40 hrs/week × 12 weeks = <strong>$8,640 earned</strong> during training!</p>
                </div>
              </div>
            </div>

            {/* Apprenticeships */}
            <div className="bg-white border-2 border-purple-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  APP
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">DOL Apprenticeships</h3>
                  <p className="text-sm text-slate-600">Earn Full Wages While Building License</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-start gap-2">
                      <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>$15-$20/hour full wages</strong> from employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Work in real shop/company serving real customers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>FREE classroom training (we provide)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build required hours toward state license</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Nationally recognized credential when done</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Available Programs:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• <strong>Barber:</strong> 1,500 hours (12-18 months)</li>
                    <li>• <strong>HVAC:</strong> 8,000 hours (4 years)</li>
                    <li>• <strong>Building Tech:</strong> Varies by specialty</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">📋 Requirements:</p>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• 18+ years old</li>
                    <li>• High school diploma or GED</li>
                    <li>• Pass background check (for some programs)</li>
                    <li>• Commit to full program duration</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="font-bold text-purple-900 mb-1">💵 Total Earnings:</p>
                  <p className="text-sm text-purple-800">Barber example: $17/hr × 30 hrs/week × 78 weeks = <strong>$39,780 earned</strong> while getting licensed!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JRI Section */}
      <section className="bg-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-3xl">
                JRI
              </div>
              <div>
                <h2 className="text-3xl font-bold">Job Ready Indy (JRI)</h2>
                <p className="text-orange-100 text-lg">Soft Skills Training - Included in ALL Programs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-xl mb-3">What Is JRI?</p>
                <p className="text-orange-100 mb-4">
                  Job Ready Indy is EmployIndy's soft skills curriculum that we include in EVERY program. It teaches the workplace skills employers say are missing.
                </p>
                <p className="font-bold text-xl mb-3">What You Learn:</p>
                <ul className="space-y-2 text-orange-100">
                  <li>• Professional communication</li>
                  <li>• Workplace professionalism</li>
                  <li>• Teamwork and collaboration</li>
                  <li>• Problem-solving skills</li>
                  <li>• Financial literacy</li>
                  <li>• Career advancement strategies</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-xl mb-3">💵 JRI Stipends:</p>
                <p className="text-orange-100 mb-4">
                  Some JRI participants may receive stipends for attending training sessions. Stipend amounts vary by funding source and availability.
                </p>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                  <p className="font-bold mb-2">Why It Matters:</p>
                  <p className="text-sm text-orange-100">
                    Employers tell us: "We can teach the technical skills, but we need people who show up on time, communicate well, and work as a team." JRI gives you those skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            We Handle Everything For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Apply</h3>
              <p className="text-sm text-slate-600">Tell us what career you want</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">We Check Eligibility</h3>
              <p className="text-sm text-slate-600">We determine which funding you qualify for</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">We Do Paperwork</h3>
              <p className="text-sm text-slate-600">We coordinate with EmployIndy, WorkOne, DWD</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">4️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Start FREE</h3>
              <p className="text-sm text-slate-600">Begin training at $0 cost to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Apply now and we'll determine which funding programs you qualify for. Most applicants hear back within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
            >
              Apply for Free Training
            </Link>
            <Link
              href="/what-we-do"
              className="bg-green-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-900 transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
