import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elevateforhumanity.org';

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
    // Skip dynamic content during build if no database connection
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
    ) {
      console.log('Sitemap: Using static routes only (no database connection)');
      return staticSitemap;
    }

    const supabase = createBuildTimeSupabaseClient();

    // Get dynamic program pages - use created_at instead of updated_at
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select('slug, created_at')
      .eq('is_published', true);

    // Skip courses table if it doesn't exist
    const courses = null;

    if (programsError) {
      console.log('Sitemap: Database query failed, using static routes only');
      return staticSitemap;
    }

    const sitemap: MetadataRoute.Sitemap = [
      ...staticSitemap,

      // Program pages
      ...(programs || []).map((program) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: program.created_at
          ? new Date(program.created_at)
          : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];

    return sitemap;
  } catch (err) {
    console.log('Sitemap: Error during generation, using static routes only');
    // Fallback to static sitemap if Supabase fails
    return staticSitemap;
  }
}
