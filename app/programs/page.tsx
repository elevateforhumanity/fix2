import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/app/data/programs';
import { Metadata } from 'next';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
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

      {/* Hero Section - Video Background */}
      <section className="relative text-white overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source
            src="/videos/programs-overview-video-with-narration.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content Container */}
        <div className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl">
              {/* Indiana Career Connect Badge */}
              <a
                href="https://www.in.gov/dwd/career-connect/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 px-6 py-3 rounded-full mb-8 transition border border-white/20 group"
              >
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">
                  Funded by Indiana Career Connect
                </span>
                <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition" />
              </a>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Your Future Starts Here
              </h1>

              {/* Key Highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ 100% Free Training
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ No Student Debt
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-lg">
                  ✓ Real Jobs Waiting
                </div>
              </div>

              <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
                Real training. Real jobs. Real support. And it's 100% free.
              </p>

              {/* Story Box */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-10">
                <p className="text-lg text-white leading-relaxed mb-4">
                  <strong className="text-yellow-300">Here's the truth:</strong>{' '}
                  You don't need a college degree to build a great career. You
                  need the right training, the right support, and someone who
                  believes in you.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Whether you're starting fresh, changing careers, or getting
                  back on your feet—we're here to help you build the life you
                  want. Every program is fully funded through{' '}
                  <strong className="text-yellow-300">
                    Indiana Career Connect
                  </strong>{' '}
                  and WIOA. No tuition. No debt. Just opportunity.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  Apply Now - It's Free
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:3173143757"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
                >
                  <Phone className="w-5 h-5" />
                  (317) 314-3757
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>500+ Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>90% Job Placement Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Top Employer Partners</span>
                </div>
              </div>
            </div>
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

      {/* Programs Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              All programs are 100% free and lead to industry-recognized
              certifications. We offer training in four key areas.
            </p>
          </div>

          {/* Healthcare Category */}
          <div className="mb-12">
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-16 bg-blue-600 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Healthcare
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    Start a rewarding career helping people every day.
                    Healthcare jobs are in high demand, offer stable income, and
                    provide clear paths for advancement.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Certified Nursing Assistant (CNA)
                      </h4>
                      <p className="text-sm text-slate-600">
                        4-8 weeks • Patient care in hospitals, nursing homes,
                        and home health
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Medical Assistant
                      </h4>
                      <p className="text-sm text-slate-600">
                        8-12 weeks • Clinical and administrative support in
                        medical offices
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/programs/cna"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
                  >
                    Explore Healthcare Programs
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Skilled Trades Category */}
          <div className="mb-12">
            <div className="bg-orange-50 rounded-2xl p-8 md:p-12 border border-orange-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-16 bg-orange-600 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Skilled Trades
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    Build things. Fix things. Make great money. Skilled trades
                    offer excellent pay, job security, and the satisfaction of
                    working with your hands.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        HVAC Technician
                      </h4>
                      <p className="text-sm text-slate-600">
                        16-24 weeks • Install and repair heating, cooling, and
                        refrigeration systems
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        CDL Truck Driver
                      </h4>
                      <p className="text-sm text-slate-600">
                        4-6 weeks • Commercial driving with excellent earning
                        potential
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/programs/hvac-technician"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700 px-6 py-3 rounded-xl font-bold transition"
                  >
                    Explore Skilled Trades Programs
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Beauty & Wellness Category */}
          <div className="mb-12">
            <div className="bg-purple-50 rounded-2xl p-8 md:p-12 border border-purple-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-16 bg-purple-600 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Beauty & Wellness
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    Creative careers with flexible schedules and unlimited
                    earning potential. Build your own clientele and be your own
                    boss.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Barber Apprenticeship
                      </h4>
                      <p className="text-sm text-slate-600">
                        15-17 months • Earn while you learn, graduate debt-free
                        with clients
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Esthetician
                      </h4>
                      <p className="text-sm text-slate-600">
                        12-16 weeks • Skincare, facials, and spa treatments
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/programs/barber-apprenticeship"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-xl font-bold transition"
                  >
                    Explore Beauty & Wellness Programs
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Business & Finance Category */}
          <div className="mb-12">
            <div className="bg-green-50 rounded-2xl p-8 md:p-12 border border-green-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-3 h-16 bg-green-600 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                    Business & Finance
                  </h3>
                  <p className="text-lg text-slate-700 mb-6">
                    Start your own business or help others succeed. Learn
                    valuable skills that open doors to entrepreneurship and
                    financial independence.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Tax Preparation
                      </h4>
                      <p className="text-sm text-slate-600">
                        8-12 weeks • Prepare taxes for individuals and small
                        businesses
                      </p>
                    </div>
                    <div className="bg-white/60 backdrop-blur rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 mb-2">
                        Small Business Management
                      </h4>
                      <p className="text-sm text-slate-600">
                        12-16 weeks • Learn to start and run your own business
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition"
                  >
                    Explore Business Programs
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern & Encouraging */}
      <section className="py-20 bg-brand-orange-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change Your Life?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed max-w-3xl mx-auto">
            You don't need to figure this out alone. Our advisors are here to
            help you find the right program, get funding, and start training.
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Call us today or apply online. Either way, we'll be in touch within
            24 hours to help you get started.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
            >
              Apply Now - It's Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">24hrs</div>
              <div className="text-white/80">Response Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">$0</div>
              <div className="text-white/80">Out of Pocket</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-white/80">Job Placement</div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70">
              Funded by Indiana Career Connect and WIOA • Serving Indianapolis
              and surrounding areas • Equal Opportunity Provider
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
