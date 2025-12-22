# Complete List of All Pages

**Total Pages:** 724

## Summary by Category

### Admin Pages (200+)

- Dashboard and analytics
- User management
- Course management
- Program administration
- Compliance and reporting
- System settings

### Student Portal (100+)

- Dashboard
- Courses and lessons
- Assignments and grades
- Certificates
- Career services
- Messages and notifications

### Public Pages (50+)

- Homepage
- About and team
- Programs catalog
- Careers ✅ (just created)
- Contact and apply
- Legal pages

### LMS Pages (80+)

- Course builder
- Lesson management
- Quizzes and assessments
- Forums and discussions
- Gradebook

### Partner Portals (60+)

- Program holder dashboard
- Workforce board portal
- Employer portal
- Training provider portal

### Specialized Portals (40+)

- Instructor portal
- Staff portal
- Case manager portal
- Delegate portal

## Full Page List

To see the complete list of all 724 pages, run:

```bash
find app -name "page.tsx" | sort
```

## Key Pages

### Public

- `/` - Homepage
- `/about` - About us
- `/careers` - Careers (✅ just created)
- `/programs` - Programs catalog
- `/apply` - Application
- `/contact` - Contact form

### Authentication

- `/login` - Login
- `/signup` - Sign up
- `/auth/signin` - Auth sign in
- `/auth/signup` - Auth sign up

### Student

- `/portal/student/dashboard` - Student dashboard
- `/portal/student/courses` - My courses
- `/portal/student/certificates` - Certificates
- `/portal/student/progress` - Progress tracking

### Admin

- `/admin` - Admin dashboard
- `/admin/students` - Student management
- `/admin/courses` - Course management
- `/admin/analytics` - Analytics

### Programs

- `/programs/[slug]` - Program details
- `/programs/admin` - Program admin
- `/program-holder` - Program holder portal

## Page Categories

### By Route Prefix

| Prefix              | Count | Description     |
| ------------------- | ----- | --------------- |
| `/admin/*`          | 200+  | Admin pages     |
| `/portal/student/*` | 80+   | Student portal  |
| `/lms/*`            | 80+   | LMS features    |
| `/programs/*`       | 40+   | Program pages   |
| `/portal/*`         | 60+   | Various portals |
| `/courses/*`        | 30+   | Course pages    |
| `/auth/*`           | 5     | Authentication  |
| Root level          | 50+   | Public pages    |

## Recently Created

✅ `/careers` - Careers page (December 15, 2025)

## Missing/Broken Pages

Based on the original issue, `/careers` was the only missing page and has now been created.

## Dynamic Routes

Pages with dynamic segments (using `[param]`):

- `/programs/[slug]` - Program details
- `/courses/[courseId]` - Course details
- `/blog/[slug]` - Blog posts
- `/admin/applications/[id]` - Application details
- `/marketplace/product/[id]` - Product details
- And many more...

## Export Full List

To export the complete list to a file:

```bash
find app -name "page.tsx" | sort > all-pages-complete.txt
```

## Statistics

- **Total Pages:** 724
- **Admin Pages:** ~200
- **Student Pages:** ~100
- **LMS Pages:** ~80
- **Portal Pages:** ~60
- **Public Pages:** ~50
- **Other:** ~234

## Notes

- All pages use Next.js 13+ App Router
- All pages are TypeScript (`.tsx`)
- Pages follow Next.js file-based routing
- Dynamic routes use `[param]` syntax
- Route groups use `(group)` syntax
