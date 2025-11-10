/** single source of truth — hardened by zinc */
export interface NavLink { label: string; to: string; items?: NavLink[]; }

export const branding = {
  name: "Elevate for Humanity",
  subtitle: "Career & Technical Institute",
  tagline: "Empowering futures through workforce training",
  location: "Marion County, Indiana",
  phone: "(317) 314-3757",
  phoneRaw: "3173143757",
  email: "info@elevateforhumanity.org",
};

export const mainNavigation: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Programs", to: "/programs" },
  { label: "Student Portal", to: "/lms" },
  { label: "About", to: "/about" },
  { label: "Partners", to: "/partners" },
  { label: "Contact", to: "/contact" },
];

export const ctaButton = { label: "Apply Now", to: "/apply" };

export const authButtons = {
  signIn: { label: "Sign In", to: "/login" },
  signUp: { label: "Get Started", to: "/apply" },
};

export const footerSections = [
  {
    title: "Programs",
    links: [
      { label: "All Programs", to: "/programs" },
      { label: "Barber Apprenticeship", to: "/programs/barber" },
      { label: "Building Services", to: "/programs/building-tech" },
      { label: "HVAC & Welding", to: "/programs/hvac" },
      { label: "Healthcare CNA/QMA", to: "/programs/healthcare" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Partners", to: "/partners" },
      { label: "Contact", to: "/contact" },
      { label: "Apply Now", to: "/apply" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Student Portal", to: "/lms" },
      { label: "Blog", to: "/blog" },
      { label: "Support", to: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

export const socialLinks = {
  facebook: "https://facebook.com/elevateforhumanity",
  linkedin: "https://linkedin.com/company/elevate-for-humanity",
  youtube: "https://www.youtube.com/@elevateforhumanity",
  instagram: "https://instagram.com/elevateforhumanity",
  twitter: "https://twitter.com/elevate4humanity",
};
