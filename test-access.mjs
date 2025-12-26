import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

// Test 1: Can I query existing tables?
const { data: profiles, error: profilesError } = await supabase
  .from('profiles')
  .select('count');

console.log('Test 1 - Query profiles table:');
console.log('  Success:', !profilesError);
console.log('  Error:', profilesError?.message || 'None');

// Test 2: Check if my new tables exist
const { data: training, error: trainingError } = await supabase
  .from('training_modules')
  .select('count');

console.log('\nTest 2 - Query training_modules table:');
console.log('  Success:', !trainingError);
console.log('  Error:', trainingError?.message || 'None');
console.log('  Table exists:', !trainingError);
