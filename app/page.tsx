import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/home/HeroVideo';
import PrimaryCtas from '@/components/home/PrimaryCtas';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-10 pt-10 pb-10">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900">
              Workforce training that leads to real careers — with funding
              pathways built in.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-700 max-w-xl">
              Elevate for Humanity helps people enroll in career programs and
              helps partners deliver training through a platform built for
              workforce, reentry, and community impact.
            </p>

            <PrimaryCtas />

            <div className="mt-5 text-sm text-zinc-600">
              Serving individuals, schools, employers, and community partners
              across Indiana and beyond.
            </div>
          </div>

          <div className="w-full">
            <HeroVideo
              src="/videos/success-stories-video-with-narration.mp4"
              poster="/images/hero-poster.jpg"
              className="max-h-[480px]"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            How Elevate for Humanity Works
          </h2>
          <p className="mt-3 text-zinc-700">
            Apply in minutes, explore funding options, train with support, and
            track your progress toward employment.
          </p>

          <div className="mt-8">
            <HeroVideo
              src="/videos/success-stories-video-with-narration.mp4"
              poster="/images/hero-poster.jpg"
              className="mx-auto max-w-[720px]"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-extrabold hover:bg-zinc-800 transition"
              href="/apply"
            >
              Start Inquiry
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-extrabold hover:bg-zinc-50 transition"
              href="/funding"
            >
              See Funding Options
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-extrabold hover:bg-zinc-50 transition"
              href="/programs"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* THREE LANES */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Choose your path
          </h2>

          <div className="mt-7 grid md:grid-cols-3 gap-6">
            {/* Students */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/heroes/student-career.jpg"
                  alt="Students training"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                For Students
              </h3>
              <p className="mt-2 text-zinc-700">
                Explore training programs, get help with enrollment, and review
                funding options that may reduce or cover tuition.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/students"
              >
                Explore Programs →
              </Link>
            </div>

            {/* Partners */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/heroes/training-provider-1.jpg"
                  alt="Platform and partners"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                For Schools & Training Providers
              </h3>
              <p className="mt-2 text-zinc-700">
                Deliver programs through a platform built for enrollment,
                learning, reporting, and payments—ready for scaling and
                licensing.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/platform"
              >
                View the Platform →
              </Link>
            </div>

            {/* Community */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/learners/reentry-coaching.jpg"
                  alt="Community impact"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                For Employers & Community Partners
              </h3>
              <p className="mt-2 text-zinc-700">
                Build talent pipelines, support reentry and workforce growth,
                and connect people to real opportunities.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/employers"
              >
                Partner With EFH →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM SNAPSHOT */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              One platform. Multiple apps. Built to scale.
            </h2>
            <ul className="mt-4 space-y-2 text-zinc-700">
              <li>• LMS (courses, tracking, completions)</li>
              <li>• Enrollment & intake workflow</li>
              <li>• Roles & permissions (students, staff, partners)</li>
              <li>• Payments powered by Stripe + flexible options</li>
              <li>• Partner dashboards and licensing-ready structure</li>
            </ul>
            <div className="mt-6">
              <Link
                className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-extrabold hover:bg-zinc-800 inline-flex transition"
                href="/platform/apps"
              >
                See Apps & Licensing
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[240px] rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="/images/gallery/image3.jpg"
                alt="Platform screenshot 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[240px] rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="/images/gallery/image6.jpg"
                alt="Platform screenshot 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[240px] rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="/images/gallery/image8.jpg"
                alt="Platform screenshot 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[240px] rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="/images/heroes/programs.jpg"
                alt="Platform screenshot 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Popular programs
              </h2>
              <p className="mt-2 text-zinc-700">
                Start with a program that matches your goals. We'll help you
                understand eligibility, timelines, and support options.
              </p>
            </div>
            <Link
              className="hidden sm:inline-flex font-extrabold text-zinc-900 hover:underline"
              href="/programs"
            >
              View all →
            </Link>
          </div>

          <div className="mt-7 grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Barber Apprenticeship',
                img: '/images/programs/barber-hero.jpg',
                href: '/programs/barber-apprenticeship',
              },
              {
                title: 'Tax & Finance Certificate',
                img: '/images/tax-office-1.jpg',
                href: '/programs/tax-prep-financial-services',
              },
              {
                title: 'CNA / Healthcare Pathway',
                img: '/images/programs/efh-cna-hero.jpg',
                href: '/programs/cna',
              },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-zinc-100">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-lg font-black text-zinc-900">
                  {p.title}
                </div>
                <div className="mt-2 text-sm text-zinc-700">
                  Hybrid options • Clear milestones • Enrollment support
                </div>
                <div className="mt-4 font-extrabold text-zinc-900">
                  View details →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              className="inline-flex font-extrabold text-zinc-900 hover:underline"
              href="/programs"
            >
              View all programs →
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST + PAYMENTS */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              Simple, secure payments when needed
            </h2>
            <p className="mt-3 text-zinc-700">
              We accept major credit/debit cards and offer flexible payment
              options at checkout when available. Secure payments are powered by
              Stripe.
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Payment options shown at checkout vary by eligibility.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-start lg:justify-end">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-extrabold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Enroll Now
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-extrabold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/platform"
            >
              View Licenses
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Ready to get started?
          </h2>
          <p className="mt-2 text-zinc-700">
            Apply today or connect with our team. Partners can license the
            platform.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-extrabold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Apply Today
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-extrabold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/contact"
            >
              Talk to Our Team
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-extrabold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/platform/licensing"
            >
              Partner / License the Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
