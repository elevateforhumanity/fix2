import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/locked/Button';
import { CheckCircle, Clock, DollarSign, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship - Free Training | Elevate For Humanity',
  description:
    'Become a licensed barber in 15-17 months. Earn $10/hour while you learn. No tuition.',
};

/**
 * GOLD STANDARD Program Page
 *
 * This is the template. All other programs copy this structure.
 * NO deviations. NO additions. NO custom sections.
 */
export default function BarberApprenticeshipGoldStandard() {
  return (
    <main className="bg-white">
      {/* Hero - Name Only, 400px */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/programs/barber-hero.jpg"
          alt="Barber Apprenticeship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold">
          Barber Apprenticeship
        </h1>
      </section>

      {/* 1. Is This For You? */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Is This For You?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900">
                You want to work with your hands and build a real skill
              </p>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900">
                You need to earn money while you train (not after)
              </p>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900">
                You want to own your own business someday
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What You Get */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            What You Get
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-slate-200">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900 font-semibold">
                Indiana State Board of Barber Examiners License
              </p>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-slate-200">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900 font-semibold">
                Starting salary: $35,000-$45,000/year. After 3 years:
                $50,000-$65,000/year
              </p>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-lg border border-slate-200">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-900 font-semibold">
                Job title: Licensed Barber working at barbershops or owning your
                own chair
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Time Commitment */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Time Commitment
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-lg text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">
                15-17 months
              </div>
              <div className="text-slate-600">Total Duration</div>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">
                Full-time
              </div>
              <div className="text-slate-600">Work in a barbershop</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What It Costs */}
      <section className="py-16 bg-green-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            What It Costs
          </h2>
          <div className="bg-white border-2 border-green-600 rounded-lg p-12 mb-6">
            <div className="text-5xl font-bold text-green-600 mb-4">$0</div>
            <div className="text-xl text-slate-700 mb-4">
              No tuition. No student debt.
            </div>
            <div className="text-base text-slate-600">
              Funded for eligible participants
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Plus: Earn $10/hour + tips + commissions while you train
          </p>
        </div>
      </section>

      {/* 5. Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-sm text-slate-600 mb-2">
                U.S. DOL Registered
              </div>
              <div className="font-mono text-sm font-semibold text-slate-900">
                RAPIDS: 2025-IN-132301
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <div className="text-sm text-slate-600 mb-2">Average Salary</div>
              <div className="text-2xl font-bold text-slate-900">
                $45,000/year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. What Happens Next - WITH CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">What Happens Next</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            <div>
              <div className="text-4xl font-bold mb-2">1</div>
              <div className="text-lg font-semibold mb-2">
                Apply (2 minutes)
              </div>
              <div className="text-blue-100">
                Fill out simple form with your name, email, and phone
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <div className="text-lg font-semibold mb-2">
                We Call You (24 hours)
              </div>
              <div className="text-blue-100">
                An advisor reviews your application and calls to explain next
                steps
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-lg font-semibold mb-2">
                Start Training (1-2 weeks)
              </div>
              <div className="text-blue-100">
                We handle all funding paperwork. You start earning and learning.
              </div>
            </div>
          </div>

          <Button variant="secondary" href="/apply" arrow>
            Apply Now
          </Button>

          <p className="text-sm text-blue-100 mt-6">
            Questions?{' '}
            <a href="/contact" className="underline font-semibold">
              Contact us
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
