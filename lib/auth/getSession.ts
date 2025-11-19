// lib/auth/getSession.ts
// Helper to require authentication in server components
import { auth } from '@/app/api/auth/[...nextauth]/route';

export async function requireAuth() {
  const session = await auth();
  if (!session) {
    throw new Error('UNAUTHENTICATED');
  }
  return session;
}

export async function getSession() {
  return auth();
}
