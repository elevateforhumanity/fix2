import Link from 'next/link';
import {
  Award,
  CheckCircle,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Pitch Deck | Elevate for Humanity',
  description:
    'One-page pitch deck for WorkOne and employers. Registered Apprenticeship Sponsor | ETPL | WIOA | WRG Eligible.',
};

export default function PitchDeckPage() {
  return (
    <main className="bg-slate-50">
      {/* Slide 1: Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Elevate for Humanity
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-bold">
                Registered Apprenticeship Sponsor
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-bold">
                ETPL
              </div>
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-bold">
                WIOA | WRG Eligible
              </div>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold">
            Employer-driven. Funded. Compliant. Scalable.
          </div>
        </div>
      </section>

      {/* Slide 2: The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-4">
              Slide 2
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The Problem Indiana Cares About
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              'Employers need skilled workers',
              'Traditional training is slow and expensive',
              'Employers do not want compliance risk',
              'Participants need paid, funded pathways',
            ].map((problem, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200"
              >
                <p className="text-lg text-slate-900 font-medium">{problem}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center">
            <p className="text-3xl md:text-4xl font-bold">
              Indiana's answer: Earn-and-Learn Apprenticeships
            </p>
          </div>
        </div>
      </section>

      {/* Slide 3: What We Are */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
              Slide 3
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What We Are
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-blue-200 mb-8">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              We are a registered apprenticeship sponsor and workforce
              intermediary that helps employers launch WIOA- and WRG-eligible
              earn-and-learn programs without becoming a school or managing
              compliance.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              We handle:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Apprenticeship registration (RAPIDS)',
                'RTI coordination',
                'Compliance + reporting',
                'Employer onboarding',
                'Funding alignment with WorkOne',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-blue-50 rounded-xl p-4"
                >
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="text-slate-900 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Slide 4: Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
              Slide 4
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Programs (Expandable)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Barber Apprenticeship
              </h3>
              <p className="text-slate-700">Indiana licensed pathway</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Skilled Trades
              </h3>
              <p className="text-slate-700">
                HVAC, Construction, Facilities – expansion ready
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-4">All programs are:</h3>
            <ul className="space-y-3">
              {[
                'ETPL-approved (where applicable)',
                'Compatible with WIOA, WRG, OJT, and supportive services',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Slide 5: Employer Value */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-4">
              Slide 5
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Employer Value
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-orange-200 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Employers may receive:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'A paid apprentice',
                'Training funded by WIOA / WRG',
                'Tools and kits covered as supportive services',
                'Possible wage reimbursement (OJT)',
                'Possible federal tax credit (WOTC)',
                'One point of contact',
                'Full compliance support',
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-orange-50 rounded-xl p-4"
                >
                  <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <span className="text-slate-900 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold">
                Bottom line: Lower cost. Lower risk. Better retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6: WorkOne Value */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
              Slide 6
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              WorkOne Value
            </h2>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg border-2 border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              WorkOne benefits from:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Employer-driven placements',
                'Clean compliance',
                'Fast response times',
                'Closed-loop reporting',
                'Higher retention and completion',
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-200"
                >
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <span className="text-slate-900 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold">
                We reduce staff workload — not add to it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: Simple Referral Flow */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-4">
              Slide 7
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Simple Referral Flow
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border-2 border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <div className="bg-blue-500 text-white rounded-2xl px-8 py-6 text-center font-bold text-xl">
                WorkOne
              </div>
              <ArrowRight className="w-8 h-8 text-slate-400 rotate-90 md:rotate-0" />
              <div className="bg-green-500 text-white rounded-2xl px-8 py-6 text-center font-bold text-xl">
                Participant
              </div>
              <ArrowRight className="w-8 h-8 text-slate-400 rotate-90 md:rotate-0" />
              <div className="bg-orange-500 text-white rounded-2xl px-8 py-6 text-center font-bold text-xl">
                Employer
              </div>
              <ArrowRight className="w-8 h-8 text-slate-400 rotate-90 md:rotate-0" />
              <div className="bg-purple-500 text-white rounded-2xl px-8 py-6 text-center font-bold text-xl">
                Sponsor
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-xl text-slate-700 font-medium">
                Funding decisions remain with WorkOne.
              </p>
              <p className="text-xl text-slate-700 font-medium">
                We manage execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 8: Close */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4">
              Slide 8
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              We don't compete with WorkOne.
              <br />
              We extend it.
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-12">
            <p className="text-2xl md:text-3xl leading-relaxed text-center font-medium">
              "An ETPL-approved apprenticeship sponsor helping Indiana employers
              hire, train, and retain talent using funded earn-and-learn
              models."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/workone-partner-packet"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              <FileText className="w-5 h-5" />
              View Partner Packet
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-600 mb-6">
            Use this deck for WorkOne meetings and employer presentations
          </p>
          <Link
            href="/partner-playbook"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
          >
            ← Back to Partner Playbook
          </Link>
        </div>
      </section>
    </main>
  );
}
