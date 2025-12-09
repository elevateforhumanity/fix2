// lib/with-auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export type UserRole = 'student' | 'admin' | 'super_admin' | 'program_holder';

export interface AuthedUser {
  id: string;
  email: string | null;
  role: UserRole | null;
}

// Get the current user + role from Supabase
async function getAuthedUser(req: NextRequest): Promise<AuthedUser | null> {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  // Adjust table/columns if your profile schema is different
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? null,
    role: (profile?.role as UserRole | null) ?? null,
  };
}

interface WithAuthOptions {
  roles?: UserRole[];
}

/**
 * Wraps a route handler and injects `user`.
 * Usage:
 * export const GET = withAuth(async (req, ctx, user) => { ... }, { roles: ['admin'] });
 */
export function withAuth<TContext = any>(
  handler: (req: NextRequest, context: TContext, user: AuthedUser) => Promise<Response> | Response,
  options: WithAuthOptions = {}
) {
  return async (req: NextRequest, context: TContext) => {
    const user = await getAuthedUser(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (options.roles && options.roles.length > 0) {
      if (!user.role || !options.roles.includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    return handler(req, context, user);
  };
}
