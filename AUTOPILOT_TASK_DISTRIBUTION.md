# Autopilot Task Distribution - Program Standardization System

## 🤖 Overview
This document distributes 76 pending todos across 40 autopilots for parallel execution.

---

## 📊 Task Summary

**Total Pending Tasks:** 76
**Autopilots Available:** 40
**Average Tasks per Autopilot:** ~2 tasks
**Estimated Completion Time:** 2-4 hours (with parallel execution)

---

## 🎯 Priority Groups

### Priority 1: Critical Path (Must Complete First)
**Autopilots 1-10**

### Priority 2: Core Features (Can Run in Parallel)
**Autopilots 11-25**

### Priority 3: Testing & Validation (After Core Complete)
**Autopilots 26-35**

### Priority 4: Documentation & Cleanup (Final Phase)
**Autopilots 36-40**

---

## 🤖 Autopilot Assignments

### AUTOPILOT 1: Database Migration Specialist
**Tasks:**
- todo_173: Create Supabase migration for programs table
- todo_174: Create programs table with slug, name, short_description, long_description fields
- todo_175: Add indexes for slug lookup performance

**Commands:**
```bash
cd /workspaces/fix2
supabase db push
supabase db execute -c "SELECT * FROM public.programs LIMIT 1;"
```

**Success Criteria:**
- Migration runs without errors
- Table exists in Supabase
- Indexes created successfully

---

### AUTOPILOT 2: Database Seeding Specialist
**Tasks:**
- todo_176: Create Supabase seed file with all 7 program descriptions
- todo_177: Test migration locally with supabase db push
- todo_178: Apply seed data to Supabase (local or production)

**Commands:**
```bash
supabase db execute -f supabase/seed/programs_seed.sql
supabase db execute -c "SELECT COUNT(*) FROM public.programs;"
```

**Success Criteria:**
- Seed file executes without errors
- 7 programs inserted into database
- All fields populated correctly

---

### AUTOPILOT 3: Data Verification Specialist
**Tasks:**
- todo_179: Verify programs table populated correctly in Supabase dashboard
- todo_209: Verify data consistency between Supabase and frontend

**Commands:**
```bash
supabase db execute -c "SELECT slug, name, short_description FROM public.programs ORDER BY name;"
```

**Success Criteria:**
- All 7 programs visible in Supabase dashboard
- Data matches seed file exactly
- No NULL values in required fields

---

### AUTOPILOT 4: Server Actions Developer
**Tasks:**
- todo_225: Create app/admin/programs/actions.ts with server actions for CRUD operations
- todo_228: Add revalidatePath calls to refresh caches after updates

**Files to Create:**
- `app/admin/programs/actions.ts` (already created, verify it works)

**Success Criteria:**
- Server actions compile without errors
- updateProgramAction function works
- Cache revalidation triggers correctly

---

### AUTOPILOT 5: Admin Edit Page Developer
**Tasks:**
- todo_226: Create app/admin/programs/[slug]/page.tsx for editing individual programs
- todo_227: Update app/admin/programs/page.tsx to include Edit links

**Files to Create:**
- `app/admin/programs/[slug]/page.tsx`

**Success Criteria:**
- Edit page renders correctly
- Form fields populate with existing data
- Save button triggers server action

---

### AUTOPILOT 6: Admin Interface Tester
**Tasks:**
- todo_229: Test admin edit form loads correctly
- todo_230: Test saving changes updates Supabase and refreshes public pages
- todo_231: Test password protection works on edit pages

**Test URLs:**
```
/admin/programs?key=PASSWORD
/admin/programs/hvac-technician?key=PASSWORD
```

**Success Criteria:**
- Edit form loads without errors
- Changes save to database
- Public pages refresh automatically
- Password protection works

---

### AUTOPILOT 7: Environment Configuration Specialist
**Tasks:**
- todo_190: Verify NEXT_PUBLIC_SUPABASE_URL environment variable is set
- todo_191: Verify SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is set
- todo_200: Set ADMIN_DASHBOARD_PASSWORD environment variable
- todo_201: Set NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL environment variable (optional)

**Commands:**
```bash
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
echo $ADMIN_DASHBOARD_PASSWORD
```

**Success Criteria:**
- All required env vars set
- Values are correct and accessible
- No missing or empty variables

---

### AUTOPILOT 8: Program Page Migration Specialist
**Tasks:**
- todo_187: Update app/programs/[slug]/page.tsx to use Supabase data
- todo_188: Update app/programs/page.tsx to use Supabase data
- todo_215: Replace old program pages with new Supabase versions

**Commands:**
```bash
cp app/programs/[slug]/page-supabase-new.tsx app/programs/[slug]/page.tsx
```

**Success Criteria:**
- New pages use Supabase data layer
- Old pages backed up
- No compilation errors

---

### AUTOPILOT 9: Homepage Integration Specialist
**Tasks:**
- todo_137: Import and wire HomeProgramsSection into homepage
- todo_138: Position HomeProgramsSection below hero, above footer
- todo_144: Add HighlightStrip import to homepage
- todo_145: Insert HighlightStrip component after hero section

**File to Edit:**
- `app/page.tsx` (already updated, verify integration)

**Success Criteria:**
- Components imported correctly
- Positioned in correct order
- No layout issues

---

### AUTOPILOT 10: Component Verification Specialist
**Tasks:**
- todo_135: Create components/home/HomeProgramsSection.tsx component
- todo_142: Create components/home/HighlightStrip.tsx component
- todo_149: Create components/home/HomeProgramsSection.tsx component with program grid
- todo_164: Create components/ui/FundingToast.tsx with localStorage dismiss

**Success Criteria:**
- All components exist
- No TypeScript errors
- Components export correctly

---

### AUTOPILOT 11-15: Program Page Testers
**Each autopilot tests specific program pages:**

**AUTOPILOT 11:**
- todo_192: Test /programs index page loads from Supabase
- todo_216: Test all program pages load correctly from Supabase

**AUTOPILOT 12:**
- todo_193: Test /programs/[slug] pages load from Supabase
- Test: /programs/hvac-technician

**AUTOPILOT 13:**
- Test: /programs/barber-apprenticeship
- Test: /programs/cna

**AUTOPILOT 14:**
- Test: /programs/cdl
- Test: /programs/building-maintenance

**AUTOPILOT 15:**
- Test: /programs/building-technician
- Test: /programs/workforce-readiness

---

### AUTOPILOT 16: Admin Page Tester
**Tasks:**
- todo_194: Test /admin/programs shows all programs from database
- todo_202: Test admin page password protection works
- todo_203: Test 'Edit in Supabase' link opens correct table
- todo_204: Verify admin page displays all programs from database
- todo_217: Test admin page with password protection

**Success Criteria:**
- Admin list shows all 7 programs
- Password gate works
- Edit links functional
- Supabase link opens correct table

---

### AUTOPILOT 17: Homepage Tester
**Tasks:**
- todo_139: Test homepage renders with new programs section
- todo_146: Test homepage renders with highlight strip
- todo_218: Test homepage with HighlightStrip and HomeProgramsSection

**Test URL:** `/`

**Success Criteria:**
- HighlightStrip displays after hero
- HomeProgramsSection shows all programs
- No layout issues
- All links work

---

### AUTOPILOT 18: CTA & Navigation Tester
**Tasks:**
- todo_140: Verify all program cards link correctly to /programs/[slug]
- todo_141: Verify Start application CTAs work with correct slugs
- todo_105: Check all program CTAs point to correct routes
- todo_154: Verify all CTAs and navigation work end-to-end

**Success Criteria:**
- All program cards link to correct pages
- Apply buttons link to /apply?program=[slug]
- Contact buttons link to /contact?topic=[slug]
- No broken links

---

### AUTOPILOT 19: FundingToast Tester
**Tasks:**
- todo_168: Test FundingToast appears after 1.5s delay on first visit
- todo_169: Test FundingToast dismissal stores in localStorage
- todo_170: Test FundingToast doesn't reappear after dismissal
- todo_219: Test FundingToast appears and dismisses correctly

**Success Criteria:**
- Toast appears after 1.5s on first visit
- Dismiss button works
- localStorage stores dismissal
- Toast doesn't reappear after dismissal

---

### AUTOPILOT 20: Image Verification Specialist
**Tasks:**
- todo_99: Audit and organize program images in public/images/programs/
- todo_107: Verify program images are properly sized and displaying
- todo_112: Verify all program images exist and are properly sized
- todo_131: Check public/images/programs/ directory for existing hero images
- todo_220: Verify all images load properly

**Commands:**
```bash
ls -lh public/images/programs/*-hero.jpg
```

**Success Criteria:**
- All 7 hero images exist
- Images are properly sized (not stretched/pixelated)
- File sizes reasonable (< 500KB each)
- All images display correctly on pages

---

### AUTOPILOT 21: Responsive Design Tester
**Tasks:**
- todo_147: Verify highlight strip is responsive on mobile and desktop
- todo_171: Verify FundingToast is responsive on mobile and desktop
- todo_221: Check responsive behavior on mobile/tablet/desktop

**Test Viewports:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1280px

**Success Criteria:**
- No horizontal scroll on any viewport
- All content readable
- Images scale properly
- CTAs accessible

---

### AUTOPILOT 22: Visual QA Specialist
**Tasks:**
- todo_148: Verify all icons and labels display correctly
- todo_155: Final visual QA: check spacing, typography, and responsive behavior
- todo_222: Run final QA on all pages

**Success Criteria:**
- Consistent spacing throughout
- Typography hierarchy clear
- Colors match brand
- No visual bugs

---

### AUTOPILOT 23: Integration Strategy Specialist
**Tasks:**
- todo_156: Analyze existing Supabase integration in app/programs/[slug]/page.tsx
- todo_157: Determine integration strategy: keep Supabase OR use centralized programs.ts
- todo_180: Update hybrid data service to prioritize Supabase over static data

**Success Criteria:**
- Integration strategy documented
- Hybrid service works correctly
- Fallback to static data if Supabase unavailable

---

### AUTOPILOT 24: Data Sync Specialist
**Tasks:**
- todo_158: If keeping Supabase: sync programs.ts data to Supabase database
- todo_181: Test program pages still work with Supabase as primary source

**Success Criteria:**
- All program data in Supabase matches programs.ts
- Pages load from Supabase successfully
- No data inconsistencies

---

### AUTOPILOT 25: Component Update Specialist
**Tasks:**
- todo_159: If using programs.ts: update [slug]/page.tsx to use getProgramBySlug
- todo_160: Update programs index page to match chosen integration approach
- todo_161: Verify HomeProgramsSection works with chosen data source

**Success Criteria:**
- Components use correct data source
- No hardcoded data
- Dynamic rendering works

---

### AUTOPILOT 26: Testing Coordinator
**Tasks:**
- todo_101: Test all program pages for consistency
- todo_106: Test all program pages for consistency and layout
- todo_113: Test all program pages render correctly
- todo_123: Test dynamic program pages render correctly
- todo_127: Test all program pages render with new dynamic component

**Success Criteria:**
- All pages render without errors
- Consistent layout across pages
- No missing content

---

### AUTOPILOT 27: Link & Route Tester
**Tasks:**
- todo_124: Verify all program links and CTAs work
- todo_151: Verify program card links work correctly
- todo_195: Verify no 404 errors or slug mismatches

**Success Criteria:**
- All internal links work
- No 404 errors
- Slugs match between database and URLs

---

### AUTOPILOT 28: Content Verification Specialist
**Tasks:**
- todo_104: Review and verify all program descriptions are clear and professional
- todo_116: Verify all program descriptions match the master package exactly
- todo_182: Document data source decision and update patterns

**Success Criteria:**
- All descriptions ETPL-safe
- Content matches ONE-SHOT package
- Documentation updated

---

### AUTOPILOT 29: Image Integration Specialist
**Tasks:**
- todo_129: Update app/programs/[slug]/page.tsx with hero image support
- todo_130: Verify heroImage and heroImageAlt fields already exist in Program type
- todo_132: Test program pages with hero images render correctly
- todo_133: Verify images are not stretched or pixelated

**Success Criteria:**
- Hero images display on all program pages
- Images not distorted
- Alt text present
- Responsive sizing works

---

### AUTOPILOT 30: Programs Index Specialist
**Tasks:**
- todo_122: Create app/programs/page.tsx programs index page
- todo_128: Verify program index page displays all programs correctly
- todo_134: Update programs index page to show hero image thumbnails

**Success Criteria:**
- Index page lists all programs
- Thumbnails display correctly
- Grid layout responsive

---

### AUTOPILOT 31: Homepage Testing Specialist
**Tasks:**
- todo_150: Test HomeProgramsSection renders all programs with images
- todo_153: Test complete homepage flow: hero → highlight strip → programs section

**Success Criteria:**
- All sections render in correct order
- Images load
- Flow is logical

---

### AUTOPILOT 32: Admin Feature Specialist
**Tasks:**
- todo_196: Optional: Add 'Edit in Supabase' link to admin page (already done)
- todo_205: Optional: Create inline edit form for programs in admin page
- todo_233: Optional: Add slug editing with collision checks
- todo_234: Optional: Add create/delete program functionality
- todo_235: Optional: Add image picker for hero images

**Success Criteria:**
- Optional features documented
- Implementation plan created
- Can be added later if needed

---

### AUTOPILOT 33: Password Protection Specialist
**Tasks:**
- todo_197: Optional: Add password protection to /admin/programs route (already done)
- todo_198: Update app/admin/programs/page.tsx with password protection
- todo_199: Add 'Edit in Supabase' button to admin page

**Success Criteria:**
- Password protection works
- Edit button functional
- Unauthorized access blocked

---

### AUTOPILOT 34: Supabase User Integration Specialist
**Tasks:**
- todo_172: Optional: Make FundingToast Supabase-user aware (store dismissal in user metadata)

**Success Criteria:**
- Plan documented for future implementation
- Current localStorage approach works

---

### AUTOPILOT 35: Testing Documentation Specialist
**Tasks:**
- todo_162: Test all program pages render correctly with final integration
- todo_163: Document data source decision and update patterns
- todo_208: Test all program pages load from Supabase after migration
- todo_232: Verify public pages show updated content immediately after save

**Success Criteria:**
- All tests pass
- Documentation complete
- Integration patterns documented

---

### AUTOPILOT 36: File Cleanup Specialist
**Tasks:**
- todo_211: Consolidate and clean up duplicate/backup files
- todo_236: Complete all pending todos from earlier

**Commands:**
```bash
# List backup files
find app -name "*backup*" -o -name "*old*" -o -name "*new*"

# Keep important backups, remove temporary files
```

**Success Criteria:**
- Duplicate files removed
- Important backups preserved
- Clean file structure

---

### AUTOPILOT 37: Migration Execution Specialist
**Tasks:**
- todo_206: Run Supabase migrations to create programs table
- todo_207: Apply seed data to populate programs table
- todo_212: Run Supabase migrations (supabase db push)
- todo_213: Apply seed data to populate programs table

**Commands:**
```bash
supabase db push
supabase db execute -f supabase/seed/programs_seed.sql
```

**Success Criteria:**
- Migrations run successfully
- Seed data applied
- Database ready for use

---

### AUTOPILOT 38: Environment Setup Specialist
**Tasks:**
- todo_214: Set all required environment variables

**Variables to Set:**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_DASHBOARD_PASSWORD=
NEXT_PUBLIC_SUPABASE_PROGRAMS_MANAGE_URL=
```

**Success Criteria:**
- All env vars set in .env.local
- All env vars set in production
- Values verified correct

---

### AUTOPILOT 39: Git & Deployment Specialist
**Tasks:**
- todo_210: Review all created files and components
- todo_223: Create git commit with all changes
- todo_238: Create comprehensive git commit
- todo_224: Deploy to production environment
- todo_239: Deploy to production

**Commands:**
```bash
git status
git add .
git commit -m "feat: implement program standardization system with Supabase integration"
git push origin main
```

**Success Criteria:**
- All changes committed
- Commit message descriptive
- Pushed to remote
- Deployed successfully

---

### AUTOPILOT 40: Final QA & Documentation Specialist
**Tasks:**
- todo_237: Run final QA on entire system

**Final Checks:**
- All pages load
- All features work
- No console errors
- Performance acceptable
- Documentation complete

**Success Criteria:**
- System ready for production
- All tests pass
- Documentation up to date

---

## 📝 Execution Order

### Phase 1: Foundation (Autopilots 1-10)
**Duration:** 30-60 minutes
- Database setup
- Environment configuration
- Core file creation

### Phase 2: Development (Autopilots 11-25)
**Duration:** 60-90 minutes
- Component development
- Page updates
- Integration work

### Phase 3: Testing (Autopilots 26-35)
**Duration:** 45-60 minutes
- Comprehensive testing
- Bug fixes
- Validation

### Phase 4: Finalization (Autopilots 36-40)
**Duration:** 30-45 minutes
- Cleanup
- Documentation
- Deployment

---

## 🚨 Critical Dependencies

**Must Complete Before Others:**
1. Autopilot 1 (Database Migration) → Blocks: 2, 3, 8, 16
2. Autopilot 2 (Database Seeding) → Blocks: 3, 16, 26
3. Autopilot 7 (Environment Setup) → Blocks: All
4. Autopilot 8 (Page Migration) → Blocks: 11-15, 26

---

## 📊 Progress Tracking

Create a simple tracking sheet:

```
Autopilot | Status | Tasks Complete | Issues | ETA
----------|--------|----------------|--------|----
1         | ⬜     | 0/3            | None   | 15min
2         | ⬜     | 0/3            | None   | 15min
...
```

---

## 🆘 Escalation Path

**If Autopilot Encounters Issues:**
1. Document the error
2. Mark task as blocked
3. Move to next task
4. Report to coordinator

**Common Issues:**
- Supabase connection errors → Check env vars
- TypeScript errors → Check imports
- 404 errors → Check slugs match
- Image issues → Verify files exist

---

## ✅ Success Criteria

**System is Ready When:**
- ✅ All 76 todos marked complete
- ✅ All tests passing
- ✅ No console errors
- ✅ Documentation complete
- ✅ Deployed to production
- ✅ Monitoring in place

---

**Coordinator:** Ona
**Start Time:** [To be filled]
**Target Completion:** [To be filled]
**Actual Completion:** [To be filled]

---

**Ready to activate autopilots!** 🚀
