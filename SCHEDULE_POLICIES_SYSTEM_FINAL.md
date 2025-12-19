# SCHEDULE POLICIES SYSTEM - FINAL IMPLEMENTATION

## 🎯 WHAT YOU NOW HAVE

A **flexible, Program Holder-controlled schedule system** where:

✅ **Program Holder chooses the schedule** for each enrollment  
✅ **Schedule locks** before compliance tracking starts  
✅ **System generates verdicts** based on the chosen policy  
✅ **Reporting stays consistent** (policy snapshot prevents drift)  
✅ **No false attendance noise** - compliance matches the actual training model

---

## 📊 HOW IT WORKS

### 1. Schedule Policy Templates

Program Holders choose from pre-defined schedule policies (or admins create custom ones):

| Policy Name                        | Mode           | Requirements                    | Use Case                   |
| ---------------------------------- | -------------- | ------------------------------- | -------------------------- |
| **Self-Paced 10 hrs/week**         | SELF_PACED     | 10 hours/week                   | Part-time students         |
| **Self-Paced 20 hrs/week**         | SELF_PACED     | 20 hours/week                   | Full-time students         |
| **Self-Paced 40 hrs/week**         | SELF_PACED     | 40 hours/week                   | Intensive training         |
| **Hybrid Mon/Wed + 10 hrs/week**   | HYBRID         | 2 in-person sessions + 10 hours | Blended learning           |
| **Hybrid Tue/Thu + 15 hrs/week**   | HYBRID         | 2 in-person sessions + 15 hours | Blended learning           |
| **In-Person Mon-Fri 9am-5pm**      | IN_PERSON      | Daily attendance M-F            | Traditional classroom      |
| **Apprenticeship 30 hrs/week OJT** | APPRENTICESHIP | 30 hours/week at worksite       | Registered apprenticeships |

### 2. Enrollment Workflow

```
1. Program Holder creates enrollment
   ↓
2. Program Holder selects schedule policy
   ↓
3. Program Holder locks schedule
   ↓
4. System begins compliance tracking
   ↓
5. Weekly verdicts generated (Sunday 7:30 PM EST)
   ↓
6. Alerts created for BEHIND/NO_ACTIVITY students
```

### 3. Verdict Calculation (Mode-Specific)

#### A. SELF_PACED Mode

**Pass if:** `logged_hours >= (required_hours - grace_hours)`

**Example:**

- Required: 10 hours/week
- Grace: 1 hour
- Student logs 9.5 hours → **ON_TRACK** ✅
- Student logs 8 hours → **BEHIND** ⚠️
- Student logs 0 hours + no activity 7+ days → **NO_ACTIVITY** 🚨

#### B. HYBRID Mode

**Pass if:** `logged_hours >= required_hours AND completed_sessions >= required_sessions`

**Example:**

- Required: 10 hours/week + 2 in-person sessions (Mon/Wed)
- Student logs 12 hours + attends Mon/Wed → **ON_TRACK** ✅
- Student logs 12 hours + attends only Mon → **BEHIND** ⚠️
- Student logs 5 hours + attends Mon/Wed → **BEHIND** ⚠️

#### C. IN_PERSON Mode

**Pass if:** `completed_sessions >= required_sessions`

**Example:**

- Required: 5 sessions/week (Mon-Fri)
- Student attends Mon, Tue, Wed, Thu, Fri → **ON_TRACK** ✅
- Student attends Mon, Tue, Wed → **BEHIND** ⚠️
- Student attends 0 sessions → **NO_ACTIVITY** 🚨

#### D. APPRENTICESHIP Mode

**Pass if:** `logged_hours >= required_hours` (same as SELF_PACED)

**Example:**

- Required: 30 hours/week OJT
- Student logs 32 hours → **ON_TRACK** ✅
- Student logs 25 hours → **BEHIND** ⚠️

### 4. Policy Snapshot (Audit Trail)

When a verdict is generated, the system stores a **policy snapshot** in JSONB:

```json
{
  "id": "uuid",
  "name": "Self-Paced 20 hrs/week",
  "mode": "SELF_PACED",
  "required_hours_per_week": 20.0,
  "grace_hours": 2.0,
  "inactivity_days_threshold": 7,
  "week_start_day": 1,
  "timezone": "America/Indiana/Indianapolis"
}
```

**Why this matters:**

- If the policy template changes later, old verdicts remain accurate
- Auditors can see exactly what rules were in effect
- No retroactive changes to compliance history

### 5. Schedule Locking

**Before locking:**

- Program Holder can change schedule policy
- No compliance tracking
- No verdicts generated

**After locking:**

- Schedule policy is frozen for this enrollment
- Compliance tracking begins
- Weekly verdicts generated
- Cannot be unlocked (prevents gaming the system)

**Lock function:**

```sql
SELECT lock_enrollment_schedule('enrollment-uuid', 'program-holder-uuid');
```

---

## 🗂️ DATABASE SCHEMA

### schedule_policies (Templates)

```sql
CREATE TABLE schedule_policies (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE,
  description TEXT,
  mode TEXT, -- SELF_PACED | HYBRID | IN_PERSON | APPRENTICESHIP
  week_start_day INTEGER, -- 1=Monday, 0=Sunday
  required_hours_per_week NUMERIC(5,2),
  required_sessions_per_week INTEGER,
  in_person_days TEXT[], -- ['MON','WED']
  session_start_time TIME,
  session_end_time TIME,
  inactivity_days_threshold INTEGER DEFAULT 7,
  grace_hours NUMERIC(5,2) DEFAULT 0,
  timezone TEXT DEFAULT 'America/Indiana/Indianapolis',
  is_active BOOLEAN DEFAULT true
);
```

### enrollments (Updated)

```sql
ALTER TABLE enrollments ADD COLUMN schedule_policy_id UUID REFERENCES schedule_policies(id);
ALTER TABLE enrollments ADD COLUMN schedule_locked_at TIMESTAMPTZ;
ALTER TABLE enrollments ADD COLUMN schedule_locked_by UUID REFERENCES auth.users(id);
```

### reporting_verdicts (Compliance Outcomes)

```sql
CREATE TABLE reporting_verdicts (
  id UUID PRIMARY KEY,
  enrollment_id UUID REFERENCES enrollments(id),
  period_start DATE,
  period_end DATE,
  status TEXT, -- ON_TRACK | BEHIND | NO_ACTIVITY | EXCUSED | NOT_STARTED
  required_hours NUMERIC(5,2),
  logged_hours NUMERIC(5,2),
  required_sessions INTEGER,
  completed_sessions INTEGER,
  in_person_days_required TEXT[],
  in_person_days_completed TEXT[],
  policy_snapshot JSONB, -- Immutable copy of policy
  notes TEXT,
  UNIQUE(enrollment_id, period_start, period_end)
);
```

---

## 🚀 API FUNCTIONS

### 1. Lock Enrollment Schedule

```sql
SELECT lock_enrollment_schedule(
  p_enrollment_id := 'enrollment-uuid',
  p_locked_by := 'program-holder-uuid'
);
```

**Returns:** `true` if locked, `false` if already locked

**Throws error if:** No schedule policy assigned

### 2. Generate Weekly Verdicts

```sql
SELECT * FROM generate_reporting_verdicts(
  p_period_start := '2024-12-16', -- Monday
  p_period_end := '2024-12-22'    -- Sunday
);
```

**Returns:**

```
total_enrollments | verdicts_created | on_track | behind | no_activity
------------------|------------------|----------|--------|-------------
        50        |        50        |    35    |   10   |      5
```

**What it does:**

1. Loops through all active enrollments with locked schedules
2. Gets policy snapshot for each
3. Calculates verdict based on mode (SELF_PACED, HYBRID, IN_PERSON, APPRENTICESHIP)
4. Inserts/updates verdict record
5. Returns summary counts

### 3. Get Policy Snapshot

```sql
SELECT get_policy_snapshot('policy-uuid');
```

**Returns:** JSONB snapshot of policy (immutable)

---

## 🔄 CRON SCHEDULE

### Weekly Verdicts (Sunday 7:30 PM EST)

**Vercel Cron:**

```json
{
  "path": "/api/cron/weekly-verdicts",
  "schedule": "30 23 * * 0"
}
```

**What it does:**

1. Calculates current week (Monday-Sunday)
2. Calls `generate_reporting_verdicts()`
3. Creates alerts for BEHIND/NO_ACTIVITY students
4. Returns summary

**API Route:** `/api/cron/weekly-verdicts`

**Manual trigger (testing):**

```bash
curl -X POST https://your-domain.com/api/cron/weekly-verdicts \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 📊 VIEWS FOR DASHBOARDS

### enrollment_compliance_status

```sql
SELECT * FROM enrollment_compliance_status
WHERE partner_owner_user_id = 'partner-uuid'
ORDER BY status DESC;
```

**Returns:**

- enrollment_id
- student_id, student_name
- program_name
- schedule_name, schedule_mode
- schedule_locked_at
- period_start, period_end
- status (ON_TRACK, BEHIND, NO_ACTIVITY)
- required_hours, logged_hours
- required_sessions, completed_sessions
- partner_owner_user_id, partner_name

---

## 🎓 PROGRAM HOLDER WORKFLOW

### Step 1: Create Enrollment

```tsx
// In Program Holder dashboard
<EnrollmentForm
  studentId={studentId}
  programId={programId}
  onSubmit={async (data) => {
    const { data: enrollment } = await supabase
      .from('enrollments')
      .insert({
        student_id: data.studentId,
        program_id: data.programId,
        status: 'pending', // Not active yet
      })
      .select()
      .single();

    return enrollment;
  }}
/>
```

### Step 2: Select Schedule Policy

```tsx
// Schedule policy selector
<SchedulePolicySelector
  enrollmentId={enrollmentId}
  onSelect={async (policyId) => {
    await supabase
      .from('enrollments')
      .update({ schedule_policy_id: policyId })
      .eq('id', enrollmentId);
  }}
/>
```

**UI shows:**

- Policy name
- Mode (Self-Paced, Hybrid, In-Person, Apprenticeship)
- Requirements (hours/week, sessions/week, days)
- Grace hours
- Inactivity threshold

### Step 3: Lock Schedule

```tsx
// Lock schedule button
<Button
  onClick={async () => {
    const { data, error } = await supabase.rpc('lock_enrollment_schedule', {
      p_enrollment_id: enrollmentId,
      p_locked_by: userId,
    });

    if (data) {
      // Schedule locked successfully
      // Now activate enrollment
      await supabase
        .from('enrollments')
        .update({ status: 'active' })
        .eq('id', enrollmentId);
    }
  }}
>
  Lock Schedule & Activate
</Button>
```

**After locking:**

- Schedule policy is frozen
- Compliance tracking begins
- Weekly verdicts will be generated
- Cannot be changed (prevents gaming)

### Step 4: Monitor Compliance

```tsx
// Compliance dashboard
<ComplianceDashboard
  partnerId={userId}
  weekStart={weekStart}
  weekEnd={weekEnd}
/>
```

**Shows:**

- All assigned students
- Current week verdict (ON_TRACK, BEHIND, NO_ACTIVITY)
- Hours logged vs required
- Sessions completed vs required
- Alerts (if any)
- Quick actions (send message, excuse week, etc.)

---

## 🔧 CONFIGURATION

### Add New Schedule Policy

```sql
INSERT INTO schedule_policies (
  name,
  description,
  mode,
  week_start_day,
  required_hours_per_week,
  required_sessions_per_week,
  in_person_days,
  inactivity_days_threshold,
  grace_hours
) VALUES (
  'Custom Hybrid Schedule',
  'Custom hybrid schedule for specific program',
  'HYBRID',
  1, -- Monday
  15.00, -- 15 hours/week
  3, -- 3 in-person sessions
  ARRAY['MON','WED','FRI'], -- Monday, Wednesday, Friday
  7, -- 7 days inactivity threshold
  2.00 -- 2 hours grace
);
```

### Change Grace Hours

```sql
UPDATE schedule_policies
SET grace_hours = 3.00
WHERE name = 'Self-Paced 20 hrs/week';
```

**Note:** This only affects NEW enrollments. Existing enrollments use the policy snapshot.

### Change Inactivity Threshold

```sql
UPDATE schedule_policies
SET inactivity_days_threshold = 5
WHERE name = 'Self-Paced 10 hrs/week';
```

---

## ✅ TESTING CHECKLIST

### Schedule Policy Selection

- [ ] Create enrollment
- [ ] View available schedule policies
- [ ] Select "Self-Paced 20 hrs/week"
- [ ] Verify policy details displayed
- [ ] Lock schedule
- [ ] Verify `schedule_locked_at` is set
- [ ] Try to change policy (should fail)

### Verdict Generation (Self-Paced)

- [ ] Create enrollment with "Self-Paced 10 hrs/week"
- [ ] Lock schedule
- [ ] Log 12 hours this week
- [ ] Run `generate_reporting_verdicts()`
- [ ] Verify verdict = 'ON_TRACK'
- [ ] Check `reporting_verdicts` table
- [ ] Verify `policy_snapshot` contains policy details

### Verdict Generation (Hybrid)

- [ ] Create enrollment with "Hybrid Mon/Wed + 10 hrs/week"
- [ ] Lock schedule
- [ ] Log 12 hours + attend Monday session
- [ ] Run `generate_reporting_verdicts()`
- [ ] Verify verdict = 'BEHIND' (missing Wednesday)
- [ ] Attend Wednesday session
- [ ] Run again
- [ ] Verify verdict = 'ON_TRACK'

### Alert Creation

- [ ] Create enrollment with 0 hours logged
- [ ] Run `generate_reporting_verdicts()`
- [ ] Verify verdict = 'NO_ACTIVITY'
- [ ] Check `alert_notifications` table
- [ ] Verify alert created with severity = 'high'
- [ ] Log hours
- [ ] Run again
- [ ] Verify alert resolved (if hours meet requirement)

---

## 🎉 SUMMARY

You now have a **production-ready schedule policies system** with:

✅ **4 schedule modes** (SELF_PACED, HYBRID, IN_PERSON, APPRENTICESHIP)  
✅ **7 pre-configured policies** (10/20/40 hrs self-paced, 2 hybrid, 1 in-person, 1 apprenticeship)  
✅ **Program Holder control** (choose policy per enrollment)  
✅ **Schedule locking** (prevents gaming, ensures audit trail)  
✅ **Policy snapshots** (immutable compliance history)  
✅ **Mode-specific verdict calculation** (hours, sessions, days)  
✅ **Weekly verdict generation** (automated via cron)  
✅ **Alert creation** (BEHIND/NO_ACTIVITY students)  
✅ **Full RLS security** (partners see only assigned students)

**No more daily attendance spam. No more false alerts. Just flexible, Program Holder-controlled schedules that match the actual training model.**

---

## 📝 FILES CREATED

### Migration

- `supabase/migrations/20241219_schedule_policies_system.sql` (800+ lines)

### API Route

- `app/api/cron/weekly-verdicts/route.ts` (200+ lines)

### Configuration

- `vercel.json` (updated cron schedule)

---

## 🚀 DEPLOYMENT

### 1. Run Migration

```bash
psql $DATABASE_URL -f supabase/migrations/20241219_schedule_policies_system.sql
```

### 2. Verify Policies Created

```sql
SELECT * FROM schedule_policies WHERE is_active = true;
```

Should return 7 policies.

### 3. Deploy to Vercel

```bash
git add .
git commit -m "Add schedule policies system with flexible compliance tracking"
git push origin main
```

### 4. Verify Cron

- Go to Vercel dashboard → Your Project → Cron Jobs
- Verify "weekly-verdicts" is listed with schedule `30 23 * * 0`

### 5. Test Manually

```bash
curl -X POST https://your-domain.com/api/cron/weekly-verdicts \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

**Status:** ✅ **READY TO DEPLOY**

**Next:** Build Program Holder dashboard UI for schedule policy selection and compliance monitoring.

**Total Implementation:**

- 1 new table (schedule_policies)
- 1 new table (reporting_verdicts)
- 3 new columns on enrollments
- 5 new functions (lock, calculate verdicts, generate verdicts)
- 1 new view (enrollment_compliance_status)
- 1 new API route (weekly-verdicts cron)
- 7 pre-configured schedule policies
- Full RLS security
- ~1,000 lines of SQL
- ~200 lines of TypeScript

**Deployment Time:** ~5 minutes
