# LMS Course Locations - Complete Guide

## 🎓 Where Courses Are Located

### Main LMS System

**Primary LMS:** `/lms`

This is the full Learning Management System with all features.

---

## 📍 Course Access URLs

### 1. Main LMS Dashboard
```
/lms
```
**Features:**
- Student dashboard
- Course overview
- Progress tracking
- Assignments
- Grades

### 2. All Courses List
```
/lms/courses
```
**Features:**
- Browse all courses
- Search courses
- Filter by category
- Enroll in courses

### 3. Individual Course
```
/lms/courses/[id]
```
**Example:** `/lms/courses/barber-101`

**Features:**
- Course overview
- Syllabus
- Lessons
- Assignments
- Quizzes
- Discussion forums

### 4. Course Lessons
```
/lms/courses/[id]/lessons/[lessonId]
```
**Example:** `/lms/courses/barber-101/lessons/1`

**Features:**
- Video lessons
- Reading materials
- Interactive content
- Progress tracking

### 5. Alternative Course View
```
/lms/course/[courseId]
```
**Features:**
- Simplified course view
- Quick access to content

---

## 📚 Student Course Access

### Student Portal
```
/courses
```
**Features:**
- My enrolled courses
- Course catalog
- Course search
- Enrollment

### Individual Course (Student View)
```
/courses/[courseId]
```
**Features:**
- Course content
- Assignments
- Grades
- Progress

---

## 👨‍🏫 Instructor Course Management

### Instructor Portal
```
/instructor/courses
```
**Features:**
- My courses
- Create course
- Edit course
- Manage students
- Grade assignments

---

## 🏢 Program Holder Course Management

### Program Holder Portal
```
/program-holder/courses
```
**Features:**
- Program courses
- Student enrollment
- Progress tracking
- Reporting

---

## 🔧 Admin Course Management

### Admin Course Dashboard
```
/admin/courses
```
**Features:**
- All courses
- Create/edit courses
- Bulk operations
- Course analytics

### Course Builder
```
/admin/course-builder
```
**Features:**
- Visual course builder
- Drag-and-drop lessons
- Add multimedia
- Create quizzes

### Course Studio
```
/admin/course-studio
```
**Features:**
- Advanced course editing
- Content management
- Template system

### AI Course Builder
```
/admin/course-studio-ai
```
**Features:**
- AI-generated courses
- Auto-create content
- Smart curriculum

---

## 🎯 Barber Course Specific Locations

### Public View
```
/programs/barber
```
Program information page

### LMS Course
```
/lms/courses/barber-training
```
Full barber course with lessons

### Student Enrolled View
```
/courses/barber-training
```
Student's enrolled barber course

### Admin Management
```
/admin/courses
```
Search for "barber" to find and edit

---

## 📊 LMS Features by Location

### `/lms` - Main LMS
- ✅ Dashboard
- ✅ Courses
- ✅ Assignments
- ✅ Quizzes
- ✅ Grades
- ✅ Progress
- ✅ Certificates
- ✅ Forums
- ✅ Chat
- ✅ Calendar
- ✅ Notifications
- ✅ Profile
- ✅ Analytics
- ✅ Achievements
- ✅ Learning Paths
- ✅ Study Groups
- ✅ Peer Review
- ✅ Resources
- ✅ Help & Support

### `/lms/courses` - Course Catalog
- ✅ Browse courses
- ✅ Search & filter
- ✅ Course details
- ✅ Enroll
- ✅ Prerequisites
- ✅ Reviews & ratings

### `/lms/courses/[id]` - Course Page
- ✅ Course overview
- ✅ Syllabus
- ✅ Lessons list
- ✅ Assignments
- ✅ Quizzes
- ✅ Discussion forum
- ✅ Resources
- ✅ Progress tracker
- ✅ Certificate

### `/lms/courses/[id]/lessons/[lessonId]` - Lesson Page
- ✅ Video player
- ✅ Reading content
- ✅ Interactive elements
- ✅ Downloads
- ✅ Notes
- ✅ Bookmarks
- ✅ Next/Previous navigation

---

## 🗄️ Where Course Data is Stored

### Database (Supabase)
**Tables:**
- `courses` - Course information
- `lessons` - Lesson content
- `enrollments` - Student enrollments
- `progress` - Student progress
- `assignments` - Assignment data
- `quizzes` - Quiz data
- `grades` - Student grades

### File System
**Content:**
- `/content/courses/` - Course content files
- `/public/media/courses/` - Course media (videos, images)
- `/data/programs.ts` - Program definitions

---

## 🚀 Quick Access Guide

### For Students:
1. **Login:** `/login`
2. **Go to LMS:** `/lms`
3. **Browse Courses:** `/lms/courses`
4. **Enroll in Course:** Click "Enroll"
5. **Start Learning:** `/lms/courses/[id]`

### For Instructors:
1. **Login:** `/login`
2. **Instructor Portal:** `/instructor/courses`
3. **Create Course:** Click "New Course"
4. **Manage Students:** View enrolled students
5. **Grade Work:** Review and grade assignments

### For Admins:
1. **Login:** `/login`
2. **Admin Dashboard:** `/admin`
3. **Course Management:** `/admin/courses`
4. **Course Builder:** `/admin/course-builder`
5. **View Analytics:** `/admin/analytics`

---

## 🔍 Finding the Barber Course

### Method 1: Direct URL
```
/lms/courses/barber-training
```

### Method 2: Search
1. Go to `/lms/courses`
2. Search for "barber"
3. Click on course

### Method 3: Admin Search
1. Go to `/admin/courses`
2. Search for "barber"
3. Click to view/edit

### Method 4: Program Page
1. Go to `/programs/barber`
2. Click "View Course" or "Enroll"
3. Redirects to LMS course

---

## 📱 Mobile Access

All LMS pages are mobile-responsive:
- `/lms` - Mobile dashboard
- `/lms/courses` - Mobile course list
- `/lms/courses/[id]` - Mobile course view
- Full functionality on mobile devices

---

## 🎬 Course Content Types

### Video Lessons
- Hosted videos
- YouTube embeds
- Vimeo embeds
- Interactive video

### Reading Materials
- Text content
- PDFs
- Documents
- Articles

### Interactive Content
- Quizzes
- Assignments
- Discussions
- Peer reviews

### Assessments
- Multiple choice
- True/false
- Short answer
- Essay questions
- Practical exams

---

## ✅ Current Status

**LMS System:** ✅ Fully Functional

- ✅ Course catalog working
- ✅ Enrollment system working
- ✅ Lesson delivery working
- ✅ Progress tracking working
- ✅ Grading system working
- ✅ Certificate generation working
- ✅ All features accessible

---

## 🔐 Access Requirements

### Students:
- Login required
- Enrollment in course
- Active account

### Instructors:
- Login required
- Instructor role
- Assigned to course

### Admins:
- Login required
- Admin role
- Full access to all courses

---

## 📞 Support

**Can't find a course?**
1. Check if you're logged in
2. Verify enrollment status
3. Search by course name
4. Check with admin

**Course not loading?**
1. Clear browser cache
2. Check internet connection
3. Try different browser
4. Contact support

---

## 🎯 Summary

**Main LMS Location:** `/lms`  
**Course Catalog:** `/lms/courses`  
**Individual Course:** `/lms/courses/[id]`  
**Admin Management:** `/admin/courses`  

**All course content is accessible through the LMS system!**
