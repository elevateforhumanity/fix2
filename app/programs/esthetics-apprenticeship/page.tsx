import Link from "next/link";
import Image from "next/image";
import { HourTracker } from "@/components/apprenticeship/HourTracker";
import { CheckCircle, Clock, DollarSign, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Esthetics Apprenticeship | Elevate for Humanity",
  description:
    "Esthetics, spa, and wellness apprenticeship pathway with salon/spa sponsorship, apprenticeship wages, and Elevate-powered theory modules.",
};

export default function EstheticsApprenticeshipProgramPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">✨ Beauty & Wellness Career</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Esthetics Apprenticeship
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-4">
                Skin, Spa & Wellness Professional Training
              </p>
              <p className="text-lg text-purple-50 mb-6">
                Earn while you learn in real spas and salons. Build hours toward your esthetics license while getting paid. Apprenticeship pathway with employer sponsorship.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">12-18 Months</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Earn While Learning</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">State License</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply?programId=prog-esthetics-apprentice"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now - FREE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-800 transition-all border-2 border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/media/programs/medical-esthetics-training-hd.jpg"
                  alt="Esthetics Apprenticeship Training"
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

      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 hidden">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-400">
            Esthetics Apprenticeship
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            Skin, Spa &amp; Wellness Esthetics Apprenticeship
          </h1>
          <p className="mt-3 text-sm text-slate-200 max-w-2xl">
            This pathway is designed for learners who want to build careers in
            esthetics, spa, and wellness. It blends Elevate&apos;s theory
            modules with salon/spa-based apprenticeship hours and real client
            service.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-esthetics-apprentice"
              className="rounded-md bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Apply for Esthetics Apprenticeship
            </Link>
            <Link
              href="/checkout/prog-esthetics-apprentice"
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
              What this apprenticeship covers
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>Skin basics, sanitation, and safety</li>
              <li>Facials, basic treatments, and client consultation</li>
              <li>Product knowledge and retail conversations</li>
              <li>Spa professionalism and customer service</li>
              <li>Entrepreneurship and building a client book</li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-400">
              Exact services and board-aligned requirements are shaped with
              each salon/spa partner and local licensing expectations.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
            <p className="text-sm font-semibold text-white">
              How funding and wages can work
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
              <li>
                Salons/spas can sponsor tuition using the{" "}
                <span className="font-semibold">
                  Salon/Spa Sponsored Seat
                </span>{" "}
                option
              </li>
              <li>
                Apprentices can receive wages, tips, and/or stipends during
                training
              </li>
              <li>
                Payment plans are available when a learner starts before
                securing a sponsoring salon
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
                    prog-esthetics-apprentice
                  </span>
                </li>
                <li>
                  Auto-enrolled course slug:{" "}
                  <span className="font-mono">
                    esthetics-apprentice-foundations
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOUR TRACKER */}
      <section className="bg-gradient-to-b from-purple-900 to-slate-900 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Track Your Apprenticeship Hours
            </h2>
            <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
              Clock in and out of your training sessions. Track your progress toward the required 600 hours for Indiana esthetician licensure.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <HourTracker 
              programName="Esthetics Apprenticeship"
              requiredHours={600}
            />
          </div>

          <div className="mt-8 bg-purple-950/50 rounded-xl border-2 border-purple-700 p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-white mb-2">💆 Esthetician Hour Requirements</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>600 total hours</strong> required for Indiana esthetician license</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Theory + Practical</strong> - Combination of classroom and hands-on training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>Client Services</strong> - Documented facials, waxing, and skincare treatments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span><strong>State Exam Prep</strong> - Preparation for written and practical exams</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Build a career in esthetics, spa, and wellness.
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Elevate connects learners with sponsoring salons/spas and supports
              you from theory modules to client-ready practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <Link
              href="/apply?programId=prog-esthetics-apprentice"
              className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Start Application
            </Link>
            <Link
              href="/checkout/prog-esthetics-apprentice"
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
