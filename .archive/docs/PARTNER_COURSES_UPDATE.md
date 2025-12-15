# 🔄 PARTNER COURSES UPDATE - CORRECTIONS

**Date**: December 14, 2024  
**Status**: PARTNER INTEGRATIONS NEED UPDATING

---

## 🚨 CORRECTION: COURSES NEED PARTNER CONNECTIONS

You're correct! Several courses should be connected to partners but are currently self-hosted.

---

## ✅ CURRENTLY CONNECTED (5 courses)

### 1. Barber Apprenticeship → Milady RISE ✅

### 2. Professional Esthetician → Milady RISE ✅

### 3. Emergency Health & Safety Tech → HSI ✅

### 4. CPR Certification → HSI ✅

### 5. Workforce Readiness → NRF/JRI ✅

---

## 🔧 NEED TO CONNECT TO PARTNERS

### 6. ❌ HVAC Technician → Should connect to CareerSafe

**Current Status**: Self-hosted  
**Should Be**: CareerSafe OSHA integration  
**Partner**: CareerSafe (https://careersafeonline.com)  
**Courses Available**:

- OSHA 10-Hour Construction
- OSHA 30-Hour Construction
- OSHA 10-Hour General Industry
- OSHA 30-Hour General Industry
- EPA 608 Certification (HVAC specific)

**API Status**: ✅ Integration code exists in `lib/partners/careersafe.ts`  
**Action Needed**: Connect HVAC program to CareerSafe API

---

### 7. ❌ CDL Training → Should connect to NDS

**Current Status**: Self-hosted  
**Should Be**: National Drug Screening integration  
**Partner**: National Drug Screening (www.MyDrugTestTraining.com)  
**Contact**: Tom Fulmer <tom@nationaldrugscreening.com>  
**Phone**: 321-622-2040

**Courses Available**:

- DOT Drug & Alcohol Testing
- FMCSA Regulations
- CDL Pre-Trip Inspection
- Hours of Service Training
- DOT Reasonable Suspicion Training
- DOT Supervisor Training

**API Status**: ✅ Integration code exists in `lib/partners/nds.ts`  
**Action Needed**:

1. Purchase training programs from MyDrugTestTraining.com
2. Get API credentials from Tom Fulmer
3. Connect CDL program to NDS API

---

### 8. ❌ Building Maintenance → Should connect to CareerSafe

**Current Status**: Self-hosted  
**Should Be**: CareerSafe OSHA integration  
**Partner**: CareerSafe  
**Courses**: OSHA 10/30, Safety certifications  
**Action Needed**: Connect to CareerSafe API

---

### 9. ❌ Home Health Aide → Could connect to CareerSafe

**Current Status**: Self-hosted  
**Could Add**: CareerSafe safety training  
**Partner**: CareerSafe  
**Courses**: Healthcare safety, infection control  
**Action Needed**: Optional - add CareerSafe safety module

---

## 📋 PARTNER INTEGRATION CHECKLIST

### CareerSafe Integration (HVAC, Building Maintenance)

**API File**: `lib/partners/careersafe.ts` ✅ EXISTS

**What's Needed**:

1. ✅ API integration code (already written)
2. ❌ CareerSafe account credentials
3. ❌ Organization ID
4. ❌ API key and secret
5. ❌ Update HVAC program to use CareerSafe
6. ❌ Update Building Maintenance to use CareerSafe
7. ❌ Test enrollment workflow
8. ❌ Test certificate retrieval

**Environment Variables Needed**:

```env
CAREERSAFE_API_BASE_URL=https://api.careersafeonline.com
CAREERSAFE_API_KEY=your_api_key
CAREERSAFE_API_SECRET=your_api_secret
CAREERSAFE_ORGANIZATION_ID=your_org_id
```

---

### NDS Integration (CDL Training)

**API File**: `lib/partners/nds.ts` ✅ EXISTS

**What's Needed**:

1. ✅ API integration code (already written)
2. ❌ Purchase training programs from MyDrugTestTraining.com
3. ❌ Get API credentials from Tom Fulmer
4. ❌ NDS Organization ID
5. ❌ API key and secret
6. ❌ Update CDL program to use NDS
7. ❌ Test enrollment workflow
8. ❌ Test certificate retrieval

**Environment Variables Needed**:

```env
NDS_API_BASE_URL=https://api.mydrugtest training.com
NDS_API_KEY=your_api_key
NDS_API_SECRET=your_api_secret
NDS_ORGANIZATION_ID=your_org_id
```

**Contact for Setup**:

- **Name**: Tom Fulmer
- **Title**: VP Business Development
- **Email**: tom@nationaldrugscreening.com
- **Phone**: 321-622-2040
- **Company**: National Drug Screening, Inc
- **Address**: 129 W Hibiscus Blvd Ste H, Melbourne, FL 32901
- **Website**: www.Nationaldrugscreening.com
- **Training Portal**: www.MyDrugTestTraining.com

---

## 🎯 ACTION PLAN

### Phase 1: CareerSafe Integration (HVAC + Building Maintenance)

**Step 1**: Contact CareerSafe

- Request API access
- Get organization credentials
- Purchase course licenses

**Step 2**: Configure Environment

- Add CareerSafe credentials to Vercel
- Test API connection

**Step 3**: Update Programs

- Modify HVAC program data to include CareerSafe
- Modify Building Maintenance program data
- Update enrollment workflows

**Step 4**: Test Integration

- Test student enrollment
- Test SSO launch
- Test certificate retrieval
- Test progress tracking

---

### Phase 2: NDS Integration (CDL Training)

**Step 1**: Contact Tom Fulmer

- Email: tom@nationaldrugscreening.com
- Request: API access for CDL training integration
- Purchase: Training programs for your students

**Step 2**: Get Credentials

- API base URL
- API key
- API secret
- Organization ID

**Step 3**: Configure Environment

- Add NDS credentials to Vercel
- Test API connection

**Step 4**: Update CDL Program

- Modify CDL program data to include NDS
- Update enrollment workflows
- Add DOT training modules

**Step 5**: Test Integration

- Test student enrollment
- Test course access
- Test certificate retrieval
- Test DOT compliance tracking

---

## 📊 UPDATED PARTNER SUMMARY

### After Connecting All Partners:

**Partner-Connected Courses**: 9 (56%)

1. ✅ Barber Apprenticeship → Milady
2. ✅ Professional Esthetician → Milady
3. ✅ Emergency Health & Safety → HSI
4. ✅ CPR Certification → HSI
5. ✅ Workforce Readiness → NRF/JRI
6. 🔄 HVAC Technician → CareerSafe (NEEDS CONNECTION)
7. 🔄 CDL Training → NDS (NEEDS CONNECTION)
8. 🔄 Building Maintenance → CareerSafe (NEEDS CONNECTION)
9. ⚠️ Home Health Aide → CareerSafe (OPTIONAL)

**Self-Hosted Courses**: 7 (44%)

- CNA
- Building Technician Advanced
- Direct Support Professional
- Beauty Career Educator
- Business Startup & Marketing
- Peer Recovery Coach
- Tax Prep & Financial Services

---

## 💰 COST ESTIMATE

### CareerSafe (HVAC + Building Maintenance)

- **Setup Fee**: ~$500-1,000 (one-time)
- **Per Student**: ~$25-50 per course
- **Annual License**: ~$2,000-5,000

### NDS (CDL Training)

- **Setup Fee**: Contact Tom Fulmer
- **Per Student**: ~$50-100 per training program
- **Annual License**: Contact Tom Fulmer

**Total Estimated**: $3,000-7,000 setup + per-student fees

---

## 🎯 IMMEDIATE NEXT STEPS

### 1. Contact CareerSafe (This Week)

- Request API documentation
- Get pricing for HVAC + Building Maintenance
- Request demo/trial access

### 2. Contact Tom Fulmer at NDS (This Week)

**Email Template**:

```
Subject: API Integration for CDL Training Programs

Hi Tom,

We spoke previously about integrating National Drug Screening's training
programs into our workforce development platform (Elevate for Humanity).

We're ready to move forward with:
1. Purchasing training programs from MyDrugTestTraining.com
2. API integration for automated student enrollment
3. Certificate retrieval and DOT compliance tracking

Could you provide:
- API documentation
- Pricing for our student volume
- Organization credentials for integration
- Timeline for setup

Our platform serves CDL students in Indiana and we're looking to add
your DOT training as a required component.

Best regards,
[Your Name]
Elevate for Humanity
```

### 3. Update Documentation (After Credentials Received)

- Add partner credentials to Vercel environment variables
- Update program data files
- Test integrations
- Update student enrollment workflows

---

## ✅ BENEFITS OF CONNECTING THESE PARTNERS

### CareerSafe (HVAC + Building Maintenance)

- ✅ OSHA-certified training
- ✅ Nationally recognized certificates
- ✅ Employer-preferred credentials
- ✅ Automated certificate delivery
- ✅ Progress tracking
- ✅ Compliance reporting

### NDS (CDL Training)

- ✅ DOT-compliant training
- ✅ Required for CDL licensing
- ✅ Drug & alcohol testing education
- ✅ FMCSA regulations training
- ✅ Employer-required certifications
- ✅ Automated compliance tracking

---

## 📈 EXPECTED OUTCOMES

### After Full Integration:

- **9 partner-connected courses** (56%)
- **7 self-hosted courses** (44%)
- **100% of technical courses** have industry certifications
- **All courses** meet employer requirements
- **Automated workflows** for all partner courses
- **Better student outcomes** with recognized credentials

---

## 🚀 FINAL RECOMMENDATION

**Priority**: HIGH  
**Timeline**: 2-4 weeks  
**Cost**: $3,000-7,000 + per-student fees  
**ROI**: Significantly improved student outcomes and employer satisfaction

**Action Required**:

1. Contact CareerSafe today
2. Email Tom Fulmer at NDS today
3. Get API credentials within 1 week
4. Complete integration within 2 weeks
5. Test with pilot students
6. Full rollout

**Your platform will be even more powerful with these integrations!** 🚀

---

**Report Generated**: December 14, 2024  
**Status**: ACTION REQUIRED  
**Priority**: HIGH  
**Timeline**: 2-4 weeks
