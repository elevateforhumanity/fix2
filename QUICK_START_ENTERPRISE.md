# Enterprise Features - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide gets you up and running with all enterprise features quickly.

---

## Step 1: Install Dependencies (1 min)

```bash
# OpenTelemetry (if not already installed)
npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/exporter-trace-otlp-http @opentelemetry/resources @opentelemetry/semantic-conventions

# Accessibility linting
npm install --save-dev eslint-plugin-jsx-a11y
```

---

## Step 2: Run Database Migrations (1 min)

```bash
# Via Supabase SQL Editor - copy/paste these files:
# 1. migrations/20251118_advanced_assessments.sql
# 2. migrations/20251118_billing_and_wioa.sql
# 3. migrations/20251118_lti_and_help.sql
# 4. migrations/20251118_gdpr_ferpa.sql

# Or via CLI:
psql $DATABASE_URL -f migrations/20251118_advanced_assessments.sql
psql $DATABASE_URL -f migrations/20251118_billing_and_wioa.sql
psql $DATABASE_URL -f migrations/20251118_lti_and_help.sql
psql $DATABASE_URL -f migrations/20251118_gdpr_ferpa.sql
```

---

## Step 3: Configure Environment Variables (2 min)

Add to `.env.local`:

```bash
# Stripe Billing
STRIPE_SECRET_KEY=sk_test_your_key_here
INTERNAL_CRON_TOKEN=generate_random_token_here

# LTI 1.3 (optional)
LTI_TOOL_URL=https://www.elevateforhumanity.org
LTI_PUBLIC_KEY_N=your_rsa_public_key_modulus

# Zendesk Support (optional)
ZENDESK_SUBDOMAIN=your_subdomain
ZENDESK_EMAIL=support@elevateforhumanity.org
ZENDESK_API_TOKEN=your_api_token

# Salesforce CRM (optional)
SF_INSTANCE_URL=https://your-instance.my.salesforce.com
SF_CLIENT_ID=your_client_id
SF_CLIENT_SECRET=your_client_secret
SF_USERNAME=your_username
SF_PASSWORD=your_password_plus_token

# OpenTelemetry (optional)
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318/v1/traces
```

---

## Step 4: Test Core Features (1 min)

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok"}
```

### Test Metrics Endpoint
```bash
curl http://localhost:3000/api/metrics
# Should return Prometheus metrics
```

### Test Data Export
```bash
# Login first, then:
curl http://localhost:3000/api/account/export \
  -H "Cookie: your-session-cookie"
# Should download JSON file
```

---

## Step 5: Deploy (Optional)

### Option A: Vercel (Existing)
```bash
vercel --prod
```

### Option B: Kubernetes (New)
```bash
# Build and push image
docker build -t ghcr.io/elevateforhumanity/efh-web:latest .
docker push ghcr.io/elevateforhumanity/efh-web:latest

# Deploy to K8s
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment-app.yaml
kubectl apply -f k8s/service-app.yaml
kubectl apply -f k8s/ingress-app.yaml
kubectl apply -f k8s/hpa-app.yaml
```

---

## 🎯 What You Can Do Now

### Assessments
- Create question banks
- Build randomized exams
- Enable proctoring
- Auto-grade submissions

### Billing
- Track tenant usage
- Report to Stripe
- Metered billing

### Compliance
- Export WIOA reports
- Export user data (GDPR)
- Handle deletion requests

### Integrations
- Launch from Canvas/Moodle (LTI)
- Create Zendesk tickets
- Sync Salesforce leads
- Search help articles

### Operations
- Deploy to Kubernetes
- Monitor with OpenTelemetry
- Scale automatically
- Track metrics

---

## 📚 Next Steps

1. **Read Full Documentation**
   - `ADVANCED_FEATURES_BATCH_1.md`
   - `ADVANCED_FEATURES_BATCH_2.md`
   - `ADVANCED_FEATURES_BATCH_3.md`
   - `ENTERPRISE_FEATURES_COMPLETE.md`

2. **Configure Integrations**
   - Set up Stripe account
   - Configure Zendesk
   - Connect Salesforce
   - Register LTI platforms

3. **Test Features**
   - Create test exam
   - Submit support ticket
   - Export user data
   - Deploy to staging

4. **Go to Production**
   - Configure production secrets
   - Deploy to K8s or Vercel
   - Set up monitoring
   - Train team

---

## 🆘 Quick Troubleshooting

### Migrations Fail
- Check database connection
- Verify Supabase credentials
- Run migrations in order

### API Endpoints Return 500
- Check environment variables
- Verify Supabase service role key
- Check server logs

### Kubernetes Pods Not Starting
- Verify image exists
- Check secrets created
- Review pod logs: `kubectl logs -n efh-prod -l app=efh-web`

### Integrations Not Working
- Verify API credentials
- Check network connectivity
- Review integration logs

---

## 📞 Get Help

- **Documentation**: See batch documentation files
- **Setup Guide**: `ENTERPRISE_FEATURES_SETUP.md`
- **K8s Guide**: `k8s/README.md`
- **Issues**: GitHub Issues
- **Email**: support@elevateforhumanity.org

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Migrations run
- [ ] Environment variables configured
- [ ] Health endpoint working
- [ ] Metrics endpoint working
- [ ] Data export tested
- [ ] Deployed to staging
- [ ] Team trained
- [ ] Production ready

---

**Time to Production**: ~30 minutes (with all credentials ready)  
**Difficulty**: Intermediate  
**Support**: Full documentation available

🚀 **You're ready to go enterprise!**
