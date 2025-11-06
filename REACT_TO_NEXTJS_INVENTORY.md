# React SPA to Next.js Migration Inventory

## Total Files to Migrate: 362

### Breakdown:

- **Pages**: 67 files (src/pages/)
- **Components**: 43 files (src/components/)
- **Layouts**: 2 files (src/layouts/)
- **Other**: 250 files (utils, hooks, services, types, etc.)

## Pages (67 files):

### Core Pages:

- Home.tsx
- Home-Durable.tsx
- ProgramsPage.tsx
- Contact.tsx
- About.tsx (if exists)
- GetStarted.tsx
- Elevate.tsx

### LMS Pages (9 files):

- LMS.tsx
- lms/Dashboard.tsx
- lms/CoursesIndex.tsx
- lms/CoursePage.tsx
- lms/LessonPage.tsx
- lms/QuizBlock.tsx

### Dashboard Pages:

- dashboard/StudentDashboard.tsx
- dashboard/InstructorDashboard.tsx
- dashboard/AdminDashboard.tsx
- dashboard/CreateCoursePage.tsx

### Auth Pages:

- auth/Login.tsx
- auth/Signup.tsx
- auth/ForgotPassword.tsx (if exists)

### Legal Pages:

- legal/Privacy.tsx
- legal/TermsOfUse.tsx
- legal/DMCA.tsx
- legal/LegalIPNotice.tsx

### Other Pages:

- CertificatePage.tsx
- ProfilePage.tsx
- PacketDetail.tsx
- ApplyScholarship.tsx
- DonateSuccess.tsx
- Compliance.tsx
- - 40 more pages

## Components (43 files):

- Header.tsx
- Footer.tsx
- Hero.tsx
- Sidebar.tsx
- FileUpload.tsx
- AgentConsole.tsx
- ProtectedRoute.tsx
- - 36 more components

## Layouts (2 files):

- MainLayout.tsx
- DashboardLayout.tsx
- DurableLayout.tsx (if exists)

## Migration Complexity:

### Easy (Static Pages): ~20 pages

- About, Contact, Legal pages
- Simple content, no complex state
- **Effort**: 1-2 hours

### Medium (Dynamic Pages): ~30 pages

- Programs, Courses listing
- Uses API calls, some state management
- **Effort**: 4-6 hours

### Hard (Interactive Pages): ~17 pages

- LMS, Dashboard, Quiz pages
- Complex state, real-time updates, auth
- **Effort**: 8-12 hours

## Total Estimated Effort:

- **Minimum**: 13 hours
- **Maximum**: 20 hours
- **Realistic**: 15-18 hours

## Migration Strategy:

### Phase 1: Core Static Pages (2-3 hours)

1. Homepage
2. Programs listing
3. Contact
4. Legal pages

### Phase 2: Dynamic Pages (4-6 hours)

5. Program details
6. Course listing
7. Auth pages

### Phase 3: Complex Interactive (8-10 hours)

8. LMS pages
9. Dashboard pages
10. Quiz/Assessment pages

### Phase 4: Components & Layouts (2-3 hours)

11. Migrate shared components
12. Setup layouts
13. Configure routing

### Phase 5: Testing & Deployment (2-3 hours)

14. Build testing
15. Fix errors
16. Deploy to Netlify
17. DNS configuration

## Blockers:

- None identified

## Dependencies:

- Next.js 14+
- React 18+
- Supabase client
- TailwindCSS
- All current npm packages

## Risk Assessment:

- **High Risk**: LMS and Dashboard pages (complex state)
- **Medium Risk**: Auth pages (session management)
- **Low Risk**: Static pages

## Recommendation:

Given the complexity (362 files, 15-18 hours), consider:

1. **Full migration** (user's preference) - Complete replacement
2. **Phased migration** - Migrate in stages, test each phase
3. **Hybrid approach** - Keep React for complex pages, Next.js for static

**User wants**: Full migration, no React SPA
**Status**: Ready to proceed
