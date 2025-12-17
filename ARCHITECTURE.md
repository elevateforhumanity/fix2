# Workforce Operating System - Architecture

## Overview

This is a multi-tenant SaaS platform designed as a Workforce Operating System, not just an LMS. It supports training providers, employers, workforce boards, and government agencies with complete data isolation and configurable features.

## Core Principles

1. **Multi-Tenant by Design**: Every table includes `organization_id` for data isolation
2. **Config-Driven**: Behavior controlled by `organization_settings.config`, not code
3. **Clone-Safe**: Designed to be safely deployed multiple times with zero data leakage
4. **License-Enforced**: Org-level billing with feature gating and seat limits
5. **Backward Compatible**: All changes are additive, never breaking existing functionality

## Architecture Layers

### 1. Data Layer (Supabase)

**Core Tables:**

- `organizations` - Tenant isolation root
- `organization_users` - RBAC membership
- `organization_settings` - Config engine (JSONB)
- `organization_subscriptions` - Billing & licensing
- `org_invites` - Self-service onboarding

**Existing Tables (Extended):**

- `profiles` - User profiles (+ `organization_id`)
- `programs` - Training programs (+ `organization_id`)
- `courses` - Course content (+ `organization_id`)
- `enrollments` - Student enrollments (+ `organization_id`)
- `certificates` - Credentials (+ `organization_id`)

**Reporting Views:**

- `reporting_enrollments` - Enrollment facts
- `reporting_progress` - Progress & attendance
- `reporting_completions` - Completion statistics
- `reporting_credentials` - Credentials issued
- `reporting_funding` - Funding totals

**Security:**

- Row Level Security (RLS) on all tables
- Org-scoped policies
- Super admin bypass
- Service role for migrations only

### 2. API Layer (Next.js App Router)

**Organization APIs:**

- `POST /api/org/create` - Create organization
- `POST /api/org/invite` - Invite staff
- `POST /api/org/accept-invite` - Accept invitation
- `GET /api/org/invite` - List pending invites

**Reporting APIs:**

- `GET /api/reports/enrollments` - Enrollment report
- `GET /api/reports/progress` - Progress/attendance
- `GET /api/reports/completions` - Completion statistics
- `GET /api/reports/credentials` - Credentials issued
- `GET /api/reports/funding` - Funding totals

All support `?format=csv` for exports.

**Billing APIs:**

- `GET /api/billing/subscription` - Get subscription status
- Stripe webhooks (existing, extended)

### 3. Business Logic Layer

**Organization Context:**

```typescript
lib/org/
├── getOrgContext.ts      // Get user's org & role
├── getOrgConfig.ts       // Get org configuration
├── featureEnabled.ts     // Check feature flags
├── getFundingRules.ts    // Get funding configuration
├── isDeliveryAllowed.ts  // Check delivery modes
├── reportingEnabled.ts   // Check reporting access
├── getBranding.ts        // Get white-label config
├── checkLimits.ts        // Enforce seat/program limits
├── bindUserToOrg.ts      // Bind user to org
└── switchOrg.ts          // Switch active org
```

**Billing & Licensing:**

```typescript
lib/billing/
├── getOrgSubscription.ts      // Get subscription
├── getLicenseStatus.ts        // Resolve license state
├── licenseAllows.ts           // Check feature access
├── enforceLimit.ts            // Enforce hard limits
└── upsertOrgSubscription.ts   // Sync from Stripe
```

**Reporting:**

```typescript
lib/reports/
├── requireReportAccess.ts  // Guard report access
└── exportCsv.ts            // CSV export utility
```

### 4. Configuration Engine

All behavior is controlled by `organization_settings.config`:

```json
{
  "features": {
    "lms": true,
    "micro_courses": true,
    "apprenticeships": true,
    "employer_portal": false,
    "workforce_reporting": true,
    "ai_autopilots": true
  },
  "funding": {
    "wioa": true,
    "wrg": true,
    "jri": true,
    "employer_paid": true,
    "self_pay": true
  },
  "delivery": {
    "online": true,
    "in_person": true,
    "hybrid": true
  },
  "reporting": {
    "attendance": true,
    "outcomes": true,
    "credentials": true,
    "exports_enabled": true
  },
  "branding": {
    "logo_url": "https://cdn.org.com/logo.png",
    "primary_color": "#0F172A",
    "site_name": "Custom Institute"
  },
  "limits": {
    "max_programs": 50,
    "max_students": 500,
    "max_staff": 25
  },
  "license": {
    "plan": "growth",
    "features": {
      "reporting": true,
      "exports": true,
      "employer_portal": true,
      "white_label": false
    },
    "grace_days": 14
  }
}
```

**Key Benefits:**

- No code changes for feature toggles
- No redeployment for config changes
- Per-org customization
- License enforcement without hardcoding

## RBAC (Role-Based Access Control)

**Roles:**

- `super_admin` - Platform-wide access (Elevate team)
- `org_admin` - Full org management
- `staff` - Program & student management
- `instructor` - Course delivery
- `employer_partner` - Employer portal access
- `auditor` - Read-only reporting access

**Enforcement:**

- Database: RLS policies
- API: `requireReportAccess()`, role checks
- UI: Conditional rendering based on role

## Multi-Tenancy Model

**Isolation Strategy:**

- Shared database, isolated by `organization_id`
- RLS enforces data boundaries
- No cross-org queries possible
- Super admin can bypass for support

**Clone Deployment:**

- Each clone = separate Supabase project
- No shared infrastructure
- Complete data isolation
- Independent billing

## Billing & Licensing

**Subscription Model:**

- Org-level subscriptions (not user-level)
- Stripe integration
- Plans: starter, growth, enterprise, custom
- Seat-based or unlimited

**License States:**

- `active` - Full access
- `grace` - Payment failed, grace period active
- `restricted` - Grace expired, admin features locked
- `inactive` - No subscription

**Enforcement:**

- Admin features: Blocked when restricted
- Student learning: Never blocked
- Exports: License-gated
- White-label: License-gated

**Grace Period:**

- Configurable per org (default 14 days)
- Automatic on payment failure
- Admin notified
- Features remain active during grace

## Reporting System

**Architecture:**

- Database views for performance
- Org-scoped queries
- CSV export support
- Real-time data

**Reports:**

1. **Enrollments** - Who enrolled, when, status
2. **Progress** - Completion %, last activity, time spent
3. **Completions** - Completion rates by program
4. **Credentials** - Certificates issued
5. **Funding** - Funding source totals

**Access Control:**

- Requires `org_admin`, `staff`, `auditor`, or `super_admin` role
- Org-scoped automatically
- Export requires license feature

## White-Label Support

**Configurable:**

- Site name
- Logo
- Primary color
- Hide platform branding

**Applied To:**

- UI layout
- Email templates
- Certificates
- PDF reports
- Public pages

**Implementation:**

- Driven by `organization_settings.config.branding`
- No code changes required
- Instant updates

## Clone Safety

**Design Principles:**

1. No hardcoded org IDs
2. No shared secrets
3. No data export between clones
4. Bootstrap script for setup
5. Environment validation

**Bootstrap Process:**

1. Create organization
2. Seed default config
3. Assign admin user
4. Create trial subscription
5. Ready to use

**Verification:**

- Fresh clone deploys successfully
- No manual configuration needed
- Data completely isolated
- Billing independent

## Security

**Authentication:**

- Supabase Auth
- NextAuth.js integration
- Email/password, OAuth
- MFA support

**Authorization:**

- RLS at database level
- Role checks at API level
- Org context validation
- License enforcement

**Data Protection:**

- Org-scoped queries only
- No cross-org data access
- Encrypted at rest (Supabase)
- Encrypted in transit (HTTPS)

**Secrets Management:**

- Environment variables
- No secrets in code
- Separate per clone
- Rotation supported

## Performance

**Caching:**

- React cache for org context
- React cache for org config
- React cache for subscriptions

**Database:**

- Indexes on all foreign keys
- Indexes on org_id columns
- Materialized views for reports
- Query optimization

**API:**

- Server-side rendering
- Static generation where possible
- Edge functions for auth

## Monitoring

**Metrics:**

- Enrollment counts
- Completion rates
- Revenue (Stripe)
- API usage (Supabase)

**Logging:**

- Error tracking
- Audit logs
- User activity
- Billing events

**Alerts:**

- Payment failures
- License expiration
- System errors
- Usage limits

## Deployment

**Supported Platforms:**

- Vercel (recommended)
- Netlify
- Self-hosted (Docker)

**Requirements:**

- Node.js 18+
- PostgreSQL (Supabase)
- Redis (optional, for caching)

**Environment:**

- Production
- Staging
- Development
- Per-clone isolation

## Extensibility

**Adding Features:**

1. Add to `organization_settings.config.features`
2. Check with `featureEnabled()`
3. No code changes for existing orgs

**Adding Limits:**

1. Add to `organization_settings.config.limits`
2. Enforce with `enforceLimit()`
3. Configurable per org

**Adding Reports:**

1. Create database view
2. Add API route
3. Add to reporting UI
4. Gate with `reportingEnabled()`

## Migration Strategy

**Backward Compatibility:**

- All migrations are additive
- No breaking changes
- Existing data preserved
- Default values for new columns

**Process:**

1. Run SQL migrations in order
2. Deploy code changes
3. Verify functionality
4. No downtime required

## Future Considerations

**Scalability:**

- Horizontal scaling via clones
- Database sharding if needed
- CDN for static assets
- Edge functions for auth

**Features:**

- Advanced analytics
- AI-powered recommendations
- Mobile app
- Offline support
- API for integrations

**Business Models:**

- SaaS subscriptions
- Licensed clones
- Enterprise white-label
- Marketplace for content
