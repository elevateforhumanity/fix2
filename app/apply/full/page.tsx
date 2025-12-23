import type { Metadata } from 'next';
import WIOAApplicationForm from './WIOAApplicationForm';

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
              className="font-semibold text-brand-orange-600 hover:text-brand-orange-700"
            >
              317-314-3757
            </a>{' '}
            — we're here to help.
          </p>
          <p className="text-sm text-slate-600 mt-4">
            Prefer a quick inquiry?{' '}
            <a
              href="/apply"
              className="font-semibold text-brand-orange-600 hover:text-brand-orange-700 underline"
            >
              Use our quick inquiry form instead
            </a>
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-8 lg:py-10">
        <WIOAApplicationForm />
      </section>
    </main>
  );
}
