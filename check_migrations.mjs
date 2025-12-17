import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('Checking if migrations have been applied...\n');

// Check for tables
const tables = ['organizations', 'organization_users', 'organization_settings', 'org_invites', 'organization_subscriptions'];

for (const table of tables) {
  const { data, error } = await supabase.from(table).select('id').limit(1);
  
  if (error) {
    if (error.code === '42P01') {
      console.log(`❌ ${table} - NOT FOUND`);
    } else {
      console.log(`⚠️  ${table} - ERROR: ${error.message}`);
    }
  } else {
    console.log(`✅ ${table} - EXISTS`);
  }
}

// Check for organization_id columns
console.log('\nChecking organization_id columns...');
const columnsToCheck = [
  { table: 'profiles', column: 'organization_id' },
  { table: 'programs', column: 'organization_id' },
  { table: 'courses', column: 'organization_id' },
  { table: 'enrollments', column: 'organization_id' }
];

for (const { table, column } of columnsToCheck) {
  const { data, error } = await supabase.from(table).select(column).limit(1);
  
  if (error) {
    if (error.message.includes('column') && error.message.includes('does not exist')) {
      console.log(`❌ ${table}.${column} - NOT FOUND`);
    } else {
      console.log(`⚠️  ${table}.${column} - ERROR: ${error.message}`);
    }
  } else {
    console.log(`✅ ${table}.${column} - EXISTS`);
  }
}

console.log('\n---');
console.log('If all checks show ✅, migrations are applied.');
console.log('If any show ❌, you need to apply migrations manually.');
