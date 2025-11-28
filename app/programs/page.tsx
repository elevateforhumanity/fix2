import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Career Training Programs | Elevate for Humanity',
  description: '20+ free career training programs in healthcare, skilled trades, technology, and more. 100% funded through WIOA, WRG, and workforce grants. Start your career today.',
  openGraph: {
    title: 'Career Training Programs | Elevate for Humanity',
    description: '20+ free career training programs. 100% funded. Start your career today.',
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
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              20+ Career Pathways Available
            </span>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              Training Programs
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-100 md:text-xl">
              Explore career pathways in healthcare, skilled trades, beauty,
              business, and more. Many programs are eligible for workforce
              funding and employer partnerships.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white hover:bg-orange-600 transition-all shadow-xl"
              >
                Apply Now
              </Link>
              <Link
                href="/financial-aid"
                className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all shadow-xl"
              >
                Learn About Funding
              </Link>
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
                          className="object-cover"
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
    </main>
  );
}
