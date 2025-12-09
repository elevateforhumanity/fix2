# How to Run the Migration - 3 Easy Steps

## Step 1: Open Supabase SQL Editor
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

## Step 2: Copy & Paste
1. Open the file: `COPY_PASTE_MIGRATION.sql`
2. Select ALL the text (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)
4. Paste into Supabase SQL Editor (Ctrl+V or Cmd+V)

## Step 3: Run It
1. Click the **RUN** button (or press Ctrl+Enter)
2. Wait 2-3 seconds
3. You should see **6 courses** in the results at the bottom

## What You Should See:

```
✅ Success! 6 rows returned

id                                   | title                                      | moderation_status | category
-------------------------------------|--------------------------------------------|--------------------|------------------
uuid-here                            | Barber Apprenticeship                      | approved          | Beauty & Wellness
uuid-here                            | Building Maintenance Technician            | approved          | Skilled Trades
uuid-here                            | Certified Nursing Assistant (CNA) Training | approved          | Healthcare
uuid-here                            | Commercial Driver's License (CDL) Training | approved          | Transportation
uuid-here                            | HVAC Technician Training                   | approved          | Skilled Trades
uuid-here                            | Workforce Readiness Training               | approved          | Career Development
```

## Verify It Worked:

1. Go to your website: `www.elevateforhumanity.org/courses`
2. You should see **6 courses** displayed
3. Click on any course to view details

## If You See Errors:

### Error: "column already exists"
**This is OK!** It means the field was already there. The migration will continue.

### Error: "relation does not exist"
**Problem:** The courses table doesn't exist yet.
**Solution:** Run the main schema migration first, then run this one.

### Error: "duplicate key value"
**This is OK!** It means the courses already exist. The migration will update them instead.

## Need Help?

Check these files for more details:
- `DATABASE_CONNECTION_FIX.md` - Full technical explanation
- `COPY_PASTE_MIGRATION.sql` - The SQL to run
- `supabase/migrations/20241205_fix_courses_schema_and_seed.sql` - Same content

---

**That's it! Once you run this, your courses will appear on the website.** 🎉
