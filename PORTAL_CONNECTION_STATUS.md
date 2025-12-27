# Portal Connection Status

## Database Tables Created ✅

- customer_service_tickets
- qa_checklists
- qa_checklist_completions
- staff_processes
- employers
- job_postings
- job_applications
- apprenticeships
- apprenticeship_enrollments
- payroll_profiles
- crm_contacts
- crm_interactions
- tax_filings
- vita_appointments
- shop_reports
- calendar_events
- ferpa_training_records
- document_signatures

## Student Portal (43 pages)

### Connected ✅

1. **calendar** - Connected to `calendar_events` table

### Ready to Connect (API routes exist)

2. **badges** - API: `/api/student/badges` → Table: `badges`, `user_badges`
3. **certificates** - API: `/api/certificates` → Table: `certificates`
4. **certifications** - API: `/api/certifications` → Table: `certifications`
5. **courses** - API: `/api/courses` → Table: `courses`, `enrollments`
6. **dashboard** - Multiple APIs → Multiple tables
7. **documents** - API: `/api/student/documents` → Storage bucket
8. **grades** - API: `/api/grades` → Table: `grades`
9. **hours** - API: `/api/student/hours` → Table: `contact_hours`
10. **portfolio** - API: `/api/student/portfolio` → Multiple tables
11. **schedule** - API: `/api/student/schedule` → Table: `enrollments`, `lessons`

### Need Investigation

- ai-tutor
- analytics
- apprenticeship
- apprenticeship-hours
- assignments
- career-counseling
- competencies
- discussions
- handbook
- hours-tracking
- hub
- jri
- learning-path
- messages
- milady
- notifications
- onboarding
- payments
- portfolio
- profile
- progress
- resources
- scorm
- settings
- study-groups
- support
- time-tracking
- transcript
- tutoring
- videos
- wellness

## Next Steps

### Immediate (Today)

1. ✅ Calendar connected
2. Connect badges page
3. Connect certificates page
4. Connect courses page
5. Connect dashboard

### Tomorrow

6. Connect grades
7. Connect schedule
8. Connect portfolio
9. Connect documents
10. Test all connected pages

### This Week

- Connect all remaining student pages
- Move to Admin Portal
- Move to Staff Portal

## Connection Pattern

For each page:

1. Check if API route exists
2. Check what table it uses
3. Update page query to use correct table
4. Test page loads
5. Mark as connected

## Testing Checklist

For each connected page:

- [ ] Page loads without errors
- [ ] Data displays correctly
- [ ] CRUD operations work (if applicable)
- [ ] RLS policies allow access
- [ ] No console errors
