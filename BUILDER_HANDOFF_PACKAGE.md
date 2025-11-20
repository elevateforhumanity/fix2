# 📦 Builder Handoff Package

## Complete UI Implementation Guide

**Date:** November 20, 2025  
**Project:** Elevate for Humanity - Phase 1 UI Completion  
**Objective:** Connect all HR, Marketing, and Events backend APIs to user-facing UI

---

## 📋 What's Included

### 1. **Execution Script** ✅

**File:** `PHASE_1_UI_COMPLETION_SCRIPT.md`

Complete step-by-step guide with:

- 23 pages to build
- API endpoints for each
- UI requirements
- Implementation checklist
- Priority order

### 2. **Working Template** ✅

**File:** `EMPLOYEES_LIST_TEMPLATE.tsx`

Full production-ready code for Employees List page including:

- TypeScript types
- Data fetching
- Filters (search, dropdown, status)
- Pagination
- Loading/error states
- Responsive design
- URL-based state management

**Use this as the pattern for all other list pages!**

### 3. **RBAC Helper** ✅

**File:** `lib/rbac.ts`

Role-based access control utilities:

- `requireAdmin()` - Check if user is admin
- `hasRole()` - Check specific roles
- `canAccessHR()` - HR feature access
- `canAccessAdmin()` - Admin feature access

### 4. **Contact Management** ✅

**Files:**

- `app/admin/contacts/page.tsx` - Admin contacts interface
- `app/partner-application/page.tsx` - Public partner application form
- `app/api/marketing/send-welcome/route.ts` - Email API
- `supabase/CREATE_MARKETING_CONTACTS.sql` - Database schema
- `scripts/insert-contacts.mjs` - Data insertion script
- `CONTACT_MANAGEMENT_SETUP.md` - Setup guide

### 5. **Partnership Documents** ✅

**Files:**

- `public/docs/PROGRAM_HOLDER_ONBOARDING_PACKET.md` - Complete onboarding guide
- `public/docs/PARTNER_MOU_TEMPLATE.md` - Legal MOU template

---

## 🚀 Quick Start for Builder

### Step 1: Review the Execution Script

Read `PHASE_1_UI_COMPLETION_SCRIPT.md` to understand:

- All 23 pages that need to be built
- API endpoints available
- UI requirements
- Implementation order

### Step 2: Study the Template

Open `EMPLOYEES_LIST_TEMPLATE.tsx` and understand:

- Component structure
- Data fetching pattern
- Filter implementation
- Pagination logic
- Error handling

### Step 3: Start with Priority Pages

Build in this order:

**Week 1: HR Admin (High Priority)**

1. Employees List (use template)
2. Employee Detail
3. HR Dashboard
4. Payroll Runs

**Week 2: Employee Self-Service** 5. My HR Overview 6. Clock In/Out 7. My Leave Requests 8. My Pay Stubs

**Week 3: Marketing & Events** 9. Campaigns List 10. Events Admin 11. Public Events

### Step 4: Follow the Pattern

For each new page:

1. Copy `EMPLOYEES_LIST_TEMPLATE.tsx`
2. Update types to match your data
3. Change API endpoint
4. Modify table columns
5. Adjust filters
6. Test thoroughly

---

## 📊 Implementation Checklist

### Phase 1A: HR Admin (Priority)

- [ ] `lib/rbac.ts` - ✅ Already exists
- [ ] `app/(admin)/layout.tsx` - Admin layout with auth
- [ ] `app/(admin)/hr/employees/page.tsx` - ⭐ START HERE (template provided)
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

## 🎯 Key Patterns to Follow

### 1. Server vs Client Components

```typescript
// Server Component (default) - for initial data
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent initialData={data} />;
}

// Client Component - for interactivity
"use client";
export default function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  // ... interactive logic
}
```

### 2. URL-Based Filters

```typescript
const searchParams = useSearchParams();
const router = useRouter();

function updateFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  router.push(`?${params.toString()}`);
}
```

### 3. API Calls

```typescript
const response = await fetch('/api/hr/employees?page=1&limit=20');
if (!response.ok) throw new Error('Failed to fetch');
const data = await response.json();
```

### 4. Error Handling

```typescript
try {
  await fetchData();
} catch (err: any) {
  console.error('Error:', err);
  setError(err.message || 'Something went wrong');
}
```

### 5. Loading States

```typescript
const [loading, setLoading] = useState(true);

if (loading) {
  return <LoadingSpinner />;
}
```

---

## 🔒 Authentication & Authorization

### Protect Admin Routes

```typescript
// app/(admin)/layout.tsx
import { requireAdmin } from '@/lib/rbac';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const { isAdmin } = await requireAdmin();

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return <div>{children}</div>;
}
```

### Check Permissions in API Routes

```typescript
// app/api/hr/employees/route.ts
import { requireAdmin } from '@/lib/rbac';

export async function GET(req: Request) {
  const { isAdmin, isHRAdmin } = await requireAdmin();

  if (!isAdmin && !isHRAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // ... fetch data
}
```

---

## 🎨 Design Guidelines

### Use Existing Components

- Match the style of existing admin pages
- Use Tailwind CSS classes consistently
- Follow the color scheme:
  - Primary: `blue-600`
  - Success: `green-600`
  - Warning: `yellow-600`
  - Danger: `red-600`

### Responsive Design

- Mobile-first approach
- Use `md:` and `lg:` breakpoints
- Test on mobile, tablet, desktop

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

---

## 🧪 Testing Checklist

For each page, test:

- [ ] Data loads correctly
- [ ] Filters work and update URL
- [ ] Pagination works
- [ ] Search works
- [ ] Loading states display
- [ ] Error states display
- [ ] Mobile responsive
- [ ] Actions (view, edit, delete) work
- [ ] Forms validate properly
- [ ] Success/error messages show

---

## 📞 Support & Questions

### Documentation

- API docs: Check `/api` folder for route files
- Database schema: `supabase/` folder
- Existing patterns: Look at current admin pages

### Common Issues

**Q: API returns 404**
A: Check if the API route exists in `/api` folder

**Q: Data not loading**
A: Check browser console for errors, verify API response

**Q: Filters not working**
A: Ensure URL params are being read and updated correctly

**Q: Pagination broken**
A: Verify `page` and `limit` params are being sent to API

**Q: Auth errors**
A: Check if user is logged in and has correct role

---

## 🎉 Success Criteria

Phase 1 is complete when:

- ✅ All 23 pages are built and functional
- ✅ All filters and search work
- ✅ Pagination works on all list pages
- ✅ Forms validate and submit correctly
- ✅ Error handling is in place
- ✅ Loading states display properly
- ✅ Mobile responsive
- ✅ No console errors
- ✅ All tests pass

---

## 📈 Timeline Estimate

**Experienced Developer:**

- Week 1: HR Admin pages (8 pages) - 40 hours
- Week 2: Employee Self-Service (6 pages) - 24 hours
- Week 3: Marketing & Events (9 pages) - 36 hours
- **Total: 100 hours / 2.5 weeks**

**Junior Developer:**

- Week 1-2: HR Admin pages - 60 hours
- Week 3-4: Employee Self-Service - 40 hours
- Week 5-6: Marketing & Events - 60 hours
- **Total: 160 hours / 4 weeks**

---

## 🚀 Let's Build!

You have everything you need:

1. ✅ Complete execution script
2. ✅ Working code template
3. ✅ RBAC utilities
4. ✅ Design patterns
5. ✅ Testing checklist

**Start with `app/(admin)/hr/employees/page.tsx` using the template, and you'll be flying through the rest!**

Good luck! 🎯
