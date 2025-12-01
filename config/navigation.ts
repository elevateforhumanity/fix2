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
    items: [
      { label: "View All Programs", href: "/programs" },
      { label: "Healthcare Training", href: "/programs/cna" },
      { label: "Skilled Trades", href: "/programs/hvac" },
      { label: "Beauty & Wellness", href: "/programs/barber" },
      { label: "Transportation", href: "/programs/cdl" },
      { label: "Technology", href: "/programs/it" },
    ],
  },
  {
    label: "Get Started",
    href: "/apply",
    items: [
      { label: "Apply Now", href: "/apply" },
      { label: "Funding Options", href: "/funding" },
      { label: "Eligibility", href: "/funding/wioa" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "For You",
    href: "/students",
    items: [
      { label: "For Students", href: "/students" },
      { label: "For Employers", href: "/employers" },
      { label: "Training Providers", href: "/training-providers" },
      { label: "Student Portal", href: "/student/dashboard" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Founder", href: "/founder" },
      { label: "Our Team", href: "/team" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
