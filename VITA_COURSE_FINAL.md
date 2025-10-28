# 🎓 IRS VITA Course - Final Version

## ✅ Course Structure

**Your video is ONLY in Lesson 1** - the defining introduction to the course.

---

## 📋 Course Layout

### Program: IRS VITA Tax Preparation Training

- **Track:** Finance
- **Hours:** 40 hours
- **Description:** Become an IRS-certified volunteer tax preparer

### Course: VITA Volunteer Tax Preparer Certification (VITA101)

---

## 🎥 Lesson Structure

### Lesson 1: Introduction to IRS VITA Program ✅ VIDEO

**Video:** `https://ai.invideo.io/watch/mDgPo5Ba1GH`

- Your custom video plays here
- Welcome and overview
- What is VITA
- Sign up links to IRS

### Lesson 2: Volunteer Roles and Requirements 📝 TEXT ONLY

**No video** - Just content and IRS links

- Tax Preparer role
- Quality Reviewer role
- Greeter/Intake role
- Site Coordinator role
- IRS sign-up form link

### Lesson 3: IRS Link & Learn Taxes Online Training 📝 TEXT ONLY

**No video** - Just content and IRS links

- Link & Learn Taxes platform
- Certification types
- Direct link to IRS training portal
- Study resources

### Lesson 4: Tax Software Practice Lab 📝 TEXT ONLY

**No video** - Just content and IRS links

- Practice lab access
- Practice scenarios
- Direct link to IRS practice lab
- Tips for success

### Lesson 5: Ethics and Standards of Conduct 📝 TEXT ONLY

**No video** - Just content and IRS links

- Confidentiality
- Professional standards
- Taxpayer rights
- IRS ethics training

### Lesson 6: Quality Review and Accuracy 📝 TEXT ONLY

**No video** - Just content and IRS links

- Review process
- Common errors
- Quality standards
- IRS quality guide

### Lesson 7: Getting Started - Next Steps 📝 TEXT ONLY

**No video** - Just content and IRS links

- Step-by-step signup
- Complete checklist
- Find VITA sites
- **Big "Sign Up Now" button → IRS**

---

## 🎯 Why This Works

### Your Video (Lesson 1):

- ✅ Defines the course
- ✅ Sets the tone
- ✅ Welcomes students
- ✅ Explains VITA program
- ✅ Motivates volunteers

### Text Lessons (2-7):

- ✅ Detailed information
- ✅ Official IRS links
- ✅ Step-by-step guides
- ✅ Resources and downloads
- ✅ Clear calls to action

### Benefits:

- ✅ Students watch your video once
- ✅ Get hooked by your message
- ✅ Then dive into detailed content
- ✅ All certification through IRS
- ✅ Clean, professional structure

---

## 🔗 All IRS Links Included

Every lesson links to official IRS resources:

- **IRS Volunteer Sign Up:** https://freetaxassistance.for.irs.gov/s/sign-up-form
- **IRS Link & Learn Taxes:** https://apps.irs.gov/app/vita/
- **IRS Practice Lab:** https://vita.taxslayerpro.com/IRSTraining/en/Account/Access
- **IRS Training Resources:** https://www.irs.gov/individuals/volunteer-training-resources
- **IRS Volunteer Info:** https://www.irs.gov/individuals/irs-tax-volunteers
- **Find VITA Sites:** https://www.irs.gov/individuals/find-a-location-for-free-tax-prep

---

## 🚀 How to Add to Database

### Step 1: Apply Migrations (If Not Done)

**First, make sure your database is set up:**

```bash
# Check status
pnpm autopilot:migrate

# If migrations needed, follow instructions
```

### Step 2: Add VITA Course

**Run this SQL in Supabase:**

1. Open: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new
2. Copy entire file: `scripts/add-vita-course.sql`
3. Paste into SQL Editor
4. Click "Run"
5. Wait for completion (5-10 seconds)

### Step 3: Verify

**Check it worked:**

```sql
-- Run this to verify
SELECT
  p.title as program,
  c.code,
  c.title as course,
  COUNT(l.id) as lesson_count
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
lesson_count: 7
```

---

## 🎬 What Students See

### On /programs page:

```
┌─────────────────────────────────────────┐
│ IRS VITA Tax Preparation Training      │
│ Finance | 40 hours                     │
│                                         │
│ Become an IRS-certified volunteer tax  │
│ preparer. Free training provided by    │
│ the IRS...                             │
│                                         │
│ [View Program →]                        │
└─────────────────────────────────────────┘
```

### On course page:

```
VITA Volunteer Tax Preparer Certification

7 Lessons:
✅ 1. Introduction to IRS VITA Program (VIDEO)
📝 2. Volunteer Roles and Requirements
📝 3. IRS Link & Learn Taxes Online Training
📝 4. Tax Software Practice Lab
📝 5. Ethics and Standards of Conduct
📝 6. Quality Review and Accuracy
📝 7. Getting Started - Next Steps

[Enroll Now →]
```

### In Lesson 1:

```
┌─────────────────────────────────────────┐
│ 🎥 Your Video Plays Here                │
│ https://ai.invideo.io/watch/mDgPo5Ba1GH │
└─────────────────────────────────────────┘

Welcome to IRS VITA Volunteer Training

The Volunteer Income Tax Assistance (VITA)
program offers free tax help...

📋 Sign Up to Volunteer:
[IRS VITA/TCE Volunteer Sign Up Form →]

[Next Lesson →]
```

### In Lessons 2-7:

```
Lesson Title

[Content with bullet points]
[IRS links and resources]
[Call to action buttons]

[Previous] [Next Lesson →]
```

---

## ✅ Final Checklist

Before adding to database:

- [x] Video URL is correct
- [x] Only Lesson 1 has video
- [x] Lessons 2-7 are text only
- [x] All IRS links are official
- [x] Sign-up forms link to IRS
- [x] Certification through IRS
- [x] SQL file is ready

---

## 🎉 Ready to Launch!

**Your course is perfect:**

✅ Your video defines the course (Lesson 1)  
✅ Text lessons provide detailed info (2-7)  
✅ All certification through IRS  
✅ All sign-ups through IRS  
✅ Professional and compliant

**Just run the SQL file and you're live!** 🚀

---

## 📞 Next Steps

1. **Add to database:**
   - Run `scripts/add-vita-course.sql`
   - Verify 7 lessons created

2. **Test the course:**
   - Go to `/programs`
   - Find VITA course
   - Enroll and test

3. **Share with students:**
   - Promote the course
   - Collect feedback
   - Track enrollments

---

**Ready to add it? Just say "yes" and I'll guide you through!** 🎓
