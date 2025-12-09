# Admin Routes Security Update

## Summary

- **Secured:** 28 routes
- **Skipped:** 1 routes  
- **Errors:** 0 routes
- **Backup:** backups/admin-routes-20251209-170723

## What Was Done

All admin API routes have been updated to require authentication using `withAuth()`.

### Changes Applied

**Before:**
```typescript
export async function GET(req: NextRequest) {
  // No auth check
}
```

**After:**
```typescript
import { withAuth } from '@/lib/withAuth';

export const GET = withAuth(
  async (req, context, user) => {
    // Only admins can access
  },
  { roles: ['admin', 'super_admin'] }
);
```

## Next Steps

1. **Check TypeScript:**
   ```bash
   pnpm typecheck
   ```

2. **Fix any errors** in routes that need manual adjustment

3. **Test endpoints:**
   - Without auth (should return 401)
   - With admin auth (should work)
   - With student auth (should return 403)

4. **Deploy:**
   ```bash
   git add .
   git commit -m "security: add authentication to all admin API routes"
   git push origin main
   ```

## Rollback if Needed

```bash
cp -r backups/admin-routes-20251209-170723/app/api/admin/* app/api/admin/
```

## Testing

```bash
# Should fail (401)
curl https://www.elevateforhumanity.org/api/admin/applications/1

# Should work with admin token
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://www.elevateforhumanity.org/api/admin/applications/1
```
