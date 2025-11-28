# 🏢 Back Office Domain Setup - elevateconnectsdirectory.org

## Overview

**Public Website**: www.elevateforhumanity.org
- Student-facing content
- Program information
- Public applications
- Marketing pages

**Back Office**: www.elevateconnectsdirectory.org
- Admin portal
- Course builders
- Digital binders/workbooks
- Program holder portal
- Staff portal
- Workforce board portal
- Document management
- All internal tools

---

## What Goes on Back Office Domain

### Admin Tools
- `/admin` - Full admin dashboard
- `/admin/course-builder` - Course creation tools
- `/admin/documents` - Document management
- `/admin/grants` - Grant revenue tracking
- `/admin/reports` - All reporting tools
- `/admin/compliance` - Compliance tracking
- `/admin/hr` - HR and payroll

### Program Holder Portal
- `/program-holder/portal` - Program holder dashboard
- `/program-holder/students` - Student management
- `/program-holder/attendance` - Attendance tracking
- `/program-holder/reports` - Program reports
- `/program-holder/syllabus` - Master syllabus & LMS import

### Staff Portal
- `/staff-portal` - Staff dashboard
- `/staff-portal/students` - Student management
- `/staff-portal/courses` - Course management
- `/staff-portal/messages` - Communication tools

### Workforce Board Portal
- `/workforce-board` - Workforce board dashboard
- `/workforce-board/participants` - WIOA participant tracking
- `/workforce-board/reports` - PIRL reporting
- `/workforce-board/compliance` - Compliance monitoring

### Digital Tools
- `/digital-binders` - Digital workbooks and binders
- `/course-builder` - Course creation interface
- `/content-library` - Internal content library
- `/templates` - Document templates
- `/training` - Staff training materials

---

## DNS Configuration

### Step 1: Configure DNS at Registrar

**Domain**: elevateconnectsdirectory.org

**Add These Records**:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: A  
Name: www
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: *
Value: cname.vercel-dns.com
TTL: 3600
```

This allows:
- elevateconnectsdirectory.org
- www.elevateconnectsdirectory.org
- Any subdomain (admin.elevateconnectsdirectory.org, etc.)

---

## Vercel Configuration

### Step 1: Add Domain to Vercel

1. Go to Vercel Dashboard
2. Select your project (fix2)
3. Settings → Domains
4. Add these domains:
   - `elevateconnectsdirectory.org`
   - `www.elevateconnectsdirectory.org`

### Step 2: Configure Redirects

In Vercel, set:
- `elevateconnectsdirectory.org` → `www.elevateconnectsdirectory.org` (redirect)
- `www.elevateconnectsdirectory.org` → Primary domain

### Step 3: Update vercel.json

Already configured with security headers to prevent indexing of internal tools.

---

## Middleware Configuration

Update `/middleware.ts` to handle both domains:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Back office domain - require authentication for everything
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // Allow login pages
    if (pathname.startsWith('/admin/login') || 
        pathname.startsWith('/program-holder/login') ||
        pathname.startsWith('/staff/login')) {
      return NextResponse.next();
    }

    // Check authentication
    const token = request.cookies.get('auth-token') || 
                  request.cookies.get('admin-token') ||
                  request.cookies.get('staff-token');
    
    if (!token) {
      // Redirect to appropriate login based on path
      if (pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin/login?redirect=' + pathname, request.url));
      }
      if (pathname.startsWith('/program-holder')) {
        return NextResponse.redirect(new URL('/program-holder/login?redirect=' + pathname, request.url));
      }
      if (pathname.startsWith('/staff')) {
        return NextResponse.redirect(new URL('/staff/login?redirect=' + pathname, request.url));
      }
      // Default to admin login
      return NextResponse.redirect(new URL('/admin/login?redirect=' + pathname, request.url));
    }
  }

  // Main public domain - protect specific routes
  if (hostname.includes('elevateforhumanity.org')) {
    // Protect admin routes on public domain
    if (pathname.startsWith('/admin') || 
        pathname.startsWith('/program-holder') ||
        pathname.startsWith('/staff-portal') ||
        pathname.startsWith('/workforce-board')) {
      
      const token = request.cookies.get('admin-token');
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/program-holder/:path*',
    '/staff-portal/:path*',
    '/workforce-board/:path*',
    '/digital-binders/:path*',
    '/course-builder/:path*',
  ],
};
```

---

## Environment Variables

Add to `.env.local`:

```bash
# Domain Configuration
NEXT_PUBLIC_PUBLIC_DOMAIN=www.elevateforhumanity.org
NEXT_PUBLIC_BACK_OFFICE_DOMAIN=www.elevateconnectsdirectory.org

# URLs
NEXT_PUBLIC_PUBLIC_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_BACK_OFFICE_URL=https://www.elevateconnectsdirectory.org

# API Endpoints
NEXT_PUBLIC_API_URL=https://www.elevateconnectsdirectory.org/api
```

---

## Navigation Updates

### Create Back Office Home Page

**File**: `/app/page.tsx` (when on back office domain)

Detect domain and show appropriate content:

```typescript
import { headers } from 'next/headers';

export default function HomePage() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  
  // Back office domain
  if (host.includes('elevateconnectsdirectory.org')) {
    return <BackOfficeHomePage />;
  }
  
  // Public domain
  return <PublicHomePage />;
}
```

### Back Office Navigation

Create `/components/BackOfficeNav.tsx`:

```typescript
export function BackOfficeNav() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl">
              Elevate Connects Directory
            </Link>
            <div className="flex gap-4">
              <Link href="/admin">Admin</Link>
              <Link href="/program-holder/portal">Program Holders</Link>
              <Link href="/staff-portal">Staff</Link>
              <Link href="/workforce-board">Workforce Board</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://www.elevateforhumanity.org" target="_blank">
              View Public Site →
            </Link>
            <button>Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

---

## Security Features

### 1. No Public Access
- Entire back office domain requires authentication
- No pages indexed by search engines
- X-Robots-Tag: noindex, nofollow on all pages

### 2. Role-Based Access
- Admin: Full access to everything
- Program Holders: Only their portal and students
- Staff: Only staff portal and assigned students
- Workforce Board: Only participant tracking and reports

### 3. Session Management
- 30-minute timeout for inactivity
- Secure cookies (httpOnly, secure, sameSite)
- Automatic logout on browser close

### 4. Audit Logging
- Log all logins
- Log all data access
- Log all changes
- Monitor for suspicious activity

---

## What Stays on Public Domain

### Public Pages (elevateforhumanity.org)
- Homepage
- About Us
- Programs
- Apply Now
- Contact
- Blog
- Success Stories
- Funding Information
- FAQ
- Student Portal (after login)
- Student Orientation

### Student-Facing Tools
- `/student` - Student dashboard (after login)
- `/lms` - Learning management system (after login)
- `/orientation` - Student orientation
- `/apply` - Application forms
- `/enroll` - Enrollment process

---

## Migration Checklist

### Phase 1: DNS Setup
- [ ] Configure DNS for elevateconnectsdirectory.org
- [ ] Add A records pointing to Vercel
- [ ] Wait for DNS propagation (5-30 minutes)

### Phase 2: Vercel Configuration
- [ ] Add domain in Vercel dashboard
- [ ] Verify domain ownership
- [ ] Configure SSL (automatic)
- [ ] Set up redirects

### Phase 3: Code Updates
- [ ] Update middleware.ts
- [ ] Add environment variables
- [ ] Create back office home page
- [ ] Update navigation components
- [ ] Test authentication flows

### Phase 4: Testing
- [ ] Test admin portal access
- [ ] Test program holder portal
- [ ] Test staff portal
- [ ] Test workforce board portal
- [ ] Verify authentication works
- [ ] Verify redirects work
- [ ] Test on mobile devices

### Phase 5: Launch
- [ ] Update documentation
- [ ] Train staff on new URL
- [ ] Send announcement email
- [ ] Update bookmarks/shortcuts
- [ ] Monitor for issues

---

## Staff Communication

### Email Template

**Subject**: New Back Office Portal - elevateconnectsdirectory.org

Hi Team,

We've launched a new dedicated back office portal for all internal tools!

**New URL**: https://www.elevateconnectsdirectory.org

**What's There**:
- Admin dashboard
- Course builders
- Digital binders
- Program holder portal
- Staff portal
- All internal tools

**Your Login**:
- Use your existing username and password
- Bookmark the new URL
- Update any saved links

**Public Website** (unchanged):
- https://www.elevateforhumanity.org
- For students and public

Questions? Contact IT support.

---

## Troubleshooting

### Can't Access Back Office
1. Check you're using correct URL: www.elevateconnectsdirectory.org
2. Clear browser cache and cookies
3. Try incognito/private browsing
4. Verify your account has proper permissions

### DNS Not Working
1. Check DNS propagation: https://dnschecker.org
2. Wait up to 48 hours for full propagation
3. Try different network (mobile data vs WiFi)
4. Contact domain registrar if issues persist

### SSL Certificate Error
1. Wait 10-15 minutes after adding domain
2. Vercel issues certificates automatically
3. Check Vercel dashboard for status
4. Contact Vercel support if needed

---

## Cost

**Domain**: elevateconnectsdirectory.org
- Already owned: $0
- Annual renewal: ~$12-15/year

**Vercel Hosting**:
- Hobby plan: FREE (includes custom domains)
- Pro plan: $20/month (if needed for advanced features)

**SSL Certificate**:
- FREE (automatic via Vercel)

**Total Additional Cost**: $0 (using existing resources)

---

## Timeline

**Day 1**: Configure DNS (5 minutes)
**Day 1**: Add domain to Vercel (5 minutes)
**Day 1**: Wait for DNS propagation (30 minutes - 48 hours)
**Day 2**: Update code and deploy (2 hours)
**Day 2**: Test all features (1 hour)
**Day 3**: Train staff and launch (1 hour)

**Total**: 2-3 days from start to full launch

---

## Support

**Technical Issues**: support@elevateforhumanity.org
**DNS Questions**: Contact domain registrar
**Vercel Issues**: https://vercel.com/support

---

*Back office portal: www.elevateconnectsdirectory.org - Your internal command center!*
