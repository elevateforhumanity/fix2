# Required Database Migrations for Elevate for Humanity

## Overview
You need to run these 3 SQL migrations in your Supabase SQL Editor to enable core functionality.

## Migration Order (IMPORTANT - Run in this order!)

### 1. Applications Table (FIRST)
**File:** `supabase/sql/applications_schema.sql`

**What it does:**
- Creates the `applications` table for program applications
- Stores applicant information (name, email, phone)
- Tracks program interest and funding options (JRI, WEX, OJT)
- Includes status tracking (submitted, approved, etc.)

**Run this SQL:**
```sql
-- Copy and paste the entire contents of supabase/sql/applications_schema.sql
```

---

### 2. Enrollments Table (SECOND)
**File:** `supabase/sql/enrollments_schema.sql`

**What it does:**
- Creates the `enrollments` table for paid enrollments
- Links to Stripe payment sessions
- Adds `payment_status` column to applications table
- Tracks enrollment status (active, cancelled, completed)

**Run this SQL:**
```sql
-- Copy and paste the entire contents of supabase/sql/enrollments_schema.sql
```

---

### 3. Student Courses Table (THIRD)
**File:** `supabase/sql/student_courses_schema.sql`

**What it does:**
- Creates the `student_courses` table for course access
- Links students to specific courses within programs
- Prevents duplicate enrollments (unique constraint)
- Tracks enrollment source (stripe-webhook, manual, etc.)

**Run this SQL:**
```sql
-- Copy and paste the entire contents of supabase/sql/student_courses_schema.sql
```

---

## How to Run Migrations

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "SQL Editor" in the left sidebar

### Step 2: Run Each Migration
1. Click "New Query"
2. Copy the contents of `supabase/sql/applications_schema.sql`
3. Paste into the SQL editor
4. Click "Run" or press Ctrl+Enter
5. Wait for success message
6. Repeat for `enrollments_schema.sql`
7. Repeat for `student_courses_schema.sql`

### Step 3: Verify Tables Were Created
Run this query to check:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('applications', 'enrollments', 'student_courses');
```

You should see all 3 tables listed.

---

## What Features Require These Tables?

### Applications Table Required For:
- `/apply` page - Program application form
- `/admin/applications` - View and manage applications
- Application status tracking
- Applicant contact information

### Enrollments Table Required For:
- Stripe payment processing
- `/checkout/[programId]` - Payment checkout
- Enrollment tracking
- Payment status updates

### Student Courses Table Required For:
- `/lms/courses` - Student course access
- `/student/dashboard` - Student course list
- Course enrollment verification
- LMS access control

---

## Troubleshooting

### Error: "relation already exists"
**Solution:** Table already exists. Skip that migration or drop the table first:
```sql
DROP TABLE IF EXISTS public.applications CASCADE;
-- Then re-run the migration
```

### Error: "permission denied"
**Solution:** Make sure you're logged into Supabase as the project owner.

### Error: "column already exists"
**Solution:** The `payment_status` column was already added. This is safe to ignore.

---

## After Running Migrations

### Test the Applications Flow:
1. Visit `/apply` on your site
2. Fill out the application form
3. Submit
4. Check Supabase dashboard → Table Editor → applications
5. You should see your test application

### Test the Enrollments Flow:
1. Visit `/programs` on your site
2. Click "Apply Now" on an ETPL program
3. Complete checkout (use Stripe test mode)
4. Check Supabase dashboard → Table Editor → enrollments
5. You should see the enrollment record

---

## Need Help?

If migrations fail:
1. Check the Supabase logs in the dashboard
2. Verify your Supabase connection in `.env.local`
3. Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
4. Try running migrations one at a time

---

## Summary

✅ **3 migrations total**
✅ **Run in order: applications → enrollments → student_courses**
✅ **Takes ~2 minutes to complete**
✅ **Enables applications, payments, and LMS access**
