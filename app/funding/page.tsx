import Link from "next/link";

export default function FundingPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Workforce Funding & Tuition Assistance
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Eligible students may qualify for FREE or reduced-cost training through
            Indiana Workforce Grants, WIOA, Apprenticeships, OJT, and partner workforce
            programs.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Apply for Funding
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Step Process */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900">
            How Funding Works
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Apply Online",
                text: "Fill out the application so we can assess your program interest and funding options.",
              },
              {
                step: "02",
                title: "Funding Review",
                text: "We check eligibility for WRG, WIOA, Apprenticeships, and Employer-sponsored training.",
              },
              {
                step: "03",
                title: "Meet With Case Manager",
                text: "Approved applicants meet with a case manager for documentation and grant approval.",
              },
              {
                step: "04",
                title: "Start Training",
                text: "Once approved, you receive your start date, orientation details, and course access.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold text-red-600">
                  {item.step}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-600">
            Funding availability depends on income, employment status, residency,
            and workforce priority categories. We guide you through everything.
          </p>

          <div className="mt-6">
            <Link
              href="/apply"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Start Your Funding Application
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
