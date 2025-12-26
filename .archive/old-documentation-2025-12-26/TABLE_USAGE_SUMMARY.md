# Table Usage Summary

## Tables Actively Used in App Code

Based on code scan of /app, /lib, /components:

### Core Tables (High Usage):

- **profiles** - User profile data (student dashboard, admin, partner portals)
- **enrollments** - Student course enrollments (student portal, admin)
- **applications** - Application submissions (apply flow, admin review)
- **courses** - Course catalog (student portal, LMS)
- **programs** - Program catalog (marketing pages, admin, partner portal)

### Progress Tracking (Medium Usage):

- **lesson_progress** - Student lesson completion (LMS player)
- **module_progress** - Student module completion (LMS dashboard)
- **certificates** - Credential issuance (student dashboard, admin)

### Content Tables (Medium Usage):

- **modules** - Course structure (LMS, admin)
- **lessons** - Lesson content (LMS player, admin)
- **ai_instructors** - AI guidance (LMS player)
- **ai_conversations** - AI chat history (student dashboard)

### Commerce Tables (Low-Medium Usage):

- **products** - Store items (store pages)
- **purchases** - Purchase records (student dashboard, admin)
- **payments** - Payment tracking (admin, webhooks)

### Admin/Partner Tables (Low Usage):

- **program_holders** - Partner organizations (partner portal, admin)
- **user_access** - Access control (admin)
- **audit_logs** - Activity tracking (admin)

## Tables NOT Referenced in App Code

These may be:

1. Created by migrations but not yet implemented
2. Planned features not yet built
3. Obsolete/unused tables

### Potentially Unused:

- **marketplace_creators** - No references found
- **marketplace_products** - No references found
- **webhooks** - May be used by API routes only
- **sso_connections** - SSO not implemented yet
- **study_groups** - Feature not implemented
- **discussion_threads** - Forum feature not implemented
- **video_bookmarks** - Feature not implemented

## Critical Tables for Launch

### Must Work:

1. **profiles** - User accounts
2. **programs** - Program catalog (public)
3. **applications** - Application flow
4. **enrollments** - Student enrollment
5. **courses** - Course content (if using LMS)
6. **modules** - Course structure
7. **lessons** - Lesson content
8. **lesson_progress** - Progress tracking

### Should Work:

9. **certificates** - Credential issuance
10. **ai_instructors** - AI guidance
11. **products** - Store functionality
12. **payments** - Payment processing

### Can Wait:

- Social features (forums, study groups)
- Advanced features (SSO, video bookmarks)
- Marketplace features

## Recommendations

1. **Keep all core tables** (profiles, programs, courses, enrollments, progress)
2. **Archive unused marketplace tables** (if confirmed unused)
3. **Document planned features** (forums, SSO) so migrations aren't deleted
4. **Prioritize RLS policies** for tables in "Must Work" list
5. **Test critical paths** (apply → enroll → complete → certificate)
