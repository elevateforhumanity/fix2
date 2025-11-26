// app/platform/employer-portal/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employer Portal - OJT, WEX & Workforce Management",
  description: "Employer portal for managing OJT, WEX, and apprenticeship programs. Track candidates, document hours, and access wage reimbursement reporting.",
  keywords: ["employer portal", "OJT management", "WEX program", "apprenticeship tracking", "wage reimbursement"],
  openGraph: {
    title: "Employer Portal | Elevate for Humanity",
    description: "Manage OJT, WEX, and apprenticeship programs. Track candidates and access wage reimbursement reporting.",
    images: ["/images/facilities-new/facility-3.jpg"],
    type: "website",
  },
};

export default function EmployerPortalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
          Platform • Employer Portal
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          Employer Portal – OJT, WEX, and upskilling made simple.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-200">
          The Employer Portal gives hiring partners a clear window into their
          candidates and current employees who are in Elevate programs. It also
          makes it easier to document OJT, WEX, and apprenticeship hours for
          wage reimbursement and grant reporting.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            What employers can do
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              • Request candidates for specific roles and pathways (CNA,
              Medical Assistant, HVAC, CDL, and more).
            </li>
            <li>
              • See basic profiles and training status for referred candidates.
            </li>
            <li>
              • Log OJT/WEX hours, supervision notes, and performance feedback.
            </li>
            <li>
              • View which hires may qualify for wage reimbursement or other
              incentives.
            </li>
            <li>
              • Communicate with Elevate staff about attendance or performance
              concerns before they become major issues.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Built for real-world HR and operations
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            Employers do not have time to learn another complicated HR system.
            The Employer Portal is intentionally simple: just the fields needed
            for compliance and reimbursement, with straightforward workflows for
            supervisors and HR managers.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Example use cases
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              • A home healthcare agency logs OJT hours for new hires coming
              through a Medical Assistant or CNA pathway and uses those records
              for workforce grant reimbursement.
            </li>
            <li>
              • A facilities company tracks Building Maintenance trainees&apos;
              attendance and performance before converting them to full-time
              roles.
            </li>
            <li>
              • A logistics employer receives regular updates on CDL students,
              so they know who is ready to move into higher-paying routes.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
