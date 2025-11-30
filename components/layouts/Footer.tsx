import Link from "next/link";

const COLS = [
  {
    title: "Programs",
    links: [
      { label: "All Programs", href: "/programs" },
      { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship" },
      { label: "CNA", href: "/programs/cna" },
      { label: "HVAC", href: "/programs/hvac" },
      { label: "Building Technician", href: "/programs/building-technician" },
      { label: "CDL", href: "/programs/cdl" },
    ],
  },
  {
    title: "Funding",
    links: [
      { label: "Overview", href: "/funding" },
      { label: "WIOA", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
      { label: "Apprenticeships", href: "/funding/apprenticeship" },
      { label: "Employer Sponsorship", href: "/funding/employer" },
    ],
  },
  {
    title: "For Students",
    links: [
      { label: "Student Portal", href: "/student/portal" },
      { label: "Career Services", href: "/career-services" },
      { label: "Courses", href: "/courses/catalog" },
      { label: "Credentials", href: "/credentials" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Documents", href: "/documents" },
      { label: "Legal", href: "/legal" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Sitemap", href: "/sitemap-page" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-10 md:grid-cols-4">
        {COLS.map((col) => (
          <div key={col.title}>
            <div className="text-xs uppercase tracking-wide text-slate-500 mb-3">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link className="text-sm text-slate-800 hover:text-orange-700" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Elevate For Humanity • ORIGINAL-SITE-EFH-ORIGINAL-2024 • Owner: Elizabeth L. Greene
      </div>
    </footer>
  );
}
