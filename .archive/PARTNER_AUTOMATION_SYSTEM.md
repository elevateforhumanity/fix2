# Partner LMS Automation System

## Overview

This system automates partner course enrollment from payment to completion tracking. Students pay via Stripe, get automatically enrolled in partner platforms (HSI, Certiport, etc.), and can launch courses with one click.

## Architecture

```
Stripe Payment → Webhook → Auto-Enrollment → Partner API → Student Dashboard
                                ↓
                         Supabase Tables
                                ↓
                         Progress Sync (Cron)
```

## Components

### 1. Partner API Abstraction (`lib/partners/`)

**Base Interface** (`base.ts`):
- Defines common types for all partner integrations
- Abstract class `BasePartnerAPI` with methods:
  - `createAccount()` - Create student account on partner platform
  - `enrollInCourse()` - Enroll student in specific course
  - `getProgress()` - Fetch completion status
  - `getCertificate()` - Retrieve certificate data
  - `getSsoLaunchUrl()` - Generate SSO link for seamless access

**Client Factory** (`index.ts`):
- `getPartnerClient(partnerType)` - Returns appropriate API client
- Currently uses `StubPartnerAPI` for testing
- Replace with real implementations per vendor

### 2. Automated Enrollment Engine (`lib/automation/partnerEnrollment.ts`)

**Function**: `autoEnrollPartnerCourse()`

**Flow**:
1. Load student profile from `profiles` table
2. Load partner provider from `partner_lms_providers`
3. Load course metadata from `partner_courses`
4. Create account on partner platform via API
5. Enroll student in course via API
6. Generate SSO launch URL
7. Save enrollment to `partner_lms_enrollments`
8. Send welcome email (optional)

**Error Handling**:
- Logs failures to `partner_lms_enrollment_failures`
- Returns success/error status

### 3. Stripe Webhook Integration (`app/api/stripe/webhook/route.ts`)

**Trigger**: `checkout.session.completed` event

**Required Metadata**:
```javascript
{
  studentId: "uuid",
  partnerId: "uuid",
  courseId: "uuid",
  programId: "uuid" // optional
}
```

**Actions**:
- Calls `autoEnrollPartnerCourse()` automatically
- Logs success/failure
- No manual intervention required

### 4. Progress Sync System (`lib/automation/progressSync.ts`)

**Functions**:
- `syncSingleEnrollment(enrollmentId)` - Sync one enrollment
- `syncAllActivePartnerEnrollments()` - Sync all active enrollments

**Usage**:
- Call from cron job or scheduled function
- Updates `progress_percentage` and `status` fields
- Marks courses as completed when done

### 5. SSO Launch Route (`app/api/partner-launch/[enrollmentId]/route.ts`)

**Endpoint**: `GET /api/partner-launch/{enrollmentId}`

**Flow**:
1. Load enrollment from database
2. Generate SSO URL via partner API
3. Redirect student to partner platform

**Student Experience**:
- Click "Start Course" button
- Seamlessly redirected to partner platform
- No login required (SSO)

### 6. Student Dashboard (`app/student/dashboard/`)

**Component**: `PartnerEnrollmentsSection.tsx`

**Features**:
- Lists all partner enrollments
- Shows progress bars
- "Start/Continue Course" buttons
- Status badges (Pending, Active, Completed)
- Links to certificates when completed

**API**: `GET /api/student/partner-enrollments`

## Database Schema

### Required Tables

#### `partner_lms_providers`
```sql
- id (uuid, primary key)
- provider_name (text)
- provider_type (text) -- 'hsi', 'certiport', 'milady', etc.
- website_url (text)
- support_email (text)
- active (boolean)
- metadata (jsonb)
- created_at, updated_at (timestamptz)
```

#### `partner_courses`
```sql
- id (uuid, primary key)
- provider_id (uuid, foreign key)
- course_name (text)
- course_code (text)
- external_course_code (text) -- partner's course ID
- description (text)
- hours (numeric)
- level (text)
- credential_type (text)
- active (boolean)
- metadata (jsonb)
- created_at, updated_at (timestamptz)
```

#### `partner_lms_enrollments`
```sql
- id (uuid, primary key)
- provider_id (uuid, foreign key)
- student_id (uuid, foreign key)
- course_id (uuid, foreign key)
- program_id (uuid, nullable)
- status (text) -- 'pending', 'active', 'completed', 'failed'
- progress_percentage (numeric)
- enrolled_at (timestamptz)
- completed_at (timestamptz, nullable)
- external_enrollment_id (text)
- external_account_id (text)
- external_certificate_id (text)
- metadata (jsonb)
- created_at, updated_at (timestamptz)
```

#### `partner_lms_enrollment_failures`
```sql
- id (uuid, primary key)
- student_id (uuid, foreign key)
- provider_id (uuid, foreign key)
- course_id (uuid, foreign key)
- program_id (uuid, nullable)
- error_message (text)
- retry_count (int)
- created_at (timestamptz)
```

#### `partner_certificates`
```sql
- id (uuid, primary key)
- enrollment_id (uuid, foreign key)
- student_id (uuid, foreign key)
- partner_id (uuid, foreign key)
- certificate_number (text)
- certificate_url (text)
- verification_url (text)
- issued_date (timestamptz)
- expiration_date (timestamptz, nullable)
- metadata (jsonb)
- created_at (timestamptz)
```

## Implementation Steps

### Phase 1: Setup (Current)
- ✅ Partner API abstraction layer
- ✅ Automated enrollment engine
- ✅ Stripe webhook integration
- ✅ Progress sync system
- ✅ SSO launch route
- ✅ Student dashboard components

### Phase 2: Database Setup
1. Run SQL migrations to create tables
2. Seed `partner_lms_providers` with vendors
3. Seed `partner_courses` with course catalog

### Phase 3: Partner API Integration
For each partner (HSI, Certiport, etc.):
1. Create new class extending `BasePartnerAPI`
2. Implement all abstract methods using vendor docs
3. Update `getPartnerClient()` to return real client
4. Test with sandbox/staging credentials
5. Deploy to production

### Phase 4: Testing
1. Create test Stripe checkout with metadata
2. Verify auto-enrollment works
3. Test SSO launch URLs
4. Verify progress sync updates correctly
5. Test certificate retrieval

### Phase 5: Production
1. Configure production API credentials
2. Set up cron job for progress sync
3. Monitor enrollment success rates
4. Set up alerts for failures

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=

# Partner APIs (add as needed)
HSI_API_KEY=
HSI_API_SECRET=
CERTIPORT_API_KEY=
CERTIPORT_ORG_ID=
# etc.
```

## Monitoring & Maintenance

### Key Metrics
- Enrollment success rate
- Average time to enrollment
- Progress sync frequency
- Certificate retrieval rate

### Logs to Monitor
- `[autoEnrollPartnerCourse]` - Enrollment attempts
- `[StripeWebhook]` - Payment processing
- `[syncSingleEnrollment]` - Progress updates

### Common Issues
1. **Missing metadata in Stripe**: Ensure checkout sessions include all required fields
2. **Partner API errors**: Check credentials and rate limits
3. **SSO failures**: Verify external_account_id is stored correctly
4. **Progress not updating**: Check cron job is running

## Next Steps

1. **Create Supabase migrations** for all tables
2. **Implement real partner APIs** (start with HSI)
3. **Set up progress sync cron** (daily or hourly)
4. **Create admin dashboard** for monitoring enrollments
5. **Add email notifications** for enrollment success/failure

## Support

For questions or issues:
- Check logs in Supabase dashboard
- Review `partner_lms_enrollment_failures` table
- Contact partner support for API issues
