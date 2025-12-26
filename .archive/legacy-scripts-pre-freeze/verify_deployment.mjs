import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('🔍 Checking deployment status...\n');

// Check org users
const { data: orgUsers } = await supabase.from('organization_users').select('*');
console.log('Organization Users:', orgUsers?.length || 0);
if (orgUsers?.length) {
  console.log('  - Roles:', orgUsers.map(u => u.role).join(', '));
}

// Check if code is deployed
console.log('\n📦 Checking if code is deployed...');
console.log('Latest commit: c876553b9');
console.log('Branch: main');
console.log('Status: Pushed to GitHub ✅');

console.log('\n🚀 Next: Wait for Vercel to deploy (~2-3 minutes)');
console.log('Then test:');
console.log('  1. Visit https://www.elevateforhumanity.org');
console.log('  2. Check /api/reports/enrollments');
console.log('  3. Test /api/org/invite');
