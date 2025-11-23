// app/platform/partner-portal/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Portal - Training Provider Management",
  description: "Partner portal for training providers and academies. Manage students, track attendance, handle compliance, and coordinate with workforce boards.",
  keywords: ["partner portal", "training provider portal", "academy management", "compliance tracking", "student management"],
  openGraph: {
    title: "Partner Portal | Elevate for Humanity",
    description: "Training provider portal. Manage students, track attendance, and handle compliance.",
    images: ["/images/homepage/training-provider-partnerships.png"],
    type: "website",
  },
};

export default function PartnerPortalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
          Platform • Training Provider / Partner Portal
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          Partner Portal – schools teach, Elevate handles the compliance.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-200">
          The Partner Portal is built for training providers, academy owners,
          and community organizations that deliver hands-on instruction while
          Elevate manages the funded training infrastructure in the background.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            What partners can do
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              • View rosters of students assigned to their program, along with
              basic funding status and start/end dates.
            </li>
            <li>
              • Record attendance and key milestones (labs, clinicals, exams,
              state tests).
            </li>
            <li>
              • Upload documents needed for compliance and audits when required.
            </li>
            <li>
              • Coordinate with Elevate staff on schedule changes, make-up days,
              and cohort planning.
            </li>
            <li>
              • See high-level outcomes and feedback to improve future cohorts.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Ideal for credentialing partners and academy owners
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Whether the partner is a beauty/barber academy, a medical training
            institute, an HVAC school, or another provider, the Portal keeps the
            experience consistent while honoring each partner&apos;s teaching
            style and brand.
          </p>
        </section>
      </div>
    </main>
  );
}
