# Reports & Delegates Center - Complete Documentation

## Overview
Comprehensive case management system for workforce development programs (WRG, WIOA, JRI, EmployIndy, DOL) with delegate management, progress tracking, and automated reporting.

## Features Implemented

### 1. Program Holders & Delegates ✅
**Purpose**: Multi-tenant system where program holders (barber schools, CNA programs, etc.) can manage their learners with delegated access control.

**Database Tables:**
- `program_holders` - Organizations running training programs
- `delegates` - Staff with limited access to program holder data
- `user_profiles.program_holder_id` - Links users to their program holder
- `courses.program_holder_id` - Links courses to program holders

**Permissions System:**
- `can_view_reports` - View learner reports
- `can_view_learners` - View learner details
- `can_edit_courses` - Edit course content
- `can_view_financials` - View financial data

### 2. Login Tracking ✅
**Purpose**: Track learner engagement and identify at-risk students.

**Database:**
- `login_events` table tracks every login with timestamp and source
- Indexed for fast queries by user and time

**Implementation:**
- `LoginTracker` component automatically logs dashboard visits
- API endpoint: `/api/events/login`
- Tracks source: `LMS_DASHBOARD`, `PORTAL`, etc.

### 3. Case Management Notes ✅
**Purpose**: Program holders can log progress notes, status updates, and follow-up tasks for each learner.

**Database:**
- `program_holder_notes` table with:
  - `status` - On Track, Behind, Dropped, etc.
  - `note` - Free-text progress notes
  - `follow_up_date` - When to follow up
  - `follow_up_done` - Whether follow-up completed
  - `created_by` - Who wrote the note
  - `created_at` - Timestamp

**Features:**
- Full timeline view per learner
- Latest status shown in reports
- Follow-up tracking with overdue alerts
- Audit trail of all updates

### 4. Admin Reports Hub ✅
**Purpose**: Centralized reporting for administrators across all programs.

**Features:**
- Filter by funding program (WRG, WIOA, JRI, etc.)
- Filter by date range
- View learner activity, progress, login history
- See case manager notes and status
- Export to CSV
- Link to learner timeline

**Metrics Displayed:**
- Learner name and email
- Course enrollment
- Start date
- Minutes of learning time
- Progress percentage
- Enrollment status
- Last login date
- Program holder name
- Case status
- Latest note

### 5. Delegate Reports Portal ✅
**Purpose**: Program holders and delegates view only their assigned learners.

**Features:**
- Filtered view of learners in their courses
- Add/update case notes and status
- Set follow-up dates
- Visual indicators for overdue follow-ups
- Real-time updates

**Access Control:**
- Checks `delegates` table for permissions
- Validates `program_holder_id` match
- Role-based access (partner, admin)

### 6. Learner Timeline View ✅
**Purpose**: Complete history of all case management activities for a learner.

**Features:**
- Chronological list of all notes (newest first)
- Shows course, program holder, status, note
- Displays who created each note and when
- Visual timeline with status badges
- Accessible from admin reports

**Route:** `/admin/learner/[id]`

### 7. Caseload Report ✅
**Purpose**: Targeted reporting for outreach and intervention.

**Features:**
- Filter by program code (WRG, WIOA, etc.)
- Filter by case status (Behind, Dropped, On Track)
- Filter by date range
- Export filtered results to CSV
- Link to learner timelines
- Shows follow-up dates and status

**Use Cases:**
- "Show all Behind learners in WRG this month"
- "Export all Dropped students for outreach"
- "Find learners needing follow-up this week"

**Route:** `/admin/reports/caseload`

### 8. Automated Email Alerts ✅

#### Daily Login Reminders
**Purpose**: Re-engage learners who haven't logged in recently.

**Logic:**
- Runs daily via scheduled function
- Finds active enrollments with no login in 7+ days
- Sends reminder email to learner
- Includes dashboard link

**File:** `/netlify/functions/login-reminders.ts`

#### Weekly Caseload Summaries
**Purpose**: Keep program holders informed of at-risk learners.

**Logic:**
- Runs weekly (e.g., Monday 7am)
- For each program holder:
  - Finds learners marked Behind or Dropped
  - Includes follow-up dates (overdue, due this week, future)
  - Groups by status
  - Shows latest notes
- Emails summary to program holder owner

**File:** `/netlify/functions/weekly-caseload.ts`

**Email Format:**
```
Weekly Caseload Summary for [Program Name]

Total of X learners marked Behind or Dropped.

BEHIND (X):
  • learner@email.com | WRG | Course Name
    follow-up 2025-11-20 (OVERDUE)
    Note: Missed 2 weeks, left voicemail

DROPPED (X):
  • learner@email.com | WIOA | Course Name
    no follow-up date set
    Note: Found employment elsewhere

---
You can update notes and statuses here: [link]
```

## API Endpoints

### Delegates Management
- `GET /api/delegates/holders` - List all program holders (admin only)
- `GET /api/delegates/list` - List all delegates with permissions (admin only)
- `POST /api/delegates/add` - Add new delegate (admin only)
- `POST /api/delegates/update` - Update delegate permissions (admin only)

### Login Tracking
- `POST /api/events/login` - Log a login event (authenticated users)

### Case Notes
- `POST /api/delegate/notes/add` - Add case note (delegates/partners)
- `GET /api/admin/learner/notes?user_id={id}` - Get all notes for learner (admin)
- `GET /api/admin/learner/info?user_id={id}` - Get learner basic info (admin)

### Reports
- `GET /api/reports/usage` - Admin usage report with filters (admin only)
  - Query params: `code`, `from`, `to`, `format`
- `GET /api/reports/usage/delegate` - Delegate usage report (delegates/partners)
- `GET /api/reports/caseload` - Caseload report with filters (admin only)
  - Query params: `program`, `status`, `from`, `to`, `format`

## Pages & Routes

### Admin Pages
- `/admin/delegates` - Manage program holders and delegates
- `/admin/reports` - Main reports hub with filters
- `/admin/reports/caseload` - Targeted caseload report
- `/admin/learner/[id]` - Learner timeline view

### Delegate Pages
- `/delegate/reports` - Program holder reports portal

## Database Schema

### New Tables

```sql
-- Program holders
create table public.program_holders(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Delegates with permissions
create table public.delegates(
  id uuid primary key default gen_random_uuid(),
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  can_view_reports boolean default true,
  can_view_learners boolean default true,
  can_edit_courses boolean default false,
  can_view_financials boolean default false,
  created_at timestamptz default now()
);

-- Login tracking
create table public.login_events(
  id bigint generated by default as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  source text not null,
  at timestamptz default now()
);

-- Case management notes
create table public.program_holder_notes(
  id bigint generated by default as identity primary key,
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  note text,
  status text,
  follow_up_date date,
  follow_up_done boolean default false,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);
```

### Modified Tables

```sql
-- Link users to program holders
alter table user_profiles add column program_holder_id uuid references program_holders(id);

-- Link courses to program holders
alter table courses add column program_holder_id uuid references program_holders(id);

-- Link enrollments to funding programs
alter table enrollments add column funding_program_id uuid references funding_programs(id);
```

### Indexes

```sql
create index idx_delegates_ph on delegates(program_holder_id);
create index idx_delegates_user on delegates(user_id);
create index idx_login_user_time on login_events(user_id, at desc);
create index idx_ph_notes_ph on program_holder_notes(program_holder_id);
create index idx_ph_notes_user on program_holder_notes(user_id, course_id);
create index idx_ph_notes_followup on program_holder_notes(follow_up_date, follow_up_done) 
  where follow_up_date is not null;
```

## Workflow Examples

### 1. Adding a New Program Holder
1. Admin navigates to `/admin/delegates`
2. Creates new program holder record in database
3. Sets `owner_user_id` to program holder's user account
4. Program holder can now access `/delegate/reports`

### 2. Assigning a Delegate
1. Admin navigates to `/admin/delegates`
2. Selects program holder from dropdown
3. Enters delegate's email address
4. Clicks "Add Delegate"
5. System creates delegate record with default permissions
6. Updates user profile with `program_holder_id` and `partner` role
7. Delegate can now access `/delegate/reports` with assigned permissions

### 3. Logging a Case Note
1. Delegate navigates to `/delegate/reports`
2. Views list of assigned learners
3. Clicks "Add Note" or "Update" button
4. Enters:
   - Status (On Track, Behind, Dropped)
   - Note text
   - Follow-up date (optional)
5. System creates new note record
6. Latest note appears in reports immediately

### 4. Running a Caseload Report
1. Admin navigates to `/admin/reports/caseload`
2. Selects filters:
   - Program: WRG
   - Status: Behind
   - Date range: This month
3. Clicks "Refresh"
4. Views filtered list of at-risk learners
5. Clicks "Export CSV" for offline analysis
6. Clicks "Timeline" link to view learner history

### 5. Weekly Email Process
1. Scheduled function runs Monday 7am
2. Queries all program holders
3. For each program holder:
   - Finds learners marked Behind or Dropped
   - Checks follow-up dates
   - Builds summary email
   - Sends to program holder owner
4. Program holder receives email
5. Clicks link to `/delegate/reports`
6. Updates notes and follow-up dates

## Configuration

### Environment Variables
```env
# Database
SUPABASE_DB_URL=postgresql://...

# Email
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@elevateforhumanity.org

# App
NEXT_PUBLIC_BASE_URL=https://elevate.example.com
```

### Scheduled Functions (Netlify)
```toml
# netlify.toml
[[functions]]
  name = "login-reminders"
  schedule = "0 8 * * *"  # Daily at 8am

[[functions]]
  name = "weekly-caseload"
  schedule = "0 7 * * 1"  # Monday at 7am
```

## Security & Permissions

### Role Hierarchy
1. **Admin** - Full access to all features
2. **Partner** - Program holder owner, full access to their learners
3. **Delegate** - Limited access based on permissions
4. **Instructor** - Can view their courses
5. **Learner** - Can only view their own data

### Access Control Checks
- All admin endpoints verify `role === 'admin'`
- Delegate endpoints verify:
  - User has `program_holder_id`
  - User is in `delegates` table OR has `partner` role
  - Delegate has required permission flag
- Data filtering by `program_holder_id` prevents cross-tenant access

### Data Privacy
- Learners cannot see other learners' data
- Delegates only see learners in their program holder's courses
- Case notes are only visible to admin and assigned program holder
- Login events are aggregated, not exposed individually

## Reporting & Analytics

### Key Metrics Tracked
- **Engagement**: Login frequency, last login date
- **Progress**: Minutes completed, percentage complete
- **Status**: Enrollment status, case status
- **Outcomes**: Completions, certificates issued
- **Intervention**: Follow-up dates, overdue tasks

### Export Formats
- **CSV**: All reports support CSV export
- **Columns**: Consistent across reports for easy analysis
- **Timestamps**: ISO 8601 format for sorting
- **Encoding**: UTF-8 with proper escaping

### Compliance Features
- **Audit Trail**: All notes timestamped with creator
- **Status History**: Full timeline preserved
- **Follow-up Tracking**: Documented intervention attempts
- **Program Codes**: WRG, WIOA, JRI, etc. tracked
- **Funding Source**: Linked to enrollments

## Future Enhancements

### Suggested Next Steps
1. **Task Management**
   - Add task types (call, email, meeting)
   - Task assignment to specific staff
   - Task completion tracking

2. **Bulk Operations**
   - Bulk status updates
   - Bulk follow-up scheduling
   - Bulk email to filtered learners

3. **Advanced Reporting**
   - Retention rates by program
   - Time-to-completion analysis
   - Intervention effectiveness metrics
   - Funder-specific report templates

4. **Mobile App**
   - Native mobile app for delegates
   - Push notifications for follow-ups
   - Offline note-taking

5. **Integration**
   - Export to funder portals (WRG, WIOA)
   - Import from referral systems
   - Calendar integration for follow-ups

6. **Compliance Language**
   - Use funder-specific terminology
   - "Participant" instead of "learner"
   - "Service contact" instead of "note"
   - "Case management" terminology

## Troubleshooting

### Common Issues

**Delegates can't see learners:**
- Verify `program_holder_id` is set on user profile
- Check delegate record exists with correct permissions
- Ensure courses have `program_holder_id` set

**Login tracking not working:**
- Check `LoginTracker` component is imported
- Verify API endpoint is accessible
- Check browser console for errors

**Emails not sending:**
- Verify `RESEND_API_KEY` is set
- Check `EMAIL_FROM` is verified domain
- Review Netlify function logs

**Reports showing no data:**
- Verify enrollments have `funding_program_id` set
- Check date range filters
- Ensure program codes match exactly (case-sensitive)

### Debug Queries

```sql
-- Check program holder setup
select * from program_holders;

-- Check delegate permissions
select d.*, u.email, ph.name 
from delegates d
join auth.users u on u.id = d.user_id
join program_holders ph on ph.id = d.program_holder_id;

-- Check latest notes per learner
select distinct on (user_id, course_id)
  user_id, course_id, status, note, follow_up_date, created_at
from program_holder_notes
order by user_id, course_id, created_at desc;

-- Check login activity
select user_id, count(*), max(at) as last_login
from login_events
group by user_id
order by last_login desc;
```

## Support

For issues or questions:
1. Check this documentation
2. Review database schema
3. Check API endpoint responses
4. Review Netlify function logs
5. Contact system administrator

## Version History

- **v1.0** - Initial release with basic delegate management
- **v1.1** - Added login tracking and reminders
- **v1.2** - Added case notes and timeline view
- **v1.3** - Added follow-up tracking
- **v1.4** - Added weekly caseload summaries
- **v1.5** - Added caseload report with filters
