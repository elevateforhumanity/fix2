import Link from "next/link";
import { siteMapSections } from "@/config/site-map.auto";

export const metadata = {
  title: "Site Map | Elevate for Humanity",
  description:
    "Complete site map for Elevate for Humanity's workforce development and LMS platform.",
};

export default function SiteMapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8 space-y-2">
        <p className="text-[11px] text-slate-400 uppercase tracking-wide">
          ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Complete Site Map
        </h1>
        <p className="text-sm text-slate-600">
          All {siteMapSections.reduce((n, s) => n + s.items.length, 0)} pages
          organized by category. Use <strong>Ctrl+F</strong> (or{" "}
          <strong>Cmd+F</strong> on Mac) to search.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {siteMapSections.map((section) => (
          <section
            key={section.id}
            className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              {section.title}
            </h2>
            <ul className="space-y-1 text-sm max-h-80 overflow-auto pr-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-700 hover:text-orange-700 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
