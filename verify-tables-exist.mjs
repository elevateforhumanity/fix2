import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cuxzzpsyufcewtmicszk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE'
);

console.log('VERIFYING TABLES EXIST\n');

const tables = [
  'training_modules', 'staff_training_progress', 'processes', 'process_steps',
  'qa_checklists', 'qa_checklist_completions', 'customer_service_protocols',
  'service_tickets', 'performance_metrics', 'page_views', 'conversions',
  'tax_documents', 'volunteer_applications', 'campaigns', 'donations', 'reviews'
];

for (const table of tables) {
  try {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`${table}: ERROR - ${error.message}`);
    } else {
      console.log(`${table}: EXISTS (${count} rows)`);
    }
  } catch (e) {
    console.log(`${table}: EXCEPTION - ${e.message}`);
  }
}
