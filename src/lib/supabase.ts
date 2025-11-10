import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Don't crash if env vars are missing - allow preview/dev to render
if (!supabaseUrl || !supabaseAnonKey) {
    '⚠️  Supabase env vars not configured. Data features will be disabled.',
    '\nSet VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable.'
  );
}

// Export null if not configured, so components can check and render fallback
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      })
    : null;

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
    if (err instanceof Error) {
    }
    return false;
  }
};
