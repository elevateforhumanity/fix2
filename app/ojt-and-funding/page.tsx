import Link from "next/link";

export default function OJTAndFundingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            OJT, WEX & Funding Options
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Workforce funding pathways for employers and training partners
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-slate max-w-none">
            <h2>On-the-Job Training (OJT)</h2>
            <p>
              OJT programs allow employers to receive wage reimbursements while training new employees. 
              Elevate For Humanity helps coordinate OJT placements with eligible participants.
            </p>

            <h2>Work Experience (WEX)</h2>
            <p>
              Work Experience programs provide participants with real-world work experience while 
              receiving support and training. We work with employers to create meaningful WEX opportunities.
            </p>

            <h2>WIOA Funding</h2>
            <p>
              The Workforce Innovation and Opportunity Act (WIOA) provides funding for eligible 
              participants to access training programs at no cost.
            </p>

            <h2>Apprenticeships</h2>
            <p>
              Registered apprenticeship programs allow participants to earn while they learn, 
              combining on-the-job training with classroom instruction.
            </p>

            <div className="mt-12 rounded-lg bg-emerald-50 p-8 border border-emerald-200">
              <h3 className="text-xl font-bold text-slate-900">Ready to explore funding options?</h3>
              <p className="mt-2 text-slate-600">
                Contact our team to learn more about how we can help your organization access workforce funding.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/employers"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-700"
                >
                  For Employers
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
