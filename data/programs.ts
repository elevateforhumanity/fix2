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
    overview: "Learn installation, diagnostics, and repair of HVAC systems.",
    length: "3–6 months",
    schedule: "Day/Evening",
    delivery: "Hands-on Lab",
    location: "Training sites",
    credential: "HVAC Training Certificate",
    salaryRange: "$18–$30/hr",
    employers: "HVAC companies, facility teams",
    imageSrc: "/media/programs/hvac-hd.jpg",
    imageAlt: "HVAC tech",
    whatYoullLearn: ["Systems", "Diagnostics", "Refrigeration", "Safety"],
    dayInTheLife: ["Service calls", "Diagnostics", "Customer service"],
    isRightForYouIf: ["You like hands-on work"],
    fundingHighlights: ["WRG eligible", "WIOA eligible"]
  },
  {
    slug: "cdl",
    name: "CDL Class A/B",
    category: "Transportation",
    heroTagline: "Start a driving career with strong earning potential.",
    overview: "Behind-the-wheel CDL training preparing for state exam.",
    length: "4–8 weeks",
    schedule: "Daytime",
    delivery: "On-road + Classroom",
    location: "Driving yards",
    credential: "CDL-A or CDL-B",
    salaryRange: "$45k–$70k",
    employers: "Trucking companies, logistics",
    imageSrc: "/media/programs/cdl-hd.jpg",
    imageAlt: "Truck driver",
    whatYoullLearn: [
      "Vehicle inspection",
      "Backing & maneuvering",
      "DOT compliance",
      "Road safety"
    ],
    dayInTheLife: ["Inspect truck", "Drive routes", "Document logs"],
    isRightForYouIf: ["You enjoy being on the road"],
    fundingHighlights: ["WIOA eligible", "Employer sponsorship possible"]
  }
];
