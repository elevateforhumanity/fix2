import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('A. DATA ACCESS TESTS\n');

// A1: Read
const { data: readData, error: readError } = await supabase.from('profiles').select('id').limit(1);
console.log('A1 READ:', !readError ? 'PASS' : 'FAIL', readError?.message || '');

// A2: Insert
const testId = crypto.randomUUID();
const { error: insertError } = await supabase.from('profiles').insert({ id: testId, role: 'student' });
console.log('A2 INSERT:', !insertError ? 'PASS' : 'FAIL', insertError?.message || '');

// A3: Update
const { error: updateError } = await supabase.from('profiles').update({ role: 'advisor' }).eq('id', testId);
console.log('A3 UPDATE:', !updateError ? 'PASS' : 'FAIL', updateError?.message || '');

// A4: Delete
const { error: deleteError } = await supabase.from('profiles').delete().eq('id', testId);
console.log('A4 DELETE:', !deleteError ? 'PASS' : 'FAIL', deleteError?.message || '');

// A5: RLS Bypass
const { data: bypassData, error: bypassError } = await supabase.from('profiles').select('*').limit(5);
console.log('A5 RLS BYPASS:', !bypassError && bypassData?.length > 0 ? 'PASS' : 'FAIL');
