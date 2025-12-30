import { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { CompactHero } from '@/components/heroes/CompactHero';

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
      <CompactHero
        variant="default"
        badge={{
          icon: Stethoscope,
          text: 'Healthcare Career',
          href: '/programs/healthcare',
        }}
        headline="Become a Certified Nursing Assistant in 6-8 weeks"
        description="100% free CNA training through WRG, WIOA, or JRI funding. State approved, DOL approved. Job placement included. Start earning $16-$20/hour."
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'Talk to an Advisor', href: '/contact' }}
      />

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Program Overview
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            State approved, DOL approved. Get your Certified Nursing Assistant
            certification through WRG, WIOA, or JRI funding. 6-8 weeks, job
            placement included. Start earning $16-$20/hour.
          </p>
        </div>
      </section>
    </main>
  );
}
