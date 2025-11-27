# Elevate for Humanity – Launch Checklist (Staff-Facing)

This checklist mirrors the admin page at `/admin/site-health` so non-technical
staff can follow along.

## Week 1 – Content & Configuration

- [ ] Upload JRI SCORM modules to `/public/scorm/jri/`
- [ ] Create real Stripe products and update `lms-data/billingConfig.ts`
- [ ] Set all environment variables in production
  - `NEXT_PUBLIC_SITE_URL`
  - `STRIPE_SECRET_KEY`
  - `OPENAI_API_KEY`
- [ ] Replace homepage hero images with final, high-res photos

## Week 2 – Testing & Polish

- [ ] Test enrollment flow end-to-end
- [ ] Test AI tutor / AI console with real OpenAI key
- [ ] Test SCORM module playback
- [ ] Mobile responsiveness check (phone size)

## Week 3 – Launch Prep

- [ ] Confirm docs are in `/docs` and not root
- [ ] Create or update admin user guide
- [ ] Confirm monitoring/analytics are set up
- [ ] Deploy to production and run one more QA pass

The `/admin/site-health` page shows a quick dashboard view of these items.
