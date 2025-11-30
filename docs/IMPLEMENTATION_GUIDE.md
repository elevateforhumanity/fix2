# Enterprise LMS Implementation Guide

## Overview

This guide walks you through implementing the complete partner LMS automation system for Elevate for Humanity. The system automates enrollment, progress tracking, and certificate delivery across multiple partner platforms (HSI, Certiport, CareerSafe, Milady, etc.).

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Student Journey                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Apply → 2. Pay (Stripe) → 3. Auto-Enroll → 4. Learn    │
│     ↓            ↓                  ↓              ↓         │
│  Database    Webhook          Partner API      Progress     │
│                ↓                  ↓              Sync        │
│           Enrollment         SSO Launch          ↓          │
│           Email Sent            URL          Certificate    │
│                                                  ↓          │
│                                            Completion       │
│                                            Email Sent       │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Database Setup (30 minutes)

### Step 1: Run Supabase Migration

1. Open Supabase SQL Editor
2. Copy contents of `supabase/migrations/20241130_create_partner_lms_tables.sql`
3. Execute the migration
4. Verify tables created:
   - `partner_lms_providers`
   - `partner_courses`
   - `partner_lms_enrollments`
   - `partner_lms_enrollment_failures`
   - `partner_certificates`

### Step 2: Verify Seed Data

Check that 7 partners were seeded:
```sql
SELECT provider_name, provider_type, active 
FROM partner_lms_providers 
ORDER BY provider_name;
```

Expected results:
- CareerSafe (careersafe)
- Certiport (certiport)
- Health & Safety Institute (hsi)
- JRI (jri)
- Milady (milady)
- National Dental Solutions (nds)
- NRF Foundation (nrf)

### Step 3: Add Sample Courses

```sql
-- Example: Add HSI CPR course
INSERT INTO partner_courses (
  provider_id,
  course_name,
  course_code,
  external_course_code,
  description,
  hours,
  level,
  credential_type,
  active
) VALUES (
  (SELECT id FROM partner_lms_providers WHERE provider_type = 'hsi'),
  'CPR/AED for Healthcare Providers',
  'HSI-CPR-001',
  'CPR-HCP-2024', -- Partner's course code
  'American Heart Association CPR and AED certification',
  4,
  'beginner',
  'certificate',
  true
);
```

## Phase 2: Partner API Integration (2-4 hours per partner)

### Step 1: Choose First Partner

**Recommended order:**
1. HSI (most common, good documentation)
2. Certiport (exam-based, different pattern)
3. CareerSafe (OSHA training)
4. Others as needed

### Step 2: Get API Credentials

Contact partner support and request:
- API key / secret
- Organization ID
- API documentation
- Sandbox/test environment access

### Step 3: Implement Partner Client

Create `lib/partners/hsi.ts`:

```typescript
import {
  BasePartnerAPI,
  PartnerAPIConfig,
  StudentData,
  PartnerAccount,
  CourseEnrollment,
  ProgressData,
  CertificateData,
} from "./base";

export class HsiAPI extends BasePartnerAPI {
  constructor(config: PartnerAPIConfig) {
    super("hsi", config);
  }

  async createAccount(student: StudentData): Promise<PartnerAccount> {
    // Implement HSI account creation
    const response = await fetch(`${this.config.baseUrl}/api/users`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        // ... other HSI-specific fields
      }),
    });

    const data = await response.json();

    return {
      externalId: data.userId,
      username: student.email,
      loginUrl: `${this.config.baseUrl}/login`,
    };
  }

  async enrollInCourse(
    accountExternalId: string,
    courseExternalCode: string
  ): Promise<CourseEnrollment> {
    // Implement HSI enrollment
    // ... HSI-specific enrollment logic
  }

  async getProgress(externalEnrollmentId: string): Promise<ProgressData | null> {
    // Implement HSI progress check
    // ... HSI-specific progress logic
  }

  async getCertificate(externalEnrollmentId: string): Promise<CertificateData | null> {
    // Implement HSI certificate retrieval
    // ... HSI-specific certificate logic
  }

  async getSsoLaunchUrl(params: {
    accountExternalId: string;
    externalEnrollmentId: string;
    returnTo?: string;
  }): Promise<string> {
    // Implement HSI SSO URL generation
    // ... HSI-specific SSO logic
  }
}
```

### Step 4: Update Partner Factory

Edit `lib/partners/index.ts`:

```typescript
import { HsiAPI } from "./hsi";

export function getPartnerClient(partner: PartnerType): BasePartnerAPI {
  const config: PartnerAPIConfig = {
    baseUrl: process.env.PARTNER_API_BASE_URL,
    apiKey: process.env.PARTNER_API_KEY,
    apiSecret: process.env.PARTNER_API_SECRET,
    orgId: process.env.PARTNER_ORG_ID,
  };

  // Real implementations
  if (partner === "hsi") {
    return new HsiAPI({
      baseUrl: process.env.HSI_API_BASE_URL,
      apiKey: process.env.HSI_API_KEY,
      orgId: process.env.HSI_ORG_ID,
    });
  }

  // Fallback to stub for others
  return new StubPartnerAPI(partner, config);
}
```

### Step 5: Add Environment Variables

In `.env.local` or Vercel environment variables:

```bash
# HSI Configuration
HSI_API_BASE_URL=https://api.hsi.com
HSI_API_KEY=your_hsi_api_key
HSI_ORG_ID=your_org_id

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@elevateforhumanity.org

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Phase 3: Email Setup (30 minutes)

### Step 1: Deploy Edge Functions

```bash
# Deploy enrollment email
supabase functions deploy send-partner-enrollment-email \
  --project-ref your-project-ref \
  --no-verify-jwt

# Deploy completion email
supabase functions deploy send-partner-completion-email \
  --project-ref your-project-ref \
  --no-verify-jwt
```

### Step 2: Set Environment Variables

In Supabase Dashboard → Functions → Environment Variables:

```
SENDGRID_API_KEY=your_key
EMAIL_FROM=noreply@elevateforhumanity.org
```

### Step 3: Test Email Functions

```bash
# Test enrollment email
curl -X POST https://your-project.supabase.co/functions/v1/send-partner-enrollment-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "studentName": "Test Student",
    "courseName": "CPR Certification",
    "partnerName": "HSI",
    "launchUrl": "https://example.com/launch",
    "partnerLoginUrl": "https://hsi.com/login",
    "username": "test@example.com"
  }'
```

## Phase 4: Testing (1-2 hours)

### Test 1: Manual Enrollment

```typescript
// In Supabase SQL Editor or via API
const result = await autoEnrollPartnerCourse({
  studentId: "test-student-uuid",
  partnerId: "hsi-provider-uuid",
  courseId: "cpr-course-uuid",
  programId: "medical-assistant-program-uuid",
});
```

### Test 2: Stripe Webhook

1. Create test checkout session with metadata:
```javascript
{
  studentId: "uuid",
  partnerId: "uuid",
  courseId: "uuid",
  programId: "uuid"
}
```

2. Complete payment in test mode
3. Verify enrollment created
4. Check email sent

### Test 3: Progress Sync

```typescript
// Manually trigger sync
await syncSingleEnrollment("enrollment-uuid");

// Check updated progress
const { data } = await supabase
  .from("partner_lms_enrollments")
  .select("progress_percentage, status")
  .eq("id", "enrollment-uuid")
  .single();
```

### Test 4: Certificate Retrieval

```typescript
// Simulate completion
const cert = await client.getCertificate("external-enrollment-id");

// Verify certificate saved
const { data } = await supabase
  .from("partner_certificates")
  .select("*")
  .eq("enrollment_id", "enrollment-uuid")
  .single();
```

## Phase 5: Progress Sync Automation (30 minutes)

### Option A: Supabase Cron (Recommended)

Create `supabase/functions/sync-partner-progress/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { syncAllActivePartnerEnrollments } from "../../../lib/automation/progressSync.ts";

serve(async (req) => {
  try {
    await syncAllActivePartnerEnrollments();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
```

Schedule in Supabase:
```sql
SELECT cron.schedule(
  'sync-partner-progress',
  '0 2 * * *', -- Daily at 2 AM
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/sync-partner-progress',
    headers := '{"Content-Type": "application/json"}'::jsonb
  );
  $$
);
```

### Option B: External Cron

Use a service like Vercel Cron or GitHub Actions to hit:
```
POST /api/admin/sync-progress
```

## Phase 6: Monitoring & Maintenance

### Daily Checks

1. **Failed Enrollments**
```sql
SELECT COUNT(*) 
FROM partner_lms_enrollment_failures 
WHERE resolved = false 
AND created_at > NOW() - INTERVAL '24 hours';
```

2. **Pending Enrollments**
```sql
SELECT COUNT(*) 
FROM partner_lms_enrollments 
WHERE status = 'pending' 
AND created_at < NOW() - INTERVAL '1 hour';
```

3. **Completion Rate**
```sql
SELECT 
  COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*) as completion_rate
FROM partner_lms_enrollments
WHERE created_at > NOW() - INTERVAL '30 days';
```

### Weekly Reports

1. Export completions: `/admin/completions`
2. Review analytics: `/admin/analytics`
3. Check certificate issuance rates

### Monthly Tasks

1. Review partner API usage/costs
2. Update partner course catalogs
3. Verify certificate verification URLs still work
4. Review and resolve enrollment failures

## Troubleshooting

### Enrollment Fails

1. Check `partner_lms_enrollment_failures` table
2. Verify partner API credentials
3. Check partner API rate limits
4. Review error logs in Supabase

### Email Not Sent

1. Verify SendGrid API key
2. Check Edge Function logs
3. Verify email address format
4. Check spam folder

### Progress Not Syncing

1. Verify cron job running
2. Check partner API response
3. Review sync function logs
4. Verify enrollment IDs match

### Certificate Not Retrieved

1. Check if course actually completed
2. Verify partner provides certificates
3. Check certificate API endpoint
4. Review partner documentation

## Security Checklist

- [ ] API keys stored in environment variables (not code)
- [ ] RLS policies enabled on all tables
- [ ] Admin routes protected with auth checks
- [ ] Webhook signatures verified
- [ ] HTTPS enforced on all endpoints
- [ ] Rate limiting configured
- [ ] Error messages don't expose sensitive data
- [ ] Audit logging enabled

## Performance Optimization

### Database Indexes

Already created in migration:
- `partner_lms_enrollments.student_id`
- `partner_lms_enrollments.status`
- `partner_certificates.student_id`

### Caching

Consider caching:
- Partner provider list
- Course catalogs
- Student enrollment counts

### API Rate Limiting

Implement delays in sync functions:
```typescript
await new Promise((res) => setTimeout(res, 100));
```

## Support Resources

- **Partner Automation Docs**: `/PARTNER_AUTOMATION_SYSTEM.md`
- **Feature Status**: `/ENTERPRISE_LMS_FEATURE_STATUS.md`
- **PIRL Mapping**: `/docs/compliance/WIOA_PIRL_MAPPING_NOTES.md`
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Next Steps

After completing this guide:

1. ✅ Implement remaining partner APIs
2. ✅ Set up monitoring alerts
3. ✅ Train staff on admin tools
4. ✅ Document partner-specific quirks
5. ✅ Create runbooks for common issues
6. ✅ Schedule regular compliance exports
7. ✅ Plan for scale (more students, more partners)

## Questions?

Review the documentation files or check the inline code comments for specific implementation details.
