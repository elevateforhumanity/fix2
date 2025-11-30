import Link from "next/link";

export const metadata = {
  title: "Building Technician Training | Elevate For Humanity",
  description: "Facilities maintenance and building systems training. Real advancement paths in property management and operations.",
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200 uppercase tracking-wide mb-3">
                Facilities • Property Management
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                Building Technician Training
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Master building systems, maintenance, and operations. Step into facilities roles with clear advancement paths.
              </p>
              <p className="text-sm text-slate-600 mb-6">
                Building technicians keep commercial and residential properties running smoothly. This program covers HVAC basics, electrical, plumbing, safety, and property management—preparing you for entry-level facilities roles with room to grow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply" className="rounded-full bg-slate-700 text-white px-6 py-3 font-semibold hover:bg-slate-800">
                  Apply Now
                </Link>
                <Link href="/funding" className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-slate-500 hover:text-slate-700">
                  Check Funding
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Program Snapshot</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Duration</dt>
                  <dd className="text-slate-600">8-12 weeks</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Format</dt>
                  <dd className="text-slate-600">Classroom + hands-on lab</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Credential</dt>
                  <dd className="text-slate-600">Building Technician Certificate</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Funding</dt>
                  <dd className="text-slate-600">WIOA, WRG, employer sponsorship</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Avg. Starting Pay</dt>
                  <dd className="text-slate-600">$32K-$45K annually</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Building Systems",
              items: [
                "HVAC basics and troubleshooting",
                "Electrical systems and circuits",
                "Plumbing and water systems",
                "Fire safety and suppression",
                "Building automation systems",
              ],
            },
            {
              title: "Maintenance Skills",
              items: [
                "Preventive maintenance schedules",
                "Equipment repair and replacement",
                "Tool usage and safety",
                "Work order management",
                "Vendor coordination",
              ],
            },
            {
              title: "Professional Skills",
              items: [
                "OSHA safety standards",
                "Customer service and communication",
                "Documentation and reporting",
                "Emergency response procedures",
                "Career advancement planning",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-slate-500 mt-[3px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Career Outcomes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Where Building Techs Work</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Commercial office buildings</li>
                <li>• Apartment and residential complexes</li>
                <li>• Hospitals and healthcare facilities</li>
                <li>• Schools and universities</li>
                <li>• Manufacturing plants</li>
                <li>• Property management companies</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Advancement Pathways</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Facilities Manager</li>
                <li>• Chief Engineer</li>
                <li>• Property Manager</li>
                <li>• Building Automation Specialist</li>
                <li>• Maintenance Supervisor</li>
                <li>• Specialized trades (HVAC, electrical, plumbing)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Program Structure</h2>
        <div className="space-y-4">
          {[
            {
              phase: "Weeks 1-3: Building Systems Overview",
              desc: "Introduction to HVAC, electrical, plumbing, and safety protocols.",
            },
            {
              phase: "Weeks 4-9: Hands-On Maintenance",
              desc: "Practice troubleshooting, repairs, and preventive maintenance in our training facility.",
            },
            {
              phase: "Weeks 10-12: Professional Skills & Job Prep",
              desc: "Work order systems, customer service, resume building, and employer connections.",
            },
          ].map((p) => (
            <div key={p.phase} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-2">{p.phase}</h3>
              <p className="text-sm text-slate-700">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funding CTA */}
      <section className="bg-gradient-to-br from-slate-700 to-slate-800 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Most Students Pay $0 Out-of-Pocket
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            WIOA and WRG cover tuition for eligible students. Property management companies often sponsor trainees. Let's check your options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="rounded-full bg-white text-slate-700 px-8 py-3 font-semibold hover:bg-slate-50">
              Start Application
            </Link>
            <Link href="/funding" className="rounded-full border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white/10">
              Learn About Funding
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Do I need prior experience?",
              a: "No. We start with the basics and build from there.",
            },
            {
              q: "Is this the same as HVAC training?",
              a: "No. Building technicians have broader skills across multiple systems, while HVAC techs specialize in heating and cooling.",
            },
            {
              q: "Is there job placement assistance?",
              a: "Yes. We partner with property management companies and facilities teams actively hiring.",
            },
            {
              q: "Can I specialize later?",
              a: "Absolutely. Many building techs go on to specialize in HVAC, electrical, or plumbing after gaining experience.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
