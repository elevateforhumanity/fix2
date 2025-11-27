import Link from "next/link";

const PROGRAM_GROUPS = [
  {
    title: "Healthcare",
    items: [
      "Certified Nursing Assistant (CNA)",
      "Medical Assistant",
      "Phlebotomy",
      "EKG Technician",
      "Patient Care Tech",
    ],
  },
  {
    title: "Skilled Trades & Building",
    items: ["HVAC", "Building Maintenance", "Facilities Tech", "CDL / Transportation"],
  },
  {
    title: "Beauty & Wellness",
    items: ["Barber Apprenticeship", "Esthetics", "Beauty Career Educator"],
  },
  {
    title: "Business & Technology",
    items: ["Tax Prep / IRS VITA", "Office & Admin", "Customer Service", "Digital Skills"],
  },
];

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Training Programs
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Explore career pathways in healthcare, skilled trades, beauty,
            business, and more. Many programs are eligible for workforce
            funding and employer partnerships.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-8">
          {PROGRAM_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                {group.title}
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((name) => (
                  <div
                    key={name}
                    className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-800 shadow-sm"
                  >
                    <p className="font-semibold text-slate-900">{name}</p>
                    <p className="mt-1 text-xs text-slate-700">
                      Training with a clear path to certification, employment,
                      or apprenticeship.
                    </p>
                    <Link
                      href="/apply"
                      className="mt-3 inline-block text-[11px] font-semibold text-red-600"
                    >
                      I'm interested →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
            Don't see your exact program listed? Select "Other / Unsure" on the
            application and our team will help you choose the best pathway.
          </div>
        </div>
      </section>
    </main>
  );
}
