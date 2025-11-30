# Production Deployment Checklist

## Pre-Deployment (30 minutes)

### 1. Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Supabase credentials:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Add Stripe credentials:
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] Add email provider credentials:
  - [ ] `SENDGRID_API_KEY` or `RESEND_API_KEY`
  - [ ] `EMAIL_FROM`

### 2. Database Migration
- [ ] Open Supabase SQL Editor
- [ ] Run `supabase/migrations/20241130_create_partner_lms_tables.sql`
- [ ] Verify 5 tables created:
  ```sql
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name LIKE 'partner%';
  ```
- [ ] Verify 7 partners seeded:
  ```sql
  SELECT provider_name, provider_type FROM partner_lms_providers;
  ```

### 3. Edge Functions Deployment
- [ ] Deploy enrollment email:
  ```bash
  supabase functions deploy send-partner-enrollment-email \
    --project-ref YOUR_PROJECT_REF --no-verify-jwt
  ```
- [ ] Deploy completion email:
  ```bash
  supabase functions deploy send-partner-completion-email \
    --project-ref YOUR_PROJECT_REF --no-verify-jwt
  ```
- [ ] Set environment variables in Supabase Dashboard:
  - [ ] `SENDGRID_API_KEY` or `RESEND_API_KEY`
  - [ ] `EMAIL_FROM`

## Deployment (15 minutes)

### 4. Build Application
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Fix any build errors
- [ ] Test locally: `npm run dev`

### 5. Deploy to Vercel
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify Vercel auto-deployment triggered
- [ ] Add environment variables in Vercel Dashboard
- [ ] Wait for deployment to complete
- [ ] Visit production URL

### 6. Verify Deployment
- [ ] Homepage loads: `/`
- [ ] Programs page loads: `/programs`
- [ ] Admin analytics loads: `/admin/analytics`
- [ ] Admin completions loads: `/admin/completions`
- [ ] Student certificates loads: `/student/certificates`

## Post-Deployment (1-2 hours)

### 7. Partner API Integration (Start with HSI)
- [ ] Get HSI API credentials from partner
- [ ] Create `lib/partners/hsi.ts` implementation
- [ ] Add HSI environment variables:
  - [ ] `HSI_API_BASE_URL`
  - [ ] `HSI_API_KEY`
  - [ ] `HSI_ORG_ID`
- [ ] Update `lib/partners/index.ts` to use real HSI client
- [ ] Test HSI account creation
- [ ] Test HSI enrollment
- [ ] Test HSI progress check
- [ ] Test HSI certificate retrieval

### 8. Test Complete Flow
- [ ] Create test student account
- [ ] Add test course to `partner_courses` table
- [ ] Create test Stripe checkout with metadata:
  ```javascript
  {
    studentId: "test-uuid",
    partnerId: "hsi-uuid",
    courseId: "test-course-uuid"
  }
  ```
- [ ] Complete test payment
- [ ] Verify enrollment created in database
- [ ] Verify enrollment email sent
- [ ] Check student can see enrollment in dashboard
- [ ] Test "Start Course" button launches SSO
- [ ] Manually mark course as completed
- [ ] Verify certificate created
- [ ] Verify completion email sent
- [ ] Check certificate appears in student certificates page

### 9. Progress Sync Setup
- [ ] Create Supabase cron job OR
- [ ] Set up external cron (Vercel Cron, GitHub Actions)
- [ ] Test manual sync:
  ```typescript
  await syncSingleEnrollment("test-enrollment-id");
  ```
- [ ] Verify progress updates in database
- [ ] Schedule daily sync (2 AM recommended)

### 10. Admin Training
- [ ] Show admin analytics dashboard
- [ ] Demonstrate completions report
- [ ] Show how to filter by funding source
- [ ] Show how to export CSV reports
- [ ] Explain WIOA-style export
- [ ] Show how to view student certificates

## Monitoring (Ongoing)

### Daily Checks
- [ ] Check failed enrollments:
  ```sql
  SELECT * FROM partner_lms_enrollment_failures 
  WHERE resolved = false 
  ORDER BY created_at DESC LIMIT 10;
  ```
- [ ] Check pending enrollments (should be < 1 hour old):
  ```sql
  SELECT * FROM partner_lms_enrollments 
  WHERE status = 'pending' 
  AND created_at < NOW() - INTERVAL '1 hour';
  ```
- [ ] Review admin analytics dashboard
- [ ] Check email delivery logs

### Weekly Tasks
- [ ] Export completions report
- [ ] Review completion rates
- [ ] Check certificate issuance
- [ ] Verify partner API usage
- [ ] Review error logs

### Monthly Tasks
- [ ] Update partner course catalogs
- [ ] Review and resolve enrollment failures
- [ ] Verify certificate verification URLs
- [ ] Export WIOA reports for workforce board
- [ ] Review partner API costs
- [ ] Update documentation if needed

## Rollback Plan

If issues occur:

1. **Database Issues**
   - Restore from Supabase backup
   - Re-run migration if needed

2. **Application Issues**
   - Revert to previous Vercel deployment
   - Check error logs in Vercel dashboard

3. **Partner API Issues**
   - Switch back to stub implementation
   - Contact partner support
   - Review API documentation

4. **Email Issues**
   - Check SendGrid/Resend dashboard
   - Verify API keys
   - Test Edge Functions manually

## Success Criteria

✅ All tables created and seeded  
✅ Edge Functions deployed and working  
✅ Application builds without errors  
✅ Production site accessible  
✅ At least one partner API integrated  
✅ Test enrollment completes successfully  
✅ Emails sent automatically  
✅ Admin dashboards show data  
✅ CSV exports work  
✅ Progress sync running  

## Support Resources

- **Implementation Guide**: `docs/IMPLEMENTATION_GUIDE.md`
- **PIRL Mapping**: `docs/compliance/WIOA_PIRL_MAPPING_NOTES.md`
- **Partner System**: `PARTNER_AUTOMATION_SYSTEM.md`
- **Feature Status**: `ENTERPRISE_LMS_FEATURE_STATUS.md`

## Emergency Contacts

- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **Partner Support**: (Add partner contact info)
- **Email Provider Support**: (Add SendGrid/Resend contact)

---

**Last Updated**: November 30, 2025  
**System Version**: 2.0 (Enterprise LMS)  
**Deployment Status**: Ready for Production
