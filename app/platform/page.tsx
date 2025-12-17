import Link from 'next/link';

export const metadata = {
  title: 'Workforce Operating System | Elevate for Humanity',
  description:
    'A complete workforce operating system for training providers, workforce boards, and employers. Manage programs, track apprenticeships, and generate compliance reports in one secure platform.',
};

export default function PlatformPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            Elevate for Humanity Workforce Operating System
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-700 leading-relaxed">
            Elevate for Humanity is a modern Workforce Operating System designed
            to power training programs, apprenticeships, and workforce
            initiatives at scale.
          </p>
          <p className="mt-4 text-lg text-zinc-700 leading-relaxed">
            Built from the ground up for compliance, funding alignment, and
            real-world outcomes, the platform replaces fragmented tools with one
            secure, integrated system that supports learners, administrators,
            employers, and workforce agencies—without custom development.
          </p>
          <p className="mt-6 text-xl font-bold text-zinc-900">
            This is not a course platform.
            <br />
            This is workforce infrastructure.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?topic=platform-demo"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              href="/licensing"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-zinc-900 bg-white border-2 border-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-zinc-900 text-center">
            Who It's For
          </h2>
          <p className="mt-4 text-lg text-zinc-700 text-center max-w-3xl mx-auto">
            The Elevate platform is used by:
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-bold text-zinc-900">
                Workforce training providers and schools
              </h3>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-bold text-zinc-900">
                Apprenticeship sponsors and employer partners
              </h3>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-bold text-zinc-900">
                Workforce boards and government programs
              </h3>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-bold text-zinc-900">
                Nonprofits delivering funded training
              </h3>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <h3 className="text-lg font-bold text-zinc-900">
                Enterprises running internal workforce pipelines
              </h3>
            </div>
          </div>
          <p className="mt-8 text-center text-zinc-700">
            Whether you are operating a single program or managing multiple
            organizations under one umbrella, the system scales with you.
          </p>
        </div>
      </section>

      {/* What the Platform Does */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black text-zinc-900 text-center mb-12">
            What the Platform Does
          </h2>

          <div className="space-y-12">
            {/* Multi-Tenant */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">
                Multi-Tenant Organization Management
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Operate multiple organizations, programs, and partners inside
                one system with full data separation and role-based access.
              </p>
              <p className="mt-4 text-zinc-700">Each organization has:</p>
              <ul className="mt-2 list-disc list-inside text-zinc-700 space-y-1">
                <li>Its own users, settings, programs, and reporting</li>
                <li>Secure data isolation</li>
                <li>Configurable features and permissions</li>
              </ul>
            </div>

            {/* Learning Management */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">
                Learning Management + Apprenticeships
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Deliver online, in-person, hybrid, and apprenticeship programs
                from one platform.
              </p>
              <p className="mt-4 text-zinc-700">Supports:</p>
              <ul className="mt-2 list-disc list-inside text-zinc-700 space-y-1">
                <li>Online theory and coursework</li>
                <li>On-the-job training tracking</li>
                <li>Earn While You Learn apprenticeship models</li>
                <li>Program completion and credential issuance</li>
              </ul>
            </div>

            {/* Workforce Funding */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">
                Workforce Funding & Compliance Alignment
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Designed to work with workforce funding models instead of
                fighting them.
              </p>
              <p className="mt-4 text-zinc-700">Supports:</p>
              <ul className="mt-2 list-disc list-inside text-zinc-700 space-y-1">
                <li>WIOA, WRG, JRI, employer-paid, and self-pay programs</li>
                <li>Attendance and participation tracking</li>
                <li>Compliance-ready reporting</li>
                <li>FERPA-aware student data handling</li>
              </ul>
            </div>

            {/* Reporting */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">
                Reporting & Outcomes
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Built-in reporting views provide real insight without
                spreadsheets.
              </p>
              <p className="mt-4 text-zinc-700">Track:</p>
              <ul className="mt-2 list-disc list-inside text-zinc-700 space-y-1">
                <li>Enrollments and completions</li>
                <li>Program progress</li>
                <li>Apprenticeship participation</li>
                <li>Credentials earned</li>
                <li>Workforce outcomes (where applicable)</li>
              </ul>
              <p className="mt-4 text-zinc-700">
                Reports are organization-scoped, exportable, and designed for
                audits and funding reviews.
              </p>
            </div>

            {/* Security */}
            <div>
              <h3 className="text-2xl font-bold text-zinc-900">
                Secure by Design
              </h3>
              <p className="mt-4 text-lg text-zinc-700">
                Security is not optional.
              </p>
              <p className="mt-4 text-zinc-700">The platform includes:</p>
              <ul className="mt-2 list-disc list-inside text-zinc-700 space-y-1">
                <li>Row Level Security (RLS) across all tenant data</li>
                <li>Role-based access control</li>
                <li>Admin, staff, instructor, and partner roles</li>
                <li>Secure invite and onboarding flows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose Elevate */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-zinc-900 text-center mb-8">
            Why Organizations Choose Elevate
          </h2>
          <ul className="space-y-3 text-lg text-zinc-700">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              Faster deployment than custom builds
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              Lower cost than enterprise LMS + reporting stacks
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              Designed for workforce funding realities
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              Built for licensing, not one-off use
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-2">✓</span>
              Proven in real training and apprenticeship environments
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-zinc-900">
            Ready to See It in Action?
          </h2>
          <p className="mt-4 text-lg text-zinc-700">
            Elevate for Humanity licenses this platform to approved partners.
          </p>
          <p className="mt-4 text-lg text-zinc-700">
            If you are exploring a workforce deployment, training expansion, or
            apprenticeship infrastructure, we invite you to start a
            conversation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?topic=platform-demo"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              href="/licensing"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-zinc-900 bg-white border-2 border-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
