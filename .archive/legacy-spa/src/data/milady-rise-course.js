/**
 * Milady RISE Partner Program - Course Data
 * For LMS Integration
 */

export const miladyRISECourse = {
  id: 'milady-rise-certification',
  title: 'Client Well-Being & Safety Certification',
  provider: 'Milady RISE Program',
  partner_code: 'efhcti-rise295',

  description:
    'Comprehensive certification program covering Domestic Violence Awareness, Human Trafficking Awareness, and Infection Control. Upon completion, students become certified in Client Well-Being & Safety and eligible for the $500 RISE Scholarship.',

  topics: [
    {
      id: 'domestic-violence',
      title: 'Domestic Violence Awareness',
      description:
        'Learn to recognize signs of domestic violence and provide appropriate support to clients',
      duration: '60 minutes',
      required: true,
    },
    {
      id: 'human-trafficking',
      title: 'Human Trafficking Awareness',
      description:
        'Understand human trafficking indicators and how to respond appropriately',
      duration: '60 minutes',
      required: true,
    },
    {
      id: 'infection-control',
      title: 'Infection Control',
      description:
        'Master proper infection control procedures for client and professional safety',
      duration: '120 minutes',
      required: true,
    },
  ],

  total_duration: '4 hours',

  certification: {
    name: 'Client Well-Being & Safety Certification',
    issuer: 'Milady',
    valid_period: 'Lifetime',
    digital_badge: true,
  },

  scholarship: {
    available: true,
    amount: 500,
    currency: 'USD',
    frequency: 'Twice yearly (Spring & Fall)',
    recipients_per_period: 10,
    eligibility_requirement: 'Complete certification',
    application_url: '/apply-scholarship/milady-rise',
  },

  enrollment: {
    url: 'https://www.miladytraining.com/bundles/client-well-being-safety-certification',
    promo_code: 'efhcti-rise295',
    redemptions_available: 1000,
    cost: 0, // Free with promo code
    instructions: [
      'Visit the enrollment page',
      'Click "Enroll Now" and register or login',
      'Enter promo code at checkout: efhcti-rise295',
      'Complete enrollment and begin courses',
    ],
  },

  target_audience: [
    'Barbering students',
    'Cosmetology students',
    'Esthetics students',
    'Beauty industry professionals',
    'Salon staff',
    'Instructors and educators',
  ],

  learning_outcomes: [
    'Recognize signs of domestic violence and provide appropriate support',
    'Identify human trafficking indicators and know how to respond',
    'Implement proper infection control procedures',
    'Create a safe and supportive environment for clients',
    'Understand legal and ethical responsibilities',
    'Apply best practices for client well-being',
  ],

  requirements: {
    prerequisites: 'None',
    technical: 'Internet access, modern web browser',
    time_commitment: '4 hours total (can be completed at own pace)',
    completion_criteria: 'Pass all module assessments',
  },

  benefits: [
    'Free certification (normally paid)',
    'Eligibility for $500 scholarship',
    'Professional credential',
    'Enhanced client safety knowledge',
    'Career advancement opportunity',
    'Community impact',
  ],

  integration: {
    lms_category: 'Professional Development',
    tags: [
      'certification',
      'safety',
      'awareness',
      'professional-development',
      'scholarship-eligible',
    ],
    featured: true,
    recommended: true,
    priority: 'high',
  },

  contact: {
    info: 'See your partner email for contact information and support links',
  },

  marketing: {
    tagline: 'Get Certified. Make a Difference. Win $500.',
    call_to_action: 'Enroll Now - Free with Code',
    social_hashtags: ['#MiladyRISE', '#ClientSafety', '#BeautyIndustry'],
    promotional_images: '/assets/milady-rise-promo.png',
  },

  tracking: {
    enrollment_metric: 'milady_rise_enrollments',
    completion_metric: 'milady_rise_completions',
    certification_metric: 'milady_rise_certifications',
    scholarship_applications: 'milady_rise_scholarship_apps',
  },
};

export const miladyRISEBestPractices = [
  {
    title: 'Lead by Example',
    description:
      'Directors and instructors should complete the certification first to demonstrate its importance.',
    impact:
      'Schools report significantly higher completion rates when leadership participates.',
  },
  {
    title: 'Make it Required',
    description:
      'Integrate into curriculum as a required component, not optional.',
    implementation: 'Assign as homework or incorporate into daily lessons.',
  },
  {
    title: 'Maximize Downtime',
    description: 'Promote as a productive use of free time between classes.',
    implementation: 'Post instructions in breakrooms and study areas.',
  },
  {
    title: 'Celebrate Completions',
    description: 'Recognize students who complete the certification publicly.',
    implementation:
      'Announce completions, display certificates, share on social media.',
  },
  {
    title: 'Track Progress',
    description: 'Monitor enrollment and completion rates regularly.',
    implementation:
      'Use LMS dashboard to identify students who need encouragement.',
  },
];

export const miladyRISEEnrollmentSteps = [
  {
    step: 1,
    title: 'Access Enrollment Page',
    action:
      'Visit https://www.miladytraining.com/bundles/client-well-being-safety-certification',
    user_action: 'Click the enrollment link provided',
  },
  {
    step: 2,
    title: 'Create Account or Login',
    action: 'Click "Enroll Now" button',
    user_action: 'Register for new account or login with existing credentials',
  },
  {
    step: 3,
    title: 'Apply Promo Code',
    action: 'Enter code at checkout: efhcti-rise295',
    user_action: 'Carefully type code with no spaces or punctuation',
    important: 'Code is case-sensitive and must be exact',
  },
  {
    step: 4,
    title: 'Complete Enrollment',
    action: 'Finalize registration',
    user_action: 'Confirm enrollment and begin courses immediately',
  },
];

export default miladyRISECourse;
