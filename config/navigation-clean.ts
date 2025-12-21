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
 * AUTHENTICATED NAVIGATION - Only visible after login
 * Shown in place of "Login" button
 */
export const authenticatedNav: NavSection[] = [
  {
    label: 'Dashboard',
    requiresAuth: true,
    items: [
      { label: 'My Dashboard', href: '/dashboard' },
      { label: 'My Courses', href: '/student/courses' },
      { label: 'My Applications', href: '/student/applications' },
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
      { label: 'Programs', href: '/admin/programs' },
      { label: 'Reports', href: '/admin/reports' },
    ],
  },
];

/**
 * Get navigation based on user authentication and role
 */
export function getNavigation(user?: { role?: string } | null) {
  let nav = [...publicNav];

  if (user) {
    // Replace "Login" with "Dashboard"
    nav = nav.filter(section => section.label !== 'Login');
    nav.splice(4, 0, ...authenticatedNav); // Insert after "Apply"

    // Add admin nav for admin users
    if (user.role === 'admin' || user.role === 'staff') {
      nav.push(...adminNav);
    }
  }

  return nav;
}

// Export for backward compatibility
export const headerNav = publicNav;
