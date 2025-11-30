// config/navigation.ts
import { siteMapSections, type SiteMapItem } from "@/config/site-map.auto";

export type NavItem = SiteMapItem;

export type NavSection = {
  label: string;
  href?: string;
  items?: NavItem[];
};

// helper: find a section by id or title
function itemsFrom(key: string): NavItem[] {
  const section =
    siteMapSections.find((s) => s.id === key) ||
    siteMapSections.find((s) => s.title === key);
  return section ? section.items : [];
}

/**
 * HEADER NAV
 * - high-level categories only (so it stays usable)
 * - each dropdown uses *all* items from that section
 */
export const headerNav: NavSection[] = [
  {
    label: "Programs",
    href: "/programs",
    items: itemsFrom("programs"),
  },
  {
    label: "Funding",
    href: "/funding",
    items: itemsFrom("funding"),
  },
  {
    label: "For Students",
    href: "/student/portal",
    items: itemsFrom("for-students"),
  },
  {
    label: "Career Center",
    href: "/career-services",
    items: itemsFrom("career-services"),
  },
  {
    label: "Community",
    href: "/community",
    items: itemsFrom("community"),
  },
  {
    label: "Partners",
    href: "/employers",
    items: [
      ...itemsFrom("For Employers"),
      ...itemsFrom("Program Holders"),
      ...itemsFrom("Boards"),
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      ...itemsFrom("Main Pages"),
      ...itemsFrom("Legal & Policies"),
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
