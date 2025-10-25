import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const testSupabaseConnection = async () => {
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
