import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://cuxzzpsyufcewtmicszk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Running MISSING_TABLES.sql...\n');

const sql = readFileSync('MISSING_TABLES.sql', 'utf8');

try {
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
  
  if (error) {
    console.error('❌ Error:', error.message);
    
    // Try running via REST API instead
    console.log('\n🔄 Trying alternative method...\n');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ sql_query: sql })
    });
    
    if (!response.ok) {
      console.error('❌ Alternative method failed');
      console.log('\n📋 SQL to run manually in Supabase SQL Editor:');
      console.log('https://cuxzzpsyufcewtmicszk.supabase.co/project/_/sql\n');
      process.exit(1);
    }
  }
  
  console.log('✅ MISSING_TABLES.sql executed successfully!\n');
  console.log('Tables created:');
  console.log('  ✅ document_audit_log');
  console.log('  ✅ document_requirements');
  console.log('  ✅ notifications\n');
  
} catch (err) {
  console.error('❌ Error:', err.message);
  console.log('\n📋 Please run MISSING_TABLES.sql manually in Supabase SQL Editor');
  console.log('https://cuxzzpsyufcewtmicszk.supabase.co/project/_/sql\n');
}
