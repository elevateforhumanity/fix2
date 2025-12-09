// lib/withAuth.ts - Centralized authentication wrapper
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, type AuthUser } from '@/lib/auth';
import type { UserRole } from '@/types/database';

type AuthOptions = {
  roles?: UserRole[];
  requireAuth?: boolean;
};

type AuthedContext<TParams = any> = {
  params: TParams;
  user: AuthUser;
};

type AuthHandler<TParams = any> = (
  req: NextRequest,
  context: AuthedContext<TParams>
) => Promise<Response> | Response;

export function withAuth<TParams = any>(
  handler: AuthHandler<TParams>,
  options: AuthOptions = { requireAuth: true }
) {
  return async (req: NextRequest, context: { params: TParams }) => {
    // Get authenticated user
    const user = await getAuthUser();

    // Check if authentication is required
    if (options.requireAuth && !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check role-based access
    if (options.roles && user) {
      if (!options.roles.includes(user.role)) {
        console.warn('Unauthorized access attempt:', {
          userId: user.id,
          role: user.role,
          requiredRoles: options.roles,
          path: req.nextUrl.pathname,
        });
        
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
    }

    // Pass user inside context object
    return handler(req, { ...context, user: user! });
  };
}
