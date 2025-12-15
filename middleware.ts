import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect map for consolidated pages
  const redirects: Record<string, string> = {
    // Student Portal Consolidation - redirect to /student/*
    '/portal/student': '/student/dashboard',
    '/portal/student/dashboard': '/student/dashboard',
    '/portal/student/courses': '/student/courses',
    '/portal/student/assignments': '/student/assignments',
    '/portal/student/grades': '/student/grades',
    '/portal/student/certificates': '/student/certificates',
    '/portal/student/profile': '/student/profile',
    '/portal/student/settings': '/student/settings',
    '/portal/student/messages': '/student/messages',
    '/portal/student/calendar': '/student/calendar',
    '/portal/student/analytics': '/student/analytics',
    '/portal/student/badges': '/student/badges',
    '/portal/student/ai-tutor': '/student/ai-tutor',
    '/portal/student/career-counseling': '/student/career-counseling',
    '/portal/student/apprenticeship-hours': '/student/apprenticeship-hours',
    '/portal/student/apprenticeship/hours': '/student/apprenticeship-hours',
    '/portal/student/certifications/milady': '/student/certifications/milady',
    '/portal/student/competencies': '/student/competencies',
    '/portal/student/discussions': '/student/discussions',
    '/portal/student/hub': '/student/dashboard',
    '/portal/student/studenthub': '/student/dashboard',
    '/portal/student/i18n': '/student/settings',
    '/portal/student/instructor': '/student/instructor',
    '/portal/student/integrations': '/student/integrations',
    '/portal/student/jri': '/student/jri',
    '/portal/student/leaderboard': '/student/leaderboard',
    '/portal/student/learning-path': '/student/learning-paths',
    '/portal/student/learning-paths': '/student/learning-paths',
    '/portal/student/milady-lms': '/student/courses',
    '/portal/student/notifications': '/student/notifications',
    '/portal/student/payments': '/student/payments',
    '/portal/student/peer-review': '/student/peer-review',
    '/portal/student/portfolio': '/student/portfolio',
    '/portal/student/privacy': '/student/settings',
    '/portal/student/accessibility': '/student/settings',
    '/portal/student/progress': '/student/progress',
    '/portal/student/resources': '/student/resources',
    '/portal/student/scorm': '/student/courses',
    '/portal/student/skills-gap': '/student/analytics',
    '/portal/student/study-groups': '/student/study-groups',
    '/portal/student/success': '/student/dashboard',
    '/portal/student/support': '/support',
    '/portal/student/video': '/student/courses',
    '/student-portal': '/student/dashboard',

    // Apply Pages Consolidation - redirect to /apply
    '/apprenticeships/apply': '/apply',
    '/financial-aid/apply': '/apply',
    '/marketplace/apply': '/apply',
    '/marketplace/apply/success': '/apply',
    '/shop/apply': '/apply',
    '/apply/full': '/apply',
    '/programs/admin/apply': '/apply',
    '/program-holder/apply': '/apply',

    // Contact Pages Consolidation - redirect to /contact
    '/support/contact': '/contact',
    '/urban-build-crew/contact': '/contact',

    // Programs Pages Consolidation - redirect to /programs
    '/programs-full': '/programs',
    '/programs-lms': '/programs',

    // Business-Specific Pages - redirect to main site
    '/serene-comfort-care': '/',
    '/serene-comfort-care/apply': '/apply',
    '/serene-comfort-care/care-team': '/team',
    '/serene-comfort-care/services': '/programs',
    '/serenecomfortcare': '/',

    '/supersonic-cash': '/',
    '/supersonic-fast-cash': '/',
    '/supersonicfastcash': '/',
    '/supersonic': '/',

    '/urban-build-crew': '/',
    '/urbanbuildcrew': '/',

    '/rise-foundation': '/',
    '/rise-foundation/about': '/about',
    '/rise-foundation/get-involved': '/volunteer',
    '/rise-foundation/programs': '/programs',
    '/rise': '/',

    '/kingdom-konnect': '/',
    '/kingdom-konnect/events': '/events',
    '/kingdom-konnect/mission': '/about',
    '/kingdom-konnect/programs': '/programs',
    '/kingdomkonnect': '/',

    '/selfish-inc': '/',

    // Duplicate AI Tutor pages
    '/aitutor': '/ai-tutor',

    // Duplicate password reset pages
    '/forgotpassword': '/auth/forgot-password',
    '/resetpassword': '/auth/reset-password',

    // Duplicate refund pages
    '/refundpolicy': '/refund-policy',
    '/refunds': '/refund-policy',

    // Duplicate privacy pages
    '/privacy-policy': '/privacy',

    // Duplicate terms pages
    '/terms-of-service': '/terms',

    // Staff Portal Consolidation
    '/staff-portal': '/portal/staff',
    '/staff-portal/dashboard': '/portal/staff/dashboard',
    '/staff-portal/courses': '/portal/staff/courses',
    '/staff-portal/students': '/portal/staff/students',
    '/staff': '/portal/staff',

    // Program Holder/Admin Consolidation
    '/programs/admin': '/program-holder',
    '/programs/admin/dashboard': '/program-holder/dashboard',
    '/programs/admin/courses/create': '/program-holder/courses/create',
    '/programs/admin/grades': '/program-holder/grades',
    '/programs/admin/how-to-use': '/program-holder/how-to-use',
    '/programs/admin/mou': '/program-holder/mou',
    '/programs/admin/portal': '/program-holder/portal',
    '/programs/admin/portal/attendance': '/program-holder/portal/attendance',
    '/programs/admin/portal/live-qa': '/program-holder/portal/live-qa',
    '/programs/admin/portal/messages': '/program-holder/portal/messages',
    '/programs/admin/portal/reports': '/program-holder/portal/reports',
    '/programs/admin/portal/students': '/program-holder/portal/students',
    '/programs/admin/settings': '/program-holder/settings',
    '/programs/admin/sign-mou': '/program-holder/sign-mou',
    '/programs/admin/training': '/program-holder/training',

    // Duplicate demo pages
    '/demos': '/demo',
    '/demo/supersonic': '/demo',
    '/demo/vita': '/demo',

    // Duplicate login pages
    '/admin-login': '/admin/login',

    // Duplicate signup pages
    '/signup': '/auth/signup',

    // Duplicate verify pages
    '/verifycertificate': '/certificates/verify',
    '/verifyemail': '/verify',

    // Duplicate tax pages
    '/tax-services': '/tax-filing',
    '/tax-self-prep': '/tax-filing',

    // Duplicate workforce pages
    '/workforce-partners': '/partners/workforce',
    '/workforce-board': '/partners/workforce',

    // Duplicate training provider pages
    '/training-providers': '/partners/training-provider',

    // Duplicate what pages
    '/what-we-offer': '/what-we-do',

    // Duplicate success stories
    '/success-stories': '/alumni',

    // Duplicate community pages
    '/community/communityhub': '/community',
    '/community/admins': '/community',
    '/community/developers': '/community',
    '/community/teachers': '/community',

    // Duplicate educator pages
    '/educatorhub': '/instructor/dashboard',

    // Duplicate compare pages
    '/compare-programs': '/compare',

    // Duplicate career pages
    '/career-center': '/career-services',
    '/career-fair': '/career-services',

    // Duplicate help pages
    '/help/tutorials': '/help',

    // Duplicate mobile pages
    '/mobile-app': '/mobile',

    // Duplicate video pages
    '/videos': '/video',

    // Duplicate message pages
    '/messages': '/chat',

    // Duplicate calendar pages - keep /calendar as main
    // (no redirect needed)

    // Duplicate course pages
    '/courses/catalog': '/courses',
    '/courses/coursedetail': '/courses',
    '/create-course': '/admin/courses/create',

    // Duplicate curriculum pages
    '/curriculumupload': '/admin/curriculum/upload',

    // Duplicate file pages
    '/file-manager': '/admin/files',

    // Duplicate document pages
    '/downloads': '/resources',

    // Duplicate sitemap pages
    '/sitemap-page': '/all-pages',

    // Duplicate notfound pages
    '/notfound': '/404',

    // Duplicate user management
    '/usermanagement': '/admin/users',

    // Duplicate syllabi
    '/syllabi': '/resources',

    // Duplicate workbooks
    '/workbooks': '/resources',

    // Duplicate webinars
    '/webinars': '/events',

    // Duplicate volunteer
    '/volunteer': '/get-involved',

    // Duplicate transparency
    '/transparency': '/annual-report',

    // Duplicate team
    '/team': '/about/team',

    // Duplicate thankyou
    '/thankyou': '/apply',

    // Duplicate test pages - redirect to admin
    '/test-enrollment': '/admin',
    '/test-stripe-iframe': '/admin',

    // Duplicate unauthorized
    '/unauthorized': '/login',

    // Duplicate verify credential
    '/verify-credential': '/certificates/verify',

    // Duplicate sheets/slides
    '/sheets': '/resources',
    '/slides': '/resources',

    // Duplicate share
    '/share': '/resources',

    // Duplicate reels
    '/reels': '/media-showcase',

    // Duplicate receptionist
    '/receptionist': '/admin',

    // Duplicate pwa-test
    '/pwa-test': '/',

    // Duplicate pay
    '/pay': '/payment',

    // Duplicate pathways
    '/pathways': '/programs',

    // Duplicate parent portal
    '/parent-portal': '/portal/parent',

    // Duplicate orientation
    '/orientation/competency-test': '/orientation',
    '/orientation/dashboard-guide': '/orientation',
    '/orientation/schedule': '/orientation',

    // Duplicate ojt
    '/ojt-and-funding': '/funding',

    // Duplicate offline
    '/offline': '/',

    // Duplicate notebooklm
    '/notebooklm': '/ai-tutor',

    // Duplicate news
    '/news': '/blog',

    // Duplicate micro-classes
    '/micro-classes': '/courses',

    // Duplicate mentorship
    '/mentorship': '/career-services',

    // Duplicate media showcase
    '/media-showcase': '/resources',

    // Duplicate marketplace thank you
    '/marketplace/thank-you': '/marketplace',

    // Duplicate leaderboard
    '/leaderboard': '/student/leaderboard',

    // Duplicate learners
    '/learners': '/students',

    // Duplicate jri
    '/jri': '/funding/jri',

    // Duplicate hire graduates
    '/hire-graduates': '/employers',

    // Duplicate how it works
    '/how-it-works': '/about',

    // Duplicate groups
    '/groups': '/study-groups',

    // Duplicate grievance
    '/grievance': '/support',

    // Duplicate grants
    '/grants': '/funding/grant-programs',

    // Duplicate government
    '/government': '/partners/workforce',

    // Duplicate getstarted
    '/getstarted': '/apply',

    // Duplicate fundingimpact
    '/fundingimpact': '/funding',

    // Duplicate founder
    '/founder': '/about/team',

    // Duplicate forums
    '/forums': '/community',

    // Duplicate forms
    '/forms': '/resources',

    // Duplicate ferpa training
    '/ferpa/training/complete': '/ferpa/training',

    // Duplicate features
    '/features': '/platform',

    // Duplicate faq
    '/faq': '/help',

    // Duplicate events
    // (keep as is)

    // Duplicate equal opportunity
    '/equal-opportunity': '/accessibility',

    // Duplicate enroll success
    '/enroll/success': '/enroll',

    // Duplicate enhanced home
    '/enhanced-home': '/',

    // Duplicate employers intake
    '/employers/intake': '/employers',

    // Duplicate employer post job
    '/employer/post-job': '/employer/opportunities',

    // Duplicate employer placements
    '/employer/placements': '/employer/opportunities',

    // Duplicate employee pages
    '/employee/documents': '/employee',
    '/employee/payroll': '/employee',
    '/employee/time-off': '/employee',

    // Duplicate email
    '/email': '/messages',

    // Duplicate elevatelearn2earn
    '/elevatelearn2earn': '/',

    // Duplicate ecosystem
    '/ecosystem': '/platform',

    // Duplicate donate
    '/donate': '/philanthropy',

    // Duplicate docs ENV
    '/docs/ENV_CONFIG.md': '/docs',

    // Duplicate dmca
    '/dmca': '/legal',

    // Duplicate directory
    '/directory': '/all-pages',

    // Duplicate dev-admin
    '/dev-admin': '/admin',

    // Duplicate delegate messages
    '/delegate/messages': '/delegate/dashboard',

    // Duplicate delegate reports export
    '/delegate/reports/export': '/delegate/reports',

    // Duplicate delegate students
    '/delegate/students': '/delegate/dashboard',

    // Duplicate creator pages
    '/creator/dashboard': '/marketplace',
    '/creator/products': '/marketplace',

    // Duplicate credentials
    '/credentials': '/certificates',

    // Duplicate consumer education
    '/consumer-education': '/resources',

    // Duplicate cookies
    '/cookies': '/privacy',

    // Duplicate checkout pages
    '/checkout/career': '/checkout',
    '/checkout/student': '/checkout',

    // Duplicate chat
    '/chat': '/messages',

    // Duplicate cert verify
    '/cert/verify': '/certificates/verify',

    // Duplicate career fair
    // (already handled above)

    // Duplicate card
    '/card': '/pay',

    // Duplicate call now
    '/call-now': '/contact',

    // Duplicate calendar
    // (keep as is)

    // Duplicate booking
    '/booking': '/contact',

    // Duplicate board pages
    '/board/dashboard': '/admin',
    '/board/referrals': '/admin',

    // Duplicate blog search
    '/blog/search': '/blog',

    // Duplicate approvals
    '/approvals': '/admin',

    // Duplicate apprenticeships
    // (keep as is)

    // Duplicate annual report
    // (keep as is)

    // Duplicate alumni
    // (keep as is)

    // Duplicate all pages
    // (keep as is)

    // Duplicate ai chat
    '/ai-chat': '/ai-tutor',

    // Duplicate advising
    '/advising': '/career-services',

    // Duplicate accreditation
    // (keep as is)

    // Duplicate accessibility
    // (keep as is)

    // Duplicate academic integrity
    // (keep as is)

    // Duplicate about team
    // (keep as is)
  };

  // Check if current path needs redirect
  if (redirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirects[pathname];
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Handle dynamic routes with patterns
  // Example: /portal/student/courses/[courseId] -> /student/courses/[courseId]
  if (pathname.startsWith('/portal/student/courses/')) {
    const courseId = pathname.split('/')[4];
    return NextResponse.redirect(new URL(`/student/courses/${courseId}`, request.url), 301);
  }

  if (pathname.startsWith('/programs/admin/programs/')) {
    const programId = pathname.split('/')[4];
    return NextResponse.redirect(new URL(`/program-holder/programs/${programId}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};
