# Autopilot Workers Integration with Programs

**Purpose**: Automate program management tasks using the Autopilot worker system

---

## 🤖 What Autopilot Workers Will Do

### 1. Program Holder Applications

**Worker Task**: Process new training provider applications

- Auto-verify business information
- Pre-fill state licensing forms
- Generate MOU documents
- Submit to state portals
- Track approval status

### 2. Student Certifications

**Worker Task**: Handle student certification applications

- Auto-fill WIOA eligibility forms
- Submit to workforce portals
- Track certification status
- Generate certificates
- Send notifications

### 3. Instructor Credentials

**Worker Task**: Manage instructor licensing

- Verify credentials
- Submit license applications
- Track renewal dates
- Auto-renew when possible
- Alert for expiring licenses

### 4. Compliance Reporting

**Worker Task**: Automated compliance tracking

- Generate WIOA reports
- Submit to funding agencies
- Track participant progress
- Monitor attendance
- Flag at-risk students

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Student    │  │    Admin     │  │   Program    │      │
│  │   Portal     │  │   Portal     │  │   Holder     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ↓                  ↓                  ↓
┌─────────────────────────────────────────────────────────────┐
│              Autopilot Worker Queue System                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Task Queue (Supabase Functions / Vercel Cron)      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Worker Processors                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Application │  │ Certification│  │  Compliance  │      │
│  │   Worker     │  │   Worker     │  │   Worker     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│              External Systems (Automated)                    │
│  • State Licensing Portals                                   │
│  • WIOA Certification Systems                                │
│  • Compliance Reporting Portals                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Worker Types & Responsibilities

### Worker 1: Application Processor

**Role**: Process program holder applications

**Tasks**:

1. Receive new application from `/api/program-holder/apply`
2. Create autopilot packet
3. Validate business information
4. Pre-fill state forms (PDF)
5. Queue for human review
6. Submit to state portal when approved
7. Update application status
8. Send notifications

**Trigger**: New application submitted
**Frequency**: Real-time
**Human Review**: Required before submission

---

### Worker 2: Certification Manager

**Role**: Handle student certifications

**Tasks**:

1. Monitor student enrollments
2. Check WIOA eligibility
3. Generate eligibility packets
4. Pre-fill certification forms
5. Submit to WIOA portal
6. Track approval status
7. Generate certificates
8. Update student records

**Trigger**: Student enrollment or milestone
**Frequency**: Daily batch + real-time
**Human Review**: Required for eligibility

---

### Worker 3: Compliance Reporter

**Role**: Automated compliance reporting

**Tasks**:

1. Collect participant data
2. Generate WIOA reports
3. Calculate performance metrics
4. Submit to funding agencies
5. Track submission status
6. Archive reports
7. Alert for issues

**Trigger**: Scheduled (weekly/monthly)
**Frequency**: Cron job
**Human Review**: Optional (auto-submit)

---

### Worker 4: Credential Monitor

**Role**: Track instructor credentials

**Tasks**:

1. Monitor license expiration dates
2. Alert 60 days before expiry
3. Pre-fill renewal forms
4. Submit renewals
5. Update instructor records
6. Flag expired credentials
7. Prevent expired instructors from teaching

**Trigger**: Scheduled (daily)
**Frequency**: Daily check
**Human Review**: Required for renewals

---

### Worker 5: Document Generator

**Role**: Generate program documents

**Tasks**:

1. Generate MOUs for program holders
2. Create enrollment agreements
3. Generate certificates
4. Create progress reports
5. Generate invoices
6. Archive documents

**Trigger**: Document request
**Frequency**: Real-time
**Human Review**: Not required

---

## 🔧 Implementation Steps

### Step 1: Create Worker Database Tables

**File**: `supabase/migrations/003_autopilot_workers.sql`

```sql
-- Worker queue table
CREATE TABLE autopilot_worker_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_type TEXT NOT NULL, -- 'application', 'certification', 'compliance', etc.
  task_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  priority INTEGER DEFAULT 5, -- 1-10, higher = more urgent
  scheduled_for TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Worker execution log
CREATE TABLE autopilot_worker_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  queue_id UUID REFERENCES autopilot_worker_queue(id),
  worker_type TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Worker configuration
CREATE TABLE autopilot_worker_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_type TEXT UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT true,
  schedule TEXT, -- Cron expression
  config JSONB, -- Worker-specific config
  last_run TIMESTAMP,
  next_run TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_worker_queue_status ON autopilot_worker_queue(status);
CREATE INDEX idx_worker_queue_scheduled ON autopilot_worker_queue(scheduled_for);
CREATE INDEX idx_worker_queue_type ON autopilot_worker_queue(worker_type);
```

---

### Step 2: Create Worker API Routes

**File**: `app/api/autopilot/workers/queue/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

// POST - Add task to worker queue
export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();

  try {
    const { worker_type, task_data, priority, scheduled_for } =
      await request.json();

    const { data, error } = await supabase
      .from('autopilot_worker_queue')
      .insert({
        worker_type,
        task_data,
        priority: priority || 5,
        scheduled_for: scheduled_for || new Date().toISOString(),
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, task: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET - Get pending tasks
export async function GET(request: NextRequest) {
  const supabase = createSupabaseClient();

  try {
    const { searchParams } = new URL(request.url);
    const worker_type = searchParams.get('worker_type');
    const status = searchParams.get('status') || 'pending';

    let query = supabase
      .from('autopilot_worker_queue')
      .select('*')
      .eq('status', status)
      .lte('scheduled_for', new Date().toISOString())
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true });

    if (worker_type) {
      query = query.eq('worker_type', worker_type);
    }

    const { data, error } = await query.limit(10);

    if (error) throw error;

    return NextResponse.json({ tasks: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### Step 3: Create Worker Processor

**File**: `app/api/autopilot/workers/process/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase-api';

// Worker processors
const workers = {
  application: processApplication,
  certification: processCertification,
  compliance: processCompliance,
  credential: processCredential,
  document: processDocument,
};

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();

  try {
    // Get next pending task
    const { data: task, error: fetchError } = await supabase
      .from('autopilot_worker_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(1)
      .single();

    if (fetchError || !task) {
      return NextResponse.json({ message: 'No pending tasks' });
    }

    // Mark as processing
    await supabase
      .from('autopilot_worker_queue')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
      })
      .eq('id', task.id);

    // Process task
    const processor = workers[task.worker_type as keyof typeof workers];

    if (!processor) {
      throw new Error(`Unknown worker type: ${task.worker_type}`);
    }

    const result = await processor(task.task_data, supabase);

    // Mark as completed
    await supabase
      .from('autopilot_worker_queue')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', task.id);

    // Log success
    await supabase.from('autopilot_worker_logs').insert({
      queue_id: task.id,
      worker_type: task.worker_type,
      action: 'completed',
      details: result,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    // Handle failure
    const { data: task } = await supabase
      .from('autopilot_worker_queue')
      .select('*')
      .eq('status', 'processing')
      .single();

    if (task) {
      const retry_count = (task.retry_count || 0) + 1;
      const status = retry_count >= task.max_retries ? 'failed' : 'pending';

      await supabase
        .from('autopilot_worker_queue')
        .update({
          status,
          retry_count,
          error_message: error.message,
        })
        .eq('id', task.id);

      // Log error
      await supabase.from('autopilot_worker_logs').insert({
        queue_id: task.id,
        worker_type: task.worker_type,
        action: 'error',
        details: { error: error.message },
      });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Worker implementations
async function processApplication(data: any, supabase: any) {
  // 1. Get application details
  const { data: application } = await supabase
    .from('program_holder_applications')
    .select('*')
    .eq('id', data.application_id)
    .single();

  // 2. Create autopilot packet
  // 3. Pre-fill forms
  // 4. Queue for review

  return { status: 'queued_for_review', application_id: data.application_id };
}

async function processCertification(data: any, supabase: any) {
  // 1. Get student enrollment
  // 2. Check WIOA eligibility
  // 3. Generate certification packet
  // 4. Submit to portal

  return { status: 'submitted', student_id: data.student_id };
}

async function processCompliance(data: any, supabase: any) {
  // 1. Collect participant data
  // 2. Generate report
  // 3. Submit to agency

  return { status: 'submitted', report_id: data.report_id };
}

async function processCredential(data: any, supabase: any) {
  // 1. Check credential expiration
  // 2. Send alerts
  // 3. Pre-fill renewal forms

  return { status: 'alert_sent', instructor_id: data.instructor_id };
}

async function processDocument(data: any, supabase: any) {
  // 1. Generate document
  // 2. Store in database
  // 3. Send notification

  return { status: 'generated', document_id: data.document_id };
}
```

---

### Step 4: Integrate with Program Holder Application

**File**: `app/api/program-holder/apply/route.ts`

```typescript
// Add to existing POST handler

// After saving application to database
const application = await supabase
  .from('program_holder_applications')
  .insert(applicationData)
  .select()
  .single();

// Queue autopilot worker task
await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/autopilot/workers/queue`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    worker_type: 'application',
    task_data: {
      application_id: application.data.id,
      business_name: applicationData.business_name,
      ein: applicationData.ein,
    },
    priority: 8, // High priority
  }),
});
```

---

### Step 5: Create Cron Job for Workers

**File**: `app/api/cron/process-workers/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Process up to 10 tasks
    const results = [];

    for (let i = 0; i < 10; i++) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/autopilot/workers/process`,
        { method: 'POST' }
      );

      const result = await response.json();

      if (result.message === 'No pending tasks') {
        break;
      }

      results.push(result);
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**Configure in Vercel**:

1. Go to Project Settings → Cron Jobs
2. Add new cron job:
   - Path: `/api/cron/process-workers`
   - Schedule: `*/5 * * * *` (every 5 minutes)

---

### Step 6: Create Worker Dashboard

**File**: `app/admin/autopilot/workers/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function WorkersDashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
  });

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  async function fetchTasks() {
    const response = await fetch('/api/autopilot/workers/queue');
    const data = await response.json();
    setTasks(data.tasks || []);

    // Calculate stats
    // ... (count by status)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Autopilot Workers</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Processing" value={stats.processing} color="blue" />
        <StatCard title="Completed" value={stats.completed} color="green" />
        <StatCard title="Failed" value={stats.failed} color="red" />
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Scheduled</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr key={task.id} className="border-b">
                <td className="p-4">{task.worker_type}</td>
                <td className="p-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="p-4">{task.priority}</td>
                <td className="p-4">
                  {new Date(task.scheduled_for).toLocaleString()}
                </td>
                <td className="p-4">
                  <button className="text-blue-600">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  const colors = {
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg ${colors[color as keyof typeof colors]}`}>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
}
```

---

## 🚀 Deployment Checklist

- [ ] Run database migration (003_autopilot_workers.sql)
- [ ] Deploy worker API routes
- [ ] Configure Vercel cron job
- [ ] Set CRON_SECRET environment variable
- [ ] Test worker queue
- [ ] Test worker processing
- [ ] Deploy worker dashboard
- [ ] Train staff on worker system

---

## 📊 Monitoring & Alerts

### Metrics to Track:

- Tasks processed per hour
- Average processing time
- Success/failure rate
- Queue depth
- Worker uptime

### Alerts:

- Failed tasks > 5
- Queue depth > 100
- Processing time > 5 minutes
- Worker not running for > 1 hour

---

## 🎯 Success Criteria

After implementation:

- ✅ Applications auto-processed within 5 minutes
- ✅ Certifications submitted within 24 hours
- ✅ Compliance reports auto-generated
- ✅ 95%+ success rate
- ✅ Human review only when needed

---

**Status**: Ready to implement
**Timeline**: 3-5 days for full integration
**Priority**: HIGH - Automates critical workflows
