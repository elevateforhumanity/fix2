import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/home/HeroVideo';
import PrimaryCtas from '@/components/home/PrimaryCtas';
import HeroBanner from '@/components/hero/HeroBanner';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. HERO BANNER - Video hero */}
      <section className="px-4 sm:px-6 lg:px-10 pt-6 pb-10">
        <div className="relative w-full overflow-hidden rounded-3xl">
          <div className="relative h-[520px] w-full md:h-[600px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2081347919&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ezZ0FVT-e8bJDB4vfWuYMSbBf2IiAnOZLAxWrge9gnOAevZMVxtdhgOiss5CNfUexEvxOZHJ-DEk7EKU8qIidPUiG6WydOZNhJAIm60IVTIhGhp4clYPL-amrhFmMrwICdauopAT3dS~QOrJQc49U1sjaBE4VxJt1cA9ociJD5ki4jMn8zJ9u053b8ZZWqy0YV4nANu9XCzPCMsD2wgVYa3xpj12SV3BQk6lmd~oSNaz~aJyjf-goldm7i29fveQ~7DXNeUega8pF7yVMMVFHdIYTSroWpz5oMgD7BB8OCKtdkU5fk0DCzIqnul-YVuoIlmThN0-VUJ65U~2TW3UmQ__"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        {/* Headline and CTAs BELOW the banner */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900">
            Training, Funding, and Workforce Reporting — All In One Platform
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-700">
            Built for students, employers, and workforce agencies to train, fund, track, and scale real outcomes with compliance-ready reporting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="/apply"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors"
            >
              Apply for Training
            </a>
            <a
              href="/platform"
              className="inline-flex items-center justify-center rounded-xl border-2 border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              License the Platform
            </a>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR PATH (3 TILES) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Choose Your Path
          </h2>

          <div className="mt-7 grid md:grid-cols-3 gap-6">
            {/* Get Trained */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/heroes/student-career.jpg"
                  alt="Get trained"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                Get Trained
              </h3>
              <p className="mt-2 text-zinc-700">
                Free or funded training programs connected to real careers,
                employers, and credentials.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/apply"
              >
                Apply Now →
              </Link>
            </div>

            {/* Partner With Us */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/heroes/training-provider-1.jpg"
                  alt="Partner with us"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                Partner With Us
              </h3>
              <p className="mt-2 text-zinc-700">
                Hire talent, host apprenticeships, or partner with a
                workforce-ready training provider.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/employers"
              >
                Partner With EFH →
              </Link>
            </div>

            {/* License the Platform */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-100">
                <Image
                  src="/images/efh/hero/hero-support.jpg"
                  alt="License the platform"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-black text-zinc-900">
                License the Platform
              </h3>
              <p className="mt-2 text-zinc-700">
                Deploy a complete workforce operating system for your
                organization, school, or agency.
              </p>
              <Link
                className="mt-4 inline-flex font-extrabold text-zinc-900 hover:underline"
                href="/platform"
              >
                View Licensing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 STEPS) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            How It Works
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">1</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">Enroll</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Students apply once and are matched to training, funding, and
                support services.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">2</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">Train</h3>
              <p className="mt-2 text-sm text-zinc-700">
                Hybrid learning, apprenticeships, and hands-on experience —
                tracked in real time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="text-3xl font-black text-zinc-900">3</div>
              <h3 className="mt-3 text-lg font-black text-zinc-900">
                Report Outcomes
              </h3>
              <p className="mt-2 text-sm text-zinc-700">
                Completion, credentials, placements, and funding reports — ready
                for boards and agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STUDENT OUTCOMES & SUPPORT */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-200">
            <Image
              src="/images/efh/sections/classroom.jpg"
              alt="Student outcomes and support"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              We support the whole learner — not just enrollment.
            </h2>
            <ul className="mt-6 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Career training</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Case management</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Funding navigation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Credential tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Employer connections</span>
              </li>
            </ul>
            <p className="mt-6 text-zinc-700 font-medium">
              Built for real people, real barriers, and real outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. EMPLOYERS & WORKFORCE BOARDS */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              Designed to meet compliance, reporting, and accountability
              requirements.
            </h2>
            <ul className="mt-6 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>WIOA / WRG / JRI aligned</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Registered Apprenticeship compatible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Employer-validated skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Board-ready reporting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✔</span>
                <span>Secure, auditable data</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-zinc-200">
            <Image
              src="/images/efh/sections/coaching.jpg"
              alt="Employers and workforce boards"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. THE PLATFORM (WHAT YOU'RE LICENSING) */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            This is not just a school website.
          </h2>
          <p className="mt-3 text-xl text-zinc-700 font-semibold">
            It's a Workforce Operating System.
          </p>

          <div className="mt-8 grid md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Multi-tenant
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Config-driven
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                License-enforced
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                White-label ready
              </div>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
              <div className="text-sm font-black text-zinc-900">
                Secure by design
              </div>
            </div>
          </div>

          <p className="mt-6 text-zinc-700">
            Used by training providers, employers, nonprofits, and agencies.
          </p>

          <div className="mt-8">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-6 py-3 font-extrabold hover:bg-zinc-800 inline-flex transition"
              href="/platform"
            >
              View Licensing
            </Link>
          </div>
        </div>
      </section>

      {/* 7. COMPLIANCE & TRUST */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Compliance & Trust
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Workforce Innovation & Opportunity Act (WIOA)
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Registered Apprenticeship Programs
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Employer & Board Reporting
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  FERPA-aware student data handling
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Role-based access & RLS security
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-zinc-200">
              <div className="flex items-start">
                <span className="mr-2 text-zinc-900">✔</span>
                <span className="text-zinc-700">
                  Secure, auditable platform
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Start training. Start partnering. Or license the platform.
          </h2>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="rounded-xl bg-zinc-900 text-white px-6 py-3 font-extrabold hover:bg-zinc-800 inline-flex justify-center transition"
              href="/apply"
            >
              Apply for Training
            </Link>
            <Link
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3 font-extrabold hover:bg-zinc-50 inline-flex justify-center transition"
              href="/platform"
            >
              License the Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
