import { MetadataRoute } from 'next';
import { createBuildTimeSupabaseClient } from '@/lib/auth';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.elevateforhumanity.org';

  // Static pages - COMPREHENSIVE LIST (128+ pages)
  const staticPages = [
    // Main pages
    '',
    '/about',
    '/programs',
    '/partners',
    '/contact',
    '/compare',
    '/demo',
    '/pricing',
    '/employers',
    '/success-stories',
    '/wioa-eligibility',
    '/financial-aid',
    '/video',
    '/unauthorized',
    '/workforce-partners',
    '/hub',
    '/connect',
    '/sister-sites',
    '/healthcare-services',
    '/operational-agreements',
    '/compliance',
    '/pay',
    
    // Program pages
    '/programs/barber-apprenticeship',
    '/programs/barber',
    '/programs/hvac-technician',
    '/programs/hvac',
    '/programs/hvac-tech',
    '/programs/medical-assistant',
    '/programs/building-maintenance',
    '/programs/building-tech',
    '/programs/truck-driving',
    '/programs/cdl',
    '/programs/workforce-readiness',
    '/programs/ai-data-science',
    '/programs/wioa-workforce',
    '/programs/professional-certifications',
    '/programs/community-connect',
    
    // Enrollment
    '/enroll',
    '/enroll/apply',
    '/enroll/success',
    '/partner-application',
    '/partners/enroll',
    
    // Auth
    '/login',
    '/signup',
    
    // LMS
    '/lms',
    '/lms/dashboard',
    '/lms/courses',
    '/lms/certificates',
    '/lms/progress',
    '/lms/calendar',
    '/lms/resources',
    '/lms/help',
    '/lms/messages',
    '/lms/profile',
    '/lms/settings',
    '/lms/notifications',
    '/lms/achievements',
    '/lms/leaderboard',
    
    // Student Portal
    '/student/dashboard',
    '/student/courses',
    '/student/certificates',
    '/student/progress',
    '/student/assignments',
    '/student/grades',
    '/student/schedule',
    '/student/resources',
    
    // Partner Portal
    '/partner/dashboard',
    '/partner/students',
    '/partner/reports',
    '/partner/settings',
    
    // Program Holder
    '/program-holder/dashboard',
    '/program-holder/apply',
    '/program-holder/cases',
    '/program-holder/mou',
    '/program-holder/certificates',
    '/program-holder/reports',
    '/program-holder/settings',
    
    // Delegate
    '/delegate/dashboard',
    '/delegate/students',
    '/delegate/reports',
    
    // Admin
    '/admin/dashboard',
    '/admin/courses',
    '/admin/students',
    '/admin/reports',
    '/admin/certificates',
    '/admin/program-holders',
    '/admin/delegates',
    '/admin/partners',
    '/admin/settings',
    '/admin/users',
    '/admin/analytics',
    '/admin/compliance',
    '/admin/audit-logs',
    '/admin/success',
    '/admin/tenants',
    '/admin/applications',
    '/admin/contacts',
    '/admin/course-authoring',
    
    // Courses
    '/courses',
    '/courses/catalog',
    '/courses/search',
    
    // Legal
    '/privacy',
    '/privacy-policy',
    '/terms',
    '/terms-of-service',
    '/cookies',
    '/accessibility',
    '/compliance',
    '/gdpr',
    '/ccpa',
    
    // Resources
    '/resources',
    '/faq',
    '/help',
    '/support',
    '/docs',
    '/guides',
    '/tutorials',
    '/blog',
    '/news',
    '/events',
    '/webinars',
    '/downloads',
    
    // Career Services
    '/career-services',
    '/job-board',
    '/resume-builder',
    '/interview-prep',
    '/career-coaching',
    
    // Community
    '/community',
    '/forums',
    '/discussions',
    '/alumni',
    '/testimonials',
    
    // Integrations
    '/integrations',
    '/integrations/zoom',
    '/integrations/teams',
    '/integrations/salesforce',
    '/integrations/workday',
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
        lastModified: program.created_at ? new Date(program.created_at) : new Date(),
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
