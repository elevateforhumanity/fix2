# Apply Migration - Complete All Features

## Step 1: Apply Database Migration

### Option A: Supabase Dashboard (Recommended - 2 minutes)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of this file:
   ```
   supabase/migrations/20251227_create_missing_tables.sql
   ```
6. Paste into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. Wait for "Success" message

### Option B: Supabase CLI (If you have it installed)

```bash
cd /workspaces/workspaces
supabase db push
```

### Option C: Manual SQL Execution

If you have direct database access:

```bash
cd /workspaces/workspaces
psql $DATABASE_URL -f supabase/migrations/20251227_create_missing_tables.sql
```

## Step 2: Verify Tables Were Created

Run this query in Supabase SQL Editor:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'calendar_events',
  'customer_service_tickets',
  'qa_checklists',
  'qa_checklist_completions',
  'staff_processes',
  'employers',
  'job_postings',
  'job_applications',
  'apprenticeships',
  'apprenticeship_enrollments',
  'payroll_profiles',
  'crm_contacts',
  'crm_interactions',
  'tax_filings',
  'vita_appointments',
  'shop_reports',
  'ferpa_training_records',
  'document_signatures'
)
ORDER BY table_name;
```

You should see all 18 tables listed.

## Step 3: Start Development Server

```bash
cd /workspaces/workspaces
npm run dev
```

## Step 4: Test Each Portal Systematically

### Test 1: Student Portal Calendar

1. Navigate to: http://localhost:3000/student/calendar
2. Should load without errors
3. Try creating a calendar event

### Test 2: Admin Dashboard

1. Navigate to: http://localhost:3000/admin
2. Should load without errors
3. Check that data displays

### Test 3: Staff Portal

1. Navigate to: http://localhost:3000/staff-portal
2. Should load without errors
3. Check campaigns, students, etc.

### Test 4: Partner Portal

1. Navigate to: http://localhost:3000/partner
2. Should load without errors
3. Check dashboard and attendance

### Test 5: Employer Portal

1. Navigate to: http://localhost:3000/employer
2. Should load without errors
3. Check job postings

## What This Migration Creates

### 18 New Tables

1. **calendar_events** - Student/staff calendar system
2. **customer_service_tickets** - Support ticket system
3. **qa_checklists** - Quality assurance checklists
4. **qa_checklist_completions** - QA completion tracking
5. **staff_processes** - Staff process documentation
6. **employers** - Employer organization records
7. **job_postings** - Job listing system
8. **job_applications** - Student job applications
9. **apprenticeships** - Apprenticeship programs
10. **apprenticeship_enrollments** - Apprenticeship tracking
11. **payroll_profiles** - Employee payroll information
12. **crm_contacts** - CRM contact management
13. **crm_interactions** - CRM interaction tracking
14. **tax_filings** - Tax filing records
15. **vita_appointments** - VITA appointment scheduling
16. **shop_reports** - Shop reporting system
17. **ferpa_training_records** - FERPA compliance tracking
18. **document_signatures** - Digital signature tracking

### Features Enabled

✅ **Student Calendar** - Full calendar with events
✅ **Customer Service** - Support ticket system
✅ **QA System** - Quality assurance workflows
✅ **Staff Processes** - Process documentation
✅ **Employer Portal** - Job postings and applications
✅ **Apprenticeships** - Full apprenticeship management
✅ **Payroll** - Payroll profile management
✅ **CRM** - Customer relationship management
✅ **Tax Services** - VITA and tax filing
✅ **Shop System** - Shop reporting
✅ **Compliance** - FERPA training tracking
✅ **Digital Signatures** - Document signing

## After Migration: What Works

### Immediately Working (No Code Changes Needed)

- Calendar API (`/api/calendar`)
- All database tables exist
- RLS policies are configured
- Triggers are set up

### Needs Page Updates (Simple Query Changes)

Most pages just need to update their queries from template data to real tables.

**Example - Student Calendar Page:**

Current (template):

```typescript
const { data: items } = await supabase
  .from('profiles') // Wrong table
  .select('*');
```

Update to:

```typescript
const { data: events } = await supabase
  .from('calendar_events') // Correct table
  .select('*')
  .eq('user_id', user.id)
  .order('date', { ascending: true });
```

## Troubleshooting

### Error: "relation does not exist"

**Cause:** Migration didn't run or table name is wrong
**Fix:** Re-run migration, check table name spelling

### Error: "permission denied for table"

**Cause:** RLS policy issue
**Fix:** Check if user is authenticated, verify RLS policies

### Error: "column does not exist"

**Cause:** Query references wrong column name
**Fix:** Check table schema, update column name

### No Data Showing

**Cause:** No data in table yet
**Fix:** Insert test data or create records via UI

## Next Steps After Migration

1. ✅ Migration applied
2. ✅ Tables verified
3. Update page queries (one portal at a time)
4. Test each feature
5. Fix any bugs
6. Deploy

## Progress Tracking

Mark off as you complete:

- [ ] Migration applied successfully
- [ ] All 18 tables verified in database
- [ ] Dev server running
- [ ] Student Portal tested
- [ ] Admin Portal tested
- [ ] Staff Portal tested
- [ ] Partner Portal tested
- [ ] Employer Portal tested
- [ ] Onboarding tested
- [ ] Messages tested
- [ ] Payments tested
- [ ] All features working
- [ ] Ready for production

## Estimated Time

- Migration: 5 minutes
- Verification: 5 minutes
- Testing: 30 minutes
- Page updates: 2-3 weeks (systematic work)
- Final testing: 3-5 days
- **Total: 3-4 weeks to complete everything**

## Support

If you encounter issues:

1. Check the error message
2. Verify table exists in database
3. Check RLS policies
4. Review the migration file
5. Test API endpoint directly

## Remember

This migration creates the foundation. After this:

- All database tables exist
- All API routes can connect
- All pages can display data
- Just need to update queries in pages

**You're not building features - you're connecting them.**
