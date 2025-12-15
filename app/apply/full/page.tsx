import type { Metadata } from 'next';
import QuickApplyFormClient from '../QuickApplyFormClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Full Application | Elevate for Humanity',
  description:
    "Complete your full application for Elevate for Humanity programs. We'll review funding options like WIOA, WRG, and apprenticeships and follow up with you.",
};

export default function FullApplicationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-10 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase mb-2">
            Start Here
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Full Application
          </h1>
          <p className="text-slate-700 max-w-3xl mb-3">
            You're taking the first step toward a better future. This
            application helps us understand your goals, interests, and any
            support you might need. There's no cost, no commitment—just an
            opportunity to explore what's possible.
          </p>
          <p className="text-sm text-slate-600 max-w-3xl mb-4">
            After you submit, a real person (not a bot!) will reach out within{' '}
            1–2 business days to talk about programs, funding like{' '}
            <span className="font-semibold">
              WIOA, WRG, JRI & apprenticeships
            </span>
            , and next steps.
          </p>
          <p className="text-sm text-slate-700 mb-1">
            Need help right now? Call us at{' '}
            <a
              href="tel:3173143757"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              317-314-3757
            </a>{' '}
            — we're here to help.
          </p>
          <p className="text-sm text-slate-600 mt-4">
            Prefer a quick inquiry?{' '}
            <a
              href="/apply"
              className="font-semibold text-orange-600 hover:text-orange-700 underline"
            >
              Use our quick inquiry form instead
            </a>
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8 lg:py-10">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-8 items-start">
          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-7">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Your Information
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              All fields are required unless marked optional.
            </p>
            <QuickApplyFormClient />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-3">
                What happens next?
              </h3>
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>
                    We review your application and check funding eligibility
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>
                    An advisor calls you to discuss programs and next steps
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>
                    If you're ready, we help you enroll and get started
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Questions?
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                Our team is here to help you every step of the way.
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-900">Phone:</span>{' '}
                  <a
                    href="tel:3173143757"
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    317-314-3757
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Email:</span>{' '}
                  <a
                    href="mailto:elevate4humanityedu@gmail.com"
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    elevate4humanityedu@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Funding Options
              </h3>
              <p className="text-sm text-slate-700 mb-3">
                Many students qualify for funding that covers most or all of
                their tuition:
              </p>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• WIOA (Workforce Innovation)</li>
                <li>• WRG (Workforce Ready Grant)</li>
                <li>• JRI (Justice Reinvestment)</li>
                <li>• Registered Apprenticeships</li>
                <li>• Employer sponsorship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
