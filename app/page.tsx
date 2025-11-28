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
      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-xs font-bold text-white">
                💯 100% FREE TRAINING - NO COST TO YOU
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Get Trained. Get Hired. Get Paid.
              </h1>
              <p className="text-lg text-slate-700 md:text-xl font-medium">
                We're an approved training provider that connects you to FREE government-funded career training (WIOA, Workforce Ready Grant, OJT, Apprenticeships) + connects you to employers hiring NOW.
              </p>
              
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm font-bold text-blue-900 mb-2">🔗 How It Works:</p>
                <p className="text-sm text-blue-800 mb-3">
                  <strong>EmployIndy</strong> (Marion County workforce board) + <strong>WorkOne</strong> + <strong>Indiana DWD</strong> fund your training through <strong>WIOA</strong>, <strong>Workforce Ready Grant</strong>, <strong>OJT</strong> (On-the-Job Training), or <strong>DOL Apprenticeships</strong>.
                </p>
                <p className="text-sm text-blue-800">
                  <strong>We provide:</strong> Technical training (CNA, HVAC, Barber, CDL, etc.) + <strong>JRI (Job Ready Indy)</strong> soft skills curriculum from EmployIndy + job connections to 100+ employers.
                </p>
              </div>

              <div className="space-y-3 bg-white rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-bold text-slate-900">$0 Tuition - Government Pays</p>
                    <p className="text-sm text-slate-600">WIOA & Workforce Ready Grants cover 100% of training costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-bold text-slate-900">Real Certifications</p>
                    <p className="text-sm text-slate-600">CNA, Medical Assistant, HVAC, Barber License, CDL & more</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-bold text-slate-900">Job Placement Support</p>
                    <p className="text-sm text-slate-600">We connect you to employers hiring in Indianapolis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-bold text-slate-900">Support Services Included</p>
                    <p className="text-sm text-slate-600">Transportation, childcare, books - all covered</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="rounded-full bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-orange-600 transition-all hover:scale-105"
                >
                  Apply Now - It's FREE!
                </Link>
                <Link
                  href="/programs"
                  className="rounded-full border-2 border-orange-500 bg-white px-8 py-4 text-base font-bold text-orange-600 hover:bg-orange-50 transition-all"
                >
                  See All Programs
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                ⭐ Indianapolis residents may qualify immediately. No income requirements for most programs.
              </p>
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
