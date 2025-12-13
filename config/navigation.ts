// config/navigation.ts
import { siteMapSections, type SiteMapItem } from '@/config/site-map.auto';

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
    label: 'Programs',
    href: '/programs',
    items: [
      { label: 'View All Programs', href: '/programs' },
      {
        label: 'Barber Apprenticeship',
        href: '/programs/barber-apprenticeship',
      },
      {
        label: 'Beauty & Career Educator',
        href: '/programs/beauty-career-educator',
      },
      {
        label: 'Business Start-up & Marketing',
        href: '/programs/business-startup-marketing',
      },
      { label: 'CNA Healthcare', href: '/programs/cna' },
      { label: 'CDL Training', href: '/programs/cdl' },
      { label: 'CPR Certification', href: '/programs/cpr-certification' },
      {
        label: 'Emergency Health & Safety Tech',
        href: '/programs/emergency-health-safety-tech',
      },
      { label: 'Home Health Aide', href: '/programs/home-health-aide' },
      { label: 'HVAC Technician', href: '/programs/hvac-technician' },
      { label: 'Medical Assistant', href: '/programs/medical-assistant' },
      {
        label: 'Professional Esthetician',
        href: '/programs/professional-esthetician',
      },
      { label: 'Peer Recovery Coach', href: '/programs/peer-recovery-coach' },
      {
        label: 'Tax Prep & Financial Services',
        href: '/programs/tax-prep-financial-services',
      },
    ],
  },
  {
    label: 'Funding',
    href: '/funding',
    items: [
      { label: 'Funding Options', href: '/funding' },
      { label: 'WIOA Funding', href: '/funding/wioa' },
      { label: 'Workforce Ready Grant (WRG)', href: '/funding/wrg' },
      { label: 'JRI Funding', href: '/funding/jri' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'For You',
    items: [
      { label: 'For Learners', href: '/learners' },
      { label: 'For Employers', href: '/employers' },
      { label: 'Hire Graduates', href: '/hire-graduates' },
      { label: 'For Partners', href: '/partners' },
      { label: 'Training Providers', href: '/training-providers' },
      { label: 'Workforce Partners', href: '/workforce-partners' },
      { label: 'Career Services', href: '/career-services' },
      { label: 'Mentorship', href: '/mentorship' },
    ],
  },
  {
    label: 'Student Portal',
    href: '/student/dashboard',
    items: [
      { label: 'Dashboard', href: '/student/dashboard' },
      { label: 'My Courses', href: '/student/courses' },
      { label: 'Assignments', href: '/student/assignments' },
      { label: 'Grades', href: '/student/grades' },
      { label: 'Certificates', href: '/student/certificates' },
      { label: 'Career Counseling', href: '/student/career-counseling' },
      { label: 'Resources', href: '/student/resources' },
      { label: 'Support', href: '/student/support' },
    ],
  },
  {
    label: 'LMS',
    href: '/lms',
    items: [
      { label: 'LMS Dashboard', href: '/lms/dashboard' },
      { label: 'My Courses', href: '/lms/courses' },
      { label: 'Calendar', href: '/lms/calendar' },
      { label: 'Assignments', href: '/lms/assignments' },
      { label: 'Grades', href: '/lms/grades' },
      { label: 'Certificates', href: '/lms/certificates' },
      { label: 'Messages', href: '/lms/messages' },
      { label: 'Forums', href: '/lms/forums' },
      { label: 'Study Groups', href: '/lms/study-groups' },
      { label: 'Resources', href: '/lms/resources' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    items: [
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Blog', href: '/blog' },
      { label: 'Videos', href: '/videos' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Help & Tutorials', href: '/help/tutorials' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Accreditation', href: '/accreditation' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

/**
 * FOOTER NAV
 * - expose ALL sections (Main Pages, Programs, Funding, LMS, HR, Reports, etc.)
 * - used by SiteFooter to render a mega-footer with every page
 */
export const footerSections = siteMapSections;
