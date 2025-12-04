# Partner Contact Information

Quick reference for contacting each partner to obtain API credentials and documentation.

---

## 1. HSI (Health & Safety Institute)

**Services:** CPR, AED, First Aid, Emergency Medical Responder Training

**Primary Contact:**
- Name: Geoff Albrecht
- Email: galbrecht@hsi.com
- Phone: (949) 456-8366

**Website:** https://hsi.com

**What to Request:**
- API documentation
- API credentials (API key, API secret, Organization ID)
- Webhook configuration details
- RSV (Remote Skills Verification) enrollment process
- Certificate expiration policies

**Revenue Potential:** ~$5,000/month

---

## 2. Certiport (Pearson VUE)

**Services:** Microsoft Office Specialist, IT Specialist, Entrepreneurship Certifications

**Contact:**
- Sales Team
- Website: https://certiport.com
- Contact Form: https://certiport.com/contact

**What to Request:**
- API documentation
- API credentials (API key, API secret, Organization ID)
- Webhook configuration details
- Exam voucher generation process
- Practice test access
- OAuth 2.0 configuration

**Revenue Potential:** ~$10,000/month

---

## 3. CareerSafe

**Services:** OSHA 10, OSHA 30, Safety Training

**Primary Contact:**
- Name: Mark Sattele
- Title: Postsecondary Account Executive
- Email: Mark.Sattele@careersafeonline.com
- Phone: (216) 926-6536

**Secondary Contact:**
- Name: Hollie Dove
- Title: Account Executive (IL, IN, OH)
- Email: Hollie.Dove@careersafeonline.com
- Phone: (260) 466-3145

**Customer Care:**
- Phone: (888) 614-7233
- Website: https://www.careersafeonline.com/support

**Organization Details:**
- Organization Name: Elevate for Humanity Training Center
- Group Code: SA321IC
- Admin Email: elizabethpowell6262@gmail.com

**What to Request:**
- API documentation
- API credentials (API key, API secret, Organization Code)
- Webhook configuration details
- Group enrollment process
- Certificate card number format

**Revenue Potential:** ~$8,000/month

---

## 4. Milady RISE

**Services:** Cosmetology, Barbering, Beauty Industry Training

**Contact:**
- Phone: 866-848-5143
- Website: https://miladytraining.com

**Promo Code:** efhcti-rise295

**What to Request:**
- API documentation
- API credentials (API key, API secret, School ID)
- Webhook configuration details
- Promo code integration
- Course catalog and pricing

**Revenue Potential:** ~$4,000/month

---

## 5. JRI (Janitorial Resource Institute)

**Services:** Janitorial and Custodial Training

**Contact:**
- Website: https://jri.org
- Contact Form: https://jri.org/contact

**What to Request:**
- API documentation (if available)
- API credentials (API key, Organization ID)
- Webhook configuration details
- Free course access process
- Certificate verification process

**Revenue Potential:** ~$2,000/month

---

## 6. NRF RISE Up

**Services:** Retail Industry Skills and Education

**Contact:**
- Website: https://nrf.com/riseup
- Contact Form: https://nrf.com/contact

**What to Request:**
- API documentation
- API credentials (API key, API secret, Partner ID)
- Webhook configuration details
- Free course access process
- Credential verification process
- OAuth 2.0 configuration

**Revenue Potential:** ~$3,000/month

---

## 7. NDS (National Drug Screening)

**Services:** Drug-Free Workplace Training, DOT/CDL Drug & Alcohol Awareness

**Contact:**
- Website: https://nationaldrugscreening.com
- Contact Form: https://nationaldrugscreening.com/contact

**What to Request:**
- API documentation
- API credentials (API key, API secret, Client ID)
- Webhook configuration details
- DOT compliance course details
- Certificate expiration policies

**Revenue Potential:** ~$3,000/month

---

## Email Template

Use this template when contacting partners:

```
Subject: API Integration Request - Elevate for Humanity

Dear [Partner Name] Team,

I am reaching out from Elevate for Humanity (elevateforhumanity.org), 
a workforce development organization that provides training programs 
to underserved communities.

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
- Phone: [Your Phone]

We are ready to begin integration immediately upon receiving the 
necessary credentials and documentation.

Thank you for your partnership in workforce development.

Best regards,
[Your Name]
[Your Title]
Elevate for Humanity
```

---

## Webhook URLs to Provide

When partners ask for webhook endpoints, provide:

```
HSI:        https://yourdomain.com/api/webhooks/partners/hsi
Certiport:  https://yourdomain.com/api/webhooks/partners/certiport
CareerSafe: https://yourdomain.com/api/webhooks/partners/careersafe
Milady:     https://yourdomain.com/api/webhooks/partners/milady
JRI:        https://yourdomain.com/api/webhooks/partners/jri
NRF:        https://yourdomain.com/api/webhooks/partners/nrf
NDS:        https://yourdomain.com/api/webhooks/partners/nds
```

**Webhook Events Needed:**
- enrollment.created
- progress.updated
- course.completed
- certificate.issued

---

## Tracking Sheet

Use this to track progress with each partner:

| Partner | Contact Sent | Response Received | Credentials Received | Integration Complete | Live |
|---------|-------------|-------------------|---------------------|---------------------|------|
| HSI | ☐ | ☐ | ☐ | ☐ | ☐ |
| Certiport | ☐ | ☐ | ☐ | ☐ | ☐ |
| CareerSafe | ☐ | ☐ | ☐ | ☐ | ☐ |
| Milady RISE | ☐ | ☐ | ☐ | ☐ | ☐ |
| JRI | ☐ | ☐ | ☐ | ☐ | ☐ |
| NRF RISE Up | ☐ | ☐ | ☐ | ☐ | ☐ |
| NDS | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## Priority Order

Recommended order based on revenue potential and ease of integration:

1. **Certiport** - Highest revenue ($10K/month)
2. **CareerSafe** - High revenue ($8K/month), existing relationship
3. **HSI** - High revenue ($5K/month), existing relationship
4. **Milady RISE** - Medium revenue ($4K/month)
5. **NRF RISE Up** - Medium revenue ($3K/month), free courses
6. **NDS** - Medium revenue ($3K/month)
7. **JRI** - Lower revenue ($2K/month), free courses

---

## Notes

- **CareerSafe** and **HSI** already have existing relationships - start here
- **Certiport** has highest revenue potential - prioritize
- **JRI** and **NRF RISE Up** offer free courses - may be easier to integrate
- All partners should respond within 1-2 weeks
- Follow up if no response after 1 week

---

## Total Revenue Potential

**$35,000/month** once all 7 partners are live

**Timeline:** 2-4 weeks (if contacted in parallel)
