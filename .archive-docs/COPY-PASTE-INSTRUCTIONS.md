# Copy-Paste Database Setup

**Fastest way to set up your database - 2 minutes!**

## Single File Setup (Recommended)

### Step 1: Open Supabase

1. Go to your Supabase project
2. Click **SQL Editor** in the left sidebar

### Step 2: Copy the SQL

1. Open the file: **`COMPLETE-DATABASE-SETUP.sql`**
2. Press `Ctrl+A` (Windows/Linux) or `Cmd+A` (Mac) to select all
3. Press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac) to copy

### Step 3: Paste and Run

1. Go back to Supabase SQL Editor
2. Click in the editor area
3. Press `Ctrl+V` (Windows/Linux) or `Cmd+V` (Mac) to paste
4. Click the **Run** button (or press `Ctrl+Enter`)
5. Wait ~60 seconds for completion

### Step 4: Verify

Run this query to verify:

```sql
SELECT COUNT(*) FROM programs;
```

**Expected**: 30+ programs

---

## Alternative: Two-File Setup

If the single file is too large, use these two files:

### File 1: Migrations

**File**: `COPY-PASTE-SQL.sql` (1224 lines)

1. Copy entire file
2. Paste in Supabase SQL Editor
3. Run
4. Wait for completion

### File 2: Programs

**File**: `COPY-PASTE-PROGRAMS.sql` (1169 lines)

1. Copy entire file
2. Paste in Supabase SQL Editor
3. Run
4. Wait for completion

---

## What Gets Created

### Tables (50+)

- users, profiles, roles
- programs, courses, lessons
- enrollments, applications
- marketplace (creators, products, sales)
- LMS (quizzes, assignments, progress)
- partner/program holder management
- SCORM support
- analytics & reporting

### Programs (30+)

- Healthcare (CNA, Medical Assistant, etc.)
- Trades (HVAC, Welding, CDL, etc.)
- Business (Tax Prep, Entrepreneurship, etc.)
- Beauty (Barber, Esthetician, etc.)
- Technology (IT Support, etc.)

### Security

- RLS policies on all tables
- Role-based access control
- Data protection

---

## Troubleshooting

### "relation already exists"

**Cause**: Database already has tables
**Solution**: This is safe - tables won't be duplicated

### "duplicate key value"

**Cause**: Programs already seeded
**Solution**: This is safe - programs won't be duplicated

### "syntax error"

**Cause**: Didn't copy entire file
**Solution**: Make sure to copy from first line to last line

### "permission denied"

**Cause**: Using wrong credentials
**Solution**: Use Supabase SQL Editor (automatically uses correct credentials)

### Takes too long

**Cause**: Large file (2410 lines)
**Solution**:

- Wait up to 2 minutes
- Or use two-file setup instead
- Check Supabase logs for progress

---

## After Setup

1. ✅ Verify programs: `SELECT COUNT(*) FROM programs;`
2. ✅ Check tables: `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';`
3. ✅ Test your app: Visit your site and browse programs
4. ✅ Add email service: See `EMAIL-SERVICE-SETUP.md`

---

## Files Reference

| File                            | Lines | Purpose                |
| ------------------------------- | ----- | ---------------------- |
| **COMPLETE-DATABASE-SETUP.sql** | 2410  | Everything in one file |
| COPY-PASTE-SQL.sql              | 1224  | Just migrations        |
| COPY-PASTE-PROGRAMS.sql         | 1169  | Just programs          |
| 00-PREFLIGHT-CHECK.sql          | 80    | Check before setup     |
| VERIFY-AFTER-MIGRATION.sql      | 80    | Verify migrations      |
| VERIFY-PROGRAMS-SEEDED.sql      | 70    | Verify programs        |

---

## Quick Commands

```sql
-- Check if setup is complete
SELECT
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public') as tables,
  (SELECT COUNT(*) FROM programs) as programs,
  CASE
    WHEN (SELECT COUNT(*) FROM programs) >= 30
    THEN '✅ Setup complete!'
    ELSE '⚠️ Run COMPLETE-DATABASE-SETUP.sql'
  END as status;

-- List all programs
SELECT id, name, category, duration_weeks
FROM programs
ORDER BY category, name;

-- Check migration history
SELECT * FROM migration_history
ORDER BY applied_at DESC
LIMIT 10;
```

---

**Total Time**: 2-5 minutes
**Difficulty**: Easy (copy/paste)
**Support**: See DATABASE-QUICK-SETUP.md for detailed help

---

**Ready?** Open `COMPLETE-DATABASE-SETUP.sql` and copy it now! 🚀
