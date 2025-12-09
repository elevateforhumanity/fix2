// lib/withAuth.ts - Centralized authentication wrapper
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, type AuthUser } from '@/lib/auth';
import type { UserRole } from '@/types/database';

type AuthOptions = {
  roles?: UserRole[];
  requireAuth?: boolean;
};

type AuthHandler = (
  req: NextRequest,
  context: any,
  user: AuthUser
) => Promise<Response>;

export function withAuth(
  handler: AuthHandler,
  options: AuthOptions = { requireAuth: true }
) {
  return async (req: NextRequest, context: any) => {
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

    // Call the handler with user context
    return handler(req, context, user!);
  };
}
