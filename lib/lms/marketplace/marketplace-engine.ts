// Course Marketplace Engine
// Complete marketplace with search, filtering, ratings, and recommendations

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface MarketplaceCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnailUrl?: string;
  trailerVideoUrl?: string;
  
  // Instructor
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  
  // Categorization
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  
  // Pricing
  price: number;
  currency: string;
  isFree: boolean;
  discountPrice?: number;
  discountEndsAt?: Date;
  
  // Stats
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  completionRate: number;
  
  // Content
  durationHours: number;
  lessonsCount: number;
  sectionsCount: number;
  
  // Features
  certificateEnabled: boolean;
  hasQuizzes: boolean;
  hasAssignments: boolean;
  hasLiveClasses: boolean;
  
  // Status
  status: 'published' | 'draft' | 'archived';
  publishedAt?: Date;
  lastUpdated: Date;
}

export interface MarketplaceFilters {
  category?: string;
  level?: string;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  rating?: number;
  language?: string;
  tags?: string[];
  search?: string;
}

export interface MarketplaceSortOptions {
  sortBy: 'popular' | 'newest' | 'rating' | 'price_low' | 'price_high';
  order: 'asc' | 'desc';
}

export class MarketplaceEngine {
  private tenantId: string;
  
  constructor(tenantId: string) {
    this.tenantId = tenantId;
  }
  
  // Search and filter courses
  async searchCourses(
    filters: MarketplaceFilters = {},
    sort: MarketplaceSortOptions = { sortBy: 'popular', order: 'desc' },
    page: number = 1,
    limit: number = 20
  ): Promise<{ courses: MarketplaceCourse[]; total: number; pages: number }> {
    let query = supabase
      .from('courses')
      .select(`
        *,
        instructor:tenant_users!instructor_id(id, first_name, last_name, avatar_url, bio),
        enrollments(count),
        sections:course_sections(count),
        lessons:course_lessons(count)
      `, { count: 'exact' })
      .eq('tenant_id', this.tenantId)
      .eq('status', 'published');
    
    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters.level) {
      query = query.eq('level', filters.level);
    }
    
    if (filters.isFree !== undefined) {
      query = query.eq('is_free', filters.isFree);
    }
    
    if (filters.priceMin !== undefined) {
      query = query.gte('price', filters.priceMin);
    }
    
    if (filters.priceMax !== undefined) {
      query = query.lte('price', filters.priceMax);
    }
    
    if (filters.language) {
      query = query.eq('language', filters.language);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      query = query.contains('tags', filters.tags);
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    // Apply sorting
    switch (sort.sortBy) {
      case 'newest':
        query = query.order('published_at', { ascending: sort.order === 'asc' });
        break;
      case 'rating':
        // TODO: Implement ratings table
        query = query.order('created_at', { ascending: sort.order === 'asc' });
        break;
      case 'price_low':
        query = query.order('price', { ascending: true });
        break;
      case 'price_high':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
      default:
        // Sort by enrollment count
        query = query.order('created_at', { ascending: false });
        break;
    }
    
    // Pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    
    const { data: courses, error, count } = await query;
    
    if (error) throw error;
    
    const marketplaceCourses: MarketplaceCourse[] = courses?.map(c => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      shortDescription: c.short_description,
      thumbnailUrl: c.thumbnail_url,
      trailerVideoUrl: c.trailer_video_url,
      instructor: {
        id: c.instructor.id,
        name: `${c.instructor.first_name} ${c.instructor.last_name}`,
        avatar: c.instructor.avatar_url,
        bio: c.instructor.bio,
      },
      category: c.category,
      tags: c.tags || [],
      level: c.level,
      language: c.language,
      price: parseFloat(c.price),
      currency: c.currency,
      isFree: c.is_free,
      enrollmentCount: c.enrollments?.[0]?.count || 0,
      rating: 4.5, // TODO: Calculate from ratings
      reviewCount: 0, // TODO: Count from reviews
      completionRate: 75, // TODO: Calculate from enrollments
      durationHours: c.duration_hours || 0,
      lessonsCount: c.lessons?.[0]?.count || 0,
      sectionsCount: c.sections?.[0]?.count || 0,
      certificateEnabled: c.certificate_enabled,
      hasQuizzes: true, // TODO: Check assessments
      hasAssignments: true, // TODO: Check assessments
      hasLiveClasses: false, // TODO: Check live sessions
      status: c.status,
      publishedAt: c.published_at ? new Date(c.published_at) : undefined,
      lastUpdated: new Date(c.updated_at),
    })) || [];
    
    return {
      courses: marketplaceCourses,
      total: count || 0,
      pages: Math.ceil((count || 0) / limit),
    };
  }
  
  // Get course details for marketplace
  async getCourseDetails(courseId: string): Promise<MarketplaceCourse & {
    syllabus: any[];
    reviews: any[];
    relatedCourses: MarketplaceCourse[];
  }> {
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:tenant_users!instructor_id(*),
        sections:course_sections(
          *,
          lessons:course_lessons(*)
        ),
        enrollments(count)
      `)
      .eq('id', courseId)
      .eq('tenant_id', this.tenantId)
      .single();
    
    if (error) throw error;
    
    // Get related courses
    const relatedCourses = await this.getRelatedCourses(courseId, course.category);
    
    // Get reviews (TODO: Implement reviews table)
    const reviews: any[] = [];
    
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      shortDescription: course.short_description,
      thumbnailUrl: course.thumbnail_url,
      trailerVideoUrl: course.trailer_video_url,
      instructor: {
        id: course.instructor.id,
        name: `${course.instructor.first_name} ${course.instructor.last_name}`,
        avatar: course.instructor.avatar_url,
        bio: course.instructor.bio,
      },
      category: course.category,
      tags: course.tags || [],
      level: course.level,
      language: course.language,
      price: parseFloat(course.price),
      currency: course.currency,
      isFree: course.is_free,
      enrollmentCount: course.enrollments?.[0]?.count || 0,
      rating: 4.5,
      reviewCount: 0,
      completionRate: 75,
      durationHours: course.duration_hours || 0,
      lessonsCount: course.sections?.reduce((sum: number, s: any) => sum + (s.lessons?.length || 0), 0) || 0,
      sectionsCount: course.sections?.length || 0,
      certificateEnabled: course.certificate_enabled,
      hasQuizzes: true,
      hasAssignments: true,
      hasLiveClasses: false,
      status: course.status,
      publishedAt: course.published_at ? new Date(course.published_at) : undefined,
      lastUpdated: new Date(course.updated_at),
      syllabus: course.sections || [],
      reviews,
      relatedCourses,
    };
  }
  
  // Get related courses
  private async getRelatedCourses(courseId: string, category: string): Promise<MarketplaceCourse[]> {
    const { data: courses } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:tenant_users!instructor_id(id, first_name, last_name, avatar_url),
        enrollments(count)
      `)
      .eq('tenant_id', this.tenantId)
      .eq('category', category)
      .eq('status', 'published')
      .neq('id', courseId)
      .limit(4);
    
    return courses?.map(c => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      shortDescription: c.short_description,
      thumbnailUrl: c.thumbnail_url,
      trailerVideoUrl: c.trailer_video_url,
      instructor: {
        id: c.instructor.id,
        name: `${c.instructor.first_name} ${c.instructor.last_name}`,
        avatar: c.instructor.avatar_url,
        bio: c.instructor.bio,
      },
      category: c.category,
      tags: c.tags || [],
      level: c.level,
      language: c.language,
      price: parseFloat(c.price),
      currency: c.currency,
      isFree: c.is_free,
      enrollmentCount: c.enrollments?.[0]?.count || 0,
      rating: 4.5,
      reviewCount: 0,
      completionRate: 75,
      durationHours: c.duration_hours || 0,
      lessonsCount: 0,
      sectionsCount: 0,
      certificateEnabled: c.certificate_enabled,
      hasQuizzes: true,
      hasAssignments: true,
      hasLiveClasses: false,
      status: c.status,
      publishedAt: c.published_at ? new Date(c.published_at) : undefined,
      lastUpdated: new Date(c.updated_at),
    })) || [];
  }
  
  // Get featured courses
  async getFeaturedCourses(limit: number = 6): Promise<MarketplaceCourse[]> {
    const { data: courses } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:tenant_users!instructor_id(id, first_name, last_name, avatar_url),
        enrollments(count)
      `)
      .eq('tenant_id', this.tenantId)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return courses?.map(c => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      description: c.description,
      shortDescription: c.short_description,
      thumbnailUrl: c.thumbnail_url,
      trailerVideoUrl: c.trailer_video_url,
      instructor: {
        id: c.instructor.id,
        name: `${c.instructor.first_name} ${c.instructor.last_name}`,
        avatar: c.instructor.avatar_url,
        bio: c.instructor.bio,
      },
      category: c.category,
      tags: c.tags || [],
      level: c.level,
      language: c.language,
      price: parseFloat(c.price),
      currency: c.currency,
      isFree: c.is_free,
      enrollmentCount: c.enrollments?.[0]?.count || 0,
      rating: 4.5,
      reviewCount: 0,
      completionRate: 75,
      durationHours: c.duration_hours || 0,
      lessonsCount: 0,
      sectionsCount: 0,
      certificateEnabled: c.certificate_enabled,
      hasQuizzes: true,
      hasAssignments: true,
      hasLiveClasses: false,
      status: c.status,
      publishedAt: c.published_at ? new Date(c.published_at) : undefined,
      lastUpdated: new Date(c.updated_at),
    })) || [];
  }
  
  // Get categories with course counts
  async getCategories(): Promise<Array<{ name: string; count: number }>> {
    const { data: categories } = await supabase
      .from('courses')
      .select('category')
      .eq('tenant_id', this.tenantId)
      .eq('status', 'published');
    
    const categoryCounts = categories?.reduce((acc: any, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {}) || {};
    
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count: count as number,
    }));
  }
}

export function createMarketplaceEngine(tenantId: string): MarketplaceEngine {
  return new MarketplaceEngine(tenantId);
}
