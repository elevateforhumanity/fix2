import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elevateconnectsdirectory.org';

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

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const supabase = createBuildTimeSupabaseClient();

    // Get dynamic program pages - use created_at instead of updated_at
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('slug, created_at')
      .eq('status', 'active');

    // Skip courses table if it doesn't exist
    const courses = null;

    if (programsError) {
      console.error('Sitemap generation error:', { programsError });
      return staticSitemap;
    }

    const sitemap: MetadataRoute.Sitemap = [
      ...staticSitemap,

      // Program pages
      ...(programs || []).map((program) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: program.created_at ? new Date(program.created_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];

    return sitemap;
  } catch (err) {
    console.error('Sitemap generation failed, returning static sitemap:', err);
    // Fallback to static sitemap if Supabase fails
    return staticSitemap;
  }
}
