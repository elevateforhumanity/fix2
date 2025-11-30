import Link from "next/link";

export const metadata = {
  title: "CDL (Commercial Driver's License) Training | Elevate For Humanity",
  description: "Get your CDL Class A license and step into logistics, transportation, and trucking careers with strong demand.",
};

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-50 to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-semibold text-yellow-700 border border-yellow-200 uppercase tracking-wide mb-3">
                Transportation • High Demand
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                CDL Class A Training
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Get your Commercial Driver's License and step into a career with strong wages, job security, and nationwide opportunities.
              </p>
              <p className="text-sm text-slate-600 mb-6">
                CDL drivers are the backbone of logistics and supply chains. This program prepares you for the CDL Class A exam with classroom instruction, behind-the-wheel training, and job placement support.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/apply" className="rounded-full bg-yellow-600 text-white px-6 py-3 font-semibold hover:bg-yellow-700">
                  Apply Now
                </Link>
                <Link href="/funding" className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-yellow-500 hover:text-yellow-700">
                  Check Funding
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Program Snapshot</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-700">Duration</dt>
                  <dd className="text-slate-600">4-6 weeks</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Format</dt>
                  <dd className="text-slate-600">Classroom + behind-the-wheel</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Credential</dt>
                  <dd className="text-slate-600">CDL Class A License</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Funding</dt>
                  <dd className="text-slate-600">WIOA, WRG, employer sponsorship</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-700">Avg. Starting Pay</dt>
                  <dd className="text-slate-600">$45K-$65K annually</dd>
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
              title: "Driving Skills",
              items: [
                "Pre-trip vehicle inspection",
                "Backing and maneuvering",
                "Highway and city driving",
                "Coupling and uncoupling trailers",
                "Safe following distance and speed control",
              ],
            },
            {
              title: "Regulations & Safety",
              items: [
                "Federal Motor Carrier Safety Regulations",
                "Hours of Service (HOS) rules",
                "Hazardous materials awareness",
                "Accident prevention and response",
                "Electronic Logging Devices (ELD)",
              ],
            },
            {
              title: "Professional Skills",
              items: [
                "CDL exam preparation (written + skills)",
                "Route planning and navigation",
                "Customer service and communication",
                "Vehicle maintenance basics",
                "Career advancement pathways",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-yellow-500 mt-[3px]">●</span>
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
              <h3 className="font-semibold text-slate-900 mb-3">Where CDL Drivers Work</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Long-haul trucking companies</li>
                <li>• Regional and local delivery</li>
                <li>• Freight and logistics companies</li>
                <li>• Tanker and flatbed specialists</li>
                <li>• Owner-operator (self-employed)</li>
                <li>• Specialized hauling (hazmat, oversized)</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Advancement Pathways</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Team driver (higher pay)</li>
                <li>• Specialized endorsements (hazmat, tanker)</li>
                <li>• Owner-operator</li>
                <li>• Fleet manager or dispatcher</li>
                <li>• CDL instructor</li>
                <li>• Safety and compliance roles</li>
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
              phase: "Week 1: Classroom & Written Exam Prep",
              desc: "Learn regulations, safety, and vehicle systems. Prepare for the CDL written exam.",
            },
            {
              phase: "Weeks 2-4: Behind-the-Wheel Training",
              desc: "Practice driving, backing, maneuvering, and pre-trip inspections with certified instructors.",
            },
            {
              phase: "Weeks 5-6: Skills Test & Job Placement",
              desc: "Take the CDL skills test, finalize licensing, and connect with hiring carriers.",
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
      <section className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Most Students Pay $0 Out-of-Pocket
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            WIOA and WRG cover tuition for eligible students. Many trucking companies sponsor CDL training. Let's check your options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="rounded-full bg-white text-yellow-600 px-8 py-3 font-semibold hover:bg-slate-50">
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
              q: "Do I need a regular driver's license first?",
              a: "Yes. You must have a valid driver's license and meet age requirements (typically 21 for interstate, 18 for intrastate).",
            },
            {
              q: "How quickly can I start earning?",
              a: "Most graduates are hired within 1-2 weeks of obtaining their CDL.",
            },
            {
              q: "What if I fail the CDL exam?",
              a: "We provide exam prep and support. If needed, you can retake the exam after additional practice.",
            },
            {
              q: "Can I work locally or do I have to do long-haul?",
              a: "Both options exist. We help match you with carriers based on your preferences (local, regional, or long-haul).",
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
