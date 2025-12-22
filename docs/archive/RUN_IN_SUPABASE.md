# 🔒 RUN THIS SQL IN SUPABASE

## STEP 1: Open the SQL file

In VSCode (right side), open:

```
supabase/migrations/20241219_security_lockdown_safe.sql
```

## STEP 2: Copy ALL the contents

- Click inside the file
- Press `Ctrl+A` (Windows/Linux) or `Cmd+A` (Mac) to select all
- Press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac) to copy

## STEP 3: Paste in Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New Query" button
4. Paste the SQL (Ctrl+V or Cmd+V)
5. Click "Run" button

## STEP 4: Wait for completion

You should see:

```
✅ Security lockdown complete (safe version)
✅ RLS enabled + deny_all applied to all public tables
✅ Public read opened for catalog tables that exist
✅ Day-1 student/admin policies applied (where tables exist)
✅ course_completion_status created (only if public.courses exists)
🔒 Database is now launch-ready
```

## STEP 5: Test

1. Visit your site `/apply` - submit a test application
2. Visit `/programs` - verify programs load

## If you get an error

Copy the EXACT error message and paste it back to me.

---

**DO NOT type the filename into SQL Editor - you must copy the SQL code itself!**
