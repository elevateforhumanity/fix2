# Apply Auth Guards to All Protected Routes

## Routes That Need Auth Guards

### Staff Portal (advisor, admin, super_admin)

- ✅ /app/staff-portal/page.tsx - APPLIED
- ⏳ /app/staff-portal/campaigns/page.tsx
- ⏳ /app/staff-portal/customer-service/page.tsx
- ⏳ /app/staff-portal/students/page.tsx
- ⏳ /app/staff-portal/courses/page.tsx
- ⏳ /app/staff-portal/qa-checklist/page.tsx
- ⏳ /app/staff-portal/dashboard/page.tsx
- ⏳ /app/staff-portal/processes/page.tsx
- ⏳ /app/staff-portal/training/page.tsx

### Student Portal (student)

- ⏳ /app/student/dashboard/page.tsx
- ⏳ /app/student/milady-lms/page.tsx

### Partner Portal (partner)

- ⏳ /app/partner/dashboard/page.tsx
- ⏳ /app/program-holder/portal/live-qa/page.tsx

### Admin Areas (admin, super_admin)

- ⏳ /app/community/admins/page.tsx
- ⏳ /app/usermanagement/page.tsx

### Onboarding (role-specific)

- ⏳ /app/onboarding/staff/page.tsx
- ⏳ /app/onboarding/staff/orientation/page.tsx

## Pattern to Apply

```typescript
// OLD (insecure)
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // ... rest of page
}

// NEW (secure with RBAC)
import { requireAuth } from '@/lib/auth-guard';
import { requireRole } from '@/lib/rbac-guard';

export default async function ProtectedPage() {
  const session = await requireAuth();
  requireRole(session, ['admin', 'super_admin', 'advisor']);

  // ... rest of page
}
```

## Role Mappings

### Staff Portal

```typescript
requireRole(session, ['admin', 'super_admin', 'advisor']);
```

### Student Portal

```typescript
requireRole(session, ['student']);
```

### Partner Portal

```typescript
requireRole(session, ['partner', 'program_holder']);
```

### Admin Only

```typescript
requireRole(session, ['admin', 'super_admin']);
```

### Super Admin Only

```typescript
requireRole(session, ['super_admin']);
```

## API Routes That Need Guards

### Credentials

- ✅ /app/api/credentials/verify/route.ts - PUBLIC (no guard needed)
- ✅ /app/api/credentials/issue/route.ts - APPLIED
- ⏳ /app/api/credentials/revoke/route.ts
- ⏳ /app/api/credentials/share/route.ts

### Intake

- ✅ /app/api/intake/interest/route.ts - PUBLIC (no guard needed)
- ⏳ /app/api/intake/eligibility/route.ts - PUBLIC (no guard needed)
- ⏳ /app/api/intake/application/route.ts - PUBLIC (no guard needed)

### Admin APIs

- ⏳ All /app/api/admin/\* routes need guards

## Implementation Script

Run this to apply guards to all routes:

```bash
# Find all protected routes
find app -name "page.tsx" | grep -E "(staff|admin|student|partner|dashboard)" > protected_routes.txt

# For each route, check if it has auth guard
while read route; do
  if ! grep -q "requireAuth\|requireRole" "$route"; then
    echo "❌ Missing auth guard: $route"
  else
    echo "✅ Has auth guard: $route"
  fi
done < protected_routes.txt
```

## Verification Checklist

After applying guards:

1. ✅ All staff portal pages require advisor/admin role
2. ✅ All student portal pages require student role
3. ✅ All partner portal pages require partner role
4. ✅ All admin pages require admin/super_admin role
5. ✅ All API routes have appropriate guards
6. ✅ Public routes (verify, intake) remain public
7. ✅ Auth redirects to /login with ?next= parameter
8. ✅ Role checks redirect to /unauthorized

## Testing

Test each protected route:

```bash
# Test without auth (should redirect to /login)
curl http://localhost:3000/staff-portal

# Test with wrong role (should redirect to /unauthorized)
# Login as student, try to access /staff-portal

# Test with correct role (should work)
# Login as admin, access /staff-portal
```

## Status

- **Applied**: 2 routes
- **Remaining**: ~50 routes
- **Estimated Time**: 2 hours to apply all guards
