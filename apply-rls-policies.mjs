#!/usr/bin/env node
/**
 * Apply RLS Policies
 * Uses Supabase Management API to apply RLS policies
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔒 Applying RLS Policies');
console.log('========================\n');

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Apply policies using raw SQL through PostgREST
async function applyPolicy(policySQL) {
  try {
    // Use the REST API to execute SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({ query: policySQL })
    });
    
    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

console.log('Note: RLS policies must be applied through Supabase SQL Editor\n');
console.log('Please run the following SQL in Supabase Dashboard:\n');
console.log('-----------------------------------------------------------\n');

const policies = `
-- Allow public read access to active programs
DROP POLICY IF EXISTS "Anyone can view active programs" ON programs;
CREATE POLICY "Anyone can view active programs" 
ON programs FOR SELECT USING (active = true);

-- Allow public read access to active courses
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
CREATE POLICY "Anyone can view active courses" 
ON courses FOR SELECT USING (active = true);
`;

console.log(policies);
console.log('-----------------------------------------------------------\n');
console.log('Steps:');
console.log('1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new');
console.log('2. Copy the SQL above');
console.log('3. Paste and run in SQL Editor');
console.log('4. Run: node test-database.mjs to verify\n');
