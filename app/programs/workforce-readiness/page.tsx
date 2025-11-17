// app/programs/workforce-readiness/page.tsx
import Link from 'next/link';

export default function WorkforceReadinessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/program-workforce-readiness.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 md:px-12 lg:px-24 max-w-5xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase text-orange-300">
            Elevate For Humanity™ • Workforce &amp; Re-Entry Pathway
          </p>
          <h1 className="mb-3 text-3xl md:text-4xl font-bold">
            Workforce Readiness &amp; Re-Entry Support
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-100">
            A guided pathway that helps you rebuild, reset, and re-enter the
            workforce with confidence through coaching, skills training, and
            real employment connections.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-12 md:py-12 space-y-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Program Overview
          </h2>
          <p className="text-sm md:text-base text-slate-200">
            This pathway is built for adults and youth who need a fresh start, a
            second chance, or a clearer roadmap into stable work. We blend soft
            skills, digital skills, career exploration, and barrier navigation
            so you don&apos;t have to figure it all out alone.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Typical Duration
            </h3>
            <p className="text-sm text-slate-200">
              4–12 Weeks • Coaching + Workshops
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Format
            </h3>
            <p className="text-sm text-slate-200">
              Small groups, 1:1 coaching, and online tools — built around real
              life, not just classrooms.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
            <h3 className="mb-2 text-sm font-semibold text-orange-300">
              Support &amp; Referrals
            </h3>
            <p className="text-sm text-slate-200">
              Connections to training, apprenticeships, employers, and
              supportive services where available.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-lg font-bold mb-3">Who This Is For</h2>
            <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
              <li>Re-entry citizens rebuilding after justice involvement</li>
              <li>Adults who have been out of work or underemployed</li>
              <li>Young adults unsure of their next step after high school</li>
              <li>Caregivers, single parents, or anyone starting over</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-lg font-bold mb-3">What You&apos;ll Work On</h2>
            <ul className="list-disc pl-5 text-sm md:text-base text-slate-200 space-y-1">
              <li>Resumes, applications, and interview prep</li>
              <li>Soft skills, communication, and workplace expectations</li>
              <li>Digital basics, email, online forms, portals</li>
              <li>
                A personal plan linking you to training, employment, or
                apprenticeships
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
          <h2 className="text-lg font-bold mb-3">We Understand Barriers</h2>
          <p className="text-sm md:text-base text-slate-200 mb-3">
            Many of our learners face real-life challenges: childcare,
            transportation, housing, past charges, or gaps in work history. Our
            role is to help you navigate what you can, connect you to partners
            where possible, and keep you moving toward a real opportunity.
          </p>
          <p className="text-sm md:text-base text-slate-200">
            We don&apos;t promise overnight fixes — we promise honest support,
            clear next steps, and a community that believes you deserve a path
            forward.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-400/40 bg-gradient-to-r from-slate-900 to-slate-950 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-1">
              Need a Fresh Start in Work or Training?
            </h2>
            <p className="text-sm md:text-base text-slate-200">
              Share where you&apos;re starting from. We&apos;ll help map out
              realistic next steps into training, apprenticeships, or employment
              — one step at a time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/enroll?program=workforce-readiness"
              className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-orange-500/40 hover:bg-orange-400 transition"
            >
              Start My Application
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
            >
              Talk With Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
