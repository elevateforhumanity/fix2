/**
 * Milady Barber Apprenticeship Course Structure
 * DOL Registered Apprenticeship - 2,000 Hours
 * ETPL Approved Program
 */

export const miladyBarberCourse = {
  id: 'milady-barber-apprenticeship',
  title: 'Milady Barber Apprenticeship Program',
  provider: 'Milady',
  duration: '2000 hours',
  format: 'Hybrid - On-the-job + Classroom',
  certification: 'Indiana State Barber License',
  dolRegistered: true,
  etplApproved: true,
  
  modules: [
    {
      id: 'module-1',
      title: 'Module 1: Professional Foundations',
      hours: 80,
      description: 'Introduction to barbering profession, history, and professional standards',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'History of Barbering',
          duration: '4 hours',
          topics: [
            'Ancient barbering traditions',
            'Evolution of the profession',
            'Modern barbering industry',
            'Professional organizations and standards'
          ]
        },
        {
          id: 'lesson-1-2',
          title: 'Professional Image & Ethics',
          duration: '8 hours',
          topics: [
            'Personal grooming and hygiene',
            'Professional conduct and ethics',
            'Client communication skills',
            'Building a professional reputation'
          ]
        },
        {
          id: 'lesson-1-3',
          title: 'Shop Management Basics',
          duration: '12 hours',
          topics: [
            'Barbershop operations',
            'Appointment scheduling',
            'Inventory management',
            'Customer service excellence'
          ]
        },
        {
          id: 'lesson-1-4',
          title: 'State Laws & Regulations',
          duration: '8 hours',
          topics: [
            'Indiana State Board requirements',
            'Licensing procedures',
            'Scope of practice',
            'Legal responsibilities'
          ]
        }
      ]
    },
    
    {
      id: 'module-2',
      title: 'Module 2: Infection Control & Safety',
      hours: 100,
      description: 'Comprehensive training in sanitation, sterilization, and safety protocols',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Principles of Infection Control',
          duration: '12 hours',
          topics: [
            'Microbiology basics',
            'Pathogen transmission',
            'Universal precautions',
            'Disease prevention'
          ]
        },
        {
          id: 'lesson-2-2',
          title: 'Sanitation & Sterilization',
          duration: '16 hours',
          topics: [
            'Cleaning vs. disinfection vs. sterilization',
            'Chemical disinfectants',
            'Autoclave operation',
            'Tool and equipment sanitation'
          ]
        },
        {
          id: 'lesson-2-3',
          title: 'OSHA Standards & Bloodborne Pathogens',
          duration: '12 hours',
          topics: [
            'OSHA regulations for barbershops',
            'Bloodborne pathogen exposure control',
            'Personal protective equipment (PPE)',
            'Emergency procedures'
          ]
        },
        {
          id: 'lesson-2-4',
          title: 'Safety in the Barbershop',
          duration: '8 hours',
          topics: [
            'Fire safety and prevention',
            'Chemical safety and storage',
            'Ergonomics and injury prevention',
            'First aid basics'
          ]
        }
      ]
    },
    
    {
      id: 'module-3',
      title: 'Module 3: Anatomy, Physiology & Trichology',
      hours: 120,
      description: 'Scientific foundation of skin, hair, and scalp',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Skin Structure & Function',
          duration: '16 hours',
          topics: [
            'Layers of the skin',
            'Skin types and conditions',
            'Skin disorders and diseases',
            'Aging and skin care'
          ]
        },
        {
          id: 'lesson-3-2',
          title: 'Hair Structure & Growth',
          duration: '20 hours',
          topics: [
            'Hair anatomy and composition',
            'Hair growth cycles',
            'Hair types and textures',
            'Factors affecting hair growth'
          ]
        },
        {
          id: 'lesson-3-3',
          title: 'Scalp Care & Treatments',
          duration: '16 hours',
          topics: [
            'Scalp anatomy',
            'Common scalp conditions',
            'Scalp treatments and massages',
            'Product recommendations'
          ]
        },
        {
          id: 'lesson-3-4',
          title: 'Hair & Scalp Disorders',
          duration: '12 hours',
          topics: [
            'Alopecia and hair loss',
            'Dandruff and seborrhea',
            'Infections and infestations',
            'When to refer to medical professionals'
          ]
        }
      ]
    },
    
    {
      id: 'module-4',
      title: 'Module 4: Haircutting Fundamentals',
      hours: 200,
      description: 'Core haircutting techniques and clipper work',
      lessons: [
        {
          id: 'lesson-4-1',
          title: 'Tools of the Trade',
          duration: '20 hours',
          topics: [
            'Clippers and trimmers',
            'Shears and razors',
            'Combs and brushes',
            'Tool maintenance and care'
          ]
        },
        {
          id: 'lesson-4-2',
          title: 'Basic Haircutting Techniques',
          duration: '40 hours',
          topics: [
            'Sectioning and parting',
            'Cutting angles and elevations',
            'Blunt cutting',
            'Point cutting and texturizing'
          ]
        },
        {
          id: 'lesson-4-3',
          title: 'Clipper Cutting Mastery',
          duration: '60 hours',
          topics: [
            'Clipper-over-comb technique',
            'Guard work and blending',
            'Fades (low, mid, high)',
            'Taper techniques'
          ]
        },
        {
          id: 'lesson-4-4',
          title: 'Classic Men\'s Cuts',
          duration: '40 hours',
          topics: [
            'Business professional cuts',
            'Crew cuts and flat tops',
            'Pompadours and quiffs',
            'Traditional barbering styles'
          ]
        },
        {
          id: 'lesson-4-5',
          title: 'Modern & Trending Styles',
          duration: '40 hours',
          topics: [
            'Contemporary fades',
            'Textured crops',
            'Undercuts and disconnected styles',
            'Creative designs and patterns'
          ]
        }
      ]
    },
    
    {
      id: 'module-5',
      title: 'Module 5: Beard Design & Facial Hair',
      hours: 150,
      description: 'Comprehensive beard grooming and facial hair services',
      lessons: [
        {
          id: 'lesson-5-1',
          title: 'Beard Anatomy & Growth Patterns',
          duration: '12 hours',
          topics: [
            'Facial hair growth patterns',
            'Beard types and styles',
            'Face shapes and beard recommendations',
            'Beard care and maintenance'
          ]
        },
        {
          id: 'lesson-5-2',
          title: 'Beard Trimming & Shaping',
          duration: '40 hours',
          topics: [
            'Trimmer techniques',
            'Shear work on beards',
            'Line-up and edging',
            'Blending beard to haircut'
          ]
        },
        {
          id: 'lesson-5-3',
          title: 'Straight Razor Shaving',
          duration: '50 hours',
          topics: [
            'Straight razor safety and handling',
            'Shaving preparation and lathering',
            'Shaving techniques and strokes',
            'Hot towel services'
          ]
        },
        {
          id: 'lesson-5-4',
          title: 'Mustache & Sideburn Services',
          duration: '20 hours',
          topics: [
            'Mustache styles and trimming',
            'Sideburn design',
            'Detailing and precision work',
            'Product application'
          ]
        }
      ]
    },
    
    {
      id: 'module-6',
      title: 'Module 6: Hair Coloring & Chemical Services',
      hours: 150,
      description: 'Color theory and chemical service applications',
      lessons: [
        {
          id: 'lesson-6-1',
          title: 'Color Theory & Consultation',
          duration: '20 hours',
          topics: [
            'Color wheel and theory',
            'Natural hair color levels',
            'Client consultation for color',
            'Patch testing and safety'
          ]
        },
        {
          id: 'lesson-6-2',
          title: 'Hair Coloring Techniques',
          duration: '40 hours',
          topics: [
            'Permanent vs. semi-permanent color',
            'Gray coverage',
            'Highlights and lowlights',
            'Fashion colors and trends'
          ]
        },
        {
          id: 'lesson-6-3',
          title: 'Chemical Relaxing & Texturizing',
          duration: '30 hours',
          topics: [
            'Chemical relaxer application',
            'Texturizing services',
            'Curl reformation',
            'Chemical safety protocols'
          ]
        },
        {
          id: 'lesson-6-4',
          title: 'Perming & Wave Services',
          duration: '30 hours',
          topics: [
            'Permanent wave chemistry',
            'Rod selection and wrapping',
            'Processing and neutralizing',
            'Troubleshooting chemical services'
          ]
        }
      ]
    },
    
    {
      id: 'module-7',
      title: 'Module 7: Styling & Finishing',
      hours: 100,
      description: 'Professional styling techniques and product knowledge',
      lessons: [
        {
          id: 'lesson-7-1',
          title: 'Blow-Drying Techniques',
          duration: '20 hours',
          topics: [
            'Blow-dryer and attachment use',
            'Directional drying',
            'Volume and texture creation',
            'Heat protection'
          ]
        },
        {
          id: 'lesson-7-2',
          title: 'Product Knowledge & Application',
          duration: '24 hours',
          topics: [
            'Pomades, waxes, and gels',
            'Styling creams and mousses',
            'Finishing sprays',
            'Product recommendations by hair type'
          ]
        },
        {
          id: 'lesson-7-3',
          title: 'Thermal Styling',
          duration: '20 hours',
          topics: [
            'Flat iron techniques',
            'Curling iron use',
            'Heat styling safety',
            'Creating various textures'
          ]
        },
        {
          id: 'lesson-7-4',
          title: 'Finishing & Detail Work',
          duration: '16 hours',
          topics: [
            'Edge work and line-ups',
            'Neck shaving and cleanup',
            'Final touches and inspection',
            'Client education on home styling'
          ]
        }
      ]
    },
    
    {
      id: 'module-8',
      title: 'Module 8: Business & Client Relations',
      hours: 100,
      description: 'Building a successful barbering business',
      lessons: [
        {
          id: 'lesson-8-1',
          title: 'Client Consultation & Communication',
          duration: '20 hours',
          topics: [
            'Effective consultation techniques',
            'Active listening skills',
            'Managing client expectations',
            'Handling difficult situations'
          ]
        },
        {
          id: 'lesson-8-2',
          title: 'Business Operations',
          duration: '30 hours',
          topics: [
            'Booth rental vs. commission',
            'Pricing services',
            'Retail sales',
            'Record keeping and taxes'
          ]
        },
        {
          id: 'lesson-8-3',
          title: 'Marketing & Social Media',
          duration: '24 hours',
          topics: [
            'Building your brand',
            'Social media marketing',
            'Client retention strategies',
            'Online booking systems'
          ]
        },
        {
          id: 'lesson-8-4',
          title: 'Opening Your Own Shop',
          duration: '26 hours',
          topics: [
            'Business planning',
            'Location selection',
            'Licensing and permits',
            'Equipment and supply purchasing'
          ]
        }
      ]
    },
    
    {
      id: 'module-9',
      title: 'Module 9: Practical Application & Clinic',
      hours: 800,
      description: 'Hands-on client services under supervision',
      lessons: [
        {
          id: 'lesson-9-1',
          title: 'Supervised Client Services',
          duration: '600 hours',
          topics: [
            'Complete haircut services',
            'Beard and shaving services',
            'Chemical services',
            'Client consultation and retail'
          ]
        },
        {
          id: 'lesson-9-2',
          title: 'Advanced Techniques Practice',
          duration: '100 hours',
          topics: [
            'Complex fades and designs',
            'Advanced color techniques',
            'Specialty services',
            'Speed and efficiency building'
          ]
        },
        {
          id: 'lesson-9-3',
          title: 'Portfolio Development',
          duration: '50 hours',
          topics: [
            'Photography and documentation',
            'Before and after presentations',
            'Social media content creation',
            'Building your professional portfolio'
          ]
        },
        {
          id: 'lesson-9-4',
          title: 'State Board Preparation',
          duration: '50 hours',
          topics: [
            'Written exam preparation',
            'Practical exam practice',
            'Test-taking strategies',
            'Mock examinations'
          ]
        }
      ]
    },
    
    {
      id: 'module-10',
      title: 'Module 10: On-the-Job Training',
      hours: 1000,
      description: 'Paid apprenticeship in professional barbershop',
      lessons: [
        {
          id: 'lesson-10-1',
          title: 'Apprentice Level 1 (0-500 hours)',
          duration: '500 hours',
          topics: [
            'Shop operations and procedures',
            'Client interaction and service',
            'Basic cuts under supervision',
            'Tool maintenance and sanitation'
          ]
        },
        {
          id: 'lesson-10-2',
          title: 'Apprentice Level 2 (500-1000 hours)',
          duration: '500 hours',
          topics: [
            'Independent client services',
            'Advanced cutting techniques',
            'Chemical services application',
            'Building clientele'
          ]
        }
      ]
    }
  ],
  
  assessments: [
    {
      id: 'assessment-1',
      title: 'Module Completion Exams',
      description: 'Written and practical exams for each module',
      passingScore: 75
    },
    {
      id: 'assessment-2',
      title: 'Mid-Program Evaluation',
      description: 'Comprehensive assessment at 1,000 hours',
      passingScore: 80
    },
    {
      id: 'assessment-3',
      title: 'Final Practical Examination',
      description: 'Complete service demonstration',
      passingScore: 85
    },
    {
      id: 'assessment-4',
      title: 'Indiana State Board Exam',
      description: 'Written and practical state licensing exam',
      passingScore: 75
    }
  ],
  
  certifications: [
    {
      name: 'Milady Barber Apprenticeship Certificate',
      issuer: 'Milady / Elevate for Humanity',
      requirements: 'Complete all 2,000 hours and pass all assessments'
    },
    {
      name: 'DOL Registered Apprenticeship Completion',
      issuer: 'U.S. Department of Labor',
      requirements: 'Complete registered apprenticeship program'
    },
    {
      name: 'Indiana State Barber License',
      issuer: 'Indiana Professional Licensing Agency',
      requirements: 'Pass Indiana State Board examination'
    }
  ],
  
  funding: {
    wioa: true,
    wrg: true,
    cost: 0,
    description: 'Free with approved WIOA or WRG funding'
  }
};

export default miladyBarberCourse;
