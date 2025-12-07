import Link from "next/link";
import { DollarSign, Users, TrendingUp, Award, CheckCircle, Clock, Target, Zap } from "lucide-react";

export default function EmployersPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              FOR EMPLOYERS
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get Trained Workers at 50% Off
            </h1>
            <p className="text-2xl text-blue-100 mb-8">
              Government pays 50-75% of wages while we train your new hires. You get job-ready employees with ZERO risk and massive savings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">50-75%</p>
                <p className="text-sm text-blue-100">Wage Reimbursement</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-blue-100">Upfront Training Costs</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-3xl font-bold">FREE</p>
                <p className="text-sm text-blue-100">Pre-Screening & Soft Skills</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl"
            >
              Schedule Partnership Call
            </Link>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">
            Why Become an Employer Partner?
          </h2>
          <p className="text-xl text-slate-600 mb-12 text-center max-w-3xl mx-auto">
            Stop wasting money on recruiting, training, and turnover. Let the government pay for it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Massive Cost Savings
              </h3>
              <p className="text-slate-600 mb-4">
                Government reimburses 50-75% of wages during training period (3-6 months). Save $5,000-$15,000 per hire.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-bold text-green-900">Example:</p>
                <p className="text-sm text-green-800">Hire at $18/hr × 40 hrs/week × 12 weeks = $8,640 wages. Government reimburses $4,320-$6,480. You pay $2,160-$4,320!</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pre-Screened, Job-Ready Talent
              </h3>
              <p className="text-slate-600 mb-4">
                We handle recruiting, background checks, drug screening, and soft skills training. You get candidates ready to work.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Background checks completed
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Drug screening done
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  JRI soft skills training included
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Zero Risk Trial Period
              </h3>
              <p className="text-slate-600 mb-4">
                Government pays most of the wages while you evaluate the employee. If it doesn't work out, you're only out a fraction of normal hiring costs.
              </p>
              <p className="text-sm font-bold text-orange-900">
                Start before you fully commit!
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                FREE Training Hours
              </h3>
              <p className="text-slate-600 mb-4">
                We provide technical and soft skills training at NO COST to you. Your employees get better, you pay nothing.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Indusstart-specific technical training
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Job Ready Indy soft skills
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Safety certifications (OSHA, etc.)
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Upskill Current Employees
              </h3>
              <p className="text-slate-600 mb-4">
                Use workforce grants to train your EXISTING employees in new skills. Promote from within and increase retention.
              </p>
              <p className="text-sm font-bold text-red-900">
                Next Level Grants available for incumbent worker training!
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Reduce Turnover
              </h3>
              <p className="text-slate-600 mb-4">
                Employees trained through our programs have 40% lower turnover rates. They're invested in their career, not just a job.
              </p>
              <p className="text-sm font-bold text-teal-900">
                Better retention = lower costs long-term
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Programs */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Employer Funding Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* OJT */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                On-the-Job Training (OJT)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>50% wage reimbursement</strong> for 3-6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Pre-screened candidates ready to work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>FREE soft skills training (JRI)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>We handle all paperwork and compliance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-orange-300">
                  <p className="font-bold text-orange-900 mb-2">💵 Example Savings:</p>
                  <p className="text-sm text-slate-700">
                    Hire CNA at $16/hr × 40 hrs/week × 12 weeks = $7,680 total wages<br/>
                    <strong className="text-green-700">Government reimburses: $3,840</strong><br/>
                    <strong className="text-orange-700">You pay: $3,840</strong>
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Best For:</p>
                  <p className="text-sm text-slate-700">
                    Healthcare, skilled trades, customer service, IT support, any position requiring on-the-job training
                  </p>
                </div>
              </div>
            </div>

            {/* WEX */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Work Experience (WEX)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>75% wage reimbursement</strong> for 4-12 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Short-term trial period</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Evaluate worker before full hire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>No long-term commitment required</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="font-bold text-blue-900 mb-2">💵 Example Savings:</p>
                  <p className="text-sm text-slate-700">
                    Hire worker at $15/hr × 30 hrs/week × 8 weeks = $3,600 total wages<br/>
                    <strong className="text-green-700">Government reimburses: $2,700</strong><br/>
                    <strong className="text-blue-700">You pay: $900</strong>
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Best For:</p>
                  <p className="text-sm text-slate-700">
                    Enstart-level positions, seasonal work, starting out new hires, building your talent pipeline
                  </p>
                </div>
              </div>
            </div>

            {/* Apprenticeships */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                DOL Registered Apprenticeships
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>FREE classroom training</strong> (we provide)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Employee works for you while learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build licensed professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Tax credits available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-300">
                  <p className="font-bold text-purple-900 mb-2">💵 Your Savings:</p>
                  <p className="text-sm text-slate-700">
                    Barber apprentice: We provide $3,000+ in classroom training FREE<br/>
                    HVAC apprentice: We provide $5,000+ in classroom training FREE<br/>
                    <strong className="text-purple-700">You get trained employee at no training cost</strong>
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Best For:</p>
                  <p className="text-sm text-slate-700">
                    Barbershops, HVAC companies, building maintenance, skilled trades requiring licenses
                  </p>
                </div>
              </div>
            </div>

            {/* Next Level Grants */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Next Level Grants (Incumbent Worker Training)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900 mb-2">💰 What You Get:</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>FREE training for CURRENT employees</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Upskill your workforce</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Promote from within</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Increase retention and loyalty</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-300">
                  <p className="font-bold text-green-900 mb-2">💡 Example:</p>
                  <p className="text-sm text-slate-700">
                    Train your CNA to become a Medical Assistant<br/>
                    Train your HVAC helper to become a licensed technician<br/>
                    Train your customer service rep to become a supervisor<br/>
                    <strong className="text-green-700">Government pays for the training!</strong>
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-2">✅ Best For:</p>
                  <p className="text-sm text-slate-700">
                    Companies wanting to promote from within, reduce turnover, and build career ladders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            How to Become a Partner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Contact Us</h3>
              <p className="text-sm text-slate-600">Schedule a 15-minute call to discuss your hiring needs</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">We Match Candidates</h3>
              <p className="text-sm text-slate-600">We send you pre-screened, qualified candidates</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">You Interview & Hire</h3>
              <p className="text-sm text-slate-600">You make the final hiring decision</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">4️⃣</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Get Reimbursed</h3>
              <p className="text-sm text-slate-600">We handle paperwork, you get 50-75% back</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Save on Hiring Costs?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Schedule a 15-minute call to learn how much you can save through workforce funding programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="/hire-graduates"
              className="bg-orange-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-900 transition-all"
            >
              Hire Our Graduates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
