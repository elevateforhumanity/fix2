import Link from 'next/link';
import {
  Mail,
  Phone,
  FileText,
  Users,
  CheckCircle,
  Download,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Award,
} from 'lucide-react';

export const metadata = {
  title: 'Preferred Partner Playbook | Elevate for Humanity',
  description:
    'Complete playbook for activating WorkOne regions, employers, and funding. Regional outreach, employer one-pager, MOU template, referral workflow, and expansion guide.',
};

export default function PartnerPlaybookPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
            Preferred Partner Playbook
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Activate WorkOne Regions, Employers, and Funding
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl">
            Everything you need to execute immediately. Copy-paste and use today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/workone-partner-packet"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              <FileText className="w-5 h-5" />
              WorkOne Partner Packet
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>

      {/* 30-Day Plan */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              30-Day Activation Plan
            </h2>
            <p className="text-xl text-slate-600">
              How to use this playbook in real life
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
              <div className="text-sm font-bold text-blue-600 mb-2">Week 1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Regional Outreach
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Send outreach email to Region 12</li>
                <li>• Contact 2 adjacent regions</li>
                <li>• Share Partner Packet in meetings</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-sm font-bold text-green-600 mb-2">Week 2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Employer Activation
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Onboard 1-2 employers</li>
                <li>• Align referral process</li>
                <li>• Set up intake workflow</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
              <div className="text-sm font-bold text-purple-600 mb-2">
                Weeks 3-4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                First Enrollments
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Enroll first referrals</li>
                <li>• Close loop with WorkOne</li>
                <li>• Track progress</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
              <div className="text-sm font-bold text-orange-600 mb-2">
                After That
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Referrals Flow
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Referrals come without chasing</li>
                <li>• System runs smoothly</li>
                <li>• Scale to more regions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Assets */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The 5 Core Assets
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to activate partnerships
            </p>
          </div>

          {/* 1. Regional Outreach */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  1. Regional Outreach Email + Call Script
                </h3>
                <p className="text-slate-600">
                  Use this to open doors with DWD + WorkOne
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
              <h4 className="font-bold text-slate-900 mb-4">
                Email Template (send to Workforce Board Director / WorkOne Manager)
              </h4>
              <div className="bg-white rounded-xl p-6 border border-blue-200 mb-6">
                <p className="text-sm text-slate-700 mb-4">
                  <strong>Subject:</strong> ETPL-Approved Apprenticeship Sponsor
                  – Regional Alignment
                </p>
                <div className="text-sm text-slate-700 space-y-3 leading-relaxed">
                  <p>Hello,</p>
                  <p>
                    My name is Elizabeth Greene, and I'm reaching out on behalf
                    of Elevate for Humanity. We are a registered apprenticeship
                    sponsor and ETPL-approved provider in Indiana, making our
                    programs eligible for WIOA and Workforce Ready Grant funding
                    through WorkOne regions.
                  </p>
                  <p>
                    We work with employers to implement compliant earn-and-learn
                    apprenticeship programs, currently beginning with barber
                    apprenticeships and expanding into skilled trades. Our role is
                    to handle apprenticeship registration, RTI coordination,
                    compliance, and reporting so employers and case managers have
                    a clean, low-risk process.
                  </p>
                  <p>
                    We would welcome a brief meeting to align our programs with
                    your regional referral process and employer needs and to
                    discuss how WorkOne participants may access these
                    opportunities.
                  </p>
                  <p>Thank you for your time and partnership.</p>
                  <p>
                    <strong>Elizabeth Greene</strong>
                    <br />
                    Registered Apprenticeship Sponsor
                    <br />
                    Elevate for Humanity
                    <br />
                    (317) 314-3757
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 mb-4">
                Follow-Up Call Script
              </h4>
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <p className="text-sm text-slate-700 italic mb-4">
                  If emailing doesn't land:
                </p>
                <p className="text-slate-700 leading-relaxed">
                  "Hi, this is Elizabeth Greene with Elevate for Humanity. We're
                  an ETPL-approved apprenticeship sponsor working with WorkOne
                  participants. I'm calling to see who would be the best person
                  to connect with about aligning our apprenticeship programs with
                  your regional referrals."
                </p>
                <p className="text-sm text-slate-600 mt-4 font-bold">
                  Do not pitch funding. Just alignment.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Employer One-Pager */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  2. Employer One-Pager
                </h3>
                <p className="text-slate-600">Plain English – Very Effective</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                  Host an Apprentice – Lower Your Cost, Grow Your Workforce
                </h4>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-green-200">
                  <h5 className="font-bold text-slate-900 mb-3">What This Is</h5>
                  <p className="text-slate-700">
                    An apprenticeship lets you hire someone, train them on the
                    job, and grow your business while reducing training costs.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-green-200">
                  <h5 className="font-bold text-slate-900 mb-3">What We Do</h5>
                  <p className="text-slate-700">
                    We handle the paperwork, compliance, and training
                    coordination so you can focus on running your shop.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-green-200">
                  <h5 className="font-bold text-slate-900 mb-3">What You Get</h5>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>A paid apprentice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Training may be funded through WIOA / WRG</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Tools and kits may be covered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Possible wage reimbursement (OJT)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Possible federal tax credit (WOTC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>One point of contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Full compliance support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-green-200">
                  <h5 className="font-bold text-slate-900 mb-3">
                    What You Don't Have to Do
                  </h5>
                  <ul className="space-y-2 text-slate-700">
                    <li>• You don't become a school</li>
                    <li>• You don't manage state reporting</li>
                    <li>• You don't front training costs if funding is approved</li>
                  </ul>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-6">
                  <h5 className="font-bold mb-3 text-lg">Bottom Line</h5>
                  <p className="text-xl italic">
                    "You train. We handle the rest. Funding may reduce your cost."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Preferred Partner MOU */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  3. Preferred Partner MOU
                </h3>
                <p className="text-slate-600">Core Terms (Summary Version)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <p className="text-sm text-slate-600 mb-6 italic">
                Use this language when WorkOne asks "how do we work together?"
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-slate-900 mb-2">
                    Memorandum of Understanding – Workforce Partnership
                  </h5>
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-slate-900 mb-3">Parties</h5>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Elevate for Humanity (Sponsor)</li>
                    <li>• Regional WorkOne Operator</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-slate-900 mb-3">Purpose</h5>
                  <p className="text-sm text-slate-700">
                    To collaborate on the referral, enrollment, and completion of
                    WIOA- and WRG-eligible apprenticeship programs.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-slate-900 mb-3">Roles</h5>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div>
                      <strong>Sponsor:</strong> Apprenticeship registration, RTI
                      coordination, compliance, progress tracking
                    </div>
                    <div>
                      <strong>WorkOne:</strong> Eligibility determination, funding
                      authorization, supportive services coordination
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <h5 className="font-bold text-slate-900 mb-3">Key Terms</h5>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>
                      <strong>Referrals:</strong> WorkOne may refer eligible
                      participants to sponsor programs listed on the ETPL.
                    </li>
                    <li>
                      <strong>Data & Reporting:</strong> Sponsor will provide
                      updates on enrollment, retention, and completion upon
                      request.
                    </li>
                    <li>
                      <strong>Funding:</strong> All funding decisions remain with
                      WorkOne. Sponsor does not guarantee funding.
                    </li>
                    <li>
                      <strong>Term:</strong> 12 months, renewable.
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-100 rounded-xl p-4 border border-purple-300">
                  <p className="text-sm text-slate-700 italic">
                    This is the exact level of formality Indiana prefers—not
                    heavy, not legalistic.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Referral + Intake Workflow */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  4. Referral + Intake Workflow
                </h3>
                <p className="text-slate-600">What Actually Makes You "Easy"</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h4 className="font-bold text-slate-900 mb-6 text-xl">
                Step-by-Step Flow
              </h4>
              <div className="space-y-4 mb-8">
                {[
                  'WorkOne identifies eligible participant',
                  'Referral sent via intake form or email',
                  'Sponsor confirms: Program fit, Employer availability',
                  'Employer onboarding completed',
                  'Apprentice registered in RAPIDS',
                  'Training + funding coordination begins',
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border border-orange-200"
                  >
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-6 border border-orange-200">
                <h5 className="font-bold text-slate-900 mb-4">
                  Your Internal Rules
                </h5>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Respond within 1–2 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>No incomplete referrals sit idle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Close the loop with WorkOne</span>
                  </li>
                </ul>
                <p className="text-sm text-slate-600 mt-4 font-bold italic">
                  This is how you become trusted fast.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Expansion Module */}
          <div className="mb-16">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  5. Expansion Module: Construction / HVAC
                </h3>
                <p className="text-slate-600">No NCCER Required</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
              <h4 className="font-bold text-slate-900 mb-6 text-xl">
                How You Expand Without Accreditation Fees
              </h4>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-blue-200">
                  <h5 className="font-bold text-slate-900 mb-3">You:</h5>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Remain the apprenticeship sponsor</li>
                    <li>
                      • Approve RTI providers (community college, private, online)
                    </li>
                    <li>• Use state licensing + competency models</li>
                    <li>• Partner for optional credentials only when helpful</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-blue-200">
                  <h5 className="font-bold text-slate-900 mb-3">What Changes</h5>
                  <ul className="space-y-2 text-slate-700">
                    <li>• New work process schedule</li>
                    <li>• New RTI outline</li>
                    <li>• Same funding logic</li>
                    <li>• Same referral system</li>
                  </ul>
                </div>

                <div className="bg-blue-900 text-white rounded-xl p-6">
                  <h5 className="font-bold mb-3 text-lg">Result</h5>
                  <p className="text-xl">
                    Multi-trade platform, same infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The One Sentence */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The One Sentence That Unlocks Rooms
          </h2>
          <p className="text-lg text-white/80 mb-8">Use this everywhere:</p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
            <p className="text-2xl md:text-3xl leading-relaxed font-medium">
              "We are an ETPL-approved apprenticeship sponsor helping Indiana
              employers implement WIOA- and WRG-eligible earn-and-learn programs
              with full compliance support."
            </p>
          </div>
          <p className="text-lg text-white/80 mt-8">
            That sentence alone places you above 90% of providers.
          </p>
        </div>
      </section>

      {/* Bonus Assets */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Bonus: Conversion Assets
            </h2>
            <p className="text-xl text-slate-600">
              Turn approval into referrals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* One-Page Pitch Deck */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    One-Page Pitch Deck
                  </h3>
                  <p className="text-sm text-slate-600">
                    Use for WorkOne + Employers
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Slide 1: Header
                  </h4>
                  <p className="text-xs text-slate-700">
                    Elevate for Humanity | Registered Apprenticeship Sponsor |
                    ETPL | WIOA | WRG Eligible
                  </p>
                  <p className="text-xs text-slate-600 mt-2 italic">
                    Tagline: Employer-driven. Funded. Compliant. Scalable.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Slide 2: The Problem
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Employers need skilled workers</li>
                    <li>• Traditional training is slow and expensive</li>
                    <li>• Employers don't want compliance risk</li>
                    <li>• Participants need paid, funded pathways</li>
                  </ul>
                  <p className="text-xs text-slate-900 mt-2 font-bold">
                    Indiana's answer: Earn-and-Learn Apprenticeships
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Slide 3: What We Are
                  </h4>
                  <p className="text-xs text-slate-700 mb-2">
                    Registered apprenticeship sponsor helping employers launch
                    WIOA/WRG-eligible programs without becoming a school.
                  </p>
                  <p className="text-xs text-slate-600">
                    We handle: RAPIDS, RTI, compliance, reporting, onboarding,
                    funding alignment
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2 text-sm">
                    Slide 4-8: Value Props
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    <li>• Programs (Barber, Skilled Trades)</li>
                    <li>• Employer Value (Lower cost, lower risk)</li>
                    <li>• WorkOne Value (Clean compliance, fast response)</li>
                    <li>• Simple Referral Flow</li>
                    <li>• Close: We extend WorkOne, not compete</li>
                  </ul>
                </div>
              </div>

              <Link
                href="/pitch-deck"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition w-full"
              >
                <FileText className="w-4 h-4" />
                View Full Pitch Deck
              </Link>
            </div>

            {/* Statewide Expansion Email */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Statewide Expansion Email
                  </h3>
                  <p className="text-sm text-slate-600">
                    DWD + Multiple Regions
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                <p className="text-xs text-slate-600 mb-4">
                  <strong>Subject:</strong> ETPL-Approved Apprenticeship Sponsor
                  – Regional Expansion
                </p>
                <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
                  <p>Hello,</p>
                  <p>
                    My name is Elizabeth Greene with Elevate for Humanity. We are
                    a registered apprenticeship sponsor and ETPL-approved provider
                    in Indiana, making our programs eligible for WIOA and
                    Workforce Ready Grant funding through WorkOne regions.
                  </p>
                  <p>
                    We currently support employer-driven earn-and-learn
                    apprenticeship programs, beginning with barber apprenticeships
                    and expanding into skilled trades. Our organization provides
                    apprenticeship registration, RTI coordination, compliance, and
                    reporting so employers and WorkOne staff have a clean,
                    low-risk process.
                  </p>
                  <p>
                    We are seeking alignment with additional regions to support
                    employer demand and participant referrals using existing WIOA
                    and WRG pathways. We would welcome the opportunity to share
                    our partner packet and discuss regional needs.
                  </p>
                  <p>
                    Thank you for your continued leadership in Indiana's workforce
                    system.
                  </p>
                  <p>
                    <strong>Elizabeth Greene</strong>
                    <br />
                    Registered Apprenticeship Sponsor
                    <br />
                    Elevate for Humanity
                    <br />
                    (317) 314-3757
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-xs text-slate-700">
                  <strong>When to use:</strong> After successful pilot in Region
                  12, ready to expand to adjacent regions or statewide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How This All Fits Together */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How This All Fits Together
            </h2>
            <p className="text-xl text-slate-600">
              The complete preferred partner stack
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Partner Packet',
                purpose: 'Credibility',
                color: 'blue',
              },
              {
                icon: Mail,
                title: 'Outreach Email + Call Script',
                purpose: 'Access',
                color: 'green',
              },
              {
                icon: FileText,
                title: 'Pitch Deck',
                purpose: 'Conversion',
                color: 'purple',
              },
              {
                icon: Briefcase,
                title: 'Employer One-Pager',
                purpose: 'Activation',
                color: 'orange',
              },
              {
                icon: FileText,
                title: 'MOU Language',
                purpose: 'Trust',
                color: 'pink',
              },
              {
                icon: TrendingUp,
                title: 'Referral Workflow',
                purpose: 'Retention',
                color: 'indigo',
              },
            ].map((asset, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-${asset.color}-50 to-${asset.color}-100 rounded-2xl p-6 border-2 border-${asset.color}-200`}
              >
                <div
                  className={`w-12 h-12 bg-${asset.color}-500 rounded-xl flex items-center justify-center mb-4`}
                >
                  <asset.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{asset.title}</h3>
                <p className="text-sm text-slate-600">
                  <strong>Purpose:</strong> {asset.purpose}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 text-center">
            <p className="text-xl font-bold mb-4">
              This is exactly what preferred partners use.
            </p>
            <p className="text-lg text-white/80">
              Most organizations never build this stack.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            What Happens Next (Realistic Outcome)
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              'WorkOne understands you in minutes',
              'Employers say yes faster',
              'Funding conversations are smoother',
              'Regions begin calling you instead of the other way around',
            ].map((outcome, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200"
              >
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-slate-900 font-medium">{outcome}</p>
              </div>
            ))}
          </div>
          <p className="text-2xl font-bold text-slate-900">
            That is preferred partner status in practice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Ready to Activate?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Start with the WorkOne Partner Packet and follow the 30-day plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/workone-partner-packet"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              <FileText className="w-5 h-5" />
              View Partner Packet
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
