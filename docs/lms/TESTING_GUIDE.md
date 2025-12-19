# LMS Dashboard System - Testing Guide

## Database Migration

### Step 1: Run Migration
```bash
# Apply the requirements system migration
psql $DATABASE_URL -f supabase/migrations/20251218_lms_requirements_system.sql
```

### Step 2: Verify Tables Created
```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'student_requirements',
  'student_risk_status',
  'requirement_templates',
  'verification_actions'
);

-- Check functions exist
SELECT routine_name FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'calculate_student_risk_status',
  'create_requirements_from_templates'
);
```

---

## Test Data Setup

### Create Test Student
```sql
-- Insert test student profile
INSERT INTO profiles (id, email, first_name, last_name, role)
VALUES (
  'test-student-001',
  'test.student@example.com',
  'Test',
  'Student',
  'student'
);

-- Create test enrollment
INSERT INTO enrollments (id, student_id, program_id, status, start_date)
SELECT 
  'test-enrollment-001',
  'test-student-001',
  id,
  'active',
  CURRENT_DATE
FROM programs
WHERE slug = 'barber-apprenticeship'
LIMIT 1;
```

### Create Test Requirements
```sql
-- Requirement 1: Overdue course
INSERT INTO student_requirements (
  enrollment_id,
  requirement_type,
  title,
  description,
  due_date,
  priority,
  status
) VALUES (
  'test-enrollment-001',
  'course',
  'Complete Milady Theory Module 1',
  'Complete the first theory module in Milady',
  CURRENT_DATE - INTERVAL '5 days',
  'high',
  'pending'
);

-- Requirement 2: Upcoming document upload
INSERT INTO student_requirements (
  enrollment_id,
  requirement_type,
  title,
  description,
  due_date,
  priority,
  status
) VALUES (
  'test-enrollment-001',
  'document',
  'Upload Completion Certificate',
  'Upload your course completion certificate',
  CURRENT_DATE + INTERVAL '7 days',
  'high',
  'pending'
);

-- Requirement 3: Ongoing hours logging
INSERT INTO student_requirements (
  enrollment_id,
  requirement_type,
  title,
  description,
  due_date,
  priority,
  status
) VALUES (
  'test-enrollment-001',
  'hours',
  'Log Weekly Apprenticeship Hours',
  'Log your hours with supervisor approval',
  CURRENT_DATE + INTERVAL '3 days',
  'urgent',
  'in_progress'
);

-- Requirement 4: Completed requirement
INSERT INTO student_requirements (
  enrollment_id,
  requirement_type,
  title,
  description,
  due_date,
  priority,
  status
) VALUES (
  'test-enrollment-001',
  'course',
  'Complete Safety Orientation',
  'Complete the safety and sanitation orientation',
  CURRENT_DATE - INTERVAL '10 days',
  'high',
  'verified'
);
```

### Calculate Risk Status
```sql
-- Trigger risk calculation
SELECT calculate_student_risk_status('test-enrollment-001');

-- Verify risk status created
SELECT * FROM student_risk_status 
WHERE enrollment_id = 'test-enrollment-001';
```

---

## Dashboard Testing

### Student Dashboard (`/student/dashboard-new`)

**Test as Student:**
1. Login as test student
2. Navigate to `/student/dashboard-new`
3. Verify displays:
   - ✅ Program name
   - ✅ Status badge (should be "Needs Action" - 1 overdue)
   - ✅ Progress percentage
   - ✅ Funding source (if assigned)
   - ✅ Requirements checklist with 4 items
   - ✅ Overdue item at top (red border)
   - ✅ Upcoming items (yellow/blue borders)
   - ✅ Completed item (green, grayed out)
   - ✅ Support team contact info
   - ✅ Quick links

**Expected Behavior:**
- Overdue requirement appears first
- Status badge shows "Needs Action" (yellow)
- Progress bar shows calculated percentage
- Action links work for each requirement type
- Support contact info always visible

---

### Program Holder Dashboard (`/program-holder/dashboard`)

**Test as Program Holder:**
1. Login as program holder
2. Navigate to `/program-holder/dashboard`
3. Verify displays:
   - ✅ Active students count
   - ✅ At-risk students count
   - ✅ Pending verifications count
   - ✅ Student roster table
   - ✅ Status badges per student (red/yellow/green)
   - ✅ Progress percentage per student
   - ✅ Overdue count per student
   - ✅ "Verify" link for each student
   - ✅ Pending verifications list
   - ✅ Compliance checklist

**Expected Behavior:**
- Students sorted by risk status (at-risk first)
- Overdue counts highlighted in red
- Verify links navigate to verification page
- Pending verifications show submitted requirements

---

### Admin At-Risk Dashboard (`/admin/at-risk`)

**Test as Admin:**
1. Login as admin
2. Navigate to `/admin/at-risk`
3. Verify displays:
   - ✅ At-risk students count
   - ✅ Needs action students count
   - ✅ Low completion programs count
   - ✅ At-risk students list with details
   - ✅ Student contact info (email, phone)
   - ✅ Funding source per student
   - ✅ Days since last activity
   - ✅ "View Details" and "Call Student" buttons
   - ✅ Needs action students list
   - ✅ Low completion programs table

**Expected Behavior:**
- At-risk students appear first
- Critical information highlighted
- Contact buttons functional
- Program completion rates calculated correctly

---

## Functional Testing

### Requirement Status Updates

**Test Requirement Completion:**
```sql
-- Student completes a requirement
UPDATE student_requirements
SET status = 'completed', updated_at = NOW()
WHERE id = '<requirement-id>';

-- Verify risk status recalculated
SELECT * FROM student_risk_status 
WHERE enrollment_id = 'test-enrollment-001';
```

**Expected:** Risk status updates automatically via trigger.

---

### Verification Workflow

**Test Program Holder Verification:**
```sql
-- Program holder approves requirement
UPDATE student_requirements
SET 
  status = 'verified',
  verified_by = '<program-holder-id>',
  verified_at = NOW()
WHERE id = '<requirement-id>';

-- Insert verification action
INSERT INTO verification_actions (
  requirement_id,
  action_type,
  performed_by,
  notes
) VALUES (
  '<requirement-id>',
  'approved',
  '<program-holder-id>',
  'Verified completion certificate'
);
```

**Expected:** Requirement marked as verified, appears in student dashboard as completed.

---

### At-Risk Detection

**Test At-Risk Threshold:**
```sql
-- Add 2 more overdue requirements (total 3 = at-risk)
INSERT INTO student_requirements (
  enrollment_id, requirement_type, title, due_date, priority, status
) VALUES 
  ('test-enrollment-001', 'document', 'Test Overdue 2', CURRENT_DATE - 2, 'high', 'pending'),
  ('test-enrollment-001', 'document', 'Test Overdue 3', CURRENT_DATE - 3, 'high', 'pending');

-- Recalculate
SELECT calculate_student_risk_status('test-enrollment-001');

-- Check status
SELECT status FROM student_risk_status 
WHERE enrollment_id = 'test-enrollment-001';
```

**Expected:** Status changes to "at_risk", student appears in admin at-risk dashboard.

---

## Performance Testing

### Load Test Queries

**Test Dashboard Query Performance:**
```sql
-- Student dashboard query
EXPLAIN ANALYZE
SELECT * FROM student_requirements
WHERE enrollment_id = 'test-enrollment-001'
ORDER BY priority DESC, due_date ASC;

-- Program holder roster query
EXPLAIN ANALYZE
SELECT e.*, sr.status, sr.progress_percentage, sr.overdue_count
FROM enrollments e
LEFT JOIN student_risk_status sr ON sr.enrollment_id = e.id
WHERE e.program_id IN (SELECT id FROM programs WHERE organization_id = '<org-id>')
AND e.status = 'active';

-- Admin at-risk query
EXPLAIN ANALYZE
SELECT * FROM student_risk_status
WHERE status = 'at_risk'
ORDER BY overdue_count DESC;
```

**Expected:** All queries < 100ms with proper indexes.

---

## Integration Testing

### Auto-Create Requirements on Enrollment

**Test Template System:**
```sql
-- Create new enrollment
INSERT INTO enrollments (student_id, program_id, status, start_date)
SELECT 
  'test-student-002',
  id,
  'active',
  CURRENT_DATE
FROM programs
WHERE slug = 'barber-apprenticeship'
LIMIT 1
RETURNING id;

-- Check requirements auto-created
SELECT * FROM student_requirements
WHERE enrollment_id = '<new-enrollment-id>';
```

**Expected:** Requirements created from templates automatically.

---

### Risk Status Trigger

**Test Automatic Recalculation:**
```sql
-- Update requirement status
UPDATE student_requirements
SET status = 'completed'
WHERE enrollment_id = 'test-enrollment-001'
AND status = 'pending'
LIMIT 1;

-- Check risk status updated
SELECT calculated_at, status, completed_count
FROM student_risk_status
WHERE enrollment_id = 'test-enrollment-001';
```

**Expected:** `calculated_at` timestamp updated, counts recalculated.

---

## Edge Cases

### No Requirements
- Student with no requirements should show "No requirements yet"
- Progress should be 0%
- Status should be "Getting Started"

### All Requirements Completed
- Progress should be 100%
- Status should be "On Track"
- No action items shown

### No Active Enrollment
- Student dashboard should show "Not enrolled" message
- Link to browse programs

### Program Holder with No Students
- Dashboard should show "No active students yet"
- Metrics should all be 0

---

## Cleanup Test Data

```sql
-- Remove test data
DELETE FROM verification_actions 
WHERE requirement_id IN (
  SELECT id FROM student_requirements 
  WHERE enrollment_id = 'test-enrollment-001'
);

DELETE FROM student_requirements 
WHERE enrollment_id = 'test-enrollment-001';

DELETE FROM student_risk_status 
WHERE enrollment_id = 'test-enrollment-001';

DELETE FROM enrollments 
WHERE id = 'test-enrollment-001';

DELETE FROM profiles 
WHERE id = 'test-student-001';
```

---

## Success Criteria

### Student Dashboard
- [ ] Loads in < 1 second
- [ ] Shows correct status badge
- [ ] Requirements sorted correctly (overdue first)
- [ ] Action links functional
- [ ] Support info always visible
- [ ] Mobile responsive

### Program Holder Dashboard
- [ ] Shows all active students
- [ ] Status badges accurate
- [ ] Pending verifications count correct
- [ ] Verify links work
- [ ] Table sortable/filterable

### Admin Dashboard
- [ ] At-risk students detected correctly
- [ ] Funding source metrics accurate
- [ ] Low completion programs identified
- [ ] Export functionality works
- [ ] Contact buttons functional

---

## Next Steps

1. Run migration in development
2. Create test data
3. Test each dashboard manually
4. Verify triggers working
5. Test with real student data
6. Deploy to staging
7. User acceptance testing
8. Deploy to production

---

Last Updated: 2025-12-18
Status: Ready for Testing
