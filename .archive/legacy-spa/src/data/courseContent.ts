/**
 * Course Content Data
 * Complete course catalog with lessons, assessments, and certificates
 */

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  videoUrl?: string;
  content: string;
  objectives: string[];
  resources: Resource[];
  quiz?: Quiz;
}

export interface Resource {
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScore: number;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // total hours
  price: number;
  thumbnail: string;
  instructor: Instructor;
  prerequisites: string[];
  learningOutcomes: string[];
  syllabus: Lesson[];
  certificate: Certificate;
  tags: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  credentials: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  requirements: string[];
}

// ============================================
// COURSE 1: CNA TRAINING
// ============================================

export const cnaTrainingCourse: Course = {
  id: 'cna-training-2025',
  title: 'Certified Nursing Assistant (CNA) Training',
  slug: 'cna-training',
  description:
    'Comprehensive CNA training program with state certification preparation',
  longDescription:
    'Become a Certified Nursing Assistant with our comprehensive training program. Learn essential patient care skills, medical terminology, infection control, and vital signs monitoring. Includes hands-on clinical experience and state exam preparation.',
  category: 'Healthcare',
  level: 'beginner',
  duration: 120, // hours
  price: 0, // Free through WIOA
  thumbnail: '/images/efh-cna-card.jpg',
  instructor: {
    id: 'instructor-001',
    name: 'Dr. Sarah Johnson, RN',
    title: 'Director of Nursing Education',
    bio: 'Dr. Johnson has over 20 years of experience in nursing education and has trained thousands of CNAs. She holds a PhD in Nursing Education and is passionate about preparing the next generation of healthcare professionals.',
    photo: '/images/instructors/sarah-johnson.jpg',
    credentials: [
      'PhD in Nursing Education',
      'Registered Nurse (RN)',
      'Certified Nurse Educator (CNE)',
      '20+ years teaching experience',
    ],
  },
  prerequisites: [
    'High school diploma or GED',
    'Must be 18 years or older',
    'Background check required',
    'TB test and immunizations',
  ],
  learningOutcomes: [
    'Provide basic patient care and comfort measures',
    'Monitor and record vital signs accurately',
    'Assist with activities of daily living (ADLs)',
    'Maintain infection control and safety protocols',
    'Communicate effectively with patients and healthcare team',
    'Recognize and report changes in patient condition',
    'Pass state CNA certification exam',
  ],
  syllabus: [
    {
      id: 'cna-lesson-01',
      title: 'Introduction to Healthcare and the CNA Role',
      description:
        'Overview of healthcare settings, CNA responsibilities, and professional standards',
      duration: 120,
      content: `
# Introduction to Healthcare and the CNA Role

## Welcome to CNA Training!

Congratulations on taking the first step toward a rewarding career in healthcare! As a Certified Nursing Assistant, you'll play a vital role in patient care and be an essential member of the healthcare team.

## What is a CNA?

A Certified Nursing Assistant (CNA) provides basic care to patients in various healthcare settings including:
- Hospitals
- Nursing homes
- Assisted living facilities
- Home health agencies
- Rehabilitation centers

## CNA Responsibilities

### Direct Patient Care
- Assisting with activities of daily living (ADLs)
- Bathing, dressing, and grooming
- Feeding and hydration
- Toileting and incontinence care
- Mobility assistance and transfers

### Monitoring and Reporting
- Taking vital signs (temperature, pulse, respiration, blood pressure)
- Observing and reporting changes in patient condition
- Documenting care provided
- Communicating with nurses and other team members

### Environmental Care
- Maintaining clean and safe patient environment
- Changing linens and making beds
- Organizing patient belongings
- Ensuring call lights are within reach

## Professional Standards

### Ethics and Professionalism
- Patient confidentiality (HIPAA compliance)
- Respect for patient dignity and rights
- Cultural sensitivity and diversity awareness
- Professional boundaries
- Teamwork and collaboration

### Legal Considerations
- Scope of practice
- Delegation and supervision
- Mandatory reporting
- Documentation requirements

## Career Opportunities

CNAs are in high demand! According to the Bureau of Labor Statistics:
- Projected growth: 8% through 2030
- Median salary: $30,000 - $35,000 annually
- Opportunities for advancement to LPN, RN, or specialized roles

## Your Path to Certification

1. Complete this training program (120 hours)
2. Pass the state competency exam
3. Apply for state certification
4. Begin your healthcare career!

Let's get started on this exciting journey!
      `,
      objectives: [
        'Define the role and responsibilities of a CNA',
        'Identify various healthcare settings where CNAs work',
        'Understand professional and ethical standards',
        'Recognize legal considerations in patient care',
        'Describe career advancement opportunities',
      ],
      resources: [
        {
          title: 'CNA Handbook',
          type: 'pdf',
          url: '/resources/cna-handbook.pdf',
        },
        {
          title: 'Healthcare Facilities Tour',
          type: 'video',
          url: '/videos/healthcare-facilities-tour.mp4',
        },
      ],
      quiz: {
        id: 'cna-quiz-01',
        title: 'Introduction to CNA Role Quiz',
        passingScore: 80,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'What is the primary role of a CNA?',
            options: [
              'Diagnosing patient conditions',
              'Providing basic patient care under supervision',
              'Prescribing medications',
              'Performing surgical procedures',
            ],
            correctAnswer: 1,
            explanation:
              'CNAs provide basic patient care under the supervision of licensed nurses. They do not diagnose, prescribe, or perform surgical procedures.',
          },
          {
            id: 'q2',
            type: 'multiple-choice',
            question:
              "Which of the following is within a CNA's scope of practice?",
            options: [
              'Starting IV medications',
              'Taking vital signs',
              'Interpreting lab results',
              'Changing wound dressings',
            ],
            correctAnswer: 1,
            explanation:
              'Taking vital signs is a core CNA responsibility. Starting IVs, interpreting labs, and changing wound dressings require additional licensure.',
          },
          {
            id: 'q3',
            type: 'true-false',
            question:
              'CNAs must maintain patient confidentiality according to HIPAA regulations.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'True. All healthcare workers, including CNAs, must comply with HIPAA regulations to protect patient privacy.',
          },
          {
            id: 'q4',
            type: 'multiple-choice',
            question:
              "What should a CNA do if they observe a change in a patient's condition?",
            options: [
              'Wait until the end of shift to report it',
              'Report it immediately to the supervising nurse',
              "Document it but don't report it",
              "Tell the patient's family first",
            ],
            correctAnswer: 1,
            explanation:
              'CNAs should report any changes in patient condition immediately to the supervising nurse for prompt assessment and intervention.',
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Which setting do CNAs commonly work in?',
            options: [
              'Only hospitals',
              'Only nursing homes',
              'Various settings including hospitals, nursing homes, and home health',
              "Only doctor's offices",
            ],
            correctAnswer: 2,
            explanation:
              'CNAs work in diverse healthcare settings including hospitals, nursing homes, assisted living facilities, home health agencies, and rehabilitation centers.',
          },
        ],
      },
    },
    // Additional lessons would be added here...
  ],
  certificate: {
    id: 'cert-cna-001',
    name: 'Certified Nursing Assistant Certificate',
    issuer: 'Elevate for Humanity',
    description:
      'Official CNA training completion certificate recognized by state nursing boards',
    requirements: [
      'Complete all 120 hours of training',
      'Pass all module quizzes with 80% or higher',
      'Complete clinical practicum hours',
      'Pass final competency exam',
      'Demonstrate proficiency in all required skills',
    ],
  },
  tags: [
    'healthcare',
    'nursing',
    'patient-care',
    'certification',
    'entry-level',
  ],
};

// ============================================
// COURSE 2: BARBER TRAINING
// ============================================

export const barberTrainingCourse: Course = {
  id: 'barber-training-2025',
  title: 'Professional Barber Training & Licensure',
  slug: 'barber-training',
  description:
    'Complete barber training program with Milady curriculum and state licensure preparation',
  longDescription:
    'Master the art of barbering with our comprehensive training program. Learn cutting techniques, styling, shaving, sanitation, and business management. Includes hands-on practice and state board exam preparation.',
  category: 'Skilled Trades',
  level: 'beginner',
  duration: 1500, // hours (state requirement)
  price: 0,
  thumbnail: '/images/efh-barber-card.jpg',
  instructor: {
    id: 'instructor-002',
    name: 'Marcus Williams',
    title: 'Master Barber & Educator',
    bio: "Marcus has been a licensed barber for 15 years and owns three successful barbershops. He's passionate about teaching the next generation of barbers both technical skills and business acumen.",
    photo: '/images/instructors/marcus-williams.jpg',
    credentials: [
      'Master Barber License',
      'Milady Certified Instructor',
      'Small Business Owner',
      '15+ years industry experience',
    ],
  },
  prerequisites: [
    'High school diploma or GED',
    'Must be 16 years or older',
    'Valid government-issued ID',
  ],
  learningOutcomes: [
    'Perform professional haircuts and styling',
    'Execute traditional and modern shaving techniques',
    'Maintain sanitation and safety standards',
    'Provide excellent customer service',
    'Manage barbershop operations',
    'Pass state barber board examination',
    'Start and grow a barbering business',
  ],
  syllabus: [
    {
      id: 'barber-lesson-01',
      title: 'History of Barbering and Professional Image',
      description:
        'Explore the rich history of barbering and develop your professional image',
      duration: 90,
      content: `
# History of Barbering and Professional Image

## The Noble Art of Barbering

Barbering is one of the oldest professions in the world, dating back thousands of years. Let's explore this rich history and understand what it means to be a professional barber today.

## Historical Timeline

### Ancient Times (3500 BCE - 500 CE)
- Egyptian barbers were highly respected
- Barbers in ancient Rome served as surgeons
- Barber poles originated from bloodletting practices

### Middle Ages (500 - 1500 CE)
- Barber-surgeons performed medical procedures
- Guild system established professional standards
- Red and white pole symbolized blood and bandages

### Modern Era (1500 - Present)
- Separation of barbering and surgery
- Establishment of barber schools
- State licensing requirements
- Evolution of styles and techniques

## The Professional Barber

### Personal Presentation
- Clean, professional attire
- Good personal hygiene
- Well-groomed appearance
- Positive attitude

### Workplace Standards
- Punctuality and reliability
- Respect for clients and colleagues
- Continuous learning and improvement
- Ethical business practices

### Client Relations
- Active listening
- Clear communication
- Consultation skills
- Building long-term relationships

## Your Barbering Career

### Career Paths
- Barbershop employee
- Booth rental
- Shop owner
- Mobile barber
- Educator/trainer
- Platform artist

### Income Potential
- Entry level: $25,000 - $35,000
- Experienced: $40,000 - $60,000
- Shop owner: $60,000 - $100,000+
- Tips can significantly increase earnings

## Building Your Brand

### Personal Branding
- Develop your unique style
- Create a professional portfolio
- Build social media presence
- Network within the industry

### Business Skills
- Customer service excellence
- Time management
- Financial literacy
- Marketing and promotion

Let's begin your journey to becoming a professional barber!
      `,
      objectives: [
        'Understand the history and evolution of barbering',
        'Recognize the importance of professional image',
        'Identify career opportunities in barbering',
        'Develop personal branding strategies',
        'Understand business fundamentals',
      ],
      resources: [
        {
          title: 'Milady Standard Barbering Textbook',
          type: 'pdf',
          url: '/resources/milady-barbering.pdf',
        },
        {
          title: 'Professional Barber Portfolio Examples',
          type: 'pdf',
          url: '/resources/barber-portfolios.pdf',
        },
      ],
      quiz: {
        id: 'barber-quiz-01',
        title: 'History and Professional Image Quiz',
        passingScore: 80,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question:
              'What do the red and white stripes on a barber pole traditionally represent?',
            options: [
              'The colors of the American flag',
              'Blood and bandages from barber-surgeon era',
              'Red for men and white for women',
              'Just decorative colors',
            ],
            correctAnswer: 1,
            explanation:
              'The red and white stripes represent blood and bandages from when barbers also performed surgical procedures.',
          },
          {
            id: 'q2',
            type: 'true-false',
            question:
              'Professional appearance is important for building client trust and credibility.',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'True. A professional appearance helps establish credibility and makes clients feel confident in your services.',
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            question:
              'Which of the following is NOT a typical career path for barbers?',
            options: [
              'Shop owner',
              'Booth rental',
              'Medical surgeon',
              'Barber educator',
            ],
            correctAnswer: 2,
            explanation:
              'While barbers historically performed surgery, modern barbers focus on hair care and styling, not medical procedures.',
          },
        ],
      },
    },
  ],
  certificate: {
    id: 'cert-barber-001',
    name: 'Professional Barber Certificate',
    issuer: 'Elevate for Humanity',
    description:
      'Official barber training completion certificate meeting state board requirements',
    requirements: [
      'Complete all 1500 hours of training',
      'Pass all practical skill assessments',
      'Pass written examinations',
      'Complete required number of services',
      'Demonstrate sanitation and safety competency',
    ],
  },
  tags: [
    'barbering',
    'cosmetology',
    'skilled-trade',
    'licensure',
    'entrepreneurship',
  ],
};

// Export all courses
export const allCourses: Course[] = [
  cnaTrainingCourse,
  barberTrainingCourse,
  // Additional courses would be added here
];

export default allCourses;
