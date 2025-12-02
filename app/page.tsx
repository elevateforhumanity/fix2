"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Workforce Training That Actually Changes Lives",
    subtitle:
      "Short-term training, real certifications, and employer connections that help you move into a new career.",
    ctaPrimary: { label: "Explore Programs", href: "/programs" },
    ctaSecondary: { label: "Apply for Funding", href: "/funding" },
    imageSrc: "/media-backup-20251128-043832/hero-elevate-learners.jpg",
    imageAlt: "Students in a training program",
  },
  {
    id: 2,
    title: "State & Federal Funding May Cover Your Tuition",
    subtitle:
      "Workforce Ready Grant, WIOA, apprenticeships, and more. Many students qualify for little to no out-of-pocket cost.",
    ctaPrimary: { label: "See If You Qualify", href: "/funding/eligibility" },
    imageSrc: "/media-backup-20251128-043832/state-funding-hero.jpg",
    imageAlt: "Advisor helping student with funding options",
  },
  {
    id: 3,
    title: "Start a New Career in as Little as 30–90 Days",
    subtitle:
      "Healthcare, skilled trades, barbering, CDL, building maintenance, and more—built with employers at the table.",
    ctaPrimary: { label: "Get Started Today", href: "/apply" },
    ctaSecondary: { label: "Talk to Our Team", href: "/contact" },
    imageSrc: "/media-backup-20251128-043832/hero-slide-healthcare.jpg",
    imageAlt: "Graduate celebrating new career",
  },
];

const featuredPrograms = [
  {
    title: "Certified Nursing Assistant (CNA)",
    description: "Hands-on healthcare training tied to real employer demand.",
    href: "/programs/cna",
    imageSrc: "/media-backup-20251128-043832/programs/cna.jpg",
    imageAlt: "CNA student providing patient care",
  },
  {
    title: "Barber & Beauty Apprenticeship",
    description:
      "Earn while you learn in a professional barbering environment.",
    href: "/programs/barber",
    imageSrc: "/media-backup-20251128-043832/programs/barber-hd.jpg",
    imageAlt: "Barber shaping a client's haircut",
  },
  {
    title: "HVAC Technician",
    description: "High-demand skilled trade with strong earning potential.",
    href: "/programs/hvac",
    imageSrc: "/media-backup-20251128-043832/programs/hvac-hd.jpg",
    imageAlt: "Technician working on HVAC unit",
  },
  {
    title: "CDL & Transportation",
    description: "Commercial driving pathways with local and regional routes.",
    href: "/programs/cdl",
    imageSrc: "/media-backup-20251128-043832/programs/cdl-hd.jpg",
    imageAlt: "Commercial truck on the highway",
  },
  {
    title: "Building Maintenance & Facilities",
    description: "Keep buildings safe, running, and ready for the public.",
    href: "/programs/building-maintenance",
    imageSrc: "/media-backup-20251128-043832/programs/building-hd.jpg",
    imageAlt: "Maintenance worker inspecting a facility",
  },
  {
    title: "Guest Services & Hospitality",
    description:
      "Frontline guest service, tourism, and hospitality credentials.",
    href: "/programs/hospitality",
    imageSrc: "/media-backup-20251128-043832/programs/culinary-arts-hd.jpg",
    imageAlt: "Hotel front desk guest service professional",
  },
];

const successStories = [
  {
    name: "Alicia · CNA Graduate",
    quote:
      "I went from feeling stuck to working full-time in healthcare with benefits. Elevate walked with me from start to finish.",
    imageSrc: "/media-backup-20251128-043832/testimonials/student1.jpg",
    imageAlt: "Alicia smiling in scrubs",
  },
  {
    name: "Marcus · Barber Apprentice",
    quote:
      "The apprenticeship let me earn while I trained. Now I have a chair, a clientele, and a clear path forward.",
    imageSrc: "/media-backup-20251128-043832/testimonials/student2.jpg",
    imageAlt: "Marcus cutting hair in a barbershop",
  },
  {
    name: "Jamal · HVAC Tech",
    quote:
      "I finished in under 4 months and moved into a skilled trade that pays me what I'm worth.",
    imageSrc: "/media-backup-20251128-043832/testimonials/student3.jpg",
    imageAlt: "Jamal working on HVAC equipment",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[activeSlide];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-50 via-white to-blue-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:py-20">
          {/* Text */}
          <div className="relative z-10 max-w-xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Elevate For Humanity
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {currentSlide.title}
            </h1>
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {currentSlide.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={currentSlide.ctaPrimary.href}
                className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                {currentSlide.ctaPrimary.label}
              </Link>
              {currentSlide.ctaSecondary && (
                <Link
                  href={currentSlide.ctaSecondary.href}
                  className="rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:border-orange-400 hover:bg-orange-50"
                >
                  {currentSlide.ctaSecondary.label}
                </Link>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-slate-600 sm:text-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              <span>
                Many students qualify for state or federal funding to reduce or
                eliminate tuition.
              </span>
            </div>

            {/* Slide dots */}
            <div className="mt-4 flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-6 bg-orange-600"
                      : "w-2 bg-orange-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative flex flex-1 justify-center">
            <div className="relative h-64 w-full max-w-md overflow-hidden rounded-2xl shadow-xl sm:h-80 lg:h-96">
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-BOX HIGHLIGHT SECTION */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-700">
              Funding Pathways
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Workforce Ready Grant, WIOA, apprenticeships, JRI, WEX, OJT, and
              more—built directly into our programs.
            </p>
            <Link
              href="/funding"
              className="mt-3 inline-flex text-sm font-semibold text-orange-700 hover:text-orange-800"
            >
              How funding works →
            </Link>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Career Programs
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              CNA, Barber, HVAC, CDL, Building Tech, Hospitality and more, all
              aligned to real jobs in your community.
            </p>
            <Link
              href="/programs"
              className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              View all programs →
            </Link>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Student Success
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Real people. Real stories. See how learners moved from uncertainty
              to career confidence.
            </p>
            <Link
              href="/success-stories"
              className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See real stories →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Get Started with Elevate For Humanity
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              We keep the process simple and human. You don&apos;t need to have
              it all figured out—we walk with you step by step.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "Step 1",
                title: "Choose a Program",
                text: "Explore CNA, Barber, HVAC, CDL, Building Tech, and more to find the career that fits.",
              },
              {
                step: "Step 2",
                title: "Check Funding",
                text: "We help you explore WRG, WIOA, apprenticeships, and other options that may cover tuition.",
              },
              {
                step: "Step 3",
                title: "Apply Online",
                text: "Submit a simple online application so our team can review and connect with you.",
              },
              {
                step: "Step 4",
                title: "Start Training",
                text: "Begin classes, earn your credentials, and move into your new career path.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col rounded-2xl bg-white p-5 shadow-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                  {item.step}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/apply"
              className="inline-flex rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Start the process
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS GRID */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Featured Career Programs
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                These are some of the most in-demand training options in our
                ecosystem. Each one connects directly to real employers.
              </p>
            </div>
            <Link
              href="/programs"
              className="text-sm font-semibold text-orange-700 hover:text-orange-800"
            >
              View all programs →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPrograms.map((program) => (
              <Link
                href={program.href}
                key={program.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={program.imageSrc}
                    alt={program.imageAlt}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {program.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs text-slate-700">
                    {program.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-orange-700">
                    Program details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDING EXPLAINER */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-orange-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                State & Federal Funding Options
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Elevate For Humanity is built to align with state and federal
                workforce programs so more learners can access training with
                little to no out-of-pocket cost.
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Our team works with you and your case managers to match the
                right funding pathway to the right program.
              </p>

              <Link
                href="/funding/eligibility"
                className="mt-4 inline-flex rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                See if I qualify
              </Link>
            </div>

            <div className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  State Pathways
                </h3>
                <ul className="mt-2 space-y-1 text-slate-700">
                  <li>• Workforce Ready Grant (WRG)</li>
                  <li>• Workforce Innovation and Opportunity Act (WIOA)</li>
                  <li>• JAG & JRI Programs</li>
                  <li>• Work Experience (WEX)</li>
                  <li>• On-the-Job Training (OJT)</li>
                  <li>• State Earn & Learn (SEAL)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-orange-700">
                  Federal Pathways
                </h3>
                <ul className="mt-2 space-y-1 text-slate-700">
                  <li>• Registered Apprenticeships</li>
                  <li>• U.S. DOL-Recognized Credentials</li>
                  <li>• National Industry Certifications</li>
                  <li>• Youth & Opportunity Programs</li>
                  <li>• Employer-Driven Upskilling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Real People. Real Outcomes.
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Every program is tied to a story. Here are just a few of the
                learners who changed their trajectory through Elevate For
                Humanity.
              </p>
            </div>
            <Link
              href="/success-stories"
              className="text-sm font-semibold text-orange-700 hover:text-orange-800"
            >
              View more stories →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {successStories.map((story) => (
              <div
                key={story.name}
                className="flex flex-col rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                    <Image
                      src={story.imageSrc}
                      alt={story.imageAlt}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {story.name}
                    </p>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-xs text-slate-700">
                  "{story.quote}"
                </p>
                <Link
                  href="/success-stories"
                  className="mt-3 inline-flex text-xs font-semibold text-orange-700 hover:text-orange-800"
                >
                  Watch story →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ELEVATE SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Why Elevate For Humanity Works
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We sit in the middle of students, employers, and workforce
                partners. That means every program is built with real jobs in
                mind—not just seat time.
              </p>
              <p className="mt-2 text-sm text-slate-700">
                From short-term training to apprenticeships, our platform
                combines curriculum, dashboards, data, and human support to help
                people move into sustainable careers.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-slate-800 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                  Career-Aligned Training
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  Programs are mapped to real job descriptions, certifications,
                  and local employer needs.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                  Employer Connections
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  We partner with employers so learners have a clearer path from
                  training to placement.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                  Hybrid & Online Options
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  Meet learners where they are with flexible, blended learning
                  models.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                  Data & Dashboards
                </h3>
                <p className="mt-2 text-xs text-slate-700">
                  Students, staff, and partners see real-time progress, metrics,
                  and outcomes—not just guesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Ready to start your next chapter?
            </h2>
            <p className="mt-1 text-sm text-slate-200">
              Many learners can start training within 30–60 days once funding is
              approved.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400"
            >
              Apply now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-500 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-slate-300 hover:bg-slate-800"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-600">
          <div className="grid gap-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Elevate For Humanity
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Training, technology, and community partnerships to help people
                move into stable, meaningful work.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                Programs
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/programs/cna">CNA</Link>
                </li>
                <li>
                  <Link href="/programs/barber">Barber & Beauty</Link>
                </li>
                <li>
                  <Link href="/programs/hvac">HVAC</Link>
                </li>
                <li>
                  <Link href="/programs/cdl">CDL</Link>
                </li>
                <li>
                  <Link href="/programs">View all programs</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                Pathways
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/funding">State funding</Link>
                </li>
                <li>
                  <Link href="/funding/federal">Federal programs</Link>
                </li>
                <li>
                  <Link href="/employers">Employer portal</Link>
                </li>
                <li>
                  <Link href="/auth/signin">Student login</Link>
                </li>
                <li>
                  <Link href="/staff">Staff login</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-900">
                Legal & Contact
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/refund-policy">Refund policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms & conditions</Link>
                </li>
                <li>
                  <Link href="/accessibility">
                    Non-discrimination & ADA
                  </Link>
                </li>
                <li>
                  <Link href="/contact">Contact us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} Elevate For Humanity. All rights reserved.</p>
            <p>Powered by Elevate's learning and workforce ecosystem.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
