# 🔄 Dynamic Autopilot Task Dispatch System

## 📋 Overview

This document manages **dynamic task assignment** as new todos are added during execution. Autopilots will continuously check for new assignments and pick up tasks as they become available.

---

## 🎯 Current Task Pool Status

**Last Updated:** [AUTO-UPDATE TIMESTAMP]

### Active Autopilots: 65
### Total Tasks: 202 (and growing)
### Completed: 0
### In Progress: 0
### Pending: 202
### Blocked: 0

---

## 🔄 Dynamic Assignment Queue

### NEW TASKS (Added After Initial Distribution)

**Priority: CRITICAL**
- todo_240: Create Supabase migration to add hero_image and hero_image_alt columns
- todo_241: Update lib/programs.ts to include hero fields in DbProgram type
- todo_242: Update app/admin/programs/actions.ts with create, update, delete actions
- todo_243: Create app/admin/programs/new/page.tsx for creating new programs
- todo_244: Update app/admin/programs/[slug]/page.tsx with slug editing and delete button
- todo_245: Update app/admin/programs/page.tsx with Create button and status banners
- todo_246: Update app/programs/[slug]/page.tsx to use DB hero images with fallback
- todo_247: Run new migration to add hero columns (supabase db push)

**Priority: HIGH**
- todo_248: Test creating a new program via admin interface
- todo_249: Test editing program slug and verifying redirect works
- todo_250: Test deleting a program with confirmation
- todo_251: Test hero image fields save and display correctly
- todo_252: Verify cache revalidation works after edits
- todo_253: Update existing programs in DB with hero_image paths

**Priority: OPTIONAL**
- todo_254: Optional: Add image upload to Supabase Storage
- todo_255: Optional: Wire homepage cards to pull hero thumbnails from DB

**Priority: HIGH (Image Upload System)**
- todo_256: Create API route for uploading program hero images to Supabase Storage
- todo_257: Create program-heroes storage bucket in Supabase (public)
- todo_258: Create AdminHeroImageUploader client component
- todo_259: Wire AdminHeroImageUploader into admin new program page
- todo_260: Wire AdminHeroImageUploader into admin edit program page
- todo_261: Create HomeProgramsSectionServer component (DB-powered)
- todo_262: Update homepage to use HomeProgramsSectionServer instead of static data

**Priority: TESTING (Image Upload)**
- todo_263: Test image upload functionality in admin interface
- todo_264: Test uploaded images display correctly on program pages
- todo_265: Test homepage pulls hero images from Supabase
- todo_266: Verify storage bucket permissions are correct
- todo_267: Test image upload with different file types (jpg, png, webp)
- todo_272: Update existing programs with uploaded hero images
- todo_273: Test cache invalidation after image uploads
- todo_274: Verify public URLs are accessible

**Priority: OPTIONAL (Image Enhancement)**
- todo_268: Optional: Add file size limit (5MB) to upload API
- todo_269: Optional: Add MIME type validation to upload API
- todo_270: Optional: Add client-side image cropper for 3:2 aspect ratio
- todo_271: Optional: Add image optimization before upload (max 1600px width)
- todo_275: Document image upload workflow for admins

---

## 🤖 Autopilot Assignment Strategy

### Available Autopilots (Currently Idle or Finishing)

**Autopilot 41 (NEW):** Admin CRUD Specialist
- Assigned: todo_240, todo_241, todo_242, todo_247
- Status: READY
- ETA: 20 minutes

**Autopilot 42 (NEW):** Admin UI Specialist  
- Assigned: todo_243, todo_244, todo_245, todo_246
- Status: READY
- ETA: 25 minutes

**Autopilot 43 (NEW):** Admin Testing Specialist
- Assigned: todo_248, todo_249, todo_250, todo_251, todo_252
- Status: READY (starts after 41-42 complete)
- ETA: 30 minutes

**Autopilot 44 (NEW):** Data Migration Specialist
- Assigned: todo_253
- Status: READY (starts after 41 completes)
- ETA: 15 minutes

**Autopilot 45 (NEW):** Optional Features Specialist
- Assigned: todo_254, todo_255
- Status: STANDBY (low priority)
- ETA: 45 minutes (if activated)

**Autopilot 46 (NEW):** Image Upload API Specialist
- Assigned: todo_256, todo_257, todo_258
- Status: READY
- ETA: 30 minutes

**Autopilot 47 (NEW):** Image Upload UI Specialist
- Assigned: todo_259, todo_260, todo_261, todo_262
- Status: READY (starts after 46 completes)
- ETA: 25 minutes

**Autopilot 48 (NEW):** Image Upload Testing Specialist
- Assigned: todo_263, todo_264, todo_265, todo_266, todo_267
- Status: READY (starts after 47 completes)
- ETA: 35 minutes

**Autopilot 49 (NEW):** Image Migration Specialist
- Assigned: todo_272, todo_273, todo_274
- Status: READY (starts after 48 completes)
- ETA: 20 minutes

**Autopilot 50 (NEW):** Image Enhancement Specialist
- Assigned: todo_268, todo_269, todo_270, todo_271, todo_275
- Status: STANDBY (optional features)
- ETA: 60 minutes (if activated)

**Autopilot 51 (NEW):** Image Processing Specialist
- Assigned: todo_276, todo_277, todo_278, todo_279, todo_280
- Status: READY
- ETA: 30 minutes

**Autopilot 52 (NEW):** Image Processing Testing Specialist
- Assigned: todo_281, todo_282, todo_283, todo_284, todo_285, todo_286, todo_287, todo_288, todo_289, todo_290, todo_291, todo_292, todo_293, todo_294, todo_295
- Status: READY (starts after 51 completes)
- ETA: 45 minutes

**Autopilot 53-60 (NEW):** Demo Pages Overhaul Team
- Assigned: todo_316-340 (25 tasks)
- Status: READY
- ETA: 120 minutes

**Breakdown:**
- **Autopilot 53:** /demo Analysis & Planning (todo_316, todo_317)
- **Autopilot 54:** /demo Content Updates (todo_318, todo_319, todo_320, todo_321, todo_322)
- **Autopilot 55:** /demo CTA Rewiring (todo_323, todo_333, todo_334)
- **Autopilot 56:** /demos Hero Rewrite (todo_324, todo_325)
- **Autopilot 57:** /demos Demo Grid (todo_326, todo_327, todo_328)
- **Autopilot 58:** /demos Content Migration (todo_329, todo_330)
- **Autopilot 59:** CTA Integration & Testing (todo_331, todo_332, todo_339, todo_340)
- **Autopilot 60:** Copy Writing & Script Creation (todo_335, todo_336, todo_337, todo_338)

---

## 📊 Real-Time Task Board

```
┌─────────────────────────────────────────────────────────────┐
│ AUTOPILOT TASK BOARD - LIVE STATUS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🔴 CRITICAL (Must Complete First)                          │
│   [  ] todo_240 - Hero columns migration                   │
│   [  ] todo_241 - Update lib/programs.ts types             │
│   [  ] todo_242 - CRUD server actions                      │
│   [  ] todo_247 - Run hero migration                       │
│                                                             │
│ 🟡 HIGH (Can Run in Parallel)                              │
│   [  ] todo_243 - Create new program page                  │
│   [  ] todo_244 - Edit page with slug/delete               │
│   [  ] todo_245 - Admin list with Create button            │
│   [  ] todo_246 - Public page DB hero images               │
│                                                             │
│ 🟢 TESTING (After Core Complete)                           │
│   [  ] todo_248 - Test create program                      │
│   [  ] todo_249 - Test slug editing                        │
│   [  ] todo_250 - Test delete with confirm                 │
│   [  ] todo_251 - Test hero image fields                   │
│   [  ] todo_252 - Test cache revalidation                  │
│   [  ] todo_253 - Update existing programs                 │
│                                                             │
│ ⚪ OPTIONAL (Future Enhancement)                            │
│   [  ] todo_254 - Image upload to Storage                  │
│   [  ] todo_255 - Homepage hero thumbnails                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Continuous Integration Protocol

### For Autopilots:

**1. Check for New Tasks (Every 5 minutes)**
```bash
# Read latest todo list
cat AUTOPILOT_DYNAMIC_DISPATCH.md | grep "todo_" | grep "\[  \]"
```

**2. Claim Available Task**
```bash
# Mark task as in-progress
echo "AUTOPILOT [N]: 🔄 Started todo_XXX at $(date)" >> AUTOPILOT_LOG.txt
```

**3. Execute Task**
```bash
# Follow task instructions
# Run commands
# Test results
```

**4. Report Completion**
```bash
# Mark complete
echo "AUTOPILOT [N]: ✅ Completed todo_XXX at $(date)" >> AUTOPILOT_LOG.txt
```

**5. Pick Up Next Task**
```bash
# Return to step 1
```

---

## 📝 Task Addition Protocol

### When You Add New Todos:

**1. Add to this file under "NEW TASKS"**
```markdown
**Priority: [CRITICAL/HIGH/MEDIUM/LOW]**
- todo_XXX: Description of task
```

**2. Assign to Available Autopilot**
```markdown
**Autopilot XX:** Task Specialist
- Assigned: todo_XXX, todo_YYY
- Status: READY
- ETA: XX minutes
```

**3. Update Task Board**
```markdown
│   [  ] todo_XXX - Task description                         │
```

**4. Notify Autopilots**
```bash
echo "NEW TASK AVAILABLE: todo_XXX - Priority: [LEVEL]" >> AUTOPILOT_LOG.txt
```

---

## 🎯 Autopilot Pool Management

### Currently Active Autopilots: 45

**Original 40:** Working on initial 76 tasks
**New 5:** Handling dynamic tasks (240-255)

### Autopilot Status Dashboard

```
Autopilot 1-10:   [████████░░] 80% Complete (Foundation)
Autopilot 11-25:  [██████░░░░] 60% Complete (Development)
Autopilot 26-35:  [████░░░░░░] 40% Complete (Testing)
Autopilot 36-40:  [██░░░░░░░░] 20% Complete (Finalization)
Autopilot 41-45:  [░░░░░░░░░░]  0% Complete (New Tasks)
```

---

## 🚨 Dependency Management

### Task Dependencies (Must Complete Before Others)

**CRITICAL PATH:**
```
todo_240 (Migration) 
    ↓
todo_241 (Types)
    ↓
todo_242 (Actions) → todo_243, todo_244, todo_245, todo_246
    ↓
todo_247 (Run Migration)
    ↓
todo_248-253 (Testing)
```

**PARALLEL TRACKS:**
```
Track A: todo_243 (Create page)
Track B: todo_244 (Edit page)  
Track C: todo_245 (List page)
Track D: todo_246 (Public page)

All can run in parallel after todo_242 completes
```

---

## 📊 Progress Metrics

### Completion Rate
```
Phase 1 (Foundation):     [████████░░] 80%
Phase 2 (Development):    [██████░░░░] 60%
Phase 3 (Testing):        [████░░░░░░] 40%
Phase 4 (Finalization):   [██░░░░░░░░] 20%
Phase 5 (New Features):   [░░░░░░░░░░]  0%
```

### Estimated Time to Completion
- **Original 76 tasks:** 90 minutes remaining
- **New 16 tasks:** 60 minutes (parallel execution)
- **Total ETA:** 120 minutes from now

---

## 🔔 Notification System

### Autopilots: Monitor This File

**Check every 5 minutes for:**
- ✅ New tasks added
- ✅ Priority changes
- ✅ Dependency updates
- ✅ Blocking issues resolved

**Auto-refresh command:**
```bash
watch -n 300 'cat AUTOPILOT_DYNAMIC_DISPATCH.md | grep "NEW TASKS" -A 20'
```

---

## 🎯 Quick Assignment Commands

### Assign Task to Autopilot
```bash
# Example: Assign todo_240 to Autopilot 41
echo "AUTOPILOT 41: Assigned todo_240 - Hero columns migration" >> AUTOPILOT_LOG.txt
```

### Mark Task Complete
```bash
# Example: Mark todo_240 complete
sed -i 's/\[  \] todo_240/\[✅\] todo_240/' AUTOPILOT_DYNAMIC_DISPATCH.md
```

### Add New Task
```bash
# Example: Add new todo
echo "- todo_256: New task description" >> AUTOPILOT_DYNAMIC_DISPATCH.md
```

---

## 📋 Task Template

**When adding new tasks, use this format:**

```markdown
**Priority: [CRITICAL/HIGH/MEDIUM/LOW/OPTIONAL]**
- todo_XXX: [Clear, actionable description]
  - Dependencies: [List any blocking tasks]
  - Estimated Time: [Minutes]
  - Assigned To: [Autopilot number or "UNASSIGNED"]
  - Success Criteria: [How to verify completion]
```

---

## 🚀 Execution Commands for New Tasks

### Autopilot 41: Admin CRUD Specialist

```bash
# Task: todo_240 - Create hero columns migration
cd /workspaces/fix2
MIGR_NAME="$(date +%Y%m%d%H%M%S)_programs_add_hero_columns"
cat > "supabase/migrations/${MIGR_NAME}.sql" <<'EOF'
alter table public.programs
  add column if not exists hero_image text,
  add column if not exists hero_image_alt text;
EOF

# Task: todo_241 - Update types
# Edit lib/programs.ts to add hero_image and hero_image_alt fields

# Task: todo_242 - Update actions
# Edit app/admin/programs/actions.ts to include hero fields in CRUD

# Task: todo_247 - Run migration
supabase db push
```

### Autopilot 42: Admin UI Specialist

```bash
# Task: todo_243 - Create new program page
# Create app/admin/programs/new/page.tsx

# Task: todo_244 - Update edit page
# Update app/admin/programs/[slug]/page.tsx

# Task: todo_245 - Update list page
# Update app/admin/programs/page.tsx

# Task: todo_246 - Update public page
# Update app/programs/[slug]/page.tsx
```

### Autopilot 43: Admin Testing Specialist

```bash
# Start dev server
npm run dev

# Task: todo_248 - Test create
# Visit /admin/programs/new?key=PASSWORD
# Fill form and submit

# Task: todo_249 - Test slug edit
# Visit /admin/programs/hvac-technician?key=PASSWORD
# Change slug and save

# Task: todo_250 - Test delete
# Click delete button and confirm

# Task: todo_251 - Test hero fields
# Add hero_image path and save

# Task: todo_252 - Test cache revalidation
# Edit program, save, verify public page updates immediately
```

---

## ✅ Success Criteria

**All tasks complete when:**
- ✅ All checkboxes marked [✅]
- ✅ No errors in AUTOPILOT_LOG.txt
- ✅ All tests passing
- ✅ Production deployed
- ✅ Verification complete

---

## 🔄 Status: ACTIVE

**Autopilots:** Continue monitoring this file for new task assignments

**Coordinator:** Add new todos here as they arise

**System:** Auto-dispatch to available autopilots

---

**Last Updated:** 2025-12-05 08:30:00 UTC
**Next Update:** Continuous (as tasks are added)
**Status:** ACCEPTING NEW TASKS ✅
