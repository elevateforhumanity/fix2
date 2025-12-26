# ENVIRONMENT VARIABLE AUDIT

## REQUIRED (boot blockers)

These must be present or the app will fail at startup:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key for admin operations
- `NEXT_PUBLIC_SITE_URL` - Canonical site URL for SEO and redirects

## OPTIONAL (feature-gated)

These enable specific features. Missing keys result in controlled 503 responses:

### Payments

- `STRIPE_SECRET_KEY` → Stripe payment processing
- `STRIPE_PUBLISHABLE_KEY` → Stripe client-side
- `stripe_webhook_secret` → Stripe webhook verification

### Email

- `RESEND_API_KEY` → Resend email service
- `EMAIL_FROM` → Default sender address
- `REPLY_TO_EMAIL` → Reply-to address
- `MOU_ARCHIVE_EMAIL` → MOU document archiving
- `SPONSOR_FINANCE_EMAIL` → Finance notifications

### AI/ML

- `OPENAI_API_KEY` (openapikey) → OpenAI API
- `ELEVENLABS_API_KEY` → Voice synthesis

### CRM/Marketing

- `HUBSPOT_API_KEY` → HubSpot integration
- `HUBSPOT_PRIVATE_APP_TOKEN` → HubSpot private app
- `HUBSPOT_PORTAL_ID` → HubSpot portal
- `HUBSPOT_FORM_GUID` → HubSpot form

### Social Media

- `FACEBOOK_ACCESS_TOKEN` → Facebook API
- `FACEBOOK_PAGE_ID` → Facebook page
- `LINKEDIN_ACCESS_TOKEN` → LinkedIn API
- `LINKEDIN_ORGANIZATION_ID` → LinkedIn org
- `LINKEDIN_CLIENT_ID` → LinkedIn OAuth
- `LINKEDIN_CLIENT_SECRET` → LinkedIn OAuth

### Analytics

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` → Google Analytics
- `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` → Facebook Pixel

### Authentication

- `NEXTAUTH_SECRET` → NextAuth session encryption
- `SESSION_SECRET` → Session encryption

### Rate Limiting

- `UPSTASH_REDIS_REST_URL` → Upstash Redis
- `UPSTASH_REDIS_REST_TOKEN` → Upstash auth

### Webhooks/Cron

- `CRON_SECRET` → Cron job authentication
- `PARTNER_WEBHOOK_SECRET` → Partner webhook verification
- `INTERNAL_API_TOKEN` → Internal API auth
- `INTERNAL_CRON_TOKEN` → Internal cron auth
- `AUDIT_SECRET` → Audit endpoint auth

### External APIs

- `SAM_API_KEY` (Sam_API_Key) → SAM.gov integration
- `GOOGLE_CLOUD_API_KEY` → Google Cloud services
- `MILADY_API_KEY` → Milady API
- `MILADY_API_SECRET` → Milady API
- `MILADY_API_URL` → Milady endpoint
- `EOS_FINANCIAL_API_KEY` → EOS Financial
- `EOS_FINANCIAL_API_URL` → EOS Financial endpoint
- `AFFIRM_PRIVATE_KEY` (affirm_private_api_key) → Affirm payments
- `AFFIRM_PUBLIC_KEY` (affirm_public_api_key) → Affirm client

### Program Configuration

- `NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER` → RAPIDS program ID
- `NEXT_PUBLIC_RAPIDS_SPONSOR_NAME` → RAPIDS sponsor
- `NEXT_PUBLIC_RTI_PROVIDER_ID` → RTI provider ID

### Vercel

- `VERCEL_OIDC_TOKEN` → Vercel deployment token

### Database

- `DATABASE_URL` → Direct database connection (optional, Supabase preferred)

## DEAD/UNUSED

Variables referenced in code but not actively used:

- `ALERT_EMAIL` - No active usage found
- `GITHUB_TOKEN` - No active usage found
- `LTI_PUBLIC_KEY_N` - LTI integration incomplete
- `LTI_TOOL_URL` - LTI integration incomplete

## POLICY

1. **Required vars** hard-fail on startup via `lib/env/validate.ts`
2. **Optional vars** gate features with 503 responses when missing
3. **No env var** referenced without classification
4. **Vercel Production** must have all required + active optional vars set

## ACTION ITEMS

- [ ] Verify all required vars in Vercel Production environment
- [ ] Add feature gating to all optional integrations
- [ ] Remove dead code referencing unused vars
- [ ] Document which optional vars are needed for production vs development
