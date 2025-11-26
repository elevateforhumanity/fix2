// app/programs/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/Button";
import { Metadata } from "next";
import { allPrograms } from "@/lms-data/programs";

export const metadata: Metadata = {
  title: "Career Training Programs - Healthcare, Trades & More",
  description: "Explore 12+ WIOA-funded career training programs in healthcare, skilled trades, CDL, barbering, and more. Free training with job placement support.",
  keywords: ["career training programs", "WIOA programs", "healthcare training", "skilled trades", "CDL training", "barber apprenticeship", "free job training"],
  openGraph: {
    title: "Career Training Programs - Healthcare, Trades & More | Elevate for Humanity",
    description: "Explore 12+ WIOA-funded career training programs in healthcare, skilled trades, CDL, barbering, and more.",
    images: ["/images/hero-new/hero-4.jpg"],
    type: "website",
  },
};

// Cache for 1 hour - programs don't change often
export const revalidate = 3600;

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant Pathway",
    category: "Healthcare",
    length: "4–6 months · Hybrid",
    funding: "WRG · WIOA · Workforce Grants",
    image: "/media/programs/medical-assistant-video-thumbnail.jpg",
    blurb:
      "Hands-on clinical and front-office skills for entry-level roles in clinics, hospitals, and specialty practices. Built with partner schools and Elevate support.",
  },
  {
    slug: "barber",
    name: "Barber Apprenticeship",
    category: "Apprenticeship · License Track",
    length: "12–18 months · Shop + Classroom",
    funding: "Apprenticeship · WIOA",
    image: "/media/programs/barber-hd.jpg",
    blurb:
      "State-approved barber apprenticeship that mixes Milady-based theory with real shop experience, coaching, and licensing support.",
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    category: "Skilled Trades",
    length: "4–9 months · Lab + Field",
    funding: "Workforce Grants · Employer Sponsors",
    image: "/media/programs/hvac-hd.jpg",
    blurb:
      "Partner-led technical training in heating, ventilation, and air conditioning with Elevate as the front door, tracker, and connector.",
  },
  {
    slug: "building-tech",
    name: "Building Maintenance Technician",
    category: "Facilities & Property",
    length: "4–9 months · On-site",
    funding: "Workforce Grants · Apprenticeship",
    image: "/media/programs/building-tech-hd.jpg",
    blurb:
      "Training for core skills in building systems, repairs, and property maintenance for residential, commercial, or institutional sites.",
  },
  {
    slug: "cdl",
    name: "CDL / Transportation Pathways",
    category: "Transportation",
    length: "Varies · Range + Road",
    funding: "Workforce Grants · Employer Sponsors",
    image: "/media/programs/cdl-hd.jpg",
    blurb:
      "Connections to CDL programs and transportation employers, with Elevate support for readiness, paperwork, and employer alignment.",
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness & Re-Entry",
    category: "Readiness & Soft Skills",
    length: "4–12 weeks · Workshops + Coaching",
    funding: "Support Services · Referrals",
    image: "/media/programs/counseling-training-hd.jpg",
    blurb:
      "Coaching, soft skills, and barrier support for adults and re-entry talent preparing to step back into training or employment.",
  },
];

export default function ProgramsPage() {
  return (
    <main>
      <Section>
        <div className="container-padded space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-500">
              Elevate for Humanity
            </p>
            <h1>Explore funded training & apprenticeship programs.</h1>
            <p className="text-sm md:text-base text-slate-700">
              These programs are designed to work with Indiana workforce
              funding, apprenticeships, and employer pipelines so learners can
              move from "interested" to "employed" with as little out-of-pocket
              cost as possible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Dynamic programs from new system */}
            {allPrograms.filter(p => p.visiblePublic).map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`}>
                <AnimatedCard className="h-full overflow-hidden cursor-pointer">
                  <div className="relative h-48 w-full bg-gradient-to-br from-brandPrimary to-brandOrange flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-bold">{program.title}</h3>
                      <p className="text-sm mt-2">${program.salePrice}</p>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-500">
                        {program.deliveryEngine}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-slate-900">
                        {program.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600">
                        {program.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Tuition-based</span>
                      <span className="text-right">{program.isStateTuitionFunded ? 'State Funded' : 'Self-Pay'}</span>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            ))}
            
            {/* Existing hardcoded programs */}
            {programs.map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`}>
                <AnimatedCard className="h-full overflow-hidden cursor-pointer">
                  <div className="relative h-48 w-full">
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-500">
                        {program.category}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold text-slate-900">
                        {program.name}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600">
                        {program.blurb}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-600">
                      <span>{program.length}</span>
                      <span className="text-right">{program.funding}</span>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-slate-600">
              Are you a workforce board, school, or employer with a program to list?
            </p>
            <Button variant="outline" size="sm">
              <a href="/partners/apply">Apply to become a program partner</a>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
