# Comprehensive Site Upgrade Plan

## Reference Sites & Implementation Strategy

### Primary References

1. **SkilledUS.org** - Overall site structure, layout, UX
   - Homepage hero with video
   - Career pathways organization
   - 3-column feature sections
   - Testimonials and success stories
   - Clean navigation and CTAs

2. **Drake Software Practice Management** - Dashboards, admin, CRM
   - Professional dashboard layouts
   - Table/grid designs
   - Reporting and analytics
   - Admin panel structure

3. **TurboTax** - Homepage, navigation, onboarding flows
   - Clear outcomes-focused pitch
   - Step-by-step onboarding
   - Trust/social proof sections
   - Help/FAQ flows

4. **TaxSlayerPro** - Demo/onboarding flows
   - High-conversion landing pages
   - Lead generation UI
   - Trust elements and badges

5. **IRS VITA** - Free tax preparation compliance
   - Eligibility information
   - Forms and resources
   - Public service tone

6. **EPS Financial (epstax.net)** - Banking partner integration
   - Refund advance products
   - Professional financial services
   - Compliance disclosures

---

## Core Features to Implement

### 1. Tax Preparation Software (Custom Drake/TurboTax-inspired)

- Multi-step guided tax preparation flow
- User roles: client, preparer, admin, reviewer
- Comprehensive forms with validation
- Smart navigation with skip logic
- Save progress functionality
- Year picker for prior/future years
- Admin dashboard for case tracking
- Secure data handling

### 2. VITA Site (IRS-Compliant)

**URL:** `/vita`

- Landing page: "Qualify for Free Tax Prep?"
- IRS VITA resource/eligibility links
- Secure document upload widget
- Online scheduling (virtual/in-person)
- Public service tone (no commercial language)
- Multi-language support (EN/ES)
- Volunteer signup option

### 3. Supersonic Fast Cash

**URL:** `/supersonic-fast-cash`

- Conversion-optimized landing page
- Secure document upload
- Online scheduling/calendar
- Demo/consultation intake
- Trust elements (badges, testimonials)
- No e-commerce checkout (lead generation only)

### 4. EPS Financial Bank Integration

**URL:** `/banking` or `/eps-partner`

- Refund advance products
- Direct deposit options
- Prepaid cards
- Fee deduct/rebate products
- "Powered by EPS Financial" branding
- Compliance disclosures (FDIC, etc.)
- Professional marketing flow

### 5. Social Media Automation

**Frequency:** 3x per day
**Platforms:** Instagram, TikTok, Facebook, YouTube, LinkedIn, X/Twitter
**Content Type:** Reels/Shorts for marketing
**Features:**

- Auto-posting from content folder
- Admin dashboard for scheduling
- Cross-platform posting
- Custom hashtags per platform
- Usage logs and tracking
- Pause/resume controls

---

## Design Requirements

### Remove Everywhere:

- ❌ All gradient backgrounds
- ❌ Placeholder images
- ❌ Generic/stub content
- ❌ Cartoonish images

### Use Instead:

- ✅ Real images from 720+ asset library
- ✅ High-quality videos (20+ available)
- ✅ Professional photography
- ✅ Authentic content

### Layout Standards (SkilledUS-inspired):

- Clean hero sections with video backgrounds
- 3-column feature cards
- Horizontal content bands
- Consistent spacing (40-60px padding)
- Mobile-first responsive design
- Clear CTAs throughout
- Trust elements (logos, testimonials)

---

## Navigation Structure

### Main Menu (SkilledUS-style):

**Programs**

- HVAC
- Barber Apprenticeship
- CNA
- CDL
- Building Maintenance
- All Programs

**For Agencies**

- WorkOne Partnership
- EmployIndy Referral Hub
- ETPL & WRG Compliance
- Employer OJT/WEX Portal
- Apprenticeship Logs

**For Students**

- Student Portal
- Apply Now
- FAQs

**For Employers**

- Host Apprentices
- OJT/WEX
- Talent Pipeline Services

**Tax Services**

- VITA (Free Tax Prep)
- Supersonic Fast Cash
- Tax Preparation Software
- Banking Services (EPS)

**About**

- Approvals
- Workforce Impact
- Leadership
- Contact

---

## Dashboard Requirements

### Student Portal (LMS)

- Course progress tracking
- Hours logs
- Certifications
- Orientation
- Messages
- Gamification (points, badges, streaks)

### Employer Portal

- View apprentices
- Approve hours
- Submit WEX/OJT documents
- Hire candidates
- Job postings

### Agency Portal (WorkOne/EmployIndy)

- Refer clients
- Track progress
- Download reports
- Request status updates

### Program Holder/Partner Portal

- Manage students
- Submit reports
- Track compliance
- Document storage (MOUs)
- Attendance tracking

### Admin Dashboard

- User management
- Case tracking
- Review queue
- Export to CSV
- Workflow guidance
- Social media scheduling

---

## Document Upload & Scheduling

### Both VITA and Supersonic Fast Cash Need:

1. **Secure Document Upload**
   - Drag-and-drop interface
   - File type validation
   - Progress indicators
   - Success confirmations
   - Secure storage (S3/Supabase)

2. **Online Scheduling**
   - Calendar date/time picker
   - Available slots display
   - Email/SMS confirmations
   - Virtual and in-person options
   - Admin view of appointments

3. **Admin Dashboard**
   - View submissions
   - Review uploaded documents
   - Manage appointments
   - Client communication
   - Status tracking

---

## Compliance & Legal

### IRS VITA Requirements:

- Clear eligibility criteria
- IRS resource links
- Forms access
- Privacy policy
- Data security
- Volunteer guidelines

### Banking (EPS Financial):

- FDIC disclosures
- Fee schedules
- Terms and conditions
- Privacy policy
- Partner branding
- Regulatory compliance

### General Site:

- Equal opportunity statement
- Accessibility compliance (WCAG 2.1 AA)
- Privacy policy
- Terms of service
- Cookie consent
- FERPA compliance (education)

---

## SEO & Accessibility

### SEO Requirements:

- Proper meta tags
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap
- Robots.txt
- Alt text for all images
- Semantic HTML
- Fast page load times

### Accessibility (ADA):

- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus indicators
- ARIA labels
- Skip navigation links
- Readable font sizes
- Touch target sizes (mobile)

---

## Mobile Optimization

### All Pages Must Have:

- Mobile-first responsive design
- Touch-friendly buttons (44px minimum)
- Readable text (16px minimum)
- Optimized images
- Fast loading
- Swipe gestures where appropriate
- Mobile navigation menu
- Bottom navigation for key actions

---

## Reference Links to Embed

### As Working Outbound Links:

1. https://skilledus.org/ - "Compare Programs"
2. https://user.drakesoftware.com/practice-management - "Best Practices"
3. https://turbotax.intuit.com/ - "Tax Resources"
4. https://www.taxslayerpro.com/ - "Professional Tools"
5. https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers - "IRS VITA"
6. https://www.epstax.net/ - "Banking Partner"

### Placement:

- Footer "Resources" section
- Relevant page sidebars
- "Learn More" sections
- Partner/network pages

---

## Asset Inventory

### Available:

- 720+ images (JPG, PNG, WebP)
- 20+ videos (MP4)
- Team photos
- Facility images
- Program-specific media
- Hero banners
- Success stories

### Needed (to be identified):

- Hero banners for specific pages
- Additional program-specific images
- Testimonial videos
- Social media content

---

## Implementation Priority

### P0 (Critical - Launch Blockers):

1. Remove all gradients from program cards
2. Homepage redesign (SkilledUS-style)
3. All program pages polished
4. Navigation structure updated
5. Footer with all links
6. Student apply flow working
7. Mobile responsive throughout

### P1 (Important - First Week):

1. VITA page complete
2. Supersonic Fast Cash complete
3. Tax preparation software MVP
4. EPS banking integration
5. Document upload system
6. Online scheduling system
7. Employer portal
8. Agency portal
9. Social media automation setup

### P2 (Enhancement - Second Week):

1. Advanced dashboards
2. Gamification features
3. Video testimonials
4. Multi-language support
5. Advanced analytics
6. Automated workflows
7. Email/SMS notifications
8. Mobile app considerations

---

## Testing Checklist

### Before Launch:

- [ ] All pages load without errors
- [ ] No placeholder content
- [ ] All images display correctly
- [ ] All links work (internal and external)
- [ ] Forms submit successfully
- [ ] Mobile responsive on all devices
- [ ] Accessibility audit passed
- [ ] SEO audit passed
- [ ] Performance audit passed
- [ ] Security audit passed
- [ ] Browser compatibility tested
- [ ] User flows tested (apply, enroll, etc.)
- [ ] Admin dashboards functional
- [ ] Document upload working
- [ ] Scheduling system working
- [ ] Social media posting tested

---

## Documentation Deliverables

### For Client:

1. Deployment checklist
2. Testing procedures
3. Admin user guides
4. Content management guide
5. Social media automation guide
6. Troubleshooting guide
7. API keys needed
8. Environment variables
9. Database setup instructions
10. Backup procedures

---

## Next Steps

1. Continue systematic audit of all pages
2. Remove gradients from homepage program cards
3. Update navigation to match SkilledUS structure
4. Build VITA page
5. Build Supersonic Fast Cash enhancements
6. Implement document upload system
7. Implement scheduling system
8. Build tax preparation software
9. Integrate EPS banking
10. Set up social media automation
11. Test all flows
12. Deploy to production

---

**Status:** In Progress
**Last Updated:** 2025-12-29
**Completion Target:** Ready for production launch
