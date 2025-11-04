/**
 * Analytics Tracking Utility
 * Comprehensive event tracking and metrics collection
 *
 * Copyright (c) 2025 Elevate for Humanity
 */

import { supabase } from '../lib/supabase';

export interface AnalyticsEvent {
  eventType: string;
  userId?: string;
  orgId?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export interface UserSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  pageViews: number;
  events: string[];
}

export interface PageView {
  path: string;
  title: string;
  referrer?: string;
  duration?: number;
}

export interface ConversionEvent {
  type: 'signup' | 'enrollment' | 'completion' | 'purchase' | 'referral';
  value?: number;
  metadata?: Record<string, any>;
}

class AnalyticsTracker {
  private session: UserSession | null = null;
  private pageStartTime: Date | null = null;
  private eventQueue: AnalyticsEvent[] = [];
  private flushInterval: number = 30000; // 30 seconds
  private flushTimer: number | null = null;

  constructor() {
    this.initSession();
    this.startFlushTimer();
    this.setupPageTracking();
  }

  /**
   * Initialize tracking session
   */
  private initSession() {
    const sessionId = this.getOrCreateSessionId();
    this.session = {
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      pageViews: 0,
      events: [],
    };
  }

  /**
   * Get or create session ID
   */
  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Setup automatic page tracking
   */
  private setupPageTracking() {
    if (typeof window === 'undefined') return;

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackPageExit();
      } else {
        this.trackPageView(window.location.pathname, document.title);
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      this.trackPageExit();
      this.flush();
    });
  }

  /**
   * Start automatic flush timer
   */
  private startFlushTimer() {
    if (typeof window === 'undefined') return;

    this.flushTimer = window.setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  /**
   * Track custom event
   */
  async track(eventType: string, metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventType,
      userId: this.getCurrentUserId(),
      orgId: this.getCurrentOrgId(),
      metadata: {
        ...metadata,
        sessionId: this.session?.sessionId,
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        screenResolution:
          typeof window !== 'undefined'
            ? `${window.screen.width}x${window.screen.height}`
            : undefined,
      },
      timestamp: new Date().toISOString(),
    };

    this.eventQueue.push(event);

    if (this.session) {
      this.session.lastActivity = new Date();
      this.session.events.push(eventType);
    }

    // Flush immediately for critical events
    if (this.isCriticalEvent(eventType)) {
      await this.flush();
    }
  }

  /**
   * Track page view
   */
  async trackPageView(path: string, title: string, referrer?: string) {
    // Track previous page exit if exists
    if (this.pageStartTime) {
      this.trackPageExit();
    }

    this.pageStartTime = new Date();

    if (this.session) {
      this.session.pageViews++;
    }

    await this.track('page_view', {
      path,
      title,
      referrer:
        referrer ||
        (typeof document !== 'undefined' ? document.referrer : undefined),
    });
  }

  /**
   * Track page exit
   */
  private trackPageExit() {
    if (!this.pageStartTime) return;

    const duration = Math.floor(
      (Date.now() - this.pageStartTime.getTime()) / 1000
    );

    this.track('page_exit', {
      path:
        typeof window !== 'undefined' ? window.location.pathname : undefined,
      duration,
    });

    this.pageStartTime = null;
  }

  /**
   * Track user action
   */
  async trackAction(
    action: string,
    target: string,
    metadata?: Record<string, any>
  ) {
    await this.track('user_action', {
      action,
      target,
      ...metadata,
    });
  }

  /**
   * Track conversion event
   */
  async trackConversion(event: ConversionEvent) {
    await this.track('conversion', {
      conversionType: event.type,
      value: event.value,
      ...event.metadata,
    });
  }

  /**
   * Track enrollment
   */
  async trackEnrollment(courseId: string, courseName: string) {
    await this.trackConversion({
      type: 'enrollment',
      metadata: {
        courseId,
        courseName,
      },
    });
  }

  /**
   * Track course completion
   */
  async trackCompletion(courseId: string, courseName: string, score?: number) {
    await this.trackConversion({
      type: 'completion',
      metadata: {
        courseId,
        courseName,
        score,
      },
    });
  }

  /**
   * Track assessment submission
   */
  async trackAssessmentSubmission(
    assessmentId: string,
    assessmentTitle: string,
    score?: number
  ) {
    await this.track('assessment_submission', {
      assessmentId,
      assessmentTitle,
      score,
    });
  }

  /**
   * Track video interaction
   */
  async trackVideo(
    action: 'play' | 'pause' | 'complete',
    videoId: string,
    progress: number
  ) {
    await this.track('video_interaction', {
      action,
      videoId,
      progress,
    });
  }

  /**
   * Track search
   */
  async trackSearch(
    query: string,
    resultsCount: number,
    filters?: Record<string, any>
  ) {
    await this.track('search', {
      query,
      resultsCount,
      filters,
    });
  }

  /**
   * Track error
   */
  async trackError(error: Error, context?: string) {
    await this.track('error', {
      message: error.message,
      stack: error.stack,
      context,
    });
  }

  /**
   * Track feature usage
   */
  async trackFeature(
    featureName: string,
    action: string,
    metadata?: Record<string, any>
  ) {
    await this.track('feature_usage', {
      feature: featureName,
      action,
      ...metadata,
    });
  }

  /**
   * Track performance metric
   */
  async trackPerformance(metric: string, value: number, unit: string) {
    await this.track('performance', {
      metric,
      value,
      unit,
    });
  }

  /**
   * Flush event queue to database
   */
  async flush() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      const { error } = await supabase.from('analytics_events').insert(
        events.map((event) => ({
          org_id: event.orgId,
          user_id: event.userId,
          event_type: event.eventType,
          metadata: event.metadata,
          created_at: event.timestamp,
        }))
      );

      if (error) {
        console.error('Failed to flush analytics events:', error);
        // Re-queue events on failure
        this.eventQueue.unshift(...events);
      }
    } catch (error) {
      console.error('Analytics flush error:', error);
      // Re-queue events on failure
      this.eventQueue.unshift(...events);
    }
  }

  /**
   * Get current user ID from session/auth
   */
  private getCurrentUserId(): string | undefined {
    // This should be integrated with your auth system
    if (typeof window !== 'undefined') {
      return (window as any).__userId;
    }
    return undefined;
  }

  /**
   * Get current org ID from session/auth
   */
  private getCurrentOrgId(): string | undefined {
    // This should be integrated with your auth system
    if (typeof window !== 'undefined') {
      return (window as any).__orgId;
    }
    return undefined;
  }

  /**
   * Set user context
   */
  setUser(userId: string, orgId?: string) {
    if (typeof window !== 'undefined') {
      (window as any).__userId = userId;
      if (orgId) {
        (window as any).__orgId = orgId;
      }
    }

    if (this.session) {
      this.session.userId = userId;
    }
  }

  /**
   * Clear user context
   */
  clearUser() {
    if (typeof window !== 'undefined') {
      delete (window as any).__userId;
      delete (window as any).__orgId;
    }

    if (this.session) {
      this.session.userId = undefined;
    }
  }

  /**
   * Check if event is critical (should flush immediately)
   */
  private isCriticalEvent(eventType: string): boolean {
    const criticalEvents = [
      'conversion',
      'error',
      'payment',
      'signup',
      'enrollment',
    ];
    return criticalEvents.includes(eventType);
  }

  /**
   * Get session info
   */
  getSession(): UserSession | null {
    return this.session;
  }

  /**
   * Destroy tracker
   */
  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Create singleton instance
const analytics = new AnalyticsTracker();

// Export convenience functions
export const track = (eventType: string, metadata?: Record<string, any>) =>
  analytics.track(eventType, metadata);

export const trackPageView = (path: string, title: string, referrer?: string) =>
  analytics.trackPageView(path, title, referrer);

export const trackAction = (
  action: string,
  target: string,
  metadata?: Record<string, any>
) => analytics.trackAction(action, target, metadata);

export const trackConversion = (event: ConversionEvent) =>
  analytics.trackConversion(event);

export const trackEnrollment = (courseId: string, courseName: string) =>
  analytics.trackEnrollment(courseId, courseName);

export const trackCompletion = (
  courseId: string,
  courseName: string,
  score?: number
) => analytics.trackCompletion(courseId, courseName, score);

export const trackAssessmentSubmission = (
  assessmentId: string,
  assessmentTitle: string,
  score?: number
) => analytics.trackAssessmentSubmission(assessmentId, assessmentTitle, score);

export const trackVideo = (
  action: 'play' | 'pause' | 'complete',
  videoId: string,
  progress: number
) => analytics.trackVideo(action, videoId, progress);

export const trackSearch = (
  query: string,
  resultsCount: number,
  filters?: Record<string, any>
) => analytics.trackSearch(query, resultsCount, filters);

export const trackError = (error: Error, context?: string) =>
  analytics.trackError(error, context);

export const trackFeature = (
  featureName: string,
  action: string,
  metadata?: Record<string, any>
) => analytics.trackFeature(featureName, action, metadata);

export const trackPerformance = (metric: string, value: number, unit: string) =>
  analytics.trackPerformance(metric, value, unit);

export const setUser = (userId: string, orgId?: string) =>
  analytics.setUser(userId, orgId);

export const clearUser = () => analytics.clearUser();

export const flush = () => analytics.flush();

export const getSession = () => analytics.getSession();

export default analytics;
