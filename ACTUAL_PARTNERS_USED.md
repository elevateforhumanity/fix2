# ✅ Actual Partners Used - 5 Partners

## Partners Actually Configured in Programs

Based on the program configuration in `CONFIGURE_ALL_PROGRAMS.sql`, we are using **5 partners**:

| # | Partner | Provider Type | Programs Using |
|---|---------|---------------|----------------|
| 1 | **HSI** (Health & Safety Institute) | `hsi` | 9 programs |
| 2 | **Certiport** | `certiport` | 28 programs |
| 3 | **CareerSafe (OSHA)** | `careersafe` | 8 programs |
| 4 | **JRI** (Job Readiness Initiative) | `jri` | 32 programs |
| 5 | **Milady RISE** | `milady` | 9 programs |

**Total:** 5 active partners, 49 programs configured

---

## Partners Available But Not Used

These partners exist in the codebase but are **not configured** in any programs:

| Partner | Provider Type | Status |
|---------|---------------|--------|
| **NRF** (National Retail Federation) | `nrf` | ⚠️ Code exists, not used |
| **NDS** (National Drug Screening) | `nds` | ⚠️ Code exists, not used |

---

## Webhook Endpoints (5 Active)

### Production URLs

| Partner | Endpoint URL |
|---------|-------------|
| **HSI** | `https://www.elevateforhumanity.org/api/webhooks/partners/hsi` |
| **Certiport** | `https://www.elevateforhumanity.org/api/webhooks/partners/certiport` |
| **CareerSafe** | `https://www.elevateforhumanity.org/api/webhooks/partners/careersafe` |
| **JRI** | `https://www.elevateforhumanity.org/api/webhooks/partners/jri` |
| **Milady** | `https://www.elevateforhumanity.org/api/webhooks/partners/milady` |

### Optional (If Needed Later)

| Partner | Endpoint URL | Status |
|---------|-------------|--------|
| **NRF** | `https://www.elevateforhumanity.org/api/webhooks/partners/nrf` | Ready but unused |
| **NDS** | `https://www.elevateforhumanity.org/api/webhooks/partners/nds` | Ready but unused |

---

## Configuration Time

### For 5 Active Partners
- **Per Partner:** 30 minutes
- **Total:** **2.5 hours**

### If Adding NRF/NDS Later
- **Additional Time:** 1 hour (30 min each)
- **New Total:** 3.5 hours

---

## Program Distribution

### HSI (9 programs)
- Medical Assistant
- Certified Nursing Assistant (2 instances)
- Dental Assistant
- Pharmacy Technician
- Phlebotomy Technician
- Emergency Medical Technician
- Community Healthcare Worker
- CPR & First Aid
- Emergency Health & Safety

### Certiport (28 programs)
Used in combination with other partners:
- With HSI: Healthcare programs
- With CareerSafe: Technical/Trade programs
- With JRI: Business/Admin programs
- Standalone: IT/Tech programs (4)

### CareerSafe (8 programs)
- HVAC Technician (3 instances)
- Automotive Technician
- Diesel Mechanic
- Manufacturing Technician
- Building Maintenance Technician
- Forklift Operator
- Solar Panel Installation

### JRI (32 programs)
- With Milady: Beauty/Cosmetology (9 programs)
- With Certiport: Business/Admin (5 programs)
- Standalone: Recovery/Support, CDL, Specialized (18 programs)

### Milady (9 programs)
- Barber Apprenticeship (4 instances)
- Esthetician programs (3 instances)
- Nail Technician (2 instances)

---

## NRF Rise Up Program

The "NRF Rise Up Program" exists in the program list but is **not configured** with any partner yet.

**To add NRF partner:**
1. Find NRF provider ID in database
2. Add to `program_partner_lms`:
   ```sql
   INSERT INTO program_partner_lms (program_id, provider_id, is_required, sequence_order)
   VALUES ('95d799d9-7606-4d77-9237-e96b5e86c1eb', '<nrf-provider-id>', true, 1);
   ```
3. Configure NRF webhook in partner portal
4. Test webhook endpoint

---

## Recommendation

### For Immediate Launch
**Configure only the 5 active partners:**
1. HSI
2. Certiport
3. CareerSafe
4. JRI
5. Milady

**Time:** 2.5 hours

### For Future Enhancement
**Add NRF and NDS when needed:**
- NRF: When NRF Rise Up Program is ready
- NDS: When Dental programs are added

**Additional Time:** 1 hour

---

## Testing

### Test 5 Active Partners
```bash
cd /workspaces/fix2
./test-webhooks.sh
```

This will test all 7 endpoints (including NRF/NDS), but only 5 are actively used in programs.

---

## Summary

- ✅ **5 partners actively used** in 49 programs
- ✅ **2 partners available** but not configured (NRF, NDS)
- ✅ **All 7 webhook endpoints** ready (future-proof)
- ✅ **Configuration time:** 2.5 hours for active partners
- ✅ **Status:** Ready for 5-partner configuration

---

**Focus on configuring the 5 active partners first: HSI, Certiport, CareerSafe, JRI, Milady**
