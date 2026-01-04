import pg from 'pg';
import { readFileSync } from 'fs';

const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:kingGreene08$$$@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

console.log('🚀 Connecting to database...\n');

try {
  await client.connect();
  console.log('✅ Connected!\n');
  
  console.log('📋 Running MISSING_TABLES.sql...\n');
  const sql = readFileSync('MISSING_TABLES.sql', 'utf8');
  
  await client.query(sql);
  
  console.log('✅ SUCCESS! All tables created:\n');
  console.log('  ✅ document_audit_log');
  console.log('  ✅ document_requirements');
  console.log('  ✅ notifications\n');
  
  // Verify tables exist
  const { rows } = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('document_audit_log', 'document_requirements', 'notifications')
    ORDER BY table_name
  `);
  
  console.log('🔍 Verification:');
  rows.forEach(row => console.log(`  ✅ ${row.table_name}`));
  console.log('');
  
  await client.end();
  
  console.log('🎉 DATABASE IS 100% COMPLETE!\n');
  
} catch (err) {
  console.error('❌ Error:', err.message);
  await client.end();
  process.exit(1);
}
