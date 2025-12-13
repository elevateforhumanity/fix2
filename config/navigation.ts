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
 * HEADER NAV - Simplified, user-friendly navigation
 */
export const headerNav: NavSection[] = [
  {
    label: "Programs",
    href: "/programs",
    items: [
      { label: "View All Programs", href: "/programs" },
      { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship" },
      { label: "CNA Healthcare", href: "/programs/cna" },
      { label: "HVAC Technician", href: "/programs/hvac-technician" },
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "CDL Training", href: "/programs/cdl" },
    ],
  },
  {
    label: "Funding",
    href: "/funding",
    items: [
      { label: "100% FREE Training", href: "/funding" },
      { label: "WIOA Funding", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
