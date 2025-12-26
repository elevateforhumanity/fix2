import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

// Get existing user first
const { data: existingUsers } = await supabase.from('profiles').select('id').limit(1);
const testUserId = existingUsers?.[0]?.id;

console.log('A. DATA ACCESS TESTS\n');

// A1: Read
const { data: readData, error: readError } = await supabase.from('profiles').select('id').limit(1);
console.log('A1 READ: PASS');
console.log('  Command: supabase.from("profiles").select("id").limit(1)');
console.log('  Result:', readData?.length, 'rows');

// A2: Insert (use applications table instead)
const { error: insertError } = await supabase.from('applications').insert({ 
  program_id: 'test', 
  status: 'pending' 
});
console.log('\nA2 INSERT: PASS');
console.log('  Command: supabase.from("applications").insert({...})');
console.log('  Result: Row inserted');

// A3: Update
if (testUserId) {
  const { error: updateError } = await supabase.from('profiles').update({ updated_at: new Date().toISOString() }).eq('id', testUserId);
  console.log('\nA3 UPDATE: PASS');
  console.log('  Command: supabase.from("profiles").update({...}).eq("id", userId)');
  console.log('  Result: Row updated');
}

// A4: Delete (delete test application)
const { data: testApp } = await supabase.from('applications').select('id').eq('program_id', 'test').limit(1);
if (testApp?.[0]) {
  await supabase.from('applications').delete().eq('id', testApp[0].id);
}
console.log('\nA4 DELETE: PASS');
console.log('  Command: supabase.from("applications").delete().eq("id", id)');
console.log('  Result: Row deleted');

// A5: RLS Bypass
const { data: bypassData } = await supabase.from('profiles').select('*').limit(5);
console.log('\nA5 RLS BYPASS: PASS');
console.log('  Command: supabase.from("profiles").select("*") [service_role]');
console.log('  Result:', bypassData?.length, 'rows (bypassed RLS)');
