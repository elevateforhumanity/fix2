# LMS System Overview

## Current State Analysis

### What Exists

**Student Dashboards:**
- `/app/lms/(app)/dashboard/page.tsx` - Main LMS dashboard (generic)
- `/app/student/dashboard/page.tsx` - Redirects to LMS
- `/app/student/dashboard-new/page.tsx` - New action-first design (created)
- `/app/portal/student/dashboard/page.tsx` - Portal variant

**Program Holder Dashboards:**
- `/app/program-holder/portal/page.tsx` - Generic portal view
- `/app/program-holder/portal/students/page.tsx` - Student management
- `/app/program-holder/portal/attendance/page.tsx` - Attendance tracking
- `/app/program-holder/portal/reports/page.tsx` - Reporting

**Admin/Compliance Dashboards:**
- `/app/admin/compliance-dashboard/page.tsx` - Generic compliance view
- `/app/admin/compliance/page.tsx` - Compliance management
- `/app/admin/audit-logs/` - Audit logging

**Supporting Systems:**
- `/lib/audit.ts` - Audit event logging
- `/lib/handbooks/program-holder-responsibilities.ts` - Program holder guide
- `/lib/workforce/wioa-compliance.ts` - WIOA compliance
- `/lib/compliance/apprenticeship.ts` - Apprenticeship compliance

### What's Missing

❌ **Requirements/Checklist System** - No unified system for tracking student requirements
❌ **Action-First Student UX** - Current dashboards are information-heavy, not action-oriented
❌ **Program Holder Verification Flows** - No clear workflow for verifying student progress
❌ **Compliance Audit Views** - Generic views, not audit-ready
❌ **Public LMS Explanation** - No clear explanation of what the LMS is for partners/students

---

## The Problem (From Diagnosis)

### Identity Crisis
The LMS has no clear identity. It's trying to be:
- A course platform
- A compliance system
- A workforce reporting tool
- A student portal
- A program management system

**Result:** Users don't know what it's for or how to use it.

### Three Modes Needed

**MODE 1: STUDENT MODE**
- What am I enrolled in?
- What do I need to complete?
- What's blocking me?
- Who do I contact?
- Am I on track?

**MODE 2: PROGRAM HOLDER MODE**
- Keep students compliant and moving
- Red/yellow/green status per student
- Required uploads checklist
- Reporting deadline reminders

**MODE 3: WORKFORCE/ADMIN MODE**
- At-risk students surface automatically
- Missing reporting highlighted
- Programs with low completion flagged
- Funding source mismatches shown
- Upcoming audits/deadlines visible

---

## Architecture Strengths

✅ **Route Groups** - Modular portal structure
✅ **Role-Based Access** - Student/admin/program holder separation
✅ **Reporting Views** - Already exist
✅ **Enrollment + Completion Tables** - Data model supports tracking
✅ **Hybrid Delivery Support** - Online + in-person + apprenticeship
✅ **Justice-Involved Reporting (JRI)** - Specialized tracking
✅ **Workforce Reporting (WIOA/WRG)** - Compliance built-in

**Grade: A- Architecture, C Student UX, B- Program Holder UX, C+ Admin Visibility**

---

## What Needs to Be Built

### 1. Student LMS Dashboard (Action-First)
**Status:** ✅ Created at `/app/student/dashboard-new/page.tsx`

**Features:**
- Program status (On Track / Needs Action)
- Real progress bar
- Action list (what to do next)
- Support team contact info
- Quick links to key functions

**Next:** Wire to real data (enrollments, lessons, hours)

### 2. Requirements Checklist System
**Status:** ❌ Not built

**Needed:**
- Database schema for requirements
- UI components for checklist display
- Logic for requirement completion tracking
- Evidence upload system
- Verification workflow

**Mental Model Shift:**
- LMS ≠ Courses
- LMS = Compliance + Progress + Proof
- Requirements include: courses, hours, sign-offs, docs, credentials

### 3. Program Holder Verification Flows
**Status:** ❌ Not built

**Needed:**
- Student status dashboard (red/yellow/green)
- Required uploads checklist
- Verification workflow (approve/reject)
- Reporting deadline reminders
- Compliance checklist per program

### 4. Admin/Workforce Audit View
**Status:** ⚠️ Partial (generic views exist)

**Needed:**
- At-risk student surfacing
- Missing reporting alerts
- Low completion program flags
- Funding source mismatch detection
- Audit-ready export views
- Student → Program → Funding → Outcome chain visualization

### 5. Public LMS Explanation Copy
**Status:** ❌ Not built

**Needed:**
- "What is the LMS" page for students
- "What is the LMS" page for program holders
- "What is the LMS" page for workforce partners
- Video scripts explaining LMS purpose
- Onboarding materials

---

## Implementation Priority

### Phase 1: Student Clarity (CRITICAL)
1. ✅ Student dashboard redesign (done)
2. Wire dashboard to real data
3. Create requirements checklist UI
4. Add completion narrative page
5. Write "What is the LMS" student copy

### Phase 2: Program Holder Efficiency
1. Redesign program holder dashboard
2. Build verification workflow
3. Add compliance checklist
4. Create reporting deadline system
5. Write program holder guide

### Phase 3: Admin/Audit Readiness
1. Build at-risk student detection
2. Create audit-ready export views
3. Add funding source validation
4. Build outcome chain visualization
5. Create workforce partner documentation

---

## Files to Create

### Documentation
- [ ] `/docs/lms/STUDENT_LMS_GUIDE.md` - Student-facing LMS explanation
- [ ] `/docs/lms/PROGRAM_HOLDER_LMS_GUIDE.md` - Program holder guide
- [ ] `/docs/lms/WORKFORCE_PARTNER_LMS_GUIDE.md` - Workforce partner explanation
- [ ] `/docs/lms/REQUIREMENTS_SYSTEM.md` - Requirements checklist system design
- [ ] `/docs/lms/VERIFICATION_FLOWS.md` - Program holder verification workflows
- [ ] `/docs/lms/AUDIT_VIEWS.md` - Compliance audit view specifications

### Components
- [ ] `/components/lms/RequirementsChecklist.tsx` - Checklist UI component
- [ ] `/components/lms/StudentStatusCard.tsx` - Status display (on track/needs action)
- [ ] `/components/lms/ActionItem.tsx` - Action list item component
- [ ] `/components/lms/VerificationWorkflow.tsx` - Program holder verification UI
- [ ] `/components/lms/ComplianceAlert.tsx` - Admin alert component
- [ ] `/components/lms/AuditExport.tsx` - Audit export UI

### Pages
- [ ] `/app/student/requirements/page.tsx` - Student requirements view
- [ ] `/app/student/completion/page.tsx` - Completion narrative page
- [ ] `/app/program-holder/verify/page.tsx` - Verification dashboard
- [ ] `/app/program-holder/compliance/page.tsx` - Compliance checklist
- [ ] `/app/admin/at-risk/page.tsx` - At-risk students view
- [ ] `/app/admin/audit/page.tsx` - Audit-ready export view

### Library Functions
- [ ] `/lib/lms/requirements.ts` - Requirements logic
- [ ] `/lib/lms/verification.ts` - Verification workflow logic
- [ ] `/lib/lms/compliance-checks.ts` - Compliance validation
- [ ] `/lib/lms/at-risk-detection.ts` - At-risk student detection
- [ ] `/lib/lms/audit-export.ts` - Audit export generation

---

## Success Metrics

### Student Mode
- Time to understand "what to do next" < 10 seconds
- Support contact visible without scrolling
- Progress bar reflects real completion
- Action items link directly to completion

### Program Holder Mode
- Student status visible at a glance (red/yellow/green)
- Required uploads checklist always visible
- Verification workflow < 3 clicks
- Reporting deadlines never missed

### Admin Mode
- At-risk students surface automatically
- Missing reporting visible on dashboard
- Audit export generates in < 30 seconds
- Funding source validation runs automatically

---

## Next Steps

Choose one to build next:

1. **Wire student dashboard to real data** - Make dashboard-new functional
2. **Design requirements checklist system** - UI + logic for tracking requirements
3. **Write program holder verification flows** - Workflow documentation
4. **Write public-facing LMS explanation copy** - For site + partners
5. **Create compliance/audit view blueprint** - Audit-ready export specifications

---

Last Updated: 2025-12-18
Status: Analysis Complete, Implementation Pending
