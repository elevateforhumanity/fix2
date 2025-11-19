import { createClient } from '@supabase/supabase-js';

const supaUrl = (import.meta.env?.VITE_SUPABASE_URL as string) || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supaAnon = (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supa = createClient(supaUrl, supaAnon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// Helper for typed errors
export function must<T>(value: T | null, msg = 'Not found') {
  if (value == null) throw new Error(msg);
  return value;
}
