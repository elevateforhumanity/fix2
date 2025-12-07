// app/accreditation/page.tsx
export default function AccreditationPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Accreditation &amp; Approvals
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Accreditation, Approvals &amp; Workforce Alignment
          </h1>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity Technical &amp; Career Institute is built to
            align with federal, state, and workforce standards so learners and
            partners can trust the quality, integrity, and funding readiness of
            our programs.
          </p>
        </header>

        {/* Federal & Apprenticeship */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Federal &amp; Apprenticeship Alignment
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">
                U.S. Department of Labor Registered Apprenticeship Sponsor:
              </span>{" "}
              Elevate participates in the federal Registered Apprenticeship
              system, designing earn-while-you-learn pathways that blend
              classroom learning with structured on-the-job training.
            </li>
            <li>
              <span className="font-semibold">RAPIDS Listed Programs:</span> Our
              apprenticeship programs are listed in the DOL's RAPIDS system,
              documenting occupations, standards, and sponsor alignment.
            </li>
          </ul>
        </section>

        {/* State & Workforce */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            State Workforce &amp; Funding Alignment (Indiana)
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold">
                Eligible Training Provider List (ETPL):
              </span>{" "}
              Elevate for Humanity is an approved provider on Indiana&apos;s
              ETPL, enabling eligible students to access workforce-funded
              training.
            </li>
            <li>
              <span className="font-semibold">WIOA Funding:</span> Select
              programs are approved to receive funding through the Workforce
              Innovation and Opportunity Act (WIOA) via local workforce boards
              and WorkOne offices.
            </li>
            <li>
              <span className="font-semibold">
                Workforce Ready Grant (WRG):
              </span>{" "}
              Where applicable, learners may qualify for tuition support through
              the Workforce Ready Grant / Next Level Jobs for approved
              short-term, high-demand programs.
            </li>
            <li>
              <span className="font-semibold">Jobs for Re-Enstart (JRI):</span>{" "}
              Elevate works with re-enstart and JRI partners to provide training
              pathways for justice-involved individuals who meet eligibility
              requirements.
            </li>
          </ul>
        </section>

        {/* Program categories */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Program Categories Served
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            Our approved and fundable offerings (exact availability may vary by
            region and partner) include training in:
          </p>
          <ul className="mt-3 grid gap-2 text-xs sm:grid-cols-2 text-slate-700">
            <li>• Barber Apprenticeship and beauty indusstart pathways</li>
            <li>• Healthcare support roles such as CNA and related pathways</li>
            <li>• Skilled trades and building maintenance</li>
            <li>• Transportation and logistics (e.g., CDL) where applicable</li>
            <li>• Digital literacy and foundational workplace skills</li>
          </ul>
        </section>

        {/* Compliance & equal opportunity */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Compliance, Equity &amp; Student Protections
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            Elevate for Humanity maintains policies and procedures designed to
            protect students, uphold quality, and support safe and inclusive
            learning environments.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              Transparent program information, tuition expectations, and
              training requirements.
            </li>
            <li>
              Non-discrimination and equal opportunity in admissions, training,
              and services.
            </li>
            <li>
              Trauma-informed approaches to student support and re-enstart
              populations.
            </li>
            <li>
              Collaboration with workforce boards, employers, and community
              partners to strengthen outcomes.
            </li>
          </ul>
          <p className="mt-4 text-[0.75rem] text-slate-600">
            Elevate for Humanity Technical &amp; Career Institute is an equal
            opportunity training provider. Auxiliary aids and services are
            available upon request to individuals with disabilities.
          </p>
        </section>
      </div>
    </main>
  );
}
