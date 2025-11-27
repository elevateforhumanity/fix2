import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-side Supabase client for Next.js App Router.
 * Uses anon key; you can swap to service role for backend jobs.
 */
export function getSupabaseServerClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
