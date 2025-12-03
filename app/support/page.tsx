// app/support/page.tsx
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Support Services
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Wraparound Support &amp; Coaching
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            At Elevate for Humanity, we believe that training alone isn&apos;t
            enough. Real success requires addressing the whole person—mental
            health, life skills, barriers, and support systems. That&apos;s why
            we offer wraparound services to help you stay on track and thrive.
          </p>
        </header>

        {/* Support services grid */}
        <section className="mb-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Life Coaching &amp; Student Success
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Our Life Coach, Clystjah Woodley, provides one-on-one coaching to
              help you build confidence, set goals, stay accountable, and work
              through personal challenges that may impact your training.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Mindset and motivation coaching</li>
              <li>• Goal setting and accountability</li>
              <li>• Emotional wellness support</li>
              <li>• Navigating personal and family challenges</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Mental Health Support (Partner Provider)
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Through our partnership with Alina Smith, PMHNP, we can connect
              students to mental health assessments, behavioral health support,
              and medication management when needed.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Psychiatric assessments</li>
              <li>• Behavioral health interventions</li>
              <li>• Medication management (ages 5+)</li>
              <li>• Trauma-informed care approach</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Workforce Navigation &amp; Case Management
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Our team helps you navigate workforce systems, connect with
              funding partners, and access community resources that remove
              barriers to training and employment.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• WorkOne and WIOA navigation</li>
              <li>• Re-entry program coordination</li>
              <li>• Referrals to housing, childcare, and transportation</li>
              <li>• Employer connection and job placement support</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Digital Literacy &amp; Technology Access
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Many of our programs include online components. We help students
              who need support with technology, internet access, or basic
              digital skills.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Basic computer and internet skills</li>
              <li>• LMS (learning management system) orientation</li>
              <li>• Device and internet access referrals</li>
              <li>• Ongoing tech troubleshooting</li>
            </ul>
          </article>
        </section>

        {/* Who these services are for */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Who These Services Are For
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            Support services are available to all Elevate students and are
            especially designed for individuals who:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
            <li>
              • Are re-entering the workforce after incarceration or long-term
              unemployment
            </li>
            <li>
              • Face mental health challenges, trauma, or substance use recovery
            </li>
            <li>
              • Need help navigating complex systems (workforce boards, social
              services, etc.)
            </li>
            <li>
              • Lack stable housing, childcare, transportation, or other basic
              needs
            </li>
            <li>
              • Are first-generation students or new to career training programs
            </li>
          </ul>
        </section>

        {/* How to access */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            How to Access Support Services
          </h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold">During enrollment:</span> Your
              advisor will ask about any support needs you have and connect you
              with the right team members or partners.
            </p>
            <p>
              <span className="font-semibold">While in training:</span> You can
              reach out to your instructor, advisor, or student success coach at
              any time if you need help.
            </p>
            <p>
              <span className="font-semibold">After graduation:</span> We
              continue to offer job placement support, employer connections, and
              referrals as you transition into your career.
            </p>
          </div>
        </section>

        {/* Trauma-informed approach */}
        <section className="mb-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Our Trauma-Informed Approach
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity is committed to creating safe, inclusive, and
            supportive learning environments. We recognize that many of our
            students have experienced trauma, systemic barriers, or significant
            life challenges. Our staff is trained to:
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
            <li>• Listen without judgment</li>
            <li>• Respect your privacy and autonomy</li>
            <li>• Provide flexible, individualized support</li>
            <li>• Connect you with trusted community partners</li>
            <li>• Advocate for your success at every step</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-slate-900 p-5 text-white">
          <h2 className="text-lg font-semibold">
            Need Support? We&apos;re Here to Help.
          </h2>
          <p className="mt-2 text-xs text-slate-100">
            Whether you&apos;re just exploring training options or already
            enrolled, our support team is ready to help you overcome barriers
            and build a path forward.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Apply Now
            </Link>
            <Link
              href="/advising"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Talk With an Advisor
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Meet Our Team
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
