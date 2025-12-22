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
    slug: 'hvac-technician',
    name: 'HVAC Technician',
    heroTitle: 'HVAC Technician Career Training',
    heroSubtitle:
      'Master heating, cooling, and refrigeration in 16-24 weeks. HVAC technicians are in high demand everywhere—companies need skilled workers now. Get hands-on training with real equipment and graduate ready for a career with excellent pay and job security.',
    shortDescription:
      'Master heating, cooling, and refrigeration in 16-24 weeks. HVAC technicians are in high demand everywhere—companies need skilled workers now. Get hands-on training with real equipment and graduate ready for a career with excellent pay and job security.',
    longDescription:
      "The HVAC Technician program is designed for individuals who enjoy working with their hands, solving problems, and building technical skill. This program teaches students how to diagnose, repair, and maintain HVAC systems while understanding safety, electrical fundamentals, and customer service. You will complete online theory and hands-on lab practice, giving you the confidence to enter the field ready to work. This pathway leads to in-demand roles, with strong long-term career growth.\n\nWhat You'll Learn:\n- HVAC system components and operation\n- Electrical testing and troubleshooting\n- Refrigeration cycle fundamentals\n- Equipment installation and repair\n- Preventative maintenance practices\n- Safety, EPA preparation, and customer communication\n\nWho This Program Is For:\n- Career changers seeking a skilled trade\n- Individuals who enjoy technical, hands-on work\n- Adults needing a stable, high-demand job path\n- Students preparing for apprenticeships or OJT\n\nProgram Format:\n- Hybrid: Online coursework + hands-on labs\n- Length: 16–24 weeks\n- Schedule: Day, evening, or weekend options\n\nFunding & Approvals:\n- Workforce funding may be available (location dependent)\n- Employer OJT/sponsorship options may apply\n\nCareer Outcomes:\n- HVAC Technician (entry-level)\n- Maintenance Technician\n- Building Operations Support",
    heroImage: '/images/programs/hvac-hero.jpg',
    heroImageAlt: 'HVAC student working on an air conditioning unit',
    duration: '16–24 weeks',
    schedule: 'Day, evening, or weekend options',
    delivery: 'Hybrid: Online coursework + hands-on labs',
    credential:
      'Industry-recognized HVAC Technician certificate; EPA 608 prep included',
    approvals: [
      'Workforce funding may be available (location dependent)',
      'Employer OJT/sponsorship options may apply',
    ],
    fundingOptions: [
      'Workforce funding may be available (location dependent)',
      'Employer OJT/sponsorship options may apply',
    ],
    highlights: [
      'High demand - companies are desperate for skilled HVAC technicians',
      'Excellent pay and benefits - start at $40-50k, experienced techs earn $60-80k+',
      'Hands-on training with real HVAC equipment and systems',
      'EPA 608 certification prep included - required for working with refrigerants',
      'Job security - HVAC systems need maintenance and repair year-round',
      'Start your own business or work for an established company',
    ],
    whatYouLearn: [
      'HVAC system components and operation',
      'Electrical testing and troubleshooting',
      'Refrigeration cycle fundamentals',
      'Equipment installation and repair',
      'Preventative maintenance practices',
      'Safety, EPA preparation, and customer communication',
    ],
    outcomes: [
      'HVAC Technician (entry-level)',
      'Maintenance Technician',
      'Building Operations Support',
    ],
    requirements: [
      'Career changers seeking a skilled trade',
      'Individuals who enjoy technical, hands-on work',
      'Adults needing a stable, high-demand job path',
      'Students preparing for apprenticeships or OJT',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=hvac-technician',
    },
  },
  {
    slug: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    heroTitle: 'Indiana Barber Apprenticeship - Earn While You Learn',
    heroSubtitle:
      'Get paid while you learn. Work in a real barbershop from day one, earning approximately $10/hour plus commissions while building your skills and clientele. Skip the $25,000 barber school debt. Graduate in 15-17 months ready to rent your own chair, work in a top shop, or open your own business.',
    shortDescription:
      'Get paid while you learn. Work in a real barbershop from day one, earning approximately $10/hour plus commissions while building your skills and clientele. Skip the $25,000 barber school debt. Graduate in 15-17 months ready to rent your own chair, work in a top shop, or open your own business.',
    longDescription:
      "The Indiana Barber Apprenticeship is a federally registered program allowing you to earn wages while training to become a licensed barber. Complete 2,000 hours of on-the-job training plus 144 hours of related instruction over 15-17 months.\n\nWhat You'll Learn:\n- Haircutting techniques: fades, tapers, lineups, beard work\n- Hot towel shaves and grooming\n- Sanitation and infection control\n- Client consultation and communication\n- Business management and shop operations\n- Building and maintaining clientele\n\nWho This Program Is For:\n- Individuals seeking a skilled trade career\n- Those who enjoy working with people\n- Adults needing stable, in-demand work\n- Career changers looking for entrepreneurial opportunities\n\nProgram Format:\n- Work at registered apprenticeship sponsor shop\n- Earn $10/hour base pay plus commissions and tips\n- Complete online theory coursework (3-4 hours/week)\n- Total time: 15-17 months\n\nFunding & Approvals:\n- WIOA Funding\n- Workforce Ready Grant\n- JRI Funding for Justice-Involved Individuals\n- Employer sponsorship options\n- Self-pay with payment plans\n\nCareer Outcomes:\n- Indiana Registered Barber (licensed)\n- Chair rental - be your own boss\n- Barbershop employee with established clientele\n- Barbershop owner/entrepreneur\n- Earning potential: $35,000-$65,000+ per year",
    heroImage: '/images/programs/barber-hero.jpg',
    heroImageAlt:
      'Barber apprentice working with real clients in professional barbershop',
    duration: '15-17 months (2,000 hours)',
    schedule: 'Full-time, based on barbershop placement',
    delivery:
      'On-the-job training in real barbershop + 144 hours technical instruction',
    credential:
      'Indiana Registered Barber License (upon passing state board exam)',
    approvals: [
      'U.S. Department of Labor Registered Apprenticeship',
      'Indiana House Bill 1135 & 1320 Approved',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'JRI Funding Available',
    ],
    fundingOptions: [
      '100% Employer-Paid curriculum cost',
      'WIOA Funding',
      'Workforce Ready Grant',
      'JRI Funding for Justice-Involved Individuals',
      'Earn $10/hour + commissions while training',
    ],
    highlights: [
      'Earn while you learn - get paid $10/hour plus commissions from day one',
      'Zero tuition - employers pay your curriculum cost',
      'Skip $25,000 barber school debt - graduate debt-free',
      'Build your clientele during training - graduate with customers who know you',
      'Real experience - 2,000 hours working with actual clients in professional shops',
      'Own your future - 73% of graduates own their chair or shop within 2 years',
      'Unlimited earning potential - licensed barbers earn $35k-$65k+ per year',
      'Multiple career paths - rent a chair, work for a shop, or open your own business',
    ],
    whatYouLearn: [
      'Haircutting: fades, tapers, lineups, beard work',
      'Hot towel shaves and grooming techniques',
      'Sanitation and infection control protocols',
      'Client consultation and communication',
      'Business management and shop operations',
      'Building and maintaining a clientele',
      'Customer service and professionalism',
      'Shop safety and regulatory compliance',
    ],
    outcomes: [
      'Indiana Registered Barber (licensed)',
      'Chair rental ($100-$300/week) - be your own boss',
      'Barbershop employee with established clientele',
      'Barbershop owner/entrepreneur',
      'Earning potential: $35,000-$65,000+ per year',
      '73% own chair or shop within 2 years',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Passion for working with people',
      'Willingness to commit to 2,000 training hours',
      'Reliable transportation to barbershop placement',
      'Professional attitude and appearance',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact?topic=barber-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/programs/barber-apprenticeship',
    },
    price: 4980, // Self-pay option price
  },
  {
    slug: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    heroTitle: 'CNA — Certified Nursing Assistant',
    heroSubtitle:
      'Start your healthcare career in just 4-8 weeks. Learn patient care from experienced nurses and get certified to work in hospitals, nursing homes, assisted living, or home health. Enjoy stable income, flexible schedules, and a clear path to becoming an LPN or RN.',
    shortDescription:
      'Start your healthcare career in just 4-8 weeks. Learn patient care from experienced nurses and get certified to work in hospitals, nursing homes, assisted living, or home health. Enjoy stable income, flexible schedules, and a clear path to becoming an LPN or RN.',
    longDescription:
      "The CNA program provides foundational patient care training through structured instruction and supported clinical experiences. Students learn essential caregiving skills, communication, infection prevention, and daily living support. This program is ideal whether you are starting a healthcare career, returning to the workforce, or preparing for advanced roles such as QMA, LPN, or RN.\n\nWhat You'll Learn:\n- Vital signs and patient monitoring\n- Infection prevention and safety\n- Activities of daily living (ADLs)\n- Mobility, transfers, and comfort care\n- Professional communication and ethics\n\nWho This Program Is For:\n- Individuals who enjoy helping others\n- Students exploring healthcare careers\n- Adults needing stable, in-demand work\n- Anyone preparing for nursing pathways\n\nProgram Format:\n- Classroom + clinicals\n- Length: 4–8 weeks\n- Schedule: Day, evening, or weekend options\n\nFunding & Approvals:\n- Partner-delivered through an approved CNA training provider\n- Workforce funding may be available\n\nCareer Outcomes:\n- Certified Nursing Assistant\n- Patient Care Technician (with additional training)\n- Home Health Aide",
    heroImage: '/images/programs/cna-hero.jpg',
    heroImageAlt: 'CNA student practicing caregiving skills with an instructor',
    duration: '4–8 weeks',
    schedule: 'Day, evening, or weekend options',
    delivery: 'Classroom + clinicals',
    credential:
      'CNA certification eligibility (state-approved program partner)',
    approvals: [
      'Partner-delivered through an approved CNA training provider',
      'Workforce funding may be available',
    ],
    fundingOptions: [
      'Partner-delivered through an approved CNA training provider',
      'Workforce funding may be available',
    ],
    highlights: [
      'Get certified in just 4-8 weeks - fastest path to healthcare',
      'Stable income and flexible schedules - work the hours that fit your life',
      'High demand - healthcare facilities are always hiring CNAs',
      'Clear advancement path - many CNAs become LPNs or RNs',
      'Hands-on clinical experience with real patients',
      'Job placement support with local hospitals and care facilities',
    ],
    whatYouLearn: [
      'Vital signs and patient monitoring',
      'Infection prevention and safety',
      'Activities of daily living (ADLs)',
      'Mobility, transfers, and comfort care',
      'Professional communication and ethics',
    ],
    outcomes: [
      'Certified Nursing Assistant',
      'Patient Care Technician (with additional training)',
      'Home Health Aide',
    ],
    requirements: [
      'Individuals who enjoy helping others',
      'Students exploring healthcare careers',
      'Adults needing stable, in-demand work',
      'Anyone preparing for nursing pathways',
    ],
    ctaPrimary: {
      label: 'Start CNA Application',
      href: '/contact?topic=cna',
    },
    ctaSecondary: {
      label: 'Talk to Healthcare Career Coach',
      href: '/contact?topic=cna',
    },
  },
  {
    slug: 'cdl',
    name: "Commercial Driver's License (CDL)",
    heroTitle: 'CDL — Commercial Driver Training',
    heroSubtitle:
      "Get your Commercial Driver's License and start earning $50,000-$70,000+ per year. Professional CDL training prepares you for Class A or Class B licensing in just weeks. Trucking companies are desperate for drivers—many offer sign-on bonuses, benefits, and tuition reimbursement.",
    shortDescription:
      "Get your Commercial Driver's License and start earning $50,000-$70,000+ per year. Professional CDL training prepares you for Class A or Class B licensing in just weeks. Trucking companies are desperate for drivers—many offer sign-on bonuses, benefits, and tuition reimbursement.",
    longDescription:
      "The CDL program builds the knowledge and skills required to safely operate commercial vehicles. Students receive classroom instruction along with hands-on yard and road training. This pathway is ideal for adults seeking stable income, benefits, and long-term growth in logistics and transportation.\n\nWhat You'll Learn:\n- Vehicle inspection and safety\n- Backing, shifting, turning, and road maneuvers\n- Trip planning and hours-of-service rules\n- Transportation regulations\n- Professional communication and job readiness\n\nWho This Program Is For:\n- Adults seeking high-earning roles\n- Individuals interested in transportation careers\n- Career changers needing a stable job pathway\n- Students who want a quick employment route\n\nProgram Format:\n- Classroom, yard practice, and road training\n- Length: Varies by partner\n- Schedule: Day/evening options\n\nFunding & Approvals:\n- Workforce funding options may be available\n- Employer reimbursement programs may apply\n\nCareer Outcomes:\n- CDL Class A or B Driver\n- Local, regional, or dedicated routes\n- Logistics and transportation support roles",
    heroImage: '/images/programs/cdl-hero.jpg',
    heroImageAlt: 'CDL student practicing with a commercial truck',
    duration: 'Varies by partner',
    schedule: 'Day/evening options',
    delivery: 'Classroom, yard practice, and road training',
    credential: 'CDL Class A license eligibility upon completion',
    approvals: [
      'Workforce funding options may be available',
      'Employer reimbursement programs may apply',
    ],
    fundingOptions: [
      'Workforce funding options may be available',
      'Employer reimbursement programs may apply',
    ],
    highlights: [
      'High earning potential - start at $50k-$70k+ per year',
      'Extreme demand - trucking companies are desperate for qualified drivers',
      'Sign-on bonuses - many companies offer $5,000-$10,000 bonuses',
      'Excellent benefits - health insurance, retirement, paid time off',
      'Behind-the-wheel training with experienced professional drivers',
      'Job placement assistance - we connect you with hiring carriers',
      'Multiple career paths - local routes, regional, or long-haul',
      'Tuition reimbursement - many employers will pay back your training costs',
    ],
    whatYouLearn: [
      'Vehicle inspection and safety',
      'Backing, shifting, turning, and road maneuvers',
      'Trip planning and hours-of-service rules',
      'Transportation regulations',
      'Professional communication and job readiness',
    ],
    outcomes: [
      'CDL Class A or B Driver',
      'Local, regional, or dedicated routes',
      'Logistics and transportation support roles',
    ],
    requirements: [
      'Adults seeking high-earning roles',
      'Individuals interested in transportation careers',
      'Career changers needing a stable job pathway',
      'Students who want a quick employment route',
    ],
    ctaPrimary: {
      label: 'Apply for CDL Training',
      href: '/contact?topic=cdl',
    },
    ctaSecondary: {
      label: 'Request CDL Info Session',
      href: '/contact?topic=cdl',
    },
  },
  {
    slug: 'building-maintenance',
    name: '2Exclusive Apprenticeship Program - Sanitation & Infection Control',
    heroTitle:
      '2Exclusive Apprenticeship Program - Advanced Sanitation & Infection Control',
    heroSubtitle:
      'Specialized training for sanitation and infection control in high-risk environments: hospitals, military bases, and government facilities',
    shortDescription:
      'Hands-on apprenticeship in OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control for critical sectors',
    longDescription:
      'The 2Exclusive Apprenticeship Program is a specialized training initiative focused on equipping participants with the advanced skills required for sanitation and infection control in high-risk environments such as hospitals, military bases, and government facilities. This program offers hands-on experience and in-depth training in areas such as OSHA compliance, holistic wellness cleaning, hazardous waste management, and infection control protocols.\n\nApprentices will gain expertise in safely handling hazardous materials, implementing eco-friendly cleaning practices, and ensuring regulatory compliance, all while promoting healthier and safer environments. With a strong emphasis on both technical proficiency and holistic well-being, this apprenticeship prepares participants to meet the unique demands of critical sectors, ensuring a highly skilled workforce ready to tackle the challenges of modern sanitation and safety.\n\nAll faculty members possess at least three to five years of professional experience in military or institutional cleaning. Instructors hold valid safety and compliance certifications such as OSHA 10/30, HAZMAT, or Certified Environmental Technician credentials, and demonstrate strong expertise in infection control, regulatory compliance, and holistic wellness cleaning practices.\n\nCredentialing Partners:\n• CareerSafe - OSHA 10/30 Safety Certification (https://careersafeonline.com)\n• U.S. Department of Labor - OSHA Training (https://osha.gov)\n• Certified Environmental Technician Programs\n• HAZMAT Certification Bodies\n\nCIP Code: 15.0501 - Heating, Ventilation, Air Conditioning and Refrigeration Engineering Technology/Technician',
    heroImage: '/images/programs/building-maintenance-hero.jpg',
    heroImageAlt:
      'Sanitation technician in protective equipment working in healthcare facility',
    duration: 'Varies by apprenticeship track',
    schedule: 'Quarterly cohorts (January, April, July, October)',
    delivery: 'Hands-on apprenticeship with classroom instruction',
    credential:
      'OSHA 10/30, HAZMAT, Certified Environmental Technician, Infection Control Specialist',
    approvals: [
      'ETPL Approved',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 15.0501',
      'Registered Apprenticeship Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Employer-sponsored apprenticeship',
    ],
    highlights: [
      'Specialized training for high-risk environments',
      'OSHA 10/30 safety certifications',
      'HAZMAT and hazardous waste management',
      'Infection control protocols for hospitals and military',
      'Holistic wellness cleaning practices',
      'Eco-friendly and sustainable cleaning techniques',
      'Regulatory compliance expertise',
      'Quarterly cohort start dates',
      'Hands-on experience in critical sectors',
    ],
    whatYouLearn: [
      'OSHA compliance and workplace safety standards',
      'Infection control protocols and procedures',
      'Hazardous materials handling and disposal',
      'HAZMAT safety and emergency response',
      'Holistic wellness cleaning practices',
      'Eco-friendly and sustainable cleaning techniques',
      'Regulatory compliance for healthcare and government facilities',
      'Bloodborne pathogens and biohazard management',
      'Personal protective equipment (PPE) usage',
      'Documentation and reporting requirements',
    ],
    outcomes: [
      'Sanitation Specialist in hospitals and healthcare',
      'Military base environmental services',
      'Government facility cleaning and maintenance',
      'Infection control technician',
      'Environmental services supervisor',
      'HAZMAT response team member',
      'Certified Environmental Technician',
      'Average salary: $35,000-$55,000/year',
    ],
    requirements: [
      'High school diploma or equivalent required',
      'Willingness to learn infection control and sanitation procedures',
      'Interest in eco-friendly cleaning techniques',
      'Prior experience in janitorial, environmental services, or healthcare cleaning preferred but not required',
      'Background check required',
      'OSHA 10 or OSHA 30 certification completed during program',
      'Application deadline: Apply at least 30 days before desired start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact?topic=building-maintenance',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=building-maintenance',
    },
  },
  {
    slug: 'building-technician',
    name: 'Building Technician — Advanced Pathway',
    heroTitle: 'Building Technician — Advanced Pathway',
    heroSubtitle:
      'An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.',
    shortDescription:
      'An advanced pathway designed to build deeper technical skills for building operations, maintenance, and facility engineering.',
    longDescription:
      "The Building Technician program expands on core maintenance skills by introducing advanced diagnostics, building system operations, compliance, and preventative strategies. Ideal for individuals pursuing higher-skill roles or preparing for facility engineering pathways.\n\nWhat You'll Learn:\n- Advanced systems troubleshooting\n- Electrical and mechanical safety\n- Building automation basics\n- Documentation and compliance\n- Preventative maintenance strategies\n\nWho This Program Is For:\n- Students who completed Building Maintenance\n- Individuals wanting higher-skill trade roles\n- Adults preparing for facility engineering\n\nProgram Format:\n- Hybrid\n- Length: 12–20 weeks\n\nFunding & Approvals:\n- Workforce funding may be available\n\nCareer Outcomes:\n- Building Technician\n- Facilities Operations Specialist\n- Entry-Level Building Engineer",
    heroImage: 'https://i.imgur.com/rOagiKC.jpg',
    heroImageAlt: 'Building technician working on advanced facility systems',
    duration: '12–20 weeks',
    schedule: 'Day or evening options',
    delivery: 'Hybrid',
    credential: 'Building Technician certificate',
    approvals: ['Workforce funding may be available'],
    fundingOptions: ['Workforce funding may be available'],
    highlights: [
      'Advanced systems troubleshooting',
      'Building automation basics',
      'Documentation and compliance training',
      'Pathways to facility engineering',
    ],
    whatYouLearn: [
      'Advanced systems troubleshooting',
      'Electrical and mechanical safety',
      'Building automation basics',
      'Documentation and compliance',
      'Preventative maintenance strategies',
    ],
    outcomes: [
      'Building Technician',
      'Facilities Operations Specialist',
      'Entry-Level Building Engineer',
    ],
    requirements: [
      'Students who completed Building Maintenance',
      'Individuals wanting higher-skill trade roles',
      'Adults preparing for facility engineering',
    ],
    ctaPrimary: {
      label: 'Apply for Building Technician',
      href: '/contact?topic=building-technician',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=building-technician',
    },
  },
  {
    slug: 'workforce-readiness',
    name: 'Workforce Readiness (Youth & Adult)',
    heroTitle: 'Workforce Readiness (Youth & Adult)',
    heroSubtitle:
      'A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.',
    shortDescription:
      'A job-readiness program that builds the essential skills needed to succeed in employment, training, and career advancement.',
    longDescription:
      "The Workforce Readiness program prepares youth and adults with the communication, professionalism, and foundational skills needed for employment. Students learn how to communicate with employers, build resumes, interview confidently, and understand workplace expectations. This program supports success across all career and training pathways.\n\nWhat You'll Learn:\n- Professional communication\n- Resume and interview preparation\n- Workplace expectations and employer needs\n- Customer service and teamwork\n- Career and job search strategies\n\nWho This Program Is For:\n- Youth ages 16–24\n- Adults re-entering the workforce\n- Individuals preparing for training or employment\n- Students building confidence and communication\n\nProgram Format:\n- Classroom or hybrid\n- Length: 1–4 weeks\n\nCareer Outcomes:\n- Job-ready graduate prepared for employment\n- Stronger candidate for workforce training programs",
    heroImage: '/images/programs/workforce-readiness-hero.jpg',
    heroImageAlt: 'Workforce readiness training session',
    duration: '1–4 weeks',
    schedule: 'Flexible',
    delivery: 'Classroom or hybrid',
    credential: 'Workforce Readiness certificate',
    approvals: ['Available for youth and adult participants'],
    fundingOptions: ['Workforce funding may be available'],
    highlights: [
      'Professional communication skills',
      'Resume and interview preparation',
      'Workplace expectations training',
      'Career and job search strategies',
    ],
    whatYouLearn: [
      'Professional communication',
      'Resume and interview preparation',
      'Workplace expectations and employer needs',
      'Customer service and teamwork',
      'Career and job search strategies',
    ],
    outcomes: [
      'Job-ready graduate prepared for employment',
      'Stronger candidate for workforce training programs',
    ],
    requirements: [
      'Youth ages 16–24',
      'Adults re-entering the workforce',
      'Individuals preparing for training or employment',
      'Students building confidence and communication',
    ],
    ctaPrimary: {
      label: 'Apply for Workforce Readiness',
      href: '/contact?topic=workforce-readiness',
    },
    ctaSecondary: {
      label: 'Talk to a Career Coach',
      href: '/contact?topic=workforce-readiness',
    },
  },
  {
    slug: 'direct-support-professional',
    name: 'Direct Support Professional (DSP) Training',
    heroTitle: 'Direct Support Professional (DSP) Training Program',
    heroSubtitle:
      'Compassionate care training for meaningful work supporting individuals with developmental, physical, or emotional needs',
    shortDescription:
      'Hands-on DSP training with real-world scenarios preparing you for rewarding careers in behavioral health, direct support, and caregiving',
    longDescription:
      "Our Direct Support Professional (DSP) training program is built to prepare compassionate individuals for meaningful work in the care and support field. This program offers hands-on instruction, real-world scenarios, and practical skills that help students feel confident working with individuals who have developmental, physical, or emotional needs. Whether you're starting a new career or looking to grow in the healthcare field, this training gives you the tools to make a real difference in someone's life while also building a rewarding future for yourself.\n\nAll instructors possess a minimum of a High School Diploma or GED and have at least two years of hands-on experience in behavioral health, direct support, or caregiving. Preference is given to faculty with credentials such as Certified Direct Support Professional (CDSP), CNA licensure, QIDP designation, or completion of state-approved Train-the-Trainer programs. Faculty complete ongoing professional development annually.\n\nThis comprehensive program provides training in patient care, behavioral health support, person-centered planning, and professional communication. Students learn to work effectively with individuals with disabilities, mental health needs, and other support requirements in residential, community, and healthcare settings.\n\nCredentialing Partners:\n• National Alliance for Direct Support Professionals (NADSP) - CDSP Certification (https://nadsp.org)\n• Certified Community Healthcare Worker (CCHW) Programs\n• CPR/First Aid Certification Bodies\n• Rise Up - Career Readiness Certification (https://riseup.com)\n\nCIP Code: 51.0801 - Medical/Clinical Assistant",
    heroImage: '/images/programs/dsp-hero.jpg',
    heroImageAlt: 'Direct support professional providing compassionate care',
    duration: '21 days (3 weeks)',
    schedule: 'Cohorts start 1st and 15th of each month',
    delivery: 'Hands-on instruction with real-world scenarios',
    credential:
      'Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004639',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0801',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Employer-sponsored enrollment',
      'Self-Pay: $4,325',
    ],
    highlights: [
      'Certified Community Healthcare Worker (CCHW) credential',
      'CPR and First Aid certification',
      'Rise Up career readiness certificate',
      'Hands-on training with real-world scenarios',
      'Fast 21-day completion',
      'Cohorts start twice monthly (1st and 15th)',
      'Meaningful work supporting individuals with disabilities',
      'Pathways to behavioral health and healthcare careers',
    ],
    whatYouLearn: [
      'Person-centered care and support planning',
      'Working with individuals with developmental disabilities',
      'Behavioral health support techniques',
      'Communication and relationship building',
      'CPR and First Aid emergency response',
      'Medication administration basics',
      'Documentation and reporting',
      'Professional boundaries and ethics',
      'Crisis intervention and de-escalation',
      'Activities of daily living (ADL) assistance',
    ],
    outcomes: [
      'Direct Support Professional in residential settings',
      'Behavioral health support specialist',
      'Community support worker',
      'Personal care assistant',
      'Group home staff',
      'Day program facilitator',
      'Average salary: $30,000-$42,000/year',
      'Foundation for nursing or advanced healthcare careers',
    ],
    requirements: [
      '18 years or older',
      'High school diploma or GED',
      'Pass background check',
      'Reliable transportation encouraged',
      'No prior healthcare experience required',
      'Willingness to complete all required training hours',
      'Interest in supporting individuals with disabilities or behavioral health needs',
      'Legally authorized to work in the U.S.',
      'Application deadline: Apply at least 7 days before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=direct-support-professional',
    },
    price: 4325,
  },
  {
    slug: 'beauty-career-educator',
    name: 'Beauty and Career Educator Training',
    heroTitle: 'Beauty and Career Educator Training Program',
    heroSubtitle:
      '12-week hybrid program preparing aspiring beauty professionals and peer educators',
    shortDescription:
      'Comprehensive training combining salon services, peer teaching, entrepreneurship, and workforce readiness',
    longDescription:
      'The Beauty & Career Educator Training Program offered by Elevate for Humanity is a 12-week hybrid training experience designed to help aspiring beauty professionals and peer educators develop career-ready, technical, and leadership skills. This program includes practical salon service education (manicuring techniques, customer service, sanitation), instructional tools for peer teaching and community workshops, and a strong focus on entrepreneurship and workforce readiness.\n\nParticipants earn a nationally recognized Rise Up Credential (https://riseup.com), a Career Readiness Certificate, and a custom Certificate of Completion. Designed for youth and adults ages 16+, this program is aligned with workforce demand for independent contractors, salon educators, and business owners.\n\nCredentialing Partners:\n• Rise Up - Career Readiness Certification (https://riseup.com)\n• American Red Cross - CPR/First Aid (https://redcross.org)\n• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)\n\nCIP Code: 13.1319 - Technical Teacher Education',
    heroImage: '/images/programs/beauty-educator.jpg',
    heroImageAlt: 'Beauty educator training students in salon techniques',
    duration: '12 weeks (84 days)',
    schedule: 'Hybrid - Flexible scheduling with monthly/quarterly cohorts',
    delivery:
      'Hybrid - Online coursework + In-person practical training and workshops',
    credential:
      'Rise Up Credential, Career Readiness Certificate, CPR/First Aid, OSHA 10, Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004648',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 13.1319',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,730',
    ],
    highlights: [
      'Nationally recognized Rise Up Credential',
      'CPR/First Aid and OSHA 10 certifications',
      'Practical salon service education (manicuring, customer service, sanitation)',
      'Peer teaching and community workshop skills',
      'Entrepreneurship and business ownership training',
      'Career readiness and workforce development',
      'Rolling admissions - start year-round',
    ],
    whatYouLearn: [
      'Manicuring techniques and nail care services',
      'Customer service excellence in salon settings',
      'Infection control and sanitation protocols',
      'Peer teaching and instructional methods',
      'Community workshop facilitation',
      'CPR and First Aid emergency response',
      'OSHA 10 workplace safety standards',
      'Entrepreneurship and business planning',
      'Career development and workforce readiness',
      'Leadership and mentorship skills',
    ],
    outcomes: [
      'Independent contractor in beauty services',
      'Salon educator and trainer',
      'Beauty business owner',
      'Peer educator and community workshop facilitator',
      'Career coach in beauty industry',
      'Average salary: $35,000-$55,000/year',
      'Flexible self-employment opportunities',
    ],
    requirements: [
      'At least 16 years of age',
      'High school diploma, GED, or equivalent',
      'Youth applicants may enroll with parental/guardian permission and school approval',
      'No prior nail or beauty experience required',
      'Complete brief orientation and program readiness screening',
      'Application deadline: Rolling admissions (apply at least 2 weeks before start date for priority consideration)',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=beauty-educator',
    },
    price: 4730,
  },
  {
    slug: 'business-startup-marketing',
    name: 'Business Start-up & Marketing',
    heroTitle: 'Business Start-up & Marketing Program with Rise Forward',
    heroSubtitle:
      '5-week intensive program to launch your business with mentorship, stipend, and laptop kit',
    shortDescription:
      'Hands-on entrepreneurship training with LLC formation, digital marketing, and real-world startup support',
    longDescription:
      "The Business Start-Up & Marketing Program with Rise Forward equips participants with hands-on skills to launch their own business ventures. Students will learn the fundamentals of entrepreneurship, digital marketing, LLC formation, business planning, customer service, and resume development. The program includes guided startup support, mentorship, and ends with a business match stipend and laptop kit to empower real-world implementation. Ideal for youth ready to explore self-employment and leadership pathways in today's economy.\n\nIn just 5 weeks, you'll gain industry-recognized certifications in retail operations and marketing, learn how to create a business plan, develop marketing strategies, form an LLC, and build your professional image and online presence. This program is designed for aspiring entrepreneurs ages 16+ who want to launch their own business or advance in retail management.\n\nCredentialing Partners:\n• National Retail Federation (NRF) - Business of Retail Certified Specialist (https://nrf.com)\n• National Retail Federation (NRF) - Retail Industry Fundamentals Specialist (https://nrf.com)\n• Rise Forward Foundation - Business Development Support (https://riseforwardfoundation.org)\n\nProgram Benefits:\n• Business match stipend upon completion\n• Laptop kit for business operations\n• One-on-one mentorship\n• LLC formation guidance\n• Professional resume development\n\nCIP Code: 52.0701 - Entrepreneurship/Entrepreneurial Studies",
    heroImage: '/images/programs/business-startup.jpg',
    heroImageAlt: 'Young entrepreneur planning business strategy',
    duration: '5 weeks',
    schedule: 'Quarterly cohorts - Flexible scheduling options',
    delivery: 'Hybrid - Online coursework + In-person workshops and mentorship',
    credential:
      'Business of Retail Certified Specialist (NRF), Retail Industry Fundamentals Specialist (NRF), Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004645',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 52.0701',
      'Rise Forward Partnership',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,550',
      'Includes business match stipend and laptop kit',
    ],
    highlights: [
      'Industry-recognized NRF retail certifications',
      'LLC formation and business registration',
      'Digital marketing and social media strategies',
      'Business match stipend upon completion',
      'Free laptop kit for business operations',
      'One-on-one mentorship and startup support',
      'Resume and professional image development',
      'Fast 5-week completion',
    ],
    whatYouLearn: [
      'Business planning and strategy development',
      'LLC formation and business registration',
      'Retail operations and management',
      'Digital marketing fundamentals',
      'Social media marketing and content creation',
      'Customer service excellence',
      'Financial planning and budgeting',
      'Sales techniques and customer acquisition',
      'Resume building and professional branding',
      'Online presence and website basics',
    ],
    outcomes: [
      'Launch your own business with LLC',
      'Retail management positions',
      'Marketing coordinator roles',
      'Small business owner/entrepreneur',
      'E-commerce business operator',
      'Average salary: $35,000-$60,000/year',
      'Self-employment income potential varies',
    ],
    requirements: [
      'Ages 16 and up',
      'No previous business experience required',
      'Basic reading and writing skills',
      'Comfortable using a computer',
      'Entrepreneurial mindset and eagerness to learn',
      'Complete short intake interview',
      'Application deadline: Apply at least 2 weeks before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=business-startup',
    },
    price: 4550,
  },
  {
    slug: 'emergency-health-safety-tech',
    name: 'Emergency Health & Safety Technician',
    heroTitle: 'Emergency Health & Safety Technician Registered Apprenticeship',
    heroSubtitle:
      '4-week hybrid program preparing life-saving responders for schools, workplaces, and emergency settings',
    shortDescription:
      'Comprehensive training with CPR/AED, First Aid, EMR, and OSHA 10 certifications for healthcare and public safety careers',
    longDescription:
      "The Emergency Health and Safety Technician Registered Apprenticeship program prepares individuals for life-saving response roles in schools, workplaces and emergency settings. This hybrid training includes CPR/AED, First Aid, OSHA-aligned safety education, and public health emergency awareness. Students graduate with nationally recognized certifications and are equipped for careers in healthcare, public safety, community response, and entry-level emergency technician pathways.\n\nIn just 4 weeks, you'll earn multiple industry-recognized certifications including Emergency Medical Responder (EMR), CPR/AED, First Aid, and OSHA 10. This fast-paced program combines classroom instruction with hands-on emergency response training, preparing you to save lives and ensure workplace safety.\n\nAll instructors hold CPR/AED & First Aid Instructor certification from the American Heart Association, Red Cross, or equivalent nationally recognized body. Instructors have a minimum of 2 years of experience in occupational safety, healthcare, or public safety.\n\nCredentialing Partners:\n• American Heart Association (AHA) - CPR/AED/First Aid (https://cpr.heart.org)\n• American Red Cross - CPR/AED/First Aid (https://redcross.org)\n• National Registry of Emergency Medical Technicians (NREMT) - EMR Certification (https://nremt.org)\n• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)\n\nCIP Code: 51.0999 - Allied Health Diagnostic, Intervention, and Treatment Professions",
    heroImage: '/images/programs/emergency-health.jpg',
    heroImageAlt: 'Emergency medical responder providing care',
    duration: '4 weeks',
    schedule: 'Monthly cohorts - Full-time intensive',
    delivery: 'Hybrid - Online theory + In-person hands-on skills training',
    credential:
      'Emergency Medical Responder (EMR), CPR/AED/First Aid, OSHA 10 - Career Safe',
    approvals: [
      'ETPL Approved - Program ID #10004621',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0999',
      'Registered Apprenticeship Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,950',
    ],
    highlights: [
      'Registered Apprenticeship program',
      'Emergency Medical Responder (EMR) certification',
      'CPR/AED and First Aid certified',
      'OSHA 10 workplace safety certification',
      'Public health emergency awareness training',
      'Fast 4-week completion',
      'Monthly cohort start dates',
      'High-demand career field',
      'Pathways to healthcare and public safety careers',
    ],
    whatYouLearn: [
      'Emergency medical response procedures',
      'CPR and AED operation for all ages',
      'First aid and trauma care',
      'Patient assessment and triage',
      'OSHA 10 workplace safety standards',
      'Emergency scene management and safety',
      'Public health emergency response',
      'Medical terminology and documentation',
      'Communication with EMS professionals',
      'Infection control and bloodborne pathogens',
    ],
    outcomes: [
      'Emergency Medical Responder (EMR)',
      'School safety coordinator',
      'Workplace safety officer',
      'First responder positions',
      'Community health worker',
      'Security and safety roles',
      'Entry-level emergency technician',
      'Healthcare support positions',
      'Average salary: $35,000-$45,000/year',
    ],
    requirements: [
      'High school diploma or GED required for national certification',
      '18 years or older',
      'Able to read and follow written and verbal instructions',
      'Physical ability to perform emergency response duties',
      'No previous medical training required',
      'Background check required',
      'Application deadline: Apply 2 weeks prior to preferred start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=emergency-health-safety',
    },
    price: 4950,
  },
  {
    slug: 'home-health-aide',
    name: 'Home Health Aide Certification',
    heroTitle: 'Home Health Aide Certification Program',
    heroSubtitle: '4-week program to become a certified Home Health Aide',
    shortDescription:
      'Comprehensive training for in-home patient care with HHA licensure and CPR certification',
    longDescription:
      "The Home Health Aide Certification program prepares you to provide compassionate, professional care to patients in their homes. In 4 weeks, you'll earn your Home Health Aide (HHA) license, Certified Community Healthcare Worker (CCHW) certification, CPR certification, and Rise Up career readiness credentials. This program includes OSHA-compliant safety training through CareerSafe, covering bloodborne pathogens, infection control, and patient safety. This comprehensive training combines medical knowledge with practical caregiving skills, preparing you for a rewarding career helping those who need it most.",
    heroImage: '/images/programs/home-health-aide.jpg',
    heroImageAlt: 'Home health aide caring for patient',
    duration: '4 weeks',
    schedule: 'Full-time or Part-time options available',
    delivery: 'Hybrid - Online coursework + In-person clinical training',
    credential:
      'Home Health Aide (HHA) License, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004626',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,700',
    ],
    highlights: [
      'Home Health Aide state licensure',
      'Certified Community Healthcare Worker',
      'CPR certified',
      'Rise Up career readiness',
      'Fast 4-week completion',
      'High-demand career',
    ],
    whatYouLearn: [
      'Patient care and assistance',
      'Vital signs monitoring',
      'Medication reminders',
      'Personal hygiene assistance',
      'Meal preparation and nutrition',
      'Mobility and transfer techniques',
      'CPR and First Aid',
      'Documentation and reporting',
      'Communication with healthcare teams',
    ],
    outcomes: [
      'Home Health Aide positions',
      'In-home care provider',
      'Senior care facilities',
      'Hospice care roles',
      'Average salary: $28,000-$38,000/year',
      'Flexible scheduling options',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Immunizations required',
      'Compassionate and patient demeanor',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=home-health-aide',
    },
    price: 4700,
  },
  {
    slug: 'esthetician-apprenticeship',
    name: 'Esthetician Apprenticeship',
    heroTitle:
      'Indiana Esthetician Apprenticeship - Licensed Esthetician Training',
    heroSubtitle:
      'Become a licensed esthetician through on-the-job training at a spa or salon. Unlike the barber apprenticeship, esthetician apprenticeships in Indiana require partnership with a licensed cosmetology school.',
    shortDescription:
      'Earn your Indiana esthetician license through apprenticeship. Work at a spa/salon while completing required instruction hours through a partnered cosmetology school. Different requirements than barber apprenticeship.',
    longDescription:
      "The Esthetician Apprenticeship in Indiana requires partnership with a licensed cosmetology school. Unlike the barber apprenticeship, you cannot complete this independently through a spa alone.\n\nProgram Structure:\n- 700 total hours required for Indiana esthetician license\n- Split between classroom instruction and practical training\n- Must be coordinated by licensed cosmetology school\n- School arranges spa/salon placement\n\nWhat You'll Learn:\n- Skin anatomy and physiology\n- Facial treatments and techniques\n- Hair removal (waxing, threading)\n- Makeup application\n- Sanitation and safety protocols\n- Indiana laws and regulations\n- Client consultation\n- Business and professional ethics\n\nWho This Program Is For:\n- Individuals interested in skincare careers\n- Those seeking beauty industry opportunities\n- Adults wanting flexible, creative work\n- Career changers interested in wellness\n\nProgram Format:\n- Enroll in licensed Indiana cosmetology school\n- School coordinates apprenticeship placement\n- Classroom instruction at school\n- Practical training at approved spa/salon\n- Duration: 6-12 months\n\nFunding & Approvals:\n- WIOA Funding (covers tuition)\n- Workforce Ready Grant\n- JRI Funding for Justice-Involved Individuals\n- Federal Student Aid (FAFSA)\n- School payment plans\n\nImportant Notes:\n- Most apprentices are students, not employees\n- Tuition typically $5,000-$12,000 (can be fully funded)\n- Most spas do not pay wages during training\n- Different from barber apprenticeship employment model\n\nCareer Outcomes:\n- Licensed Esthetician\n- Spa/salon esthetician\n- Medical spa technician\n- Skincare specialist\n- Earning potential: $30,000-$50,000+ per year",
    heroImage: '/images/programs/esthetician-apprentice.jpg',
    heroImageAlt:
      'Esthetician apprentice performing facial treatment under supervision',
    duration: '700 hours (6-12 months depending on schedule)',
    schedule: 'Varies by school and spa partnership',
    delivery:
      'Hybrid: Classroom instruction at school + Practical training at spa/salon',
    credential: 'Indiana Licensed Esthetician (upon passing state board exam)',
    approvals: [
      'Must be coordinated by Indiana-licensed cosmetology school',
      'Indiana State Board of Cosmetology approved',
      'WIOA Eligible (for tuition)',
      'Workforce Ready Grant Eligible (for tuition)',
    ],
    fundingOptions: [
      'WIOA Funding (covers tuition)',
      'Workforce Ready Grant (covers tuition)',
      'Federal Student Aid (if school accepts FAFSA)',
      'School payment plans',
    ],
    highlights: [
      'Earn Indiana esthetician license through apprenticeship',
      'Work at real spa/salon while training',
      'Must partner with licensed cosmetology school',
      'Different from barber apprenticeship (school required)',
      '700 hours total training',
      'Funding available through WIOA and WRG',
      'Licensed supervision required',
      'Graduate eligible for state board exam',
    ],
    whatYouLearn: [
      'Skin anatomy and physiology',
      'Facial treatments and procedures',
      'Hair removal techniques (waxing, threading)',
      'Makeup application',
      'Sanitation and infection control',
      'Client consultation and communication',
      'Indiana esthetician laws and regulations',
      'Business and professional ethics',
      'Product knowledge and retail sales',
      'Spa operations and customer service',
    ],
    outcomes: [
      'Licensed Esthetician in Indiana',
      'Spa esthetician',
      'Salon skincare specialist',
      'Medical spa esthetician',
      'Mobile esthetician (self-employed)',
      'Skincare product sales',
      'Average salary: $30,000-$50,000/year',
      'Self-employment potential',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Enroll in Indiana-licensed cosmetology school',
      'School arranges apprenticeship placement',
      'Complete 700 hours (classroom + practical)',
      'Pass Indiana State Board esthetician exam',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact?topic=esthetician-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact',
    },
  },
  {
    slug: 'nail-technician-apprenticeship',
    name: 'Nail Technician Apprenticeship',
    heroTitle:
      'Indiana Nail Technician Apprenticeship - Licensed Manicurist Training',
    heroSubtitle:
      'Become a licensed nail technician through on-the-job training at a salon. Like esthetician apprenticeship, nail tech apprenticeships in Indiana require partnership with a licensed cosmetology school.',
    shortDescription:
      'Earn your Indiana nail technician license through apprenticeship. Work at a salon while completing required instruction hours through a partnered cosmetology school. WIOA funding covers instructional costs.',
    longDescription:
      "The Nail Technician Apprenticeship in Indiana requires partnership with a licensed cosmetology school. Similar to esthetician apprenticeships, you cannot complete this independently through a salon alone.\n\nProgram Structure:\n- 450 total hours required for Indiana nail technician license\n- Split between classroom instruction and practical training\n- Must be coordinated by licensed cosmetology school\n- School arranges salon placement\n\nWhat You'll Learn:\n- Manicure and pedicure techniques\n- Nail art and design\n- Acrylic and gel applications\n- Nail health and disorders\n- Sanitation and infection control\n- Indiana laws and regulations\n- Client consultation\n- Business and professional practices\n\nWho This Program Is For:\n- Individuals interested in nail care careers\n- Those seeking beauty industry opportunities\n- Adults wanting creative, flexible work\n- Career changers interested in personal services\n\nProgram Format:\n- Enroll in licensed Indiana cosmetology school\n- School coordinates apprenticeship placement\n- Classroom instruction at school\n- Practical training at approved salon\n- Duration: 4-8 months\n\nFunding & Approvals:\n- WIOA Funding (covers tuition)\n- Workforce Ready Grant\n- JRI Funding for Justice-Involved Individuals\n- Federal Student Aid (FAFSA)\n- School payment plans\n\nImportant Notes:\n- Most apprentices are students, not employees\n- Tuition typically $3,000-$8,000 (can be fully funded)\n- Most salons do not pay wages during training\n- Different from barber apprenticeship employment model\n\nCareer Outcomes:\n- Licensed Nail Technician\n- Salon nail technician\n- Spa nail specialist\n- Mobile nail services\n- Salon owner/booth renter\n- Earning potential: $25,000-$45,000+ per year",
    heroImage: '/images/programs/nail-tech-apprentice.jpg',
    heroImageAlt:
      'Nail technician apprentice performing manicure under supervision',
    duration: '450 hours (4-8 months depending on schedule)',
    schedule: 'Varies by school and salon partnership',
    delivery:
      'Hybrid: Classroom instruction at school + Practical training at salon',
    credential:
      'Indiana Licensed Nail Technician (upon passing state board exam)',
    approvals: [
      'Must be coordinated by Indiana-licensed cosmetology school',
      'Indiana State Board of Cosmetology approved',
      'WIOA Eligible (for tuition)',
      'Workforce Ready Grant Eligible (for tuition)',
    ],
    fundingOptions: [
      'WIOA Funding (covers tuition)',
      'Workforce Ready Grant (covers tuition)',
      'JRI Funding (for justice-involved individuals)',
      'Federal Student Aid (if school accepts FAFSA)',
    ],
    highlights: [
      'Earn Indiana nail technician license through apprenticeship',
      'Work at real salon while training',
      'Must partner with licensed cosmetology school',
      'Different from barber apprenticeship (school required)',
      '450 hours total training (shorter than esthetician)',
      'WIOA or WRG covers 100% of tuition',
      'Licensed supervision required',
      'Graduate eligible for state board exam',
    ],
    whatYouLearn: [
      'Nail anatomy and physiology',
      'Manicure and pedicure techniques',
      'Nail enhancements (acrylics, gels, tips)',
      'Nail art and design',
      'Sanitation and infection control',
      'Client consultation and communication',
      'Indiana nail technician laws and regulations',
      'Business and professional ethics',
      'Product knowledge and retail sales',
      'Salon operations and customer service',
    ],
    outcomes: [
      'Licensed Nail Technician in Indiana',
      'Salon nail technician',
      'Spa nail specialist',
      'Mobile nail technician (self-employed)',
      'Nail art specialist',
      'Nail product sales',
      'Average salary: $25,000-$45,000/year',
      'Self-employment potential',
    ],
    requirements: [
      'At least 17 years old',
      'High school diploma or GED',
      'Enroll in Indiana-licensed cosmetology school',
      'School arranges apprenticeship placement',
      'Complete 450 hours (classroom + practical)',
      'Pass Indiana State Board nail technician exam',
    ],
    ctaPrimary: {
      label: 'Contact Us',
      href: '/contact?topic=nail-technician-apprenticeship',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact',
    },
  },
  {
    slug: 'professional-esthetician',
    name: 'Esthetics and Skincare Specialist Certificate',
    heroTitle: 'Esthetics and Skincare Specialist Certificate Program',
    heroSubtitle:
      '5-week accelerated non-licensure training for job-ready skills in the high-demand personal care industry',
    shortDescription:
      'Comprehensive skincare training with hands-on practice, business startup support, and career readiness for spas, salons, and mobile beauty services',
    longDescription:
      "The Esthetics and Skincare Specialist Certificate Program prepares individuals to enter the high-demand personal care industry with job-ready skills in skin analysis, facial treatments, hair removal, sanitation, customer service, and product knowledge. This comprehensive non-licensure training blends hands-on instruction with theory-based modules, empowering students to build confidence in a professional spa setting. This course also offers traditional wrap-around support including career readiness, business startup training, wellness coaching and access to employer networks.\n\nParticipants gain practical experience through simulated treatments using industry-standard tools and techniques, including exfoliation, hydration, facial massage, brow shaping, and makeup fundamentals. The program emphasizes infection control, client communication, and proper documentation, aligned with industry expectations. Career readiness, digital professionalism, and entrepreneurship fundamentals are also integrated to support students' long-term success in both employment and independent service delivery.\n\nInstructors must have a minimum of 2 years of industry experience in esthetics, skincare services, or cosmetic therapy. While state licensure is not required for this non-licensure certificate program, preference is given to instructors who hold certifications in esthetics, dermatological skincare, or equivalent areas. Faculty demonstrate experience in adult learning, virtual instruction, and hands-on practical training.\n\nThis program is ideal for individuals seeking a flexible, accelerated pathway to employment in spas, salons, medi-aesthetic offices, or mobile beauty services. Upon completion, graduates receive a Certificate of Completion, qualify for placement support, and may pursue advanced or specialized training, apprenticeships, or entrepreneurial ventures.\n\nCredentialing Partners:\n• National Retail Federation (NRF) - Business of Retail Certified Specialist (https://nrf.com)\n• National Retail Federation (NRF) - Customer Service and Sales Certified Specialist (https://nrf.com)\n• CareerSafe - OSHA 10 Safety Certification (https://careersafeonline.com)\n\nCIP Code: 12.0409 - Aesthetician/Esthetician and Skin Care Specialist",
    heroImage: '/images/programs/esthetician.jpg',
    heroImageAlt: 'Esthetician performing professional facial treatment',
    duration: '5 weeks',
    schedule: 'Monthly enrollment - Flexible hybrid scheduling',
    delivery:
      'Hybrid - Theory-based online modules + Hands-on practical training',
    credential:
      'Certificate of Completion, Business of Retail Certified Specialist (NRF), Customer Service and Sales Certified Specialist (NRF), OSHA 10',
    approvals: [
      'ETPL Approved - Program ID #10004628',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 12.0409',
      'Non-Licensure Certificate Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,575',
    ],
    highlights: [
      'Non-licensure certificate program - no state license required',
      'Hands-on practice with industry-standard tools',
      'NRF retail and customer service certifications',
      'OSHA 10 workplace safety certification',
      'Business startup training and entrepreneurship support',
      'Career readiness and digital professionalism',
      'Wellness coaching and wrap-around support',
      'Access to employer networks and placement support',
      'Fast 5-week completion',
      'Monthly enrollment opportunities',
    ],
    whatYouLearn: [
      'Skin analysis and assessment techniques',
      'Facial treatments and procedures',
      'Exfoliation and hydration techniques',
      'Facial massage and lymphatic drainage',
      'Hair removal (waxing, tweezing, brow shaping)',
      'Makeup fundamentals and application',
      'Infection control and sanitation protocols',
      'Client consultation and communication',
      'Product knowledge and recommendations',
      'Retail operations and sales techniques',
      'Customer service excellence',
      'OSHA workplace safety standards',
      'Business startup and entrepreneurship basics',
      'Digital professionalism and online presence',
      'Proper documentation and record keeping',
    ],
    outcomes: [
      'Esthetician in spas and salons',
      'Skincare specialist in medi-aesthetic offices',
      'Mobile beauty service provider',
      'Retail beauty consultant',
      'Spa treatment specialist',
      'Independent skincare entrepreneur',
      'Beauty product sales representative',
      'Average salary: $30,000-$50,000/year plus commissions',
      'Self-employment income potential varies',
    ],
    requirements: [
      'At least 16 years old',
      'High school diploma or equivalent',
      'Strong interest in skincare, wellness, or beauty industry',
      'No prior licensure required',
      'Basic reading comprehension and computer literacy',
      'Ability to access hybrid online modules',
      'Interview may be required to assess program readiness',
      'Application deadline: Apply at least 2 weeks before next session',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=esthetician',
    },
    price: 4575,
  },
  {
    slug: 'peer-recovery-coach',
    name: 'Public Safety Reentry Specialist',
    heroTitle: 'Public Safety Reentry Specialist Program',
    heroSubtitle:
      '45-day inclusive program for peer support, recovery coaching, and reentry navigation - welcoming all backgrounds',
    shortDescription:
      'Accessible training for justice-involved individuals, career changers, and those with lived experience to become certified peer recovery coaches',
    longDescription:
      "The Public Safety Reentry Specialist Program prepares you to support individuals reentering society after incarceration or overcoming substance use challenges. In 45 days, you'll earn multiple certifications including Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, and Rise Up career readiness. This program combines lived experience with professional training to help you make a meaningful impact in your community.\n\nThis program is designed to be inclusive and accessible to all learners—regardless of age, background, or education level. It welcomes youth ages 16+, adults seeking career change, justice-involved individuals reentering the workforce, and those receiving support through SNAP, WIOA, or other public assistance programs. No prior credential or diploma is required for enrollment. We provide built-in support, including tutoring, digital literacy training, and guided instruction to ensure all participants have the tools they need to succeed.\n\nInstructors hold Certified Peer Recovery Specialist (CPRS) credentials or equivalent, with subject matter experience in reentry, public safety, peer navigation, or crisis response. Program leadership holds credentials in trauma-informed coaching, CPR/AED instruction, and lived-experience mentorship for justice-impacted individuals.\n\nCredentialing Partners:\n• Indiana Certification Board (ICB) - Certified Peer Recovery Coach (CPRC) (https://indianacertificationboard.org)\n• National Alliance of Peer Specialists - Certified Peer Support Professional (https://na4ps.org)\n• Certified Community Healthcare Worker (CCHW) Programs\n• American Heart Association - CPR/AED (https://cpr.heart.org)\n• Rise Up - Career Readiness Certification (https://riseup.com)\n\nCIP Code: 43.0112 - Securities Services Administration/Management",
    heroImage: '/images/programs/peer-recovery.jpg',
    heroImageAlt: 'Peer recovery coach providing support and mentorship',
    duration: '45 days (6-7 weeks)',
    schedule: 'Year-round enrollment - First come, first served',
    delivery:
      'Hybrid - Online coursework + In-person training with built-in support',
    credential:
      'Certified Peer Recovery Coach (CPRC), Certified Peer Support Professional, Certified Community Healthcare Worker (CCHW), CPR, Rise Up Certificate',
    approvals: [
      'ETPL Approved - Program ID #10004666',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'SNAP Eligible',
      'CIP Code: 43.0112',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'SNAP Support',
      'Public Assistance Programs',
      'Self-Pay: $4,750',
    ],
    highlights: [
      'Inclusive and accessible to all backgrounds',
      'No prior credential or diploma required',
      'Built-in support: tutoring, digital literacy, guided instruction',
      'Certified Peer Recovery Coach (CPRC) credential',
      'Certified Peer Support Professional',
      'Community Healthcare Worker (CCHW) certification',
      'CPR and Rise Up certifications',
      'Trauma-informed coaching approach',
      'Lived-experience mentorship',
      'Year-round enrollment',
      'Justice-involved individuals welcome',
    ],
    whatYouLearn: [
      'Peer support principles and ethics',
      'Recovery coaching techniques',
      'Trauma-informed care and crisis response',
      'Reentry navigation and public safety',
      'Crisis intervention and de-escalation',
      'Community healthcare navigation',
      'CPR and First Aid emergency response',
      'Case management basics',
      'Motivational interviewing',
      'Resource coordination and advocacy',
      'Professional boundaries and self-care',
      'Documentation and confidentiality',
    ],
    outcomes: [
      'Certified Peer Recovery Coach',
      'Public safety reentry specialist',
      'Community healthcare worker',
      'Peer support specialist',
      'Substance use counselor assistant',
      'Case management support',
      'Crisis response team member',
      'Reentry navigator',
      'Average salary: $35,000-$48,000/year',
    ],
    requirements: [
      'Ages 16+ welcome',
      'No prior credential or diploma required',
      'Open to justice-involved individuals reentering workforce',
      'Open to SNAP, WIOA, and public assistance recipients',
      'Lived experience with recovery or reentry valued',
      'Commitment to helping others',
      'Background check required',
      'Stable in recovery (if applicable)',
      'Built-in support provided: tutoring, digital literacy, guided instruction',
      'Application deadline: Year-round enrollment, first come first served',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=peer-recovery',
    },
    price: 4750,
  },
  {
    slug: 'tax-prep-financial-services',
    name: 'Tax Preparation & Financial Services Certificate',
    heroTitle: 'Tax Preparation & Financial Services Certificate Program',
    heroSubtitle:
      'Start your own tax business or work for a firm in just 10 weeks. Get IRS VITA/TCE certified, learn QuickBooks and Microsoft 365, and gain real experience preparing taxes at an IRS-approved site. Earn $40,000-$60,000+ per year during tax season, with flexibility to work year-round or seasonally.',
    shortDescription:
      'Start your own tax business or work for a firm in just 10 weeks. Get IRS VITA/TCE certified, learn QuickBooks and Microsoft 365, and gain real experience preparing taxes at an IRS-approved site. Earn $40,000-$60,000+ per year during tax season, with flexibility to work year-round or seasonally.',
    longDescription:
      "The Tax Preparation & Financial Services Certificate prepares individuals to understand federal and state taxation concepts and apply them in real-world settings. Participants complete training in tax law, return preparation, bookkeeping, and financial literacy, culminating in the IRS VITA/TCE certification. The program combines classroom instruction, online modules, and supervised practicum hours at an IRS-approved VITA site. Graduates gain the skills required for employment as Tax Preparers, Bookkeeping Assistants, and Financial Service Specialists in both private and community-based environments.\n\nThrough the IRS Link & Learn platform and Elevate for Humanity's financial training curriculum, students master key competencies in individual taxation, ethics, client intake, and electronic filing, while also building transferable skills in business communication, budgeting, and entrepreneurship.\n\nElevate for Humanity is an IRS VITA/TCE Approved Site, Indiana ETPL Approved Training Provider, SAM.gov Active Entity, E-Verify Employer, and Authorized IRS e-file provider. All instructors hold a 2-year degree from a credentialed institution or 2 years of relevant experience in tax preparation or financial services.\n\nCredentialing Partners:\n• Internal Revenue Service (IRS) - VITA/TCE Certification (https://irs.gov/vita)\n• IRS Link & Learn Taxes Platform (https://apps.irs.gov/app/vita/)\n• Intuit - QuickBooks Pro Advisor (https://quickbooks.intuit.com/accountants/)\n• Microsoft - Microsoft 365 Fundamentals (https://microsoft.com/learn)\n• Rise Up - Career Readiness Certification (https://riseup.com)\n\nCIP Code: 52.0302 - Accounting Technology/Technician and Bookkeeping",
    heroImage: '/images/programs/tax-prep.jpg',
    heroImageAlt: 'Tax preparer assisting client with tax return',
    duration: '10 weeks',
    schedule:
      'Seasonal cohorts: November, January, March (aligned with tax season)',
    delivery:
      'Hybrid - Classroom instruction + Online IRS modules + Supervised practicum at IRS-approved VITA site',
    credential:
      'IRS VITA/TCE Certification, QuickBooks Pro Advisor, Microsoft 365 Fundamentals, Rise Up Certificate, Certificate of Completion',
    approvals: [
      'ETPL Approved - Program ID #10004627',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'IRS VITA/TCE Approved Site',
      'SAM.gov Active Entity',
      'Authorized IRS e-file Provider',
      'CIP Code: 52.0302',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $4,750',
    ],
    highlights: [
      'IRS VITA/TCE certification',
      'Supervised practicum at IRS-approved VITA site',
      'IRS Link & Learn platform training',
      'QuickBooks Pro Advisor certification',
      'Microsoft 365 Fundamentals certification',
      'Rise Up career readiness certificate',
      'Authorized IRS e-file provider training',
      'Real-world tax preparation experience',
      'Business communication and entrepreneurship skills',
      'Seasonal cohorts aligned with tax season',
      'Year-round and seasonal employment opportunities',
    ],
    whatYouLearn: [
      'Federal and state tax law and regulations',
      'Individual tax return preparation',
      'IRS Link & Learn Taxes platform',
      'Client intake and interview techniques',
      'Electronic filing (e-file) procedures',
      'Tax ethics and professional standards',
      'QuickBooks accounting software',
      'Microsoft 365 applications (Excel, Word, Outlook)',
      'Bookkeeping and financial record keeping',
      'Financial literacy and budgeting',
      'Business communication skills',
      'Entrepreneurship fundamentals',
      'Client consultation and service',
    ],
    outcomes: [
      'IRS VITA/TCE certified tax preparer',
      'Tax preparation specialist',
      'Bookkeeping assistant',
      'Financial services representative',
      'Accounting technician',
      'Start your own tax preparation business',
      'Community-based tax preparer',
      'Average salary: $35,000-$55,000/year',
      'Seasonal income potential: $15,000-$30,000 during tax season',
    ],
    requirements: [
      '18 years or older',
      'High school diploma or equivalent preferred',
      'Basic reading, writing, and computer skills',
      'Complete short intake interview',
      'Pass basic math and reading assessment',
      'No prior tax experience required',
      'Application deadline: Apply at least 1 week before cohort start date',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=tax-prep',
    },
    price: 4750,
  },
  {
    slug: 'cpr-certification',
    name: 'CPR, AED & First Aid Certification',
    heroTitle: 'CPR, AED & First Aid Certification',
    heroSubtitle:
      'One-day hands-on training to earn your American Heart Association CPR certification',
    shortDescription:
      'Essential life-saving skills training with AHA CPR card valid for 2 years',
    longDescription:
      "This hands-on CPR Certification course provides participants with essential life-saving skills through instructor-led training in adult, child, and infant CPR, AED usage, and basic first aid. Students will practice on industry-approved equipment and complete the course with an American Heart Association (or equivalent) CPR card valid for two years. This one-day, in-person program is ideal for aspiring healthcare workers, caregivers, and anyone seeking life-saving credentials.\n\nAll instructors are certified American Heart Association (AHA) BLS Instructors or equivalent through nationally recognized organizations such as the Red Cross. Instructors maintain current credentials and hands-on skills testing ability in compliance with training center protocols.\n\nThis certification is required for many healthcare positions and is valuable for anyone who wants to be prepared to respond in an emergency. The course combines video instruction, hands-on practice, and skills testing to ensure you're confident and competent in performing CPR and using an AED.\n\nCredentialing Partners:\n• American Heart Association (AHA) - CPR/AED/First Aid Certification (https://cpr.heart.org)\n• American Red Cross - CPR/AED/First Aid Certification (https://redcross.org)\n\nCIP Code: 51.0810 - Emergency Care Attendant (EMT Ambulance)",
    heroImage: '/images/programs/cpr-certification.jpg',
    heroImageAlt: 'Student practicing CPR on training manikin',
    duration: '1 day (4-6 hours)',
    schedule: 'Multiple dates available monthly - Rolling admissions',
    delivery: 'In-person hands-on training',
    credential:
      'American Heart Association CPR/AED/First Aid Certification (valid 2 years)',
    approvals: [
      'ETPL Approved - Program ID #10004674',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.0810',
      'AHA Training Center',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $575',
    ],
    highlights: [
      'American Heart Association certification',
      'Valid for 2 years',
      'One-day completion',
      'Hands-on practice with industry equipment',
      'Adult, child, and infant CPR training',
      'AED usage and basic first aid',
      'Required for many healthcare jobs',
      'Certified AHA instructors',
    ],
    whatYouLearn: [
      'Adult CPR techniques and compressions',
      'Child CPR procedures',
      'Infant CPR and special considerations',
      'AED (Automated External Defibrillator) operation',
      'Choking relief for all ages',
      'Basic first aid for common emergencies',
      'Recognition of cardiac arrest and stroke',
      'Emergency response protocols',
      'Scene safety and infection control',
    ],
    outcomes: [
      'AHA CPR/AED/First Aid certification card',
      'Qualify for healthcare positions requiring CPR',
      'Confidence to respond in emergencies',
      'Meet employment requirements for CNA, Medical Assistant, EMT, and other healthcare roles',
      'Valuable skill for childcare, education, and public safety positions',
    ],
    requirements: [
      'No prior medical experience required',
      'Physically able to perform CPR compressions on a manikin',
      'Able to kneel and perform floor-based skills',
      'Basic reading and comprehension of safety protocols',
      'Application deadline: Apply at least 2 weeks before class date for availability',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'View Class Schedule',
      href: '/contact?topic=cpr-certification',
    },
    price: 575,
  },
  {
    slug: 'phlebotomy-technician',
    name: 'Phlebotomy Technician Certification',
    heroTitle: 'Phlebotomy Technician Certification Program',
    heroSubtitle: '6-week program to become a certified Phlebotomy Technician',
    shortDescription:
      'Comprehensive phlebotomy training with hands-on clinical experience, national certification, and job placement assistance',
    longDescription:
      "The Phlebotomy Technician Certification program prepares you for a rewarding career in healthcare by teaching you the essential skills of blood collection and specimen processing. In just 6 weeks, you'll master venipuncture techniques, capillary puncture, specimen handling, and patient care. This program includes classroom instruction, hands-on lab practice, and a clinical externship at a real healthcare facility.\n\nYou'll earn your Certified Phlebotomy Technician (CPT) credential, CPR certification, and complete OSHA-compliant safety training through our HSI partnership, including bloodborne pathogens and infection control. Our program meets all requirements for national certification and prepares you for immediate employment in hospitals, clinics, laboratories, and blood donation centers.\n\nWith high demand for phlebotomists nationwide and excellent job growth projections, this is your opportunity to enter the healthcare field quickly with a valuable, portable credential. Our graduates work in diverse settings including hospitals, diagnostic laboratories, physician offices, blood banks, and mobile phlebotomy services.\n\nPartner Integration:\n• HSI (Health & Safety Institute) - Bloodborne Pathogens, Infection Control, CPR/AED\n• National Healthcareer Association (NHA) - CPT Certification Exam\n• Clinical externship sites - Local hospitals and laboratories\n\nCIP Code: 51.1009 - Phlebotomy Technician/Phlebotomist",
    heroImage: '/images/programs/phlebotomy.jpg',
    heroImageAlt: 'Phlebotomy technician drawing blood from patient',
    duration: '6 weeks (120 hours)',
    schedule: 'Full-time: Mon-Fri 9am-3pm or Part-time: Evenings/Weekends',
    delivery:
      'Hybrid - Classroom instruction + Lab practice + Clinical externship',
    credential:
      'Certified Phlebotomy Technician (CPT), CPR/AED, Bloodborne Pathogens, Infection Control',
    approvals: [
      'ETPL Approved - Program ID #10004680',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.1009',
      'NHA Approved Training Program',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $2,800',
      'Payment plans available',
    ],
    highlights: [
      'National CPT certification',
      'Clinical externship included',
      'CPR and safety certifications',
      'Job placement assistance',
      'Fast 6-week completion',
      'High-demand career',
    ],
    whatYouLearn: [
      'Venipuncture techniques (blood draw from veins)',
      'Capillary puncture (fingerstick)',
      'Specimen collection and handling',
      'Patient identification and safety',
      'Infection control and bloodborne pathogens',
      'Medical terminology',
      'Laboratory equipment and procedures',
      'Electronic health records',
      'Professional communication',
      'CPR and emergency response',
    ],
    outcomes: [
      'Phlebotomy Technician positions',
      'Hospital laboratory technician',
      'Diagnostic laboratory phlebotomist',
      'Blood bank technician',
      'Mobile phlebotomy services',
      'Average salary: $32,000-$42,000/year',
      'Excellent benefits in healthcare settings',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Drug screening required',
      'Immunizations required (Hepatitis B, TB test, COVID-19)',
      'Physically able to stand for extended periods',
      'Good manual dexterity and hand-eye coordination',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/apply',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=phlebotomy-technician',
    },
    price: 2800,
  },
  {
    slug: 'drug-collector',
    name: 'Drug & Alcohol Specimen Collector Certification',
    heroTitle: 'Drug & Alcohol Specimen Collector Certification',
    heroSubtitle:
      '2-week intensive program for DOT and non-DOT specimen collection',
    shortDescription:
      'Become a certified drug and alcohol specimen collector for DOT and workplace testing programs',
    longDescription:
      "The Drug & Alcohol Specimen Collector Certification program trains you to perform urine drug testing, breath alcohol testing, and oral fluid collection for DOT-regulated and non-DOT workplace testing programs. This intensive 2-week program covers federal regulations, collection procedures, chain of custody, and quality assurance.\n\nYou'll learn both DOT (Department of Transportation) and non-DOT collection procedures, making you qualified to work with transportation companies, employers, third-party administrators (TPAs), and drug testing facilities nationwide. The program includes hands-on training with actual collection devices and mock collections to ensure you're confident and compliant.\n\nUpon completion, you'll earn your Specimen Collector certification and be qualified to perform:\n• DOT urine drug testing\n• DOT breath alcohol testing  \n• Non-DOT urine drug testing\n• Oral fluid (saliva) drug testing\n• Instant and lab-based testing\n\nThis is a high-demand career with flexible work options including full-time positions, part-time work, mobile collection services, and independent contractor opportunities. Many collectors earn $40,000-$60,000+ annually with the ability to set their own schedules.\n\nPartner Integration:\n• National Drug Screening - DOT compliance training and certification\n• Hands-on training with actual collection devices\n• Access to nationwide collector network\n\nCIP Code: 51.1004 - Clinical/Medical Laboratory Technician",
    heroImage: '/images/programs/drug-collector.jpg',
    heroImageAlt: 'Drug collector performing specimen collection',
    duration: '2 weeks (40 hours)',
    schedule: 'Full-time: Mon-Fri 9am-5pm',
    delivery: 'In-person hands-on training',
    credential:
      'Certified Specimen Collector (DOT & Non-DOT), Breath Alcohol Technician (BAT)',
    approvals: [
      'ETPL Approved - Program ID #10004681',
      'WIOA Eligible',
      'Workforce Ready Grant Eligible',
      'CIP Code: 51.1004',
      'DOT Compliant Training',
    ],
    fundingOptions: [
      '100% FREE through WIOA',
      'Workforce Ready Grant',
      'Self-Pay: $1,500',
      'Payment plans available',
    ],
    highlights: [
      'DOT and non-DOT certified',
      'Hands-on training with real devices',
      'Flexible career options',
      'High earning potential',
      'Fast 2-week completion',
      'Nationwide job opportunities',
    ],
    whatYouLearn: [
      'DOT urine drug testing procedures',
      'DOT breath alcohol testing',
      'Non-DOT specimen collection',
      'Oral fluid (saliva) testing',
      'Chain of custody procedures',
      'Federal regulations (49 CFR Part 40)',
      'Specimen validity testing',
      'Quality assurance and quality control',
      'Donor rights and privacy',
      'Problem collections and refusals',
    ],
    outcomes: [
      'Drug testing facility collector',
      'Mobile specimen collector',
      'Third-party administrator (TPA) collector',
      'Occupational health clinic collector',
      'Independent contractor',
      'Average salary: $40,000-$60,000/year',
      'Flexible scheduling options',
    ],
    requirements: [
      'High school diploma or GED',
      '18 years or older',
      'Background check required',
      'Drug screening required',
      "Valid driver's license (for mobile collection)",
      'Reliable transportation',
      'Professional demeanor and communication skills',
    ],
    ctaPrimary: {
      label: 'Apply Now',
      href: '/apply',
    },
    ctaSecondary: {
      label: 'Learn More',
      href: '/contact?topic=drug-collector',
    },
    price: 1500,
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
