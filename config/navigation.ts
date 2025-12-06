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
 * HEADER NAV - Complete site navigation
 */
export const headerNav: NavSection[] = [
  {
    label: "Programs",
    href: "/programs",
    items: [
      { label: "View All Programs", href: "/programs" },
      { label: "Healthcare - CNA", href: "/programs/cna" },
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "Phlebotomy", href: "/programs/phlebotomy" },
      { label: "Dental Assistant", href: "/programs/dental-assistant" },
      { label: "EKG Technician", href: "/programs/ekg-technician" },
      { label: "Pharmacy Technician", href: "/programs/pharmacy-technician" },
      { label: "Patient Care Technician", href: "/programs/patient-care-technician" },
      { label: "Sterile Processing", href: "/programs/sterile-processing" },
      { label: "HVAC Technician", href: "/programs/hvac-technician" },
      { label: "Building Maintenance", href: "/programs/building-maintenance" },
      { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship" },
      { label: "Esthetics Apprenticeship", href: "/programs/esthetics-apprenticeship" },
      { label: "Professional Esthetician", href: "/programs/professional-esthetician" },
      { label: "Beauty Career Educator", href: "/programs/beauty-career-educator" },
      { label: "CDL / Truck Driving", href: "/programs/truck-driving" },
      { label: "VITA Tax Preparation", href: "/programs/tax-vita" },
      { label: "Business Apprenticeship", href: "/programs/business-apprenticeship" },
      { label: "Peer Recovery Coach", href: "/programs/peer-recovery-coach" },
      { label: "Workforce Readiness", href: "/programs/workforce-readiness" },
    ],
  },
  {
    label: "Get Started",
    href: "/apply",
    items: [
      { label: "Apply Now", href: "/apply" },
      { label: "How to Get Started", href: "/getstarted" },
      { label: "Advising", href: "/advising" },
      { label: "Funding Options", href: "/funding" },
      { label: "WIOA Funding", href: "/funding/wioa" },
      { label: "Workforce Ready Grant", href: "/funding/wrg" },
      { label: "JRI Funding", href: "/jri" },
      { label: "Financial Aid", href: "/financial-aid" },
      { label: "WIOA Eligibility", href: "/wioa-eligibility" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "For You",
    items: [
      { label: "For Learners", href: "/learners" },
      { label: "For Employers", href: "/employers" },
      { label: "Hire Graduates", href: "/hire-graduates" },
      { label: "For Partners", href: "/partners" },
      { label: "Training Providers", href: "/training-providers" },
      { label: "Workforce Partners", href: "/workforce-partners" },
      { label: "Career Services", href: "/career-services" },
      { label: "Mentorship", href: "/mentorship" },
    ],
  },
  {
    label: "Student Portal",
    href: "/student/dashboard",
    items: [
      { label: "Dashboard", href: "/student/dashboard" },
      { label: "My Courses", href: "/student/courses" },
      { label: "Assignments", href: "/student/assignments" },
      { label: "Grades", href: "/student/grades" },
      { label: "Certificates", href: "/student/certificates" },
      { label: "Career Counseling", href: "/student/career-counseling" },
      { label: "Resources", href: "/student/resources" },
      { label: "Support", href: "/student/support" },
    ],
  },
  {
    label: "LMS",
    href: "/lms",
    items: [
      { label: "LMS Dashboard", href: "/lms/dashboard" },
      { label: "My Courses", href: "/lms/courses" },
      { label: "Calendar", href: "/lms/calendar" },
      { label: "Assignments", href: "/lms/assignments" },
      { label: "Grades", href: "/lms/grades" },
      { label: "Certificates", href: "/lms/certificates" },
      { label: "Messages", href: "/lms/messages" },
      { label: "Forums", href: "/lms/forums" },
      { label: "Study Groups", href: "/lms/study-groups" },
      { label: "Resources", href: "/lms/resources" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    items: [
      { label: "Success Stories", href: "/success-stories" },
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "Webinars", href: "/webinars" },
      { label: "FAQ", href: "/faq" },
      { label: "Help & Tutorials", href: "/help/tutorials" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Founder", href: "/founder" },
      { label: "Our Team", href: "/team" },
      { label: "What We Do", href: "/what-we-do" },
      { label: "Accreditation", href: "/accreditation" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    label: "RISE Foundation",
    href: "/rise-foundation",
    items: [
      { label: "About RISE", href: "/rise-foundation/about" },
      { label: "Our Programs", href: "/rise-foundation/programs" },
      { label: "Get Involved", href: "/rise-foundation/get-involved" },
    ],
  },
  {
    label: "Supersonic Fast Cash",
    href: "/supersonic-fast-cash",
    items: [
      { label: "How It Works", href: "/supersonic-fast-cash/how-it-works" },
      { label: "Our Services", href: "/supersonic-fast-cash/services" },
      { label: "Apply Now", href: "/supersonic-fast-cash/apply" },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
