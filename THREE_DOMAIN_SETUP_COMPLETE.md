# Three Domain Setup - Complete Configuration

## ✅ Your 3 Domains

### Domain 1: Public Website
**URL:** `www.elevateforhumanity.org`
**Purpose:** Public-facing marketing and information
**Access:** Open to everyone (no login required)

**Content:**
- Homepage
- About Us
- Programs catalog
- Apply now
- Contact
- Blog
- Success stories
- Funding information
- FAQ
- Careers
- Employer information
- Partner information

---

### Domain 2: Admin/Back Office
**URL:** `www.elevateconnectsdirectory.org`
**Purpose:** Internal tools and administration
**Access:** Login required (role-based)

**Content:**
- `/admin` - Admin dashboard (admin/super_admin only)
- `/staff-portal` - Staff tools (staff/admin only)
- `/program-holder/portal` - Program holder portal (program_owner/admin only)
- `/workforce-board` - Workforce board (workforce_board/admin only)
- `/course-builder` - Course creation tools
- `/digital-binders` - Digital workbooks
- `/admin/hr` - HR and payroll
- `/admin/grants` - Grant management
- `/admin/reports` - Reporting tools

---

### Domain 3: LMS/Student Portal
**URL:** `www.elevateeducationedu.com`
**Purpose:** Learning management system for students
**Access:** Login required (students/apprentices only)

**Content:**
- `/` - Student dashboard
- `/lms` - Learning management system
- `/student` - Student portal
- `/courses` - Course catalog
- `/my-courses` - Enrolled courses
- `/assignments` - Assignments
- `/grades` - Grades and progress
- `/certificates` - Certificates
- `/calendar` - Student calendar
- `/messages` - Student messages
- `/orientation` - Student orientation

---

## 🔐 Authentication & Routing

### Middleware Configuration

**File:** `middleware.ts` (created and configured)

**How it works:**

#### Domain 1: elevateforhumanity.org
- ✅ Public pages accessible without login
- ✅ Student portal routes redirect to login if not authenticated
- ✅ Students accessing `/student` or `/lms` are redirected to LMS domain

#### Domain 2: elevateconnectsdirectory.org
- ✅ All pages require authentication
- ✅ Role-based access control enforced
- ✅ Wrong role redirects to appropriate login with error
- ✅ Students trying to access admin are redirected to LMS domain

#### Domain 3: elevateeducationedu.com
- ✅ All pages require authentication
- ✅ Only students and apprentices can access
- ✅ Admin/staff/program owners are redirected to their portals
- ✅ Login page accessible for authentication

---

## 🚀 Vercel Configuration

### Step 1: Add All 3 Domains to Vercel

**Go to:** https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/domains

**Add these domains:**
1. `elevateforhumanity.org`
2. `www.elevateforhumanity.org` (primary)
3. `elevateconnectsdirectory.org`
4. `www.elevateconnectsdirectory.org` (primary)
5. `elevateeducationedu.com`
6. `www.elevateeducationedu.com` (primary)

### Step 2: Configure DNS for Each Domain

#### Domain 1: elevateforhumanity.org

**At your DNS provider (GoDaddy, Namecheap, etc.):**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Domain 2: elevateconnectsdirectory.org

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Domain 3: elevateeducationedu.com

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Can take up to 48 hours in rare cases
- Check status: https://dnschecker.org/

### Step 4: Verify SSL Certificates

Vercel automatically issues SSL certificates for all domains.

**Check:**
- https://www.elevateforhumanity.org (should show 🔒)
- https://www.elevateconnectsdirectory.org (should show 🔒)
- https://www.elevateeducationedu.com (should show 🔒)

---

## 📊 Domain Routing Matrix

| User Role | Tries to Access | Redirected To |
|-----------|----------------|---------------|
| **Not Logged In** | elevateforhumanity.org/student | elevateforhumanity.org/login |
| **Not Logged In** | elevateconnectsdirectory.org/admin | elevateconnectsdirectory.org/admin/login |
| **Not Logged In** | elevateeducationedu.com/lms | elevateeducationedu.com/login |
| **Student** | elevateforhumanity.org/student | elevateeducationedu.com/student |
| **Student** | elevateconnectsdirectory.org/admin | elevateconnectsdirectory.org/admin/login (error) |
| **Admin** | elevateeducationedu.com/lms | elevateconnectsdirectory.org/admin |
| **Staff** | elevateeducationedu.com/lms | elevateconnectsdirectory.org/staff-portal |
| **Program Owner** | elevateeducationedu.com/lms | elevateconnectsdirectory.org/program-holder/portal |

---

## 🎯 User Experience Flow

### For Students

**Step 1:** Visit `www.elevateforhumanity.org`
- Browse programs
- Read about organization
- Click "Apply"

**Step 2:** Apply and get accepted
- Receive email with LMS link
- Link goes to `www.elevateeducationedu.com/login`

**Step 3:** Login to LMS
- Access courses at `www.elevateeducationedu.com`
- All learning happens on LMS domain
- Never see admin domain

### For Admin/Staff

**Step 1:** Visit `www.elevateconnectsdirectory.org`
- Bookmark this URL
- This is your work portal

**Step 2:** Login with admin/staff credentials
- Access admin dashboard
- Manage students, courses, reports
- Never see LMS domain (unless testing)

### For Program Holders

**Step 1:** Visit `www.elevateconnectsdirectory.org/program-holder/portal`
- Bookmark this URL
- This is your portal

**Step 2:** Login with program holder credentials
- Manage your program students
- View reports
- Access syllabus tools

---

## 🔧 Environment Variables

Add these to Vercel:

```bash
# Domain Configuration
NEXT_PUBLIC_PUBLIC_DOMAIN=www.elevateforhumanity.org
NEXT_PUBLIC_ADMIN_DOMAIN=www.elevateconnectsdirectory.org
NEXT_PUBLIC_LMS_DOMAIN=www.elevateeducationedu.com

NEXT_PUBLIC_PUBLIC_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_ADMIN_URL=https://www.elevateconnectsdirectory.org
NEXT_PUBLIC_LMS_URL=https://www.elevateeducationedu.com
```

**Add in Vercel:**
1. Go to: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables
2. Add each variable
3. Set for Production, Preview, Development
4. Redeploy

---

## 🎨 Branding Per Domain

### Public Domain (elevateforhumanity.org)
- **Colors:** Brand blue, orange, green
- **Logo:** Full Elevate for Humanity logo
- **Tone:** Professional, welcoming, inspiring
- **Navigation:** Public-facing menu

### Admin Domain (elevateconnectsdirectory.org)
- **Colors:** Professional grays, blues
- **Logo:** Simplified logo or text
- **Tone:** Business, efficient, data-focused
- **Navigation:** Admin sidebar

### LMS Domain (elevateeducationedu.com)
- **Colors:** Student-friendly, bright
- **Logo:** Education-focused branding
- **Tone:** Encouraging, supportive, clear
- **Navigation:** Student-focused menu

---

## 📱 Mobile Access

All 3 domains are mobile-responsive:
- ✅ Public website - Mobile-optimized
- ✅ Admin portal - Responsive dashboard
- ✅ LMS - Mobile-friendly learning

---

## 🔐 Security Features

### Per-Domain Security

**Public Domain:**
- HTTPS/SSL
- CSRF protection
- Rate limiting on forms
- reCAPTCHA on applications

**Admin Domain:**
- HTTPS/SSL
- Role-based access control
- Session management
- Activity logging
- IP restrictions (optional)

**LMS Domain:**
- HTTPS/SSL
- Student authentication
- Progress tracking
- Secure assessments
- Proctoring integration

---

## 🚨 Troubleshooting

### Issue: Domain not loading

**Check:**
1. DNS configured correctly
2. Domain added to Vercel
3. SSL certificate issued
4. Wait for DNS propagation

**Solution:**
```bash
# Check DNS
dig www.elevateforhumanity.org
dig www.elevateconnectsdirectory.org
dig www.elevateeducationedu.com

# Should all point to Vercel servers
```

### Issue: Redirect loop

**Check:**
1. Middleware configuration
2. Authentication cookies
3. User role in database

**Solution:**
- Clear browser cookies
- Check user role in Supabase
- Verify middleware logic

### Issue: Wrong domain redirect

**Check:**
1. Middleware routing logic
2. User role
3. URL being accessed

**Solution:**
- Review middleware.ts
- Check user profile role
- Verify domain in URL

---

## 📊 Testing Checklist

### Public Domain (elevateforhumanity.org)

- [ ] Homepage loads
- [ ] Programs page loads
- [ ] Apply form works
- [ ] Contact form works
- [ ] Login redirects to correct page
- [ ] Student login redirects to LMS domain

### Admin Domain (elevateconnectsdirectory.org)

- [ ] Admin login page loads
- [ ] Admin dashboard loads after login
- [ ] Staff portal accessible by staff
- [ ] Program holder portal accessible by program owners
- [ ] Students cannot access admin
- [ ] Unauthorized users see error

### LMS Domain (elevateeducationedu.com)

- [ ] LMS login page loads
- [ ] Student dashboard loads after login
- [ ] Courses accessible
- [ ] Assignments work
- [ ] Grades display
- [ ] Admin/staff redirected away

---

## 🎉 Summary

**Your 3-domain setup is now configured!**

✅ **Middleware created** - Routes users to correct domain
✅ **Authentication configured** - Role-based access control
✅ **Domain routing** - Automatic redirects based on role
✅ **Security implemented** - Protected routes per domain

**Next Steps:**

1. **Add domains to Vercel** (if not already done)
2. **Configure DNS** for all 3 domains
3. **Add environment variables** to Vercel
4. **Redeploy** application
5. **Test** all 3 domains
6. **Update** user communications with correct URLs

**Access URLs:**
- **Public:** https://www.elevateforhumanity.org
- **Admin:** https://www.elevateconnectsdirectory.org
- **LMS:** https://www.elevateeducationedu.com

---

**Last Updated:** December 26, 2025

**Status:** ✅ Middleware configured and ready

**Action Required:** 
1. Add domains to Vercel
2. Configure DNS
3. Add environment variables
4. Redeploy

**Files Created:**
- `middleware.ts` - Domain routing logic
- `THREE_DOMAIN_SETUP_COMPLETE.md` - This documentation
