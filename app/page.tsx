import Image from 'next/image';
import Link from 'next/link';
import PrimaryCtas from '@/components/home/PrimaryCtas';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-10 pb-6 sm:pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
              Workforce training that leads to real careers — with funding
              pathways built in.
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-zinc-700">
              Elevate for Humanity helps people enroll in career programs and
              helps partners deliver training through a platform built for
              workforce, reentry, and community impact.
            </p>

            <PrimaryCtas />

            <div className="mt-4 sm:mt-5 text-sm sm:text-base text-zinc-600">
              Serving individuals, schools, employers, and community partners
              across Indiana and beyond.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900">
            How Elevate for Humanity Works
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-zinc-700 px-4">
            Apply in minutes, explore funding options, train with support, and
            track your progress toward employment.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center max-w-2xl mx-auto">
            <Link
              className="rounded-lg sm:rounded-xl bg-zinc-900 text-white px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-bold hover:bg-zinc-800 transition text-sm sm:text-base text-center whitespace-nowrap"
              href="/apply"
            >
              Start Inquiry
            </Link>
            <Link
              className="rounded-lg sm:rounded-xl border border-zinc-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-bold hover:bg-zinc-50 transition text-sm sm:text-base text-center whitespace-nowrap"
              href="/funding"
            >
              Funding Options
            </Link>
            <Link
              className="rounded-lg sm:rounded-xl border border-zinc-300 bg-white px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-bold hover:bg-zinc-50 transition text-sm sm:text-base text-center whitespace-nowrap"
              href="/programs"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* THREE LANES */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900">
            Choose your path
          </h2>

          <div className="mt-4 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Students */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="relative w-full h-[200px] sm:h-[280px] md:h-[320px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="https://i.imgur.com/NK9RJzf.png"
                  alt="Students training"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-zinc-900">
                For Students
              </h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-700">
                Explore training programs, get help with enrollment, and review
                funding options that may reduce or cover tuition.
              </p>
              <Link
                className="mt-3 sm:mt-4 inline-flex font-bold text-zinc-900 hover:underline text-sm sm:text-base"
                href="/students"
              >
                Explore Programs →
              </Link>
            </div>

            {/* Partners */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="relative w-full h-[200px] sm:h-[280px] md:h-[320px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="https://i.imgur.com/0ERBaW6.png"
                  alt="Platform and partners"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-zinc-900">
                For Schools & Training Providers
              </h3>
              <p className="mt-2 text-zinc-700">
                Deliver programs through a platform built for enrollment,
                learning, reporting, and payments—ready for scaling and
                licensing.
              </p>
              <Link
                className="mt-4 inline-flex font-bold text-zinc-900 hover:underline"
                href="/platform"
              >
                View the Platform →
              </Link>
            </div>

            {/* Community */}
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="relative w-full h-[200px] sm:h-[280px] md:h-[320px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="https://i.imgur.com/maxIuYA.png"
                  alt="Community impact"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-zinc-900">
                For Employers & Community Partners
              </h3>
              <p className="mt-2 text-zinc-700">
                Build talent pipelines, support reentry and workforce growth,
                and connect people to real opportunities.
              </p>
              <Link
                className="mt-4 inline-flex font-bold text-zinc-900 hover:underline"
                href="/employers"
              >
                Partner With EFH →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM SNAPSHOT */}
      <section className="px-4 sm:px-6 lg:px-10 py-8 sm:py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-6 sm:gap-10 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900">
              One platform. Multiple apps. Built to scale.
            </h2>
            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-zinc-700">
              <li>• LMS (courses, tracking, completions)</li>
              <li>• Enrollment & intake workflow</li>
              <li>• Roles & permissions (students, staff, partners)</li>
              <li>• Payments powered by Stripe + flexible options</li>
              <li>• Partner dashboards and licensing-ready structure</li>
            </ul>
            <div className="mt-4 sm:mt-6">
              <Link
                className="rounded-lg sm:rounded-xl bg-zinc-900 text-white px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-bold hover:bg-zinc-800 inline-flex transition text-sm sm:text-base"
                href="/platform/apps"
              >
                See Apps & Licensing
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="https://i.imgur.com/Lvty4ct.png"
                alt="Platform screenshot 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="https://i.imgur.com/nxWQwY9.png"
                alt="Platform screenshot 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="https://i.imgur.com/t4e5S07.png"
                alt="Platform screenshot 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg sm:rounded-xl overflow-hidden border border-zinc-200 bg-white">
              <Image
                src="https://i.imgur.com/7QrL7kQ.png"
                alt="Platform screenshot 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* TRUST + PAYMENTS */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
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
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-sans font-bold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Enroll Now
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-sans font-bold hover:bg-zinc-50 inline-flex justify-center transition"
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
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Ready to get started?
          </h2>
          <p className="mt-2 text-zinc-700">
            Apply today or connect with our team. Partners can license the
            platform.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-5 py-3 font-sans font-bold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Apply Today
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-sans font-bold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/contact"
            >
              Talk to Our Team
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 font-sans font-bold hover:bg-zinc-50 inline-flex justify-center transition"
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
