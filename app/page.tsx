import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Elevate for Humanity | Free Career Training Indianapolis",
  description:
    "100% free workforce training through WIOA funding. CNA, HVAC, Barber, Tax Prep and more. Real jobs, real credentials, no tuition.",
  alternates: {
    canonical: "https://www.elevateforhumanity.org",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
                Free & Funded Training • Marion County
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Career Training That Leads to Real Jobs
              </h1>
              <p className="text-base text-slate-600 md:text-lg">
                Elevate For Humanity connects you to approved training, workforce grants, and employers so you can
                start a new career <span className="font-semibold text-slate-900">without tuition or debt</span>.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition-all"
                >
                  Start My Application
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all"
                >
                  Talk to Our Team
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-900">Indianapolis Residents</p>
                <p className="mt-1 text-xs text-slate-600">
                  May qualify for Workforce Ready Grants, WIOA funding, or paid apprenticeships.
                </p>
              </div>
            </div>

            {/* Single Hero Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/media/hero/hero-learners.jpg"
                alt="Students in workforce training"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6">
                <p className="text-sm font-semibold text-white">20+ Workforce Programs</p>
                <p className="mt-1 text-xs text-white/90">Healthcare • Trades • Beauty • Business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Who We Serve
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center max-w-2xl mx-auto">
            Elevate for Humanity connects job seekers, employers, and community partners 
            through state-funded workforce training.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/artlist/hero-training-2.jpg"
                  alt="Job seekers in training"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">Job Seekers</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Get free training, earn credentials, and connect with employers hiring in Indianapolis.
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/artlist/hero-training-3.jpg"
                  alt="Employers partnering with Elevate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">Employers</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Access trained, job-ready candidates and build your workforce pipeline.
                </p>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/artlist/hero-training-4.jpg"
                  alt="Community partners supporting workforce development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">Community Partners</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Workforce boards, case managers, and nonprofits helping people access training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                State-Funded Training Programs
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Free or low-cost training through WIOA, Workforce Ready Grants, and apprenticeships.
              </p>
            </div>
            <Link
              href="/programs"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              View All Programs
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Medical Assistant */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/medical-assistant-photos/medical-assistant-06.jpg"
                  alt="Medical Assistant Training Program"
                  title="Medical Assistant Career Training - Free Program in Indianapolis"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">Medical Assistant</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Train for Medical Assistant roles with hands-on clinical experience and job placement.
                </p>
                <Link
                  href="/programs/medical-assistant"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Learn More
                </Link>
              </div>
            </article>

            {/* HVAC */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/media/programs/hvac-hd.jpg"
                  alt="HVAC Technician Training Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">HVAC Technician</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Hands-on training with HVAC equipment and systems for high-paying technical careers.
                </p>
                <Link
                  href="/programs/hvac-tech"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Learn More
                </Link>
              </div>
            </article>

            {/* Barber */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/media/programs/barber-hd.jpg"
                  alt="Barber Apprenticeship Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">Barber Apprenticeship</h3>
                <p className="mt-2 text-sm text-slate-700">
                  Earn while you learn with licensed barbers. FREE apprenticeship with real shop experience.
                </p>
                <Link
                  href="/programs/barber"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Learn More
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              View All 20+ Programs
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center max-w-2xl mx-auto">
            Three simple steps from application to employment
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Choose Your Path</h3>
              <p className="mt-2 text-sm text-slate-700">
                Browse 20+ programs in healthcare, trades, beauty, business, and more. All mapped to real jobs.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Get Funded</h3>
              <p className="mt-2 text-sm text-slate-700">
                We help you access WIOA, Workforce Ready Grants, apprenticeships, and employer sponsorships.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">Start Working</h3>
              <p className="mt-2 text-sm text-slate-700">
                Complete training, earn credentials, and connect with employers ready to hire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Real Results, Real Impact
          </h2>
          <p className="mt-2 text-sm text-slate-600 text-center">
            Our programs connect people to careers that change lives
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">500+</div>
              <div className="mt-2 text-sm text-slate-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">85%</div>
              <div className="mt-2 text-sm text-slate-600">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">78%</div>
              <div className="mt-2 text-sm text-slate-600">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">$18/hr</div>
              <div className="mt-2 text-sm text-slate-600">Avg Starting Wage</div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP DOWNLOAD */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Take Your Learning Anywhere
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Download the Elevate for Humanity mobile app to access courses, track progress, 
                and stay connected with your instructors on the go.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/app/elevate-for-humanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.elevateforhumanity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>

              <p className="mt-6 text-sm text-slate-600">
                ✓ Access all your courses offline<br/>
                ✓ Get push notifications for assignments<br/>
                ✓ Track your progress in real-time
              </p>
            </div>

            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <Image
                src="/images/facilities-new/facility-1.jpg"
                alt="Elevate for Humanity Mobile App"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      E
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Elevate for Humanity</div>
                      <div className="text-xs text-slate-600">Career Training & LMS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Your Career Journey?
          </h2>
          <p className="mt-4 text-lg text-red-50">
            One application. Multiple programs, funding options, and partner pathways. 
            We'll walk it with you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              Start Application
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
