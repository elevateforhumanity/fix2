import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elevateconnectsdirectory.org';
  const supabase = createBuildTimeSupabaseClient();

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/pricing',
    '/login',
    '/signup',
    '/privacy-policy',
    '/lms',
    '/lms/courses',
    '/lms/dashboard',
    '/program-holder/apply',
  ];

  // Get dynamic program pages
  const { data: programs } = await supabase
    .from('programs')
    .select('slug, updated_at')
    .eq('status', 'active');

  // Get dynamic course pages
  const { data: courses } = await supabase
    .from('courses')
    .select('id, updated_at')
    .eq('published', true);

  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),

    // Program pages
    ...(programs || []).map((program) => ({
      url: `${baseUrl}/programs/${program.slug}`,
      lastModified: new Date(program.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Course pages
    ...(courses || []).map((course) => ({
      url: `${baseUrl}/lms/courses/${course.id}`,
      lastModified: new Date(course.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return sitemap;
}
