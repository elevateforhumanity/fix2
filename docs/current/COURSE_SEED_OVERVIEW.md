# Course Seed System – Elevate for Humanity

This system lets you define all programs, modules, and lessons in a single
TypeScript file and push them into Supabase with one API call.

## Files

- `lms-data/courseSeed.ts`
  - Contains `programSeeds` with:
    - `code` (maps to `programs.code`)
    - `name`, `category`, `description`
    - `modules` + `lessons`
  - Lessons can be tagged with `partnerTag`:
    - `HSI`, `Milady`, `CareerSafe`, `Certiport`, `NationalDrug`, `IRS-VITA`, `Intuit`, etc.

- `app/api/dev/seed-courses/route.ts`
  - Dev/ops endpoint that:
    1. Ensures each `programs.code` exists.
    2. Deletes existing `course_modules` and `course_lessons` for that program.
    3. Inserts new modules and lessons from `programSeeds`.

## How to Use

1. Make sure Supabase is configured:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Send a POST request to:
   ```bash
   curl -X POST http://localhost:3000/api/dev/seed-courses
   ```

4. Check Supabase tables:
   - `programs`
   - `course_modules`
   - `course_lessons`

You can update `lms-data/courseSeed.ts` any time (add modules, adjust lessons, set real URLs to HSI/Milady/IRS VITA/Intuit content) and run the seed again to refresh the structure.

## Important Note

In production, lock down or remove `/api/dev/seed-courses` so that the public cannot trigger a reseed.

## Programs Seeded

1. **CNA Training** (CNA-TRAINING) - 4 modules, 8 lessons
2. **Barber Apprenticeship** (BARBER-APP) - 4 modules, 8 lessons
3. **HVAC Technician** (HVAC-TECH) - 3 modules, 6 lessons
4. **CDL Training** (CDL-TRAIN) - 3 modules, 6 lessons
5. **Building Tech** (BUILDING-TECH-APP) - 2 modules, 4 lessons
6. **Business Support** (BUSINESS-APP) - 2 modules, 4 lessons
7. **EMS Apprenticeship** (EMS-APP) - 1 module, 2 lessons
8. **Tax & VITA** (TAX-VITA) - 3 modules, 4 lessons
9. **Esthetics** (ESTHETICS-APP) - 1 module, 2 lessons
10. **Nail Tech** (NAIL-APP) - 1 module, 2 lessons
11. **Culinary** (CULINARY-APP) - 1 module, 2 lessons

## Credential Partners Tagged

- **HSI** - Healthcare & Safety Institute
- **Milady** - Beauty & Barber curriculum
- **CareerSafe** - OSHA safety training
- **Certiport** - Digital skills certifications
- **NationalDrug** - Drug & alcohol compliance
- **IRS-VITA** - IRS Link & Learn
- **Intuit** - Intuit Tax Academy
- **JRI** - Job Ready Indy soft skills
- **Elevate** - Internal content

## Next Steps

1. **Add Real URLs**: Update `contentUrl` fields with actual partner content links
2. **Test Course Player**: Visit `/student/courses/[program-id]` to see modules/lessons
3. **Wire Enrollment**: Connect enrollment flow to automatically grant course access
4. **Progress Tracking**: Add lesson completion tracking to `lesson_progress` table
