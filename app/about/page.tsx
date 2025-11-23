// app/about/page.tsx

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-16 sm:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto">

        <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
          About Elevate For Humanity
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-bold">
          A workforce ecosystem built for real people, real employers, and real results.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-200">
          Elevate For Humanity (EFH) is a hybrid workforce development platform and training
          institute that blends in-person programs, community partnerships, employer engagement,
          and a modern SaaS portal. Our mission is simple: remove barriers, expand access to
          high-quality training, and help people step into careers that change their lives
          and communities.
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-200">
          EFH serves individuals across healthcare, skilled trades, transportation, re-entry,
          youth programs, technical fields, and more. Many pathways are funded through WIOA,
          workforce grants, OJT, WEX, JRI, employer sponsorships, and other sources—making
          training accessible, affordable, and life-changing.
        </p>

        {/* About Video */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <video
            controls
            className="w-full"
          >
            <source src="/videos/about-section-video-with-narration.mp4" type="video/mp4" />
          </video>
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">What makes Elevate different?</h2>

          <p className="text-sm sm:text-base text-slate-200">
            Most organizations offer either training or technology—but not both. Elevate For
            Humanity brings everything together: a pathway directory, student and employer portals,
            a partner/instructor portal, workforce analytics, real classrooms, embedded credentialing
            partners, and direct alignment with workforce board priorities. We eliminate friction,
            increase accountability, and make outcomes clear.
          </p>

          <ul className="space-y-2 text-sm text-slate-200">
            <li>• A funded training catalog with 20+ workforce-aligned programs.</li>
            <li>• A single portal for students, employers, partners, and workforce staff.</li>
            <li>• Transparent attendance, progress, credentialing, and placement tracking.</li>
            <li>• Support for WIOA, WRG, JRI, ETPL, apprenticeships, OJT, and employer upskilling.</li>
            <li>• Partnerships with real institutions, academies, and credentialing providers.</li>
            <li>• A replicable ecosystem that can be deployed in any city or region.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Who we serve</h2>
          <p className="text-sm sm:text-base text-slate-200">
            Elevate For Humanity brings structure, clarity, and support to everyone involved in
            workforce development:
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>• <strong>Students & learners</strong> overcoming barriers and pursuing new careers.</li>
            <li>• <strong>Employers</strong> needing reliable talent, better onboarding, and OJT/WEX pipelines.</li>
            <li>• <strong>Training providers</strong> delivering hands-on instruction with compliance support.</li>
            <li>• <strong>Workforce boards & funders</strong> needing real-time visibility into outcomes.</li>
            <li>• <strong>Community organizations</strong> supporting re-entry, youth, and underserved populations.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold">Our mission</h2>
          <p className="text-sm sm:text-base text-slate-200">
            To elevate people by connecting them to opportunity, education, and employers in a way
            that is accessible, dignified, and rooted in community. We believe that workforce
            development should be human, transparent, and connected—not siloed or confusing.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold">Partner with Elevate</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200">
            Whether you are a student, employer, training provider, nonprofit,
            workforce board, or community leader—we would love to work with you.
            Together we can create stronger pathways to careers and a stronger
            economic foundation for the communities we serve.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition"
            >
              Contact Elevate For Humanity
            </Link>
            <Link
              href="/directory"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-emerald-400/60 text-emerald-300 hover:bg-emerald-400/10 transition"
            >
              Explore funded programs
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
