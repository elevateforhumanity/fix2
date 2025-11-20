# 🚀 GITPOD START HERE - Developer Onboarding

## Welcome! Follow this guide step-by-step. Don't improvise.

---

## ⚡ Quick Start (5 minutes)

### Step 1: Open Gitpod
```bash
# If you're reading this, you're already in Gitpod! ✅
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local and fill in the values
# You'll need these from the team lead:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - STRIPE_SECRET_KEY
```

### Step 4: Start Development Server
```bash
npm run dev
```

**You should see:** `ready - started server on 0.0.0.0:3000`

---

## 📋 Your Mission: Phases 1-4

You're implementing the cache-busting system and completing the UI. Here's the exact order:

---

## 🎯 PHASE 1: UI Completion (Week 1-2)

**Goal:** All HR + Admin UI in place, dashboards always fresh

### Day 1: Set Up Cache-Busting System

#### Task 1.1: Verify Autopilot Script Exists
```bash
# Check if the file exists
ls -la tools/autopilot-vercel-hard-refresh.mjs

# If it doesn't exist, it's already been created. Skip to Task 1.2
```

#### Task 1.2: Verify GitHub Action Exists
```bash
# Check if the workflow exists
ls -la .github/workflows/vercel-hard-refresh.yml

# If it doesn't exist, it's already been created. Skip to Task 1.3
```

#### Task 1.3: Mark Dashboard Pages as Force-Dynamic

**Open these files ONE BY ONE and add the export at the top:**

1. **LMS Dashboard**
   ```bash
   code app/lms/dashboard/page.tsx
   ```
   Add at the top (after imports):
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```
   Save and commit:
   ```bash
   git add app/lms/dashboard/page.tsx
   git commit -m "Mark LMS dashboard as force-dynamic"
   ```

2. **LMS Course Detail**
   ```bash
   code app/lms/courses/[courseId]/page.tsx
   ```
   Add:
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```
   Commit:
   ```bash
   git add app/lms/courses/[courseId]/page.tsx
   git commit -m "Mark LMS course detail as force-dynamic"
   ```

3. **Admin Dashboard**
   ```bash
   code app/admin/page.tsx
   ```
   Add:
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```
   Commit:
   ```bash
   git add app/admin/page.tsx
   git commit -m "Mark admin dashboard as force-dynamic"
   ```

4. **Student Dashboard**
   ```bash
   code app/student/dashboard/page.tsx
   ```
   Add:
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```
   Commit:
   ```bash
   git add app/student/dashboard/page.tsx
   git commit -m "Mark student dashboard as force-dynamic"
   ```

5. **Program Holder Dashboard**
   ```bash
   code app/program-holder/dashboard/page.tsx
   ```
   Add:
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```
   Commit:
   ```bash
   git add app/program-holder/dashboard/page.tsx
   git commit -m "Mark program holder dashboard as force-dynamic"
   ```

**✅ Checkpoint:** All dashboards now serve fresh data. Push your commits:
```bash
git push origin main
```

---

### Day 2-3: Build HR Pages

**Follow the template in `EMPLOYEES_LIST_TEMPLATE.tsx`**

#### Task 2.1: Create HR Employees List
```bash
# Create the directory
mkdir -p app/hr/employees

# Create the page
code app/hr/employees/page.tsx
```

**Copy the pattern from:** `EMPLOYEES_LIST_TEMPLATE.tsx`

**Key changes:**
1. Change API endpoint to `/api/hr/employees`
2. Update types to match employee data
3. Add force-dynamic at top:
   ```typescript
   export const dynamic = "force-dynamic";
   export const fetchCache = "force-no-store";
   ```

**Commit:**
```bash
git add app/hr/employees/page.tsx
git commit -m "Add HR employees list page"
```

#### Task 2.2: Create HR Employee Detail
```bash
code app/hr/employees/[id]/page.tsx
```

**Structure:**
- Tabs: Overview, Compensation, Time, Leave, Benefits, Performance
- Force-dynamic at top
- Fetch from `/api/hr/employees/[id]`

**Commit:**
```bash
git add app/hr/employees/[id]/page.tsx
git commit -m "Add HR employee detail page"
```

#### Task 2.3: Create HR Payroll Page
```bash
code app/hr/payroll/page.tsx
```

**Follow the same pattern:**
- Force-dynamic
- Filters: year, status
- Table: run number, period, pay date, status, totals
- API: `/api/hr/payroll`

**Commit:**
```bash
git add app/hr/payroll/page.tsx
git commit -m "Add HR payroll page"
```

#### Task 2.4: Create HR Time & Attendance
```bash
code app/hr/time/page.tsx
```

**Commit:**
```bash
git add app/hr/time/page.tsx
git commit -m "Add HR time tracking page"
```

#### Task 2.5: Create HR Leave Requests
```bash
code app/hr/leave/page.tsx
```

**Commit:**
```bash
git add app/hr/leave/page.tsx
git commit -m "Add HR leave requests page"
```

**✅ Checkpoint:** Push all HR pages:
```bash
git push origin main
```

---

### Day 4: Add ISR to Public Pages

**These pages should be cached but refresh every 5 minutes**

#### Task 3.1: Update Programs Page
```bash
code app/programs/page.tsx
```

**Change from force-dynamic to ISR:**
```typescript
// Remove: export const dynamic = "force-dynamic";
// Add:
export const revalidate = 300; // 5 minutes
```

**Commit:**
```bash
git add app/programs/page.tsx
git commit -m "Add ISR to programs page (5 min cache)"
```

#### Task 3.2: Update Homepage
```bash
code app/page.tsx
```

**Add at top:**
```typescript
export const revalidate = 300; // 5 minutes
```

**Commit:**
```bash
git add app/page.tsx
git commit -m "Add ISR to homepage (5 min cache)"
```

#### Task 3.3: Update About Page
```bash
code app/about/page.tsx
```

**Add:**
```typescript
export const revalidate = 3600; // 1 hour
```

**Commit:**
```bash
git add app/about/page.tsx
git commit -m "Add ISR to about page (1 hour cache)"
```

**✅ Checkpoint:** Push ISR changes:
```bash
git push origin main
```

---

### Day 5: Add No-Cache Headers to APIs

**Critical APIs should never be cached**

#### Task 4.1: Update HR Employees API
```bash
code app/api/hr/employees/route.ts
```

**In the GET function, before returning:**
```typescript
const res = NextResponse.json(data);
res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
res.headers.set("Pragma", "no-cache");
res.headers.set("Expires", "0");
return res;
```

**Commit:**
```bash
git add app/api/hr/employees/route.ts
git commit -m "Add no-cache headers to HR employees API"
```

#### Task 4.2: Update LMS Courses API
```bash
code app/api/lms/courses/route.ts
```

**Add same headers**

**Commit:**
```bash
git add app/api/lms/courses/route.ts
git commit -m "Add no-cache headers to LMS courses API"
```

#### Task 4.3: Update Admin APIs
**Repeat for:**
- `app/api/admin/users/route.ts`
- `app/api/admin/courses/route.ts`
- `app/api/admin/analytics/route.ts`

**Commit each one separately**

**✅ Checkpoint:** Push API changes:
```bash
git push origin main
```

---

## 🔐 PHASE 2: Enterprise Features (Week 3-4)

**Goal:** Validation, RBAC, logging

### Day 6-7: Add Validation

#### Task 5.1: Install Zod
```bash
npm install zod
```

#### Task 5.2: Create Validation Schemas
```bash
code lib/validations/hr.ts
```

**Example:**
```typescript
import { z } from 'zod';

export const employeeSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  hire_date: z.string().min(1, "Hire date is required"),
});

export const payrollSchema = z.object({
  pay_period_start: z.string(),
  pay_period_end: z.string(),
  pay_date: z.string(),
});
```

**Commit:**
```bash
git add lib/validations/hr.ts
git commit -m "Add HR validation schemas"
```

#### Task 5.3: Apply Validation to APIs
```bash
code app/api/hr/employees/route.ts
```

**In POST handler:**
```typescript
import { employeeSchema } from '@/lib/validations/hr';

export async function POST(req: Request) {
  const body = await req.json();
  
  // Validate
  const result = employeeSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors },
      { status: 400 }
    );
  }
  
  // Continue with validated data
  const validData = result.data;
  // ...
}
```

**Commit:**
```bash
git add app/api/hr/employees/route.ts
git commit -m "Add validation to HR employees API"
```

---

### Day 8-9: Strengthen RBAC

#### Task 6.1: Update Admin Layout
```bash
code app/(admin)/layout.tsx
```

**Add role check:**
```typescript
import { requireAdmin } from '@/lib/rbac';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const { isAdmin, isHRAdmin } = await requireAdmin();
  
  if (!isAdmin && !isHRAdmin) {
    redirect('/dashboard');
  }

  return <div>{children}</div>;
}
```

**Commit:**
```bash
git add app/(admin)/layout.tsx
git commit -m "Add RBAC to admin layout"
```

#### Task 6.2: Guard HR Routes
```bash
code app/hr/layout.tsx
```

**Create if doesn't exist:**
```typescript
import { requireAdmin } from '@/lib/rbac';
import { redirect } from 'next/navigation';

export default async function HRLayout({ children }) {
  const { isAdmin, isHRAdmin } = await requireAdmin();
  
  if (!isAdmin && !isHRAdmin) {
    redirect('/dashboard');
  }

  return <div>{children}</div>;
}
```

**Commit:**
```bash
git add app/hr/layout.tsx
git commit -m "Add RBAC to HR layout"
```

---

### Day 10: Add Logging

#### Task 7.1: Create Audit Log Function
```bash
code lib/audit-log.ts
```

**Create:**
```typescript
import { createClient } from '@/lib/supabase/server';

export async function auditLog(params: {
  action: string;
  resource: string;
  resourceId?: string;
  userId: string;
  details?: any;
}) {
  const supabase = await createClient();
  
  await supabase.from('audit_logs').insert({
    action: params.action,
    resource: params.resource,
    resource_id: params.resourceId,
    user_id: params.userId,
    details: params.details,
    created_at: new Date().toISOString(),
  });
}
```

**Commit:**
```bash
git add lib/audit-log.ts
git commit -m "Add audit logging utility"
```

#### Task 7.2: Add Logging to Critical Actions
```bash
code app/api/hr/employees/route.ts
```

**In POST handler:**
```typescript
import { auditLog } from '@/lib/audit-log';

export async function POST(req: Request) {
  // ... create employee
  
  await auditLog({
    action: 'employee.created',
    resource: 'employee',
    resourceId: newEmployee.id,
    userId: user.id,
    details: { employee_number: newEmployee.employee_number },
  });
  
  return NextResponse.json(newEmployee);
}
```

**Commit:**
```bash
git add app/api/hr/employees/route.ts
git commit -m "Add audit logging to employee creation"
```

**✅ Checkpoint:** Push Phase 2 changes:
```bash
git push origin main
```

---

## 🚀 PHASE 3: Optimization (Week 5)

**Goal:** Speed and stability

### Day 11-12: Database Optimization

#### Task 8.1: Check Existing Indexes
```bash
# Open Supabase SQL Editor
# Run: SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

#### Task 8.2: Add Missing Indexes
```sql
-- In Supabase SQL Editor
CREATE INDEX IF NOT EXISTS idx_employees_profile_id ON employees(profile_id);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(employment_status);
CREATE INDEX IF NOT EXISTS idx_time_entries_employee ON time_entries(employee_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON time_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_status ON leave_requests(status);
```

#### Task 8.3: Optimize Queries
**Replace `select('*')` with specific columns:**

```bash
code app/api/hr/employees/route.ts
```

**Change:**
```typescript
// Before:
const { data } = await supabase.from('employees').select('*');

// After:
const { data } = await supabase
  .from('employees')
  .select('id, employee_number, profile:profiles(full_name, email), department, position, employment_status, hire_date');
```

**Commit:**
```bash
git add app/api/hr/employees/route.ts
git commit -m "Optimize employee query - select specific columns"
```

---

### Day 13: Frontend Optimization

#### Task 9.1: Optimize Images
```bash
# Find all <img> tags and replace with Next.js <Image>
grep -r "<img" app/ --include="*.tsx"
```

**Replace:**
```typescript
// Before:
<img src="/hero.jpg" alt="Hero" />

// After:
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={800} height={600} />
```

#### Task 9.2: Add Pagination
**For large lists, add pagination:**

```bash
code app/hr/employees/page.tsx
```

**Ensure pagination is working:**
- Limit: 20 items per page
- Next/Previous buttons
- Page numbers

---

### Day 14: Run Lighthouse

#### Task 10.1: Test Performance
```bash
# In browser DevTools
# Run Lighthouse on:
# - /
# - /programs
# - /lms/dashboard
# - /admin
```

#### Task 10.2: Fix Issues
**Common fixes:**
- Add `loading="lazy"` to images
- Defer non-critical scripts
- Minimize layout shift

**✅ Checkpoint:** Push Phase 3 changes:
```bash
git push origin main
```

---

## 🤖 PHASE 4: Advanced Features (Ongoing)

**This is your backlog. Pick items as needed.**

### Reporting & Analytics
- HR analytics dashboard
- WIOA outcome reports
- LMS completion rates

### Mobile App
- Wrap with Capacitor
- Test on iOS/Android

### Integrations
- Payroll export to CSV
- Calendar sync
- Email notifications

### AI Features
- AI summaries for learners
- AI draft for case notes
- AI course recommendations

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### "Supabase connection failed"
Check `.env.local` has correct values

### "Build failed"
```bash
npm run build
# Check error messages
```

### "Old cache still showing"
```bash
# Force new deployment
npm run autopilot:vercel:hard-refresh
```

### "Can't push to GitHub"
```bash
git pull origin main
# Resolve conflicts
git push origin main
```

---

## ✅ Daily Checklist

Every day before you start:
- [ ] `git pull origin main` - Get latest changes
- [ ] `npm install` - Update dependencies
- [ ] `npm run dev` - Start dev server
- [ ] Check `CACHE_BUSTING_CHECKLIST.md` for your tasks

Every day before you finish:
- [ ] Test your changes locally
- [ ] Commit with clear message
- [ ] Push to main
- [ ] Verify deployment succeeded

---

## 📞 Need Help?

1. **Check the docs:**
   - `PHASE_1_UI_COMPLETION_SCRIPT.md`
   - `CACHE_BUSTING_CHECKLIST.md`
   - `BUILDER_HANDOFF_PACKAGE.md`

2. **Check the template:**
   - `EMPLOYEES_LIST_TEMPLATE.tsx`

3. **Ask the team lead**

---

## 🎉 You're Ready!

Start with **Day 1, Task 1.1** and work through systematically.

**Don't skip steps. Don't improvise. Follow the checklist.**

Good luck! 🚀
