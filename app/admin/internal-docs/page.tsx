// app/admin/internal-docs/page.tsx

import { requireStaff } from "@/lib/auth-server";

const DOC_SECTIONS = [
  {
    id: "workforce",
    title: "Workforce Provider & Compliance Docs",
    description:
      "JRI, WEX, WRG, WIOA, DOL alignment, waivers, ETPL packets, and workforce guidance.",
    items: [
      {
        label: "JRI / WEX / WRG Master Packet",
        hint: "Approval letters, guidelines, and internal checklists.",
        href: "/internal-docs/jri-wex-wrg.pdf", // change to your real storage path
      },
      {
        label: "WIOA Adult / Youth / DW Procedures",
        hint: "Intake, eligibility, case notes, performance reporting.",
        href: "/internal-docs/wioa-procedures.docx",
      },
      {
        label: "DOL Innovation & Waiver Templates",
        hint: "TEGL-aligned waiver requests and innovation proposals.",
        href: "/internal-docs/dol-waiver-templates.docx",
      },
    ],
  },
  {
    id: "employers",
    title: "Employer & OJT / WEX / JRI Tools",
    description:
      "Everything you need to enroll employers, explain incentives, and set up placements.",
    items: [
      {
        label: "Employer Universal Proposal",
        hint: "Use this when pitching any employer on partnership.",
        href: "/internal-docs/employer-universal-proposal.docx",
      },
      {
        label: "OJT / WEX / JRI Employer Packet",
        hint: "Explains reimbursements, expectations, and forms.",
        href: "/internal-docs/employer-incentive-packet.pdf",
      },
    ],
  },
  {
    id: "grants",
    title: "Grants & Funding Templates",
    description:
      "Reusable narratives and attachments for state, federal, and foundation funding.",
    items: [
      {
        label: "Federal Grant Master Template",
        hint: "Narrative shell you can adapt quickly for DOL/DOE/HHS.",
        href: "/internal-docs/federal-grant-template.docx",
      },
      {
        label: "State Workforce Grant Template",
        hint: "For WRG, Next Level Jobs, and state innovation grants.",
        href: "/internal-docs/state-grant-template.docx",
      },
    ],
  },
  {
    id: "programs",
    title: "Program & Credential Partner Docs",
    description:
      "Course outlines, partner requirements, and exam alignment documents.",
    items: [
      {
        label: "CNA – Choice Medical Institute Packet",
        hint: "Clinical hours, skills checklist, and exam alignment.",
        href: "/internal-docs/cna-choice-medical-packet.pdf",
      },
      {
        label: "Barber – Milady Alignment Docs",
        hint: "Chapters, hours, and state board mapping.",
        href: "/internal-docs/barber-milady-alignment.docx",
      },
      {
        label: "Certiport IT & Customer Service Guides",
        hint: "Objective domains and suggested course mapping.",
        href: "/internal-docs/certiport-guides.pdf",
      },
    ],
  },
  {
    id: "ops",
    title: "Operations, Intake & Case Management",
    description:
      "Internal playbooks so your staff all work the same way with students and employers.",
    items: [
      {
        label: "Student Intake & Funding Flow",
        hint: "Step-by-step: from referral to enrollment and funding confirmation.",
        href: "/internal-docs/student-intake-funding-flow.pdf",
      },
      {
        label: "Case Management & Supportive Services Guide",
        hint: "How to document, support, and follow up with learners.",
        href: "/internal-docs/case-management-guide.docx",
      },
      {
        label: "Employer Follow-Up & Retention Scripts",
        hint: "Call/email scripts to keep partners engaged.",
        href: "/internal-docs/employer-follow-up-scripts.docx",
      },
    ],
  },
];

export default async function InternalDocsPage() {
  const user = await requireStaff();

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Elevate For Humanity · Internal
            </p>
            <h1 className="text-lg font-semibold text-slate-900">
              Internal Operations & Documentation Hub
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Signed in as{" "}
              <span className="font-semibold">
                {user.email ?? "team member"}
              </span>
              . For staff and admin use only.
            </p>
          </div>
          <div className="hidden text-xs text-slate-500 md:block">
            <p>Need help?</p>
            <p>Check this hub before asking for new forms.</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            How to Use This Hub
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">
            This space holds the official Elevate For Humanity internal
            documents. Use it for{" "}
            <span className="font-semibold">
              workforce compliance, employer outreach, grant writing, and
              day-to-day program operations.
            </span>{" "}
            If a document changes, update it here so everyone is always working
            from the same version.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DOC_SECTIONS.map((section) => (
            <section
              key={section.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 shadow-sm"
            >
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  {section.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  {section.description}
                </p>
              </div>

              <ul className="mt-2 space-y-2 text-xs">
                {section.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col rounded-lg border border-slate-100 bg-slate-50 p-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900">
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        className="inline-flex items-center rounded-md bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white hover:bg-blue-700"
                      >
                        Open
                      </a>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600">
                      {item.hint}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
