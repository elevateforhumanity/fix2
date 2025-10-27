import { createClient } from '@supabase/supabase-js';

// SECURITY: Always use environment variables - never hardcode credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration');
  console.error('   Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.error('   Check .env file or Netlify environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection and log status
export const testSupabaseConnection = async () => {
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
