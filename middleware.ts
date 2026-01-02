import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of public routes that should NEVER require authentication
  const publicRoutes = [
    '/',
    '/about',
    '/programs',
    '/contact',
    '/apply',
    '/pricing',
    '/apprenticeships',
    '/career-services',
    '/tax-filing',
    '/vita',
    '/rise-foundation',
    '/nonprofit',
    '/privacy-policy',
    '/terms-of-service',
    '/accessibility',
    '/refund-policy',
    '/programs-catalog',
    '/program-finder',
    '/compare-programs',
    '/courses',
    '/pathways',
    '/credentials',
    '/certificates',
    '/api/health',
    '/sitemap.xml',
    '/robots.txt',
  ];

  // Public route patterns (regex)
  const publicPatterns = [
    /^\/programs\/[^/]+$/,  // Individual program pages like /programs/cna
    /^\/rise-foundation\/.+$/,  // All rise-foundation subpages
    /^\/nonprofit\/.+$/,  // All nonprofit subpages
    /^\/api\/(?!admin|protected).+$/,  // Public API routes
    /^\/supersonic-fast-cash.*/,  // Supersonic Fast Cash pages
    /^\/kingdom-konnect.*/,  // Kingdom Konnect pages
    /^\/serene-comfort-care.*/,  // Serene Comfort Care pages
    /^\/urban-build-crew.*/,  // Urban Build Crew pages
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname) || 
    publicPatterns.some(pattern => pattern.test(pathname));

  // If it's a public route, allow it through without any auth checks
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes that SHOULD require authentication
  const protectedRoutes = [
    '/lms',
    '/admin',
    '/program-holder',
    '/staff-portal',
    '/student',
    '/onboarding',
    '/portal',
    '/workforce-board',
  ];

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // For protected routes, let the page handle auth (don't redirect here)
  // This allows the page to show proper error messages or redirect as needed
  if (isProtectedRoute) {
    return NextResponse.next();
  }

  // For all other routes, allow them through
  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
