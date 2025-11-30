// config/siteMapConfig.ts

export type SiteSectionKey =
  | "main"
  | "programs"
  | "funding"
  | "students"
  | "lms"
  | "credentials"
  | "employers"
  | "programHolders"
  | "careerServices"
  | "adminStaff"
  | "community"
  | "legal"
  | "hrPayroll"
  | "caseManagement"
  | "boards"
  | "specialPrograms"
  | "tools"
  | "builders"
  | "documents"
  | "instructor"
  | "reports";

export type SitePageLink = {
  label: string;
  href: string;
  /** show in header dropdown (if this section is used in header) */
  showInHeader?: boolean;
  /** show in footer column (if this section is used in footer) */
  showInFooter?: boolean;
};

export type SiteSection = {
  key: SiteSectionKey;
  title: string;
  pages: SitePageLink[];
};

export const SITE_MAP: SiteSection[] = [
  {
    key: "main",
    title: "Main Pages",
    pages: [
      { label: "Home", href: "/", showInHeader: true, showInFooter: true },
      { label: "About Us", href: "/about", showInHeader: true, showInFooter: true },
      { label: "Contact", href: "/contact", showInFooter: true },
      { label: "Apply Now", href: "/apply", showInHeader: true, showInFooter: true },
      { label: "FAQ", href: "/faq", showInFooter: true },
      { label: "Blog", href: "/blog", showInFooter: true },
      { label: "Success Stories", href: "/success-stories", showInFooter: true },
      { label: "Sitemap", href: "/sitemap-page", showInFooter: true },
    ],
  },
  {
    key: "programs",
    title: "Programs",
    pages: [
      { label: "All Programs", href: "/programs", showInHeader: true, showInFooter: true },
      { label: "Barber Apprenticeship", href: "/programs/barber-apprenticeship", showInHeader: true, showInFooter: true },
      { label: "CNA (Certified Nursing Assistant)", href: "/programs/cna", showInHeader: true, showInFooter: true },
      { label: "HVAC Technician", href: "/programs/hvac", showInHeader: true, showInFooter: true },
      { label: "Building Technician", href: "/programs/building-technician", showInHeader: true, showInFooter: true },
      { label: "CDL / Truck Driving", href: "/programs/cdl", showInHeader: true, showInFooter: true },
      { label: "Medical Assistant", href: "/programs/medical-assistant" },
      { label: "Tax Prep (VITA)", href: "/programs/vita" },
      { label: "Workforce Readiness", href: "/programs/workforce-readiness" },
      { label: "Micro Classes", href: "/programs/micro-classes" },
    ],
  },
  {
    key: "funding",
    title: "Funding",
    pages: [
      { label: "Funding Overview", href: "/funding", showInHeader: true, showInFooter: true },
      { label: "WIOA Funding", href: "/funding/wioa", showInHeader: true, showInFooter: true },
      { label: "Workforce Ready Grant", href: "/funding/wrg", showInHeader: true, showInFooter: true },
      { label: "Apprenticeships", href: "/funding/apprenticeship", showInHeader: true, showInFooter: true },
      { label: "Employer Sponsorship", href: "/funding/employer", showInHeader: true, showInFooter: true },
      { label: "Job Ready Indy (JRI)", href: "/funding/jri" },
      { label: "Financial Aid", href: "/funding/financial-aid" },
      { label: "WIOA Eligibility", href: "/funding/wioa-eligibility" },
    ],
  },
  {
    key: "students",
    title: "For Students",
    pages: [
      { label: "Student Portal", href: "/student/portal", showInHeader: true, showInFooter: true },
      { label: "Career Services", href: "/career-services", showInHeader: true, showInFooter: true },
      { label: "Courses", href: "/courses/catalog", showInHeader: true, showInFooter: true },
      { label: "Credentials", href: "/credentials", showInHeader: true, showInFooter: true },
      { label: "Student Dashboard", href: "/student/dashboard" },
      { label: "Student Hub", href: "/student/hub" },
      { label: "My Courses", href: "/student/courses" },
      { label: "Grades", href: "/student/grades" },
      { label: "Certificates", href: "/student/certificates" },
      { label: "Resources", href: "/student/resources", showInFooter: true },
      { label: "Support", href: "/student/support" },
    ],
  },
  {
    key: "lms",
    title: "LMS",
    pages: [
      { label: "LMS Home", href: "/lms" },
      { label: "LMS Dashboard", href: "/lms/dashboard", showInFooter: true },
      { label: "Course Catalog", href: "/courses/catalog", showInFooter: true },
      { label: "Assignments", href: "/lms/assignments" },
      { label: "Calendar", href: "/lms/calendar" },
      { label: "Achievements", href: "/lms/achievements" },
      { label: "Discussion Forums", href: "/lms/forums" },
    ],
  },
  {
    key: "credentials",
    title: "Credentials",
    pages: [
      { label: "Credentials Overview", href: "/credentials" },
      { label: "Verify Credential", href: "/credentials/verify", showInFooter: true },
      { label: "Certifications", href: "/credentials/certifications" },
      { label: "Milady Certifications", href: "/credentials/milady" },
      { label: "Milady LMS", href: "/credentials/milady-lms" },
    ],
  },
  {
    key: "employers",
    title: "For Employers",
    pages: [
      { label: "Employer Overview", href: "/employers", showInHeader: true, showInFooter: true },
      { label: "Hire Graduates", href: "/employers/hire-graduates", showInHeader: true, showInFooter: true },
      { label: "Post a Job", href: "/employers/post-job", showInHeader: true, showInFooter: true },
      { label: "Partnerships", href: "/partners", showInHeader: true, showInFooter: true },
      { label: "Employer Dashboard", href: "/employers/dashboard" },
      { label: "Placements", href: "/employers/placements" },
      { label: "OJT & Funding", href: "/employers/ojt" },
    ],
  },
  {
    key: "programHolders",
    title: "Program Holders",
    pages: [
      { label: "Program Holders Home", href: "/program-holders" },
      { label: "Portal", href: "/program-holders/portal" },
      { label: "Universal MOU", href: "/program-holders/universal-mou" },
      { label: "Sign MOU", href: "/program-holders/sign-mou" },
      { label: "Become a Program Holder", href: "/program-holders/apply" },
      { label: "Onboarding", href: "/program-holders/onboarding" },
      { label: "Training Providers", href: "/program-holders/training-providers" },
    ],
  },
  {
    key: "careerServices",
    title: "Career Services",
    pages: [
      { label: "Career Services", href: "/career-services" },
      { label: "Job Board", href: "/career-center/jobs", showInFooter: true },
      { label: "Resume Builder", href: "/career-services/resume-builder", showInFooter: true },
      { label: "Interview Prep", href: "/career-services/interview-prep", showInFooter: true },
      { label: "Career Fair", href: "/career-services/career-fair" },
    ],
  },
  {
    key: "adminStaff",
    title: "Admin & Staff",
    pages: [
      { label: "Admin Dashboard", href: "/admin/dashboard", showInHeader: true, showInFooter: true },
      { label: "Reports", href: "/reports", showInHeader: true, showInFooter: true },
      { label: "Case Management", href: "/case-management", showInHeader: true, showInFooter: true },
      { label: "Documents", href: "/documents", showInHeader: true, showInFooter: true },
      { label: "Admin Portal", href: "/admin" },
      { label: "Staff Portal", href: "/staff/portal" },
      { label: "Certificate Management", href: "/admin/certificates" },
      { label: "Program Holder Management", href: "/admin/program-holders" },
    ],
  },
  {
    key: "community",
    title: "Community",
    pages: [
      { label: "Community Hub", href: "/community", showInFooter: true },
      { label: "Resources", href: "/community/resources" },
      { label: "Webinars", href: "/community/webinars", showInFooter: true },
      { label: "Alumni Network", href: "/community/alumni", showInFooter: true },
      { label: "Workforce Partners", href: "/community/workforce-partners" },
      { label: "API Documentation", href: "/community/api-docs" },
    ],
  },
  {
    key: "legal",
    title: "Legal & Policies",
    pages: [
      { label: "Privacy Policy", href: "/legal/privacy", showInFooter: true },
      { label: "Terms of Service", href: "/legal/terms", showInFooter: true },
      { label: "Refund Policy", href: "/legal/refund-policy", showInFooter: true },
      { label: "Accessibility", href: "/legal/accessibility", showInFooter: true },
    ],
  },
  {
    key: "hrPayroll",
    title: "HR & Payroll",
    pages: [
      { label: "HR Dashboard", href: "/hr/dashboard" },
      { label: "Admin Payroll", href: "/hr/admin-payroll" },
      { label: "Employee Payroll", href: "/hr/employee-payroll" },
      { label: "Employees", href: "/hr/employees" },
      { label: "Time Tracking", href: "/hr/time-tracking" },
      { label: "Leave Management", href: "/hr/leave" },
      { label: "Employee Documents", href: "/hr/employee-documents" },
      { label: "Time Off Requests", href: "/hr/time-off-requests" },
    ],
  },
  {
    key: "caseManagement",
    title: "Case Management",
    pages: [
      { label: "Case Management", href: "/case-management" },
      { label: "CM Documentation", href: "/case-management/docs" },
      { label: "Delegate Dashboard", href: "/delegate/dashboard" },
      { label: "Delegate Students", href: "/delegate/students" },
      { label: "Delegate Reports", href: "/delegate/reports" },
      { label: "Delegate Messages", href: "/delegate/messages" },
    ],
  },
  {
    key: "boards",
    title: "Boards",
    pages: [
      { label: "Board Dashboard", href: "/boards/dashboard" },
      { label: "Board Referrals", href: "/boards/referrals" },
      { label: "Workforce Board", href: "/boards/workforce" },
      { label: "Workforce Boards Platform", href: "/boards/platform" },
    ],
  },
  {
    key: "specialPrograms",
    title: "Special Programs",
    pages: [
      { label: "Kingdom Konnect", href: "/programs/kingdom-konnect" },
      { label: "VITA Tax Program", href: "/programs/vita-tax" },
      { label: "Serene Comfort Care", href: "/programs/serene-comfort-care" },
      { label: "Urban Build Crew", href: "/programs/urban-build-crew" },
      { label: "Selfish Inc", href: "/programs/selfish-inc" },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    pages: [
      { label: "File Manager", href: "/tools/files" },
      { label: "Sheets", href: "/tools/sheets" },
      { label: "Slides", href: "/tools/slides" },
      { label: "Video", href: "/tools/video" },
      { label: "Videos", href: "/tools/videos" },
      { label: "Chat", href: "/tools/chat" },
      { label: "Messages", href: "/tools/messages" },
      { label: "Calendar", href: "/tools/calendar" },
      { label: "Search", href: "/tools/search" },
      { label: "Directory", href: "/tools/directory" },
    ],
  },
  {
    key: "builders",
    title: "Builders",
    pages: [
      { label: "Course Builder", href: "/builders/course-builder" },
      { label: "AI Course Builder", href: "/builders/ai-course-builder" },
      { label: "Course Builder (Public)", href: "/builders/course-builder-public" },
      { label: "Quiz Builder", href: "/builders/quiz-builder" },
      { label: "Syllabus Generator", href: "/builders/syllabus-generator" },
      { label: "Program Generator", href: "/builders/program-generator" },
      { label: "Video Upload", href: "/builders/video-upload" },
      { label: "Curriculum Upload", href: "/builders/curriculum-upload" },
    ],
  },
  {
    key: "documents",
    title: "Documents",
    pages: [
      { label: "Document Center", href: "/documents" },
      { label: "Upload Documents", href: "/documents/upload" },
      { label: "NotebookLM", href: "/documents/notebooklm" },
      { label: "Internal Docs", href: "/documents/internal" },
    ],
  },
  {
    key: "instructor",
    title: "Instructor",
    pages: [
      { label: "Instructor Dashboard", href: "/instructor/dashboard" },
      { label: "Instructor Analytics", href: "/instructor/analytics" },
      { label: "Educator Hub", href: "/instructor/hub" },
      { label: "Receptionist", href: "/instructor/receptionist" },
    ],
  },
  {
    key: "reports",
    title: "Reports",
    pages: [
      { label: "Reports", href: "/reports" },
      { label: "Admin Reports", href: "/reports/admin" },
      { label: "Caseload Reports", href: "/reports/caseload" },
      { label: "Charts", href: "/reports/charts" },
      { label: "Analytics", href: "/reports/analytics" },
      { label: "Analytics Dashboard", href: "/reports/analytics-dashboard" },
      { label: "Workforce Analytics", href: "/reports/workforce" },
    ],
  },
];
