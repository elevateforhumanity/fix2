// lib/auth/getSession.ts
// Helper to require authentication in server components
import { createClient } from '@/lib/supabase/server';

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('UNAUTHENTICATED');
  }
  
  return { user };
}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return user ? { user } : null;
}
