# 🌐 Final Domain Structure

## Public Website: www.elevateforhumanity.org

### Public Pages (No Login Required)
- Homepage
- About Us
- Programs (all program listings)
- Apply Now
- Contact
- Blog
- Success Stories
- Funding Information
- FAQ
- Careers

### Program Holder Pages (Public-Facing)
- `/program-holder` - Program holder information page
- `/program-holder/apply` - Become a program holder
- `/program-holder/benefits` - Benefits of partnering
- `/program-holder/mou` - Partnership agreement signing
- `/partners/create-program` - Create funded program application
- `/partners/training-provider` - Training provider information

### Employer Pages (Public-Facing)
- `/employers` - Employer partnership information
- `/employer/benefits` - Benefits of hiring our graduates
- `/employer/post-job` - Post job opportunities
- `/employer/hire` - Hiring process
- `/partners/mou` - Employer partnership agreement

### Student Portal (After Login)
- `/student` - Student dashboard
- `/student/hub` - Course hub
- `/student/calendar` - Student calendar
- `/lms` - Learning management system
- `/orientation` - Student orientation
- `/enroll` - Enrollment process

---

## Back Office: www.elevateconnectsdirectory.org

### Admin Portal (Admin Only)
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/programs` - Program management
- `/admin/reports` - All reporting
- `/admin/compliance` - Compliance tracking
- `/admin/grants` - Grant revenue management
- `/admin/documents` - Document management
- `/admin/site-health` - Site monitoring

### HR & Payroll (Admin/HR Only)
- `/admin/hr` - HR dashboard
- `/admin/hr/employees` - Employee management
- `/admin/hr/payroll` - Payroll processing
- `/admin/hr/time` - Time tracking
- `/admin/hr/leave` - Leave management
- `/admin/payroll-cards` - Payroll card setup

### Course Creation Tools (Admin/Staff Only)
- `/course-builder` - Course creation interface
- `/course-generator` - AI course generator
- `/video-generator` - Video creation tools
- `/content-library` - Internal content library
- `/templates` - Course templates
- `/admin/course-templates` - Template management

### Digital Tools (Admin/Staff Only)
- `/digital-binders` - Digital workbooks
- `/admin/document-center` - Document center
- `/admin/mobile-sync` - Mobile app sync
- `/admin/integrations` - System integrations

### Program Holder Portal (Program Holders After Login)
- `/program-holder/portal` - Program holder dashboard
- `/program-holder/portal/students` - Student management
- `/program-holder/portal/attendance` - Attendance tracking
- `/program-holder/portal/reports` - Reports & analytics
- `/program-holder/portal/syllabus` - Master syllabus & LMS import
- `/program-holder/portal/messages` - Mass email system
- `/program-holder/portal/live-qa` - Live Q&A sessions

### Staff Portal (Staff After Login)
- `/staff-portal` - Staff dashboard
- `/staff-portal/students` - Student management
- `/staff-portal/courses` - Course management
- `/staff-portal/messages` - Communication tools
- `/staff-portal/reports` - Staff reports

### Workforce Board Portal (Workforce Board After Login)
- `/workforce-board` - Workforce board dashboard
- `/workforce-board/participants` - WIOA participant tracking
- `/workforce-board/reports` - PIRL reporting
- `/workforce-board/compliance` - Compliance monitoring

---

## Updated Middleware Configuration

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Back office domain - require authentication for everything
  if (hostname.includes('elevateconnectsdirectory.org')) {
    // Allow login pages
    if (pathname.includes('/login')) {
      return NextResponse.next();
    }

    // Check authentication
    const token = request.cookies.get('auth-token') || 
                  request.cookies.get('admin-token') ||
                  request.cookies.get('staff-token') ||
                  request.cookies.get('program-holder-token');
    
    if (!token) {
      // Redirect to appropriate login
      if (pathname.startsWith('/admin')) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/program-holder/portal')) {
        const url = new URL('/program-holder/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      if (pathname.startsWith('/staff')) {
        const url = new URL('/staff/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      // Default to admin login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Main public domain - protect only logged-in portals
  if (hostname.includes('elevateforhumanity.org')) {
    // Public program holder pages - NO authentication required
    if (pathname === '/program-holder' ||
        pathname.startsWith('/program-holder/apply') ||
        pathname.startsWith('/program-holder/benefits') ||
        pathname.startsWith('/program-holder/mou') ||
        pathname.startsWith('/partners')) {
      return NextResponse.next();
    }

    // Public employer pages - NO authentication required
    if (pathname === '/employers' ||
        pathname === '/employer' ||
        pathname.startsWith('/employer/benefits') ||
        pathname.startsWith('/employer/post-job') ||
        pathname.startsWith('/employer/hire')) {
      return NextResponse.next();
    }

    // Protect program holder PORTAL (after login)
    if (pathname.startsWith('/program-holder/portal')) {
      const token = request.cookies.get('program-holder-token');
      if (!token && !pathname.includes('/login')) {
        const url = new URL('/program-holder/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
    }

    // Protect student portal
    if (pathname.startsWith('/student') || pathname.startsWith('/lms')) {
      const token = request.cookies.get('student-token');
      if (!token && !pathname.includes('/login')) {
        const url = new URL('/student/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
    }

    // Protect admin routes on public domain (redirect to back office)
    if (pathname.startsWith('/admin') || 
        pathname.startsWith('/staff-portal') ||
        pathname.startsWith('/workforce-board')) {
      // Redirect to back office domain
      const backOfficeUrl = new URL(pathname, 'https://www.elevateconnectsdirectory.org');
      return NextResponse.redirect(backOfficeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/program-holder/:path*',
    '/staff-portal/:path*',
    '/staff/:path*',
    '/workforce-board/:path*',
    '/digital-binders/:path*',
    '/course-builder/:path*',
    '/course-generator/:path*',
    '/video-generator/:path*',
    '/student/:path*',
    '/lms/:path*',
    '/employer/:path*',
    '/employers/:path*',
  ],
};
```

---

## What Goes Where - Quick Reference

### ✅ Public Site (elevateforhumanity.org)

**Always Public**:
- Program information
- Apply forms
- Contact pages
- Blog/Success stories

**Public Landing Pages** (No Login):
- `/program-holder` - Info for potential program holders
- `/employers` - Info for potential employers
- `/partners` - Partnership opportunities

**After Login**:
- `/student/*` - Student portal
- `/lms/*` - Learning management
- `/program-holder/portal/*` - Program holder portal (after login)

---

### 🔒 Back Office (elevateconnectsdirectory.org)

**Admin Tools**:
- Admin dashboard
- HR & Payroll
- Grant management
- Compliance tracking

**Creation Tools**:
- Course builder
- Course generator (AI)
- Video generator
- Digital binders
- Content library

**Staff Portals**:
- Staff portal
- Workforce board portal
- Program holder portal (can also access from main site after login)

---

## Navigation Updates Needed

### Public Site Navigation

**Main Menu**:
- Programs
- For Students
- For Employers → `/employers`
- For Program Holders → `/program-holder`
- About
- Contact

**Employer Page** (`/employers`):
- Benefits of hiring our graduates
- Post a job
- View available candidates
- Partnership information
- Sign MOU
- Login to employer portal

**Program Holder Page** (`/program-holder`):
- Benefits of partnering
- Revenue share information
- Apply to become program holder
- View program requirements
- Sign partnership agreement
- Login to program holder portal

### Back Office Navigation

**Main Menu**:
- Dashboard
- Course Tools → Course Builder, Video Generator
- HR & Payroll
- Reports
- Documents
- Settings

---

## File Structure Changes Needed

### Keep on Public Site:
```
app/
├── employers/
│   ├── page.tsx (public info)
│   ├── benefits/
│   ├── post-job/
│   └── hire/
├── program-holder/
│   ├── page.tsx (public info)
│   ├── apply/
│   ├── benefits/
│   ├── mou/
│   └── portal/ (after login)
└── partners/
    ├── create-program/
    └── training-provider/
```

### Move to Back Office Only:
```
app/
├── admin/
│   ├── hr/
│   ├── payroll/
│   └── grants/
├── course-builder/
├── course-generator/
├── video-generator/
├── digital-binders/
├── staff-portal/
└── workforce-board/
```

---

## Benefits of This Structure

### For Program Holders:
✅ Public page to learn about partnership
✅ Easy application process
✅ Can access portal from main site after login
✅ Professional public presence

### For Employers:
✅ Public page to learn about hiring
✅ Easy job posting
✅ Can access portal from main site after login
✅ Professional public presence

### For Admin/Staff:
✅ All internal tools in one place (back office)
✅ Secure, not accessible to public
✅ Clean separation of concerns
✅ Easy to manage and maintain

### For Students:
✅ Everything on main site
✅ No confusion about where to go
✅ Familiar domain
✅ Easy access to learning

---

## Implementation Checklist

- [ ] Update middleware.ts with new logic
- [ ] Create public employer page at `/employers`
- [ ] Create public program holder page at `/program-holder`
- [ ] Keep program holder portal accessible after login
- [ ] Move course-builder to back office only
- [ ] Move video-generator to back office only
- [ ] Move HR/payroll to back office only
- [ ] Update navigation menus
- [ ] Test all login flows
- [ ] Update documentation

---

**Summary**:
- **Public site**: Marketing, info, applications, student portal, program holder info, employer info
- **Back office**: Admin tools, course creation, HR/payroll, internal portals

This gives program holders and employers a professional public presence while keeping internal tools secure! 🎯
