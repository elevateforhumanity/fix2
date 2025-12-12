# 🚀 Run Database Migrations - Step by Step

**3 Migration Files Ready to Run**

---

## 📋 MIGRATION FILES

1. **20251212_complete_accreditation_systems.sql** (602 lines)
   - Creates 16 new tables
   - Adds RLS policies
   - Creates SQL functions
   - Sets up indexes

2. **20251212_automation_triggers.sql** (722 lines)
   - Creates automatic triggers
   - Sets up email notifications
   - Configures SAP monitoring
   - Enables auto-enrollment

3. **20251212_test_data.sql** (319 lines) - OPTIONAL
   - Creates test student
   - Sample enrollment data
   - Test for development only

---

## 🎯 HOW TO RUN MIGRATIONS

### Option 1: Supabase Dashboard (Recommended)

**Step 1: Go to Supabase Dashboard**

```
https://supabase.com/dashboard
```

**Step 2: Select Your Project**

- Click on your project name

**Step 3: Open SQL Editor**

- Click "SQL Editor" in left sidebar
- Click "New Query"

**Step 4: Run Migration 1**

1. Open file: `supabase/migrations/20251212_complete_accreditation_systems.sql`
2. Copy ALL contents
3. Paste into SQL Editor
4. Click "Run" (or press Cmd/Ctrl + Enter)
5. Wait for "Success" message

**Step 5: Run Migration 2**

1. Click "New Query" again
2. Open file: `supabase/migrations/20251212_automation_triggers.sql`
3. Copy ALL contents
4. Paste into SQL Editor
5. Click "Run"
6. Wait for "Success" message

**Step 6: (Optional) Run Test Data**

1. Click "New Query" again
2. Open file: `supabase/migrations/20251212_test_data.sql`
3. Copy ALL contents
4. Paste into SQL Editor
5. Click "Run"
6. Check for test student created

---

### Option 2: Supabase CLI

**If you have Supabase CLI installed:**

```bash
# Link to your project (first time only)
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Or run specific migration
supabase db execute --file supabase/migrations/20251212_complete_accreditation_systems.sql
supabase db execute --file supabase/migrations/20251212_automation_triggers.sql
```

---

### Option 3: Direct psql

**If you have database URL:**

```bash
# Set your database URL
export DATABASE_URL="postgresql://postgres:[password]@[host]:5432/postgres"

# Run migrations
psql $DATABASE_URL < supabase/migrations/20251212_complete_accreditation_systems.sql
psql $DATABASE_URL < supabase/migrations/20251212_automation_triggers.sql
```

---

## ✅ VERIFY MIGRATIONS WORKED

### Check Tables Were Created

Run this query in SQL Editor:

```sql
-- Check new tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'welcome_packets',
    'welcome_packet_items',
    'ai_instructor_logs',
    'student_hours',
    'ecr_snapshots',
    'ecr_sync_logs',
    'mou_templates',
    'mou_signatures',
    'onboarding_steps',
    'student_onboarding',
    'email_logs',
    'attendance_records',
    'grades',
    'complaints',
    'refunds',
    'withdrawals'
  )
ORDER BY table_name;
```

**Expected Result:** Should return 16 rows (all table names)

---

### Check Triggers Were Created

```sql
-- Check triggers exist
SELECT
  trigger_name,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name LIKE 'on_%'
ORDER BY event_object_table, trigger_name;
```

**Expected Result:** Should return multiple triggers

---

### Check Test Data (If You Ran It)

```sql
-- Check test student exists
SELECT
  id,
  email,
  full_name,
  role
FROM profiles
WHERE email = 'test.student@example.com';
```

**Expected Result:** Should return 1 row with test student

---

## 🔍 WHAT EACH MIGRATION DOES

### Migration 1: Complete Accreditation Systems

**Creates Tables:**

- `welcome_packets` - Welcome packet tracking
- `welcome_packet_items` - Individual packet items
- `ai_instructor_logs` - AI conversation logs
- `student_hours` - Practical hour logging
- `ecr_snapshots` - Electronic completion records
- `ecr_sync_logs` - Sync job tracking
- `mou_templates` - Agreement templates
- `mou_signatures` - Digital signatures
- `onboarding_steps` - Onboarding workflow
- `student_onboarding` - Student progress
- `email_logs` - Email delivery tracking
- `attendance_records` - Daily attendance
- `grades` - Assessment results
- `complaints` - Grievance tracking
- `refunds` - Refund processing
- `withdrawals` - Withdrawal tracking

**Creates Functions:**

- `calculate_attendance_percentage()` - Attendance calculation
- `calculate_gpa()` - GPA calculation
- `update_updated_at_column()` - Timestamp trigger

**Sets Up:**

- Row Level Security (RLS) policies
- Indexes for performance
- Default data (onboarding steps, MOU template)

---

### Migration 2: Automation Triggers

**Creates Automatic Triggers:**

1. **On Enrollment:**
   - Creates welcome packet
   - Initializes onboarding checklist
   - Sends welcome email

2. **On Payment:**
   - Creates enrollment
   - Sends confirmation email

3. **On Attendance:**
   - Updates attendance percentage
   - Sends warnings if below 80%

4. **On Grade:**
   - Calculates GPA
   - Sends warnings if below 2.0

5. **On Hours Logged:**
   - Updates total hours
   - Updates progress percentage

6. **On Progress Update:**
   - Checks SAP status
   - Creates ECR snapshot
   - Sends notifications

7. **On Welcome Packet Item:**
   - Checks if all required items complete
   - Marks packet complete
   - Sends completion email

8. **On Complaint:**
   - Notifies admin
   - Sends confirmation to student

9. **On Withdrawal:**
   - Updates enrollment status
   - Sends confirmation

---

### Migration 3: Test Data (Optional)

**Creates:**

- 2 test programs (Barbering, CNA)
- 1 test student (test.student@example.com)
- 1 test enrollment
- 1 test payment
- 30 attendance records
- 3 grades
- 3 student hours

**Use For:**

- Development testing
- Feature verification
- Demo purposes

**DO NOT run in production with real students!**

---

## 🚨 TROUBLESHOOTING

### Error: "relation already exists"

**Cause:** Table already exists from previous migration

**Solution:**

- This is OK - migration uses `CREATE TABLE IF NOT EXISTS`
- Migration will skip existing tables
- Continue with next migration

---

### Error: "permission denied"

**Cause:** Not enough database permissions

**Solution:**

- Make sure you're using the correct database URL
- Use service role key (not anon key)
- Check you're logged into correct Supabase project

---

### Error: "syntax error"

**Cause:** SQL syntax issue or incomplete copy

**Solution:**

- Make sure you copied the ENTIRE file
- Check for any missing characters
- Try copying again from the file

---

### Error: "trigger already exists"

**Cause:** Trigger was created in previous run

**Solution:**

- This is OK - migration uses `DROP TRIGGER IF EXISTS`
- Migration will recreate the trigger
- No action needed

---

## 📊 EXPECTED RESULTS

After running all migrations, you should have:

✅ **16 new tables** for accreditation system  
✅ **10+ automatic triggers** for automation  
✅ **RLS policies** for security  
✅ **SQL functions** for calculations  
✅ **Indexes** for performance  
✅ **Default data** (onboarding steps, MOU template)  
✅ **Test data** (if you ran migration 3)

---

## 🎯 NEXT STEPS AFTER MIGRATIONS

1. **Verify Tables Exist**
   - Run verification queries above
   - Check Supabase Table Editor

2. **Test Triggers**
   - Create a test enrollment
   - Check welcome packet is created
   - Verify emails are logged

3. **Deploy Application**
   - Vercel will auto-deploy from GitHub
   - Add environment variables
   - Test live site

4. **Monitor System**
   - Check Supabase logs
   - Monitor trigger execution
   - Verify automation works

---

## 📞 NEED HELP?

**Supabase Support:**

- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support

**Migration Files Location:**

```
/workspaces/fix2/supabase/migrations/
├── 20251212_complete_accreditation_systems.sql
├── 20251212_automation_triggers.sql
└── 20251212_test_data.sql
```

---

## ✅ QUICK CHECKLIST

- [ ] Open Supabase Dashboard
- [ ] Go to SQL Editor
- [ ] Run migration 1 (complete_accreditation_systems.sql)
- [ ] Wait for success message
- [ ] Run migration 2 (automation_triggers.sql)
- [ ] Wait for success message
- [ ] (Optional) Run migration 3 (test_data.sql)
- [ ] Verify tables exist
- [ ] Verify triggers exist
- [ ] Test system

**Total Time:** 5-10 minutes

---

**Ready to run? Open Supabase Dashboard and let's go! 🚀**
