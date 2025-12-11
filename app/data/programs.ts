/**
 * Centralized Program Data
 * Single source of truth for all program content, descriptions, and CTAs
 */

export type Program = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  heroImageAlt: string;
  duration: string;
  schedule: string;
  delivery: string;
  credential: string;
  approvals: string[];
  fundingOptions: string[];
  highlights: string[];
  whatYouLearn: string[];
  outcomes: string[];
  requirements: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export const programs: Program[] = [
  {
    slug: "hvac-technician",
    name: "HVAC Technician",
    heroTitle: "HVAC Technician Career Training",
    heroSubtitle:
      "A hands-on HVAC training program that prepares you for real work in residential and light commercial heating, cooling, and refrigeration.",
    shortDescription:
      "A hands-on HVAC training program that prepares you for real work in residential and light commercial heating, cooling, and refrigeration.",
    longDescription: `The HVAC Technician program is designed for individuals who enjoy working with their hands, solving problems, and building technical skill. This program teaches students how to diagnose, repair, and maintain HVAC systems while understanding safety, electrical fundamentals, and customer service. You will complete online theory and hands-on lab practice, giving you the confidence to enter the field ready to work. This pathway leads to in-demand roles, with strong long-term career growth.

What You'll Learn:
- HVAC system components and operation
- Electrical testing and troubleshooting
- Refrigeration cycle fundamentals
- Equipment installation and repair
- Preventative maintenance practices
- Safety, EPA preparation, and customer communication

Who This Program Is For:
- Career changers seeking a skilled trade
- Individuals who enjoy technical, hands-on work
- Adults needing a stable, high-demand job path
- Students preparing for apprenticeships or OJT

Program Format:
- Hybrid: Online coursework + hands-on labs
- Length: 16–24 weeks
- Schedule: Day, evening, or weekend options

Funding & Approvals:
- Workforce funding may be available (location dependent)
- Employer OJT/sponsorship options may apply

Career Outcomes:
- HVAC Technician (entry-level)
- Maintenance Technician
- Building Operations Support`,
    heroImage: "/images/programs/hvac-hero.jpg",
    heroImageAlt: "HVAC student working on an air conditioning unit",
    duration: "16–24 weeks",
    schedule: "Day, evening, or weekend options",
    delivery: "Hybrid: Online coursework + hands-on labs",
    credential: "Industry-recognized HVAC Technician certificate; EPA 608 prep included",
    approvals: [
      "Workforce funding may be available (location dependent)",
      "Employer OJT/sponsorship options may apply",
    ],
    fundingOptions: [
      "Workforce funding may be available (location dependent)",
      "Employer OJT/sponsorship options may apply",
    ],
    highlights: [
      "Hands-on labs with real HVAC equipment",
      "Preparation for EPA 608 certification exam",
      "Career coaching and job search support",
      "Pathways to apprenticeship and on-the-job training",
    ],
    whatYouLearn: [
      "HVAC system components and operation",
      "Electrical testing and troubleshooting",
      "Refrigeration cycle fundamentals",
      "Equipment installation and repair",
      "Preventative maintenance practices",
      "Safety, EPA preparation, and customer communication",
    ],
    outcomes: [
      "HVAC Technician (entry-level)",
      "Maintenance Technician",
      "Building Operations Support",
    ],
    requirements: [
      "Career changers seeking a skilled trade",
      "Individuals who enjoy technical, hands-on work",
      "Adults needing a stable, high-demand job path",
      "Students preparing for apprenticeships or OJT",
    ],
    ctaPrimary: {
      label: "Start HVAC Application",
      href: "/apply?program=hvac-technician",
    },
    ctaSecondary: {
      label: "Talk to a Career Coach",
      href: "/contact?topic=hvac-technician",
    },
  },
  {
    slug: "barber-apprenticeship",
    name: "Barber Apprenticeship",
    heroTitle: "Barber Apprenticeship (DOL Registered Apprenticeship)",
    heroSubtitle:
      "Earn while you learn through a licensed barber apprenticeship that provides real shop experience and prepares you for state licensure.",
    shortDescription:
      "Earn while you learn through a licensed barber apprenticeship that provides real shop experience and prepares you for state licensure.",
    longDescription: `The Barber Apprenticeship program is a DOL Registered Apprenticeship that allows you to train directly inside a licensed barbershop while completing your related instruction. Students develop cutting, styling, shaving, sanitation, and customer service skills while building real client experience. This pathway is ideal for anyone who wants to build a long-term career in barbering without traditional school tuition costs.

What You'll Learn:
- Cutting, shaping, grooming, shaving
- Client consultation and professionalism
- Infection control, sanitation, and shop safety
- Business basics and customer service
- Milady RISE: Domestic Violence, Human Trafficking, Infection Control

Who This Program Is For:
- Individuals who enjoy working with people
- Students wanting to earn while they learn
- Entrepreneurs who want a licensed barbering career
- Youth or adults seeking a hands-on trade

Program Format:
- On-the-job training + related instruction
- Length: 9–18 months (hour-based)
- Schedule: Flexible, based on barbershop placement

Funding & Approvals:
- Registered Apprenticeship (RAPIDS)
- Potential workforce funding where approved
- Employer sponsorship options may be available

Career Outcomes:
- Licensed Barber
- Barbershop Manager
- Future Barber Shop Owner / Educator`,
    heroImage: "/images/programs/barber-hero.jpg",
    heroImageAlt: "Barber apprentice cutting a client's hair in a modern shop",
    duration: "9–18 months (hour-based)",
    schedule: "Flexible, based on barbershop placement",
    delivery: "On-the-job training + related instruction",
    credential: "Barber license eligibility upon completing state requirements",
    approvals: [
      "Registered Apprenticeship (RAPIDS)",
      "Potential workforce funding where approved",
      "Employer sponsorship options may be available",
    ],
    fundingOptions: [
      "Registered Apprenticeship (RAPIDS)",
      "Potential workforce funding where approved",
      "Employer sponsorship options may be available",
    ],
    highlights: [
      "Real clients in a real shop environment",
      "Earn income while you train",
      "Business, customer service, and infection control training",
      "Milady RISE: Domestic Violence, Human Trafficking, Infection Control",
      "Career pathways into shop ownership and leadership",
    ],
    whatYouLearn: [
      "Cutting, shaping, grooming, shaving",
      "Client consultation and professionalism",
      "Infection control, sanitation, and shop safety",
      "Business basics and customer service",
      "Milady RISE: Domestic Violence, Human Trafficking, Infection Control",
    ],
    outcomes: [
      "Licensed Barber",
      "Barbershop Manager",
      "Future Barber Shop Owner / Educator",
    ],
    requirements: [
      "Individuals who enjoy working with people",
      "Students wanting to earn while they learn",
      "Entrepreneurs who want a licensed barbering career",
      "Youth or adults seeking a hands-on trade",
    ],
    ctaPrimary: {
      label: "Contact Us",
      href: "/contact",
    },
    ctaSecondary: {
      label: "Pay Now",
      href: "/enroll",
    },
  },
  {
    slug: "cna",
    name: "Certified Nursing Assistant (CNA)",
    heroTitle: "CNA — Certified Nursing Assistant",
    heroSubtitle:
      "Fast-track CNA training that prepares you for entry-level roles in long-term care, hospitals, and home health.",
    shortDescription:
      "Fast-track CNA training that prepares you for entry-level roles in long-term care, hospitals, and home health.",
    longDescription: `The CNA program provides foundational patient care training through structured instruction and supported clinical experiences. Students learn essential caregiving skills, communication, infection prevention, and daily living support. This program is ideal whether you are starting a healthcare career, returning to the workforce, or preparing for advanced roles such as QMA, LPN, or RN.

What You'll Learn:
- Vital signs and patient monitoring
- Infection prevention and safety
- Activities of daily living (ADLs)
- Mobility, transfers, and comfort care
- Professional communication and ethics

Who This Program Is For:
- Individuals who enjoy helping others
- Students exploring healthcare careers
- Adults needing stable, in-demand work
- Anyone preparing for nursing pathways

Program Format:
- Classroom + clinicals
- Length: 4–8 weeks
- Schedule: Day, evening, or weekend options

Funding & Approvals:
- Partner-delivered through an approved CNA training provider
- Workforce funding may be available

Career Outcomes:
- Certified Nursing Assistant
- Patient Care Technician (with additional training)
- Home Health Aide`,
    heroImage: "/images/programs/cna-hero.jpg",
    heroImageAlt: "CNA student practicing caregiving skills with an instructor",
    duration: "4–8 weeks",
    schedule: "Day, evening, or weekend options",
    delivery: "Classroom + clinicals",
    credential: "CNA certification eligibility (state-approved program partner)",
    approvals: [
      "Partner-delivered through an approved CNA training provider",
      "Workforce funding may be available",
    ],
    fundingOptions: [
      "Partner-delivered through an approved CNA training provider",
      "Workforce funding may be available",
    ],
    highlights: [
      "Small class sizes and supportive instructors",
      "Hands-on skills practice before clinicals",
      "Job placement support with local healthcare partners",
      "Stepping stone to QMA, LPN, and RN pathways",
    ],
    whatYouLearn: [
      "Vital signs and patient monitoring",
      "Infection prevention and safety",
      "Activities of daily living (ADLs)",
      "Mobility, transfers, and comfort care",
      "Professional communication and ethics",
    ],
    outcomes: [
      "Certified Nursing Assistant",
      "Patient Care Technician (with additional training)",
      "Home Health Aide",
    ],
    requirements: [
      "Individuals who enjoy helping others",
      "Students exploring healthcare careers",
      "Adults needing stable, in-demand work",
      "Anyone preparing for nursing pathways",
    ],
    ctaPrimary: {
      label: "Start CNA Application",
      href: "/apply?program=cna",
    },
    ctaSecondary: {
      label: "Talk to Healthcare Career Coach",
      href: "/contact?topic=cna",
    },
  },
  {
    slug: "cdl",
    name: "Commercial Driver's License (CDL)",
    heroTitle: "CDL — Commercial Driver Training",
    heroSubtitle:
      "Professional CDL training that prepares you for Class A or Class B licensing and entry-level commercial driving careers.",
    shortDescription:
      "Professional CDL training that prepares you for Class A or Class B licensing and entry-level commercial driving careers.",
    longDescription: `The CDL program builds the knowledge and skills required to safely operate commercial vehicles. Students receive classroom instruction along with hands-on yard and road training. This pathway is ideal for adults seeking stable income, benefits, and long-term growth in logistics and transportation.

What You'll Learn:
- Vehicle inspection and safety
- Backing, shifting, turning, and road maneuvers
- Trip planning and hours-of-service rules
- Transportation regulations
- Professional communication and job readiness

Who This Program Is For:
- Adults seeking high-earning roles
- Individuals interested in transportation careers
- Career changers needing a stable job pathway
- Students who want a quick employment route

Program Format:
- Classroom, yard practice, and road training
- Length: Varies by partner
- Schedule: Day/evening options

Funding & Approvals:
- Workforce funding options may be available
- Employer reimbursement programs may apply

Career Outcomes:
- CDL Class A or B Driver
- Local, regional, or dedicated routes
- Logistics and transportation support roles`,
    heroImage: "/images/programs/cdl-hero.jpg",
    heroImageAlt: "CDL student practicing with a commercial truck",
    duration: "Varies by partner",
    schedule: "Day/evening options",
    delivery: "Classroom, yard practice, and road training",
    credential: "CDL Class A license eligibility upon completion",
    approvals: [
      "Workforce funding options may be available",
      "Employer reimbursement programs may apply",
    ],
    fundingOptions: [
      "Workforce funding options may be available",
      "Employer reimbursement programs may apply",
    ],
    highlights: [
      "Behind-the-wheel training with experienced instructors",
      "Preparation for CDL written and skills tests",
      "Job placement assistance with local carriers",
      "Pathways to regional and long-haul opportunities",
    ],
    whatYouLearn: [
      "Vehicle inspection and safety",
      "Backing, shifting, turning, and road maneuvers",
      "Trip planning and hours-of-service rules",
      "Transportation regulations",
      "Professional communication and job readiness",
    ],
    outcomes: [
      "CDL Class A or B Driver",
      "Local, regional, or dedicated routes",
      "Logistics and transportation support roles",
    ],
    requirements: [
      "Adults seeking high-earning roles",
      "Individuals interested in transportation careers",
      "Career changers needing a stable job pathway",
      "Students who want a quick employment route",
    ],
    ctaPrimary: {
      label: "Apply for CDL Training",
      href: "/apply?program=cdl",
    },
    ctaSecondary: {
      label: "Request CDL Info Session",
      href: "/contact?topic=cdl",
    },
  },
  {
    slug: "building-maintenance",
    name: "Building Maintenance Technician",
    heroTitle: "Building Maintenance Technician",
    heroSubtitle:
      "Hands-on training for individuals seeking roles in building repair, maintenance, and facility operations.",
    shortDescription:
      "Hands-on training for individuals seeking roles in building repair, maintenance, and facility operations.",
    longDescription: `The Building Maintenance Technician program prepares students for practical, real-world maintenance work across residential and commercial facilities. Students learn core repair skills, safety standards, and the fundamentals of electrical, plumbing, HVAC support, carpentry, and customer service. This is a strong entry-level pathway into the skilled trades.

What You'll Learn:
- Basic electrical troubleshooting
- Plumbing repair and safety
- HVAC support skills
- Carpentry and preventative maintenance
- Work order systems and customer communication

Who This Program Is For:
- Individuals who enjoy hands-on, tool-based work
- Career changers entering the skilled trades
- Adults seeking facility or apartment maintenance roles

Program Format:
- Hybrid or in-person
- Length: 8–20 weeks
- Schedule: Day or evening options

Funding & Approvals:
- Workforce funding may be available

Career Outcomes:
- Building Maintenance Technician
- Apartment Maintenance
- Facilities Support Roles`,
    heroImage: "/images/programs/building-maintenance-hero.jpg",
    heroImageAlt: "Building maintenance technician working on facility systems",
    duration: "8–20 weeks",
    schedule: "Day or evening options",
    delivery: "Hybrid or in-person",
    credential: "Building Maintenance Technician certificate",
    approvals: [
      "Workforce funding may be available",
    ],
    fundingOptions: [
      "Workforce funding may be available",
    ],
    highlights: [
      "Multi-trade skills in one program",
      "Hands-on training with real equipment",
      "Career coaching and job placement support",
      "Pathways to facilities management and specialized trades",
    ],
    whatYouLearn: [
      "Basic electrical troubleshooting",
      "Plumbing repair and safety",
      "HVAC support skills",
      "Carpentry and preventative maintenance",
      "Work order systems and customer communication",
    ],
    outcomes: [
      "Building Maintenance Technician",
      "Apartment Maintenance",
      "Facilities Support Roles",
    ],
    requirements: [
      "Individuals who enjoy hands-on, tool-based work",
      "Career changers entering the skilled trades",
      "Adults seeking facility or apartment maintenance roles",
    ],
    ctaPrimary: {
      label: "Apply for Building Maintenance",
      href: "/apply?program=building-maintenance",
    },
    ctaSecondary: {
      label: "Talk to a Career Coach",
      href: "/contact?topic=building-maintenance",
    },
  },
  {
    slug: "building-technician",
    name: "Building Technician — Advanced Pathway",
    heroTitle: "Building Technician — Advanced Pathway",
    heroSubtitle:
      "An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.",
    shortDescription:
      "An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.",
    longDescription: `The Building Technician program expands on core maintenance skills by introducing advanced diagnostics, building system operations, compliance, and preventative strategies. Ideal for individuals pursuing higher-skill roles or preparing for facility engineering pathways.

What You'll Learn:
- Advanced systems troubleshooting
- Electrical and mechanical safety
- Building automation basics
- Documentation and compliance
- Preventative maintenance strategies

Who This Program Is For:
- Students who completed Building Maintenance
- Individuals wanting higher-skill trade roles
- Adults preparing for facility engineering

Program Format:
- Hybrid
- Length: 12–20 weeks

Funding & Approvals:
- Workforce funding may be available

Career Outcomes:
- Building Technician
- Facilities Operations Specialist
- Entry-Level Building Engineer`,
    heroImage: "/images/programs/building-technician-hero.jpg",
    heroImageAlt: "Building technician working on advanced facility systems",
    duration: "12–20 weeks",
    schedule: "Day or evening options",
    delivery: "Hybrid",
    credential: "Building Technician certificate",
    approvals: [
      "Workforce funding may be available",
    ],
    fundingOptions: [
      "Workforce funding may be available",
    ],
    highlights: [
      "Advanced systems troubleshooting",
      "Building automation basics",
      "Documentation and compliance training",
      "Pathways to facility engineering",
    ],
    whatYouLearn: [
      "Advanced systems troubleshooting",
      "Electrical and mechanical safety",
      "Building automation basics",
      "Documentation and compliance",
      "Preventative maintenance strategies",
    ],
    outcomes: [
      "Building Technician",
      "Facilities Operations Specialist",
      "Entry-Level Building Engineer",
    ],
    requirements: [
      "Students who completed Building Maintenance",
      "Individuals wanting higher-skill trade roles",
      "Adults preparing for facility engineering",
    ],
    ctaPrimary: {
      label: "Apply for Building Technician",
      href: "/apply?program=building-technician",
    },
    ctaSecondary: {
      label: "Talk to a Career Coach",
      href: "/contact?topic=building-technician",
    },
  },
  {
    slug: "workforce-readiness",
    name: "Workforce Readiness (Youth & Adult)",
    heroTitle: "Workforce Readiness (Youth & Adult)",
    heroSubtitle:
      "A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.",
    shortDescription:
      "A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.",
    longDescription: `The Workforce Readiness program prepares youth and adults with the communication, professionalism, and foundational skills needed for employment. Students learn how to communicate with employers, build resumes, interview confidently, and understand workplace expectations. This program supports success across all career and training pathways.

What You'll Learn:
- Professional communication
- Resume and interview preparation
- Workplace expectations and employer needs
- Customer service and teamwork
- Career and job search strategies

Who This Program Is For:
- Youth ages 16–24
- Adults re-entering the workforce
- Individuals preparing for training or employment
- Students building confidence and communication

Program Format:
- Classroom or hybrid
- Length: 1–4 weeks

Career Outcomes:
- Job-ready graduate prepared for employment
- Stronger candidate for workforce training programs`,
    heroImage: "/images/programs/workforce-readiness-hero.jpg",
    heroImageAlt: "Workforce readiness training session",
    duration: "1–4 weeks",
    schedule: "Flexible",
    delivery: "Classroom or hybrid",
    credential: "Workforce Readiness certificate",
    approvals: [
      "Available for youth and adult participants",
    ],
    fundingOptions: [
      "Workforce funding may be available",
    ],
    highlights: [
      "Professional communication skills",
      "Resume and interview preparation",
      "Workplace expectations training",
      "Career and job search strategies",
    ],
    whatYouLearn: [
      "Professional communication",
      "Resume and interview preparation",
      "Workplace expectations and employer needs",
      "Customer service and teamwork",
      "Career and job search strategies",
    ],
    outcomes: [
      "Job-ready graduate prepared for employment",
      "Stronger candidate for workforce training programs",
    ],
    requirements: [
      "Youth ages 16–24",
      "Adults re-entering the workforce",
      "Individuals preparing for training or employment",
      "Students building confidence and communication",
    ],
    ctaPrimary: {
      label: "Apply for Workforce Readiness",
      href: "/apply?program=workforce-readiness",
    },
    ctaSecondary: {
      label: "Talk to a Career Coach",
      href: "/contact?topic=workforce-readiness",
    },
  },
];

/**
 * Get program by slug
 */
export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

/**
 * Get all programs
 */
export function getAllPrograms(): Program[] {
  return programs;
}

/**
 * Get programs by category (for filtering)
 */
export function getProgramsByCategory(category: string): Program[] {
  // Add category field to Program type if needed for filtering
  return programs;
}
