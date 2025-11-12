/**
 * Video Templates
 * Pre-built templates using free, license-free resources
 * Images: Unsplash (free for commercial use)
 * Videos: Pexels (free for commercial use)
 * Music: Free Music Archive (CC licensed)
 */

export interface VideoTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  duration: number;
  scenes: TemplateScene[];
  tags: string[];
}

export interface TemplateScene {
  type: 'title' | 'content' | 'image' | 'video' | 'split';
  duration: number;
  script: string;
  voiceOver: boolean;
  background: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    source: string;
    credit: string;
  };
  textPosition: 'center' | 'top' | 'bottom';
  animation: 'fade' | 'slide' | 'zoom' | 'none';
  textStyle?: {
    fontSize: number;
    color: string;
    fontWeight: string;
  };
}

export const videoTemplates: VideoTemplate[] = [
  // WORKFORCE DEVELOPMENT TEMPLATES
  {
    id: 'wioa-program-overview',
    name: 'WIOA Program Overview',
    category: 'Workforce Development',
    description: 'Professional template for explaining WIOA workforce training programs',
    thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
    duration: 45,
    tags: ['WIOA', 'Training', 'Education', 'Professional'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'WIOA Workforce Training',
        voiceOver: true,
        background: '#1e40af',
        textPosition: 'center',
        animation: 'fade',
        textStyle: {
          fontSize: 72,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      },
      {
        type: 'video',
        duration: 10,
        script: 'The Workforce Innovation and Opportunity Act provides free training for eligible individuals',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4',
          source: 'Pexels',
          credit: 'fauxels'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Get trained in high-demand careers like Healthcare, Technology, and Skilled Trades',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920',
          source: 'Unsplash',
          credit: 'Christina @ wocintechchat.com'
        },
        textPosition: 'center',
        animation: 'zoom'
      },
      {
        type: 'content',
        duration: 10,
        script: '100% Funded Training - No Cost to You',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'slide',
        textStyle: {
          fontSize: 64,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      },
      {
        type: 'title',
        duration: 10,
        script: 'Apply Today at ElevateForHumanity.org',
        voiceOver: true,
        background: '#1e40af',
        textPosition: 'center',
        animation: 'fade',
        textStyle: {
          fontSize: 56,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      }
    ]
  },

  {
    id: 'apprenticeship-success',
    name: 'Apprenticeship Success Story',
    category: 'Success Stories',
    description: 'Showcase apprenticeship program success with testimonials',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    duration: 60,
    tags: ['Apprenticeship', 'Success', 'Testimonial'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'Success Stories',
        voiceOver: false,
        background: '#7c3aed',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'video',
        duration: 15,
        script: 'Meet John, who went from unemployed to certified barber in just 12 months',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/3205484/3205484-uhd_2560_1440_25fps.mp4',
          source: 'Pexels',
          credit: 'cottonbro studio'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'split',
        duration: 15,
        script: 'Earned while learning - Started at $15/hour, now making $35/hour',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920',
          source: 'Unsplash',
          credit: 'Allef Vinicius'
        },
        textPosition: 'center',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 15,
        script: 'Now owns his own barbershop and employs 3 apprentices',
        voiceOver: true,
        background: '#10b981',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920',
          source: 'Unsplash',
          credit: 'Arthur Edelmans'
        },
        textPosition: 'bottom',
        animation: 'zoom'
      },
      {
        type: 'title',
        duration: 10,
        script: 'Your Success Story Starts Here',
        voiceOver: true,
        background: '#7c3aed',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  },

  {
    id: 'how-to-apply',
    name: 'How to Apply',
    category: 'Instructional',
    description: 'Step-by-step guide for applying to programs',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    duration: 50,
    tags: ['Application', 'Tutorial', 'Guide'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'How to Apply',
        voiceOver: true,
        background: '#f59e0b',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Step 1: Visit our website and browse available programs',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920',
          source: 'Unsplash',
          credit: 'Carlos Muza'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Step 2: Check eligibility requirements for your chosen program',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1920',
          source: 'Unsplash',
          credit: 'Glenn Carstens-Peters'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Step 3: Complete the online application form',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1920',
          source: 'Unsplash',
          credit: 'Marten Bjork'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Step 4: Submit required documents and attend orientation',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920',
          source: 'Unsplash',
          credit: 'Scott Graham'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'title',
        duration: 5,
        script: 'Start Your Journey Today!',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  },

  {
    id: 'healthcare-training',
    name: 'Healthcare Training Program',
    category: 'Program Specific',
    description: 'Promote healthcare CNA/QMA training programs',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    duration: 40,
    tags: ['Healthcare', 'CNA', 'Medical', 'Training'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'Healthcare Career Training',
        voiceOver: true,
        background: '#dc2626',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'video',
        duration: 10,
        script: 'Become a Certified Nursing Assistant in just 4-8 weeks',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/4031818/4031818-uhd_2560_1440_25fps.mp4',
          source: 'Pexels',
          credit: 'Tima Miroshnichenko'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Hands-on training in real healthcare facilities',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920',
          source: 'Unsplash',
          credit: 'Hush Naidoo Jade Photography'
        },
        textPosition: 'center',
        animation: 'zoom'
      },
      {
        type: 'content',
        duration: 10,
        script: 'State certification included - Start earning $18-25 per hour',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'slide',
        textStyle: {
          fontSize: 56,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      },
      {
        type: 'title',
        duration: 5,
        script: 'Enroll Now - Classes Starting Soon',
        voiceOver: true,
        background: '#dc2626',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  },

  {
    id: 'skilled-trades',
    name: 'Skilled Trades Overview',
    category: 'Program Specific',
    description: 'Showcase welding, HVAC, and building maintenance programs',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    duration: 55,
    tags: ['Trades', 'Welding', 'HVAC', 'Construction'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'Skilled Trades Training',
        voiceOver: true,
        background: '#ea580c',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'video',
        duration: 12,
        script: 'Master in-demand skills in welding, HVAC, and building maintenance',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/5495955/5495955-uhd_2560_1440_25fps.mp4',
          source: 'Pexels',
          credit: 'Tima Miroshnichenko'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 12,
        script: 'Welding: MIG, TIG, and Stick - AWS Certification',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920',
          source: 'Unsplash',
          credit: 'Ant Rozetsky'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 12,
        script: 'HVAC: EPA 608 Certified - Year-round work',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920',
          source: 'Unsplash',
          credit: 'Piotr Chrobot'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 9,
        script: 'Earn $25-40 per hour - High demand careers',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'zoom',
        textStyle: {
          fontSize: 64,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      },
      {
        type: 'title',
        duration: 5,
        script: 'Build Your Future Today',
        voiceOver: true,
        background: '#ea580c',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  },

  {
    id: 'cdl-training',
    name: 'CDL Training Program',
    category: 'Program Specific',
    description: 'Commercial driver license training promotion',
    thumbnail: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
    duration: 45,
    tags: ['CDL', 'Trucking', 'Transportation', 'Driving'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'CDL Training Program',
        voiceOver: true,
        background: '#0891b2',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'video',
        duration: 12,
        script: 'Get your Class A CDL in just 4-6 weeks',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/2053100/2053100-uhd_2560_1440_24fps.mp4',
          source: 'Pexels',
          credit: 'Marcin Jozwiak'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Behind-the-wheel training with experienced instructors',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920',
          source: 'Unsplash',
          credit: 'Rhys Moult'
        },
        textPosition: 'bottom',
        animation: 'slide'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Earn $55,000-$75,000 per year - Sign-on bonuses available',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'zoom',
        textStyle: {
          fontSize: 56,
          color: '#ffffff',
          fontWeight: 'bold'
        }
      },
      {
        type: 'title',
        duration: 8,
        script: 'Start Your Trucking Career Today',
        voiceOver: true,
        background: '#0891b2',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  },

  {
    id: 'partner-testimonial',
    name: 'Partner Testimonial',
    category: 'Testimonials',
    description: 'Showcase partner organization success',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    duration: 50,
    tags: ['Partner', 'Testimonial', 'Collaboration'],
    scenes: [
      {
        type: 'title',
        duration: 5,
        script: 'Partner Success',
        voiceOver: false,
        background: '#6366f1',
        textPosition: 'center',
        animation: 'fade'
      },
      {
        type: 'video',
        duration: 15,
        script: 'WorkOne Indianapolis has placed over 200 students in careers',
        voiceOver: true,
        background: '#000000',
        media: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4',
          source: 'Pexels',
          credit: 'fauxels'
        },
        textPosition: 'bottom',
        animation: 'fade'
      },
      {
        type: 'content',
        duration: 15,
        script: '95% of graduates employed within 90 days',
        voiceOver: true,
        background: '#ffffff',
        media: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920',
          source: 'Unsplash',
          credit: 'LinkedIn Sales Solutions'
        },
        textPosition: 'center',
        animation: 'zoom'
      },
      {
        type: 'content',
        duration: 10,
        script: 'Partnering for workforce success since 2020',
        voiceOver: true,
        background: '#10b981',
        textPosition: 'center',
        animation: 'slide'
      },
      {
        type: 'title',
        duration: 5,
        script: 'Become a Partner Today',
        voiceOver: true,
        background: '#6366f1',
        textPosition: 'center',
        animation: 'fade'
      }
    ]
  }
];

// Template categories for filtering
export const templateCategories = [
  'All Templates',
  'Workforce Development',
  'Success Stories',
  'Instructional',
  'Program Specific',
  'Testimonials'
];

// Get templates by category
export function getTemplatesByCategory(category: string): VideoTemplate[] {
  if (category === 'All Templates') {
    return videoTemplates;
  }
  return videoTemplates.filter(t => t.category === category);
}

// Get template by ID
export function getTemplateById(id: string): VideoTemplate | undefined {
  return videoTemplates.find(t => t.id === id);
}
