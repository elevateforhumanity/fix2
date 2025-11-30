"use client";
import Link from "next/link";

export type AutoPolishedPageProps = { route: string; label: string; section: string; };

type AutoConfig = {
  badge?: string;
  categoryLabel: string;
  audience: string;
  shortTagline: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  bullets: string[];
};

function normalizeSection(section: string): string {
  const s = section.toLowerCase();
  if (s.includes("program")) return "programs";
  if (s.includes("funding")) return "funding";
  if (s.includes("student")) return "students";
  if (s.includes("lms") || s.includes("course")) return "lms";
  if (s.includes("credential")) return "credentials";
  if (s.includes("employer")) return "employers";
  if (s.includes("holder")) return "program-holders";
  if (s.includes("career")) return "career-services";
  if (s.includes("admin") || s.includes("staff")) return "admin-staff";
  if (s.includes("community")) return "community";
  if (s.includes("legal") || s.includes("policy")) return "legal";
  if (s.includes("hr") || s.includes("payroll")) return "hr-payroll";
  if (s.includes("case")) return "case-management";
  if (s.includes("board")) return "boards";
  if (s.includes("special")) return "special-programs";
  if (s.includes("tool")) return "tools";
  if (s.includes("builder")) return "builders";
  if (s.includes("document")) return "documents";
  if (s.includes("instructor")) return "instructor";
  if (s.includes("report") || s.includes("analytic")) return "reports";
  if (s.includes("main")) return "main-pages";
  return "other";
}

function getAutoConfig(section: string, label: string, route: string): AutoConfig {
  const cat = normalizeSection(section);
  const baseLabel = label || route.replace(/\//g, " ").trim() || "Page";

  let cfg: AutoConfig = {
    categoryLabel: "Platform",
    audience: "Students, employers, and partners",
    shortTagline: "Part of the Elevate For Humanity workforce ecosystem.",
    description:
      "This page is part of the Elevate For Humanity platform, designed to connect real people to real opportunities with full support from our staff, partners, and technology.",
    primaryCta: { href: "/apply", label: "Apply Now" },
    secondaryCta: { href: "/contact", label: "Talk to our team" },
    bullets: [
      "Integrated with our workforce development and case management ecosystem",
      "Built to support WIOA, WRG, JRI, and apprenticeship-aligned pathways",
      "Connected to dashboards, reports, and tools that help you stay on track",
    ],
  };

  switch (cat) {
    case "programs":
      cfg = {
        categoryLabel: "Program Page",
        audience: "Students & job seekers",
        shortTagline: "Career training that leads to real jobs, not just certificates.",
        description: `The "${baseLabel}" page is part of our training menu. Programs are designed with workforce boards and employers so students can move from the classroom into real work with support along the way.`,
        primaryCta: { href: "/apply", label: "Apply for this program" },
        secondaryCta: { href: "/funding", label: "See how funding works" },
        bullets: [
          "Aligned with in-demand careers in Central Indiana and beyond",
          "Designed to work with WIOA, Workforce Ready Grant, and employer funding",
          "Includes built-in support from career coaches and case managers",
        ],
      };
      break;
    case "funding":
      cfg = {
        categoryLabel: "Funding & Scholarships",
        audience: "Prospective students & case managers",
        shortTagline: "No out-of-pocket tuition for most eligible students.",
        description: `The "${baseLabel}" page explains one of the funding paths that can cover tuition and training costs at Elevate For Humanity. Our team partners with workforce boards and employers to make sure money is not the barrier.`,
        primaryCta: { href: "/funding", label: "View all funding options" },
        secondaryCta: { href: "/apply", label: "Start funding screening" },
        bullets: [
          "Connects WIOA, WRG, JRI, and other programs to real training seats",
          "Helps you understand what is covered, what isn't, and how to qualify",
          "Keeps workforce boards and training providers on the same page",
        ],
      };
      break;
    case "students":
      cfg = {
        categoryLabel: "Student Experience",
        audience: "Current & future students",
        shortTagline: "See where you are, what's next, and who's in your corner.",
        description: `The "${baseLabel}" page supports the student side of the platform. It puts courses, messages, documents, and support in one place so you're never lost.`,
        primaryCta: { href: "/student/portal", label: "Go to Student Portal" },
        secondaryCta: { href: "/career-services", label: "Visit Career Services" },
        bullets: [
          "Quick access to courses, grades, and certificate progress",
          "Built-in messaging with coaches, case managers, and instructors",
          "Clear next steps so you always know what to do after today",
        ],
      };
      break;
    case "lms":
      cfg = {
        categoryLabel: "Learning Management System",
        audience: "Students, instructors, and admins",
        shortTagline: "Course delivery that fits real adult learners.",
        description: `The "${baseLabel}" page is part of our LMS. It connects video, assignments, quizzes, and progress tracking with the case management and funding pieces behind the scenes.`,
        primaryCta: { href: "/courses/catalog", label: "Browse course catalog" },
        secondaryCta: { href: "/lms/dashboard", label: "Go to LMS Dashboard" },
        bullets: [
          "Modern course player with video, downloads, and transcripts",
          "Progress tracking you can share with employers and workforce boards",
          "Integrated with reports so leadership can see what's working",
        ],
      };
      break;
    case "credentials":
      cfg = {
        categoryLabel: "Credentials & Verification",
        audience: "Employers, boards, and graduates",
        shortTagline: "Proof of learning that means something in the real world.",
        description: `The "${baseLabel}" page focuses on credentials, verification, or certification tracking so employers and workforce partners can trust the outcomes from Elevate programs.`,
        primaryCta: { href: "/credentials/verify", label: "Verify a credential" },
        secondaryCta: { href: "/credentials", label: "View all credentials" },
        bullets: [
          "Connects training outcomes to real job requirements",
          "Lets employers confirm skills quickly and securely",
          "Supports stacking credentials over time as students level up",
        ],
      };
      break;
    case "employers":
      cfg = {
        categoryLabel: "Employer & Talent Partners",
        audience: "Employers, HR leaders, talent partners",
        shortTagline: "Hire job-ready talent with wraparound support.",
        description: `The "${baseLabel}" page supports employers using Elevate to find, train, and retain talent. Job postings, pipelines, and support services in one place.`,
        primaryCta: { href: "/employers/hire-graduates", label: "Hire graduates" },
        secondaryCta: { href: "/employers", label: "Employer overview" },
        bullets: [
          "Reduce time-to-hire with pre-screened candidates",
          "Align job descriptions with training & credential pathways",
          "Use data and reports to see partnership impact",
        ],
      };
      break;
    case "program-holders":
      cfg = {
        categoryLabel: "Program Holders & Training Providers",
        audience: "Schools, training providers, host sites",
        shortTagline: "Bring your program into a larger ecosystem without losing your identity.",
        description: `The "${baseLabel}" page is for program holders hosting training, apprenticeships, or specialized pathways on Elevate.`,
        primaryCta: { href: "/program-holders/apply", label: "Become a Program Holder" },
        secondaryCta: { href: "/program-holders/universal-mou", label: "View Universal MOU" },
        bullets: [
          "Digital MOUs, onboarding, and reporting in one place",
          "Shared LMS, compliance, and data tools across programs",
          "Support to align with workforce boards & apprenticeship standards",
        ],
      };
      break;
    case "career-services":
      cfg = {
        categoryLabel: "Career Services",
        audience: "Students & alumni",
        shortTagline: "We don't just train you and disappear. We help you land and grow.",
        description: `The "${baseLabel}" page is part of the Career Center—turning training into employment and advancement with real human support.`,
        primaryCta: { href: "/career-center/jobs", label: "Browse job board" },
        secondaryCta: { href: "/career-services", label: "Career services overview" },
        bullets: [
          "Resume, interview prep, and job search tools",
          "Direct links to employers who know our training",
          "Ongoing support as you level up over time",
        ],
      };
      break;
    case "admin-staff":
      cfg = {
        categoryLabel: "Admin & Staff Tools",
        audience: "Internal staff & leadership",
        shortTagline: "The back-office engine that keeps everything moving.",
        description: `The "${baseLabel}" page supports intake, enrollment, approvals, certificates, and more.`,
        primaryCta: { href: "/admin/dashboard", label: "Open admin dashboard" },
        secondaryCta: { href: "/reports", label: "View key reports" },
        bullets: [
          "Consolidates tasks so staff aren't chasing 10 systems",
          "Captures data needed for audits, renewals, and board reports",
          "Aligned with WIOA, WRG, and partner requirements",
        ],
      };
      break;
    case "community":
      cfg = {
        categoryLabel: "Community & Partnerships",
        audience: "Students, alumni, partners, supporters",
        shortTagline: "A community of people who don't want anyone left behind.",
        description: `The "${baseLabel}" page hosts resources, events, and ways to plug in across the EFH community.`,
        primaryCta: { href: "/community", label: "Visit Community Hub" },
        secondaryCta: { href: "/partners", label: "Explore partnership options" },
        bullets: [
          "Events, webinars, and stories that keep momentum going",
          "Space for alumni and partners to reconnect",
          "On-ramps for donors and sponsors to invest in people",
        ],
      };
      break;
    case "legal":
      cfg = {
        categoryLabel: "Legal & Policies",
        audience: "Students, staff, partners, boards",
        shortTagline: "Clear policies that respect people and protect the mission.",
        description: `The "${baseLabel}" page documents legal terms, privacy, refunds, or accessibility for Elevate For Humanity.`,
        primaryCta: { href: "/legal/privacy", label: "Read privacy policy" },
        secondaryCta: { href: "/legal/accessibility", label: "View accessibility statement" },
        bullets: [
          "Plain-language policies",
          "Builds partner & board confidence in compliance",
          "Helps students understand rights & responsibilities",
        ],
      };
      break;
    case "hr-payroll":
      cfg = {
        categoryLabel: "HR & Payroll",
        audience: "Internal staff & leadership",
        shortTagline: "People-first HR and payroll tools for a growing ecosystem.",
        description: `The "${baseLabel}" page helps manage HR, payroll, time tracking, and employee records.`,
        primaryCta: { href: "/hr/dashboard", label: "Open HR dashboard" },
        secondaryCta: { href: "/hr/employees", label: "View employee records" },
        bullets: [
          "HR tasks & payroll details in one place",
          "Transparency & accuracy for staff and contractors",
          "Connects grants, roles, and timekeeping",
        ],
      };
      break;
    case "case-management":
      cfg = {
        categoryLabel: "Case Management",
        audience: "Case managers, delegates, support staff",
        shortTagline: "No more sticky notes and scattered spreadsheets.",
        description: `The "${baseLabel}" page tracks students, notes, barriers, and wins in one system.`,
        primaryCta: { href: "/case-management", label: "Open case management" },
        secondaryCta: { href: "/delegate/dashboard", label: "Go to delegate dashboard" },
        bullets: [
          "Track caseloads, touchpoints, and outcomes",
          "Share information securely with the right people",
          "Built for funder & board reporting needs",
        ],
      };
      break;
    case "boards":
      cfg = {
        categoryLabel: "Workforce Boards & Oversight",
        audience: "Workforce boards, governance, oversight",
        shortTagline: "Give boards a clean, honest view of what's working.",
        description: `The "${baseLabel}" page shows programs, outcomes, and tools behind EFH.`,
        primaryCta: { href: "/boards/dashboard", label: "Board dashboard" },
        secondaryCta: { href: "/reports/workforce", label: "Workforce analytics" },
        bullets: [
          "Transparent enrollments, completions, placements",
          "Clear links between funding streams and outcomes",
          "Dashboards designed with oversight in mind",
        ],
      };
      break;
    case "special-programs":
      cfg = {
        categoryLabel: "Special Programs",
        audience: "Students, community, partners",
        shortTagline: "Mission-driven projects that meet specific needs.",
        description: `The "${baseLabel}" page highlights a special initiative within EFH.`,
        primaryCta: { href: "/programs", label: "View all programs" },
        secondaryCta: { href: "/community", label: "See community initiatives" },
        bullets: [
          "Pilots and special projects",
          "Deep partnerships with community orgs & employers",
          "Test and scale new ideas responsibly",
        ],
      };
      break;
    case "tools":
      cfg = {
        categoryLabel: "Platform Tools",
        audience: "Students, staff, partners",
        shortTagline: "Tools that make the work lighter and more organized.",
        description: `The "${baseLabel}" page is part of our tools layer—files, video, chat, calendar, directory, and more.`,
        primaryCta: { href: "/tools", label: "View all tools" },
        secondaryCta: { href: "/support", label: "Need help with a tool?" },
        bullets: [
          "Keep communication and content connected",
          "Reduce the need for multiple logins",
          "Support documentation for grants & audits",
        ],
      };
      break;
    case "builders":
      cfg = {
        categoryLabel: "Content & Program Builders",
        audience: "Instructors, admins, program designers",
        shortTagline: "Build once, reuse everywhere across the ecosystem.",
        description: `The "${baseLabel}" page is part of our builder toolkit—courses, quizzes, syllabi, blueprints.`,
        primaryCta: { href: "/builders/course-builder", label: "Open course builder" },
        secondaryCta: { href: "/builders/ai-course-builder", label: "Try AI course builder" },
        bullets: [
          "Create courses & micro-classes that plug into the LMS",
          "Standardize documents and outcomes across programs",
          "Use AI & templates to move faster without losing quality",
        ],
      };
      break;
    case "documents":
      cfg = {
        categoryLabel: "Document Center",
        audience: "Staff, partners, students",
        shortTagline: "One home for the paperwork that used to live everywhere.",
        description: `The "${baseLabel}" page sits inside the EFH document center for MOUs, policies, templates, and learner documents.`,
        primaryCta: { href: "/documents", label: "Open document center" },
        secondaryCta: { href: "/documents/upload", label: "Upload a document" },
        bullets: [
          "Organize MOUs, agreements, and compliance documents",
          "Keep student-facing forms and handouts easy to find",
          "Connect to HR, case management, and program records",
        ],
      };
      break;
    case "instructor":
      cfg = {
        categoryLabel: "Instructor & Educator Tools",
        audience: "Instructors, facilitators, coaches",
        shortTagline: "Give educators the tools they deserve, not just a login.",
        description: `The "${baseLabel}" page supports instructors managing classes, communication, and grading.`,
        primaryCta: { href: "/instructor/dashboard", label: "Open instructor dashboard" },
        secondaryCta: { href: "/instructor/analytics", label: "View teaching analytics" },
        bullets: [
          "Track sections, assignments, and attendance",
          "See which students may need extra support early",
          "Coordinate with admin & case management smoothly",
        ],
      };
      break;
    case "reports":
      cfg = {
        categoryLabel: "Reports & Analytics",
        audience: "Leadership, boards, data teams",
        shortTagline: "Turn activity into insight without drowning in spreadsheets.",
        description: `The "${baseLabel}" page turns program data into dashboards and stories funders understand.`,
        primaryCta: { href: "/reports", label: "Open reports" },
        secondaryCta: { href: "/reports/analytics-dashboard", label: "Analytics dashboard" },
        bullets: [
          "Connect enrollments, completions, and placements in one view",
          "Support grant reporting and board updates with real numbers",
          "Refine which programs to grow, adjust, or sunset",
        ],
      };
      break;
    case "main-pages":
      cfg = {
        categoryLabel: "Main Site Page",
        audience: "Visitors, students, partners",
        shortTagline: "The front door into the Elevate For Humanity ecosystem.",
        description: `The "${baseLabel}" page helps visitors understand who we serve and how to get started.`,
        primaryCta: { href: "/get-started", label: "Get started" },
        secondaryCta: { href: "/apply", label: "Apply now" },
        bullets: [
          "Explains the mission in plain language",
          "Shows core pathways and who funds them",
          "Directs people to apply, refer, or partner quickly",
        ],
      };
      break;
  }
  return cfg;
}

export function AutoPolishedPage({ route, label, section }: AutoPolishedPageProps) {
  const config = getAutoConfig(section, label, route);

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        <span className="uppercase tracking-wide">ORIGINAL-SITE-EFH-ORIGINAL-2024 • OWNER: Elizabeth L. Greene</span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span>{config.categoryLabel}</span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="truncate">{route}</span>
      </div>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start mb-10">
        <div className="space-y-3">
          {config.badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700 border border-orange-100 uppercase tracking-wide">
              {config.badge}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{label}</h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Built for: {config.audience}</p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{config.description}</p>
          <p className="text-xs sm:text-sm text-slate-600">{config.shortTagline}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            {config.primaryCta && (
              <Link href={config.primaryCta.href} className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-700">
                {config.primaryCta.label}
              </Link>
            )}
            {config.secondaryCta && (
              <Link href={config.secondaryCta.href} className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:border-orange-500 hover:text-orange-700">
                {config.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">How this page fits the ecosystem</h2>
          <ul className="space-y-1 text-sm text-slate-700">
            {config.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[3px] text-orange-500">●</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-200 pt-3 text-[11px] text-slate-500">
            Route: <code className="bg-white px-1 py-[1px] rounded border border-slate-200">{route}</code>
          </div>
        </aside>
      </section>
    </main>
  );
}
