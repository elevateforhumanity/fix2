# 🏢 PROGRAM HOLDER DASHBOARD - COMPLETE GUIDE

## Overview
The Program Holder Dashboard allows approved organizations to manage apprentices, track training progress, and oversee workforce development programs.

---

## 📦 What's Included

### Dashboard Routes
- ✅ `/program-holder` - Main portal landing page
- ✅ `/program-holder/dashboard` - Program holder dashboard
- ✅ `/program-holder/apply` - Application for program holder status
- ✅ `/program-holder/courses` - Course management
- ✅ `/program-holder/grades` - Student grades
- ✅ `/program-holder/mou` - MOU management
- ✅ `/program-holder/onboarding` - Onboarding process
- ✅ `/program-holder/portal` - Portal access
- ✅ `/program-holder/programs` - Program management
- ✅ `/program-holder/settings` - Settings
- ✅ `/program-holder/sign-mou` - MOU signing
- ✅ `/program-holder/training` - Training resources

### Admin Routes
- ✅ `/admin/program-holders` - Admin management
- ✅ `/admin/program-holder-acknowledgements` - Acknowledgement tracking

### API Routes
- ✅ `/api/program-holder` - Program holder API
- ✅ `/api/program-holders` - Program holders list API
- ✅ `/api/admin/program-holders` - Admin API
- ✅ `/api/admin/program-holder-acknowledgements` - Acknowledgements API

---

## 🗄️ Database Tables

### 1. program_holders
Main table for program holder organizations.

**Columns:**
- `id` - UUID primary key
- `user_id` - Link to auth.users
- `organization_name` - Organization name
- `contact_name` - Primary contact
- `email` - Contact email
- `phone` - Contact phone
- `address`, `city`, `state`, `zip_code` - Location
- `status` - pending | active | inactive | suspended
- `is_verified` - Verification status
- `verified_at`, `verified_by` - Verification tracking
- `permissions` - JSONB permissions object
- `can_manage_students` - Permission flag
- `can_issue_certificates` - Permission flag
- `can_view_reports` - Permission flag
- `can_create_programs` - Permission flag
- `program_types` - Array of program types
- `max_students` - Maximum student capacity
- `current_students` - Current student count (auto-updated)
- `license_number`, `license_expiry` - Licensing info
- `insurance_verified` - Insurance status
- `background_check_completed` - Background check status
- `notes`, `metadata` - Additional data
- `created_at`, `updated_at` - Timestamps

### 2. program_holder_acknowledgements
Tracks required acknowledgements and agreements.

**Columns:**
- `id` - UUID primary key
- `program_holder_id` - FK to program_holders
- `acknowledgement_type` - Type of acknowledgement
- `title` - Acknowledgement title
- `content` - Acknowledgement content
- `version` - Version number
- `acknowledged_at` - When acknowledged
- `acknowledged_by` - Who acknowledged
- `ip_address`, `user_agent` - Tracking info
- `metadata` - Additional data
- `created_at`, `updated_at` - Timestamps

### 3. program_holder_students
Junction table linking program holders to students.

**Columns:**
- `id` - UUID primary key
- `program_holder_id` - FK to program_holders
- `student_id` - FK to profiles
- `enrollment_id` - FK to enrollments
- `status` - active | inactive | completed | withdrawn
- `start_date`, `end_date` - Training period
- `hours_completed`, `hours_required` - Hour tracking
- `progress_percentage` - Progress tracking
- `notes`, `metadata` - Additional data
- `created_at`, `updated_at` - Timestamps

### 4. program_holder_reports
Reports submitted by program holders.

**Columns:**
- `id` - UUID primary key
- `program_holder_id` - FK to program_holders
- `report_type` - Type of report
- `report_period_start`, `report_period_end` - Reporting period
- `report_data` - JSONB report data
- `summary` - Report summary
- `status` - draft | submitted | approved | rejected
- `submitted_at`, `reviewed_at` - Status tracking
- `reviewed_by` - Who reviewed
- `file_url` - Attached file
- `created_at`, `updated_at` - Timestamps

---

## 🔒 Security & Permissions

### RLS Policies

**program_holders:**
- Program holders can view/update their own record
- Admins can view/manage all program holders

**program_holder_acknowledgements:**
- Program holders can view/create their own acknowledgements
- Admins can view all acknowledgements

**program_holder_students:**
- Program holders can view/manage their students (if permission granted)
- Students can view their own program holder relationship
- Admins can view all relationships

**program_holder_reports:**
- Program holders can view/create their own reports (if permission granted)
- Admins can view all reports

### Permission Flags
- `can_manage_students` - Add/remove/update students
- `can_issue_certificates` - Issue completion certificates
- `can_view_reports` - Access reporting features
- `can_create_programs` - Create new training programs

---

## 🚀 Setup Instructions

### Step 1: Run Verification Script
```sql
-- In Supabase SQL Editor, run:
-- VERIFY_PROGRAM_HOLDER_DASHBOARD.sql
```

**This checks:**
- ✅ All tables exist
- ✅ All columns present
- ✅ RLS policies configured
- ✅ Data availability

### Step 2: Create Program Holder System (if needed)
```sql
-- In Supabase SQL Editor, run:
-- CREATE_PROGRAM_HOLDER_SYSTEM.sql
```

**This creates:**
- ✅ All 4 program holder tables
- ✅ All indexes for performance
- ✅ All RLS policies
- ✅ All triggers and functions
- ✅ Student count auto-update trigger
- ✅ Updated_at triggers

### Step 3: Run Smoke Test
```sql
-- In Supabase SQL Editor, run:
-- TEST_PROGRAM_HOLDER_SYSTEM.sql
```

**This tests:**
- ✅ All tables exist
- ✅ RLS enabled
- ✅ Policies exist
- ✅ Required columns present
- ✅ Indexes exist
- ✅ Triggers exist
- ✅ Can insert/delete records
- ✅ Foreign keys configured

---

## 📊 Dashboard Features

### Main Dashboard (`/program-holder/dashboard`)
- **Quick Stats:**
  - Total apprentices
  - Active apprentices
  - Completed apprentices
  - Average progress

- **Recent Activity:**
  - New enrollments
  - Progress updates
  - Completions
  - Upcoming milestones

- **Student Management:**
  - View all students
  - Track progress
  - Update hours
  - Issue certificates

- **Reports:**
  - Monthly progress reports
  - Completion reports
  - Compliance reports
  - Custom reports

### Student Management
- Add new apprentices
- Track training hours
- Monitor progress
- Update status
- Issue certificates
- View detailed profiles

### Reporting
- Generate monthly reports
- Submit compliance reports
- View historical reports
- Export data

### Settings
- Update organization info
- Manage permissions
- Configure notifications
- Update contact details

---

## 🔧 API Endpoints

### GET `/api/program-holder`
Get current program holder info

### GET `/api/program-holders`
List all program holders (admin only)

### POST `/api/program-holder`
Create/update program holder

### GET `/api/program-holder/students`
Get students for current program holder

### POST `/api/program-holder/students`
Add student to program holder

### GET `/api/program-holder/reports`
Get reports for current program holder

### POST `/api/program-holder/reports`
Submit new report

---

## 📝 Usage Examples

### 1. Create Program Holder
```sql
INSERT INTO program_holders (
  organization_name,
  contact_name,
  email,
  phone,
  status,
  can_manage_students,
  can_view_reports
) VALUES (
  'ABC Training Center',
  'John Smith',
  'john@abctraining.com',
  '+1-555-0100',
  'pending',
  true,
  true
);
```

### 2. Add Student to Program Holder
```sql
INSERT INTO program_holder_students (
  program_holder_id,
  student_id,
  enrollment_id,
  hours_required,
  status
) VALUES (
  'program-holder-uuid',
  'student-uuid',
  'enrollment-uuid',
  2000,
  'active'
);
```

### 3. Update Student Progress
```sql
UPDATE program_holder_students
SET 
  hours_completed = 500,
  progress_percentage = 25,
  updated_at = NOW()
WHERE id = 'student-record-uuid';
```

### 4. Submit Report
```sql
INSERT INTO program_holder_reports (
  program_holder_id,
  report_type,
  report_period_start,
  report_period_end,
  report_data,
  summary,
  status
) VALUES (
  'program-holder-uuid',
  'monthly_progress',
  '2024-12-01',
  '2024-12-31',
  '{"students_active": 25, "hours_completed": 1250}',
  'December 2024 progress report',
  'submitted'
);
```

---

## ✅ Verification Checklist

Run these scripts in order:

1. **VERIFY_PROGRAM_HOLDER_DASHBOARD.sql**
   - Checks table existence
   - Verifies structure
   - Checks RLS policies
   - Shows current data

2. **CREATE_PROGRAM_HOLDER_SYSTEM.sql** (if needed)
   - Creates all tables
   - Sets up RLS
   - Creates triggers
   - Configures permissions

3. **TEST_PROGRAM_HOLDER_SYSTEM.sql**
   - Runs 8 comprehensive tests
   - Verifies functionality
   - Shows system health

---

## 🎯 Success Criteria

After running all scripts, you should have:

✅ 4 program holder tables created
✅ 10+ RLS policies configured
✅ 7+ indexes for performance
✅ 4+ triggers for automation
✅ 6+ foreign key constraints
✅ Full CRUD functionality
✅ Secure access control
✅ Auto-updating student counts
✅ Complete audit trail

---

## 📞 Next Steps

1. **Test Dashboard Access:**
   - Visit: [https://www.elevateforhumanity.org/program-holder](https://www.elevateforhumanity.org/program-holder)
   - Check: Landing page loads

2. **Test Dashboard Login:**
   - Create test program holder account
   - Visit: [https://www.elevateforhumanity.org/program-holder/dashboard](https://www.elevateforhumanity.org/program-holder/dashboard)
   - Check: Dashboard displays correctly

3. **Test Admin Management:**
   - Visit: [https://www.elevateforhumanity.org/admin/program-holders](https://www.elevateforhumanity.org/admin/program-holders)
   - Check: Can view/manage program holders

4. **Test Student Management:**
   - Add test student
   - Update progress
   - View reports

---

## 📚 Files Created

- ✅ `VERIFY_PROGRAM_HOLDER_DASHBOARD.sql` - Verification script
- ✅ `CREATE_PROGRAM_HOLDER_SYSTEM.sql` - Setup script
- ✅ `TEST_PROGRAM_HOLDER_SYSTEM.sql` - Smoke test
- ✅ `PROGRAM_HOLDER_DASHBOARD_GUIDE.md` - This guide

---

**Status:** ✅ Ready to Deploy
**Created:** December 9, 2024
**Purpose:** Complete program holder dashboard system
