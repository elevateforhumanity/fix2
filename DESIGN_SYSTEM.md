# Elevate for Humanity - Complete Design System
## Marketing Website + Learning Management System

## Design Philosophy
Create a cohesive yet distinct experience across marketing and learning platforms:

### Marketing Site (Public)
- **Bold & Inspiring**: Large images, creative shapes, emotional storytelling
- **Orange (#F97316)** as primary brand color
- **Rounded-3xl** (24px) for modern card style
- **Creative shapes** (circles, hexagons, waves, diagonal cuts)
- **Gradient overlays** for depth and visual interest
- **Asymmetric layouts** for uniqueness

### LMS (Student Portal)
- **Clean & Focused**: Minimize distractions, maximize learning
- **Blue/Teal accents** for learning environment
- **Rounded-2xl** (16px) for functional UI
- **Progress indicators** everywhere
- **Card-based layouts** for courses and content
- **Sidebar navigation** for easy access

## Page-Specific Designs

### 1. Homepage
- **Hero**: Clean full-screen video, no overlay
- **Content below**: Headline and CTAs in white section
- **Programs**: Large cards (h-64/h-80) with bullet points
- **Stories**: Full-width images with detailed narratives
- **Unique elements**: Decorative circles, gradient backgrounds

### 2. Programs Page (page-new.tsx)
- **Hero**: Diagonal cut with gradient overlay
- **Skilled Trades**: Asymmetric grid with staggered cards, decorative circles
- **Healthcare**: Wave pattern background, hexagon accents
- **Beauty**: Border cards with large images
- **Unique elements**: Icon badges, colored accent shapes behind cards

### 3. Contact Page (page-new.tsx)
- **Hero**: Curved bottom with gradient background
- **Options Grid**: Image cards with gradient overlays and icon badges
- **Quick Contact**: Side-by-side cards for phone/email
- **Unique elements**: Decorative circles, curved shapes

### 4. About Page (to create)
- **Hero**: Large stats with icons
- **Story**: Quote section with large typography
- **Team**: Grid with photos and LinkedIn links
- **FAQ**: Accordion with categories
- **Unique elements**: Timeline, testimonial cards

### 5. Platform/Apps Page (to create)
- **Hero**: App icon and screenshots
- **Features**: Grid with icons and descriptions
- **Screenshots**: Horizontal scroll gallery
- **Download**: Large CTA buttons for iOS/Android
- **Unique elements**: Phone mockups, feature badges

### 6. Store Page (to create)
- **Hero**: Product showcase with 3D effect
- **Products**: Card grid with hover effects
- **Categories**: Tabs or filters
- **Unique elements**: Price tags, add to cart animations

### 7. Funding Page (to create)
- **Hero**: Money/funding themed graphics
- **Options**: Expandable cards for each funding type
- **Process**: Step-by-step timeline
- **Unique elements**: Progress indicators, checkmarks

### 8. Individual Program Pages
- **Hero**: Full-width video with voiceover
- **Second Hero**: Centered video lower on page
- **Content**: Detailed descriptions with benefits
- **Unique elements**: Highlight boxes, testimonials

## Shape Library
- **Circles**: Decorative backgrounds (blur-3xl, opacity-20)
- **Hexagons**: clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
- **Waves**: SVG paths for section dividers
- **Diagonal cuts**: clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'
- **Curved bottoms**: clipPath: 'ellipse(100% 100% at 50% 100%)'

## Animation Patterns
- **Hover scale**: scale-105 or scale-110
- **Hover translate**: -translate-y-2
- **Hover rotate**: rotate-2 or rotate-12
- **Duration**: duration-300 to duration-700
- **Transitions**: transition-all for smooth effects

## Color Gradients
- **Orange**: from-orange-500 to-orange-600
- **Blue**: from-blue-500 to-blue-600
- **Teal**: from-teal-500 to-teal-600
- **Purple**: from-purple-500 to-purple-600
- **Slate**: from-slate-900 to-slate-800

## Typography Scale
- **Hero**: text-5xl md:text-6xl lg:text-7xl
- **Section**: text-4xl md:text-5xl
- **Card Title**: text-2xl md:text-3xl
- **Body**: text-base md:text-lg
- **Small**: text-sm

## Spacing System
- **Section padding**: py-16 to py-20
- **Card padding**: p-6 to p-10
- **Grid gaps**: gap-8 to gap-12
- **Max widths**: max-w-7xl for content, max-w-5xl for text

## Marketing Website Pages

### Core Pages
1. ✅ **Homepage** - Clean hero video, descriptive content
2. ✅ **Programs Listing** - Asymmetric cards with creative shapes
3. ✅ **Individual Programs** - Full-width hero videos with voiceover
4. ✅ **Contact** - Image cards with gradient overlays
5. ⏳ **About** - Stats, team grid, FAQ accordion
6. ⏳ **Funding** - Expandable cards, timeline
7. ⏳ **Apply** - Multi-step form with progress
8. ⏳ **Platform** - Feature showcase
9. ⏳ **Store** - Product grid with filters

### Supporting Pages
- ⏳ **Students** - Student-focused landing page
- ⏳ **Employers** - Employer partnership page
- ⏳ **Training Providers** - Partner onboarding
- ⏳ **Success Stories** - Testimonial showcase
- ⏳ **Blog** - Article listing and detail pages

## LMS (Learning Management System) Pages

### Student Dashboard
1. ⏳ **Dashboard Home** - Course progress, upcoming lessons, achievements
2. ⏳ **My Courses** - Grid of enrolled courses with progress bars
3. ⏳ **Course Detail** - Lesson list, resources, discussion
4. ⏳ **Lesson Player** - Video player, notes, quiz integration
5. ⏳ **Quizzes** - Question interface, results, review
6. ⏳ **Assignments** - Upload interface, feedback display
7. ⏳ **Grades** - Grade book, transcript
8. ⏳ **Profile** - Settings, certificates, achievements

### Learning Features
9. ⏳ **Learning Paths** - Structured course sequences
10. ⏳ **Certificates** - Downloadable certificates
11. ⏳ **Badges** - Gamification achievements
12. ⏳ **Discussion Forums** - Community interaction
13. ⏳ **Resources** - File library, downloads
14. ⏳ **Calendar** - Schedule, deadlines
15. ⏳ **Messages** - Instructor communication

### Instructor/Admin
16. ⏳ **Course Builder** - Drag-and-drop course creation
17. ⏳ **Student Management** - Roster, progress tracking
18. ⏳ **Analytics** - Engagement metrics, completion rates
19. ⏳ **Grading** - Assignment review, feedback
20. ⏳ **Content Library** - Reusable content blocks

## Design Patterns by Section

### Marketing Site Patterns
```
Hero Sections:
- Full-width video/image (no overlay text)
- Content in section below hero
- Curved or diagonal bottom edges
- Gradient backgrounds

Content Sections:
- Asymmetric card grids
- Decorative shapes (circles, hexagons)
- Large typography for impact
- Bullet points with checkmarks
- Hover effects: scale, translate, rotate

CTAs:
- Large rounded buttons (rounded-2xl)
- Gradient backgrounds
- Shadow on hover
- Clear hierarchy
```

### LMS Patterns
```
Dashboard:
- Sidebar navigation (always visible)
- Card-based content layout
- Progress bars everywhere
- Quick stats at top

Course Interface:
- Video player (primary focus)
- Tabbed content (lessons, resources, discussion)
- Next/Previous navigation
- Completion tracking

Learning Content:
- Clean, distraction-free reading
- Embedded media
- Interactive elements (quizzes, exercises)
- Save progress automatically
```

## Implementation Strategy

### Phase 1: Marketing Site Foundation (Week 1-2)
- ✅ Homepage redesign
- ✅ Programs page with unique layouts
- ✅ Contact page with creative design
- ⏳ About page with team/FAQ
- ⏳ Apply page with multi-step form

### Phase 2: Marketing Site Completion (Week 3-4)
- ⏳ Funding page
- ⏳ Platform/Apps showcase
- ⏳ Store with products
- ⏳ All supporting pages
- ⏳ Footer links pages

### Phase 3: LMS Student Experience (Week 5-6)
- ⏳ Dashboard redesign
- ⏳ Course listing and detail
- ⏳ Lesson player interface
- ⏳ Quiz and assignment interfaces
- ⏳ Profile and settings

### Phase 4: LMS Advanced Features (Week 7-8)
- ⏳ Learning paths
- ⏳ Certificates and badges
- ⏳ Discussion forums
- ⏳ Analytics dashboard
- ⏳ Mobile responsiveness

### Phase 5: Polish & Testing (Week 9-10)
- ⏳ Animation refinement
- ⏳ Performance optimization
- ⏳ Accessibility audit
- ⏳ Cross-browser testing
- ⏳ User testing and feedback

## Current Status
**Completed**: 4 pages
**In Progress**: Design system documentation
**Remaining**: ~60+ pages across marketing and LMS

**Next Priority**: 
1. Replace page.tsx files with page-new.tsx versions
2. Create About page
3. Create Funding page
4. Begin LMS dashboard redesign
