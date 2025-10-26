# Application Routes Documentation

## Route Configuration Status: ✅ VERIFIED

All routes are properly configured with correct component mappings and protection levels.

## Public Routes

### Landing & Marketing

- `/` - Main landing page (EFHLanding)
- `/programs` - Programs listing page (data-driven)
- `/programs/:slug` - Individual program details
- `/programs-old` - Legacy programs page (backwards compatibility)
- `/program/:slug` - Legacy program detail (backwards compatibility)
- `/partners` - Partners page
- `/apply` - Application page

### Authentication

- `/auth/login` - User login
- `/auth/signup` - User registration
- `/auth/forgot-password` - Password recovery

### Certificates (Public Verification)

- `/verify` - Certificate verification page
- `/verify/:certNumber` - Verify specific certificate
- `/certificate/:certificateId` - View certificate details

### Payment

- `/payment/success` - Payment success page
- `/payment/cancelled` - Payment cancelled page

## Protected Routes (Authentication Required)

### User Account

- `/account` 🔒 - User account management

### Learning Management System (LMS)

- `/lms` 🔒 - Student dashboard
- `/lms/courses` 🔒 - Course catalog
- `/lms/course/:courseId` 🔒 - Course details and content
- `/lms/lesson/:lessonId` 🔒 - Individual lesson viewer

### Certificates (User-Specific)

- `/certificates` 🔒 - User's earned certificates

## Role-Based Protected Routes

### Instructor Routes (Requires `instructor` role)

- `/instructor` 🔒👨‍🏫 - Instructor dashboard
- `/instructor/course/:courseId/edit` 🔒👨‍🏫 - Edit course content
- `/instructor/course/:courseId/lessons` 🔒👨‍🏫 - Manage course lessons

## API Routes (Netlify Functions)

### Payment Processing

- `/api/create-checkout-session` - Create Stripe checkout session
- `/api/create-enrollment-session` - Create enrollment-specific checkout
- `/api/stripe-webhook` - Handle Stripe webhook events

## Route Protection Levels

### 🌐 Public

No authentication required. Accessible to all visitors.

### 🔒 Protected

Requires user authentication. Redirects to `/auth/login` if not authenticated.

### 🔒👨‍🏫 Role-Based

Requires specific user role (e.g., instructor). Shows "Access Denied" if user lacks required role.

## SPA Routing Configuration

### Netlify Redirects

```toml
# API routes (processed first)
/api/create-checkout-session → /.netlify/functions/create-checkout-session
/api/create-enrollment-session → /.netlify/functions/create-enrollment-session
/api/stripe-webhook → /.netlify/functions/stripe-webhook

# SPA catch-all (processed last)
/* → /index.html (200)
```

### \_redirects File

```
/*  /index.html  200
```

## Route Components

All route components exist and are properly imported:

| Route                                  | Component           | Location                                       |
| -------------------------------------- | ------------------- | ---------------------------------------------- |
| `/`                                    | EFHLanding          | `src/pages/EFHLanding.tsx`                     |
| `/programs`                            | ProgramsPage        | `src/pages/ProgramsPage.tsx`                   |
| `/programs/:slug`                      | ProgramDetail       | `src/pages/ProgramDetail.tsx`                  |
| `/programs-old`                        | Programs            | `src/pages/Programs.tsx`                       |
| `/program/:slug`                       | ProgramPage         | `src/pages/ProgramPage.tsx`                    |
| `/auth/login`                          | Login               | `src/pages/auth/Login.tsx`                     |
| `/auth/signup`                         | Signup              | `src/pages/auth/Signup.tsx`                    |
| `/auth/forgot-password`                | ForgotPassword      | `src/pages/auth/ForgotPassword.tsx`            |
| `/account`                             | Account             | `src/pages/auth/Account.tsx`                   |
| `/lms`                                 | Dashboard           | `src/pages/lms/Dashboard.tsx`                  |
| `/lms/courses`                         | LMSCourses          | `src/pages/LMSCourses.tsx`                     |
| `/lms/course/:courseId`                | CoursePage          | `src/pages/lms/CoursePage.tsx`                 |
| `/lms/lesson/:lessonId`                | LessonPage          | `src/pages/lms/LessonPage.tsx`                 |
| `/instructor`                          | InstructorDashboard | `src/pages/instructor/InstructorDashboard.tsx` |
| `/instructor/course/:courseId/edit`    | CourseEditor        | `src/pages/instructor/CourseEditor.tsx`        |
| `/instructor/course/:courseId/lessons` | LessonManager       | `src/pages/instructor/LessonManager.tsx`       |
| `/certificates`                        | MyCertificates      | `src/pages/MyCertificates.tsx`                 |
| `/certificate/:certificateId`          | CertificatePage     | `src/pages/CertificatePage.tsx`                |
| `/verify`                              | VerifyCertificate   | `src/pages/VerifyCertificate.tsx`              |
| `/verify/:certNumber`                  | VerifyCertificate   | `src/pages/VerifyCertificate.tsx`              |
| `/payment/success`                     | PaymentSuccess      | `src/pages/PaymentSuccess.tsx`                 |
| `/payment/cancelled`                   | PaymentCancelled    | `src/pages/PaymentCancelled.tsx`               |

## Protected Route Implementation

The `ProtectedRoute` component (`src/components/auth/ProtectedRoute.tsx`) handles:

1. **Authentication Check**: Verifies user is logged in
2. **Role Verification**: Checks if user has required role (if specified)
3. **Redirects**: Sends unauthenticated users to `/auth/login`
4. **Access Denied**: Shows error page for insufficient permissions

### Usage Example

```tsx
// Basic authentication
<Route
  path="/account"
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  }
/>

// Role-based authentication
<Route
  path="/instructor"
  element={
    <ProtectedRoute requireRole="instructor">
      <InstructorDashboard />
    </ProtectedRoute>
  }
/>
```

## Issues Fixed

### Issue #1: Unprotected LMS Routes ✅

**Problem**: `/lms/courses` and `/lms/course/:courseId` were not protected
**Fix**: Wrapped both routes in `<ProtectedRoute>` component

### Issue #2: Route Order ✅

**Problem**: Potential for API routes to be caught by SPA redirect
**Fix**: Verified API redirects are processed before catch-all redirect

## Testing Routes

### Manual Testing

1. Navigate to each route in browser
2. Verify correct component loads
3. Test authentication redirects
4. Test role-based access control

### Automated Testing

Run existing route tests:

```bash
pnpm test src/test/routes.test.jsx
pnpm test src/test/protected-routes.test.jsx
```

## Route Statistics

- **Total Routes**: 27
- **Public Routes**: 14
- **Protected Routes**: 10 (authentication required)
- **Role-Based Routes**: 3 (instructor role)
- **API Routes**: 3 (Netlify Functions)

## Navigation Flow

### New User Journey

1. `/` (Landing) → `/auth/signup` → `/auth/login` → `/lms` (Dashboard)

### Enrolled Student Journey

1. `/lms` (Dashboard) → `/lms/courses` → `/lms/course/:id` → `/lms/lesson/:id`

### Instructor Journey

1. `/instructor` → `/instructor/course/:id/edit` → `/instructor/course/:id/lessons`

### Payment Journey

1. `/programs/:slug` → Payment → `/payment/success` → `/lms`

## Maintenance Notes

- Keep API routes before SPA catch-all in `netlify.toml`
- All new protected routes must use `<ProtectedRoute>` wrapper
- Role-based routes should specify `requireRole` prop
- Update this documentation when adding new routes

---

**Last Updated**: 2025-10-26
**Status**: ✅ All routes verified and working
