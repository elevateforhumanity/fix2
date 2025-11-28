import Link from "next/link";
import Image from "next/image";

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
      { name: "Tax Prep / IRS VITA", href: "/programs/tax-prep" },
      { name: "Tax Business Management", href: "/programs/tax-business" },
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
        <div className="relative h-64 md:h-80">
          <Image
            src="/media/programs/multi-training-programs-optimized.jpg"
            alt="Training Programs at Elevate for Humanity"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-4 w-full">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Training Programs
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-100 md:text-lg">
            Explore career pathways in healthcare, skilled trades, beauty,
            business, and more. Many programs are eligible for workforce
            funding and employer partnerships.
            </p>
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
              <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  const isObject = typeof item === 'object';
                  const name = isObject ? item.name : item;
                  const href = isObject ? item.href : '/apply';
                  const linkText = isObject ? 'Learn More →' : 'I\'m interested →';
                  
                  return (
                    <div
                      key={name}
                      className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-800 shadow-sm"
                    >
                      <p className="font-semibold text-slate-900">{name}</p>
                      <p className="mt-1 text-xs text-slate-700">
                        Training with a clear path to certification, employment,
                        or apprenticeship.
                      </p>
                      <Link
                        href={href}
                        className="mt-3 inline-block text-[11px] font-semibold text-red-600"
                      >
                        {linkText}
                      </Link>
                    </div>
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
