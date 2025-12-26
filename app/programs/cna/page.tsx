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
      {/* Hero Section with Video */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/cna-hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Certified Nursing Assistant (CNA)
          </h1>
          <p className="text-xl mb-8">
            100% Free CNA training program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold rounded-lg transition-all text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-slate-900 font-bold rounded-lg transition-all text-center"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Program Overview</h2>
          <p className="text-lg text-slate-600 mb-4">
            State approved, DOL approved. Get your Certified Nursing Assistant certification through WRG, WIOA, or JRI funding. 6-8 weeks, job placement included. Start earning $16-$20/hour.
          </p>
        </div>
      </section>
    </main>
  );
}
