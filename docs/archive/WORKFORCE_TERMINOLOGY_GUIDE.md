# Workforce Development Terminology Guide

## Overview

This guide documents the standardized terminology used across Elevate for Humanity LMS to align with workforce development program requirements (WRG, WIOA, JRI, EmployIndy, DOL).

---

## Standard Term Translations

### People

| Generic LMS Term  | Workforce Term        | Usage Context                        |
| ----------------- | --------------------- | ------------------------------------ |
| Student / Learner | **Participant**       | All references to people in training |
| Teacher           | **Trainer**           | Person delivering instruction        |
| Instructor        | **Instructor**        | Formal training role                 |
| Program Holder    | **Training Provider** | Organization delivering training     |
| Partner           | **Worksite Partner**  | Employer or training site            |
| Case Manager      | **Career Coach**      | Primary support contact              |
| Navigator / PO    | **Case Manager**      | Workforce program staff              |

### Training & Education

| Generic LMS Term | Workforce Term          | Usage Context             |
| ---------------- | ----------------------- | ------------------------- |
| Course           | **Training Track**      | Complete training program |
| Class            | **Training Session**    | Individual meeting/lesson |
| Class Time       | **Training Hours**      | Time spent in training    |
| Lesson           | **Module**              | Unit of instruction       |
| Coursework       | **Training Activities** | All learning tasks        |

### Status & Progress

| Generic LMS Term | Workforce Term  | Usage Context           |
| ---------------- | --------------- | ----------------------- |
| Enrolled         | **Active**      | Currently participating |
| Completed        | **Completed**   | Successfully finished   |
| Dropped          | **Withdrawn**   | No longer participating |
| Behind           | **At Risk**     | Falling behind schedule |
| Not Engaged      | **Not Engaged** | No recent activity      |
| On Track         | **On Track**    | Meeting expectations    |

### Documentation

| Generic LMS Term | Workforce Term        | Usage Context          |
| ---------------- | --------------------- | ---------------------- |
| Notes            | **Case Notes**        | Progress documentation |
| Progress Note    | **Service Contact**   | Documented interaction |
| Follow-Up        | **Follow-Up Date**    | Scheduled contact      |
| Report           | **Compliance Report** | Funder documentation   |

---

## Email Templates

### 1. Login Reminder (7+ Days Inactive)

**Subject:** Reminder: Log in to your Elevate training this week

**Body:**

```
Hi [First Name],

Our records show you haven't logged into your Elevate for Humanity training portal recently. To stay on track with your [Program Name] training plan, please log in and complete your next lesson as soon as you're able.

Your training is an important step toward your employment and wage goals, and regular participation is required to keep your funding and case file in good standing.

You can sign in here:
[Portal Link]

If something is preventing you from participating (work, transportation, childcare, health, or anything else), please reply to this email or contact your Career Coach/Case Manager so we can support you.

Thank you,
Elevate for Humanity Support Team
```

### 2. At Risk / Behind Nudge

**Subject:** We noticed a pause in your Elevate training

**Body:**

```
Hi [First Name],

We noticed a pause in your progress in the [Training Track Name] through Elevate for Humanity. To stay on track with your [WRG/WIOA/JRI/EmployIndy] participation requirements, we encourage you to log back in and complete at least one module this week.

Your training hours and progress are reviewed as part of your case file, and continued participation helps you stay eligible for services and employment opportunities.

Sign in here to continue:
[Portal Link]

If you need help with schedule, transportation, technology, or anything that's getting in the way, please reply to this email or contact your Career Coach so we can problem-solve together.

Sincerely,
Elevate for Humanity – Training & Support
```

### 3. Weekly Caseload Summary (to Training Providers)

**Subject:** Weekly Caseload Summary – [Program Holder Name]

**Body:**

```
Hello [Program Holder / Worksite Partner Name],

This is your weekly caseload summary from Elevate for Humanity for participants assigned to your organization. The information below is based on the most recent case notes, follow-up dates, and training activity recorded in the portal.

SUMMARY AT A GLANCE:

Total participants flagged At Risk (Behind): [X]
Total participants flagged Not Engaged (Dropped): [Y]

PARTICIPANTS NEEDING ATTENTION:

[For each participant:]

Participant: [email]
Program: [WRG / WIOA / JRI / EmployIndy / DOL]
Training Track: [Course Title]
Current Case Status: [At Risk / Not Engaged]
Last Case Note: [note text or "No case note on file"]
Follow-Up: [Overdue – date | Due this week – date | Future – date | Not scheduled]

---

You can review and update case notes, status, and follow-up dates here:
[Delegate Portal Link]

These records support compliance with state and federal workforce reporting and help document your ongoing engagement with each participant.

If you have questions about your caseload data or need help accessing reports, please reach out to the Elevate for Humanity admin team.

Thank you for partnering with us to support participants.

Sincerely,
Elevate for Humanity – Workforce Training & Case Management
```

### 4. Funding Approval Notification

**Subject:** Participant Approved for Training – [Program Code]

**Body:**

```
Hello [Case Manager / Program Holder Name],

This is to confirm that the participant below has been approved for funded training through [Program Code – WRG/WIOA/JRI/etc.] and has been enrolled in the Elevate for Humanity LMS.

Participant: [Name or email]
Training Track/Course: [Course Title]
Provider: Elevate for Humanity Career & Technical Institute
Status: Approved and Enrolled

The participant may now log in, complete modules, and accrue training hours toward program completion. Their progress, certificates, and case notes will be available in your partner portal and can be exported for documentation.

If you need additional documentation (syllabus, credentials, or employer-ready certificates) for this participant's file, please contact the Elevate admin team.

Thank you,
Elevate for Humanity – Funding & Enrollment
```

---

## Report Column Headers

### Admin Usage Report

| Old Header     | New Header                | Description                    |
| -------------- | ------------------------- | ------------------------------ |
| Learner        | **Participant**           | Participant name/email         |
| Course         | **Training Track**        | Training program name          |
| Program        | **Funding Program**       | WRG, WIOA, JRI, etc.           |
| Enroll Status  | **Training Status**       | Active, Completed, Withdrawn   |
| Case Status    | **Case Status**           | On Track, At Risk, Not Engaged |
| Last Note      | **Most Recent Case Note** | Latest case documentation      |
| Last Login     | **Last LMS Login**        | Most recent portal access      |
| Minutes        | **Training Minutes**      | Documented training time       |
| Percent        | **Course Progress %**     | Completion percentage          |
| Program Holder | **Training Provider**     | Organization name              |

### CSV Export Headers

**Usage Report:**

```
participant_email,training_track,start_date,training_minutes,course_progress_percent,training_status,last_lms_login,training_provider,case_status,most_recent_case_note
```

**Caseload Report:**

```
participant_email,training_track,funding_program,training_status,case_status,most_recent_case_note,last_note_at,training_provider
```

---

## Monthly Report Template for Funders

Use this template for monthly reports to WRG, WIOA, JRI, EmployIndy, DOL, and other funders:

```
During this reporting period, Elevate for Humanity served [X] participants across [Y] funded training programs (WRG, WIOA, JRI, EmployIndy, and other aligned initiatives).

[A] participants actively engaged in training and logged LMS activity during the month.

[B] participants successfully completed at least one training track and were issued verifiable digital certificates (with QR-coded verification and documented case notes).

[C] participants were flagged as At Risk (Behind) based on log-in and course progress thresholds, triggering outreach and follow-up from program holders and Elevate staff.

[D] participants required additional support (schedule, transportation, or technology barriers) and are being monitored through weekly caseload reports and case notes in the Elevate system.

All participation, case notes, and follow-up actions are recorded in the Elevate for Humanity LMS and can be exported for state and federal workforce reporting, including WRG, WIOA, JRI, and local workforce board documentation.
```

**Variables to fill:**

- `[X]` = Total participants served
- `[Y]` = Number of funding programs
- `[A]` = Active participants with LMS activity
- `[B]` = Completions with certificates
- `[C]` = At Risk participants
- `[D]` = Participants needing support

---

## UI Text Guidelines

### Page Titles

| Page             | Old Title              | New Title                      |
| ---------------- | ---------------------- | ------------------------------ |
| Admin Reports    | Admin Reports          | **Workforce Training Reports** |
| Delegate Portal  | Program Holder Reports | **Training Provider Portal**   |
| Learner Timeline | Learner Timeline       | **Participant Case History**   |
| Caseload Report  | Caseload Report        | **Caseload Management Report** |

### Page Descriptions

**Admin Reports:**

```
View participant activity, training progress, and case notes across all funding programs
```

**Delegate Portal:**

```
View your participants, track training activity, and document case notes for compliance reporting.
```

**Caseload Report:**

```
Filter participants by case status and funding program for targeted intervention and outreach
```

### Button Labels

| Old Label     | New Label                    |
| ------------- | ---------------------------- |
| Add Note      | **Add Case Note**            |
| Update Note   | **Update Case Note**         |
| View Learners | **View Participants**        |
| Export Report | **Export Compliance Report** |

### Status Badges

**Training Status:**

- Active (blue)
- Completed (green)
- Withdrawn (gray)
- Suspended (yellow)
- Expired (red)

**Case Status:**

- On Track (green)
- At Risk (yellow)
- Not Engaged (red)

---

## Implementation Checklist

### ✅ Completed Updates

- [x] Login reminder emails
- [x] Weekly caseload summary emails
- [x] Admin reports page headers
- [x] Delegate reports page headers
- [x] Caseload report page headers
- [x] Learner timeline page headers
- [x] CSV export headers
- [x] Status badge labels
- [x] API response formatting
- [x] Workforce terminology constants file

### 📋 Consistency Guidelines

1. **Always use "Participant"** instead of learner/student
2. **Always use "Training Track"** instead of course
3. **Always use "Training Provider"** instead of program holder
4. **Always use "At Risk"** instead of behind
5. **Always use "Not Engaged"** instead of dropped
6. **Always use "Case Notes"** instead of notes
7. **Always use "Training Hours"** instead of class time
8. **Always use "Funding Program"** when referring to WRG/WIOA/etc.

### 🎯 Context-Specific Usage

**In emails to participants:**

- Use supportive, encouraging tone
- Emphasize employment and wage goals
- Mention funding requirements
- Offer support resources

**In emails to training providers:**

- Use professional, compliance-focused tone
- Emphasize documentation requirements
- Include specific data points
- Reference state/federal reporting

**In admin interfaces:**

- Use clear, actionable labels
- Include tooltips for workforce terms
- Provide export options
- Show compliance-ready data

**In reports/exports:**

- Use standardized column headers
- Include all required data points
- Format dates consistently (YYYY-MM-DD)
- Escape special characters in CSV

---

## Compliance Alignment

### WRG (Workforce Ready Grant)

- Emphasize employment outcomes
- Track training hours meticulously
- Document all participant contacts
- Report completion rates

### WIOA (Workforce Innovation and Opportunity Act)

- Use "participant" terminology
- Document barriers to employment
- Track credential attainment
- Report measurable skill gains

### JRI (Justice Reinvestment Initiative)

- Emphasize reentry support
- Document case management contacts
- Track employment placement
- Report recidivism prevention

### EmployIndy

- Local workforce board alignment
- Employer engagement tracking
- Industry-recognized credentials
- Regional labor market data

### DOL Apprenticeship

- Registered apprenticeship standards
- On-the-job training hours
- Related technical instruction
- Competency-based progression

---

## Quick Reference

### Status Translations

```typescript
// Training Status
'active' → 'Active'
'completed' → 'Completed'
'dropped' → 'Withdrawn'
'expired' → 'Expired'
'suspended' → 'Suspended'

// Case Status
'on track' → 'On Track'
'behind' → 'At Risk'
'dropped' → 'Not Engaged'
```

### Common Phrases

| Say This                            | Not This                       |
| ----------------------------------- | ------------------------------ |
| "Participant enrolled in training"  | "Student signed up for course" |
| "Training hours documented"         | "Class time logged"            |
| "Case note added to file"           | "Note saved"                   |
| "At Risk status triggered outreach" | "Behind status sent email"     |
| "Training provider updated status"  | "Program holder changed note"  |
| "Funding program requirements"      | "Course prerequisites"         |

---

## Support & Questions

For questions about workforce terminology or compliance requirements:

1. Review this guide
2. Check `/lib/workforce-terminology.ts` for code constants
3. Consult with workforce development staff
4. Reference funder-specific guidelines
5. Contact Elevate admin team

---

## Version History

- **v1.0** - Initial workforce terminology implementation
- **v1.1** - Added email templates
- **v1.2** - Added monthly report template
- **v1.3** - Added compliance alignment section
