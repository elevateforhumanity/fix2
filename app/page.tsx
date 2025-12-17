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
                  src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__9/video-5599b9e1-fe1f-4f31-a821-c5d9b2af60e8.mp4?Expires=2081347919&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=ezZ0FVT-e8bJDB4vfWuYMSbBf2IiAnOZLAxWrge9gnOAevZMVxtdhgOiss5CNfUexEvxOZHJ-DEk7EKU8qIidPUiG6WydOZNhJAIm60IVTIhGhp4clYPL-amrhFmMrwICdauopAT3dS~QOrJQc49U1sjaBE4VxJt1cA9ociJD5ki4jMn8zJ9u053b8ZZWqy0YV4nANu9XCzPCMsD2wgVYa3xpj12SV3BQk6lmd~oSNaz~aJyjf-goldm7i29fveQ~7DXNeUega8pF7yVMMVFHdIYTSroWpz5oMgD7BB8OCKtdkU5fk0DCzIqnul-YVuoIlmThN0-VUJ65U~2TW3UmQ__"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL AUDIENCE SELECTOR - Per Scholas inspired */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Students */}
            <Link 
              href="/apply"
              className="group block"
            >
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-10 hover:shadow-xl hover:border-black transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    For Students
                  </p>
                  <h3 className="text-2xl font-bold text-black mb-4 leading-tight">
                    I want no-cost training for a competitive career
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    Launch your career through free training programs funded by WIOA, WRG, JRI, and apprenticeships.
                  </p>
                  <span className="inline-flex items-center font-semibold text-black group-hover:underline">
                    Start Your Journey →
                  </span>
                </div>
              </div>
            </Link>

            {/* For Employers */}
            <Link 
              href="/employers"
              className="group block"
            >
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
                    Hire job-ready graduates with the skills you need. Partner with us for apprenticeships and training.
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

      {/* 3. SUCCESS METRICS */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="text-5xl font-black text-black mb-3">89%</div>
              <p className="text-lg text-gray-700">
                Placement Rate
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Graduates find employment within 90 days
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6">
                <Users className="w-10 h-10" />
              </div>
              <div className="text-5xl font-black text-black mb-3">500+</div>
              <p className="text-lg text-gray-700">
                Graduates Placed
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Lives transformed through career training
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6">
                <Briefcase className="w-10 h-10" />
              </div>
              <div className="text-5xl font-black text-black mb-3">50+</div>
              <p className="text-lg text-gray-700">
                Hiring Partners
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Companies actively hiring our graduates
              </p>
            </div>
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
              <h3 className="text-xl font-bold text-black mb-4">Submit Inquiry</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Complete our inquiry form and we'll match you to training, funding, and support services.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-4">WorkOne Appointment</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Meet with a WorkOne advisor to confirm eligibility and complete enrollment paperwork.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-4">We Enroll + Place You</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Start training and receive job placement support to launch your new career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHERE OUR GRADUATES WORK */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-16">
            Where Our Graduates Work
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Placeholder for employer logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i}
                className="w-full h-24 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-black transition-colors"
              >
                <span className="text-sm font-semibold">Employer {i}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-base text-gray-700">
              Join 500+ graduates working at leading companies across Indianapolis
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
                  95% of graduates employed within 90 days. Average starting salary $45k/year.
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
                  Get paid $15-20/hr while training. 1,500 hours hands-on experience.
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
                  High demand career. 98% certification pass rate. Start earning quickly.
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
            Join 500+ Indianapolis residents who have launched successful careers through our free training programs.
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
