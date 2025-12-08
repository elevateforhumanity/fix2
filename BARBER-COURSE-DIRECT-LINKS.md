# Barber Course - Direct Access Links

## 🎯 If Course is in Supabase Database

The course data is stored in Supabase and accessed through these URLs:

---

## 📍 Direct Course Access URLs

### 1. LMS Course Catalog
```
/lms/courses
```
**What you'll see:**
- List of all available courses
- Search for "barber"
- Click to view course

### 2. Direct Course URL (Dynamic)
```
/lms/courses/[course-id]
```
**Examples:**
- `/lms/courses/1` (if course ID is 1)
- `/lms/courses/barber-training` (if slug is barber-training)
- `/lms/courses/barber-apprenticeship`

### 3. Alternative Course View
```
/lms/course/[course-id]
```

### 4. Student Course View
```
/courses/[course-id]
```

### 5. Admin Course Management
```
/admin/courses
```
Search for "barber" to find the course ID

---

## 🔍 How to Find the Exact Course URL

### Method 1: Through LMS
1. Go to: `/lms/courses`
2. Look for barber course in the list
3. Click on it
4. Copy the URL from browser

### Method 2: Through Admin
1. Login at: `/login`
2. Go to: `/admin/courses`
3. Search: "barber"
4. Click on course
5. Note the course ID in the URL

### Method 3: Check Database
The course ID is in the `courses` table in Supabase:
- Table: `courses`
- Look for: `title` containing "barber"
- Note the `id` or `slug` field

---

## 📊 Supabase Course Tables

### Main Tables:
- `courses` - Course information
- `lessons` - Lesson content
- `modules` - Course modules
- `enrollments` - Student enrollments
- `course_progress` - Student progress

### To Find Barber Course:
```sql
SELECT id, title, slug, description 
FROM courses 
WHERE title ILIKE '%barber%' 
OR slug ILIKE '%barber%';
```

---

## 🚀 Quick Access Steps

### For Students:
1. **Login:** `/login`
2. **Go to LMS:** `/lms`
3. **Click "Courses"** or go to `/lms/courses`
4. **Find "Barber"** in the list
5. **Click to open** the course

### For Admins:
1. **Login:** `/login`
2. **Go to Admin:** `/admin/courses`
3. **Search "barber"**
4. **Click course name**
5. **View/Edit course**

---

## 🎓 Common Course URLs

Try these URLs (replace with actual course ID):

### If course ID is numeric:
- `/lms/courses/1`
- `/lms/courses/2`
- `/lms/courses/3`

### If course uses slug:
- `/lms/courses/barber`
- `/lms/courses/barber-training`
- `/lms/courses/barber-apprenticeship`
- `/lms/courses/barbering`

### Alternative paths:
- `/courses/barber`
- `/lms/course/barber`

---

## 🔧 If Course Not Showing

### Check These:
1. **Is course published?**
   - Check `published` field in database
   - Must be `true` to show in catalog

2. **Is course active?**
   - Check `status` field
   - Should be `active` or `published`

3. **Do you have access?**
   - Check enrollment status
   - Check user permissions

4. **Is course visible?**
   - Check `visibility` field
   - Should be `public` or `enrolled`

---

## 📱 Mobile Access

All course URLs work on mobile:
- Same URLs as desktop
- Responsive design
- Full functionality

---

## 🎬 Course Features Available

Once you access the course:
- ✅ Course overview
- ✅ Module list
- ✅ Lesson content
- ✅ Video lessons
- ✅ Assignments
- ✅ Quizzes
- ✅ Progress tracking
- ✅ Discussion forums
- ✅ Resources
- ✅ Certificate

---

## 🔐 Access Requirements

### To View Course:
- Must be logged in
- Must be enrolled (or admin)
- Course must be published

### To Edit Course:
- Must be logged in
- Must have admin or instructor role
- Must have edit permissions

---

## 💡 Pro Tips

### Finding Course ID:
1. Go to `/admin/courses`
2. Click on barber course
3. Look at URL: `/admin/courses/[ID]`
4. That's your course ID

### Bookmarking:
Once you find the course URL, bookmark it:
- `/lms/courses/[ID]` - For quick access

### Sharing:
Share the course URL with students:
- `/lms/courses/[ID]` - Direct link
- They must be enrolled to access

---

## ✅ Next Steps

1. **Login** to the system
2. **Go to** `/lms/courses`
3. **Find** the barber course
4. **Copy** the exact URL
5. **Bookmark** for future access

OR

1. **Login** to admin
2. **Go to** `/admin/courses`
3. **Search** "barber"
4. **Note** the course ID
5. **Access** at `/lms/courses/[ID]`

---

## 📞 Still Can't Find It?

If you still can't access the course:
1. Verify you're logged in
2. Check your user role
3. Confirm course exists in database
4. Check course is published
5. Verify enrollment status

**The course IS in Supabase - you just need the correct URL!**
