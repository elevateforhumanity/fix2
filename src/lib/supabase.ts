import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Don't crash if env vars are missing - allow preview/dev to render
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
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
    console.warn('⚠️  Supabase not configured - skipping connection test');
    return false;
  }

  try {
    console.log('🔌 Testing Supabase connection...');
    console.log('   URL:', supabaseUrl);
    console.log('   Key valid:', supabaseAnonKey ? 'Yes' : 'No');

    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      console.error('Error details:', error.message, error.code);
      return false;
    }

    console.log('✅ Supabase Integration Active!');
    console.log('   Programs found:', data?.length || 0);
    return true;
  } catch (err) {
    console.error('Supabase connection failed:', err);
    if (err instanceof Error) {
      console.error('Error type:', err.name);
      console.error('Error message:', err.message);
    }
    return false;
  }
};
