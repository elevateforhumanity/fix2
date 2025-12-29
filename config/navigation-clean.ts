// config/navigation-clean.ts
// Clean navigation following developer-ready spec
// ≤ 6 top-level items, auth-gated dashboards

export type NavItem = {
  label: string;
  href: string;
  isHeader?: boolean;
};

export type NavSection = {
  label: string;
  href?: string;
  items?: NavItem[];
  requiresAuth?: boolean; // New: mark sections that need authentication
};

/**
 * PUBLIC NAVIGATION - Visible to all users
 * Max 6 top-level items for mobile
 */
export const publicNav: NavSection[] = [
  {
    label: 'Programs',
    href: '/programs',
    items: [
      // Browse All
      { label: 'Browse All Programs', href: '/programs', isHeader: true },

      // Healthcare Programs
      { label: 'Healthcare', href: '/programs#healthcare', isHeader: true },
      { label: 'CNA (Certified Nursing Assistant)', href: '/programs/cna-certification' },
      { label: 'Medical Assistant', href: '/programs/medical-assistant' },
      { label: 'Home Health Aide', href: '/programs/home-health-aide' },
      {
        label: 'Phlebotomy Technician',
        href: '/programs/phlebotomy-technician',
      },
      { label: 'CPR & First Aid', href: '/programs/cpr-first-aid-hsi' },
      {
        label: 'Emergency Health & Safety Tech',
        href: '/programs/emergency-health-safety-tech',
      },
      {
        label: 'Certified Peer Recovery Coach',
        href: '/programs/certified-peer-recovery-coach',
      },

      // Skilled Trades
      {
        label: 'Skilled Trades',
        href: '/programs/skilled-trades',
        isHeader: true,
      },
      { label: 'HVAC Technician', href: '/programs/hvac-technician' },
      { label: 'Building Maintenance', href: '/programs/building-maintenance' },
      { label: 'Building Technician', href: '/programs/building-technician' },
      {
        label: 'Barber Apprenticeship',
        href: '/programs/barber-apprenticeship',
      },

      // Transportation
      {
        label: 'Transportation',
        href: '/programs/cdl-transportation',
        isHeader: true,
      },
      { label: 'CDL Training', href: '/programs/cdl' },

      // Business & Tax
      {
        label: 'Business & Tax',
        href: '/programs/business-financial',
        isHeader: true,
      },
      {
        label: 'Business Startup & Marketing',
        href: '/programs/business-startup-marketing',
      },
      {
        label: 'Tax Prep & Financial Services',
        href: '/programs/tax-prep-financial-services',
      },

      // Beauty & Wellness
      {
        label: 'Beauty & Wellness',
        href: '/programs/beauty-wellness',
        isHeader: true,
      },
      {
        label: 'Professional Esthetician',
        href: '/programs/professional-esthetician',
      },
      {
        label: 'Esthetician Apprenticeship',
        href: '/programs/esthetician-apprenticeship',
      },
      {
        label: 'Nail Technician Apprenticeship',
        href: '/programs/nail-technician-apprenticeship',
      },
      {
        label: 'Beauty Career Educator',
        href: '/programs/beauty-career-educator',
      },

      // Specialized Programs
      { label: 'Specialized Programs', href: '#', isHeader: true },
      { label: 'Drug Collector', href: '/programs/drug-collector' },
      { label: 'Peer Recovery Coach', href: '/programs/peer-recovery-coach' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },

      // Apprenticeships
      {
        label: 'Apprenticeships',
        href: '/programs/apprenticeships',
        isHeader: true,
      },
      { label: 'View All Apprenticeships', href: '/apprenticeships' },
    ],
  },
  {
    label: 'Funding',
    href: '/funding',
    items: [
      { label: 'All Funding Options', href: '/funding' },
      { label: 'WIOA Funding', href: '/funding/wioa' },
      { label: 'Workforce Ready Grant (WRG)', href: '/funding/wrg' },
      { label: 'JRI Funding', href: '/funding/jri' },
      { label: 'Financial Aid', href: '/financial-aid' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Tax Services', href: '#', isHeader: true },
      { label: 'Supersonic Fast Cash', href: '/supersonic-fast-cash' },
      { label: 'VITA Tax Preparation', href: '/vita' },
      { label: 'Tax Filing Services', href: '/tax-filing' },
      
      { label: 'Career Services', href: '#', isHeader: true },
      { label: 'Career Counseling', href: '/career-services' },
      { label: 'Job Placement', href: '/career-services' },
      { label: 'Resume Help', href: '/features/resume-builder' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'Learning', href: '#', isHeader: true },
      { label: 'Courses', href: '/courses' },
      { label: 'Community', href: '/community' },
      { label: 'Forums', href: '/forums' },
      { label: 'Study Groups', href: '/study-groups' },
      { label: 'Events', href: '/events' },
      
      { label: 'Resources', href: '#', isHeader: true },
      { label: 'Blog', href: '/blog' },
      { label: 'Videos', href: '/videos' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Help Center', href: '/help' },
      
      { label: 'Alumni', href: '#', isHeader: true },
      { label: 'Alumni Network', href: '/alumni' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'For Schools', href: '#', isHeader: true },
      { label: 'Platform Overview', href: '/platform' },
      { label: 'For Training Providers', href: '/training-providers' },
      { label: 'White Label', href: '/white-label' },
      { label: 'Franchise Opportunities', href: '/franchise' },
      
      { label: 'For Employers', href: '#', isHeader: true },
      { label: 'Hire Graduates', href: '/hire-graduates' },
      { label: 'Workforce Solutions', href: '/workforce-partners' },
      
      { label: 'Store', href: '#', isHeader: true },
      { label: 'Platform Licenses', href: '/store/licenses' },
      { label: 'Digital Products', href: '/store' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'Company', href: '#', isHeader: true },
      { label: 'Our Story', href: '/about' },
      { label: 'Team', href: '/about/team' },
      { label: 'Founder', href: '/founder' },
      { label: 'What We Do', href: '/what-we-do' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Annual Report', href: '/annual-report' },
      
      { label: 'Trust & Compliance', href: '#', isHeader: true },
      { label: 'Accreditation', href: '/accreditation' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Federal Compliance', href: '/federal-compliance' },
      { label: 'Academic Integrity', href: '/academic-integrity' },
      
      { label: 'Media', href: '#', isHeader: true },
      { label: 'News', href: '/news' },
      { label: 'Media Showcase', href: '/media-showcase' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/**
 * STUDENT NAVIGATION - For students
 */
export const studentNav: NavSection[] = [
  {
    label: 'Dashboard',
    requiresAuth: true,
    items: [
      { label: 'My Dashboard', href: '/student/dashboard' },
      { label: 'My Courses', href: '/student/courses' },
      { label: 'My Progress', href: '/student/progress' },
      { label: 'Assignments', href: '/student/assignments' },
      { label: 'Grades', href: '/student/grades' },
      { label: 'Certificates', href: '/student/certificates' },
      { label: 'Career Counseling', href: '/student/career-counseling' },
    ],
  },
];

/**
 * ADMIN NAVIGATION - Only for admin users
 */
export const adminNav: NavSection[] = [
  {
    label: 'Admin',
    requiresAuth: true,
    items: [
      { label: 'Admin Dashboard', href: '/admin' },
      { label: 'Applications', href: '/admin/applications' },
      { label: 'Students', href: '/admin/students' },
      { label: 'Enrollments', href: '/admin/enrollments' },
      { label: 'Programs', href: '/admin/programs' },
      { label: 'Program Holders', href: '/admin/program-holders' },
      { label: 'Reports', href: '/admin/reports' },
      { label: 'Compliance', href: '/admin/compliance' },
    ],
  },
];

/**
 * PROGRAM HOLDER NAVIGATION - For program holders
 */
export const programHolderNav: NavSection[] = [
  {
    label: 'Portal',
    requiresAuth: true,
    items: [
      { label: 'My Dashboard', href: '/program-holder/dashboard' },
      { label: 'Students', href: '/program-holder/portal/students' },
      { label: 'Attendance', href: '/program-holder/portal/attendance' },
      { label: 'Documents', href: '/program-holder/documents' },
      { label: 'Reports', href: '/program-holder/portal/reports' },
      { label: 'Messages', href: '/program-holder/portal/messages' },
      { label: 'Training', href: '/program-holder/training' },
    ],
  },
];

/**
 * PARTNER NAVIGATION - For training partners
 */
export const partnerNav: NavSection[] = [
  {
    label: 'Partner Portal',
    requiresAuth: true,
    items: [
      { label: 'Partner Dashboard', href: '/partner' },
      { label: 'Students', href: '/partner/students' },
      { label: 'Reports', href: '/partner/reports' },
      { label: 'Resources', href: '/partner/resources' },
    ],
  },
];

/**
 * EMPLOYER NAVIGATION - For employers
 */
export const employerNav: NavSection[] = [
  {
    label: 'Employer Portal',
    requiresAuth: true,
    items: [
      { label: 'Employer Dashboard', href: '/employer' },
      { label: 'Placements', href: '/employer/placements' },
      { label: 'Candidates', href: '/employer/candidates' },
      { label: 'Reports', href: '/employer/reports' },
    ],
  },
];

/**
 * WORKFORCE BOARD NAVIGATION - For workforce boards
 */
export const workforceBoardNav: NavSection[] = [
  {
    label: 'Workforce Board',
    requiresAuth: true,
    items: [
      { label: 'Board Dashboard', href: '/workforce-board' },
      { label: 'Programs', href: '/workforce-board/programs' },
      { label: 'Reports', href: '/workforce-board/reports' },
      { label: 'Compliance', href: '/workforce-board/compliance' },
    ],
  },
];

/**
 * Get navigation based on user authentication and role
 * 
 * NOTE: Dashboard-specific navigation is now handled INSIDE each dashboard
 * via sidebar/internal navigation, NOT in the header dropdown.
 * The header only shows public navigation items.
 */
export function getNavigation(user?: { role?: string } | null) {
  // Always return public navigation only
  // Dashboard features are accessed via the Dashboard button and internal navigation
  return [...publicNav];
}

// Export for backward compatibility
export const headerNav = publicNav;
