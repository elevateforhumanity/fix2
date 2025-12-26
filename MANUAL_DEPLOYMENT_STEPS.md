# MANUAL DEPLOYMENT STEPS

## ⚠️ IMPORTANT: Migrations Must Be Run Manually

The migrations cannot be run programmatically without direct database access.

### Step 1: Run Migrations in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your project: cuxzzpsyufcewtmicszk
3. Go to SQL Editor
4. Run each migration file in order:

```sql
-- Copy and paste the contents of each file into SQL Editor and execute:

1. supabase/migrations/20251226_staff_training_system.sql
2. supabase/migrations/20251226_process_documentation_system.sql
3. supabase/migrations/20251226_qa_checklist_system.sql
4. supabase/migrations/20251226_customer_service_system.sql
5. supabase/migrations/20251226_performance_analytics_system.sql
6. supabase/migrations/20251226_tax_documents_system.sql
7. supabase/migrations/20251226_volunteer_applications_system.sql
8. supabase/migrations/20251226_donations_campaigns_system.sql
9. supabase/migrations/20251226_reviews_system.sql
```

### Step 2: Run Seed Data

After migrations, run seed data:

```sql
10. supabase/migrations/20251226_seed_training_modules.sql
11. supabase/migrations/20251226_seed_processes.sql
12. supabase/migrations/20251226_seed_qa_checklists.sql
```

### Step 3: Verify Tables Created

Run this query to verify:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'training_modules',
  'staff_training_progress',
  'processes',
  'process_steps',
  'qa_checklists',
  'qa_checklist_completions',
  'customer_service_protocols',
  'service_tickets',
  'performance_metrics',
  'page_views',
  'conversions',
  'tax_documents',
  'volunteer_applications',
  'campaigns',
  'donations',
  'reviews'
)
ORDER BY table_name;
```

Expected: 16 tables

### Step 4: Deploy to Vercel

```bash
git add .
git commit -m "Add staff training, processes, QA, customer service, analytics, tax, VITA, donations, and reviews systems"
git push origin main
```

Vercel will automatically deploy.

### Step 5: Test Pages

Visit each page:

- /staff-portal/training
- /staff-portal/processes
- /staff-portal/qa-checklist
- /staff-portal/customer-service
- /admin/performance-dashboard
- /admin/analytics-dashboard
- /vita/appointments
- /vita/upload
- /vita/volunteer-portal
- /rise-foundation/donate
- /rise-foundation/events

### Step 6: Test API Routes

Use the test scripts in DEPLOYMENT_CHECKLIST.md

## Current Status

✅ All migration files created
✅ All seed data files created
✅ All API routes created
✅ 1 page created (training)
⏳ 10 pages remaining
⏳ Navigation updates needed

## Next: Continue Creating Pages

Since migrations must be run manually, I'll continue creating all pages so everything is ready for deployment.
