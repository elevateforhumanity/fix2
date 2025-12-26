# Gate 5 Implementation Status - Policy Integration

## Completed Components

### 1. Policy Infrastructure ✅

- [x] Created `/components/compliance/PolicyReference.tsx`
- [x] Created `/components/compliance/ComplianceNotice.tsx`
- [x] Created `/lib/policies.ts` with central policy registry
- [x] Defined all 25 policies with URLs and descriptions

### 2. Features with Policy Integration ✅

- [x] Application Form (`/app/apply/ApplyFormClient.tsx`)
  - Policies: WIOA, WRG, JRI, Admissions
  - Variant: Compact notice above submit button
- [x] Registration Form (`/app/auth/signup/SignUpForm.tsx`)
  - Policies: FERPA, Privacy, Terms, Student Code
  - Variant: Compact notice above terms checkbox

## Remaining Features (8/10)

### 3. Enrollment Flow

**Files to Update:**

- `/app/admin/enrollments/*/page.tsx`
- `/app/admin/applications/[id]/page.tsx`

**Implementation:**

```tsx
import { ComplianceNotice } from '@/components/compliance/ComplianceNotice';
import { getPoliciesForFeature } from '@/lib/policies';

// Add before enrollment creation button:
<ComplianceNotice
  policies={getPoliciesForFeature('enrollment')}
  context="Enrollment requires verification of:"
  variant="detailed"
/>;
```

**Policies:** WIOA, WRG, Funding Verification, Attendance

---

### 4. Lesson Completion

**Files to Update:**

- `/app/student/courses/[id]/lessons/[lessonId]/page.tsx`
- `/components/course/CoursePlayer.tsx`

**Implementation:**

```tsx
import { PolicyReference } from '@/components/compliance/PolicyReference';
import { POLICIES } from '@/lib/policies';

// Add in lesson footer:
<PolicyReference
  policyName={POLICIES.ATTENDANCE.name}
  policyUrl={POLICIES.ATTENDANCE.url}
  description="Lesson completion tracked per"
  variant="inline"
/>;
```

**Policies:** Attendance, Academic Integrity, Progress

---

### 5. Certificate Issuance

**Files to Update:**

- `/app/admin/certificates/issue/page.tsx`
- `/components/CertificateGenerator.tsx`

**Implementation:**

```tsx
import { ComplianceNotice } from '@/components/compliance/ComplianceNotice';
import { getPoliciesForFeature } from '@/lib/policies';

// Add before certificate generation:
<ComplianceNotice
  policies={getPoliciesForFeature('certificate')}
  context="Certificate issuance governed by:"
  variant="banner"
/>;
```

**Policies:** Credential, Verification, Revocation

---

### 6. Forum Posts

**Files to Update:**

- `/app/forums/[forumId]/page.tsx`
- `/components/forums/CreatePostForm.tsx`

**Implementation:**

```tsx
import { PolicyReference } from '@/components/compliance/PolicyReference';
import { POLICIES } from '@/lib/policies';

// Add above post form:
<PolicyReference
  policyName={POLICIES.COMMUNITY_GUIDELINES.name}
  policyUrl={POLICIES.COMMUNITY_GUIDELINES.url}
  description="All posts must follow our"
  variant="inline"
/>;
```

**Policies:** Community Guidelines, Content Policy, Moderation

---

### 7. AI Tutor

**Files to Update:**

- `/app/student/ai-tutor/page.tsx`
- `/app/lms/chat/page.tsx`
- `/components/AIInstructor.tsx`

**Implementation:**

```tsx
import { ComplianceNotice } from '@/components/compliance/ComplianceNotice';
import { getPoliciesForFeature } from '@/lib/policies';

// Add in chat interface header:
<ComplianceNotice
  policies={getPoliciesForFeature('ai_tutor')}
  context="AI interactions are subject to:"
  variant="notice"
/>;
```

**Policies:** AI Usage, Privacy, Acceptable Use

---

### 8. Contact Form

**Files to Update:**

- `/app/contact/page.tsx`
- `/components/ContactForm.tsx`

**Implementation:**

```tsx
import { ComplianceNotice } from '@/components/compliance/ComplianceNotice';
import { getPoliciesForFeature } from '@/lib/policies';

// Add above submit button:
<ComplianceNotice
  policies={getPoliciesForFeature('contact')}
  variant="compact"
/>;
```

**Policies:** Privacy Notice, Response SLA, Data Retention

---

### 9. SAM.gov Grants

**Files to Update:**

- `/app/grants/page.tsx`
- `/app/api/sam-gov/search/route.ts`

**Implementation:**

```tsx
import { PolicyReference } from '@/components/compliance/PolicyReference';
import { POLICIES } from '@/lib/policies';

// Add in grants page header:
<PolicyReference
  policyName={POLICIES.GRANT_APPLICATION.name}
  policyUrl={POLICIES.GRANT_APPLICATION.url}
  description="Grant applications subject to"
  variant="inline"
/>;
```

**Policies:** Grant Application, Federal Compliance, SAM.gov Eligibility

---

### 10. Blog Posts

**Files to Update:**

- `/app/blog/[slug]/page.tsx`
- `/components/blog/BlogPost.tsx`

**Implementation:**

```tsx
import { PolicyReference } from '@/components/compliance/PolicyReference';
import { POLICIES } from '@/lib/policies';

// Add in blog footer:
<PolicyReference
  policyName={POLICIES.CONTENT_POLICY.name}
  policyUrl={POLICIES.CONTENT_POLICY.url}
  description="Content published under"
  variant="inline"
/>;
```

**Policies:** Content Policy, Editorial, Copyright

---

## Policy Pages Required

All 25 policies need actual pages at their URLs:

### Student Data & Privacy

- [ ] `/policies/ferpa` - FERPA Privacy Policy
- [ ] `/policies/privacy` - Privacy Policy
- [ ] `/policies/terms` - Terms of Service

### Funding & Eligibility

- [ ] `/policies/wioa` - WIOA Eligibility Policy
- [ ] `/policies/wrg` - Workforce Ready Grant Policy
- [ ] `/policies/jri` - Justice Reinvestment Initiative Policy
- [ ] `/policies/funding-verification` - Funding Verification Policy

### Academic & Enrollment

- [ ] `/policies/admissions` - Admissions Policy
- [ ] `/policies/attendance` - Attendance Policy
- [ ] `/policies/academic-integrity` - Academic Integrity Policy
- [ ] `/policies/progress` - Academic Progress Policy
- [ ] `/policies/student-code` - Student Code of Conduct

### Credentials & Certificates

- [ ] `/policies/credentials` - Credential Policy
- [ ] `/policies/verification` - Credential Verification Policy
- [ ] `/policies/revocation` - Credential Revocation Policy

### Community & Content

- [ ] `/policies/community-guidelines` - Community Guidelines
- [ ] `/policies/content` - Content Policy
- [ ] `/policies/moderation` - Moderation Policy
- [ ] `/policies/editorial` - Editorial Guidelines
- [ ] `/policies/copyright` - Copyright Policy

### Technology & AI

- [ ] `/policies/ai-usage` - AI Usage Policy
- [ ] `/policies/acceptable-use` - Acceptable Use Policy
- [ ] `/policies/data-retention` - Data Retention Policy

### Grants & Federal Compliance

- [ ] `/policies/grant-application` - Grant Application Policy
- [ ] `/policies/federal-compliance` - Federal Compliance Policy
- [ ] `/policies/sam-gov-eligibility` - SAM.gov Eligibility Criteria

### Response & Service

- [ ] `/policies/response-sla` - Response Time Policy
- [ ] `/policies/privacy-notice` - Privacy Notice

---

## Implementation Script

```bash
#!/bin/bash
# Gate 5 Implementation Script

echo "Implementing Gate 5: Policy Integration"

# 1. Create policy pages directory
mkdir -p app/policies

# 2. Create policy page template
cat > app/policies/layout.tsx << 'EOF'
export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}
EOF

# 3. Integrate policies into remaining features
# (Manual step - update each feature file as documented above)

# 4. Build and test
pnpm build

echo "Gate 5 implementation complete"
```

---

## Testing Checklist

For each feature, verify:

- [ ] Policy notice displays correctly
- [ ] Policy links are clickable
- [ ] Policy pages exist and load
- [ ] Mobile responsive
- [ ] Accessible (screen reader compatible)
- [ ] No console errors

---

## Estimated Time

- **Policy page creation:** 8 hours (25 pages × 20 min each)
- **Feature integration:** 4 hours (8 features × 30 min each)
- **Testing:** 2 hours
- **Total:** 14 hours

---

## Status: 20% Complete (2/10 features)

**Next Steps:**

1. Create all 25 policy pages
2. Integrate policies into remaining 8 features
3. Test all integrations
4. Update MASTER_FEATURE_REGISTER.md to show Gate 5 passing
