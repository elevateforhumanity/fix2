# Student LMS Dashboard - Action-First Design

## The Problem

Current student dashboards show:
- Generic welcome messages
- Course lists
- Stats that don't drive action
- No clear "what to do next"
- Support buried in menus

**Result:** Students don't know what to do or who to contact.

---

## The Solution: Action-First Dashboard

### Mental Model
> "Show me what I need to do, not what the system can do."

### Design Principles
1. **Action over information** - Every element drives completion
2. **Status before details** - Am I on track? (yes/no)
3. **Support always visible** - Contact info never hidden
4. **Progress is real** - No decorative progress bars
5. **One job per section** - No multi-purpose widgets

---

## Dashboard Layout

### TOP SECTION: Program Status
**Purpose:** Answer "Am I on track?"

```
┌─────────────────────────────────────────────────────┐
│ Barber Apprenticeship Program                      │
│ ✓ On Track                              Progress: 65%│
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────┘
```

**Elements:**
- Program name (what am I enrolled in?)
- Status badge (on track / needs action / at risk)
- Progress percentage (real, not estimated)
- Progress bar (visual reinforcement)

**Status Logic:**
- **On Track (Green):** All requirements current, no overdue items
- **Needs Action (Yellow):** 1-2 overdue items, still recoverable
- **At Risk (Red):** 3+ overdue items or critical requirement missing

---

### MIDDLE SECTION: Action List
**Purpose:** Answer "What do I need to do?"

```
┌─────────────────────────────────────────────────────┐
│ What You Need to Do                                 │
├─────────────────────────────────────────────────────┤
│ ⚠️ Complete Lesson 3: Safety & Sanitation          │
│    Due: December 22, 2025                           │
│    → Start Lesson                                   │
├─────────────────────────────────────────────────────┤
│ ⚠️ Upload Proof of Hours (Week 4)                  │
│    Due: December 20, 2025                           │
│    → Upload Document                                │
├─────────────────────────────────────────────────────┤
│ 🔵 Schedule Your Next Check-In                      │
│    Meet with your advisor to review progress        │
│    → Schedule Appointment                           │
├─────────────────────────────────────────────────────┤
│ ✓ Completed Lesson 2: Tools & Equipment            │
│   Completed on December 15, 2025                    │
└─────────────────────────────────────────────────────┘
```

**Action Item Structure:**
- Icon (⚠️ urgent, 🔵 recommended, ✓ completed)
- Title (what needs to be done)
- Context (due date, reason, details)
- Direct link (one click to complete)

**Action Priority:**
1. **Overdue items** (red, top of list)
2. **Due this week** (yellow, high priority)
3. **Recommended actions** (blue, proactive)
4. **Recently completed** (gray, for context)

**Action Types:**
- Complete lesson/module
- Upload document/evidence
- Log hours
- Schedule appointment
- Submit assessment
- Verify information
- Contact advisor

---

### BOTTOM SECTION: Support Team
**Purpose:** Answer "Who do I contact?"

```
┌─────────────────────────────────────────────────────┐
│ Your Support Team                                   │
├──────────────────────┬──────────────────────────────┤
│ Your Advisor         │ Case Manager                 │
│ Sarah Johnson        │ Michael Chen                 │
│ Career Advisor       │ Support Services             │
│ 📞 (317) 555-0123    │ 📞 (317) 555-0124            │
└──────────────────────┴──────────────────────────────┘
│                                                      │
│        🆘 Need Help? Contact Us                     │
└─────────────────────────────────────────────────────┘
```

**Support Info:**
- Assigned advisor (name, role, phone)
- Case manager (if applicable)
- Emergency contact button
- Always visible (no scrolling required)

---

### FOOTER: Quick Links
**Purpose:** Fast access to common tasks

```
┌──────────┬──────────┬──────────┬──────────┐
│ 📚       │ ⏱️       │ 📄       │ ⚙️       │
│ Lessons  │ Log Hours│ Documents│ Settings │
└──────────┴──────────┴──────────┴──────────┘
```

---

## Copy Guidelines

### Voice & Tone
- **Direct:** "Complete Lesson 3" not "You may want to consider completing..."
- **Clear:** "Due December 22" not "Deadline approaching soon"
- **Supportive:** "Need Help? Contact Us" not "Submit a support ticket"
- **Action-oriented:** "Start Lesson →" not "View lesson details"

### What to Say
✅ "What You Need to Do"
✅ "Your Support Team"
✅ "On Track"
✅ "Schedule Appointment"
✅ "Upload Document"

### What NOT to Say
❌ "Welcome to your comprehensive learning dashboard"
❌ "Explore your personalized learning journey"
❌ "Leverage our powerful platform features"
❌ "Optimize your educational experience"
❌ "Comprehensive suite of tools"

---

## Data Requirements

### Student Enrollment Data
```typescript
interface StudentEnrollment {
  program_id: string;
  program_name: string;
  status: 'active' | 'completed' | 'withdrawn';
  start_date: string;
  expected_completion_date: string;
  progress_percentage: number;
}
```

### Action Items Data
```typescript
interface ActionItem {
  id: string;
  type: 'lesson' | 'document' | 'hours' | 'appointment' | 'assessment';
  title: string;
  description: string;
  due_date: string | null;
  priority: 'urgent' | 'high' | 'normal';
  status: 'pending' | 'completed';
  link: string;
  completed_at: string | null;
}
```

### Support Team Data
```typescript
interface SupportContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  type: 'advisor' | 'case_manager' | 'instructor';
}
```

---

## Status Calculation Logic

### Progress Percentage
```typescript
function calculateProgress(enrollment: Enrollment): number {
  const requirements = getRequirements(enrollment.program_id);
  const completed = requirements.filter(r => r.status === 'completed').length;
  return Math.round((completed / requirements.length) * 100);
}
```

### Status Badge
```typescript
function calculateStatus(actionItems: ActionItem[]): Status {
  const overdue = actionItems.filter(item => 
    item.status === 'pending' && 
    new Date(item.due_date) < new Date()
  );
  
  if (overdue.length >= 3) return 'at_risk';
  if (overdue.length >= 1) return 'needs_action';
  return 'on_track';
}
```

### Action Item Priority
```typescript
function prioritizeActions(items: ActionItem[]): ActionItem[] {
  return items.sort((a, b) => {
    // Overdue first
    const aOverdue = new Date(a.due_date) < new Date();
    const bOverdue = new Date(b.due_date) < new Date();
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    // Then by due date
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}
```

---

## Mobile Considerations

### Responsive Layout
- Stack sections vertically on mobile
- Support team cards stack (not side-by-side)
- Quick links remain 4-column grid (smaller icons)
- Action items show full details (no truncation)

### Touch Targets
- Buttons minimum 44x44px
- Action links full-width on mobile
- Phone numbers tap-to-call
- No hover states (use active states)

---

## Accessibility

### Screen Readers
- Status badge announced first
- Action items in semantic list
- Due dates clearly associated with items
- Support contacts in structured format

### Keyboard Navigation
- Tab order: Status → Actions → Support → Quick Links
- Enter key activates action links
- Escape key closes modals
- Focus visible on all interactive elements

### Color Contrast
- Status badges meet WCAG AA (4.5:1)
- Action icons have text labels
- Progress bar has percentage text
- Links underlined (not just colored)

---

## Implementation Checklist

### Phase 1: Static Layout
- [ ] Create dashboard page component
- [ ] Build status section component
- [ ] Build action list component
- [ ] Build support team component
- [ ] Build quick links component
- [ ] Add responsive styles
- [ ] Test accessibility

### Phase 2: Data Integration
- [ ] Fetch enrollment data
- [ ] Fetch action items
- [ ] Fetch support contacts
- [ ] Calculate progress percentage
- [ ] Calculate status badge
- [ ] Sort and prioritize actions
- [ ] Handle loading states
- [ ] Handle error states

### Phase 3: Interactivity
- [ ] Wire action item links
- [ ] Add phone number tap-to-call
- [ ] Add email mailto links
- [ ] Add "Need Help" contact form
- [ ] Add action item completion tracking
- [ ] Add real-time updates (optional)

### Phase 4: Testing
- [ ] Test with real student data
- [ ] Test on mobile devices
- [ ] Test with screen readers
- [ ] Test keyboard navigation
- [ ] Test with slow connections
- [ ] Test error scenarios
- [ ] User acceptance testing

---

## Success Metrics

### Quantitative
- Time to identify next action < 10 seconds
- Support contact visible without scrolling: 100%
- Action completion rate increase: 30%+
- Support contact rate increase: 20%+ (good thing)

### Qualitative
- Students can explain "what to do next"
- Students know who their advisor is
- Students feel "on track" or know they need help
- Students use dashboard daily (not just login)

---

## Example Copy (Real)

### On Track Student
```
Barber Apprenticeship Program
✓ On Track                              Progress: 65%

What You Need to Do
─────────────────────
🔵 Complete Lesson 4: Client Consultation
   Due: December 28, 2025
   → Start Lesson

🔵 Log Your Hours for This Week
   Submit your timesheet by Friday
   → Log Hours

✓ Completed Lesson 3: Safety & Sanitation
  Completed on December 18, 2025
```

### Needs Action Student
```
Barber Apprenticeship Program
⚠️ Needs Action                         Progress: 45%

What You Need to Do
─────────────────────
⚠️ Upload Proof of Hours (Week 3)
   Due: December 15, 2025 (OVERDUE)
   → Upload Document

⚠️ Complete Lesson 3: Safety & Sanitation
   Due: December 20, 2025
   → Start Lesson

🔵 Schedule Your Next Check-In
   Meet with Sarah to review progress
   → Schedule Appointment
```

### At Risk Student
```
Barber Apprenticeship Program
❌ At Risk - Action Required              Progress: 30%

What You Need to Do
─────────────────────
❌ Contact Your Advisor Immediately
   You have 3 overdue requirements
   → Call Sarah: (317) 555-0123

⚠️ Upload Proof of Hours (Week 2, 3, 4)
   Multiple weeks overdue
   → Upload Documents

⚠️ Complete Lesson 2: Tools & Equipment
   Due: December 10, 2025 (OVERDUE)
   → Start Lesson

🆘 Need Help? We're Here for You
   → Contact Support Team
```

---

## File Location

**Current:** `/app/student/dashboard-new/page.tsx` (created)
**Target:** `/app/student/dashboard/page.tsx` (replace redirect)
**Backup:** `/app/student/dashboard/page-old.tsx` (keep for reference)

---

## Next Steps

1. **Wire to real data** - Connect to enrollments, requirements, support contacts
2. **Add completion tracking** - Mark action items as done
3. **Build requirements system** - Define what "requirements" are
4. **Add notifications** - Email/SMS when action items are due
5. **Create mobile app view** - Native mobile experience

---

Last Updated: 2025-12-18
Status: Design Complete, Implementation Partial
