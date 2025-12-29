# Dashboard Separation Plan

## 🎯 GOAL

**Separate all dashboards with internal navigation instead of header dropdowns**

---

## 📊 CURRENT PROBLEM

**Header dropdown shows dashboard items:**
- "My Dashboard"
- "My Courses"  
- "My Progress"
- "Admin Dashboard"
- "Employer Dashboard"
- etc.

**This clutters the header and mixes public navigation with dashboard features.**

---

## ✅ SOLUTION

### 1. Clean Header
**Remove from header dropdown:**
- All "Dashboard" items
- All "My [Something]" items
- All role-specific portal items

**Keep in header:**
- Programs
- Funding
- Services
- Learn
- Platform
- About
- Single "Dashboard" button (when logged in)

### 2. Separate Dashboards

Each dashboard gets its own internal navigation:

#### **Student Dashboard** (`/lms/dashboard` or `/student/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- My Courses
- My Progress
- Assignments
- Grades
- Certificates
- Career Counseling

#### **Admin Dashboard** (`/admin/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- Applications
- Students
- Enrollments
- Programs
- Program Holders
- Partners
- Reports
- Settings

#### **Employer Dashboard** (`/employer/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- My Shop
- Apprenticeships
- Post Jobs
- Hire Graduates
- Reports

#### **Program Holder Dashboard** (`/program-holder/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- My Programs
- Students
- Enrollments
- Documents
- Reports

#### **Partner Dashboard** (`/partner/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- Courses
- Students
- Analytics

#### **Staff Dashboard** (`/staff-portal/dashboard`)
Internal sidebar/tabs:
- Overview (default)
- Customer Service
- Applications
- Reports

---

## 🔧 IMPLEMENTATION STEPS

### Step 1: Update Navigation Config
Remove dashboard items from `config/navigation-clean.ts`:
- Remove `studentNav` items from header
- Remove `adminNav` items from header
- Remove `employerNav` items from header
- Remove all role-specific nav from header

### Step 2: Create Dashboard Layouts
Each dashboard needs its own layout with sidebar:
- `app/lms/(app)/layout.tsx` - Student dashboard layout
- `app/admin/layout.tsx` - Admin dashboard layout
- `app/employer/layout.tsx` - Employer dashboard layout
- `app/program-holder/layout.tsx` - Program holder layout
- `app/partner/layout.tsx` - Partner layout
- `app/staff-portal/layout.tsx` - Staff layout

### Step 3: Create Dashboard Navigation Components
- `components/dashboards/StudentNav.tsx`
- `components/dashboards/AdminNav.tsx`
- `components/dashboards/EmployerNav.tsx`
- `components/dashboards/ProgramHolderNav.tsx`
- `components/dashboards/PartnerNav.tsx`
- `components/dashboards/StaffNav.tsx`

### Step 4: Update Header
- Remove dashboard dropdowns
- Keep single "Dashboard" button
- Button routes to correct dashboard based on user role

---

## 📋 NAVIGATION STRUCTURE

### Public Header (Not Logged In)
```
[Logo] Programs | Funding | Services | Learn | Platform | About    [Apply Now] [Login]
```

### Public Header (Logged In)
```
[Logo] Programs | Funding | Services | Learn | Platform | About    [Dashboard]
```

### Inside Student Dashboard
```
Header: [Logo] Programs | Funding | Services | Learn | Platform | About    [Dashboard]

Dashboard:
┌─────────────────┬──────────────────────────────────┐
│ Sidebar         │ Main Content                     │
├─────────────────┼──────────────────────────────────┤
│ Overview        │                                  │
│ My Courses      │  Dashboard Overview Content      │
│ My Progress     │                                  │
│ Assignments     │                                  │
│ Grades          │                                  │
│ Certificates    │                                  │
│ Career Help     │                                  │
└─────────────────┴──────────────────────────────────┘
```

### Inside Admin Dashboard
```
Header: [Logo] Programs | Funding | Services | Learn | Platform | About    [Dashboard]

Dashboard:
┌─────────────────┬──────────────────────────────────┐
│ Sidebar         │ Main Content                     │
├─────────────────┼──────────────────────────────────┤
│ Overview        │                                  │
│ Applications    │  Admin Dashboard Content         │
│ Students        │                                  │
│ Enrollments     │                                  │
│ Programs        │                                  │
│ Program Holders │                                  │
│ Partners        │                                  │
│ Reports         │                                  │
│ Settings        │                                  │
└─────────────────┴──────────────────────────────────┘
```

---

## ✅ BENEFITS

1. **Cleaner Header** - No dashboard clutter
2. **Better UX** - Features grouped by context
3. **Easier Navigation** - All features visible in sidebar
4. **Role Separation** - Each role has distinct experience
5. **Scalable** - Easy to add features to each dashboard

---

## 🚀 IMPLEMENTATION ORDER

1. ✅ Remove dashboard items from header navigation config
2. ✅ Create dashboard navigation components
3. ✅ Update dashboard layouts to include sidebars
4. ✅ Test each dashboard
5. ✅ Commit and deploy

---

**This will create a clean separation between public navigation and dashboard features!**
