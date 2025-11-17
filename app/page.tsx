import Link from "next/link";

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    blurb: "Hands-on clinical training that prepares you for entry-level MA roles in clinics, hospitals, and specialty practices.",
    funding: "WRG • WIOA • Workforce Grants",
    duration: "4–6 Months • Hybrid",
  },
  {
    slug: "barber",
    name: "Barber Apprenticeship",
    blurb: "State-approved apprenticeship – train in real barbershops while earning hours toward your barber license.",
    funding: "DOL Apprenticeship • WIOA",
    duration: "12–18 Months • On-the-Job + Classroom",
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    blurb: "Learn heating, cooling, and refrigeration systems and prepare for in-demand technician roles.",
    funding: "Workforce Grants • Employer Sponsors",
    duration: "4–9 Months • Lab + Field",
  },
  {
    slug: "building-tech",
    name: "Building Maintenance Technician",
    blurb: "Training for building systems, repairs, and facility maintenance to keep properties safe and functional.",
    funding: "Workforce Grants • Apprenticeship",
    duration: "4–9 Months • Hands-On",
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness & Re-Entry",
    blurb: "Rebuild, reset, and re-enter the workforce with coaching, skills training, and real employment connections.",
    funding: "Support Services • Referrals",
    duration: "4–12 Weeks • Coaching + Workshops",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24 max-w-6xl">
          <p className="mb-3 text-sm font-semibold tracking-[0.25em] uppercase text-orange-300">
            Elevate For Humanity™
          </p>
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Free & Funded Workforce Training
            <span className="block text-orange-400">
              Apprenticeships • Credentials • Real Jobs
            </span>
          </h1>
          <p className="mb-6 max-w-2xl text-base md:text-lg text-slate-100">
            We connect adults, youth, and re-entry talent with{" "}
            <span className="font-semibold text-orange-300">
              state-approved training, apprenticeships, and employer partners
            </span>{" "}
            so you can elevate your income, your family, and your community.
          </p>

          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-1 text-xs md:text-sm">
              Indiana Workforce • WRG • WIOA
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1 text-xs md:text-sm">
              State-Approved Barber Apprenticeship
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1 text-xs md:text-sm">
              Medical Assistant • HVAC • Building Tech • CDL
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/apply"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm md:text-base font-semibold shadow-lg shadow-orange-500/40 hover:bg-orange-400 transition"
            >
              Start My Application
            </Link>
            <Link
              href="#programs"
              className="rounded-full border border-white/40 px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/10 transition"
            >
              Explore Programs
            </Link>
          </div>

          <div className="mt-6 text-xs md:text-sm text-slate-200">
            <p>In partnership with training providers, employers, and workforce boards.</p>
            <p>Many learners qualify for little to no out-of-pocket cost.</p>
          </div>
        </div>
      </section>

      {/* TRUST / STATS STRIP */}
      <section className="bg-black border-y border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
          <div className="text-sm md:text-base">
            <p className="text-slate-300">Serving Indiana & beyond</p>
            <p className="font-semibold text-white">
              Workforce training aligned with real employers.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs md:text-sm text-slate-200">
            <div>
              <p className="font-bold text-white">State-Approved</p>
              <p>Barber Apprenticeship • Workforce Partner</p>
            </div>
            <div>
              <p className="font-bold text-white">Pathways</p>
              <p>Medical • Trades • Transportation • Re-Entry</p>
            </div>
            <div>
              <p className="font-bold text-white">Support</p>
              <p>Coaching • Case Management • Referrals</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section
        id="programs"
        className="bg-slate-950 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Training & Apprenticeship Programs
              </h2>
              <p className="mt-2 max-w-xl text-sm md:text-base text-slate-200">
                Choose a pathway that matches your goals. Many programs accept{" "}
                workforce funding, apprenticeships, or employer sponsorships.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              View all programs →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-lg shadow-black/50 hover:border-orange-400/70 hover:shadow-orange-500/20 transition"
              >
                <h3 className="mb-1 text-lg font-semibold text-white group-hover:text-orange-300">
                  {program.name}
                </h3>
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-orange-300">
                  {program.duration}
                </p>
                <p className="mb-3 text-sm text-slate-200">
                  {program.blurb}
                </p>
                <p className="mb-4 text-xs font-semibold text-slate-300">
                  Funding: {program.funding}
                </p>
                <span className="mt-auto text-xs font-semibold text-orange-400 group-hover:text-orange-200">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-black py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              How Elevate For Humanity Works
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
              We make the process simple. Our team walks with you from interest
              to enrollment to employment.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <div className="mb-2 text-xs font-semibold text-orange-300">
                STEP 1
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Connect & Explore
              </h3>
              <p className="text-sm text-slate-200">
                Complete a short interest form. Our team reviews funding options,
                program fit, and support services with you.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <div className="mb-2 text-xs font-semibold text-orange-300">
                STEP 2
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Enroll & Train
              </h3>
              <p className="text-sm text-slate-200">
                Enroll with our training partners. You&apos;ll receive coaching,
                case management, and help navigating life barriers.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <div className="mb-2 text-xs font-semibold text-orange-300">
                STEP 3
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                Elevate & Advance
              </h3>
              <p className="text-sm text-slate-200">
                Transition into jobs, apprenticeships, or next-level credentials
                with ongoing support from our network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS WITH IMAGES */}
      <section className="bg-slate-950 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Program Highlights
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-200 max-w-2xl mx-auto">
              Real training, real credentials, real careers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Medical Assistant */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-2">Medical Assistant</h3>
                <p className="text-sm text-slate-200 mb-3">
                  Clinical training for healthcare careers
                </p>
                <Link
                  href="/programs/medical-assistant"
                  className="inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* HVAC */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-2">HVAC Technician</h3>
                <p className="text-sm text-slate-200 mb-3">
                  Heating, cooling, and refrigeration systems
                </p>
                <Link
                  href="/programs/hvac"
                  className="inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Barber */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div 
                className="h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold text-white mb-2">Barber Apprenticeship</h3>
                <p className="text-sm text-slate-200 mb-3">
                  State-approved on-the-job training
                </p>
                <Link
                  href="/programs/barber"
                  className="inline-block rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-400 transition"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 to-red-600/95" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-3 text-2xl md:text-4xl font-bold text-white">
            Ready to Elevate Your Future?
          </h2>
          <p className="mb-8 text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            Whether you&apos;re just getting started, returning to the workforce,
            or changing careers, we&apos;ll help you find the right program and
            funding options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="rounded-full bg-white px-8 py-4 text-base md:text-lg font-bold text-orange-600 hover:bg-slate-100 shadow-xl transition"
            >
              Start My Application
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-base md:text-lg font-bold text-white hover:bg-white/10 transition"
            >
              Talk With Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-white">Elevate For Humanity™</p>
              <p className="text-xs text-slate-400">
                Workforce training, apprenticeships, and career pathways.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <Link href="/programs" className="hover:text-orange-300">Programs</Link>
              <Link href="/partners" className="hover:text-orange-300">Partners</Link>
              <Link href="/about" className="hover:text-orange-300">About</Link>
              <Link href="/contact" className="hover:text-orange-300">Contact</Link>
              <Link href="/privacy" className="hover:text-orange-300">Privacy</Link>
              <Link href="/terms" className="hover:text-orange-300">Terms</Link>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Elevate For Humanity. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
