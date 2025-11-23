import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.elevateforhumanity.org';

  // Static pages - all public routes (150+ public pages)
  const staticPages = [
    '',
    '/about',
    '/accessibility',
    '/ai-chat',
    '/ai-tutor',
    '/aitutor',
    '/apply',
    '/apply/workflow',
    '/blog',
    '/board/dashboard',
    '/board/referrals',
    '/calendar',
    '/call-now',
    '/career-fair',
    '/career-services',
    '/careers',
    '/chat',
    '/community/communityhub',
    '/compare',
    '/contact',
    '/courses',
    '/courses/coursebuilder',
    '/courses/coursecatalog',
    '/courses/coursedetail',
    '/demo',
    '/directory',
    '/docs',
    '/docs/api',
    '/ecosystem',
    '/educatorhub',
    '/email',
    '/employers',
    '/enroll',
    '/enroll/apply',
    '/enroll/success',
    '/faq',
    '/file-manager',
    '/financial-aid',
    '/financial-aid/apply',
    '/forgotpassword',
    '/forms',
    '/funding/dol',
    '/funding/jri',
    '/funding/wioa',
    '/funding/wrg',
    '/fundingimpact',
    '/getstarted',
    '/government',
    '/groups',
    '/help',
    '/kingdomkonnect',
    '/legal/cookies',
    '/legal/privacy',
    '/legal/terms',
    '/login',
    '/marketplace',
    '/messages',
    '/mobile-app',
    '/notebooklm',
    '/notfound',
    '/offline',
    '/ojt-and-funding',
    '/onboarding',
    '/onboarding/handbook',
    '/onboarding/learner',
    '/onboarding/mou',
    '/onboarding/partner',
    '/onboarding/school',
    '/onboarding/staff',
    '/partner-application',
    '/partner/attendance',
    '/partner/dashboard',
    '/partners',
    '/partners/enroll',
    '/partners/mou',
    '/partners/portal',
    '/partners/training-provider',
    '/partners/workforce',
    '/philanthropy',
    '/platform',
    '/platform/partner-portal',
    '/platform/training-providers',
    '/platform/workforce-analytics',
    '/platform/workforce-boards',
    '/pricing',
    '/privacy-policy',
    '/programs',
    '/programs-full',
    '/programs/barber',
    '/programs/barber-apprenticeship',
    '/programs/building-maintenance',
    '/programs/building-tech',
    '/programs/cdl',
    '/programs/hvac',
    '/programs/hvac-tech',
    '/programs/hvac-technician',
    '/programs/medical-assistant',
    '/programs/truck-driving',
    '/programs/workforce-readiness',
    '/pwa-test',
    '/receptionist',
    '/refundpolicy',
    '/reports',
    '/resetpassword',
    '/resources',
    '/serenecomfortcare',
    '/share',
    '/sheets',
    '/signup',
    '/sites',
    '/slides',
    '/staff',
    '/start',
    '/success-stories',
    '/support',
    '/terms-of-service',
    '/thankyou',
    '/training-providers',
    '/unauthorized',
    '/urbanbuildcrew',
    '/usermanagement',
    '/verify-credential',
    '/verifycertificate',
    '/verifyemail',
    '/video',
    '/videos/barber-spotlight',
    '/videos/elevate-overview',
    '/videos/employer-pipeline',
    '/vita',
    '/what-we-offer',
    '/wioa-eligibility',
    '/workforce-partners',
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Skip dynamic content during build if no database connection
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || 
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      // console.log('Sitemap: Using static routes only (no database connection)');
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
      // console.log('Sitemap: Database query failed, using static routes only');
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
    // console.log('Sitemap: Error during generation, using static routes only');
    // Fallback to static sitemap if Supabase fails
    return staticSitemap;
  }
}
