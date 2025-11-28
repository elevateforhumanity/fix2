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
    <main className="min-h-screen bg-white">
      {/* DUAL HERO BANNERS */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white">
        {/* First Hero Banner */}
        <div className="relative w-full h-[600px] overflow-hidden">
          <Image
            src="/images/heroes/hero-homepage.jpg"
            alt="Elevate for Humanity - Career Training That Changes Lives"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
            <div className="max-w-6xl mx-auto h-full flex items-center px-4">
              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg animate-pulse">
                  🎓 100% Free Training • No Tuition • No Debt
                </span>
                <h1 className="mt-6 text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Your New Career Starts Here.<br/>
                  <span className="text-red-400">No Cost. Real Results.</span>
                </h1>
                <p className="mt-6 text-lg lg:text-xl text-white/90 leading-relaxed">
                  Join <strong className="text-white">thousands of Indianapolis residents</strong> who transformed their lives through free workforce training. 
                  Get certified, get hired, get ahead—all without paying a dime.
                </p>
                <div className="mt-4 flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">No tuition fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Job placement help</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm">Real credentials</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/apply"
                    className="group inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <span>Start Your Application</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Explore 20+ Programs
                  </Link>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
                  </div>
                  <p className="text-sm text-white/90">
                    <strong className="text-white">2,847+ students</strong> enrolled this year
                  </p>
                </div>
                <p className="mt-3 text-xs text-white/70">
                  ⚡ Most Indianapolis residents qualify instantly for Workforce Ready Grants or WIOA funding
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Hero Banner */}
        <div className="relative w-full h-[500px] overflow-hidden mt-8">
          <Image
            src="/images/heroes/hero-elevate-learners.jpg"
            alt="Join Thousands of Successful Graduates"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent">
            <div className="max-w-6xl mx-auto h-full flex items-center justify-end px-4">
              <div className="max-w-2xl text-right">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg mb-4">
                  <span>⭐</span>
                  <span>89% Job Placement Rate</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  Real People.<br/>Real Success Stories.
                </h2>
                <p className="mt-4 text-lg lg:text-xl text-white/90 leading-relaxed">
                  <strong className="text-white">Over 3,200 graduates</strong> have launched new careers through our programs. 
                  They're working as CNAs, HVAC techs, barbers, medical assistants, and more—earning 
                  <strong className="text-green-300"> $35K-$55K annually</strong>.
                </p>
                <div className="mt-4 flex items-center justify-end gap-6 text-white/90 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div>Get hired within 90 days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div>Pass certification exams</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">4.8/5</div>
                    <div>Student satisfaction</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 justify-end">
                  <Link
                    href="/success-stories"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Read Success Stories
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCY BANNER */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="font-bold">Spring 2025 Classes Filling Fast</div>
                <div className="text-sm text-white/90">Limited spots available in high-demand programs</div>
              </div>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-red-600 hover:bg-slate-100 transition-all shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Apply Before Spots Fill →
            </Link>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Who We Help Transform Their Lives
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you're starting fresh, switching careers, or leveling up—we've got a path for you.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/heroes/student-community.jpg"
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
                <Link href="/students" className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700">
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/employers/partnership-office-meeting.jpg"
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
                <Link href="/employers" className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700">
                  Partner With Us →
                </Link>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/heroes/workforce-partner-1.jpg"
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
                <Link href="/workforce-partners" className="mt-4 inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700">
                  Become a Partner →
                </Link>
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
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/healthcare/program-medical-assistant.jpg"
                  alt="Medical Assistant Training Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                  Healthcare
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Medical Assistant</h3>
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
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/trades/program-hvac-technician.jpg"
                  alt="HVAC Technician Training Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                  Skilled Trades
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">HVAC Technician</h3>
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

            {/* Barber - FEATURED */}
            <article className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-purple-500 bg-white shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  🏠 TRAIN AT HOME
                </span>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/beauty/program-barber-training.jpg"
                  alt="Barber Apprenticeship Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-gradient-to-b from-white to-purple-50">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
                  Beauty & Wellness
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Barber Apprenticeship</h3>
                <div className="mt-2 flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-purple-600 font-bold">✓</span>
                  <p>
                    <strong className="text-purple-700">FREE manikin shipped to your home!</strong> Practice cutting, styling, and techniques from anywhere. Then complete your apprenticeship in a real barbershop.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                  <span>💰 Earn while you learn</span>
                  <span>•</span>
                  <span>📜 Get licensed</span>
                </div>
                <Link
                  href="/programs/barber"
                  className="mt-4 inline-flex items-center justify-center w-full rounded-full bg-purple-600 px-4 py-3 text-sm font-bold text-white hover:bg-purple-700 shadow-lg"
                >
                  Start Your Barber Journey →
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

      {/* FEATURED: AT-HOME BARBER TRAINING */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white mb-4">
                <span>🌟</span>
                <span>NEW: Train From Home</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Start Your Barber Career<br/>
                <span className="text-purple-200">Right From Your Living Room</span>
              </h2>
              <p className="mt-4 text-lg text-purple-100 leading-relaxed">
                We'll ship a <strong className="text-white">FREE professional manikin</strong> directly to your door. 
                Join <strong className="text-white">live virtual classes</strong> with licensed barbers, then practice 
                cutting, fading, and styling techniques—on your own schedule, in your own space.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-semibold">Free Equipment Shipped to You</div>
                    <div className="text-sm text-purple-200">Professional manikin, tools, and supplies included</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-semibold">Live Virtual Instruction</div>
                    <div className="text-sm text-purple-200">Real-time classes with licensed barbers + practice at home</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-semibold">Real Shop Experience</div>
                    <div className="text-sm text-purple-200">Complete apprenticeship in an actual barbershop</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-semibold">Earn While You Learn</div>
                    <div className="text-sm text-purple-200">Get paid during your apprenticeship</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/programs/barber"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-purple-700 hover:bg-purple-50 transition-all shadow-xl hover:scale-105"
                >
                  Learn More About Barber Training →
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/beauty/program-barber-training.jpg"
                  alt="Barber training with manikin at home"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📦</div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Free Manikin Delivery</div>
                    <div className="text-xs text-slate-600">Ships within 3-5 business days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              From Application to Career in 3 Simple Steps
            </h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              We make it easy to start your new career—no confusing paperwork, no hidden costs
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-1 bg-gradient-to-r from-red-200 via-blue-200 to-green-200"></div>
            
            <div className="relative bg-white rounded-2xl border-2 border-red-100 p-8 hover:border-red-300 transition-all hover:shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 text-center">Pick Your Program</h3>
              <p className="mt-3 text-sm text-slate-700 text-center leading-relaxed">
                Browse <strong>20+ career paths</strong> in healthcare, trades, beauty, and business. 
                Not sure? We'll help you choose based on your interests and goals.
              </p>
              <div className="mt-4 text-center">
                <Link href="/programs" className="text-sm font-semibold text-red-600 hover:text-red-700">
                  Explore Programs →
                </Link>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl border-2 border-blue-100 p-8 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 text-center">Get 100% Funded</h3>
              <p className="mt-3 text-sm text-slate-700 text-center leading-relaxed">
                We handle the funding paperwork for you. Access <strong>WIOA grants, Workforce Ready Grants,</strong> 
                or paid apprenticeships. Most students pay $0.
              </p>
              <div className="mt-4 text-center">
                <Link href="/funding" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Learn About Funding →
                </Link>
              </div>
            </div>

            <div className="relative bg-white rounded-2xl border-2 border-green-100 p-8 hover:border-green-300 transition-all hover:shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 text-center">Launch Your Career</h3>
              <p className="mt-3 text-sm text-slate-700 text-center leading-relaxed">
                Complete training in <strong>6-16 weeks,</strong> earn industry credentials, and connect with 
                <strong> 200+ hiring partners</strong> ready to bring you on board.
              </p>
              <div className="mt-4 text-center">
                <Link href="/employers" className="text-sm font-semibold text-green-600 hover:text-green-700">
                  See Hiring Partners →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-10 py-4 text-lg font-bold text-white hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Your Application Now →
            </Link>
            <p className="mt-3 text-sm text-slate-600">
              ⏱️ Takes less than 5 minutes • No commitment required
            </p>
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
