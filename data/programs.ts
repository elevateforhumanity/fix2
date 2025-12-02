// data/programs.ts

export type Program = {
  slug: string;
  name: string;
  category: string;
  heroTagline: string;
  overview: string;
  length: string;
  schedule: string;
  delivery: string;
  location: string;
  credential: string;
  salaryRange: string;
  employers: string;
  imageSrc: string;
  imageAlt: string;
  whatYoullLearn: string[];
  dayInTheLife: string[];
  isRightForYouIf: string[];
  fundingHighlights: string[];
  
  // Career Outlook
  careerOutlook: {
    jobGrowth: string;
    openings: string;
    advancement: string[];
  };
  
  // Funding Pathways
  fundingPathways: {
    wioa: boolean;
    wrg: boolean;
    jri: boolean;
    seal: boolean;
    apprenticeship: boolean;
    details: string;
  };
  
  // How to Enroll
  enrollmentSteps: {
    step: number;
    title: string;
    description: string;
    action?: string;
    actionUrl?: string;
  }[];
};

export const PROGRAMS: Program[] = [
  {
    slug: "cna",
    name: "Certified Nursing Assistant (CNA)",
    category: "Healthcare",
    heroTagline: "Hands-on healthcare training that leads to real patient care roles.",
    overview: "Learn patient care, vital signs, infection control, and clinical communication while preparing for the state CNA exam.",
    length: "4–8 weeks",
    schedule: "Day, Evening, Hybrid",
    delivery: "Hybrid + Clinical Site",
    location: "Partner clinical locations",
    credential: "State-approved CNA Certificate",
    salaryRange: "$15–$22/hr",
    employers: "Nursing homes, hospitals, assisted living, home health",
    imageSrc: "/media/programs/cna-hd.jpg",
    imageAlt: "CNA student working with patient",
    whatYoullLearn: [
      "Vital signs & documentation",
      "Patient mobility & bathing",
      "Infection control & PPE",
      "Basic medical terminology",
      "Clinical communication"
    ],
    dayInTheLife: [
      "Assist patients with daily living activities",
      "Work closely with nurses",
      "Document patient conditions",
      "Support comfort & safety"
    ],
    isRightForYouIf: [
      "You enjoy helping people",
      "You want healthcare entry-level training",
      "You want to quickly enter the field"
    ],
    fundingHighlights: [
      "Eligible for WRG",
      "Often covered by WIOA",
      "Possible employer sponsorship"
    ],
    careerOutlook: {
      jobGrowth: "8% growth through 2031 (faster than average)",
      openings: "200,000+ openings annually nationwide",
      advancement: [
        "Licensed Practical Nurse (LPN)",
        "Registered Nurse (RN)",
        "Medical Assistant",
        "Patient Care Technician"
      ]
    },
    fundingPathways: {
      wioa: true,
      wrg: true,
      jri: false,
      seal: false,
      apprenticeship: false,
      details: "100% covered by WIOA or WRG for eligible participants. No out-of-pocket costs for tuition, books, or clinical fees."
    },
    enrollmentSteps: [
      {
        step: 1,
        title: "Check Your Eligibility",
        description: "See if you qualify for free training through WIOA or WRG funding",
        action: "Check Eligibility",
        actionUrl: "/funding/eligibility?program=cna"
      },
      {
        step: 2,
        title: "Complete Application",
        description: "Submit your application online - takes 10 minutes",
        action: "Apply Now",
        actionUrl: "/apply?program=cna"
      },
      {
        step: 3,
        title: "Meet with Advisor",
        description: "Schedule a call with our team to confirm funding and enrollment",
        action: "Schedule Call",
        actionUrl: "/contact?program=cna"
      },
      {
        step: 4,
        title: "Start Training",
        description: "Begin your CNA training within 2 weeks of approval"
      }
    ]
  },
  {
    slug: "medical-assistant",
    name: "Medical Assistant",
    category: "Healthcare",
    heroTagline: "Clinical and administrative skills for medical offices.",
    overview: "Train in both clinical procedures and front-office operations for physician practices and clinics.",
    length: "6–12 weeks",
    schedule: "Day, Evening",
    delivery: "Hybrid + Externship",
    location: "Medical facilities",
    credential: "Medical Assistant Certificate",
    salaryRange: "$16–$24/hr",
    employers: "Physician offices, clinics, urgent care",
    imageSrc: "/media/programs/medical-assistant.jpg",
    imageAlt: "Medical assistant with patient",
    whatYoullLearn: [
      "Vital signs & EKG",
      "Medical terminology",
      "Patient intake & scheduling",
      "Insurance & billing basics",
      "Clinical procedures"
    ],
    dayInTheLife: [
      "Greet patients",
      "Take vital signs",
      "Assist with exams",
      "Handle administrative tasks"
    ],
    isRightForYouIf: [
      "You want variety in your work",
      "You're organized and detail-oriented",
      "You enjoy patient interaction"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "WRG eligible",
      "Employer partnerships available"
    ]
  },
  {
    slug: "phlebotomy",
    name: "Phlebotomy Technician",
    category: "Healthcare",
    heroTagline: "Specialized training in blood collection.",
    overview: "Learn venipuncture, specimen handling, and lab safety for hospitals and diagnostic labs.",
    length: "4–6 weeks",
    schedule: "Day",
    delivery: "Hands-on Lab + Clinical",
    location: "Lab facilities",
    credential: "Phlebotomy Technician Certificate",
    salaryRange: "$15–$20/hr",
    employers: "Hospitals, labs, blood banks, clinics",
    imageSrc: "/media/programs/phlebotomy.jpg",
    imageAlt: "Phlebotomy technician",
    whatYoullLearn: [
      "Venipuncture techniques",
      "Specimen collection & handling",
      "Lab safety protocols",
      "Patient communication",
      "Quality control"
    ],
    dayInTheLife: [
      "Collect blood samples",
      "Label specimens",
      "Maintain equipment",
      "Ensure patient comfort"
    ],
    isRightForYouIf: [
      "You have steady hands",
      "You're detail-oriented",
      "You want quick entry to healthcare"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Short training period",
      "High demand field"
    ]
  },
  {
    slug: "dental-assistant",
    name: "Dental Assistant",
    category: "Healthcare",
    heroTagline: "Support dental teams in patient care.",
    overview: "Learn chairside assisting, sterilization, X-rays, and front office procedures.",
    length: "8–12 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Clinical",
    location: "Dental offices",
    credential: "Dental Assistant Certificate",
    salaryRange: "$17–$25/hr",
    employers: "Dental offices, orthodontics, oral surgery",
    imageSrc: "/media/programs/dental-assistant.jpg",
    imageAlt: "Dental assistant",
    whatYoullLearn: [
      "Chairside assisting",
      "Dental radiography",
      "Sterilization procedures",
      "Patient records",
      "Dental terminology"
    ],
    dayInTheLife: [
      "Prepare treatment rooms",
      "Assist during procedures",
      "Take X-rays",
      "Educate patients"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You work well in teams",
      "You want stable healthcare career"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "WRG eligible",
      "Growing field"
    ]
  },
  {
    slug: "barber",
    name: "Barber & Beauty Apprenticeship",
    category: "Apprenticeship",
    heroTagline: "Earn while you learn in a real barbershop.",
    overview: "A hands-on apprenticeship where learners cut, fade, shave, and build clientele while training toward licensure.",
    length: "9–18 months",
    schedule: "Flexible / On-the-job",
    delivery: "Apprenticeship + Classroom",
    location: "Partner barbershops",
    credential: "Barber License (state)",
    salaryRange: "$35k–$85k+",
    employers: "Barbershops, salons, self-employed",
    imageSrc: "/media/programs/barber-hd.jpg",
    imageAlt: "Barber practicing fade",
    whatYoullLearn: [
      "Cutting & fading",
      "Sanitation & safety",
      "Shaving techniques",
      "Client communication",
      "Entrepreneurship"
    ],
    dayInTheLife: [
      "Cut hair & build skill",
      "Sanitize tools",
      "Communicate with clients",
      "Grow personal brand"
    ],
    isRightForYouIf: [
      "You're artistic",
      "You enjoy people",
      "You want entrepreneurship opportunities"
    ],
    fundingHighlights: [
      "Eligible for Apprenticeship funding",
      "Possible WEX/OJT support",
      "Some shop sponsorships"
    ]
  },
  {
    slug: "hvac",
    name: "HVAC Technician",
    category: "Skilled Trades",
    heroTagline: "Train for high-demand technical careers.",
    overview: "Learn installation, diagnostics, and repair of heating, ventilation, and air conditioning systems.",
    length: "3–6 months",
    schedule: "Day/Evening",
    delivery: "Hands-on Lab",
    location: "Training sites",
    credential: "HVAC Training Certificate",
    salaryRange: "$18–$30/hr",
    employers: "HVAC companies, facility teams, contractors",
    imageSrc: "/media/programs/hvac-hd.jpg",
    imageAlt: "HVAC technician",
    whatYoullLearn: [
      "HVAC systems & components",
      "Diagnostics & troubleshooting",
      "Refrigeration cycles",
      "Electrical systems",
      "Safety protocols & EPA regulations"
    ],
    dayInTheLife: [
      "Respond to service calls",
      "Diagnose system issues",
      "Install & repair equipment",
      "Provide customer service"
    ],
    isRightForYouIf: [
      "You like hands-on technical work",
      "You enjoy problem-solving",
      "You want year-round employment"
    ],
    fundingHighlights: [
      "WRG eligible",
      "WIOA eligible",
      "Apprenticeship opportunities"
    ]
  },
  {
    slug: "welding",
    name: "Welding Technology",
    category: "Skilled Trades",
    heroTagline: "Master the art of metal fabrication.",
    overview: "Learn MIG, TIG, stick welding, and blueprint reading for manufacturing and construction careers.",
    length: "8–16 weeks",
    schedule: "Day, Evening",
    delivery: "Hands-on Lab",
    location: "Welding labs",
    credential: "Welding Certificate",
    salaryRange: "$18–$28/hr",
    employers: "Manufacturing, construction, fabrication shops",
    imageSrc: "/media/programs/welding.jpg",
    imageAlt: "Welder at work",
    whatYoullLearn: [
      "MIG, TIG, stick welding",
      "Blueprint reading",
      "Metal fabrication",
      "Safety procedures",
      "Quality inspection"
    ],
    dayInTheLife: [
      "Read blueprints",
      "Set up equipment",
      "Weld components",
      "Inspect work quality"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You like working with your hands",
      "You want high-demand skills"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Apprenticeship pathways",
      "High earning potential"
    ]
  },
  {
    slug: "electrical",
    name: "Electrical Helper",
    category: "Skilled Trades",
    heroTagline: "Start your electrical career path.",
    overview: "Learn electrical basics, safety, and code compliance to assist licensed electricians.",
    length: "6–12 weeks",
    schedule: "Day",
    delivery: "Classroom + Lab",
    location: "Training facilities",
    credential: "Electrical Helper Certificate",
    salaryRange: "$16–$24/hr",
    employers: "Electrical contractors, construction companies",
    imageSrc: "/media/programs/electrical.jpg",
    imageAlt: "Electrical helper",
    whatYoullLearn: [
      "Electrical theory basics",
      "NEC code fundamentals",
      "Tool usage & safety",
      "Wiring techniques",
      "Blueprint reading"
    ],
    dayInTheLife: [
      "Assist electricians",
      "Pull wire & conduit",
      "Organize materials",
      "Learn on the job"
    ],
    isRightForYouIf: [
      "You want to enter skilled trades",
      "You're safety-conscious",
      "You want apprenticeship pathway"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Apprenticeship entry point",
      "Growing field"
    ]
  },
  {
    slug: "plumbing",
    name: "Plumbing Helper",
    category: "Skilled Trades",
    heroTagline: "Begin your plumbing career.",
    overview: "Learn plumbing basics, pipe fitting, and safety to assist licensed plumbers.",
    length: "6–10 weeks",
    schedule: "Day",
    delivery: "Classroom + Hands-on",
    location: "Training sites",
    credential: "Plumbing Helper Certificate",
    salaryRange: "$16–$25/hr",
    employers: "Plumbing contractors, construction, facilities",
    imageSrc: "/media/programs/plumbing.jpg",
    imageAlt: "Plumbing helper",
    whatYoullLearn: [
      "Plumbing systems basics",
      "Pipe fitting & installation",
      "Tool usage",
      "Safety protocols",
      "Code awareness"
    ],
    dayInTheLife: [
      "Assist plumbers",
      "Prepare materials",
      "Learn installation techniques",
      "Maintain tools"
    ],
    isRightForYouIf: [
      "You like problem-solving",
      "You want stable employment",
      "You're physically capable"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Apprenticeship pathway",
      "Recession-resistant"
    ]
  },
  {
    slug: "building-maintenance",
    name: "Building Maintenance Technician",
    category: "Skilled Trades",
    heroTagline: "Multi-skilled facilities maintenance.",
    overview: "Learn HVAC basics, electrical, plumbing, and general maintenance for commercial buildings.",
    length: "8–12 weeks",
    schedule: "Day, Evening",
    delivery: "Hands-on Training",
    location: "Training facilities",
    credential: "Building Maintenance Certificate",
    salaryRange: "$16–$26/hr",
    employers: "Property management, schools, hospitals, hotels",
    imageSrc: "/media/programs/building-maintenance.jpg",
    imageAlt: "Building maintenance tech",
    whatYoullLearn: [
      "Basic HVAC maintenance",
      "Electrical troubleshooting",
      "Plumbing repairs",
      "Carpentry basics",
      "Safety & tools"
    ],
    dayInTheLife: [
      "Respond to work orders",
      "Perform preventive maintenance",
      "Troubleshoot issues",
      "Maintain facilities"
    ],
    isRightForYouIf: [
      "You're a problem-solver",
      "You like variety",
      "You want stable work"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "WRG eligible",
      "Year-round employment"
    ]
  },
  {
    slug: "cdl",
    name: "CDL Class A/B",
    category: "Transportation",
    heroTagline: "Start a driving career with strong earning potential.",
    overview: "Behind-the-wheel CDL training preparing for state exam and commercial driving career.",
    length: "4–8 weeks",
    schedule: "Daytime",
    delivery: "On-road + Classroom",
    location: "Driving yards",
    credential: "CDL-A or CDL-B",
    salaryRange: "$45k–$70k",
    employers: "Trucking companies, logistics, delivery services",
    imageSrc: "/media/programs/cdl-hd.jpg",
    imageAlt: "CDL truck driver",
    whatYoullLearn: [
      "Pre-trip vehicle inspection",
      "Backing & maneuvering",
      "DOT compliance & regulations",
      "Road safety & defensive driving",
      "Log book management"
    ],
    dayInTheLife: [
      "Inspect truck",
      "Drive assigned routes",
      "Document logs",
      "Communicate with dispatch"
    ],
    isRightForYouIf: [
      "You enjoy being on the road",
      "You're safety-conscious",
      "You want immediate employment"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Employer sponsorship possible",
      "High demand nationwide"
    ]
  },
  {
    slug: "cosmetology",
    name: "Cosmetology",
    category: "Beauty & Wellness",
    heroTagline: "Full-service beauty training.",
    overview: "Comprehensive training in hair, nails, skin care, and makeup for state licensure.",
    length: "9–18 months",
    schedule: "Day, Evening",
    delivery: "Hands-on Salon",
    location: "Beauty schools",
    credential: "Cosmetology License",
    salaryRange: "$25k–$60k+",
    employers: "Salons, spas, self-employed",
    imageSrc: "/media/programs/cosmetology.jpg",
    imageAlt: "Cosmetology student",
    whatYoullLearn: [
      "Hair cutting & styling",
      "Color theory & application",
      "Nail care & art",
      "Skin care basics",
      "Salon management"
    ],
    dayInTheLife: [
      "Work with clients",
      "Practice techniques",
      "Build portfolio",
      "Learn business skills"
    ],
    isRightForYouIf: [
      "You're creative",
      "You enjoy people",
      "You want entrepreneurship"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Flexible career options",
      "Self-employment potential"
    ]
  },
  {
    slug: "esthetics-apprenticeship",
    name: "Esthetics Apprenticeship",
    category: "Beauty & Wellness",
    heroTagline: "Skin care specialist training.",
    overview: "Learn facials, waxing, and skin treatments through apprenticeship model.",
    length: "6–12 months",
    schedule: "Flexible",
    delivery: "Apprenticeship",
    location: "Spas & salons",
    credential: "Esthetician License",
    salaryRange: "$28k–$55k+",
    employers: "Spas, salons, medical spas",
    imageSrc: "/media/programs/esthetics.jpg",
    imageAlt: "Esthetician",
    whatYoullLearn: [
      "Facial treatments",
      "Waxing techniques",
      "Skin analysis",
      "Product knowledge",
      "Client consultation"
    ],
    dayInTheLife: [
      "Perform facials",
      "Consult with clients",
      "Recommend products",
      "Maintain treatment rooms"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You care about wellness",
      "You want spa environment"
    ],
    fundingHighlights: [
      "Apprenticeship funding",
      "Growing industry",
      "Flexible hours"
    ]
  },
  {
    slug: "tax-prep",
    name: "Tax Preparation (VITA)",
    category: "Business & Finance",
    heroTagline: "IRS-certified tax preparation.",
    overview: "Become IRS-certified to prepare taxes for individuals and families through VITA program.",
    length: "4–6 weeks",
    schedule: "Evening, Weekend",
    delivery: "Online + In-person",
    location: "Community sites",
    credential: "IRS VITA Certification",
    salaryRange: "$15–$25/hr (seasonal)",
    employers: "Tax firms, VITA sites, self-employed",
    imageSrc: "/media/programs/tax-prep.jpg",
    imageAlt: "Tax preparer",
    whatYoullLearn: [
      "Federal tax law basics",
      "Tax software usage",
      "Client interviewing",
      "Form preparation",
      "Ethics & accuracy"
    ],
    dayInTheLife: [
      "Interview clients",
      "Prepare returns",
      "Review for accuracy",
      "E-file returns"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You like helping people",
      "You want flexible work"
    ],
    fundingHighlights: [
      "Free IRS training",
      "Community service opportunity",
      "Seasonal income"
    ]
  },
  {
    slug: "it-support",
    name: "IT Support Specialist",
    category: "Technology",
    heroTagline: "Start your tech career.",
    overview: "Learn computer hardware, software, networking, and troubleshooting for help desk roles.",
    length: "8–16 weeks",
    schedule: "Day, Evening",
    delivery: "Hybrid",
    location: "Computer labs",
    credential: "IT Support Certificate",
    salaryRange: "$18–$28/hr",
    employers: "IT departments, help desks, MSPs",
    imageSrc: "/media/programs/it-support.jpg",
    imageAlt: "IT support specialist",
    whatYoullLearn: [
      "Hardware & software basics",
      "Operating systems",
      "Networking fundamentals",
      "Troubleshooting techniques",
      "Customer service"
    ],
    dayInTheLife: [
      "Answer support tickets",
      "Troubleshoot issues",
      "Install software",
      "Assist users"
    ],
    isRightForYouIf: [
      "You're tech-savvy",
      "You like problem-solving",
      "You're patient with people"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Growing field",
      "Remote work potential"
    ]
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity Foundations",
    category: "Technology",
    heroTagline: "Protect digital assets.",
    overview: "Learn security basics, threat detection, and network protection for entry-level security roles.",
    length: "12–16 weeks",
    schedule: "Evening, Online",
    delivery: "Online + Labs",
    location: "Virtual",
    credential: "Cybersecurity Certificate",
    salaryRange: "$22–$35/hr",
    employers: "IT security teams, government, finance",
    imageSrc: "/media/programs/cybersecurity.jpg",
    imageAlt: "Cybersecurity analyst",
    whatYoullLearn: [
      "Security fundamentals",
      "Threat identification",
      "Network security",
      "Incident response",
      "Security tools"
    ],
    dayInTheLife: [
      "Monitor security alerts",
      "Analyze threats",
      "Document incidents",
      "Update security measures"
    ],
    isRightForYouIf: [
      "You're analytical",
      "You're detail-oriented",
      "You want high-demand career"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "High earning potential",
      "Critical infrastructure need"
    ]
  },
  {
    slug: "early-childhood",
    name: "Early Childhood Educator",
    category: "Education",
    heroTagline: "Shape young minds.",
    overview: "Learn child development, curriculum planning, and classroom management for preschool settings.",
    length: "8–12 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Practicum",
    location: "Childcare centers",
    credential: "Early Childhood Certificate",
    salaryRange: "$14–$20/hr",
    employers: "Preschools, daycares, Head Start",
    imageSrc: "/media/programs/early-childhood.jpg",
    imageAlt: "Early childhood educator",
    whatYoullLearn: [
      "Child development stages",
      "Curriculum planning",
      "Classroom management",
      "Health & safety",
      "Family engagement"
    ],
    dayInTheLife: [
      "Plan activities",
      "Supervise children",
      "Document progress",
      "Communicate with families"
    ],
    isRightForYouIf: [
      "You love working with children",
      "You're patient and creative",
      "You want meaningful work"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Growing demand",
      "Rewarding career"
    ]
  },
  {
    slug: "hospitality",
    name: "Hospitality & Guest Services",
    category: "Hospitality",
    heroTagline: "Excel in customer service.",
    overview: "Learn front desk operations, guest relations, and hospitality management basics.",
    length: "4–8 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Internship",
    location: "Hotels, venues",
    credential: "Hospitality Certificate",
    salaryRange: "$14–$22/hr",
    employers: "Hotels, resorts, event venues",
    imageSrc: "/media/programs/hospitality.jpg",
    imageAlt: "Hospitality professional",
    whatYoullLearn: [
      "Front desk operations",
      "Guest relations",
      "Reservation systems",
      "Problem resolution",
      "Hospitality software"
    ],
    dayInTheLife: [
      "Check in guests",
      "Handle reservations",
      "Resolve issues",
      "Provide information"
    ],
    isRightForYouIf: [
      "You're people-oriented",
      "You're organized",
      "You thrive in fast-paced environments"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Tips & bonuses",
      "Career advancement"
    ]
  },
  {
    slug: "warehouse-logistics",
    name: "Warehouse & Logistics",
    category: "Transportation",
    heroTagline: "Supply chain operations.",
    overview: "Learn warehouse operations, inventory management, and forklift certification.",
    length: "2–4 weeks",
    schedule: "Day",
    delivery: "Hands-on",
    location: "Warehouse facilities",
    credential: "Warehouse Operations Certificate",
    salaryRange: "$16–$24/hr",
    employers: "Distribution centers, warehouses, logistics companies",
    imageSrc: "/media/programs/warehouse.jpg",
    imageAlt: "Warehouse worker",
    whatYoullLearn: [
      "Forklift operation",
      "Inventory management",
      "Safety protocols",
      "Shipping & receiving",
      "Warehouse systems"
    ],
    dayInTheLife: [
      "Operate equipment",
      "Move inventory",
      "Process orders",
      "Maintain safety"
    ],
    isRightForYouIf: [
      "You're physically active",
      "You're safety-conscious",
      "You want immediate employment"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Quick training",
      "High demand"
    ]
  },
  {
    slug: "forklift",
    name: "Forklift Certification",
    category: "Transportation",
    heroTagline: "OSHA-compliant forklift training.",
    overview: "Get OSHA-certified to operate forklifts in warehouse and industrial settings.",
    length: "1–2 days",
    schedule: "Day",
    delivery: "Hands-on",
    location: "Training yards",
    credential: "OSHA Forklift Certification",
    salaryRange: "$16–$22/hr",
    employers: "Warehouses, manufacturing, construction",
    imageSrc: "/media/programs/forklift.jpg",
    imageAlt: "Forklift operator",
    whatYoullLearn: [
      "Forklift operation",
      "Load handling",
      "Safety inspection",
      "OSHA regulations",
      "Workplace safety"
    ],
    dayInTheLife: [
      "Inspect equipment",
      "Move materials",
      "Stack inventory",
      "Follow safety protocols"
    ],
    isRightForYouIf: [
      "You want quick certification",
      "You're safety-focused",
      "You need immediate work"
    ],
    fundingHighlights: [
      "Quick certification",
      "Employer-paid often",
      "Immediate job access"
    ]
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning Certification",
    category: "Facilities",
    heroTagline: "Professional cleaning standards.",
    overview: "Learn commercial cleaning techniques, safety, and equipment for janitorial careers.",
    length: "2–4 weeks",
    schedule: "Day, Evening",
    delivery: "Hands-on",
    location: "Training facilities",
    credential: "Cleaning Technician Certificate",
    salaryRange: "$14–$20/hr",
    employers: "Cleaning companies, facilities, schools",
    imageSrc: "/media/programs/cleaning.jpg",
    imageAlt: "Commercial cleaner",
    whatYoullLearn: [
      "Cleaning techniques",
      "Chemical safety",
      "Equipment operation",
      "Infection control",
      "Quality standards"
    ],
    dayInTheLife: [
      "Clean facilities",
      "Use equipment properly",
      "Follow safety protocols",
      "Maintain supplies"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You work independently",
      "You want flexible hours"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Quick entry",
      "Stable employment"
    ]
  },
  {
    slug: "security-officer",
    name: "Security Officer Training",
    category: "Public Safety",
    heroTagline: "Protect people and property.",
    overview: "Get licensed and trained for security guard positions in various settings.",
    length: "1–2 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom",
    location: "Training centers",
    credential: "Security Guard License",
    salaryRange: "$15–$22/hr",
    employers: "Security companies, hospitals, retail, events",
    imageSrc: "/media/programs/security.jpg",
    imageAlt: "Security officer",
    whatYoullLearn: [
      "Security procedures",
      "Report writing",
      "Emergency response",
      "Legal authority",
      "Communication skills"
    ],
    dayInTheLife: [
      "Monitor premises",
      "Write reports",
      "Respond to incidents",
      "Assist visitors"
    ],
    isRightForYouIf: [
      "You're observant",
      "You stay calm under pressure",
      "You want steady work"
    ],
    fundingHighlights: [
      "Quick licensing",
      "Flexible shifts",
      "Career advancement"
    ]
  },
  {
    slug: "peer-recovery",
    name: "Certified Peer Recovery Coach",
    category: "Behavioral Health",
    heroTagline: "Support recovery journeys.",
    overview: "Train to support individuals in addiction recovery using lived experience.",
    length: "6–8 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Practicum",
    location: "Recovery centers",
    credential: "Peer Recovery Coach Certification",
    salaryRange: "$16–$24/hr",
    employers: "Treatment centers, hospitals, community programs",
    imageSrc: "/media/programs/peer-recovery.jpg",
    imageAlt: "Peer recovery coach",
    whatYoullLearn: [
      "Recovery principles",
      "Peer support techniques",
      "Crisis intervention",
      "Resource navigation",
      "Ethics & boundaries"
    ],
    dayInTheLife: [
      "Support clients",
      "Facilitate groups",
      "Connect to resources",
      "Document progress"
    ],
    isRightForYouIf: [
      "You have lived experience",
      "You're empathetic",
      "You want to help others"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Growing field",
      "Meaningful work"
    ]
  },
  {
    slug: "behavioral-health",
    name: "Behavioral Health Technician",
    category: "Behavioral Health",
    heroTagline: "Mental health support careers.",
    overview: "Learn to support individuals with mental health and substance use challenges.",
    length: "6–10 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Clinical",
    location: "Behavioral health facilities",
    credential: "Behavioral Health Tech Certificate",
    salaryRange: "$16–$23/hr",
    employers: "Mental health centers, hospitals, residential programs",
    imageSrc: "/media/programs/behavioral-health.jpg",
    imageAlt: "Behavioral health tech",
    whatYoullLearn: [
      "Mental health basics",
      "Crisis de-escalation",
      "Documentation",
      "Therapeutic communication",
      "Safety protocols"
    ],
    dayInTheLife: [
      "Monitor clients",
      "Facilitate activities",
      "Document behaviors",
      "Support treatment plans"
    ],
    isRightForYouIf: [
      "You're compassionate",
      "You're patient",
      "You want to make a difference"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Growing demand",
      "Rewarding career"
    ]
  },
  {
    slug: "ekg-tech",
    name: "EKG Technician",
    category: "Healthcare",
    heroTagline: "Cardiac monitoring specialist.",
    overview: "Learn to perform electrocardiograms and cardiac monitoring in medical settings.",
    length: "4–6 weeks",
    schedule: "Day",
    delivery: "Classroom + Clinical",
    location: "Medical facilities",
    credential: "EKG Technician Certificate",
    salaryRange: "$16–$24/hr",
    employers: "Hospitals, cardiology offices, clinics",
    imageSrc: "/media/programs/ekg.jpg",
    imageAlt: "EKG technician",
    whatYoullLearn: [
      "EKG procedures",
      "Cardiac anatomy",
      "Rhythm interpretation basics",
      "Patient preparation",
      "Equipment maintenance"
    ],
    dayInTheLife: [
      "Perform EKGs",
      "Prepare patients",
      "Monitor equipment",
      "Document results"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You want specialized skills",
      "You like patient interaction"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Quick training",
      "Specialized role"
    ]
  },
  {
    slug: "pharmacy-tech",
    name: "Pharmacy Technician",
    category: "Healthcare",
    heroTagline: "Support pharmacists in patient care.",
    overview: "Learn medication dispensing, inventory management, and pharmacy operations.",
    length: "8–12 weeks",
    schedule: "Day, Evening",
    delivery: "Classroom + Externship",
    location: "Pharmacies",
    credential: "Pharmacy Technician Certificate",
    salaryRange: "$16–$22/hr",
    employers: "Retail pharmacies, hospitals, mail-order",
    imageSrc: "/media/programs/pharmacy-tech.jpg",
    imageAlt: "Pharmacy technician",
    whatYoullLearn: [
      "Medication dispensing",
      "Pharmacy calculations",
      "Insurance processing",
      "Inventory management",
      "Patient communication"
    ],
    dayInTheLife: [
      "Fill prescriptions",
      "Process insurance",
      "Manage inventory",
      "Assist customers"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You're good with numbers",
      "You want healthcare career"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Stable employment",
      "Career advancement"
    ]
  },
  {
    slug: "medical-billing",
    name: "Medical Billing & Coding",
    category: "Healthcare",
    heroTagline: "Healthcare administration career.",
    overview: "Learn medical coding, billing, and insurance processing for healthcare offices.",
    length: "8–16 weeks",
    schedule: "Day, Evening, Online",
    delivery: "Online + Hybrid",
    location: "Virtual/Classroom",
    credential: "Medical Billing Certificate",
    salaryRange: "$17–$26/hr",
    employers: "Medical offices, hospitals, billing companies",
    imageSrc: "/media/programs/medical-billing.jpg",
    imageAlt: "Medical biller",
    whatYoullLearn: [
      "ICD-10 & CPT coding",
      "Insurance processing",
      "Medical terminology",
      "Billing software",
      "HIPAA compliance"
    ],
    dayInTheLife: [
      "Code medical records",
      "Submit claims",
      "Follow up on payments",
      "Resolve billing issues"
    ],
    isRightForYouIf: [
      "You're detail-oriented",
      "You like working with data",
      "You want remote work potential"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Remote work options",
      "Growing field"
    ]
  },
  {
    slug: "patient-care-tech",
    name: "Patient Care Technician",
    category: "Healthcare",
    heroTagline: "Comprehensive patient care skills.",
    overview: "Combine CNA, EKG, and phlebotomy skills for expanded healthcare roles.",
    length: "12–16 weeks",
    schedule: "Day, Evening",
    delivery: "Hybrid + Clinical",
    location: "Medical facilities",
    credential: "Patient Care Tech Certificate",
    salaryRange: "$17–$25/hr",
    employers: "Hospitals, clinics, long-term care",
    imageSrc: "/media/programs/patient-care-tech.jpg",
    imageAlt: "Patient care technician",
    whatYoullLearn: [
      "Basic nursing skills",
      "EKG procedures",
      "Phlebotomy",
      "Vital signs",
      "Patient documentation"
    ],
    dayInTheLife: [
      "Provide patient care",
      "Perform EKGs",
      "Draw blood",
      "Assist nurses"
    ],
    isRightForYouIf: [
      "You want multiple skills",
      "You're compassionate",
      "You want career flexibility"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Multiple certifications",
      "Higher earning potential"
    ]
  },
  {
    slug: "construction-trades",
    name: "Construction Trades Helper",
    category: "Skilled Trades",
    heroTagline: "Start your construction career.",
    overview: "Learn construction basics, safety, and tool usage for entry-level construction work.",
    length: "4–8 weeks",
    schedule: "Day",
    delivery: "Hands-on",
    location: "Training sites",
    credential: "Construction Helper Certificate",
    salaryRange: "$16–$24/hr",
    employers: "Construction companies, contractors",
    imageSrc: "/media/programs/construction.jpg",
    imageAlt: "Construction worker",
    whatYoullLearn: [
      "Construction safety (OSHA 10)",
      "Tool usage",
      "Blueprint reading basics",
      "Material handling",
      "Trade awareness"
    ],
    dayInTheLife: [
      "Assist tradespeople",
      "Prepare materials",
      "Maintain tools",
      "Follow safety protocols"
    ],
    isRightForYouIf: [
      "You're physically capable",
      "You like outdoor work",
      "You want trade pathway"
    ],
    fundingHighlights: [
      "WIOA eligible",
      "Apprenticeship entry",
      "Strong demand"
    ]
  },
  {
    slug: "cdl-hazmat",
    name: "CDL Hazmat Endorsement",
    category: "Transportation",
    heroTagline: "Expand your CDL opportunities.",
    overview: "Add hazmat endorsement to your CDL for specialized hauling and higher pay.",
    length: "1–2 weeks",
    schedule: "Day",
    delivery: "Classroom + Testing",
    location: "Training centers",
    credential: "CDL Hazmat Endorsement",
    salaryRange: "$50k–$80k",
    employers: "Specialized carriers, chemical transport",
    imageSrc: "/media/programs/cdl-hazmat.jpg",
    imageAlt: "Hazmat truck driver",
    whatYoullLearn: [
      "Hazmat regulations",
      "Safety procedures",
      "Placarding requirements",
      "Emergency response",
      "Documentation"
    ],
    dayInTheLife: [
      "Transport hazmat loads",
      "Complete paperwork",
      "Follow safety protocols",
      "Inspect cargo"
    ],
    isRightForYouIf: [
      "You have CDL-A",
      "You want higher pay",
      "You're safety-focused"
    ],
    fundingHighlights: [
      "Employer-sponsored often",
      "Higher earning potential",
      "Specialized skills"
    ]
  }
];
