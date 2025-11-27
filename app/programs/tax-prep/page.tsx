import Link from "next/link";

export default function TaxPrepPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
            IRS-Certified Training | ETPL Approved
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">
            Tax Preparation Programs
          </h1>
          <p className="mt-2 text-base font-semibold text-green-700">
            RISE Forward Foundation
          </p>
          <p className="mt-1 text-xs text-slate-600">
            A program of SELFISH INC (501c3) | IRS VITA Site SDIN: 99420837
          </p>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            Become an IRS-certified tax preparer through our VITA (Volunteer Income Tax Assistance) 
            and Tax Business Management programs. Free training for eligible students.
          </p>
          <div className="mt-6">
            <Link
              href="/apply"
              className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Two Training Pathways
              </h2>
              <div className="mt-3 space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h3 className="text-sm font-semibold text-green-900">
                    1. VITA Certification (Free Tax Prep)
                  </h3>
                  <p className="mt-2 text-xs text-slate-700">
                    IRS-certified volunteer tax preparer training through RISE Forward Foundation 
                    (VITA Site SDIN: 99420837). Prepare taxes for low-income families and earn 
                    IRS certification.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h3 className="text-sm font-semibold text-blue-900">
                    2. Tax Business Management (ETPL Approved)
                  </h3>
                  <p className="mt-2 text-xs text-slate-700">
                    Professional tax preparation and business management training. ETPL-approved 
                    program with WIOA/WRG funding available. Career pathway to paid tax preparation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Program Benefits
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>IRS certification included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Free training for eligible students (WIOA funded)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Volunteer opportunities during tax season</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Career pathway to paid tax preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>EITC and tax credit expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Community service experience</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              What You'll Learn
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Tax Fundamentals
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Filing status, exemptions, deductions, credits, and basic tax law
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  EITC Expertise
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Earned Income Tax Credit, Child Tax Credit, and other credits for low-income families
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Tax Software
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Hands-on training with professional tax preparation software
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Career Pathways
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">VITA Volunteer</h3>
                  <p className="text-xs text-slate-700">
                    Start by volunteering during tax season (Jan-Apr) to gain experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Seasonal Tax Preparer</h3>
                  <p className="text-xs text-slate-700">
                    Work for tax preparation companies during tax season ($15-25/hour)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Professional Tax Preparer</h3>
                  <p className="text-xs text-slate-700">
                    Advance to year-round positions or start your own tax business
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Free Tax Preparation Services
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              As an IRS VITA site, we also provide <strong>free tax preparation services</strong> to 
              qualifying individuals and families. If you need help with your taxes, contact us to 
              see if you qualify for free assistance.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-blue-300 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">Who Qualifies</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  <li>• Income under $60,000/year</li>
                  <li>• Persons with disabilities</li>
                  <li>• Limited English speakers</li>
                  <li>• Elderly taxpayers</li>
                </ul>
              </div>
              <div className="rounded-lg border border-blue-300 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-900">Services Included</h3>
                <ul className="mt-2 space-y-1 text-xs text-slate-700">
                  <li>• Federal and state tax returns</li>
                  <li>• EITC assistance</li>
                  <li>• Electronic filing</li>
                  <li>• Tax education</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Ready to Get Started?
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Apply now to join our IRS VITA certification program. Training is free for 
              eligible students through WIOA funding. Classes typically run in the fall 
              to prepare for tax season.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Apply for Training
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-800 hover:border-green-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-bold text-slate-900">
              About RISE Forward Foundation
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              RISE Forward Foundation is a program of <strong>SELFISH INC</strong> (501c3, EIN: 99-3483511) 
              dedicated to providing free tax preparation services and tax preparer training to the community.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-slate-900">IRS VITA Site</p>
                <p className="text-xs text-slate-700">SDIN: 99420837</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">ETPL Provider</p>
                <p className="text-xs text-slate-700">Provider ID: 10000949</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Tax Preparer</p>
                <p className="text-xs text-slate-700">PTIN: 358459</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Funding</p>
                <p className="text-xs text-slate-700">WIOA/WRG Eligible</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
