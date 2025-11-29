# Partner LMS Integration - Quick Reference Card

## 🚀 5-Minute Deployment

### 1. Run Migrations (Supabase SQL Editor)
```
Run these 9 files in order:
1. 20241129_partner_lms_integration.sql
2. 20241129_seed_partner_credentials.sql
3. 20241129_all_certiport_programs.sql
4. 20241129_certiport_accurate_pricing.sql
5. 20241129_add_hsi_certifications.sql
6. 20241129_add_jri_integration.sql
7. 20241129_add_nrf_rise_up.sql
8. 20241129_add_certiport_certifications.sql
9. 20241129_add_milady_rise_courses.sql
```

### 2. Add Environment Variables (Vercel)
```bash
SENDGRID_API_KEY=your_key  # OR RESEND_API_KEY
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 3. Access Dashboard
```
URL: /admin/partners/lms-integrations
```

---

## 📚 Partner Quick Reference

| Partner | Type | Price | Promo Code | URL |
|---------|------|-------|------------|-----|
| **Certiport** | Microsoft Office | $150/exam | - | certiport.com |
| **HSI** | CPR/First Aid | $75-$150 | - | hsi.com |
| **JRI** | Janitorial | Free | - | jri.org |
| **NRF RISE Up** | Retail | Free | - | nrf.com/riseup |
| **CareerSafe** | OSHA Safety | $25-$150 | - | careersafeonline.com |
| **Milady RISE** | Cosmetology | $29.95-$599.99 | efhcti-rise295 | miladytraining.com |

---

## 🎓 Milady RISE Courses

1. **Client Well-Being & Safety** - 3.5 hrs - $29.95
2. **Finance Fundamentals** - 4 hrs - $99.95
3. **RISE Educator Program** - 6 months - $599.99

**Promo Code:** efhcti-rise295
**Support:** 866-848-5143

---

## 🔄 Enrollment Workflow

1. Go to `/admin/partners/lms-integrations`
2. Click "Enroll Student" on partner card
3. Select student from dropdown
4. Select course (if applicable)
5. Check "Send Welcome Email"
6. Submit

**Done!** Student receives welcome email with access instructions.

---

## 💰 Payment Flow (HSI, CareerSafe, Milady)

1. Enroll student
2. System creates Stripe checkout
3. Student completes payment
4. Enrollment automatically activated
5. Welcome email sent

---

## 📧 Email Templates

- **Welcome** - Sent on enrollment
- **Completion** - Sent on course completion
- **Milestone** - Sent at 25%, 50%, 75% progress

---

## 🎯 Common Tasks

### Enroll Student
```
/admin/partners/lms-integrations → Enroll Student
```

### View Enrollments
```
/admin/partners/lms-integrations → Click partner name
```

### Generate Certificate
```
Automatic when enrollment status = "completed"
```

### Check Payment Status
```
/admin/partners/lms-integrations/[id] → View enrollment
```

---

## 📞 Support Contacts

| Partner | Phone | Support URL |
|---------|-------|-------------|
| Certiport | - | certiport.com/contact |
| HSI | - | hsi.com/contact |
| JRI | - | jri.org/contact |
| NRF | - | nrf.com/riseup |
| CareerSafe | - | careersafeonline.com/contact |
| Milady | 866-848-5143 | milady.com/support |

---

## 🐛 Troubleshooting

### Email Not Sent
1. Check `email_queue` table
2. Verify SendGrid/Resend API key
3. Check spam folder

### Payment Failed
1. Check Stripe dashboard
2. Verify webhook configured
3. Test with Stripe test cards

### Enrollment Error
1. Check Supabase logs
2. Verify student/provider IDs exist
3. Check database connection

---

## 📊 Database Tables

- `partner_lms_providers` - Partner configuration
- `partner_lms_enrollments` - Student enrollments
- `partner_lms_courses` - Course catalog
- `partner_certificates` - Completion certificates
- `email_queue` - Email notifications
- `payment_logs` - Payment tracking

---

## 🎯 Status: READY ✅

**All 6 partners integrated and ready to use!**

Deploy → Enroll → Track → Certify

---

**Need Help?** See `PARTNER_LMS_INTEGRATION_COMPLETE.md`
