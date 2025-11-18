import Link from 'next/link';
import Image from 'next/image';

const partnerTypes = [
  {
    title: 'Workforce and referral agencies',
    body: 'Use Elevate as your shared front door for barber, healthcare, and trades pathways. Track who you send, who starts, and who finishes—without chasing paper.',
  },
  {
    title: 'Schools, churches, and community hubs',
    body: "Turn everyday conversations into clear next steps. When someone is ready, you can confidently say, 'Go to Elevate' and know what happens next.",
  },
  {
    title: 'Credentialing partners and training providers',
    body: 'Keep your curriculum, approvals, and brand. Elevate wraps around your programs with LMS orchestration, communication, and narrative for funders.',
  },
  {
    title: 'Employers and barbershops',
    body: 'Get closer to the talent pipeline. Co-design cohorts, host apprentices, and see who is actually close to ready for real roles.',
  },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 ring-1 ring-emerald-400/40">
              <span className="text-sm font-bold text-emerald-300">EFH</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-50">
                Elevate for Humanity
              </span>
              <span className="text-[0.7rem] text-slate-400">
                Elevate Connects Directory
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
            <Link href="/programs" className="hover:text-emerald-300">
              Programs
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-300">
              How Elevate Works
            </Link>
            <Link href="/partners" className="hover:text-emerald-300">
              For Agencies and Partners
            </Link>
            <Link href="/about" className="hover:text-emerald-300">
              About
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[0.7rem] text-slate-100 hover:border-emerald-400 hover:text-emerald-200"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 lg:px-6 lg:pb-16 lg:pt-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              For partners
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-[1.8rem]">
              A front door you can trust for the people you serve.
            </h1>
            <p className="text-sm text-slate-300">
              Elevate for Humanity was built so workforce boards, agencies,
              schools, churches, and employers could share one high-trust hub
              for training and pathways—instead of every organization trying to
              build their own silo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
              >
                Talk with Elevate about partnership
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:border-emerald-300 hover:text-emerald-100"
              >
                See how the LMS works
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-10 mb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                alt="Partners collaborating on workforce development"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-semibold mb-2">
                  Partnership opportunities
                </p>
                <p className="text-2xl font-bold">
                  Work together to move people into careers
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {partnerTypes.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.75)]"
              >
                <h2 className="text-[0.98rem] font-semibold text-slate-50">
                  {p.title}
                </h2>
                <p className="mt-2 text-[0.85rem] text-slate-300">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-[0.75rem] text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>
            © {new Date().getFullYear()} Elevate for Humanity. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/terms" className="hover:text-emerald-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-emerald-300">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-emerald-300">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
