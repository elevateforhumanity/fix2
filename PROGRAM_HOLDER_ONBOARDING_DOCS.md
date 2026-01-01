# Program Holder Onboarding & Documents

**Last Updated:** January 1, 2026  
**Status:** ✅ Complete System with Document Upload

---

## Onboarding Page Content

**Location:** `app/program-holder/onboarding/page.tsx` (506 lines)

### What's Included:

#### 1. What is a Program Holder?

Explains the role and responsibilities:

- ✅ Enrolling students in approved training programs
- ✅ Tracking student progress through the platform
- ✅ Providing support to students during training
- ✅ Reporting outcomes and completion data
- ✅ Maintaining compliance with program requirements

#### 2. Getting Started (3-Step Process)

**Step 1: Apply**

- Submit program holder application
- Provide organization details
- Indicate program interests
- Link: `/program-holder/apply`

**Step 2: Get Approved**

- Team reviews application
- Response within 2-3 business days
- Approval process explained

**Step 3: Access Dashboard**

- Log in after approval
- Start enrolling students
- Link: `/login`

#### 3. Navigating Your Dashboard

**Student Management:**

- View student list with status
- Enroll new students in programs
- Track individual progress
- Export student data

**Reports & Analytics:**

- Completion rate reports
- Student outcome tracking
- Compliance documentation
- Export to PDF/Excel

**Communication:**

- Message individual students
- Broadcast announcements
- Receive progress notifications
- Contact support team

**Program Access:**

- View all available programs
- See program requirements
- Check funding eligibility
- Enroll students directly

#### 4. Your Responsibilities

**Student Support:**

- Provide guidance throughout training
- Answer questions
- Help with technical issues
- Ensure student engagement

**Progress Monitoring:**

- Track student completion
- Document milestones
- Report issues promptly
- Maintain accurate records

**Compliance:**

- Follow WIOA regulations
- Submit required reports
- Maintain documentation
- Protect student privacy

**Quality Assurance:**

- Ensure high-quality training
- Meet program standards
- Maintain facilities
- Keep equipment current

#### 5. Training Resources

**Video Tutorials:**

- Platform navigation
- Student enrollment process
- Progress tracking
- Report generation

**Documentation:**

- User guides
- FAQ section
- Policy documents
- Compliance checklists

**Support:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- Live chat available
- Help desk tickets

#### 6. Compliance Requirements

**WIOA Compliance:**

- Understand WIOA regulations
- Follow reporting requirements
- Maintain eligibility standards

**Data Privacy:**

- Protect student PII
- Follow FERPA guidelines
- Secure data handling

**Reporting:**

- Submit quarterly reports
- Track student outcomes
- Document completion rates

---

## Documents Page

**Location:** `app/program-holder/documents/page.tsx`  
**Type:** Client-side document upload system

### Features:

#### 1. Document Upload System

**Supported Document Types:**

- State Business License
- Training Provider License
- Facility Inspection Certificate
- Instructor Credentials
- Liability Insurance Certificate
- Workers' Compensation Insurance
- Background Check Results
- Tax ID / EIN Documentation
- W-9 Form
- Curriculum Approval Documents
- Equipment Inventory List
- Other Required Documents

**Upload Specifications:**

- Maximum file size: 10MB
- Supported formats: PDF, JPG, PNG, DOCX
- Secure upload via API endpoint
- Stored in Supabase Storage

#### 2. Document Management

**View Documents:**

- List all uploaded documents
- See document type and name
- View file size
- Check upload date

**Document Status:**

- ✅ Approved (green checkmark)
- ⏳ Pending Review (clock icon)
- ❌ Rejected (red X with notes)

**Actions:**

- Download documents
- View approval status
- See approval notes
- Re-upload if rejected

#### 3. Database Integration

**Table:** `program_holder_documents`

**Fields:**

- `id` - Unique identifier
- `user_id` - Program Holder user ID
- `document_type` - Type of document
- `file_name` - Original filename
- `file_url` - Storage URL
- `file_size` - Size in bytes
- `description` - Optional description
- `approved` - Boolean approval status
- `approval_notes` - Admin feedback
- `created_at` - Upload timestamp

#### 4. Upload Process

**Step 1:** Select file from computer  
**Step 2:** Choose document type from dropdown  
**Step 3:** Add optional description  
**Step 4:** Click upload button  
**Step 5:** Wait for confirmation  
**Step 6:** Document appears in list with "Pending" status

#### 5. Admin Review Process

**Admin Side:**

- View all submitted documents
- Review for completeness and validity
- Approve or reject with notes
- Notify Program Holder of decision

**Program Holder Side:**

- Receive notification of approval/rejection
- View approval notes
- Re-upload if rejected
- Track approval status

---

## Required Documents Checklist

From the Handbook, Program Holders MUST submit:

### Business Documents

- [ ] State Business License (current and valid)
- [ ] Federal Tax ID / EIN
- [ ] W-9 Form for payment processing

### Training Provider Documents

- [ ] Training Provider License (state-issued)
- [ ] Facility Inspection Certificate (safety and accessibility)
- [ ] State-approved curriculum for each program

### Insurance Documents

- [ ] Liability Insurance Certificate ($1M minimum coverage)
- [ ] Workers' Compensation Insurance (all employees)

### Personnel Documents

- [ ] Instructor credentials (licenses, certifications, qualifications)
- [ ] Background checks for all staff (criminal history)

### Equipment Documents

- [ ] Equipment inventory list (training tools and equipment)

### ⚠️ IMPORTANT

**Cannot enroll students or receive payments until ALL documents are submitted and approved.**

---

## Onboarding Workflow

### Phase 1: Application (Day 1)

1. Visit `/program-holder/apply`
2. Complete application form
3. Submit organization details
4. Indicate program interests

### Phase 2: Document Submission (Days 2-5)

1. Receive approval email
2. Log in to dashboard
3. Navigate to Documents page
4. Upload all required documents
5. Wait for admin review

### Phase 3: Review & Approval (Days 6-10)

1. Admin reviews documents
2. Approves or requests corrections
3. Program Holder receives notification
4. Re-submit if needed

### Phase 4: Onboarding Training (Days 11-15)

1. Access onboarding page
2. Watch video tutorials
3. Read user guides
4. Complete platform training
5. Take onboarding quiz (if required)

### Phase 5: Handbook & MOU (Days 16-20)

1. Read Program Holder Handbook
2. Acknowledge handbook electronically
3. Review MOU terms
4. Sign MOU electronically
5. Receive confirmation

### Phase 6: Active Status (Day 21+)

1. Full dashboard access granted
2. Can enroll students
3. Can track progress
4. Can submit reports
5. Eligible for payments

---

## Support During Onboarding

### Technical Support

- **Email:** elevate4humanityedu@gmail.com
- **Phone:** (317) 314-3757
- **Hours:** Monday-Friday, 9am-5pm EST

### Onboarding Specialist

- Assigned to each new Program Holder
- Guides through entire process
- Answers questions
- Troubleshoots issues

### Resources Available

- Video tutorials
- User guides
- FAQ section
- Live chat support
- Help desk tickets

---

## Post-Onboarding

### Ongoing Requirements

**Monthly:**

- Submit student progress updates
- Report any issues or concerns
- Update student status changes

**Quarterly:**

- Submit compliance reports
- Report student outcomes
- Update enrollment numbers

**Annually:**

- Renew licenses and certifications
- Update insurance certificates
- Refresh background checks
- Review and update curriculum

### Continuous Support

**Platform Updates:**

- Notified of new features
- Training on updates
- Documentation provided

**Compliance Changes:**

- Alerted to regulation changes
- Guidance on implementation
- Support with transitions

**Quality Assurance:**

- Regular check-ins
- Performance reviews
- Improvement recommendations

---

## Success Metrics

Program Holders are evaluated on:

1. **Student Enrollment:** Number of students enrolled
2. **Completion Rate:** Percentage who complete training
3. **Credential Attainment:** Percentage who earn credentials
4. **Job Placement:** Percentage placed in employment
5. **Compliance:** Timely reporting and documentation
6. **Quality:** Student satisfaction and outcomes

---

## Summary

**Onboarding Page:** 506 lines of comprehensive guidance  
**Documents Page:** Full upload and management system  
**Required Documents:** 11 types of documents  
**Onboarding Timeline:** 21 days average  
**Support:** Multiple channels available

**Status:** ✅ Complete onboarding system ready for Program Holders

---

## Contact

**Elevate for Humanity**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
- Address: 8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240
