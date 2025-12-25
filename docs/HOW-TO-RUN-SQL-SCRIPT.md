# How to Run the SQL Script (Step-by-Step)

**Error you saw:** `syntax error at or near "scripts"`

**Why:** You pasted the **file path** instead of the **file contents**.

---

## ❌ WRONG - What You Did

```
scripts/current_state_apprenticeship.sql
```

This is a **file path**, not SQL code. Supabase doesn't know what to do with it.

---

## ✅ CORRECT - What You Should Do

### Step 1: Open the SQL File in Your Editor

In Gitpod or your local editor:

1. Navigate to `scripts/current_state_apprenticeship.sql`
2. **Open the file**
3. **Select ALL the contents** (Ctrl+A or Cmd+A)
4. **Copy** (Ctrl+C or Cmd+C)

### Step 2: Open Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 3: Paste the SQL Code

1. **Paste** the contents you copied (Ctrl+V or Cmd+V)
2. You should see SQL code starting with:
   ```sql
   -- ============================================================================
   -- CURRENT STATE: Apprenticeship/Shop/Employer Database Truth
   -- ============================================================================
   ```

### Step 4: Run the Query

1. Click **Run** button (or press Ctrl+Enter)
2. Wait for results (may take 10-30 seconds)
3. **Copy ALL output** including:
   - NOTICE messages
   - Query results
   - All tables

### Step 5: Paste Results to GitHub

1. Go to [GitHub Issue #1383](https://github.com/elevateforhumanity/fix2/issues/1383)
2. Click **Add a comment**
3. Paste all the output
4. Click **Comment**

---

## Visual Guide

```
┌─────────────────────────────────────────────────────────┐
│ 1. GITPOD/EDITOR                                        │
│                                                         │
│ scripts/current_state_apprenticeship.sql                │
│ ┌─────────────────────────────────────────────────┐   │
│ │ -- ============================================  │   │
│ │ -- CURRENT STATE: Apprenticeship Database       │   │
│ │ -- ============================================  │   │
│ │                                                  │   │
│ │ DO $$                                            │   │
│ │ DECLARE                                          │   │
│ │   table_name TEXT;                               │   │
│ │   ...                                            │   │
│ │                                                  │   │
│ │ [SELECT ALL THIS CODE]                           │   │
│ │ [COPY IT]                                        │   │
│ └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Copy (Ctrl+C)
                           ▼
┌─────────────────────────────────────────────────────────┐
│ 2. SUPABASE SQL EDITOR                                  │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ [PASTE THE CODE HERE]                            │   │
│ │                                                  │   │
│ │ -- ============================================  │   │
│ │ -- CURRENT STATE: Apprenticeship Database       │   │
│ │ -- ============================================  │   │
│ │                                                  │   │
│ │ DO $$                                            │   │
│ │ DECLARE                                          │   │
│ │   table_name TEXT;                               │   │
│ │   ...                                            │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [Click RUN button]                                      │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Run Query
                           ▼
┌─────────────────────────────────────────────────────────┐
│ 3. RESULTS                                              │
│                                                         │
│ NOTICE: Table: shops | Exists: YES | Row Count: 5      │
│ NOTICE: Table: shop_staff | Exists: YES | Row Count: 3 │
│ ...                                                     │
│                                                         │
│ table_name | column_name | data_type | ...             │
│ -----------|-------------|-----------|----              │
│ shops      | id          | uuid      | ...             │
│ shops      | name        | text      | ...             │
│ ...                                                     │
│                                                         │
│ [COPY ALL THIS OUTPUT]                                  │
└─────────────────────────────────────────────────────────┘
                           │
                           │ Copy Results
                           ▼
┌─────────────────────────────────────────────────────────┐
│ 4. GITHUB ISSUE #1383                                   │
│                                                         │
│ [Add a comment]                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ [PASTE RESULTS HERE]                             │   │
│ │                                                  │   │
│ │ NOTICE: Table: shops | Exists: YES | ...        │   │
│ │ NOTICE: Table: shop_staff | Exists: YES | ...   │   │
│ │ ...                                              │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [Click Comment]                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Common Mistakes

### ❌ Mistake 1: Pasting File Path

```
scripts/current_state_apprenticeship.sql
```

**Error:** `syntax error at or near "scripts"`

### ❌ Mistake 2: Pasting Partial Code

```sql
DO $$
BEGIN
  RAISE NOTICE 'Test';
END $$;
```

**Result:** Only partial output, missing critical data

### ❌ Mistake 3: Not Copying Output

**Result:** Can't complete truth packet

### ✅ Correct: Paste Full SQL Code

```sql
-- ============================================================================
-- CURRENT STATE: Apprenticeship/Shop/Employer Database Truth
-- ============================================================================
-- Purpose: Document what exists NOW in the database for apprenticeship flows
-- Run this in Supabase SQL Editor and paste results into GitHub Issue #1383
-- ============================================================================

DO $$
DECLARE
  table_name TEXT;
  row_count BIGINT;
  tables TEXT[] := ARRAY[
    'shops',
    'shop_staff',
    'apprentice_placements',
    ...
```

---

## Quick Reference

| Step | Action          | Tool                    |
| ---- | --------------- | ----------------------- |
| 1    | Open file       | Gitpod/Editor           |
| 2    | Select all      | Ctrl+A / Cmd+A          |
| 3    | Copy            | Ctrl+C / Cmd+C          |
| 4    | Open SQL Editor | Supabase Dashboard      |
| 5    | Paste code      | Ctrl+V / Cmd+V          |
| 6    | Run query       | Click Run or Ctrl+Enter |
| 7    | Copy output     | Select all results      |
| 8    | Paste to GitHub | Issue #1383 comment     |

---

## What the Output Should Look Like

```
NOTICE: ============================================================================
NOTICE: SECTION A: TABLE INVENTORY + ROW COUNTS
NOTICE: ============================================================================
NOTICE:
NOTICE: Table: shops | Exists: YES | Row Count: 5
NOTICE: Table: shop_staff | Exists: YES | Row Count: 3
NOTICE: Table: apprentice_placements | Exists: YES | Row Count: 2
NOTICE: Table: apprentice_weekly_reports | Exists: YES | Row Count: 1
NOTICE: Table: apprenticeship_enrollments | Exists: YES | Row Count: 4
NOTICE: Table: apprentices | Exists: NO
NOTICE: Table: employers | Exists: YES | Row Count: 2

[Then multiple result tables showing columns, foreign keys, RLS policies, etc.]
```

---

## Still Stuck?

### If you see "syntax error":

- You pasted the file path, not the file contents
- Open the file and copy the SQL code inside

### If you see "permission denied":

- You need admin access to Supabase
- Ask someone with access to run it

### If you see no output:

- The query might still be running (wait)
- Check for errors in the Results tab
- Try running smaller sections

---

## Need Help?

Comment on [GitHub Issue #1383](https://github.com/elevateforhumanity/fix2/issues/1383) with:

- What you did
- What error you got
- Screenshot if possible

---

**Remember:**

- **File path** = ❌ Won't work
- **File contents** = ✅ Will work
