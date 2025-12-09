# 📋 ANSWERS FOR CHATGPT - ELEVATE DEV STUDIO

**Date**: December 7, 2024
**Project**: Elevate for Humanity - Admin Dev Studio Integration

---

## ✅ ANSWERS TO YOUR QUESTIONS

### 1. Course File Paths

**Our course structure**:
```
content/courses/
├── barber/
│   └── README.md
├── hvac/
│   └── README.md
├── cna/
│   ├── README.md
│   ├── module-3-vital-signs.md
│   ├── module-4-personal-care.md
│   └── module-6-mobility.md
├── cdl/
├── building-maintenance/
├── catalog.ts
├── ecd-courses.json
└── ecdCatalog.ts

lms-content/
├── vita-tax-site/
├── milady-rise/
├── careersafe-osha/
├── nrf-rise-up/
├── hsi-safety/
├── certiport/
└── certifications/
```

**Course file formats**:
- Markdown (`.md`) for course content
- JSON (`.json`) for course data
- TypeScript (`.ts`) for course catalogs

**Course Studio should filter to**:
- `content/courses/**/*.md`
- `content/courses/**/*.json`
- `content/courses/**/*.ts`
- `lms-content/**/*.md`

---

### 2. Current Course Schema

**Example from `content/courses/catalog.ts`**:
```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
}
```

**Course Studio should**:
- Parse this schema
- Validate on save
- Show structured editor for courses
- Preview with actual course components

---

### 3. Existing Autopilot Scripts

**Location**: Root directory

**Scripts we have**:
```bash
./audit_all_admin_features.sh
./check_all_features.sh
./fix-marketing-pages.sh
./ACTIVATE_ALL_AUTOPILOTS_NOW.sh
./RUN_ALL_MIGRATIONS.sh
```

**Autopilot Panel should expose**:
- ✅ Audit all admin features
- ✅ Check all features
- ✅ Fix marketing pages
- ✅ Activate all autopilots
- ✅ Run migrations
- ✅ Build courses from Supabase
- ✅ Generate course images
- ✅ Sync LMS schema

---

### 4. GitHub Repository Details

**Repository**: `elevateforhumanity/fix2`
**Default Branch**: `main`
**Access**: Need GitHub OAuth App

**What we need**:
- Read/write access to repo
- Commit and push changes
- Create branches (optional)
- Open PRs (optional)

---

### 5. Preview Requirements

**What to preview**:
1. **Course pages**: `/courses/[slug]`
2. **Program pages**: `/programs/[slug]`
3. **Admin pages**: `/admin/*`
4. **Marketing pages**: All public pages

**Preview should**:
- Show live Next.js dev server
- Hot reload on file save
- Navigate between pages
- Show actual components (not just HTML)

**Preview URL**: `http://localhost:3000` (dev server)

---

### 6. Supabase Storage Structure

**Buckets**:
- `course-images` - Course thumbnails and hero images
- `course-videos` - Course video content
- `user-uploads` - User-uploaded files
- `certificates` - Generated certificates

**Media Panel should**:
- List all buckets
- Upload files
- Copy public URLs
- Insert into course content
- Generate thumbnails

---

### 7. Store/Clone Product Details

**What to sell**:
1. **Starter License** ($299)
   - Single site deployment
   - All features included
   - 1 year updates
   - Email support

2. **Pro License** ($999)
   - Multi-site deployment
   - White-label ready
   - Lifetime updates
   - Priority support
   - Dev Studio included

3. **Enterprise** ($5,000+)
   - Unlimited sites
   - Custom branding
   - Dedicated support
   - Training included
   - Source code access

**Store page should**:
- Create Stripe products
- Generate license keys
- Provide download links
- Include documentation
- Setup wizard

---

### 8. Authentication & Permissions

**Current auth**: Supabase Auth

**Roles**:
- `super_admin` - Full access to Dev Studio
- `admin` - Limited access (no code editing)
- `instructor` - Course editing only
- `student` - No access

**Dev Studio access**:
```typescript
// Only super_admin can access
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile?.role !== 'super_admin') {
  redirect('/admin');
}
```

---

### 9. Environment Variables Needed

**Already have**:
```env
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
RESEND_API_KEY=...
OPENAI_API_KEY=...
```

**Need to add**:
```env
GITHUB_APP_ID=xxxx
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GITHUB_OAUTH_CLIENT_ID=xxxx
GITHUB_OAUTH_CLIENT_SECRET=xxxx
```

---

### 10. Integration Points

**Existing systems to connect**:

1. **Course Database** (Supabase)
   - `courses` table
   - `lessons` table
   - `modules` table
   - `enrollments` table

2. **File Storage** (Supabase Storage)
   - Course images
   - Course videos
   - User uploads

3. **Email System** (Resend)
   - Course notifications
   - Certificate delivery

4. **Payment System** (Stripe)
   - Course purchases
   - License sales

5. **AI Services** (OpenAI)
   - Course generation
   - Image generation
   - Content assistance

**Dev Studio should integrate with all of these!**

---

## 🎯 PRIORITY FEATURES

### Phase 1 (MVP - Ship Today):
1. ✅ Code Studio with Monaco editor
2. ✅ File tree from GitHub
3. ✅ Save/commit to GitHub
4. ✅ Live preview iframe
5. ✅ Course Studio (filter to course files)
6. ✅ Autopilot buttons
7. ✅ Media upload panel

### Phase 2 (Next Week):
8. ✅ Course schema validation
9. ✅ Visual course editor
10. ✅ AI assistance (ChatGPT)
11. ✅ Image generation
12. ✅ Video upload/generation

### Phase 3 (Later):
13. ✅ Remote runners (Docker)
14. ✅ Branch/PR workflows
15. ✅ Team collaboration
16. ✅ Store/clone product

---

## 🚀 READY TO BUILD

**With these answers, you can now**:
1. Create the exact file tree filters for Course Studio
2. Parse our course schema correctly
3. Connect to our GitHub repo
4. Preview our actual Next.js pages
5. Integrate with our Supabase storage
6. Hook up our autopilot scripts
7. Build the store/clone product

**All the information you need is above!**

---

## 📝 ADDITIONAL NOTES

### Course Preview Component
**File**: `components/courses/CoursePreview.tsx`

This component should be used in the preview iframe to show courses exactly as students see them.

### Autopilot Script Format
All autopilot scripts:
- Are bash scripts (`.sh`)
- Located in root directory
- Can be executed with `./script-name.sh`
- Output to stdout/stderr
- Return exit code 0 on success

### GitHub Workflow
1. User logs in with GitHub OAuth
2. Select repo (elevateforhumanity/fix2)
3. Select branch (main)
4. Browse files
5. Edit in Monaco
6. Save commits to GitHub
7. Preview shows changes instantly

### Store Integration
- Use existing Stripe integration
- Create products via API
- Generate license keys
- Email delivery via Resend
- Download links from Supabase Storage

---

**Everything is ready for you to build the complete Dev Studio!** 🎉
