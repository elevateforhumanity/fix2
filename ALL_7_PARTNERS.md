# ✅ All 7 Partner Webhooks - Complete List

## Partner Endpoints

| # | Partner | Endpoint URL |
|---|---------|-------------|
| 1 | **HSI** | `https://www.elevateforhumanity.org/api/webhooks/partners/hsi` |
| 2 | **Certiport** | `https://www.elevateforhumanity.org/api/webhooks/partners/certiport` |
| 3 | **CareerSafe** | `https://www.elevateforhumanity.org/api/webhooks/partners/careersafe` |
| 4 | **JRI** | `https://www.elevateforhumanity.org/api/webhooks/partners/jri` |
| 5 | **Milady** | `https://www.elevateforhumanity.org/api/webhooks/partners/milady` |
| 6 | **NRF** | `https://www.elevateforhumanity.org/api/webhooks/partners/nrf` |
| 7 | **NDS** | `https://www.elevateforhumanity.org/api/webhooks/partners/nds` |

---

## Partner Details

### 1. HSI (Health & Safety Institute)
- **Focus:** Safety training, CPR, First Aid
- **Programs:** Healthcare, Emergency Medical
- **Events:** course.completed, certificate.issued

### 2. Certiport
- **Focus:** IT certifications, Microsoft Office
- **Programs:** IT Support, Cybersecurity, Data Analytics, Business/Admin
- **Events:** exam.completed, certification.issued

### 3. CareerSafe (OSHA)
- **Focus:** OSHA safety training
- **Programs:** Technical/Trade, Manufacturing, Construction
- **Events:** training.completed, certificate.issued

### 4. JRI (Job Readiness Initiative)
- **Focus:** Soft skills, job readiness
- **Programs:** Business, Recovery/Support, CDL, Specialized
- **Events:** module.completed, program.completed

### 5. Milady RISE
- **Focus:** Cosmetology, beauty industry
- **Programs:** Barber, Esthetician, Nail Tech
- **Events:** course.completed, assessment.passed

### 6. NRF (National Retail Federation)
- **Focus:** Retail industry training
- **Programs:** NRF Rise Up Program, Customer Service
- **Events:** course.completed, module.completed

### 7. NDS (National Dental Solutions)
- **Focus:** Dental assistant training
- **Programs:** Dental Assistant
- **Events:** training.completed, certification.issued

---

## Configuration Summary

### Webhook Secret (Same for All)
```
PGd3vzck5RBRP+SIv6t4+LSpsGIkcra9ZaKCy8hCvRU=
```

### Time Estimate
- **Per Partner:** ~30 minutes
- **Total for 7 Partners:** ~3.5 hours

### Configuration Steps (Each Partner)
1. Login to partner portal
2. Navigate to Webhooks/Integrations
3. Add webhook URL
4. Add webhook secret
5. Enable events (course.completed, certificate.issued, etc.)
6. Save and test

---

## Testing All 7 Partners

Run the test script:
```bash
cd /workspaces/fix2
./test-webhooks.sh
```

Expected output:
```
Testing Webhook Endpoints...
==============================

1. Testing HSI...
{"success":true}
HTTP Status: 200

2. Testing Certiport...
{"success":true}
HTTP Status: 200

3. Testing CareerSafe...
{"success":true}
HTTP Status: 200

4. Testing JRI...
{"success":true}
HTTP Status: 200

5. Testing Milady...
{"success":true}
HTTP Status: 200

6. Testing NRF...
{"success":true}
HTTP Status: 200

7. Testing NDS...
{"success":true}
HTTP Status: 200

==============================
Testing Complete!
```

---

## Program Distribution

### Programs Using Each Partner

**HSI (9 programs):**
- Medical Assistant
- CNA (2 instances)
- Dental Assistant
- Pharmacy Technician
- Phlebotomy Technician
- Emergency Medical Technician
- Community Healthcare Worker
- CPR & First Aid
- Emergency Health & Safety

**Certiport (28 programs):**
- All Healthcare programs (with HSI)
- All Technical/Trade programs (with CareerSafe)
- All Business/Admin programs (with JRI)
- All IT/Tech programs (standalone)

**CareerSafe (8 programs):**
- HVAC Technician (3 instances)
- Automotive Technician
- Diesel Mechanic
- Manufacturing Technician
- Building Maintenance
- Forklift Operator
- Solar Panel Installation

**JRI (32 programs):**
- All Beauty/Cosmetology programs (with Milady)
- All Business/Admin programs (with Certiport)
- All Recovery/Support programs (standalone)
- CDL Training (2 instances)
- Specialized programs (Life Coach, Real Estate, etc.)

**Milady (9 programs):**
- Barber Apprenticeship (4 instances)
- Esthetician programs (3 instances)
- Nail Technician (2 instances)

**NRF (1 program):**
- NRF Rise Up Program

**NDS (0 programs currently):**
- Ready for Dental Assistant programs

---

## Documentation

- **[WEBHOOK_CONFIGURATION.md](./WEBHOOK_CONFIGURATION.md)** - Complete setup guide for all 7 partners
- **[PARTNER_WEBHOOK_CONFIG.txt](./PARTNER_WEBHOOK_CONFIG.txt)** - Quick reference
- **[WEBHOOK_QUICK_REFERENCE.txt](./WEBHOOK_QUICK_REFERENCE.txt)** - Copy-paste commands
- **[test-webhooks.sh](./test-webhooks.sh)** - Automated testing script

---

## Status

- ✅ All 7 partner endpoints configured
- ✅ Webhook secret generated and added to Vercel
- ✅ Webhook handler fixed and deployed
- ✅ Test script updated for all 7 partners
- ✅ Documentation complete for all 7 partners
- ⏳ Partner portal configuration pending (~3.5 hours)

---

**Total Partners:** 7  
**Total Endpoints:** 7  
**Total Programs:** 49  
**Configuration Time:** ~3.5 hours  
**Status:** Ready for partner configuration
