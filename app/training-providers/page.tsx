// app/training-providers/page.tsx
import Link from "next/link";
import Image from "next/image";

const providerBenefits = [
  {
    icon: "📈",
    title: "Fill more seats with funded learners",
    body: "Tap into WIOA, WRG, JRI, and workforce grants so qualified students can attend at little or no cost.",
  },
  {
    icon: "🤝",
    title: "We handle workforce compliance",
    body: "We help with ETPL, documentation, reporting, and coordination with workforce boards so you can focus on teaching.",
  },
  {
    icon: "🧩",
    title: "Plug into our ecosystem",
    body: "Connect your programs to employers, case managers, and re-entry partners already working with Elevate.",
  },
  {
    icon: "🎓",
    title: "Increase completions & outcomes",
    body: "Wraparound supports and case management help learners stay in class, finish, and transition into employment.",
  },
];

const idealPartners = [
  "Barber and beauty schools",
  "Medical assistant & healthcare training institutes",
  "CNA, Phlebotomy, and allied health programs",
  "CDL and transportation training providers",
  "HVAC, building trades, and technical schools",
  "Workforce readiness and re-entry programs",
];

export default function TrainingProvidersPage() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/hero/training-providers-hero.jpg"
            alt="Training providers partnering with Elevate For Humanity"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:px-10 lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              For Training Providers
            </p>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
              Fill Your Programs With{" "}
              <span className="text-orange-400">
                Funded, Job-Ready Learners
              </span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-slate-200">
              Elevate For Humanity partners with barber schools, healthcare institutes,
              skilled trades programs, and training centers to bring in funded learners,
              handle workforce compliance, and connect graduates to employers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact?type=training-provider"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition"
              >
                Talk About Becoming a Partner
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-orange-400 hover:text-orange-300 transition"
              >
                See how it works
              </Link>
            </div>

            <div className="mt-6 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
              <div>
                <p className="text-lg font-bold text-orange-400">Funded seats</p>
                <p>WIOA, WRG, re-entry, and employer-paid cohorts.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-400">Reduced admin</p>
                <p>We help manage paperwork & workforce reporting.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-orange-400">Employer pipeline</p>
                <p>Direct links to hiring partners in multiple sectors.</p>
              </div>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="relative mt-8 w-full max-w-md md:mt-0 md:ml-auto">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl">
              <Image
                src="/images/homepage/training-program-collage.png"
                alt="Training Provider overview video"
                width={800}
                height={450}
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/40"
                >
                  <span className="ml-1 text-xl font-bold">▶</span>
                </button>
              </div>
              <div className="border-t border-slate-800 bg-slate-950/80 px-4 py-3 text-xs text-slate-300">
                60-second intro: "Partnering with Elevate For Humanity"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDEAL PARTNERS */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            Who we partner with
          </h2>
          <p className="mt-3 text-center text-sm text-slate-300 md:text-base">
            If you deliver hands-on, career-focused training and want more funded learners,
            we should talk.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-sm text-slate-200">
              {idealPartners.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-orange-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200">
              <h3 className="text-base font-semibold text-white mb-2">
                What makes a strong Elevate partner?
              </h3>
              <p className="mb-2">
                We look for training providers who are serious about completions, job
                placement, and real-world skills—not just filling seats.
              </p>
              <ul className="space-y-1 text-xs md:text-sm">
                <li>• Clear curriculum and defined outcomes</li>
                <li>• Willingness to report attendance and progress</li>
                <li>• Openness to workforce and re-entry referrals</li>
                <li>• Commitment to equitable, second-chance friendly practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="border-b border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12">
          <h2 className="text-center text-2xl font-bold md:text-3xl">
            What Elevate brings to your programs
          </h2>
          <p className="mt-3 text-center text-sm text-slate-300 md:text-base">
            Think of us as your workforce development partner: we help bring the
            learners, funding, and employer connections.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {providerBenefits.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-sm font-semibold md:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 md:text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS FOR PROVIDERS */}
      <section id="how-it-works" className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 lg:px-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            How partnership works, step by step
          </h2>
          <p className="mt-2 text-sm text-slate-300 md:text-base">
            We keep it simple: you stay focused on instruction, while we support
            learner recruitment, funding, and outcomes.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              {
                label: "Step 1",
                title: "Initial conversation",
                body: "We learn about your programs, locations, class schedules, and ideal learner profile.",
              },
              {
                label: "Step 2",
                title: "Design the partnership",
                body: "We align on which programs are workforce-friendly and how to route funded learners to you.",
              },
              {
                label: "Step 3",
                title: "Launch funded cohorts",
                body: "We promote your programs to workforce boards, community partners, and learners.",
              },
              {
                label: "Step 4",
                title: "Track outcomes together",
                body: "We share data on enrollments, completions, and placements for grants and future funding.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">
                  {item.label}
                </p>
                <h3 className="mt-1 text-sm font-semibold md:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 md:text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / CASE STUDY PLACEHOLDER */}
      <section className="border-b border-slate-800 bg-slate-900/70">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 lg:px-12">
          <div className="grid gap-8 md:grid-cols-[2fr,3fr] md:items-center">
            <div className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
              <Image
                src="/images/homepage/workforce-pathway-ecosystem.png"
                alt="Training provider success story video"
                width={800}
                height={450}
                className="h-auto w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/40"
                >
                  <span className="ml-1 text-lg font-bold">▶</span>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                Provider Spotlight
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                "Elevate helped us reach learners we never would have reached on our own."
              </h2>
              <p className="mt-3 text-sm text-slate-300 md:text-base">
                Use this space to highlight a barber academy, healthcare institute, or
                technical school that expanded access through workforce funding and
                Elevate&apos;s ecosystem.
              </p>
              <p className="mt-4 text-xs text-slate-400">
                Example: "Since partnering with Elevate For Humanity, 80% of our cohort
                has been funded through WIOA or workforce grants—and we have a clearer
                pathway from training to employment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-500/10 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:px-10 lg:px-12 lg:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to explore a{" "}
            <span className="text-orange-400">training partnership?</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Whether you&apos;re a barber academy, healthcare school, CDL provider, or
            trades program, let&apos;s talk about how funded learners and workforce
            partners can fit into your model.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?type=training-provider"
              className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition"
            >
              Schedule a partnership call
            </Link>
            <Link
              href="/directory"
              className="rounded-full border border-orange-400 px-8 py-3 text-sm font-semibold text-orange-300 hover:bg-orange-500/10 transition"
            >
              View example programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
