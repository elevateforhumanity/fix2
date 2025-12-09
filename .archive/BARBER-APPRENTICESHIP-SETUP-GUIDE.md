# Barber Apprenticeship (Indiana) - Complete Setup Guide

## 🎯 Overview

This guide walks you through setting up the **Barber Apprenticeship (Indiana)** program in your Elevate For Humanity platform. This is your **hybrid learning blueprint** that combines:

- ✅ **400 hours** Milady online theory
- ✅ **1,600 hours** in-shop practical training
- ✅ **2,000 total hours** to qualify for Indiana State Board exam
- ✅ AI instructors (Elizabeth + Barber Mentor)
- ✅ Partner integration (Milady)
- ✅ Shop owner responsibilities tracking
- ✅ Service requirements monitoring

---

## 📁 Files Created

### 1. Program Configuration
**`data/programs/barber-apprenticeship-indiana.json`**
- Complete program structure
- 10 modules (orientation → capstone)
- Hour breakdowns (400 theory + 1,600 practical)
- Service requirements (125 haircuts, 100 clipper cuts, etc.)
- Wage progression schedule
- State board exam requirements

### 2. Database Migration
**`supabase/migrations/20241209_hybrid_learning_tables.sql`**
- Creates 8 core tables:
  - `programs` - All training programs
  - `ai_instructors` - Elizabeth, Barber Mentor, etc.
  - `course_modules` - Stacked credential modules
  - `student_enrollments` - Student enrollment records
  - `module_progress` - Progress tracking per module
  - `program_holders` - Barbershop sponsors
  - `apprentice_hours_log` - Daily hours and services
  - `service_requirements` - State board minimums
- Row Level Security (RLS) policies
- Indexes for performance

### 3. Seed Script
**`scripts/seed-barber-program.ts`**
- TypeScript script to populate Supabase
- Seeds AI instructors (Elizabeth + Barber Mentor)
- Seeds Barber program record
- Seeds 10 course modules
- Verifies all data inserted correctly
- Uses fixed UUIDs for idempotency

### 4. Requirements Documentation
**`INDIANA-BARBER-APPRENTICESHIP-REQUIREMENTS.md`**
- Updated to reflect **2,000 hours** (not 3,200)
- Complete Indiana House Bill 1135 requirements
- Program holder responsibilities
- Milady CIMA integration details
- Wage progression schedule
- State board exam requirements

---

## 🚀 Setup Instructions

### Step 1: Run Database Migration

**Option A: Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy contents of `supabase/migrations/20241209_hybrid_learning_tables.sql`
5. Paste and click **Run**
6. Verify tables created in **Table Editor**

**Option B: Supabase CLI**

```bash
# If you have Supabase CLI installed
supabase db push
```

**Verify Tables Created:**
```sql
-- Run this in SQL Editor to verify
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'programs', 
  'ai_instructors', 
  'course_modules', 
  'student_enrollments', 
  'module_progress',
  'program_holders',
  'apprentice_hours_log',
  'service_requirements'
);
```

You should see all 8 tables listed.

---

### Step 2: Set Environment Variables

Ensure these are in your `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe (for enrollment automation)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Get your Supabase keys:**
1. Go to Supabase Dashboard → Settings → API
2. Copy `URL`, `anon/public key`, and `service_role key`

---

### Step 3: Run Seed Script

This populates your database with the Barber program, modules, and AI instructors.

```bash
# Install dependencies if needed
pnpm install

# Run seed script
pnpm tsx scripts/seed-barber-program.ts
```

**Expected Output:**
```
🚀 Starting Barber Apprenticeship (Indiana) Seed Script

📄 Loaded program data: Barber Apprenticeship (Indiana)
   Total Hours: 2000
   Modules: 10

📚 Seeding AI Instructors...
   ✅ Elizabeth L. Greene (AI)
   ✅ Barber Mentor (AI)

🎓 Seeding Barber Program...
   ✅ Barber Apprenticeship (Indiana)

📦 Seeding Course Modules...
   ✅ BARB-ORIENT: Program Orientation & Policies
   ✅ BARB-MILADY-RISE: Milady RISE: Infection Control
   ✅ BARB-MILADY-THEORY-1: Milady Barber Theory: Foundations
   ✅ BARB-MILADY-THEORY-2: Milady Barber Theory: Hair Services
   ✅ BARB-MILADY-THEORY-3: Milady Barber Theory: Shaving & Business
   ✅ BARB-EFH-THEORY-CHECKPOINT: EFH Theory Checkpoint
   ✅ BARB-SHOP-FOUNDATIONS: Foundations in the Barbershop
   ✅ BARB-SHOP-INTERMEDIATE: Intermediate Shop Practice
   ✅ BARB-SHOP-ADVANCED: Advanced Shop Practice
   ✅ BARB-CAPSTONE: Capstone: Mock State Board Exam

🔍 Verifying Seeded Data...
   ✅ Program: Barber Apprenticeship (Indiana)
   ✅ Modules: 10 found
   ✅ AI Instructors: 2 found

✅ Barber Apprenticeship (Indiana) seeded successfully!

📋 Next Steps:
   1. Visit your Supabase dashboard to verify tables
   2. Test the program page: /programs/barber-apprenticeship-in
   3. Clone this pattern for other programs (Healthcare, CDL, etc.)

🔗 Program ID: 33333333-3333-3333-3333-333333333333
```

---

### Step 4: Verify in Supabase Dashboard

1. Go to **Table Editor** → `programs`
   - Should see "Barber Apprenticeship (Indiana)"
   
2. Go to **Table Editor** → `course_modules`
   - Should see 10 modules
   - Filter by `program_id = 33333333-3333-3333-3333-333333333333`
   
3. Go to **Table Editor** → `ai_instructors`
   - Should see Elizabeth L. Greene (AI)
   - Should see Barber Mentor (AI)

---

### Step 5: Create Program Page (Frontend)

Create a Next.js page to display the program:

**`app/programs/barber-apprenticeship-in/page.tsx`**

```typescript
import { createClient } from '@/lib/supabase/server';
import { ExternalPartnerModule } from '@/components/ExternalPartnerModule';
import { AiInstructorBubble } from '@/components/AiInstructorBubble';

export default async function BarberApprenticeshipPage() {
  const supabase = createClient();

  // Fetch program
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', 'barber-apprenticeship-in')
    .single();

  // Fetch modules with AI instructor info
  const { data: modules } = await supabase
    .from('course_modules')
    .select(`
      *,
      ai_instructor:ai_instructors(*)
    `)
    .eq('program_id', program.id)
    .order('order_index', { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
          <h1 className="text-4xl font-bold">{program.name}</h1>
          <p className="mt-3 text-lg text-blue-100">{program.description}</p>
          
          <div className="mt-6 flex gap-4">
            <div className="rounded-lg bg-white/10 px-4 py-2">
              <div className="text-2xl font-bold">2,000</div>
              <div className="text-sm text-blue-100">Total Hours</div>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2">
              <div className="text-2xl font-bold">400</div>
              <div className="text-sm text-blue-100">Theory Hours</div>
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2">
              <div className="text-2xl font-bold">1,600</div>
              <div className="text-sm text-blue-100">Practical Hours</div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Program Modules</h2>
          
          {modules?.map((module) => {
            const isExternal = module.type === 'external_partner';
            const instructor = module.ai_instructor;

            return (
              <div key={module.id} className="space-y-3">
                {/* AI Instructor Bubble */}
                <AiInstructorBubble
                  name={instructor.name}
                  title={instructor.title}
                  avatarUrl={instructor.avatar_image_url}
                  message={
                    isExternal
                      ? `I'll guide you through ${module.partner_name}. Complete the work there, then upload your certificate here.`
                      : `This module happens right here in your EFH portal. I'll walk you through everything step by step.`
                  }
                />

                {/* Module Card */}
                {isExternal ? (
                  <ExternalPartnerModule
                    moduleId={module.id}
                    title={module.title}
                    description={module.description}
                    partnerName={module.partner_name}
                    externalUrl={module.external_url}
                    requiredHours={module.required_hours}
                    status="not_started" // TODO: Get from module_progress
                  />
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {module.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                          {module.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                          <span>📚 {module.required_hours} hours</span>
                          {module.is_capstone && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                              Capstone
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Start Module
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
```

---

### Step 6: Test the Program Page

1. Start your dev server:
   ```bash
   pnpm dev
   ```

2. Navigate to: `http://localhost:3000/programs/barber-apprenticeship-in`

3. You should see:
   - Program hero with 2,000 hours breakdown
   - 10 modules in order
   - AI instructor bubbles (Elizabeth + Barber Mentor)
   - External partner modules for Milady
   - Internal modules for EFH content

---

## 🔄 Cloning This Pattern for Other Programs

This structure works for **all 47 programs**. To add a new program:

### 1. Create JSON Config

Copy `data/programs/barber-apprenticeship-indiana.json` to:
- `data/programs/cna-certification.json`
- `data/programs/hvac-technician.json`
- `data/programs/cdl-class-a.json`
- etc.

Update:
- `slug`, `name`, `category`
- `modules` array with your program's structure
- Partner names (Choice Medical, ServSafe, etc.)
- Hour requirements

### 2. Update Seed Script

Copy `scripts/seed-barber-program.ts` to:
- `scripts/seed-cna-program.ts`
- `scripts/seed-hvac-program.ts`
- etc.

Update:
- Program ID constant
- Module ID mappings
- JSON file path

### 3. Run Seed Script

```bash
pnpm tsx scripts/seed-cna-program.ts
pnpm tsx scripts/seed-hvac-program.ts
```

### 4. Create Program Page

Copy `app/programs/barber-apprenticeship-in/page.tsx` to:
- `app/programs/cna-certification/page.tsx`
- `app/programs/hvac-technician/page.tsx`
- etc.

Update the `slug` in the Supabase query.

---

## 🏪 Shop Owner Portal (Program Holders)

For barbershop owners to track apprentice hours:

### Create Shop Owner Dashboard

**`app/shop-owner/dashboard/page.tsx`**

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function ShopOwnerDashboard() {
  const supabase = createClient();
  
  // Get current user's program holder record
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('*')
    .eq('email', user?.email)
    .single();

  // Get apprentices assigned to this shop
  const { data: apprentices } = await supabase
    .from('student_enrollments')
    .select(`
      *,
      student:auth.users(*),
      program:programs(*)
    `)
    .eq('program_id', programHolder.program_id);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold">Shop Owner Dashboard</h1>
      <p className="mt-2 text-slate-600">{programHolder.business_name}</p>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Your Apprentices</h2>
        
        {apprentices?.map((apprentice) => (
          <div key={apprentice.id} className="rounded-lg border bg-white p-4">
            <h3 className="font-semibold">{apprentice.student.email}</h3>
            <p className="text-sm text-slate-600">
              Program: {apprentice.program.name}
            </p>
            <button className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white">
              Log Hours
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
```

---

## 📊 Service Requirements Tracking

Track state board minimums (125 haircuts, 100 clipper cuts, etc.):

### Initialize Service Requirements

When a student enrolls, create service requirement records:

```typescript
// In your Stripe webhook or enrollment creation
const serviceTypes = [
  { type: 'basic_haircuts', required: 125 },
  { type: 'clipper_cuts', required: 100 },
  { type: 'fades_and_tapers', required: 100 },
  { type: 'scissor_cuts', required: 75 },
  { type: 'childrens_cuts', required: 30 },
  { type: 'beard_trims', required: 60 },
  { type: 'straight_razor_shaves', required: 30 },
  { type: 'facial_treatments', required: 15 },
  { type: 'mustache_sideburn_design', required: 30 },
  { type: 'blow_dry_styling', required: 50 },
  { type: 'product_application', required: 60 },
  { type: 'special_occasion_styling', required: 15 },
  { type: 'client_consultations', required: 125 },
  { type: 'retail_sales', required: 30 },
  { type: 'appointment_scheduling', required: 60 }
];

for (const service of serviceTypes) {
  await supabase.from('service_requirements').insert({
    enrollment_id: enrollmentId,
    service_type: service.type,
    required_count: service.required,
    completed_count: 0
  });
}
```

### Display Progress

```typescript
const { data: requirements } = await supabase
  .from('service_requirements')
  .select('*')
  .eq('enrollment_id', enrollmentId);

// Show progress bars
requirements.map(req => (
  <div key={req.service_type}>
    <div className="flex justify-between text-sm">
      <span>{req.service_type.replace(/_/g, ' ')}</span>
      <span>{req.completed_count} / {req.required_count}</span>
    </div>
    <div className="mt-1 h-2 rounded-full bg-slate-200">
      <div 
        className="h-2 rounded-full bg-blue-600"
        style={{ width: `${(req.completed_count / req.required_count) * 100}%` }}
      />
    </div>
  </div>
))
```

---

## 🔔 Automated Alerts (Vercel Cron)

Set up daily reminders for students stuck on partner modules:

**`app/api/cron/partner-reminders/route.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Find students stuck on partner modules for 7+ days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: stuckProgress } = await supabase
    .from('module_progress')
    .select(`
      *,
      enrollment:student_enrollments(
        student_id,
        student:auth.users(email)
      ),
      module:course_modules(title, partner_name)
    `)
    .eq('status', 'awaiting_partner_completion')
    .lt('created_at', sevenDaysAgo.toISOString())
    .or(`last_reminder_at.is.null,last_reminder_at.lt.${sevenDaysAgo.toISOString()}`);

  // Send reminder emails
  for (const progress of stuckProgress || []) {
    // TODO: Send email via SendGrid/Resend
    console.log(`Reminder: ${progress.enrollment.student.email} - ${progress.module.title}`);
    
    // Update last_reminder_at
    await supabase
      .from('module_progress')
      .update({ last_reminder_at: new Date().toISOString() })
      .eq('id', progress.id);
  }

  return NextResponse.json({ 
    success: true, 
    reminders_sent: stuckProgress?.length || 0 
  });
}
```

**Add to `vercel.json`:**

```json
{
  "crons": [
    {
      "path": "/api/cron/partner-reminders",
      "schedule": "0 9 * * *"
    }
  ]
}
```

---

## 📋 Next Steps

1. ✅ **Run migration** - Create tables in Supabase
2. ✅ **Run seed script** - Populate Barber program
3. ✅ **Create program page** - Display modules to students
4. ✅ **Test enrollment flow** - Stripe → auto-create enrollment
5. ✅ **Build shop owner portal** - Hours logging interface
6. ✅ **Set up cron jobs** - Automated reminders
7. ✅ **Clone for other programs** - Healthcare, CDL, HVAC, etc.

---

## 🎓 Success Metrics

Track these KPIs for the Barber program:

- **Enrollment Rate**: Students who complete payment
- **Module Completion Rate**: % who finish each module
- **Partner Completion Time**: Days to complete Milady modules
- **Shop Hours Logged**: Weekly hours submitted by shops
- **Service Requirements Progress**: % toward state minimums
- **State Board Pass Rate**: % who pass on first attempt
- **Time to Licensure**: Average days from enrollment to license

---

## 🆘 Troubleshooting

### Seed Script Fails

**Error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"**

Solution: Add to `.env.local`:
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Error: "relation 'programs' does not exist"**

Solution: Run the migration first:
```bash
# Copy supabase/migrations/20241209_hybrid_learning_tables.sql
# Paste into Supabase SQL Editor and run
```

### Program Page Shows No Modules

**Check Supabase:**
```sql
SELECT * FROM course_modules 
WHERE program_id = '33333333-3333-3333-3333-333333333333';
```

If empty, re-run seed script:
```bash
pnpm tsx scripts/seed-barber-program.ts
```

### RLS Policies Blocking Access

**Temporarily disable RLS for testing:**
```sql
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules DISABLE ROW LEVEL SECURITY;
```

**Re-enable after testing:**
```sql
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
```

---

## 📞 Support

Questions? Contact:
- **Email**: apprenticeships@elevateforhumanity.org
- **Phone**: (317) 314-3757
- **Portal**: portal.elevateforhumanity.org

---

**Last Updated**: December 9, 2024  
**Version**: 1.0  
**Status**: ✅ Ready for Implementation
