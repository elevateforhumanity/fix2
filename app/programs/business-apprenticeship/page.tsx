import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Clock, DollarSign, Briefcase, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Business Support Apprenticeship | Elevate for Humanity",
  description:
    "Business support and office professional apprenticeship pathway with WEX/OJT options, employer sponsorship, and stackable credentials.",
};

export default function BusinessApprenticeshipProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">💼 Office Professional Career</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Business Support Apprenticeship
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-4">
                Admin, Customer Service & Office Professional Training
              </p>
              <p className="text-lg text-blue-50 mb-6">
                Earn while you learn. Work in real offices while building skills in admin, customer success, call centers, and digital operations. Employer-sponsored apprenticeship.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">6-12 Months</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">$30K-$45K Salary</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-semibold">Earn While Learning</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply?programId=prog-business-apprentice"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now - FREE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all border-2 border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/media/programs/business-hd.jpg"
                  alt="Business Support Apprenticeship Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Original content continues */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 hidden">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Business Support Apprenticeship
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Business, Office &amp; Customer Care Apprenticeship
          </h1>
          <p className="mt-3 text-sm text-slate-200 max-w-2xl">
            This apprenticeship pathway prepares learners for high-demand roles
            in admin, customer success, call centers, front office, and digital
            operations. Built to combine Elevate&apos;s soft skills training
            with live employer work experience.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-business-apprentice"
              className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply for Business Apprenticeship
            </Link>
            <Link
              href="/checkout/prog-business-apprentice"
              className="rounded-md border border-slate-700 px-5 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition &amp; Funding
            </Link>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 grid gap-5 md:grid-cols-[1.5fr,1.5fr] text-xs">
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              Skills you build in this pathway
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>Professional communication &amp; customer care</li>
              <li>Office technology and productivity tools</li>
              <li>Scheduling, calendars, and basic project support</li>
              <li>Data entry and CRM support tasks</li>
              <li>Workplace problem-solving and conflict resolution</li>
              <li>Job-ready soft skills powered by JRI-style modules</li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              The learning plan can be tailored for office, remote, or hybrid
              business environments depending on the employer partner.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              How the apprenticeship structure works
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                Learners complete online modules in{" "}
                <span className="font-semibold">business-apprentice-foundations</span>
              </li>
              <li>
                WEX/OJT placements let learners practice skills in a real
                employer setting
              </li>
              <li>
                Employers can sponsor tuition using the{" "}
                <span className="font-semibold">Employer / Sponsor Pays</span> option
              </li>
              <li>
                Payment plans are available when learners do not have an employer
                sponsor at the start
              </li>
            </ul>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3 text-[10px] text-slate-300">
              <p className="font-semibold text-slate-100">
                Program identifiers
              </p>
              <ul className="mt-1 list-disc pl-5">
                <li>
                  Elevate program ID:{" "}
                  <span className="font-mono text-orange-300">
                    prog-business-apprentice
                  </span>
                </li>
                <li>
                  Auto-enrolled course slug:{" "}
                  <span className="font-mono">business-apprentice-foundations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Ready to grow business-ready talent?
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Learners and employers can connect with Elevate to design
              apprenticeships that combine training, mentoring, and real wages.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-business-apprentice"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Start Application
            </Link>
            <Link
              href="/checkout/prog-business-apprentice"
              className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-100 hover:bg-slate-900"
            >
              View Tuition Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
