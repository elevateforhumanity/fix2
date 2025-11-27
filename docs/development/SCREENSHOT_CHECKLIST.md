# Screenshot Capture Checklist

## 🎯 Quick Reference

**Development Server**: [https://3000--019ac0a5-280f-7915-a561-3b38d79f1d69.us-east-1-01.gitpod.dev](https://3000--019ac0a5-280f-7915-a561-3b38d79f1d69.us-east-1-01.gitpod.dev)

**Screenshot Directory**: `/workspaces/fix2/screenshots/`

---

## 🚀 Quick Start Options

### Option 1: Automated (Recommended)
```bash
# Install puppeteer if not already installed
npm install puppeteer

# Run automated capture
node scripts/capture-all-screenshots.js
```

### Option 2: Manual Capture
1. Open the development server URL
2. Navigate to each page
3. Use browser screenshot tools (F12 → Ctrl+Shift+P → "Capture screenshot")
4. Save to appropriate directory

---

## ✅ MARKETING SITE (29 pages)

### Homepage & Core (5 pages)
- [ ] `/` → `screenshots/marketing/homepage/homepage-{device}.png`
- [ ] `/about` → `screenshots/marketing/homepage/about-{device}.png`
- [ ] `/contact` → `screenshots/marketing/homepage/contact-{device}.png`
- [ ] `/faq` → `screenshots/marketing/homepage/faq-{device}.png`
- [ ] `/pricing` → `screenshots/marketing/homepage/pricing-{device}.png`

### Programs (9 pages)
- [ ] `/programs` → `screenshots/marketing/programs/programs-overview-{device}.png`
- [ ] `/programs/medical-assistant`
- [ ] `/programs/cna`
- [ ] `/programs/pharmacy-technician`
- [ ] `/programs/dental-assistant`
- [ ] `/programs/hvac-technician`
- [ ] `/programs/truck-driving`
- [ ] `/programs/barber`
- [ ] `/programs/professional-esthetician`

### Stakeholders (5 pages)
- [ ] `/employers` → `screenshots/marketing/stakeholders/`
- [ ] `/workforce-partners`
- [ ] `/training-providers`
- [ ] `/partners`
- [ ] `/philanthropy`

### Resources (5 pages)
- [ ] `/resources` → `screenshots/marketing/resources/`
- [ ] `/blog`
- [ ] `/webinars`
- [ ] `/success-stories`
- [ ] `/careers`

### Enrollment (5 pages)
- [ ] `/apply` → `screenshots/marketing/enrollment/`
- [ ] `/getstarted`
- [ ] `/demo`
- [ ] `/financial-aid`
- [ ] `/wioa-eligibility`

---

## ✅ LMS CORE (29 pages)

### Dashboard (4 pages)
- [ ] `/lms` → `screenshots/lms/dashboard/`
- [ ] `/lms/dashboard`
- [ ] `/lms/analytics`
- [ ] `/lms/progress`

### Courses (2 pages)
- [ ] `/lms/courses` → `screenshots/lms/courses/`
- [ ] `/lms/enroll`

### Learning (5 pages)
- [ ] `/lms/assignments` → `screenshots/lms/learning/`
- [ ] `/lms/grades`
- [ ] `/lms/achievements`
- [ ] `/lms/certificates`
- [ ] `/lms/learning-paths`

### Collaboration (4 pages)
- [ ] `/lms/forums` → `screenshots/lms/collaboration/`
- [ ] `/lms/study-groups`
- [ ] `/lms/chat`
- [ ] `/lms/messages`

### Tools (6 pages)
- [ ] `/lms/calendar` → `screenshots/lms/tools/`
- [ ] `/lms/library`
- [ ] `/lms/files`
- [ ] `/lms/resources`
- [ ] `/lms/profile`
- [ ] `/lms/help`

---

## ✅ STUDENT PORTAL (19 pages)

### Dashboard (4 pages)
- [ ] `/student/dashboard` → `screenshots/student-portal/dashboard/`
- [ ] `/student/dashboard-enhanced`
- [ ] `/student/studenthub`
- [ ] `/portal/student`

### Learning (5 pages)
- [ ] `/student/courses` → `screenshots/student-portal/learning/`
- [ ] `/student/assignments`
- [ ] `/student/grades`
- [ ] `/student/progress`
- [ ] `/student/learning-path`

### Features (7 pages)
- [ ] `/student/calendar` → `screenshots/student-portal/features/`
- [ ] `/student/resources`
- [ ] `/student/profile`
- [ ] `/student/analytics`
- [ ] `/student/badges`
- [ ] `/student/certificates`
- [ ] `/student/competencies`

### Support (2 pages)
- [ ] `/student/career-counseling` → `screenshots/student-portal/support/`
- [ ] `/student/skills-gap`

---

## ✅ INSTRUCTOR PORTAL (2 pages)

### Dashboard (2 pages)
- [ ] `/instructor/dashboard` → `screenshots/instructor-portal/dashboard/`
- [ ] `/instructor/analytics`

---

## ✅ ADMIN PORTAL (19 pages)

### Dashboard (3 pages)
- [ ] `/admin` → `screenshots/admin-portal/dashboard/`
- [ ] `/admin/dashboard`
- [ ] `/admin/console`

### User Management (3 pages)
- [ ] `/admin/users` → `screenshots/admin-portal/user-management/`
- [ ] `/admin/students`
- [ ] `/admin/instructors/performance`

### Course Management (5 pages)
- [ ] `/admin/courses` → `screenshots/admin-portal/course-management/`
- [ ] `/admin/courses/create`
- [ ] `/admin/courses/builder`
- [ ] `/admin/ai-course-builder`
- [ ] `/admin/quiz-builder`

### Analytics (5 pages)
- [ ] `/admin/analytics` → `screenshots/admin-portal/analytics/`
- [ ] `/admin/analytics/engagement`
- [ ] `/admin/analytics/learning`
- [ ] `/admin/reports`
- [ ] `/admin/impact`

### Operations (4 pages)
- [ ] `/admin/operations` → `screenshots/admin-portal/operations/`
- [ ] `/admin/workflows`
- [ ] `/admin/compliance`
- [ ] `/admin/security`

---

## ✅ ADDITIONAL FEATURES (11 pages)

### AI Tools (2 pages)
- [ ] `/ai-tutor` → `screenshots/features/ai-tools/`
- [ ] `/ai-chat`

### Community (4 pages)
- [ ] `/community` → `screenshots/features/community/`
- [ ] `/study-groups`
- [ ] `/mentorship`
- [ ] `/leaderboard`

### Employer (3 pages)
- [ ] `/employer/dashboard` → `screenshots/features/employer/`
- [ ] `/employer/analytics`
- [ ] `/employer/post-job`

---

## 📊 Progress Summary

- **Marketing Site**: 0/29 pages
- **LMS Core**: 0/29 pages
- **Student Portal**: 0/19 pages
- **Instructor Portal**: 0/2 pages
- **Admin Portal**: 0/19 pages
- **Additional Features**: 0/11 pages

**Total Progress**: 0/109 pages (0%)

---

## 📸 For Each Page Capture:

### Required Views:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Optional Views:
- [ ] Desktop - Above the fold
- [ ] Mobile - Menu open
- [ ] Loading state
- [ ] Populated state
- [ ] Empty state

---

## 🎨 Quality Checklist

Before marking a page complete:
- [ ] All text is readable
- [ ] Images are loaded
- [ ] No broken layouts
- [ ] Proper contrast
- [ ] No Lorem Ipsum
- [ ] Realistic sample data
- [ ] Navigation visible
- [ ] Key features shown

---

## 📝 File Naming

Format: `{page-name}-{device}.png`

Examples:
- `homepage-desktop.png`
- `homepage-tablet.png`
- `homepage-mobile.png`
- `dashboard-desktop.png`
- `courses-mobile.png`

---

## 🔄 Update Progress

After completing each category, update the progress summary above.

Mark items with:
- `[x]` for completed
- `[ ]` for pending
- `[~]` for in progress

---

## 📞 Resources

- **Full Inventory**: `SCREENSHOT_INVENTORY.md`
- **Detailed Guide**: `SCREENSHOT_GUIDE.md`
- **Automated Script**: `scripts/capture-all-screenshots.js`
- **Screenshot Directory**: `/workspaces/fix2/screenshots/`

---

**Last Updated**: 2025-11-26
