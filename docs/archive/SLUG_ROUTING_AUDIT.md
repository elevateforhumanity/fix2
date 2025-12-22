# Slug Routing Audit - Complete Analysis

## Status: ISSUES FOUND AND DOCUMENTED

### Summary

- **Total dynamic routes:** 88 directories
- **Routes with pages:** 48 working
- **Routes missing pages:** 40 (mostly API routes - correct)
- **Critical issues found:** 3
- **Fixed:** 1 (blog [slug])

---

## Critical Issues

### 1. ✅ FIXED: Blog [slug] Route

**Location:** `app/blog/[slug]/page.tsx`  
**Issue:** Hardcoded `[slug]` text instead of dynamic parameter  
**Status:** ✅ Fixed  
**Commit:** `2fdf11e74`

**Before:**

```tsx
export const metadata = {
  title: '[slug] | Elevate For Humanity', // ❌ Hardcoded
};

export default async function slugPage() {
  // ❌ No params
  return <h1>[slug]</h1>; // ❌ Hardcoded
}
```

**After:**

```tsx
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | Elevate For Humanity`, // ✅ Dynamic
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' '); // ✅ Dynamic
  return <h1>{title}</h1>; // ✅ Dynamic
}
```

### 2. ⚠️ ISSUE: Parameter Name Mismatch

**Location:** `app/lms/(app)/courses/`  
**Issue:** Two different parameter names for same resource

```
app/lms/(app)/courses/[id]/page.tsx       ← Uses [id]
app/lms/(app)/course/[courseId]/page.tsx  ← Uses [courseId]
```

**Impact:** Confusing - same resource (course) uses different param names  
**Recommendation:** Standardize to `[courseId]` or `[id]`

### 3. ⚠️ ISSUE: Missing Page File

**Location:** `app/student/programs/[slug]/`  
**Issue:** Directory exists but no `page.tsx`

```
app/student/programs/[slug]/
└── modules/
    └── [moduleId]/
        └── page.tsx  ← Child has page, parent doesn't
```

**Impact:** `/student/programs/some-program` will 404  
**Recommendation:** Add `page.tsx` or remove directory

---

## All Dynamic Routes Analysis

### ✅ Working Page Routes (48)

#### Blog & Content

- `app/blog/[slug]/page.tsx` ✅ Fixed
- `app/blog/author/[author]/page.tsx` ✅
- `app/blog/category/[category]/page.tsx` ✅
- `app/platform/[slug]/page.tsx` ✅
- `app/programs/[slug]/page.tsx` ✅

#### LMS Routes

- `app/lms/(app)/courses/[id]/page.tsx` ✅
- `app/lms/(app)/courses/[id]/lessons/[lessonId]/page.tsx` ✅
- `app/lms/(app)/quizzes/[quizId]/page.tsx` ✅
- `app/lms/(app)/quizzes/[quizId]/results/[attemptId]/page.tsx` ✅
- `app/lms/(app)/assignments/[id]/page.tsx` ✅
- `app/lms/(app)/quiz/[id]/page.tsx` ✅
- `app/lms/(app)/course/[courseId]/page.tsx` ✅ (duplicate?)
- `app/lms/(app)/forums/[forumId]/page.tsx` ✅
- `app/lms/(app)/forums/[forumId]/threads/[threadId]/page.tsx` ✅

#### Student Portal

- `app/student/courses/[courseId]/page.tsx` ✅
- `app/student/courses/[courseId]/external/[moduleId]/page.tsx` ✅
- `app/student/courses/scorm/[courseId]/page.tsx` ✅
- `app/student/scorm/[scormId]/page.tsx` ✅
- `app/student/instructor/[programId]/page.tsx` ✅
- `app/student/jri/[id]/page.tsx` ✅
- `app/student/welcome-packet/[packetId]/page.tsx` ✅
- `app/student/milady/launch/[enrollmentId]/page.tsx` ✅
- `app/student/programs/[slug]/modules/[moduleId]/page.tsx` ✅

#### Admin Routes

- `app/admin/learner/[id]/page.tsx` ✅
- `app/admin/applications/[id]/page.tsx` ✅
- `app/admin/hr/employees/[id]/page.tsx` ✅
- `app/admin/document-center/[category]/page.tsx` ✅
- `app/admin/partners/lms-integrations/[id]/page.tsx` ✅

#### Other Routes

- `app/verify/[certificateId]/page.tsx` ✅
- `app/lessons/[lessonId]/page.tsx` ✅
- `app/sign/[documentId]/page.tsx` ✅
- `app/marketplace/product/[id]/page.tsx` ✅
- `app/cert/verify/[code]/page.tsx` ✅
- `app/certificates/[certificateNumber]/page.tsx` ✅
- `app/certificates/verify/[certificateNumber]/page.tsx` ✅
- `app/tax-filing/locations/[state]/page.tsx` ✅
- `app/program-holder/programs/[programId]/page.tsx` ✅
- `app/programs/admin/programs/[programId]/page.tsx` ✅
- `app/cm/learners/[id]/page.tsx` ✅
- `app/portal/student/courses/[courseId]/page.tsx` ✅
- `app/portal/student/scorm/[scormId]/page.tsx` ✅
- `app/portal/student/instructor/[programId]/page.tsx` ✅
- `app/portal/student/jri/[id]/page.tsx` ✅
- `app/courses/[courseId]/lessons/[lessonId]/quiz/results/[attemptId]/page.tsx` ✅
- `app/courses/[courseId]/lessons/[lessonId]/quiz/review/[attemptId]/page.tsx` ✅

### ✅ API Routes (Should have route.ts, not page.tsx)

These are **correct** - API routes use `route.ts`:

- `app/api/notes/[id]/route.ts` ✅
- `app/api/verify/certificate/[certificateId]/route.ts` ✅
- `app/api/courses/[courseId]/route.ts` ✅
- `app/api/quizzes/[quizId]/route.ts` ✅
- `app/api/admin/applications-secure/[id]/route.ts` ✅
- `app/api/admin/program-holders/[id]/route.ts` ✅
- `app/api/admin/applications/[id]/route.ts` ✅
- `app/api/scorm/enrollment/[enrollmentId]/route.ts` ✅
- `app/api/wioa/case-management/[id]/route.ts` ✅
- `app/api/wioa/iep/[id]/route.ts` ✅
- `app/api/messages/[id]/route.ts` ✅
- `app/api/cm/learners/[id]/route.ts` ✅
- And many more...

### ⚠️ Missing Files (Need Investigation)

#### Admin Routes

- `app/admin/courses/[id]/` - No page file
- `app/admin/courses/[id]/quizzes/[quizId]/` - No page file
- `app/admin/programs/[code]/` - No page file
- `app/admin/program-holders/[id]/` - No page file
- `app/admin/employers/[id]/` - No page file

#### Course Routes

- `app/courses/[courseId]/` - No page file (but has nested routes)
- `app/courses/[courseId]/lessons/[lessonId]/` - No page file (but has nested routes)
- `app/courses/partners/[courseId]/` - No page file
- `app/courses/hsi/[courseType]/` - No page file

#### Other

- `app/instructor/courses/[courseId]/` - No page file
- `app/student/programs/[slug]/` - No page file ⚠️ **Critical**

---

## Parameter Naming Patterns

### Consistent Patterns ✅

- `[id]` - Generic ID (most common)
- `[slug]` - URL-friendly string
- `[courseId]` - Course identifier
- `[lessonId]` - Lesson identifier
- `[quizId]` - Quiz identifier
- `[certificateId]` / `[certificateNumber]` / `[code]` - Certificate identifiers

### Inconsistent Patterns ⚠️

- Course: `[id]` vs `[courseId]` (both used)
- Certificate: `[certificateId]` vs `[certificateNumber]` vs `[code]` (three different names)

---

## Recommendations

### High Priority

1. **Fix student/programs/[slug]**

   ```bash
   # Either add page.tsx or remove directory
   # Currently: /student/programs/some-program → 404
   ```

2. **Standardize course parameter names**

   ```bash
   # Choose one: [id] or [courseId]
   # Update all course routes to use same name
   ```

3. **Standardize certificate parameter names**
   ```bash
   # Choose one: [certificateId], [certificateNumber], or [code]
   # Update all certificate routes to use same name
   ```

### Medium Priority

4. **Add missing admin pages**
   - `app/admin/courses/[id]/page.tsx`
   - `app/admin/programs/[code]/page.tsx`
   - `app/admin/employers/[id]/page.tsx`

5. **Clarify course route structure**
   - `app/courses/[courseId]/` - Add page or redirect
   - `app/courses/partners/[courseId]/` - Add page or remove

### Low Priority

6. **Document route structure**
   - Create routing guide
   - Document parameter naming conventions
   - Add examples for each pattern

---

## Testing Checklist

### Test These Routes

```bash
# Blog routes
/blog/career-training ✅ Fixed
/blog/author/john-doe ✅
/blog/category/technology ✅

# Program routes
/programs/workforce-development ✅
/student/programs/workforce-development ❌ 404 (missing page)

# Course routes
/lms/courses/123 ✅
/lms/course/123 ✅ (duplicate?)
/courses/123 ❌ (missing page)

# Certificate routes
/verify/abc123 ✅
/certificates/abc123 ✅
/certificates/verify/abc123 ✅
/cert/verify/abc123 ✅
```

---

## Summary

| Category                        | Count | Status |
| ------------------------------- | ----- | ------ |
| **Total dynamic routes**        | 88    | -      |
| **Working page routes**         | 48    | ✅     |
| **Working API routes**          | 30+   | ✅     |
| **Missing pages (intentional)** | 7     | ⚠️     |
| **Missing pages (needs fix)**   | 3     | ❌     |
| **Parameter mismatches**        | 2     | ⚠️     |
| **Fixed issues**                | 1     | ✅     |

---

## Conclusion

✅ **Blog [slug] route fixed** - No longer shows hardcoded `[slug]` text  
⚠️ **3 issues need attention:**

1. `student/programs/[slug]` missing page
2. Course parameter name inconsistency (`[id]` vs `[courseId]`)
3. Certificate parameter name inconsistency (3 different names)

**Most routes are working correctly.** The main issues are:

- Missing page files (some intentional, some not)
- Parameter naming inconsistencies
- One critical fix completed (blog slug)

---

**Audit Date:** December 16, 2025  
**Status:** Documented and partially fixed  
**Next Steps:** Fix student/programs/[slug] and standardize parameter names
