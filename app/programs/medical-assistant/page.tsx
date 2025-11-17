import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

const maBullets = [
  "Credentialing-partner medical assistant curriculum for theory and skills.",
  "Clear expectations around schedule, labs, externships, and exams.",
  "Elevate-powered onboarding, reminders, and simple dashboards.",
  "Room for agencies and employers to see progress, not just referrals.",
  "Support with next steps into clinics, practices, and outpatient roles.",
];

const maFit = [
  "Adults and young adults who want a patient-facing healthcare role.",
  "Career changers leaving retail, hospitality, or warehouse settings.",
  "Parents and caregivers who need a guided, step-by-step plan.",
  "Learners sponsored or referred by workforce boards and nonprofits.",
];

export default function MedicalAssistantPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              Healthcare pathway · Partner program
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
              Medical Assistant Pathway
            </h1>
            <p className="text-sm text-slate-300">
              Elevate's Medical Assistant Pathway connects learners to an approved MA
              program through a credentialing partner, while Elevate handles the digital
              front door, reminders, light assessments, and workforce-friendly reporting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply/medical-assistant"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-300"
              >
                Start the MA pathway
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-sky-300 hover:text-sky-100"
              >
                Sponsor seats or refer learners
              </Link>
            </div>
          </div>

          {/* Video Hero */}
          <div className="mt-10 mb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
                alt="Medical assistant training in clinical setting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-semibold mb-2">Watch: Clinical healthcare training</p>
                <p className="text-2xl font-bold">See students training in real medical facilities</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr,0.9fr] md:items-start">
            <div className="space-y-3 text-sm text-slate-200">
              <h2 className="text-[1.1rem] font-semibold text-slate-50">
                What this pathway covers.
              </h2>
              <p className="text-slate-300">
                The exact course list, lab activities, and externship design come from the
                MA credentialing partner. Elevate wraps that in a clear journey.
              </p>
              <ul className="mt-3 space-y-2">
                {maBullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.75)]">
              <h3 className="text-[0.95rem] font-semibold text-slate-50">
                Who this pathway serves best.
              </h3>
              <ul className="mt-3 space-y-2">
                {maFit.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] text-slate-400">
                Eligibility, schedules, and credential options vary by partner and location.
                Elevate makes those details easier to understand and track from the beginning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
