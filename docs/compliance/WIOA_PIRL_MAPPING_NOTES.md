# WIOA PIRL Mapping Notes (Completions Extract)
_Last updated: Nov 30, 2025_

This doc explains how our **Admin → Completions** exports map to common **WIOA/PIRL** data needs for credential/completion reporting. It's a **friendly summary** (not a legal template). Always verify against your funder's most recent PIRL specs and local board guidance.

---

## 1) Our Data Sources

- `partner_certificates`
  - `certificate_number`, `certificate_url`, `issued_date`, `verification_url`, `enrollment_id`
- `partner_lms_enrollments`
  - `student_id`, `program_id`, `provider_id`, `course_name`, `status`, `completed_at`, `external_enrollment_id`
- `profiles`
  - `id`, `full_name`, `email` (plus any additional demographics you maintain)
- `programs`
  - `id`, `name`, `funding_source` (values like `WIOA`, `WRG`, `Apprenticeship`, `Other`)
- `partner_lms_providers`
  - `id`, `provider_name` (e.g., HSI, Certiport, Milady, CareerSafe)

> Admin UI path: `/admin/completions`  
> API: `/api/admin/completions?days=7|30|90`  
> Exports: **Detailed CSV**, **WIOA-style CSV**

---

## 2) WIOA/PIRL Concept → Our Fields

> These are the most commonly requested completion/credential elements. Names here align with how boards ask for data; exact PIRL element numbers/labels vary by version—confirm with your board.

| PIRL Concept (friendly name)            | Our Source → Field                                    | Notes |
|----------------------------------------|--------------------------------------------------------|-------|
| Local Participant ID                   | `profiles.id` (or `profiles.email` fallback)          | We use `studentId` in WIOA-style CSV. |
| Participant Name                       | `profiles.full_name`                                  | Split if a feed requires first/last. |
| Participant Email                      | `profiles.email`                                       | Useful for validation or dedupe. |
| Program / Activity Name                | `programs.name`                                        | E.g., "Medical Assistant"; ties to funding. |
| Funding Source                         | `programs.funding_source`                              | Expected values: `WIOA`, `WRG`, `Apprenticeship`, `Other`. |
| Training Provider (Course Vendor)      | `partner_lms_providers.provider_name`                  | E.g., HSI, Certiport, Milady, CareerSafe. |
| Course / Credential Title              | `partner_lms_enrollments.course_name`                  | Human-readable title. |
| Completion / Credential Attained (Y/N) | Derived: presence of `partner_certificates.id`         | Y if certificate exists; otherwise N. |
| Credential Type                        | Constant: `Industry-recognized`                        | Adjust per partner if board requests enumerations. |
| Credential Number                      | `partner_certificates.certificate_number`              | Some partners do not issue a number—leave blank. |
| Credential Verification URL            | `partner_certificates.verification_url`                | If partner provides. |
| Credential/Completion Date             | `partner_certificates.issued_date` (or `completed_at`) | Prefer `issued_date`; fallback to `completed_at`. |
| Certificate Download URL               | `partner_certificates.certificate_url`                 | For audit packets. |

---

## 3) What the Two Exports Contain

### A) **Detailed CSV** (for internal ops & audit packets)
Columns:
- Issued Date (ISO), Student ID, Student Name, Student Email
- Course Name, Partner Name
- Program Name, Funding Source
- Certificate Number, Certificate URL, Verification URL

### B) **WIOA-style CSV** (board-friendly)
Columns:
- LocalParticipantId, ParticipantName, ParticipantEmail
- ProgramName, FundingSource
- CourseName, TrainingProvider
- CompletionDate
- CredentialAttained (Y/N), CredentialType, CredentialNumber

> This is a **summary** completion extract shaped for WIOA conversations. Full PIRL files usually require **additional demographics, eligibility, barriers, services, exits,** etc., which are intentionally **not** included here.

---

## 4) Suggested SQL View (optional)

Create a reporting view to keep exports consistent:

```sql
-- view: reporting_partner_completions
-- Joins completions with student/program/provider context

create or replace view reporting_partner_completions as
select
  pc.id as certificate_id,
  pc.certificate_number,
  pc.certificate_url,
  pc.verification_url,
  pc.issued_date,
  e.id as enrollment_id,
  e.course_name,
  e.completed_at,
  pr.id as student_id,
  pr.full_name as student_name,
  pr.email as student_email,
  p.name as program_name,
  coalesce(p.funding_source, 'Other') as funding_source,
  prov.provider_name
from partner_certificates pc
join partner_lms_enrollments e on e.id = pc.enrollment_id
left join profiles pr on pr.id = e.student_id
left join programs p on p.id = e.program_id
left join partner_lms_providers prov on prov.id = e.provider_id
order by pc.issued_date desc;
```

You can point the admin API to this view later if you want to simplify selects.

---

## 5) Common Local Board Requests & How To Answer

**"WIOA-only last 30 days?"**
- In the page: Funding filter = WIOA, Range = 30 days, then Download WIOA-style CSV.

**"Show me Apprenticeship completions by provider."**
- Funding filter = Apprenticeship, Partner = each provider, export each or use the detailed CSV then pivot.

**"We need certificate PDFs for 10 random students."**
- Use Detailed CSV to grab the Certificate URL links and attach those files.

**"We need verification links."**
- Use Verification URL column from Detailed CSV (if partner supports verification).

---

## 6) Partner-Specific Notes

### HSI (CPR/First Aid/OSHA etc.)
- Usually provides `certificate_number`, `issued_date`, `download_url`, and often a `verification_url`.
- Best treated as Industry-recognized.

### Certiport (Microsoft, IC3, etc.)
- Exam-based; credential verification often via Certiport portal.
- Certificates do not expire; `verification_url` may point to a generic validator.

### Milady / CareerSafe / Other
- Availability of `verification_url` varies; when unavailable, provide Certificate URL and partner contact as proof.

---

## 7) Field Quality & Fallbacks

**Completion Date** → Prefer `partner_certificates.issued_date`. If missing, fallback to `partner_lms_enrollments.completed_at`.

**Local Participant ID** → Prefer `profiles.id`. If your board wants a human-readable key, use `profiles.email`.

**Credential Number** → If none, leave blank—do not fabricate.

---

## 8) Governance & Versioning

Keep this doc with your repo under `docs/compliance/`.

Update when:
- A partner changes their certificate fields,
- You add demographics to exports,
- A board publishes new formatting guidance.

---

## 9) Next Steps (Optional Enhancements)

- Add board presets in UI (e.g., "Export → WIOA", "Export → WRG").
- Add ZIP export: CSV + all certificate PDFs for the selected period.
- Add program code / CIP / SOC columns in Detailed CSV for deeper alignment.
- Add PIRL demographic joins when you store eligibility & barriers.

---

## 10) Quick Compliance Statement (use in emails)

> "Attached is a WIOA-style completions extract including participant identifiers, program/funding, course/provider, completion date, and credential details, with certificate and verification links where available. Full PIRL demographic elements are maintained in our case management system and can be provided upon request."

---

## 11) Implementation Checklist

### Database Setup
- [ ] Run Supabase migration: `supabase/migrations/20241130_create_partner_lms_tables.sql`
- [ ] Verify all 5 partner tables created
- [ ] Confirm seed data for 7 partners loaded
- [ ] Test RLS policies with test user

### Partner Integration
- [ ] Implement first partner API (recommend HSI)
- [ ] Test enrollment flow end-to-end
- [ ] Verify certificate retrieval
- [ ] Test SSO launch URLs

### Reporting Setup
- [ ] Test admin completions page with sample data
- [ ] Verify both CSV exports work
- [ ] Confirm filtering by funding source
- [ ] Test partner filter dropdown

### Compliance Verification
- [ ] Review exports with workforce board contact
- [ ] Confirm PIRL field mapping matches local requirements
- [ ] Document any custom fields needed
- [ ] Set up regular export schedule

---

## 12) Support & Resources

**Internal Documentation:**
- Partner automation system: `/PARTNER_AUTOMATION_SYSTEM.md`
- Feature status report: `/ENTERPRISE_LMS_FEATURE_STATUS.md`

**Admin Access:**
- Analytics: `/admin/analytics`
- Completions: `/admin/completions`
- Programs: `/admin/programs`

**API Endpoints:**
- Completions: `/api/admin/completions?days=30`
- Programs: `/api/programs`
- Student enrollments: `/api/student/partner-enrollments`

**For Questions:**
- Technical: Review partner API documentation
- Compliance: Contact your local workforce board
- PIRL specs: [USDOL PIRL Documentation](https://www.doleta.gov/performance/pfdocs/)
