/**
 * Social Media Integration for Elevate for Humanity
 * Real social links, sharing, and tracking
 */

/**
 * Official Social Media Accounts
 */
export const SOCIAL_ACCOUNTS = {
  facebook: {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61571046346179',
    handle: '@elevateforhumanity',
    icon: 'facebook',
  },
  instagram: {
    name: 'Instagram',
    url: 'https://instagram.com/elevateforhumanity',
    handle: '@elevateforhumanity',
    icon: 'instagram',
  },
  linkedin: {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/',
    handle: 'Elevate for Humanity',
    icon: 'linkedin',
  },
    handle: '@Elevate4Humani1',
  },
};

/**
 * Social Sharing Configuration
 */
export interface ShareConfig {
  url: string;
  title: string;
  description?: string;
  image?: string;
  hashtags?: string[];
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(config: ShareConfig): string {
  const params = new URLSearchParams({
    u: config.url,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 */
  const text = config.description || config.title;
  const hashtags =
    config.hashtags?.join(',') || 'ElevateForHumanity,WorkforceDevelopment';

  const params = new URLSearchParams({
    url: config.url,
    text: text,
    hashtags: hashtags,
    via: 'Elevate4Humani1',
  });

}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(config: ShareConfig): string {
  const params = new URLSearchParams({
    url: config.url,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate email share URL
 */
export function getEmailShareUrl(config: ShareConfig): string {
  const subject = config.title;
  const body = `${config.description || ''}\n\n${config.url}`;

  const params = new URLSearchParams({
    subject: subject,
    body: body,
  });

  return `mailto:?${params.toString()}`;
}

/**
 * Generate WhatsApp share URL
 */
export function getWhatsAppShareUrl(config: ShareConfig): string {
  const text = `${config.title}\n\n${config.description || ''}\n\n${config.url}`;

  const params = new URLSearchParams({
    text: text,
  });

  return `https://wa.me/?${params.toString()}`;
}

/**
 * Get all share URLs for a page
 */
export function getAllShareUrls(config: ShareConfig) {
  return {
    facebook: getFacebookShareUrl(config),
    linkedin: getLinkedInShareUrl(config),
    email: getEmailShareUrl(config),
    whatsapp: getWhatsAppShareUrl(config),
  };
}

/**
 * Default share configurations for common pages
 */
export const defaultShareConfigs = {
  homepage: {
    title: 'Elevate for Humanity - Workforce Training & Development',
    description:
      'Connecting people to training, funding, and career opportunities. WIOA, apprenticeships, and more.',
    hashtags: ['ElevateForHumanity', 'WorkforceDevelopment', 'CareerTraining'],
  },
  programs: {
    title: 'Training Programs - Elevate for Humanity',
    description:
      'Explore apprenticeships, WIOA programs, and career training opportunities.',
    hashtags: ['CareerTraining', 'Apprenticeships', 'WIOA'],
  },
  taxServices: {
    title: 'Free Tax Preparation - Elevate for Humanity',
    description:
      'IRS-certified free tax preparation through VITA program. No income limits.',
    hashtags: ['FreeTaxPrep', 'VITA', 'TaxHelp'],
  },
};

/**
 * Social Media Bio Copy (for profile updates)
 */
export const SOCIAL_BIO = {
  short:
    'Workforce training platform connecting people to programs, funding, and careers. WIOA | Apprenticeships | Tax Services',

  medium:
    'Elevate for Humanity is a workforce operating platform that coordinates access to training, funding, and career opportunities. We support WIOA programs, apprenticeships, and provide free tax services.',

  long: `Elevate for Humanity is a multi-tenant workforce operating platform designed to support training, funding, compliance, and outcome reporting across jurisdictions.

We coordinate (not control) access to:
• Training programs and apprenticeships
• Workforce funding (WIOA, WRG, JRI)
• Free tax preparation (IRS VITA)
• Case management and support services

Contact: (317) 314-3757
Location: Indianapolis, IN`,
};

/**
 * Hashtag Strategy
 */
export const HASHTAGS = {
  primary: ['#ElevateForHumanity', '#WorkforceDevelopment', '#CareerTraining'],
  programs: [
    '#Apprenticeships',
    '#WIOA',
    '#JRI',
    '#CareerPathways',
    '#SkillsTraining',
  ],
  tax: ['#FreeTaxPrep', '#VITA', '#TaxHelp', '#IRSCertified'],
  impact: [
    '#SecondChances',
    '#EconomicMobility',
    '#CommunityImpact',
    '#WorkforceEquity',
  ],
};

/**
 * Content Calendar Themes (30-day rotation)
 */
export const CONTENT_THEMES = [
  {
    day: 1,
    theme: 'Program Spotlight',
    focus: 'Highlight a specific training program',
  },
  {
    day: 2,
    theme: 'Student Success',
    focus: 'Share a success story or testimonial',
  },
  {
    day: 3,
    theme: 'Funding Friday',
    focus: 'Explain funding sources (WIOA, WRG, etc.)',
  },
  {
    day: 4,
    theme: 'Weekend Motivation',
    focus: 'Inspirational quote or message',
  },
  {
    day: 5,
    theme: 'Partner Highlight',
    focus: 'Feature a training provider or employer',
  },
  { day: 6, theme: 'How It Works', focus: 'Explain the enrollment process' },
  {
    day: 7,
    theme: 'Tax Tip Tuesday',
    focus: 'Tax preparation tips and VITA info',
  },
  {
    day: 8,
    theme: 'Career Pathways',
    focus: 'Show career progression opportunities',
  },
  {
    day: 9,
    theme: 'Community Impact',
    focus: 'Share impact metrics and outcomes',
  },
  { day: 10, theme: 'FAQ Friday', focus: 'Answer common questions' },
];

/**
 * Platform-Specific Best Practices
 */
export const PLATFORM_GUIDELINES = {
  facebook: {
    postLength: '40-80 words',
    imageSize: '1200x630px',
    videoLength: '1-3 minutes',
    bestTimes: ['1-3 PM weekdays'],
    tone: 'Conversational, community-focused',
  },
  instagram: {
    postLength: '125-150 characters',
    imageSize: '1080x1080px (square) or 1080x1350px (portrait)',
    videoLength: '30-60 seconds (Reels)',
    bestTimes: ['11 AM - 1 PM, 7-9 PM'],
    tone: 'Visual storytelling, inspirational',
  },
  linkedin: {
    postLength: '150-300 words',
    imageSize: '1200x627px',
    videoLength: '30-90 seconds',
    bestTimes: ['7-8 AM, 12 PM, 5-6 PM weekdays'],
    tone: 'Professional, data-driven, impact-focused',
  },
    postLength: '71-100 characters (optimal)',
    imageSize: '1200x675px',
    videoLength: '15-45 seconds',
    bestTimes: ['8-10 AM, 6-9 PM'],
    tone: 'Concise, timely, conversational',
  },
};

/**
 * Compliance-Safe Captions
 * Pre-approved language for social posts
 */
export const SAFE_CAPTIONS = {
  programs: [
    'Explore training programs designed to help you build a career.',
    'Apprenticeships let you earn while you learn. See what is available.',
    'WIOA-funded programs may be available at no cost to eligible participants.',
  ],
  tax: [
    'Free tax preparation through IRS-certified VITA volunteers.',
    'Get your taxes done right. Free VITA services available.',
    'Professional tax preparation at no cost for eligible filers.',
  ],
  general: [
    'Connecting people to training, funding, and career opportunities.',
    'Your next career step starts here.',
    'We coordinate access to workforce programs and support services.',
  ],
};

/**
 * Track social share event
 */
export function trackSocialShare(platform: string, url: string, title: string) {
  // Analytics tracking
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'share', {
      method: platform,
      content_type: 'page',
      item_id: url,
      content_name: title,
    });
  }

  // Console log for debugging
  console.log(`Social share: ${platform} - ${title}`);
}

/**
 * Open share dialog
 */
export function openShareDialog(platform: string, url: string) {
  const width = 600;
  const height = 400;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  window.open(
    url,
    'share',
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
  );
}

/**
 * Native Web Share API (mobile-friendly)
 */
export async function nativeShare(config: ShareConfig): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: config.title,
      text: config.description,
      url: config.url,
    });
    return true;
  } catch (error) {
    console.error('Error sharing:', error);
    return false;
  }
}
