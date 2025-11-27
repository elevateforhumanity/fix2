# LMS Subdomain Setup Guide

## 🎯 Recommended Structure:

- `elevateforhumanity.org` → Marketing site (homepage, programs, about)
- `lms.elevateforhumanity.org` → LMS platform (courses, lessons, student dashboard)
- `admin.elevateforhumanity.org` → Admin console (staff, analytics, management)

---

## 🚀 Setup in Vercel:

### 1. Add Subdomains to Vercel Project

```bash
# In Vercel dashboard:
1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql
2. Settings → Domains
3. Add domains:
   - lms.elevateforhumanity.org
   - admin.elevateforhumanity.org
```

### 2. Configure DNS (in your domain registrar)

Add CNAME records:
```
lms.elevateforhumanity.org    → CNAME → cname.vercel-dns.com
admin.elevateforhumanity.org  → CNAME → cname.vercel-dns.com
```

---

## 📝 Update Next.js Configuration

### Option 1: Middleware-based routing (Recommended)

Update `middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // LMS subdomain
  if (hostname.startsWith('lms.')) {
    return NextResponse.rewrite(new URL('/lms/dashboard', request.url));
  }
  
  // Admin subdomain
  if (hostname.startsWith('admin.')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  // Default: marketing site
  return NextResponse.next();
}
```

### Option 2: Separate Vercel Projects

Deploy 3 separate projects:
1. `fix2-marketing` → elevateforhumanity.org
2. `fix2-lms` → lms.elevateforhumanity.org
3. `fix2-admin` → admin.elevateforhumanity.org

---

## ✅ Benefits:

1. **Clear separation** - Users know where they are
2. **Better SEO** - Separate sitemaps for each
3. **Easier debugging** - Isolated logs and errors
4. **Professional** - Industry standard approach
5. **Scalability** - Can scale each independently

---

## 🔧 Quick Implementation:

Run this to set up middleware:

```bash
# Update middleware
cat > middleware.ts << 'MIDDLEWARE'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  if (hostname.includes('lms.')) {
    return NextResponse.rewrite(new URL('/lms/dashboard', request.url));
  }
  
  if (hostname.includes('admin.')) {
    return NextResponse.rewrite(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
MIDDLEWARE

# Commit and deploy
git add middleware.ts
git commit -m "Add subdomain routing for LMS and Admin"
git push origin main
```

---

## 📊 Current Status:

- ✅ LMS exists at `/lms`
- ✅ Admin exists at `/admin`
- ❌ No subdomain routing yet
- ❌ DNS not configured

**Next Step**: Add subdomains in Vercel dashboard, then configure DNS.
