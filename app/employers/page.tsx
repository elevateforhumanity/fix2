import Link from "next/link";
import Image from "next/image";

export default function EmployersPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700 mb-4">
                For Employers
              </div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Build Your Talent Pipeline with Zero Risk
              </h1>

              <p className="mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
                Partner with Elevate For Humanity to access pre-screened, job-ready talent while reducing hiring costs by up to 50% through workforce funding.
              </p>

              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">50-75% Wage Reimbursement</p>
                    <p className="text-xs text-slate-600">Through OJT and WEX programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Pre-Screened Candidates</p>
                    <p className="text-xs text-slate-600">Background checks, drug screening, and skills assessment completed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">No Upfront Costs</p>
                    <p className="text-xs text-slate-600">We handle all training, paperwork, and compliance</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white hover:bg-orange-600 shadow-lg"
                >
                  Schedule a Partnership Call
                </Link>
                <Link
                  href="/hire-graduates"
                  className="rounded-full border-2 border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Hire Our Graduates (Get FREE Hours!)
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/media/employers-hero.jpg"
                alt="Employer partnerships and workforce development"
                fill
                className="object-cover"
              />
            </div>
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
