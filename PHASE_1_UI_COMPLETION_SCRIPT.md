# 🚀 PHASE 1 – UI COMPLETION EXECUTION SCRIPT
## HR + Marketing + Events Backend → Frontend Integration

**Objective:** Make all the new HR, Marketing, and Events backend APIs visible and usable through admin and user-facing UI.

**Timeline:** 2-3 days for experienced developer

**Status:** Ready for implementation

---

## 🔧 GLOBAL PREP (DO THIS FIRST)

### 1. Confirm Admin Layout Folder

**Location:** `app/(admin)/layout.tsx`

**Requirements:**
- Wraps children in admin shell (sidebar, topbar, etc.)
- Checks current user's role
- If not `admin` or `hr_admin`, redirect to `/dashboard`

**Files to create/verify:**
- `app/(admin)/layout.tsx` ✅ (see example below)
- `app/(admin)/page.tsx` (main admin dashboard)

### 2. Add Simple RBAC Helper

**File:** `lib/rbac.ts` ✅ (already created)

```typescript
import { createClient } from '@/lib/supabase/server';

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null, isAdmin: false };

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'student';
  const isAdmin = ['admin', 'hr_admin'].includes(role);

  return { user, role, isAdmin };
}
```

**Usage in `app/(admin)/layout.tsx`:**
```typescript
import { requireAdmin } from '@/lib/rbac';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const { isAdmin } = await requireAdmin();
  
  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="admin-layout">
      {/* Your admin sidebar/topbar */}
      {children}
    </div>
  );
}
```

---

## 1️⃣ ADMIN HR PORTAL PAGES

### Priority Order:
1. ✅ Employees List (TEMPLATE PROVIDED - see below)
2. Employee Detail
3. HR Dashboard
4. Payroll Runs List
5. Time & Attendance Admin
6. Leave Requests Admin
7. Benefits Plans Admin
8. Performance Reviews Admin

---

### 1. HR Dashboard

**File:** `app/(admin)/hr/page.tsx`

**Purpose:** Bird's-eye view for HR/admin

**APIs to call:**
```typescript
GET /api/hr/employees?status=active&limit=5
GET /api/hr/payroll?year=<currentYear>&status=approved
GET /api/hr/leave-requests?status=pending&limit=5
GET /api/hr/performance-reviews?status=pending&limit=5
```

**UI Sections:**

**Top Row Cards:**
- Total employees
- Active employees
- Upcoming payroll date
- Pending leave requests

**Middle:**
- Table: "Latest Hires"
- Table: "Upcoming Performance Reviews"

**Bottom:**
- Summary: "Leave this month" (counts or simple chart)

**Design Note:** Mirror existing admin dashboard card style for consistency.

---

### 2. ✅ Employees List (FULL TEMPLATE PROVIDED)

**File:** `app/(admin)/hr/employees/page.tsx`

**API:** `GET /api/hr/employees?page=&limit=&search=&department=&status=`

**UI Components:**
- Header: "Employees" + "Add Employee" button
- Filters:
  - Search (text) → query param `search`
  - Department dropdown → `department`
  - Status select: active/terminated/on_leave
- Table columns:
  - Name (from profile.full_name)
  - Employee #
  - Department
  - Position
  - Manager name
  - Employment status
  - Hire date
  - Actions: "View" → `/admin/hr/employees/[id]`
- Pagination: Next/Prev using `page` and `limit`

**Implementation:**
- Use client component with `useSearchParams` and `useRouter`
- Update querystring when filters change
- Fetch via `/api/hr/employees`

**📄 FULL WORKING CODE PROVIDED BELOW** ⬇️

---

### 3. Employee Detail

**File:** `app/(admin)/hr/employees/[id]/page.tsx`

**API:** `GET /api/hr/employees/[id]`

**Tabs:**

**1. Overview**
- Name, picture, department, position, manager
- Hire date, status, employment type, work location

**2. Compensation**
- Current salary/hourly
- Salary history table

**3. Time & Attendance**
- Last 30 `time_entries` for employee
- API: `GET /api/hr/time-entries?employeeId=[id]`

**4. Leave**
- `leave_balances` with policy name + available_hours
- Table of last leave requests

**5. Benefits**
- Active `benefits_enrollments` + plan names, cost

**6. Performance**
- List of `performance_reviews` + rating + link to detail

**Top Actions:**
- Name, status pill
- "Terminate Employee" → `DELETE /api/hr/employees/[id]`

---

### 4. Payroll Runs List

**File:** `app/(admin)/hr/payroll/page.tsx`

**API:** `GET /api/hr/payroll?year=&status=`

**UI:**
- Header: "Payroll"
- Filters:
  - Year dropdown (current year ± 2 years)
  - Status chips: draft, processing, approved, paid
- Table:
  - Run number
  - Pay period start – end
  - Pay date
  - Status
  - Employee count
  - Total gross / net
  - Actions: "View" + "Process/Approve"

**Note:** For now, UI can be read-only and just show data.

---

### 5. Time & Attendance Admin

**File:** `app/(admin)/hr/time/page.tsx`

**API:** `GET /api/hr/time-entries?status=&from=&to=&employeeId=`

**UI:**
- Filters: Date range, status (pending/approved/rejected), employee search
- Table:
  - Employee
  - Date
  - Clock in / out
  - Total hours
  - Status
  - Approve / Reject buttons → `PATCH /api/hr/time-entries/[id]`

---

### 6. Leave Requests Admin

**File:** `app/(admin)/hr/leave/page.tsx`

**API:** `GET /api/hr/leave-requests?status=&from=&to=&employeeId=`

**UI:**
- Filters similar to time page
- Table:
  - Employee
  - Leave type (policy_name)
  - Start date
  - End date
  - Total hours
  - Status
  - Approve / Reject buttons → `PATCH /api/hr/leave-requests/[id]`

---

### 7. Benefits Plans Admin

**File:** `app/(admin)/hr/benefits/plans/page.tsx`

**API:** `/api/hr/benefits-plans`

**UI:**
- List of plans:
  - Plan name
  - Plan type (health, dental, etc.)
  - Coverage level
  - Employee cost / employer cost
  - Active/Inactive
- Button: "Add Plan" → modal with fields mapping to `benefits_plans` columns
- Submit to `POST /api/hr/benefits-plans`

---

### 8. Performance Reviews Admin

**File:** `app/(admin)/hr/performance/page.tsx`

**API:** `/api/hr/performance-reviews`

**UI:**
- Filters:
  - Status: draft/submitted/acknowledged/completed
  - Period (year)
- Table:
  - Employee
  - Reviewer
  - Period (start–end)
  - Overall rating
  - Status
  - "Open" button
- Button "Create Review" → modal:
  - Choose employee, reviewer, period, ratings, comments
  - `POST /api/hr/performance-reviews`

---

## 2️⃣ EMPLOYEE SELF-SERVICE HR PAGES

**Location:** `app/dashboard/hr/*`

### 9. My HR Overview

**File:** `app/dashboard/hr/page.tsx`

**Data:**
- Current user profile → `profiles`
- Their `employees` record
- Their `leave_balances`, `benefits_enrollments`
- Next payday from `payroll_runs`

**UI:**
- Cards:
  - Manager name
  - Department
  - Hire date
  - Status
- "My Balances" section:
  - PTO, Sick, other leave types from `leave_balances`
- Links to:
  - "View Pay Stubs"
  - "Request Time Off"
  - "View Benefits"
  - "Performance Reviews"

---

### 10. My Pay Stubs

**File:** `app/dashboard/hr/pay-stubs/page.tsx`

**API:** `GET /api/hr/pay-stubs?mine=true`

**UI:**
- Table:
  - Pay date
  - Pay period (start–end)
  - Gross pay
  - Taxes
  - Deductions
  - Net pay
  - "View" or "Download PDF" (from `pdf_url`)

---

### 11. Clock In / Out

**File:** `app/dashboard/hr/time/page.tsx`

**APIs:**
- `GET /api/hr/time-entries?mine=true&date=today`
- `POST /api/hr/time-entries` to clock in/out

**UI:**
- If user not clocked in → show big "Clock In" button
- If clocked in → show big "Clock Out" button and current duration
- Today's punches list under it

---

### 12. My Leave Requests

**File:** `app/dashboard/hr/leave/page.tsx`

**APIs:**
- `GET /api/hr/leave-requests?mine=true`
- `GET /api/hr/leave-balances?mine=true`
- `POST /api/hr/leave-requests` for new request

**UI:**
- Top cards: PTO / Sick / other balances
- Form:
  - Leave type (policy)
  - Start date
  - End date
  - Reason
- Table of past requests with status badges

---

### 13. My Benefits

**File:** `app/dashboard/hr/benefits/page.tsx`

**Data:** `benefits_enrollments` for current employee

**UI:**
- For each enrollment:
  - Plan name
  - Coverage level
  - Employee cost / month
  - Employer cost / month
  - Status
- Optional: link to docs or plan summary PDF

---

### 14. My Performance

**File:** `app/dashboard/hr/performance/page.tsx`

**Data:** `performance_reviews` + `employee_goals` filtered by current employee

**UI:**
- Section: Reviews
  - Table of reviews: period, rating, status, link to view
- Section: Goals
  - List goals with status and progress

---

## 3️⃣ ADMIN MARKETING UI

### 15. Campaigns List

**File:** `app/(admin)/marketing/campaigns/page.tsx`

**API:** `GET /api/marketing/campaigns`

**UI:**
- Header: "Campaigns" + button "New Campaign"
- Table:
  - Name
  - Channel (email)
  - Status (draft/scheduled/sent)
  - Scheduled at
  - Sent at
  - Stats (sent/opened/clicked)
  - "View / Edit" button

---

### 16. Create/Edit Campaign

**File:** `app/(admin)/marketing/campaigns/new/page.tsx`

**API:** 
- `POST /api/marketing/campaigns`
- `PATCH /api/marketing/campaigns/[id]`

**Fields:**
- Campaign name
- Subject line
- From name / from email
- Audience/segment tags
- HTML body (rich text editor)
- Schedule date/time (optional)

**Buttons:**
- Save as draft
- Save & schedule

---

### 17. Campaign Detail + Send

**File:** `app/(admin)/marketing/campaigns/[id]/page.tsx`

**APIs:**
- `GET /api/marketing/campaigns/[id]`
- `POST /api/marketing/campaigns/[id]/send`

**UI:**
- Show campaign details
- Stats box
- Button:
  - If draft → "Send now"
  - If scheduled → show schedule
  - If sent → show stats only

---

### 18. ✅ Contacts List (ALREADY CREATED)

**File:** `app/admin/contacts/page.tsx` ✅

**Features:**
- Search by email/name
- Table with name, email, tags, status
- Send welcome emails
- Update contact status

---

## 4️⃣ ADMIN + PUBLIC EVENTS UI

### 19. Events Admin List

**File:** `app/(admin)/events/page.tsx`

**API:** `GET /api/events?admin=true`

**UI:**
- Header: "Events" + button "New Event"
- Filters:
  - Status (draft/published/completed)
  - Type (webinar/workshop/in-person)
- Table:
  - Title
  - Start date
  - End date
  - Type
  - Capacity
  - Registrations count
  - Status
  - "Manage" button → `/admin/events/[id]`

---

### 20. Create/Edit Event

**Files:**
- `app/(admin)/events/new/page.tsx`
- `app/(admin)/events/[id]/edit/page.tsx`

**API:**
- `POST /api/events`
- `PATCH /api/events/[id]`

**Fields (match events table):**
- Title
- Description
- Start date/time
- End date/time
- Location (online URL or physical)
- Capacity
- Event type
- Status (draft/published)

---

### 21. Event Registrations Admin View

**File:** `app/(admin)/events/[id]/registrations/page.tsx`

**API:** `GET /api/events/[id]/registrations`

**UI:**
- Table:
  - Name
  - Email
  - Registered at
  - Status
  - Checked-in at (optional)
- Button: "Export CSV"

---

### 22. Public Events List

**File:** `app/events/page.tsx`

**API:** `GET /api/events?published=true&upcoming=true`

**UI:**
- List of upcoming events in cards
- Card shows: title, date, location, short description
- Button "View" → `/events/[id]`

---

### 23. Public Event Detail + Registration

**File:** `app/events/[id]/page.tsx`

**APIs:**
- `GET /api/events/[id]`
- `POST /api/events/[id]/register` (name, email, phone)

**UI:**
- Event info at top
- Simple registration form below
- On submit:
  - Call register API
  - Show success message
  - Send confirmation email from backend

---

## 📊 IMPLEMENTATION CHECKLIST

### Phase 1A: HR Admin (Priority)
- [ ] `lib/rbac.ts` - RBAC helper
- [ ] `app/(admin)/layout.tsx` - Admin layout with auth
- [ ] `app/(admin)/hr/employees/page.tsx` - Employees list ⭐ START HERE
- [ ] `app/(admin)/hr/employees/[id]/page.tsx` - Employee detail
- [ ] `app/(admin)/hr/page.tsx` - HR Dashboard
- [ ] `app/(admin)/hr/payroll/page.tsx` - Payroll runs
- [ ] `app/(admin)/hr/time/page.tsx` - Time & attendance
- [ ] `app/(admin)/hr/leave/page.tsx` - Leave requests
- [ ] `app/(admin)/hr/benefits/plans/page.tsx` - Benefits plans
- [ ] `app/(admin)/hr/performance/page.tsx` - Performance reviews

### Phase 1B: Employee Self-Service
- [ ] `app/dashboard/hr/page.tsx` - My HR overview
- [ ] `app/dashboard/hr/pay-stubs/page.tsx` - My pay stubs
- [ ] `app/dashboard/hr/time/page.tsx` - Clock in/out
- [ ] `app/dashboard/hr/leave/page.tsx` - My leave requests
- [ ] `app/dashboard/hr/benefits/page.tsx` - My benefits
- [ ] `app/dashboard/hr/performance/page.tsx` - My performance

### Phase 1C: Marketing
- [ ] `app/(admin)/marketing/campaigns/page.tsx` - Campaigns list
- [ ] `app/(admin)/marketing/campaigns/new/page.tsx` - Create campaign
- [ ] `app/(admin)/marketing/campaigns/[id]/page.tsx` - Campaign detail
- [ ] ✅ `app/admin/contacts/page.tsx` - Contacts (DONE)

### Phase 1D: Events
- [ ] `app/(admin)/events/page.tsx` - Events admin list
- [ ] `app/(admin)/events/new/page.tsx` - Create event
- [ ] `app/(admin)/events/[id]/edit/page.tsx` - Edit event
- [ ] `app/(admin)/events/[id]/registrations/page.tsx` - Registrations
- [ ] `app/events/page.tsx` - Public events list
- [ ] `app/events/[id]/page.tsx` - Public event detail + registration

---

## 🎯 NEXT STEP

**See the next file for a FULL WORKING EXAMPLE:**
`EMPLOYEES_LIST_TEMPLATE.tsx`

This is a complete, production-ready implementation of the Employees List page that your builder can use as a pattern for all other pages.

**Pattern to follow:**
1. Copy the structure from the template
2. Replace API endpoints
3. Adjust table columns
4. Update filters
5. Test and deploy

---

## 📞 Support

If you need clarification on any page or API endpoint, refer to:
- API documentation in `/api` folders
- Database schema in `supabase/` folder
- Existing admin pages for design patterns

**Questions?** Create a GitHub issue or contact the development team.
