import Link from "next/link";

export default function EmployersPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Employer Partnerships
          </h1>

          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Elevate For Humanity partners with employers to provide job-ready
            candidates, upskill existing staff, and access workforce funding
            such as OJT, WEX, Apprenticeships, and Employer Training Grants.
          </p>

          <div className="mt-6">
            <Link
              href="/contact"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Workforce Programs We Support
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "On-the-Job Training (OJT)",
                text: "Employers receive wage reimbursements for hiring and training eligible participants.",
              },
              {
                title: "Work Experience (WEX)",
                text: "Short-term paid work placements funded through workforce partners.",
              },
              {
                title: "Registered Apprenticeships",
                text: "Structured training with wage progression and industry-recognized credentials.",
              },
              {
                title: "Incumbent Worker Training",
                text: "Support to upskill your existing employees and retain talent.",
              },
              {
                title: "Talent Pipeline Development",
                text: "Custom training solutions designed around your hiring needs.",
              },
              {
                title: "Recruitment & Placement",
                text: "Access job-ready graduates and candidates prepared for your roles.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-full bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Request a Partnership Packet
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
