# ELEVATE FOR HUMANITY - DEPLOYMENT CHECKLIST

## PRE-DEPLOY VERIFICATION

### 1. Supabase Database Check

Run in Supabase SQL Editor:

```sql
-- Verify all tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'applications',
  'application_checklist',
  'uploaded_documents',
  'enrollment_agreements',
  'case_managers',
  'employer_sponsors'
);

-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'applications';
```

**Status:** [ ] PASS [ ] FAIL

---

### 2. Vercel Environment Variables

**Required (Production):**

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] RESEND_API_KEY
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] OPENAI_API_KEY

---

### 3. Go-Live Test (15 Minutes)

1. [ ] Submit test application at `/apply/full`
2. [ ] Check Supabase `applications` table
3. [ ] Check `application_checklist` table
4. [ ] Verify email received
5. [ ] Visit `/application-success`
6. [ ] Test error fallback

**All green?** [ ] YES - GO LIVE

---

## STAFF OPERATIONS SOP

### Daily Flow

1. New application → Auto-assigned advisor
2. Advisor calls within 1-2 days
3. Student creates ICC account
4. Student schedules WorkOne
5. Student reports back
6. Advisor updates checklist
7. Status auto-updates

### WorkOne Script

> "Elevate for Humanity is an appointment-based workforce training provider. The participant has applied and is seeking WIOA / WRG / JRI eligibility. Please schedule an appointment and note Elevate for Humanity as the training provider."

---

## DEPLOYMENT COMMAND

```bash
git add -A
git commit -m "Complete workforce intake platform - production ready"
git push origin main
```

**SYSTEM IS ENTERPRISE-GRADE. LOCK IT. OPERATE IT.**
