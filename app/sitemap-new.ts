import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
  
  // Consolidated static pages - only valid routes after consolidation
  const staticPages = [
    // Core Pages
    '',
    '/about',
    '/about/team',
    '/contact',
    '/programs',
    '/apply',
    '/funding',
    '/store',
    
    // Student Pages
    '/student/dashboard',
    '/student/courses',
    '/student/assignments',
    '/student/grades',
    '/student/certificates',
    '/student/profile',
    '/student/settings',
    '/student/messages',
    '/student/calendar',
    '/student/analytics',
    '/student/badges',
    '/student/ai-tutor',
    '/student/career-counseling',
    '/student/apprenticeship-hours',
    '/student/certifications/milady',
    '/student/competencies',
    '/student/discussions',
    '/student/instructor',
    '/student/integrations',
    '/student/jri',
    '/student/leaderboard',
    '/student/learning-paths',
    '/student/notifications',
    '/student/payments',
    '/student/peer-review',
    '/student/portfolio',
    '/student/progress',
    '/student/resources',
    '/student/study-groups',
    
    // Program Holder Pages
    '/program-holder',
    '/program-holder/dashboard',
    '/program-holder/courses/create',
    '/program-holder/grades',
    '/program-holder/how-to-use',
    '/program-holder/mou',
    '/program-holder/onboarding',
    '/program-holder/portal',
    '/program-holder/portal/attendance',
    '/program-holder/portal/live-qa',
    '/program-holder/portal/messages',
    '/program-holder/portal/reports',
    '/program-holder/portal/students',
    '/program-holder/settings',
    '/program-holder/sign-mou',
    '/program-holder/training',
    
    // Partner Pages
    '/partners',
    '/partners/careersafe',
    '/partners/create-program',
    '/partners/hsi',
    '/partners/jri',
    '/partners/mou',
    '/partners/nrf',
    '/partners/portal',
    '/partners/reentry',
    '/partners/sales',
    '/partners/technology',
    '/partners/training',
    '/partners/training-provider',
    '/partners/workforce',
    
    // Employer Pages
    '/employers',
    '/employers/intake',
    '/employer/dashboard',
    '/employer/opportunities',
    '/employer/analytics',
    
    // Platform Pages
    '/platform',
    '/platform/apps',
    '/platform/employer-portal',
    '/platform/licensing',
    '/platform/partner-portal',
    '/platform/student-portal',
    '/platform/training-providers',
    '/platform/workforce-analytics',
    '/platform/workforce-boards',
    
    // Funding Pages
    '/funding',
    '/funding/dol',
    '/funding/federal-programs',
    '/funding/grant-programs',
    '/funding/how-it-works',
    '/funding/jri',
    '/funding/state-programs',
    '/funding/wioa',
    '/funding/wrg',
    
    // Course Pages
    '/courses',
    '/courses/careersafe',
    '/courses/hsi',
    '/courses/nds',
    '/courses/nrf',
    '/courses/partners',
    
    // Community & Support
    '/community',
    '/support',
    '/help',
    '/faq',
    '/blog',
    '/events',
    '/webinars',
    
    // Legal & Compliance
    '/accessibility',
    '/academic-integrity',
    '/accreditation',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/cookies',
    '/dmca',
    '/equal-opportunity',
    '/ferpa',
    '/grievance',
    
    // Resources
    '/resources',
    '/docs',
    '/docs/admins',
    '/docs/api',
    '/docs/case-management',
    '/docs/lms',
    '/docs/program-holders',
    '/docs/reporting',
    '/docs/students',
    
    // Career Services
    '/career-services',
    '/ai-tutor',
    '/mentorship',
    
    // Other
    '/alumni',
    '/annual-report',
    '/apprenticeships',
    '/calendar',
    '/certificates/verify',
    '/compare',
    '/credentials',
    '/demo',
    '/donate',
    '/ecosystem',
    '/features',
    '/marketplace',
    '/mobile',
    '/orientation',
    '/philanthropy',
    '/pricing',
    '/search',
    '/all-pages',
    '/what-we-do',
    '/wioa-eligibility',
    
    // Auth Pages
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
    
    // Onboarding
    '/onboarding',
    '/onboarding/employer',
    '/onboarding/employer/orientation',
    '/onboarding/handbook',
    '/onboarding/learner',
    '/onboarding/mou',
    '/onboarding/partner',
    '/onboarding/school',
    '/onboarding/school/orientation',
    '/onboarding/staff',
    '/onboarding/staff/orientation',
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route.includes('/blog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.includes('/programs') || route.includes('/apply') ? 0.9 : 0.7,
  }));

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || 
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes('Content')) {
      return staticSitemap;
    }

    const supabase = createBuildTimeSupabaseClient();

    // Get dynamic program pages
    const { data: programs } = await supabase
      .from('programs')
      .select('slug, created_at')
      .eq('is_published', true);

    // Get blog posts if available
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    const sitemap: MetadataRoute.Sitemap = [
      ...staticSitemap,
      // Program pages
      ...(programs || []).map((program) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: program.created_at ? new Date(program.created_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
      // Blog posts
      ...(posts || []).map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ];

    return sitemap;
  } catch (err) {
    return staticSitemap;
  }
}
