import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const currentDate = new Date().toISOString();

  // Main pages
  const mainPages = [
    '',
    '/about',
    '/programs',
    '/funding',
    '/apply',
    '/contact',
    '/employers',
    '/partners',
    '/resources',
    '/faq',
    '/how-it-works',
    '/success-stories',
  ];

  // Program pages
  const programPages = [
    '/programs/barber-apprenticeship',
    '/programs/hvac-technician',
    '/programs/cna',
    '/programs/direct-support-professional',
    '/programs/building-maintenance',
    '/programs/business-startup',
    '/programs/cdl',
    '/programs/drug-collector',
    '/programs/home-health-aide',
    '/programs/peer-recovery-coach',
    '/programs/tax-preparation',
    '/programs/workforce-readiness',
  ];

  // Funding pages
  const fundingPages = [
    '/funding/wioa',
    '/funding/wrg',
    '/funding/jri',
    '/wioa-eligibility',
    '/financial-aid',
    '/grants',
  ];

  // About pages
  const aboutPages = [
    '/about/team',
    '/about/founder',
    '/what-we-do',
    '/annual-report',
  ];

  // Legal pages
  const legalPages = [
    '/privacy-policy',
    '/terms-of-service',
    '/accessibility',
    '/ferpa',
    '/equal-opportunity',
  ];

  // Community pages
  const communityPages = [
    '/forums',
    '/study-groups',
    '/community',
    '/blog',
  ];

  const allPages = [
    ...mainPages,
    ...programPages,
    ...fundingPages,
    ...aboutPages,
    ...legalPages,
    ...communityPages,
  ];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: currentDate,
    changeFrequency: page === '' ? 'daily' : page.includes('/programs/') ? 'weekly' : 'monthly',
    priority: page === '' ? 1.0 : page.includes('/programs/') ? 0.9 : page.includes('/apply') ? 0.95 : 0.7,
  }));
}
