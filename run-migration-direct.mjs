#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running FIX_ALL_REMAINING.sql migration...\n');

  const sqlContent = readFileSync(join(__dirname, 'FIX_ALL_REMAINING.sql'), 'utf-8');
  
  // Execute the entire SQL as one block
  console.log('📝 Executing SQL migration...\n');

  try {
    // Use the SQL editor endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ query: sqlContent })
    });

    console.log('Response status:', response.status);

    // Verify tables exist
    console.log('\n✅ Verifying tables...\n');

    const tables = ['messages', 'payment_records', 'onboarding_steps', 'partner_enrollments'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('id').limit(1);
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: EXISTS`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }

    // Check course modules
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', 'intro-hvac')
      .single();

    if (course) {
      const { data: modules } = await supabase
        .from('course_modules')
        .select('id, title')
        .eq('course_id', course.id);

      if (modules) {
        console.log(`\n✅ Course modules: ${modules.length} found`);
        modules.forEach(m => console.log(`   - ${m.title}`));
      }
    }

    console.log('\n✨ Migration verification complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runMigration();
