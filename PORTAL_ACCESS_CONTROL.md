# Portal Access Control System

## Overview

Access to all portals is strictly controlled by role-based authorization. Users can only access portal pages that match their assigned role.

## Authorization Flow

1. **Signup**: Users create an account (auth user only)
2. **Admin Assignment**: Administrator assigns role via admin panel
3. **Portal Access**: User can access portal pages matching their role
4. **Enforcement**: All portal pages check role before rendering

## Role-Based Portal Access

| Role              | Portal Access          | Dashboard URL                |
| ----------------- | ---------------------- | ---------------------------- |
| `student`         | Student Portal (LMS)   | `/lms/dashboard`             |
| `program_holder`  | Program Holder Portal  | `/program-holder/dashboard`  |
| `partner`         | Partner Portal         | `/partner/dashboard`         |
| `staff`           | Staff Portal           | `/staff-portal/dashboard`    |
| `admin`           | Admin Portal           | `/admin/dashboard`           |
| `super_admin`     | All Portals            | Any portal                   |
| `delegate`        | Delegate Portal        | `/delegate/dashboard`        |
| `board`           | Board Portal           | `/board/dashboard`           |
| `workforce_board` | Workforce Board Portal | `/workforce-board/dashboard` |
| `shop`            | Shop Portal            | `/shop/dashboard`            |

## Implementation

### Auth Guard Pattern

All portal pages use one of these patterns:

**Pattern 1: Direct Role Check**

```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (!profile || profile.role !== 'program_holder') {
  redirect('/unauthorized');
}
```

**Pattern 2: requireRole Helper**

```typescript
import { requireRole } from '@/lib/auth/require-role';

const { user, profile } = await requireRole(['staff', 'admin', 'super_admin']);
```

### Unauthorized Access

Users attempting to access portals without proper roles are redirected to:

- `/unauthorized` - Shows access denied message with support contact

### No Role Assigned

Users who signup but haven't been assigned a role by admin:

- Cannot access any portal
- Redirected to `/unauthorized` if they try
- Must wait for admin to assign role

## Signup Process

### Program Holder Signup

**File**: `/app/program-holder/signup/SignupForm.tsx`

**Process**:

1. User fills out signup form (name, email, password, organization)
2. Creates auth user only (no role assignment)
3. User receives email confirmation
4. Admin assigns `program_holder` role via admin panel
5. User can then access `/program-holder/dashboard`

**Key Points**:

- NO automatic role assignment
- NO automatic portal access
- Admin approval required
- Role set by admin, not by signup

## Student Data Access

Program holders can view **operational data only** (NOT PII) of their students through:

- `/program-holder/students` - List of enrolled students
- Student detail pages - Individual student information
- Reports and compliance data for their students

**Allowed Data**: Name, email, phone, program, progress, attendance, grades, compliance status

**Prohibited Data**: SSN, DOB, full address, financial info, medical records, government IDs

Access is controlled by:

1. Role check: Must be `program_holder`
2. Relationship check: Can only see students enrolled in their programs
3. Field restrictions: Queries explicitly exclude PII fields
4. RLS policies: Database-level enforcement

See `PROGRAM_HOLDER_DATA_ACCESS.md` for complete policy.

## Security Layers

1. **Client-side**: UI components check role before rendering
2. **Server-side**: Page components verify role before data fetch
3. **Database**: RLS policies enforce data access rules
4. **Middleware**: (Future) Can add route-level protection

## Admin Role Assignment

Admins assign roles through:

- Admin panel user management
- Direct database update to `profiles.role`
- Bulk import/assignment tools

Once role is assigned:

- User immediately gains portal access
- No additional approval needed
- Access persists until role is changed/removed

## Testing Access Control

To verify access control:

1. Create user without role → Should not access any portal
2. Assign `program_holder` role → Should access program holder portal only
3. Try accessing other portals → Should redirect to `/unauthorized`
4. Assign different role → Should access new portal, lose old portal access

## Future Enhancements

- Middleware-based route protection
- Role hierarchy (super_admin inherits all roles)
- Temporary role grants with expiration
- Audit logging of role changes
- Multi-role support (user has multiple roles)
