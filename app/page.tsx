import Image from 'next/image';
import Link from 'next/link';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. HERO - Video with simple headline */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-black">
              Elevate for Humanity is Unlocking Potential
            </h1>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
            <div className="relative h-[400px] w-full md:h-[600px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/heroes/hero-homepage.jpg"
                style={{ backgroundColor: 'transparent' }}
              >
                <source
                  src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2081347919&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ezZ0FVT-e8bJDB4vfWuYMSbBf2IiAnOZLAxWrge9gnOAevZMVxtdhgOiss5CNfUexEvxOZHJ-DEk7EKU8qIidPUiG6WydOZNhJAIm60IVTIhGhp4clYPL-amrhFmMrwICdauopAT3dS~QOrJQc49U1sjaBE4VxJt1cA9ociJD5ki4jMn8zJ9u053b8ZZWqy0YV4nANu9XCzPCMsD2wgVYa3xpj12SV3BQk6lmd~oSNaz~aJyjf-goldm7i29fveQ~7DXNeUega8pF7yVMMVFHdIYTSroWpz5oMgD7BB8OCKtdkU5fk0DCzIqnul-YVuoIlmThN0-VUJ65U~2TW3UmQ__"
                  type="video/mp4"
                />
              </video>
              {/* Fallback for when video/poster doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 -z-10">
                <div className="text-center text-white p-8">
                  <h2 className="text-3xl font-bold mb-2">Elevate for Humanity</h2>
                  <p className="text-lg opacity-90">Unlocking Potential Through Education</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL AUDIENCE SELECTOR - Per Scholas inspired */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Students */}
            <Link href="/apply" className="group block">
              <div className="h-full rounded-xl border-2 border-blue-200 bg-white p-10 hover:shadow-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
                    For Students
                  </p>
                  <h3 className="text-2xl font-bold text-black mb-4 leading-tight">
                    I want no-cost training for a competitive career
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Launch your career through free training programs funded by
                    WIOA, WRG, JRI, and apprenticeships.
                  </p>
                  <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                    Start Your Journey →
                  </span>
                </div>
              </div>
            </Link>

            {/* For Employers */}
            <Link href="/employers" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-10 hover:shadow-xl hover:border-black transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    For Employers
                  </p>
                  <h3 className="text-2xl font-bold text-black mb-4 leading-tight">
                    I need to hire qualified talent for my company
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Hire job-ready graduates with the skills you need. Partner
                    with us for apprenticeships and training.
                  </p>
                  <span className="inline-flex items-center font-semibold text-black group-hover:underline">
                    Partner With Us →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5. ELEVATION MESSAGE */}
      <section className="relative bg-black text-white px-6 sm:px-10 lg:px-12 py-32 lg:py-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/facilities-new/facility-2.jpg"
            alt="Elevation"
            fill
            className="object-cover opacity-40"
            loading="lazy"
            quality={75}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
            This Is Not Graduation.
          </h2>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-orange-500 leading-tight mb-12">
            This Is Elevation.
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            We don't just hand you a certificate. We elevate you to a new
            level—with skills, confidence, and a career that changes everything.
          </p>
        </div>
      </section>

      {/* 3. OUR STORY */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-12">
            Breaking Down Barriers to Career Success
          </h2>

          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            <p>
              Too many talented people are stuck in low-wage jobs—not because
              they lack potential, but because they lack access to training and
              opportunity. Traditional education is expensive, time-consuming,
              and often disconnected from what employers actually need.
            </p>

            <p>
              <span className="font-bold text-black">We're changing that.</span>{' '}
              Elevate For Humanity provides 100% free career training in
              high-demand fields. No tuition. No hidden costs. No barriers.
            </p>

            <p>
              We partner with workforce boards, government programs, and
              employers to fund your training. You focus on learning the skills
              that lead to real jobs with real wages. When you graduate, we
              connect you directly with companies ready to hire.
            </p>

            <p className="text-xl font-bold text-black">
              This is more than training—it's a pathway to economic mobility and
              a better future for you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                Submit Inquiry
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Complete our inquiry form and we'll match you to training,
                funding, and support services.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                WorkOne Appointment
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Meet with a WorkOne advisor to confirm eligibility and complete
                enrollment paperwork.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-4">
                We Enroll + Place You
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Start training and receive job placement support to launch your
                new career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ELEVATION VIDEO HERO - This Is Not Graduation, This Is Elevation */}
      <section className="relative w-full bg-gradient-to-br from-blue-900 via-red-900 to-black py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white text-center mb-12 leading-tight">
            This Is Not Graduation.
            <br />
            <span className="text-red-500">This Is Elevation.</span>
          </h2>

          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-[400px] w-full md:h-[600px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2081181154&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=VwkyRzCrV6H1PWfgEOAjdlFRKVaLggSXiMJuEMfNgBvs0LcsogkXMuXNj05nyyCnO0JFmYNadPeQ5vIijEMU2LbBsiMH3dIfehwfMaBjjn5Ffphrc-BjoKc1cazP744W4YMM3MrDtBLqzQPphVXiQutv71uegGfie3jzq6jD8CwLAaCpZgEY7Ujo0e4JeJ7BZBv1WFTtOZVQDbMXHe~61~mGhAlH9eH9Z-fFjf4Wu51RNAFhlewsDWHbxyO6Qk5lIJ1pTv8jB-BQMqNNzzenXMWWW5AGhbFtd0D85-zWC2f~rUz8fuNx3jqV~99wh005J0XK6XTTJIxsgSB5o2ZT6w__"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              We don't just train people for jobs. We elevate lives, transform
              communities, and create lasting economic impact.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROGRAMS */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-16">
            Featured Programs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* HVAC */}
            <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src="/images/programs/hvac-tech.jpg"
                  alt="HVAC Technician"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black leading-tight mb-3">
                  HVAC Technician
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    12 weeks
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    $0 with funding
                  </span>
                </div>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  95% of graduates employed within 90 days. Average starting
                  salary $45k/year.
                </p>
                <Link
                  href="/programs/hvac-technician"
                  className="inline-flex items-center font-semibold text-black hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Barber */}
            <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src="/images/programs/barber.jpg"
                  alt="Barber Apprenticeship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black leading-tight mb-3">
                  Barber Apprenticeship
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    12 months
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    Earn while you learn
                  </span>
                </div>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  Get paid $15-20/hr while training. 1,500 hours hands-on
                  experience.
                </p>
                <Link
                  href="/programs/barber-apprenticeship"
                  className="inline-flex items-center font-semibold text-black hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* CNA */}
            <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src="/images/programs/cna.jpg"
                  alt="Certified Nursing Assistant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black leading-tight mb-3">
                  Certified Nursing Assistant
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    4-6 weeks
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                    $0 with funding
                  </span>
                </div>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  High demand career. 98% certification pass rate. Start earning
                  quickly.
                </p>
                <Link
                  href="/programs/cna"
                  className="inline-flex items-center font-semibold text-black hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-semibold text-white hover:bg-gray-900 transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black leading-tight mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            Join 500+ Indianapolis residents who have launched successful
            careers through our free training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-semibold text-white hover:bg-gray-900 transition-colors min-w-[200px]"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-black bg-white px-8 py-4 text-base font-semibold text-black hover:bg-gray-50 transition-colors min-w-[200px]"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
