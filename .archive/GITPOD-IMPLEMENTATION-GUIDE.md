# Gitpod Implementation Guide - Complete System

**Goal**: Build hybrid learning platform with AI instructors, partner integration, Stripe automation, and alerts for ALL 47 programs

---

## Phase 1: Database Setup (Run First)

```sql
-- Core tables for all programs
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  website_url TEXT,
  support_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partner_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  external_name TEXT NOT NULL,
  external_link TEXT NOT NULL,
  expected_hours DECIMAL,
  requires_proof_upload BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  step_type TEXT NOT NULL,
  partner_course_id UUID REFERENCES partner_courses(id),
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  persona_prompt TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_ai_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  ai_instructor_id UUID REFERENCES ai_instructors(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending',
  enrolled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  course_step_id UUID REFERENCES course_steps(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  proof_url TEXT,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

CREATE TABLE IF NOT EXISTS notification_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  recipient_phone TEXT,
  notification_type TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  template_data JSONB,
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Phase 2: Seed Data (Partners & AI Instructors)

```sql
-- Insert partners
INSERT INTO partners (name, type, website_url) VALUES
('Milady CIMA', 'lms', 'https://milady.com'),
('Choice Medical Institute', 'lms', 'https://choicemedical.com'),
('ServSafe', 'certification', 'https://servsafe.com'),
('Certiport', 'certification', 'https://certiport.com');

-- Insert AI instructors
INSERT INTO ai_instructors (name, role, persona_prompt, image_url, bio) VALUES
(
  'Elizabeth Greene',
  'Founder & Lead Instructor',
  'You are Elizabeth Greene, founder of Elevate for Humanity. You are warm, inspiring, and deeply committed to helping students succeed. You believe everyone deserves a second chance and that education transforms lives. Your tone is encouraging, professional, and focused on practical success. You help students navigate WIOA funding, overcome barriers, and achieve their career goals.',
  '/images/team/instructors/instructor-default.jpg',
  'Founder of Elevate for Humanity with 15+ years in workforce development'
),
(
  'Marcus Williams',
  'Master Barber Instructor',
  'You are Marcus Williams, a master barber with 15 years of experience who built a successful barbershop from the ground up. You are passionate, motivating, and real. You share personal success stories and emphasize both technical skills and business. You help students with barbering techniques, Milady theory, building clientele, and state board prep.',
  '/images/team/instructors/instructor-barber.jpg',
  'Master Barber with 15 years experience, shop owner and instructor'
),
(
  'Dr. Sarah Mitchell',
  'Healthcare Instructor',
  'You are Dr. Sarah Mitchell, a compassionate healthcare professional with 15 years of experience. You believe healthcare workers are heroes who change lives. Your tone is warm, professional, and emphasizes patient care. You help students with medical terminology, clinical skills, patient interaction, and certification prep.',
  '/images/team/instructors/instructor-health.jpg',
  'Healthcare professional with 15 years in medical assisting and nursing'
);
```

---

## Phase 3: Stripe Webhook (Auto-Enrollment)

```typescript
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { student_id, program_id } = session.metadata || {};

    const supabase = await createClient();

    // Create enrollment
    const { data: enrollment } = await supabase
      .from("enrollments")
      .insert({
        student_id,
        program_id,
        stripe_customer_id: session.customer,
        stripe_payment_intent_id: session.payment_intent,
        status: "active",
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    // Get course steps for program
    const { data: courses } = await supabase
      .from("courses")
      .select("id")
      .eq("program_id", program_id);

    if (courses) {
      for (const course of courses) {
        const { data: steps } = await supabase
          .from("course_steps")
          .select("id")
          .eq("course_id", course.id);

        if (steps) {
          await supabase.from("course_progress").insert(
            steps.map((step) => ({
              enrollment_id: enrollment.id,
              course_step_id: step.id,
              status: "not_started",
            }))
          );
        }
      }
    }

    // Queue welcome email
    await supabase.from("notification_queue").insert({
      recipient_email: session.customer_details?.email,
      notification_type: "welcome",
      subject: "Welcome to Your Program!",
      body: "Welcome email content...",
    });
  }

  return NextResponse.json({ received: true });
}
```

---

## Phase 4: Module Page Component

```typescript
// components/ModulePage.tsx
"use client";

import { useState } from "react";

interface ModulePageProps {
  module: {
    title: string;
    description: string;
    isExternal: boolean;
    partnerLink?: string;
    aiInstructor: {
      name: string;
      imageUrl: string;
    };
  };
}

export function ModulePage({ module }: ModulePageProps) {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;
    // Upload to Supabase Storage
    // Update course_progress with proof_url
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
      <p className="text-slate-600 mb-6">{module.description}</p>

      {/* AI Instructor */}
      <div className="bg-white border rounded-lg p-4 mb-6 flex gap-3">
        <img
          src={module.aiInstructor.imageUrl}
          alt={module.aiInstructor.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">{module.aiInstructor.name}</p>
          <p className="text-sm text-slate-600">
            Ask me questions about this module
          </p>
          <button className="text-sm text-orange-600 mt-1">
            Start Chat →
          </button>
        </div>
      </div>

      {/* External Link */}
      {module.isExternal && module.partnerLink && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Step 1: Complete Partner Course</h2>
          <a
            href={module.partnerLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Launch Partner Course
          </a>
        </div>
      )}

      {/* Upload Proof */}
      {module.isExternal && (
        <div>
          <h2 className="font-semibold mb-2">Step 2: Upload Completion Proof</h2>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Upload Certificate
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## Phase 5: Daily Cron Job (Alerts)

```typescript
// app/api/cron/daily-alerts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  // Verify cron secret
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Find inactive students
  const { data: inactiveEnrollments } = await supabase
    .from("enrollments")
    .select(`
      id,
      student_id,
      students!inner(email, first_name)
    `)
    .eq("status", "active")
    .not("id", "in", `(
      SELECT DISTINCT enrollment_id 
      FROM attendance_events 
      WHERE occurred_at > '${sevenDaysAgo.toISOString()}'
    )`);

  // Queue reminder emails
  if (inactiveEnrollments) {
    for (const enrollment of inactiveEnrollments) {
      await supabase.from("notification_queue").insert({
        recipient_email: enrollment.students.email,
        notification_type: "inactive_reminder",
        subject: "We miss you in class!",
        body: `Hi ${enrollment.students.first_name}, we haven't seen you this week...`,
      });
    }
  }

  return NextResponse.json({ 
    success: true,
    inactiveCount: inactiveEnrollments?.length || 0 
  });
}
```

---

## Phase 6: Apply All to Programs

### For Each Program, Create:

1. **Partner course links** in `partner_courses` table
2. **Course steps** linking internal + external modules
3. **AI instructor assignment** via `course_ai_assignments`
4. **Stripe product** for payment (if not WIOA-funded)

### Example: Barber Program

```sql
-- Get program and course IDs
DO $$
DECLARE
  barber_program_id UUID;
  barber_course_id UUID;
  milady_partner_id UUID;
  marcus_ai_id UUID;
BEGIN
  SELECT id INTO barber_program_id FROM programs WHERE slug = 'barber';
  SELECT id INTO barber_course_id FROM courses WHERE slug = 'barber-apprentice';
  SELECT id INTO milady_partner_id FROM partners WHERE name = 'Milady CIMA';
  SELECT id INTO marcus_ai_id FROM ai_instructors WHERE name = 'Marcus Williams';

  -- Create partner course
  INSERT INTO partner_courses (partner_id, external_name, external_link, expected_hours)
  VALUES (milady_partner_id, 'Milady Barbering Theory', 'https://milady-link.com', 200);

  -- Create course steps
  INSERT INTO course_steps (course_id, step_type, partner_course_id, order_index, title)
  VALUES 
    (barber_course_id, 'PARTNER_COURSE', (SELECT id FROM partner_courses WHERE external_name = 'Milady Barbering Theory'), 1, 'Milady Theory'),
    (barber_course_id, 'INTERNAL_CONTENT', NULL, 2, 'Elevate Barber Lab'),
    (barber_course_id, 'INTERNAL_CONTENT', NULL, 3, 'Business Skills'),
    (barber_course_id, 'ASSESSMENT', NULL, 4, 'Final Certification');

  -- Assign AI instructor
  INSERT INTO course_ai_assignments (course_id, ai_instructor_id)
  VALUES (barber_course_id, marcus_ai_id);
END $$;
```

---

## Reference Schools (For Course Structure)

Copy these patterns:
- **Elaine Sterling Institute** - Barbering Hybrid with Milady
- **KC Beauty Academy** - CIMA hybrid model
- **Miami Barber Institute** - 900 Hours Hybrid
- **Revival Barber & Beauty Academy** - Hybrid online + in-person

---

## Implementation Checklist

- [ ] Run Phase 1 SQL (database tables)
- [ ] Run Phase 2 SQL (seed partners & AI instructors)
- [ ] Deploy Phase 3 (Stripe webhook)
- [ ] Build Phase 4 (module page component)
- [ ] Set up Phase 5 (daily cron job)
- [ ] Apply Phase 6 to all 47 programs
- [ ] Test full flow: Apply → Pay → Enroll → Learn → Complete
- [ ] Configure email service (Resend/SendGrid)
- [ ] Set up Vercel cron job
- [ ] Test alerts and notifications

---

## Files Created

1. Clean Apply page: `/app/apply/page.tsx` ✅
2. Complete blueprint: `GITPOD-COMPLETE-BLUEPRINT.md` ✅
3. All programs setup: `ALL-PROGRAMS-HYBRID-SETUP.md` ✅
4. This implementation guide: `GITPOD-IMPLEMENTATION-GUIDE.md` ✅

**Total Time: 2-3 weeks for complete implementation**
