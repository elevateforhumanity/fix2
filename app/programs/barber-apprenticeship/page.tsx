import Link from "next/link";

export const metadata = {
  title: "Barber Apprenticeship | Elevate For Humanity",
  description: "DOL-aligned earn-while-you-learn pathway. Get licensed, get paid, get hired.",
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-[11px] font-semibold text-orange-700 border border-orange-200 uppercase tracking-wide mb-3">
                DOL-Aligned Apprenticeship
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                Barber Apprenticeship
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Earn while you learn. Get licensed. Build a career in a recession-proof trade with real earning potential.
              </p>
              <p className="text-sm text-slate-600 mb-6">
                This DOL-registered apprenticeship combines classroom training with paid on-the-job experience. You'll work in a real barbershop, earn wages, and graduate with your Indiana barber license and 1,500+ hours of documented experience.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply" className="rounded-full bg-orange-600 text-white px-6 py-3 font-semibold hover:bg-orange-700">
                  Apply Now
                </Link>
                <Link href="/funding" className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-orange-500 hover:text-orange-700">
                  Check Funding
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Program Snapshot</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Duration</dt>
                  <dd className="text-slate-600">12-18 months</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Format</dt>
                  <dd className="text-slate-600">Hybrid: classroom + paid OJT</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Credential</dt>
                  <dd className="text-slate-600">Indiana State Barber License</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Funding</dt>
                  <dd className="text-slate-600">WIOA, WRG, Apprenticeship grants</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Avg. Starting Pay</dt>
                  <dd className="text-slate-600">$30K-$45K + tips</dd>
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
              title: "Technical Skills",
              items: [
                "Clipper and shear techniques",
                "Fades, tapers, and line-ups",
                "Beard shaping and grooming",
                "Chemical services (relaxers, texturizers)",
                "Sanitation and safety protocols",
              ],
            },
            {
              title: "Business Skills",
              items: [
                "Client consultation and communication",
                "Appointment scheduling",
                "Retail product sales",
                "Social media marketing",
                "Building a loyal clientele",
              ],
            },
            {
              title: "Professional Development",
              items: [
                "State board exam preparation",
                "Shop etiquette and professionalism",
                "Time management",
                "Continuing education pathways",
                "Booth rental vs. commission models",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-orange-500 mt-[3px]">●</span>
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
              <h3 className="font-semibold text-slate-900 mb-3">Where Graduates Work</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Traditional barbershops</li>
                <li>• High-end salons and spas</li>
                <li>• Booth rental (self-employed)</li>
                <li>• Mobile barber services</li>
                <li>• Entertainment and film industry</li>
                <li>• Barber school instruction</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Advancement Pathways</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Master barber certification</li>
                <li>• Shop ownership</li>
                <li>• Barber educator/instructor</li>
                <li>• Platform artist and brand ambassador</li>
                <li>• Competition circuit</li>
                <li>• Product line development</li>
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
              phase: "Phase 1: Foundations (Months 1-3)",
              desc: "Classroom theory, sanitation, basic cuts, and safety. Prepare for shop placement.",
            },
            {
              phase: "Phase 2: Apprenticeship (Months 4-12)",
              desc: "Paid work in a licensed barbershop. Build hours, refine skills, and develop clientele under supervision.",
            },
            {
              phase: "Phase 3: Licensure (Months 13-18)",
              desc: "State board exam prep, final portfolio review, and job placement support.",
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
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Most Apprentices Pay $0 Out-of-Pocket
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            WIOA, WRG, and apprenticeship grants cover tuition. You earn wages during OJT. Let's check your eligibility.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="rounded-full bg-white text-orange-600 px-8 py-3 font-semibold hover:bg-slate-50">
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
              a: "No. We start with fundamentals and build from there.",
            },
            {
              q: "How much will I earn during the apprenticeship?",
              a: "Wages vary by shop, but most apprentices earn $12-$18/hour plus tips during OJT.",
            },
            {
              q: "What if I can't find a shop placement?",
              a: "We partner with barbershops across Indianapolis. Our team helps match you with a host site.",
            },
            {
              q: "Can I work full-time while in the program?",
              a: "The apprenticeship IS full-time work. You're earning while learning.",
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
