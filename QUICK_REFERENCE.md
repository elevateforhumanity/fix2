# Quick Reference Guide

## 🎯 What You Have

### 1. **Role-Based Access & Certificates** (Just Implemented)

- Magic link authentication (passwordless)
- 3 roles: student, staff, admin
- Certificate issuance and verification system
- Public verification links

### 2. **Autopilot System** (Existing)

- Auto-fixes code errors
- Auto-deploys to production
- Auto-generates course content
- Auto-engages struggling students
- Self-healing infrastructure

### 3. **LMS (Learning Management System)** (Existing)

- Full course management
- Student enrollment and progress tracking
- Assessments and quizzes
- Live classes and recordings
- Community discussions
- AI coach for personalized learning

### 4. **Integration** (Existing)

- Autopilot and LMS share same database
- Autopilot can auto-create courses
- Autopilot monitors student engagement
- Autopilot fills content gaps automatically

---

## 📍 Key URLs

### Production

- Main site: `https://elevateforhumanityfix.netlify.app`
- LMS: `https://elevateforhumanityfix.netlify.app/lms`
- Login: `https://elevateforhumanityfix.netlify.app/login`
- Certificates: `https://elevateforhumanityfix.netlify.app/my-certificates`
- Staff Panel: `https://elevateforhumanityfix.netlify.app/staff`
- Verify: `https://elevateforhumanityfix.netlify.app/verify/{code}`

### Development

- Local: `http://localhost:5173`
- Supabase: `https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk`

---

## 🗄️ Database Quick Access

### Supabase Project

- **Project ID**: `cuxzzpsyufcewtmicszk`
- **Dashboard**: [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)

### Key Tables

**Authentication & Roles:**

```sql
-- View users
SELECT * FROM auth.users;

-- View roles
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id;

-- Assign role
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'staff');
```

**Certificates:**

```sql
-- View all certificates
SELECT * FROM public.certificates ORDER BY issued_at DESC;

-- View certificates for a user
SELECT * FROM public.certificates WHERE user_id = 'user-uuid';

-- Verify a certificate
SELECT * FROM public.certificates WHERE verify_code = 'ABC123';
```

**LMS:**

```sql
-- View courses
SELECT * FROM public.courses;

-- View enrollments
SELECT u.email, c.title, e.status
FROM enrollments e
JOIN auth.users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id;

-- View student progress
SELECT * FROM public.progress WHERE user_id = 'user-uuid';
```

**Autopilot:**

```sql
-- View pending tasks
SELECT * FROM automation.tasks WHERE status = 'pending';

-- View failed tasks
SELECT * FROM automation.tasks WHERE status = 'failed';

-- View system health
SELECT * FROM automation.health_logs ORDER BY checked_at DESC LIMIT 10;
```

---

## 🚀 Common Tasks

### Deploy New Changes

```bash
# Build locally first
npm run build

# If successful, push to GitHub
git add .
git commit -m "feat: your changes"
git push origin main

# Netlify auto-deploys from main branch
```

### Issue a Certificate

1. Sign in as staff/admin
2. Go to `/staff`
3. Fill in form:
   - Student email
   - Program ID (slug)
   - Program name
   - PDF (optional)
4. Click "Issue Certificate"
5. Share verification link with student

### Assign Roles

```sql
-- Make someone staff
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'staff')
ON CONFLICT (user_id) DO UPDATE SET role = 'staff';

-- Make someone admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

### Create a Course (Manual)

```sql
-- Insert program
INSERT INTO public.programs (slug, title, track, hours)
VALUES ('my-program', 'My Program', 'workforce', 40);

-- Insert course
INSERT INTO public.courses (program_id, code, title)
VALUES ('program-id', 'COURSE-101', 'My Course');

-- Insert module
INSERT INTO public.modules (course_id, title, description, "order")
VALUES ('course-id', 'Module 1', 'Introduction', 1);

-- Insert lesson
INSERT INTO public.lessons (module_id, idx, title, html)
VALUES ('module-id', 1, 'Lesson 1', '<p>Content here</p>');
```

### Create a Course (Autopilot)

```sql
-- Queue autopilot task
INSERT INTO automation.tasks (kind, payload, priority, status)
VALUES (
  'gc_create_course',
  '{"name": "My Course", "description": "Course description"}',
  7,
  'pending'
);

-- Autopilot will pick it up and generate the course
```

### Check System Health

```bash
# View GitHub Actions
# Go to: https://github.com/elevateforhumanity/fix2/actions

# View Supabase logs
# Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/logs

# View Netlify logs
# Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
```

---

## 🔧 Troubleshooting

### Magic Link Not Working

```sql
-- Check user exists
SELECT * FROM auth.users WHERE email = 'user@example.com';

-- Check Supabase email settings
-- Dashboard → Authentication → Email Templates
```

### Cannot Access /staff

```sql
-- Check role assignment
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'user@example.com';

-- Assign role if missing
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'staff');
```

### Certificate Upload Fails

```bash
# Check storage bucket exists
# Dashboard → Storage → certificates

# Verify bucket is public
# Click bucket → Settings → Public bucket: ON
```

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

### Autopilot Not Running

```sql
-- Check pending tasks
SELECT * FROM automation.tasks WHERE status = 'pending';

-- Check failed tasks
SELECT * FROM automation.tasks WHERE status = 'failed';

-- Manually trigger task
UPDATE automation.tasks
SET status = 'pending', started_at = NULL
WHERE id = 'task-uuid';
```

---

## 📚 Documentation Files

### Setup & Deployment

- `TEST_DEPLOYMENT.md` - Step-by-step deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Production deployment checklist
- `docs/AUTHENTICATION_SETUP.md` - Auth system setup
- `docs/CERTIFICATES_QUICKSTART.md` - Certificate system quick start

### Architecture & Integration

- `docs/AUTOPILOT_LMS_INTEGRATION.md` - How autopilot and LMS work together
- `docs/VISUAL_GUIDE.md` - Visual user journeys
- `IMPLEMENTATION_SUMMARY.md` - Technical implementation details

### Database

- `supabase/migrations/` - All database migrations
- `supabase/RLS_POLICIES.md` - Row-level security documentation
- `supabase/VERIFICATION_QUERIES.sql` - Useful verification queries

---

## 🎓 Learning Resources

### For Instructors

1. How to create courses (manual or autopilot)
2. How to issue certificates
3. How to monitor student progress
4. How to use the AI coach

### For Students

1. How to sign in with magic link
2. How to view courses
3. How to complete lessons
4. How to view certificates

### For Admins

1. How to assign roles
2. How to monitor system health
3. How to manage autopilot tasks
4. How to handle compliance

---

## 🔐 Security Notes

- **Never commit** `.env` files
- **Never hardcode** API keys or secrets
- **Always use** environment variables
- **Enable RLS** on all new tables
- **Test permissions** before deploying
- **Monitor logs** for suspicious activity

---

## 📞 Support

### Issues

- GitHub: [https://github.com/elevateforhumanity/fix2/issues](https://github.com/elevateforhumanity/fix2/issues)
- Check logs: Supabase, Netlify, GitHub Actions

### Documentation

- All docs in `/docs` folder
- Start with `QUICK_REFERENCE.md` (this file)
- Check specific guides for detailed info

---

## ✅ Quick Checklist

**After Fresh Clone:**

- [ ] `npm install`
- [ ] Set up `.env` with Supabase credentials
- [ ] `npm run dev` to test locally
- [ ] `npm run build` to verify build works

**After Database Changes:**

- [ ] Run migrations in Supabase SQL Editor
- [ ] Verify tables created
- [ ] Check RLS policies enabled
- [ ] Test with sample data

**Before Deploying:**

- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Test locally first
- [ ] Check environment variables set

**After Deploying:**

- [ ] Verify site loads
- [ ] Test authentication
- [ ] Test key features
- [ ] Check logs for errors
- [ ] Monitor for issues

---

**Last Updated:** 2025-11-09  
**Version:** 2.0.0
