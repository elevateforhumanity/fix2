# Three Portals System - Complete Structure

**Date:** 2025-11-11  
**Site:** https://elevateconnects1.netlify.app/  
**System:** Student, Partner, and Staff Portals

---

## PORTAL STRUCTURE

### 1. STUDENT PORTAL
**Purpose:** Students access courses, track progress, earn certificates

#### Main Hub
- `/student-portal` - Main portal hub with quick links

#### Individual Pages Created
- `/student/dashboard` - Overview dashboard with stats
- `/student/courses` - All enrolled courses with filters

#### Pages Needed (Phase 2)
- `/student/course/:id` - Course player
- `/student/assignments` - Assignment list
- `/student/certificates` - Certificate gallery
- `/student/schedule` - Class schedule
- `/student/profile` - Student profile settings

---

### 2. PARTNER PORTAL
**Purpose:** Partner organizations manage programs and students

#### Main Hub
- `/partner-portal` - Main partner dashboard

#### Individual Pages Created
- `/partner/students` - Manage all students

#### Pages Needed (Phase 2)
- `/partner/dashboard` - Partner overview
- `/partner/applications` - Review applications
- `/partner/programs` - Manage programs
- `/partner/reports` - Analytics and reports
- `/partner/settings` - Partner settings

---

### 3. STAFF PORTAL
**Purpose:** Staff/admin manage entire LMS system

#### Main Hub
- `/staff-portal` - Main staff dashboard

#### Pages Needed (Phase 2)
- `/staff/dashboard` - System overview
- `/staff/students` - All student management
- `/staff/partners` - All partner management
- `/staff/courses` - Course management
- `/staff/applications` - Application approvals
- `/staff/reports` - System reports
- `/staff/funding` - WIOA/WRG/JRI tracking
- `/staff/settings` - System settings

---

## FILES CREATED

### Student Portal
1. `/src/pages/portals/StudentPortalAccess.tsx` - Main hub
2. `/src/pages/student/Dashboard.tsx` - Dashboard
3. `/src/pages/student/MyCourses.tsx` - Course list

### Partner Portal
1. `/src/pages/portals/PartnerPortal.tsx` - Main hub
2. `/src/pages/partner/ManageStudents.tsx` - Student management

### Staff Portal
1. `/src/pages/portals/StaffPortal.tsx` - Main hub

### Supporting
1. `/src/pages/CourseCatalogPage.tsx` - Public course catalog

---

## PHASE 2 - INDIVIDUAL PAGES TO CREATE

### Student Portal Pages

#### `/student/course/:id` - Course Player
```typescript
- Video player
- Lesson navigation
- Progress tracking
- Notes section
- Resources download
- Next/Previous lesson
```

#### `/student/assignments` - Assignments
```typescript
- Assignment list
- Due dates
- Submit work
- View grades
- Feedback from instructors
```

#### `/student/certificates` - Certificates
```typescript
- Certificate gallery
- Download PDF
- Share on LinkedIn
- Verification codes
```

#### `/student/schedule` - Schedule
```typescript
- Calendar view
- Upcoming classes
- Past sessions
- Add to calendar
```

---

### Partner Portal Pages

#### `/partner/dashboard` - Dashboard
```typescript
- Program overview
- Student stats
- Recent activity
- Quick actions
```

#### `/partner/applications` - Applications
```typescript
- Pending applications
- Review/approve
- Reject with reason
- Bulk actions
```

#### `/partner/programs` - Programs
```typescript
- Active programs
- Create new program
- Edit program details
- Archive programs
```

#### `/partner/reports` - Reports
```typescript
- Student progress reports
- Completion rates
- Funding utilization
- Export data
```

---

### Staff Portal Pages

#### `/staff/students` - Student Management
```typescript
- All students list
- Search/filter
- Edit student info
- Enrollment management
- Bulk operations
```

#### `/staff/partners` - Partner Management
```typescript
- All partners list
- Approve new partners
- Edit partner info
- Program oversight
```

#### `/staff/courses` - Course Management
```typescript
- All courses list
- Create new course
- Edit course content
- Manage instructors
- Course analytics
```

#### `/staff/applications` - Applications
```typescript
- All applications
- Approve/reject
- Assign to programs
- Track status
```

#### `/staff/reports` - System Reports
```typescript
- System-wide analytics
- Revenue reports
- Completion rates
- Funding reports
- Custom reports
```

#### `/staff/funding` - Funding Management
```typescript
- WIOA allocations
- WRG tracking
- JRI management
- Budget overview
- Expense tracking
```

---

## PHASE 3 - ADVANCED FEATURES

### Student Portal
- [ ] AI Tutor integration
- [ ] Peer messaging
- [ ] Study groups
- [ ] Gamification (badges, points)
- [ ] Mobile app

### Partner Portal
- [ ] Automated reporting
- [ ] API access
- [ ] Custom branding
- [ ] White-label option
- [ ] Bulk student upload

### Staff Portal
- [ ] Advanced analytics
- [ ] Automated workflows
- [ ] Email campaigns
- [ ] SMS notifications
- [ ] Audit logs
- [ ] Role-based permissions

---

## AUTHENTICATION & ROLES

### User Roles
1. **Student** - Access student portal only
2. **Partner** - Access partner portal only
3. **Staff** - Access staff portal only
4. **Admin** - Access all portals

### Authentication Flow
```
1. User logs in
2. System checks role
3. Redirect to appropriate portal:
   - Student → /student/dashboard
   - Partner → /partner/dashboard
   - Staff → /staff/dashboard
   - Admin → /staff/dashboard (with full access)
```

### Role-Based Access Control (RBAC)
```typescript
interface User {
  id: string;
  email: string;
  role: 'student' | 'partner' | 'staff' | 'admin';
  permissions: string[];
}

// Middleware checks role before allowing access
```

---

## NAVIGATION STRUCTURE

### Student Portal Nav
```
- Dashboard
- My Courses
- Assignments
- Certificates
- Schedule
- Profile
```

### Partner Portal Nav
```
- Dashboard
- Students
- Applications
- Programs
- Reports
- Settings
```

### Staff Portal Nav
```
- Dashboard
- Students
- Partners
- Courses
- Applications
- Reports
- Funding
- Settings
```

---

## DATA MODELS

### Student
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourses: Course[];
  completedCourses: Course[];
  certificates: Certificate[];
  progress: number;
  totalHours: number;
}
```

### Partner
```typescript
interface Partner {
  id: string;
  name: string;
  type: string;
  activePrograms: Program[];
  totalStudents: number;
  completions: number;
  fundingAllocated: number;
}
```

### Course
```typescript
interface Course {
  id: string;
  title: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  status: 'in-progress' | 'completed';
  enrolledDate: string;
  completedDate?: string;
}
```

---

## NEXT STEPS

### Immediate (Today)
1. ✅ Create portal hub pages
2. ✅ Create initial individual pages
3. [ ] Add routing for all pages
4. [ ] Test navigation between pages
5. [ ] Build and deploy

### Short Term (This Week)
6. [ ] Create remaining Phase 2 pages
7. [ ] Add authentication
8. [ ] Connect to Supabase
9. [ ] Add real data
10. [ ] Test all portals

### Medium Term (This Month)
11. [ ] Implement Phase 3 features
12. [ ] Add payment processing
13. [ ] Create mobile app
14. [ ] Advanced analytics
15. [ ] Production deployment

---

## ROUTING CONFIGURATION

### Add to AppRoutes.tsx
```typescript
// Student Portal
<Route path="/student-portal" element={<StudentPortalAccess />} />
<Route path="/student/dashboard" element={<StudentDashboard />} />
<Route path="/student/courses" element={<MyCourses />} />
<Route path="/student/course/:id" element={<CoursePlayer />} />
<Route path="/student/assignments" element={<Assignments />} />
<Route path="/student/certificates" element={<Certificates />} />
<Route path="/student/schedule" element={<Schedule />} />

// Partner Portal
<Route path="/partner-portal" element={<PartnerPortal />} />
<Route path="/partner/dashboard" element={<PartnerDashboard />} />
<Route path="/partner/students" element={<ManageStudents />} />
<Route path="/partner/applications" element={<Applications />} />
<Route path="/partner/programs" element={<Programs />} />
<Route path="/partner/reports" element={<Reports />} />

// Staff Portal
<Route path="/staff-portal" element={<StaffPortal />} />
<Route path="/staff/dashboard" element={<StaffDashboard />} />
<Route path="/staff/students" element={<StudentManagement />} />
<Route path="/staff/partners" element={<PartnerManagement />} />
<Route path="/staff/courses" element={<CourseManagement />} />
<Route path="/staff/applications" element={<ApplicationManagement />} />
<Route path="/staff/reports" element={<SystemReports />} />
<Route path="/staff/funding" element={<FundingManagement />} />
```

---

## DEPLOYMENT CHECKLIST

- [ ] All portal hub pages created
- [ ] Individual pages created (Phase 2)
- [ ] Routing configured
- [ ] Navigation menus updated
- [ ] Authentication added
- [ ] Database connected
- [ ] Test all portals
- [ ] Build successful
- [ ] Deploy to Netlify
- [ ] Verify live site

---

**Status:** Phase 1 Complete - Portal hubs and initial pages created  
**Next:** Add routing and create remaining Phase 2 pages  
**Goal:** Full three-portal system with role-based access
