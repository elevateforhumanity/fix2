# Image Distribution Plan

## 📸 Available Artlist Images

Located in `/public/images/artlist/`:

1. **hero-training-1.jpg** (1.3MB) - Professional training classroom
2. **hero-training-2.jpg** (1.0MB) - Students learning together
3. **hero-training-3.jpg** (543KB) - Adult learner focused
4. **hero-training-4.jpg** (648KB) - Group collaboration
5. **hero-training-5.jpg** (708KB) - Hands-on training
6. **hero-training-6.jpg** (699KB) - Career counseling
7. **hero-training-7.jpg** (708KB) - Professional development

**Total:** 7 high-quality images (5.5MB)

---

## 🎯 Distribution Strategy

### Homepage (✅ DONE)
- Hero: hero-training-1.jpg
- Adult Learners: hero-training-3.jpg
- Working Families: hero-training-4.jpg
- Returning Citizens: hero-training-5.jpg
- Funding Section: hero-training-2.jpg

### Marketing Pages
- `/about` - hero-training-6.jpg (team/mission)
- `/programs` - hero-training-1.jpg (main banner)
- `/pricing` - hero-training-7.jpg (value proposition)
- `/contact` - hero-training-6.jpg (consultation)
- `/employers` - hero-training-2.jpg (workforce solutions)
- `/workforce-partners` - hero-training-4.jpg (collaboration)
- `/training-providers` - hero-training-3.jpg (education)
- `/financial-aid` - hero-training-7.jpg (funding support)
- `/success-stories` - hero-training-5.jpg (achievements)
- `/careers` - hero-training-1.jpg (opportunities)

### LMS Pages
- `/lms` - hero-training-1.jpg (dashboard hero)
- `/lms/courses` - hero-training-3.jpg (course catalog)
- `/lms/dashboard` - hero-training-2.jpg (learning progress)
- `/lms/achievements` - hero-training-5.jpg (success)
- `/lms/forums` - hero-training-4.jpg (community)
- `/lms/study-groups` - hero-training-4.jpg (collaboration)
- `/lms/help` - hero-training-6.jpg (support)

### Student Portal
- `/student/dashboard` - hero-training-1.jpg (welcome)
- `/student/courses` - hero-training-3.jpg (my courses)
- `/student/progress` - hero-training-5.jpg (achievements)
- `/student/career-counseling` - hero-training-6.jpg (guidance)
- `/student/resources` - hero-training-7.jpg (tools)

### Instructor Portal
- `/instructor/dashboard` - hero-training-2.jpg (teaching)
- `/instructor/analytics` - hero-training-7.jpg (data)

### Admin Portal
- `/admin` - hero-training-1.jpg (overview)
- `/admin/dashboard` - hero-training-7.jpg (analytics)
- `/admin/students` - hero-training-3.jpg (learners)
- `/admin/courses` - hero-training-2.jpg (curriculum)

### Program Pages
- Healthcare programs: hero-training-1.jpg
- Skilled trades: hero-training-5.jpg
- Beauty/Barber: hero-training-3.jpg
- Business: hero-training-7.jpg
- Reentry: hero-training-6.jpg

---

## 📋 Implementation Checklist

### Phase 1: Marketing Pages (High Priority)
- [ ] About page
- [ ] Programs page
- [ ] Pricing page
- [ ] Contact page
- [ ] Employers page
- [ ] Financial Aid page

### Phase 2: LMS Core (High Priority)
- [ ] LMS Dashboard
- [ ] Course Catalog
- [ ] Student Dashboard
- [ ] Achievements page

### Phase 3: Portal Pages (Medium Priority)
- [ ] Student Portal pages
- [ ] Instructor Portal pages
- [ ] Admin Portal pages

### Phase 4: Program Pages (Medium Priority)
- [ ] Individual program pages
- [ ] Program category pages

---

## 🎨 Usage Guidelines

### Image Sizing
- **Hero sections:** Full width, 400-600px height
- **Card images:** 200-300px height
- **Thumbnails:** 100-150px height
- **Background images:** Full section with overlay

### Optimization
- Use Next.js Image component
- Set appropriate `sizes` prop
- Use `priority` for above-the-fold images
- Use `loading="lazy"` for below-the-fold

### Styling
- Rounded corners: `rounded-2xl` or `rounded-3xl`
- Shadows: `shadow-lg` or `shadow-2xl`
- Overlays: `bg-gradient-to-t from-black/60`
- Hover effects: `group-hover:scale-110`

---

## 🔄 Rotation Strategy

For pages with multiple images:
- Rotate images on page refresh
- Use different images for different sections
- Maintain visual consistency with color grading

---

**Status:** Planning Complete
**Next:** Implementation
