import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use fallback values for development/preview if environment variables are not set
const supaUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supaAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

// Create a client that won't throw on initialization
let supaClient: SupabaseClient | null = null;

try {
  supaClient = createClient(supaUrl, supaAnon, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
} catch (err) {
  console.warn('Failed to initialize Supabase client:', err);
}

// Export with type assertion - callers should handle errors from failed queries
export const supa = supaClient!;

// Helper for typed errors
export function must<T>(value: T | null, msg = 'Not found') {
  if (value == null) throw new Error(msg);
  return value;
}
