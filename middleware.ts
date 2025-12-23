// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow unauthenticated health checks
  if (pathname === '/api/health') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Apply middleware to everything except static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
