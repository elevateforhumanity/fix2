# FERPA & LMS Compliance System - Setup Instructions

**Elevate for Humanity Career & Training Institute**

**Date:** December 12, 2025

---

## Overview

This guide walks you through setting up the complete FERPA & LMS compliance system, including database tables, digital signature forms, training modules, and accreditation documentation.

---

## Prerequisites

- ✅ Supabase project configured
- ✅ Database access credentials
- ✅ Admin access to Supabase dashboard
- ✅ Node.js and npm installed
- ✅ Repository cloned and dependencies installed

---

## Step 1: Run Database Migration

### Option A: Using Supabase Dashboard (Recommended)

1. **Log in to Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy Migration SQL**
   - Open file: `/workspaces/fix2/supabase/migrations/20251212_ferpa_compliance_system.sql`
   - Copy the entire contents

4. **Run Migration**
   - Paste the SQL into the query editor
   - Click "Run" button
   - Wait for completion (should take 10-30 seconds)

5. **Verify Tables Created**
   - Click "Table Editor" in left sidebar
   - You should see these new tables:
     - `ferpa_training_records`
     - `ferpa_student_acknowledgments`
     - `ferpa_disclosure_log`
     - `ferpa_consent_forms`
     - `ferpa_access_log`
     - `ferpa_violation_reports`
     - `data_sharing_agreements`
     - `lms_security_audit_log`
     - `ferpa_compliance_checklist`

### Option B: Using Supabase CLI

```bash
# Navigate to project directory
cd /workspaces/fix2

# Run migration
npx supabase db push

# Or run specific migration
npx supabase migration up
```

---

## Step 2: Verify Database Schema

Run this query in Supabase SQL Editor to verify all tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'ferpa%' OR table_name LIKE 'data_sharing%' OR table_name LIKE 'lms_security%'
ORDER BY table_name;
```

Expected output:
```
data_sharing_agreements
ferpa_access_log
ferpa_compliance_checklist
ferpa_consent_forms
ferpa_disclosure_log
ferpa_student_acknowledgments
ferpa_training_records
ferpa_violation_reports
lms_security_audit_log
```

---

## Step 3: Install Required Dependencies

The system requires `react-signature-canvas` for digital signatures:

```bash
cd /workspaces/fix2
npm install react-signature-canvas
npm install @types/react-signature-canvas --save-dev
```

---

## Step 4: Build and Test

```bash
# Build the application
npm run build

# If build succeeds, start development server
npm run dev
```

---

## Step 5: Access FERPA System

### Admin Access

1. **FERPA Portal**
   - URL: `https://your-domain.com/ferpa`
   - Requires: Admin, Super Admin, FERPA Officer, or Registrar role

2. **Training Management**
   - URL: `https://your-domain.com/admin/ferpa/training`
   - View all training records
   - Monitor compliance
   - Send reminders

3. **Compliance Dashboard**
   - URL: `https://your-domain.com/admin/compliance-dashboard`
   - Overall compliance metrics

### Staff/Faculty Access

1. **Complete Training**
   - URL: `https://your-domain.com/ferpa/training/complete`
   - Take FERPA training course
   - Complete assessment quiz
   - Sign digital agreements
   - Receive certificate

### Student Access

1. **FERPA Orientation**
   - URL: `https://your-domain.com/student/ferpa-orientation`
   - Learn about FERPA rights
   - Acknowledge understanding
   - Opt-out of directory information (if desired)

---

## Step 6: Initial Configuration

### 1. Designate FERPA Officer

Update a user's role to `ferpa_officer`:

```sql
UPDATE profiles 
SET role = 'ferpa_officer' 
WHERE email = 'ferpa-officer@elevateforhumanity.org';
```

### 2. Create Initial Compliance Checklist

```sql
INSERT INTO ferpa_compliance_checklist (
  checklist_type,
  academic_year,
  total_items,
  items,
  status
) VALUES (
  'accreditation',
  '2024-2025',
  40,
  '[]'::jsonb,
  'in_progress'
);
```

### 3. Set Up Data Sharing Agreement Template

```sql
INSERT INTO data_sharing_agreements (
  partner_name,
  partner_type,
  agreement_type,
  purpose,
  data_elements,
  security_requirements,
  contact_name,
  contact_email,
  effective_date,
  status
) VALUES (
  'Template - Do Not Use',
  'workforce',
  'wioa',
  'Template for workforce data sharing agreements',
  ARRAY['enrollment_status', 'completion_status', 'credentials_earned'],
  'Encrypted transmission, secure storage, no re-disclosure',
  'Template',
  'template@example.com',
  CURRENT_DATE,
  'draft'
);
```

---

## Step 7: Test the System

### Test Training Workflow

1. **Create Test User**
   ```sql
   -- User should already exist in auth.users
   -- Just update their profile
   UPDATE profiles 
   SET role = 'instructor' 
   WHERE email = 'test-instructor@elevateforhumanity.org';
   ```

2. **Complete Training as Test User**
   - Log in as test user
   - Navigate to `/ferpa/training/complete`
   - Complete all steps
   - Verify certificate generation

3. **Verify in Admin Dashboard**
   - Log in as admin
   - Navigate to `/admin/ferpa/training`
   - Verify test user appears in completed list

### Test Student Acknowledgment

1. **As Student User**
   - Navigate to `/student/ferpa-orientation`
   - Complete orientation
   - Sign acknowledgment
   - Verify signature captured

2. **Verify in Database**
   ```sql
   SELECT * FROM ferpa_student_acknowledgments 
   WHERE student_id = 'test-student-id';
   ```

---

## Step 8: Configure Email Notifications (Optional)

If you want to send email notifications for training reminders and certificates:

1. **Set up email service** (e.g., SendGrid, Resend, AWS SES)

2. **Add environment variables**
   ```env
   EMAIL_SERVICE_API_KEY=your_api_key
   EMAIL_FROM=ferpa@elevateforhumanity.org
   ```

3. **Create email API route** (if not exists)
   - File: `/app/api/email/ferpa-certificate/route.ts`

---

## Step 9: Prepare for Accreditation

### 1. Generate Documentation Package

All documentation is in `/docs/compliance/`:

- ✅ FERPA Policy Manual
- ✅ FERPA Training Course
- ✅ FERPA Assessment Quiz
- ✅ FERPA Confidentiality Agreement
- ✅ LMS Policies Manual
- ✅ Workforce WIOA FERPA Addendum
- ✅ Clinical Informatics QA Plan
- ✅ Accreditation Checklist

### 2. Export to PDF

```bash
# Install markdown-pdf if needed
npm install -g markdown-pdf

# Convert all markdown docs to PDF
cd /workspaces/fix2/docs/compliance
for file in *.md ferpa/*.md; do
  markdown-pdf "$file" -o "${file%.md}.pdf"
done
```

### 3. Collect LMS Screenshots

Required screenshots (save to `/docs/compliance/evidence/`):

- [ ] Secure login page (showing HTTPS)
- [ ] Student gradebook (showing privacy)
- [ ] Instructor view (showing limited access)
- [ ] Admin permissions (showing role-based access)
- [ ] Audit log (showing access tracking)

### 4. Complete Checklist

Open `/docs/compliance/FERPA_LMS_Accreditation_Checklist.md` and check off completed items.

---

## Step 10: Train Staff

### Required Training for All Staff

1. **Schedule Training Sessions**
   - All staff with access to student records
   - Must complete within 30 days of hire
   - Annual refresher required

2. **Training Process**
   - Send link: `/ferpa/training/complete`
   - Monitor completion in admin dashboard
   - Follow up on pending training
   - Verify 80% pass rate on assessment

3. **Track Compliance**
   - Monthly review of training status
   - Send reminders for expired certifications
   - Document all training in system

---

## Troubleshooting

### Migration Fails

**Error: "relation already exists"**
- Tables may already exist from previous migration
- Check existing tables: `\dt ferpa*` in psql
- Drop tables if needed (CAUTION: loses data):
  ```sql
  DROP TABLE IF EXISTS ferpa_training_records CASCADE;
  -- Repeat for all tables
  ```

**Error: "permission denied"**
- Ensure you have database admin privileges
- Check Supabase project permissions

### Build Fails

**Error: "Module not found: FERPATrainingDashboard"**
- Component now created
- Run `npm run build` again

**Error: "react-signature-canvas not found"**
- Run `npm install react-signature-canvas`
- Clear cache: `rm -rf .next`
- Rebuild: `npm run build`

### Training Form Not Working

**Signatures not saving**
- Check browser console for errors
- Verify API route exists: `/app/api/ferpa/training/submit/route.ts`
- Check Supabase RLS policies allow inserts

**Certificate not generating**
- Verify training record created in database
- Check certificate ID format
- Ensure redirect URL is correct

---

## Maintenance

### Monthly Tasks

- [ ] Review training completion rates
- [ ] Send reminders for pending training
- [ ] Check for expired certifications
- [ ] Review audit logs for anomalies
- [ ] Update compliance checklist

### Quarterly Tasks

- [ ] Run comprehensive data integrity audit
- [ ] Review FERPA compliance metrics
- [ ] Audit data sharing agreements
- [ ] Generate compliance report
- [ ] Update policies if needed

### Annual Tasks

- [ ] Full FERPA compliance review
- [ ] Renew all staff training
- [ ] Update training materials
- [ ] Review and update policies
- [ ] Prepare accreditation documentation

---

## Support

### Internal Contacts

**FERPA Officer:**
- Email: ferpa@elevateforhumanity.org
- Responsible for compliance oversight

**Clinical Informatics Consultant:**
- Technical support for LMS and database
- System configuration and optimization

**IT Support:**
- Technical issues with access
- System performance problems

### External Resources

**U.S. Department of Education:**
- Family Policy Compliance Office
- Phone: 1-800-USA-LEARN
- Website: https://www2.ed.gov/policy/gen/guid/fpco/

**Supabase Support:**
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions

---

## Checklist: Setup Complete

- [ ] Database migration run successfully
- [ ] All 9 tables created and verified
- [ ] Dependencies installed (react-signature-canvas)
- [ ] Application builds without errors
- [ ] FERPA Officer designated
- [ ] Test training completed successfully
- [ ] Admin dashboard accessible
- [ ] Documentation reviewed
- [ ] Screenshots collected
- [ ] Staff training scheduled
- [ ] Compliance checklist started
- [ ] Email notifications configured (optional)
- [ ] Accreditation package prepared

---

## Next Steps

1. **Train all staff** on FERPA requirements
2. **Complete accreditation checklist** systematically
3. **Collect evidence** (screenshots, reports, logs)
4. **Review with leadership** before submission
5. **Submit to accreditors** when ready

---

**Setup Date:** _________________

**Completed By:** _________________

**Verified By:** _________________

**Notes:**

_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

---

**Document Version:** 1.0  
**Last Updated:** December 12, 2025  
**Owner:** Clinical Informatics Consultant
