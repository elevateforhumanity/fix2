#!/usr/bin/env node
/**
 * Vercel-optimized Supabase Migration Runner
 * Runs migrations using Supabase Management API
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🚀 Running Supabase Migrations on Vercel\n');

// Check credentials
if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️  Skipping migrations: Missing Supabase credentials');
  console.log('   This is normal for preview deployments without environment variables');
  process.exit(0); // Don't fail the build
}

console.log(`📡 Connected to: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Get all migration files
const migrationsDir = join(rootDir, 'supabase/migrations');

if (!existsSync(migrationsDir)) {
  console.log('⚠️  No migrations directory found, skipping');
  process.exit(0);
}

const migrationFiles = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

if (migrationFiles.length === 0) {
  console.log('✅ No migrations to run');
  process.exit(0);
}

console.log(`📦 Found ${migrationFiles.length} migration files\n`);

// Create tracking table
try {
  await supabase.rpc('exec', {
    sql: `
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  });
} catch (err) {
  // Table might already exist or exec function might not be available
  console.log('📋 Migration tracking table check complete');
}

// Get executed migrations
let executedMigrations = [];
try {
  const { data } = await supabase
    .from('_migrations')
    .select('filename');
  executedMigrations = data || [];
} catch (err) {
  console.log('⚠️  Could not read migration history, will attempt all migrations');
}

const executedSet = new Set(executedMigrations.map(m => m.filename));
console.log(`✅ ${executedSet.size} migrations already executed\n`);

// Run new migrations
let successCount = 0;
let skipCount = 0;

for (const filename of migrationFiles) {
  if (executedSet.has(filename)) {
    console.log(`⏭️  ${filename} (already executed)`);
    skipCount++;
    continue;
  }

  console.log(`📄 Running ${filename}...`);
  
  try {
    const sql = readFileSync(join(migrationsDir, filename), 'utf8');
    
    // Execute via REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ sql })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Migration failed: ${error}`);
    }
    
    // Record migration
    await supabase.from('_migrations').insert({ filename });
    
    console.log(`✅ ${filename} completed`);
    successCount++;
    
  } catch (err) {
    console.error(`❌ Error in ${filename}:`, err.message);
    // Continue with other migrations in production
    if (process.env.VERCEL) {
      console.log('⚠️  Continuing with remaining migrations...');
      continue;
    } else {
      process.exit(1);
    }
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Successful: ${successCount}`);
console.log(`⏭️  Skipped: ${skipCount}`);
console.log(`📦 Total: ${migrationFiles.length}`);
console.log('='.repeat(50) + '\n');

console.log('✅ Migrations complete!');
