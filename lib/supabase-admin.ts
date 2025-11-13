// =====================================================
// SUPABASE ADMIN CLIENT
// =====================================================
// This client uses the service role key and has elevated
// permissions to access auth.users and other protected tables.
// Only use this in server-side API routes, never expose to client.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for admin client');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Helper function to get user by email
export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  
  if (error) {
    throw error;
  }
  
  const user = data.users.find(u => u.email === email);
  return user || null;
}

// Helper function to get user by ID
export async function getUserById(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);
  
  if (error) {
    throw error;
  }
  
  return data.user;
}
