// app/advising/page.tsx
import Link from "next/link";

export default function AdvisingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Advising &amp; Support
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Talk With an Advisor
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Our advisors help you navigate funding options, program selection,
            enrollment, and any barriers you may be facing. Whether you&apos;re
            exploring your first career training or rebuilding after setbacks,
            we&apos;re here to walk with you.
          </p>
        </header>

        {/* What advisors help with */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            What Our Advisors Help With
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-xs text-slate-700">
            <ul className="space-y-1.5">
              <li>• Understanding which programs match your goals</li>
              <li>• Identifying funding you may qualify for (WIOA, WRG, JRI)</li>
              <li>• Connecting you with WorkOne and workforce partners</li>
              <li>• Reviewing your background and any barriers</li>
            </ul>
            <ul className="space-y-1.5">
              <li>• Explaining program schedules and requirements</li>
              <li>• Helping with enrollment paperwork</li>
              <li>• Connecting you to support services (housing, childcare, etc.)</li>
              <li>• Answering questions about licensure and job placement</li>
            </ul>
          </div>
        </section>

        {/* How to connect */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            How to Connect With an Advisor
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Call Us</h3>
              <p className="mt-2 text-xs text-slate-700">
                The fastest way to talk with someone is to call during business
                hours.
              </p>
              <p className="mt-3 text-sm font-semibold text-red-600">
                <a href="tel:317-314-3757" className="hover:underline">
                  317-314-3757
                </a>
              </p>
            </article>

            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">Email Us</h3>
              <p className="mt-2 text-xs text-slate-700">
                Send us a message and we&apos;ll respond within 1-2 business
                days.
              </p>
              <p className="mt-3 text-xs font-semibold text-red-600 break-all">
                <a
                  href="mailto:elevateforhumanity.edu@gmail.com"
                  className="hover:underline"
                >
                  elevateforhumanity.edu@gmail.com
                </a>
              </p>
            </article>

            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                Visit In Person
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                Stop by our office to meet with an advisor face-to-face.
              </p>
              <p className="mt-3 text-xs text-slate-700">
                8888 Keystone Crossing, Suite 1400
                <br />
                Indianapolis, IN 46240
              </p>
            </article>
          </div>
        </section>

        {/* Who you'll work with */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Who You&apos;ll Work With
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            Our advising team includes workforce development specialists, life
            coaches, and program coordinators who understand the challenges
            you&apos;re facing. We work closely with WorkOne, re-entry programs,
            and community partners to help you access the resources you need.
          </p>
          <p className="mt-3 text-sm text-slate-700">
            If you need mental health support, housing assistance, childcare
            referrals, or other wraparound services, we can connect you with
            trusted partners.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-lg font-semibold">Ready to Get Started?</h2>
          <p className="mt-2 text-xs text-slate-100">
            The best first step is to apply or reach out directly. We&apos;ll
            schedule time to talk through your goals, answer your questions, and
            build a plan that works for you.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Contact Form
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
