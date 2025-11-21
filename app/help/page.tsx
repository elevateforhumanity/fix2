// app/help/page.tsx
import Link from 'next/link';

const sections = [
  {
    title: 'Students',
    items: [
      {
        title: 'Getting Started',
        href: '/help/students/getting-started',
        description: 'Create your account, enroll in programs, and access your courses.',
      },
      {
        title: 'Attendance and Progress',
        href: '/help/students/attendance-progress',
        description: 'How attendance is tracked and how to stay in good standing.',
      },
      {
        title: 'Certificates and Credentials',
        href: '/help/students/certificates',
        description: 'When and how certificates are issued after completion.',
      },
    ],
  },
  {
    title: 'Instructors and Program Holders',
    items: [
      {
        title: 'Managing Your Cohort',
        href: '/help/instructors/cohort-management',
        description: 'Take attendance, track progress, and support your students.',
      },
      {
        title: 'Reporting and Compliance',
        href: '/help/instructors/reporting',
        description: 'What data must be submitted for WIOA, WRG, DOL, and state partners.',
      },
      {
        title: 'Scheduling Live Sessions',
        href: '/help/instructors/live-sessions',
        description: 'Use Zoom/Teams to schedule live classes with your cohort.',
      },
    ],
  },
  {
    title: 'Administrators and Partners',
    items: [
      {
        title: 'Tenant and Site Setup',
        href: '/help/admin/tenant-setup',
        description: 'Configure white-label branding, domains, and feature flags.',
      },
      {
        title: 'Compliance and Audits',
        href: '/help/admin/compliance',
        description: 'How Elevate supports DOL, WIOA, FERPA, and data privacy audits.',
      },
      {
        title: 'Support and Escalations',
        href: '/help/admin/support',
        description: 'How to contact support, open tickets, and escalate issues.',
      },
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Elevate for Humanity Help Center
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How can we help you today?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Guides for students, instructors, employers, and administrators using the Elevate
            Workforce and LMS platform.
          </p>
        </header>

        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-xl">
            <input
              type="search"
              placeholder='Search help articles (e.g. "barber apprenticeship attendance")'
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group block rounded-xl px-3 py-2 transition hover:bg-orange-50"
                    >
                      <p className="text-sm font-medium text-slate-900 group-hover:text-orange-600">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Still need help?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Contact our support team or your Elevate site coordinator for one-on-one assistance.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="mailto:Elevate4humanityedu@gmail.com"
              className="rounded-2xl border border-orange-500 px-4 py-2 font-medium text-orange-600 transition hover:bg-orange-50"
            >
              Email Support
            </a>
            <Link
              href="/contact"
              className="rounded-2xl bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
            >
              Contact Form
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
