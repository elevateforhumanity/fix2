// app/apply/page.tsx
import type { Metadata } from 'next';
import QuickApplyFormClient from './QuickApplyFormClient';

export const metadata: Metadata = {
  title: 'Quick Application | Elevate for Humanity',
  description:
    "Take 2–3 minutes to submit your quick application for Elevate for Humanity programs. We'll review funding options like WIOA, WRG, and apprenticeships and follow up with you.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-10 lg:py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase mb-2">
            Start Here
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Quick Application
          </h1>
          <p className="text-slate-700 max-w-3xl mb-3">
            You&apos;re taking the first step toward a better future. This
            application helps us understand your goals, interests, and any
            support you might need. There&apos;s no cost, no commitment—just an
            opportunity to explore what&apos;s possible.
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
            <span className="font-semibold">317-314-3757</span> — we&apos;re
            here to help.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8 lg:py-10">
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-8 items-start">
          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-7">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Tell us a little about yourself
            </h2>
            <p className="text-sm text-slate-600 mb-5">
              This takes about 2–3 minutes. Answer as best you can—if
              you&apos;re not sure on something, you can leave it blank.
            </p>
            <QuickApplyFormClient />
          </div>

          {/* Sidebar: what happens next */}
          <aside className="space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5">
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">
                What happens after you apply?
              </h3>
              <ol className="space-y-2 text-xs text-emerald-900">
                <li>
                  <span className="font-semibold">1. We review your info.</span>{' '}
                  Our team checks your interests, county, and possible funding.
                </li>
                <li>
                  <span className="font-semibold">2. We reach out.</span>{' '}
                  You&apos;ll get a call, text, or email from Elevate for
                  Humanity to talk through options.
                </li>
                <li>
                  <span className="font-semibold">
                    3. We help with next steps.
                  </span>{' '}
                  That may include WorkOne, WIOA/WRG, apprenticeship matching,
                  or scheduling a tour.
                </li>
              </ol>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Already have a case manager?
              </h3>
              <p className="text-xs text-slate-700 mb-2">
                If you&apos;re working with WorkOne, probation, re-entry,
                housing, or another agency, you can add their info in your
                application so we can coordinate.
              </p>
              <p className="text-xs text-slate-500">
                We work with workforce boards, WRG/WIOA, JRI, re-entry and other
                partners to help braid funding and support.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-5">
              <h3 className="text-sm font-semibold mb-2">
                Not perfect? You&apos;re still welcome here.
              </h3>
              <p className="text-xs text-slate-100 mb-2">
                We understand gaps in work history, justice involvement,
                childcare challenges, and starting over. You don&apos;t have to
                have it all figured out — that&apos;s what this step is for.
              </p>
              <p className="text-xs text-slate-300">
                Just be honest about what you&apos;re dealing with so we can
                connect you to the right support and training.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
