# Migration Deployment Guide

## Run These Migrations in Supabase SQL Editor

Copy and paste each file's contents into the Supabase SQL Editor and run them **in this exact order**.

### Step 1: Indiana Enrollment Fields
**File:** `supabase/migrations/20231214_indiana_enrollment_fields.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 2: Student Onboarding
**File:** `supabase/migrations/20251218_student_onboarding.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 3: Shop Placements
**File:** `supabase/migrations/20251218_shop_placements.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 4: Shop Partner Portal
**File:** `supabase/migrations/20251218_shop_partner_portal.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 5: Shop Partner RLS
**File:** `supabase/migrations/20251218_shop_partner_rls.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 6: Shop Onboarding Documents
**File:** `supabase/migrations/20251219_shop_onboarding_docs.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 7: Shop Document Requirements
**File:** `supabase/migrations/20251219_shop_doc_types_and_requirements.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

### Step 8: Non-Compete Agreement
**File:** `supabase/migrations/20251220_add_non_compete.sql`

Open this file, copy all contents, paste into Supabase SQL Editor, and click "Run".

---

## Alternative: Use Supabase CLI

If you have Supabase CLI installed:

```bash
supabase db push
```

This will automatically run all migrations in order.

---

## Verification

After running all migrations, verify tables exist:

```sql
-- Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'student_onboarding',
  'shops',
  'shop_staff',
  'shop_applications',
  'shop_documents',
  'shop_document_requirements',
  'shop_onboarding',
  'shop_signatures',
  'apprentice_placements',
  'apprentice_weekly_reports',
  'apprentice_wage_updates'
)
ORDER BY table_name;
```

You should see all 11 tables listed.

---

## Seed Test Data

After migrations are complete, run the seed script:

**File:** `scripts/seed-test-data.sql`

Copy contents and run in Supabase SQL Editor.

This will create:
- Test barber program
- AI instructor
- Indiana state compliance record
- EFH tenant record

---

## Troubleshooting

**If you get "relation already exists" errors:**
- This is OK - it means the table was already created
- Continue with the next migration

**If you get "column already exists" errors:**
- This is OK - it means the column was already added
- Continue with the next migration

**If you get permission errors:**
- Make sure you're using the Supabase SQL Editor (not psql)
- Make sure you're logged in as the project owner

**If you get syntax errors:**
- Make sure you copied the ENTIRE file contents
- Don't add any comments or extra text
- Run each file separately, one at a time

---

## Next Steps After Migrations

1. Create storage bucket: `shop-onboarding` (Private)
2. Add environment variable: `NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER`
3. Test enrollment flow
4. Deploy to production
