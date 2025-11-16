/** single source of truth — hardened by zinc */
export interface NavLink {
  label: string;
  to: string;
  items?: NavLink[];
}

export const branding = {
  name: 'Elevate for Humanity',
  subtitle: 'Career & Technical Institute',
  tagline: 'Empowering futures through workforce training',
  location: 'Marion County, Indiana',
  phone: '(317) 314-3757',
  phoneRaw: '3173143757',
  email: '',
};

export const mainNavigation: NavLink[] = [
  { label: 'Dashboard', to: '/' },
  { label: 'Programs', to: '/programs' },
  { label: 'Courses', to: '/courses' },
  { label: 'My Progress', to: '/student-portal' },
  { label: 'Apply', to: '/apply' },
];

export const ctaButton = { label: 'Apply Now', to: '/apply' };

export const authButtons = {
  signIn: { label: 'Sign In', to: '/login' },
  signUp: { label: 'Get Started', to: '/apply' },
};

export const footerSections = [
  {
    title: 'Programs',
    links: [
      { label: 'All Programs', to: '/programs' },
      { label: 'Apprenticeships', to: '/apprenticeship-programs' },
      { label: 'State Programs', to: '/state-programs' },
      { label: 'Apply Now', to: '/apply' },
    ],
  },
  {
    title: 'Learning',
    links: [
      { label: 'Course Catalog', to: '/courses' },
      { label: 'My Dashboard', to: '/student-portal' },
      { label: 'My Certificates', to: '/certificates' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
];

export const socialLinks = {
  facebook: 'https://facebook.com/elevateforhumanity',
  linkedin: 'https://linkedin.com/company/elevate-for-humanity',
  youtube: 'https://www.youtube.com/@elevateforhumanity',
  instagram: 'https://instagram.com/elevateforhumanity',
  twitter: 'https://twitter.com/elevate4humanity',
};
