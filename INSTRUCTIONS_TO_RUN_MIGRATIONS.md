# HOW TO RUN THE MIGRATIONS

## Step 1: Go to Supabase SQL Editor

Open this URL in your browser:
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql

## Step 2: Open the Migration File

Open the file: `ALL_MIGRATIONS_TO_RUN.sql` (in this directory)

## Step 3: Copy All the SQL

Select all the SQL in that file and copy it (Ctrl+A, Ctrl+C)

## Step 4: Paste into Supabase

1. Click "New Query" in the Supabase SQL Editor
2. Paste all the SQL
3. Click "Run" (or press Ctrl+Enter)

## Step 5: Wait for Completion

The migrations will run. You'll see success messages or errors.

## What This Creates

- 16 new database tables
- RLS policies for security
- Indexes for performance
- Triggers for automation
- Initial seed data

## Tables Created

1. training_modules
2. staff_training_progress
3. processes
4. process_steps
5. qa_checklists
6. qa_checklist_completions
7. customer_service_protocols
8. service_tickets
9. performance_metrics
10. page_views
11. conversions
12. tax_documents
13. volunteer_applications
14. campaigns
15. donations
16. reviews

## After Running

Tell me when it's done and I'll verify everything worked.
