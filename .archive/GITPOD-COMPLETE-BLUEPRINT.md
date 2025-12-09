# Complete System Blueprint for Gitpod

**Purpose**: Build hybrid learning platform with AI instructors, partner course integration, Stripe payments, and automated alerts

---

## 1. Database Schema (Supabase)

### Core Tables

```sql
-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  city TEXT,
  zip TEXT,
  support_notes TEXT,
  contact_method TEXT DEFAULT 'phone',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs table (already exists, enhance if needed)
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Program modules (stacked credentials)
CREATE TABLE program_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_external BOOLEAN DEFAULT false,
  partner_course_id UUID REFERENCES partner_courses(id),
  ai_persona_name TEXT,
  ai_persona_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner courses (Milady, Choice Medical, etc.)
CREATE TABLE partner_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT NOT NULL, -- 'Milady', 'Choice Medical', 'AHLEI', etc.
  external_url TEXT NOT NULL,
  credential_name TEXT NOT NULL,
  hours DECIMAL,
  requires_manual_verification BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied', -- applied, enrolled, active, completed, withdrawn
  stripe_payment_id TEXT,
  enrolled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Module progress
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_module_id UUID REFERENCES program_modules(id) ON DELETE CASCADE,
  partner_course_id UUID REFERENCES partner_courses(id),
  status TEXT DEFAULT 'not_started', -- not_started, in_progress, external_complete_pending, verified_complete
  external_proof_url TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications/Emails
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- email, sms
  template TEXT NOT NULL, -- welcome, reminder, completion, etc.
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance events
CREATE TABLE attendance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_module_id UUID REFERENCES program_modules(id),
  event_type TEXT NOT NULL, -- login, missed_login, live_class_attended, live_class_missed
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI instructor interactions
CREATE TABLE module_ai_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_module_id UUID REFERENCES program_modules(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE module_ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES module_ai_threads(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- user, assistant
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Module quizzes
CREATE TABLE module_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_module_id UUID REFERENCES program_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE module_quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES module_quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- array of answer options
  correct_answer TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES module_quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 2. TypeScript Types

```typescript
// types/program.ts

export interface PartnerCourse {
  id: string;
  partnerName: "Milady" | "Choice Medical" | "AHLEI" | "Other";
  externalUrl: string;
  credentialName: string;
  hours: number;
  requiresManualVerification: boolean;
}

export interface ProgramModule {
  id: string;
  programId: string;
  title: string;
  description: string;
  orderIndex: number;
  isExternal: boolean;
  partnerCourseId?: string;
  partnerCourse?: PartnerCourse;
  aiPersonaName: string;
  aiPersonaPrompt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  programId: string;
  status: "applied" | "enrolled" | "active" | "completed" | "withdrawn";
  stripePaymentId?: string;
  enrolledAt?: string;
  completedAt?: string;
}

export interface ModuleProgress {
  id: string;
  studentId: string;
  programModuleId: string;
  partnerCourseId?: string;
  status: "not_started" | "in_progress" | "external_complete_pending" | "verified_complete";
  externalProofUrl?: string;
  startedAt?: string;
  completedAt?: string;
  verifiedAt?: string;
}

export interface ExternalLesson {
  id: string;
  title: string;
  description: string;
  externalUrl: string;
  estimatedHours: number;
  isRequired: boolean;
  order: number;
}
```

---

## 3. Stripe Integration

### Stripe Webhook Handler

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { studentId, programId } = session.metadata || {};

    if (!studentId || !programId) {
      console.error("Missing metadata in Stripe session");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Create enrollment
    const { data: enrollment, error: enrollError } = await supabase
      .from("enrollments")
      .insert({
        student_id: studentId,
        program_id: programId,
        status: "enrolled",
        stripe_payment_id: session.payment_intent as string,
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (enrollError) {
      console.error("Error creating enrollment:", enrollError);
      return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
    }

    // Get program modules
    const { data: modules } = await supabase
      .from("program_modules")
      .select("*")
      .eq("program_id", programId)
      .order("order_index");

    // Create module progress records
    if (modules) {
      const progressRecords = modules.map((module) => ({
        student_id: studentId,
        program_module_id: module.id,
        partner_course_id: module.partner_course_id,
        status: "not_started",
      }));

      await supabase.from("module_progress").insert(progressRecords);
    }

    // Send welcome email
    await supabase.from("notifications").insert({
      student_id: studentId,
      type: "email",
      template: "welcome",
      subject: "Welcome to Your Program!",
      body: "Welcome email content here...",
    });

    // TODO: Trigger actual email send via Resend/SendGrid
  }

  return NextResponse.json({ received: true });
}
```

### Stripe Checkout Creation

```typescript
// app/api/stripe/create-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const { studentId, programId, programName, amount } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: programName,
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/enrollment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs/${programId}`,
    metadata: {
      studentId,
      programId,
    },
  });

  return NextResponse.json({ sessionId: session.id });
}
```

---

## 4. Module Page with Milady Integration

```typescript
// app/programs/[slug]/module/[moduleId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface ModuleData {
  id: string;
  title: string;
  description: string;
  isExternal: boolean;
  partnerCourse?: {
    externalUrl: string;
    credentialName: string;
    hours: number;
  };
  aiPersonaName: string;
}

export default function ModulePage() {
  const params = useParams();
  const [module, setModule] = useState<ModuleData | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // TODO: Fetch module data from Supabase
    // For now, mock data
    setModule({
      id: params.moduleId as string,
      title: "Milady Barbering – Online Theory",
      description: "Complete your Milady Standard Barbering theory online, then return here to upload your completion.",
      isExternal: true,
      partnerCourse: {
        externalUrl: "https://milady-cima-partner-link.com",
        credentialName: "Milady Standard Barbering",
        hours: 200,
      },
      aiPersonaName: "Coach Elizabeth",
    });
  }, [params.moduleId]);

  async function handleUpload() {
    if (!uploadFile) return;

    setUploading(true);
    try {
      // TODO: Upload to Supabase Storage
      // TODO: Update module_progress status to 'external_complete_pending'
      alert("Completion proof uploaded! Our team will verify it soon.");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  if (!module) return <div>Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        {module.title}
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        {module.description}
      </p>

      {/* AI Instructor */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 flex gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0">
          <img 
            src="/images/team/instructors/instructor-default.jpg" 
            alt={module.aiPersonaName}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {module.aiPersonaName} (AI)
          </p>
          <p className="text-xs text-slate-600">
            Ask me questions about this module, practice for your theory exams, or get help understanding Milady content.
          </p>
          <button className="mt-2 text-xs text-orange-600 hover:text-orange-700 font-semibold">
            Start Chat →
          </button>
        </div>
      </section>

      {/* External Course Link */}
      {module.isExternal && module.partnerCourse && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">
            Step 1: Go to partner course
          </h2>
          <p className="text-xs text-slate-600 mb-3">
            Click the button below to open your {module.partnerCourse.credentialName} course in a new tab. 
            Complete all required lessons and exams.
          </p>
          <a
            href={module.partnerCourse.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
          >
            Open Milady Course
          </a>
          <p className="text-xs text-slate-500 mt-2">
            Est. {module.partnerCourse.hours} hours
          </p>
        </section>
      )}

      {/* Upload Completion Proof */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">
          Step 2: Upload your completion proof
        </h2>
        <p className="text-xs text-slate-600 mb-3">
          When you&apos;re done, upload your completion record (certificate, transcript, or screenshot). 
          This allows Elevate for Humanity to verify your hours and unlock your next stacked credential.
        </p>
        <div className="flex gap-3 items-center">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
          <button
            onClick={handleUpload}
            disabled={!uploadFile || uploading}
            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </section>
    </main>
  );
}
```

---

## 5. Milady Lesson Card Component

```typescript
// components/MiladyLessonCard.tsx

export interface ExternalLesson {
  id: string;
  title: string;
  description: string;
  externalUrl: string;
  estimatedHours: number;
  isRequired: boolean;
  order: number;
}

export function MiladyLessonCard({ lesson }: { lesson: ExternalLesson }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-900">
        {lesson.order}. {lesson.title}
      </h3>
      <p className="mt-1 text-xs text-slate-600">{lesson.description}</p>
      <p className="mt-1 text-[11px] text-slate-500">
        Est. {lesson.estimatedHours} hours •{" "}
        {lesson.isRequired ? "Required" : "Optional"}
      </p>
      <a
        href={lesson.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
      >
        Launch Milady Module
      </a>
    </div>
  );
}
```

---

## 6. Automated Email System

### Daily Cron Job (Supabase Edge Function or Vercel Cron)

```typescript
// app/api/cron/daily-alerts/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  // Find students with no login in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: inactiveStudents } = await supabase
    .from("students")
    .select(`
      id,
      email,
      first_name,
      enrollments!inner(
        id,
        status
      )
    `)
    .eq("enrollments.status", "active")
    .not("id", "in", `(
      SELECT DISTINCT student_id 
      FROM attendance_events 
      WHERE event_date > '${sevenDaysAgo.toISOString()}'
    )`);

  // Send reminder emails
  if (inactiveStudents) {
    for (const student of inactiveStudents) {
      await supabase.from("notifications").insert({
        student_id: student.id,
        type: "email",
        template: "inactive_reminder",
        subject: "We miss you! Come back to your training",
        body: `Hi ${student.first_name}, we haven't seen you this week...`,
      });

      // TODO: Trigger actual email send
    }
  }

  // Find pending verifications older than 3 days
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: pendingVerifications } = await supabase
    .from("module_progress")
    .select("*")
    .eq("status", "external_complete_pending")
    .lt("updated_at", threeDaysAgo.toISOString());

  // Send staff notification
  if (pendingVerifications && pendingVerifications.length > 0) {
    // TODO: Send email to staff about pending verifications
  }

  return NextResponse.json({ 
    success: true,
    inactiveStudents: inactiveStudents?.length || 0,
    pendingVerifications: pendingVerifications?.length || 0,
  });
}
```

### Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/daily-alerts",
      "schedule": "0 9 * * *"
    }
  ]
}
```

---

## 7. Reference Schools (Milady/CIMA Hybrid)

Use these as pattern references:

1. **Elaine Sterling Institute** - Barbering Hybrid with Milady + CIMA
2. **KC Beauty Academy** - 2025 catalog explains CIMA hybrid model
3. **Empire Beauty** - Hybrid hairdressing/cosmetology breakdown
4. **Saddleback Beauty Academy** - Milady CIMA digital learning
5. **TSPA Maplewood** - Explains CIMA for multiple programs

---

## 8. Next Steps for Implementation

### Phase 1: Database Setup
1. Run SQL schema in Supabase
2. Create indexes for performance
3. Set up RLS policies

### Phase 2: Stripe Integration
4. Set up Stripe webhook endpoint
5. Test payment flow
6. Configure webhook in Stripe dashboard

### Phase 3: Module System
7. Create module page template
8. Build file upload to Supabase Storage
9. Create admin verification interface

### Phase 4: AI Instructor
10. Integrate OpenAI API
11. Build chat interface
12. Create persona prompts

### Phase 5: Automation
13. Set up Vercel cron jobs
14. Configure email service (Resend/SendGrid)
15. Build notification templates

### Phase 6: Testing
16. Test full enrollment flow
17. Test partner course integration
18. Test automated emails

---

## Files Created

- Clean Apply page: `/app/apply/page.tsx`
- This blueprint: `GITPOD-COMPLETE-BLUEPRINT.md`

## Ready to Build

All components are documented and ready for Gitpod to implement. The system will:

✅ Accept Stripe payments and auto-enroll  
✅ Send welcome emails with AI instructor intro  
✅ Link to Milady/partner courses  
✅ Track completion with upload verification  
✅ Send automated alerts for inactive students  
✅ Notify staff of pending verifications  
✅ Stack credentials in sequence  
✅ Provide AI guidance throughout  

**Total implementation time: ~2-3 weeks for full system**
