# Image Usage Map - Artlist Images Distribution

## 📸 Complete Image Inventory

### Original Images (8 total)
Located in `/public/images/artlist/`:
1. **hero-training-1.jpg** (1.3MB) - Professional classroom training
2. **hero-training-2.jpg** (1.0MB) - Collaborative learning
3. **hero-training-3.jpg** (543KB) - Adult learner focused study
4. **hero-training-4.jpg** (648KB) - Group collaboration
5. **hero-training-5.jpg** (708KB) - Hands-on technical training
6. **hero-training-6.jpg** (699KB) - Career counseling session
7. **hero-training-7.jpg** (708KB) - Professional development
8. **hero-training-8.jpg** (611KB) - Workforce training

### Processed Variations
- **Square crops** (800x800): Perfect for cards and thumbnails
- **Wide crops** (1920x600): Ideal for hero banners
- **Portrait crops** (600x800): Great for sidebars
- **Thumbnails** (400x300): Quick loading previews

---

## 🎯 Current Usage

### Homepage (✅ IMPLEMENTED)
- **Hero Section**: hero-training-1.jpg
- **Adult Learners Card**: hero-training-3.jpg
- **Working Families Card**: hero-training-4.jpg
- **Returning Citizens Card**: hero-training-5.jpg
- **Funding Section**: hero-training-2.jpg

---

## 📋 Distribution Plan by Page

### Marketing Pages

#### `/about` - About Us
```typescript
Hero: hero-training-6.jpg (team collaboration)
Mission section: hero-training-1.jpg
Values cards: hero-training-3.jpg, hero-training-4.jpg, hero-training-5.jpg
```

#### `/programs` - Programs Overview
```typescript
Hero: hero-training-1.jpg (main training)
Healthcare section: hero-training-2.jpg
Trades section: hero-training-5.jpg
Beauty section: hero-training-3.jpg
Business section: hero-training-7.jpg
```

#### `/pricing` - Pricing Plans
```typescript
Hero: hero-training-7.jpg (value proposition)
Funding options: hero-training-2.jpg
Success metrics: hero-training-8.jpg
```

#### `/contact` - Contact Us
```typescript
Hero: hero-training-6.jpg (consultation)
Support section: hero-training-4.jpg
```

#### `/employers` - For Employers
```typescript
Hero: hero-training-2.jpg (workforce solutions)
Benefits section: hero-training-7.jpg
Partnership: hero-training-4.jpg
```

#### `/workforce-partners` - Workforce Partners
```typescript
Hero: hero-training-4.jpg (collaboration)
Programs: hero-training-1.jpg
Impact: hero-training-8.jpg
```

#### `/training-providers` - Training Providers
```typescript
Hero: hero-training-3.jpg (education)
Curriculum: hero-training-1.jpg
Support: hero-training-6.jpg
```

#### `/financial-aid` - Financial Aid
```typescript
Hero: hero-training-7.jpg (funding support)
WIOA section: hero-training-2.jpg
Success stories: hero-training-5.jpg
```

#### `/success-stories` - Success Stories
```typescript
Hero: hero-training-5.jpg (achievements)
Graduate profiles: hero-training-3.jpg, hero-training-4.jpg
Impact metrics: hero-training-8.jpg
```

#### `/careers` - Careers
```typescript
Hero: hero-training-1.jpg (opportunities)
Team culture: hero-training-6.jpg
Benefits: hero-training-4.jpg
```

#### `/blog` - Blog
```typescript
Featured post: hero-training-8.jpg
Category headers: Rotate through all images
```

#### `/webinars` - Webinars
```typescript
Hero: hero-training-2.jpg (learning)
Upcoming events: hero-training-7.jpg
```

---

### LMS Pages

#### `/lms` - LMS Dashboard
```typescript
Hero: hero-training-1.jpg
Welcome section: hero-training-2.jpg
Quick stats: hero-training-8.jpg
```

#### `/lms/courses` - Course Catalog
```typescript
Hero: hero-training-3.jpg
Featured courses: hero-training-1.jpg, hero-training-5.jpg
```

#### `/lms/dashboard` - Learning Dashboard
```typescript
Progress banner: hero-training-2.jpg
Achievements: hero-training-5.jpg
```

#### `/lms/achievements` - Achievements
```typescript
Hero: hero-training-5.jpg
Badge showcase: hero-training-8.jpg
```

#### `/lms/forums` - Discussion Forums
```typescript
Hero: hero-training-4.jpg (community)
Active discussions: hero-training-6.jpg
```

#### `/lms/study-groups` - Study Groups
```typescript
Hero: hero-training-4.jpg
Group activities: hero-training-3.jpg
```

#### `/lms/help` - Help Center
```typescript
Hero: hero-training-6.jpg (support)
FAQ sections: hero-training-7.jpg
```

---

### Student Portal

#### `/student/dashboard` - Student Dashboard
```typescript
Welcome banner: hero-training-1.jpg
Progress section: hero-training-5.jpg
```

#### `/student/courses` - My Courses
```typescript
Header: hero-training-3.jpg
Active courses: hero-training-2.jpg
```

#### `/student/progress` - My Progress
```typescript
Hero: hero-training-5.jpg
Milestones: hero-training-8.jpg
```

#### `/student/career-counseling` - Career Counseling
```typescript
Hero: hero-training-6.jpg
Services: hero-training-7.jpg
```

#### `/student/resources` - Resources
```typescript
Hero: hero-training-7.jpg
Resource categories: hero-training-1.jpg, hero-training-3.jpg
```

---

### Instructor Portal

#### `/instructor/dashboard` - Instructor Dashboard
```typescript
Hero: hero-training-2.jpg (teaching)
Class overview: hero-training-4.jpg
```

#### `/instructor/analytics` - Analytics
```typescript
Hero: hero-training-7.jpg (data)
Performance metrics: hero-training-8.jpg
```

---

### Admin Portal

#### `/admin` - Admin Home
```typescript
Hero: hero-training-1.jpg
System overview: hero-training-7.jpg
```

#### `/admin/dashboard` - Admin Dashboard
```typescript
Hero: hero-training-7.jpg
Key metrics: hero-training-8.jpg
```

#### `/admin/students` - Student Management
```typescript
Hero: hero-training-3.jpg
Enrollment data: hero-training-2.jpg
```

#### `/admin/courses` - Course Management
```typescript
Hero: hero-training-2.jpg
Curriculum builder: hero-training-1.jpg
```

---

## 🎨 Usage Guidelines

### Image Selection Criteria
1. **Hero sections**: Use wide crops (1920x600) for full-width banners
2. **Card images**: Use square crops (800x800) for consistent sizing
3. **Sidebars**: Use portrait crops (600x800) for vertical layouts
4. **Thumbnails**: Use thumbnail versions (400x300) for lists

### Rotation Strategy
- Rotate images every 3-6 months for freshness
- Use different images for A/B testing
- Maintain visual consistency within page sections

### Performance
- Always use Next.js Image component
- Set appropriate `sizes` prop
- Use `priority` for above-the-fold images
- Use `loading="lazy"` for below-the-fold images

---

## 📊 Implementation Status

### Phase 1: Homepage ✅
- [x] Hero section
- [x] Who We Serve cards
- [x] Funding section
- [x] Success stories

### Phase 2: Marketing Pages (In Progress)
- [ ] About page
- [ ] Programs page
- [ ] Pricing page
- [ ] Contact page
- [ ] Employers page
- [ ] Financial Aid page
- [ ] Success Stories page
- [ ] Careers page

### Phase 3: LMS Pages (Pending)
- [ ] LMS Dashboard
- [ ] Course Catalog
- [ ] Achievements
- [ ] Forums
- [ ] Study Groups
- [ ] Help Center

### Phase 4: Portal Pages (Pending)
- [ ] Student Dashboard
- [ ] Student Courses
- [ ] Student Progress
- [ ] Career Counseling
- [ ] Instructor Dashboard
- [ ] Admin Dashboard

---

## 🔄 Next Steps

1. **Batch update marketing pages** - Use find/replace for placeholder images
2. **Update LMS pages** - Implement new hero sections
3. **Update portal pages** - Add professional imagery
4. **Test all pages** - Verify images load correctly
5. **Optimize performance** - Check page load times
6. **Document changes** - Update this file with completion status

---

**Last Updated**: November 26, 2025
**Total Images**: 8 originals + 32 variations = 40 total image assets
**Total Size**: ~6.1MB (originals) + ~4MB (variations) = ~10MB total
