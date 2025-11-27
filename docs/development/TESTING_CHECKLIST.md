# ✅ LMS Testing Checklist

## Pre-Testing Setup

Run these commands in order:

```bash
# 1. Create test users
node create-test-users.mjs

# 2. Create sample enrollments
node create-sample-enrollments.mjs
```

---

## Dashboard Testing

### 1. Student Dashboard (`/student/dashboard`)

**Login:** `student@test.com` / `Student123!`

- [ ] Dashboard loads without errors
- [ ] Stats grid shows correct numbers
  - [ ] Courses Enrolled count
  - [ ] Courses Completed count
  - [ ] Hours Logged
  - [ ] Achievements count
- [ ] Course cards display with:
  - [ ] Course title
  - [ ] Progress bar
  - [ ] "Continue Learning" button
- [ ] Due Soon list shows upcoming assignments
- [ ] Achievements strip displays earned badges
- [ ] Mobile responsive layout works

**Expected Data:**
- 2-3 enrolled courses
- 0 completed courses (new student)
- Some achievements earned
- Progress bars showing 0-45%

---

### 2. Program Holder Dashboard (`/program-holder/dashboard`)

**Login:** `programholder@test.com` / `ProgramHolder123!`

- [ ] Dashboard loads without errors
- [ ] Stats grid shows:
  - [ ] Total Learners
  - [ ] Active Enrollments
  - [ ] Revenue This Month
  - [ ] Completion Rate
- [ ] Program courses table displays
- [ ] At-risk learners table shows students
- [ ] Can click through to student details
- [ ] Revenue calculations are accurate
- [ ] Mobile responsive

**Expected Data:**
- Organization: Elite Training Academy
- Status: Approved
- Payout share: 33%

---

### 3. Delegate Dashboard (`/delegate/dashboard`)

**Login:** `delegate@test.com` / `Delegate123!`

- [ ] Dashboard loads without errors
- [ ] Stats grid shows:
  - [ ] Total Caseload
  - [ ] Active Learners
  - [ ] At Risk count
  - [ ] Avg Completion Rate
- [ ] Caseload table displays assigned students
- [ ] Can view student progress
- [ ] Can contact students
- [ ] Compliance tracking visible
- [ ] Mobile responsive

**Expected Data:**
- Organization: EmployIndy
- Territory: Marion County
- 1+ students in caseload

---

### 4. Admin Operations Dashboard (`/admin/operations`)

**Login:** `admin@elevateforhumanity.org` / `Admin123!`

- [ ] Dashboard loads without errors
- [ ] System stats show:
  - [ ] Total Users
  - [ ] Total Programs
  - [ ] Total Enrollments
  - [ ] Active Students
- [ ] Quick actions panel works
- [ ] System status panel shows health
- [ ] Can navigate to user management
- [ ] Can navigate to program management
- [ ] Mobile responsive

**Expected Data:**
- 5 users (admin, student, instructor, delegate, program holder)
- 10 programs
- 2-3 enrollments

---

### 5. Compliance Dashboard (`/admin/compliance`)

**Login:** `admin@elevateforhumanity.org` / `Admin123!`

- [ ] Dashboard loads without errors
- [ ] Compliance stats grid shows:
  - [ ] WIOA Enrollments
  - [ ] Completion Rate
  - [ ] Avg Time to Complete
  - [ ] Compliance Score
- [ ] WIOA tracking table displays
- [ ] Can filter by funding type
- [ ] Can export reports
- [ ] Mobile responsive

---

### 6. Analytics Dashboard (`/admin/analytics`)

**Login:** `admin@elevateforhumanity.org` / `Admin123!`

- [ ] Dashboard loads without errors
- [ ] Analytics stats show:
  - [ ] Total Revenue
  - [ ] Active Users
  - [ ] Completion Rate
  - [ ] Avg Session Time
- [ ] Charts and graphs display
- [ ] Can filter by date range
- [ ] Can export data
- [ ] Mobile responsive

---

## Feature Testing

### Authentication & Authorization

- [ ] Can login with all 5 test users
- [ ] Can logout successfully
- [ ] Password reset flow works
- [ ] Role-based access control works:
  - [ ] Students can't access admin pages
  - [ ] Admins can access all pages
  - [ ] Delegates can only see their caseload
  - [ ] Program holders can only see their data

### Enrollment Flow

- [ ] Student can browse programs at `/programs`
- [ ] Student can view program details
- [ ] Student can enroll in a program
- [ ] Enrollment appears in student dashboard
- [ ] Delegate can see enrollment in caseload
- [ ] Admin can see enrollment in system

### Progress Tracking

- [ ] Student can view enrolled courses
- [ ] Student can click into course
- [ ] Progress bar updates when lessons completed
- [ ] Hours logged are tracked
- [ ] Completion percentage is accurate

### Achievement System

- [ ] "First Login" achievement awarded on first login
- [ ] "Profile Complete" awarded when profile filled
- [ ] "First Lesson" awarded when lesson completed
- [ ] Achievement points are tracked
- [ ] Achievements display in student dashboard

### Program Management

- [ ] Admin can view all programs
- [ ] Admin can create new program
- [ ] Admin can edit program details
- [ ] Admin can deactivate program
- [ ] Program holder can view their programs

### User Management

- [ ] Admin can view all users
- [ ] Admin can create new user
- [ ] Admin can edit user details
- [ ] Admin can assign roles
- [ ] Admin can deactivate user

---

## Performance Testing

- [ ] Pages load in < 2 seconds
- [ ] No console errors
- [ ] No 404 errors
- [ ] Images load properly
- [ ] Database queries are optimized
- [ ] No memory leaks

---

## Mobile Testing

Test on mobile device or browser dev tools:

- [ ] All dashboards responsive
- [ ] Navigation menu works
- [ ] Forms are usable
- [ ] Tables scroll horizontally
- [ ] Buttons are tappable
- [ ] Text is readable

---

## Browser Testing

Test in multiple browsers:

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Security Testing

- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF protection
- [ ] RLS policies enforced
- [ ] API keys not exposed
- [ ] Sensitive data encrypted

---

## Deployment Testing

After deploying to production:

- [ ] Production URL works
- [ ] Environment variables set
- [ ] Database connected
- [ ] Auth working
- [ ] All features functional
- [ ] SSL certificate valid
- [ ] Custom domain working (if applicable)

---

## Bug Tracking

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
|       |          |        |       |

---

## Sign-Off

- [ ] All critical features tested
- [ ] All dashboards functional
- [ ] No blocking bugs
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Ready for production

**Tested by:** _______________  
**Date:** _______________  
**Approved by:** _______________  
**Date:** _______________  

---

## Next Steps After Testing

1. **Fix any bugs found**
2. **Add real content** (videos, lessons, quizzes)
3. **Configure email notifications**
4. **Set up payment processing**
5. **Train staff on system**
6. **Invite real students**
7. **Go live!** 🚀
