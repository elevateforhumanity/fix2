'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * HOMEPAGE - Brutal Clarity
 *
 * 5 Second Rule: User knows exactly what to do
 * One primary action. Everything else is secondary.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Single Clear Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Free Career Training.
          <br />
          No Student Debt.
        </h1>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Get certified. Get hired. 100% funded through government programs.
        </p>

        {/* ONE Primary CTA */}
        <Link
          href="/apply"
          className="inline-flex items-center gap-3 px-12 py-6 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition shadow-lg mb-8"
        >
          Apply Now
          <ArrowRight className="h-6 w-6" />
        </Link>

        {/* ONE Secondary Action */}
        <div className="mb-16">
          <Link
            href="/programs"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            View Programs →
          </Link>
        </div>

        {/* Proof (Not CTAs) */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">20+</div>
            <div className="text-sm text-slate-600">Programs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">100%</div>
            <div className="text-sm text-slate-600">Free</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">DOL</div>
            <div className="text-sm text-slate-600">Approved</div>
          </div>
        </div>

        {/* Other Audiences - Hidden Until Needed */}
        <details className="mt-16 text-left">
          <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700 text-center">
            Not a student? Click here
          </summary>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Link
              href="/for/employers"
              className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="font-semibold text-slate-900 mb-1">Employers</div>
              <div className="text-sm text-slate-600">Hire trained workers</div>
            </Link>
            <Link
              href="/for/workforce-boards"
              className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="font-semibold text-slate-900 mb-1">
                Workforce Boards
              </div>
              <div className="text-sm text-slate-600">Partner with us</div>
            </Link>
          </div>
        </details>
      </div>
    </main>
  );
}
