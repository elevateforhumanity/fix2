# Data Retention Policy

**Organization:** Elevate for Humanity  
**Effective Date:** January 1, 2026  
**Last Updated:** January 1, 2026  
**Policy Owner:** Compliance Officer

---

## 1. PURPOSE

This policy establishes data retention requirements to ensure compliance with:

- FERPA (Family Educational Rights and Privacy Act)
- WIOA (Workforce Innovation and Opportunity Act)
- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- Indiana DWD regulations
- IRS requirements (for tax services)

---

## 2. DATA CATEGORIES & RETENTION PERIODS

### 2.1 Student Education Records (FERPA)

**Retention Period:** 7 years after program completion or last attendance

**Includes:**

- Enrollment records
- Academic transcripts
- Grades and assessments
- Attendance records
- Financial aid records
- Disciplinary records
- Credential/certificate records

**Legal Basis:** FERPA requires maintaining education records for reasonable period; 7 years aligns with IRS and WIOA requirements.

**Disposal Method:** Secure deletion from database, permanent removal from backups

### 2.2 WIOA Performance Data

**Retention Period:** 7 years after program year end

**Includes:**

- Student outcome data
- Employment verification
- Wage data (2nd and 4th quarter)
- Credential attainment
- Measurable skill gains
- Quarterly reports submitted to INTraining

**Legal Basis:** WIOA regulations require 7-year retention for audit purposes.

**Disposal Method:** Archive to secure storage, then secure deletion

### 2.3 Employment & Wage Data

**Retention Period:** 7 years after collection

**Includes:**

- Employment verification records
- Wage information
- UI-3 wage matching data
- Employer information
- Follow-up survey responses

**Legal Basis:** WIOA compliance and potential audit requirements.

**Disposal Method:** Secure deletion, anonymization of aggregate data

### 2.4 Application Records

**Retention Period:** 3 years after application decision

**Includes:**

- Student applications
- Program holder applications
- Employer applications
- Staff applications
- Supporting documents

**Legal Basis:** Equal opportunity compliance, potential disputes.

**Disposal Method:** Secure deletion from database

### 2.5 Financial Records

**Retention Period:** 7 years after transaction

**Includes:**

- Payment records
- Invoices
- Refunds
- Stripe transaction data
- Financial aid disbursements

**Legal Basis:** IRS requirements, audit compliance.

**Disposal Method:** Archive then secure deletion

### 2.6 Tax Records (SupersonicFastCash)

**Retention Period:** 7 years after filing

**Includes:**

- Tax returns
- W-2s, 1099s
- Supporting documents
- Client intake forms
- E-file confirmations

**Legal Basis:** IRS requires 7-year retention for audit purposes.

**Disposal Method:** Secure deletion, encrypted archive

### 2.7 User Account Data

**Retention Period:** 3 years after account closure OR upon user request

**Includes:**

- Profile information
- Login history
- Communication preferences
- Activity logs

**Legal Basis:** GDPR/CCPA right to deletion, operational needs.

**Disposal Method:** Immediate deletion upon request, automatic after 3 years

### 2.8 Audit Logs

**Retention Period:** 7 years

**Includes:**

- Authentication events
- Data access logs
- Admin actions
- Security events
- Compliance activities

**Legal Basis:** Security compliance, forensic analysis, regulatory audits.

**Disposal Method:** Archive to secure storage, then deletion

### 2.9 Communication Records

**Retention Period:** 3 years

**Includes:**

- Emails sent/received
- SMS notifications
- In-app messages
- Support tickets

**Legal Basis:** Dispute resolution, service quality.

**Disposal Method:** Secure deletion

### 2.10 Marketing & Analytics Data

**Retention Period:** 2 years OR upon user request

**Includes:**

- Website analytics
- Marketing campaign data
- Cookie data
- User behavior tracking

**Legal Basis:** GDPR/CCPA compliance, business operations.

**Disposal Method:** Anonymization or deletion

---

## 3. DATA RETENTION SCHEDULE

| Data Type                 | Retention Period      | Legal Basis         | Disposal Method     |
| ------------------------- | --------------------- | ------------------- | ------------------- |
| Student Education Records | 7 years               | FERPA, WIOA         | Secure deletion     |
| WIOA Performance Data     | 7 years               | WIOA regulations    | Archive then delete |
| Employment/Wage Data      | 7 years               | WIOA compliance     | Secure deletion     |
| Application Records       | 3 years               | EEO compliance      | Secure deletion     |
| Financial Records         | 7 years               | IRS requirements    | Archive then delete |
| Tax Records               | 7 years               | IRS requirements    | Encrypted archive   |
| User Account Data         | 3 years or on request | GDPR/CCPA           | Immediate deletion  |
| Audit Logs                | 7 years               | Security compliance | Archive then delete |
| Communication Records     | 3 years               | Dispute resolution  | Secure deletion     |
| Marketing/Analytics       | 2 years or on request | GDPR/CCPA           | Anonymization       |

---

## 4. AUTOMATED RETENTION ENFORCEMENT

### 4.1 Database Triggers

```sql
-- Auto-archive old records
CREATE OR REPLACE FUNCTION archive_old_records()
RETURNS void AS $$
BEGIN
  -- Archive student records older than 7 years
  INSERT INTO archived_student_records
  SELECT * FROM enrollments
  WHERE completion_date < NOW() - INTERVAL '7 years';

  DELETE FROM enrollments
  WHERE completion_date < NOW() - INTERVAL '7 years';
END;
$$ LANGUAGE plpgsql;

-- Schedule monthly cleanup
SELECT cron.schedule(
  'monthly-data-retention-cleanup',
  '0 2 1 * *', -- 2 AM on 1st of each month
  'SELECT archive_old_records()'
);
```

### 4.2 Automated Processes

**Monthly Tasks:**

- Identify records eligible for deletion
- Send notifications to compliance team
- Generate retention compliance report

**Quarterly Tasks:**

- Archive records approaching retention limit
- Verify backup retention policies
- Audit data retention compliance

**Annual Tasks:**

- Review and update retention policy
- Conduct full data inventory
- Update legal compliance requirements

---

## 5. DATA DELETION PROCEDURES

### 5.1 Standard Deletion

1. **Identification:** Automated query identifies records past retention period
2. **Notification:** Compliance team notified 30 days before deletion
3. **Review:** Manual review for legal holds or ongoing matters
4. **Backup:** Final backup to secure archive (if required)
5. **Deletion:** Secure deletion from production database
6. **Verification:** Confirm deletion from all systems
7. **Documentation:** Log deletion in audit trail

### 5.2 User-Requested Deletion (GDPR/CCPA)

1. **Request Received:** User submits deletion request
2. **Identity Verification:** Confirm user identity
3. **Legal Review:** Check for legal retention requirements
4. **Scope Determination:** Identify all data to be deleted
5. **Execution:** Delete data within 30 days
6. **Confirmation:** Send confirmation to user
7. **Audit:** Log deletion in compliance records

### 5.3 Secure Deletion Methods

- **Database Records:** `DELETE` with `VACUUM FULL` to reclaim space
- **File Storage:** Overwrite with random data, then delete
- **Backups:** Remove from backup rotation, overwrite backup media
- **Third-Party Services:** Request deletion from Stripe, Resend, etc.

---

## 6. EXCEPTIONS & LEGAL HOLDS

### 6.1 Legal Hold Process

When litigation, investigation, or audit is pending:

1. **Notification:** Legal team notifies compliance officer
2. **Identification:** Identify all relevant data
3. **Preservation:** Suspend automated deletion
4. **Documentation:** Document legal hold in system
5. **Release:** Remove hold when matter resolved
6. **Resume:** Resume normal retention schedule

### 6.2 Extended Retention

Data may be retained beyond standard periods for:

- Active litigation
- Government investigation
- Regulatory audit
- Ongoing dispute
- Business necessity (with legal approval)

---

## 7. THIRD-PARTY DATA

### 7.1 Vendor Data Retention

**Supabase (Database):**

- Retention: Follows our policy
- Deletion: Automatic with database deletion
- Backups: 30-day backup retention

**Stripe (Payments):**

- Retention: 7 years (Stripe policy)
- Deletion: Request via Stripe API
- Compliance: PCI-DSS compliant

**Resend (Email):**

- Retention: 90 days (Resend policy)
- Deletion: Automatic after 90 days
- Compliance: GDPR compliant

**OpenAI (AI Services):**

- Retention: 30 days (OpenAI policy)
- Deletion: Automatic after 30 days
- Compliance: Zero data retention option available

---

## 8. COMPLIANCE MONITORING

### 8.1 Regular Audits

**Monthly:**

- Review automated deletion logs
- Verify retention compliance
- Check for overdue deletions

**Quarterly:**

- Audit data inventory
- Review legal holds
- Update retention schedule

**Annually:**

- Full compliance audit
- Policy review and update
- Staff training on retention

### 8.2 Reporting

**Compliance Dashboard:**

- Records approaching retention limit
- Pending deletions
- Legal holds active
- Deletion completion rate

**Annual Report:**

- Total records deleted
- Retention compliance rate
- Policy violations (if any)
- Recommendations for improvement

---

## 9. ROLES & RESPONSIBILITIES

### 9.1 Compliance Officer

- Oversee retention policy
- Approve exceptions
- Conduct audits
- Update policy

### 9.2 Database Administrator

- Implement automated deletion
- Maintain backup policies
- Execute secure deletion
- Document procedures

### 9.3 Legal Counsel

- Review legal requirements
- Approve legal holds
- Advise on compliance
- Handle disputes

### 9.4 All Staff

- Follow retention policy
- Report violations
- Attend training
- Protect data integrity

---

## 10. TRAINING & AWARENESS

### 10.1 Required Training

**All Staff:**

- Annual data retention training
- FERPA compliance
- GDPR/CCPA rights
- Secure deletion procedures

**Administrators:**

- Advanced retention procedures
- Legal hold process
- Audit procedures
- Incident response

### 10.2 Documentation

- Policy available to all staff
- Procedures documented in wiki
- Training materials updated annually
- Quick reference guides

---

## 11. POLICY REVIEW

**Review Frequency:** Annually or when regulations change

**Review Process:**

1. Legal counsel reviews regulations
2. Compliance officer updates policy
3. Management approves changes
4. Staff notified of updates
5. Training updated

**Next Review Date:** January 1, 2027

---

## 12. CONTACT INFORMATION

**Compliance Officer:**  
Email: compliance@elevateforhumanity.org  
Phone: (317) 314-3757

**Legal Counsel:**  
Email: legal@elevateforhumanity.org  
Phone: (317) 314-3757

**Data Protection Officer:**  
Email: privacy@elevateforhumanity.org  
Phone: (317) 314-3757

---

## 13. POLICY APPROVAL

**Approved By:** Elizabeth Greene, Founder & CEO  
**Date:** January 1, 2026  
**Signature:** [Digital Signature]

**Reviewed By:** Legal Counsel  
**Date:** January 1, 2026

---

## APPENDIX A: SQL RETENTION QUERIES

```sql
-- Find records eligible for deletion
SELECT
  'enrollments' as table_name,
  COUNT(*) as records_to_delete
FROM enrollments
WHERE completion_date < NOW() - INTERVAL '7 years'

UNION ALL

SELECT
  'applications' as table_name,
  COUNT(*) as records_to_delete
FROM student_applications
WHERE created_at < NOW() - INTERVAL '3 years'
AND status IN ('rejected', 'withdrawn');

-- Execute retention cleanup
BEGIN;

-- Archive before deletion
INSERT INTO archived_enrollments
SELECT * FROM enrollments
WHERE completion_date < NOW() - INTERVAL '7 years';

-- Delete old records
DELETE FROM enrollments
WHERE completion_date < NOW() - INTERVAL '7 years';

-- Log deletion
INSERT INTO audit_logs (event_type, action, details)
VALUES ('data.retention', 'automated_deletion',
  jsonb_build_object('table', 'enrollments', 'count', ROW_COUNT));

COMMIT;
```

---

**This policy is effective immediately and supersedes all previous data retention policies.**
