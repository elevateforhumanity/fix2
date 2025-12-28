# Program Partner Mapping

## Partners Integrated in LMS

### 1. HSI (Health & Safety Institute)
- **Courses:** CPR, First Aid, OSHA courses
- **Integration:** API-based enrollment
- **Config:** `lib/partners/hsi.ts`
- **Programs Using:**
  - cpr-first-aid-hsi
  - emergency-health-safety-tech (CPR component)

### 2. CareerSafe (OSHA Training)
- **Courses:** OSHA 10, OSHA 30
- **Integration:** API-based enrollment
- **Config:** `lib/partners/config.ts`
- **Programs Using:**
  - emergency-health-safety-tech (OSHA 10)
  - hvac-technician (OSHA 30)
  - beauty-career-educator (OSHA 10)
  - professional-esthetician (OSHA 10)

### 3. Milady (Beauty & Barber Education)
- **Courses:** Barber theory, Esthetician theory
- **Integration:** API-based enrollment
- **Config:** `lib/partners/milady.ts`, `lib/vendors/milady-payment.ts`
- **Programs Using:**
  - barber-apprenticeship
  - professional-esthetician

### 4. NRF (National Retail Federation)
- **Courses:** Retail fundamentals, Customer service
- **Integration:** API-based enrollment
- **Config:** `lib/partners/nrf.ts`
- **Programs Using:**
  - business-startup-marketing
  - professional-esthetician

### 5. NDS (National Drug Screening)
- **Courses:** Drug & Alcohol Specimen Collector
- **Integration:** API-based enrollment
- **Config:** `lib/partners/nds.ts`
- **Programs Using:**
  - drug-alcohol-specimen-collector

### 6. Certiport (Microsoft & IT Certifications)
- **Courses:** Microsoft Office Specialist, IT certifications
- **Integration:** API-based enrollment
- **Config:** `lib/partners/config.ts`
- **Programs Using:**
  - tax-prep-financial-services (Microsoft 365)

### 7. JRI (Job Ready Indy / EmployIndy)
- **Courses:** Rise Up Certificate, Workforce readiness
- **Integration:** API-based enrollment
- **Config:** `lib/partners/config.ts`
- **Programs Using:**
  - All programs (Rise Up Certificate component)
  - public-safety-reentry-specialist (JRI funding)
  - certified-peer-recovery-coach (JRI funding)

### 8. Choice Medical Institute
- **Courses:** Medical Assistant, Healthcare training
- **Integration:** Partner referral
- **Programs Using:**
  - medical-assistant
  - home-health-aide

---

## Program-to-Partner Mapping

### barber-apprenticeship (#10004637)
**ETPL Cost:** $4,890  
**Duration:** 15 months  
**Partners:**
- Milady (theory coursework) - $295 vendor cost
- Rise Up (workforce readiness)
- CPR provider
**Credentials:** Rise Up Certificate, Registered Barber License

### beauty-career-educator (#10004648)
**ETPL Cost:** $4,730  
**Duration:** 84 days  
**Partners:**
- Rise Up (workforce readiness)
- HSI (CPR)
- CareerSafe (OSHA 10)
**Credentials:** Rise Up Certificate, CPR, OSHA 10

### business-startup-marketing (#10004645)
**ETPL Cost:** $4,550  
**Duration:** 5 weeks  
**Partners:**
- NRF (Retail certifications)
- Rise Up (workforce readiness)
**Credentials:** Business of Retail Certified Specialist, Retail Industry Fundamentals Specialist

### cpr-first-aid-hsi (#10004674)
**ETPL Cost:** $575  
**Duration:** 1 day  
**Partners:**
- HSI (primary provider)
**Credentials:** CPR/AED/First Aid

### emergency-health-safety-tech (#10004621)
**ETPL Cost:** $4,950  
**Duration:** 4 weeks  
**Partners:**
- HSI (CPR)
- CareerSafe (OSHA 10)
- EMR training provider
**Credentials:** CPR, EMR, OSHA 10

### home-health-aide (#10004626)
**ETPL Cost:** $4,700  
**Duration:** 4 weeks  
**Partners:**
- Choice Medical Institute (clinical training)
- Rise Up (workforce readiness)
- HSI (CPR)
**Credentials:** CCHW, HHA License, CPR, Rise Up Certificate

### hvac-technician (#10004322)
**ETPL Cost:** $5,000  
**Duration:** 20 weeks  
**Partners:**
- HVAC training partner (hands-on)
- Rise Up (workforce readiness)
- HSI (CPR)
- CareerSafe (OSHA 30)
**Credentials:** Residential HVAC Cert 1 & 2, Rise Up, CPR, OSHA 30

### medical-assistant (#10004639)
**ETPL Cost:** $4,325  
**Duration:** 21 days  
**Partners:**
- Choice Medical Institute (primary provider)
- Rise Up (workforce readiness)
- HSI (CPR)
**Credentials:** CCHW, CPR, Rise Up Certificate

### professional-esthetician (#10004628)
**ETPL Cost:** $4,575  
**Duration:** 5 weeks  
**Partners:**
- Milady (theory)
- NRF (retail/customer service)
- CareerSafe (OSHA 10)
**Credentials:** Business of Retail Certified, Customer Service Certified, OSHA 10

### public-safety-reentry-specialist (#10004666)
**ETPL Cost:** $4,750  
**Duration:** 45 days  
**Partners:**
- Rise Up / JRI (workforce readiness)
- Peer recovery training provider
- Choice Medical Institute (CCHW component)
- HSI (CPR)
**Credentials:** Rise Up, CPRC, Peer Support Professional, CCHW, CPR

### tax-prep-financial-services (#10004627)
**ETPL Cost:** $4,950  
**Duration:** 10 weeks  
**Partners:**
- Rise Up (workforce readiness)
- Certiport (Microsoft 365)
- QuickBooks (Pro Advisor)
- IRS (VITA/TCE)
**Credentials:** Rise Up, Microsoft 365 Fundamentals, QuickBooks Pro Advisor

---

## Programs Pending ETPL Submission

### building-maintenance-tech
**Partners:**
- Rise Up
- CareerSafe (OSHA)
- Facilities training partner

### cdl-training
**Partners:**
- CDL training school partner
- DOT compliance training

### cna-certification
**Partners:**
- CNA training provider
- Clinical placement facility
- HSI (CPR)

### phlebotomy-technician
**Partners:**
- Phlebotomy training provider
- Clinical placement facility
- HSI (CPR)

### drug-alcohol-specimen-collector
**Partners:**
- NDS (National Drug Screening) - primary provider
- DOT compliance training

---

## Action Items for LMS Integration

1. **Update app/data/programs.ts** with partner information:
   - Add `partners: string[]` field to Program type
   - Add `etplProgramId: string` field
   - Add `vendorCost: number` field for partner fees

2. **Update lib/payment-config.ts** with all 17 programs

3. **Create partner enrollment flows** in LMS:
   - Auto-enroll in partner courses when program enrollment completes
   - Track partner course completion
   - Sync credentials back to main platform

4. **Add partner links to program pages:**
   - Display partner logos
   - Link to partner course portals
   - Show which credentials come from which partner

5. **Update course definitions** in `lib/courses/definitions.ts`:
   - Map all 17 programs to course definitions
   - Add partner information to each module
   - Link lessons to partner content URLs

6. **Sync ETPL descriptions** to program pages:
   - Use official ETPL program descriptions
   - Include exact credential names from ETPL
   - Match duration and cost from ETPL database
