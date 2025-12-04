# Partner Integration - SQL Setup

## 5 Simple Copy-Paste Steps

Each file is ready to copy and paste directly into Supabase SQL Editor.

---

## Step 1: Create Tables and Functions

**File:** `SQL_STEP_1_CREATE_TABLES.sql`

1. Open the file
2. Copy the entire contents (Ctrl+A, Ctrl+C)
3. Go to Supabase Dashboard → SQL Editor
4. Paste (Ctrl+V)
5. Click **RUN**

**What this does:** Creates all tables, functions, and policies

---

## Step 2: Get Your Program IDs

**Don't have any program IDs yet?** Use one of these:

**Option A: Check for ETPL Programs**
- **File:** `SQL_GET_ETPL_PROGRAM_IDS.sql`
- Shows IDs for ETPL (Eligible Training Provider List) programs
- These are programs with WIOA/WRG funding

**Option B: Check for ANY Programs**
- **File:** `SQL_CHECK_PROGRAMS.sql`
- Shows all programs in your database

**Option C: Create Sample Programs**
- **File:** `SQL_COMPLETE_SETUP_WITH_PROGRAMS.sql`
- Creates programs AND adds partner modules
- Skip to Step 4 if you use this

**Standard Workflow:**
- **File:** `SQL_STEP_2_GET_PROGRAM_IDS.sql`

1. Open the file
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **RUN**
5. **SAVE THE RESULTS** - you need these IDs for Step 3!

**What this does:** Shows all your programs with their IDs

---

## Step 3: Add Partner Modules

**OPTION A: Get Recommendations First (Recommended)**

**File:** `SQL_HELPER_WHAT_TO_ADD.sql`

1. Open the file
2. Copy and paste into Supabase SQL Editor
3. Click **RUN**
4. See your programs with recommendations for which partners to add
5. Copy the template for your program type
6. Replace `YOUR-PROGRAM-ID` with your actual ID
7. Run it!

**OPTION B: Add One Module at a Time**

**File:** `SQL_STEP_3_SIMPLE_ADD_ONE_MODULE.sql`

1. Open the file
2. Find the partner you want to add (Milady, HSI, CareerSafe, etc.)
3. Copy that INSERT statement
4. Replace `YOUR-PROGRAM-ID-HERE` with your actual program ID
5. Paste into Supabase SQL Editor
6. Click **RUN**
7. Repeat for each module you want to add

**OPTION C: Add All at Once (Advanced)**

**File:** `SQL_STEP_3_ADD_PARTNER_MODULES.sql`

1. Open the file
2. **FIND AND REPLACE** all placeholder IDs with your actual IDs
3. **DELETE** any INSERT statements for programs you don't have
4. Copy the entire contents
5. Paste into Supabase SQL Editor
6. Click **RUN**

**What this does:** Adds partner modules to your programs

**Tip:** Don't have a specific program? Just skip it or add the module to a related program!

---

## Step 4: Verify It Worked

**File:** `SQL_STEP_4_VERIFY.sql`

1. Open the file
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **RUN**
5. Check the results - you should see all your partner modules!

**What this does:** Shows all partner modules that were added

---

## Step 5: Create Storage Policies

**File:** `SQL_STEP_5_STORAGE_POLICIES.sql`

**FIRST:** Create the storage bucket
1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `external-proof`
4. Public bucket: **YES** (checked)
5. Click "Create bucket"

**THEN:** Run the SQL
1. Open `SQL_STEP_5_STORAGE_POLICIES.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **RUN**

**What this does:** Sets up permissions for file uploads

---

## Done! 🎉

**What you just deployed:**
- ✅ External partner module tables
- ✅ Progress tracking system
- ✅ Course completion functions
- ✅ Partner modules for your programs
- ✅ Storage bucket for proof uploads

**Test it:**
1. Log in as a student
2. Go to a course with partner modules
3. Click on an external module
4. Upload a test certificate
5. Log in as admin
6. Go to `/admin/external-progress`
7. Approve the submission

**Need help?**
- See `DEPLOYMENT_GUIDE_PARTNER_INTEGRATION.md` for detailed instructions
- See `ADMIN_GUIDE_EXTERNAL_MODULES.md` for admin training
- See `STUDENT_GUIDE_EXTERNAL_MODULES.md` for student instructions

---

## Quick Reference

**Student URLs:**
- Course page: `/student/courses/[courseId]`
- External module: `/student/courses/[courseId]/external/[moduleId]`

**Admin URLs:**
- Review dashboard: `/admin/external-progress`
- Approvals: `/admin/external-modules/approvals`

**Test Queries:**
```sql
-- See all modules
SELECT * FROM external_partner_modules;

-- See all progress
SELECT * FROM external_partner_progress;

-- Check completion for a student
SELECT * FROM check_course_completion(
  'course-id'::uuid,
  'user-id'::uuid
);
```

---

## Troubleshooting

**Error: relation "programs" does not exist**
- Your table might be named "courses" instead
- Edit Step 1 file: Change `programs` to `courses`

**Error: column "program_id" does not exist**
- Your column might be named "course_id" instead
- Edit Step 1 file: Change `program_id` to `course_id`

**No programs showing in Step 2**
- Check if your table is named "courses" instead
- Run: `SELECT * FROM courses;`

**Partner modules not showing**
- Run Step 4 to verify
- Check that you replaced the program IDs in Step 3
- Make sure you clicked RUN after pasting

---

## Files Overview

| File | Purpose | Time |
|------|---------|------|
| SQL_STEP_1_CREATE_TABLES.sql | Create all tables/functions | 30 sec |
| SQL_STEP_2_GET_PROGRAM_IDS.sql | Get your program IDs | 5 sec |
| SQL_STEP_3_ADD_PARTNER_MODULES.sql | Add partner modules | 1 min |
| SQL_STEP_4_VERIFY.sql | Verify it worked | 5 sec |
| SQL_STEP_5_STORAGE_POLICIES.sql | Storage permissions | 30 sec |

**Total time:** ~5 minutes

---

## What's Next?

After running all 5 SQL files:

1. **Test with a student account**
   - Enroll in a course
   - Find external module
   - Upload test certificate

2. **Test admin approval**
   - Go to `/admin/external-progress`
   - See the submission
   - Click "Approve"

3. **Train your team**
   - Share `ADMIN_GUIDE_EXTERNAL_MODULES.md` with admins
   - Share `STUDENT_GUIDE_EXTERNAL_MODULES.md` with students

4. **Contact partners for API credentials**
   - See `API_CREDENTIAL_SETUP_CHECKLIST.md`
   - Start with Certiport and CareerSafe (highest revenue)

5. **Roll out to all students**
   - Email announcement
   - Update course syllabi
   - Monitor completion rates

**Questions?** support@elevateforhumanity.org
