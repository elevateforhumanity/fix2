# Credentials & Access Checklist

## 🔐 Account Access Inventory

### Google Services
- [ ] **Google Ads Account**
  - Email: curvaturebodysculpting@gmail.com
  - Status: Activated
  - Grant: $10,000/month
  - Login: ads.google.com

- [ ] **Google for Nonprofits**
  - Charity ID: 99-3483511
  - Organization: SELFISH INC
  - Dashboard: google.com/nonprofits

- [ ] **Google Analytics** (if set up)
  - Property ID: _____________
  - Login: analytics.google.com

### Website & Hosting
- [ ] **Vercel (Hosting)**
  - Project: fix2-gpql
  - Team ID: team_Ae8f33vVYR36quLOS8HCeROs
  - Login: vercel.com

- [ ] **GitHub (Code Repository)**
  - Repo: github.com/elevateforhumanity/fix2
  - Access: _____________

- [ ] **Supabase (Database)**
  - Project URL: https://cuxzzpsyufcewtmicszk.supabase.co
  - Login: supabase.com

### Payment Processing
- [ ] **Stripe**
  - Publishable Key: pk_live_51RvqjzIRNf5vPH3A...
  - Login: stripe.com

- [ ] **Donation Platform**
  - Link: donate.stripe.com/5kA5kn7EsfrD08w4gg

### Email Services
- [ ] **Resend (Email API)**
  - API Key: re_gBrK59nn_CAeQ8tyU7pihrvj6Y3Q3T8kJ
  - From: Elevate for Humanity <noreply@elevateforhumanity.org>

- [ ] **Primary Email**
  - Email: curvaturebodysculpting@gmail.com
  - Used for: All service accounts

### Domain & DNS
- [ ] **Primary Domain**
  - Domain: elevateforhumanity.org
  - Registrar: _____________
  - DNS: _____________

- [ ] **Selfish Inc Domain**
  - Domain: selfishincsupport.org
  - Registrar: _____________

- [ ] **Curvature Domain**
  - Domain: curvaturebodysculpting.store
  - Registrar: _____________

### Social Media
- [ ] **Facebook**
  - Page: facebook.com/profile.php?id=61571046346179
  - Access: _____________

- [ ] **LinkedIn**
  - Page: linkedin.com/in/elevate-for-humanity-b5a2b3339/
  - Access: _____________

- [ ] **Twitter/X**
  - Handle: @Elevate4Humani1
  - Access: _____________

### Government Portals
- [ ] **Indiana Bidder Portal**
  - Bidder ID: 0000067741
  - Login: _____________

- [ ] **VA Training Portal**
  - Facility Code: 11111111
  - Login: _____________

### Partnership Accounts
- [ ] **NRF Foundation RISE Up**
  - Platform: riseup.kaleidolearning.com
  - Email: curvaturebodysculpting@gmail.com
  - Contact: Jessica Viera (202-626-8113)

- [ ] **ByBlack Certification**
  - Organization: SELFISH INC
  - Database: byblack.us

---

## 🔑 Environment Variables

### Production (Vercel)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site URLs
NEXT_PUBLIC_APP_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# Email
EMAIL_FROM=Elevate for Humanity <noreply@elevateforhumanity.org>
RESEND_API_KEY=re_gBrK59nn_CAeQ8tyU7pihrvj6Y3Q3T8kJ

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51RvqjzIRNf5vPH3A...
STRIPE_SECRET_KEY=sk_live_51RvqjzIRNf5vPH3A...

# Zapier (if used)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_KEY

# OpenAI (if used)
openapikey=sk-proj-1hLoeQtTqS0t-qdu1-G9L
```

### Local Development (.env.local)
Same as production - copy from Vercel or use `vercel env pull`

---

## 📋 Important IDs & Numbers

### Organization
- **EIN**: 99-3483511
- **Legal Name**: SELFISH INC
- **DBA**: Elevate for Humanity

### Government
- **Indiana Bidder ID**: 0000067741
- **VA Facility Code**: 11111111
- **Google Charity ID**: 99-3483511

### Technical
- **Vercel Project**: fix2-gpql
- **Vercel Team**: team_Ae8f33vVYR36quLOS8HCeROs
- **Supabase Project**: cuxzzpsyufcewtmicszk
- **GitHub Repo**: elevateforhumanity/fix2

---

## 🔒 Security Best Practices

### Password Management
- [ ] Use strong, unique passwords for each service
- [ ] Enable 2FA on all accounts that support it
- [ ] Store passwords in secure password manager
- [ ] Never share passwords via email or text

### API Keys
- [ ] Keep all API keys in environment variables
- [ ] Never commit keys to GitHub
- [ ] Rotate keys if compromised
- [ ] Use different keys for dev/production

### Access Control
- [ ] Limit who has admin access
- [ ] Use role-based permissions
- [ ] Review access quarterly
- [ ] Remove access for departed staff immediately

---

## 📞 Emergency Contacts

### If Website Goes Down
1. Check Vercel status: vercel.com/status
2. Check Supabase status: status.supabase.com
3. Review recent deployments in Vercel
4. Check GitHub for recent commits

### If Google Ads Suspended
1. Review suspension email for reason
2. Check Ad Grants policies: support.google.com/grants
3. Fix policy violations immediately
4. Submit appeal through Google Ads interface

### If Database Issues
1. Check Supabase dashboard for errors
2. Verify environment variables in Vercel
3. Check database connection limits
4. Review recent database migrations

---

## ✅ Setup Verification

### Test These After Setup
- [ ] Homepage loads: elevateforhumanity.org
- [ ] Application form submits: /apply
- [ ] Data saves to Supabase
- [ ] Google Ads campaigns running
- [ ] Email notifications working
- [ ] Donation link works
- [ ] All navigation links work
- [ ] Mobile responsive
- [ ] SSL certificate valid
- [ ] Social media links correct

---

## 📝 Notes Section

Use this space to add any additional credentials or notes:

```
_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________

_____________________________________________
```

---

**⚠️ IMPORTANT**: Keep this document secure and private. Never share publicly or commit to GitHub.

**Last Updated**: November 27, 2024
**Next Review**: Monthly
