/**
 * Additional Course Content
 * Courses 3-10 for complete catalog
 */

import { Course } from './courseContent';

// ============================================
// COURSE 3: BUILDING TECHNOLOGY
// ============================================

export const buildingTechCourse: Course = {
  id: 'building-tech-2025',
  title: 'Building Technology & Construction Fundamentals',
  slug: 'building-technology',
  description: 'NCCER-certified construction training covering carpentry, electrical, plumbing, and HVAC basics',
  longDescription: 'Launch your construction career with comprehensive training in building trades. Learn carpentry, electrical systems, plumbing, HVAC, and construction safety. NCCER certification included.',
  category: 'Skilled Trades',
  level: 'beginner',
  duration: 240,
  price: 0,
  thumbnail: '/images/efh-building-tech-card.jpg',
  instructor: {
    id: 'instructor-003',
    name: 'James Rodriguez',
    title: 'Master Carpenter & NCCER Instructor',
    bio: '25 years in construction with expertise in residential and commercial building. NCCER Master Trainer with passion for developing skilled tradespeople.',
    photo: '/images/instructors/james-rodriguez.jpg',
    credentials: [
      'NCCER Master Trainer',
      'OSHA 30-Hour Certified',
      'Licensed General Contractor',
      '25+ years construction experience',
    ],
  },
  prerequisites: [
    'High school diploma or GED',
    'Must be 18 years or older',
    'Ability to lift 50 lbs',
    'Pass drug screening',
  ],
  learningOutcomes: [
    'Read and interpret construction blueprints',
    'Use hand and power tools safely',
    'Perform basic carpentry tasks',
    'Understand electrical and plumbing systems',
    'Apply OSHA safety standards',
    'Earn NCCER Core Curriculum certification',
    'Qualify for apprenticeship programs',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-building-001',
    name: 'NCCER Core Curriculum Certificate',
    issuer: 'Elevate for Humanity / NCCER',
    description: 'Nationally recognized construction fundamentals certification',
    requirements: [
      'Complete 240 hours of training',
      'Pass NCCER written exams',
      'Demonstrate hands-on competencies',
      'Complete safety training',
    ],
  },
  tags: ['construction', 'carpentry', 'trades', 'nccer', 'apprenticeship'],
};

// ============================================
// COURSE 4: HEALTHCARE FUNDAMENTALS
// ============================================

export const healthcareFundamentalsCourse: Course = {
  id: 'healthcare-fundamentals-2025',
  title: 'Healthcare Fundamentals & Medical Terminology',
  slug: 'healthcare-fundamentals',
  description: 'Essential healthcare knowledge including medical terminology, anatomy, and patient care basics',
  longDescription: 'Build a strong foundation for any healthcare career. Learn medical terminology, basic anatomy and physiology, infection control, and healthcare systems. Perfect preparation for advanced healthcare training.',
  category: 'Healthcare',
  level: 'beginner',
  duration: 80,
  price: 0,
  thumbnail: '/images/healthcare-fundamentals.jpg',
  instructor: {
    id: 'instructor-004',
    name: 'Dr. Emily Chen, MD',
    title: 'Physician & Medical Educator',
    bio: 'Board-certified physician with 15 years teaching medical students and healthcare professionals. Passionate about making medical education accessible.',
    photo: '/images/instructors/emily-chen.jpg',
    credentials: [
      'MD, Board Certified',
      'Medical Education Fellowship',
      'Published medical educator',
      '15+ years teaching experience',
    ],
  },
  prerequisites: [
    'High school diploma or GED',
    'Interest in healthcare career',
  ],
  learningOutcomes: [
    'Understand and use medical terminology',
    'Identify major body systems and functions',
    'Apply infection control principles',
    'Navigate healthcare delivery systems',
    'Communicate effectively in healthcare settings',
    'Prepare for advanced healthcare training',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-healthcare-001',
    name: 'Healthcare Fundamentals Certificate',
    issuer: 'Elevate for Humanity',
    description: 'Foundation certificate for healthcare career pathways',
    requirements: [
      'Complete 80 hours of coursework',
      'Pass all module assessments',
      'Complete medical terminology exam',
    ],
  },
  tags: ['healthcare', 'medical-terminology', 'anatomy', 'foundation'],
};

// ============================================
// COURSE 5: TAX PREPARATION
// ============================================

export const taxPreparationCourse: Course = {
  id: 'tax-prep-2025',
  title: 'Professional Tax Preparation & IRS Certification',
  slug: 'tax-preparation',
  description: 'Comprehensive tax preparation training with IRS Annual Filing Season Program certification',
  longDescription: 'Become a professional tax preparer with IRS certification. Learn individual and business tax preparation, tax law, ethics, and practice management. Start your own tax business or work for established firms.',
  category: 'Business & Finance',
  level: 'intermediate',
  duration: 120,
  price: 0,
  thumbnail: '/images/programs/efh-tax-office-startup-og.jpg',
  instructor: {
    id: 'instructor-005',
    name: 'Robert Martinez, EA',
    title: 'Enrolled Agent & Tax Educator',
    bio: 'IRS Enrolled Agent with 20 years tax preparation experience. Owns successful tax practice and trains new tax professionals.',
    photo: '/images/instructors/robert-martinez.jpg',
    credentials: [
      'IRS Enrolled Agent (EA)',
      'Certified Tax Preparer',
      'Tax Practice Owner',
      '20+ years experience',
    ],
  },
  prerequisites: [
    'High school diploma or GED',
    'Basic math and computer skills',
    'Background check required',
  ],
  learningOutcomes: [
    'Prepare individual tax returns (Form 1040)',
    'Understand tax credits and deductions',
    'Navigate IRS tax software',
    'Apply tax law and regulations',
    'Maintain ethical standards',
    'Pass IRS Annual Filing Season Program',
    'Start tax preparation business',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-tax-001',
    name: 'IRS Annual Filing Season Program Certificate',
    issuer: 'Elevate for Humanity / IRS',
    description: 'IRS-recognized tax preparer certification',
    requirements: [
      'Complete 120 hours of training',
      'Pass IRS competency exam',
      'Complete continuing education',
      'Obtain PTIN (Preparer Tax ID)',
    ],
  },
  tags: ['tax-preparation', 'accounting', 'irs', 'business', 'entrepreneurship'],
};

// ============================================
// COURSE 6: CPR & FIRST AID
// ============================================

export const cprFirstAidCourse: Course = {
  id: 'cpr-first-aid-2025',
  title: 'CPR, AED & First Aid Certification',
  slug: 'cpr-first-aid',
  description: 'American Heart Association CPR/AED and First Aid certification for healthcare providers and general public',
  longDescription: 'Learn life-saving skills with AHA-certified CPR, AED, and First Aid training. Covers adult, child, and infant CPR, choking relief, and emergency response. Required for many healthcare and childcare positions.',
  category: 'Healthcare',
  level: 'beginner',
  duration: 8,
  price: 0,
  thumbnail: '/images/programs/efh-cpr-aed-first-aid-hero.jpg',
  instructor: {
    id: 'instructor-006',
    name: 'Lisa Thompson, RN',
    title: 'AHA Training Center Coordinator',
    bio: 'Emergency room nurse and AHA instructor with 12 years experience teaching life-saving skills to healthcare professionals and community members.',
    photo: '/images/instructors/lisa-thompson.jpg',
    credentials: [
      'Registered Nurse (RN)',
      'AHA BLS Instructor',
      'AHA First Aid Instructor',
      '12+ years ER experience',
    ],
  },
  prerequisites: [
    'Must be 11 years or older',
    'No prior experience required',
  ],
  learningOutcomes: [
    'Perform high-quality CPR for adults, children, and infants',
    'Use an AED (Automated External Defibrillator)',
    'Relieve choking in conscious and unconscious victims',
    'Provide first aid for common emergencies',
    'Recognize signs of heart attack and stroke',
    'Earn AHA CPR/AED and First Aid certification',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-cpr-001',
    name: 'AHA CPR/AED & First Aid Certification',
    issuer: 'American Heart Association',
    description: 'Nationally recognized CPR and First Aid certification valid for 2 years',
    requirements: [
      'Complete 8 hours of training',
      'Pass skills assessment',
      'Pass written exam (80% or higher)',
    ],
  },
  tags: ['cpr', 'first-aid', 'emergency', 'healthcare', 'safety'],
};

// ============================================
// COURSE 7: SOCIAL MEDIA MARKETING
// ============================================

export const socialMediaMarketingCourse: Course = {
  id: 'social-media-marketing-2025',
  title: 'Social Media Marketing & Digital Strategy',
  slug: 'social-media-marketing',
  description: 'Master social media marketing across all major platforms with content creation and analytics',
  longDescription: 'Become a social media marketing expert. Learn strategy, content creation, paid advertising, analytics, and community management across Facebook, Instagram, TikTok, LinkedIn, and Twitter.',
  category: 'Digital Marketing',
  level: 'beginner',
  duration: 60,
  price: 0,
  thumbnail: '/images/social-media-marketing.jpg',
  instructor: {
    id: 'instructor-007',
    name: 'Ashley Davis',
    title: 'Digital Marketing Strategist',
    bio: 'Award-winning social media marketer who has managed campaigns for Fortune 500 companies and small businesses. Passionate about democratizing digital marketing education.',
    photo: '/images/instructors/ashley-davis.jpg',
    credentials: [
      'Google Digital Marketing Certified',
      'Facebook Blueprint Certified',
      'HubSpot Inbound Certified',
      '10+ years agency experience',
    ],
  },
  prerequisites: [
    'Basic computer and internet skills',
    'Familiarity with social media platforms',
  ],
  learningOutcomes: [
    'Develop comprehensive social media strategies',
    'Create engaging content for each platform',
    'Run effective paid advertising campaigns',
    'Analyze metrics and optimize performance',
    'Build and manage online communities',
    'Use social media management tools',
    'Launch freelance marketing business',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-smm-001',
    name: 'Social Media Marketing Professional Certificate',
    issuer: 'Elevate for Humanity',
    description: 'Professional certification in social media marketing and strategy',
    requirements: [
      'Complete 60 hours of training',
      'Create portfolio of campaigns',
      'Pass platform-specific assessments',
      'Complete capstone project',
    ],
  },
  tags: ['social-media', 'marketing', 'digital-marketing', 'content-creation'],
};

// ============================================
// COURSE 8: WEB DEVELOPMENT
// ============================================

export const webDevelopmentCourse: Course = {
  id: 'web-development-2025',
  title: 'Full-Stack Web Development Bootcamp',
  slug: 'web-development',
  description: 'Comprehensive web development training covering HTML, CSS, JavaScript, React, and Node.js',
  longDescription: 'Launch your web development career with hands-on training in modern web technologies. Build responsive websites and web applications using HTML, CSS, JavaScript, React, and Node.js. Portfolio projects included.',
  category: 'Technology',
  level: 'beginner',
  duration: 320,
  price: 0,
  thumbnail: '/images/web-development.jpg',
  instructor: {
    id: 'instructor-008',
    name: 'David Kim',
    title: 'Senior Software Engineer',
    bio: 'Full-stack developer with 15 years experience at tech startups and Fortune 500 companies. Passionate about teaching coding to career changers.',
    photo: '/images/instructors/david-kim.jpg',
    credentials: [
      'BS Computer Science',
      'Senior Software Engineer',
      'Open source contributor',
      '15+ years development experience',
    ],
  },
  prerequisites: [
    'Basic computer skills',
    'Logical thinking ability',
    'Commitment to practice coding daily',
  ],
  learningOutcomes: [
    'Build responsive websites with HTML/CSS',
    'Program interactive features with JavaScript',
    'Create modern web apps with React',
    'Develop backend APIs with Node.js',
    'Use Git for version control',
    'Deploy applications to the cloud',
    'Build professional portfolio',
    'Qualify for junior developer positions',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-webdev-001',
    name: 'Full-Stack Web Development Certificate',
    issuer: 'Elevate for Humanity',
    description: 'Professional certification in full-stack web development',
    requirements: [
      'Complete 320 hours of training',
      'Build 5 portfolio projects',
      'Pass coding assessments',
      'Complete capstone project',
      'Code review by instructor',
    ],
  },
  tags: ['web-development', 'programming', 'javascript', 'react', 'nodejs'],
};

// ============================================
// COURSE 9: DATA ANALYTICS
// ============================================

export const dataAnalyticsCourse: Course = {
  id: 'data-analytics-2025',
  title: 'Data Analytics & Business Intelligence',
  slug: 'data-analytics',
  description: 'Master data analysis with Excel, SQL, Python, and Tableau for business intelligence',
  longDescription: 'Become a data analyst with training in Excel, SQL, Python, and data visualization. Learn to extract insights from data, create dashboards, and drive business decisions. Google Data Analytics certification included.',
  category: 'Technology',
  level: 'intermediate',
  duration: 180,
  price: 0,
  thumbnail: '/images/AI_Data_Science_Team_1c1aed48.png',
  instructor: {
    id: 'instructor-009',
    name: 'Dr. Priya Patel',
    title: 'Data Science Lead',
    bio: 'PhD in Statistics with 10 years experience in data science and analytics. Former data scientist at Google, now dedicated to training the next generation of analysts.',
    photo: '/images/instructors/priya-patel.jpg',
    credentials: [
      'PhD Statistics',
      'Google Certified Data Analyst',
      'Tableau Desktop Specialist',
      '10+ years data science experience',
    ],
  },
  prerequisites: [
    'Basic math skills',
    'Computer proficiency',
    'Logical thinking ability',
  ],
  learningOutcomes: [
    'Analyze data with Excel and SQL',
    'Program data analysis with Python',
    'Create visualizations with Tableau',
    'Apply statistical methods',
    'Build interactive dashboards',
    'Present data-driven insights',
    'Earn Google Data Analytics certification',
    'Qualify for analyst positions',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-data-001',
    name: 'Data Analytics Professional Certificate',
    issuer: 'Elevate for Humanity / Google',
    description: 'Professional certification in data analytics and business intelligence',
    requirements: [
      'Complete 180 hours of training',
      'Pass Google Data Analytics exam',
      'Complete 3 capstone projects',
      'Build analytics portfolio',
    ],
  },
  tags: ['data-analytics', 'sql', 'python', 'tableau', 'business-intelligence'],
};

// ============================================
// COURSE 10: BUSINESS MANAGEMENT
// ============================================

export const businessManagementCourse: Course = {
  id: 'business-management-2025',
  title: 'Small Business Management & Entrepreneurship',
  slug: 'business-management',
  description: 'Complete business management training covering operations, finance, marketing, and leadership',
  longDescription: 'Start and grow your own business with comprehensive training in business planning, financial management, marketing, operations, and leadership. Includes business plan development and mentorship.',
  category: 'Business & Finance',
  level: 'intermediate',
  duration: 100,
  price: 0,
  thumbnail: '/images/business-management.jpg',
  instructor: {
    id: 'instructor-010',
    name: 'Michael Thompson, MBA',
    title: 'Business Consultant & Entrepreneur',
    bio: 'Serial entrepreneur who has started 5 successful businesses. MBA from top business school. Passionate about helping others achieve business success.',
    photo: '/images/instructors/michael-thompson.jpg',
    credentials: [
      'MBA Business Administration',
      'Certified Business Consultant',
      'Serial Entrepreneur',
      '20+ years business experience',
    ],
  },
  prerequisites: [
    'Business idea or existing business',
    'Basic math and computer skills',
    'Entrepreneurial mindset',
  ],
  learningOutcomes: [
    'Develop comprehensive business plan',
    'Manage business finances and accounting',
    'Create marketing and sales strategies',
    'Understand legal and regulatory requirements',
    'Lead and manage teams effectively',
    'Secure business funding',
    'Scale and grow business operations',
  ],
  syllabus: [],
  certificate: {
    id: 'cert-business-001',
    name: 'Small Business Management Certificate',
    issuer: 'Elevate for Humanity',
    description: 'Professional certification in small business management and entrepreneurship',
    requirements: [
      'Complete 100 hours of training',
      'Develop complete business plan',
      'Pass business management exam',
      'Present business pitch',
    ],
  },
  tags: ['business', 'entrepreneurship', 'management', 'small-business', 'startup'],
};

// Export all additional courses
export const additionalCourses: Course[] = [
  buildingTechCourse,
  healthcareFundamentalsCourse,
  taxPreparationCourse,
  cprFirstAidCourse,
  socialMediaMarketingCourse,
  webDevelopmentCourse,
  dataAnalyticsCourse,
  businessManagementCourse,
];

export default additionalCourses;
