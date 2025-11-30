import Link from "next/link";

const programs = [
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    blurb:
      "Hands-on training to support doctors, nurses, and clinics with patient care and front office skills.",
  },
  {
    slug: "cna",
    name: "CNA (Certified Nursing Assistant)",
    blurb:
      "Start your healthcare career helping patients with daily care in hospitals, nursing homes, and home care.",
  },
  {
    slug: "barber-apprenticeship",
    name: "Barber Apprenticeship",
    blurb:
      "Earn while you learn under a licensed barber and build a career in grooming, style, and entrepreneurship.",
  },
  {
    slug: "hvac-technician",
    name: "HVAC Technician",
    blurb:
      "Learn to install and service heating and cooling systems that keep homes and businesses comfortable.",
  },
  {
    slug: "building-maintenance-tech",
    name: "Building Maintenance Technician",
    blurb:
      "Train to keep buildings safe, clean, and operating smoothly through hands-on maintenance skills.",
  },
  {
    slug: "cdl",
    name: "CDL / Truck Driving",
    blurb:
      "Prepare for a career on the road with commercial driving skills that keep goods moving across the country.",
  },
  {
    slug: "tax-prep-vita",
    name: "Tax Prep (VITA)",
    blurb:
      "Become an IRS-certified volunteer tax preparer and help families file accurate returns at no cost.",
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness",
    blurb:
      "Build the soft skills, digital skills, and confidence to show up strong on any job.",
  },
  {
    slug: "micro-classes",
    name: "Micro Classes",
    blurb:
      "Short, focused classes that help you test new careers, build specific skills, or stack credentials.",
  },
];

export const metadata = {
  title: "Programs | Elevate For Humanity",
  description:
    "Explore free career training programs in healthcare, trades, transportation, and workforce readiness funded through WIOA, WRG, and partner programs.",
};

export default function ProgramsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-3 text-[11px] text-slate-500 uppercase tracking-wide">
        ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
      </div>

      <header className="mb-6 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Free career training programs
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
          Elevate For Humanity partners with workforce boards and employers to
          offer no-cost training that leads to in-demand jobs. Most programs can
          be fully funded through WIOA, Workforce Ready Grant, JRI, or employer
          partners.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Link
            key={program.slug}
            href={`/programs/${program.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
          >
            <h2 className="text-sm font-semibold text-slate-900 group-hover:text-orange-700">
              {program.name}
            </h2>
            <p className="mt-2 text-sm text-slate-700">{program.blurb}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-orange-700">
              Learn more →
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-800">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">
          Unsure which program fits you best?
        </h2>
        <p className="mb-3">
          You don&apos;t have to figure it out alone. Our team can help you
          explore options based on your interests, work history, and funding
          eligibility.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-orange-700"
          >
            Get matched to a program
          </Link>
          <Link
            href="/funding"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700"
          >
            Learn how funding works
          </Link>
        </div>
      </section>
    </main>
  );
}
