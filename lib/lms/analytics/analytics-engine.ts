// Advanced Analytics Engine for Universal LMS
// Real-time analytics, predictive insights, and custom reporting

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AnalyticsMetrics {
  // Enrollment metrics
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  enrollmentGrowth: number;
  
  // Student metrics
  totalStudents: number;
  activeStudents: number;
  averageCompletionRate: number;
  averageTimeToComplete: number;
  studentRetentionRate: number;
  
  // Course metrics
  totalCourses: number;
  publishedCourses: number;
  averageCourseRating: number;
  mostPopularCourses: Array<{
    id: string;
    title: string;
    enrollments: number;
  }>;
  
  // Revenue metrics
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  
  // Engagement metrics
  averageSessionDuration: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  
  // Performance metrics
  averageQuizScore: number;
  passRate: number;
  certificateIssuanceRate: number;
}

export interface StudentAnalytics {
  studentId: string;
  totalCoursesEnrolled: number;
  coursesCompleted: number;
  coursesInProgress: number;
  averageProgress: number;
  totalTimeSpent: number;
  averageQuizScore: number;
  certificatesEarned: number;
  lastActive: Date;
  engagementScore: number;
  riskScore: number; // Dropout risk prediction
  recommendedCourses: string[];
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completionRate: number;
  averageCompletionTime: number;
  averageRating: number;
  totalRevenue: number;
  dropoutRate: number;
  engagementRate: number;
  mostEngagingLessons: Array<{
    lessonId: string;
    title: string;
    completionRate: number;
  }>;
  strugglingStudents: Array<{
    studentId: string;
    name: string;
    progress: number;
    riskScore: number;
  }>;
}

export class AnalyticsEngine {
  private tenantId: string;
  
  constructor(tenantId: string) {
    this.tenantId = tenantId;
  }
  
  // Get overall platform metrics
  async getPlatformMetrics(dateRange?: { start: Date; end: Date }): Promise<AnalyticsMetrics> {
    const [
      enrollments,
      students,
      courses,
      revenue,
      engagement,
      performance
    ] = await Promise.all([
      this.getEnrollmentMetrics(dateRange),
      this.getStudentMetrics(dateRange),
      this.getCourseMetrics(),
      this.getRevenueMetrics(dateRange),
      this.getEngagementMetrics(dateRange),
      this.getPerformanceMetrics(dateRange),
    ]);
    
    return {
      ...enrollments,
      ...students,
      ...courses,
      ...revenue,
      ...engagement,
      ...performance,
    };
  }
  
  // Enrollment metrics
  private async getEnrollmentMetrics(dateRange?: { start: Date; end: Date }) {
    let query = supabase
      .from('enrollments')
      .select('status, created_at', { count: 'exact' })
      .eq('tenant_id', this.tenantId);
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }
    
    const { data: enrollments, count } = await query;
    
    const active = enrollments?.filter(e => e.status === 'active').length || 0;
    const completed = enrollments?.filter(e => e.status === 'completed').length || 0;
    
    // Calculate growth
    const previousPeriod = await this.getPreviousPeriodEnrollments(dateRange);
    const growth = previousPeriod > 0 
      ? ((count || 0) - previousPeriod) / previousPeriod * 100 
      : 0;
    
    return {
      totalEnrollments: count || 0,
      activeEnrollments: active,
      completedEnrollments: completed,
      enrollmentGrowth: Math.round(growth * 100) / 100,
    };
  }
  
  private async getPreviousPeriodEnrollments(dateRange?: { start: Date; end: Date }): Promise<number> {
    if (!dateRange) return 0;
    
    const duration = dateRange.end.getTime() - dateRange.start.getTime();
    const previousStart = new Date(dateRange.start.getTime() - duration);
    const previousEnd = dateRange.start;
    
    const { count } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .gte('created_at', previousStart.toISOString())
      .lte('created_at', previousEnd.toISOString());
    
    return count || 0;
  }
  
  // Student metrics
  private async getStudentMetrics(dateRange?: { start: Date; end: Date }) {
    const { count: totalStudents } = await supabase
      .from('tenant_users')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('role', 'student');
    
    const { count: activeStudents } = await supabase
      .from('tenant_users')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('role', 'student')
      .eq('status', 'active');
    
    // Calculate average completion rate
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('progress_percentage, completed_at, created_at')
      .eq('tenant_id', this.tenantId);
    
    const avgCompletion = enrollments?.length 
      ? enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) / enrollments.length
      : 0;
    
    // Calculate average time to complete
    const completedEnrollments = enrollments?.filter(e => e.completed_at) || [];
    const avgTime = completedEnrollments.length
      ? completedEnrollments.reduce((sum, e) => {
          const start = new Date(e.created_at).getTime();
          const end = new Date(e.completed_at).getTime();
          return sum + (end - start);
        }, 0) / completedEnrollments.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0;
    
    // Calculate retention rate (students active in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: recentlyActive } = await supabase
      .from('tenant_users')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('role', 'student')
      .gte('last_login_at', thirtyDaysAgo.toISOString());
    
    const retentionRate = totalStudents 
      ? ((recentlyActive || 0) / totalStudents) * 100 
      : 0;
    
    return {
      totalStudents: totalStudents || 0,
      activeStudents: activeStudents || 0,
      averageCompletionRate: Math.round(avgCompletion * 100) / 100,
      averageTimeToComplete: Math.round(avgTime * 10) / 10,
      studentRetentionRate: Math.round(retentionRate * 100) / 100,
    };
  }
  
  // Course metrics
  private async getCourseMetrics() {
    const { count: totalCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId);
    
    const { count: publishedCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('status', 'published');
    
    // Get most popular courses
    const { data: popularCourses } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        enrollments:enrollments(count)
      `)
      .eq('tenant_id', this.tenantId)
      .eq('status', 'published')
      .order('enrollments.count', { ascending: false })
      .limit(5);
    
    const mostPopularCourses = popularCourses?.map(c => ({
      id: c.id,
      title: c.title,
      enrollments: c.enrollments?.[0]?.count || 0,
    })) || [];
    
    return {
      totalCourses: totalCourses || 0,
      publishedCourses: publishedCourses || 0,
      averageCourseRating: 4.5, // TODO: Implement ratings
      mostPopularCourses,
    };
  }
  
  // Revenue metrics
  private async getRevenueMetrics(dateRange?: { start: Date; end: Date }) {
    let query = supabase
      .from('transactions')
      .select('amount, type, created_at')
      .eq('tenant_id', this.tenantId)
      .eq('status', 'completed');
    
    if (dateRange) {
      query = query
        .gte('created_at', dateRange.start.toISOString())
        .lte('created_at', dateRange.end.toISOString());
    }
    
    const { data: transactions } = await query;
    
    const totalRevenue = transactions?.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;
    
    // Calculate MRR (subscriptions only)
    const subscriptions = transactions?.filter(t => t.type === 'subscription') || [];
    const mrr = subscriptions.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);
    
    // Calculate ARPU
    const { count: totalStudents } = await supabase
      .from('tenant_users')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('role', 'student');
    
    const arpu = totalStudents ? totalRevenue / totalStudents : 0;
    
    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRecurringRevenue: Math.round(mrr * 100) / 100,
      averageRevenuePerUser: Math.round(arpu * 100) / 100,
    };
  }
  
  // Engagement metrics
  private async getEngagementMetrics(dateRange?: { start: Date; end: Date }) {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const [dau, wau, mau] = await Promise.all([
      this.getActiveUsers(oneDayAgo),
      this.getActiveUsers(oneWeekAgo),
      this.getActiveUsers(oneMonthAgo),
    ]);
    
    // Calculate average session duration
    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('time_spent')
      .eq('tenant_id', this.tenantId);
    
    const avgSessionDuration = progress?.length
      ? progress.reduce((sum, p) => sum + (p.time_spent || 0), 0) / progress.length / 60 // Convert to minutes
      : 0;
    
    return {
      averageSessionDuration: Math.round(avgSessionDuration * 10) / 10,
      dailyActiveUsers: dau,
      weeklyActiveUsers: wau,
      monthlyActiveUsers: mau,
    };
  }
  
  private async getActiveUsers(since: Date): Promise<number> {
    const { count } = await supabase
      .from('tenant_users')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .gte('last_login_at', since.toISOString());
    
    return count || 0;
  }
  
  // Performance metrics
  private async getPerformanceMetrics(dateRange?: { start: Date; end: Date }) {
    const { data: submissions } = await supabase
      .from('assessment_submissions')
      .select('percentage, passed')
      .eq('tenant_id', this.tenantId)
      .eq('status', 'graded');
    
    const avgScore = submissions?.length
      ? submissions.reduce((sum, s) => sum + (s.percentage || 0), 0) / submissions.length
      : 0;
    
    const passRate = submissions?.length
      ? (submissions.filter(s => s.passed).length / submissions.length) * 100
      : 0;
    
    const { count: totalCompleted } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('status', 'completed');
    
    const { count: certificatesIssued } = await supabase
      .from('certificates')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId);
    
    const certRate = totalCompleted 
      ? ((certificatesIssued || 0) / totalCompleted) * 100 
      : 0;
    
    return {
      averageQuizScore: Math.round(avgScore * 100) / 100,
      passRate: Math.round(passRate * 100) / 100,
      certificateIssuanceRate: Math.round(certRate * 100) / 100,
    };
  }
  
  // Get student-specific analytics
  async getStudentAnalytics(studentId: string): Promise<StudentAnalytics> {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('*, course:courses(*)')
      .eq('tenant_id', this.tenantId)
      .eq('student_id', studentId);
    
    const totalEnrolled = enrollments?.length || 0;
    const completed = enrollments?.filter(e => e.status === 'completed').length || 0;
    const inProgress = enrollments?.filter(e => e.status === 'active').length || 0;
    
    const avgProgress = enrollments?.length
      ? enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) / enrollments.length
      : 0;
    
    // Get total time spent
    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('time_spent')
      .eq('tenant_id', this.tenantId)
      .eq('student_id', studentId);
    
    const totalTimeSpent = progress?.reduce((sum, p) => sum + (p.time_spent || 0), 0) || 0;
    
    // Get quiz scores
    const { data: submissions } = await supabase
      .from('assessment_submissions')
      .select('percentage')
      .eq('tenant_id', this.tenantId)
      .eq('student_id', studentId)
      .eq('status', 'graded');
    
    const avgQuizScore = submissions?.length
      ? submissions.reduce((sum, s) => sum + (s.percentage || 0), 0) / submissions.length
      : 0;
    
    // Get certificates
    const { count: certificates } = await supabase
      .from('certificates')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', this.tenantId)
      .eq('student_id', studentId);
    
    // Get last active
    const { data: user } = await supabase
      .from('tenant_users')
      .select('last_login_at')
      .eq('id', studentId)
      .single();
    
    // Calculate engagement score (0-100)
    const engagementScore = this.calculateEngagementScore({
      avgProgress,
      totalTimeSpent,
      avgQuizScore,
      lastActive: user?.last_login_at,
    });
    
    // Calculate risk score (0-100, higher = more risk)
    const riskScore = this.calculateRiskScore({
      avgProgress,
      engagementScore,
      lastActive: user?.last_login_at,
    });
    
    // Get recommended courses
    const recommendedCourses = await this.getRecommendedCourses(studentId);
    
    return {
      studentId,
      totalCoursesEnrolled: totalEnrolled,
      coursesCompleted: completed,
      coursesInProgress: inProgress,
      averageProgress: Math.round(avgProgress * 100) / 100,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      averageQuizScore: Math.round(avgQuizScore * 100) / 100,
      certificatesEarned: certificates || 0,
      lastActive: user?.last_login_at ? new Date(user.last_login_at) : new Date(),
      engagementScore,
      riskScore,
      recommendedCourses,
    };
  }
  
  // Get course-specific analytics
  async getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('*')
      .eq('tenant_id', this.tenantId)
      .eq('course_id', courseId);
    
    const totalEnrollments = enrollments?.length || 0;
    const active = enrollments?.filter(e => e.status === 'active').length || 0;
    const completed = enrollments?.filter(e => e.status === 'completed').length || 0;
    const dropped = enrollments?.filter(e => e.status === 'dropped').length || 0;
    
    const completionRate = totalEnrollments ? (completed / totalEnrollments) * 100 : 0;
    const dropoutRate = totalEnrollments ? (dropped / totalEnrollments) * 100 : 0;
    
    // Calculate average completion time
    const completedEnrollments = enrollments?.filter(e => e.completed_at) || [];
    const avgCompletionTime = completedEnrollments.length
      ? completedEnrollments.reduce((sum, e) => {
          const start = new Date(e.enrolled_at).getTime();
          const end = new Date(e.completed_at).getTime();
          return sum + (end - start);
        }, 0) / completedEnrollments.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0;
    
    // Get revenue
    const { data: transactions } = await supabase
      .from('transactions')
      .select('amount')
      .eq('tenant_id', this.tenantId)
      .eq('course_id', courseId)
      .eq('status', 'completed');
    
    const totalRevenue = transactions?.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;
    
    // Get most engaging lessons
    const { data: lessons } = await supabase
      .from('course_lessons')
      .select(`
        id,
        title,
        progress:lesson_progress(status)
      `)
      .eq('course_id', courseId);
    
    const mostEngagingLessons = lessons?.map(l => {
      const total = l.progress?.length || 0;
      const completed = l.progress?.filter((p: any) => p.status === 'completed').length || 0;
      return {
        lessonId: l.id,
        title: l.title,
        completionRate: total ? (completed / total) * 100 : 0,
      };
    }).sort((a, b) => b.completionRate - a.completionRate).slice(0, 5) || [];
    
    // Get struggling students
    const strugglingStudents = enrollments
      ?.filter(e => e.status === 'active' && e.progress_percentage < 30)
      .map(e => ({
        studentId: e.student_id,
        name: '', // TODO: Join with user data
        progress: e.progress_percentage || 0,
        riskScore: this.calculateRiskScore({
          avgProgress: e.progress_percentage || 0,
          engagementScore: 0,
          lastActive: e.last_accessed_at,
        }),
      }))
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 10) || [];
    
    // Calculate engagement rate
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentlyActive = enrollments?.filter(e => 
      e.last_accessed_at && new Date(e.last_accessed_at) > thirtyDaysAgo
    ).length || 0;
    
    const engagementRate = totalEnrollments ? (recentlyActive / totalEnrollments) * 100 : 0;
    
    return {
      courseId,
      totalEnrollments,
      activeEnrollments: active,
      completionRate: Math.round(completionRate * 100) / 100,
      averageCompletionTime: Math.round(avgCompletionTime * 10) / 10,
      averageRating: 4.5, // TODO: Implement ratings
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      dropoutRate: Math.round(dropoutRate * 100) / 100,
      engagementRate: Math.round(engagementRate * 100) / 100,
      mostEngagingLessons,
      strugglingStudents,
    };
  }
  
  // Helper: Calculate engagement score
  private calculateEngagementScore(data: {
    avgProgress: number;
    totalTimeSpent: number;
    avgQuizScore: number;
    lastActive?: string;
  }): number {
    let score = 0;
    
    // Progress weight: 40%
    score += (data.avgProgress / 100) * 40;
    
    // Time spent weight: 30% (normalize to reasonable range)
    const normalizedTime = Math.min(data.totalTimeSpent / (60 * 60 * 10), 1); // 10 hours = 100%
    score += normalizedTime * 30;
    
    // Quiz score weight: 20%
    score += (data.avgQuizScore / 100) * 20;
    
    // Recency weight: 10%
    if (data.lastActive) {
      const daysSinceActive = (Date.now() - new Date(data.lastActive).getTime()) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 1 - (daysSinceActive / 30)); // 30 days = 0%
      score += recencyScore * 10;
    }
    
    return Math.round(score);
  }
  
  // Helper: Calculate dropout risk score
  private calculateRiskScore(data: {
    avgProgress: number;
    engagementScore: number;
    lastActive?: string;
  }): number {
    let risk = 0;
    
    // Low progress = high risk
    if (data.avgProgress < 20) risk += 40;
    else if (data.avgProgress < 50) risk += 20;
    
    // Low engagement = high risk
    if (data.engagementScore < 30) risk += 30;
    else if (data.engagementScore < 60) risk += 15;
    
    // Inactivity = high risk
    if (data.lastActive) {
      const daysSinceActive = (Date.now() - new Date(data.lastActive).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceActive > 14) risk += 30;
      else if (daysSinceActive > 7) risk += 15;
    }
    
    return Math.min(100, risk);
  }
  
  // Helper: Get recommended courses
  private async getRecommendedCourses(studentId: string): Promise<string[]> {
    // TODO: Implement AI-based recommendations
    // For now, return popular courses in same categories
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course:courses(category)')
      .eq('student_id', studentId);
    
    const categories = [...new Set(enrollments?.map(e => e.course?.category).filter(Boolean))];
    
    const { data: recommended } = await supabase
      .from('courses')
      .select('id')
      .eq('tenant_id', this.tenantId)
      .in('category', categories)
      .eq('status', 'published')
      .limit(5);
    
    return recommended?.map(c => c.id) || [];
  }
}

// Export singleton factory
export function createAnalyticsEngine(tenantId: string): AnalyticsEngine {
  return new AnalyticsEngine(tenantId);
}
