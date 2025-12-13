# Admin Routes Documentation

## Overview
Admin portal with 155+ routes for managing programs, students, staff, and operations.

## Authentication
- **Auth Guard**: `app/admin/layout.tsx` uses `requireAdmin()` from `lib/auth.ts`
- **Proxy Protection**: `proxy.ts` checks admin role in profiles table
- **Redirect**: Unauthorized users → `/admin/login?redirect=/admin`

## Route Structure

### Core Admin Routes
- `/admin` - Main dashboard
- `/admin/dashboard` - Detailed dashboard view

### Student Management
- `/admin/students` - All students list
- `/admin/students/export` - Export student data
- `/admin/applicants` - Application management
- `/admin/applicants-live` - Live applicant tracking
- `/admin/applications` - Application processing
- `/admin/applications/[id]` - Individual application

### Program Management
- `/admin/programs` - All programs
- `/admin/programs/new` - Create program
- `/admin/programs/builder` - Program builder
- `/admin/programs/[code]/dashboard` - Program dashboard

### Course Management
- `/admin/courses` - All courses
- `/admin/courses/create` - Create course
- `/admin/courses/builder` - Course builder
- `/admin/courses/manage` - Manage courses
- `/admin/courses/bulk-operations` - Bulk operations
- `/admin/courses/[id]/content` - Course content
- `/admin/courses/[id]/quizzes` - Course quizzes

### Staff & HR
- `/admin/hr` - HR dashboard
- `/admin/hr/employees` - Employee directory
- `/admin/hr/employees/new` - Add employee
- `/admin/hr/employees/[id]` - Employee details
- `/admin/hr/payroll` - Payroll management
- `/admin/hr/time` - Time tracking
- `/admin/hr/leave` - Leave management
- `/admin/instructors` - Instructor management
- `/admin/instructors/performance` - Performance tracking

### Partners & Program Holders
- `/admin/program-holders` - All partners
- `/admin/program-holders/[id]/countersign-mou` - MOU signing
- `/admin/partners` - Partner management
- `/admin/partners/lms-integrations` - LMS integrations
- `/admin/employers` - Employer partnerships
- `/admin/employers/[id]/proposal` - Employer proposals

### Analytics & Reporting
- `/admin/analytics` - Analytics dashboard
- `/admin/analytics/programs` - Program analytics
- `/admin/analytics/engagement` - Engagement metrics
- `/admin/analytics/learning` - Learning analytics
- `/admin/reports` - Reports dashboard
- `/admin/reports/caseload` - Caseload reports
- `/admin/reports/charts` - Chart reports
- `/admin/reports/partners` - Partner reports

### Marketing & Communications
- `/admin/email-marketing` - Email campaigns
- `/admin/email-marketing/campaigns/new` - New campaign
- `/admin/email-marketing/automation` - Marketing automation
- `/admin/email-marketing/automation/new` - New automation
- `/admin/email-marketing/analytics` - Email analytics
- `/admin/social-media` - Social media management
- `/admin/social-media/campaigns/new` - New social campaign
- `/admin/notifications` - Push notifications
- `/admin/live-chat` - Live chat support

### Compliance & Documentation
- `/admin/compliance` - Compliance dashboard
- `/admin/compliance-dashboard` - Detailed compliance view
- `/admin/compliance/exports` - Data exports
- `/admin/compliance/deletions` - Data deletions
- `/admin/accreditation` - Accreditation management
- `/admin/ferpa/training` - FERPA training
- `/admin/docs` - Document center
- `/admin/docs/mou` - MOUs
- `/admin/documents` - Document management
- `/admin/documents/upload` - Upload documents
- `/admin/document-center` - Document center
- `/admin/document-center/[category]` - Category documents

### Certificates & Credentials
- `/admin/certificates` - Certificate management
- `/admin/certificates/issue` - Issue certificates
- `/admin/certificates/bulk` - Bulk certificate operations
- `/admin/certifications` - Certification tracking
- `/admin/certifications/bulk` - Bulk certifications

### Financial Management
- `/admin/funding` - Funding management
- `/admin/grants` - Grant management
- `/admin/grants/intake` - Grant intake
- `/admin/grants/submissions` - Grant submissions
- `/admin/grants/workflow` - Grant workflow
- `/admin/grants/revenue` - Revenue tracking
- `/admin/cash-advances` - Cash advance management
- `/admin/cash-advances/pending` - Pending advances
- `/admin/cash-advances/reports` - Advance reports
- `/admin/cash-advances/settings` - Advance settings
- `/admin/payroll` - Payroll system
- `/admin/payroll-cards` - Payroll cards
- `/admin/tax-filing` - Tax filing system
- `/admin/tax-filing/applications` - Tax applications
- `/admin/tax-filing/preparers` - Tax preparers
- `/admin/tax-filing/reports` - Tax reports
- `/admin/tax-filing/training` - Tax training

### Content & Media
- `/admin/videos` - Video management
- `/admin/videos/upload` - Upload videos
- `/admin/video-manager` - Video manager
- `/admin/media-studio` - Media studio
- `/admin/files` - File management

### System & Operations
- `/admin/operations` - Operations dashboard
- `/admin/settings` - System settings
- `/admin/security` - Security settings
- `/admin/system-health` - System health
- `/admin/site-health` - Site health
- `/admin/audit-logs` - Audit logs
- `/admin/migrations` - Data migrations
- `/admin/mobile-sync` - Mobile sync
- `/admin/tenants` - Multi-tenant management

### Development & Tools
- `/admin/dev-studio` - Development studio
- `/admin/copilot` - AI copilot
- `/admin/copilot/deploy` - Deploy copilot
- `/admin/autopilot` - Automation
- `/admin/autopilots` - Automation management
- `/admin/workflows` - Workflow management
- `/admin/data-processor` - Data processing
- `/admin/editor` - Content editor

### Specialized Programs
- `/admin/apprenticeships` - Apprenticeship management
- `/admin/jri` - Justice Reinvestment Initiative
- `/admin/sap` - Student Assistance Program
- `/admin/etpl-alignment` - ETPL alignment
- `/admin/external-modules` - External modules
- `/admin/external-modules/approvals` - Module approvals
- `/admin/external-progress` - External progress tracking
- `/admin/transfer-hours` - Transfer hours

### Other
- `/admin/outcomes` - Student outcomes
- `/admin/retention` - Retention tracking
- `/admin/completions` - Completion tracking
- `/admin/progress` - Progress tracking
- `/admin/barriers` - Barrier tracking
- `/admin/impact` - Impact metrics
- `/admin/success` - Success metrics
- `/admin/contacts` - Contact management
- `/admin/users` - User management
- `/admin/users/new` - Create user
- `/admin/delegates` - Delegate management
- `/admin/signatures` - Signature management
- `/admin/signatures/new` - New signature
- `/admin/portal-map` - Portal map
- `/admin/license` - License management
- `/admin/store` - Store management
- `/admin/store/clones` - Store clones

## Fixed Issues
- ❌ Removed broken link: `/admin/elevate-ai` (doesn't exist)
- ✅ Fixed: `/admin/staff` → `/admin/hr/employees`
- ✅ Fixed: `/lms/attendance` → `/lms/(app)/attendance`

## Access Control
All admin routes require:
1. Valid Supabase session
2. User profile with `role = 'admin'`
3. Checked at both proxy level and layout level

## Navigation
Primary navigation in `components/AdminNav.tsx` with organized sections:
- Dashboard
- Marketing
- Communications
- HR & Payroll
- Programs
- Students
- Staff Management
- Program Holders
- Analytics
- Compliance
- Operations
- Settings
