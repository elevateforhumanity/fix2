# API Credential Setup Checklist

## Overview

This checklist guides you through obtaining and configuring API credentials for all 7 partner integrations. Complete this to enable automatic progress sync and reduce manual admin work.

---

## Priority Order

Based on revenue potential and ease of integration:

1. **Certiport** - $10K/month, high demand
2. **CareerSafe** - $8K/month, existing relationship
3. **HSI** - $5K/month, existing relationship
4. **Milady RISE** - $4K/month, currently link-only
5. **NRF RISE Up** - $3K/month, free courses
6. **NDS** - $3K/month, compliance required
7. **JRI** - $2K/month, free courses

---

## 1. Certiport (Pearson VUE)

### Status: ⏳ Pending

### Contact Information
- **Website:** https://certiport.com
- **Sales:** Contact form at certiport.com/contact
- **Phone:** Check website for regional numbers

### What to Request
- [ ] API documentation
- [ ] API credentials (key + secret)
- [ ] Organization ID
- [ ] Webhook configuration details
- [ ] Exam voucher generation API access
- [ ] Practice test API access

### Information to Provide
- Organization name: Elevate for Humanity
- Website: elevateforhumanity.org
- Use case: Student enrollment and progress tracking
- Expected volume: 50-100 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/certiport

### Environment Variables Needed
```bash
CERTIPORT_API_BASE_URL=
CERTIPORT_API_KEY=
CERTIPORT_API_SECRET=
CERTIPORT_ORGANIZATION_ID=
```

### Testing Steps
1. Create test student account
2. Generate exam voucher
3. Enroll in practice test
4. Check progress sync
5. Verify certificate retrieval

### Notes
- OAuth 2.0 authentication likely
- May require separate sandbox environment
- Voucher costs need to be tracked

---

## 2. CareerSafe

### Status: ⏳ Pending

### Contact Information
- **Primary:** Mark Sattele
- **Email:** Mark.Sattele@careersafeonline.com
- **Phone:** (216) 926-6536
- **Secondary:** Hollie Dove - Hollie.Dove@careersafeonline.com - (260) 466-3145

### What to Request
- [ ] API documentation
- [ ] API credentials (key + secret)
- [ ] Organization code (we have: SA321IC)
- [ ] Webhook configuration
- [ ] Progress tracking API
- [ ] Certificate retrieval API

### Information to Provide
- Organization: Elevate for Humanity Training Center
- Existing account: elizabethpowell6262@gmail.com
- Group code: SA321IC
- Use case: Automated enrollment and progress tracking
- Webhook URL: https://yourdomain.com/api/webhooks/partners/careersafe

### Environment Variables Needed
```bash
CAREERSAFE_API_BASE_URL=
CAREERSAFE_API_KEY=
CAREERSAFE_API_SECRET=
CAREERSAFE_ORGANIZATION_ID=SA321IC
```

### Testing Steps
1. Create test student in existing group
2. Enroll in OSHA 10 course
3. Complete first module
4. Verify progress sync
5. Complete course and check certificate

### Notes
- Already have active account
- Existing relationship with Mark Sattele
- May have API access already available

---

## 3. HSI (Health & Safety Institute)

### Status: ⏳ Pending

### Contact Information
- **Primary:** Geoff Albrecht
- **Email:** galbrecht@hsi.com
- **Phone:** (949) 456-8366
- **Website:** https://hsi.com

### What to Request
- [ ] API documentation
- [ ] API credentials
- [ ] Organization ID
- [ ] RSV enrollment API access
- [ ] Progress tracking API
- [ ] Certificate retrieval API
- [ ] Webhook configuration

### Information to Provide
- Organization: Elevate For Humanity Career Training Institute
- Existing relationship: NTS class sign-up
- Use case: Automated RSV enrollment
- Expected volume: 30-50 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/hsi

### Environment Variables Needed
```bash
HSI_API_BASE_URL=
HSI_API_KEY=
HSI_API_SECRET=
HSI_ORGANIZATION_ID=
```

### Testing Steps
1. Create test student account
2. Enroll in RSV CPR/AED course
3. Verify email from info@hsi.com
4. Check progress tracking
5. Complete skills session
6. Verify certificate retrieval

### Notes
- RSV enrollment uses credits
- Each enrollment = 1 credit consumed
- Need to track credit balance
- Certificate expires after 2 years

---

## 4. Milady RISE

### Status: ⏳ Pending (Currently Link-Only)

### Contact Information
- **Phone:** 866-848-5143
- **Website:** https://miladytraining.com
- **Promo Code:** efhcti-rise295

### What to Request
- [ ] API documentation (if available)
- [ ] API credentials
- [ ] School ID
- [ ] Enrollment API
- [ ] Progress tracking API
- [ ] Certificate retrieval API

### Information to Provide
- Organization: Elevate for Humanity
- Promo code: efhcti-rise295
- Use case: Automated enrollment for beauty/barber programs
- Expected volume: 20-30 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/milady

### Environment Variables Needed
```bash
MILADY_API_BASE_URL=
MILADY_API_KEY=
MILADY_API_SECRET=
MILADY_ORGANIZATION_ID=
```

### Testing Steps
1. Create test student account
2. Enroll in Client Well-Being course
3. Apply promo code
4. Check progress tracking
5. Complete course
6. Verify certificate

### Notes
- Currently using link-based integration
- API may not be available
- Promo code reduces cost
- Can continue with link mode if no API

---

## 5. NRF RISE Up

### Status: ⏳ Pending

### Contact Information
- **Website:** https://nrf.com/riseup
- **Contact:** Use website contact form

### What to Request
- [ ] API documentation
- [ ] Partner credentials
- [ ] Partner ID
- [ ] Enrollment API
- [ ] Progress tracking API
- [ ] Credential verification API

### Information to Provide
- Organization: Elevate for Humanity
- Use case: Retail training for workforce programs
- Expected volume: 15-25 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/nrf

### Environment Variables Needed
```bash
NRF_API_BASE_URL=
NRF_API_KEY=
NRF_API_SECRET=
NRF_ORGANIZATION_ID=
```

### Testing Steps
1. Create test learner account
2. Enroll in Retail Fundamentals
3. Complete first module
4. Check progress sync
5. Complete course
6. Verify credential

### Notes
- Free courses
- Focus on retail industry
- May have partner portal access

---

## 6. NDS (National Drug Screening)

### Status: ⏳ Pending

### Contact Information
- **Website:** https://nationaldrugscreening.com
- **Contact:** Use website contact form

### What to Request
- [ ] API documentation
- [ ] API credentials
- [ ] Client ID
- [ ] Enrollment API
- [ ] Progress tracking API
- [ ] Certificate retrieval API

### Information to Provide
- Organization: Elevate for Humanity
- Use case: Compliance training for all programs
- Expected volume: 50-75 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/nds

### Environment Variables Needed
```bash
NDS_API_BASE_URL=
NDS_API_KEY=
NDS_API_SECRET=
NDS_ORGANIZATION_ID=
```

### Testing Steps
1. Create test participant account
2. Enroll in Drug-Free Workplace course
3. Complete training
4. Check progress sync
5. Verify certificate with expiration

### Notes
- Required for most programs
- Compliance-focused
- Certificates may have expiration dates

---

## 7. JRI (Janitorial Resource Institute)

### Status: ⏳ Pending

### Contact Information
- **Website:** https://jri.org
- **Contact:** Use website contact form

### What to Request
- [ ] API documentation (if available)
- [ ] API credentials
- [ ] Organization ID
- [ ] Enrollment API
- [ ] Progress tracking API
- [ ] Certificate retrieval API

### Information to Provide
- Organization: Elevate for Humanity
- Use case: Janitorial training program
- Expected volume: 10-15 students/month
- Webhook URL: https://yourdomain.com/api/webhooks/partners/jri

### Environment Variables Needed
```bash
JRI_API_BASE_URL=
JRI_API_KEY=
JRI_ORGANIZATION_ID=
```

### Testing Steps
1. Create test user account
2. Enroll in basic janitorial course
3. Complete modules
4. Check progress sync
5. Verify certificate

### Notes
- Free courses
- May not have formal API
- Can continue with link mode if needed

---

## General Setup Process

### For Each Partner:

#### Phase 1: Initial Contact (Week 1)
- [ ] Send email using template below
- [ ] Follow up after 3 business days
- [ ] Schedule call if needed
- [ ] Document response

#### Phase 2: Credential Acquisition (Week 2)
- [ ] Receive API documentation
- [ ] Receive credentials
- [ ] Add to password manager
- [ ] Add to .env.local
- [ ] Add to Vercel environment variables

#### Phase 3: Implementation (Week 3)
- [ ] Review API documentation
- [ ] Update partner implementation file
- [ ] Adjust endpoints and request formats
- [ ] Test authentication
- [ ] Test basic operations

#### Phase 4: Testing (Week 4)
- [ ] Create test student
- [ ] Test enrollment
- [ ] Test progress sync
- [ ] Test certificate retrieval
- [ ] Test webhook delivery
- [ ] Document any issues

#### Phase 5: Production (Week 5)
- [ ] Update delivery mode to 'api' or 'hybrid'
- [ ] Enable for pilot students
- [ ] Monitor for errors
- [ ] Gather feedback
- [ ] Roll out to all students

---

## Email Template

```
Subject: API Integration Request - Elevate for Humanity

Dear [Partner Name] Team,

I am reaching out from Elevate for Humanity (elevateforhumanity.org), 
a workforce development organization providing training programs to 
underserved communities.

We currently offer your courses to our students and would like to 
integrate with your API to provide a seamless enrollment and progress 
tracking experience.

Could you please provide:

1. API documentation
2. API credentials for our organization:
   - API key
   - API secret (if applicable)
   - Organization/Client/Partner ID
3. Webhook configuration details
4. Any specific integration requirements

Our organization details:
- Organization: Elevate for Humanity
- Website: https://elevateforhumanity.org
- Contact: [Your Name]
- Email: [Your Email]
- Phone: 317-314-3757
- Expected volume: [X] students/month

We are ready to begin integration immediately upon receiving the 
necessary credentials and documentation.

Thank you for your partnership in workforce development.

Best regards,
[Your Name]
[Your Title]
Elevate for Humanity
317-314-3757
```

---

## Tracking Sheet

| Partner | Contact Sent | Response | Credentials | Testing | Production | Notes |
|---------|-------------|----------|-------------|---------|------------|-------|
| Certiport | ☐ | ☐ | ☐ | ☐ | ☐ | |
| CareerSafe | ☐ | ☐ | ☐ | ☐ | ☐ | |
| HSI | ☐ | ☐ | ☐ | ☐ | ☐ | |
| Milady RISE | ☐ | ☐ | ☐ | ☐ | ☐ | |
| NRF RISE Up | ☐ | ☐ | ☐ | ☐ | ☐ | |
| NDS | ☐ | ☐ | ☐ | ☐ | ☐ | |
| JRI | ☐ | ☐ | ☐ | ☐ | ☐ | |

---

## Security Best Practices

### Credential Storage
- [ ] Use password manager (1Password, LastPass, etc.)
- [ ] Never commit credentials to git
- [ ] Use environment variables only
- [ ] Rotate credentials periodically
- [ ] Document credential locations

### Access Control
- [ ] Limit who has access to credentials
- [ ] Use service role key for admin operations
- [ ] Implement IP whitelisting if available
- [ ] Monitor API usage for anomalies
- [ ] Set up alerts for failed auth attempts

### Backup
- [ ] Keep backup of all credentials
- [ ] Document recovery procedures
- [ ] Test credential rotation process
- [ ] Have emergency contacts for each partner

---

## Success Metrics

### Track for Each Partner:
- Time to obtain credentials
- Time to complete integration
- Number of API calls per day
- Success rate of API calls
- Average response time
- Error rate
- Student satisfaction
- Admin time saved

### Goals:
- **API Response Time:** < 2 seconds
- **Success Rate:** > 99%
- **Error Rate:** < 1%
- **Admin Time Saved:** 80% reduction in manual approvals

---

## Support

### For API Integration Questions:
- Technical Lead: [Name]
- Email: tech@elevateforhumanity.org
- Phone: 317-314-3757

### For Partner Relationship Questions:
- Partnership Lead: [Name]
- Email: partnerships@elevateforhumanity.org
- Phone: 317-314-3757

---

## Summary

✅ **7 Partners** to integrate
✅ **Email templates** ready
✅ **Testing procedures** documented
✅ **Security practices** defined
✅ **Tracking system** in place

**Estimated Timeline:** 5-7 weeks for all partners (if done in parallel)

**Revenue Impact:** $35,000/month once all APIs are live

**Next Step:** Start with Certiport and CareerSafe (highest revenue + existing relationships)
