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
      imageSrc: "/images/hero-new/hero-1.jpg",
      imageAlt: "Professional training and career success at Elevate For Humanity",
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
      imageAlt: "Career advisor helping student with funding and work experience",
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
      imageSrc: "/images/programs-new/program-1.jpg",
      imageAlt: "Healthcare and skilled trades training programs.",
    },
    {
      id: "support-pathways",
      title: "You're Not Doing This Alone",
      bullets: [
        "Human support plus AI-powered instructors that help explain lessons, career steps, and funding options.",
        "Clear next steps for enrollment, paperwork, and getting ready for work.",
        "Coaching for resumes, interviews, soft skills, and showing up professionally."
      ],
      imageSrc: "/images/students-new/student-1.jpg",
      imageAlt: "Elevate For Humanity staff providing coaching and support.",
    },
    {
      id: "outcomes",
      title: "From Training to Employment",
      bullets: [
        "Talent pipelines for healthcare, skilled trades, transportation, customer service, and tech.",
        "WEX placements and OJT wage reimbursement to make it easier for employers to hire you.",
        "Stories of students who moved from stress and instability into stable income and career paths."
      ],
      imageSrc: "/images/success-new/success-1.jpg",
      imageAlt: "Graduate successfully employed in their career field.",
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
      imageSrc: "/images/programs/cna/cna-hero-main.jpg",
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
      imageSrc: "/images/programs/cna/cna-hero-earn.jpg",
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
      imageSrc: "/images/programs/cna/cna-training-lab.jpg",
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
      imageSrc: "/images/programs/cna/cna-outcomes.jpg",
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
      imageSrc: "/images/programs/barber/barber-hero-main.jpg",
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
      imageSrc: "/images/programs/barber/barber-hero-earn.jpg",
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
        "Drug-free workplace and professionalism training tailored to barber/beauty environments.",
      ],
      imageSrc: "/images/programs/barber/barber-training.jpg",
      imageAlt: "Instructor demonstrating a haircut technique to apprentices.",
    },
    {
      id: "barber-outcomes",
      title: "Where This Apprenticeship Can Take You",
      bullets: [
        "Licensed barber roles in shops and salons once apprenticeship and testing are complete.",
        "Paths into chair rental, commission-based work, or eventually shop ownership.",
        "A portable licensed trade that lets you work, travel, and build your own brand.",
      ],
      imageSrc: "/images/programs/barber/barber-outcomes.jpg",
      imageAlt: "Barber proudly standing by their station with tools organized.",
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
    default:
      return null;
  }
}
