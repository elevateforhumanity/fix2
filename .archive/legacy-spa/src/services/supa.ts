import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { log } from '../logger';

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supaAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supaUrl || !supaAnon) {
  log.error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file'
  );
  log.error(
    'The application will run in offline mode with limited functionality'
  );
}

// Create client with proper error handling
export const supa: SupabaseClient =
  supaUrl && supaAnon
    ? createClient(supaUrl, supaAnon, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : createClient('https://placeholder.supabase.co', 'placeholder-key', {
        auth: { persistSession: false, autoRefreshToken: false },
      });

// Helper for typed errors
export function must<T>(value: T | null, msg = 'Not found') {
  if (value == null) throw new Error(msg);
  return value;
}
