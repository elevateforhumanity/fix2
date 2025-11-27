export interface HeroSection {
  id: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ContentSection {
  id: string;
  title: string;
  bullets: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export interface PageVisualConfig {
  slug: string;
  heroes: HeroSection[];
  sections: ContentSection[];
}

// ----------------------
// HOMEPAGE VISUAL CONFIG
// ----------------------
export const homepageVisuals: PageVisualConfig = {
  slug: "home",
  heroes: [
    {
      id: "hero-main",
      imageSrc: "/images/facilities-new/facility-1.jpg",
      imageAlt: "Elevate For Humanity training facility with Keystone Crossing location",
      eyebrow: "Elevate For Humanity",
      title: "Real Training. Real Credentials. Real Jobs.",
      subtitle:
        "We connect tuition-based programs, credential partners, and employer pathways so you can move from interest to income with support.",
      ctaLabel: "View All Programs",
      ctaHref: "/programs",
    },
    {
      id: "hero-earn",
      imageSrc: "/images/hero-new/hero-2.jpg",
      imageAlt: "Student working while studying on a laptop.",
      eyebrow: "Earn While You Learn",
      title: "Work experience, stipends, and employer connections while you train.",
      subtitle:
        "Even when tuition is self-pay, students may qualify for Work Experience (WEX), JRI incentives, and OJT-supported jobs.",
      ctaLabel: "Explore Earn While You Learn",
      ctaHref: "/earn-while-you-learn",
    },
  ],
  sections: [
    {
      id: "program-highlights",
      title: "Programs Built Around Real Careers",
      bullets: [
        "CNA, Barber Apprenticeship, CDL, HVAC/Building Tech, Customer Service, IT Support, Entrepreneurship, and more.",
        "Every pathway is tied to credential partners like Milady, HSI, CareerSafe, Certiport, Rise, National Drug, and JRI.",
        "Short, focused training that leads into employer connections, WEX, and OJT opportunities."
      ],
      imageSrc: "/images/artlist/hero-training-8.jpg",
      imageAlt: "Collage of Elevate For Humanity programs and students.",
    },
    {
      id: "support-pathways",
      title: "You're Not Doing This Alone",
      bullets: [
        "Human support plus AI-powered instructors that help explain lessons, career steps, and funding options.",
        "Clear next steps for enrollment, paperwork, and getting ready for work.",
        "Coaching for resumes, interviews, soft skills, and showing up professionally."
      ],
      imageSrc: "/images/hero-new/hero-5.jpg",
      imageAlt: "Coach sitting with a learner reviewing career options.",
    },
    {
      id: "outcomes",
      title: "From Training to Employment",
      bullets: [
        "Talent pipelines for healthcare, skilled trades, transportation, customer service, and tech.",
        "WEX placements and OJT wage reimbursement to make it easier for employers to hire you.",
        "Stories of students who moved from stress and instability into stable income and career paths."
      ],
      imageSrc: "/images/hero-new/hero-1.jpg",
      imageAlt: "Graduate smiling after securing a job.",
    },
  ],
};

// ----------------------
// CNA PROGRAM VISUALS
// ----------------------
export const cnaVisuals: PageVisualConfig = {
  slug: "certified-nursing-assistant",
  heroes: [
    {
      id: "cna-hero-main",
      imageSrc: "/images/programs-new/program-1.jpg",
      imageAlt: "CNA student practicing vital signs on a mannequin.",
      eyebrow: "Certified Nursing Assistant",
      title: "Step Into Healthcare With CNA Training That Leads to Real Work.",
      subtitle:
        "Tuition-based CNA training with safety, soft skills, and employer connections wrapped into one pathway.",
      ctaLabel: "Enroll in CNA",
      ctaHref: "/programs/certified-nursing-assistant",
    },
    {
      id: "cna-hero-earn",
      imageSrc: "/images/students-new/student-1.jpg",
      imageAlt: "Healthcare worker comforting an elderly patient.",
      eyebrow: "Earn While You Learn",
      title: "Start building experience while you finish your CNA training.",
      subtitle:
        "Depending on eligibility, CNA learners may connect to paid work experience and OJT-supported employment after training.",
      ctaLabel: "Talk to a Career Coach",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "cna-training-overview",
      title: "What Your CNA Pathway Includes",
      bullets: [
        "Core CNA training delivered through HSI / Choice Medical Institute.",
        "Healthcare safety and drug-free workplace modules to meet employer expectations.",
        "Soft skills, professionalism, and job readiness through Job Ready Indy and EFH modules."
      ],
      imageSrc: "/images/programs-new/program-2.jpg",
      imageAlt: "Students practicing CNA skills in a lab environment.",
    },
    {
      id: "cna-outcomes",
      title: "Where CNA Training Can Take You",
      bullets: [
        "Entry-level roles in long-term care facilities, rehab centers, and home health.",
        "A foundation for future nursing pathways, including LPN and RN.",
        "Experience that proves you can care, communicate, and follow through on a professional path."
      ],
      imageSrc: "/images/students-new/student-2.jpg",
      imageAlt: "CNA graduate standing confidently in a healthcare facility.",
    },
  ],
};

// ----------------------
// BARBER PROGRAM VISUALS
// ----------------------
export const barberVisuals: PageVisualConfig = {
  slug: "barber-apprenticeship",
  heroes: [
    {
      id: "barber-hero-main",
      imageSrc: "/images/efh-barber-hero.jpg",
      imageAlt: "Barber apprentice cutting hair in a modern barbershop.",
      eyebrow: "Barber Apprenticeship",
      title: "Train in the Shop, Build Your Skills, and Get Paid While You Learn.",
      subtitle:
        "Milady barber theory, shop mentorship, and structured apprenticeship hours that move you toward licensure.",
      ctaLabel: "Start Barber Apprenticeship",
      ctaHref: "/programs/barber-apprenticeship",
    },
    {
      id: "barber-hero-earn",
      imageSrc: "/images/efh-barber-card.jpg",
      imageAlt: "Barber apprentice laughing with a client in the chair.",
      eyebrow: "Earn While You Learn",
      title: "Real clients, real hours, real income.",
      subtitle:
        "While you complete your theory modules, you can be in the shop gaining hours, building a client base, and learning how the business works.",
      ctaLabel: "Talk About Apprenticeship",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "barber-training-overview",
      title: "What Your Barber Apprenticeship Includes",
      bullets: [
        "Milady barber theory curriculum to cover all core concepts required for licensure.",
        "In-shop apprenticeship experience with licensed barbers supervising your hours.",
        "Drug-free workplace and professionalism training tailored to barber/beauty environments."
      ],
      imageSrc: "/images/hero-new/hero-3.jpg",
      imageAlt: "Instructor demonstrating a haircut technique to apprentices.",
    },
    {
      id: "barber-outcomes",
      title: "Where This Apprenticeship Can Take You",
      bullets: [
        "Licensed barber roles in shops and salons once apprenticeship and testing are complete.",
        "Paths into chair rental, commission-based work, or eventually shop ownership.",
        "A portable licensed trade that lets you work, travel, and build your own brand."
      ],
      imageSrc: "/images/hero-new/hero-4.jpg",
      imageAlt: "Barber proudly standing by their station with tools organized.",
    },
  ],
};

// ----------------------
// HVAC / BUILDING TECH VISUALS
// ----------------------
export const hvacVisuals: PageVisualConfig = {
  slug: "hvac-building-technician",
  heroes: [
    {
      id: "hvac-hero-main",
      imageSrc: "/images/efh-building-tech-hero.jpg",
      imageAlt: "Technician working on an HVAC unit on a rooftop.",
      eyebrow: "HVAC & Building Tech",
      title: "Hands-On Skills for HVAC and Building Maintenance Careers.",
      subtitle:
        "Safety-focused training pathways that help you step into skilled trades and facilities roles.",
      ctaLabel: "Explore HVAC & Building Tech",
      ctaHref: "/programs/hvac-building-technician",
    },
    {
      id: "hvac-hero-earn",
      imageSrc: "/images/PLACEHOLDER_PATHWAY_TRADES.jpg",
      imageAlt: "Technician using tools while working on a building system.",
      eyebrow: "Earn While You Learn",
      title: "Earn experience while you build trade skills.",
      subtitle:
        "Learners may access WEX roles in maintenance and facilities and move into OJT-supported employment with trade employers.",
      ctaLabel: "Talk About Skilled Trades",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "hvac-training-overview",
      title: "What Your HVAC & Building Tech Pathway Includes",
      bullets: [
        "CareerSafe OSHA & safety content geared toward HVAC and building environments.",
        "Drug-free workplace modules aligned with skilled trades expectations.",
        "Elevate-led modules on basic tools, systems, and employer expectations for maintenance roles."
      ],
      imageSrc: "/images/facilities-new/facility-2.jpg",
      imageAlt: "Instructor demonstrating a building system component to a learner.",
    },
    {
      id: "hvac-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Entry-level maintenance tech roles in residential, commercial, and institutional settings.",
        "Foundation for further HVAC certifications and trade licenses.",
        "Real experience that can grow into higher-paying skilled trade careers."
      ],
      imageSrc: "/images/facilities-new/facility-3.jpg",
      imageAlt: "Maintenance technician walking through a building facility.",
    },
  ],
};

// ----------------------
// CDL / TRANSPORT VISUALS
// ----------------------
export const cdlVisuals: PageVisualConfig = {
  slug: "cdl-transportation",
  heroes: [
    {
      id: "cdl-hero-main",
      imageSrc: "/images/PLACEHOLDER_PATHWAY_CDL.jpg",
      imageAlt: "CDL student standing in front of a commercial truck.",
      eyebrow: "CDL & Transportation",
      title: "Prepare for Transportation Careers with Safety and DOT Readiness.",
      subtitle:
        "Supportive training around DOT drug & alcohol awareness, safety, and job readiness for CDL-driven careers.",
      ctaLabel: "Explore CDL Pathway",
      ctaHref: "/programs/cdl-transportation",
    },
    {
      id: "cdl-hero-earn",
      imageSrc: "/images/hero-new/hero-6.jpg",
      imageAlt: "Truck driver stepping out of a semi truck cab.",
      eyebrow: "Earn While You Learn",
      title: "Work-based learning while you prepare for CDL opportunities.",
      subtitle:
        "Learners may connect to WEX roles and OJT-supported hiring with transportation employers after meeting CDL requirements.",
      ctaLabel: "Talk to Transportation Coach",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "cdl-training-overview",
      title: "What Your CDL & Transportation Pathway Includes",
      bullets: [
        "DOT-compliant drug and alcohol awareness training.",
        "Transportation and roadway safety concepts via partner content.",
        "Job readiness and professionalism modules focused on transportation work.",
      ],
      imageSrc: "/images/hero-new/hero-7.jpg",
      imageAlt: "Instructor explaining a transportation safety diagram.",
    },
    {
      id: "cdl-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Support roles around CDL-driven careers, depending on your training and licensure status.",
        "Connections to employer partners seeking reliable transportation staff.",
        "A pathway into higher-paying CDL roles once licensure steps are complete.",
      ],
      imageSrc: "/images/hero-new/hero-8.jpg",
      imageAlt: "Truck fleet parked in a lot with a driver walking by.",
    },
  ],
};

// ----------------------
// CUSTOMER SERVICE VISUALS
// ----------------------
export const customerServiceVisuals: PageVisualConfig = {
  slug: "customer-service-pro",
  heroes: [
    {
      id: "cs-hero-main",
      imageSrc: "/images/PLACEHOLDER_PATHWAY_BUSINESS.jpg",
      imageAlt: "Customer service representative speaking with a client over a headset.",
      eyebrow: "Customer Service Pro",
      title: "Turn Your People Skills Into Professional Office and Call Center Roles.",
      subtitle:
        "Customer service training, certification prep, and job readiness for front-line communication roles.",
      ctaLabel: "Explore Customer Service Pathway",
      ctaHref: "/programs/customer-service-pro",
    },
    {
      id: "cs-hero-earn",
      imageSrc: "/images/students-new/student-3.jpg",
      imageAlt: "Team of office workers collaborating in a bright workspace.",
      eyebrow: "Earn While You Learn",
      title: "Gain experience while building your communication skills.",
      subtitle:
        "Learners may qualify for WEX roles in offices and call centers and OJT-supported hiring with employer partners.",
      ctaLabel: "Talk About Office Careers",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "cs-training-overview",
      title: "What Your Customer Service Pathway Includes",
      bullets: [
        "Rise customer service modules that cover communication, tone, and handling difficult situations.",
        "Certiport customer service certification prep content.",
        "Elevate modules on workplace professionalism, email, chat, and phone etiquette.",
      ],
      imageSrc: "/images/students-new/student-4.jpg",
      imageAlt: "Trainer leading a workshop on customer service skills.",
    },
    {
      id: "cs-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Call center, front desk, and office roles in multiple industries.",
        "Stepping stones into supervisory or account management roles.",
        "Transferable communication skills that apply in every career.",
      ],
      imageSrc: "/images/students-new/student-5.jpg",
      imageAlt: "Professional smiling at a desk with a computer and headset.",
    },
  ],
};

// ----------------------
// IT SUPPORT VISUALS
// ----------------------
export const itSupportVisuals: PageVisualConfig = {
  slug: "it-support-helpdesk",
  heroes: [
    {
      id: "it-hero-main",
      imageSrc: "/images/hero-new/hero-9.jpg",
      imageAlt: "IT support technician helping a coworker at a computer.",
      eyebrow: "IT Support Helpdesk",
      title: "Step Into Tech with IT Support and Helpdesk Skills.",
      subtitle:
        "IT Specialist content plus real-world helpdesk expectations so you can support users and systems.",
      ctaLabel: "Explore IT Support Pathway",
      ctaHref: "/programs/it-support-helpdesk",
    },
    {
      id: "it-hero-earn",
      imageSrc: "/images/hero-new/hero-10.jpg",
      imageAlt: "Person working in a modern IT operations center.",
      eyebrow: "Earn While You Learn",
      title: "Build your portfolio while gaining IT experience.",
      subtitle:
        "Learners may qualify for WEX roles in IT support environments and OJT-supported junior helpdesk jobs.",
      ctaLabel: "Talk About Tech Careers",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "it-training-overview",
      title: "What Your IT Support Pathway Includes",
      bullets: [
        "Certiport IT Specialist content covering core IT and networking concepts.",
        "Helpdesk-focused soft skills and communication modules.",
        "Guidance on tickets, troubleshooting workflow, and working with non-technical users.",
      ],
      imageSrc: "/images/facilities-new/facility-4.jpg",
      imageAlt: "IT technician working on a network rack.",
    },
    {
      id: "it-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Entry-level IT support and helpdesk roles.",
        "A foundation for more advanced IT, networking, or cybersecurity training.",
        "Experience that proves you can learn, troubleshoot, and support a team.",
      ],
      imageSrc: "/images/facilities-new/facility-5.jpg",
      imageAlt: "IT worker standing confidently in a server room.",
    },
  ],
};

// ----------------------
// ENTREPRENEURSHIP VISUALS
// ----------------------
export const entrepreneurshipVisuals: PageVisualConfig = {
  slug: "entrepreneurship-small-business",
  heroes: [
    {
      id: "esb-hero-main",
      imageSrc: "/images/students-new/student-6.jpg",
      imageAlt: "Entrepreneur working on a laptop in a small studio.",
      eyebrow: "Entrepreneurship & Small Business",
      title: "Turn Your Ideas Into a Real Small Business.",
      subtitle:
        "Entrepreneurship and Small Business (ESB) content plus coaching so you're not building alone.",
      ctaLabel: "Explore Entrepreneurship Pathway",
      ctaHref: "/programs/entrepreneurship-small-business",
    },
    {
      id: "esb-hero-earn",
      imageSrc: "/images/students-new/student-7.jpg",
      imageAlt: "Person packaging products for their small business.",
      eyebrow: "Earn While You Build",
      title: "Build your business alongside work, family, and life.",
      subtitle:
        "Your pathway is designed so you can take small, consistent steps toward launching and growing your business.",
      ctaLabel: "Talk About Your Business Idea",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "esb-training-overview",
      title: "What Your Entrepreneurship Pathway Includes",
      bullets: [
        "Certiport Entrepreneurship and Small Business (ESB) content.",
        "Planning, budgeting, marketing, and operations fundamentals.",
        "Support thinking through pricing, offers, and real-world execution.",
      ],
      imageSrc: "/images/students-new/student-8.jpg",
      imageAlt: "Entrepreneur sketching business ideas in a notebook.",
    },
    {
      id: "esb-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Validation and structure around your business idea.",
        "A stronger foundation for funding, partnerships, or growth.",
        "Confidence to move from dreaming into doing.",
      ],
      imageSrc: "/images/students-new/student-9.jpg",
      imageAlt: "Small business owner smiling in their shop.",
    },
  ],
};

// ----------------------
// BUILDING MAINTENANCE VISUALS
// ----------------------
export const buildingMaintenanceVisuals: PageVisualConfig = {
  slug: "building-maintenance-facilities",
  heroes: [
    {
      id: "bm-hero-main",
      imageSrc: "/images/facilities-new/facility-6.jpg",
      imageAlt: "Maintenance worker checking a building system.",
      eyebrow: "Building Maintenance & Facilities",
      title: "Learn How to Keep Buildings Running Safely and Smoothly.",
      subtitle:
        "Safety, compliance, and basic maintenance skills for facilities roles.",
      ctaLabel: "Explore Building Maintenance Pathway",
      ctaHref: "/programs/building-maintenance-facilities",
    },
    {
      id: "bm-hero-earn",
      imageSrc: "/images/facilities-new/facility-7.jpg",
      imageAlt: "Facilities worker walking through a commercial building hallway.",
      eyebrow: "Earn While You Learn",
      title: "Gain experience keeping spaces safe and functional.",
      subtitle:
        "Learners may access WEX opportunities in facilities and move into OJT-supported maintenance roles.",
      ctaLabel: "Talk About Facilities Careers",
      ctaHref: "/contact",
    },
  ],
  sections: [
    {
      id: "bm-training-overview",
      title: "What Your Building Maintenance Pathway Includes",
      bullets: [
        "Safety content tied to building and facilities environments.",
        "Drug-free workplace training aligned with maintenance expectations.",
        "Elevate modules covering basic systems, communication, and work order basics.",
      ],
      imageSrc: "/images/facilities-new/facility-8.jpg",
      imageAlt: "Trainer explaining building systems to a small group.",
    },
    {
      id: "bm-outcomes",
      title: "Where This Pathway Can Take You",
      bullets: [
        "Entry-level building maintenance and facilities support roles.",
        "Stepping stones into more specialized trades and supervisory roles.",
        "Experience that shows you can care for spaces where people live and work.",
      ],
      imageSrc: "/images/facilities-new/facility-9.jpg",
      imageAlt: "Maintenance worker inspecting a facility.",
    },
  ],
};

// ----------------------
// Helper: get visuals by program slug
// ----------------------
export function getProgramVisualsBySlug(slug: string): PageVisualConfig | null {
  switch (slug) {
    case cnaVisuals.slug:
      return cnaVisuals;
    case barberVisuals.slug:
      return barberVisuals;
    case hvacVisuals.slug:
      return hvacVisuals;
    case cdlVisuals.slug:
      return cdlVisuals;
    case customerServiceVisuals.slug:
      return customerServiceVisuals;
    case itSupportVisuals.slug:
      return itSupportVisuals;
    case entrepreneurshipVisuals.slug:
      return entrepreneurshipVisuals;
    case buildingMaintenanceVisuals.slug:
      return buildingMaintenanceVisuals;
    default:
      return null;
  }
}
