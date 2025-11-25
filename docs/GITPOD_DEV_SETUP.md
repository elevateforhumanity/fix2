# Elevate For Humanity – Gitpod Dev Setup

This checklist is for ANY dev (or AI agent) spinning up the Elevate monorepo in Gitpod.  
Follow it top to bottom and you'll have the **LMS + marketing site + APIs** running.

---

## 1. Open the Repo in Gitpod

1. Go to your GitHub repo in the browser.
2. Change the URL from:
   - `https://github.com/elevateforhumanity/fix2`
   - to `https://gitpod.io/#/https://github.com/elevateforhumanity/fix2`
3. Gitpod will launch a workspace and clone the repo.

---

## 2. Make Sure Node & Package Manager Are Installed

Inside Gitpod terminal:

```bash
node -v
```

You want Node 18+ (20 preferred). If needed:

```bash
nvm install 20
nvm use 20
```

Check package manager:

```bash
ls pnpm-lock.yaml && echo "Using pnpm"
ls yarn.lock && echo "Using yarn"
ls package-lock.json && echo "Using npm"
```

Use whichever lockfile exists:
- If `pnpm-lock.yaml` → use `pnpm`
- If `yarn.lock` → use `yarn`
- If `package-lock.json` → use `npm`

---

## 3. Install Dependencies

From repo root:

```bash
# ONE of these – choose based on lockfile
pnpm install
# or
yarn install
# or
npm install
```

---

## 4. Environment Variables (.env.local)

Create `.env.local` in the project root with at least:

```bash
# Supabase
SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

# Base Site URL
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# xAPI / LRS
XAPI_ENDPOINT=YOUR_XAPI_LRS_ENDPOINT
XAPI_USERNAME=YOUR_XAPI_USERNAME
XAPI_PASSWORD=YOUR_XAPI_PASSWORD

# OpenAI (for AI course builder + tutor)
OPENAI_API_KEY=YOUR_OPENAI_KEY

# Optional: Email + Payments if used
RESEND_API_KEY=YOUR_RESEND_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET
```

> In Gitpod you can also store these as Gitpod Environment Variables in your account so they auto-inject.

---

## 5. Run Database Migrations (Supabase)

Run the enterprise features migration:

```bash
# Connect to your Supabase instance and run:
psql $DATABASE_URL -f migrations/enterprise_features.sql
```

Or use Supabase CLI if configured:

```bash
supabase db push
```

Confirm the schema is migrated (tables like `enrollments`, `forums`, `discussion_threads`, `study_groups`, `video_chapters`, `video_transcripts`, `funding_applications`, etc. exist).

---

## 6. Start the Dev Server (Next.js App)

From repo root:

```bash
# ONE of:
pnpm dev
# or
yarn dev
# or
npm run dev
```

By default this runs on `http://localhost:3000` inside Gitpod.
Gitpod will expose a public URL like `https://3000-<id>.gitpod.io`.

---

## 7. Verify Key Routes Manually

Open the exposed URL in the Gitpod "Ports" panel and confirm:

### Public / Marketing
- `/` → Homepage loads (hero, programs, CTA)
- `/programs` → Program directory
- `/employers` or `/partners` (if present)
- `/success-stories`
- `/contact` / `/apply`

### LMS (Student)
- `/lms/dashboard` → Student dashboard with cards (Courses, Forums, Study Groups, Analytics, AI Tutor)
- `/lms/courses`
- `/lms/forums` → Forum list
- `/lms/study-groups`
- `/lms/analytics`
- `/lms/chat` → AI Tutor interface

### Admin
- `/admin/dashboard`
- `/admin/analytics`
- `/admin/reports` (and `/admin/reports/caseload` if you created it)
- `/admin/course-authoring`
- `/admin/ai-course-builder` (AI outline generator)

### Program Holder
- `/program-holder/dashboard`
- `/program-holder/training` → attendance/skills tracking

### Employers / Public
- `/verify/<test-code>` once a certificate with a `verification_code` exists

---

## 8. Common Dev Commands

From the root:

```bash
# Type checking
pnpm lint && pnpm typecheck

# Build
pnpm build

# Run tests (if configured)
pnpm test
```

Replace `pnpm` with `yarn` or `npm run` as needed.

---

## 9. Where Key Features Live (Files Overview)

### LMS Shell & Navigation
- `app/lms/layout.tsx`
- `app/lms/dashboard/page.tsx`

### Social / Community
- `app/lms/forums/page.tsx`
- `app/lms/forums/[forumId]/page.tsx`
- `app/lms/forums/[forumId]/threads/[threadId]/page.tsx`
- `app/api/forums/route.ts`
- `app/api/forums/[forumId]/route.ts`
- `app/api/forums/[forumId]/threads/[threadId]/route.ts`

### Study Groups
- `app/lms/study-groups/page.tsx`
- `app/api/study-groups/route.ts`
- `app/api/study-groups/[id]/join/route.ts`

### Analytics
- `app/lms/analytics/page.tsx`
- `app/admin/analytics/page.tsx`
- `app/api/analytics/student/route.ts`
- `app/api/analytics/admin/route.ts`

### Course Authoring
- `app/admin/course-authoring/page.tsx`
- `app/api/courses/authoring/route.ts`

### AI Tutor + Course Builder
- `app/lms/chat/page.tsx`
- `app/admin/ai-course-builder/page.tsx`
- `app/api/ai/course-builder/route.ts`
- `app/api/chat/route.ts` (or wherever your chat API lives)

### xAPI + Video Meta
- `lib/xapi/xapi-client.ts`
- `app/api/xapi/route.ts`
- `app/api/videos/[videoId]/meta/route.ts`

### Certificates / Verification
- `app/verify/[certificateId]/page.tsx`
- `app/api/verify/certificate/[certificateId]/route.ts`

### Program Holder Portal
- `app/program-holder/dashboard/page.tsx`
- `app/program-holder/training/page.tsx`
- `app/api/program-holder/*/route.ts`

### Mobile Support APIs
- `app/api/mobile/summary/route.ts`
- `app/api/mobile/courses/route.ts`
- `app/api/mobile/profile/route.ts`

### Caseload Dashboard
- `app/admin/reports/caseload/page.tsx`
- `app/api/reports/caseload/route.ts`

### Enrollment Applications
- `app/api/applications/enrollment/route.ts`
- `app/api/wioa/*/route.ts`
- `app/api/funding/*/route.ts`

---

## 10. Final Sanity Checklist

Before pushing or deploying:

- [ ] `pnpm lint` or `npm run lint` passes
- [ ] `pnpm build` or `npm run build` succeeds
- [ ] Key LMS pages load in dev
- [ ] No 500 errors on API routes listed above
- [ ] `.env.local` is NOT committed (in `.gitignore`)
- [ ] Gitpod workspace runs `pnpm dev` (or equivalent) automatically

If all boxes are checked, the environment is healthy and ready for development or AI/autopilot tasks.

---

## 11. Enterprise Features Verification

Run the feature check script to verify all enterprise features are present:

```bash
pnpm check:features
```

This will verify:
- ✅ All API endpoints exist
- ✅ All UI pages are present
- ✅ Environment variables are configured
- ✅ Database tables are created

---

## Support

For issues or questions:
- Check the main README.md
- Review DEPLOYMENT_CHECKLIST.md
- Contact the development team

---

**Last Updated:** November 2024  
**Version:** 2.0 (Enterprise Edition)
