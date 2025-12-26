/**
 * Social Media Post Scheduler
 * Handles 3x daily posting automation
 */

export interface ScheduledPost {
  id: string;
  platform: 'linkedin' | 'facebook' | 'youtube';
  content: string;
  scheduledFor: Date;
  status: 'pending' | 'posted' | 'failed';
}

export class SocialMediaScheduler {
  private postTimes = ['09:00', '13:00', '18:00']; // 9 AM, 1 PM, 6 PM EST

  async schedulePost(post: Omit<ScheduledPost, 'id' | 'status'>): Promise<ScheduledPost> {
    const response = await fetch('/api/social-media/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  }

  async getScheduledPosts(): Promise<ScheduledPost[]> {
    const response = await fetch('/api/social-media/schedule');
    return response.json();
  }

  getNextPostTime(): Date {
    const now = new Date();
    const currentHour = now.getHours();
    
    for (const time of this.postTimes) {
      const [hour] = time.split(':').map(Number);
      if (hour > currentHour) {
        const next = new Date(now);
        next.setHours(hour, 0, 0, 0);
        return next;
      }
    }
    
    // If past all times today, schedule for tomorrow 9 AM
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow;
  }
}

export const scheduler = new SocialMediaScheduler();
