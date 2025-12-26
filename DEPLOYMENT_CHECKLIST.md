# DEPLOYMENT CHECKLIST - MUST RUN IN PRODUCTION

## ⚠️ CRITICAL: These steps MUST be completed after deployment

### Database Migrations (Run in Supabase Dashboard)

Navigate to Supabase SQL Editor and run these migrations IN ORDER:

1. ✅ `supabase/migrations/20251226_staff_training_system.sql`
   - Creates: training_modules, staff_training_progress
2. ✅ `supabase/migrations/20251226_process_documentation_system.sql`
   - Creates: processes, process_steps
3. ✅ `supabase/migrations/20251226_qa_checklist_system.sql`
   - Creates: qa_checklists, qa_checklist_completions
4. ✅ `supabase/migrations/20251226_customer_service_system.sql`
   - Creates: customer_service_protocols, service_tickets
5. ✅ `supabase/migrations/20251226_performance_analytics_system.sql`
   - Creates: performance_metrics, page_views, conversions
6. ✅ `supabase/migrations/20251226_tax_documents_system.sql`
   - Creates: tax_documents
7. ✅ `supabase/migrations/20251226_volunteer_applications_system.sql`
   - Creates: volunteer_applications
8. ✅ `supabase/migrations/20251226_donations_campaigns_system.sql`
   - Creates: campaigns, donations
9. ✅ `supabase/migrations/20251226_reviews_system.sql`
   - Creates: reviews

### Verify Tables Created

Run this query in Supabase SQL Editor:

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

### Verify RLS Policies

Run this query:

```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN (
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
ORDER BY tablename, policyname;
```

Expected: 50+ policies

### API Route Testing

Test each endpoint after deployment:

```bash
# Staff Training
curl https://your-domain.com/api/staff/training
curl -X POST https://your-domain.com/api/staff/training -d '{"module_id":"xxx","quiz_score":85}'

# Staff Processes
curl https://your-domain.com/api/staff/processes
curl https://your-domain.com/api/staff/processes/[id]

# QA Checklist
curl https://your-domain.com/api/staff/qa-checklist
curl -X POST https://your-domain.com/api/staff/qa-checklist -d '{"checklist_id":"xxx"}'

# Customer Service
curl https://your-domain.com/api/staff/customer-service
curl -X POST https://your-domain.com/api/staff/customer-service/tickets -d '{"student_id":"xxx","issue":"test"}'

# Admin Performance
curl https://your-domain.com/api/admin/performance

# Admin Analytics
curl https://your-domain.com/api/admin/analytics?days=30

# Tax Documents
curl -X POST https://your-domain.com/api/tax/upload -F "file=@test.pdf"
curl https://your-domain.com/api/tax/documents
curl -X DELETE https://your-domain.com/api/tax/documents/[id]

# VITA Volunteers
curl -X POST https://your-domain.com/api/vita/volunteer-apply -d '{"name":"Test","email":"test@test.com","phone":"555-1234"}'
curl https://your-domain.com/api/vita/volunteers

# Donations
curl -X POST https://your-domain.com/api/donations/create-checkout -d '{"amount":50,"donor_name":"Test","donor_email":"test@test.com"}'
curl https://your-domain.com/api/donations

# Reviews
curl -X POST https://your-domain.com/api/reviews -d '{"reviewer_name":"Test","rating":5,"content":"Great!"}'
curl https://your-domain.com/api/reviews
```

### Page Verification

Visit each page and verify it renders:

**Staff Portal:**

- [ ] /staff-portal/training
- [ ] /staff-portal/processes
- [ ] /staff-portal/qa-checklist
- [ ] /staff-portal/customer-service

**Admin:**

- [ ] /admin/performance-dashboard
- [ ] /admin/analytics-dashboard

**VITA:**

- [ ] /vita/appointments
- [ ] /vita/upload
- [ ] /vita/volunteer-portal

**Rise Foundation:**

- [ ] /rise-foundation/donate
- [ ] /rise-foundation/events

### Navigation Verification

- [ ] All pages appear in navigation menus
- [ ] All links work
- [ ] No 404 errors
- [ ] Mobile navigation works

### Seed Data (Run in Supabase SQL Editor)

After migrations, run seed data scripts to populate initial content.

### Environment Variables Required

Verify these are set in Vercel:

- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

### Final Verification

- [ ] All 16 tables exist in database
- [ ] All RLS policies active
- [ ] All 18 API routes respond correctly
- [ ] All 11 pages render without errors
- [ ] All pages in navigation
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Authentication works
- [ ] Authorization works
- [ ] Data persists correctly

## Status: READY FOR DEPLOYMENT

All code is complete. Migrations and testing must be done in production environment.
