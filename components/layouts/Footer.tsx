import Link from "next/link";
import { SITE_MAP, SiteSection } from "@/config/siteMapConfig";

const FOOTER_KEYS: SiteSection["key"][] = [
  "programs",
  "funding",
  "students",
  "main",
];

const footerSections: SiteSection[] = SITE_MAP.filter((sec) =>
  FOOTER_KEYS.includes(sec.key)
);

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-10 md:grid-cols-4">
        {footerSections.map((sec) => {
          const links = sec.pages.filter((p) => p.showInFooter !== false);
          return (
            <div key={sec.key}>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-3">
                {sec.title}
              </div>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      className="text-sm text-slate-800 hover:text-orange-700"
                      href={l.href}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Elevate For Humanity • ORIGINAL-SITE-EFH-ORIGINAL-2024 • Owner: Elizabeth L. Greene
      </div>
    </footer>
  );
}
