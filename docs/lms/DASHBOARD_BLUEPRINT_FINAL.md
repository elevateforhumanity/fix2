# ELEVATE FOR HUMANITY - DASHBOARD SYSTEM BLUEPRINT

## Repository Audit Results

### ✅ What Already Exists

**Database Tables:**
- `service_requirements` - Tracks state board service minimums
- `funding_sources` - WRG, WIOA, JRI, etc.
- `student_funding_assignments` - Links enrollments to funding
- `enrollments` - Student program enrollments with status
- `apprentice_hours_log` - WIOA-compliant hour tracking with approval workflow
- `certificate_verifications` - Certificate validation system

**Approval Workflows:**
- Hour entry status: DRAFT → SUBMITTED → APPROVED/REJECTED → LOCKED
- Supervisor approval tracking (approved_by, approved_at)
- Funding phase tracking: PRE_WIOA, WIOA, POST_CERT

**Export/Reporting:**
- `/lib/reports/exportCsv.ts` - CSV export utility
- `/app/admin/compliance/exports/` - Data export page
- `/lib/audit.ts` - Audit logging system

### ❌ What's Missing

**Requirements Checklist System:**
- No unified "requirements" table for tracking all completion items
- Service requirements only track apprenticeship services
- No evidence upload/verification system
- No requirement status tracking (pending/completed/verified)

**At-Risk Detection:**
- No automated at-risk student detection
- No dashboard alerts for overdue requirements
- No red/yellow/green status calculation

**Role-Based Dashboards:**
- Current dashboards are generic (not role-optimized)
- No action-first student dashboard
- No program holder verification dashboard
- No admin risk-detection dashboard

---

## THE 4 DASHBOARD SYSTEM

### 1. STUDENT DASHBOARD

**Purpose:** Keep student moving, no confusion

**Top Section:**
```
Program: Barber Apprenticeship
Status: 🟢 On Track | Progress: 65%
Funding: WIOA + WRG
Advisor: Sarah Johnson | 📞 (317) 555-0123
```

**Requirements Checklist (Core):**
```
Requirement                    Status          Action
─────────────────────────────────────────────────────
Complete theory (Milady)       ⏳ In Progress  → Go to Course
Upload completion cert         ❌ Not Started  → Upload
Log apprenticeship hours       ⏳ In Progress  → Log Hours
Supervisor sign-off            ❌ Pending      → Request
Final evaluation               ❌ Not Started  → Start
```

**Support Box:**
- Request advisor support
- Report barrier (transportation, childcare, legal)
- Ask question

**Files to Create:**
- `/app/student/dashboard/page.tsx` (replace redirect)
- `/components/lms/RequirementsChecklist.tsx`
- `/components/lms/StudentStatusBadge.tsx`
- `/lib/lms/student-requirements.ts`

---

### 2. PROGRAM HOLDER DASHBOARD

**Purpose:** Keep students compliant, protect legally

**Overview:**
```
Active Students: 24
At-Risk: 3
Missing Verifications: 7
Upcoming Deadlines: 2
```

**Student Roster:**
```
Student    Program  Status  Missing
────────────────────────────────────
Jane D.    Barber   🟡      Hours
Mike R.    CNA      🔴      Certificate
Alex P.    HVAC     🟢      —
```

**Verification Panel (per student):**
- Approve uploaded certificates
- Confirm logged hours
- Upload evaluations
- Add notes
- Flag issues

**Compliance Checklist:**
- Curriculum uploaded
- Instructor credentials on file
- Reporting up to date
- Agreements signed
- Audit-ready status

**Files to Create:**
- `/app/program-holder/dashboard/page.tsx`
- `/app/program-holder/verify/[studentId]/page.tsx`
- `/components/lms/VerificationPanel.tsx`
- `/lib/lms/program-holder-verification.ts`

---

### 3. ADMIN/WORKFORCE DASHBOARD

**Purpose:** Risk detection, audit readiness

**Top Metrics (Red First):**
```
At-Risk Students: 12
Low Completion Programs: 3
Missing Reporting: 5
Upcoming Audits: 2
```

**Funding View:**
```
Funding  Students  On Track  At Risk
─────────────────────────────────────
WIOA     42        36        6
JRI      18        12        6
WRG      27        25        2
```

**Program Performance:**
- Enrollment vs completion
- Drop-off points
- Partner performance
- Compliance gaps

**Audit Export (One-Click):**
- Student list
- Requirements completed
- Evidence links
- Dates
- Funding source

**Files to Create:**
- `/app/admin/dashboard/page.tsx` (replace generic)
- `/app/admin/at-risk/page.tsx`
- `/app/admin/audit-export/page.tsx`
- `/components/lms/AtRiskAlert.tsx`
- `/lib/lms/at-risk-detection.ts`
- `/lib/lms/audit-export.ts`

---

### 4. EMPLOYER/PARTNER DASHBOARD (Optional)

**Purpose:** Placement validation

**Metrics:**
- Students placed / in pipeline
- Hours logged
- Evaluations submitted
- Hiring outcomes

**Files to Create:**
- `/app/employer/dashboard/page.tsx`
- `/components/lms/PlacementTracker.tsx`

---

## DATABASE SCHEMA ADDITIONS

### Requirements Table
```sql
CREATE TABLE student_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id),
  requirement_type text NOT NULL, -- 'course', 'document', 'hours', 'evaluation'
  title text NOT NULL,
  description text,
  due_date date,
  priority text DEFAULT 'normal', -- 'urgent', 'high', 'normal'
  status text DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'verified'
  evidence_url text,
  verified_by uuid,
  verified_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### At-Risk Tracking
```sql
CREATE TABLE student_risk_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid REFERENCES enrollments(id),
  status text NOT NULL, -- 'on_track', 'needs_action', 'at_risk'
  overdue_count int DEFAULT 0,
  last_activity_date date,
  calculated_at timestamptz DEFAULT now()
);
```

---

## IMPLEMENTATION PRIORITY

### Phase 1: Student Dashboard (Week 1)
1. Create requirements table
2. Build student dashboard page
3. Build requirements checklist component
4. Wire to real enrollment data
5. Add support contact display

### Phase 2: Program Holder Dashboard (Week 2)
1. Build verification workflow
2. Create student roster view
3. Add approval actions
4. Build compliance checklist

### Phase 3: Admin Dashboard (Week 3)
1. Build at-risk detection logic
2. Create admin dashboard
3. Add funding source view
4. Build audit export

### Phase 4: Polish (Week 4)
1. Mobile optimization
2. Real-time updates
3. Email notifications
4. User testing

---

## SUCCESS METRICS

**Student:**
- Time to identify next action < 10 seconds
- Support contact visible: 100%
- Action completion rate: +30%

**Program Holder:**
- Student status visible at glance
- Verification workflow < 3 clicks
- Zero missed reporting deadlines

**Admin:**
- At-risk students surface automatically
- Audit export < 30 seconds
- Zero funding mismatches

---

## NEXT STEPS

Choose one to build:

1. **Student dashboard + requirements system**
2. **Program holder verification workflow**
3. **Admin at-risk detection + audit export**
4. **Database schema + migrations**
5. **All 4 dashboards (full implementation)**

---

Last Updated: 2025-12-18
Status: Blueprint Complete, Ready for Implementation
