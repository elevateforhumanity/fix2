import Link from "next/link";
import Image from "next/image";
import { COMPLETE_PROGRAMS } from "@/lib/programs-data-complete";

export const metadata = {
  title: 'Career Training Programs | Elevate for Humanity',
  description: '27+ free career training programs in healthcare, skilled trades, technology, and more. 100% funded through WIOA, WRG, and workforce grants. Start your career today.',
  openGraph: {
    title: 'Career Training Programs | Elevate for Humanity',
    description: '27+ free career training programs. 100% funded. Start your career today.',
    images: ['/media/programs/multi-training-programs-optimized.jpg'],
    type: 'website',
  },
};

const PROGRAM_GROUPS = [
  {
    title: "Healthcare",
    items: [
      "Certified Nursing Assistant (CNA)",
      "Medical Assistant",
      "Phlebotomy",
      "EKG Technician",
      "Patient Care Tech",
    ],
  },
  {
    title: "Skilled Trades & Building",
    items: [
      { name: "HVAC Technician", href: "/programs/hvac-tech" },
      { name: "Building Technician", href: "/programs/building-tech" },
      "Building Maintenance", 
      "Facilities Tech", 
      "CDL / Transportation"
    ],
  },
  {
    title: "Beauty & Wellness",
    items: [
      { name: "Barber Apprenticeship", href: "/programs/barber-apprenticeship" },
      { name: "Esthetician", href: "/programs/esthetician" },
      "Beauty Career Educator"
    ],
  },
  {
    title: "Culinary & Hospitality",
    items: [
      { name: "Culinary Arts", href: "/programs/culinary" },
      "Food Service Management",
      "Restaurant Operations"
    ],
  },
  {
    title: "Emergency Medical Services",
    items: [
      { name: "EMT Certification", href: "/programs/emt" },
      "Paramedic Training",
      "Emergency Response"
    ],
  },
  {
    title: "Business & Technology",
    items: [
      { name: "Business Support Apprenticeship", href: "/programs/business-apprenticeship" },
      { name: "Tax Prep / IRS VITA", href: "/vita" },
      { name: "Tax Certification Program", href: "/programs/tax-vita" },
      "Office & Admin", 
      "Customer Service", 
      "Digital Skills"
    ],
  },
  {
    title: "Childcare & Early Education",
    items: [
      { name: "Childcare Provider Certification", href: "/programs/childcare" },
      "Early Childhood Education",
      "Home Daycare Business"
    ],
  },
  {
    title: "Retail & Customer Service",
    items: [
      { name: "NRF Foundation RISE Up", href: "/programs/rise-up" }
    ],
  },
];

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-900">
        <div className="relative h-96 md:h-[500px]">
          <Image
            src="/images/heroes/programs-overview.jpg"
            alt="Training Programs at Elevate for Humanity"
            fill
            className="object-cover opacity-70"
            priority quality={85} sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <span className="inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-lg animate-pulse">
              💯 ALL PROGRAMS 100% FREE - Government Funded
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              Choose Your Career Path
            </h1>
            <p className="mt-4 max-w-3xl text-xl text-slate-100 md:text-2xl font-semibold">
              20+ high-paying careers. 4-12 week programs. $0 tuition. Real certifications. Job placement included.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <p className="text-3xl font-bold text-white">$35K-$65K</p>
                <p className="text-sm text-slate-200">Average Starting Salary</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <p className="text-3xl font-bold text-white">4-12 Weeks</p>
                <p className="text-sm text-slate-200">Fast-Track Training</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <p className="text-3xl font-bold text-white">100+ Jobs</p>
                <p className="text-sm text-slate-200">Employer Partners Hiring</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-600 transition-all shadow-xl hover:scale-105"
              >
                🚀 Apply Now - Start in 2 Weeks
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-all shadow-xl"
              >
                How Free Training Works →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Explanation */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-white text-center">
            <div>
              <p className="text-2xl font-bold mb-1">WIOA</p>
              <p className="text-sm text-blue-100">Federal workforce funding covers tuition + support services</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-1">Workforce Ready Grant</p>
              <p className="text-sm text-blue-100">Indiana state program for certificate training</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-1">OJT</p>
              <p className="text-sm text-blue-100">Get PAID $15-20/hr while you train on the job</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-1">Apprenticeships</p>
              <p className="text-sm text-blue-100">Earn full wages while building your license</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-8">
          {PROGRAM_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                {group.title}
              </h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {group.items.map((item, idx) => {
                  const isObject = typeof item === 'object';
                  const name = isObject ? item.name : item;
                  const href = isObject ? item.href : '/apply';
                  const linkText = isObject ? 'Learn More →' : 'I\'m interested →';
                  
                  return (
                    <Link
                      key={name}
                      href={href}
                      className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={`/images/programs-new/program-${(idx % 20) + 1}.jpg`}
                          alt={name}
                          fill
                          className="object-cover" quality={85} sizes="100vw"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">{name}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Training with a clear path to certification and employment.
                        </p>
                        <span className="mt-2 inline-block text-xs font-semibold text-orange-500">
                          {linkText}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700">
            Don't see your exact program listed? Select "Other / Unsure" on the
            application and our team will help you choose the best pathway.
          </div>
        </div>
      </section>

      {/* All Programs Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              All Available Programs
            </h2>
            <p className="text-lg text-slate-600">
              {COMPLETE_PROGRAMS.length} career training programs - all 100% funded
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLETE_PROGRAMS.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                      {program.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {program.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded">
                        {program.duration}
                      </span>
                      {program.etplApproved && (
                        <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                          ETPL Approved
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      Funding: {program.funding.join(", ")}
                    </div>
                    <span className="mt-3 inline-block text-sm font-semibold text-teal-600 group-hover:text-teal-700">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-all shadow-lg"
            >
              Apply to Any Program
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
