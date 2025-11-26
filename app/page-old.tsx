"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Award, TrendingUp, Heart } from "lucide-react";

type ProgramCardProps = {
  title: string;
  description: string;
  image: string;
  tag?: string;
  href?: string;
};

function ProgramCard({ title, description, image, tag, href = "/programs" }: ProgramCardProps) {
  return (
    <Link href={href}>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {tag && (
            <span className="absolute top-3 left-3 inline-flex rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg">
              {tag}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brandPrimary transition-colors">{title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
          <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-brandPrimary group-hover:gap-3 transition-all">
            Learn more <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-lg">
      <div className="text-brandPrimary">{icon}</div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600 text-center">{label}</div>
    </div>
  );
}

type SuccessCardProps = {
  image: string;
  quote: string;
  name: string;
  track: string;
};

function SuccessCard({ image, quote, name, track }: SuccessCardProps) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-blue-100">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-slate-700 italic leading-relaxed">&quot;{quote}&quot;</p>
        <p className="text-sm font-bold text-slate-900">{name}</p>
        <p className="text-xs text-brandPrimary font-medium">{track}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-red-600 via-blue-700 to-indigo-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
        
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 md:flex-row md:py-28 lg:py-32">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
              <Award className="h-4 w-4" />
              <span>State-Approved Training Programs</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              Transform Your Future with{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Real Skills
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg text-blue-100 md:text-xl leading-relaxed">
              Launch your career with hands-on training, funding support, and personalized guidance. 
              Join thousands who've transformed their lives through our workforce programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/programs"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brandPrimary shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Programs
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all duration-300"
              >
                Check Funding Eligibility
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-white">2,500+</div>
                <div className="text-sm text-blue-200">Graduates</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="text-sm text-blue-200">Job Placement</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-white">$0</div>
                <div className="text-sm text-blue-200">Out of Pocket*</div>
              </div>
            </div>
          </div>

          <div className="relative w-full flex-1">
            <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <Image
                src="/images/hero-new/hero-1.jpg"
                alt="Professional training and career success"
                fill
                priority
                className="rounded-3xl object-cover shadow-2xl ring-4 ring-white/20"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">
              Built for <span className="text-brandPrimary">Real People</span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
              Career training designed for adults, working families, and returning citizens 
              who are ready to transform their future.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-red-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/students-new/student-1.jpg"
                  alt="Adult learner achieving career success"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-bold text-slate-900">Adult Learners</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Get the skills, certifications, and confidence you need to step into a 
                  high-demand career with personalized support every step of the way.
                </p>
                <div className="mt-auto">
                  <Link href="/learners" className="inline-flex items-center gap-2 text-sm font-semibold text-brandPrimary hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>

            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/students-new/student-2.jpg"
                  alt="Working family supported through training"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-bold text-slate-900">Working Families</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Flexible schedules and funded programs that fit your life. Balance work, 
                  family, and training with support designed for busy parents.
                </p>
                <div className="mt-auto">
                  <Link href="/learners" className="inline-flex items-center gap-2 text-sm font-semibold text-brandPrimary hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>

            <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/students-new/student-3.jpg"
                  alt="Returning citizen in workforce program"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-bold text-slate-900">Returning Citizens</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Structured training with support, accountability, and employer-aligned 
                  pathways to rebuild your life and thrive in your community.
                </p>
                <div className="mt-auto">
                  <Link href="/learners" className="inline-flex items-center gap-2 text-sm font-semibold text-brandPrimary hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold md:text-5xl text-slate-900">
                Featured <span className="text-brandPrimary">Programs</span>
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                High-demand, funding-friendly programs that lead to real careers and lasting success.
              </p>
            </div>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-base font-bold text-brandPrimary hover:gap-3 transition-all"
            >
              View all programs <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProgramCard
              title="Healthcare Pathways"
              description="Medical Assistant, CNA, and healthcare support careers with strong employer demand and job security."
              image="/images/programs-new/program-1.jpg"
              tag="State-Funded • ETPL"
              href="/programs/cna"
            />
            <ProgramCard
              title="Skilled Trades & Technical"
              description="HVAC, building maintenance, and technical careers with hands-on learning and high earning potential."
              image="/images/programs-new/program-2.jpg"
              tag="High-Demand • Hands-On"
              href="/programs/building-maintenance"
            />
            <ProgramCard
              title="Barber & Beauty"
              description="DOL-registered apprenticeships where you earn while you learn professional barbering skills."
              image="/images/programs-new/program-3.jpg"
              tag="DOL Apprenticeship"
              href="/programs/barber"
            />
            <ProgramCard
              title="Professional Esthetician"
              description="Master skincare, facial treatments, and client services in this growing beauty industry career."
              image="/images/programs-new/program-4.jpg"
              tag="Beauty • Wellness"
              href="/programs/professional-esthetician"
            />
            <ProgramCard
              title="CPR & First Aid"
              description="Essential life-saving certifications for healthcare workers, educators, and community leaders."
              image="/images/programs-new/program-5.jpg"
              tag="Fast Track • Essential"
              href="/programs/cpr-certification"
            />
            <ProgramCard
              title="Career Educator Training"
              description="Train the next generation of beauty professionals with comprehensive instructor certification."
              image="/images/programs-new/program-6.jpg"
              tag="Leadership • Teaching"
              href="/programs"
            />
          </div>
        </div>
      </section>

      {/* HOW FUNDING WORKS */}
      <section className="bg-gradient-to-br from-red-600 to-indigo-700 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
        
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold md:text-5xl mb-4">
                How <span className="text-orange-300">Funding</span> Works
              </h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Most of our students pay little to nothing out of pocket through 
                state and federal workforce grants. We'll guide you through every step.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Connect with WorkOne</h3>
                    <p className="text-blue-100">
                      Reach out to WorkOne or Indiana Connect to start your funding journey.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Get Approved</h3>
                    <p className="text-blue-100">
                      Qualify for WIOA, WRG, JRI, Apprenticeship funding, or other support programs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Start Training</h3>
                    <p className="text-blue-100">
                      Begin your Elevate For Humanity program with full support and guidance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/funding"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-brandPrimary shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Check Eligibility
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all"
                >
                  Talk to an Advisor
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <Image
                  src="/images/hero-new/hero-2.jpg"
                  alt="Career advisor helping student with funding"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-3xl font-bold text-brandPrimary">$0</div>
                <div className="text-sm text-slate-600">Average Out of Pocket*</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-slate-600">Funding Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900">
              Real Stories, Real <span className="text-brandPrimary">Success</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Hear from graduates who transformed their lives through our programs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-indigo-700 shadow-2xl">
                <Image
                  src="/images/success-new/success-1.jpg"
                  alt="Graduate celebrating career achievement"
                  fill
                  className="object-cover mix-blend-overlay opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <blockquote className="text-xl md:text-2xl font-bold text-white mb-4 leading-relaxed">
                    "I came here with no direction. Now I'm certified, working, and stable. 
                    Elevate changed my life."
                  </blockquote>
                  <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">
                    Sarah M. • Healthcare Graduate
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg text-slate-900 mb-2">85% Job Placement</h3>
                  <p className="text-sm text-slate-600">
                    Most graduates secure employment within 90 days of completion.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <TrendingUp className="h-8 w-8 text-brandPrimary mb-3" />
                  <h3 className="font-bold text-lg text-slate-900 mb-2">$15-25/hr Average</h3>
                  <p className="text-sm text-slate-600">
                    Graduates earn competitive wages in high-demand careers.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <SuccessCard
                image="/images/success-new/success-2.jpg"
                quote="I was nervous about going back to school. Elevate broke everything down and walked with me through funding and training."
                name="Marcus J."
                track="Skilled Trades Graduate"
              />
              <SuccessCard
                image="/images/success-new/success-3.jpg"
                quote="As a returning citizen, I needed structure and support. This program helped me get a real job and a real second chance."
                name="Lisa T."
                track="Reentry Program Graduate"
              />
              
              <Link 
                href="/success-stories"
                className="block text-center rounded-2xl border-2 border-blue-200 bg-blue-50 px-6 py-4 text-base font-bold text-brandPrimary hover:bg-blue-100 transition-all"
              >
                Read More Stories →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brandPrimary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brandPrimary/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-300 mb-6">
            <Award className="h-4 w-4" />
            <span>Your Future Starts Here</span>
          </div>
          
          <h2 className="text-4xl font-extrabold md:text-6xl text-white mb-6">
            Ready to Start Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Next Chapter?
            </span>
          </h2>
          
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Whether you're changing careers, starting fresh, or rebuilding your life, 
            we're here with real support from day one. Join thousands who've transformed 
            their future with Elevate For Humanity.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/enroll"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-5 text-lg font-bold text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
            >
              Start My Enrollment
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-5 text-lg font-bold text-white hover:bg-white/10 transition-all duration-300"
            >
              Talk to a Program Advisor
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2,500+</div>
              <div className="text-sm text-slate-400">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">85%</div>
              <div className="text-sm text-slate-400">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-slate-400">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$0</div>
              <div className="text-sm text-slate-400">Out of Pocket*</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
