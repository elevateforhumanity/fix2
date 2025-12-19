# 🧪 TESTING GUIDE - REAL DATA IMPLEMENTATION

## End-to-End Testing for All Data Flows

This guide provides step-by-step instructions to test all real data implementations.

---

## 🚀 PREREQUISITES

### 1. Database Setup
```bash
# Set your DATABASE_URL
export DATABASE_URL='postgresql://postgres:[password]@[host]:5432/postgres'

# Run migrations and seed data
./scripts/run-migrations-and-seeds.sh

# Verify data loaded
psql $DATABASE_URL -f scripts/verify-real-data.sql
```

### 2. Environment Variables
```bash
# Required
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Optional (for email testing)
RESEND_API_KEY=...
```

---

## 📊 TEST SCENARIOS

### TEST 1: Student Dashboard with Real Data

**Objective:** Verify student dashboard displays real enrollment and requirements data

**Steps:**
1. Navigate to `/student/dashboard-new`
2. Login as demo student (or create test account)
3. Verify dashboard shows:
   - Real program name (e.g., "Professional Barbering Certificate")
   - Progress percentage
   - Status badge (On Track, Needs Action, At Risk)
   - Funding sources (WIOA, TANF, etc.)
   - Requirements checklist with real requirements
   - Contact information: (317) 314-3757

**Expected Results:**
- ✅ Dashboard loads without errors
- ✅ Real program data displayed
- ✅ Requirements show correct status (pending, completed, overdue)
- ✅ Progress bar reflects actual completion
- ✅ Contact phone number is (317) 314-3757
- ✅ Support box shows real contact info

**Test Data:**
```sql
-- Get demo student enrollment
SELECT 
  e.id as enrollment_id,
  p.first_name || ' ' || p.last_name as student_name,
  pr.name as program_name,
  e.status,
  sr.progress_percentage
FROM enrollments e
JOIN profiles p ON e.student_id = p.id
JOIN programs pr ON e.program_id = pr.id
LEFT JOIN student_risk_status sr ON e.id = sr.enrollment_id
WHERE p.email = 'demo.student1@elevateforhumanity.org';
```

---

### TEST 2: Requirements System

**Objective:** Verify requirements tracking and status updates

**Steps:**
1. View student requirements on dashboard
2. Check requirement details:
   - Title
   - Description
   - Due date
   - Priority (urgent, high, normal, low)
   - Status (pending, in_progress, completed, verified)
3. Verify overdue requirements are highlighted in red
4. Verify completed requirements show checkmark
5. Click action links (Upload Document, Log Hours, etc.)

**Expected Results:**
- ✅ All requirements display correctly
- ✅ Overdue requirements show "OVERDUE" label
- ✅ Due dates formatted properly
- ✅ Action links navigate to correct pages
- ✅ Icons match requirement types

**Test Query:**
```sql
-- Get requirements for Marcus Johnson (Barbering)
SELECT 
  title,
  requirement_type,
  status,
  due_date,
  priority,
  CASE 
    WHEN due_date < CURRENT_DATE AND status NOT IN ('verified', 'completed') 
    THEN 'OVERDUE'
    ELSE 'ON TIME'
  END as deadline_status
FROM student_requirements
WHERE enrollment_id = '40000000-0000-0000-0000-000000000001'
ORDER BY 
  CASE WHEN due_date < CURRENT_DATE THEN 0 ELSE 1 END,
  due_date;
```

---

### TEST 3: Email System

**Objective:** Test automated email triggers

**Steps:**
1. Create new application
2. Verify "Application Received" email sent
3. Create new enrollment
4. Verify "Enrollment Confirmation" email sent
5. Check email content:
   - Real contact info: (317) 314-3757
   - Real email: elevate4humanityedu@gmail.com
   - Real address: 8888 Keystone Crossing Suite 1300
   - No placeholder text

**Expected Results:**
- ✅ Emails sent automatically on triggers
- ✅ Email content uses real data
- ✅ Contact information correct
- ✅ Links work properly
- ✅ No "example@" or placeholder emails

**Test Code:**
```typescript
import { sendApplicationReceivedEmail } from '@/lib/email/automated-triggers';

// Test application received email
const result = await sendApplicationReceivedEmail(
  'your-test-email@example.com',
  'Test User'
);

console.log('Email sent:', result);
```

---

### TEST 4: Appointment Scheduling

**Objective:** Verify Calendly integration and appointment tracking

**Steps:**
1. Navigate to appointment booking page
2. Click Calendly link
3. Book test appointment
4. Verify appointment saved to database
5. Check appointment confirmation email
6. Verify appointment shows in student dashboard

**Expected Results:**
- ✅ Calendly link opens correctly
- ✅ Appointment saved to database
- ✅ Confirmation email sent
- ✅ Appointment visible in dashboard
- ✅ Contact info in email: (317) 314-3757

**Test Query:**
```sql
-- Get recent appointments
SELECT 
  a.id,
  a.appointment_type,
  a.scheduled_time,
  a.meeting_type,
  a.status,
  p.first_name || ' ' || p.last_name as student_name
FROM appointments a
JOIN profiles p ON a.student_id = p.id
ORDER BY a.created_at DESC
LIMIT 10;
```

---

### TEST 5: Notifications System

**Objective:** Test real-time notifications

**Steps:**
1. Create new requirement for student
2. Verify notification created
3. Check notification appears in UI
4. Mark notification as read
5. Verify read status updated

**Expected Results:**
- ✅ Notification created automatically
- ✅ Notification shows in notification center
- ✅ Unread count updates
- ✅ Mark as read works
- ✅ Action links navigate correctly

**Test Code:**
```typescript
import { notifyNewRequirement } from '@/lib/notifications/notification-system';

// Create test notification
await notifyNewRequirement(
  'student-id',
  'Upload State ID',
  '2024-01-15',
  'requirement-id'
);

// Get unread count
import { getUnreadNotificationCount } from '@/lib/notifications/notification-system';
const count = await getUnreadNotificationCount('student-id');
console.log('Unread notifications:', count);
```

---

### TEST 6: Audit Logging

**Objective:** Verify all actions are logged

**Steps:**
1. Perform various actions:
   - Login
   - Update profile
   - Complete requirement
   - Upload document
2. Query audit logs
3. Verify all actions logged with:
   - Action type
   - User ID
   - Timestamp
   - Details

**Expected Results:**
- ✅ All actions logged
- ✅ Timestamps accurate
- ✅ User IDs correct
- ✅ Details captured

**Test Query:**
```sql
-- Get recent audit logs
SELECT 
  action,
  user_id,
  resource_type,
  resource_id,
  success,
  created_at,
  details
FROM audit_logs
ORDER BY created_at DESC
LIMIT 20;
```

---

### TEST 7: At-Risk Detection

**Objective:** Test automated at-risk student detection

**Steps:**
1. View Maria Garcia's dashboard (at-risk student)
2. Verify status shows "At Risk"
3. Check risk factors:
   - 2 overdue requirements
   - Low progress (25%)
4. Verify advisor notification sent
5. Check admin at-risk dashboard

**Expected Results:**
- ✅ At-risk status displayed
- ✅ Risk factors identified
- ✅ Advisor notified
- ✅ Shows in admin dashboard
- ✅ Intervention plan available

**Test Query:**
```sql
-- Get at-risk students
SELECT 
  p.first_name || ' ' || p.last_name as student_name,
  pr.name as program_name,
  sr.status,
  sr.overdue_count,
  sr.progress_percentage,
  sr.days_since_activity
FROM student_risk_status sr
JOIN enrollments e ON sr.enrollment_id = e.id
JOIN profiles p ON e.student_id = p.id
JOIN programs pr ON e.program_id = pr.id
WHERE sr.status = 'at_risk'
ORDER BY sr.overdue_count DESC, sr.progress_percentage ASC;
```

---

### TEST 8: Funding Assignment

**Objective:** Verify funding source tracking

**Steps:**
1. View student enrollment
2. Check funding sources assigned
3. Verify funding amounts
4. Check funding source details (WIOA, TANF, etc.)

**Expected Results:**
- ✅ Funding sources displayed
- ✅ Amounts correct
- ✅ Multiple funding sources supported
- ✅ Funding codes shown (WIOA, TANF, SNAP, TAA, PELL)

**Test Query:**
```sql
-- Get funding assignments
SELECT 
  p.first_name || ' ' || p.last_name as student_name,
  pr.name as program_name,
  fs.code as funding_code,
  fs.name as funding_name,
  sfa.amount_allocated
FROM student_funding_assignments sfa
JOIN enrollments e ON sfa.enrollment_id = e.id
JOIN profiles p ON e.student_id = p.id
JOIN programs pr ON e.program_id = pr.id
JOIN funding_sources fs ON sfa.funding_source_id = fs.id
ORDER BY p.last_name, p.first_name;
```

---

### TEST 9: Social Media Integration

**Objective:** Test social sharing functionality

**Steps:**
1. Navigate to any public page
2. Click social share buttons
3. Verify correct URLs:
   - Facebook: https://www.facebook.com/profile.php?id=61571046346179
   - Instagram: https://instagram.com/elevateforhumanity
   - LinkedIn: https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/
   - Twitter: https://x.com/Elevate4Humani1
4. Test share dialog opens correctly

**Expected Results:**
- ✅ Social links correct
- ✅ Share dialogs open
- ✅ Content pre-filled
- ✅ Hashtags included
- ✅ Tracking works

---

### TEST 10: Navigation

**Objective:** Verify all navigation links work

**Steps:**
1. Test main navigation:
   - Programs
   - Resources
   - Tax Services
   - About
   - Platform Licensing
2. Test footer links (30+ links)
3. Test dashboard navigation (role-based)
4. Verify all links resolve correctly

**Expected Results:**
- ✅ All links work
- ✅ No 404 errors
- ✅ Dropdowns function
- ✅ Mobile navigation works
- ✅ Role-based navigation correct

---

## 🔍 VERIFICATION QUERIES

### Check All Real Data Loaded
```sql
-- Organizations
SELECT COUNT(*) as org_count FROM organizations WHERE slug = 'elevate-for-humanity';

-- Programs
SELECT COUNT(*) as program_count FROM programs WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Funding Sources
SELECT COUNT(*) as funding_count FROM funding_sources;

-- Demo Students
SELECT COUNT(*) as student_count FROM profiles WHERE email LIKE 'demo.student%@elevateforhumanity.org';

-- Enrollments
SELECT COUNT(*) as enrollment_count FROM enrollments;

-- Requirements
SELECT COUNT(*) as requirement_count FROM student_requirements;
```

### Check Contact Information
```bash
# Run verification script
./scripts/verify-contact-info.sh
```

---

## ✅ ACCEPTANCE CRITERIA

### Data Quality
- [ ] All contact info is (317) 314-3757 and elevate4humanityedu@gmail.com
- [ ] No placeholder emails (example@, test@, etc.)
- [ ] No placeholder phone numbers (555-xxxx)
- [ ] Real program names and descriptions
- [ ] Real funding source codes (WIOA, TANF, etc.)

### Functionality
- [ ] Student dashboard loads with real data
- [ ] Requirements system tracks status correctly
- [ ] Email system sends automated emails
- [ ] Appointment system integrates with Calendly
- [ ] Notifications appear in real-time
- [ ] Audit logs capture all actions
- [ ] At-risk detection identifies students
- [ ] Funding assignments display correctly
- [ ] Social media links work
- [ ] Navigation links resolve

### Performance
- [ ] Dashboard loads in < 2 seconds
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Email queue processes efficiently

### Security
- [ ] Audit logs capture sensitive actions
- [ ] RLS policies enforce data isolation
- [ ] No sensitive data in logs
- [ ] Authentication required for dashboards

---

## 🐛 TROUBLESHOOTING

### Issue: Dashboard shows no data
**Solution:** Run seed data script
```bash
./scripts/run-migrations-and-seeds.sh
```

### Issue: Emails not sending
**Solution:** Check RESEND_API_KEY environment variable
```bash
echo $RESEND_API_KEY
```

### Issue: Appointments not saving
**Solution:** Verify appointments table exists
```sql
SELECT * FROM appointments LIMIT 1;
```

### Issue: Notifications not appearing
**Solution:** Check notifications table
```sql
SELECT * FROM notifications WHERE user_id = 'your-user-id' ORDER BY created_at DESC LIMIT 10;
```

---

## 📞 SUPPORT

**Phone:** (317) 314-3757  
**Email:** elevate4humanityedu@gmail.com  
**Security:** security@elevateforhumanity.org

---

## ✅ TEST COMPLETION CHECKLIST

- [ ] Database migrations run successfully
- [ ] Seed data loaded (5 programs, 5 students, 5 funding sources)
- [ ] Student dashboard displays real data
- [ ] Requirements system works end-to-end
- [ ] Email system sends automated emails
- [ ] Appointment scheduling integrates with Calendly
- [ ] Notifications system creates and displays notifications
- [ ] Audit logging captures all actions
- [ ] At-risk detection identifies students correctly
- [ ] Funding assignments display properly
- [ ] Social media links work
- [ ] Navigation links resolve
- [ ] Contact information verified everywhere
- [ ] No placeholders found in codebase

---

**Testing Status:** ✅ READY FOR TESTING  
**Last Updated:** December 18, 2024  
**Version:** 1.0.0
