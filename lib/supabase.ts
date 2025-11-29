import { createBrowserClient } from '@supabase/ssr';

// Use placeholder values during build if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);

// Helper function for client components (replaces createClientComponentClient)
export function createClientComponentClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
