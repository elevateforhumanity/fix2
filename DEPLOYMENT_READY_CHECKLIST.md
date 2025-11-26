# 🚀 Deployment Ready Checklist

## ✅ What's Complete

### 1. Course Engine (Data-Driven)
- ✅ Type definitions (`types/course.ts`)
- ✅ Course registry (`lms-data/courses/index.ts`)
- ✅ 8 complete program data files
- ✅ Dynamic course detail pages (`/courses/[slug]`)
- ✅ Program catalog page (`/programs`)
- ✅ Universal enrollment flow (`/student/enroll/[slug]`)

### 2. Public Marketing Site
- ✅ Homepage with hero banner (`/`)
- ✅ Funding explanation page (`/funding`)
- ✅ Employer partnerships page (`/employers`)
- ✅ Philanthropy/community page (`/philanthropy`)
- ✅ Contact/intake form (`/contact`)

### 3. Student LMS
- ✅ Student portal home with hero (`/student`)
- ✅ Student dashboard (`/student/dashboard`)
- ✅ Enrollment pages for all programs (`/student/enroll/[slug]`)

### 4. Staff/Admin Portal
- ✅ Internal docs hub (`/admin/internal-docs`)
- ✅ Real Supabase auth protection
- ✅ Role-based access control

### 5. Backend & Database
- ✅ Contact form API route (`/api/contact`)
- ✅ Contacts table migration
- ✅ Email notifications (confirmation + admin alert)
- ✅ Auth helper with real Supabase integration

## 🧪 Testing Checklist

Before going live, test these flows:

### Public Flow
- [ ] Visit `/` → see homepage with hero
- [ ] Click "Explore Programs" → see `/programs` with all 8 programs
- [ ] Click a program → see `/courses/[slug]` with details
- [ ] Click "Start / Continue This Program" → see `/student/enroll/[slug]`
- [ ] Click "Submit Interest" → go to `/contact`
- [ ] Fill out contact form → submit successfully
- [ ] Check email for confirmation

### Student Flow
- [ ] Visit `/student` → see student portal home
- [ ] Click "Go To My Dashboard" → see `/student/dashboard`
- [ ] Click a program → see enrollment page
- [ ] All buttons work and link correctly

### Staff Flow
- [ ] Visit `/admin/internal-docs` without login → redirect to login
- [ ] Login as student → redirect with unauthorized
- [ ] Login as staff/admin → see internal docs hub
- [ ] All doc sections display correctly

### Contact Form
- [ ] Submit with all fields → success message
- [ ] Submit with only required fields → success message
- [ ] Submit with invalid email → error message
- [ ] Check Supabase `contacts` table → record created
- [ ] Check admin email → notification received

## 🔧 Environment Variables Required

Make sure these are set in your environment:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_key
ADMIN_EMAIL=info@elevateforhumanity.org
```

## 📊 Database Setup

Run this migration in Supabase SQL Editor:

```bash
# The migration file is already created at:
supabase/migrations/20241126_create_contacts_table.sql
```

Or run manually:
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of migration file
3. Execute

## 🔒 Security Before Production

### Critical: Secure Internal Docs
See `INTERNAL_DOCS_SECURITY.md` for detailed instructions.

**Quick version:**
1. Move files from `public/internal-docs/` to Supabase Storage
2. Update hrefs in `/admin/internal-docs/page.tsx` to use signed URLs
3. Test auth protection

### Auth Setup
- ✅ Auth helper uses real Supabase
- ✅ `requireStaff()` redirects unauthorized users
- [ ] Create staff/admin users in Supabase
- [ ] Set `role` in user metadata: `{ "role": "admin" }` or `{ "role": "staff" }`

## 🎨 Optional: Brand Colors

Current colors are blue/slate. To match your brand:

1. Update Tailwind config or
2. Find/replace in components:
   - `bg-blue-600` → your primary color
   - `text-blue-600` → your primary color
   - `from-blue-600 via-indigo-600 to-purple-600` → your gradient

## 📝 Content Updates

Before launch, review and customize:

- [ ] Phone number in contact confirmation email (currently placeholder)
- [ ] Admin email address in API route
- [ ] Program descriptions and hours (currently example data)
- [ ] Funding eligibility for each program
- [ ] Location labels for programs

## 🚀 Deployment Steps

### 1. Run Database Migration
```bash
# In Supabase Dashboard → SQL Editor
# Run: supabase/migrations/20241126_create_contacts_table.sql
```

### 2. Set Environment Variables
In Vercel/Netlify dashboard, add all required env vars

### 3. Deploy
```bash
git add .
git commit -m "Complete course engine, LMS, and intake system

- Add 8 program courses with full data
- Create universal enrollment flow
- Add contact/intake form with Supabase integration
- Secure admin portal with real auth
- Add public marketing pages (funding, employers, philanthropy)

Co-authored-by: Ona <no-reply@ona.com>"

git push origin main
```

### 4. Verify Deployment
- Check all routes load
- Test contact form submission
- Verify emails send
- Test auth protection on `/admin/internal-docs`

## 📞 Support Contacts

If you encounter issues:
1. Check browser console for errors
2. Check Vercel/Netlify deployment logs
3. Check Supabase logs for database errors
4. Verify all environment variables are set

## 🎉 You're Ready!

Once all checkboxes are complete, your system is production-ready:
- ✅ Students can browse programs and submit interest
- ✅ Staff can access internal docs (once secured)
- ✅ Contact form saves to database and sends emails
- ✅ Enrollment flow guides people through next steps
- ✅ Everything is data-driven and maintainable

**Next phase:** Wire up actual enrollment, progress tracking, and student course access.
