import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/apply',
    '/programs',
    '/about',
    '/contact',
    '/blog',
    '/login',
    '/signup',
    '/auth',
    '/privacy',
    '/terms',
  ];

  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // Allow public routes
  if (isPublicRoute) {
    return response;
  }

  // Redirect to login if not authenticated
  if (!user) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Get user role from profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, active, verified, onboarding_completed, tenant_id')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  const role = profile.role;
  const pathname = request.nextUrl.pathname;

  // Role-based dashboard routing
  const dashboardRoutes: Record<string, string> = {
    student: '/lms/dashboard',
    admin: '/admin/dashboard',
    super_admin: '/admin/dashboard',
    org_admin: '/admin/dashboard',
    program_holder: '/program-holder/dashboard',
    employer: '/employer/dashboard',
    staff: '/staff-portal/dashboard',
    instructor: '/instructor/dashboard',
    workforce_board: '/workforce-board/dashboard',
  };

  // Redirect /dashboard to role-specific dashboard
  if (pathname === '/dashboard') {
    const targetDashboard = dashboardRoutes[role] || '/unauthorized';
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  // Enforce role-based access to dashboards
  if (pathname.startsWith('/lms') && role !== 'student') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (
    pathname.startsWith('/admin') &&
    !['admin', 'super_admin', 'org_admin'].includes(role)
  ) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/program-holder') && role !== 'program_holder') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/employer') && role !== 'employer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/staff-portal') && role !== 'staff') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/instructor') && role !== 'instructor') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (pathname.startsWith('/workforce-board') && role !== 'workforce_board') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Check if account is active (for staff/instructor)
  if (['staff', 'instructor'].includes(role) && !profile.active) {
    return NextResponse.redirect(new URL('/pending-approval', request.url));
  }

  // Check if employer is verified
  if (role === 'employer' && !profile.verified) {
    return NextResponse.redirect(new URL('/pending-verification', request.url));
  }

  // Check if program holder completed onboarding
  if (role === 'program_holder' && !profile.onboarding_completed) {
    return NextResponse.redirect(
      new URL('/onboarding/program-holder', request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
