# Program Holder Portal - Fix Implementation Plan

**Generated:** 2025-12-23  
**Estimated Total Effort:** 6-8 weeks  
**Priority:** CRITICAL - Blocking user workflows

---

## Priority 1: Critical Blockers (Week 1-3)

These features block essential workflows and must be implemented first.

### Fix 1.1: Create Verification Page

**File:** `app/program-holder/verification/page.tsx`  
**Estimated Effort:** 2-3 days  
**Blocks:** All new program holders

**Requirements:**

- Display verification checklist
- Show required documents (license, insurance, etc.)
- Link to document upload page
- Show verification status
- Display next steps after verification

**Implementation:**

```typescript
// Fetch verification status
const { data: verification } = await supabase
  .from('program_holder_verifications')
  .select('*')
  .eq('user_id', user.id)
  .single();

// Fetch uploaded documents
const { data: documents } = await supabase
  .from('program_holder_documents')
  .select('*')
  .eq('user_id', user.id);

// Check requirements
const requirements = [
  { id: 'license', label: 'Business License', required: true },
  { id: 'insurance', label: 'Liability Insurance', required: true },
  { id: 'accreditation', label: 'Accreditation', required: false },
];
```

**Database:**

- Table: `program_holder_verifications` (may need to create)
- Columns: `id`, `user_id`, `status`, `verified_at`, `verified_by`, `notes`

**API Endpoint:**

- `POST /api/program-holder/verification/submit`
- `GET /api/program-holder/verification/status`

---

### Fix 1.2: Create Students Management Page

**File:** `app/program-holder/students/page.tsx`  
**Estimated Effort:** 3-4 days  
**Blocks:** Core student management functionality

**Requirements:**

- List all enrolled students
- Show student status (active, at-risk, completed)
- Display student progress
- Link to individual student details
- Filter by status, program, date
- Export student list

**Implementation:**

```typescript
// Fetch students
const { data: students } = await supabase
  .from('enrollments')
  .select(
    `
    *,
    profiles:student_id (
      first_name,
      last_name,
      email,
      phone
    ),
    programs (
      name,
      slug
    )
  `
  )
  .eq('program_holder_id', user.id)
  .order('created_at', { ascending: false });

// Calculate metrics
const activeStudents = students?.filter((s) => s.status === 'active') || [];
const atRiskStudents = students?.filter((s) => s.at_risk === true) || [];
const completedStudents =
  students?.filter((s) => s.status === 'completed') || [];
```

**Database:**

- Table: `enrollments` (should already exist)
- Columns: `id`, `student_id`, `program_holder_id`, `program_id`, `status`, `at_risk`, `progress`, `created_at`

**Sub-pages:**

- `/program-holder/students/[id]` - Individual student details
- `/program-holder/students/pending` - Pending applications
- `/program-holder/students/at-risk` - At-risk students

---

### Fix 1.3: Create Reports Submission Page

**File:** `app/program-holder/reports/page.tsx`  
**Estimated Effort:** 3-4 days  
**Blocks:** Compliance reporting requirement

**Requirements:**

- List all submitted reports
- Show report status (draft, submitted, approved, rejected)
- Display due dates and overdue reports
- Link to create new report
- Download submitted reports

**Implementation:**

```typescript
// Fetch reports
const { data: reports } = await supabase
  .from('compliance_reports')
  .select('*')
  .eq('program_holder_id', user.id)
  .order('due_date', { ascending: false });

// Calculate metrics
const overdueReports =
  reports?.filter(
    (r) => new Date(r.due_date) < new Date() && r.status !== 'submitted'
  ) || [];
const pendingReports = reports?.filter((r) => r.status === 'pending') || [];
```

**Database:**

- Table: `compliance_reports` (may need to create)
- Columns: `id`, `program_holder_id`, `report_type`, `period_start`, `period_end`, `due_date`, `status`, `submitted_at`, `data`

**Sub-pages:**

- `/program-holder/reports/new` - Create new report
- `/program-holder/reports/[id]` - View/edit report
- `/program-holder/reports/[id]/submit` - Submit report

**API Endpoints:**

- `POST /api/program-holder/reports/create`
- `PUT /api/program-holder/reports/[id]`
- `POST /api/program-holder/reports/[id]/submit`

---

### Fix 1.4: Create Compliance Dashboard

**File:** `app/program-holder/compliance/page.tsx`  
**Estimated Effort:** 2-3 days  
**Blocks:** Compliance issue resolution

**Requirements:**

- Display compliance score
- Show compliance issues
- List remediation steps
- Track issue resolution
- Display compliance history

**Implementation:**

```typescript
// Fetch compliance data
const { data: compliance } = await supabase
  .from('compliance_scores')
  .select('*')
  .eq('program_holder_id', user.id)
  .single();

// Fetch issues
const { data: issues } = await supabase
  .from('compliance_issues')
  .select('*')
  .eq('program_holder_id', user.id)
  .eq('status', 'open')
  .order('severity', { ascending: false });

// Calculate score
const score = compliance?.score || 100;
const status = score >= 70 ? 'compliant' : 'non_compliant';
```

**Database:**

- Table: `compliance_scores` (may need to create)
- Columns: `id`, `program_holder_id`, `score`, `calculated_at`, `factors`
- Table: `compliance_issues` (may need to create)
- Columns: `id`, `program_holder_id`, `issue_type`, `severity`, `description`, `status`, `resolved_at`

---

## Priority 2: Navigation & Templates (Week 4-5)

These improve discoverability and fix broken templates.

### Fix 2.1: Add Navigation Layout

**File:** `app/program-holder/layout.tsx`  
**Estimated Effort:** 2 days

**Requirements:**

- Persistent sidebar navigation
- Role-based menu items
- Active state indicators
- Breadcrumbs
- User profile dropdown
- Logout button

**Implementation:**

```typescript
export default async function ProgramHolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'program_holder') redirect('/');

  return (
    <div className="flex min-h-screen">
      <ProgramHolderNav user={user} profile={profile} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
```

**Component:** `components/program-holder/ProgramHolderNav.tsx`

**Menu Items:**

- Dashboard
- Students
- Reports
- Compliance
- Documents
- Training
- Settings
- Support

---

### Fix 2.2: Replace Generic Templates

**Files:**

- `app/program-holder/portal/students/page.tsx`
- `app/program-holder/portal/attendance/page.tsx`
- `app/program-holder/portal/reports/page.tsx`
- `app/program-holder/portal/messages/page.tsx`
- `app/program-holder/portal/live-qa/page.tsx`

**Estimated Effort:** 1 day per page = 5 days

**Strategy:**

1. Redirect to main pages (e.g., `/portal/students` → `/students`)
2. OR implement as sub-features of main pages
3. OR remove entirely if not needed

**Example redirect:**

```typescript
// app/program-holder/portal/students/page.tsx
import { redirect } from 'next/navigation';

export default function PortalStudentsPage() {
  redirect('/program-holder/students');
}
```

---

### Fix 2.3: Create Documentation Page

**File:** `app/program-holder/documentation/page.tsx`  
**Estimated Effort:** 2 days

**Requirements:**

- List available resources
- Categorize by type (forms, templates, guides)
- Download links
- Search functionality
- Recently added section

**Implementation:**

```typescript
const resources = [
  {
    category: 'Forms',
    items: [
      { name: 'Student Enrollment Form', url: '/docs/enrollment-form.pdf' },
      { name: 'Progress Report Template', url: '/docs/progress-report.pdf' },
    ],
  },
  {
    category: 'Guides',
    items: [
      { name: 'Program Holder Handbook', url: '/docs/handbook.pdf' },
      { name: 'Compliance Guide', url: '/docs/compliance-guide.pdf' },
    ],
  },
];
```

---

### Fix 2.4: Create Support Page

**File:** `app/program-holder/support/page.tsx`  
**Estimated Effort:** 1 day

**Requirements:**

- Contact information
- Support ticket submission
- FAQ section
- Live chat (if available)
- Office hours

**Implementation:**

```typescript
const supportChannels = [
  {
    type: 'Email',
    value: 'program-holders@elevateforhumanity.org',
    responseTime: '24 hours',
  },
  {
    type: 'Phone',
    value: '317-314-3757',
    hours: 'Mon-Fri 9am-5pm EST',
  },
];
```

---

## Priority 3: Enhanced Features (Week 6-8)

These add value but are not blocking core workflows.

### Fix 3.1: Student Detail Pages

**File:** `app/program-holder/students/[id]/page.tsx`  
**Estimated Effort:** 2-3 days

**Requirements:**

- Student profile information
- Enrollment details
- Progress tracking
- Attendance records
- Notes and communications
- Document uploads

---

### Fix 3.2: Report Builder

**File:** `app/program-holder/reports/new/page.tsx`  
**Estimated Effort:** 3-4 days

**Requirements:**

- Multi-step form
- Auto-save drafts
- Data validation
- File attachments
- Preview before submit
- Confirmation email

---

### Fix 3.3: Training Resources

**File:** `app/program-holder/training/page.tsx`  
**Estimated Effort:** 2 days

**Requirements:**

- Video tutorials
- Documentation links
- Webinar schedule
- Certification tracking
- Progress tracking

---

### Fix 3.4: Settings Page

**File:** `app/program-holder/settings/page.tsx`  
**Estimated Effort:** 2 days

**Requirements:**

- Profile information
- Notification preferences
- Password change
- Organization details
- API keys (if applicable)

---

## Implementation Strategy

### Phase 1: Immediate Fixes (Week 1)

**Goal:** Stop the bleeding - prevent new users from getting stuck

1. Create placeholder pages for all missing routes
2. Add "Coming Soon" messages with contact information
3. Update dashboard to show feature availability
4. Add temporary 404 handler with helpful messages

**Deliverable:** No more broken links

---

### Phase 2: Core Features (Week 2-3)

**Goal:** Enable essential workflows

1. Implement verification page
2. Implement students management page
3. Implement reports submission page
4. Implement compliance dashboard

**Deliverable:** Program holders can complete core duties

---

### Phase 3: Navigation & Polish (Week 4-5)

**Goal:** Improve discoverability and user experience

1. Add navigation layout
2. Replace generic templates
3. Create documentation page
4. Create support page

**Deliverable:** Professional, navigable portal

---

### Phase 4: Enhanced Features (Week 6-8)

**Goal:** Add value-added features

1. Student detail pages
2. Report builder
3. Training resources
4. Settings page

**Deliverable:** Full-featured portal

---

## Testing Plan

### Unit Tests

- Test each page renders without errors
- Test data fetching logic
- Test form submissions
- Test state machine transitions

### Integration Tests

- Test complete user journeys
- Test navigation between pages
- Test role-based access control
- Test database operations

### User Acceptance Testing

- Test with real program holders
- Gather feedback on usability
- Identify missing features
- Prioritize enhancements

---

## Rollout Plan

### Week 1: Soft Launch

- Deploy placeholder pages
- Update documentation
- Notify support team
- Monitor error logs

### Week 2-3: Beta Launch

- Deploy core features
- Invite 5-10 program holders to test
- Gather feedback
- Fix critical bugs

### Week 4-5: Full Launch

- Deploy navigation and polish
- Announce to all program holders
- Provide training materials
- Monitor usage metrics

### Week 6-8: Enhancement Phase

- Deploy enhanced features
- Gather feature requests
- Plan next iteration
- Measure success metrics

---

## Success Metrics

### Quantitative

- Zero 404 errors on program holder pages
- 100% of dashboard links work
- 90%+ user satisfaction score
- 50%+ reduction in support tickets
- 80%+ feature adoption rate

### Qualitative

- Users can complete verification without support
- Users can manage students independently
- Users can submit reports on time
- Users can resolve compliance issues
- Users report portal is "easy to use"

---

## Risk Mitigation

### Risk 1: Database Schema Changes

**Mitigation:**

- Review existing schema before implementing
- Create migrations for new tables
- Test migrations in staging
- Have rollback plan

### Risk 2: Breaking Existing Features

**Mitigation:**

- Test all existing pages after changes
- Use feature flags for new features
- Deploy to staging first
- Have rollback plan

### Risk 3: User Confusion During Transition

**Mitigation:**

- Communicate changes clearly
- Provide training materials
- Offer live support during rollout
- Gather feedback continuously

### Risk 4: Scope Creep

**Mitigation:**

- Stick to priority 1 and 2 features first
- Document feature requests for later
- Get stakeholder approval for changes
- Review progress weekly

---

## Resource Requirements

### Development

- 1 senior developer (full-time, 6-8 weeks)
- 1 junior developer (part-time, 2-3 weeks for templates)
- 1 designer (part-time, 1 week for navigation)

### Testing

- 1 QA engineer (part-time, 2 weeks)
- 5-10 beta testers (program holders)

### Support

- Support team training (1 day)
- Documentation updates (ongoing)

---

## Next Steps

1. **Get Approval:** Review this plan with stakeholders
2. **Assign Resources:** Allocate developers and timeline
3. **Create Tickets:** Break down into Jira/GitHub issues
4. **Start Phase 1:** Implement placeholder pages this week
5. **Weekly Check-ins:** Review progress and adjust plan

---

## Conclusion

This plan provides a clear path to fix the program holder portal in 6-8 weeks. By prioritizing critical blockers first, we can unblock users quickly while building toward a full-featured portal.

**Key Principles:**

- Fix broken links immediately (Week 1)
- Enable core workflows next (Week 2-3)
- Improve experience after (Week 4-5)
- Add enhancements last (Week 6-8)

**Expected Outcome:**

- Zero broken links
- All core features functional
- Professional navigation
- Happy program holders
