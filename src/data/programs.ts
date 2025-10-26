export type Program = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  bullets: string[];
  funding: string[];
  cta?: string;
  heroSrc: string; // 1200x900
  cardSrc: string; // 1600x900
};

export const programs: Program[] = [
  {
    slug: 'barber',
    name: 'Barber Apprenticeship',
    tagline: 'Start Your Career in Barbering',
    summary:
      'Earn while you learn in a 2,000-hour apprenticeship combining related instruction and on-the-job training under licensed mentors. Graduates qualify for Indiana Barber Licensure and gain business-ready skills.',
    bullets: [
      'Fades, line-ups, braids, sanitation & skin-care',
      '144 hours classroom + paid OJT',
      'State Board prep + entrepreneurship module',
    ],
    funding: ['WRG', 'WIOA', 'Apprenticeship', 'Employer Partners'],
    cta: 'Apply via Indiana Career Connect',
    heroSrc: '/images/efh-barber-hero.jpg',
    cardSrc: '/images/efh-barber-card.jpg',
  },

  {
    slug: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    tagline: 'Care • Compassion • Independence',
    summary:
      'Prepare for entry-level healthcare roles with the Certified Nursing Assistant credential. Learn patient care, safety, documentation, and ethics to support hospital, long-term care, or home-health teams.',
    bullets: [
      'Patient care & safety protocols',
      'Vital signs, documentation & communication',
      'Professional role, ethics & client dignity',
    ],
    funding: ['WIOA', 'WRG', 'Employer Partners'],
    heroSrc: '/images/efh-cna-hero.jpg',
    cardSrc: '/images/efh-cna-card.jpg',
  },

  {
    slug: 'building-tech',
    name: 'Building Technician',
    tagline: 'Electrical • Construction • HVAC',
    summary:
      'Cross-trained foundations for facilities and field tech roles with pathways into apprenticeships.',
    bullets: [
      'Basic electrical (circuits, panels, safety)',
      'Construction fundamentals & power tools',
      'HVAC basics (refrigeration, airflow, service)',
    ],
    funding: ['WRG', 'WIOA', 'Employer Partners'],
    heroSrc: '/images/efh-building-tech-hero.jpg',
    cardSrc: '/images/efh-building-tech-card.jpg',
  },



  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    tagline: 'Content • Ads • Analytics',
    summary:
      'Practical marketing skills for small business—social, search, email, and analytics with real campaigns.',
    bullets: [
      'Social & content strategy',
      'Search & paid ads basics',
      'Analytics & reporting',
    ],
    funding: ['WRG', 'WIOA'],
    heroSrc: '/images/efh-dm-hero.jpg',
    cardSrc: '/images/efh-dm-card.jpg',
  },

  {
    slug: 'tax-office',
    name: 'Tax Office Startup',
    tagline: 'Launch • Operate • Grow',
    summary:
      'Learn the essentials to open and operate a compliant, client-ready tax preparation practice.',
    bullets: [
      'Intake & compliance workflows',
      'Software & e-file setup',
      'Client experience & growth plan',
    ],
    funding: ['WRG', 'WIOA'],
    heroSrc: '/images/efh-tax-hero.jpg',
    cardSrc: '/images/efh-tax-card.jpg',
  },
];
