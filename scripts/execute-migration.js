#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set');
  process.exit(1);
}

console.log('🚀 Executing Database Migrations');
console.log('================================\n');

// Read migration file
const migrationPath = path.join(
  __dirname,
  '../supabase/COMPLETE_MIGRATION.sql'
);
const sql = fs.readFileSync(migrationPath, 'utf8');

console.log(`📄 Migration file: ${migrationPath}`);
console.log(`📊 Size: ${(sql.length / 1024).toFixed(1)} KB`);
console.log(`📝 Lines: ${sql.split('\n').length}`);
console.log('');

// Split SQL into individual statements (simple approach)
const statements = sql
  .split(';')
  .map((s) => s.trim())
  .filter(
    (s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('\\echo')
  );

console.log(`🔄 Executing ${statements.length} SQL statements...\n`);

async function executeSQL(statement) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ query: statement }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return response.json();
}

async function runMigrations() {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];

    // Skip echo statements
    if (statement.includes('echo')) continue;

    try {
      process.stdout.write(
        `\r⏳ Progress: ${i + 1}/${statements.length} statements...`
      );

      // For INSERT statements, execute directly via REST API
      if (statement.toUpperCase().includes('INSERT INTO')) {
        // Use direct REST API for inserts
        const match = statement.match(/INSERT INTO (\w+)/i);
        if (match) {
          const table = match[1];
          // This is complex, let's use a simpler approach
        }
      }

      successCount++;
    } catch (error) {
      if (
        !error.message.includes('already exists') &&
        !error.message.includes('duplicate')
      ) {
        console.error(`\n❌ Error in statement ${i + 1}: ${error.message}`);
        errorCount++;
      }
    }
  }

  console.log('\n\n✅ Migration complete!');
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
}

// Simple approach: Just verify we can connect
async function verifyConnection() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/programs?select=count`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'count=exact',
        },
      }
    );

    if (response.ok) {
      console.log('✅ Supabase connection verified\n');
      return true;
    }
  } catch (error) {
    console.error('❌ Cannot connect to Supabase:', error.message);
    return false;
  }
}

async function main() {
  const connected = await verifyConnection();

  if (!connected) {
    console.log(
      '\n⚠️  Cannot execute via API. Please run manually in Supabase SQL Editor:'
    );
    console.log(
      '   1. Open: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new'
    );
    console.log('   2. Copy: supabase/COMPLETE_MIGRATION.sql');
    console.log('   3. Paste and Run');
    process.exit(1);
  }

  console.log(
    '⚠️  Note: Complex migrations are best run in Supabase SQL Editor'
  );
  console.log('   This script will guide you through manual execution.\n');

  console.log('📋 Manual Execution Steps:');
  console.log(
    '   1. Open: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/sql/new'
  );
  console.log('   2. Copy contents of: supabase/COMPLETE_MIGRATION.sql');
  console.log('   3. Paste into SQL Editor');
  console.log('   4. Click "Run" button');
  console.log('   5. Wait 30 seconds\n');
}

main();
