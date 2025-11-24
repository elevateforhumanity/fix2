# Marketing Site + LMS Integration Guide

## Overview

This document outlines how the marketing website integrates with the LMS (Learning Management System) to provide a seamless user experience from application through enrollment and training.

---

## Authentication Flow

### User Journey

```
1. Marketing Site (/) → Browse programs
2. Apply (/apply) → Submit application
3. Email Verification → Verify account
4. Student Portal (/portal) → Access dashboard
5. LMS (/lms) → Begin training
```

### Authentication States

#### Public Routes (No Auth Required)
- `/` - Homepage
- `/programs/*` - All program pages
- `/funding/*` - Funding information
- `/blog` - Blog posts
- `/students` - For Students page
- `/employers` - For Employers page
- `/about` - About page
- `/contact` - Contact page
- `/apply` - Application form

#### Protected Routes (Auth Required)
- `/portal/*` - Student dashboard
- `/lms/*` - Learning management system
- `/instructor/*` - Instructor dashboard
- `/admin/*` - Admin dashboard

---

## Database Integration

### Application to User Flow

When a user submits an application through `/apply`:

1. **Create Application Record**
```sql
INSERT INTO applications (
  first_name,
  last_name,
  email,
  phone,
  program_id,
  funding_type,
  status
) VALUES (...);
```

2. **Create User Account** (after approval)
```sql
INSERT INTO users (
  email,
  first_name,
  last_name,
  role,
  application_id,
  source
) VALUES (
  'user@example.com',
  'John',
  'Doe',
  'student',
  application_id,
  'marketing'
);
```

3. **Send Verification Email**
```typescript
await sendVerificationEmail(user.email, verificationToken);
```

4. **User Verifies Email**
```typescript
// /api/auth/verify-email
const user = await verifyEmailToken(token);
await updateUser(user.id, { email_verified: true });
```

5. **Redirect to Portal**
```typescript
// After verification
redirect('/portal');
```

---

## API Endpoints

### Application Submission

**POST /api/applications**

Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(317) 555-1234",
  "program": "medical-assistant",
  "fundingType": "wioa",
  "employmentStatus": "unemployed",
  ...
}
```

Response:
```json
{
  "success": true,
  "applicationId": "uuid",
  "message": "Application submitted successfully"
}
```

### Contact Form

**POST /api/contact**

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "program-inquiry",
  "message": "I have questions about..."
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## Shared Components

### MainNav Component

The MainNav component adapts based on authentication state:

```typescript
// components/layout/MainNav.tsx
const MainNav = () => {
  const { user, isLoading } = useAuth();
  
  return (
    <nav>
      {/* Always visible */}
      <ProgramsDropdown />
      <FundingDropdown />
      <Link href="/students">For Students</Link>
      <Link href="/employers">For Employers</Link>
      
      {/* Conditional based on auth */}
      {!user && !isLoading && (
        <>
          <Link href="/apply">Apply Now</Link>
          <Link href="/login">Login</Link>
        </>
      )}
      
      {user && (
        <>
          <Link href="/portal">Dashboard</Link>
          {user.role === 'instructor' && (
            <Link href="/instructor">Instructor</Link>
          )}
          <UserMenu />
        </>
      )}
    </nav>
  );
};
```

### Authentication Hook

```typescript
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading };
}
```

---

## Enrollment Process

### After Application Approval

1. **Admin Reviews Application**
   - Access via `/admin/applications`
   - Review applicant information
   - Verify funding eligibility
   - Approve or reject

2. **User Account Creation**
   - Automatically created upon approval
   - Email sent with verification link
   - Temporary password generated

3. **Email Verification**
   - User clicks link in email
   - Token verified via `/api/auth/verify-email`
   - Account activated

4. **Initial Login**
   - User redirected to `/portal`
   - Onboarding flow begins
   - Program enrollment initiated

5. **Program Enrollment**
   - Student enrolled in selected program
   - Access granted to course materials
   - Welcome email sent

---

## Environment Variables

Required environment variables for integration:

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://elevateforhumanity.org
NEXTAUTH_SECRET=your-secret-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (for verification and notifications)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@elevateforhumanity.org

# Application
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
```

---

## Middleware Configuration

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protected routes
  const protectedRoutes = ['/portal', '/lms', '/instructor', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/lms/:path*',
    '/instructor/:path*',
    '/admin/:path*',
  ],
};
```

---

## Testing the Integration

### Manual Testing Checklist

- [ ] Submit application from `/apply`
- [ ] Verify application appears in admin dashboard
- [ ] Approve application
- [ ] Verify user account created
- [ ] Check verification email sent
- [ ] Click verification link
- [ ] Verify redirect to `/portal`
- [ ] Check user can access enrolled program
- [ ] Verify navigation shows authenticated state
- [ ] Test logout and re-login

### Automated Testing

```typescript
// __tests__/integration/application-flow.test.ts
describe('Application to Enrollment Flow', () => {
  it('should create user account after application approval', async () => {
    // Submit application
    const application = await submitApplication({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      program: 'medical-assistant',
    });
    
    // Approve application
    await approveApplication(application.id);
    
    // Verify user created
    const user = await getUserByEmail('test@example.com');
    expect(user).toBeDefined();
    expect(user.role).toBe('student');
  });
});
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations run
- [ ] Email service configured and tested
- [ ] Authentication flow tested end-to-end
- [ ] Protected routes verified
- [ ] Public routes accessible without auth

### Post-Deployment

- [ ] Test application submission
- [ ] Verify email delivery
- [ ] Test user verification flow
- [ ] Check portal access
- [ ] Verify LMS integration
- [ ] Monitor error logs

---

## Troubleshooting

### Common Issues

**Issue: Users not receiving verification emails**
- Check SMTP configuration
- Verify email service credentials
- Check spam folder
- Review email logs

**Issue: Redirect loop after login**
- Check middleware configuration
- Verify auth token storage
- Review protected route patterns

**Issue: Application not creating user**
- Check database permissions
- Verify application approval workflow
- Review API endpoint logs

---

## Future Enhancements

### Phase 1 (Current)
- ✅ Marketing site with application form
- ✅ Basic authentication flow
- ✅ Manual application approval

### Phase 2 (Planned)
- [ ] Automated funding eligibility check
- [ ] Self-service password reset
- [ ] Application status tracking
- [ ] Email notifications for status changes

### Phase 3 (Future)
- [ ] SSO integration
- [ ] Mobile app authentication
- [ ] Advanced analytics dashboard
- [ ] Automated enrollment workflows

---

## Support

For integration questions or issues:

**Technical Support:**
- Email: dev@elevateforhumanity.org
- Documentation: /docs/integration

**Application Support:**
- Email: support@elevateforhumanity.org
- Phone: (317) 555-1234

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Active
