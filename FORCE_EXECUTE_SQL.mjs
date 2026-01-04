#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🚀 FORCE EXECUTING SQL VIA TABLE CREATION\n');

async function createTablesDirectly() {
  console.log('Creating program_licenses table...');
  
  // Create tables one by one using Supabase client
  try {
    // We'll create the tables by inserting a dummy record and letting it fail
    // This will tell us if the table exists
    
    // Actually, let's use the management API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: readFileSync(join(__dirname, 'FINAL_COMPLETE_ALL.sql'), 'utf-8')
      })
    });

    console.log('Response:', response.status, response.statusText);
    const text = await response.text();
    console.log('Body:', text);

  } catch (error) {
    console.error('Error:', error);
  }
}

createTablesDirectly();
