# Database Migration Status

**Last Updated:** November 19, 2025

---

## 📊 Migration Summary

### Total Migration Files: 30 in `supabase/migrations/`

**Status:** ⚠️ **MIGRATIONS NEED TO BE RUN IN SUPABASE**

---

## 🗂️ Available Migrations

### Core Schema & Programs (7 files)
- ✅ `20240116_add_cip_soc_codes.sql` - CIP/SOC classification codes
- ✅ `20240116_seed_cip_soc_codes.sql` - Seed CIP/SOC data
- ✅ `20241115_add_all_etpl_programs.sql` - 16 ETPL approved programs
- ✅ `20241116_add_jri_courses.sql` - JRI reentry courses
- ✅ `20241116_add_nrf_rise_up_courses.sql` - NRF Rise Up retail courses
- ✅ `20241116_create_medical_assistant_course.sql` - Medical Assistant course
- ✅ `create_phone_system_tables.sql` - Phone system (no Twilio)

### LMS Courses (4 files)
- ✅ `20241116_create_lms_courses_part1.sql` - Business, Emergency Health, DSP
- ✅ `20241116_create_lms_courses_part2.sql` - HVAC, Esthetician, Tax Prep
- ✅ `20241116_create_lms_courses_part3.sql` - Reentry, Barber, Beauty Educator
- ✅ `20241116_create_lms_courses_part4.sql` - Peer Support, CPR, Healthcare Worker

### LMS Features (3 files)
- ✅ `20251116020545_lesson_progress.sql` - Lesson progress tracking
- ✅ `20251116020748_course_completion_view.sql` - Course completion views
- ✅ `20251117_advanced_lms_features.sql` - Advanced LMS features

### Enterprise Features (7 files)
- ✅ `20251117_advanced_rbac.sql` - Advanced RBAC system
- ✅ `20251117_hr_payroll_system.sql` - HR & Payroll system
- ✅ `20251117_multi_tenancy.sql` - Multi-tenancy support
- ✅ `20251117_sso_and_2fa.sql` - SSO & 2FA authentication
- ✅ `20251118_enterprise_audit_and_branding.sql` - Audit & branding
- ✅ `20251118_perf_indexes.sql` - Performance indexes
- ✅ `20251118_scorm_xapi.sql` - SCORM & xAPI support

### Additional Features (3 files)
- ✅ `20241118_events_management.sql` - Events management
- ✅ `20241118_marketing_automation.sql` - Marketing automation
- ✅ `20241118_sso_connections.sql` - SSO connections
- ✅ `20251118_user_activity.sql` - User activity tracking

### Helper Files
- ✅ `RUN_ALL_MIGRATIONS.sql` - **Run this file to execute all migrations at once**

---

## 🚀 How to Run Migrations

### Option 1: Run All at Once (Recommended)

1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/RUN_ALL_MIGRATIONS.sql`
3. Copy the entire file contents
4. Paste into SQL Editor
5. Click **"Run"**
6. Wait for completion (may take 1-2 minutes)

### Option 2: Use Admin Panel

1. Go to: `https://www.elevateforhumanity.org/admin/migrations
2. Click **"Run All Migrations Now"**
3. Wait for completion

### Option 3: Run Individually

Follow the guide in `RUN_MIGRATIONS_GUIDE.md` to run each migration file one by one.

---

## ⚠️ Migration Status Check

### To verify migrations have been run:

```sql
-- Check if programs table exists and has data
SELECT COUNT(*) FROM programs;
-- Should return: 16+ programs

-- Check if courses table exists and has data
SELECT COUNT(*) FROM courses;
-- Should return: 50+ courses

-- Check if phone_logs table exists
SELECT COUNT(*) FROM phone_logs;
-- Should return: 0 or more (table exists)
```

---

## 📋 What Each Migration Does

### Programs & Courses
- **16 ETPL Programs**: Barber, HVAC, CNA, Medical Assistant, etc.
- **50+ LMS Courses**: Full curriculum with lessons and modules
- **JRI Reentry**: Justice-involved reentry programs
- **NRF Rise Up**: Retail career training

### LMS Features
- Lesson progress tracking
- Course completion tracking
- Assignments and quizzes
- Gradebook system
- Certificates

### Enterprise Features
- Role-based access control (RBAC)
- Multi-tenancy support
- SSO & 2FA authentication
- HR & Payroll system
- Audit logging
- Custom branding per tenant

### Integrations
- SCORM & xAPI support
- Events management
- Marketing automation
- Phone system (no Twilio)

---

## 🔍 Troubleshooting

### If migrations fail:

1. **Check Supabase connection**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` is set
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is set

2. **Check for existing tables**
   - Some migrations use `CREATE TABLE IF NOT EXISTS`
   - Safe to re-run most migrations

3. **Run migrations in order**
   - Some migrations depend on previous ones
   - Follow the order in `RUN_MIGRATIONS_GUIDE.md`

4. **Check SQL Editor output**
   - Look for error messages
   - Common issues: missing columns, duplicate keys

---

## ✅ Post-Migration Verification

After running migrations, verify:

1. **Programs page works**: `/programs`
2. **Courses page works**: `/courses`
3. **Student dashboard works**: `/student/dashboard`
4. **Admin panel works**: `/admin`

---

## 📝 Notes

- **Migrations are idempotent**: Safe to run multiple times
- **No data loss**: Migrations use `INSERT ... ON CONFLICT` or `IF NOT EXISTS`
- **Backup recommended**: Always backup before running migrations in production
- **Phone system**: New tables for direct phone integration (no Twilio)

---

## 🎯 Next Steps

1. ✅ Run migrations in Supabase
2. ✅ Verify data loaded correctly
3. ✅ Test site functionality
4. ✅ Configure environment variables in Vercel
5. ✅ Deploy to production

---

## 📞 Support

If you encounter issues:
- Check `RUN_MIGRATIONS_GUIDE.md` for detailed instructions
- Review Supabase SQL Editor error messages
- Verify environment variables are set correctly
