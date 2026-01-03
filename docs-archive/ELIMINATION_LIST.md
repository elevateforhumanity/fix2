# ELIMINATION LIST - Review Before Deleting

**Total directories in app/:** 248  
**Target to remove:** ~150 directories (60%)

---

## ❌ CATEGORY 1: DUPLICATE DASHBOARDS (Remove 4)

These are exact duplicates of existing dashboards:

1. `app/portal/` → DUPLICATE of `/lms/` (student dashboard)
2. `app/program-holder-portal/` → DUPLICATE of `/program-holder/`
3. `app/admin-portal/` → DUPLICATE of `/admin/`
4. `app/student-portal/` → DUPLICATE of `/lms/`

**Keep:** `/lms/`, `/program-holder/`, `/admin/`, `/staff-portal/`

---

## ❌ CATEGORY 2: TEST/DEMO ROUTES (Remove 6)

Development/testing routes not needed in production:

5. `app/demo/`
6. `app/demos/`
7. `app/pwa-test/`
8. `app/test-dashboard/`
9. `app/diagnostic/`
10. `app/dev-admin/`

---

## ❌ CATEGORY 3: NICHE BUSINESS ROUTES (Remove 6)

Specific businesses that should be database-driven, not separate routes:

11. `app/supersonic-fast-cash/` (592KB - huge!)
12. `app/kingdom-konnect/`
13. `app/serene-comfort-care/`
14. `app/urban-build-crew/`
15. `app/selfish-inc/`
16. `app/rise-foundation/` (112KB)

**Alternative:** Create `/businesses/[slug]` dynamic route

---

## ❌ CATEGORY 4: DUPLICATE TAX ROUTES (Remove 4, Keep 1)

All tax-related, consolidate to one:

17. `app/tax-filing/` → Merge into `/tax/`
18. `app/tax-services/` → Merge into `/tax/`
19. `app/tax-software/` → Merge into `/tax/`
20. `app/vita/` → Merge into `/tax/`

**Keep:** `app/tax/` (make it comprehensive)

---

## ❌ CATEGORY 5: DUPLICATE PROGRAM ROUTES (Remove 2, Keep 1)

21. `app/programs-catalog/` → DUPLICATE of `/programs/`
22. `app/program-finder/` → DUPLICATE of `/programs/`

**Keep:** `app/programs/` (add search/filter features)

---

## ❌ CATEGORY 6: DUPLICATE CAREER ROUTES (Remove 2, Keep 1)

23. `app/career-center/` → Merge into `/career-services/`
24. `app/career-fair/` → Merge into `/career-services/`

**Keep:** `app/career-services/`

---

## ❌ CATEGORY 7: DUPLICATE PARTNER ROUTES (Remove 4, Keep 1)

25. `app/partner-with-us/` → Merge into `/partners/`
26. `app/partner-application/` → Merge into `/partners/`
27. `app/partner-courses/` → Merge into `/partners/`
28. `app/partner-playbook/` → Merge into `/partners/`

**Keep:** `app/partners/` (make it comprehensive)

---

## ❌ CATEGORY 8: UNUSED MARKETING PAGES (Remove 8)

Low-traffic marketing pages:

29. `app/slides/`
30. `app/reels/`
31. `app/pitch-deck/`
32. `app/media-showcase/`
33. `app/all-pages/`
34. `app/sites/`
35. `app/notebooklm/`
36. `app/enhanced-home/`

---

## ❌ CATEGORY 9: DUPLICATE STUDENT ROUTES (Remove 3, Keep 1)

37. `app/student/` → DUPLICATE of `/lms/`
38. `app/students/` → DUPLICATE of `/lms/`
39. `app/learners/` → DUPLICATE of `/lms/`

**Keep:** `app/lms/`

---

## ❌ CATEGORY 10: DUPLICATE EMPLOYER ROUTES (Remove 2, Keep 1)

40. `app/employers/` → DUPLICATE of `/employer/`
41. `app/for-employers/` → DUPLICATE of `/employer/`

**Keep:** `app/employer/`

---

## ❌ CATEGORY 11: DUPLICATE AUTH ROUTES (Remove 3)

42. `app/forgotpassword/` → Use `/auth/forgot-password`
43. `app/resetpassword/` → Use `/auth/reset-password`
44. `app/verifyemail/` → Use `/auth/verify-email`

**Keep:** `app/auth/` (consolidated)

---

## ❌ CATEGORY 12: DUPLICATE LEGAL ROUTES (Remove 2, Keep 1)

45. `app/privacy/` → DUPLICATE of `/privacy-policy/`
46. `app/terms/` → DUPLICATE of `/terms-of-service/`

**Keep:** `app/privacy-policy/`, `app/terms-of-service/`

---

## ❌ CATEGORY 13: SINGLE-PURPOSE ROUTES (Remove 15)

Routes that could be dynamic or merged:

47. `app/elevatelearn2earn/`
48. `app/snap-et-partner/`
49. `app/fssa-partnership-request/`
50. `app/workone-partner-packet/`
51. `app/jri/`
52. `app/receptionist/`
53. `app/delegate/`
54. `app/founder/`
55. `app/franchise/`
56. `app/white-label/`
57. `app/suboffice-onboarding/`
58. `app/parent-portal/`
59. `app/drug-testing/`
60. `app/drug-testing-training/`
61. `app/micro-classes/`

---

## ❌ CATEGORY 14: DUPLICATE DASHBOARD VARIANTS (Remove 3)

62. `app/dashboard/` → Redirects to role-specific dashboard
63. `app/dashboards/` → DUPLICATE
64. `app/portals/` → DUPLICATE

**Keep:** Role-specific dashboards only

---

## ❌ CATEGORY 15: DUPLICATE VERIFY ROUTES (Remove 4, Keep 1)

65. `app/verify-credential/` → Merge into `/verify/`
66. `app/verify-email/` → Merge into `/verify/`
67. `app/verify-identity/` → Merge into `/verify/`
68. `app/verifycertificate/` → Merge into `/verify/`

**Keep:** `app/verify/` (with dynamic routing)

---

## ❌ CATEGORY 16: MISC DUPLICATES (Remove 20)

69. `app/app/` → DUPLICATE of root
70. `app/app-hub/` → Merge into root
71. `app/getstarted/` → Merge into `/apply/`
72. `app/next-steps/` → Merge into `/apply/`
73. `app/thankyou/` → Merge into `/apply/`
74. `app/application-success/` → Merge into `/apply/`
75. `app/compare/` → DUPLICATE of `/compare-programs/`
76. `app/for-students/` → Merge into `/lms/`
77. `app/hire-graduates/` → Merge into `/employer/`
78. `app/training-providers/` → Merge into `/partners/`
79. `app/workforce-partners/` → Merge into `/partners/`
80. `app/agencies/` → Merge into `/partners/`
81. `app/what-we-do/` → Merge into `/about/`
82. `app/what-we-offer/` → Merge into `/programs/`
83. `app/how-it-works/` → Merge into `/about/`
84. `app/notfound/` → Use Next.js default 404
85. `app/unauthorized/` → Keep (needed)
86. `app/offline/` → Keep (PWA feature)
87. `app/status/` → Keep (health check)
88. `app/sitemap-page/` → Remove (use sitemap.xml)

---

## ✅ WHAT TO KEEP (Core Routes)

### Essential Platform
- `app/` (homepage)
- `app/about/`
- `app/programs/` (consolidated)
- `app/courses/`
- `app/apply/`
- `app/login/`
- `app/signup/`
- `app/auth/`

### Dashboards (Role-specific)
- `app/lms/` (student)
- `app/admin/` (admin)
- `app/program-holder/` (program holder)
- `app/employer/` (employer)
- `app/staff-portal/` (staff)
- `app/instructor/` (instructor)
- `app/workforce-board/` (workforce board)

### Legal/Compliance
- `app/privacy-policy/`
- `app/terms-of-service/`
- `app/accessibility/`
- `app/refund-policy/`
- `app/ferpa/`
- `app/dmca/`
- `app/copyright/`

### Marketing
- `app/contact/`
- `app/pricing/`
- `app/blog/`
- `app/partners/` (consolidated)
- `app/career-services/` (consolidated)
- `app/apprenticeships/`

### Features
- `app/api/` (all API routes)
- `app/certificates/`
- `app/credentials/`
- `app/verify/` (consolidated)
- `app/onboarding/`

### Utility
- `app/status/`
- `app/offline/`
- `app/unauthorized/`

---

## SUMMARY

**Total to Remove:** ~88 directories  
**Total to Keep:** ~60 directories  
**Reduction:** 63% fewer routes

**Expected Results:**
- Files: 1,745 → ~500 (71% reduction)
- Build time: 3+ min → <60 sec
- Pages: 972 → ~300

---

## NEXT STEPS

1. **Review this list** - confirm what can be deleted
2. **Create redirects** for removed routes
3. **Run elimination script**
4. **Test build**
5. **Verify critical routes work**

**DO NOT DELETE YET - WAITING FOR YOUR APPROVAL**
