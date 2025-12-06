import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Static Supabase client for build-time operations
 * Use this in generateStaticParams and other build-time functions
 */
export function createStaticClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('[Supabase Static] Missing environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
