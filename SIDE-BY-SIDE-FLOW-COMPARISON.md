# Side-by-Side Flow Comparison: Elevate vs Competitors

## Executive Summary

This document compares the **user flow**, **functional logic**, and **design patterns** of Elevate for Humanity against major workforce development platforms. The analysis reveals that while competitors excel at marketing and brand presentation, **Elevate is the only platform that combines operational workflow automation with public funding management**.

---

## 1. WORKDAY HCM - Enterprise HR Management

### Primary Function

Enterprise human capital management for existing employees

### User Flow

```
EMPLOYER JOURNEY:
1. Contact Sales → Enterprise pricing discussion
2. Implementation (6-12 months with consultants)
3. Data migration from legacy systems
4. Employee onboarding to platform
5. Ongoing management and reporting

EMPLOYEE JOURNEY:
1. Employer provides access
2. Complete profile
3. Access HR functions (payroll, benefits, time tracking)
4. Performance reviews
5. Learning modules (if enabled)
```

### Key Features

- **Core HCM**: Employee records, org charts, compensation
- **Talent Management**: Performance reviews, succession planning
- **Workforce Management**: Time tracking, scheduling
- **Payroll**: Global payroll processing
- **Analytics**: Workforce insights and reporting

### Design Pattern

- **Enterprise dashboard**: Complex, data-heavy interface
- **Role-based access**: Different views for HR, managers, employees
- **Integration-first**: Connects to existing enterprise systems
- **Mobile app**: iOS/Android for employee self-service

### Logic Flow

```
IF employee exists in system
  THEN provide access to HR functions
ELSE
  THEN onboard through employer
END

IF manager role
  THEN show team management tools
END

IF HR admin
  THEN show full system access
END
```

### What They DON'T Do

❌ Workforce development training
❌ Public funding management (WIOA/WRG/JRI)
❌ Apprenticeship hour tracking
❌ DOL compliance reporting
❌ Job placement for unemployed individuals
❌ Training site coordination

### Price Point

- $100-300 per employee per year
- Enterprise-only (minimum 1,000+ employees)
- Implementation costs: $500K-$5M+

---

## 2. COURSERA FOR BUSINESS - Online Learning Platform

### Primary Function

Video-based online learning and certification

### User Flow

```
BUSINESS JOURNEY:
1. Browse catalog → Select plan (Teams or Enterprise)
2. Purchase licenses (5-125 or 125+)
3. Invite employees via email
4. Assign learning paths
5. Track completion rates

LEARNER JOURNEY:
1. Receive invitation from employer
2. Create account
3. Browse 10,600+ courses
4. Watch videos → Complete quizzes
5. Earn certificates
6. Add to LinkedIn profile
```

### Key Features

- **Course Library**: 10,600+ courses, 1,400+ specializations
- **Skill Tracks**: Data, IT, GenAI, Business
- **Certificates**: Professional certificates from universities
- **Video Learning**: Pre-recorded lectures
- **Assessments**: Quizzes and projects
- **Mobile App**: Learn on-the-go

### Design Pattern

- **Netflix-style interface**: Browse, search, recommend
- **Video-first**: All content is video-based
- **Self-paced**: No live instruction
- **Gamification**: Badges, certificates, progress bars
- **Social proof**: Ratings, reviews, enrollment numbers

### Logic Flow

```
IF user searches "Data Analysis"
  THEN show relevant courses sorted by popularity
END

IF user completes course
  THEN award certificate
  AND suggest next course in path
END

IF employer assigns course
  THEN notify user
  AND track completion
END
```

### What They DON'T Do

❌ Hands-on/apprenticeship training
❌ Funding management (WIOA/WRG/JRI)
❌ Hour tracking for DOL compliance
❌ Site/employer coordination
❌ Job placement services
❌ Payment processing for training providers
❌ Live instruction or mentorship

### Price Point

- Teams (5-125): Self-serve, ~$399/user/year
- Enterprise (125+): Custom pricing, contact sales
- Free for learners (employer-paid)

---

## 3. APPRENTICESHIP.GOV - Federal Information Portal

### Primary Function

Information hub and registration system for DOL apprenticeships

### User Flow

```
CAREER SEEKER JOURNEY:
1. Visit homepage
2. Use Apprenticeship Finder (job board)
3. Browse by location/industry
4. Apply directly to employer
5. Verify apprenticeship status (after hired)

EMPLOYER JOURNEY:
1. Learn about apprenticeships
2. Express interest in starting program
3. Find partners (intermediaries)
4. Use Standards Builder tool
5. Register program with DOL (RAPIDS)
6. Post jobs to finder
7. Manage apprentices in RAPIDS system

EDUCATOR JOURNEY:
1. Learn about apprenticeship model
2. Find partners
3. Explore occupation standards
```

### Key Features

- **Apprenticeship Finder**: Job board for registered apprenticeships
- **Standards Builder**: Tool to create occupation standards
- **Partner Finder**: Directory of intermediaries
- **Occupation Finder**: Browse 1,000+ apprenticeable occupations
- **RAPIDS**: Registration and tracking system (separate login)
- **Data & Statistics**: National apprenticeship data
- **Resources**: Guides, fact sheets, videos

### Design Pattern

- **Government portal**: Information-heavy, text-based
- **Tool-based**: Separate tools for different functions
- **Directory-style**: Lists and search functions
- **No user accounts**: Public information only
- **RAPIDS separate**: Actual management in different system

### Logic Flow

```
IF career seeker
  THEN show job finder
  AND show "how to become an apprentice"
END

IF employer
  THEN show "how to start a program"
  AND show partner finder
  AND show standards builder
END

IF registered sponsor
  THEN redirect to RAPIDS for management
END
```

### What They DON'T Do

❌ Training delivery
❌ Hour tracking (done in RAPIDS, separate system)
❌ Funding management
❌ Enrollment automation
❌ Payment processing
❌ Site coordination
❌ Student management
❌ Job placement beyond job board

### Price Point

- Free (government service)
- No operational tools included
- RAPIDS access for registered sponsors only

---

## 4. YEAR UP - Training Provider with National Brand

### Primary Function

Direct training delivery with corporate internships

### User Flow

```
STUDENT JOURNEY:
1. Visit website → Learn about program
2. Explore training paths (4 pathways)
3. Check locations (20+ campuses)
4. Apply online
5. Interview and assessment
6. Acceptance (competitive)
7. 6-month training (virtual + in-person)
8. 6-month internship with corporate partner
9. Job placement or college enrollment
10. Alumni network access

CORPORATE PARTNER JOURNEY:
1. Learn about partnership
2. Contact sales
3. Discuss hiring needs
4. Commit to internships
5. Receive trained interns
6. Hire graduates
```

### Key Features

- **4 Career Pathways**: Business, IT, Finance, Sales
- **Training + Internship**: 6 months each
- **Stipend**: Students receive weekly stipend
- **Corporate Partners**: JPMorgan, Microsoft, LinkedIn, Salesforce
- **College Credits**: Earn credits toward degree
- **Alumni Network**: Ongoing support
- **20+ Locations**: Major cities nationwide

### Design Pattern

- **Marketing-first**: Emotional storytelling, video testimonials
- **Clear 3-step process**: Train → Experience → Access
- **Social proof**: Alumni stories, partner logos, stats
- **Application funnel**: Multi-step application process
- **Brand-heavy**: Strong visual identity, professional photography

### Logic Flow

```
IF student applies
  THEN assess eligibility (age 18-29, HS diploma, income-qualified)
  IF eligible
    THEN interview
    IF accepted
      THEN enroll in next cohort
      THEN complete 6-month training
      THEN match to corporate internship
      THEN support job placement
    END
  END
END

IF corporate partner
  THEN receive trained interns
  AND hire graduates
END
```

### What They DON'T Do

❌ Platform for other providers (not white-label)
❌ Multi-program management (only 4 pathways)
❌ Apprenticeship tracking (internships, not apprenticeships)
❌ Funding automation (manual WIOA coordination)
❌ Site coordination tools
❌ Technology platform for scaling

### Price Point

- Free for students (funded by corporate sponsors + government)
- Corporate partners pay for internships
- Not a platform (direct service only)

---

## 5. PER SCHOLAS - Tech Training Provider

### Primary Function

No-cost tech training with job placement

### User Flow

```
LEARNER JOURNEY:
1. Visit website → Browse courses
2. Select course (7 tech courses)
3. Choose location (25+ locations)
4. Apply online
5. Assessment and interview
6. Acceptance
7. 12-16 week training (full-time, in-person or remote)
8. Earn industry certifications
9. Job placement assistance
10. Alumni support

EMPLOYER JOURNEY:
1. Visit Tech Talent Solutions site
2. Learn about hiring services
3. Contact sales
4. Discuss hiring needs
5. Receive qualified candidates
6. Hire graduates
```

### Key Features

- **7 Tech Courses**: Cybersecurity, IT Support, Software Engineering, AWS, Salesforce, Data Center, AI Tools
- **Industry Certifications**: CompTIA, AWS, Salesforce
- **AI-Enabled Training**: Modern curriculum
- **25+ Locations**: Nationwide presence
- **30,000+ Alumni**: 30-year track record
- **85% Employment Rate**: Strong outcomes
- **$65K Average Salary**: High-paying jobs

### Design Pattern

- **Course catalog**: Browse by technology
- **Location-based**: Choose local campus
- **Outcome-focused**: Stats and alumni stories prominent
- **Professional branding**: Clean, modern design
- **Partner logos**: Where alumni work
- **30-year anniversary**: Trust and credibility

### Logic Flow

```
IF learner applies
  THEN assess eligibility (18+, authorized to work, motivated)
  IF eligible
    THEN interview
    IF accepted
      THEN enroll in next cohort
      THEN complete 12-16 week training
      THEN earn certifications
      THEN job placement support
    END
  END
END

IF employer needs tech talent
  THEN connect with Tech Talent Solutions
  AND hire graduates
END
```

### What They DON'T Do

❌ Platform for other providers
❌ Non-tech programs (tech-only)
❌ Apprenticeship tracking
❌ Funding automation
❌ Site coordination tools
❌ White-label capability

### Price Point

- Free for learners (funded by corporate sponsors + foundations + government)
- Employers pay for hiring services
- Not a platform (direct service only)

---

## 6. ELEVATE FOR HUMANITY - Workforce Operating System

### Primary Function

Unified platform for workforce development with public funding automation

### User Flow

```
STUDENT JOURNEY:
1. Visit website → Browse 15+ programs
2. Check eligibility (WIOA/WRG/JRI)
3. Apply online
4. Automated eligibility check
5. Approval workflow
6. Enroll in program (8-16 weeks)
7. Training (internal or partner-delivered)
8. Apprenticeship (if applicable) with hour tracking
9. Site coordination and attendance
10. Certification/completion
11. Job placement tracking
12. Ongoing support

PARTNER/SITE JOURNEY:
1. Partner portal login
2. View assigned students
3. Track attendance
4. Submit weekly reports
5. Upload documents
6. Track payment milestones
7. View compliance status

ADMIN JOURNEY:
1. Dashboard with all students
2. Manage enrollments
3. Process funding (WIOA/WRG/JRI)
4. Track DOL hours (apprenticeships)
5. Generate compliance reports
6. Process payments (Stripe)
7. Monitor site performance
8. Export data for state reporting

EMPLOYER JOURNEY:
1. Browse available graduates
2. Post job openings
3. Receive matched candidates
4. Hire graduates
5. Track placement outcomes
```

### Key Features

- **15+ Programs**: Multiple industries (barber, HVAC, CNA, business, tax, tech, etc.)
- **Public Funding Management**: WIOA, WRG, JRI automation
- **DOL Apprenticeship Tracking**: Hour tracking, wage progression, competencies
- **Partner Portal**: Site coordination, attendance, reporting
- **Enrollment Automation**: Application → approval → payment
- **Stripe Integration**: Payment processing
- **Compliance Reporting**: FERPA, DOL, WIOA, state reporting
- **Student Dashboard**: Progress tracking, documents, schedule
- **Admin Dashboard**: Full system management
- **Job Placement Tracking**: Employment outcomes

### Design Pattern

- **Multi-role platform**: Student, partner, admin, employer views
- **Workflow automation**: Funding → enrollment → training → placement
- **Dashboard-centric**: Real-time data and actions
- **Compliance-first**: Built-in FERPA, DOL, WIOA compliance
- **Integration-ready**: Stripe, Supabase, external LMS
- **Mobile-responsive**: Works on all devices

### Logic Flow

```
IF student applies
  THEN check eligibility (WIOA/WRG/JRI)
  IF eligible
    THEN automated approval workflow
    THEN process funding
    THEN enroll in program
    IF apprenticeship
      THEN track DOL hours (OJT + RI)
      AND track wage progression
      AND coordinate with site
    END
    THEN track attendance
    THEN track completion
    THEN track job placement
  END
END

IF partner logs in
  THEN show assigned students
  AND allow attendance tracking
  AND allow document upload
  AND show payment status
END

IF admin
  THEN show all students
  AND manage enrollments
  AND process payments
  AND generate reports
END

IF employer
  THEN show available graduates
  AND allow job posting
  AND track hires
END
```

### What Elevate DOES That Others Don't

✅ **Unified Platform**: One system for everything
✅ **Public Funding Automation**: WIOA/WRG/JRI workflows
✅ **DOL Apprenticeship Tracking**: Hour tracking, compliance
✅ **Partner Portal**: Site coordination tools
✅ **Multi-Program Management**: 15+ different programs
✅ **Enrollment Automation**: Application to payment
✅ **Payment Processing**: Stripe integration
✅ **Compliance Reporting**: Automated state/federal reports
✅ **Job Placement Tracking**: Employment outcomes
✅ **White-Label Capability**: Can license to other providers

### Price Point

- Free for students (publicly funded)
- $29-99/month for partners (tiered pricing)
- White-label licensing for other providers
- Scalable business model

---

## SIDE-BY-SIDE COMPARISON TABLE

| Feature                     | Elevate                    | Workday              | Coursera             | Apprenticeship.gov         | Year Up              | Per Scholas             |
| --------------------------- | -------------------------- | -------------------- | -------------------- | -------------------------- | -------------------- | ----------------------- |
| **PRIMARY FUNCTION**        | Workforce Operating System | Enterprise HR        | Online Learning      | Info Portal                | Training Provider    | Training Provider       |
| **TARGET USER**             | Unemployed/Underemployed   | Current Employees    | Current Employees    | Career Seekers + Employers | Young Adults (18-29) | Career Changers         |
| **FUNDING MODEL**           | Public (WIOA/WRG/JRI)      | Employer-Paid        | Employer-Paid        | Government                 | Corporate + Gov      | Corporate + Foundations |
| **TRAINING DELIVERY**       | Internal + Partners        | Learning Modules     | Video Courses        | None (info only)           | Direct (6 months)    | Direct (12-16 weeks)    |
| **PROGRAM VARIETY**         | 15+ programs               | N/A                  | 10,600+ courses      | 1,000+ occupations         | 4 pathways           | 7 tech courses          |
| **APPRENTICESHIP TRACKING** | ✅ Full DOL tracking       | ❌                   | ❌                   | ⚠️ RAPIDS only             | ❌ Internships only  | ❌                      |
| **FUNDING AUTOMATION**      | ✅ WIOA/WRG/JRI            | ❌                   | ❌                   | ❌                         | ⚠️ Manual            | ⚠️ Manual               |
| **PARTNER PORTAL**          | ✅ Full portal             | ⚠️ Vendor mgmt       | ❌                   | ❌                         | ❌                   | ❌                      |
| **PAYMENT PROCESSING**      | ✅ Stripe                  | ✅ Payroll           | ✅ Subscriptions     | ❌                         | ❌                   | ❌                      |
| **JOB PLACEMENT**           | ✅ Tracking                | ❌                   | ❌                   | ⚠️ Job board               | ✅ Direct            | ✅ Direct               |
| **COMPLIANCE REPORTING**    | ✅ Automated               | ✅ HR compliance     | ❌                   | ⚠️ RAPIDS                  | ⚠️ Manual            | ⚠️ Manual               |
| **WHITE-LABEL**             | ✅ Yes                     | ❌                   | ❌                   | ❌                         | ❌                   | ❌                      |
| **MOBILE APP**              | ⚠️ Responsive web          | ✅ Native apps       | ✅ Native apps       | ❌                         | ❌                   | ❌                      |
| **LOCATIONS**               | Indianapolis               | Global               | Global               | National                   | 20+ cities           | 25+ cities              |
| **PRICE (STUDENT)**         | Free                       | N/A                  | Free (employer pays) | Free                       | Free                 | Free                    |
| **PRICE (EMPLOYER)**        | $29-99/mo                  | $100-300/employee/yr | $399/user/yr         | Free                       | Partnership fee      | Partnership fee         |
| **IMPLEMENTATION**          | Self-serve                 | 6-12 months          | Immediate            | N/A                        | N/A                  | N/A                     |

---

## KEY INSIGHTS

### 1. WORKDAY: Enterprise HR, Not Workforce Development

**Flow**: Employee management → Performance → Payroll → Analytics
**Logic**: Manage existing employees, not train unemployed individuals
**Gap**: No workforce development, no public funding, no apprenticeship tracking

### 2. COURSERA: Online Learning, Not Operational

**Flow**: Browse courses → Watch videos → Earn certificates
**Logic**: Self-paced learning, no live instruction, no job placement
**Gap**: No hands-on training, no funding management, no site coordination

### 3. APPRENTICESHIP.GOV: Information Portal, Not Management System

**Flow**: Learn about apprenticeships → Find partners → Register program
**Logic**: Information and registration, actual management in RAPIDS (separate)
**Gap**: No training delivery, no funding management, no operational tools

### 4. YEAR UP: Direct Service, Not Platform

**Flow**: Apply → Train 6 months → Intern 6 months → Get hired
**Logic**: Direct training delivery, corporate partnerships, strong brand
**Gap**: Not a platform, limited programs, no technology for scaling

### 5. PER SCHOLAS: Tech Training, Not Multi-Industry

**Flow**: Apply → Train 12-16 weeks → Get certified → Get hired
**Logic**: Tech-only, direct service, strong outcomes
**Gap**: Not a platform, tech-only, no apprenticeship tracking

### 6. ELEVATE: Only Unified Workforce Operating System

**Flow**: Apply → Funding → Training → Apprenticeship → Placement
**Logic**: End-to-end automation, public funding, DOL compliance, multi-program
**Advantage**: Only platform that does it all in one system

---

## WHAT MAKES ELEVATE UNIQUE

### 1. UNIFIED WORKFLOW

**Others**: Separate systems for funding, training, tracking, reporting
**Elevate**: One platform for entire workflow

### 2. PUBLIC FUNDING AUTOMATION

**Others**: Manual WIOA/WRG/JRI coordination
**Elevate**: Automated eligibility, approval, payment processing

### 3. DOL APPRENTICESHIP COMPLIANCE

**Others**: No tracking or RAPIDS-only (separate system)
**Elevate**: Built-in hour tracking, wage progression, competencies

### 4. PARTNER COORDINATION

**Others**: No tools for site coordination
**Elevate**: Full partner portal with attendance, reporting, documents

### 5. MULTI-PROGRAM FLEXIBILITY

**Others**: Limited to specific industries or pathways
**Elevate**: 15+ programs across multiple industries

### 6. WHITE-LABEL CAPABILITY

**Others**: Direct service only
**Elevate**: Can license platform to other providers

### 7. SCALABLE BUSINESS MODEL

**Others**: Dependent on corporate sponsors or government grants
**Elevate**: Multiple revenue streams (public funding + partner fees + licensing)

---

## WHAT ELEVATE NEEDS TO COMPETE

### 1. BRAND RECOGNITION (Like Year Up/Per Scholas)

**Current**: Local Indianapolis brand
**Needed**: National presence, marketing, PR

### 2. GRADUATE OUTCOMES DATA (Like Year Up/Per Scholas)

**Current**: Limited public data
**Needed**: Published employment rates, salaries, completion rates

### 3. MOBILE APPS (Like Workday/Coursera)

**Current**: Responsive web only
**Needed**: Native iOS/Android apps

### 4. CORPORATE PARTNERSHIPS (Like Year Up)

**Current**: Local employers
**Needed**: Fortune 500 partnerships, national hiring network

### 5. MULTI-STATE EXPANSION (Like Per Scholas)

**Current**: Indianapolis only
**Needed**: 5-10 locations across multiple states

### 6. AI-POWERED FEATURES (Like Coursera)

**Current**: Manual processes
**Needed**: AI job matching, eligibility checking, career counseling

---

## BOTTOM LINE

**Elevate for Humanity is the only Workforce Operating System that combines:**

1. Public funding management (WIOA/WRG/JRI)
2. DOL apprenticeship tracking
3. Training delivery (internal + partners)
4. Site coordination tools
5. Enrollment automation
6. Payment processing
7. Compliance reporting
8. Job placement tracking

**No other platform does all of this in one system.**

**To dominate the market, Elevate needs:**

1. National brand recognition
2. Published graduate outcomes
3. Mobile apps
4. Corporate partnerships
5. Multi-state expansion
6. AI-powered automation

**Timeline**: 12-18 months to national leadership
**Investment**: $2-5M for expansion
**Outcome**: The Workday of Workforce Development
