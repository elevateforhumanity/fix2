import Image from 'next/image';
import Link from 'next/link';
import { Users, Briefcase, GraduationCap, Wrench, Truck, DollarSign, Heart, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Elevate For Humanity | Free & Funded Career Pathways',
  description: 'We help people access training, funding, apprenticeships, and support services — even when life has barriers. Appointment-based advising. Workforce-aligned. Real people follow up.',
};

export default function HomePage() {
  return (
    <main className="w-full">
      {/* 1. HERO - Students First. Period. */}
      <section className="relative w-full bg-gradient-to-br from-blue-900 via-purple-900 to-black py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Free & funded career pathways<br />that lead to real jobs
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10">
              We help people access training, funding, apprenticeships, and support services — even when life has barriers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/programs" 
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Explore Programs
              </Link>
              <Link 
                href="/apply" 
                className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Start Your Application
              </Link>
            </div>

            <p className="text-sm text-white/70">
              Appointment-based advising • Workforce-aligned • Real people follow up
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
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
        </div>
      </section>

      {/* 2. PROGRAMS - Career Pathways We Support */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center mb-4">
            Career Pathways We Support
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Real, tangible programs that lead to jobs, licenses, and apprenticeships
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Barber Apprenticeship */}
            <Link href="/programs/barber-apprenticeship" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Barber Apprenticeship</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 12-18 months</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> In-person</p>
                  <p><strong>Outcome:</strong> License + Job</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>

            {/* Healthcare */}
            <Link href="/programs/healthcare" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Healthcare</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 4-12 weeks</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> Hybrid</p>
                  <p><strong>Outcome:</strong> CNA, MA, Phlebotomy</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>

            {/* Skilled Trades */}
            <Link href="/programs/skilled-trades" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                    <Wrench className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Skilled Trades</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 8-24 weeks</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> In-person</p>
                  <p><strong>Outcome:</strong> HVAC, Building Tech</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>

            {/* CDL & Transportation */}
            <Link href="/programs/cdl-transportation" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">CDL & Transportation</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 4-8 weeks</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> In-person</p>
                  <p><strong>Outcome:</strong> CDL License + Job</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>

            {/* Business & Financial Services */}
            <Link href="/programs/business-financial" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Business & Financial Services</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 8-16 weeks</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> Online / Hybrid</p>
                  <p><strong>Outcome:</strong> Job / Certification</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>

            {/* Tax Preparation & Entrepreneurship */}
            <Link href="/programs/tax-entrepreneurship" className="group block">
              <div className="h-full rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-xl hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Tax Prep & Entrepreneurship</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> 6-12 weeks</p>
                  <p><strong>Cost:</strong> Free with funding when eligible</p>
                  <p><strong>Format:</strong> Online / Hybrid</p>
                  <p><strong>Outcome:</strong> Certification + Business</p>
                </div>
                <span className="inline-flex items-center font-semibold text-blue-600 group-hover:underline">
                  View Program →
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/programs" 
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              View All Programs
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

      {/* 3. WHY STUDENTS SUCCEED HERE */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-4">
            Why our students don't fall through the cracks
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            This is where your ecosystem quietly shows
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">We help secure funding</h3>
              <p className="text-gray-700">
                WIOA, WRG, JRI, employer support — we navigate the funding landscape so you don't have to.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">We coordinate training with real employers</h3>
              <p className="text-gray-700">
                Programs are designed with hiring partners, so you're learning skills that lead to actual jobs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">We support justice-impacted and returning citizens</h3>
              <p className="text-gray-700">
                Specialized navigation for those overcoming barriers — because everyone deserves a second chance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">We help navigate transportation, childcare, and documentation</h3>
              <p className="text-gray-700">
                Life has barriers. We help coordinate support services so nothing stops your progress.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm md:col-span-2">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">We track progress so students don't disappear</h3>
              <p className="text-gray-700">
                Real people follow up. We monitor your journey from application to employment — you're never alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE STUDENT PATHWAY */}
      <section className="bg-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-4">
            Your path from interest to employment
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Not "systems" — just clear steps
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Apply or submit an inquiry</h3>
                <p className="text-gray-700">
                  Quick form, no commitment. Tell us what you're interested in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Meet with an advisor</h3>
                <p className="text-gray-700">
                  Appointment-based. We discuss your goals, barriers, and options.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Get matched to funding and a program</h3>
                <p className="text-gray-700">
                  We handle the paperwork and coordinate with funding sources.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Start training or apprenticeship</h3>
                <p className="text-gray-700">
                  Begin your program with ongoing support and progress tracking.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Move into employment or next credential</h3>
                <p className="text-gray-700">
                  Graduate with job placement support or pathway to advanced training.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/apply" 
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TAX SERVICES */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-4">
            Tax Preparation Services
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            We offer tax services through two separate programs to ensure clarity and compliance.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rise Up Foundation */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-green-200">
              <h3 className="text-2xl font-bold text-black mb-4">Rise Up Foundation</h3>
              <p className="text-gray-700 mb-6">
                Free tax preparation for eligible individuals through community-based and volunteer-supported services.
              </p>
              <Link 
                href="/vita" 
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all"
              >
                Free Tax Help →
              </Link>
            </div>

            {/* SupersonicFastCash */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-black mb-4">SupersonicFastCash</h3>
              <p className="text-gray-700 mb-6">
                Professional, paid tax preparation for individuals and businesses.
              </p>
              <Link 
                href="/tax/supersonicfastcash" 
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
              >
                Paid Tax Services →
              </Link>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-8">
            Disclosure: Free and paid tax services are operated separately.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to take the next step?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Whether you're starting fresh or overcoming barriers, we're here.
          </p>
          <Link 
            href="/apply" 
            className="inline-block px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Your Application
          </Link>
        </div>
      </section>

      {/* OLD STORY SECTION - KEEPING FOR REFERENCE */}
      <section className="bg-gray-50 px-6 sm:px-10 lg:px-12 py-20 lg:py-24 hidden">
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

      {/* 5. UNLOCKING POTENTIAL VIDEO */}
      <section className="px-6 sm:px-10 lg:px-12 py-20 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-black">
              Elevate for Humanity is Unlocking Potential
            </h2>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div className="relative h-[400px] w-full md:h-[600px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
