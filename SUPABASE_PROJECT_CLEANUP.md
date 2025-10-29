# Supabase Project Cleanup Guide

## Current Situation

You have **2 Supabase projects** that may be causing confusion:

1. **Project: "elevate"** (AWS us-east-2, nano tier)
2. **Project: "elevateforhumanity's Project"** (AWS us-east-2, nano tier)

## Active Project in Codebase

**Current project in use:** `cuxzzpsyufcewtmicszk`

This project reference is used throughout the codebase in:
- `.env` file
- `netlify.toml`
- `.integration-config.json`
- Documentation files
- Security headers

## Recommended Action: Keep One, Delete One

### Option 1: Keep "elevateforhumanity's Project" (Recommended)

**Why:**
- More descriptive name
- Likely the main production project
- Already configured in codebase

**Steps:**
1. Verify this is project `cuxzzpsyufcewtmicszk`
2. Delete the "elevate" project
3. Keep using current configuration

### Option 2: Keep "elevate" Project

**Why:**
- Shorter, cleaner name
- Easier to reference

**Steps:**
1. Get project ref for "elevate" project
2. Update all references in codebase
3. Delete "elevateforhumanity's Project"

## How to Delete Duplicate Project

### Via Supabase Dashboard (Recommended)

1. **Login to Supabase:**
   ```
   https://supabase.com/dashboard
   ```

2. **Identify Which Project to Delete:**
   - Click on each project
   - Check the project reference (in URL)
   - Compare with `cuxzzpsyufcewtmicszk`

3. **Delete the Unused Project:**
   - Go to the project you want to delete
   - Click: Settings → General
   - Scroll to bottom: "Danger Zone"
   - Click: "Delete Project"
   - Type project name to confirm
   - Click: "I understand, delete this project"

### Via Supabase CLI

```bash
# List all projects
supabase projects list

# Delete specific project
supabase projects delete <project-ref>
```

## Verification Steps

### Step 1: Identify Active Project

```bash
# Check which project is in use
grep "SUPABASE_URL" .env
# Should show: https://cuxzzpsyufcewtmicszk.supabase.co
```

### Step 2: Verify Project in Dashboard

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Check project name
3. Verify it's the one you want to keep

### Step 3: Check Database Tables

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor
2. Verify tables exist:
   - programs
   - courses
   - lessons
   - enrollments
   - certificates
   - etc.

### Step 4: Test Connection

```bash
# Test Supabase connection
curl -H "apikey: YOUR_ANON_KEY" \
  https://cuxzzpsyufcewtmicszk.supabase.co/rest/v1/programs
```

## Decision Matrix

| Factor | Keep "elevate" | Keep "elevateforhumanity's Project" |
|--------|----------------|-------------------------------------|
| **Name Clarity** | ❌ Generic | ✅ Descriptive |
| **Current Config** | ❌ Need to update | ✅ Already configured |
| **Effort** | ⚠️ Medium (update code) | ✅ Low (delete other) |
| **Risk** | ⚠️ Medium (config changes) | ✅ Low (no changes) |

**Recommendation:** Keep "elevateforhumanity's Project" (cuxzzpsyufcewtmicszk)

## Automated Cleanup Script

I can create an autopilot script to:
1. Verify which project is active
2. Check for data in each project
3. Safely delete the unused project
4. Update any remaining references

Would you like me to create this script?

## Manual Cleanup Steps (Safest)

### Step 1: Backup Current Project

```bash
# Export schema
supabase db dump --project-ref cuxzzpsyufcewtmicszk > backup.sql

# Export data
supabase db dump --data-only --project-ref cuxzzpsyufcewtmicszk > data.sql
```

### Step 2: Identify Duplicate

1. Login to Supabase Dashboard
2. Check both projects
3. Identify which one has:
   - ✅ Data in tables
   - ✅ Configured API keys
   - ✅ Active connections

### Step 3: Delete Empty Project

1. Go to the project with NO data
2. Settings → General → Delete Project
3. Confirm deletion

### Step 4: Verify Single Project

```bash
# List projects
supabase projects list

# Should show only 1 project
```

## What Happens After Deletion

### Immediate Effects
- ✅ Project removed from dashboard
- ✅ Database deleted
- ✅ API endpoints disabled
- ✅ No more confusion

### No Impact On
- ✅ Active project (cuxzzpsyufcewtmicszk)
- ✅ Current codebase
- ✅ Netlify deployment
- ✅ Live website

## Quick Decision Guide

**If you're not sure which to delete:**

1. **Check project with data:**
   ```
   Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor
   Count tables with data
   ```

2. **Check the other project:**
   ```
   Go to other project in dashboard
   Check if it has any tables or data
   ```

3. **Delete the empty one:**
   - If one project is empty → Delete it
   - If both have data → Keep cuxzzpsyufcewtmicszk (it's in your code)

## Need Help?

I can help you:
1. ✅ Identify which project to keep
2. ✅ Verify data before deletion
3. ✅ Create backup before deletion
4. ✅ Delete the duplicate project
5. ✅ Verify everything still works

Just let me know which project you want to keep!

## Current Recommendation

**Action:** Delete the "elevate" project (if it's not cuxzzpsyufcewtmicszk)

**Reason:**
- Your codebase uses `cuxzzpsyufcewtmicszk`
- This is likely "elevateforhumanity's Project"
- The "elevate" project is probably empty or a test

**Steps:**
1. Go to Supabase Dashboard
2. Open the "elevate" project
3. Check if it's empty (no tables/data)
4. If empty, delete it
5. Keep using cuxzzpsyufcewtmicszk

---

**Status:** Awaiting your decision  
**Risk:** Low (if you delete the empty project)  
**Time:** 2 minutes to delete via dashboard
