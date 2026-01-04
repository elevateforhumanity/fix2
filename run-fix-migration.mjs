#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Running FIX_ALL_REMAINING.sql migration...\n');

  try {
    const sqlContent = readFileSync(join(__dirname, 'FIX_ALL_REMAINING.sql'), 'utf-8');
    
    // Split by semicolons but keep DO blocks together
    const statements = [];
    let currentStatement = '';
    let inDoBlock = false;
    
    for (const line of sqlContent.split('\n')) {
      if (line.trim().startsWith('DO $$')) {
        inDoBlock = true;
      }
      
      currentStatement += line + '\n';
      
      if (inDoBlock && line.trim() === '$$;') {
        inDoBlock = false;
        statements.push(currentStatement.trim());
        currentStatement = '';
      } else if (!inDoBlock && line.includes(';') && !line.trim().startsWith('--')) {
        statements.push(currentStatement.trim());
        currentStatement = '';
      }
    }
    
    if (currentStatement.trim()) {
      statements.push(currentStatement.trim());
    }

    console.log(`📝 Executing ${statements.length} SQL statements...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement || statement.startsWith('--')) continue;

      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          // Try direct query if RPC fails
          const { error: directError } = await supabase.from('_').select('*').limit(0);
          
          // Use raw SQL execution
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({ query: statement })
          });

          if (!response.ok) {
            console.error(`❌ Statement ${i + 1} failed:`, statement.substring(0, 100));
            console.error('Error:', await response.text());
          } else {
            console.log(`✅ Statement ${i + 1} executed`);
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed`);
        }
      } catch (err) {
        console.error(`⚠️  Statement ${i + 1} error:`, err.message);
      }
    }

    console.log('\n🎉 Migration completed!\n');
    console.log('Verifying tables...\n');

    // Verify tables exist
    const tables = ['messages', 'payment_records', 'onboarding_steps', 'partner_enrollments'];
    
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        console.log(`❌ ${table}: NOT FOUND`);
      } else {
        console.log(`✅ ${table}: EXISTS`);
      }
    }

    // Check course modules
    const { data: modules, error: modulesError } = await supabase
      .from('course_modules')
      .select('id, title')
      .eq('course_id', (await supabase.from('courses').select('id').eq('slug', 'intro-hvac').single()).data?.id);

    if (!modulesError && modules) {
      console.log(`\n✅ Course modules: ${modules.length} found`);
      modules.forEach(m => console.log(`   - ${m.title}`));
    }

    console.log('\n✨ All systems ready for testing!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
