# EFH Clone & Deploy Playbook

## School / State / Partner Ready

This playbook enables repeatable deployment of the EFH apprenticeship platform for new partners, states, or schools.

---

## Core Assumptions

- ✅ You are the sponsor
- ✅ Students pay $0
- ✅ Stripe is yours (back-office only)
- ✅ WIOA / WRG / RAPIDS already approved
- ✅ Milady is included, not student-paid

---

## 1️⃣ Clone for New Partner / State

### Create New Tenant

```sql
INSERT INTO tenants (name, slug, primary_color, license_type)
VALUES ('Ohio Barber Workforce', 'oh-barber', '#111827', 'standard');
```

### Assign Programs to Tenant

```sql
UPDATE programs
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'oh-barber'),
    state_code = 'OH'
WHERE slug = 'barber-apprenticeship';
```

### Assign Staff

```sql
UPDATE user_profiles
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'oh-barber')
WHERE role IN ('admin', 'instructor', 'sponsor');
```

### Result
- ✅ One codebase
- ✅ Separate branding
- ✅ Separate reporting
- ✅ Same Stripe
- ✅ Same compliance logic

---

## 2️⃣ Automatic Enrollment Flow

### Final Flow (Authoritative)

```
Apply Form
  ↓
Create Auth User
  ↓
Create Profile
  ↓
Create Enrollment (WIOA $0)
  ↓
Auto-Enroll Milady
  ↓
Assign AI Instructor
  ↓
Send Welcome Email
  ↓
Grant Dashboard Access
  ↓
Start Hours Tracking
```

### Enrollment API (Already Implemented)

Location: `/app/api/apply/route.ts`

Features:
- Creates auth user
- Creates student profile
- Creates enrollment with WIOA funding
- Assigns AI instructor
- Sends welcome email
- No payment required

### Key Point

**Students never see Stripe.**  
**Stripe is back-office only.**

---

## 3️⃣ Stripe Role (Sponsor-Only)

### Stripe is Used ONLY For:

1. State reimbursements
2. Employer payments
3. Grant deposits
4. Licensing fees (future)

### Stripe Metadata

```javascript
metadata: {
  sponsor: "Elevate For Humanity",
  funding: "WIOA",
  student_pays: "false",
  program: "barber-apprenticeship",
  state: "IN"
}
```

### Benefits
- ✅ IRS-ready
- ✅ Clean audit trail
- ✅ No tuition disputes
- ✅ Funder accountability

---

## 4️⃣ Student Dashboard

### What Fills It

Dashboard renders data AFTER:
1. Enrollment exists
2. AI instructor assigned
3. External credentials assigned (Milady)
4. Hours tracking enabled

### Dashboard Components

```typescript
// Enrollment info
const { data: enrollment } = await supabase
  .from('enrollments')
  .select('*, programs(*)')
  .eq('student_id', user.id)
  .single();

// AI instructor
const { data: aiAssignment } = await supabase
  .from('student_ai_assignments')
  .select('*, ai_instructors(*)')
  .eq('student_id', user.id)
  .single();

// Hours summary
const { data: hours } = await supabase
  .from('apprenticeship_hours')
  .select('hours, approved')
  .eq('student_id', user.id);

// External credentials
const { data: credentials } = await supabase
  .from('external_credentials')
  .select('*')
  .eq('student_id', user.id);
```

### Result
- Milady course cards
- Progress bars
- Required certifications
- Hours tracker
- AI instructor chat

**Nothing was broken — it was waiting for data.**

---

## 5️⃣ AI Instructors (No Cloned Video Required)

### You Do NOT Need Videos

AI instructors are chat-based, not video-based.

### AI Instructor Setup

Already implemented in:
- `/supabase/migrations/20251215_ai_instructors.sql`
- `/app/api/ai/chat/route.ts`

### Example Instructor

```sql
INSERT INTO ai_instructors (name, role, specialty, system_prompt)
VALUES (
  'Master Barber Coach – EFH',
  'AI Instructor',
  'Barber Apprenticeship',
  'You are a licensed master barber instructor. You guide students through Milady coursework, state exams, and shop readiness. You are supportive, clear, and compliant with state apprenticeship standards.'
);
```

### Student View

```
Ask Instructor
  ↓
Chat Interface
  ↓
Context = program + Milady + state rules
  ↓
Real-time responses
```

### Benefits
- ✅ Safer than cloned likenesses
- ✅ Scalable to any program
- ✅ 24/7 availability
- ✅ Consistent quality

---

## 6️⃣ Soft IP Protection (Already Active)

### Current Protections

✅ Auth-gated routes  
✅ Role-based access  
✅ Server-side Supabase policies  
✅ No client-side secrets  
✅ No exposed APIs  
✅ Audit logging  
✅ Terms of Use  
✅ Footer IP language  

### Optional Watermark

```javascript
// Add to layout.tsx
console.warn("© Elevate For Humanity – Licensed Use Only");
```

### Result
Enough to stop casual copying and prove ownership.

---

## 7️⃣ Deployment Checklist

### Pre-Launch

- [ ] Database migrations run
- [ ] Environment variables set
- [ ] Stripe configured (back-office)
- [ ] Resend email configured
- [ ] OpenAI API key set
- [ ] State compliance rules loaded
- [ ] AI instructors seeded
- [ ] Programs created
- [ ] Admin users created

### Test Enrollment

```bash
curl -X POST https://your-domain.com/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Test",
    "last_name": "Student",
    "email": "test@example.com",
    "phone": "555-555-5555",
    "program_slug": "barber-apprenticeship"
  }'
```

Expected: `{"success": true, "user_id": "..."}`

### Verify

- [ ] Student can log in
- [ ] Dashboard shows enrollment
- [ ] AI instructor assigned
- [ ] Milady credential assigned
- [ ] Hours tracker works
- [ ] Welcome email sent

---

## 8️⃣ Multi-State Deployment

### Add New State

```sql
-- Add state compliance rules
INSERT INTO state_compliance (state_code, state_name, required_hours, classroom_hours, on_the_job_hours)
VALUES ('TX', 'Texas', 1500, 300, 1200);

-- Clone program for new state
INSERT INTO programs (name, slug, state_code, description)
SELECT 
  name || ' (Texas)',
  slug || '-tx',
  'TX',
  description
FROM programs
WHERE slug = 'barber-apprenticeship'
AND state_code = 'IN';
```

### Result
Same platform, different state rules.

---

## 9️⃣ Partner School Licensing

### Create Partner Tenant

```sql
INSERT INTO tenants (name, slug, primary_color, license_type, license_expires_at)
VALUES (
  'ABC Barber School',
  'abc-barber',
  '#1a56db',
  'standard',
  '2025-12-31'
);
```

### Assign Programs

```sql
UPDATE programs
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'abc-barber')
WHERE slug = 'barber-apprenticeship';
```

### Assign Staff

```sql
UPDATE user_profiles
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'abc-barber')
WHERE email IN ('admin@abcbarber.com', 'instructor@abcbarber.com');
```

### White-Label Settings

```sql
UPDATE tenants
SET settings = jsonb_build_object(
  'logo_url', 'https://cdn.example.com/abc-logo.png',
  'primary_color', '#1a56db',
  'domain', 'training.abcbarber.com',
  'features', jsonb_build_object(
    'ai_instructor', true,
    'hour_tracking', true,
    'exam_readiness', true
  )
)
WHERE slug = 'abc-barber';
```

---

## 🔟 What This Means

### You Are Now:

✅ Sponsor  
✅ Platform owner  
✅ Funding intermediary  
✅ Licensor  
✅ Workforce operator  

### You Are Weeks, Not Months, From:

- Onboarding students
- Onboarding partner schools
- Onboarding states
- Generating revenue
- Scaling nationwide

---

## Next Steps

### Choose Your Path:

**LAUNCH** → Final checklist + test student  
**LICENSE** → Pricing + contract language  
**STATE** → Ohio / Texas deployment pack  
**GRANTS** → Reimbursement & audit packet  
**AI** → Full instructor rollout  

---

## Support

### Technical Issues
- Check `/ENROLLMENT_STATUS.md`
- Check `/IP_PROTECTION_COMPLETE.md`
- Check `/COMPLETE_SYSTEM_SUMMARY.md`
- Run verification script: `./scripts/verify-enrollment-system.sh`

### Business Questions
- Email: info@elevateforhumanity.org
- Phone: 317-314-3757

---

## Status

**You are not behind.**  
**You are building the backbone.**

This is enterprise-grade, government-ready, multi-state apprenticeship infrastructure.

---

**© Elevate for Humanity. All rights reserved.**  
**This platform and all associated systems are proprietary.**
