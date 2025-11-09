# ✅ Milady RISE Partnership - Ready to Launch!

## 🎉 You're an Official Milady RISE Partner!

### Your Partnership Details
- **Custom Code:** `efhcti-rise295`
- **Redemptions:** 1,000 free enrollments
- **Scholarship:** $500 (10 recipients, Spring & Fall)
- **Contact:** Jessica Boyd (jessica.boyd@cengage.com)

---

## 🚀 Your LMS is Ready!

### Live Enrollment Page
**URL:** [https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)

**Features:**
- ✅ Complete course information
- ✅ $500 scholarship details
- ✅ Automatic promo code application
- ✅ Database enrollment tracking
- ✅ Professional presentation
- ✅ Mobile-responsive

### How It Works

```
Student clicks "Enroll Now"
    ↓
Your system records enrollment
    ↓
Opens Milady platform with promo code
    ↓
Student completes 3 courses (4 hours)
    ↓
Gets certified
    ↓
Eligible for $500 scholarship
```

---

## 📋 Next Steps (Jessica's Recommendations)

### 1. Complete It Yourself (30 min)
**Why:** Leaders who complete it see higher student participation

**How:**
1. Go to [your enrollment page](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)
2. Click "Enroll Now"
3. Complete all 3 courses
4. Get your certificate
5. Share with students!

### 2. Make It Required (This Week)
**Why:** Optional programs have low completion rates

**How:**
- Add to student handbook
- Include in orientation
- Assign as homework
- Integrate into curriculum

### 3. Promote Everywhere (Ongoing)
**Why:** Students need to know about it

**How:**
- Email all 150 students
- Post on social media
- Announce in class
- Put posters in breakroom

---

## 💰 $500 Scholarship Opportunity

### Tell Your Students:
- "Complete FREE certification"
- "Apply for $500 scholarship"
- "10 winners twice a year"
- "Only takes 4 hours"

### Topics Covered:
1. **Domestic Violence Awareness** (60 min)
2. **Human Trafficking Awareness** (60 min)
3. **Infection Control** (120 min)

---

## 📊 Track Your Progress

### In Supabase Dashboard

**See enrollments:**
```sql
SELECT 
  u.email,
  e.enrolled_at
FROM enrollments e
JOIN auth.users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id
WHERE c.code = 'MILADY-RISE'
ORDER BY e.enrolled_at DESC;
```

**Goal:** 150 students enrolled (100% of your students)

---

## 📧 Quick Email Template

**Subject:** FREE Certification + $500 Scholarship!

```
Hi everyone,

Exciting news! We're now a Milady RISE Partner, which means you can get certified in Client Well-Being & Safety for FREE!

What you'll learn:
• Domestic Violence Awareness
• Human Trafficking Awareness
• Infection Control

Time: 4 hours
Cost: FREE
Bonus: Eligible for $500 scholarship!

Get started: https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment

Questions? Let me know!

Elizabeth
```

---

## 📞 Support

### For Students
- Technical issues → Jessica Boyd (jessica.boyd@cengage.com)
- Enrollment help → Your staff
- LMS access → [Your enrollment page](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)

### For You
- **Jessica Boyd** - jessica.boyd@cengage.com, (919) 623-4623
- **Full Guide:** `docs/MILADY_RISE_PARTNER_GUIDE.md`
- **LMS Admin:** [Supabase Dashboard](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)

---

## ✅ Launch Checklist

- [ ] Complete certification yourself
- [ ] Email all 150 students
- [ ] Post on social media
- [ ] Add to student handbook
- [ ] Announce in class
- [ ] Put up posters
- [ ] Track enrollments
- [ ] Celebrate completions

---

## 🎯 Your Goal

**Get all 150 students certified!**

With 1,000 redemptions available, you have plenty of room to grow beyond your current students too.

---

**Everything is ready. Start by completing the certification yourself, then share with your students!** 🚀

**Your enrollment page:** [https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)
