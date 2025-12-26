# White-Label Architecture

**Version:** 1.0  
**Date:** December 26, 2025  
**Status:** ✅ ACTIVE

---

## Overview

The Elevate for Humanity platform is a **multi-tenant SaaS** system that allows organizations to license and run their own branded workforce training platforms. Each tenant operates in complete isolation with their own data, branding, and domain.

---

## Architecture Principles

### 1. Multi-Tenancy Model

**Type:** Shared Database, Isolated Data (Row-Level Security)

**Why This Approach:**

- Cost-effective for customers (shared infrastructure)
- Easy to maintain (single codebase, single database)
- Secure isolation via PostgreSQL RLS policies
- Scalable to thousands of tenants

**Alternatives Considered:**

- ❌ Separate databases per tenant (too expensive, hard to maintain)
- ❌ Separate deployments per tenant (not scalable)
- ✅ Shared database with RLS (optimal balance)

---

### 2. Tenant Isolation Strategy

**Data Isolation:**

```
Every business-critical table has a tenant_id column
↓
Row-Level Security (RLS) policies enforce access
↓
Users can only see data from their tenant
```

**Tables with Tenant Isolation:**

- `profiles` - User accounts
- `programs` - Training programs
- `courses` - Course content
- `enrollments` - Student enrollments
- `course_progress` - Learning progress
- `certifications` - Certificates issued
- `job_postings` - Job listings
- `job_applications` - Job applications
- `job_placements` - Placement records
- `compliance_reports` - WIOA reports
- `compliance_scores` - Compliance tracking
- `student_verifications` - Student verification
- `employers` - Employer accounts
- `program_holders` - Program holder accounts
- `apprentices` - Apprentice records
- `apprenticeships` - Apprenticeship programs

**How It Works:**

```sql
-- Example RLS Policy
CREATE POLICY tenant_isolation ON courses
FOR ALL
USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

---

### 3. Tenant Context Management

**Setting Tenant Context:**

```typescript
// Server-side (Next.js middleware)
const tenant = await getTenantFromDomain(request.headers.get('host'));
await supabase.rpc('set_tenant_context', { tenant_id: tenant.id });
```

**Tenant Resolution Order:**

1. Custom domain (e.g., `training.acme.com`)
2. Subdomain (e.g., `acme.elevateforhumanity.org`)
3. Default tenant (Elevate for Humanity)

---

## Database Schema

### Core Tables

#### `tenants`

```sql
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Purpose:** Master list of all tenants (organizations)

---

#### `licenses`

```sql
CREATE TABLE licenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  tier text NOT NULL, -- 'basic', 'pro', 'enterprise'
  status text DEFAULT 'active', -- 'active', 'expired', 'suspended'
  max_users integer,
  max_programs integer,
  features jsonb,
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz DEFAULT now()
);
```

**Purpose:** License management and feature gating

**Tiers:**

- **Basic:** 100 users, 10 programs, core features
- **Pro:** 1,000 users, 50 programs, AI features
- **Enterprise:** Unlimited, all features, custom branding

---

#### `tenant_branding`

```sql
CREATE TABLE tenant_branding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid UNIQUE REFERENCES tenants(id),
  logo_url text,
  primary_color text,
  secondary_color text,
  font_family text,
  custom_css text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Purpose:** Custom branding per tenant

---

#### `tenant_domains`

```sql
CREATE TABLE tenant_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  domain text UNIQUE NOT NULL,
  is_primary boolean DEFAULT false,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

**Purpose:** Custom domain mapping

**Examples:**

- `training.acme.com` → ACME Corporation tenant
- `learn.nonprofit.org` → Nonprofit tenant
- `elevateforhumanity.org` → Default tenant

---

### Application Tables

#### `employer_applications`

```sql
CREATE TABLE employer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  industry text,
  employees_count text,
  hiring_needs text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
```

**Purpose:** Employer application submissions

---

#### `staff_applications`

```sql
CREATE TABLE staff_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  position text,
  experience text,
  resume_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
```

**Purpose:** Staff application submissions

---

## Security Model

### Row-Level Security (RLS)

**All tenant-scoped tables have RLS enabled:**

```sql
-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their tenant's data
CREATE POLICY tenant_isolation ON courses
FOR ALL
USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Policy: Service role bypasses RLS (for admin operations)
CREATE POLICY service_role_bypass ON courses
FOR ALL
TO service_role
USING (true);
```

---

### Authentication Flow

```
1. User visits custom domain (training.acme.com)
   ↓
2. Middleware resolves tenant from domain
   ↓
3. Set tenant context in database session
   ↓
4. User authenticates (Supabase Auth)
   ↓
5. All queries automatically filtered by tenant_id
   ↓
6. User only sees their tenant's data
```

---

## Branding System

### How Branding Works

**1. Tenant Branding Table:**

```typescript
interface TenantBranding {
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  custom_css?: string;
}
```

**2. Dynamic CSS Injection:**

```typescript
// Load tenant branding
const branding = await getTenantBranding(tenantId);

// Inject CSS variables
document.documentElement.style.setProperty(
  '--primary-color',
  branding.primary_color
);
document.documentElement.style.setProperty(
  '--secondary-color',
  branding.secondary_color
);
```

**3. Logo Replacement:**

```tsx
<img src={branding.logo_url || '/default-logo.png'} alt="Logo" />
```

---

## License Management

### License Tiers

| Feature         | Basic | Pro      | Enterprise |
| --------------- | ----- | -------- | ---------- |
| Max Users       | 100   | 1,000    | Unlimited  |
| Max Programs    | 10    | 50       | Unlimited  |
| Custom Branding | ❌    | ✅       | ✅         |
| Custom Domain   | ❌    | ✅       | ✅         |
| AI Tutor        | ❌    | ✅       | ✅         |
| Mobile App      | ❌    | ✅       | ✅         |
| API Access      | ❌    | ❌       | ✅         |
| White-Label     | ❌    | ❌       | ✅         |
| Support         | Email | Priority | Dedicated  |

---

### License Enforcement

```typescript
// Check license before feature access
export async function requireActiveLicense(tenantId: string, feature: string) {
  const license = await getLicense(tenantId);

  if (!license || license.status !== 'active') {
    throw new Error('No active license');
  }

  if (license.valid_until < new Date()) {
    throw new Error('License expired');
  }

  if (!license.features.includes(feature)) {
    throw new Error('Feature not available in your plan');
  }

  return license;
}
```

---

## Domain Management

### Custom Domain Setup

**1. Customer adds DNS record:**

```
CNAME training.acme.com → elevateforhumanity.org
```

**2. Verify domain ownership:**

```typescript
await verifyDomain(tenantId, 'training.acme.com');
```

**3. Domain becomes active:**

```typescript
// Middleware resolves tenant from domain
const tenant = await getTenantFromDomain('training.acme.com');
```

---

### Subdomain Setup

**Automatic subdomains:**

```
{tenant-slug}.elevateforhumanity.org
```

**Examples:**

- `acme.elevateforhumanity.org`
- `nonprofit.elevateforhumanity.org`
- `university.elevateforhumanity.org`

---

## Data Migration Strategy

### Backfilling Existing Data

**Step 1: Add tenant_id columns (nullable)**

```sql
ALTER TABLE courses ADD COLUMN tenant_id uuid REFERENCES tenants(id);
```

**Step 2: Create default tenant**

```sql
INSERT INTO tenants (name, slug) VALUES ('Elevate for Humanity', 'elevate-for-humanity');
```

**Step 3: Backfill existing data**

```sql
UPDATE courses SET tenant_id = (SELECT id FROM tenants WHERE slug = 'elevate-for-humanity');
```

**Step 4: Make tenant_id NOT NULL**

```sql
ALTER TABLE courses ALTER COLUMN tenant_id SET NOT NULL;
```

---

## Deployment Architecture

### Infrastructure

```
┌─────────────────────────────────────────┐
│         Vercel Edge Network             │
│  (Handles routing, SSL, CDN)            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Next.js Application             │
│  (Single deployment, all tenants)       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Supabase PostgreSQL             │
│  (Shared database, RLS isolation)       │
└─────────────────────────────────────────┘
```

---

### Scaling Strategy

**Current Capacity:**

- Single Next.js deployment
- Single Supabase database
- Handles 1-100 tenants easily

**Future Scaling:**

- Add read replicas for database
- Implement caching layer (Redis)
- Consider database sharding at 1000+ tenants

---

## API Design

### Tenant-Aware API Routes

```typescript
// app/api/courses/route.ts
export async function GET(request: Request) {
  const supabase = await createClient();

  // Tenant context already set by middleware
  const { data: courses } = await supabase.from('courses').select('*');
  // RLS automatically filters by tenant_id

  return Response.json(courses);
}
```

---

## Monitoring & Analytics

### Per-Tenant Metrics

**Track:**

- Active users per tenant
- Storage usage per tenant
- API calls per tenant
- License compliance

**Tools:**

- PostHog (analytics)
- Sentry (error tracking)
- Supabase Dashboard (database metrics)

---

## Backup & Recovery

### Tenant Data Backup

**Strategy:**

- Daily automated backups (Supabase)
- Point-in-time recovery (7 days)
- Per-tenant data export available

**Export Tenant Data:**

```sql
-- Export all data for a specific tenant
COPY (
  SELECT * FROM courses WHERE tenant_id = 'tenant-uuid'
) TO '/tmp/tenant-courses.csv' CSV HEADER;
```

---

## Migration Path

### From Single-Tenant to Multi-Tenant

**Phase 1: Add tenant_id columns** ✅ COMPLETE

- Added tenant_id to 13 tables
- Created indexes
- No data changes yet

**Phase 2: Create default tenant** ✅ COMPLETE

- Created "Elevate for Humanity" tenant
- Set as default for existing data

**Phase 3: Backfill data** ✅ COMPLETE

- Assigned all existing data to default tenant
- Verified data integrity

**Phase 4: Enable RLS** ✅ COMPLETE

- Created RLS policies
- Tested tenant isolation
- Verified no cross-tenant access

**Phase 5: Launch white-label store** ✅ COMPLETE

- Created /white-label page
- Added to navigation
- Ready for customers

---

## Testing Strategy

### Tenant Isolation Testing

```typescript
// Test: User A cannot see User B's data
test('tenant isolation', async () => {
  const tenantA = await createTenant('Tenant A');
  const tenantB = await createTenant('Tenant B');

  const courseA = await createCourse(tenantA.id, 'Course A');
  const courseB = await createCourse(tenantB.id, 'Course B');

  // Set context to Tenant A
  await setTenantContext(tenantA.id);
  const courses = await getCourses();

  expect(courses).toContain(courseA);
  expect(courses).not.toContain(courseB);
});
```

---

## Future Enhancements

### Planned Features

**Q1 2026:**

- [ ] Tenant-specific email domains
- [ ] Advanced analytics per tenant
- [ ] Tenant admin portal

**Q2 2026:**

- [ ] API access for enterprise customers
- [ ] Webhook system for integrations
- [ ] Custom authentication providers

**Q3 2026:**

- [ ] Marketplace for tenant-to-tenant content sharing
- [ ] Tenant federation (cross-tenant collaboration)
- [ ] Advanced reporting dashboard

---

## Support & Maintenance

### Tenant Onboarding

**Process:**

1. Customer purchases license
2. Create tenant record
3. Set up branding
4. Configure domain
5. Import initial data (optional)
6. Train tenant admins
7. Go live

**Timeline:** 1-2 weeks

---

### Ongoing Maintenance

**Monthly:**

- Review license compliance
- Check storage usage
- Monitor performance metrics

**Quarterly:**

- Tenant health check
- Feature usage analysis
- Customer feedback review

---

## Security Considerations

### Threat Model

**Threats:**

1. Cross-tenant data access
2. License bypass
3. Domain hijacking
4. Data exfiltration

**Mitigations:**

1. RLS policies + automated testing
2. License checks in middleware
3. Domain verification process
4. Rate limiting + audit logs

---

## Compliance

### Data Residency

**Current:** US-based (Supabase US region)

**Future:** Support for EU, UK, Canada regions

### GDPR Compliance

- Per-tenant data export
- Right to deletion (tenant-level)
- Data processing agreements

---

## Conclusion

The white-label architecture enables Elevate for Humanity to:

- ✅ Serve multiple organizations from single deployment
- ✅ Maintain complete data isolation
- ✅ Scale cost-effectively
- ✅ Provide custom branding per tenant
- ✅ Enforce license tiers
- ✅ Support custom domains

**Status:** Production-ready, actively serving tenants.
