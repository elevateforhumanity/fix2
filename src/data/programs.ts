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
    tagline: 'Start Your Career in the Barbering Industry',
    summary:
      'Earn while you learn with paid on-the-job training, related instruction, and State Board preparation.',
    bullets: [
      'Hands-on fades, line-ups, braids, sanitation',
      'Related instruction + exam prep',
      'Entrepreneurship & shop operations',
    ],
    funding: ['WRG', 'WIOA', 'Apprenticeship', 'Employer Partners'],
    cta: 'Apply via Indiana Career Connect',
    heroSrc: '/images/efh-barber-hero.jpg',
    cardSrc: '/images/efh-barber-card.jpg',
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
    slug: 'hvac',
    name: 'HVAC Technician',
    tagline: 'Install • Service • Maintain',
    summary:
      'Job-ready HVAC skills with safety, diagnostics, and customer service for residential/light commercial.',
    bullets: [
      'EPA 608 prep & refrigeration cycle',
      'Airflow, charging, brazing fundamentals',
      'Troubleshooting & service calls',
    ],
    funding: ['WRG', 'WIOA', 'Employer Partners'],
    heroSrc: '/images/efh-hvac-hero.jpg',
    cardSrc: '/images/efh-hvac-card.jpg',
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
