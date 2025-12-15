# Page Consolidation Plan - Remove Bloat

## KEEP (Primary Pages) vs DELETE (Duplicates)

### Student Portal
**KEEP:** `/student-portal` (main entry)
**KEEP:** `/student/*` (all student features under one path)
**DELETE:**
- `/portal/student/*` (duplicate of /student/*)
- `/demo/student` (demo not needed)
- `/docs/students` (move to /student/help)
- `/delegate/students` (admin feature, move to admin)
- `/checkout/student` (move to /student/checkout)

### Apply Pages
**KEEP:** `/apply` (main application)
**KEEP:** `/apply/full` (full application form)
**DELETE:**
- `/apprenticeships/apply` (redirect to /apply?program=apprenticeship)
- `/financial-aid/apply` (redirect to /apply)
- `/marketplace/apply` (redirect to /apply)
- `/program-holder/apply` (admin feature)
- `/programs/admin/apply` (admin feature)
- `/serene-comfort-care/apply` (specific business, remove)
- `/shop/apply` (redirect to /apply)
- `/supersonic-cash/apply` (specific business, remove)
- `/supersonic-fast-cash/apply` (specific business, remove)
- `/tax-filing/apply` (redirect to /apply?program=tax)

### Contact Pages
**KEEP:** `/contact` (main contact)
**DELETE:**
- `/support/contact` (redirect to /contact)
- `/urban-build-crew/contact` (specific business, remove)
- `/admin/contacts` (admin feature, keep in admin)

### About Pages
**KEEP:** `/about` (main about)
**KEEP:** `/about/team` (team page)
**DELETE:**
- `/rise-foundation/about` (specific business, remove)
- `/urban-build-crew/about` (specific business, remove)

### Programs Pages
**KEEP:** `/programs` (main programs listing)
**KEEP:** `/programs/[slug]` (individual programs)
**KEEP:** `/compare-programs` (comparison tool)
**KEEP:** `/admin/programs/*` (admin features)
**DELETE:**
- `/programs-full` (duplicate of /programs)
- `/programs-lms` (redirect to /student-portal)
- `/kingdom-konnect/programs` (specific business, remove)
- `/rise-foundation/programs` (specific business, remove)
- `/program-holder/*` (consolidate into admin)

## Specific Business Pages to Remove
These appear to be white-label or specific business instances:
- `/serene-comfort-care/*`
- `/supersonic-cash/*`
- `/supersonic-fast-cash/*`
- `/urban-build-crew/*`
- `/rise-foundation/*`
- `/kingdom-konnect/*`
- `/program-holder/*`

## Action Plan

### Phase 1: Backup and Analysis
1. Create backup branch
2. Document all page features
3. Identify unique functionality

### Phase 2: Consolidate Features
1. Merge unique features from duplicates into primary pages
2. Create redirects for old URLs
3. Update internal links

### Phase 3: Delete Duplicates
1. Remove duplicate pages
2. Test all navigation
3. Verify no broken links

### Phase 4: Update Navigation
1. Update header with clean structure
2. Update footer with clean structure
3. Create sitemap

## Estimated Reduction
- Current: 482 pages
- After consolidation: ~150 pages
- Reduction: 332 pages (69% reduction)

## Next Steps
1. Get approval for consolidation plan
2. Create backup branch
3. Begin consolidation
