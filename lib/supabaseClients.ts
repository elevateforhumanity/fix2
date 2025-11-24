// lib/supabaseClients.ts
import { cookies } from "next/headers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

// 👇 For client-side components (React hooks, etc.)
export function getClientSupabase() {
  return createClientComponentClient();
}

// 👇 For server components (App Router `async` page components)
export function getServerSupabase() {
  return createServerComponentClient({ cookies });
}

// 👇 For admin / backend API routes only (service role key 🔐)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("Supabase env vars missing – check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
