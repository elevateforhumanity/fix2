# Milady CIMA Integration - Complete Architecture

## 🎯 What Milady CIMA Provides (Built-In)

### Time Tracking System
Milady CIMA has a **built-in time tracker** that:
- ✅ Tracks student time automatically
- ✅ Records time spent in courses
- ✅ Generates compliance reports
- ✅ Exports for state board requirements
- ✅ No student-reported hours needed

**Students access time tracking through Milady CIMA directly.**

### Course Management
- ✅ Video lessons with progress tracking
- ✅ Assessments and quizzes
- ✅ Completion certificates
- ✅ Mobile access
- ✅ Discussion boards
- ✅ Gradebook

### Reporting
- ✅ Student progress reports
- ✅ Time tracking reports
- ✅ Completion reports
- ✅ Export to PDF/Excel

---

## 🏗️ Your System's Role

### What YOU Should Track:

**1. Practical Skills (Barber-Specific)**
- Haircuts, fades, shaves, beard trims
- Client services performed
- Supervisor approval
- Photo documentation
- Competency levels

**Why:** Milady CIMA tracks theory/video time, but NOT hands-on practical services.

**2. Program Holder Oversight**
- View student progress from Milady
- Approve practical skills
- Add supervisor notes
- Generate combined reports (Milady hours + practical skills)

**3. Enrollment Management**
- Auto-enroll students in Milady CIMA
- Track which RISE courses assigned
- Monitor completion status
- Issue combined certificates

---

## 📊 Data Flow Architecture

### Student Enrollment Flow:
```
1. Student enrolls in Barber Program (Your System)
   ↓
2. Auto-create Milady CIMA account (API)
   ↓
3. Auto-enroll in required RISE courses (API)
   ↓
4. Send welcome email with Milady login
   ↓
5. Student accesses Milady CIMA for:
   - Theory lessons
   - Video training
   - Time tracking (automatic)
   - Assessments
   ↓
6. Student uses YOUR system for:
   - Logging practical services
   - Uploading service photos
   - Viewing combined progress
```

### Time Tracking Flow:
```
Milady CIMA (Automatic)
├── Student watches video lessons
├── CIMA tracks time automatically
├── Student takes assessments
├── CIMA records completion
└── Generates time reports

Your System (Sync)
├── Daily API sync from Milady
├── Pull time tracking data
├── Store in your database
├── Display to program holders
└── Combine with practical hours
```

### Practical Skills Flow:
```
Your System Only
├── Student logs service (haircut, fade, etc.)
├── Uploads before/after photos
├── Submits for approval
├── Program holder reviews
├── Approves/rejects with feedback
└── Counts toward program completion
```

---

## 🔄 API Integration Points

### Milady CIMA API Endpoints:

**1. Student Management**
```
POST /api/v1/students
- Create student account
- Returns: student_id, login_url

GET /api/v1/students/{id}
- Get student details
- Returns: profile, enrollments

PUT /api/v1/students/{id}
- Update student info
```

**2. Enrollment Management**
```
POST /api/v1/enrollments
- Enroll student in course
- Returns: enrollment_id

GET /api/v1/enrollments/{id}
- Get enrollment details
- Returns: status, progress, time_spent

GET /api/v1/enrollments/{id}/progress
- Get detailed progress
- Returns: lessons_completed, time_tracking, assessments
```

**3. Time Tracking**
```
GET /api/v1/enrollments/{id}/time-tracking
- Get time tracking data
- Returns: total_hours, by_date, by_lesson

GET /api/v1/students/{id}/time-summary
- Get overall time summary
- Returns: total_hours, by_course, by_month
```

**4. Certificates**
```
GET /api/v1/enrollments/{id}/certificate
- Get completion certificate
- Returns: certificate_url, issued_date

GET /api/v1/certificates/{id}/download
- Download certificate PDF
```

**5. SSO**
```
POST /api/v1/sso/launch
- Generate SSO launch URL
- Returns: sso_url (time-limited token)
```

---

## 📋 Database Schema Updates

### Keep These Tables:
```sql
-- Sync time data FROM Milady (read-only for you)
CREATE TABLE milady_time_tracking (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id),
  enrollment_id UUID REFERENCES partner_lms_enrollments(id),
  
  -- Synced from Milady
  date DATE NOT NULL,
  hours_spent DECIMAL(5,2),
  lesson_id TEXT,
  lesson_name TEXT,
  activity_type TEXT, -- 'video', 'assessment', 'reading'
  
  -- Sync metadata
  synced_from_milady BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track practical skills (YOUR system)
CREATE TABLE practical_skills_log (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id),
  enrollment_id UUID REFERENCES enrollments(id),
  
  -- Service details
  skill_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  performed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_minutes INTEGER,
  
  -- Client info
  client_identifier TEXT,
  
  -- Quality
  self_rating INTEGER CHECK (self_rating BETWEEN 1 AND 5),
  supervisor_rating INTEGER CHECK (supervisor_rating BETWEEN 1 AND 5),
  
  -- Documentation
  description TEXT,
  before_photo_url TEXT,
  after_photo_url TEXT,
  
  -- Approval
  status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  supervisor_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Remove These Tables:
- ❌ `time_tracking` (use Milady's instead)
- ❌ Manual clock-in/out (Milady handles this)

---

## 🎓 Student Dashboard Components

### What Students See:

**1. Milady CIMA Courses Section**
```
RISE Certifications (Milady CIMA)
├── Client Well-Being & Safety
│   ├── Progress: 45% ████████░░
│   ├── Time Spent: 1.5 / 3.5 hours
│   ├── Last Accessed: 2 days ago
│   └── [Launch Course →] (SSO button)
└── Finance Fundamentals
    ├── Progress: 0% ░░░░░░░░░░
    ├── Time Spent: 0 / 4 hours
    ├── Not Started
    └── [Launch Course →]
```

**2. Practical Skills Section**
```
Practical Services (Your System)
├── Haircuts: 45 / 200 ████░░░░░░ 22%
├── Fades: 23 / 100 ██░░░░░░░░ 23%
├── Shaves: 8 / 50 █░░░░░░░░░ 16%
└── [Log New Service] button
```

**3. Combined Progress**
```
Overall Program Progress
├── Theory (Milady): 45% complete
├── Practical (Your System): 22% complete
└── Total: 33% complete
```

---

## 👨‍🏫 Program Holder Dashboard

### What Program Holders See:

**1. Student Overview**
```
John Doe - Barber Apprenticeship
├── Milady CIMA Progress
│   ├── Total Hours: 45.5 / 2000
│   ├── RISE Courses: 1/2 complete
│   └── Last Active: Today
├── Practical Skills
│   ├── Services Logged: 76
│   ├── Pending Approval: 3
│   └── Competency: Intermediate
└── Overall: 33% complete
```

**2. Time Tracking (From Milady)**
```
Time Tracking (Synced from Milady CIMA)
Date       | Hours | Activity
-----------|-------|------------------
12/10/2024 | 3.5   | Video Lessons
12/09/2024 | 2.0   | Assessments
12/08/2024 | 4.0   | Theory Modules
Total: 45.5 hours
```

**3. Practical Skills (Your System)**
```
Pending Approval
Service      | Date       | Student Rating | Photos
-------------|------------|----------------|-------
Fade         | 12/10/2024 | ⭐⭐⭐⭐⭐      | [View]
Haircut      | 12/10/2024 | ⭐⭐⭐⭐        | [View]
Beard Trim   | 12/09/2024 | ⭐⭐⭐⭐⭐      | [View]

[Approve All] [Review Individually]
```

---

## 🔄 Sync Process

### Daily Cron Job (Your System):
```javascript
// Run daily at 2 AM
async function syncMiladyData() {
  // 1. Get all active Milady enrollments
  const enrollments = await getActiveMiladyEnrollments();
  
  for (const enrollment of enrollments) {
    // 2. Fetch progress from Milady API
    const progress = await miladyAPI.getProgress(enrollment.external_enrollment_id);
    
    // 3. Update your database
    await updateEnrollmentProgress(enrollment.id, {
      progress_percentage: progress.completion_percentage,
      time_spent_hours: progress.total_time_hours,
      last_accessed_at: progress.last_accessed,
    });
    
    // 4. Fetch time tracking details
    const timeData = await miladyAPI.getTimeTracking(enrollment.external_enrollment_id);
    
    // 5. Store time tracking data
    await syncTimeTrackingData(enrollment.id, timeData);
    
    // 6. Check for completion
    if (progress.status === 'completed' && !enrollment.certificate_id) {
      const cert = await miladyAPI.getCertificate(enrollment.external_enrollment_id);
      await storeCertificate(enrollment.id, cert);
      await sendCertificateEmail(enrollment.student_id);
    }
  }
}
```

---

## ✅ Implementation Checklist

### Phase 1: Milady Integration (Week 1)
- [x] Milady API integration code exists
- [ ] Create SSO launch functionality
- [ ] Build student dashboard with Milady courses
- [ ] Test SSO launch to Milady CIMA
- [ ] Auto-enroll students in RISE courses

### Phase 2: Data Sync (Week 2)
- [ ] Build daily sync cron job
- [ ] Create `milady_time_tracking` table
- [ ] Sync progress data from Milady
- [ ] Sync time tracking data
- [ ] Sync certificates

### Phase 3: Practical Skills (Week 3)
- [ ] Build practical skills log page
- [ ] Photo upload functionality
- [ ] Approval workflow for program holders
- [ ] Skill requirements tracking
- [ ] Progress calculations

### Phase 4: Program Holder Tools (Week 4)
- [ ] Enhanced program holder dashboard
- [ ] View Milady progress for students
- [ ] Approve practical skills
- [ ] Combined reporting
- [ ] Export capabilities

---

## 📞 Milady Support

**For Time Tracking Questions:**
- Milady Support: 866-848-5143
- Hours: Mon-Fri, 8am-6pm EST
- Email: jessica.boyd@milady.com

**For API Integration:**
- Check Milady API documentation
- Request API credentials if needed
- Test in sandbox environment first

---

## 🎯 Summary

**Milady CIMA Handles:**
- ✅ Theory/video time tracking (automatic)
- ✅ Course progress
- ✅ Assessments
- ✅ Certificates for RISE courses
- ✅ Compliance reporting

**Your System Handles:**
- ✅ Practical skills logging
- ✅ Service tracking (haircuts, fades, etc.)
- ✅ Photo documentation
- ✅ Supervisor approval
- ✅ Combined progress view
- ✅ Program holder oversight

**Integration:**
- ✅ SSO launch to Milady CIMA
- ✅ Daily sync of progress/time data
- ✅ Combined reporting
- ✅ Unified student experience
