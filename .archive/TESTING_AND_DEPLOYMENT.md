# 🧪 TESTING AND DEPLOYMENT GUIDE

## ✅ ALL FILES IMPLEMENTED

The following pages have been created/updated with the clean marketing shell:

- ✅ `config/navigation.ts` - Navigation config
- ✅ `components/layout/MainHeader.tsx` - Clean header
- ✅ `components/layout/MainFooter.tsx` - Clean footer
- ✅ `app/page.tsx` - Homepage (moved from marketing group)
- ✅ `app/programs/page.tsx` - Programs catalog
- ✅ `app/apply/page.tsx` - Application form
- ✅ `app/api/applications/route.ts` - API to save applications
- ✅ `app/funding/page.tsx` - Funding explanation
- ✅ `app/employers/page.tsx` - Employer partnerships
- ✅ `app/about/page.tsx` - About page
- ✅ `app/contact/page.tsx` - Contact form

---

## 1️⃣ SUPABASE TABLE SETUP

### Check if Table Exists

Go to Supabase dashboard → SQL Editor and run:

```sql
SELECT * FROM applications LIMIT 1;
```

### If Table Doesn't Exist, Create It

```sql
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  program_interest text,
  referral_source text,
  created_at timestamptz default now()
);

alter table applications enable row level security;

create policy "Allow service role to insert"
  on applications
  for insert
  to service_role
  with check (true);
```

---

## 2️⃣ ENVIRONMENT VARIABLES

### Local (Gitpod)

Create `.env.local` file in project root:

```bash
cd /workspaces/fix2
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
```

Get your credentials from:
https://supabase.com/dashboard → Your Project → Settings → API

### Production (Vercel)

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these three variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 3️⃣ LOCAL TESTING

### Start Dev Server

```bash
cd /workspaces/fix2
pnpm install
pnpm run dev
```

### Test All Pages

Open Gitpod preview URL and click through:

- [ ] **/** - Homepage
  - Clean header with "Apply Now" button
  - Hero section with clear message
  - 3 highlight cards
  - Clean footer

- [ ] **/programs** - Programs catalog
  - 4 program groups (Healthcare, Trades, Beauty, Business)
  - Each program has "I'm interested" link
  - Note at bottom about other programs

- [ ] **/apply** - Application form
  - Form loads without errors
  - All fields visible (Name, Email, Phone, Program, Referral)
  - Submit button works

- [ ] **/funding** - Funding explanation
  - 4-step process cards
  - Clear explanation of funding options
  - "Apply for Funding" CTA

- [ ] **/employers** - Employer partnerships
  - 6 program cards (OJT, WEX, Apprenticeships, etc.)
  - "Become a Partner" CTA

- [ ] **/about** - About page
  - Mission statement
  - What we offer list

- [ ] **/contact** - Contact form
  - Form loads
  - Submit shows success message

---

## 4️⃣ TEST APPLY FORM END-TO-END

### Submit Test Application

1. Go to `/apply`
2. Fill out form:
   - Full Name: Test Student
   - Email: test@example.com
   - Phone: 555-1234
   - Program Interest: CNA
   - Referral Source: Testing
3. Click "Submit Application"
4. Should see success message

### Verify in Supabase

1. Go to Supabase dashboard
2. Click "Table Editor"
3. Select "applications" table
4. Verify new row exists with your test data

### If Form Doesn't Work

Check Gitpod terminal where `pnpm run dev` is running for errors:
- Look for red error messages
- Check for "SUPABASE" related errors
- Verify environment variables are loaded

---

## 5️⃣ COMMIT AND PUSH

### Check What Changed

```bash
git status
```

### Commit Changes

```bash
git add .
git commit -m "Implement clean marketing shell and enrollment flow

- Add clean navigation with MainHeader/MainFooter
- Create simple homepage with clear value proposition
- Add programs catalog page
- Implement working apply form with Supabase integration
- Add funding explanation page
- Add employers partnership page
- Add about and contact pages
- All pages use consistent design system"

git push origin main
```

### If Push Fails

```bash
# Pull latest changes first
git pull --rebase origin main

# Then push
git push origin main
```

---

## 6️⃣ VERIFY CI/CD

### Check GitHub Actions

Go to: https://github.com/elevateforhumanity/fix2/actions

Look for "Site Healthcheck" workflow:
- [ ] Latest run on main branch
- [ ] Status is ✅ green

### If CI Fails

Click the failed run to see which step failed:
- **lint** - ESLint errors (see FOR_CHATGPT_QUICK_START.md)
- **type-check** - TypeScript errors
- **build** - Build errors
- **test** - Test failures

---

## 7️⃣ VERIFY PRODUCTION DEPLOYMENT

### Check Vercel Dashboard

Go to: https://vercel.com/dashboard

- [ ] Latest deployment shows "Ready"
- [ ] No build errors
- [ ] Environment variables are set

### Test Production Site

Visit: https://www.elevateforhumanity.org

Test all pages:
- [ ] / (homepage)
- [ ] /programs
- [ ] /apply
- [ ] /funding
- [ ] /employers
- [ ] /about
- [ ] /contact

### Test Apply Form on Production

1. Go to https://www.elevateforhumanity.org/apply
2. Submit test application
3. Verify in Supabase applications table

---

## 8️⃣ MOBILE TESTING

### On Your Phone

Open: https://www.elevateforhumanity.org

Check:
- [ ] Header looks good (not tiny)
- [ ] Mobile menu opens/closes
- [ ] "Apply Now" button is visible
- [ ] Apply form is usable
- [ ] All text is readable
- [ ] Footer links work

---

## 9️⃣ WHAT TO TELL PEOPLE

Once everything works in production:

### For Students / Public:
> "Apply online at **elevateforhumanity.org/apply** - we'll match you with the right program and funding."

### For Case Managers / WorkOne:
> "Send clients to **elevateforhumanity.org/apply** and we'll follow up within 24 hours about funding options."

### For Employers:
> "Learn about workforce partnerships at **elevateforhumanity.org/employers**"

### For Funders / Workforce Boards:
> "See our funding approach at **elevateforhumanity.org/funding**"

---

## 🐛 TROUBLESHOOTING

### Issue: Page shows 404

**Check:**
- File exists in correct location
- No typos in filename
- Dev server was restarted after creating file

**Fix:**
```bash
# Restart dev server
pkill -f "next dev"
pnpm run dev
```

### Issue: Apply form shows "Could not save application"

**Check:**
1. Environment variables are set correctly
2. Supabase table exists
3. RLS policy allows inserts
4. Browser console for specific error

**Fix:**
- Verify `.env.local` exists and has correct values
- Check Supabase SQL editor for table
- Check Vercel environment variables

### Issue: Header/Footer not showing

**Check:**
- `app/layout.tsx` imports MainHeader/MainFooter
- Components exist in `components/layout/`
- No JavaScript errors in browser console

### Issue: Build fails in Vercel

**Check:**
- TypeScript errors: Run `pnpm run type-check` locally
- ESLint errors: Run `pnpm run lint` locally
- Missing dependencies: Check `package.json`

---

## ✅ SUCCESS CHECKLIST

Before going live, verify:

- [ ] All pages load without errors
- [ ] Apply form submits successfully
- [ ] Application appears in Supabase
- [ ] Mobile experience is good
- [ ] Header/footer show on all pages
- [ ] Navigation links work
- [ ] Production site matches local
- [ ] Environment variables set in Vercel
- [ ] CI/CD passes (GitHub Actions green)

---

## 📊 METRICS TO TRACK

After deployment, monitor:

### In Supabase:
- Number of applications submitted
- Most common program interests
- Referral sources

### In Vercel:
- Page views
- Error rate
- Build success rate

### In Google Analytics (if configured):
- Traffic to /apply
- Conversion rate (visit → submit)
- Mobile vs desktop usage

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. **Test with real users**
   - Have a colleague submit test application
   - Verify you receive notification
   - Test on different devices

2. **Set up notifications**
   - Configure email alerts for new applications
   - Set up Slack/Discord webhook (optional)

3. **Monitor for issues**
   - Check Supabase daily for new applications
   - Monitor Vercel for errors
   - Review user feedback

4. **Iterate and improve**
   - Add more program details
   - Enhance funding page with specific grant info
   - Add success stories/testimonials

---

**Last Updated:** 2024-11-27 16:44 UTC
**Status:** Ready for testing and deployment
