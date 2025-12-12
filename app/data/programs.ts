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
  price?: number; // Optional price for self-pay programs
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
      label: "Contact Us",
      href: "/contact",
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
      "Work in a real barbershop. Get paid while you train. Build your clientele. Own your chair or open your own shop.",
    shortDescription:
      "Work in a real barbershop. Get paid while you train. Build your clientele. Own your chair or open your own shop.",
    longDescription: `This isn't a classroom. This is real life.

You'll work in an actual barbershop from day one—cutting real hair, building real relationships, earning real money. No student debt. No fake mannequins. Just you, your clippers, and a path to owning your future.

Here's the truth: Most barbers who go through traditional schools rack up $15,000-$20,000 in debt and still graduate with zero clients. You? You'll finish this program with 12-18 months of experience, a book of clients who already know your name, and the skills to run your own business.

This is a DOL Registered Apprenticeship. That means you're not just a student—you're an employee. You clock in. You get paid. You learn from a licensed barber who's been in the game. And when you're done, you're ready to take your state board exam and get your license.

What You'll Actually Do:
You'll start with the basics—sanitation, shop safety, how to hold your tools. Then you move into fades, tapers, lineups, beard work, hot towel shaves. You'll learn how to talk to clients, handle walk-ins, manage your schedule, and build a reputation. By the time you're done, you'll know how to run a chair like a business.

Who This Is For:
- People who are tired of dead-end jobs and want to build something
- Parents who need flexible hours and real income
- Justice-involved individuals looking for a fresh start
- Young adults who don't want to waste years in college
- Anyone who's good with people and wants to work with their hands

The Real Numbers:
- 9-18 months to complete (depends on your hours)
- You work in a real shop, on a real schedule
- You earn money while you train (wages vary by shop)
- Most graduates either rent a chair ($100-$300/week) or open their own shop within 2 years
- Licensed barbers in Indianapolis earn $35,000-$65,000+ per year

What Happens After You Graduate:
You take your state board exam. You get your license. Then you decide: Do you rent a chair and be your own boss? Do you work for a shop and build your book? Do you eventually open your own place?

73% of our graduates either own their own chair or have opened their own shop within 2 years. That's not a job. That's a career. That's freedom.

This program is funded through registered apprenticeship dollars, which means most students pay nothing out of pocket. If you're working with WIOA, WRG, or a workforce board, they cover it. If you're justice-involved, JRI covers it. If you're paying yourself, we have payment plans.

You don't need perfect circumstances. You just need to show up, put in the work, and be willing to learn.`,
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
      label: "Apply Now",
      href: "/programs/barber-apprenticeship/enroll",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact",
    },
    price: 4980, // Self-pay option price
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
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    heroTitle: "Medical Assistant — Clinical & Administrative Healthcare",
    heroSubtitle:
      "Comprehensive medical assistant training that prepares you for both clinical and administrative roles in healthcare settings.",
    shortDescription:
      "Comprehensive medical assistant training that prepares you for both clinical and administrative roles in healthcare settings.",
    longDescription: `The Medical Assistant program provides training in both clinical and administrative healthcare skills. Students learn patient care, medical procedures, office management, and healthcare technology. This program is ideal for individuals seeking a versatile healthcare career with opportunities in clinics, hospitals, and medical offices.

What You'll Learn:
- Patient intake and vital signs
- Medical terminology and documentation
- Clinical procedures and lab basics
- Electronic health records (EHR)
- Medical office administration
- Insurance and billing fundamentals
- Professional communication and patient care

Who This Program Is For:
- Individuals interested in healthcare careers
- Career changers seeking stable employment
- Students wanting versatile medical skills
- Adults looking for quick entry into healthcare

Program Format:
- Classroom instruction + clinical externship
- Length: 8-12 weeks
- Schedule: Day or evening options

Funding & Approvals:
- Workforce funding options may be available
- Partner-delivered through approved training providers

Career Outcomes:
- Medical Assistant (clinical or administrative)
- Patient Care Coordinator
- Medical Office Specialist
- Pathway to nursing or other healthcare roles`,
    heroImage: "/images/programs/medical-assistant-hero.jpg",
    heroImageAlt: "Medical assistant working with patients in a clinical setting",
    duration: "8-12 weeks",
    schedule: "Day or evening options",
    delivery: "Classroom + clinical externship",
    credential: "Medical Assistant certification eligibility",
    approvals: [
      "Partner-delivered through approved training providers",
      "Workforce funding may be available",
    ],
    fundingOptions: [
      "WIOA funding available for eligible students",
      "Workforce funding options",
      "Employer reimbursement programs",
    ],
    highlights: [
      "Dual training in clinical and administrative skills",
      "Hands-on clinical externship experience",
      "Electronic health records (EHR) training",
      "Job placement assistance with healthcare partners",
    ],
    whatYouLearn: [
      "Patient intake and vital signs",
      "Medical terminology and documentation",
      "Clinical procedures and lab basics",
      "Electronic health records (EHR)",
      "Medical office administration",
      "Insurance and billing fundamentals",
      "Professional communication and patient care",
    ],
    outcomes: [
      "Medical Assistant in clinics, hospitals, or medical offices",
      "Patient Care Coordinator",
      "Medical Office Specialist",
      "Foundation for nursing or advanced healthcare careers",
    ],
    requirements: [
      "High school diploma or equivalent",
      "Background check may be required for clinical placement",
      "Immunizations required for clinical externship",
      "Commitment to professional healthcare standards",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=medical-assistant",
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
