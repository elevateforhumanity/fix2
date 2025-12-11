'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] gap-8 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-300 mb-2">
              Career &amp; Technical Institute • Indianapolis, IN
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Breaking Barriers, Building Futures
            </h1>
            <p className="text-sm md:text-base text-slate-100 mb-4 max-w-xl">
              We see your potential, not your past. 100% free career training
              through government funding. No tuition. No debt. Real credentials.
              Real jobs waiting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition"
              >
                Contact Us
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center rounded-full border border-slate-400 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                View Programs
              </Link>
            </div>
          </div>

          <div className="relative w-full h-60 md:h-72 lg:h-80 rounded-3xl overflow-hidden">
            <Image
              src="/images/facility-hero.jpg"
              alt="Elevate for Humanity – Modern Training Facility"
              fill
              priority
              quality={70}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MODERN TRAINING FACILITY */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Modern Training Facility
            </h2>
            <p className="text-slate-700 mb-6 max-w-xl">
              Train in a professional, state-of-the-art environment designed for
              hands-on learning and real-world experience.
            </p>

            <dl className="grid sm:grid-cols-3 gap-4 mb-6">
              <FacilityCard
                title="Hands-On Labs"
                body="Practice with real equipment in industry-standard training spaces."
              />
              <FacilityCard
                title="Expert Instructors"
                body="Learn from experienced professionals with real industry expertise."
              />
              <FacilityCard
                title="Career Services"
                body="Job placement assistance and ongoing career support."
              />
            </dl>

            <p className="text-sm text-slate-700 mb-2">
              <span className="font-semibold">Located in Indianapolis, IN</span>
            </p>
            <p className="text-sm text-slate-600 mb-4">
              8888 Keystone Crossing, Suite 1300 • Easy access via public
              transportation.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
              >
                Schedule a Tour
              </Link>
              <a
                href="https://maps.google.com/?q=8888+Keystone+Crossing+Indianapolis+IN"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="/images/facility-hero.jpg"
              alt="Hands-on training labs at Elevate for Humanity"
              fill
              quality={70}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SHORT-TERM TRAINING & FUNDING PATHS */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Short-Term Training, Real Credentials
          </h2>
          <p className="text-slate-700 max-w-2xl mb-4">
            Our hybrid programs combine online learning with hands-on training.
            Most programs take 4–12 weeks, not years.
          </p>
          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 inline-block mb-6">
            <span className="font-semibold">100% FREE</span> if you qualify for
            government funding.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <FundingCard
              badge="1"
              title="WRG - Workforce Ready Grant"
              body="Indiana residents get 100% FREE short-term training (4–12 weeks). Study online at your own pace, complete hands-on requirements, and earn industry credentials. No income limits. No age limits."
              examples="Examples: CNA, HVAC, CDL, Medical Assistant"
            />
            <FundingCard
              badge="2"
              title="WIOA - Workforce Innovation"
              body="Federal funding for unemployed or underemployed workers. Covers tuition, books, transportation, and support services. Hybrid format: online coursework + in-person skills training."
              examples="Timeline: 4–16 weeks depending on program."
            />
            <FundingCard
              badge="3"
              title="Registered Apprenticeships"
              body="Longer programs (12–18 months) where you earn while you learn. Work in real jobs, get paid, complete online coursework, and graduate with experience and credentials. No student debt."
              examples="Examples: HVAC Technician, Building Maintenance."
            />
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
            >
              Not sure which path is right for you? Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* TAX BUSINESS PROGRAM HIGHLIGHT */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)] gap-8 items-center">
          <div>
            <p className="text-xs font-semibold text-amber-700 tracking-[0.18em] uppercase mb-1">
              High-Demand Career
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Start Your Own Tax Business
            </h2>
            <p className="text-slate-700 mb-3">
              Launch a profitable tax preparation business with our
              comprehensive training program. Earn $40,000–$100,000+ per year
              helping individuals and small businesses with tax filing,
              bookkeeping, and financial services.
            </p>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              What You&apos;ll Learn:
            </h3>
            <ul className="text-sm text-slate-700 space-y-1 mb-4">
              <li>• IRS-approved tax preparation certification</li>
              <li>• Business setup &amp; licensing (LLC, EIN, PTIN)</li>
              <li>• Tax software training (TurboTax, H&amp;R Block, Drake)</li>
              <li>• Marketing &amp; client acquisition strategies</li>
              <li>• Bookkeeping &amp; year-round income streams</li>
            </ul>

            <dl className="grid grid-cols-2 gap-4 text-sm mb-5 max-w-sm">
              <div>
                <dt className="text-xs text-slate-500">Training Duration</dt>
                <dd className="font-semibold text-slate-900">8–12 weeks</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Startup Costs</dt>
                <dd className="font-semibold text-slate-900">$0–$500</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/programs/tax-preparation"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                Talk to Advisor
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative w-full h-52 md:h-64 rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/images/tax-business-highlight.jpg"
                alt="Tax business training at Elevate for Humanity"
                fill
                quality={70}
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-40 md:h-48 rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/images/business-highlight.jpg"
                alt="Business & Entrepreneurship at Elevate for Humanity"
                fill
                quality={70}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BUILD YOUR BUSINESS SECTION */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Build Your Business, Build Your Future
          </h2>
          <p className="text-slate-700 max-w-3xl mb-4">
            Our programs don&apos;t just teach you a skill—they prepare you to
            become an entrepreneur. Whether you want to open your own
            barbershop, start a mobile grooming business, or launch a healthcare
            practice, we give you the tools to succeed.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <FeatureCard
              title="Business Planning & Strategy"
              body="Learn how to create a business plan, manage finances, and grow your brand."
            />
            <FeatureCard
              title="Marketing & Client Acquisition"
              body="Master social media, networking, and customer retention strategies."
            />
            <FeatureCard
              title="Licensing & Legal Compliance"
              body="Navigate permits, insurance, and regulations with confidence."
            />
            <FeatureCard
              title="Ongoing Mentorship"
              body="Connect with successful entrepreneurs and get guidance as you grow."
            />
          </div>

          <p className="text-sm text-slate-700 max-w-xl mb-3">
            <span className="font-semibold">Success Story:</span> 73% of our
            barber graduates either own their own chair or have opened their own
            shop within 2 years of graduation.
          </p>

          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Explore Programs
          </Link>
        </div>
      </section>

      {/* REAL STORIES, REAL SUCCESS */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)] gap-8 items-center">
          <div className="relative w-full h-56 md:h-72 rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="/images/testimonial-hero.jpg"
              alt="Elevate for Humanity success story"
              fill
              quality={70}
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Real Stories, Real Success
            </h2>

            <blockquote className="text-sm md:text-base text-slate-800 mb-3">
              &quot;Elevate for Humanity changed my life. I went from working
              two jobs and barely making ends meet to becoming a licensed barber
              with my own chair. The training was free through WIOA, and I
              started earning while I learned through the apprenticeship
              program. Now I&apos;m making more than I ever thought possible,
              and I have a skill no one can take away from me.&quot;
            </blockquote>

            <p className="text-sm font-semibold text-slate-900">
              Marcus Johnson
            </p>
            <p className="text-xs text-slate-600">
              Barber Apprenticeship Graduate — Now earning $65,000+/year
            </p>

            <dl className="grid grid-cols-3 gap-4 text-sm mt-5 max-w-md">
              <StatsCard label="Job Placement Rate" value="95%" />
              <StatsCard label="Average Student Debt" value="$0" />
              <StatsCard label="Lives Changed" value="500+" />
            </dl>

            <div className="mt-4">
              <Link
                href="/success-stories"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                Read More Success Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO START CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 lg:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Ready to Start?
            </h2>
            <p className="text-sm md:text-base text-slate-100 max-w-xl mb-2">
              Contact us and begin training within 2 weeks, depending on funding
              and program availability.
            </p>
            <p className="text-xs text-slate-300">
              Questions? Call{' '}
              <span className="font-semibold">317-314-3757</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Talk to Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* SMALL COMPONENTS */

function FacilityCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{body}</p>
    </div>
  );
}

function FundingCard({
  badge,
  title,
  body,
  examples,
}: {
  badge: string;
  title: string;
  body: string;
  examples: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-2">
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-xs font-semibold text-white mb-1">
        {badge}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-700">{body}</p>
      <p className="text-xs text-slate-500">{examples}</p>
    </div>
  );
}

function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{body}</p>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-base font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
