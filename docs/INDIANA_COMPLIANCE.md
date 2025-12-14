# Indiana Compliance Configuration

## System Status: INDIANA-LOCKED ✅

Elevate for Humanity operates as a **DOL Registered Apprenticeship Sponsor** in Indiana, delivering WIOA-funded barber apprenticeships through hybrid delivery (Milady RISE + on-the-job training).

---

## 1. State Lock

**Configuration:**
- State: Indiana (IN)
- No cross-state logic
- No Ohio/Texas leakage
- Clean audit trail

**Database:**
```sql
-- State compliance record
state_code: 'IN'
required_hours: 2000
classroom_hours: 300
on_the_job_hours: 1700
exam_required: true
notes: 'Indiana PLA – Barber Apprenticeship'
```

**Program binding:**
```sql
UPDATE programs
SET state_code = 'IN'
WHERE slug = 'barber-apprenticeship';
```

---

## 2. Student Enrollment

**Students:**
- Pay $0
- Auto-enrolled
- WIOA-funded
- RAPIDS apprentices

**Enrollment fields:**
```typescript
{
  student_id: string,
  program_id: string,
  status: 'active',
  funding_source: 'WIOA',
  tuition_amount: 0,
  paid_amount: 0,
  state_code: 'IN',
  apprenticeship: true,
  rapids_registered: true,
  enrolled_at: timestamp
}
```

**Satisfies:**
- Indiana DWD
- WorkOne
- RAPIDS
- ETPL audits

---

## 3. Milady RISE Integration

**Role:** Classroom instruction (300 hours)

**Required courses:**
- All Milady RISE barber courses
- Indiana PLA-accepted
- Auto-enrolled on program enrollment
- No student checkout
- Sponsor-paid

**Configuration:**
```sql
UPDATE partner_lms_courses
SET is_required = true,
    required_for_programs = array['barber-apprenticeship']
WHERE provider_type = 'milady';
```

---

## 4. AI Instructor

**Persona:** Indiana-specific

```
You are a licensed Indiana barber instructor.
You follow Indiana PLA rules, DOL RAPIDS standards,
and Milady RISE curriculum requirements.
You guide apprentices toward Indiana licensure.
```

**Features:**
- Text-based only
- No video cloning
- No likeness risk
- Fully compliant

---

## 5. Stripe Role

**Used for:**
- State reimbursements
- Employer reimbursements
- Licensing revenue (future)

**NOT used for:**
- Student checkout
- Tuition collection
- Course purchase

**Metadata:**
```javascript
{
  state: "IN",
  sponsor: "Elevate For Humanity",
  funding: "WIOA",
  student_pays: "false"
}
```

---

## 6. Apply Page

**URL:** `/apply?program=barber-apprenticeship`

**Configuration:**
```typescript
state_code: 'IN' // Hard-locked
```

**Hidden field:**
```html
<input type="hidden" name="state_code" value="IN" />
```

No out-of-state intake.

---

## 7. Student Dashboard

**Indiana students see:**
- "Indiana Apprenticeship" badge
- Barber Apprenticeship program
- Milady RISE coursework
- Hours tracker (0 / 2,000)
- AI Instructor
- Student Handbook
- Employer assignment (when placed)

**Badge implementation:**
```tsx
{activeEnrollment?.state_code === 'IN' && (
  <span className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
    Indiana Apprenticeship
  </span>
)}
```

---

## 8. Compliance Checklist

### WorkOne Ready ✅
- WIOA funding source recorded
- State code locked to IN
- No student payment required
- Referral workflow ready

### RAPIDS Ready ✅
- Apprenticeship flag: true
- RAPIDS registered: true
- DOL standards met
- Export capability

### Indiana DWD Ready ✅
- 2,000 hour requirement
- 300 classroom hours (Milady RISE)
- 1,700 OJT hours (tracked)
- PLA compliance
- Exam requirement tracked

### Audit Ready ✅
- All fields populated
- Funding source clear
- State jurisdiction explicit
- No ambiguity

---

## 9. Testing

**Run test:**
```bash
./scripts/test-indiana-enrollment.sh
```

**Verify:**
1. Enrollment has Indiana fields
2. AI instructor is Indiana-specific
3. Dashboard shows Indiana badge
4. State compliance is 2,000 hours
5. Funding source is WIOA
6. No payment required

---

## 10. Ready For

✅ WorkOne referrals
✅ Indiana DWD audits
✅ RAPIDS inspections
✅ Partner schools
✅ Immediate student start

---

## Migration Files

1. `supabase/migrations/20231214_indiana_enrollment_fields.sql`
   - Adds state_code, apprenticeship, rapids_registered columns

2. `scripts/seed-test-data.sql`
   - Seeds Indiana compliance record
   - Seeds Indiana-specific AI instructor
   - Seeds barber program with state lock

3. `app/api/apply/route.ts`
   - Includes Indiana fields in enrollment

4. `app/student/dashboard/page.tsx`
   - Displays Indiana badge

5. `app/apply/page.tsx`
   - Hard-locks state_code to IN

---

## Support

For Indiana-specific questions:
- WorkOne integration
- RAPIDS registration
- DWD compliance
- PLA requirements

Contact: elevate4humanityedu@gmail.com
