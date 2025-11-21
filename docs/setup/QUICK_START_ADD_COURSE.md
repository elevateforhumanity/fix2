# 🚀 Quick Start: Add Your First Course

## Prerequisites

✅ Database migrations applied (see `APPLY_MIGRATIONS_NOW.md`)  
✅ Supabase project linked  
✅ Netlify site deployed

---

## Method 1: Using Supabase Dashboard (Easiest - 5 minutes)

### Step 1: Add a Program

1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/editor
2. Click **programs** table
3. Click **Insert row**
4. Fill in:

```
slug: healthcare-fundamentals
title: Healthcare Fundamentals
track: Healthcare
blurb: Learn the basics of healthcare careers
hours: 40 hours
cover_url: https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800
```

5. Click **Save**

---

### Step 2: Add a Course

1. Click **courses** table
2. Click **Insert row**
3. Fill in:

```
program_id: [Select the program you just created]
code: HC101
title: Introduction to Healthcare
summary: Learn healthcare basics, terminology, and career paths
cover_url: https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800
```

4. Click **Save**
5. **Copy the course ID** (you'll need it for lessons)

---

### Step 3: Add Lessons

1. Click **lessons** table
2. Click **Insert row**
3. Fill in **Lesson 1:**

```
course_id: [Paste the course ID from Step 2]
idx: 1
title: Welcome to Healthcare
video_url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
html: <h2>Welcome!</h2><p>In this lesson, you'll learn about healthcare careers.</p>
```

4. Click **Save**
5. Repeat for **Lesson 2:**

```
course_id: [Same course ID]
idx: 2
title: Healthcare Terminology
video_url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
html: <h2>Medical Terms</h2><p>Learn essential medical terminology.</p>
```

6. Click **Save**
7. Repeat for **Lesson 3:**

```
course_id: [Same course ID]
idx: 3
title: Career Paths
video_url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
html: <h2>Career Options</h2><p>Explore different healthcare careers.</p>
```

8. Click **Save**

---

### Step 4: View Your Course

1. Go to your site: `https://YOURSITE.netlify.app/programs
2. You should see **Healthcare Fundamentals** program
3. Click it to see the course
4. Click **Introduction to Healthcare** to see lessons

---

## Method 2: Using SQL (Advanced - 2 minutes)

### Run This in Supabase SQL Editor:

```sql
-- Insert Program
INSERT INTO programs (slug, title, track, blurb, hours, cover_url)
VALUES (
  'healthcare-fundamentals',
  'Healthcare Fundamentals',
  'Healthcare',
  'Learn the basics of healthcare careers',
  '40 hours',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
);

-- Insert Course (get program_id from above)
INSERT INTO courses (program_id, code, title, summary, cover_url)
VALUES (
  (SELECT id FROM programs WHERE slug = 'healthcare-fundamentals'),
  'HC101',
  'Introduction to Healthcare',
  'Learn healthcare basics, terminology, and career paths',
  'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800'
);

-- Insert Lessons (get course_id from above)
INSERT INTO lessons (course_id, idx, title, video_url, html)
VALUES
  (
    (SELECT id FROM courses WHERE code = 'HC101'),
    1,
    'Welcome to Healthcare',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '<h2>Welcome!</h2><p>In this lesson, you''ll learn about healthcare careers.</p>'
  ),
  (
    (SELECT id FROM courses WHERE code = 'HC101'),
    2,
    'Healthcare Terminology',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '<h2>Medical Terms</h2><p>Learn essential medical terminology.</p>'
  ),
  (
    (SELECT id FROM courses WHERE code = 'HC101'),
    3,
    'Career Paths',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '<h2>Career Options</h2><p>Explore different healthcare careers.</p>'
  );
```

---

## Method 3: Using AI Course Creator (Most Advanced)

### Prerequisites:

- OpenAI API key
- Document to convert (PDF, Word, etc.)

### Steps:

1. **Upload document** to your site
2. **AI generates:**
   - Course structure (modules & lessons)
   - Video scripts for each lesson
   - Course cover image (DALL-E 3)
   - Assessments & quizzes
3. **Review & publish**

**See:** `src/lms/ai-course-creator.js` for implementation

---

## 🎯 Test Your Course

### As a Student:

1. **Sign up:** Go to `/login` → Create account
2. **Browse:** Go to `/programs` → See your program
3. **Enroll:** Click course → Click **Enroll**
4. **Learn:** Watch lessons → Mark complete
5. **Certificate:** Complete all lessons → Get certificate

### As an Instructor:

1. **Upload credentials:** Go to `/instructor/credentials`
2. **View analytics:** See enrollment stats
3. **Manage content:** Edit courses/lessons

### As an Admin:

1. **View all data:** Supabase dashboard
2. **Review applications:** Scholarship applications
3. **Manage users:** User management
4. **View analytics:** Analytics dashboard

---

## 📊 Sample Data (Copy-Paste Ready)

### Program 1: Healthcare

```sql
INSERT INTO programs (slug, title, track, blurb, hours, cover_url) VALUES
('healthcare-fundamentals', 'Healthcare Fundamentals', 'Healthcare', 'Learn the basics of healthcare careers', '40 hours', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800');
```

### Program 2: Technology

```sql
INSERT INTO programs (slug, title, track, blurb, hours, cover_url) VALUES
('web-development-basics', 'Web Development Basics', 'Technology', 'Learn to build websites from scratch', '60 hours', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800');
```

### Program 3: Manufacturing

```sql
INSERT INTO programs (slug, title, track, blurb, hours, cover_url) VALUES
('manufacturing-essentials', 'Manufacturing Essentials', 'Manufacturing', 'Learn modern manufacturing techniques', '50 hours', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800');
```

---

## 🎨 Free Cover Images

Use these Unsplash URLs for course covers:

**Healthcare:**

- https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800
- https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800
- https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800

**Technology:**

- https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800
- https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800
- https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800

**Manufacturing:**

- https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800
- https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800
- https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800

---

## 🎥 Video Embedding

### Supported Platforms:

**YouTube:**

```
https://www.youtube.com/watch?v=VIDEOID
https://youtu.be/VIDEOID
```

**Vimeo:**

```
https://vimeo.com/VIDEOID
```

**Direct MP4:**

```
https://your-cdn.com/video.mp4
```

---

## 📝 HTML Content Tips

### Basic Formatting:

```html
<h2>Lesson Title</h2>
<p>
  This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.
</p>

<h3>Key Points:</h3>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
  <li>Point 3</li>
</ul>

<h3>Steps:</h3>
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

### Add Images:

```html
<img
  src="https://images.unsplash.com/photo-..."
  alt="Description"
  style="max-width: 100%; height: auto;"
/>
```

### Add Links:

```html
<a href="https://example.com" target="_blank">Click here</a>
```

### Add Videos:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEOID"
  frameborder="0"
  allowfullscreen
></iframe>
```

---

## ✅ Checklist

After adding your first course, verify:

- [ ] Program appears on `/programs` page
- [ ] Course appears in program detail page
- [ ] Lessons appear in course detail page
- [ ] Can enroll in course (as logged-in user)
- [ ] Can mark lessons complete
- [ ] Progress tracking works
- [ ] Certificate generates after completion

---

## 🆘 Troubleshooting

### Issue: Course doesn't appear

**Solution:** Check that `program_id` in courses table matches the program's `id`

### Issue: Lessons don't appear

**Solution:** Check that `course_id` in lessons table matches the course's `id`

### Issue: Can't enroll

**Solution:** Make sure you're logged in (go to `/login`)

### Issue: Video doesn't play

**Solution:** Check video URL is valid and publicly accessible

### Issue: Progress not saving

**Solution:** Check RLS policies are applied (run migration 004)

---

## 🎉 Next Steps

1. ✅ Add 3-5 programs
2. ✅ Add 2-3 courses per program
3. ✅ Add 5-10 lessons per course
4. ✅ Test enrollment & completion
5. ✅ Launch to students!

---

## 📚 Additional Resources

- **LMS Features:** See `ALL_YOUR_LMS_FEATURES.md`
- **Database Schema:** See `supabase/migrations/001_lms_schema.sql`
- **API Docs:** See `API_DOCUMENTATION.md`
- **Deployment:** See `DEPLOYMENT.md`

---

**Your LMS is ready! Start adding content and launch!** 🚀
