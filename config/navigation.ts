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
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "Phlebotomy", href: "/programs/phlebotomy" },
      { label: "Dental Assistant", href: "/programs/dental-assistant" },
      { label: "Skilled Trades", href: "/programs/hvac" },
      { label: "Welding", href: "/programs/welding" },
      { label: "Electrical", href: "/programs/electrical" },
      { label: "Plumbing", href: "/programs/plumbing" },
      { label: "Beauty & Wellness", href: "/programs/barber" },
      { label: "Cosmetology", href: "/programs/cosmetology" },
      { label: "Esthetics", href: "/programs/esthetics-apprenticeship" },
      { label: "Transportation", href: "/programs/cdl" },
      { label: "Technology", href: "/programs/it" },
      { label: "Tax Preparation (VITA)", href: "/programs/tax-prep" },
    ],
  },
  {
    label: "Get Started",
    href: "/apply",
    items: [
      { label: "Apply Now", href: "/apply" },
      { label: "Funding Options", href: "/funding" },
      { label: "WIOA Funding", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
      { label: "DOL Programs", href: "/funding/dol" },
      { label: "JRI Funding", href: "/funding/jri" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "For You",
    href: "/learners",
    items: [
      { label: "For Learners", href: "/learners" },
      { label: "For Employers", href: "/employers" },
      { label: "For Partners", href: "/partners" },
      { label: "Training Providers", href: "/training-providers" },
      { label: "Student Portal", href: "/student/dashboard" },
      { label: "LMS", href: "/lms" },
      { label: "Courses", href: "/courses" },
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
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
