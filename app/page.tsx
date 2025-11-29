import Link from "next/link";
import Image from "next/image";
import PWAInstallSection from "@/components/PWAInstallSection";
import {
  MessageSquare,
  Trophy,
  Award,
  Flame,
  Sparkles,
  BookOpen,
  FileText,
  Users,
  BarChart3,
  Smartphone,
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
  Star,
  Download,
  Globe,
  Bell,
  Eye,
  Calendar,
} from "lucide-react";

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
      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/media/hero-elevate-learners.jpg"
            alt="Career Training Success"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-red-600/90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-pulse">
              <span className="text-lg font-bold">💯 100% FREE TRAINING - GOVERNMENT PAYS EVERYTHING</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              From Unemployed to Employed<br />in 4-12 Weeks
            </h1>
            <p className="text-2xl md:text-3xl text-orange-100 mb-8 max-w-4xl mx-auto">
              Get trained in high-paying careers — completely FREE through government workforce programs
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-orange-50 transition-all hover:scale-105 shadow-2xl"
              >
                Apply Now - It's FREE!
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-orange-700 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-orange-800 transition-all border-2 border-white/20"
              >
                View Programs
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>No Cost</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>4-12 Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Job Placement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORIGINAL HERO - Now secondary section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-white animate-pulse">
                💯 100% FREE TRAINING - GOVERNMENT PAYS EVERYTHING
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                From Unemployed to Employed in 4-12 Weeks
              </h1>
              <p className="text-xl text-slate-700 font-semibold">
                Get trained in high-paying careers like CNA ($35K-$45K), HVAC ($45K-$65K), or Barber ($30K-$55K) — completely FREE through government workforce programs.
              </p>

              {/* The Promise */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-3">Here's What You Get:</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-bold text-lg">$0 Out of Pocket</p>
                      <p className="text-orange-100">Government pays 100% of tuition, books, supplies. You pay NOTHING.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📜</span>
                    <div>
                      <p className="font-bold text-lg">Real Credentials That Employers Want</p>
                      <p className="text-orange-100">State-licensed certifications (CNA, Barber), industry credentials (HVAC, CDL), nationally recognized certificates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <p className="font-bold text-lg">Job Connections to 100+ Employers</p>
                      <p className="text-orange-100">We partner with hospitals, HVAC companies, barbershops, trucking firms who are hiring NOW.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="font-bold text-lg">Soft Skills Training (Job Ready Indy)</p>
                      <p className="text-orange-100">Learn communication, professionalism, teamwork — the skills employers say are missing.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                      <p className="font-bold text-lg">Support Services Covered</p>
                      <p className="text-orange-100">Transportation help, childcare assistance, work clothes, tools — we remove the barriers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How We're Different */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
                <h3 className="text-lg font-bold text-blue-900 mb-3">🔥 Why We're Different:</h3>
                <div className="space-y-2 text-sm text-blue-900">
                  <p><strong>✓ We handle ALL the paperwork</strong> — We coordinate with WorkOne and handle all funding applications for you.</p>
                  <p><strong>✓ Multiple funding sources</strong> — WIOA, Workforce Ready Grant, OJT, Apprenticeships. We find what you qualify for.</p>
                  <p><strong>✓ Fast-track programs</strong> — 4-12 weeks, not months or years. Get working faster.</p>
                  <p><strong>✓ Hybrid options</strong> — Online theory + in-person hands-on. Fits your schedule.</p>
                  <p><strong>✓ Earn while you learn</strong> — OJT and Apprenticeships pay you $15-$20/hour WHILE training.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-orange-600 transition-all hover:scale-105 animate-bounce"
                >
                  🚀 Apply Now - Start in 2 Weeks!
                </Link>
                <Link
                  href="/programs"
                  className="rounded-full border-2 border-orange-500 bg-white px-8 py-4 text-lg font-bold text-orange-600 hover:bg-orange-50 transition-all"
                >
                  See All Programs →
                </Link>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-sm font-bold text-green-900 mb-1">✨ No Catch. Seriously.</p>
                <p className="text-sm text-green-800">
                  No income requirements. No credit check. No hidden fees. If you're an Indianapolis resident who wants to work, you likely qualify. We'll tell you in 24 hours.
                </p>
              </div>
            </div>

            {/* Single Hero Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white">
              <Image
                src="/media/hero/hero-learners.jpg"
                alt="Students in workforce training"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                500+ Graduates Hired
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6">
                <p className="text-lg font-bold text-white">20+ Career Programs</p>
                <p className="mt-1 text-sm text-white/90">Healthcare • Skilled Trades • Beauty • Business</p>
                <p className="mt-2 text-xs text-green-300 font-semibold">Average Starting Salary: $35K-$55K</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW FUNDING WORKS - DETAILED */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              How Your Training Gets Funded 100% FREE
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We connect you to government workforce programs that pay for everything. Here's exactly how each program works:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* WIOA */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-4xl font-bold">W</span>
                    </div>
                    <h3 className="text-2xl font-bold">WIOA Funding</h3>
                    <p className="text-sm text-blue-100">Workforce Innovation & Opportunity Act</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-3">
                  <strong>What it is:</strong> Federal workforce development funding for job training and employment services
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>What it covers:</strong> Tuition, books, supplies, transportation, childcare, work clothes, tools
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>Who qualifies:</strong> Adults, dislocated workers, youth (16-24)
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>How to get it:</strong> Apply through WorkOne Career Centers - we help you with the entire process
                </p>
                <Link
                  href="/funding/wioa"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Learn More About WIOA →
                </Link>
              </div>
            </div>

            {/* Workforce Ready Grant */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-green-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl font-bold">WRG</span>
                    </div>
                    <h3 className="text-2xl font-bold">Workforce Ready Grant</h3>
                    <p className="text-sm text-green-100">Indiana State Program</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-3">
                  <strong>What it is:</strong> Indiana state program for tuition-free certificate training in high-demand careers
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>What it covers:</strong> Full tuition for approved certificate programs
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>Who qualifies:</strong> Indiana residents with high school diploma, no college degree
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>How to get it:</strong> We verify your eligibility and submit the application for you
                </p>
                <Link
                  href="/funding/wrg"
                  className="block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                  Learn More About WRG →
                </Link>
              </div>
            </div>

            {/* OJT */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-orange-500 to-orange-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-3xl font-bold">OJT</span>
                    </div>
                    <h3 className="text-2xl font-bold">On-the-Job Training</h3>
                    <p className="text-sm text-orange-100">Get PAID While You Train</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-3">
                  <strong>What it is:</strong> You get hired by an employer and they pay you wages while you train ($15-$20/hour)
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>What it covers:</strong> Government reimburses employer 50% of your wages for 3-6 months
                </p>
                <p className="text-slate-700 mb-3">
                  <strong>Who qualifies:</strong> Anyone we match with an employer partner
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>How it works:</strong> You're a real employee from day 1, earning real wages while learning on the job
                </p>
                <Link
                  href="/funding"
                  className="block w-full bg-orange-600 text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
                >
                  Learn More About OJT →
                </Link>
              </div>
            </div>

            {/* Apprenticeships */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">APP</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">DOL Apprenticeships</h3>
                  <p className="text-sm text-slate-600">Earn While You Learn</p>
                </div>
              </div>
              <p className="text-slate-700 mb-3">
                <strong>What it is:</strong> Registered apprenticeship programs where you work full-time and get classroom training
              </p>
              <p className="text-slate-700 mb-3">
                <strong>What it covers:</strong> Full wages ($15-$20/hour) + classroom training + path to license/credential
              </p>
              <p className="text-slate-700 mb-3">
                <strong>Who qualifies:</strong> Anyone interested in trades (Barber, HVAC, Building Tech, etc.)
              </p>
              <p className="text-slate-700">
                <strong>How it works:</strong> Work in a real shop/company, build required hours, get nationally recognized credential
              </p>
            </div>
          </div>

          {/* JRI Explanation */}
          <div className="bg-orange-500 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-2xl">JRI</div>
              <div>
                <h3 className="text-2xl font-bold">Job Ready Indy (JRI)</h3>
                <p className="text-orange-100">Soft Skills Training FROM EmployIndy</p>
              </div>
            </div>
            <p className="text-lg mb-4">
              <strong>What it is:</strong> EmployIndy's soft skills curriculum that we include in ALL our programs
            </p>
            <p className="text-lg mb-4">
              <strong>What you learn:</strong> Communication, professionalism, teamwork, problem-solving, financial literacy, career advancement
            </p>
            <p className="text-lg">
              <strong>Why it matters:</strong> Employers want workers with BOTH technical skills (CNA, HVAC, etc.) AND soft skills (JRI). We give you both.
            </p>
          </div>

          {/* Hybrid & Shortened Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">🖥️ Hybrid Courses</h3>
              <p className="text-slate-700 mb-3">
                <strong>What they are:</strong> Mix of online learning + in-person hands-on training
              </p>
              <p className="text-slate-700 mb-3">
                <strong>How they work:</strong> Study theory online at your own pace, then come in for practical skills training
              </p>
              <p className="text-slate-700">
                <strong>Benefits:</strong> Flexible schedule, learn faster, less time away from work/family
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-3">⚡ Shortened Courses</h3>
              <p className="text-slate-700 mb-3">
                <strong>What they are:</strong> Accelerated training programs (4-12 weeks instead of months/years)
              </p>
              <p className="text-slate-700 mb-3">
                <strong>How they work:</strong> Focused on job-ready skills only, no filler content
              </p>
              <p className="text-slate-700">
                <strong>Benefits:</strong> Get certified faster, start earning sooner, less time commitment
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/funding/how-it-works" className="inline-block px-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
              Learn More About Funding →
            </Link>
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
            {/* Healthcare Programs */}
            <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/programs-new/program-1.jpg"
                  alt="Healthcare Training Programs"
                  title="Healthcare Career Training - CNA, Medical Assistant & More"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">Healthcare Programs</h3>
                <p className="mt-2 text-sm text-slate-700">
                  CNA, Medical Assistant, Phlebotomy, and Patient Care Tech training with clinical experience.
                </p>
                <Link
                  href="/programs"
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  View Programs
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

      {/* PWA INSTALL */}
      <PWAInstallSection />

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
