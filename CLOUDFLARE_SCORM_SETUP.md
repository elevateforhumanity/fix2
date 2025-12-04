# 🚀 CLOUDFLARE R2 SCORM SETUP - FREE ALTERNATIVE

**Cost:** FREE (or $0.015/GB storage)  
**Time:** 20 minutes  
**Better than SCORM Cloud:** No monthly fees!

---

## 🎯 SETUP STEPS

### **Step 1: Upload SCORM to Cloudflare R2 (10 min)**

You have 8 JRI SCORM packages in: `lms-content/jri/`

**Option A: Via Cloudflare Dashboard**
1. Go to Cloudflare Dashboard
2. Click "R2" in sidebar
3. Create bucket: `elevate-scorm-courses`
4. Upload each SCORM package:
   - Extract the ZIP first
   - Upload the entire folder (not the ZIP)
   - Make bucket public

**Option B: Via Wrangler CLI (Faster)**
```bash
# Install Wrangler if not installed
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket
wrangler r2 bucket create elevate-scorm-courses

# Upload SCORM packages (extract ZIPs first)
cd lms-content/jri

# Extract all ZIPs
unzip "1-jri-*.zip" -d jri-badge-1
unzip "2-jri-*.zip" -d jri-badge-2
unzip "3-jri-*.zip" -d jri-badge-3
unzip "4-jri-*.zip" -d jri-badge-4
unzip "5-jri-*.zip" -d jri-badge-5
unzip "6-jri-*.zip" -d jri-badge-6
unzip "7-jri-*.zip" -d jri-intro
unzip "8-jri-*.zip" -d jri-facilitation

# Upload to R2
wrangler r2 object put elevate-scorm-courses/jri-badge-1 --file=jri-badge-1 --recursive
wrangler r2 object put elevate-scorm-courses/jri-badge-2 --file=jri-badge-2 --recursive
wrangler r2 object put elevate-scorm-courses/jri-badge-3 --file=jri-badge-3 --recursive
wrangler r2 object put elevate-scorm-courses/jri-badge-4 --file=jri-badge-4 --recursive
wrangler r2 object put elevate-scorm-courses/jri-badge-5 --file=jri-badge-5 --recursive
wrangler r2 object put elevate-scorm-courses/jri-badge-6 --file=jri-badge-6 --recursive
wrangler r2 object put elevate-scorm-courses/jri-intro --file=jri-intro --recursive
wrangler r2 object put elevate-scorm-courses/jri-facilitation --file=jri-facilitation --recursive
```

---

### **Step 2: Make Bucket Public (5 min)**

1. In Cloudflare Dashboard → R2
2. Click on `elevate-scorm-courses` bucket
3. Click "Settings"
4. Under "Public Access" → Enable
5. Copy the public URL (looks like: `https://pub-xxxxx.r2.dev`)

---

### **Step 3: Get SCORM Launch URLs (2 min)**

Each SCORM package has an `index.html` or `index_lms.html` file.

Your launch URLs will be:
```
https://pub-xxxxx.r2.dev/jri-badge-1/index.html
https://pub-xxxxx.r2.dev/jri-badge-2/index.html
https://pub-xxxxx.r2.dev/jri-badge-3/index.html
https://pub-xxxxx.r2.dev/jri-badge-4/index.html
https://pub-xxxxx.r2.dev/jri-badge-5/index.html
https://pub-xxxxx.r2.dev/jri-badge-6/index.html
https://pub-xxxxx.r2.dev/jri-intro/index.html
https://pub-xxxxx.r2.dev/jri-facilitation/index.html
```

---

### **Step 4: Update Database (3 min)**

Run this SQL in Supabase:

```sql
-- Update JRI courses with Cloudflare R2 URLs
-- Replace 'pub-xxxxx.r2.dev' with your actual R2 public URL

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-1/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-1/index.html'
WHERE course_code = 'JRI-BADGE-1';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-2/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-2/index.html'
WHERE course_code = 'JRI-BADGE-2';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-3/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-3/index.html'
WHERE course_code = 'JRI-BADGE-3';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-4/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-4/index.html'
WHERE course_code = 'JRI-BADGE-4';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-5/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-5/index.html'
WHERE course_code = 'JRI-BADGE-5';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-badge-6/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-badge-6/index.html'
WHERE course_code = 'JRI-BADGE-6';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-intro/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-intro/index.html'
WHERE course_code = 'JRI-INTRO';

UPDATE partner_courses 
SET scorm_launch_url = 'https://pub-xxxxx.r2.dev/jri-facilitation/index.html',
    is_scorm = true,
    course_url = 'https://pub-xxxxx.r2.dev/jri-facilitation/index.html'
WHERE course_code = 'JRI-FACILITATION';
```

---

### **Step 5: Test SCORM Player (5 min)**

1. Go to: `https://yourdomain.com/student/courses/scorm/[courseId]`
2. Course should load in iframe
3. Complete a section
4. Verify progress tracking works
5. Complete course
6. Verify certificate generation

---

## ✅ ADVANTAGES OVER SCORM CLOUD

### **Cloudflare R2:**
- ✅ **FREE** (or $0.015/GB - pennies)
- ✅ Already connected
- ✅ Fast global CDN
- ✅ Unlimited bandwidth
- ✅ No monthly fees
- ✅ You control everything

### **SCORM Cloud:**
- ❌ $99/mo minimum
- ❌ 500 registration limit
- ❌ Need new account
- ❌ Ongoing costs

---

## 💰 COST COMPARISON

### **Cloudflare R2:**
- Storage: 8 SCORM packages × ~50MB = 400MB = $0.006/month
- Bandwidth: FREE (no egress fees)
- **Total: ~$0.01/month** 🎉

### **SCORM Cloud:**
- Basic: $99/month
- Pro: $299/month
- **Total: $99-$299/month** 💸

**Savings: $1,188 - $3,588 per year!**

---

## 🚀 QUICK START SCRIPT

Run this to extract and prepare SCORM packages:

```bash
#!/bin/bash

cd lms-content/jri

echo "Extracting SCORM packages..."

unzip -q "1-jri-_badge_1-_mindsets-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-1
unzip -q "2-jri-_badge_2-_self-management-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-2
unzip -q "3-jri-_badge_3-_communication-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-3
unzip -q "4-jri-_badge_4-_teamwork-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-4
unzip -q "5-jri-_badge_5-_professionalism-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-5
unzip -q "6-jri-_badge_6-_launch_a_career-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-badge-6
unzip -q "7-jri-_introduction-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-intro
unzip -q "8-jri-_facilitation_guide-elevate_for_humanity_career_and_training_institute-scorm20043rdedition.zip" -d jri-facilitation

echo "✅ All SCORM packages extracted!"
echo "Now upload to Cloudflare R2 via dashboard or Wrangler CLI"
```

---

## 📋 VERIFICATION CHECKLIST

- [ ] Cloudflare R2 bucket created
- [ ] All 8 SCORM packages extracted
- [ ] All packages uploaded to R2
- [ ] Bucket made public
- [ ] Public URL copied
- [ ] Database updated with URLs
- [ ] SCORM player tested
- [ ] Progress tracking works
- [ ] Completion detection works
- [ ] Certificate generation works

---

## 🎊 RESULT

**After completing this:**
- ✅ JRI courses fully playable
- ✅ Hosted on YOUR Cloudflare
- ✅ FREE (no monthly fees)
- ✅ Fast global delivery
- ✅ 100% automated
- ✅ Complete control

**Total Cost: ~$0.01/month instead of $99/month**

**Savings: $1,188/year!** 💰

---

*Use Cloudflare R2 - You already have it!*  
*No need for SCORM Cloud subscription*
