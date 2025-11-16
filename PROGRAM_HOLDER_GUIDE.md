# Program Holder System Guide
**Elevate for Humanity - Complete Documentation**

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [System Overview](#system-overview)
3. [Student Management](#student-management)
4. [Course Management](#course-management)
5. [Progress Tracking](#progress-tracking)
6. [Reporting & Compliance](#reporting--compliance)
7. [Certificate Management](#certificate-management)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Initial Setup

**Step 1: Complete Your Profile**
- Navigate to `/program-holder/dashboard`
- Fill out your organization information
- Add contact details and address
- Upload your logo (optional)

**Step 2: Program Configuration**
- Add program name and description
- Set duration (hours/weeks)
- Configure CIP/SOC codes for workforce alignment
- Select funding eligibility (WIOA, WRG, JRI, etc.)

**Step 3: Set Up Courses**
- Create course modules
- Add lessons and content
- Upload videos (YouTube, Vimeo, or MP4)
- Create assessments and quizzes

---

## System Overview

### Dashboard Features

**Main Dashboard** (`/program-holder/dashboard`)
- Overview of active enrollments
- Recent student activity
- Pending approvals
- Quick stats (total students, completions, certificates)

**Navigation Menu**
- **Dashboard**: Main overview
- **Enrollments**: Manage student enrollments
- **Courses**: Create and manage course content
- **Reports**: Generate compliance reports
- **Certificates**: Issue and manage certificates
- **Training**: Access training resources

---

## Student Management

### Enrolling Students

**Manual Enrollment**
1. Go to Enrollments section
2. Click "Add New Enrollment"
3. Enter student information:
   - Full name
   - Email address
   - Phone number
   - Funding source (WIOA, WRG, JRI)
   - Case manager (if applicable)
4. Select course/program
5. Verify eligibility
6. Submit enrollment

**Bulk Enrollment**
- Upload CSV file with student data
- System validates and imports
- Review and approve batch

**Enrollment Verification**
- System checks for duplicate enrollments
- Validates funding eligibility
- Generates enrollment confirmation
- Sends welcome email to student

### Managing Student Records

**Student Profile**
- View complete student information
- See enrollment history
- Track progress across courses
- Access case notes

**Case Notes**
- Document student interactions
- Track barriers and challenges
- Record follow-up actions
- Maintain compliance documentation

---

## Course Management

### Creating Courses

**Course Structure**
```
Program
  └── Course
       └── Module 1
            ├── Lesson 1 (Video)
            ├── Lesson 2 (Document)
            └── Quiz 1
       └── Module 2
            ├── Lesson 3 (Video)
            └── Quiz 2
```

**Adding Video Content**

**Option 1: YouTube**
1. Upload video to YouTube
2. Copy video URL (e.g., `https://youtube.com/watch?v=VIDEO_ID`)
3. Paste URL in lesson content field
4. Set content type to "video"

**Option 2: Vimeo**
1. Upload video to Vimeo
2. Copy video URL (e.g., `https://vimeo.com/VIDEO_ID`)
3. Paste URL in lesson content field
4. Set content type to "video"

**Option 3: Direct Upload**
1. Upload MP4 file to `/public/videos/lessons/`
2. Use path `/videos/lessons/filename.mp4`
3. Set content type to "video"

**Video Player Features**
- Auto-play on scroll (optional)
- Progress tracking (80% = completion)
- Branded overlays with program info
- Mobile-responsive design

### Creating Assessments

**Quiz Setup**
1. Create quiz in course module
2. Add questions (multiple choice, true/false)
3. Set passing score (e.g., 70%)
4. Configure retake policy
5. Set as required or optional

**Assessment Types**
- Multiple choice
- True/False
- Short answer
- Essay (manual grading)

---

## Progress Tracking

### Student Progress Dashboard

**Lesson Completion**
- View which lessons students have completed
- See video watch time
- Check quiz scores
- Monitor overall progress percentage

**Progress Indicators**
- ✅ Completed (green)
- 🔄 In Progress (yellow)
- ⏸️ Not Started (gray)
- ❌ Failed (red - needs retake)

### Automated Tracking

**Video Progress**
- System automatically tracks when students watch videos
- Marks lesson complete at 80% watched
- Saves progress to database
- Updates course completion status

**Quiz Progress**
- Tracks quiz attempts
- Records scores
- Flags failed attempts
- Allows retakes (if configured)

### Course Completion

**Completion Criteria**
- All required lessons completed
- All required quizzes passed
- Minimum time requirements met (if applicable)

**Completion View**
The system uses `course_completion_status` view to calculate:
- Total required lessons
- Completed required lessons
- Overall completion percentage
- Eligibility for certificate

---

## Reporting & Compliance

### WIOA Compliance Reports

**Required Data Points**
- Student demographics
- Enrollment dates
- Attendance records
- Progress milestones
- Completion status
- Employment outcomes (if tracked)

**Generating Reports**
1. Go to Reports section
2. Select report type (WIOA, WRG, JRI)
3. Choose date range
4. Select filters (program, funding source)
5. Generate report
6. Export as CSV or PDF

### Export Options

**CSV Export**
- All enrollments
- Student progress
- Completion data
- Certificate records

**Report Formats**
- WIOA Performance Report
- WRG Quarterly Report
- JRI Participant Tracking
- Custom reports

### Data Fields Included

**Enrollment Data**
- Student ID
- Name
- Email
- Phone
- Enrollment date
- Funding source
- Case manager
- Program/Course

**Progress Data**
- Lessons completed
- Quiz scores
- Attendance hours
- Completion date
- Certificate number

---

## Certificate Management

### Certificate Generation

**Automatic Generation**
The system automatically generates certificates when:
1. Student completes all required lessons
2. All quizzes passed with minimum score
3. Course completion verified by system

**Manual Generation**
1. Go to student profile
2. Click "Generate Certificate"
3. System checks completion status
4. If complete → generates certificate
5. If incomplete → shows missing requirements

**Certificate Details**
- Certificate number (unique)
- Verification code (10 characters)
- Student name
- Course title
- Program name
- Hours completed
- Issue date
- Issuer signature

### Certificate Verification

**Verification Process**
1. Anyone can verify certificate at `/verify`
2. Enter certificate number or verification code
3. System displays certificate details
4. Shows issue date and validity

**Certificate Security**
- Unique verification codes
- Tamper-proof PDF generation
- Blockchain verification (optional)
- QR code for quick verification

---

## Best Practices

### Content Organization

**✅ DO:**
- Organize content into logical modules
- Keep lessons short (5-15 minutes)
- Use clear, descriptive titles
- Mark required vs optional lessons
- Provide learning objectives

**❌ DON'T:**
- Create overly long lessons (>30 min)
- Skip lesson descriptions
- Forget to mark required lessons
- Upload low-quality videos

### Student Engagement

**Communication**
- Send welcome email on enrollment
- Weekly progress check-ins
- Reminder emails for incomplete lessons
- Congratulations on completion

**Support**
- Respond to student questions within 24 hours
- Provide clear instructions
- Offer office hours or live support
- Create FAQ document

### Data Management

**Regular Tasks**
- Export data weekly for backup
- Review progress reports weekly
- Update case notes after each interaction
- Generate compliance reports monthly

**Data Quality**
- Verify student information on enrollment
- Keep contact information updated
- Document all student interactions
- Maintain accurate attendance records

---

## Troubleshooting

### Common Issues

**Issue: Video Not Playing**
- **Solution**: Check video URL is correct
- Verify video is public (not private)
- Test URL in browser first
- Use YouTube or Vimeo for best results

**Issue: Student Can't Enroll**
- **Solution**: Check if already enrolled
- Verify email address is correct
- Check funding eligibility
- Ensure course is published

**Issue: Certificate Won't Generate**
- **Solution**: Check course completion status
- Verify all required lessons completed
- Check quiz passing scores
- Review system completion view

**Issue: Progress Not Tracking**
- **Solution**: Ensure student is logged in
- Check video player is working
- Verify lesson has `lessonId` set
- Check database connection

### Getting Help

**Support Channels**
- **Email**: support@elevateforhumanity.org
- **Phone**: 317-314-3757
- **Training**: `/program-holder/training`
- **Documentation**: This guide

**Support Hours**
- Monday-Friday: 9 AM - 5 PM EST
- Response time: Within 24 hours
- Emergency support: Available

---

## Quick Reference

### Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/program-holder/dashboard` | Main overview |
| Training | `/program-holder/training` | Training resources |
| How to Use | `/program-holder/how-to-use` | System guide |
| Enrollments | `/program-holder/enrollments` | Manage students |
| Reports | `/program-holder/reports` | Generate reports |
| Certificates | `/program-holder/certificates` | Manage certificates |

### Keyboard Shortcuts

- `Ctrl + S` - Save changes
- `Ctrl + E` - New enrollment
- `Ctrl + R` - Generate report
- `Ctrl + /` - Search

### Support Contacts

- **Technical Support**: support@elevateforhumanity.org
- **Training Questions**: training@elevateforhumanity.org
- **Billing**: billing@elevateforhumanity.org
- **General Inquiries**: 317-314-3757

---

## Appendix

### Glossary

- **CIP Code**: Classification of Instructional Programs code
- **SOC Code**: Standard Occupational Classification code
- **WIOA**: Workforce Innovation and Opportunity Act
- **WRG**: Workforce Ready Grant
- **JRI**: Justice Reinvestment Initiative
- **ETPL**: Eligible Training Provider List
- **LMS**: Learning Management System

### Compliance Requirements

**WIOA Requirements**
- Participant eligibility verification
- Attendance tracking
- Progress documentation
- Outcome reporting
- Performance metrics

**WRG Requirements**
- Pre-enrollment assessment
- Training plan documentation
- Progress milestones
- Completion verification
- Employment outcomes

**JRI Requirements**
- Reentry population focus
- Barrier documentation
- Support services tracking
- Recidivism prevention
- Employment placement

---

**Last Updated**: November 2024  
**Version**: 1.0  
**Contact**: support@elevateforhumanity.org
