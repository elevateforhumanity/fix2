#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Automated Database Migration\n');
console.log('=' .repeat(60));

// Read SQL file
const sqlFile = join(__dirname, 'CREATE_PARTNER_SCORM_TABLES.sql');
let sql;

try {
  sql = readFileSync(sqlFile, 'utf8');
  console.log('✅ SQL file loaded successfully');
  console.log(`📄 File size: ${(sql.length / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('❌ Failed to read SQL file:', error.message);
  process.exit(1);
}

// Count statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📊 SQL statements: ${statements.length}`);

// Count tables, views, triggers
const tableCount = (sql.match(/CREATE TABLE IF NOT EXISTS/g) || []).length;
const viewCount = (sql.match(/CREATE OR REPLACE VIEW/g) || []).length;
const triggerCount = (sql.match(/CREATE TRIGGER/g) || []).length;
const functionCount = (sql.match(/CREATE OR REPLACE FUNCTION/g) || []).length;

console.log('\n📋 Migration Contents:');
console.log(`   Tables: ${tableCount}`);
console.log(`   Views: ${viewCount}`);
console.log(`   Functions: ${functionCount}`);
console.log(`   Triggers: ${triggerCount}`);

console.log('\n' + '='.repeat(60));
console.log('\n⚠️  MANUAL MIGRATION REQUIRED\n');
console.log('Supabase requires SQL migrations to be run through the dashboard.\n');
console.log('📝 INSTRUCTIONS:\n');
console.log('1. Open Supabase Dashboard: https://app.supabase.com');
console.log('2. Select your project');
console.log('3. Go to SQL Editor (left sidebar)');
console.log('4. Click "New Query"');
console.log('5. Copy the contents of: CREATE_PARTNER_SCORM_TABLES.sql');
console.log('6. Paste into the SQL Editor');
console.log('7. Click "Run" (or press Ctrl/Cmd + Enter)');
console.log('8. Wait ~30 seconds for completion\n');

console.log('📄 Quick Copy Command:\n');
console.log('   cat CREATE_PARTNER_SCORM_TABLES.sql | pbcopy   # macOS');
console.log('   cat CREATE_PARTNER_SCORM_TABLES.sql | xclip    # Linux\n');

console.log('✅ After running, verify with:\n');
console.log('   cat VERIFY_MIGRATION.sql\n');

console.log('📚 For detailed help, see: RUN_MIGRATION.md\n');
console.log('=' .repeat(60));

// Create a simplified migration script for Supabase
const simplifiedSQL = `
-- Quick Migration Script
-- Copy and paste this entire block into Supabase SQL Editor

${sql}
`;

const outputFile = join(__dirname, 'MIGRATION_READY.sql');
try {
  import('fs').then(fs => {
    fs.writeFileSync(outputFile, simplifiedSQL);
    console.log(`\n✅ Created ready-to-paste file: MIGRATION_READY.sql`);
    console.log('   This file is formatted for easy copy-paste into Supabase\n');
  });
} catch (error) {
  // Ignore write errors
}

console.log('🎯 SUMMARY:\n');
console.log('   Migration file is ready');
console.log('   Follow the instructions above to run in Supabase Dashboard');
console.log('   Estimated time: 2 minutes\n');
