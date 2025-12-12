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
    name: "2Exclusive Apprenticeship Program - Sanitation & Infection Control",
    heroTitle: "2Exclusive Apprenticeship Program - Advanced Sanitation & Infection Control",
    heroSubtitle:
      "Specialized training for sanitation and infection control in high-risk environments: hospitals, military bases, and government facilities",
    shortDescription:
      "Hands-on apprenticeship in OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control for critical sectors",
    longDescription: `The 2Exclusive Apprenticeship Program is a specialized training initiative focused on equipping participants with the advanced skills required for sanitation and infection control in high-risk environments such as hospitals, military bases, and government facilities. This program offers hands-on experience and in-depth training in areas such as OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control protocols.

Apprentices will gain expertise in safely handling hazardous materials, implementing eco-friendly cleaning practices, and ensuring regulatory compliance, all while promoting healthier and safer environments. With a strong emphasis on both technical proficiency and holistic well-being, this apprenticeship prepares participants to meet the unique demands of critical sectors, ensuring a highly skilled workforce ready to tackle the challenges of modern sanitation and safety.

All faculty members possess at least three to five years of professional experience in military or institutional cleaning. Instructors hold valid safety and compliance certifications such as OSHA 10/30, HAZMAT, or Certified Environmental Technician credentials, and demonstrate strong expertise in infection control, regulatory compliance, and holistic wellness cleaning practices.

Credentialing Partners:
• CareerSafe - OSHA 10/30 Safety Certification (https://careersafeonline.com)
• U.S. Department of Labor - OSHA Training (https://osha.gov)
• Certified Environmental Technician Programs
• HAZMAT Certification Bodies

CIP Code: 15.0501 - Heating, Ventilation, Air Conditioning and Refrigeration Engineering Technology/Technician`,
    heroImage: "/images/programs/building-maintenance-hero.jpg",
    heroImageAlt: "Sanitation technician in protective equipment working in healthcare facility",
    duration: "Varies by apprenticeship track",
    schedule: "Quarterly cohorts (January, April, July, October)",
    delivery: "Hands-on apprenticeship with classroom instruction",
    credential: "OSHA 10/30, HAZMAT, Certified Environmental Technician, Infection Control Specialist",
    approvals: [
      "ETPL Approved",
      "WIOA Eligible",
      "Workforce Ready Grant Eligible",
      "CIP Code: 15.0501",
      "Registered Apprenticeship Program",
    ],
    fundingOptions: [
      "100% FREE through WIOA",
      "Workforce Ready Grant",
      "Employer-sponsored apprenticeship",
    ],
    highlights: [
      "Specialized training for high-risk environments",
      "OSHA 10/30 safety certifications",
      "HAZMAT and hazardous waste management",
      "Infection control protocols for hospitals and military",
      "Holistic wellness cleaning practices",
      "Eco-friendly and sustainable cleaning techniques",
      "Regulatory compliance expertise",
      "Quarterly cohort start dates",
      "Hands-on experience in critical sectors",
    ],
    whatYouLearn: [
      "OSHA compliance and workplace safety standards",
      "Infection control protocols and procedures",
      "Hazardous materials handling and disposal",
      "HAZMAT safety and emergency response",
      "Holistic wellness cleaning practices",
      "Eco-friendly and sustainable cleaning techniques",
      "Regulatory compliance for healthcare and government facilities",
      "Bloodborne pathogens and biohazard management",
      "Personal protective equipment (PPE) usage",
      "Documentation and reporting requirements",
    ],
    outcomes: [
      "Sanitation Specialist in hospitals and healthcare",
      "Military base environmental services",
      "Government facility cleaning and maintenance",
      "Infection control technician",
      "Environmental services supervisor",
      "HAZMAT response team member",
      "Certified Environmental Technician",
      "Average salary: $35,000-$55,000/year",
    ],
    requirements: [
      "High school diploma or equivalent required",
      "Willingness to learn infection control and sanitation procedures",
      "Interest in eco-friendly cleaning techniques",
      "Prior experience in janitorial, environmental services, or healthcare cleaning preferred but not required",
      "Background check required",
      "OSHA 10 or OSHA 30 certification completed during program",
      "Application deadline: Apply at least 30 days before desired start date",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply?program=building-maintenance",
    },
    ctaSecondary: {
      label: "Learn More",
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
    name: "Direct Support Professional (DSP) Training",
    heroTitle: "Direct Support Professional (DSP) Training Program",
    heroSubtitle:
      "Compassionate care training for meaningful work supporting individuals with developmental, physical, or emotional needs",
    shortDescription:
      "Hands-on DSP training with real-world scenarios preparing you for rewarding careers in behavioral health, direct support, and caregiving",
    longDescription: `Our Direct Support Professional (DSP) training program is built to prepare compassionate individuals for meaningful work in the care and support field. This program offers hands-on instruction, real-world scenarios, and practical skills that help students feel confident working with individuals who have developmental, physical, or emotional needs. Whether you're starting a new career or looking to grow in the healthcare field, this training gives you the tools to make a real difference in someone's life while also building a rewarding future for yourself.

All instructors possess a minimum of a High School Diploma or GED and have at least two years of hands-on experience in behavioral health, direct support, or caregiving. Preference is given to faculty with credentials such as Certified Direct Support Professional (CDSP), CNA licensure, QIDP designation, or completion of state-approved Train-the-Trainer programs. Faculty complete ongoing professional development annually.

This comprehensive program provides training in patient care, behavioral health support, person-centered planning, and professional communication. Students learn to work effectively with individuals with disabilities, mental health needs, and other support requirements in residential, community, and healthcare settings.

Credentialing Partners:
• National Alliance for Direct Support Professionals (NADSP) - CDSP Certification (https://nadsp.org)
• Certified Community Healthcare Worker (CCHW) Programs
• CPR/First Aid Certification Bodies
• Rise Up - Career Readiness Certification (https://riseup.com)

CIP Code: 51.0801 - Medical/Clinical Assistant`,
    heroImage: "/images/programs/medical-assistant-hero.jpg",
    heroImageAlt: "Direct support professional providing compassionate care",
    duration: "21 days (3 weeks)",
    schedule: "Cohorts start 1st and 15th of each month",
    delivery: "Hands-on instruction with real-world scenarios",
    credential: "Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate",
    approvals: [
      "ETPL Approved - Program ID #10004639",
      "WIOA Eligible",
      "Workforce Ready Grant Eligible",
      "CIP Code: 51.0801",
    ],
    fundingOptions: [
      "100% FREE through WIOA",
      "Workforce Ready Grant",
      "Employer-sponsored enrollment",
      "Self-Pay: $4,325",
    ],
    highlights: [
      "Certified Community Healthcare Worker (CCHW) credential",
      "CPR and First Aid certification",
      "Rise Up career readiness certificate",
      "Hands-on training with real-world scenarios",
      "Fast 21-day completion",
      "Cohorts start twice monthly (1st and 15th)",
      "Meaningful work supporting individuals with disabilities",
      "Pathways to behavioral health and healthcare careers",
    ],
    whatYouLearn: [
      "Person-centered care and support planning",
      "Working with individuals with developmental disabilities",
      "Behavioral health support techniques",
      "Communication and relationship building",
      "CPR and First Aid emergency response",
      "Medication administration basics",
      "Documentation and reporting",
      "Professional boundaries and ethics",
      "Crisis intervention and de-escalation",
      "Activities of daily living (ADL) assistance",
    ],
    outcomes: [
      "Direct Support Professional in residential settings",
      "Behavioral health support specialist",
      "Community support worker",
      "Personal care assistant",
      "Group home staff",
      "Day program facilitator",
      "Average salary: $30,000-$42,000/year",
      "Foundation for nursing or advanced healthcare careers",
    ],
    requirements: [
      "18 years or older",
      "High school diploma or GED",
      "Pass background check",
      "Reliable transportation encouraged",
      "No prior healthcare experience required",
      "Willingness to complete all required training hours",
      "Interest in supporting individuals with disabilities or behavioral health needs",
      "Legally authorized to work in the U.S.",
      "Application deadline: Apply at least 7 days before cohort start date",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=medical-assistant",
    },
    price: 4325,
  },
  {
    slug: "beauty-career-educator",
    name: "Beauty and Career Educator Training",
    heroTitle: "Beauty and Career Educator Training Program",
    heroSubtitle: "12-week hybrid program preparing aspiring beauty professionals and peer educators",
    shortDescription: "Comprehensive training combining salon services, peer teaching, entrepreneurship, and workforce readiness",
    longDescription: `The Beauty & Career Educator Training Program offered by Elevate for Humanity is a 12-week hybrid training experience designed to help aspiring beauty professionals and peer educators develop career-ready, technical, and leadership skills. This program includes practical salon service education (manicuring techniques, customer service, sanitation), instructional tools for peer teaching and community workshops, and a strong focus on entrepreneurship and workforce readiness.

Participants earn a nationally recognized Rise Up Credential (https://riseup.com), a Career Readiness Certificate, and a custom Certificate of Completion. Designed for youth and adults ages 16+, this program is aligned with workforce demand for independent contractors, salon educators, and business owners.

Credentialing Partners:
• Rise Up - Career Readiness Certification (https://riseup.com)
• American Red Cross - CPR/First Aid (https://redcross.org)
• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)

CIP Code: 13.1319 - Technical Teacher Education`,
    heroImage: "/images/programs/beauty-educator.jpg",
    heroImageAlt: "Beauty educator training students in salon techniques",
    duration: "12 weeks (84 days)",
    schedule: "Hybrid - Flexible scheduling with monthly/quarterly cohorts",
    delivery: "Hybrid - Online coursework + In-person practical training and workshops",
    credential: "Rise Up Credential, Career Readiness Certificate, CPR/First Aid, OSHA 10, Certificate of Completion",
    approvals: ["ETPL Approved - Program ID #10004648", "WIOA Eligible", "Workforce Ready Grant Eligible", "CIP Code: 13.1319"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,730"],
    highlights: [
      "Nationally recognized Rise Up Credential",
      "CPR/First Aid and OSHA 10 certifications",
      "Practical salon service education (manicuring, customer service, sanitation)",
      "Peer teaching and community workshop skills",
      "Entrepreneurship and business ownership training",
      "Career readiness and workforce development",
      "Rolling admissions - start year-round",
    ],
    whatYouLearn: [
      "Manicuring techniques and nail care services",
      "Customer service excellence in salon settings",
      "Infection control and sanitation protocols",
      "Peer teaching and instructional methods",
      "Community workshop facilitation",
      "CPR and First Aid emergency response",
      "OSHA 10 workplace safety standards",
      "Entrepreneurship and business planning",
      "Career development and workforce readiness",
      "Leadership and mentorship skills",
    ],
    outcomes: [
      "Independent contractor in beauty services",
      "Salon educator and trainer",
      "Beauty business owner",
      "Peer educator and community workshop facilitator",
      "Career coach in beauty industry",
      "Average salary: $35,000-$55,000/year",
      "Flexible self-employment opportunities",
    ],
    requirements: [
      "At least 16 years of age",
      "High school diploma, GED, or equivalent",
      "Youth applicants may enroll with parental/guardian permission and school approval",
      "No prior nail or beauty experience required",
      "Complete brief orientation and program readiness screening",
      "Application deadline: Rolling admissions (apply at least 2 weeks before start date for priority consideration)",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=beauty-educator",
    },
    price: 4730,
  },
  {
    slug: "business-startup-marketing",
    name: "Business Start-up & Marketing",
    heroTitle: "Business Start-up & Marketing Program with Rise Forward",
    heroSubtitle: "5-week intensive program to launch your business with mentorship, stipend, and laptop kit",
    shortDescription: "Hands-on entrepreneurship training with LLC formation, digital marketing, and real-world startup support",
    longDescription: `The Business Start-Up & Marketing Program with Rise Forward equips participants with hands-on skills to launch their own business ventures. Students will learn the fundamentals of entrepreneurship, digital marketing, LLC formation, business planning, customer service, and resume development. The program includes guided startup support, mentorship, and ends with a business match stipend and laptop kit to empower real-world implementation. Ideal for youth ready to explore self-employment and leadership pathways in today's economy.

In just 5 weeks, you'll gain industry-recognized certifications in retail operations and marketing, learn how to create a business plan, develop marketing strategies, form an LLC, and build your professional image and online presence. This program is designed for aspiring entrepreneurs ages 16+ who want to launch their own business or advance in retail management.

Credentialing Partners:
• National Retail Federation (NRF) - Business of Retail Certified Specialist (https://nrf.com)
• National Retail Federation (NRF) - Retail Industry Fundamentals Specialist (https://nrf.com)
• Rise Forward Foundation - Business Development Support (https://riseforwardfoundation.org)

Program Benefits:
• Business match stipend upon completion
• Laptop kit for business operations
• One-on-one mentorship
• LLC formation guidance
• Professional resume development

CIP Code: 52.0701 - Entrepreneurship/Entrepreneurial Studies`,
    heroImage: "/images/programs/business-startup.jpg",
    heroImageAlt: "Young entrepreneur planning business strategy",
    duration: "5 weeks",
    schedule: "Quarterly cohorts - Flexible scheduling options",
    delivery: "Hybrid - Online coursework + In-person workshops and mentorship",
    credential: "Business of Retail Certified Specialist (NRF), Retail Industry Fundamentals Specialist (NRF), Certificate of Completion",
    approvals: ["ETPL Approved - Program ID #10004645", "WIOA Eligible", "Workforce Ready Grant Eligible", "CIP Code: 52.0701", "Rise Forward Partnership"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,550", "Includes business match stipend and laptop kit"],
    highlights: [
      "Industry-recognized NRF retail certifications",
      "LLC formation and business registration",
      "Digital marketing and social media strategies",
      "Business match stipend upon completion",
      "Free laptop kit for business operations",
      "One-on-one mentorship and startup support",
      "Resume and professional image development",
      "Fast 5-week completion",
    ],
    whatYouLearn: [
      "Business planning and strategy development",
      "LLC formation and business registration",
      "Retail operations and management",
      "Digital marketing fundamentals",
      "Social media marketing and content creation",
      "Customer service excellence",
      "Financial planning and budgeting",
      "Sales techniques and customer acquisition",
      "Resume building and professional branding",
      "Online presence and website basics",
    ],
    outcomes: [
      "Launch your own business with LLC",
      "Retail management positions",
      "Marketing coordinator roles",
      "Small business owner/entrepreneur",
      "E-commerce business operator",
      "Average salary: $35,000-$60,000/year",
      "Self-employment income potential varies",
    ],
    requirements: [
      "Ages 16 and up",
      "No previous business experience required",
      "Basic reading and writing skills",
      "Comfortable using a computer",
      "Entrepreneurial mindset and eagerness to learn",
      "Complete short intake interview",
      "Application deadline: Apply at least 2 weeks before cohort start date",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=business-startup",
    },
    price: 4550,
  },
  {
    slug: "emergency-health-safety-tech",
    name: "Emergency Health & Safety Technician",
    heroTitle: "Emergency Health & Safety Technician Registered Apprenticeship",
    heroSubtitle: "4-week hybrid program preparing life-saving responders for schools, workplaces, and emergency settings",
    shortDescription: "Comprehensive training with CPR/AED, First Aid, EMR, and OSHA 10 certifications for healthcare and public safety careers",
    longDescription: `The Emergency Health and Safety Technician Registered Apprenticeship program prepares individuals for life-saving response roles in schools, workplaces and emergency settings. This hybrid training includes CPR/AED, First Aid, OSHA-aligned safety education, and public health emergency awareness. Students graduate with nationally recognized certifications and are equipped for careers in healthcare, public safety, community response, and entry-level emergency technician pathways.

In just 4 weeks, you'll earn multiple industry-recognized certifications including Emergency Medical Responder (EMR), CPR/AED, First Aid, and OSHA 10. This fast-paced program combines classroom instruction with hands-on emergency response training, preparing you to save lives and ensure workplace safety.

All instructors hold CPR/AED & First Aid Instructor certification from the American Heart Association, Red Cross, or equivalent nationally recognized body. Instructors have a minimum of 2 years of experience in occupational safety, healthcare, or public safety.

Credentialing Partners:
• American Heart Association (AHA) - CPR/AED/First Aid (https://cpr.heart.org)
• American Red Cross - CPR/AED/First Aid (https://redcross.org)
• National Registry of Emergency Medical Technicians (NREMT) - EMR Certification (https://nremt.org)
• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)

CIP Code: 51.0999 - Allied Health Diagnostic, Intervention, and Treatment Professions`,
    heroImage: "/images/programs/emergency-health.jpg",
    heroImageAlt: "Emergency medical responder providing care",
    duration: "4 weeks",
    schedule: "Monthly cohorts - Full-time intensive",
    delivery: "Hybrid - Online theory + In-person hands-on skills training",
    credential: "Emergency Medical Responder (EMR), CPR/AED/First Aid, OSHA 10 - Career Safe",
    approvals: ["ETPL Approved - Program ID #10004621", "WIOA Eligible", "Workforce Ready Grant Eligible", "CIP Code: 51.0999", "Registered Apprenticeship Program"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,950"],
    highlights: [
      "Registered Apprenticeship program",
      "Emergency Medical Responder (EMR) certification",
      "CPR/AED and First Aid certified",
      "OSHA 10 workplace safety certification",
      "Public health emergency awareness training",
      "Fast 4-week completion",
      "Monthly cohort start dates",
      "High-demand career field",
      "Pathways to healthcare and public safety careers",
    ],
    whatYouLearn: [
      "Emergency medical response procedures",
      "CPR and AED operation for all ages",
      "First aid and trauma care",
      "Patient assessment and triage",
      "OSHA 10 workplace safety standards",
      "Emergency scene management and safety",
      "Public health emergency response",
      "Medical terminology and documentation",
      "Communication with EMS professionals",
      "Infection control and bloodborne pathogens",
    ],
    outcomes: [
      "Emergency Medical Responder (EMR)",
      "School safety coordinator",
      "Workplace safety officer",
      "First responder positions",
      "Community health worker",
      "Security and safety roles",
      "Entry-level emergency technician",
      "Healthcare support positions",
      "Average salary: $35,000-$45,000/year",
    ],
    requirements: [
      "High school diploma or GED required for national certification",
      "18 years or older",
      "Able to read and follow written and verbal instructions",
      "Physical ability to perform emergency response duties",
      "No previous medical training required",
      "Background check required",
      "Application deadline: Apply 2 weeks prior to preferred start date",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=emergency-health-safety",
    },
    price: 4950,
  },
  {
    slug: "home-health-aide",
    name: "Home Health Aide Certification",
    heroTitle: "Home Health Aide Certification Program",
    heroSubtitle: "4-week program to become a certified Home Health Aide",
    shortDescription: "Comprehensive training for in-home patient care with HHA licensure and CPR certification",
    longDescription: `The Home Health Aide Certification program prepares you to provide compassionate, professional care to patients in their homes. In 4 weeks, you'll earn your Home Health Aide (HHA) license, Certified Community Healthcare Worker (CCHW) certification, CPR certification, and Rise Up career readiness credentials. This program combines medical knowledge with practical caregiving skills, preparing you for a rewarding career helping those who need it most.`,
    heroImage: "/images/programs/home-health-aide.jpg",
    heroImageAlt: "Home health aide caring for patient",
    duration: "4 weeks",
    schedule: "Full-time or Part-time options available",
    delivery: "Hybrid - Online coursework + In-person clinical training",
    credential: "Home Health Aide (HHA) License, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate",
    approvals: ["ETPL Approved - Program ID #10004626", "WIOA Eligible", "Workforce Ready Grant Eligible"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,700"],
    highlights: [
      "Home Health Aide state licensure",
      "Certified Community Healthcare Worker",
      "CPR certified",
      "Rise Up career readiness",
      "Fast 4-week completion",
      "High-demand career",
    ],
    whatYouLearn: [
      "Patient care and assistance",
      "Vital signs monitoring",
      "Medication reminders",
      "Personal hygiene assistance",
      "Meal preparation and nutrition",
      "Mobility and transfer techniques",
      "CPR and First Aid",
      "Documentation and reporting",
      "Communication with healthcare teams",
    ],
    outcomes: [
      "Home Health Aide positions",
      "In-home care provider",
      "Senior care facilities",
      "Hospice care roles",
      "Average salary: $28,000-$38,000/year",
      "Flexible scheduling options",
    ],
    requirements: [
      "High school diploma or GED",
      "18 years or older",
      "Background check required",
      "Immunizations required",
      "Compassionate and patient demeanor",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=home-health-aide",
    },
    price: 4700,
  },
  {
    slug: "professional-esthetician",
    name: "Professional Esthetician & Client Services",
    heroTitle: "Professional Esthetician & Client Services Career Program",
    heroSubtitle: "5-week program combining esthetics with retail and customer service expertise",
    shortDescription: "Comprehensive esthetics training with retail management and customer service certifications",
    longDescription: `The Professional Esthetician & Client Services Career Program prepares you for a successful career in the beauty and wellness industry. In 5 weeks, you'll gain industry-recognized certifications in retail operations, customer service, and workplace safety (OSHA 10). This program combines esthetics knowledge with business skills, preparing you to work in spas, salons, retail beauty environments, or start your own esthetics business.`,
    heroImage: "/images/programs/esthetician.jpg",
    heroImageAlt: "Professional esthetician providing facial treatment",
    duration: "5 weeks",
    schedule: "Full-time or Part-time options available",
    delivery: "Hybrid - Online coursework + In-person practical training",
    credential: "Business of Retail Certified Specialist, Customer Service and Sales Certified Specialist, OSHA 10 - Career Safe",
    approvals: ["ETPL Approved - Program ID #10004628", "WIOA Eligible", "Workforce Ready Grant Eligible"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,575"],
    highlights: [
      "Retail management certification",
      "Customer service excellence certification",
      "OSHA 10 workplace safety",
      "Esthetics and skincare knowledge",
      "Fast 5-week completion",
    ],
    whatYouLearn: [
      "Skincare fundamentals and treatments",
      "Facial techniques and procedures",
      "Retail operations and management",
      "Customer service excellence",
      "Sales techniques and upselling",
      "Product knowledge and recommendations",
      "OSHA workplace safety standards",
      "Client consultation and communication",
    ],
    outcomes: [
      "Esthetician positions in spas and salons",
      "Retail beauty consultant",
      "Skincare specialist",
      "Beauty product sales representative",
      "Average salary: $30,000-$50,000/year plus commissions",
    ],
    requirements: [
      "High school diploma or GED",
      "Interest in beauty and wellness",
      "Strong customer service skills",
      "Professional appearance and demeanor",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=esthetician",
    },
    price: 4575,
  },
  {
    slug: "peer-recovery-coach",
    name: "Public Safety Reentry Specialist",
    heroTitle: "Public Safety Reentry Specialist Program",
    heroSubtitle: "45-day program to become a Certified Peer Recovery Coach and support community reentry",
    shortDescription: "Comprehensive training for peer support, recovery coaching, and community healthcare work",
    longDescription: `The Public Safety Reentry Specialist Program prepares you to support individuals reentering society after incarceration or overcoming substance use challenges. In 45 days, you'll earn multiple certifications including Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, and Rise Up career readiness. This program combines lived experience with professional training to help you make a meaningful impact in your community.`,
    heroImage: "/images/programs/peer-recovery.jpg",
    heroImageAlt: "Peer recovery coach supporting client",
    duration: "45 days (6-7 weeks)",
    schedule: "Full-time or Part-time options available",
    delivery: "Hybrid - Online coursework + In-person training",
    credential: "Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate",
    approvals: ["ETPL Approved - Program ID #10004666", "WIOA Eligible", "Workforce Ready Grant Eligible"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,750"],
    highlights: [
      "Certified Peer Recovery Coach credential",
      "Peer Support Professional certification",
      "Community Healthcare Worker certification",
      "CPR certified",
      "Rise Up career readiness",
      "Make a difference in your community",
    ],
    whatYouLearn: [
      "Peer support principles and ethics",
      "Recovery coaching techniques",
      "Trauma-informed care",
      "Crisis intervention",
      "Community healthcare navigation",
      "CPR and First Aid",
      "Case management basics",
      "Motivational interviewing",
      "Resource coordination",
    ],
    outcomes: [
      "Peer Recovery Coach",
      "Reentry specialist",
      "Community healthcare worker",
      "Substance use counselor assistant",
      "Case management support",
      "Average salary: $35,000-$48,000/year",
    ],
    requirements: [
      "High school diploma or GED",
      "Lived experience with recovery or reentry preferred",
      "Commitment to helping others",
      "Background check required",
      "Stable in recovery (if applicable)",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=peer-recovery",
    },
    price: 4750,
  },
  {
    slug: "tax-prep-financial-services",
    name: "Tax Preparation & Financial Services",
    heroTitle: "Tax Preparation & Financial Services Career",
    heroSubtitle: "10-week program to become a certified tax preparer and financial services professional",
    shortDescription: "Comprehensive training in tax preparation, QuickBooks, and Microsoft 365 with industry certifications",
    longDescription: `The Tax Preparation & Financial Services Career program prepares you for a rewarding career in financial services and tax preparation. In 10 weeks, you'll earn industry-recognized certifications including QuickBooks Pro Advisor, Microsoft 365 Fundamentals, and Rise Up career readiness. This program combines tax law knowledge with practical software skills, preparing you to work for tax firms, accounting offices, or start your own tax preparation business.`,
    heroImage: "/images/programs/tax-prep.jpg",
    heroImageAlt: "Tax preparer working with client",
    duration: "10 weeks",
    schedule: "Full-time or Part-time options available",
    delivery: "Hybrid - Online coursework + In-person practical training",
    credential: "QuickBooks Pro Advisor, Microsoft 365 Fundamentals, Rise Up Certificate, Certificate of Completion",
    approvals: ["ETPL Approved - Program ID #10004627", "WIOA Eligible", "Workforce Ready Grant Eligible"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $4,750"],
    highlights: [
      "QuickBooks Pro Advisor certification",
      "Microsoft 365 Fundamentals certification",
      "Tax preparation training",
      "Rise Up career readiness",
      "Start your own tax business",
      "Seasonal and year-round opportunities",
    ],
    whatYouLearn: [
      "Federal and state tax law",
      "Tax return preparation",
      "QuickBooks accounting software",
      "Microsoft 365 applications",
      "Financial record keeping",
      "Client consultation and communication",
      "Business bookkeeping",
      "Ethics and professional standards",
    ],
    outcomes: [
      "Tax preparer positions",
      "Bookkeeper roles",
      "Financial services representative",
      "Start your own tax business",
      "Average salary: $35,000-$55,000/year",
      "Seasonal income potential: $15,000-$30,000",
    ],
    requirements: [
      "High school diploma or GED",
      "Strong math and analytical skills",
      "Attention to detail",
      "Basic computer skills",
      "Professional demeanor",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "Learn More",
      href: "/contact?topic=tax-prep",
    },
    price: 4750,
  },
  {
    slug: "cpr-certification",
    name: "CPR, AED & First Aid Certification",
    heroTitle: "CPR, AED & First Aid Certification",
    heroSubtitle: "One-day hands-on training to earn your American Heart Association CPR certification",
    shortDescription: "Essential life-saving skills training with AHA CPR card valid for 2 years",
    longDescription: `This hands-on CPR Certification course provides participants with essential life-saving skills through instructor-led training in adult, child, and infant CPR, AED usage, and basic first aid. Students will practice on industry-approved equipment and complete the course with an American Heart Association (or equivalent) CPR card valid for two years. This one-day, in-person program is ideal for aspiring healthcare workers, caregivers, and anyone seeking life-saving credentials.

All instructors are certified American Heart Association (AHA) BLS Instructors or equivalent through nationally recognized organizations such as the Red Cross. Instructors maintain current credentials and hands-on skills testing ability in compliance with training center protocols.

This certification is required for many healthcare positions and is valuable for anyone who wants to be prepared to respond in an emergency. The course combines video instruction, hands-on practice, and skills testing to ensure you're confident and competent in performing CPR and using an AED.

Credentialing Partners:
• American Heart Association (AHA) - CPR/AED/First Aid Certification (https://cpr.heart.org)
• American Red Cross - CPR/AED/First Aid Certification (https://redcross.org)

CIP Code: 51.0810 - Emergency Care Attendant (EMT Ambulance)`,
    heroImage: "/images/programs/cpr-certification.jpg",
    heroImageAlt: "Student practicing CPR on training manikin",
    duration: "1 day (4-6 hours)",
    schedule: "Multiple dates available monthly - Rolling admissions",
    delivery: "In-person hands-on training",
    credential: "American Heart Association CPR/AED/First Aid Certification (valid 2 years)",
    approvals: ["ETPL Approved - Program ID #10004674", "WIOA Eligible", "Workforce Ready Grant Eligible", "CIP Code: 51.0810", "AHA Training Center"],
    fundingOptions: ["100% FREE through WIOA", "Workforce Ready Grant", "Self-Pay: $575"],
    highlights: [
      "American Heart Association certification",
      "Valid for 2 years",
      "One-day completion",
      "Hands-on practice with industry equipment",
      "Adult, child, and infant CPR training",
      "AED usage and basic first aid",
      "Required for many healthcare jobs",
      "Certified AHA instructors",
    ],
    whatYouLearn: [
      "Adult CPR techniques and compressions",
      "Child CPR procedures",
      "Infant CPR and special considerations",
      "AED (Automated External Defibrillator) operation",
      "Choking relief for all ages",
      "Basic first aid for common emergencies",
      "Recognition of cardiac arrest and stroke",
      "Emergency response protocols",
      "Scene safety and infection control",
    ],
    outcomes: [
      "AHA CPR/AED/First Aid certification card",
      "Qualify for healthcare positions requiring CPR",
      "Confidence to respond in emergencies",
      "Meet employment requirements for CNA, Medical Assistant, EMT, and other healthcare roles",
      "Valuable skill for childcare, education, and public safety positions",
    ],
    requirements: [
      "No prior medical experience required",
      "Physically able to perform CPR compressions on a manikin",
      "Able to kneel and perform floor-based skills",
      "Basic reading and comprehension of safety protocols",
      "Application deadline: Apply at least 2 weeks before class date for availability",
    ],
    ctaPrimary: {
      label: "Apply Now",
      href: "/apply",
    },
    ctaSecondary: {
      label: "View Class Schedule",
      href: "/contact?topic=cpr-certification",
    },
    price: 575,
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
