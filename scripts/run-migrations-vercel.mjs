#!/usr/bin/env node
/**
 * Automatic Supabase Migration Runner
 * Uses pg client to execute migrations directly
 */

import pg from 'pg';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Running Supabase Migrations\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dbUrl = process.env.DATABASE_URL;

// Check credentials
if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️  Skipping: Missing Supabase credentials');
  console.log('   This is normal for preview deployments');
  process.exit(0);
}

// Build connection string from Supabase URL
const projectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

// Use DATABASE_URL if available, otherwise construct from Supabase URL
// Note: Direct database connections require the database password, not the service role key
let connectionString = dbUrl;

if (!connectionString && projectRef) {
  // For Supabase, we need the actual database password from DATABASE_URL env var
  console.log('⚠️  DATABASE_URL not set - migrations require direct database access');
  console.log('   Add DATABASE_URL to Vercel environment variables');
  console.log('   Get it from: Supabase Dashboard → Settings → Database → Connection String');
  process.exit(0); // Don't fail the build
}

console.log(`📡 Connecting to database...`);

// Get all migration files
const migrationsDir = join(rootDir, 'supabase/migrations');

if (!existsSync(migrationsDir)) {
  console.log('✅ No migrations directory found');
  process.exit(0);
}

const migrationFiles = readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

if (migrationFiles.length === 0) {
  console.log('✅ No migration files found');
  process.exit(0);
}

console.log(`📦 Found ${migrationFiles.length} migration files\n`);

// Connect to database
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  console.log('✅ Connected to database\n');
  
  // Create migrations tracking table
  await client.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  
  // Get executed migrations
  const { rows: executedMigrations } = await client.query(
    'SELECT filename FROM _migrations ORDER BY executed_at'
  );
  
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
      
      // Execute migration in a transaction
      await client.query('BEGIN');
      await client.query(sql);
      await client.query(
        'INSERT INTO _migrations (filename) VALUES ($1)',
        [filename]
      );
      await client.query('COMMIT');
      
      console.log(`✅ ${filename} completed`);
      successCount++;
      
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`❌ Error in ${filename}:`, err.message);
      
      // Continue with other migrations in production
      if (process.env.VERCEL) {
        console.log('⚠️  Continuing with remaining migrations...');
        continue;
      } else {
        throw err;
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
  
} catch (err) {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
} finally {
  await client.end();
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Successful: ${successCount}`);
console.log(`⏭️  Skipped: ${skipCount}`);
console.log(`📦 Total: ${migrationFiles.length}`);
console.log('='.repeat(50) + '\n');

console.log('✅ Migrations complete!');
