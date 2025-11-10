import { createClient } from '@supabase/supabase-js';

// SECURITY: Always use environment variables - never hardcode credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️  Supabase env vars not configured. Data features will be disabled.'
  );
  console.warn(
    '   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable.'
  );
}

// Export null if not configured - prevents crashes in preview/dev
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
    : null;

// Test connection and log status
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return false;
  }

  try {

    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .limit(1);

    if (error) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
