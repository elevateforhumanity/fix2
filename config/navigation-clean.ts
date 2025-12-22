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
      { label: 'All Programs', href: '/programs' },
      { label: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { label: 'HVAC Technician', href: '/programs/hvac-technician' },
      { label: 'CNA Healthcare', href: '/programs/cna' },
      { label: 'CDL Training', href: '/programs/cdl' },
      { label: 'Home Health Aide', href: '/programs/home-health-aide' },
      { label: 'Peer Recovery Coach', href: '/programs/peer-recovery-coach' },
      { label: 'Business Startup', href: '/programs/business-startup' },
      { label: 'Building Maintenance', href: '/programs/building-maintenance' },
      { label: 'Direct Support Professional', href: '/programs/direct-support-professional' },
      { label: 'Drug Collector', href: '/programs/drug-collector' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
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
    label: 'For You',
    items: [
      // Students
      { label: 'For Students', href: '/learners', isHeader: true },
      { label: 'Apply Now', href: '/apply' },
      { label: 'Career Services', href: '/career-services' },
      { label: 'Mentorship', href: '/mentorship' },
      { label: 'Student Handbook', href: '/student-handbook' },
      
      // Employers
      { label: 'For Employers', href: '/employers', isHeader: true },
      { label: 'Hire Graduates', href: '/hire-graduates' },
      { label: 'Partner With Us', href: '/partners' },
      { label: 'Workforce Partners', href: '/workforce-partners' },
      
      // Agencies
      { label: 'For Agencies & Schools', href: '/partners', isHeader: true },
      { label: 'Request Demo', href: '/contact' },
      { label: 'Platform License', href: '/platform' },
      { label: 'Training Providers', href: '/training-providers' },
    ],
  },
  {
    label: 'Apply',
    href: '/apply',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'More',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Community', href: '/community' },
      { label: 'Services', href: '/services' },
      { label: 'Resources', href: '/resources' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
      { label: 'Contact Us', href: '/contact' },
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
 */
export function getNavigation(user?: { role?: string } | null) {
  let nav = [...publicNav];

  if (user) {
    // Replace "Login" with role-specific dashboard
    nav = nav.filter(section => section.label !== 'Login');
    
    // Add role-specific navigation
    switch (user.role) {
      case 'admin':
      case 'super_admin':
        nav.splice(4, 0, ...adminNav);
        break;
      case 'program_holder':
        nav.splice(4, 0, ...programHolderNav);
        break;
      case 'partner':
        nav.splice(4, 0, ...partnerNav);
        break;
      case 'employer':
        nav.splice(4, 0, ...employerNav);
        break;
      case 'workforce_board':
        nav.splice(4, 0, ...workforceBoardNav);
        break;
      case 'student':
      default:
        nav.splice(4, 0, ...studentNav);
        break;
    }

    // Add admin nav for admin users (in addition to their main nav)
    if (user.role === 'admin' || user.role === 'super_admin') {
      // Admin nav already added above
    }
  }

  return nav;
}

// Export for backward compatibility
export const headerNav = publicNav;
