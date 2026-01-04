import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('🔍 Checking if tables exist...\n');

// Check document_audit_log
const { data: audit, error: auditError } = await supabase
  .from('document_audit_log')
  .select('id')
  .limit(1);

// Check document_requirements
const { data: reqs, error: reqsError } = await supabase
  .from('document_requirements')
  .select('*');

// Check notifications
const { data: notifs, error: notifsError } = await supabase
  .from('notifications')
  .select('id')
  .limit(1);

console.log('📊 Table Status:\n');
console.log(`  ${auditError ? '❌' : '✅'} document_audit_log ${auditError ? `(${auditError.message})` : ''}`);
console.log(`  ${reqsError ? '❌' : '✅'} document_requirements ${reqsError ? `(${reqsError.message})` : ''}`);
console.log(`  ${notifsError ? '❌' : '✅'} notifications ${notifsError ? `(${notifsError.message})` : ''}`);

if (!reqsError && reqs) {
  console.log(`\n📄 Document requirements: ${reqs.length} entries`);
}

if (!auditError && !reqsError && !notifsError) {
  console.log('\n🎉 ALL TABLES EXIST! Database is complete!\n');
} else {
  console.log('\n⚠️  Some tables are missing. Run MISSING_TABLES.sql in Supabase SQL Editor:\n');
  console.log('https://cuxzzpsyufcewtmicszk.supabase.co/project/_/sql\n');
}
