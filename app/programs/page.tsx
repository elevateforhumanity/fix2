import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Metadata } from 'next';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
};

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-brand-orange-600 transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Programs</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Human & Warm */}
      <section className="bg-white text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            {/* Indiana Career Connect Badge - Clickable */}
            <a
              href="https://www.in.gov/dwd/career-connect/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange-600 hover:bg-brand-orange-700 px-6 py-3 rounded-full mb-6 transition shadow-lg group"
            >
              <MapPin className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">
                Funded by Indiana Career Connect
              </span>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
            </a>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Future Starts Here
            </h1>

            {/* Key Highlights */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-brand-orange-600 px-4 py-2 rounded-lg font-bold">
                100% Free
              </div>
              <div className="bg-brand-orange-600 px-4 py-2 rounded-lg font-bold">
                No Debt
              </div>
              <div className="bg-brand-orange-600 px-4 py-2 rounded-lg font-bold">
                Real Jobs Waiting
              </div>
            </div>

            <p className="text-xl md:text-2xl text-slate-600 mb-6 leading-relaxed font-medium">
              Real training. Real jobs. Real support. And it's 100% free.
            </p>

            {/* Story */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
              <p className="text-lg text-white leading-relaxed mb-4">
                <strong className="text-orange-400">Here's the truth:</strong>{' '}
                You don't need a college degree to build a great career. You
                need the right training, the right support, and someone who
                believes in you.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're starting fresh, changing careers, or getting back
                on your feet—we're here to help you build the life you want.
                Every program is fully funded through{' '}
                <strong className="text-orange-400">
                  Indiana Career Connect
                </strong>{' '}
                and WIOA. No tuition. No debt. Just opportunity.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl hover:scale-105"
              >
                Apply Now - It's Free
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:3173143757"
                className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-slate-50 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call: (317) 314-3757
              </a>
            </div>

            {/* Trust Signal */}
            <p className="text-sm text-white/60 mt-6">
              ✓ Trusted by 500+ Indiana residents • ✓ Partnered with top
              employers • ✓ 90% job placement rate
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Simple & Clear */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make it simple. Here's what happens when you apply:
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                description:
                  'Fill out a quick application. Takes 5 minutes. No commitment.',
              },
              {
                step: '2',
                title: 'Talk to Us',
                description:
                  'An advisor calls you within 24 hours to discuss your goals and options.',
              },
              {
                step: '3',
                title: 'Get Enrolled',
                description:
                  'We handle the paperwork, funding, and enrollment. You just show up.',
              },
              {
                step: '4',
                title: 'Start Training',
                description:
                  'Begin your program with full support. Graduate with a real credential.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-brand-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              All programs are 100% free and lead to industry-recognized
              certifications.
            </p>
          </div>

          {/* Healthcare */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-12 bg-brand-blue-600 rounded-full" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Healthcare
                </h3>
                <p className="text-slate-600">
                  High-demand careers helping people every day
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {programs
                .filter(
                  (p) =>
                    p.slug.includes('cna') ||
                    p.slug.includes('medical') ||
                    p.slug.includes('health')
                )
                .map((program) => (
                  <ProgramCard key={program.slug} program={program} />
                ))}
            </div>
          </div>

          {/* Skilled Trades */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-12 bg-brand-orange-600 rounded-full" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Skilled Trades
                </h3>
                <p className="text-slate-600">
                  Build things. Fix things. Make great money.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {programs
                .filter(
                  (p) =>
                    p.slug.includes('hvac') ||
                    p.slug.includes('building') ||
                    p.slug.includes('cdl')
                )
                .map((program) => (
                  <ProgramCard key={program.slug} program={program} />
                ))}
            </div>
          </div>

          {/* Beauty & Wellness */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-12 bg-purple-600 rounded-full" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Beauty & Wellness
                </h3>
                <p className="text-slate-600">
                  Creative careers with flexible schedules
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {programs
                .filter(
                  (p) =>
                    p.slug.includes('barber') ||
                    p.slug.includes('beauty') ||
                    p.slug.includes('esthetician')
                )
                .map((program) => (
                  <ProgramCard key={program.slug} program={program} />
                ))}
            </div>
          </div>

          {/* Business & Finance */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-12 bg-brand-green-600 rounded-full" />
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Business & Finance
                </h3>
                <p className="text-slate-600">
                  Start your own business or help others succeed
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {programs
                .filter(
                  (p) => p.slug.includes('tax') || p.slug.includes('business')
                )
                .map((program) => (
                  <ProgramCard key={program.slug} program={program} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Human & Encouraging */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            You don't need to figure this out alone. Our advisors are here to
            help you find the right program, get funding, and start training.
          </p>
          <p className="text-lg text-slate-600 mb-8">
            Call us today or apply online. Either way, we'll be in touch within
            24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-brand-orange-600 hover:bg-slate-50 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
            >
              Apply Now
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg transition border-2 border-white"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-slate-600">
              Funded by Indiana Career Connect and WIOA • Serving Indianapolis
              and surrounding areas
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// Program Card Component
function ProgramCard({ program }: { program: any }) {
  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 transition"
    >
      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-orange-600 transition">
        {program.title}
      </h4>
      <p className="text-slate-600 mb-4 line-clamp-2">{program.description}</p>
      <div className="flex items-center gap-2 text-brand-orange-600 font-semibold">
        Learn More
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
      </div>
    </Link>
  );
}
