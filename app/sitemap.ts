import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.elevateforhumanity.org';
  const currentDate = new Date();

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/apply',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
    '/apprenticeships',
    '/employer',
    '/volunteer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Program pages
  const programs = [
    'medical-assistant',
    'hvac',
    'cdl-transportation',
    'barber-apprenticeship',
    'building-maintenance',
    'cna',
    'business-financial',
    'tax-preparation',
  ].map((program) => ({
    url: `${baseUrl}/programs/${program}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...programs];
}
