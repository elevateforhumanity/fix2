# Moodle + Docebo Hybrid Architecture for EFH

## Executive Summary

**Goal**: Combine Moodle's vocational training strengths with Docebo's polished UI  
**Approach**: Custom-built LMS with best features from both platforms  
**Result**: Enterprise-grade vocational training platform at zero licensing cost

---

## 1. Moodle's Vocational Training Strengths

### A. Apprenticeship Support

**Moodle Features**:

```
┌─────────────────────────────────────────────────────────┐
│ MOODLE APPRENTICESHIP MODULE                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ COMPETENCY FRAMEWORK                             │  │
│  │ - Define competencies per trade                  │  │
│  │ - Map to course activities                       │  │
│  │ - Track mastery levels                           │  │
│  │ - Evidence collection                            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ON-THE-JOB TRAINING (OJT) TRACKING               │  │
│  │ - Log work hours                                 │  │
│  │ - Supervisor sign-offs                           │  │
│  │ - Skills assessment                              │  │
│  │ - Progress reports                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ RELATED INSTRUCTION (RI) TRACKING                │  │
│  │ - Classroom hours                                │  │
│  │ - Online learning                                │  │
│  │ - Assessments                                    │  │
│  │ - Completion certificates                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Benefits**:

- ✅ Built-in competency framework
- ✅ OJT hour tracking
- ✅ Supervisor approval workflows
- ✅ Evidence portfolio system
- ✅ Compliance reporting

### B. Customizable Workflows

**Moodle Workflow Engine**:

```php
// Example: Apprenticeship Approval Workflow
Workflow Steps:
1. Student submits OJT hours
2. Supervisor reviews and approves
3. Instructor verifies competency
4. Admin certifies completion
5. Certificate auto-generated
6. State reporting triggered
```

**Benefits**:

- ✅ Multi-step approval processes
- ✅ Role-based permissions
- ✅ Automated notifications
- ✅ Audit trails
- ✅ Custom business logic

### C. Open-Source Flexibility

**Advantages**:

- ✅ No licensing costs ($0 vs $25K-$50K/year)
- ✅ Full source code access
- ✅ Unlimited customization
- ✅ Large plugin ecosystem (1,800+ plugins)
- ✅ Active community support

**Disadvantages**:

- ❌ Less polished UI (needs theming)
- ❌ Infrastructure overhead (hosting, updates)
- ❌ Requires technical expertise

---

## 2. Hybrid Architecture: Best of Both Worlds

### Our Approach: Docebo UI + Moodle Features

```
┌─────────────────────────────────────────────────────────────┐
│ EFH HYBRID LMS ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LAYER 1: PRESENTATION (Docebo-Inspired)                   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Clean, professional UI (Docebo style)              │ │
│  │ - React + TypeScript frontend                        │ │
│  │ - Responsive design                                  │ │
│  │ - Modern UX patterns                                 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 2: BUSINESS LOGIC (Moodle-Inspired)                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Competency framework                               │ │
│  │ - Apprenticeship workflows                           │ │
│  │ - OJT/RI tracking                                    │ │
│  │ - Certification automation                           │ │
│  │ - Compliance reporting                               │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 3: DATA (Supabase)                                  │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - PostgreSQL database                                │ │
│  │ - Row-level security                                 │ │
│  │ - Real-time subscriptions                            │ │
│  │ - File storage                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 4: INTEGRATIONS                                     │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Indiana DWD API (state reporting)                  │ │
│  │ - DOL API (federal reporting)                        │ │
│  │ - Stripe (payments)                                  │ │
│  │ - SendGrid (email)                                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Result**:

- ✅ Docebo's polished UI
- ✅ Moodle's vocational features
- ✅ Zero licensing costs
- ✅ Full customization control

---

## 3. Moodle Features to Implement

### A. Competency Framework

**What Moodle Does**:

```
Competency: "Perform Basic Electrical Wiring"
├── Level 1: Identify wire types (Beginner)
├── Level 2: Strip and connect wires (Intermediate)
├── Level 3: Install outlets and switches (Advanced)
└── Level 4: Troubleshoot circuits (Expert)

Evidence Required:
- Video demonstration
- Supervisor observation
- Written test (80% pass)
- Practical assessment
```

**Our Implementation**:

```typescript
// Database Schema
interface Competency {
  id: string;
  program_id: string;
  name: string;
  description: string;
  levels: CompetencyLevel[];
  evidence_required: EvidenceType[];
}

interface CompetencyLevel {
  level: number;
  name: string;
  criteria: string[];
  assessment_method: 'observation' | 'test' | 'project' | 'portfolio';
}

interface StudentCompetency {
  student_id: string;
  competency_id: string;
  current_level: number;
  evidence: Evidence[];
  status: 'not_started' | 'in_progress' | 'mastered';
  assessed_by: string;
  assessed_at: Date;
}
```

**UI Component**:

```tsx
// Competency Progress Card
<div className="card">
  <div className="card-header">
    <h3>Electrical Wiring Competency</h3>
    <span className="badge badge-warning">Level 2/4</span>
  </div>
  <div className="card-body">
    <div className="competency-levels">
      <div className="level completed">
        <span className="level-number">1</span>
        <span className="level-name">Identify Wire Types</span>
        <span className="level-status">✓ Mastered</span>
      </div>
      <div className="level current">
        <span className="level-number">2</span>
        <span className="level-name">Strip and Connect Wires</span>
        <span className="level-status">⏳ In Progress</span>
      </div>
      <div className="level locked">
        <span className="level-number">3</span>
        <span className="level-name">Install Outlets</span>
        <span className="level-status">🔒 Locked</span>
      </div>
    </div>
    <button className="btn-primary">Submit Evidence</button>
  </div>
</div>
```

### B. Apprenticeship Tracking Module

**What Moodle Does**:

```
Apprenticeship Requirements:
- 2,000 OJT hours (on-the-job training)
- 144 RI hours (related instruction)
- 12 competencies mastered
- Supervisor evaluations (quarterly)
- Final certification exam
```

**Our Implementation**:

```typescript
interface Apprenticeship {
  id: string;
  student_id: string;
  program_id: string;
  employer_id: string;
  supervisor_id: string;
  start_date: Date;
  expected_completion: Date;

  // Hour Tracking
  ojt_hours_required: number;
  ojt_hours_completed: number;
  ri_hours_required: number;
  ri_hours_completed: number;

  // Competencies
  competencies_required: string[];
  competencies_completed: string[];

  // Evaluations
  evaluations: SupervisorEvaluation[];

  // Status
  status: 'active' | 'on_hold' | 'completed' | 'terminated';
  completion_date?: Date;
  certificate_issued?: boolean;
}

interface OJTHourLog {
  id: string;
  apprenticeship_id: string;
  date: Date;
  hours: number;
  tasks_performed: string[];
  supervisor_id: string;
  supervisor_approved: boolean;
  approved_at?: Date;
  notes?: string;
}

interface SupervisorEvaluation {
  id: string;
  apprenticeship_id: string;
  evaluation_date: Date;
  period: string; // "Q1 2024"
  ratings: {
    competency_id: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comments: string;
  }[];
  overall_performance: string;
  areas_for_improvement: string[];
  supervisor_signature: string;
  student_acknowledged: boolean;
}
```

**UI Component**:

```tsx
// Apprenticeship Dashboard
<div className="apprenticeship-dashboard">
  <div className="progress-cards">
    <div className="card">
      <h4>OJT Hours</h4>
      <div className="progress-circle">
        <span className="progress-value">1,450 / 2,000</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: '72.5%' }} />
      </div>
      <p className="text-secondary">550 hours remaining</p>
    </div>

    <div className="card">
      <h4>Related Instruction</h4>
      <div className="progress-circle">
        <span className="progress-value">120 / 144</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: '83%' }} />
      </div>
      <p className="text-secondary">24 hours remaining</p>
    </div>

    <div className="card">
      <h4>Competencies</h4>
      <div className="progress-circle">
        <span className="progress-value">9 / 12</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: '75%' }} />
      </div>
      <p className="text-secondary">3 competencies remaining</p>
    </div>
  </div>

  <div className="recent-activity">
    <h3>Recent Activity</h3>
    <div className="activity-list">
      <div className="activity-item">
        <span className="activity-icon">✓</span>
        <span className="activity-text">
          8 OJT hours approved by supervisor
        </span>
        <span className="activity-date">2 hours ago</span>
      </div>
      <div className="activity-item">
        <span className="activity-icon">📝</span>
        <span className="activity-text">Quarterly evaluation submitted</span>
        <span className="activity-date">1 day ago</span>
      </div>
    </div>
  </div>
</div>
```

### C. Certification Automation

**What Moodle Does**:

```
Certification Workflow:
1. Student completes all requirements
2. System auto-checks completion
3. Certificate template populated
4. PDF generated with unique ID
5. Email sent to student
6. Certificate added to portfolio
7. Verification URL created
8. State reporting triggered
```

**Our Implementation**:

```typescript
interface CertificationRule {
  id: string;
  program_id: string;
  name: string;
  requirements: {
    type:
      | 'course_completion'
      | 'competency_mastery'
      | 'hours_completed'
      | 'assessment_passed';
    target_id: string;
    threshold?: number;
  }[];
  certificate_template_id: string;
  auto_issue: boolean;
  expiration_months?: number;
}

interface Certificate {
  id: string;
  student_id: string;
  program_id: string;
  certificate_type: string;
  issue_date: Date;
  expiration_date?: Date;
  verification_code: string;
  pdf_url: string;
  status: 'active' | 'expired' | 'revoked';
  metadata: {
    hours_completed: number;
    competencies_mastered: string[];
    final_grade?: number;
  };
}

// Auto-Certification Service
class CertificationService {
  async checkEligibility(
    studentId: string,
    programId: string
  ): Promise<boolean> {
    const rules = await this.getCertificationRules(programId);

    for (const rule of rules) {
      for (const requirement of rule.requirements) {
        const met = await this.checkRequirement(studentId, requirement);
        if (!met) return false;
      }
    }

    return true;
  }

  async issueCertificate(
    studentId: string,
    programId: string
  ): Promise<Certificate> {
    // 1. Generate unique verification code
    const verificationCode = this.generateVerificationCode();

    // 2. Populate certificate template
    const certificateData = await this.getCertificateData(studentId, programId);

    // 3. Generate PDF
    const pdfUrl = await this.generateCertificatePDF(certificateData);

    // 4. Save to database
    const certificate = await this.saveCertificate({
      student_id: studentId,
      program_id: programId,
      verification_code: verificationCode,
      pdf_url: pdfUrl,
      issue_date: new Date(),
    });

    // 5. Send email notification
    await this.sendCertificateEmail(studentId, certificate);

    // 6. Trigger state reporting
    await this.reportToState(certificate);

    return certificate;
  }
}
```

### D. Job Placement Tracking

**What Moodle Does** (via plugins):

```
Job Placement Module:
- Job board integration
- Resume builder
- Interview scheduling
- Placement tracking
- Follow-up surveys (30/60/90 days)
- Wage tracking
- Retention metrics
```

**Our Implementation**:

```typescript
interface JobPlacement {
  id: string;
  student_id: string;
  program_id: string;
  employer_id: string;
  job_title: string;
  start_date: Date;
  employment_type: 'full_time' | 'part_time' | 'contract' | 'apprenticeship';
  starting_wage: number;
  wage_type: 'hourly' | 'salary';
  benefits: string[];
  placement_source: 'direct' | 'referral' | 'job_board' | 'career_fair';
  status: 'placed' | 'active' | 'terminated' | 'promoted';

  // Follow-up
  follow_ups: PlacementFollowUp[];
  retention_status: {
    day_30: boolean;
    day_60: boolean;
    day_90: boolean;
    day_180: boolean;
  };
}

interface PlacementFollowUp {
  id: string;
  placement_id: string;
  follow_up_date: Date;
  days_since_placement: number;
  still_employed: boolean;
  current_wage?: number;
  satisfaction_rating: 1 | 2 | 3 | 4 | 5;
  challenges?: string[];
  support_needed?: string;
  notes: string;
}

// Placement Dashboard
interface PlacementMetrics {
  total_graduates: number;
  total_placed: number;
  placement_rate: number; // percentage
  average_starting_wage: number;
  retention_30_day: number;
  retention_90_day: number;
  top_employers: {
    employer_id: string;
    employer_name: string;
    placements: number;
  }[];
  placement_by_program: {
    program_id: string;
    program_name: string;
    placement_rate: number;
  }[];
}
```

---

## 4. Compliance Reporting (WIOA/WRG)

### Moodle's Reporting Capabilities

**What Moodle Provides**:

- Custom report builder
- Scheduled reports
- Export to Excel/PDF
- Role-based access
- Audit logs

**Our Implementation**:

```typescript
// WIOA Compliance Report
interface WIOAReport {
  reporting_period: {
    start_date: Date;
    end_date: Date;
  };

  enrollment_data: {
    total_enrolled: number;
    by_demographics: {
      age_group: string;
      count: number;
    }[];
    by_barrier: {
      barrier_type: string;
      count: number;
    }[];
  };

  completion_data: {
    total_completed: number;
    completion_rate: number;
    average_completion_time_days: number;
    credentials_earned: {
      credential_type: string;
      count: number;
    }[];
  };

  placement_data: {
    total_placed: number;
    placement_rate: number;
    average_wage: number;
    retention_rate_90_day: number;
    by_industry: {
      industry: string;
      placements: number;
      average_wage: number;
    }[];
  };

  performance_metrics: {
    employment_rate_q2: number;
    employment_rate_q4: number;
    median_earnings_q2: number;
    median_earnings_q4: number;
    credential_attainment_rate: number;
    measurable_skill_gains: number;
  };
}

// WRG (Workforce Ready Grant) Report
interface WRGReport {
  reporting_period: {
    start_date: Date;
    end_date: Date;
  };

  training_data: {
    total_participants: number;
    total_training_hours: number;
    average_hours_per_participant: number;
    by_program: {
      program_name: string;
      participants: number;
      hours: number;
    }[];
  };

  certification_data: {
    total_certifications: number;
    by_type: {
      certification_name: string;
      count: number;
      pass_rate: number;
    }[];
  };

  employer_engagement: {
    total_employers: number;
    new_partnerships: number;
    work_based_learning_placements: number;
    apprenticeships_started: number;
  };

  outcomes: {
    job_placements: number;
    wage_gains: {
      pre_training_average: number;
      post_training_average: number;
      percentage_increase: number;
    };
    retention_rates: {
      30_day: number;
      90_day: number;
      180_day: number;
    };
  };

  funding_utilization: {
    total_grant_amount: number;
    amount_spent: number;
    cost_per_participant: number;
    cost_per_placement: number;
  };
}
```

---

## 5. Implementation Roadmap

### Phase 1: Competency Framework (Weeks 1-2)

```typescript
// Database tables
-competencies -
  competency_levels -
  student_competencies -
  competency_evidence -
  // Components
  CompetencyCard -
  CompetencyProgress -
  EvidenceUpload -
  CompetencyAssessment;
```

### Phase 2: Apprenticeship Tracking (Weeks 3-4)

```typescript
// Database tables
-apprenticeships -
  ojt_hour_logs -
  supervisor_evaluations -
  competency_assessments -
  // Components
  ApprenticeshipDashboard -
  HourLogForm -
  SupervisorApproval -
  EvaluationForm;
```

### Phase 3: Certification Automation (Week 5)

```typescript
// Database tables
-certification_rules -
  certificates -
  certificate_templates -
  // Services
  CertificationService -
  PDFGenerationService -
  EmailNotificationService -
  // Components
  CertificateViewer -
  CertificateVerification;
```

### Phase 4: Job Placement Tracking (Week 6)

```typescript
// Database tables
-job_placements -
  placement_follow_ups -
  employers -
  // Components
  PlacementDashboard -
  JobBoard -
  PlacementForm -
  FollowUpSurvey;
```

### Phase 5: Compliance Reporting (Weeks 7-8)

```typescript
// Database tables
-wioa_reports -
  wrg_reports -
  report_schedules -
  // Components
  WIOAReportBuilder -
  WRGReportBuilder -
  ReportDashboard -
  ExportTools;
```

---

## 6. Cost Comparison

### Moodle (Self-Hosted)

- **Software**: $0 (open-source)
- **Hosting**: $50-$200/month (VPS)
- **Maintenance**: $500-$1,000/month (developer time)
- **Total**: $6,000-$14,400/year

### Docebo (SaaS)

- **License**: $25,000-$50,000/year
- **Implementation**: $10,000-$20,000 (one-time)
- **Total Year 1**: $35,000-$70,000

### Our Hybrid Approach

- **Software**: $0 (custom-built)
- **Hosting**: $0-$500/month (Supabase + Netlify)
- **Development**: One-time build (12 weeks)
- **Total Year 1**: $0-$6,000

**Savings**: $29,000-$64,000 in Year 1

---

## 7. Key Advantages of Hybrid Approach

### vs Moodle

- ✅ Better UI/UX (Docebo-style)
- ✅ Modern tech stack (React vs PHP)
- ✅ Easier maintenance
- ✅ Better performance
- ✅ Mobile-first design

### vs Docebo

- ✅ Zero licensing costs
- ✅ Full customization control
- ✅ Vocational training features
- ✅ Apprenticeship workflows
- ✅ Compliance reporting

### vs Building from Scratch

- ✅ Proven patterns (Moodle)
- ✅ Best practices (Docebo)
- ✅ Faster development
- ✅ Lower risk

---

## 8. Next Steps

1. ✅ Docebo design system → DONE
2. ⏳ Competency framework → START NOW
3. ⏳ Apprenticeship tracking → WEEK 3
4. ⏳ Certification automation → WEEK 5
5. ⏳ Job placement tracking → WEEK 6
6. ⏳ Compliance reporting → WEEK 7

**Timeline**: 8 weeks to full vocational LMS  
**Cost**: $0-$6,000/year  
**Result**: Enterprise vocational training platform

🚀 **Let's build the best of Moodle + Docebo!**
