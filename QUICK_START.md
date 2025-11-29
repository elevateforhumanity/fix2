<<<<<<< HEAD
# Quick Start - Launch in 30 Minutes ⚡

## Step 1: Database (5 min)

Open Supabase SQL Editor and run these files in order:

```sql
-- File 1: Create tables
-- Copy/paste: supabase/migrations/20241129_complete_partner_system.sql
-- Click "Run"

-- File 2: Add courses  
-- Copy/paste: supabase/migrations/20241129_partner_courses_two_models.sql
-- Click "Run"
```

**Verify**: Run `SELECT COUNT(*) FROM partner_courses;` → Should return 40+

---

## Step 2: Stripe (5 min)

Go to [dashboard.stripe.com](https://dashboard.stripe.com):

1. **Settings** → **Payment methods** → Enable:
   - ✅ ACH Direct Debit
   - ✅ Affirm
   - ✅ Afterpay
   - ✅ Klarna

2. **Settings** → **Webhooks** → Add endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Event: `checkout.session.completed`
   - Copy webhook secret

3. Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Step 3: Deploy Email Function (2 min)

```bash
supabase functions deploy send-partner-enrollment-email
```

---

## Step 4: Test (10 min)

### Test Paid Course:
1. Go to `/courses/partners`
2. Find "Microsoft Office Specialist: Excel 2019 - $164"
3. Click "Enroll Now - $164"
4. Use test card: `4242 4242 4242 4242`
5. Complete checkout
6. Verify success page shows
7. Check `/admin/partner-enrollments` → Should see enrollment

### Test Direct Course:
1. Go to `/courses/partners`
2. Find "Certified Medical Assistant - FREE with WIOA"
3. Click "Apply with WIOA"
4. Verify opens JRI website

---

## Step 5: Go Live! (5 min)

1. Switch Stripe to live mode
2. Update environment variables with live keys
3. Deploy to production
4. Test one real enrollment
5. Start marketing!

---

## What You Have Now

✅ **40+ Courses** ready to sell
✅ **5 Payment Options** (Card, ACH, Affirm, Afterpay, Klarna)
✅ **2 Business Models** (Paid + Direct/WIOA)
✅ **Automated Emails** (Confirmation, Access, Reminders)
✅ **Admin Dashboard** (Track revenue, enrollments, partner payments)
✅ **$3,500-$35,000/month** revenue potential

---

## Revenue Example

**100 students enroll in first month:**
- 50 × Certiport ($164) = $8,200 revenue → $2,350 profit
- 30 × HSI ($135) = $4,050 revenue → $1,500 profit  
- 20 × CareerSafe ($35) = $700 revenue → $200 profit

**Total**: $12,950 revenue → **$4,050 profit** in Month 1

---

## Need Help?

**Documentation:**
- `COMPLETE_SYSTEM_READY.md` - Full system guide
- `TWO_BUSINESS_MODELS_COMPLETE.md` - Business model details
- `BUY_NOW_PAY_LATER_COMPLETE.md` - Payment options guide

**Support**: support@elevateforhumanity.org

---

## You're Ready! 🚀

Everything is built. Just run the migrations and start enrolling students!
=======
# Quick Start Guide - Elevate for Humanity

## 🚀 Get Running in 5 Minutes

### Step 1: Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy these three values:
   - Project URL
   - anon/public key
   - service_role key

### Step 2: Configure Environment (1 minute)

1. Open `.env.local` in the project root
2. Replace these values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### Step 3: Run Database Migrations (1 minute)

1. Go to Supabase → SQL Editor
2. Run these migrations in order:
   - `migrations/002_wioa_compliance_tables.sql`
   - `migrations/003_employment_outcomes_credentials.sql`
   - `migrations/004_quiz_assessment_engine.sql`

### Step 4: Start Development Server (1 minute)

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ What's Fixed

- ✅ All missing images
- ✅ Environment variables setup
- ✅ Employment outcome tracking
- ✅ Credential tracking
- ✅ Quiz/assessment engine
- ✅ Certificate PDF generation
- ✅ WIOA quarterly reports

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment configuration |
| `FIXES_COMPLETED.md` | Detailed list of all fixes |
| `TESTING_CHECKLIST.md` | Complete testing guide |
| `migrations/003_*.sql` | Compliance tracking tables |
| `migrations/004_*.sql` | Quiz engine tables |
| `lib/certificate-generator.ts` | PDF certificate generation |
| `app/api/reports/wioa-quarterly/` | WIOA reporting API |

---

## 🧪 Test It Works

### 1. Homepage
Visit [http://localhost:3000](http://localhost:3000)
- All images should load
- No broken links
- Programs grid displays correctly

### 2. Apply Page
Visit [http://localhost:3000/apply](http://localhost:3000/apply)
- Form loads
- Dropdown works
- Can submit application

### 3. Programs
Visit [http://localhost:3000/programs](http://localhost:3000/programs)
- All program cards display
- Images load correctly
- Links work

---

## 🐛 Troubleshooting

### "Supabase connection error"
- Check `.env.local` has correct credentials
- Verify Supabase project is running
- Check network connection

### "Module not found"
```bash
pnpm install
```

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
# Or use different port
pnpm dev -- -p 3001
```

### Images not loading
- Check `public/media/programs/` folder exists
- Verify image files are present
- Clear browser cache

---

## 📊 Database Tables Added

### Compliance Tracking (Migration 003)
- `employment_outcomes` - Track employment after training
- `credentials_attained` - Track credentials earned
- `quarterly_performance` - WIOA metrics
- `participant_demographics` - Demographics data
- `followup_schedule` - Retention tracking

### Assessment Engine (Migration 004)
- `quizzes` - Quiz definitions
- `quiz_questions` - Question bank
- `quiz_answer_options` - Answer choices
- `quiz_attempts` - Student attempts
- `quiz_responses` - Individual answers
- `assessments` - Skills assessments
- `assessment_results` - Assessment outcomes
- `question_bank` - Reusable questions

---

## 🎯 Next Steps

1. **Test Everything**
   - Follow `TESTING_CHECKLIST.md`
   - Test all user flows
   - Document any issues

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Add Environment Variables in Vercel**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Get Beta Users**
   - Start with 5-10 users
   - Collect feedback
   - Iterate

---

## 📞 Need Help?

### Documentation
- **Detailed Fixes:** `FIXES_COMPLETED.md`
- **Testing Guide:** `TESTING_CHECKLIST.md`
- **Environment Setup:** `.env.example`

### External Resources
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs

### Common Issues
- Check GitHub Issues
- Search Stack Overflow
- Review error logs in browser console

---

## 🎉 You're Ready!

Everything is fixed and ready to go. Just:
1. Add Supabase credentials
2. Run migrations
3. Start the server
4. Test it works

**Good luck! 🚀**
>>>>>>> 7e692f2e (Add comprehensive legal protection and security features)
