# Milady RISE Partner Program - Implementation Guide

## 🎉 Congratulations!

You're now an official **Milady RISE Partner** with:
- ✅ Custom promo code: **efhcti-rise295**
- ✅ 1,000 free redemptions
- ✅ $500 scholarship opportunity (10 recipients, Spring & Fall)
- ✅ Full integration on your LMS

---

## 📋 Partner Details

### Your Partnership
- **School:** Elevate for Humanity Career & Training Institute
- **Contact:** Elizabeth Greene (CEO)
- **Email:** Elizabethpowell6262@gmail.com
- **Phone:** (317) 760-7908
- **Students per year:** 150
- **Locations:** 1

### Your Custom Code
- **Code:** `efhcti-rise295`
- **Redemptions:** 1,000 available
- **Cost:** FREE for your students

### Partner Contact
- **Jessica Boyd** - Senior Community and Insights Specialist
- **Email:** jessica.boyd@cengage.com
- **Phone:** (919) 623-4623
- **Time Zone:** Eastern

---

## 🚀 How It Works on Your LMS

### Student Experience

**1. Student visits your enrollment page:**
[https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)

**2. They see:**
- Complete course information
- $500 scholarship details
- Learning outcomes
- Topics covered

**3. They click "Enroll Now":**
- System records enrollment in your database
- Opens Milady platform in new tab
- Promo code pre-filled: `efhcti-rise295`

**4. On Milady platform:**
- Register or login
- Enter promo code at checkout
- Complete 3 courses (4 hours total)
- Get certified

**5. After completion:**
- Receive Milady certificate
- Eligible for $500 scholarship
- (Future) Your system auto-tracks completion via webhook

---

## 📊 Tracking Student Progress

### Current Tracking (Manual)

**See who enrolled:**
```sql
SELECT 
  u.email,
  e.enrolled_at,
  e.external_enrollment_id
FROM enrollments e
JOIN auth.users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id
WHERE c.code = 'MILADY-RISE'
ORDER BY e.enrolled_at DESC;
```

**Track manually:**
1. Student tells you they completed
2. You verify on Milady platform
3. You issue certificate via Staff Panel

### Future Tracking (Automatic - Coming Soon)

**With webhook integration:**
1. Student completes on Milady
2. Milady sends webhook to your system
3. Your system auto-records completion
4. Certificate auto-issued
5. Appears in student's portal

---

## 🎓 Maximizing Participation

### Jessica's Tips (from Milady)

#### 1. Lead by Example
**Take the course yourself!**
- Show students it's important
- Understand what they'll experience
- Share your certificate
- Current partners report higher completion when leaders participate

#### 2. Make It Required
**Don't make it optional!**
- Integrate into curriculum
- Assign as homework
- Make it part of orientation
- Emphasize importance of certification

#### 3. Use Downtime
**Help students maximize time:**
- Post instructions in breakroom
- Share during study periods
- Offer during gaps in schedule
- Make it easy to access

### Your Implementation Strategy

#### Week 1: Launch
- [ ] Complete the course yourself
- [ ] Share your certificate with students
- [ ] Announce partnership in class
- [ ] Post enrollment link in visible areas

#### Week 2-4: Promote
- [ ] Add to student handbook
- [ ] Include in orientation
- [ ] Send email to all students
- [ ] Post on social media

#### Ongoing: Track & Support
- [ ] Monitor enrollment numbers
- [ ] Help students with technical issues
- [ ] Celebrate completions
- [ ] Promote scholarship opportunity

---

## 📢 Promotional Materials

### Milady Provided

**Download logos here:**
[Milady RISE Partner Logos](https://www.milady.com/rise-partner-logos)

**Use on:**
- Your website
- Social media
- Email signatures
- Student materials
- Classroom posters

### Your LMS Integration

**Already live on your site:**
- Enrollment page with full details
- Automatic promo code application
- Database tracking of enrollments
- Professional course presentation

**Share these links:**
- Direct enrollment: [https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)
- Your LMS home: [https://elevateforhumanityfix.netlify.app/lms](https://elevateforhumanityfix.netlify.app/lms)

---

## 💰 $500 RISE Scholarship

### Details
- **Amount:** $500 per recipient
- **Recipients:** 10 per period
- **Frequency:** Twice yearly (Spring & Fall)
- **Eligibility:** Complete all 3 courses

### Application Process

**Current (Manual):**
1. Student completes certification
2. Student applies via Milady
3. Milady reviews applications
4. Winners announced

**Future (Integrated):**
1. Student completes certification
2. Your system tracks completion
3. Student applies via your portal
4. You submit to Milady
5. Winners announced

### Promoting Scholarship

**Tell students:**
- "Complete the certification, apply for $500!"
- "10 winners twice a year"
- "Free certification + scholarship opportunity"
- "Elevate your career and get paid for it"

---

## 📧 Communication Templates

### Email to Students

**Subject:** FREE Certification + $500 Scholarship Opportunity!

```
Hi [Student Name],

Great news! Elevate for Humanity is now a Milady RISE Partner, which means you can get certified in Client Well-Being & Safety for FREE!

What you'll learn:
• Domestic Violence Awareness
• Human Trafficking Awareness  
• Infection Control

Time: Just 4 hours
Cost: FREE with our code
Bonus: Eligible for $500 scholarship!

Get started now:
https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment

Questions? Let me know!

[Your Name]
Elevate for Humanity
```

### Social Media Post

```
🎓 FREE Certification Alert! 🎓

We're proud to be a Milady RISE Partner! Our students can now get certified in Client Well-Being & Safety for FREE.

✅ Domestic Violence Awareness
✅ Human Trafficking Awareness
✅ Infection Control

💰 Plus, apply for a $500 scholarship!

Learn more: [your link]

#MiladyRISE #ElevateForHumanity #FreeCertification
```

### Classroom Announcement

```
"I'm excited to announce that we're now a Milady RISE Partner! 

This means you can get certified in Client Well-Being & Safety - covering domestic violence awareness, human trafficking awareness, and infection control - completely FREE.

It only takes 4 hours, and once you're certified, you're eligible to apply for a $500 scholarship. 10 students win twice a year.

I've already completed it myself [show certificate], and I encourage all of you to do the same. It's important knowledge that will make you a better professional.

The link is on our LMS. Let me know if you need help getting started!"
```

---

## 📊 Reporting & Metrics

### Track These Numbers

**Monthly:**
- [ ] Students enrolled
- [ ] Students completed
- [ ] Completion rate
- [ ] Scholarship applications

**Quarterly:**
- [ ] Total certifications issued
- [ ] Redemptions used (out of 1,000)
- [ ] Student feedback
- [ ] Impact stories

### SQL Queries for Reporting

```sql
-- Monthly enrollment report
SELECT 
  DATE_TRUNC('month', e.enrolled_at) as month,
  COUNT(*) as enrollments
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE c.code = 'MILADY-RISE'
GROUP BY month
ORDER BY month DESC;

-- Completion rate (when tracking is automated)
SELECT 
  COUNT(*) as total_enrolled,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
  ROUND(
    COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as completion_rate
FROM enrollments e
JOIN courses c ON e.course_id = c.id
WHERE c.code = 'MILADY-RISE';
```

---

## 🔄 Yearly Requirements

### From Milady

**You agreed to:**
- [ ] Participate in yearly survey (up to 60 minutes)
- [ ] Provide feedback on program
- [ ] Share student outcomes
- [ ] Respond to quarterly emails

### Best Practices

**Stay engaged:**
- Respond to Jessica's emails promptly
- Share success stories
- Provide feedback on program
- Suggest improvements
- Celebrate student achievements

---

## 🆘 Support & Troubleshooting

### For Students

**Technical Issues:**
1. Check promo code is entered correctly: `efhcti-rise295`
2. No spaces, periods, or commas
3. Must be at checkout page
4. Contact Jessica if code doesn't work

**Access Issues:**
1. Ensure they registered on Milady platform
2. Check email for confirmation
3. Try different browser
4. Clear cache and cookies

### For You

**Questions about:**
- Program details → Jessica Boyd (jessica.boyd@cengage.com)
- Technical issues → Milady support
- LMS integration → Your development team
- Database tracking → Check Supabase

---

## 📈 Success Metrics

### Goals for Year 1

**Enrollment:**
- [ ] 100% of current students enrolled (150 students)
- [ ] 80% completion rate
- [ ] 5+ scholarship applications

**Engagement:**
- [ ] You complete certification
- [ ] All instructors complete certification
- [ ] Program integrated into curriculum
- [ ] Promoted on all channels

**Impact:**
- [ ] Students report increased confidence
- [ ] Positive feedback on content
- [ ] Scholarship winners celebrated
- [ ] Partnership renewed

---

## 🎯 Next Steps

### Immediate (This Week)

1. **Complete the course yourself**
   - Go to enrollment page
   - Use your promo code
   - Get certified
   - Share with students

2. **Announce to students**
   - Send email
   - Post on LMS
   - Announce in class
   - Share on social media

3. **Update materials**
   - Add to student handbook
   - Update website
   - Create posters
   - Add to orientation

### Short-term (This Month)

1. **Track enrollments**
   - Monitor database
   - Follow up with students
   - Help with technical issues
   - Celebrate completions

2. **Promote scholarship**
   - Remind students
   - Share deadline
   - Help with applications
   - Highlight opportunity

### Long-term (This Year)

1. **Maximize participation**
   - Make it required
   - Integrate into curriculum
   - Track completion rates
   - Report to Milady

2. **Measure impact**
   - Collect feedback
   - Share success stories
   - Report metrics
   - Plan for renewal

---

## 📞 Contact Information

### Your Partnership
- **Partner Code:** efhcti-rise295
- **Redemptions:** 1,000
- **Status:** Active

### Milady Contact
- **Jessica Boyd**
- jessica.boyd@cengage.com
- (919) 623-4623
- Eastern Time Zone

### Your LMS
- **Enrollment Page:** [https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment](https://elevateforhumanityfix.netlify.app/lms/milady-riseenrollment)
- **Admin Dashboard:** [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)

---

## ✅ Launch Checklist

- [ ] Database migrations applied
- [ ] RISE enrollment page live
- [ ] Promo code verified: efhcti-rise295
- [ ] You completed certification
- [ ] Students notified
- [ ] Materials updated
- [ ] Social media posted
- [ ] Tracking system ready
- [ ] Support process defined
- [ ] Success metrics established

---

**Your Milady RISE partnership is ready to launch!** 🚀

Start by completing the certification yourself, then share with your 150 students!
