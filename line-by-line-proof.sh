#!/bin/bash
set -e

export SUPABASE_ACCESS_TOKEN='sbp_6a0b18ab48ff439e067802559f0a50f3d30035d3'
export $(cat .env.local | xargs)

echo "========================================"
echo "LINE-BY-LINE PROOF WITH LIVE TEST RUNS"
echo "========================================"
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""

echo "STEP 1 — ACCESS & ROLE CONTEXT"
echo "========================================"
echo ""

echo "Test 1.1: List Supabase projects"
echo "Command: npx supabase projects list"
npx supabase projects list 2>&1
echo ""

echo "Test 1.2: Show migration list"
echo "Command: npx supabase migration list | tail -20"
npx supabase migration list 2>&1 | tail -20
echo ""

echo "Test 1.3: List migration files"
echo "Command: ls -lh supabase/migrations/20251226_*.sql"
ls -lh supabase/migrations/20251226_*.sql
echo ""

echo "STEP 2 — TABLE VERIFICATION"
echo "========================================"
echo ""

echo "Test 2.1: Verify all 16 tables exist"
echo "Running Node.js verification script..."
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

const tables = [
  'training_modules', 'staff_training_progress', 'processes', 'process_steps',
  'qa_checklists', 'qa_checklist_completions', 'customer_service_protocols',
  'service_tickets', 'performance_metrics', 'page_views', 'conversions',
  'tax_documents', 'volunteer_applications', 'campaigns', 'donations', 'reviews'
];

console.log('Table Verification Results:');
for (const table of tables) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  console.log(`  ${table}: ${error ? 'ERROR - ' + error.message : 'EXISTS (' + (count || 0) + ' rows)'}`);
}
NODESCRIPT
echo ""

echo "STEP 3 — DATA ACCESS TESTS"
echo "========================================"
echo ""

echo "Test 3.1: SELECT test on profiles"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('SELECT Test:');
const { data, error } = await supabase.from('profiles').select('id').limit(1);
console.log('  Command: supabase.from("profiles").select("id").limit(1)');
console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
console.log('  Output:', JSON.stringify(data));
NODESCRIPT
echo ""

echo "Test 3.2: INSERT test on applications"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('INSERT Test:');
const testId = crypto.randomUUID();
const testProgramId = crypto.randomUUID();
const { data, error } = await supabase.from('applications').insert({
  id: testId,
  program_id: testProgramId,
  status: 'pending'
}).select();
console.log('  Command: supabase.from("applications").insert({...})');
console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
console.log('  Inserted ID:', data?.[0]?.id || 'N/A');

// Cleanup
if (!error) {
  await supabase.from('applications').delete().eq('id', testId);
  console.log('  Cleanup: Row deleted');
}
NODESCRIPT
echo ""

echo "Test 3.3: UPDATE test on profiles"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('UPDATE Test:');
const { data: profiles } = await supabase.from('profiles').select('id').limit(1);
if (profiles?.[0]) {
  const { error } = await supabase.from('profiles')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', profiles[0].id);
  console.log('  Command: supabase.from("profiles").update({...}).eq("id", id)');
  console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
  console.log('  Updated ID:', profiles[0].id);
} else {
  console.log('  Result: SKIP - No profiles to update');
}
NODESCRIPT
echo ""

echo "Test 3.4: RLS bypass test"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('RLS Bypass Test:');
const { data, error } = await supabase.from('profiles').select('*').limit(5);
console.log('  Command: supabase.from("profiles").select("*") [service_role]');
console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
console.log('  Rows retrieved:', data?.length || 0);
console.log('  RLS bypassed:', !error ? 'YES' : 'NO');
NODESCRIPT
echo ""

echo "STEP 4 — STORAGE VERIFICATION"
echo "========================================"
echo ""

echo "Test 4.1: List storage buckets"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('Storage Buckets:');
const { data, error } = await supabase.storage.listBuckets();
console.log('  Command: supabase.storage.listBuckets()');
console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
console.log('  Total buckets:', data?.length || 0);
data?.forEach(b => console.log(`    - ${b.name} (${b.public ? 'public' : 'private'})`));
NODESCRIPT
echo ""

echo "Test 4.2: List files in avatars bucket"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('Storage Files:');
const { data, error } = await supabase.storage.from('avatars').list();
console.log('  Command: supabase.storage.from("avatars").list()');
console.log('  Result:', error ? 'FAIL - ' + error.message : 'PASS');
console.log('  Files found:', data?.length || 0);
NODESCRIPT
echo ""

echo "STEP 5 — DATA SEEDING VERIFICATION"
echo "========================================"
echo ""

echo "Test 5.1: Count rows in seeded tables"
node << 'NODESCRIPT'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('Seeded Tables Row Counts:');
const tables = ['programs', 'courses', 'applications', 'profiles'];
for (const table of tables) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  console.log(`  ${table}: ${error ? 'ERROR' : count + ' rows'}`);
}
NODESCRIPT
echo ""

echo "========================================"
echo "ALL TESTS COMPLETE"
echo "========================================"
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
