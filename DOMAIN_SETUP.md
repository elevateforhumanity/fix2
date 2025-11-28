# Domain Setup for elevateconnectsdirectory.org

## Issue
The domain `www.elevateconnectsdirectory.org` is returning 404 - DEPLOYMENT_NOT_FOUND.

## Root Cause
The domain is not configured in Vercel's project settings.

## Solution

### Step 1: Add Domain in Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `fix2` project (or your project name)
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `elevateconnectsdirectory.org`
6. Click **Add**
7. Also add: `www.elevateconnectsdirectory.org`

### Step 2: Configure DNS Records
Add these DNS records at your domain registrar:

**For elevateconnectsdirectory.org:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.elevateconnectsdirectory.org:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify Configuration
The proxy.ts file is already configured to handle this domain:
- Routes to `/admin` by default
- Requires authentication
- Redirects to `/admin/login` if not authenticated

### Step 4: Test
Once DNS propagates (can take up to 48 hours):
```bash
curl -I https://www.elevateconnectsdirectory.org/
curl -I https://www.elevateconnectsdirectory.org/admin
```

## Current Configuration

### proxy.ts (Lines 76-120)
```typescript
if (hostname.includes('elevateconnectsdirectory.org')) {
  // Allow login pages
  if (path.startsWith('/admin/login') || 
      path.startsWith('/program-holder/login') ||
      path.startsWith('/staff/login') ||
      path.startsWith('/workforce-board/login') ||
      path === '/login') {
    return NextResponse.next();
  }

  // Check authentication and redirect to appropriate login
  // ...
}
```

## Expected Behavior
- `https://www.elevateconnectsdirectory.org/` → Redirects to `/admin/login`
- `https://www.elevateconnectsdirectory.org/admin` → Shows admin dashboard (if authenticated)
- `https://www.elevateconnectsdirectory.org/admin/login` → Shows login page

## Notes
- This is the "back office" domain for internal staff/admin access
- Main public site remains at `www.elevateforhumanity.org`
- All routes on this domain require authentication except login pages
