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
 * HEADER NAV - Organized Ecosystem Navigation
 */
export const headerNav: NavSection[] = [
  {
    label: "Training Programs",
    href: "/programs",
    items: [
      { label: "🎯 View All Programs", href: "/programs" },
      { label: "─── Healthcare ───", href: "#", disabled: true },
      { label: "CNA Training", href: "/programs/cna" },
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "Phlebotomy", href: "/programs/phlebotomy" },
      { label: "Dental Assistant", href: "/programs/dental-assistant" },
      { label: "EKG Technician", href: "/programs/ekg-technician" },
      { label: "Pharmacy Technician", href: "/programs/pharmacy-technician" },
      { label: "─── Beauty & Wellness ───", href: "#", disabled: true },
      { label: "Barber Program", href: "/programs/barber" },
      { label: "Esthetician", href: "/programs/esthetician" },
      { label: "Nail Technology", href: "/programs/nail-tech" },
      { label: "Cosmetology", href: "/programs/cosmetology" },
      { label: "─── Skilled Trades ───", href: "#", disabled: true },
      { label: "HVAC Technician", href: "/programs/hvac-technician" },
      { label: "Building Maintenance", href: "/programs/building-maintenance" },
      { label: "CDL / Truck Driving", href: "/programs/truck-driving" },
      { label: "─── Business & Tech ───", href: "#", disabled: true },
      { label: "Business Apprenticeship", href: "/programs/business-apprenticeship" },
      { label: "VITA Tax Preparation", href: "/programs/tax-vita" },
    ],
  },
  {
    label: "Services",
    items: [
      { label: "─── Tax Services ───", href: "#", disabled: true },
      { label: "Tax Preparation", href: "/tax-services" },
      { label: "Rise Foundation", href: "/tax-services/rise-foundation" },
      { label: "Supersonic Fast Cash", href: "/tax-services/supersonic-fast-cash" },
      { label: "─── Career Services ───", href: "#", disabled: true },
      { label: "Job Placement", href: "/career-services" },
      { label: "Resume Building", href: "/services/resume" },
      { label: "Interview Prep", href: "/services/interview-prep" },
      { label: "Career Counseling", href: "/student/career-counseling" },
      { label: "─── Funding & Aid ───", href: "#", disabled: true },
      { label: "WIOA Funding", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
      { label: "JRI Funding", href: "/jri" },
      { label: "Financial Aid", href: "/financial-aid" },
    ],
  },
  {
    label: "Dashboards",
    href: "/dashboards",
    items: [
      { label: "🏠 All Dashboards", href: "/dashboards" },
      { label: "─── Student Access ───", href: "#", disabled: true },
      { label: "Student Dashboard", href: "/student/dashboard" },
      { label: "My Courses (LMS)", href: "/lms/dashboard" },
      { label: "Certificates", href: "/student/certificates" },
      { label: "Portfolio", href: "/student/portfolio" },
      { label: "─── Partner Access ───", href: "#", disabled: true },
      { label: "Employer Portal", href: "/employer/dashboard" },
      { label: "Program Holder", href: "/program-holder/dashboard" },
      { label: "Instructor Portal", href: "/portal/instructor/dashboard" },
      { label: "─── Administration ───", href: "#", disabled: true },
      { label: "Admin Console", href: "/admin/dashboard" },
      { label: "Board Portal", href: "/board/dashboard" },
      { label: "Workforce Board", href: "/workforce-board/dashboard" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Blog & News", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
