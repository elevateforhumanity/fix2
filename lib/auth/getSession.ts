// lib/auth/getSession.ts
// Helper to require authentication in server components
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('UNAUTHENTICATED');
  }
  return session;
}

export async function getSession() {
  return getServerSession(authOptions);
}
