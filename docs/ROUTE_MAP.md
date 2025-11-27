# Elevate Route Map (High-Level)

This doc exists so we never again end up with conflicting dynamic routes like:

- `/app/courses/[courseId]` vs `/app/courses/[slug]`
- `/app/enroll/[programSlug]` vs `/app/enroll/[slug]`
- `/app/programs/[programId]` vs `/app/programs/[slug]`

## Current Key Routes

### Public / Marketing

- `/` – Main marketing homepage
- `/programs` – Program catalog (cards, filters)
- `/programs/[programId]` – Program detail page
- `/blog` – Stories & updates
- `/blog/[slug]` – Individual blog posts
- `/contact` – Contact / interest form (if present)

### Enrollment & Funding

- `/enroll/[programSlug]` – Enrollment flow for a specific program
- `/student/funding` – Funding & Earn-While-You-Learn explainer
- `/enroll/thank-you` – Post-enrollment confirmation (recommended)

### Student LMS

- `/student/dashboard` – Student dashboard home
- `/student/jri/[id]` – JRI / SCORM module launcher
- `/student/courses` – (If present) list of enrolled courses

### Admin

- `/admin/dashboard` – Admin overview
- `/admin/jri` – JRI / SCORM admin overview
- `/admin/analytics` – Program analytics snapshot
- `/admin/site-health` – Site Health & Launch Checklist (added by this script)
- `/admin/ai-console` – AI Staff Console
- `/admin/course-import` – Course Import & Partner Library

### Employer / Partner

- `/employer/dashboard` – Employer partner snapshot

## Conventions

- Use **one dynamic segment per resource**:
  - `/programs/[programId]` for internal program IDs
  - `/enroll/[programSlug]` for friendly URLs that map to a program

- Avoid having both `[id]` and `[slug]` under the same path.
- If you need both, document clearly which one is used where.

Whenever you add a new top-level route, update this file and – if needed – the admin Site Health page so staff can see it.
