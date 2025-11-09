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
    console.warn('⚠️  Supabase not configured - skipping connection test');
    return false;
  }

  try {
    console.log('🔌 Testing Supabase connection...');
    console.log('   URL:', supabaseUrl);
    console.log('   Key valid:', supabaseKey ? 'Yes' : 'No');

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
    console.error('Error type:', err.name);
    console.error('Error message:', err.message);
    return false;
  }
};
