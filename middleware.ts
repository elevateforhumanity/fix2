import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Handle elevateconnectsdirectory.org subdomain
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // Rewrite to admin dashboard
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  // Handle directory.elevateforhumanity.org subdomain
  if (hostname.startsWith('directory.')) {
    // Rewrite to admin dashboard
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
