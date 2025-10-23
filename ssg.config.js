const toAbsoluteUrl = (siteUrl, path) => {
  const normalizedSite = siteUrl.replace(/\/$/, '');
  return `${normalizedSite}${path.startsWith('/') ? path : `/${path}`}`;
};

const SITE_URL = process.env.SITE_URL || 'https://elevateforhumanity.pages.dev';
const BRAND_NAME = process.env.BRAND_NAME || 'Elevate for Humanity';
const CITY = process.env.CITY || 'Indianapolis';
const STATE = process.env.STATE || 'IN';
const PHONE = process.env.PHONE || '317-314-3757';
const EMAIL = process.env.EMAIL || 'info@elevateforhumanity.org';

const staticPages = [
  {
    path: '/',
    title: `${BRAND_NAME} | WIOA-Funded Career Training in ${CITY}, ${STATE}`,
    description:
      'Launch in-demand careers with WIOA-funded training, apprenticeships, and certifications. 92% job placement and zero tuition for qualifying learners.',
    priority: 1,
    changefreq: 'daily',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/programs',
    title: `Career Training Programs | ${BRAND_NAME}`,
    description:
      'Compare fully-funded programs in healthcare, construction, CDL, technology, and beauty. Every cohort includes wrap-around services and employer placement.',
    priority: 0.9,
    changefreq: 'daily',
    image: '/programs/placeholder.jpg',
  },
  {
    path: '/get-started',
    title: `Get Started | ${BRAND_NAME}`,
    description:
      'Choose your track, submit your intake form, and meet with our advisors to unlock tuition-free training backed by WIOA and state workforce grants.',
    priority: 0.8,
    changefreq: 'weekly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/apply',
    title: `Apply for Training | ${BRAND_NAME}`,
    description:
      'One application unlocks access to scholarships, wraparound support, and employer-connected apprenticeships. Submit in minutes—no application fee.',
    priority: 0.8,
    changefreq: 'weekly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/connect',
    title: `Contact ${BRAND_NAME}`,
    description: `Talk with our workforce specialists about funding, employer partnerships, or custom cohorts across ${CITY}, ${STATE}.`,
    priority: 0.7,
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/analytics',
    title: `Workforce Analytics Platform | ${BRAND_NAME}`,
    description:
      'Real-time dashboards for enrollments, completions, and placement across every program. Built on Supabase with secure access for partners.',
    priority: 0.6,
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/donate',
    title: `Support Scholarships | ${BRAND_NAME}`,
    description:
      'Fuel scholarships, childcare, and transportation so every learner can complete their training. 100% of donations stay in the community.',
    priority: 0.6,
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/federal-apprenticeships',
    title: `Federal Apprenticeships | ${BRAND_NAME}`,
    description:
      'Discover DOL Registered Apprenticeships with stackable credentials, wage progression, and employer sponsorship across critical industries.',
    priority: 0.6,
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
  {
    path: '/analytics.html',
    title: `Analytics Overview | ${BRAND_NAME}`,
    description:
      'Pre-rendered analytics dashboard overview for crawler access. Includes schema markup and snapshot KPI summaries.',
    priority: 0.5,
    changefreq: 'monthly',
    image: '/assets/og/efh-hero.png',
  },
];

const programPages = [
  {
    slug: 'cna-hha',
    title: `CNA & HHA Certification Program | ${BRAND_NAME}`,
    description:
      'State-aligned CNA/HHA training with clinical rotations, employer partners, and guaranteed WIOA funding. Finish in 4–8 weeks with job placement.',
    image: '/programs/cna.jpg',
  },
  {
    slug: 'welding-aws',
    title: `AWS SENSE Welding Program | ${BRAND_NAME}`,
    description:
      'Hands-on welding labs, AWS SENSE credentials, and OSHA-aligned safety training. Prepare for union apprenticeships in under 10 weeks.',
    image: '/programs/welding.jpg',
  },
  {
    slug: 'nail-tech',
    title: `Nail Technician Licensing Program | ${BRAND_NAME}`,
    description:
      'Salon-ready nail technology training with state board prep, sanitation, and entrepreneurship coaching for beauty professionals.',
    image: '/programs/nails.jpg',
  },
  {
    slug: 'cdl',
    title: `CDL Class A/B Training | ${BRAND_NAME}`,
    description:
      'Permit prep, simulator training, and employer onboarding for Class A/B drivers. Graduate in 3–6 weeks with paid placement support.',
    image: '/programs/cdl.jpg',
  },
  {
    slug: 'office-tech',
    title: `Office Tech & AI Career Program | ${BRAND_NAME}`,
    description:
      'Master modern office workflows—Docs, Sheets, CRM, automation, and AI copilots—with career services tailored to administrative roles.',
    image: '/programs/office.jpg',
  },
  {
    slug: 'osha10',
    title: `OSHA-10 & CPR Safety Certification | ${BRAND_NAME}`,
    description:
      'Earn OSHA-10 plus CPR/AED credentials in a rapid bootcamp. Perfect for construction, manufacturing, and facility teams.',
    image: '/programs/osha.jpg',
  },
].map((program) => ({
  path: `/programs/${program.slug}`,
  priority: 0.75,
  changefreq: 'weekly',
  ...program,
}));

const routes = [...staticPages, ...programPages].map((route) => ({
  ...route,
  loc: toAbsoluteUrl(SITE_URL, route.path),
  image: toAbsoluteUrl(SITE_URL, route.image || '/assets/og/efh-hero.png'),
  alternates: route.alternates || [],
  lastmod: route.lastmod || new Date().toISOString(),
  meta: {
    brand: BRAND_NAME,
    city: CITY,
    state: STATE,
    phone: PHONE,
    email: EMAIL,
    ...route.meta,
  },
}));

export const siteUrl = SITE_URL;
export { routes };
export default {
  siteUrl: SITE_URL,
  routes,
};
