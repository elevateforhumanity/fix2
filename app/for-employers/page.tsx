import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, TrendingUp, FileCheck, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Employers | Workforce Solutions & Talent Pipeline',
  description:
    'Access trained workers, apprenticeship partnerships, and workforce development solutions.',
};

export default function ForEmployersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Briefcase className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Employers</h1>
          <p className="text-xl text-purple-100 mb-8">
            Access trained workers, build apprenticeship programs, and
            strengthen your talent pipeline.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg font-bold hover:bg-purple-50"
          >
            Call (317) 314-3757
          </a>
        </div>
      </section>

      {/* What We Offer Employers */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Support Employers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Trained Talent Pipeline
              </h3>
              <p className="text-gray-700">
                Connect with graduates from accredited training programs in
                HVAC, welding, CDL, medical assistant, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-10 h-10 text-brand-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Apprenticeship Partnerships
              </h3>
              <p className="text-gray-700">
                Build registered apprenticeship programs with support for
                compliance, tracking, and funding coordination.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FileCheck className="w-10 h-10 text-brand-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Workforce Coordination</h3>
              <p className="text-gray-700">
                We handle eligibility verification, funding coordination, and
                compliance reporting so you can focus on hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Employers */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  Call (317) 314-3757 to discuss your hiring needs and workforce
                  development goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Define Requirements</h3>
                <p className="text-gray-700">
                  We work with you to identify skills, certifications, and
                  training pathways needed.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Connect with Candidates
                </h3>
                <p className="text-gray-700">
                  We match you with trained candidates or help you build an
                  apprenticeship program.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hire & Grow</h3>
                <p className="text-gray-700">
                  Onboard trained workers and build a sustainable talent
                  pipeline for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 4: Employer Activation */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              Phase 4: Employer Activation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              We Make WorkOne Look Good to Employers
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              You are the translator between policy and business. We make it simple.
            </p>
          </div>

          {/* Employer Pitch */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              The Simple Employer Pitch
            </h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/30">
              <p className="text-xl md:text-2xl leading-relaxed text-center font-medium">
                "Host an apprentice. Training may be funded through WIOA/WRG, kits can be covered, wages may be reimbursed, and you may qualify for a federal tax credit."
              </p>
            </div>
            <p className="text-center text-white/80 mt-6 text-lg">
              That's it. No jargon. No complexity. Just value.
            </p>
          </div>

          {/* What You Provide Employers */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">What You Provide Employers</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">One MOU</h4>
                    <p className="text-white/80 text-sm">
                      Single Memorandum of Understanding. Clear terms. No confusion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">One Wage Schedule</h4>
                    <p className="text-white/80 text-sm">
                      Transparent progression. Employer knows exactly what to pay.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">One Checklist</h4>
                    <p className="text-white/80 text-sm">
                      Step-by-step guide. No guessing. No surprises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">One Point of Contact</h4>
                    <p className="text-white/80 text-sm">
                      Single person to call. No runaround. Fast answers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why This Works</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Simple = Scalable
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Employers don't have time for complexity. One MOU, one schedule, one checklist, one contact. That's how you scale.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">💼</span> Business Language
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    We translate policy into business value. Employers hear "funded training" and "tax credits," not "WIOA eligibility criteria."
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Fast Activation
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    No 6-month onboarding. Employer signs MOU, gets checklist, starts hosting apprentices. Speed wins.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">🤝</span> WorkOne Wins
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    When employers succeed, WorkOne looks good. We make you the hero by making it easy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-8 inline-block">
              <p className="text-lg font-bold mb-4">Ready to activate employers?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+13173143757"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl"
                >
                  <Phone className="w-5 h-5" />
                  Call (317) 314-3757
                </a>
                <Link
                  href="/workone-partner-packet"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
                >
                  <FileCheck className="w-5 h-5" />
                  WorkOne Partner Packet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are NOT */}
      <section className="py-16 bg-purple-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Important to Know
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ✅ We Coordinate Talent Access
              </h3>
              <p className="text-gray-700">
                We connect you with trained workers and help build
                apprenticeship programs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ❌ We're Not a Staffing Agency
              </h3>
              <p className="text-gray-700">
                We don't place temporary workers. We connect you with trained
                candidates for direct hire.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">
                ❌ We Don't Guarantee Hires
              </h3>
              <p className="text-gray-700">
                We facilitate connections. Hiring decisions and employment
                relationships are between you and the candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Let's Build Your Workforce
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Call us to discuss your hiring needs and workforce development
            goals.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
          >
            Call (317) 314-3757
          </a>
        </div>
      </section>
    </main>
  );
}
