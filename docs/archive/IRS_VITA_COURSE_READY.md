# 🎓 IRS VITA Tax Preparation Course - Ready to Add!

## ✅ What I Created

A complete **IRS VITA Volunteer Tax Preparer Training** program with:

- ✅ 1 Program: IRS VITA Tax Preparation Training
- ✅ 1 Course: VITA Volunteer Tax Preparer Certification
- ✅ 7 Lessons: Complete orientation and training guide
- ✅ **All links point to official IRS resources**
- ✅ Volunteer signup forms link directly to IRS

---

## 📋 Course Content

### Program: IRS VITA Tax Preparation Training

**Track:** Finance  
**Hours:** 40 hours  
**Description:** Become an IRS-certified volunteer tax preparer. Free training provided by the IRS to help low-to-moderate income families prepare their tax returns.

### Course: VITA Volunteer Tax Preparer Certification (VITA101)

**7 Lessons:**

1. **Introduction to IRS VITA Program**
   - What is VITA
   - Program overview
   - Sign up links to IRS
   - Next steps

2. **Volunteer Roles and Requirements**
   - Tax Preparer
   - Quality Reviewer
   - Greeter/Intake Specialist
   - Site Coordinator
   - Time commitment

3. **IRS Link & Learn Taxes Online Training**
   - Official IRS training platform
   - Basic certification
   - Advanced certification
   - Specialty certifications
   - Direct link to IRS training portal

4. **Tax Software Practice Lab**
   - TaxSlayer Pro practice lab
   - Practice scenarios
   - Getting started guide
   - Direct link to IRS practice lab

5. **Ethics and Standards of Conduct**
   - Confidentiality
   - Accuracy
   - Professionalism
   - Integrity
   - Taxpayer rights

6. **Quality Review and Accuracy**
   - Document review
   - Return review
   - Taxpayer interview
   - Final check
   - Common errors

7. **Getting Started - Next Steps**
   - Step-by-step signup process
   - Complete training checklist
   - Find VITA sites
   - Start volunteering
   - **Big "Sign Up Now" button → IRS form**

---

## 🔗 Official IRS Links Included

Every lesson links to official IRS resources:

### Primary Links:

- **IRS Volunteer Sign Up Form:** https://freetaxassistance.for.irs.gov/s/sign-up-form
- **IRS Link & Learn Taxes:** https://apps.irs.gov/app/vita/
- **IRS Tax Software Practice Lab:** https://vita.taxslayerpro.com/IRSTraining/en/Account/Access
- **IRS Volunteer Information:** https://www.irs.gov/individuals/irs-tax-volunteers
- **IRS Training Resources:** https://www.irs.gov/individuals/volunteer-training-resources
- **Find VITA Locations:** https://www.irs.gov/individuals/find-a-location-for-free-tax-prep

### Training Materials:

- Publication 4012 - Volunteer Resource Guide
- Publication 4491 - Student Training Guide
- Publication 5101 - Quality Review Training
- Publication 4961 - Ethics Training
- Form 6744 - Certification Test

---

## 🚀 How to Add to Your Database

### Option 1: Via Supabase Dashboard (Easiest)

1. **Open Supabase SQL Editor:**
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/sql/new

2. **Copy the SQL file:**
   `scripts/add-vita-course.sql`

3. **Paste into SQL Editor**

4. **Click "Run"**

5. **Verify:**
   - Go to Table Editor
   - Check `programs` table for "IRS VITA Tax Preparation Training"
   - Check `courses` table for "VITA101"
   - Check `lessons` table for 7 lessons

---

### Option 2: Via Command Line (Advanced)

```bash
# If you have psql and database URL
psql "YOUR_DB_URL" -f scripts/add-vita-course.sql
```

---

## 🎯 What Students Will See

### On /programs page:

```
IRS VITA Tax Preparation Training
Finance | 40 hours

Become an IRS-certified volunteer tax preparer. Free training
provided by the IRS to help low-to-moderate income families
prepare their tax returns.

[View Program →]
```

### On program detail page:

```
VITA Volunteer Tax Preparer Certification (VITA101)

Complete IRS-certified training to become a volunteer tax
preparer. Learn to prepare basic tax returns for individuals
and families earning $64,000 or less per year.

[Enroll Now →]
```

### On course page:

```
7 Lessons:
1. Introduction to IRS VITA Program
2. Volunteer Roles and Requirements
3. IRS Link & Learn Taxes Online Training
4. Tax Software Practice Lab
5. Ethics and Standards of Conduct
6. Quality Review and Accuracy
7. Getting Started - Next Steps

[Start Learning →]
```

### In each lesson:

- Video placeholder (you can add real IRS videos later)
- Rich HTML content with:
  - Clear explanations
  - Bullet points
  - Official IRS links
  - Call-to-action buttons
  - Next steps

---

## 📝 Key Features

### 1. Official IRS Integration

- All signup forms link to IRS
- All training links to IRS resources
- All certifications through IRS
- No custom forms needed

### 2. Complete Orientation

- Students learn what VITA is
- Understand volunteer roles
- Know how to get certified
- Clear next steps

### 3. Professional Content

- Based on official IRS materials
- Accurate information
- Up-to-date links
- Comprehensive coverage

### 4. Easy to Update

- All content in database
- Can edit via Supabase dashboard
- Can add more lessons
- Can update links

---

## 🔄 Future Enhancements

You can easily add:

1. **Real IRS Training Videos**
   - Replace placeholder YouTube links
   - Embed official IRS videos

2. **Additional Courses**
   - Advanced VITA certification
   - Military tax preparation
   - International student returns
   - Puerto Rico residents

3. **Practice Quizzes**
   - Add quiz questions
   - Link to IRS practice tests
   - Track student progress

4. **Certification Tracking**
   - Track who completed training
   - Store certification numbers
   - Renewal reminders

---

## ✅ Ready to Add?

**Run this command to add the course:**

```bash
# Copy the SQL file content
cat scripts/add-vita-course.sql

# Then paste into Supabase SQL Editor and click "Run"
```

**Or if you have psql:**

```bash
psql "YOUR_DB_URL" -f scripts/add-vita-course.sql
```

---

## 🎉 After Adding

1. **Visit your site:** `/programs`
2. **You should see:** "IRS VITA Tax Preparation Training"
3. **Click it:** See the course
4. **Enroll:** Test the enrollment flow
5. **View lessons:** See all 7 lessons with IRS links

---

## 📞 Support

**All links point to official IRS resources:**

- Students sign up through IRS forms
- Training happens on IRS platforms
- Certification through IRS
- No liability for you - all official!

**Your LMS just provides:**

- Orientation and overview
- Clear navigation
- Links to official resources
- Student progress tracking

---

**Ready to add it? Just run the SQL file!** 🚀
