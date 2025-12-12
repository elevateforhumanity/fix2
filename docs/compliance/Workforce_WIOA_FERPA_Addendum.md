# Workforce / WIOA FERPA Addendum

**Elevate for Humanity Career & Training Institute**

**Prepared by:** Clinical Informatics Consultant  
**Effective Date:** January 1, 2025  
**Last Reviewed:** December 12, 2025  
**Next Review:** December 12, 2026

---

## 1. Purpose

This Workforce / WIOA FERPA Addendum supplements the institution's FERPA, LMS, and Privacy Policies. It establishes FERPA-compliant procedures for sharing student information with workforce development partners, case managers, funding agencies, and employers under WIOA and related workforce programs.

---

## 2. Scope

This addendum applies to:

- **Workforce Innovation and Opportunity Act (WIOA)** programs
- **Eligible Training Provider List (ETPL)** reporting
- **Workforce boards** and career centers
- **Case managers** and workforce navigators
- **Employer partners** receiving student outcome data
- **State and federal workforce agencies**
- **Third-party evaluators** conducting program assessments

---

## 3. FERPA Authority for Workforce Data Sharing

Under FERPA (34 CFR § 99.31), student education records may be shared only when:

1. **The student has provided written consent**, OR
2. **The disclosure meets a FERPA exception**, OR
3. **Data is de-identified** (no personally identifiable information)

### Institutional Policy

Elevate for Humanity requires **written student consent** for all workforce-related data sharing unless data is fully de-identified or meets a specific FERPA exception.

### FERPA Exceptions Applicable to Workforce Programs

- **School Officials Exception** (§ 99.31(a)(1))
  - Workforce staff employed by or contracted with the institution
  - Must have legitimate educational interest
  - Must be performing institutional services

- **Studies Exception** (§ 99.31(a)(6))
  - Organizations conducting studies for the institution
  - Must have written agreement
  - Must destroy data when no longer needed

- **Accrediting Organizations** (§ 99.31(a)(7))
  - Accreditors evaluating programs
  - State licensing agencies

---

## 4. Types of Information Shared (With Consent)

With documented student consent, the following information may be shared with workforce partners:

### Enrollment Information
- Program name and type
- Enrollment date
- Expected completion date
- Enrollment status (active, completed, withdrawn)

### Attendance and Participation
- Attendance percentage
- Participation in required activities
- Engagement metrics (aggregate)

### Program Progress
- Percentage of program completed
- Milestones achieved
- Skills competencies attained

### Completion Status
- Completion date
- Certificate or credential earned
- License/certification exam results (if applicable)

### Employment Outcomes
- Employment status (employed/not employed)
- Job title and employer (with additional consent)
- Wage information (with additional consent)
- Retention at 6 months, 12 months

---

## 5. Information That Is NOT Shared

The following information is **NOT shared** with workforce partners without explicit additional consent:

### Protected Information
- **Grades and GPA** (unless explicitly authorized)
- **Disability or accommodation records**
- **Disciplinary records**
- **Financial aid information** (beyond eligibility status)
- **LMS login credentials**
- **Social Security Numbers** (unless required by law)
- **Medical information**
- **Personal contact information** (unless authorized)

### De-Identification Requirements

When sharing aggregate data, all personally identifiable information must be removed:
- Names
- Student ID numbers
- Dates of birth
- Contact information
- Any unique identifiers

---

## 6. Consent & Documentation Requirements

### Before Sharing Information

1. **Students must sign a Workforce FERPA Consent Form**
2. **Consent must specify:**
   - What data will be shared
   - With whom it will be shared
   - Purpose of disclosure
   - Duration of consent
3. **Consent is stored securely** in the LMS or student record system
4. **Students may revoke consent** at any time in writing

### Consent Form Requirements

The Workforce FERPA Consent Form must include:

- Student name and ID
- Specific data elements to be disclosed
- Recipient organization(s)
- Purpose of disclosure
- Duration of consent (or specific end date)
- Statement that consent is voluntary
- Statement that refusal will not affect services
- Revocation procedures
- Student signature and date
- Witness signature (if applicable)

### Consent Storage and Tracking

- Consent forms stored in: `ferpa_consent_forms` database table
- Digital signatures captured and timestamped
- IP address and user agent logged
- Consent status tracked (active, expired, revoked)
- Audit trail maintained

---

## 7. LMS Controls for Workforce Access

The LMS supports workforce compliance by:

### Access Restrictions
- **Workforce partners do NOT have direct LMS access**
- **Reports are generated and shared** by authorized staff only
- **Role-based permissions** prevent unauthorized access
- **Separate workforce reporting module** with limited data

### Data Security
- **Encrypted data transmission** (SSL/TLS)
- **Secure file transfer** for reports
- **Password-protected documents**
- **Automatic expiration** of shared links

### Audit Logging
- **All workforce data access logged**
- **Reports include:**
  - Who accessed data
  - What data was accessed
  - When access occurred
  - Purpose of access
  - Recipient of data

---

## 8. Reporting & Audit Readiness

All workforce-related data sharing is documented for audits, including:

### Required Documentation

1. **Consent Forms**
   - Signed student consent for each disclosure
   - Stored securely and retrievable

2. **Disclosure Log**
   - Database table: `ferpa_disclosure_log`
   - Records all disclosures including:
     - Student ID
     - Data disclosed
     - Recipient
     - Date and time
     - Purpose
     - Legal basis (consent or exception)

3. **Data Sharing Agreements**
   - Database table: `data_sharing_agreements`
   - Signed agreements with all workforce partners
   - Includes security requirements and prohibitions

4. **Reports Shared**
   - Copies of all reports provided to workforce partners
   - Retention period: 7 years

5. **Audit Logs**
   - System-generated logs of all access
   - Retention period: 3 years minimum

---

## 9. Data Sharing Agreements with Workforce Partners

### Required Elements

All workforce partners must sign a Data Sharing Agreement that includes:

1. **Purpose of Data Sharing**
   - Specific use cases
   - Prohibited uses

2. **Data Elements Specified**
   - Exact fields to be shared
   - Frequency of sharing

3. **Security Requirements**
   - Encryption standards
   - Access controls
   - Storage requirements
   - Transmission methods

4. **Prohibition on Re-Disclosure**
   - Partner may not share data further
   - Exceptions must be specified

5. **Data Retention and Destruction**
   - How long partner may retain data
   - Secure destruction methods
   - Certification of destruction

6. **Audit Rights**
   - Institution may audit partner compliance
   - Partner must provide access to records

7. **Breach Notification**
   - Partner must notify institution immediately
   - Procedures for breach response

8. **Training Requirements**
   - Partner staff must complete FERPA training
   - Annual refresher required

9. **Agreement Term**
   - Effective date
   - Expiration date
   - Renewal procedures

10. **Signatures**
    - Authorized representatives from both parties
    - Date signed

### Agreement Review Schedule

- **Annual review** of all active agreements
- **Renewal** 30 days before expiration
- **Termination** if partner non-compliant

---

## 10. Staff Training & Responsibilities

Staff involved in workforce reporting must:

### Training Requirements

- ☐ **Complete FERPA training annually**
- ☐ **Understand WIOA reporting requirements**
- ☐ **Follow LMS access controls**
- ☐ **Verify consent before disclosure**
- ☐ **Document all disclosures**
- ☐ **Report any suspected data misuse immediately**

### Authorized Staff Roles

Only the following roles may share workforce data:

- FERPA Officer
- Registrar
- Workforce Coordinator
- Designated Compliance Staff
- Authorized Administrators

### Responsibilities

1. **Verify Consent**
   - Check consent form before each disclosure
   - Ensure consent is current and not revoked
   - Verify scope of consent covers requested data

2. **Document Disclosure**
   - Log in `ferpa_disclosure_log` table
   - Include all required information
   - Attach copy of report shared

3. **Secure Transmission**
   - Use encrypted email or secure file transfer
   - Password-protect documents
   - Confirm receipt

4. **Monitor Compliance**
   - Review partner use of data
   - Conduct periodic audits
   - Address violations promptly

---

## 11. WIOA-Specific Requirements

### WIOA Performance Reporting

WIOA requires reporting on:

- **Credential Attainment**
- **Employment Rate** (2nd and 4th quarter after exit)
- **Median Earnings**
- **Measurable Skill Gains**
- **Effectiveness in Serving Employers**

### FERPA-Compliant WIOA Reporting

**Individual-Level Data:**
- Requires student consent
- Consent form must specify WIOA reporting
- Consent covers follow-up surveys

**Aggregate Data:**
- No consent required if de-identified
- Must meet de-identification standards
- Cannot allow re-identification

### ETPL Reporting

Eligible Training Provider List (ETPL) reporting requires:

- **Program completion rates**
- **Credential attainment rates**
- **Employment rates**
- **Median earnings**

**Reporting Method:**
- Aggregate data preferred (no consent needed)
- Individual data requires consent
- State-specific requirements vary

---

## 12. Compliance Monitoring & Review

Workforce FERPA compliance is reviewed:

### Review Schedule

- **Monthly:** Consent form audit (sample review)
- **Quarterly:** Disclosure log review
- **Quarterly:** Data sharing agreement status check
- **Semi-Annual:** Partner compliance audit
- **Annual:** Full workforce FERPA compliance review
- **As Needed:** Prior to accreditation visits
- **As Needed:** Prior to workforce audits
- **As Needed:** When regulations change

### Quality Assurance Activities

1. **Consent Form Audit**
   - Verify all disclosures have consent
   - Check consent forms are complete
   - Ensure signatures are valid

2. **Disclosure Log Review**
   - Verify all disclosures are logged
   - Check for unauthorized disclosures
   - Ensure documentation is complete

3. **Partner Compliance Audit**
   - Review partner data handling
   - Verify security measures
   - Check for unauthorized re-disclosure
   - Confirm data destruction when required

4. **Staff Training Verification**
   - Ensure all staff are current on training
   - Review training completion records
   - Provide refresher training as needed

### Corrective Actions

If violations are identified:

1. **Immediate Actions**
   - Stop further disclosures if necessary
   - Notify affected students
   - Document the violation

2. **Investigation**
   - Determine cause and scope
   - Identify responsible parties
   - Assess risk and impact

3. **Remediation**
   - Implement corrective measures
   - Retrain staff if needed
   - Update policies and procedures
   - Strengthen controls

4. **Follow-Up**
   - Verify corrective actions effective
   - Monitor for recurrence
   - Report to leadership and FERPA Officer

---

## 13. Student Rights and Opt-Out

### Student Rights

Students have the right to:

- **Review** what data is shared with workforce partners
- **Consent or refuse** to share data
- **Revoke consent** at any time
- **Request disclosure log** of their records
- **File complaints** if rights are violated

### Opt-Out Procedures

Students may opt out of workforce data sharing by:

1. **Not signing consent form** (no data shared)
2. **Revoking consent** in writing at any time
3. **Opting out of directory information** (if applicable)

**Important:** Opting out does not affect:
- Eligibility for programs or services
- Academic standing
- Financial aid (unless required by funder)

### Notification to Students

Students are notified of workforce data sharing:

- **During enrollment** (orientation)
- **In student handbook**
- **On institutional website**
- **Via consent form** (before sharing)
- **Annually** (reminder of rights)

---

## 14. Accreditor & Workforce Assurance Statement

Elevate for Humanity Career & Training Institute affirms that:

- All workforce-related student data sharing is conducted in **full compliance with FERPA**
- **Written consent** is obtained before sharing individual student data
- **Data sharing agreements** are in place with all workforce partners
- **LMS policies** protect student privacy and restrict unauthorized access
- **Staff training** ensures understanding of FERPA requirements
- **Audit logs** document all disclosures for accountability
- **Compliance monitoring** ensures ongoing adherence to regulations
- All practices are **documented and available** for accreditation and audit purposes

---

## 15. Contact Information

### FERPA Officer

**Name:** [FERPA Officer Name]  
**Title:** FERPA Officer / Compliance Officer  
**Email:** ferpa@elevateforhumanity.org  
**Phone:** [Phone Number]

### Workforce Coordinator

**Name:** [Workforce Coordinator Name]  
**Title:** Workforce Development Coordinator  
**Email:** workforce@elevateforhumanity.org  
**Phone:** [Phone Number]

### U.S. Department of Education

**Family Policy Compliance Office**  
400 Maryland Avenue, SW  
Washington, DC 20202-8520  
Phone: 1-800-USA-LEARN  
Website: [https://www2.ed.gov/policy/gen/guid/fpco/](https://www2.ed.gov/policy/gen/guid/fpco/)

---

## 16. Approval & Review

### Approved By

**Name:** _________________________________________

**Title:** President / CEO

**Signature:** _________________________________________

**Date:** _________________________________

### Reviewed By

**FERPA Officer:** _________________________________________

**Date:** _________________________________

**Workforce Coordinator:** _________________________________________

**Date:** _________________________________

**Legal Counsel:** _________________________________________

**Date:** _________________________________

### Next Review Date

**Scheduled Review:** December 12, 2026

**Trigger for Earlier Review:**
- Changes in FERPA regulations
- Changes in WIOA requirements
- Accreditation recommendations
- Identified compliance issues
- New workforce partnerships

---

## 17. Revision History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | 01/01/2025 | Initial version | [Name] |
| | | | |
| | | | |

---

## Appendix A: Workforce FERPA Consent Form Template

**[See separate document: Workforce_FERPA_Consent_Form.md]**

---

## Appendix B: Data Sharing Agreement Template

**[See separate document: Data_Sharing_Agreement_Template.md]**

---

## Appendix C: WIOA Performance Metrics

### Required WIOA Performance Indicators

1. **Employment Rate (2nd Quarter After Exit)**
   - Percentage of participants employed in 2nd quarter after exit

2. **Employment Rate (4th Quarter After Exit)**
   - Percentage of participants employed in 4th quarter after exit

3. **Median Earnings (2nd Quarter After Exit)**
   - Median earnings of participants in 2nd quarter after exit

4. **Credential Attainment**
   - Percentage of participants who obtained recognized credential

5. **Measurable Skill Gains**
   - Percentage of participants achieving measurable skill gains

6. **Effectiveness in Serving Employers**
   - Employer satisfaction and engagement metrics

---

**Document Control:**
- Version: 1.0
- Effective: January 1, 2025
- Last Updated: December 12, 2025
- Next Review: December 12, 2026
- Owner: FERPA Officer / Clinical Informatics Consultant
