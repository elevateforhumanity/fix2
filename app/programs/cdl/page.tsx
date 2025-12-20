import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    "Free CDL Training Indiana | Commercial Driver's License | WRG, WIOA, JRI Funded | Indianapolis",
  description:
    "100% free CDL training in Indianapolis. DOL approved, DWD approved. Get your Commercial Driver's License through WRG, WIOA, or JRI funding. Class A CDL, job placement included. Start earning $50k-$70k/year.",
  keywords:
    'free CDL training Indiana, CDL training Indianapolis, commercial drivers license Indiana, WRG CDL training, WIOA CDL program, JRI CDL training, free truck driving school Indiana, Class A CDL training, CDL job placement Indianapolis, DOL approved CDL training',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Commercial Driver's License
        </h1>
        <p className="text-lg text-slate-600 mb-8">100% Free CDL training</p>
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
