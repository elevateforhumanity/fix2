# Database Dependency Map

## Core Dependency Chain

```
Level 0 (No dependencies):
├─ auth.users (Supabase Auth - external)
├─ programs
├─ products
├─ marketplace_creators
└─ webhooks

Level 1 (Depends on Level 0):
├─ modules → programs
├─ profiles → auth.users
├─ enrollments → programs, auth.users
├─ applications → programs (optional), auth.users (optional)
├─ marketplace_products → marketplace_creators
└─ payments → auth.users

Level 2 (Depends on Level 1):
├─ lessons → modules
├─ certificates → enrollments or programs
├─ lesson_progress → enrollments, lessons
└─ module_progress → enrollments, modules

Level 3 (Depends on Level 2):
├─ quiz_attempts → lesson_progress
└─ completion_records → lesson_progress, module_progress
```

## Critical Tables for Public Website

### Must Allow Anonymous Read:
- `programs` (is_active = true)
- `courses` (status = 'published')
- `modules` (via programs.is_active)
- `lessons` (via programs.is_active)
- `products` (is_active = true)

### Must Allow Anonymous Write:
- `applications` (INSERT only)

### Require Authentication:
- `enrollments` (user_id = auth.uid())
- `lesson_progress` (via enrollments.user_id)
- `module_progress` (via enrollments.user_id)
- `profiles` (id = auth.uid())
- `certificates` (via enrollments.user_id)

## Migration Order Requirements

### Phase 1: Foundation
1. Enable extensions (uuid-ossp, pgcrypto)
2. Create base tables (programs, products, profiles)

### Phase 2: Content Structure
3. Create modules (depends on programs)
4. Create lessons (depends on modules)
5. Create courses (if using alternative structure)

### Phase 3: User Interactions
6. Create enrollments (depends on programs, auth.users)
7. Create applications (depends on programs optional)

### Phase 4: Progress Tracking
8. Create lesson_progress (depends on enrollments, lessons)
9. Create module_progress (depends on enrollments, modules)
10. Create certificates (depends on enrollments)

### Phase 5: Advanced Features
11. Create AI instructors, quizzes, forums, etc.
12. Create views and functions
13. Apply RLS policies

## Foreign Key Relationships

### Programs Ecosystem:
```
programs (id)
  ↓
modules (program_id → programs.id)
  ↓
lessons (module_id → modules.id)
  ↓
lesson_progress (lesson_id → lessons.id)
```

### Enrollment Flow:
```
auth.users (id)
  ↓
enrollments (user_id → auth.users.id, program_id → programs.id)
  ↓
lesson_progress (enrollment_id → enrollments.id)
  ↓
certificates (enrollment_id → enrollments.id)
```

## Views (Depend on Tables)

- `enrollments_normalized_view` → enrollments, programs, profiles
- `course_completion_view` → lesson_progress, module_progress, enrollments
- `leaderboard_views` → profiles, achievements, lesson_progress
- `workforce_reporting_views` → enrollments, applications, programs

## Functions (Depend on Tables)

- `handle_updated_at()` → generic trigger function
- `claim_application()` → applications, enrollments
- `generate_certificate()` → certificates, enrollments
- `calculate_completion()` → lesson_progress, module_progress

## Triggers (Depend on Functions + Tables)

- `set_updated_at` → uses handle_updated_at() on programs, modules, lessons
- `on_auth_user_created` → creates profile when user signs up
- `on_enrollment_complete` → generates certificate

## Conflict Resolution

### Programs vs Courses:
- Some migrations use `programs` (apprenticeships, training pathways)
- Some migrations use `courses` (LMS content, online learning)
- **Decision:** Keep both, they serve different purposes
  - `programs` = real-world training programs (Barber, HVAC, CNA)
  - `courses` = online course content (modules, lessons, quizzes)

### Enrollments vs Program_Enrollments:
- Multiple enrollment table names exist
- **Decision:** Standardize on `enrollments` table
- Archive `program_enrollments` references

## Missing Dependencies (Gaps)

1. **No explicit completion_rules table**
   - Completion logic scattered across migrations
   - Should consolidate into single source

2. **Inconsistent user references**
   - Some tables use `user_id UUID REFERENCES auth.users(id)`
   - Some tables use `profile_id UUID REFERENCES profiles(id)`
   - Should standardize on auth.users for FK, profiles for metadata

3. **Circular dependencies possible**
   - Some tables reference each other (courses ↔ modules)
   - Need to ensure one direction is nullable

## Recommended Migration Cleanup

1. **Archive duplicate table definitions**
2. **Consolidate RLS policies into single migration**
3. **Create dependency-ordered migration sequence**
4. **Add missing NOT NULL constraints**
5. **Add missing indexes on foreign keys**
6. **Standardize naming conventions** (user_id vs profile_id)
