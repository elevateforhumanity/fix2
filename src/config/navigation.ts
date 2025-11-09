/**
 * Shared Navigation Configuration
 * Single source of truth for all navigation links across the site
 */

export interface NavLink {
  label: string;
  to: string;
  items?: NavLink[];
}

export const mainNavigation: NavLink[] = [
  {
    label: 'Programs',
    to: '/programs',
    items: [
      { label: 'All Programs', to: '/programs' },
      { label: 'Barber Apprenticeship', to: '/programs/barber' },
      { label: 'Building Services', to: '/programs/building-tech' },
      { label: 'HVAC & Welding', to: '/programs/hvac' },
      { label: 'Healthcare CNA/QMA', to: '/programs/healthcare' },
      { label: 'Tax & Business', to: '/programs/tax-business' },
      { label: 'CPR/AED/First Aid', to: '/programs/cprs' },
      { label: 'Digital Skills', to: '/programs/digital-skills' },
    ],
  },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Partners', to: '/partners' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const authButtons = {
  signIn: {
    label: 'Sign In',
    to: '/login',
  },
  signUp: {
    label: 'Create Account',
    to: '/apply',
  },
};

export const ctaButton = {
  label: 'Apply Now',
  to: '/apply',
};

export const footerSections = [
  {
    title: 'Programs',
    links: [
      { label: 'Barber Apprenticeship', to: '/programs/barber' },
      { label: 'Building Services', to: '/programs/building-tech' },
      { label: 'HVAC & Welding', to: '/programs/hvac' },
      { label: 'Healthcare CNA/QMA', to: '/programs/healthcare' },
      { label: 'View All Programs', to: '/programs' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Partners & Employers', to: '/partners' },
      { label: 'Contact', to: '/contact' },
      { label: 'Apply Now', to: '/apply' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Student Portal', to: '/lms' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Support', to: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/legal/privacy' },
      { label: 'Terms of Use', to: '/legal/terms' },
      { label: 'DMCA', to: '/legal/dmca' },
      { label: 'IP Notice', to: '/legal/ip-notice' },
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

export const branding = {
  name: 'Elevate for Humanity',
  subtitle: 'Career & Technical Institute',
  tagline: 'Empowering futures through workforce training',
  location: 'Marion County, Indiana',
  phone: '(317) 314-3757',
  phoneRaw: '3173143757',
  email: 'info@elevateforhumanity.org',
  address: {
    street: '1234 Main Street',
    city: 'Indianapolis',
    state: 'IN',
    zip: '46204',
  },
};
