# 🚀 Add IRS VITA Course - Ready to Go!

## ✅ What You're Adding

**Program:** IRS VITA Tax Preparation Training  
**Course:** VITA Volunteer Tax Preparer Certification (VITA101)  
**Lessons:** 8 comprehensive lessons  
**All links:** Official IRS resources

---

## 📋 Quick Add (2 Steps)

### Step 1: Make Sure Database is Ready

```bash
# Check if migrations are applied
pnpm autopilot:migrate
```

**If you see:** `✅ DATABASE ALREADY CONFIGURED!`  
→ Skip to Step 2

**If you see:** `📋 MIGRATIONS NEED TO BE APPLIED`  
→ Follow the instructions shown, then come back

---

### Step 2: Add VITA Course

**Open Supabase SQL Editor:**  
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

**Copy this file:**  
`scripts/add-vita-course.sql`

**Paste into SQL Editor and click "Run"**

**Wait 5-10 seconds for completion**

---

## ✅ Verify It Worked

**Run this query in SQL Editor:**

```sql
SELECT
  p.title as program,
  c.code,
  c.title as course,
  COUNT(l.id) as lessons
FROM programs p
JOIN courses c ON c.program_id = p.id
LEFT JOIN lessons l ON l.course_id = c.id
WHERE p.slug = 'irs-vita-tax-preparation'
GROUP BY p.title, c.code, c.title;
```

**Should show:**

```
program: IRS VITA Tax Preparation Training
code: VITA101
course: VITA Volunteer Tax Preparer Certification
lessons: 8
```

---

## 🎓 What Students Will See

### On /programs page:

```
┌─────────────────────────────────────────┐
│ IRS VITA Tax Preparation Training      │
│ Finance | 40 hours                     │
│                                         │
│ Become an IRS-certified volunteer tax  │
│ preparer. Free training provided by    │
│ the IRS to help low-to-moderate income │
│ families prepare their tax returns.    │
│                                         │
│ [View Program →]                        │
└─────────────────────────────────────────┘
```

### Course includes:

1. ✅ Welcome to VITA Volunteer Training
2. ✅ Understanding the IRS VITA Program
3. ✅ Volunteer Roles and Requirements
4. ✅ IRS Link & Learn Taxes Online Training
5. ✅ Tax Software Practice Lab
6. ✅ Ethics and Standards of Conduct
7. ✅ Quality Review and Accuracy
8. ✅ Getting Started - Next Steps

### All lessons link to:

- ✅ IRS Volunteer Sign-Up Form
- ✅ IRS Link & Learn Taxes (certification)
- ✅ IRS Practice Lab
- ✅ IRS Training Resources
- ✅ IRS Publications (PDFs)

---

## 🎨 Course Cover Image

**Current:** Professional finance/tax image from Unsplash

**To change later:**

```sql
UPDATE programs
SET cover_url = 'YOUR_IMAGE_URL'
WHERE slug = 'irs-vita-tax-preparation';
```

---

## 📝 To Add More Content Tomorrow

You mentioned you'll add other parts tomorrow. Here's how:

### Add More Lessons:

```sql
INSERT INTO lessons (course_id, idx, title, video_url, html)
VALUES (
  (SELECT id FROM courses WHERE code = 'VITA101'),
  9,  -- Next lesson number
  'Your Lesson Title',
  'https://your-video-url.com',  -- or NULL for no video
  '<h2>Your Content</h2><p>Lesson content here...</p>'
);
```

### Add Another Course:

```sql
INSERT INTO courses (program_id, code, title, summary, cover_url)
VALUES (
  (SELECT id FROM programs WHERE slug = 'irs-vita-tax-preparation'),
  'VITA102',
  'Advanced VITA Certification',
  'Advanced tax preparation topics...',
  'https://images.unsplash.com/photo-...'
);
```

---

## 🚀 Ready to Add?

**Just run these 2 commands:**

```bash
# 1. Check database
pnpm autopilot:migrate

# 2. Open Supabase SQL Editor
# Copy: scripts/add-vita-course.sql
# Paste and Run
```

**That's it!** Your first course will be live! 🎉

---

## 📞 Next Steps

After adding:

1. **Visit your site:** `/programs`
2. **Find:** "IRS VITA Tax Preparation Training"
3. **Click:** View the course
4. **Test:** Enroll and view lessons
5. **Verify:** All IRS links work

Tomorrow you can add:

- More lessons to this course
- Additional courses
- Videos
- Custom content

---

**Ready? Let's add your first course!** 🎓
