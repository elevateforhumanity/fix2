// config/navigation.ts
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All Programs", href: "/programs" },
      { label: "Healthcare", href: "/programs/category/healthcare" },
      { label: "Skilled Trades", href: "/programs/category/trades" },
      { label: "Beauty & Barber", href: "/programs/category/beauty" },
      { label: "Business & Tax", href: "/programs/category/business" },
      { label: "Youth & Re-entry", href: "/programs/category/reentry" },
    ],
  },
  {
    label: "Students",
    href: "/student",
    children: [
      { label: "Student Dashboard", href: "/student/dashboard" },
      { label: "How Funding Works", href: "/funding/students" },
      { label: "Orientation", href: "/student/orientation" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Employers",
    href: "/employers",
    children: [
      { label: "Employer Overview", href: "/employers" },
      { label: "Post Jobs & OJT", href: "/employers/opportunities" },
      { label: "Work-Based Learning (WEX)", href: "/employers/wex" },
      { label: "JRI / Apprenticeships", href: "/employers/apprenticeships" },
      { label: "Partner Directory", href: "/directory/employers" },
    ],
  },
  {
    label: "Partners",
    href: "/partners",
    children: [
      { label: "Government & Workforce Boards", href: "/partners/government" },
      { label: "Schools & Training Providers", href: "/partners/providers" },
      { label: "Community Organizations", href: "/partners/community" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Impact & Success Stories", href: "/success-stories" },
      { label: "Selfish Inc - Mental Wellness", href: "/selfish-inc" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const authNav: NavItem[] = [
  { label: "Student Login", href: "/auth/login?role=student" },
  { label: "Employer Login", href: "/auth/login?role=employer" },
  { label: "Staff Login", href: "/auth/login?role=staff" },
];
