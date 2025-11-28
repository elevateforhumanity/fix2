# 🔐 Admin Portal Subdomain Setup

## Admin Portal Domain

### Primary Domain: www.elevateconnectsdirectory.org
- **URL**: https://www.elevateconnectsdirectory.org
- **Purpose**: Complete admin portal, course builders, digital binders, internal tools
- **Benefits**: Separate domain, completely isolated from public site
- **What's Included**:
  - Admin dashboard
  - Course builders
  - Digital binders/workbooks
  - Document management
  - Program holder portal
  - Staff portal
  - Workforce board portal
  - All internal tools

---

## Setup Instructions

### Step 1: Configure DNS for elevateconnectsdirectory.org

**Where**: Your domain registrar for elevateconnectsdirectory.org

**Option A: Point to Vercel (Recommended)**

**Add A Records**:
```
Type: A
Name: @ (root domain)
Value: 76.76.21.21
TTL: 3600

Type: A
Name: www
Value: 76.76.21.21
TTL: 3600
```

**OR Add CNAME Record** (if registrar supports CNAME flattening):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Example - GoDaddy**:
1. Log in to GoDaddy
2. Go to "My Products" → "DNS" for elevateconnectsdirectory.org
3. Click "Add" under Records
4. Add A record:
   - Type: A
   - Name: @
   - Value: 76.76.21.21
   - TTL: 1 Hour
5. Add another A record:
   - Type: A
   - Name: www
   - Value: 76.76.21.21
   - TTL: 1 Hour
6. Save all changes

---

### Step 2: Configure Vercel

**Where**: Vercel Dashboard (https://vercel.com)

1. **Go to Your Project**
   - Navigate to fix2 project
   - Click "Settings"

2. **Add Domain**
   - Click "Domains" tab
   - Click "Add"
   - Enter: `elevateconnectsdirectory.org`
   - Click "Add"
   - Also add: `www.elevateconnectsdirectory.org`

3. **Verify Domain**
   - Vercel will verify DNS automatically
   - Wait 5-10 minutes for propagation
   - Status will change to "Valid"
   - SSL certificate will be issued automatically

4. **Set Primary Domain**
   - Make `www.elevateconnectsdirectory.org` the primary
   - Redirect `elevateconnectsdirectory.org` → `www.elevateconnectsdirectory.org`

---

### Step 3: Update Middleware (Already Done)

The middleware file at `/middleware.ts` already protects admin routes:

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');
    
    if (!token && !pathname.startsWith('/admin/login')) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
```

---

### Step 4: Update Environment Variables

Add to `.env.local`:

```bash
# Admin Portal Domain
NEXT_PUBLIC_ADMIN_DOMAIN=admin.elevateforhumanity.org
NEXT_PUBLIC_MAIN_DOMAIN=elevateforhumanity.org

# Admin Portal URL
NEXT_PUBLIC_ADMIN_URL=https://admin.elevateforhumanity.org
NEXT_PUBLIC_MAIN_URL=https://elevateforhumanity.org
```

---

### Step 5: Configure Vercel Rewrites (Optional)

If you want admin.elevateforhumanity.org to ONLY show admin content:

**Create/Update `vercel.json`**:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/admin/:path*",
      "has": [
        {
          "type": "host",
          "value": "admin.elevateforhumanity.org"
        }
      ]
    }
  ],
  "headers": [
    {
      "source": "/admin/:path*",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}
```

This configuration:
- Routes admin.elevateforhumanity.org to /admin routes
- Prevents search engines from indexing admin pages

---

## Alternative: Separate Vercel Project

For maximum security, deploy admin portal as a separate project:

### Benefits:
- Complete isolation
- Separate deployments
- Different access controls
- No risk of public exposure

### Setup:

1. **Create New Vercel Project**
   - Name: `elevate-admin-portal`
   - Import from same GitHub repo
   - Root directory: `/` (same repo)

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Set Environment Variables**
   - Copy all env vars from main project
   - Add: `ADMIN_ONLY=true`

4. **Add Domain**
   - Domain: `admin.elevateforhumanity.org`
   - Configure DNS as above

5. **Update Middleware**
   - Only allow /admin routes
   - Redirect all other routes to main site

---

## Security Enhancements

### 1. IP Whitelist (Vercel Pro)

Restrict admin portal to specific IPs:

**In Vercel Dashboard**:
- Settings → Security
- Add IP addresses:
  - Office IP
  - Staff home IPs
  - VPN IP range

### 2. Basic Auth (Quick Protection)

Add to `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/admin/(.*)",
      "headers": {
        "WWW-Authenticate": "Basic realm=\"Admin Portal\""
      },
      "status": 401,
      "continue": true
    }
  ]
}
```

### 3. Two-Factor Authentication

Implement 2FA for admin login:
- Use NextAuth with 2FA provider
- Require 2FA for all admin accounts
- Store 2FA secrets securely

### 4. Session Management

- Short session timeout (30 minutes)
- Require re-authentication for sensitive actions
- Log all admin activities
- Monitor for suspicious behavior

---

## Testing Checklist

After setup, verify:

- [ ] admin.elevateforhumanity.org loads correctly
- [ ] Redirects to login if not authenticated
- [ ] Main site (elevateforhumanity.org) still works
- [ ] SSL certificate is valid
- [ ] No admin pages accessible from main domain
- [ ] Search engines cannot index admin pages
- [ ] Mobile access works
- [ ] All admin features function correctly

---

## DNS Propagation

**How long?**
- Usually 5-30 minutes
- Can take up to 48 hours globally
- Check status: https://dnschecker.org

**Check if it's working**:
```bash
# Check DNS
nslookup admin.elevateforhumanity.org

# Check HTTPS
curl -I https://admin.elevateforhumanity.org
```

---

## Rollback Plan

If something goes wrong:

1. **Remove DNS Record**
   - Delete CNAME from domain registrar
   - Wait 5-10 minutes

2. **Remove from Vercel**
   - Settings → Domains
   - Remove admin.elevateforhumanity.org

3. **Access via main domain**
   - Use elevateforhumanity.org/admin
   - Everything still works

---

## Cost

**Vercel Hobby (Free)**:
- Unlimited domains
- Automatic HTTPS
- No extra cost

**Vercel Pro ($20/month)**:
- IP whitelisting
- Advanced security
- Priority support
- Team collaboration

**Domain Cost**:
- Already own elevateforhumanity.org
- Subdomain is FREE
- No additional domain purchase needed

---

## Recommended Setup

**For Now (Free)**:
1. Add CNAME: admin.elevateforhumanity.org
2. Configure in Vercel
3. Use middleware for protection
4. Test thoroughly

**Future (When Budget Allows)**:
1. Upgrade to Vercel Pro
2. Add IP whitelist
3. Implement 2FA
4. Set up monitoring

---

## Quick Start Commands

```bash
# 1. Update middleware (already done)
# File: /middleware.ts

# 2. Add to .env.local
echo "NEXT_PUBLIC_ADMIN_DOMAIN=admin.elevateforhumanity.org" >> .env.local

# 3. Commit changes
git add -A
git commit -m "feat: configure admin subdomain"
git push origin main

# 4. Configure DNS (manual step in registrar)
# 5. Add domain in Vercel (manual step in dashboard)
# 6. Wait for DNS propagation
# 7. Test: https://admin.elevateforhumanity.org
```

---

## Support

**DNS Issues**: Contact your domain registrar
**Vercel Issues**: https://vercel.com/support
**SSL Issues**: Vercel handles automatically

---

## Next Steps

1. ✅ Middleware created (protects admin routes)
2. ⏳ Add DNS CNAME record
3. ⏳ Configure in Vercel
4. ⏳ Test subdomain
5. ⏳ Update documentation
6. ⏳ Train staff on new URL

---

*Admin portal will be accessible at: https://admin.elevateforhumanity.org*
