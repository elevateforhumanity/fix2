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
    '/founder',
    '/team',
    '/learners',
    '/training-providers',
    '/for-employers',
    '/for-students',
    '/demos',
    '/blog',
    '/careers',
    '/calendar',
    '/apprenticeships',
  ];

  // Program pages (ETPL-approved only)
  const programPages = [
    '/programs/barber-apprenticeship',
    '/programs/hvac-technician',
    '/programs/cna-certification',
    '/programs/cdl-training',
    '/programs/direct-support-professional',
    '/programs/building-maintenance-tech',
    '/programs/business-startup-marketing',
    '/programs/emergency-health-safety-tech',
    '/programs/certified-peer-recovery-coach',
    '/programs/tax-prep-financial-services',
    '/programs/beauty-career-educator',
    '/programs/professional-esthetician',
    '/programs/phlebotomy-technician',
    '/programs/skilled-trades',
    '/programs/apprenticeships',
    '/programs/federal-funded',
    '/programs/jri',
    '/programs/micro-programs',
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
  const aboutPages = ['/what-we-do'];

  // Legal pages
  const legalPages = [
    '/privacy-policy',
    '/terms-of-service',
    '/accessibility',
    '/ferpa',
    '/equal-opportunity',
  ];

  // Community pages
  const communityPages = ['/forums', '/study-groups', '/community'];

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
    changeFrequency:
      page === ''
        ? 'daily'
        : page.includes('/programs/')
          ? 'weekly'
          : 'monthly',
    priority:
      page === ''
        ? 1.0
        : page.includes('/programs/')
          ? 0.9
          : page.includes('/apply')
            ? 0.95
            : 0.7,
  }));
}
