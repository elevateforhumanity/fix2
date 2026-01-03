# Background Check System Options

**Last Updated:** January 1, 2026  
**Current Status:** ❌ No background check system integrated  
**Need:** Background checks for Program Holders, staff, instructors, volunteers

---

## Free/Low-Cost Background Check Options

### 1. **State Criminal Records (FREE)**

**Indiana State Police:**

- **Website:** https://www.in.gov/isp/
- **Cost:** FREE for basic name search
- **Paid:** $15-25 for official reports
- **Turnaround:** Instant to 3 business days
- **Coverage:** Indiana criminal records only

**How to Use:**

1. Visit Indiana State Police website
2. Search by name and DOB
3. Review results
4. Request official report if needed

**Limitations:**

- Indiana only (not nationwide)
- May miss out-of-state records
- Not FCRA compliant for employment
- Manual process

---

### 2. **FBI Background Checks (LOW COST)**

**FBI Identity History Summary:**

- **Website:** https://www.fbi.gov/how-we-can-help-you/more-fbi-services-and-information/identity-history-summary-checks
- **Cost:** $18 per check
- **Method:** Fingerprint-based
- **Turnaround:** 3-5 business days
- **Coverage:** Nationwide FBI database

**Process:**

1. Individual submits fingerprints
2. FBI processes check
3. Results mailed to individual
4. Individual provides to employer

**Limitations:**

- Individual must initiate
- Results go to individual, not employer
- Not real-time
- Requires fingerprinting

---

### 3. **County Court Records (FREE to LOW COST)**

**Marion County (Indianapolis):**

- **Website:** https://www.indy.gov/agency/marion-county-clerk
- **Cost:** FREE online search, $1-5 per document
- **Coverage:** Marion County only
- **Turnaround:** Instant

**How to Use:**

1. Visit county clerk website
2. Search by name
3. Review court records
4. Download documents if needed

**Limitations:**

- County-by-county (not comprehensive)
- Time-consuming for multiple counties
- May miss records in other counties

---

### 4. **National Sex Offender Registry (FREE)**

**Dru Sjodin National Sex Offender Public Website:**

- **Website:** https://www.nsopw.gov/
- **Cost:** FREE
- **Coverage:** All 50 states
- **Turnaround:** Instant

**How to Use:**

1. Visit NSOPW website
2. Search by name and location
3. Review results
4. Document findings

**Use Case:**

- Required for positions working with children
- Required for educational programs
- Supplement to other checks

---

## Affordable Paid Services

### 5. **Checkr (RECOMMENDED)**

**Website:** https://checkr.com  
**Cost:** $35-50 per check  
**Features:**

- FCRA compliant
- Nationwide criminal search
- County court records
- Sex offender registry
- SSN verification
- Employment verification (add-on)
- Education verification (add-on)

**Turnaround:** 1-3 business days

**API Integration:** Yes (can automate)

**Why Recommended:**

- Industry standard
- FCRA compliant for employment
- Fast turnaround
- API available
- Used by major companies

**Pricing Tiers:**

- Basic: $35 (criminal only)
- Standard: $50 (criminal + SSN + sex offender)
- Premium: $75+ (includes employment/education verification)

---

### 6. **GoodHire**

**Website:** https://www.goodhire.com  
**Cost:** $29.99-79.99 per check  
**Features:**

- FCRA compliant
- Nationwide criminal search
- County searches
- Sex offender registry
- Motor vehicle records
- Drug testing coordination

**Turnaround:** 1-5 business days

**API Integration:** Yes

**Pricing:**

- Basic: $29.99
- Standard: $49.99
- Comprehensive: $79.99

---

### 7. **Sterling (Enterprise)**

**Website:** https://www.sterlingcheck.com  
**Cost:** Custom pricing (typically $40-100 per check)  
**Features:**

- Enterprise-grade
- Global coverage
- Continuous monitoring
- Compliance management
- Dedicated support

**Best For:** Large organizations with high volume

---

## DIY Free Approach (Manual Process)

### Step-by-Step Free Background Check:

**1. State Criminal Records (FREE)**

- Search Indiana State Police database
- Document results

**2. County Court Records (FREE)**

- Search Marion County Clerk
- Search other relevant counties
- Document results

**3. Sex Offender Registry (FREE)**

- Search NSOPW.gov
- Document results

**4. Social Media Check (FREE)**

- Review public social media profiles
- Look for red flags
- Document findings

**5. Reference Checks (FREE)**

- Call provided references
- Verify employment history
- Document conversations

**Total Cost:** $0  
**Time Required:** 2-4 hours per person  
**Limitations:** Not FCRA compliant, manual, time-consuming

---

## Recommended Solution for Elevate for Humanity

### **Hybrid Approach:**

**For Program Holders (Required):**

- Use **Checkr** ($35-50 per check)
- FCRA compliant
- Comprehensive nationwide search
- Fast turnaround
- Professional reports

**For Volunteers/Low-Risk Positions:**

- Use **Free State + County + Sex Offender** searches
- Manual process
- Document thoroughly
- Supplement with reference checks

**For Apprentices/Students:**

- Not typically required
- Optional: State criminal check if needed
- Focus on eligibility verification instead

---

## Implementation Plan

### Phase 1: Manual Process (Immediate - FREE)

**For Program Holders:**

1. Require applicant to obtain FBI check ($18)
2. Conduct free state/county searches
3. Check sex offender registry
4. Document all results
5. Store in `program_holder_documents` table

**Database:**

- Upload results to documents system
- Document type: "Background Check Results"
- Approval required before onboarding

### Phase 2: Integrate Checkr (3-6 months - PAID)

**Setup:**

1. Create Checkr account
2. Get API credentials
3. Integrate with application

**Code Integration:**

```typescript
// app/api/background-check/initiate/route.ts
import { Checkr } from 'checkr';

export async function POST(request: Request) {
  const { firstName, lastName, email, dob, ssn } = await request.json();

  const checkr = new Checkr(process.env.CHECKR_API_KEY);

  const candidate = await checkr.candidates.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    dob: dob,
    ssn: ssn,
  });

  const report = await checkr.reports.create({
    candidate_id: candidate.id,
    package: 'standard_criminal',
  });

  // Save to database
  await supabase.from('background_checks').insert({
    user_id: userId,
    checkr_report_id: report.id,
    status: 'pending',
  });

  return Response.json({ success: true, report_id: report.id });
}
```

**Database Table:**

```sql
CREATE TABLE background_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  checkr_report_id TEXT,
  status TEXT, -- pending, clear, consider, suspended
  report_url TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Legal Compliance

### FCRA Requirements (Fair Credit Reporting Act):

**If using paid service for employment decisions:**

1. **Disclosure:** Provide written notice that background check will be conducted
2. **Authorization:** Obtain written consent from applicant
3. **Pre-Adverse Action:** If considering rejection, provide:
   - Copy of report
   - Summary of rights
   - Opportunity to dispute
4. **Adverse Action:** If rejecting based on report:
   - Provide adverse action notice
   - Include report details
   - Explain rights

**Forms Needed:**

- Background Check Disclosure
- Background Check Authorization
- Pre-Adverse Action Letter
- Adverse Action Letter

### State Requirements (Indiana):

- Must comply with Indiana employment laws
- Cannot discriminate based on arrest records (only convictions)
- Must consider relevance of conviction to position
- 7-year lookback period for most offenses

---

## Cost Comparison

### Annual Cost Estimates:

**Scenario 1: 10 Program Holders/Year**

- Free DIY: $0 (but 20-40 hours of staff time)
- Checkr: $350-500/year

**Scenario 2: 50 Program Holders/Year**

- Free DIY: $0 (but 100-200 hours of staff time)
- Checkr: $1,750-2,500/year

**Scenario 3: 100 Program Holders/Year**

- Free DIY: $0 (but 200-400 hours of staff time)
- Checkr: $3,500-5,000/year
- Volume discount available

**Staff Time Value:**

- If staff time worth $20/hour
- 200 hours = $4,000 in labor cost
- Checkr becomes cost-effective at ~50+ checks/year

---

## Recommendation

### **Start with Hybrid Approach:**

**Immediate (Free):**

1. Require FBI check from applicant ($18)
2. Conduct free state/county searches
3. Check sex offender registry
4. Document in system
5. Manual review and approval

**Within 6 Months (Paid):**

1. Evaluate volume of background checks needed
2. If 50+ per year, integrate Checkr
3. Automate process
4. Reduce staff time
5. Improve compliance

**Long Term:**

- Continuous monitoring (Checkr feature)
- Automated alerts for new records
- Streamlined compliance
- Better candidate experience

---

## Current System Integration

### Where to Add Background Checks:

**1. Program Holder Application**

- Location: `app/program-holder/apply/page.tsx`
- Add: Background check consent form
- Trigger: Initiate check after application submitted

**2. Program Holder Documents**

- Location: `app/program-holder/documents/page.tsx`
- Add: "Background Check Results" document type
- Require: Upload before approval

**3. Program Holder Onboarding**

- Location: `app/program-holder/onboarding/page.tsx`
- Add: Background check status indicator
- Block: Cannot complete onboarding until check clears

**4. Admin Review**

- Location: `app/admin/program-holders/` (create if needed)
- Add: Background check results review
- Action: Approve/reject based on results

---

## Summary

**Free Options Available:** ✅ Yes (but manual and time-consuming)

**Best Free Option:**

- State criminal records
- County court records
- Sex offender registry
- FBI check ($18)

**Best Paid Option:**

- Checkr ($35-50 per check)
- FCRA compliant
- Fast and automated
- API integration available

**Recommendation:**

- Start with free/manual process
- Integrate Checkr when volume justifies cost
- Budget: $3,500-5,000/year for 100 checks

**Next Steps:**

1. Add background check requirement to Program Holder handbook
2. Create consent forms
3. Add document upload for results
4. Train staff on manual process
5. Evaluate Checkr integration in 6 months

---

## Contact

**For Background Check Questions:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757

**Checkr Sales:**

- Website: https://checkr.com
- Phone: 1-844-824-3257
