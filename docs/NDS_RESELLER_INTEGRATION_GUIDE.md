# National Drug Screening Reseller Integration Guide

## For Elevate for Humanity Platform

**Integration Type:** Web-Based TPA Platform (Not API)  
**Partner:** National Drug Screening, Inc.  
**Contact:** Joe Reilly (321-622-2020) | Tom Fulmer (321-622-2040)

---

## 🎯 UNDERSTANDING THE MODEL

### What National Drug Screening Provides

**Web-Based TPA Platform:**
- Secure platform (nothing to install, no upgrades needed)
- Electronic drug test ordering (no paper forms)
- Lab accounts with all major SAMHSA certified labs
- Full-time USA-based MRO and MRO assistants
- Random testing management (consortiums and stand-alone)
- Electronic result reporting (real-time after MRO review)
- Document management (results, CCFs, reports)
- Unlimited users
- Training and ongoing support

**What This Means:**
- National Drug Screening handles ALL drug testing operations
- Elevate for Humanity becomes a reseller/TPA
- Students order tests through NDS web platform
- NDS manages: collection sites, labs, MRO review, results
- Elevate tracks compliance and requirements in our platform

---

## 🔄 INTEGRATION WORKFLOW

### Current Elevate Platform (What We Built)
1. **Drug Test Requirement Tracking**
   - Student needs drug test (program policy)
   - Requirement appears in student dashboard
   - Status tracked: scheduled → completed → verified

2. **Compliance Monitoring**
   - Program holders see pending tests
   - Administrators generate reports
   - Audit trail maintained

3. **Database Storage**
   - Test records stored in Elevate database
   - Results linked to enrollments
   - History tracked for compliance

### National Drug Screening Platform (What They Provide)
1. **Test Ordering**
   - Student/advisor logs into NDS platform
   - Selects collection site
   - Schedules appointment
   - Receives confirmation

2. **Test Execution**
   - Student goes to collection site
   - Sample collected
   - Sent to lab
   - MRO reviews results

3. **Result Delivery**
   - Results available in NDS portal
   - Email notifications sent
   - Documents stored in NDS system

### Integration Points (Manual Process)
1. **Order Placement:**
   - Advisor creates order in NDS platform
   - Records order details in Elevate system
   - Links NDS order ID to Elevate drug test record

2. **Result Retrieval:**
   - Check NDS platform for results
   - Manually update Elevate system with results
   - Notify student and program holder

3. **Reporting:**
   - Pull reports from NDS platform
   - Combine with Elevate compliance data
   - Generate unified reports

---

## 📋 SETUP PROCESS

### Step 1: Initial Consultation
**Contact:**
- Joe Reilly: 321-622-2020 | joe@nationaldrugscreening.com
- Tom Fulmer: 321-622-2040 | tom@nationaldrugscreening.com

**Discuss:**
- Business model and volume projections
- Pricing structure
- Setup fees
- Training requirements
- Timeline

### Step 2: Receive Quote
**Typical Costs:**
- Initial setup fee
- Per-test pricing (varies by panel type)
- MRO service fees
- Monthly platform fees (if applicable)

### Step 3: Account Setup
**Process:**
1. Approve quote and remit setup fee
2. NDS creates "House Account" for Elevate for Humanity
3. TPA user accounts created for advisors
4. Initial software training scheduled

### Step 4: Customer Account Setup
**Process:**
1. NDS provides Excel spreadsheet template
2. Elevate populates with student/employer information
3. Submit to NDS (7 business days for setup)
4. Accounts activated in NDS platform

### Step 5: Training
**Topics:**
1. Platform navigation
2. Test ordering process
3. Random testing management (if needed)
4. Result retrieval
5. Report generation
6. Document management

### Step 6: Go Live
1. Test with pilot students
2. Verify workflow
3. Train advisors
4. Launch to all programs

---

## 💼 OPERATIONAL WORKFLOW

### For Advisors

#### When Student Needs Drug Test:
1. **Check Elevate System**
   - Student dashboard shows requirement
   - Verify test type and panel needed
   - Check program policy

2. **Order in NDS Platform**
   - Log into NDS web platform
   - Create new test order
   - Select collection site near student
   - Schedule appointment
   - Get NDS order ID

3. **Update Elevate System**
   - Record NDS order ID in Elevate
   - Update status to "scheduled"
   - Add collection site details
   - Set scheduled date

4. **Notify Student**
   - Send appointment details
   - Provide collection site address
   - Explain what to bring (ID, etc.)
   - Confirm appointment time

#### When Results Come In:
1. **Check NDS Platform**
   - Log into NDS portal
   - View results (available after MRO review)
   - Download lab report if needed

2. **Update Elevate System**
   - Record result (positive/negative)
   - Update status to "completed"
   - Upload lab report URL
   - Set result date

3. **Notify Stakeholders**
   - Student notified of result
   - Program holder notified
   - Employer notified (if required)

4. **Compliance Action**
   - Negative: Clear student for program
   - Positive: Follow policy protocol
   - Update enrollment status if needed

### For Students

#### Scheduling Test:
1. Advisor provides NDS order details
2. Student confirms appointment
3. Student goes to collection site on scheduled date
4. Student provides sample
5. Student receives confirmation

#### Receiving Results:
1. Results reviewed by MRO
2. Student notified via email (from NDS)
3. Student can view in NDS portal (if given access)
4. Student sees updated status in Elevate dashboard

### For Program Holders

#### Monitoring Compliance:
1. View pending tests in Elevate dashboard
2. Check NDS platform for result status
3. Generate compliance reports
4. Track completion rates

---

## 📊 REPORTING

### NDS Platform Reports
- Test results by date range
- MIS reports
- Random testing records
- Custody and control forms (CCF)
- Lab reports

### Elevate Platform Reports
- Student compliance status
- Program-level statistics
- Funding source tracking
- Audit trail
- Historical data

### Combined Reporting
1. Export data from NDS platform
2. Import into Elevate system
3. Merge with enrollment data
4. Generate unified reports

---

## 💰 PRICING MODEL

### NDS Costs (Typical)
- **5-Panel Test:** $45-55
- **10-Panel Test:** $65-75
- **DOT 5-Panel:** $55-65
- **MRO Review:** Included
- **Setup Fee:** One-time (varies)

### Elevate Markup Options
1. **Pass-Through:** Charge exact NDS cost
2. **Markup:** Add 15-25% margin
3. **Bundled:** Include in program tuition
4. **Employer-Paid:** Bill to employer directly

### Example Pricing
```
5-Panel Test:
- NDS Cost: $50
- Elevate Markup (20%): $10
- Student/Employer Price: $60
```

---

## 🔐 DATA MANAGEMENT

### What's Stored in NDS Platform
- Test orders
- Collection site information
- Lab results
- MRO reviews
- CCF documents
- Random testing records

### What's Stored in Elevate Platform
- Student requirements
- Test scheduling
- Compliance status
- Enrollment linkage
- Audit trail
- Reporting data

### Data Sync Process
**Manual (Current):**
1. Advisor checks NDS for results
2. Advisor updates Elevate system
3. Notifications sent from Elevate

**Future Enhancement (Optional):**
- Automated result import (if NDS provides export)
- Scheduled data sync
- Webhook notifications (if available)

---

## 📞 SUPPORT

### National Drug Screening Support
**For:**
- Collection site issues
- Lab problems
- MRO questions
- Platform technical issues

**Contact:**
- Phone: 866-843-4545
- Email: Support through NDS platform

### Elevate for Humanity Support
**For:**
- Student questions
- Requirement tracking
- Compliance reporting
- Platform navigation

**Contact:**
- Phone: (317) 314-3757
- Email: elevate4humanityedu@gmail.com

---

## ✅ IMPLEMENTATION CHECKLIST

### Business Setup
- [ ] Schedule consultation with Joe Reilly or Tom Fulmer
- [ ] Review pricing and services
- [ ] Approve quote
- [ ] Pay setup fee
- [ ] Sign reseller agreement

### Technical Setup
- [ ] Receive NDS platform credentials
- [ ] Complete initial training
- [ ] Set up advisor user accounts
- [ ] Test order placement
- [ ] Test result retrieval

### Operational Setup
- [ ] Create student account template
- [ ] Upload initial student data
- [ ] Set up notification templates
- [ ] Train advisors on workflow
- [ ] Document procedures

### Launch
- [ ] Pilot with 2-3 students
- [ ] Verify complete workflow
- [ ] Gather feedback
- [ ] Refine processes
- [ ] Launch to all programs

---

## 🎯 SUCCESS METRICS

### Track These KPIs
- Number of tests ordered per month
- Average time from order to result
- Compliance rate (% students completing required tests)
- Positive test rate
- No-show rate
- Student satisfaction
- Cost per test
- Revenue from markup

---

## 📚 RESOURCES

### National Drug Screening
- **Reseller Program:** https://www.nationaldrugscreening.com/reseller-program/
- **Training:** https://mydrugtesttraining.com/
- **Contact:** 866-843-4545

### Elevate for Humanity
- **Platform:** https://www.elevateforhumanity.org
- **Contact:** (317) 314-3757
- **Email:** elevate4humanityedu@gmail.com

---

## 🚀 NEXT STEPS

1. **Schedule Consultation**
   - Call Joe Reilly: 321-622-2020
   - Or Tom Fulmer: 321-622-2040
   - Discuss business plan and pricing

2. **Review Quote**
   - Understand all costs
   - Determine markup strategy
   - Calculate ROI

3. **Approve and Setup**
   - Sign agreement
   - Pay setup fee
   - Begin training

4. **Launch Pilot**
   - Test with small group
   - Refine workflow
   - Train team

5. **Full Launch**
   - Roll out to all programs
   - Monitor metrics
   - Optimize processes

---

**Last Updated:** December 18, 2024  
**Status:** Ready for NDS Consultation  
**Next Action:** Call Joe Reilly (321-622-2020) or Tom Fulmer (321-622-2040)
