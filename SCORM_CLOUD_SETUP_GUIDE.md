# 📚 SCORM CLOUD SETUP GUIDE - JRI COURSES

**Time:** 30 minutes  
**Cost:** $99/mo (or $299/mo for unlimited)

---

## 🎯 STEP-BY-STEP SETUP

### **Step 1: Sign Up for SCORM Cloud (5 min)**

1. Go to: https://cloud.scorm.com
2. Click "Start Free Trial" or "Sign Up"
3. Choose plan:
   - **Basic:** $99/mo (500 registrations/month) - RECOMMENDED
   - **Pro:** $299/mo (unlimited registrations)
4. Enter payment information
5. Verify email

---

### **Step 2: Upload JRI SCORM Packages (15 min)**

**You have 8 JRI SCORM packages in:** `lms-content/jri/`

1. **Login to SCORM Cloud**
2. **Click "Courses" → "Upload Course"**
3. **Upload each package:**

   **Package 1:** `1-jri-_badge_1-_mindsets-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 1 - Mindsets
   - Click Upload
   - Wait for processing
   - Copy Launch URL

   **Package 2:** `2-jri-_badge_2-_self-management-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 2 - Self-Management
   - Upload and copy URL

   **Package 3:** `3-jri-_badge_3-_communication-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 3 - Communication
   - Upload and copy URL

   **Package 4:** `4-jri-_badge_4-_teamwork-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 4 - Teamwork
   - Upload and copy URL

   **Package 5:** `5-jri-_badge_5-_professionalism-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 5 - Professionalism
   - Upload and copy URL

   **Package 6:** `6-jri-_badge_6-_launch_a_career-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Badge 6 - Launch a Career
   - Upload and copy URL

   **Package 7:** `7-jri-_introduction-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Introduction
   - Upload and copy URL

   **Package 8:** `8-jri-_facilitation_guide-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip`
   - Name: JRI Facilitation Guide
   - Upload and copy URL

---

### **Step 3: Get Launch URLs (5 min)**

For each uploaded course:
1. Click on course name
2. Click "Registration" tab
3. Copy the **Launch URL** (looks like: `https://cloud.scorm.com/ScormEngineInterface/defaultui/player/modern.html?...`)
4. Save to a text file

---

### **Step 4: Update Database (5 min)**

Run this SQL in Supabase:

```sql
-- Update JRI courses with SCORM Cloud launch URLs

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-1';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-2';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-3';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-4';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-5';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-BADGE-6';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-INTRO';

UPDATE partner_courses 
SET scorm_launch_url = 'YOUR_LAUNCH_URL_HERE',
    is_scorm = true,
    course_url = 'YOUR_LAUNCH_URL_HERE'
WHERE course_code = 'JRI-FACILITATION';
```

---

### **Step 5: Test SCORM Player (5 min)**

1. Go to: `https://yourdomain.com/student/courses/scorm/[courseId]`
2. Course should load in iframe
3. Complete a section
4. Verify progress tracking works
5. Complete course
6. Verify certificate generation triggers

---

## ✅ VERIFICATION CHECKLIST

- [ ] SCORM Cloud account created
- [ ] All 8 JRI packages uploaded
- [ ] All 8 launch URLs copied
- [ ] Database updated with URLs
- [ ] SCORM player tested
- [ ] Progress tracking works
- [ ] Completion detection works
- [ ] Certificate generation works

---

## 💰 COST

**Monthly:** $99/mo (Basic) or $299/mo (Pro)  
**Annual:** $990/year (Basic) or $2,990/year (Pro)

**Recommendation:** Start with Basic ($99/mo), upgrade if needed

---

## 🎯 RESULT

After completing this:
- ✅ JRI courses fully playable
- ✅ Progress tracked automatically
- ✅ Completions detected automatically
- ✅ Certificates generated automatically
- ✅ 100% automated JRI integration

---

## 📞 SUPPORT

**SCORM Cloud Support:**
- Email: support@scorm.com
- Docs: https://cloud.scorm.com/docs

**If Issues:**
- Check SCORM package format (should be SCORM 2004 3rd/4th edition)
- Verify launch URL is correct
- Test in SCORM Cloud preview first
- Check browser console for errors

---

*Complete this setup to reach 100% JRI integration*
