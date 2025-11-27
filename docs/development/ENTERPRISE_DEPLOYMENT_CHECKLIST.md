# Enterprise Features Deployment Checklist

This checklist ensures all enterprise features (A-H) are properly deployed and configured.

## ✅ Pre-Deployment Verification

### 1. Feature Verification
Run the automated feature check:
```bash
pnpm check:features
```

All features should show ✅ status:
- [ ] LMS Shell & Dashboard
- [ ] Forums (UI + API)
- [ ] Study Groups (UI + API)
- [ ] Student Analytics
- [ ] Admin Analytics
- [ ] Course Authoring
- [ ] AI Tutor & AI Course Builder
- [ ] xAPI + Video Meta
- [ ] Certificates & Verification
- [ ] Program Holder Portal
- [ ] Mobile Summary API
- [ ] Caseload Dashboard
- [ ] Enrollment Applications

### 2. Database Migration
Run the enterprise features migration:
```bash
# Connect to your Supabase instance
psql $DATABASE_URL -f migrations/enterprise_features.sql
```

Verify tables created:
- [ ] video_chapters
- [ ] video_transcripts
- [ ] funding_applications
- [ ] user_streaks
- [ ] xapi_statements
- [ ] certificates
- [ ] program_holder_notes
- [ ] ai_generated_courses

### 3. Environment Variables
Ensure all required environment variables are set in Vercel/production:

**Required:**
- [ ] SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] SUPABASE_ANON_KEY
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] NEXT_PUBLIC_SITE_URL
- [ ] OPENAI_API_KEY

**Optional (but recommended):**
- [ ] XAPI_ENDPOINT
- [ ] XAPI_USERNAME
- [ ] XAPI_PASSWORD
- [ ] RESEND_API_KEY (for email notifications)
- [ ] STRIPE_SECRET_KEY (for payments)

### 4. Build Verification
```bash
pnpm lint
pnpm typecheck
pnpm build
```

All commands should complete without errors:
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Build succeeds

---

## 🚀 Deployment Steps

### 1. Deploy to Vercel
```bash
# Option A: Using Vercel CLI
vercel --prod

# Option B: Push to main branch (auto-deploy)
git push origin main
```

### 2. Verify Deployment
After deployment, verify these URLs work:

**Public Pages:**
- [ ] https://yoursite.com/
- [ ] https://yoursite.com/programs
- [ ] https://yoursite.com/verify/[test-certificate-id]

**LMS Pages:**
- [ ] https://yoursite.com/lms/dashboard
- [ ] https://yoursite.com/lms/courses
- [ ] https://yoursite.com/lms/forums
- [ ] https://yoursite.com/lms/study-groups
- [ ] https://yoursite.com/lms/analytics
- [ ] https://yoursite.com/lms/chat

**Admin Pages:**
- [ ] https://yoursite.com/admin/dashboard
- [ ] https://yoursite.com/admin/analytics
- [ ] https://yoursite.com/admin/reports/caseload
- [ ] https://yoursite.com/admin/ai-course-builder

**Program Holder Pages:**
- [ ] https://yoursite.com/program-holder/dashboard
- [ ] https://yoursite.com/program-holder/training

### 3. API Endpoint Testing
Test critical API endpoints:

```bash
# Mobile Summary (requires auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://yoursite.com/api/mobile/summary

# Certificate Verification (public)
curl https://yoursite.com/api/verify/certificate/[certificate-id]

# Video Metadata (public)
curl https://yoursite.com/api/videos/[video-id]/meta

# Caseload Report (requires admin auth)
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  https://yoursite.com/api/reports/caseload
```

API endpoints should return:
- [ ] Mobile summary API works
- [ ] Certificate verification API works
- [ ] Video metadata API works
- [ ] Caseload API works (for admins)

---

## 🔧 Post-Deployment Configuration

### 1. Create Test Data
Create test records to verify features:

**Certificates:**
```sql
INSERT INTO certificates (
  user_id, course_id, certificate_number, verification_code, issued_at
) VALUES (
  'test-user-id', 'test-course-id', 'CERT-2024-001', 'ABC123XYZ', NOW()
);
```

**Video Chapters:**
```sql
INSERT INTO video_chapters (
  video_id, title, start_time, end_time
) VALUES (
  'test-video-id', 'Introduction', 0, 120
);
```

**Funding Application:**
```sql
INSERT INTO funding_applications (
  user_id, course_id, program_type, status, submitted_at
) VALUES (
  'test-user-id', 'test-course-id', 'WIOA', 'pending', NOW()
);
```

### 2. Configure xAPI LRS (if using)
If you have an xAPI Learning Record Store:
- [ ] Set XAPI_ENDPOINT in environment variables
- [ ] Set XAPI_USERNAME and XAPI_PASSWORD
- [ ] Test xAPI statement submission
- [ ] Verify statements appear in LRS

### 3. Configure AI Features
- [ ] Verify OPENAI_API_KEY is set
- [ ] Test AI Course Builder from admin panel
- [ ] Test AI Tutor chat from student portal
- [ ] Monitor OpenAI API usage

### 4. Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor API response times
- [ ] Set up uptime monitoring

---

## 📊 Feature Testing Checklist

### Feature A: xAPI Tracking
- [ ] Video play events tracked
- [ ] Lesson completion tracked
- [ ] Quiz attempts tracked
- [ ] Statements visible in LRS (if configured)

### Feature B: Certificate Verification
- [ ] Create test certificate
- [ ] Generate QR code
- [ ] Verify certificate via URL
- [ ] Test revocation workflow

### Feature C: Caseload Dashboard
- [ ] View caseload report as admin
- [ ] Filter by program (WIOA, WRG, JRI)
- [ ] Filter by status (On Track, At Risk, Not Engaged)
- [ ] Export to CSV

### Feature D: Program Holder Portal
- [ ] Log in as program holder
- [ ] View assigned learners
- [ ] Record attendance
- [ ] Add case notes

### Feature E: Mobile Summary
- [ ] Call API with auth token
- [ ] Verify counts returned (enrollments, certificates, etc.)
- [ ] Test with different users

### Feature F: Video Metadata
- [ ] Add chapters to video
- [ ] Add transcript to video
- [ ] View chapters in player
- [ ] View transcript in player

### Feature G: Enrollment Flows
- [ ] Submit WIOA application
- [ ] Submit WRG application
- [ ] Submit JRI application
- [ ] View application status
- [ ] Admin approve/reject application

### Feature H: AI Course Builder
- [ ] Generate course outline
- [ ] Review generated content
- [ ] Download JSON
- [ ] Import to course authoring

---

## 🎯 Success Criteria

All items below should be ✅ before considering deployment complete:

### Technical
- [ ] All feature checks pass
- [ ] All database tables created
- [ ] All environment variables set
- [ ] Build succeeds without errors
- [ ] No console errors on key pages

### Functional
- [ ] All 8 enterprise features (A-H) working
- [ ] Certificate verification works publicly
- [ ] Admin can view caseload dashboard
- [ ] Program holders can record attendance
- [ ] Mobile API returns correct data
- [ ] AI course builder generates content
- [ ] Video chapters/transcripts display
- [ ] Enrollment applications submit successfully

### Performance
- [ ] Homepage loads in < 3 seconds
- [ ] LMS dashboard loads in < 2 seconds
- [ ] API responses < 500ms average
- [ ] No memory leaks detected

### Security
- [ ] RLS policies enabled on all tables
- [ ] Admin routes require authentication
- [ ] API endpoints validate permissions
- [ ] No sensitive data in client code
- [ ] HTTPS enabled on all routes

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
pnpm clean:full
pnpm install
pnpm build
```

### Database Connection Issues
```bash
# Verify Supabase connection
curl -H "apikey: YOUR_ANON_KEY" \
  https://YOUR_PROJECT.supabase.co/rest/v1/
```

### Environment Variables Not Loading
```bash
# Verify in Vercel dashboard
vercel env pull .env.local

# Or check in Vercel UI:
# Project Settings > Environment Variables
```

### API Returns 500 Errors
- Check Vercel function logs
- Verify database tables exist
- Check RLS policies
- Verify environment variables

---

## 📝 Post-Deployment Tasks

### Documentation
- [ ] Update README with new features
- [ ] Document API endpoints
- [ ] Create user guides for new features
- [ ] Update admin documentation

### Training
- [ ] Train staff on caseload dashboard
- [ ] Train program holders on attendance tracking
- [ ] Train admins on AI course builder
- [ ] Create video tutorials

### Marketing
- [ ] Announce new features to users
- [ ] Update marketing site with capabilities
- [ ] Create feature comparison chart
- [ ] Update grant proposals with new features

### Monitoring
- [ ] Set up alerts for errors
- [ ] Monitor API usage
- [ ] Track feature adoption
- [ ] Collect user feedback

---

## 🎉 Deployment Complete!

Once all items are checked, your enterprise features are live!

**Platform Status:**
- ✅ 8 Enterprise Features Deployed
- ✅ 13 New API Endpoints
- ✅ 8 New Database Tables
- ✅ Mobile App Support
- ✅ AI-Powered Features
- ✅ Workforce Compliance Ready

**Next Steps:**
1. Monitor usage and performance
2. Collect user feedback
3. Plan next feature iteration
4. Update documentation as needed

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Version:** 2.0 (Enterprise Edition)  
**Status:** 🚀 LIVE
