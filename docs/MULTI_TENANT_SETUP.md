# Multi-Tenant Setup Guide

**Version:** 1.0  
**Date:** December 26, 2025  
**Audience:** Developers, DevOps

---

## Prerequisites

- ✅ Supabase project with admin access
- ✅ Next.js application deployed
- ✅ Database migrations ready
- ✅ Understanding of PostgreSQL RLS

---

## Step-by-Step Setup

### Step 1: Run Database Migrations

**Run all 9 white-label migrations in order:**

```bash
cd /workspaces/fix2
psql "$DATABASE_URL" -f supabase/migrations/20251223_add_tenant_id_columns.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_licenses.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_tenant_branding.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_tenant_domains.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_demo_tenant.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_backfill_default_tenant.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_employer_applications.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_staff_applications.sql
psql "$DATABASE_URL" -f supabase/migrations/20251223_tenant_rls_policies.sql
```

**Or via Supabase Dashboard:**

1. Go to SQL Editor
2. Copy/paste each migration file
3. Run in order

---

### Step 2: Verify Migrations

```sql
-- Check tenant_id columns exist
SELECT table_name, column_name
FROM information_schema.columns
WHERE column_name = 'tenant_id'
ORDER BY table_name;

-- Should return 13+ tables

-- Check default tenant exists
SELECT * FROM tenants WHERE slug = 'elevate-for-humanity';

-- Check RLS policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE policyname LIKE '%tenant%';
```

---

### Step 3: Create Your First Tenant

```sql
-- Insert new tenant
INSERT INTO tenants (name, slug, status)
VALUES ('ACME Corporation', 'acme', 'active')
RETURNING id;

-- Create license for tenant
INSERT INTO licenses (tenant_id, tier, status, max_users, max_programs, valid_from, valid_until)
VALUES (
  'tenant-id-from-above',
  'pro',
  'active',
  1000,
  50,
  NOW(),
  NOW() + INTERVAL '1 year'
);

-- Set up branding
INSERT INTO tenant_branding (tenant_id, logo_url, primary_color, secondary_color)
VALUES (
  'tenant-id-from-above',
  'https://acme.com/logo.png',
  '#0066CC',
  '#FF6600'
);

-- Add custom domain
INSERT INTO tenant_domains (tenant_id, domain, is_primary, verified)
VALUES (
  'tenant-id-from-above',
  'training.acme.com',
  true,
  false  -- Will be verified later
);
```

---

### Step 4: Configure Middleware

**Create tenant resolution middleware:**

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get hostname
  const hostname = request.headers.get('host') || '';

  // Resolve tenant from domain
  const tenant = await resolveTenant(hostname);

  // Set tenant context in cookie for client-side
  response.cookies.set('tenant_id', tenant.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}

async function resolveTenant(hostname: string) {
  // Check custom domains first
  const customDomain = await supabase
    .from('tenant_domains')
    .select('tenant_id, tenants(*)')
    .eq('domain', hostname)
    .eq('verified', true)
    .single();

  if (customDomain.data) {
    return customDomain.data.tenants;
  }

  // Check subdomain
  const subdomain = hostname.split('.')[0];
  const tenant = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', subdomain)
    .single();

  if (tenant.data) {
    return tenant.data;
  }

  // Default tenant
  return await supabase
    .from('tenants')
    .select('*')
    .eq('slug', 'elevate-for-humanity')
    .single()
    .then((r) => r.data);
}
```

---

### Step 5: Set Tenant Context in Database

**Create helper function:**

```typescript
// lib/supabase/tenant.ts
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function setTenantContext() {
  const supabase = await createClient();
  const cookieStore = cookies();
  const tenantId = cookieStore.get('tenant_id')?.value;

  if (tenantId) {
    // Set tenant context for RLS policies
    await supabase.rpc('set_config', {
      setting: 'app.current_tenant_id',
      value: tenantId,
    });
  }
}
```

**Use in server components:**

```typescript
// app/dashboard/page.tsx
import { setTenantContext } from '@/lib/supabase/tenant';

export default async function DashboardPage() {
  await setTenantContext();

  // Now all queries are automatically filtered by tenant_id
  const { data: courses } = await supabase
    .from('courses')
    .select('*');

  return <div>{/* ... */}</div>;
}
```

---

### Step 6: Configure DNS

**For custom domains:**

**Customer's DNS:**

```
CNAME training.acme.com → elevateforhumanity.org
```

**Vercel Configuration:**

1. Go to Vercel Dashboard
2. Add domain: `training.acme.com`
3. Verify DNS
4. SSL certificate auto-generated

**For subdomains:**

```
*.elevateforhumanity.org → Vercel deployment
```

---

### Step 7: Verify Domain

```sql
-- Mark domain as verified after DNS is configured
UPDATE tenant_domains
SET verified = true
WHERE domain = 'training.acme.com';
```

---

### Step 8: Test Tenant Isolation

**Create test script:**

```typescript
// scripts/test-tenant-isolation.ts
import { createClient } from '@supabase/supabase-js';

async function testIsolation() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  // Get two tenants
  const { data: tenants } = await supabase.from('tenants').select('*').limit(2);

  const [tenantA, tenantB] = tenants;

  // Create course for Tenant A
  await supabase.rpc('set_config', {
    setting: 'app.current_tenant_id',
    value: tenantA.id,
  });

  const { data: courseA } = await supabase
    .from('courses')
    .insert({ title: 'Course A', tenant_id: tenantA.id })
    .select()
    .single();

  // Switch to Tenant B
  await supabase.rpc('set_config', {
    setting: 'app.current_tenant_id',
    value: tenantB.id,
  });

  // Try to access Course A (should fail)
  const { data: courses } = await supabase.from('courses').select('*');

  console.log('Tenant B courses:', courses);
  console.log(
    'Should NOT include Course A:',
    !courses.some((c) => c.id === courseA.id)
  );
}

testIsolation();
```

---

## Environment Variables

**Required:**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# Vercel (for custom domains)
VERCEL_TOKEN=your-vercel-token
```

---

## Tenant Onboarding Checklist

### For Each New Tenant:

- [ ] **1. Create tenant record**

  ```sql
  INSERT INTO tenants (name, slug) VALUES ('Company Name', 'company-slug');
  ```

- [ ] **2. Create license**

  ```sql
  INSERT INTO licenses (tenant_id, tier, status, valid_until) VALUES (...);
  ```

- [ ] **3. Set up branding**

  ```sql
  INSERT INTO tenant_branding (tenant_id, logo_url, primary_color) VALUES (...);
  ```

- [ ] **4. Configure domain**

  ```sql
  INSERT INTO tenant_domains (tenant_id, domain) VALUES (...);
  ```

- [ ] **5. Customer configures DNS**
  - CNAME record pointing to your domain

- [ ] **6. Add domain to Vercel**
  - Vercel dashboard → Add domain

- [ ] **7. Verify domain**

  ```sql
  UPDATE tenant_domains SET verified = true WHERE domain = '...';
  ```

- [ ] **8. Create admin user**

  ```sql
  INSERT INTO profiles (id, email, role, tenant_id) VALUES (...);
  ```

- [ ] **9. Import initial data (optional)**
  - Programs, courses, users

- [ ] **10. Test access**
  - Visit custom domain
  - Verify branding
  - Test data isolation

---

## Troubleshooting

### Issue: RLS policies blocking queries

**Symptom:** Queries return empty results

**Solution:**

```typescript
// Ensure tenant context is set
await supabase.rpc('set_config', {
  setting: 'app.current_tenant_id',
  value: tenantId,
});
```

---

### Issue: Cross-tenant data visible

**Symptom:** User sees data from other tenants

**Solution:**

```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('courses', 'enrollments', 'programs');

-- Enable RLS if missing
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
```

---

### Issue: Custom domain not working

**Symptom:** 404 or SSL errors

**Solution:**

1. Verify DNS: `dig training.acme.com`
2. Check Vercel domain configuration
3. Wait for SSL certificate (can take 24 hours)
4. Verify domain in database:
   ```sql
   SELECT * FROM tenant_domains WHERE domain = 'training.acme.com';
   ```

---

### Issue: License not enforced

**Symptom:** Users accessing features they shouldn't

**Solution:**

```typescript
// Add license check middleware
import { requireActiveLicense } from '@/lib/licensing/requireActiveLicense';

export async function GET(request: Request) {
  await requireActiveLicense(tenantId, 'ai_tutor');
  // ... rest of handler
}
```

---

## Performance Optimization

### Indexing Strategy

```sql
-- Ensure tenant_id indexes exist
CREATE INDEX IF NOT EXISTS idx_courses_tenant ON courses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_tenant ON enrollments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_programs_tenant ON programs(tenant_id);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_courses_tenant_status
ON courses(tenant_id, status);

CREATE INDEX IF NOT EXISTS idx_enrollments_tenant_user
ON enrollments(tenant_id, user_id);
```

---

### Caching Strategy

```typescript
// Cache tenant data (rarely changes)
import { unstable_cache } from 'next/cache';

export const getTenant = unstable_cache(
  async (tenantId: string) => {
    return await supabase
      .from('tenants')
      .select('*, tenant_branding(*), licenses(*)')
      .eq('id', tenantId)
      .single();
  },
  ['tenant'],
  { revalidate: 3600 } // 1 hour
);
```

---

## Monitoring

### Key Metrics to Track

**Per Tenant:**

- Active users
- Storage usage
- API calls
- License compliance

**System-Wide:**

- Total tenants
- Database size
- Query performance
- Error rates

**Alerts:**

- License expiration (30 days before)
- Storage quota exceeded
- High error rate per tenant
- Slow queries

---

## Backup Strategy

### Automated Backups

**Supabase:**

- Daily automated backups
- 7-day point-in-time recovery
- Manual backups before major changes

**Per-Tenant Export:**

```bash
# Export all data for a tenant
./scripts/export-tenant-data.sh tenant-id
```

---

## Security Checklist

- [ ] RLS enabled on all tenant-scoped tables
- [ ] Tenant context set in all server-side queries
- [ ] License checks in place for premium features
- [ ] Domain verification before activation
- [ ] Rate limiting per tenant
- [ ] Audit logging for sensitive operations
- [ ] Regular security audits
- [ ] Penetration testing (quarterly)

---

## Scaling Considerations

### Current Capacity

**Single deployment handles:**

- 1-100 tenants easily
- 10,000+ total users
- 1TB database

### Scaling Triggers

**Add read replicas when:**

- Query latency > 100ms
- Database CPU > 70%
- 100+ tenants

**Consider sharding when:**

- 1000+ tenants
- 10TB+ database
- Regional compliance requirements

---

## Support

### Customer Support

**Tenant Admin Portal:**

- License management
- Branding configuration
- Domain management
- Usage analytics

**Support Channels:**

- Email: licensing@elevateforhumanity.org
- Documentation: /docs/white-label
- Status page: status.elevateforhumanity.org

---

## Next Steps

After setup:

1. ✅ Test tenant isolation
2. ✅ Configure monitoring
3. ✅ Set up alerts
4. ✅ Train tenant admins
5. ✅ Go live

**Estimated Setup Time:** 2-4 hours per tenant
