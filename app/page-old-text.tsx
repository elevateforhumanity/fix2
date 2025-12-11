'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      {/* VIDEO HERO BANNER */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative w-full aspect-[16/9] min-h-[400px] md:min-h-[600px] overflow-hidden bg-gradient-to-br from-orange-500 to-blue-600">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-home.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-sm text-slate-600">Free Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">4-12</div>
              <div className="text-sm text-slate-600">Weeks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">$0</div>
              <div className="text-sm text-slate-600">Tuition</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">Real</div>
              <div className="text-sm text-slate-600">Jobs</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Popular Programs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/programs/barber-apprenticeship" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">✂️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    Barber Apprenticeship
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">Earn while you learn. 12-18 months.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/cna" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                  <span className="text-6xl">🏥</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    CNA Healthcare
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">Fast-track certification. 4-8 weeks.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>

            <Link href="/programs/hvac-technician" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-6xl">🛠️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition">
                    HVAC Technician
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">High-paying trade. 8-12 weeks.</p>
                  <span className="text-orange-500 font-semibold text-sm">Learn More →</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600"
            >
              View All Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            100% Free Training
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Apply</h3>
              <p className="text-slate-600">Quick 2-minute application. We help with funding.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Train</h3>
              <p className="text-slate-600">4-12 weeks. Online + hands-on. Real equipment.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Work</h3>
              <p className="text-slate-600">Job placement help. Real credentials. Real jobs.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition"
            >
              Start Your Application
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
