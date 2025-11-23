# Authentication Guards Documentation

## Overview

This document describes the comprehensive authentication and authorization system implemented across the platform. The system provides multiple layers of protection for routes, API endpoints, and resources.

## Architecture

### Layers of Protection

1. **Edge Middleware** - First line of defense at the CDN/edge level
2. **Server Component Guards** - Protection for Next.js server components
3. **API Route Guards** - Protection for API endpoints
4. **Client Component Guards** - Protection for client-side routes
5. **Resource-Level Guards** - Fine-grained access control for specific resources

## User Roles

The system supports five user roles with different permission levels:

```typescript
type UserRole = 'student' | 'instructor' | 'admin' | 'program_holder' | 'delegate';
```

### Role Hierarchy

- **Admin**: Full access to all features and data
- **Instructor**: Can manage own courses, view enrolled students, grade assignments
- **Program Holder**: Can manage programs and view analytics
- **Delegate**: Can view programs, students, and manage enrollments
- **Student**: Can view courses, submit assignments, track progress

## Server Component Guards

### Basic Usage

```typescript
import { requireAuth, requireAdmin, requireInstructor } from '@/lib/authGuards';

// Require any authenticated user
export default async function DashboardPage() {
  const user = await requireAuth();
  return <div>Welcome {user.email}</div>;
}

// Require admin role
export default async function AdminPage() {
  const user = await requireAdmin();
  return <div>Admin Dashboard</div>;
}

// Require instructor role (or admin)
export default async function InstructorPage() {
  const user = await requireInstructor();
  return <div>Instructor Dashboard</div>;
}
```

### Advanced Guard with Options

```typescript
import { authGuard } from '@/lib/authGuards';

export default async function ProtectedPage() {
  const { user, role, profile } = await authGuard({
    requireAuth: true,
    allowedRoles: ['admin', 'instructor'],
    redirectTo: '/login',
    requireEmailVerified: true,
  });

  return <div>Protected Content</div>;
}
```

### Available Server Guards

```typescript
// Basic guards
requireAuth()                    // Any authenticated user
requireAdmin()                   // Admin only
requireInstructor()              // Instructor or Admin
requireStudent()                 // Student only
requireProgramHolder()           // Program Holder only
requireDelegate()                // Delegate only
requireAdminOrDelegate()         // Admin or Delegate

// Advanced guard
authGuard(options: AuthGuardOptions)

// Resource-specific guards
requireCourseAccess(courseId)
requireCourseEditAccess(courseId)
requireStudentDataAccess(studentId)
```

## API Route Guards

### Basic Usage

```typescript
import { apiRequireAdmin, apiRequireInstructor } from '@/lib/authGuards';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Check admin access
  const result = await apiRequireAdmin();
  
  // If result is a NextResponse, it's an error response
  if (result instanceof NextResponse) {
    return result;
  }

  // Access granted, result contains user data
  const { user, role, profile } = result;

  return NextResponse.json({ data: 'admin data' });
}
```

### Advanced API Guard

```typescript
import { apiAuthGuard } from '@/lib/authGuards';

export async function POST(request: NextRequest) {
  const { authorized, user, role, error } = await apiAuthGuard({
    requireAuth: true,
    allowedRoles: ['admin', 'instructor'],
    requireEmailVerified: true,
  });

  if (!authorized) {
    return NextResponse.json(
      { error: error || 'Unauthorized' },
      { status: 401 }
    );
  }

  // Process request
  return NextResponse.json({ success: true });
}
```

### Available API Guards

```typescript
apiRequireAdmin()       // Admin only
apiRequireInstructor()  // Instructor or Admin
apiRequireStudent()     // Student only
apiAuthGuard(options)   // Custom guard with options
```

## Client Component Guards

### Using RouteGuard Component

```tsx
import RouteGuard from '@/components/RouteGuard';

export default function ClientProtectedPage() {
  return (
    <RouteGuard
      requireAuth={true}
      allowedRoles={['admin', 'instructor']}
      redirectTo="/login"
    >
      <div>Protected Client Content</div>
    </RouteGuard>
  );
}
```

### Specific Route Guards

```tsx
import {
  StudentRouteGuard,
  InstructorRouteGuard,
  AdminRouteGuard,
  AuthenticatedRouteGuard,
} from '@/components/RouteGuard';

// Student only
<StudentRouteGuard>
  <StudentDashboard />
</StudentRouteGuard>

// Instructor only
<InstructorRouteGuard>
  <InstructorDashboard />
</InstructorRouteGuard>

// Admin only
<AdminRouteGuard>
  <AdminPanel />
</AdminRouteGuard>

// Any authenticated user
<AuthenticatedRouteGuard>
  <Dashboard />
</AuthenticatedRouteGuard>
```

## Permission System

### Checking Permissions

```typescript
import { hasPermission, requirePermission } from '@/lib/authGuards';

// Check if user has permission
const canGrade = await hasPermission('grade_assignments');

if (canGrade) {
  // Show grading interface
}

// Require permission (redirects if not authorized)
await requirePermission('manage_own_courses');
```

### Available Permissions

#### Admin Permissions
- `*` (all permissions)

#### Instructor Permissions
- `view_students`
- `grade_assignments`
- `manage_own_courses`
- `view_analytics`
- `send_messages`
- `create_quizzes`
- `manage_discussions`

#### Student Permissions
- `view_courses`
- `submit_assignments`
- `take_quizzes`
- `join_discussions`
- `view_own_progress`

#### Program Holder Permissions
- `view_programs`
- `manage_programs`
- `view_students`
- `view_analytics`

#### Delegate Permissions
- `view_programs`
- `view_students`
- `view_analytics`
- `manage_enrollments`

## Resource-Level Guards

### Course Access

```typescript
import { canAccessCourse, requireCourseAccess } from '@/lib/authGuards';

// Check if user can access course
const hasAccess = await canAccessCourse(courseId);

if (hasAccess) {
  // Show course content
}

// Require course access (redirects if not authorized)
await requireCourseAccess(courseId);
```

### Course Editing

```typescript
import { canEditCourse, requireCourseEditAccess } from '@/lib/authGuards';

// Check if user can edit course
const canEdit = await canEditCourse(courseId);

// Require edit access
await requireCourseEditAccess(courseId);
```

### Student Data Access

```typescript
import { canAccessStudentData, requireStudentDataAccess } from '@/lib/authGuards';

// Check if user can access student data
const hasAccess = await canAccessStudentData(studentId);

// Require student data access
await requireStudentDataAccess(studentId);
```

## Middleware Protection

The edge middleware provides the first layer of protection:

```typescript
// middleware.ts
export const config = {
  matcher: [
    '/api/:path*',
    '/student/:path*',
    '/instructor/:path*',
    '/admin/:path*',
    '/program-holder/:path*',
    '/delegate/:path*',
    '/dashboard/:path*',
  ],
};
```

### Protected Route Patterns

- `/student/*` - Student role required
- `/instructor/*` - Instructor or Admin role required
- `/admin/*` - Admin role required
- `/program-holder/*` - Program Holder role required
- `/delegate/*` - Delegate role required
- `/dashboard/*` - Any authenticated user

### Public Routes

The following routes are always accessible:
- `/` - Homepage
- `/login` - Login page
- `/signup` - Registration
- `/forgot-password` - Password reset
- `/about` - About page
- `/contact` - Contact page
- `/programs` - Program listing
- `/courses` - Course catalog
- `/blog` - Blog
- `/help` - Help center
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Best Practices

### 1. Always Use Server-Side Guards for Sensitive Data

```typescript
// ✅ Good - Server component with guard
export default async function SensitiveDataPage() {
  const user = await requireAdmin();
  const data = await fetchSensitiveData();
  return <div>{data}</div>;
}

// ❌ Bad - Client component without guard
'use client';
export default function SensitiveDataPage() {
  const [data, setData] = useState(null);
  // Anyone can access this
}
```

### 2. Use Appropriate Guards for Each Route Type

```typescript
// Server components
await requireAuth();

// API routes
const result = await apiRequireAdmin();

// Client components
<RouteGuard requireAuth={true}>
  <Content />
</RouteGuard>
```

### 3. Check Resource-Level Permissions

```typescript
// Don't just check role
const user = await requireAuth();

// Also check resource access
await requireCourseAccess(courseId);
```

### 4. Handle Unauthorized Access Gracefully

```typescript
// API routes
if (!authorized) {
  return NextResponse.json(
    { error: 'Unauthorized', code: 'INSUFFICIENT_PERMISSIONS' },
    { status: 401 }
  );
}

// Server components
// Guards automatically redirect to /unauthorized
```

### 5. Use Type-Safe Role Checks

```typescript
import type { UserRole } from '@/lib/authGuards';

const allowedRoles: UserRole[] = ['admin', 'instructor'];
await authGuard({ allowedRoles });
```

## Error Handling

### Unauthorized Access

When a user tries to access a protected route without proper authorization:

1. **Server Components**: Automatically redirected to `/login` or `/unauthorized`
2. **API Routes**: Returns 401 Unauthorized with error message
3. **Client Components**: Shows loading spinner then redirects

### Session Expiration

When a user's session expires:

1. Automatically redirected to `/login` with return URL
2. After login, user is redirected back to original page

### Email Verification Required

When email verification is required:

1. User is redirected to `/verify-email`
2. After verification, user can access protected routes

## Testing Guards

### Unit Testing

```typescript
import { authGuard } from '@/lib/authGuards';

describe('authGuard', () => {
  it('should allow admin access', async () => {
    // Mock authenticated admin user
    const result = await authGuard({
      allowedRoles: ['admin'],
    });
    
    expect(result.isAuthorized).toBe(true);
  });

  it('should deny student access to admin routes', async () => {
    // Mock authenticated student user
    // Should redirect to /unauthorized
  });
});
```

### Integration Testing

```typescript
import { GET } from '@/app/api/admin/users/route';

describe('Admin API', () => {
  it('should require admin role', async () => {
    // Mock non-admin user
    const response = await GET(mockRequest);
    
    expect(response.status).toBe(401);
  });
});
```

## Security Considerations

### 1. Never Trust Client-Side Checks

Client-side guards are for UX only. Always enforce authorization on the server.

### 2. Use Row-Level Security (RLS)

Supabase RLS policies provide an additional layer of security:

```sql
CREATE POLICY "Users can only view their own data"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
```

### 3. Audit Sensitive Operations

Log all access to sensitive resources:

```typescript
await logAuditEvent({
  action: 'access_student_data',
  actor_id: user.id,
  resource_id: studentId,
  metadata: { role: user.role },
});
```

### 4. Rate Limit Sensitive Endpoints

Protect against brute force attacks:

```typescript
const { allowed } = await rateLimitGuard(
  user.id,
  10, // max requests
  60000 // per minute
);

if (!allowed) {
  return NextResponse.json(
    { error: 'Rate limit exceeded' },
    { status: 429 }
  );
}
```

### 5. Use HTTPS Only

Ensure all authentication happens over HTTPS in production.

## Troubleshooting

### Guard Not Working

1. Check if user is authenticated: `const user = await requireAuth()`
2. Verify user role in database
3. Check RLS policies in Supabase
4. Review middleware configuration

### Infinite Redirect Loop

1. Ensure `/login` and `/unauthorized` are not protected
2. Check middleware matcher patterns
3. Verify redirect URLs are correct

### Permission Denied Unexpectedly

1. Check user role in database
2. Verify permission definitions
3. Check resource ownership
4. Review audit logs

## Migration Guide

### From Old Auth System

```typescript
// Old
import { getServerSession } from 'next-auth';

// New
import { requireAuth } from '@/lib/authGuards';

// Old
const session = await getServerSession();
if (!session) redirect('/login');

// New
const user = await requireAuth();
```

## Future Enhancements

- [ ] Multi-factor authentication (MFA)
- [ ] OAuth provider integration
- [ ] Session management dashboard
- [ ] Advanced permission system with custom roles
- [ ] IP-based access restrictions
- [ ] Device fingerprinting
- [ ] Anomaly detection
- [ ] Automated security reports
