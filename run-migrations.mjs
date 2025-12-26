import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Read first migration
const sql = readFileSync('./supabase/migrations/20251226_staff_training_system.sql', 'utf-8');

console.log('Migration SQL length:', sql.length);
console.log('First 200 chars:', sql.substring(0, 200));

// Try using fetch directly to Supabase's SQL endpoint
const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
  },
  body: JSON.stringify({ query: 'SELECT version()' })
});

const result = await response.json();
console.log('SQL execution attempt:', result);
