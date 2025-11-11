/**
 * Dynamic Page Types
 * Flexible content management system for creating pages dynamically
 */

export interface PageBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'video' | 'carousel' | 'grid' | 'testimonials' | 'cta' | 'form' | 'accordion' | 'stats';
  order: number;
  data: any;
  settings?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    fullWidth?: boolean;
  };
}

export interface HeroBlock extends PageBlock {
  type: 'hero';
  data: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    buttons?: Array<{
      text: string;
      url: string;
      style: 'primary' | 'secondary' | 'outline';
    }>;
    overlay?: boolean;
    overlayOpacity?: number;
  };
}

export interface TextBlock extends PageBlock {
  type: 'text';
  data: {
    title?: string;
    content: string;
    alignment?: 'left' | 'center' | 'right';
    maxWidth?: string;
  };
}

export interface ImageBlock extends PageBlock {
  type: 'image';
  data: {
    src: string;
    alt: string;
    caption?: string;
    width?: string;
    height?: string;
    objectFit?: 'cover' | 'contain' | 'fill';
  };
}

export interface VideoBlock extends PageBlock {
  type: 'video';
  data: {
    url: string;
    title?: string;
    description?: string;
    thumbnail?: string;
    autoplay?: boolean;
    controls?: boolean;
  };
}

export interface CarouselBlock extends PageBlock {
  type: 'carousel';
  data: {
    slides: Array<{
      image: string;
      title?: string;
      description?: string;
      link?: string;
    }>;
    autoplay?: boolean;
    interval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
  };
}

export interface GridBlock extends PageBlock {
  type: 'grid';
  data: {
    title?: string;
    columns: number;
    items: Array<{
      icon?: string;
      image?: string;
      title: string;
      description: string;
      link?: string;
    }>;
  };
}

export interface TestimonialsBlock extends PageBlock {
  type: 'testimonials';
  data: {
    title?: string;
    testimonials: Array<{
      name: string;
      role?: string;
      company?: string;
      image?: string;
      quote: string;
      rating?: number;
    }>;
  };
}

export interface CTABlock extends PageBlock {
  type: 'cta';
  data: {
    title: string;
    description?: string;
    buttons: Array<{
      text: string;
      url: string;
      style: 'primary' | 'secondary' | 'outline';
    }>;
    backgroundImage?: string;
  };
}

export interface FormBlock extends PageBlock {
  type: 'form';
  data: {
    title?: string;
    description?: string;
    fields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
      required?: boolean;
      placeholder?: string;
      options?: string[];
    }>;
    submitText?: string;
    submitUrl?: string;
  };
}

export interface AccordionBlock extends PageBlock {
  type: 'accordion';
  data: {
    title?: string;
    items: Array<{
      title: string;
      content: string;
    }>;
  };
}

export interface StatsBlock extends PageBlock {
  type: 'stats';
  data: {
    title?: string;
    stats: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };
}

export interface DynamicPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author?: string;
  category?: string;
  tags?: string[];
  blocks: PageBlock[];
  settings?: {
    layout?: 'default' | 'full-width' | 'sidebar';
    theme?: 'light' | 'dark';
    headerStyle?: 'default' | 'transparent' | 'hidden';
    footerStyle?: 'default' | 'minimal' | 'hidden';
  };
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  blocks: PageBlock[];
  category: 'landing' | 'about' | 'services' | 'blog' | 'contact' | 'custom';
}
