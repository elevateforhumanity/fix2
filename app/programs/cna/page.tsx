import Link from "next/link";

export const metadata = {
  title: "CNA (Certified Nursing Assistant) | Elevate For Humanity",
  description: "Fast-track into healthcare. Get certified in weeks, start earning, and stack credentials over time.",
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200 uppercase tracking-wide mb-3">
                Healthcare • High Demand
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                Certified Nursing Assistant (CNA)
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Start your healthcare career fast. Get certified, get hired, and build toward LPN, RN, or specialized care roles.
              </p>
              <p className="text-sm text-slate-600 mb-6">
                CNAs are the backbone of patient care in hospitals, nursing homes, and home health. This program prepares you for the Indiana state exam and connects you with employers who need you now.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply" className="rounded-full bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700">
                  Apply Now
                </Link>
                <Link href="/funding" className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-blue-500 hover:text-blue-700">
                  Check Funding
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Program Snapshot</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Duration</dt>
                  <dd className="text-slate-600">4-8 weeks</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Format</dt>
                  <dd className="text-slate-600">Classroom + clinical rotation</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Credential</dt>
                  <dd className="text-slate-600">Indiana CNA Certification</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Funding</dt>
                  <dd className="text-slate-600">WIOA, WRG, employer sponsorship</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Avg. Starting Pay</dt>
                  <dd className="text-slate-600">$28K-$38K annually</dd>
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
              title: "Patient Care Skills",
              items: [
                "Vital signs (BP, pulse, temp, respiration)",
                "Activities of daily living (ADLs)",
                "Mobility assistance and transfers",
                "Feeding and nutrition support",
                "Infection control and hygiene",
              ],
            },
            {
              title: "Clinical Competencies",
              items: [
                "Catheter care and elimination",
                "Wound care basics",
                "Observation and reporting",
                "Emergency response protocols",
                "Documentation and charting",
              ],
            },
            {
              title: "Professional Skills",
              items: [
                "Patient rights and dignity",
                "Communication with families",
                "Working in healthcare teams",
                "Cultural sensitivity",
                "Career advancement pathways",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-blue-500 mt-[3px]">●</span>
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
              <h3 className="font-semibold text-slate-900 mb-3">Where CNAs Work</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Hospitals and medical centers</li>
                <li>• Nursing homes and long-term care</li>
                <li>• Assisted living facilities</li>
                <li>• Home health agencies</li>
                <li>• Rehabilitation centers</li>
                <li>• Hospice care</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Advancement Pathways</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• LPN (Licensed Practical Nurse)</li>
                <li>• RN (Registered Nurse)</li>
                <li>• Medical Assistant</li>
                <li>• Phlebotomy Technician</li>
                <li>• Patient Care Technician</li>
                <li>• CNA Instructor</li>
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
              phase: "Week 1-2: Classroom Fundamentals",
              desc: "Learn anatomy, patient rights, infection control, and basic care procedures in a classroom setting.",
            },
            {
              phase: "Week 3-6: Clinical Training",
              desc: "Hands-on practice in a real healthcare facility under supervision. Build confidence and competence.",
            },
            {
              phase: "Week 7-8: State Exam Prep & Testing",
              desc: "Review, practice exams, and scheduling for the Indiana CNA state certification exam.",
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Most Students Pay $0 Out-of-Pocket
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            WIOA and WRG cover tuition for eligible students. Employers often sponsor CNAs directly. Let's check your options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="rounded-full bg-white text-blue-600 px-8 py-3 font-semibold hover:bg-slate-50">
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
              q: "Do I need a high school diploma?",
              a: "Yes, or a GED equivalent. We can connect you with GED resources if needed.",
            },
            {
              q: "How quickly can I start working?",
              a: "Most students are employed within 2-4 weeks of passing the state exam.",
            },
            {
              q: "Is there a clinical rotation?",
              a: "Yes. You'll complete supervised clinical hours in a real healthcare setting as part of the program.",
            },
            {
              q: "Can I work while in the program?",
              a: "The program is flexible, but clinical hours require daytime availability. Many students work part-time.",
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
