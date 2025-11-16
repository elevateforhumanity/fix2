/**
 * Zapier Social Media Automation Integration
 * Automates social media posting through Zapier webhooks
 * Supports Facebook, LinkedIn, and YouTube
 */

interface ZapierWebhookPayload {
  platform: 'facebook' | 'linkedin' | 'youtube';
  content: string;
  mediaUrl?: string;
  scheduledTime?: string;
  metadata?: {
    programName?: string;
    eventType?: string;
    tags?: string[];
  };
}

interface ZapierResponse {
  success: boolean;
  zapId?: string;
  message?: string;
  error?: string;
}

export class ZapierSocialAutomation {
  private webhookUrls: Map<string, string>;
  private apiKey: string;

  constructor() {
    // Zapier webhook URLs from environment
    this.webhookUrls = new Map([
      ['facebook', import.meta.env.VITE_ZAPIER_FACEBOOK_WEBHOOK || ''],
      ['linkedin', import.meta.env.VITE_ZAPIER_LINKEDIN_WEBHOOK || ''],
      ['youtube', import.meta.env.VITE_ZAPIER_YOUTUBE_WEBHOOK || ''],
      ['all', import.meta.env.VITE_ZAPIER_ALL_PLATFORMS_WEBHOOK || ''],
    ]);

    this.apiKey = import.meta.env.VITE_ZAPIER_API_KEY || '';
  }

  /**
   * Post to single platform via Zapier
   */
  async postToPlatform(
    platform: 'facebook' | 'linkedin' | 'youtube',
    content: string,
    options?: {
      mediaUrl?: string;
      scheduledTime?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<ZapierResponse> {
    const webhookUrl = this.webhookUrls.get(platform);

    if (!webhookUrl) {
      return {
        success: false,
        error: `No webhook URL configured for ${platform}`,
      };
    }

    const payload: ZapierWebhookPayload = {
      platform,
      content,
      mediaUrl: options?.mediaUrl,
      scheduledTime: options?.scheduledTime,
      metadata: options?.metadata,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        zapId: data.id || data.zapId,
        message: `Posted to ${platform} successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Post to all platforms simultaneously
   */
  async postToAllPlatforms(
    content: string,
    options?: {
      mediaUrl?: string;
      scheduledTime?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<Record<string, ZapierResponse>> {
    const platforms: ('facebook' | 'linkedin' | 'youtube')[] = [
      'facebook',
      'linkedin',
      'youtube',
    ];

    // Check if there's a single webhook for all platforms
    const allPlatformsWebhook = this.webhookUrls.get('all');

    if (allPlatformsWebhook) {
      const payload = {
        platforms: platforms,
        content,
        mediaUrl: options?.mediaUrl,
        scheduledTime: options?.scheduledTime,
        metadata: options?.metadata,
      };

      try {
        const response = await fetch(allPlatformsWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Return success for all platforms
        return platforms.reduce(
          (acc, platform) => ({
            ...acc,
            [platform]: {
              success: true,
              zapId: data.id || data.zapId,
              message: `Posted to ${platform} successfully`,
            },
          }),
          {}
        );
      } catch (error) {
        // Return error for all platforms
        return platforms.reduce(
          (acc, platform) => ({
            ...acc,
            [platform]: {
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
          }),
          {}
        );
      }
    }

    // Post to each platform individually

    const results = await Promise.all(
      platforms.map((platform) =>
        this.postToPlatform(platform, content, options)
      )
    );

    return platforms.reduce(
      (acc, platform, index) => ({
        ...acc,
        [platform]: results[index],
      }),
      {}
    );
  }

  /**
   * Post new program announcement
   */
  async announceNewProgram(program: {
    name: string;
    description: string;
    imageUrl?: string;
    enrollmentUrl?: string;
  }): Promise<Record<string, ZapierResponse>> {
    const content = `🎓 New Program Alert! 🎓

We're excited to announce: ${program.name}

${program.description}

${program.enrollmentUrl ? `Enroll now: ${program.enrollmentUrl}` : 'Contact us to learn more!'}

#WorkforceDevelopment #Training #ElevateForHumanity`;

    return this.postToAllPlatforms(content, {
      mediaUrl: program.imageUrl,
      metadata: {
        programName: program.name,
        eventType: 'program_announcement',
        tags: ['program', 'announcement', 'enrollment'],
      },
    });
  }

  /**
   * Post student success story
   */
  async postSuccessStory(story: {
    studentName: string;
    programName: string;
    achievement: string;
    imageUrl?: string;
  }): Promise<Record<string, ZapierResponse>> {
    const content = `🌟 Success Story 🌟

Congratulations to ${story.studentName} for completing ${story.programName}!

${story.achievement}

We're proud of your accomplishment! 🎉

#SuccessStory #WorkforceDevelopment #ElevateForHumanity`;

    return this.postToAllPlatforms(content, {
      mediaUrl: story.imageUrl,
      metadata: {
        programName: story.programName,
        eventType: 'success_story',
        tags: ['success', 'student', 'achievement'],
      },
    });
  }

  /**
   * Post upcoming event
   */
  async announceEvent(event: {
    name: string;
    date: string;
    description: string;
    registrationUrl?: string;
    imageUrl?: string;
  }): Promise<Record<string, ZapierResponse>> {
    const content = `📅 Upcoming Event 📅

${event.name}
Date: ${event.date}

${event.description}

${event.registrationUrl ? `Register: ${event.registrationUrl}` : 'Stay tuned for registration details!'}

#Event #Community #ElevateForHumanity`;

    return this.postToAllPlatforms(content, {
      mediaUrl: event.imageUrl,
      scheduledTime: event.date,
      metadata: {
        eventName: event.name,
        eventType: 'event_announcement',
        tags: ['event', 'announcement', 'community'],
      },
    });
  }

  /**
   * Post daily motivation
   */
  async postDailyMotivation(
    quote: string,
    author?: string
  ): Promise<Record<string, ZapierResponse>> {
    const content = `💪 Daily Motivation 💪

"${quote}"
${author ? `- ${author}` : ''}

Keep pushing forward! You've got this! 🚀

#Motivation #Inspiration #ElevateForHumanity`;

    return this.postToAllPlatforms(content, {
      metadata: {
        eventType: 'daily_motivation',
        tags: ['motivation', 'inspiration', 'daily'],
      },
    });
  }

  /**
   * Post partnership announcement
   */
  async announcePartnership(partner: {
    name: string;
    description: string;
    logoUrl?: string;
    websiteUrl?: string;
  }): Promise<Record<string, ZapierResponse>> {
    const content = `🤝 Partnership Announcement 🤝

We're thrilled to partner with ${partner.name}!

${partner.description}

${partner.websiteUrl ? `Learn more: ${partner.websiteUrl}` : ''}

Together, we're making a difference! 💙

#Partnership #Collaboration #ElevateForHumanity`;

    return this.postToAllPlatforms(content, {
      mediaUrl: partner.logoUrl,
      metadata: {
        partnerName: partner.name,
        eventType: 'partnership_announcement',
        tags: ['partnership', 'announcement', 'collaboration'],
      },
    });
  }

  /**
   * Schedule post for later
   */
  async schedulePost(
    platform: 'facebook' | 'linkedin' | 'youtube' | 'all',
    content: string,
    scheduledTime: string,
    options?: {
      mediaUrl?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<ZapierResponse | Record<string, ZapierResponse>> {
    if (platform === 'all') {
      return this.postToAllPlatforms(content, {
        ...options,
        scheduledTime,
      });
    }

    return this.postToPlatform(platform, content, {
      ...options,
      scheduledTime,
    });
  }

  /**
   * Test webhook connection
   */
  async testConnection(
    platform: 'facebook' | 'linkedin' | 'youtube'
  ): Promise<boolean> {
    const webhookUrl = this.webhookUrls.get(platform);

    if (!webhookUrl) {
      return false;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-Zapier-API-Key': this.apiKey }),
        },
        body: JSON.stringify({
          platform,
          content: 'Test connection from Elevate for Humanity',
          metadata: {
            eventType: 'test',
            test: true,
          },
        }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get webhook configuration status
   */
  getConfigurationStatus(): Record<string, boolean> {
    return {
      facebook: !!this.webhookUrls.get('facebook'),
      linkedin: !!this.webhookUrls.get('linkedin'),
      youtube: !!this.webhookUrls.get('youtube'),
      all: !!this.webhookUrls.get('all'),
      apiKey: !!this.apiKey,
    };
  }
}

// Export singleton instance
export const zapierSocial = new ZapierSocialAutomation();

// Export helper functions
export async function postToSocialMedia(
  content: string,
  options?: {
    platforms?: ('facebook' | 'linkedin' | 'youtube')[];
    mediaUrl?: string;
    scheduledTime?: string;
    metadata?: Record<string, any>;
  }
): Promise<Record<string, ZapierResponse>> {
  if (options?.platforms && options.platforms.length === 1) {
    const result = await zapierSocial.postToPlatform(
      options.platforms[0],
      content,
      options
    );
    return { [options.platforms[0]]: result };
  }

  return zapierSocial.postToAllPlatforms(content, options);
}

export async function announceProgram(program: {
  name: string;
  description: string;
  imageUrl?: string;
  enrollmentUrl?: string;
}): Promise<Record<string, ZapierResponse>> {
  return zapierSocial.announceNewProgram(program);
}

export async function shareSuccessStory(story: {
  studentName: string;
  programName: string;
  achievement: string;
  imageUrl?: string;
}): Promise<Record<string, ZapierResponse>> {
  return zapierSocial.postSuccessStory(story);
}

export async function announceEvent(event: {
  name: string;
  date: string;
  description: string;
  registrationUrl?: string;
  imageUrl?: string;
}): Promise<Record<string, ZapierResponse>> {
  return zapierSocial.announceEvent(event);
}

export async function postMotivation(
  quote: string,
  author?: string
): Promise<Record<string, ZapierResponse>> {
  return zapierSocial.postDailyMotivation(quote, author);
}

export async function announcePartnership(partner: {
  name: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
}): Promise<Record<string, ZapierResponse>> {
  return zapierSocial.announcePartnership(partner);
}
