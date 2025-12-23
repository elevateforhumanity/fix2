# Cross-Wiring Findings

Generated: 2025-12-23T19:51:00.244Z

## Summary

- **Total Findings:** 130
- **CRITICAL:** 82
- **HIGH:** 48
- **MEDIUM:** 0

## CRITICAL Issues (82)

### 1. missing_org_scope

- **Route:** `/partners/admin/placements`
- **Category:** programHolder
- **File:** `app/(partner)/partners/admin/placements/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: apprentice_placements

### 2. missing_org_scope

- **Route:** `/partners/admin/shops`
- **Category:** programHolder
- **File:** `app/(partner)/partners/admin/shops/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: shops

### 3. missing_org_scope

- **Route:** `/partners/attendance`
- **Category:** programHolder
- **File:** `app/(partner)/partners/attendance/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: shop_staff, apprentice_placements, partner_attendance

### 4. missing_org_scope

- **Route:** `/partners/documents`
- **Category:** programHolder
- **File:** `app/(partner)/partners/documents/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: shop_staff, partner_documents

### 5. missing_org_scope

- **Route:** `/partners/reports/weekly`
- **Category:** programHolder
- **File:** `app/(partner)/partners/reports/weekly/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: shop_staff, apprentice_placements, apprentice_weekly_reports

### 6. missing_org_scope

- **Route:** `/partners/students`
- **Category:** programHolder
- **File:** `app/(partner)/partners/students/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: apprentice_placements

### 7. missing_org_scope

- **Route:** `/employer/dashboard`
- **Category:** employer
- **File:** `app/employer/dashboard/page.tsx`
- **Message:** employer route missing organization_id filter on tables: job_postings, job_applications, apprenticeship_programs

### 8. missing_org_scope

- **Route:** `/instructor/courses/:courseId/gradebook`
- **Category:** instructor
- **File:** `app/instructor/courses/[courseId]/gradebook/page.tsx`
- **Message:** instructor route missing organization_id filter on tables: courses

### 9. missing_org_scope

- **Route:** `/instructor/dashboard`
- **Category:** instructor
- **File:** `app/instructor/dashboard/page.tsx`
- **Message:** instructor route missing organization_id filter on tables: enrollments

### 10. missing_user_scope

- **Route:** `/lms/attendance`
- **Category:** lms
- **File:** `app/lms/(app)/attendance/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 11. missing_user_scope

- **Route:** `/lms/certificates`
- **Category:** lms
- **File:** `app/lms/(app)/certificates/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, certificates

### 12. missing_user_scope

- **Route:** `/lms/courses/:courseId/complete`
- **Category:** lms
- **File:** `app/lms/(app)/courses/[courseId]/complete/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: courses, lms_progress

### 13. missing_user_scope

- **Route:** `/lms/courses/:courseId/launch`
- **Category:** lms
- **File:** `app/lms/(app)/courses/[courseId]/launch/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: courses, lms_progress

### 14. missing_user_scope

- **Route:** `/lms/courses/new`
- **Category:** lms
- **File:** `app/lms/(app)/courses/new/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 15. missing_user_scope

- **Route:** `/lms/files`
- **Category:** lms
- **File:** `app/lms/(app)/files/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 16. missing_user_scope

- **Route:** `/lms/learning-paths`
- **Category:** lms
- **File:** `app/lms/(app)/learning-paths/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 17. missing_user_scope

- **Route:** `/lms/progress`
- **Category:** lms
- **File:** `app/lms/(app)/progress/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 18. missing_user_scope

- **Route:** `/lms/social`
- **Category:** lms
- **File:** `app/lms/(app)/social/page.tsx`
- **Message:** lms route missing user_id/profile_id filter on tables: profiles, enrollments, student_progress

### 19. missing_org_scope

- **Route:** `/partners/join`
- **Category:** programHolder
- **File:** `app/partners/join/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: partner_profiles, role_packages

### 20. missing_org_scope

- **Route:** `/program-holder/compliance`
- **Category:** programHolder
- **File:** `app/program-holder/compliance/page.tsx`
- **Message:** programHolder route missing organization_id filter on tables: program_holders, program_holder_documents, apprentice_weekly_reports, program_holder_students


_... and 62 more CRITICAL issues_

## HIGH Issues (48)

### 1. shop_without_scope

- **Route:** `/partners/admin/shops`
- **Category:** programHolder
- **File:** `app/(partner)/partners/admin/shops/page.tsx`
- **Message:** Shop access without organization_id filter - potential data leakage

### 2. unauthorized_table_access

- **Route:** `/partners/attendance`
- **Category:** programHolder
- **File:** `app/(partner)/partners/attendance/page.tsx`
- **Message:** programHolder route accessing table 'partner_attendance' which is not in allowed list

### 3. unauthorized_table_access

- **Route:** `/partners/documents`
- **Category:** programHolder
- **File:** `app/(partner)/partners/documents/page.tsx`
- **Message:** programHolder route accessing table 'partner_documents' which is not in allowed list

### 4. unauthorized_table_access

- **Route:** `/employer/dashboard`
- **Category:** employer
- **File:** `app/employer/dashboard/page.tsx`
- **Message:** employer route accessing table 'job_applications' which is not in allowed list

### 5. unauthorized_table_access

- **Route:** `/employer/dashboard`
- **Category:** employer
- **File:** `app/employer/dashboard/page.tsx`
- **Message:** employer route accessing table 'apprenticeship_programs' which is not in allowed list

### 6. unauthorized_table_access

- **Route:** `/lms/certificates`
- **Category:** lms
- **File:** `app/lms/(app)/certificates/page.tsx`
- **Message:** lms route accessing table 'certificates' which is not in allowed list

### 7. unauthorized_table_access

- **Route:** `/lms/courses/:courseId/complete`
- **Category:** lms
- **File:** `app/lms/(app)/courses/[courseId]/complete/page.tsx`
- **Message:** lms route accessing table 'lms_progress' which is not in allowed list

### 8. unauthorized_table_access

- **Route:** `/lms/courses/:courseId/launch`
- **Category:** lms
- **File:** `app/lms/(app)/courses/[courseId]/launch/page.tsx`
- **Message:** lms route accessing table 'lms_progress' which is not in allowed list

### 9. unauthorized_table_access

- **Route:** `/lms/courses/:courseId/lessons/:lessonId`
- **Category:** lms
- **File:** `app/lms/(app)/courses/[courseId]/lessons/[lessonId]/page.tsx`
- **Message:** lms route accessing table 'lesson_progress' which is not in allowed list

### 10. unauthorized_table_access

- **Route:** `/lms/dashboard`
- **Category:** lms
- **File:** `app/lms/(app)/dashboard/page.tsx`
- **Message:** lms route accessing table 'course_progress' which is not in allowed list

### 11. unauthorized_table_access

- **Route:** `/lms/dashboard`
- **Category:** lms
- **File:** `app/lms/(app)/dashboard/page.tsx`
- **Message:** lms route accessing table 'certifications' which is not in allowed list

### 12. unauthorized_table_access

- **Route:** `/lms/dashboard`
- **Category:** lms
- **File:** `app/lms/(app)/dashboard/page.tsx`
- **Message:** lms route accessing table 'job_placements' which is not in allowed list

### 13. unauthorized_table_access

- **Route:** `/partners/join`
- **Category:** programHolder
- **File:** `app/partners/join/page.tsx`
- **Message:** programHolder route accessing table 'partner_profiles' which is not in allowed list

### 14. unauthorized_table_access

- **Route:** `/partners/join`
- **Category:** programHolder
- **File:** `app/partners/join/page.tsx`
- **Message:** programHolder route accessing table 'role_packages' which is not in allowed list

### 15. unauthorized_table_access

- **Route:** `/program-holder/courses/create`
- **Category:** programHolder
- **File:** `app/program-holder/courses/create/page.tsx`
- **Message:** programHolder route accessing table 'courses' which is not in allowed list

### 16. unauthorized_table_access

- **Route:** `/program-holder/dashboard`
- **Category:** programHolder
- **File:** `app/program-holder/dashboard/page.tsx`
- **Message:** programHolder route accessing table 'enrollments' which is not in allowed list

### 17. unauthorized_table_access

- **Route:** `/program-holder/dashboard`
- **Category:** programHolder
- **File:** `app/program-holder/dashboard/page.tsx`
- **Message:** programHolder route accessing table 'student_verifications' which is not in allowed list

### 18. unauthorized_table_access

- **Route:** `/program-holder/dashboard`
- **Category:** programHolder
- **File:** `app/program-holder/dashboard/page.tsx`
- **Message:** programHolder route accessing table 'compliance_reports' which is not in allowed list

### 19. unauthorized_table_access

- **Route:** `/program-holder/dashboard`
- **Category:** programHolder
- **File:** `app/program-holder/dashboard/page.tsx`
- **Message:** programHolder route accessing table 'compliance_scores' which is not in allowed list

### 20. unauthorized_table_access

- **Route:** `/program-holder/grades`
- **Category:** programHolder
- **File:** `app/program-holder/grades/page.tsx`
- **Message:** programHolder route accessing table 'programs' which is not in allowed list


_... and 28 more HIGH issues_

