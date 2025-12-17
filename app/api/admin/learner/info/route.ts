import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/auth';
import { getUserById } from '@/lib/supabase-admin';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

async function getHandler(
  req: Request,
  context: Record<string, unknown>,
  user: Record<string, unknown>
) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get('user_id');

  if (!user_id) {
    return new Response('Missing user_id', { status: 400 });
  }

  try {
    const userData = await getUserById(user_id);

    if (!userData) {
      return new Response('User not found', { status: 404 });
    }

    return Response.json({
      id: userData.id,
      email: userData.email,
    });
  } catch (error) {
    logger.error('Error fetching user:', error);
    return new Response('Failed to fetch user', { status: 500 });
  }
}

// @ts-expect-error TS2345: Argument of type '(req: Request, context: Record<string, unknown>, user: Reco...
export const GET = withAuth(getHandler, {
  roles: ['admin', 'super_admin'],
});
