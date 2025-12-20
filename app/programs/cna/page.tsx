import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Free CNA Training Indiana | Certified Nursing Assistant | WRG, WIOA, JRI Funded | Indianapolis',
  description:
    '100% free CNA training in Indianapolis. State approved, DOL approved. Get your Certified Nursing Assistant certification through WRG, WIOA, or JRI funding. 6-8 weeks, job placement included. Start earning $16-$20/hour.',
  keywords:
    'free CNA training Indiana, CNA classes Indianapolis, certified nursing assistant Indiana, WRG CNA training, WIOA CNA program, JRI CNA training, free nursing assistant school Indiana, CNA certification Indianapolis, CNA job placement, state approved CNA training Indiana',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Certified Nursing Assistant (CNA)
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          100% Free CNA training program
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-brand-orange-600 text-white font-bold rounded-lg hover:bg-brand-orange-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
