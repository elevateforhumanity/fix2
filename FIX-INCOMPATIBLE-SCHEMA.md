# 🔧 FIX INCOMPATIBLE SCHEMA

**Your database has an existing schema. Here's how to update it.**

---

## ✅ THE SOLUTION

Run **ONE migration file** that will update your existing schema without breaking anything.

---

## ⚡ EXECUTE NOW (2 minutes)

### Step 1: Open SQL Editor

**Go to:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor)

### Step 2: Run the Schema Update

1. Click **"New query"**
2. Open file: `supabase/migrations/20241124_update_existing_schema.sql`
3. **Copy ALL content**
4. **Paste** into SQL Editor
5. Click **"Run"**
6. Wait for ✅ **Success**

**This will:**
- ✅ Add missing columns to your existing `courses` table
- ✅ Create `modules` table
- ✅ Create `programs` table
- ✅ Create `external_lms_enrollments` table
- ✅ Create `ojt_logs` table
- ✅ Keep all your existing 17 courses intact

---

### Step 3: Load New Courses

After the schema is updated, run these 3 files:

**File 1:** `supabase/migrations/20241123_milady_integration.sql`
- Loads Barber course with Milady integration

**File 2:** `supabase/migrations/20241124_load_all_partner_courses.sql`
- Loads 6 partner courses

**File 3:** `supabase/migrations/20241124_load_remaining_etpl_courses.sql`
- Loads 4 remaining ETPL courses

---

## 📊 RESULT

After completion:
- ✅ Your existing 17 courses remain
- ✅ 11 new ETPL courses added
- ✅ **Total: 28 courses**
- ✅ All with proper ETPL IDs
- ✅ External LMS integration ready
- ✅ OJT tracking ready

---

## 🎯 QUICK VERSION

**Just run these 4 files in order:**

1. `20241124_update_existing_schema.sql` ← **START HERE**
2. `20241123_milady_integration.sql`
3. `20241124_load_all_partner_courses.sql`
4. `20241124_load_remaining_etpl_courses.sql`

**Time: 5 minutes total**

---

*Created: November 24, 2024*  
*Status: Ready to Execute*  
*Fixes: Schema incompatibility*
