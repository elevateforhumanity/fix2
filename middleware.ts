import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;
  const response = NextResponse.next();

  // Initialize Supabase client
  const { supabase, response: supabaseResponse } = createClient(request);

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ============================================================================
  // DOMAIN 1: www.elevateeducationedu.com - LMS/Student Portal
  // ============================================================================
  if (hostname.includes('elevateeducationedu.com')) {
    // Allow public pages
    if (
      pathname === '/' ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup') ||
      pathname.startsWith('/reset-password') ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/api')
    ) {
      return supabaseResponse;
    }

    // Require authentication for all other pages
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is a student
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile && profile.role !== 'student' && profile.role !== 'apprentice') {
      // Non-students trying to access LMS - redirect to appropriate portal
      if (profile.role === 'admin' || profile.role === 'super_admin') {
        return NextResponse.redirect(
          new URL('https://www.elevateconnectsdirectory.org/admin')
        );
      }
      if (profile.role === 'staff') {
        return NextResponse.redirect(
          new URL('https://www.elevateconnectsdirectory.org/staff-portal')
        );
      }
      if (profile.role === 'program_owner') {
        return NextResponse.redirect(
          new URL('https://www.elevateconnectsdirectory.org/program-holder/portal')
        );
      }
    }

    return supabaseResponse;
  }

  // ============================================================================
  // DOMAIN 2: www.elevateconnectsdirectory.org - Admin/Back Office
  // ============================================================================
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // Allow login pages
    if (
      pathname.startsWith('/admin/login') ||
      pathname.startsWith('/staff-portal/login') ||
      pathname.startsWith('/program-holder/login') ||
      pathname.startsWith('/workforce-board/login') ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/api')
    ) {
      return supabaseResponse;
    }

    // Require authentication for all other pages
    if (!user) {
      // Determine which login page based on path
      let loginPath = '/admin/login';
      if (pathname.startsWith('/staff-portal')) {
        loginPath = '/staff-portal/login';
      } else if (pathname.startsWith('/program-holder')) {
        loginPath = '/program-holder/login';
      } else if (pathname.startsWith('/workforce-board')) {
        loginPath = '/workforce-board/login';
      }

      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check user role and restrict access
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Admin routes - require admin or super_admin
    if (pathname.startsWith('/admin')) {
      if (profile.role !== 'admin' && profile.role !== 'super_admin') {
        return NextResponse.redirect(
          new URL('/admin/login?error=unauthorized', request.url)
        );
      }
    }

    // Staff portal - require staff, admin, or super_admin
    if (pathname.startsWith('/staff-portal')) {
      if (
        profile.role !== 'staff' &&
        profile.role !== 'admin' &&
        profile.role !== 'super_admin'
      ) {
        return NextResponse.redirect(
          new URL('/staff-portal/login?error=unauthorized', request.url)
        );
      }
    }

    // Program holder portal - require program_owner, admin, or super_admin
    if (pathname.startsWith('/program-holder/portal')) {
      if (
        profile.role !== 'program_owner' &&
        profile.role !== 'admin' &&
        profile.role !== 'super_admin'
      ) {
        return NextResponse.redirect(
          new URL('/program-holder/login?error=unauthorized', request.url)
        );
      }
    }

    // Workforce board - require workforce_board, admin, or super_admin
    if (pathname.startsWith('/workforce-board')) {
      if (
        profile.role !== 'workforce_board' &&
        profile.role !== 'admin' &&
        profile.role !== 'super_admin'
      ) {
        return NextResponse.redirect(
          new URL('/workforce-board/login?error=unauthorized', request.url)
        );
      }
    }

    return supabaseResponse;
  }

  // ============================================================================
  // DOMAIN 3: www.elevateforhumanity.org - Public Website + All Portals
  // ============================================================================
  if (hostname.includes('elevateforhumanity.org')) {
    // Public pages - no authentication required
    const publicPaths = [
      '/',
      '/about',
      '/programs',
      '/apply',
      '/contact',
      '/blog',
      '/success-stories',
      '/funding',
      '/faq',
      '/careers',
      '/employers',
      '/partners',
      '/program-holder',
      '/snap-et-partner',
      '/login',
      '/signup',
      '/reset-password',
      '/auth',
      '/api',
    ];

    const isPublicPath = publicPaths.some(
      (path) => pathname === path || pathname.startsWith(path)
    );

    if (isPublicPath) {
      return supabaseResponse;
    }

    // Admin routes - require authentication and admin role
    if (pathname.startsWith('/admin')) {
      if (!user) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile && profile.role !== 'admin' && profile.role !== 'super_admin') {
        return NextResponse.redirect(
          new URL('/admin/login?error=unauthorized', request.url)
        );
      }

      return supabaseResponse;
    }

    // Staff portal - require authentication and staff role
    if (pathname.startsWith('/staff-portal')) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (
        profile &&
        profile.role !== 'staff' &&
        profile.role !== 'admin' &&
        profile.role !== 'super_admin'
      ) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
      }

      return supabaseResponse;
    }

    // Student portal and LMS - require authentication
    if (pathname.startsWith('/student') || pathname.startsWith('/lms')) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      return supabaseResponse;
    }

    // Program holder portal - require authentication
    if (pathname.startsWith('/program-holder/portal')) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (
        profile &&
        profile.role !== 'program_owner' &&
        profile.role !== 'admin' &&
        profile.role !== 'super_admin'
      ) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
      }

      return supabaseResponse;
    }

    return supabaseResponse;
  }

  // Default - allow request
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
