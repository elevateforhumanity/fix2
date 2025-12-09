# All Programs - Hybrid Setup Like Reference Schools

**Goal**: Set up ALL 47 programs following the Milady/CIMA hybrid model used by successful schools

---

## Reference Schools Pattern

### What They Do (Copy This):

**Elaine Sterling Institute** - Barbering Hybrid
- Milady textbooks + CIMA online platform
- Theory online, hands-on in-person
- Flexible schedule
- Partner credentials + school certificate

**KC Beauty Academy** - Hybrid via CIMA
- Up to 50% online via CIMA by Milady
- Distance education model
- Clear hour breakdown
- Stacked credentials

**Miami Barber Institute** - 900 Hours Hybrid
- CIMA by Milady for online learning
- Flexible hybrid model
- Partner platform + school completion

**International School of Barbering**
- CIMA by Milady with online courses
- Hybrid structure
- Clear progression path

---

## Your Setup for ALL Programs

### Structure Every Program Like This:

```
Program: [Name] (e.g., Barber Apprenticeship)
├── Step 1: Partner Theory (External)
│   ├── Platform: Milady CIMA / Choice Medical / ServSafe / etc.
│   ├── Hours: X hours
│   ├── Student goes to partner site
│   ├── Completes modules there
│   └── Returns with certificate
│
├── Step 2: Elevate Hands-On (Internal)
│   ├── Platform: Your LMS
│   ├── Hours: Y hours
│   ├── Skills lab / clinic / shop
│   ├── Tracked in your system
│   └── Verified by instructors
│
├── Step 3: Career Readiness (Internal)
│   ├── Platform: Your LMS
│   ├── Business skills
│   ├── Job placement prep
│   ├── Resume / interview
│   └── Soft skills
│
└── Step 4: Elevate Certificate (Internal)
    ├── All steps verified
    ├── Generate Elevate certificate
    ├── Stacked on top of partner cert
    └── WIOA-compliant documentation
```

---

## Database Schema for ALL Programs

```sql
-- External providers (partners)
CREATE TABLE external_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'Milady', 'Choice Medical', 'ServSafe', etc.
  provider_type TEXT NOT NULL, -- 'lms', 'certification', 'assessment'
  base_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  api_available BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- External course links (partner modules)
CREATE TABLE external_course_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES external_providers(id),
  launch_url TEXT NOT NULL,
  credential_name TEXT NOT NULL,
  estimated_hours DECIMAL,
  completion_proof_type TEXT DEFAULT 'upload', -- 'upload', 'manual', 'api'
  is_required BOOLEAN DEFAULT true,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student course progress (tracks both internal and external)
CREATE TABLE student_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  external_link_id UUID REFERENCES external_course_links(id),
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, external_pending, completed
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  proof_url TEXT, -- Supabase Storage link to uploaded certificate
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI personas (cloned instructors)
CREATE TABLE ai_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'Elizabeth Greene', 'Marcus Williams', etc.
  role TEXT NOT NULL, -- 'Founder & Lead Instructor', 'Master Barber', etc.
  photo_url TEXT, -- '/images/team/elizabeth.jpg'
  role_prompt TEXT NOT NULL, -- Full AI personality prompt
  voice_style TEXT, -- 'warm, encouraging, motivational'
  specialties TEXT[], -- ['barber', 'entrepreneurship', 'WIOA']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course AI assignments (which AI teaches which course)
CREATE TABLE course_ai_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  ai_persona_id UUID REFERENCES ai_personas(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe payments
CREATE TABLE stripe_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id),
  course_id UUID REFERENCES courses(id),
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'usd',
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, succeeded, failed, refunded
  paid_by TEXT DEFAULT 'student', -- student, wioa, wrg, jri, employer
  funding_source TEXT, -- WIOA voucher number, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications queue
CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_type TEXT NOT NULL, -- student, staff, program_holder, founder
  recipient_id UUID, -- student_id or profile_id
  recipient_email TEXT,
  recipient_phone TEXT,
  notification_type TEXT NOT NULL, -- welcome, reminder, completion, alert
  channel TEXT NOT NULL, -- email, sms, both
  subject TEXT,
  body TEXT,
  template_data JSONB, -- Variables for template
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- pending, sent, failed
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Program Setup Template

### For EACH of Your 47 Programs:

#### 1. Barber Apprenticeship

```typescript
// Program structure
{
  name: "Barber Apprenticeship",
  slug: "barber-apprenticeship",
  totalHours: 2000,
  
  modules: [
    {
      title: "Milady Barbering Theory",
      type: "external",
      provider: "Milady CIMA",
      hours: 200,
      externalUrl: "https://milady-cima-link.com",
      description: "Complete Milady Standard Barbering theory online",
      aiInstructor: "Marcus Williams",
      completionProof: "upload" // Student uploads Milady certificate
    },
    {
      title: "Elevate Barber Lab - Fundamentals",
      type: "internal",
      hours: 600,
      description: "Hands-on training in our barber shop",
      aiInstructor: "Marcus Williams",
      completionProof: "instructor_verification"
    },
    {
      title: "Elevate Barber Lab - Advanced",
      type: "internal",
      hours: 800,
      description: "Advanced techniques and client services",
      aiInstructor: "Marcus Williams",
      completionProof: "instructor_verification"
    },
    {
      title: "Business & Career Readiness",
      type: "internal",
      hours: 400,
      description: "Build your barber business and career",
      aiInstructor: "Elizabeth Greene",
      completionProof: "quiz_and_project"
    }
  ]
}
```

#### 2. CNA Training

```typescript
{
  name: "Certified Nursing Assistant",
  slug: "cna-training",
  totalHours: 120,
  
  modules: [
    {
      title: "Choice Medical Institute - CNA Theory",
      type: "external",
      provider: "Choice Medical",
      hours: 40,
      externalUrl: "https://choice-medical-link.com",
      description: "Complete CNA theory through Choice Medical",
      aiInstructor: "Dr. Sarah Mitchell",
      completionProof: "upload"
    },
    {
      title: "Elevate Clinical Skills Lab",
      type: "internal",
      hours: 40,
      description: "Hands-on clinical skills practice",
      aiInstructor: "Nurse Jennifer Rodriguez",
      completionProof: "skills_checklist"
    },
    {
      title: "Elevate Clinical Rotation",
      type: "internal",
      hours: 40,
      description: "Real-world clinical experience",
      aiInstructor: "Nurse Jennifer Rodriguez",
      completionProof: "clinical_hours_log"
    }
  ]
}
```

#### 3. Medical Assistant

```typescript
{
  name: "Medical Assistant",
  slug: "medical-assistant",
  totalHours: 720,
  
  modules: [
    {
      title: "Choice Medical - MA Theory",
      type: "external",
      provider: "Choice Medical",
      hours: 240,
      externalUrl: "https://choice-medical-ma.com",
      description: "Medical Assistant theory and procedures",
      aiInstructor: "Dr. Sarah Mitchell",
      completionProof: "upload"
    },
    {
      title: "Elevate Clinical Externship",
      type: "internal",
      hours: 240,
      description: "Clinical externship in healthcare facility",
      aiInstructor: "Dr. Sarah Mitchell",
      completionProof: "externship_evaluation"
    },
    {
      title: "Elevate Career Prep & Certification",
      type: "internal",
      hours: 240,
      description: "CCMA exam prep and job placement",
      aiInstructor: "Dr. Sarah Mitchell",
      completionProof: "certification_exam"
    }
  ]
}
```

---

## AI Instructor Personas

### Create These for ALL Programs:

```typescript
// Elizabeth Greene - Founder (All Programs)
{
  name: "Elizabeth Greene",
  role: "Founder & Lead Instructor",
  photoUrl: "/images/team/instructors/instructor-default.jpg",
  rolePrompt: `You are Elizabeth Greene, founder of Elevate for Humanity. You are warm, inspiring, and deeply committed to helping students succeed. You believe everyone deserves a second chance and that education transforms lives. 
  
  Your tone is:
  - Encouraging and supportive
  - Professional but approachable
  - Focused on practical success
  - Emphasizes WIOA benefits and support services
  
  You help students with:
  - Understanding program requirements
  - Navigating WIOA funding
  - Overcoming barriers (housing, transportation, childcare)
  - Career planning and goal setting
  - Connecting to support services
  
  Always remind students that you're here to help them succeed, and that Elevate provides wraparound support beyond just training.`,
  voiceStyle: "warm, encouraging, motivational",
  specialties: ["WIOA", "program_navigation", "support_services", "career_planning"]
}

// Marcus Williams - Barber Programs
{
  name: "Marcus Williams",
  role: "Master Barber Instructor",
  photoUrl: "/images/team/instructors/instructor-barber.jpg",
  rolePrompt: `You are Marcus Williams, a master barber with 15 years of experience who went from cutting hair in a garage to owning a successful barbershop. You're passionate about teaching the next generation of barbers.
  
  Your tone is:
  - Motivating and real
  - Shares personal success stories
  - Emphasizes both technical skills and business
  - Focuses on building clientele and reputation
  
  You help students with:
  - Barbering techniques and skills
  - Understanding Milady theory content
  - Building a client base
  - Shop management and business
  - State board exam preparation
  
  You often say things like "If I can do it, you can too" and "Every great barber started exactly where you are now."`,
  voiceStyle: "passionate, motivating, authentic",
  specialties: ["barbering", "business", "client_relations", "state_board"]
}

// Dr. Sarah Mitchell - Healthcare Programs
{
  name: "Dr. Sarah Mitchell",
  role: "Healthcare Instructor",
  photoUrl: "/images/team/instructors/instructor-health.jpg",
  rolePrompt: `You are Dr. Sarah Mitchell, a compassionate healthcare professional with 15 years of experience in medical assisting and nursing. You believe healthcare workers are heroes who change lives every day.
  
  Your tone is:
  - Warm and encouraging
  - Emphasizes patient care and compassion
  - Professional and knowledgeable
  - Celebrates the nobility of healthcare work
  
  You help students with:
  - Medical terminology and procedures
  - Clinical skills and techniques
  - Patient interaction and bedside manner
  - Certification exam preparation
  - Understanding healthcare career paths
  
  You remind students that they're entering a field where they'll make a real difference in people's lives every single day.`,
  voiceStyle: "warm, professional, compassionate",
  specialties: ["healthcare", "clinical_skills", "patient_care", "certification"]
}
```

---

## Student Journey Flow

### 1. Application (Apply Page)
```
Student fills out application →
Stored in database →
Staff reviews →
Approved for WIOA/funding
```

### 2. Enrollment & Payment
```
IF WIOA-funded:
  - Attach voucher number
  - Mark as sponsored
  - No Stripe payment needed

IF Self-pay:
  - Create Stripe checkout
  - Student pays
  - Webhook creates enrollment
```

### 3. Welcome & Access
```
Automated email sent:
  - Welcome to [Program]
  - Meet your AI instructor [Name]
  - Access your dashboard: [LMS Link]
  - Start with: [First Module]
  
For external modules:
  - "Click here to access [Partner Platform]"
  - "Complete all modules there"
  - "Return here to upload certificate"
```

### 4. Learning Path
```
Module 1 (External):
  - Student clicks "Launch Milady"
  - Opens partner site in new tab
  - Completes work there
  - Returns to upload certificate
  - Staff verifies
  - Module marked complete

Module 2 (Internal):
  - Student accesses in LMS
  - AI instructor guides them
  - Completes lessons/quizzes
  - Logs hours
  - Module marked complete

Module 3 (Internal):
  - Continues progression
  - Stacks credentials
  - Builds portfolio

Final:
  - All modules complete
  - Elevate certificate generated
  - Sent to student + advisor
  - Job placement support
```

### 5. Automated Alerts
```
Daily cron job checks:
  - No login in 7 days? → Send reminder
  - Module overdue? → Send alert
  - Certificate pending verification? → Notify staff
  - Module completed? → Congratulations email
  - Program completed? → Certificate + celebration
```

---

## Implementation for Gitpod

### Phase 1: Database (Week 1)
```sql
-- Run all table creation scripts
-- Populate external_providers
-- Create AI personas
-- Set up indexes and RLS policies
```

### Phase 2: Stripe Integration (Week 1)
```typescript
// Set up webhook endpoint
// Test payment flow
// Configure auto-enrollment
// Test welcome emails
```

### Phase 3: Module System (Week 2)
```typescript
// Build module page template
// Add external link buttons
// Create file upload for certificates
// Build staff verification interface
```

### Phase 4: AI Instructors (Week 2)
```typescript
// Integrate OpenAI API
// Build chat interface
// Create persona system
// Test with sample questions
```

### Phase 5: Automation (Week 3)
```typescript
// Set up Vercel cron jobs
// Configure email service
// Build notification templates
// Test alert system
```

### Phase 6: All Programs (Week 3)
```typescript
// Apply structure to all 47 programs
// Create external links for each
// Assign AI instructors
// Test full flow
```

---

## Example: Complete Barber Program Setup

```typescript
// 1. Create external provider
INSERT INTO external_providers (name, provider_type, base_url)
VALUES ('Milady CIMA', 'lms', 'https://milady-cima.com');

// 2. Create AI persona
INSERT INTO ai_personas (name, role, photo_url, role_prompt)
VALUES (
  'Marcus Williams',
  'Master Barber Instructor',
  '/images/team/instructors/instructor-barber.jpg',
  '[Full prompt from above]'
);

// 3. Create external course link
INSERT INTO external_course_links (
  course_id,
  provider_id,
  launch_url,
  credential_name,
  estimated_hours,
  order_index
)
VALUES (
  '[barber-course-id]',
  '[milady-provider-id]',
  'https://milady-cima.com/barber-theory',
  'Milady Standard Barbering',
  200,
  1
);

// 4. Assign AI instructor to course
INSERT INTO course_ai_instructors (course_id, ai_persona_id)
VALUES ('[barber-course-id]', '[marcus-persona-id]');
```

---

## Next Steps

1. **Run SQL scripts** to create all tables
2. **Populate external_providers** with all partners
3. **Create AI personas** for all instructors
4. **Set up Stripe** webhook and checkout
5. **Build module page** template
6. **Configure cron jobs** for alerts
7. **Apply to all 47 programs** systematically

---

## Success Criteria

✅ Every program has external + internal modules  
✅ Every program has AI instructor assigned  
✅ Students can click to partner sites  
✅ Students can upload completion proofs  
✅ Staff can verify completions  
✅ Automated emails work  
✅ Stripe payments auto-enroll  
✅ Alerts fire for inactive students  
✅ Certificates generate on completion  

---

**This is the complete blueprint for setting up ALL 47 programs like the reference schools!**
