# Admin Guide: Managing External Partner Modules

## Overview

External partner modules (like Milady RISE, HSI, Certiport) are embedded into Elevate courses as required steps. Students complete these modules on partner platforms, then upload proof of completion for admin review.

---

## Quick Start

### Access the Review Dashboard

**URL:** `/admin/external-progress`

**What You'll See:**
- Pending submissions (awaiting your review)
- Recently approved modules
- In-progress modules

---

## Review Workflow

### Step 1: Student Completes Partner Module

1. Student navigates to external module in their course
2. Clicks "Launch [Partner] Course"
3. Completes training on partner platform
4. Returns to Elevate
5. Uploads certificate or screenshot
6. Status changes to **"submitted"**

### Step 2: Admin Reviews Submission

1. Go to `/admin/external-progress`
2. See submission in "Pending Submissions" table
3. Click "View proof" to open uploaded document
4. Verify:
   - Student name matches
   - Certificate is for correct course
   - Certificate is complete (not partial)
   - Date is recent

### Step 3: Approve or Reset

**If Valid:**
- Click **"✓ Approve"**
- Status changes to **"approved"**
- Module counts as complete in course
- Student can proceed to next requirements

**If Invalid:**
- Click **"✗ Reset"**
- Status returns to **"in_progress"**
- Proof file is cleared
- Student must re-upload

---

## Common Scenarios

### Scenario 1: Valid Certificate

**What You See:**
- Clear, readable certificate
- Student name matches profile
- Course title matches module
- Completion date is recent

**Action:** Click "✓ Approve"

### Scenario 2: Wrong Course

**What You See:**
- Certificate is for different course
- Example: Student uploaded OSHA 30 instead of OSHA 10

**Action:**
1. Click "✗ Reset"
2. Contact student: "Please upload certificate for [correct course]"
3. Student re-uploads correct certificate

### Scenario 3: Incomplete Certificate

**What You See:**
- Screenshot shows "In Progress"
- No completion date
- Missing certificate number

**Action:**
1. Click "✗ Reset"
2. Contact student: "Please complete the full course before uploading"
3. Student finishes course and re-uploads

### Scenario 4: Unreadable Image

**What You See:**
- Blurry photo
- Cut-off edges
- Can't read student name

**Action:**
1. Click "✗ Reset"
2. Contact student: "Please upload a clear, complete image"
3. Student re-uploads better quality

### Scenario 5: No File Uploaded

**What You See:**
- Status shows "submitted"
- "No file uploaded" message

**Action:**
1. Click "✗ Reset"
2. Contact student: "Please upload your certificate"
3. Student uploads file

---

## Partner-Specific Guidelines

### Milady RISE

**Expected Certificate:**
- Milady RISE logo
- Course title (e.g., "Client Well-Being & Safety")
- Student name
- Completion date
- Certificate number

**Common Issues:**
- Students upload course enrollment confirmation instead of completion certificate
- Students upload screenshot of course page, not certificate

**Solution:** Ask for the actual certificate PDF or completion page screenshot

### HSI (Health & Safety Institute)

**Expected Certificate:**
- HSI or American Heart Association logo
- Course title (e.g., "CPR/AED for Adults")
- Student name
- Completion date
- Card number
- Expiration date (2 years from completion)

**Common Issues:**
- Students upload class registration instead of completion card
- Students upload expired certificates

**Solution:** Verify completion date and ensure certificate is current

### CareerSafe (OSHA)

**Expected Certificate:**
- CareerSafe logo
- OSHA 10 or OSHA 30 designation
- Student name
- Completion date
- DOL card number
- Instructor information

**Common Issues:**
- Students upload partial completion (e.g., 5 of 10 hours)
- Students upload wrong OSHA level

**Solution:** Verify all hours are complete and level matches requirement

### Certiport

**Expected Certificate:**
- Certiport/Pearson VUE logo
- Certification name (e.g., "Microsoft Office Specialist")
- Student name
- Exam date
- Pass/Fail status (must be Pass)
- Certificate number

**Common Issues:**
- Students upload practice test results instead of actual exam
- Students upload failed exam results

**Solution:** Verify "Pass" status and actual certification, not practice

### NDS (National Drug Screening)

**Expected Certificate:**
- NDS logo
- Course title (e.g., "Drug-Free Workplace Training")
- Student name
- Completion date
- Certificate number

**Common Issues:**
- Students upload course enrollment page
- Students upload incomplete training

**Solution:** Verify completion status and certificate number present

---

## Dashboard Features

### Pending Submissions Table

**Columns:**
- **Student** - Name and ID
- **Course / Module** - Which course and external module
- **Partner** - Partner name (Milady, HSI, etc.)
- **Submitted** - Date and time of submission
- **Proof** - Link to view uploaded document
- **Actions** - Approve or Reset buttons

**Sorting:**
- Newest submissions appear first
- Helps prioritize recent submissions

### Recently Approved Section

**Shows:**
- Last 10 approved modules
- Student name
- Module and partner
- Approval date

**Purpose:**
- Quick reference for recent approvals
- Verify your own actions
- Track completion trends

### In Progress Section

**Shows:**
- Students who started but haven't submitted
- Useful for follow-up reminders

---

## Best Practices

### Review Timing

**Goal:** Review within 24 hours of submission

**Why:**
- Students are waiting to complete course
- Delays block certificate issuance
- Timely feedback improves experience

**How:**
- Check dashboard daily
- Set up email notifications (if available)
- Prioritize submissions near course end dates

### Communication

**When Approving:**
- No message needed (system handles it)
- Student sees "Approved" status automatically

**When Resetting:**
- Always explain why
- Be specific about what's needed
- Provide example if helpful

**Example Messages:**

✅ Good:
```
Hi [Student],

I reviewed your Milady RISE submission. Please upload the 
completion certificate (not the enrollment page). The certificate 
should show your name, completion date, and certificate number.

You can find it in your Milady account under "My Certificates."

Thanks!
```

❌ Bad:
```
Invalid certificate. Please resubmit.
```

### Quality Control

**Double-Check:**
- Student name spelling
- Course title exact match
- Completion date is reasonable
- Certificate looks authentic

**Red Flags:**
- Generic template certificates
- Missing key information
- Dates that don't make sense
- Different student name

**When Unsure:**
- Contact partner to verify
- Ask student for additional proof
- Check with supervisor

---

## Troubleshooting

### Problem: Can't View Proof File

**Possible Causes:**
- File was deleted from storage
- Permission issue
- Broken link

**Solution:**
1. Click "✗ Reset"
2. Ask student to re-upload
3. Check storage bucket permissions

### Problem: Student Says They Uploaded But Nothing Shows

**Possible Causes:**
- Upload failed silently
- Browser issue
- File too large

**Solution:**
1. Ask student to try different browser
2. Ask student to compress image if large
3. Verify storage bucket is working

### Problem: Multiple Submissions for Same Module

**Possible Causes:**
- Student uploaded wrong file first
- Student improved quality
- System glitch

**Solution:**
1. Review most recent submission
2. Approve if valid
3. Ignore older submissions

### Problem: Certificate Looks Fake

**Possible Causes:**
- Student created fake certificate
- Student edited real certificate
- Student used template

**Solution:**
1. Contact partner to verify certificate number
2. Ask student for additional proof
3. Escalate to supervisor if suspicious

---

## Reporting

### Track Completion Rates

**Questions to Answer:**
- How many students complete external modules?
- Which partners have highest completion?
- How long does review take on average?

**Data Available:**
- Total submissions
- Approval rate
- Average time to approval
- Completion by partner

### Monthly Report Template

```
External Module Completions - [Month]

Total Submissions: [X]
Approved: [X] ([X]%)
Reset/Rejected: [X] ([X]%)
Pending: [X]

By Partner:
- Milady RISE: [X] approved
- HSI: [X] approved
- CareerSafe: [X] approved
- Certiport: [X] approved
- NDS: [X] approved

Average Review Time: [X] hours
```

---

## Integration with Course Completion

### How It Works

**Course Completion Requirements:**
1. All internal lessons complete
2. All required external modules approved
3. Any other course requirements met

**Certificate Issuance:**
- System checks external module status
- If all approved → certificate issued
- If any pending → certificate blocked

**Credential Stack:**
- Certificate lists all credentials
- Internal + external modules
- Professional presentation

### Example Certificate

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    CERTIFICATE OF COMPLETION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This certifies that JANE DOE has successfully completed

                    CNA TRAINING PROGRAM

Credential Stack:
• Elevate CNA Training Certificate
• HSI CPR, AED & First Aid Certification ✓
• CareerSafe Healthcare Safety Certification ✓
• National Drug Screening Healthcare Compliance ✓

Certificate Number: EFH-ABC123-XYZ789
Issued: December 3, 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## FAQ

### Q: What if a student loses their certificate?

**A:** Ask them to:
1. Log back into partner platform
2. Download certificate again
3. Re-upload to Elevate

Most partners keep certificates in student accounts indefinitely.

### Q: Can I approve without seeing proof?

**A:** No. Always verify proof before approving. This ensures:
- Student actually completed training
- Certificate is authentic
- Credential stack is valid

### Q: What if partner doesn't issue certificates?

**A:** Some partners (like NRF RISE Up) may not issue formal certificates. In these cases:
- Accept completion page screenshot
- Verify completion status clearly shown
- Document in notes field

### Q: How long should I keep proof files?

**A:** Keep indefinitely for:
- Audit purposes
- Verification requests
- Student records

Storage is cheap, verification is valuable.

### Q: Can students appeal a reset?

**A:** Yes. If student believes reset was in error:
1. Review their explanation
2. Re-examine proof
3. Approve if valid
4. Explain decision either way

### Q: What if I accidentally approve wrong submission?

**A:** You can reset it:
1. Find submission in "Recently Approved"
2. Click through to details (if available)
3. Or manually update in database
4. Contact student to explain

---

## Support

### For Admin Questions

**Contact:** Elevate Admin Team
**Email:** admin@elevateforhumanity.org
**Phone:** 317-314-3757

### For Partner Questions

See `PARTNER_CONTACTS.md` for partner-specific contacts.

### For Technical Issues

**Contact:** Technical Support
**Email:** support@elevateforhumanity.org

---

## Summary

✅ **Review daily** - Check pending submissions
✅ **Verify carefully** - Ensure certificates are valid
✅ **Respond quickly** - Approve or reset within 24 hours
✅ **Communicate clearly** - Explain resets with specific guidance
✅ **Track metrics** - Monitor completion rates and review times

**Remember:** You're the final checkpoint before certificate issuance. Your careful review ensures credential integrity and student success.
