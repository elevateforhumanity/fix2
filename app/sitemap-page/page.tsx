import { SITE_MAP } from "@/config/siteMapConfig";

export const metadata = {
  title: "Site Map | Elevate For Humanity",
  description: "All pages organized by category.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-[11px] text-orange-700 uppercase tracking-widest mb-2">
        ORIGINAL-SITE-EFH-ORIGINAL-2024 • Owner: Elizabeth L. Greene
      </p>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Complete Site Map</h1>
      <p className="text-sm text-slate-700 mb-4">
        All pages organized by category. Use Ctrl+F (Cmd+F on Mac) to search by keyword.
      </p>

      <div className="space-y-6">
        {SITE_MAP.map((section) => (
          <section key={section.key}>
            <h2 className="text-base font-semibold mb-1">{section.title}</h2>
            <ul className="list-disc list-inside text-sm text-slate-800 space-y-1">
              {section.pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="hover:text-orange-700">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
