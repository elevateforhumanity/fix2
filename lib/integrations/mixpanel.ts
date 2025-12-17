// @ts-nocheck
/**
 * Mixpanel Analytics Integration
 * Handles event tracking and user analytics
 */

interface MixpanelConfig {
  token: string;
}

interface MixpanelEvent {
  event: string;
  properties: {
    distinct_id: string;
    [key: string]: unknown;
  };
}

interface MixpanelUserProfile {
  $distinct_id: string;
  $set?: Record<string, any>;
  $set_once?: Record<string, any>;
  $add?: Record<string, number>;
  $append?: Record<string, any>;
  $union?: Record<string, any[]>;
}

class MixpanelClient {
  private config: MixpanelConfig;
  private baseUrl = 'https://api.mixpanel.com';

  constructor(config: MixpanelConfig) {
    this.config = config;
  }

  async track(
    event: string,
    distinctId: string,
    properties: Record<string, any> = {}
  ): Promise<void> {
    const data: MixpanelEvent = {
      event,
      properties: {
        distinct_id: distinctId,
        token: this.config.token,
        time: Date.now(),
        ...properties,
      },
    };

    const response = await fetch(`${this.baseUrl}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([data]),
    });

    if (!response.ok) {
      throw new Error(`Mixpanel track failed: ${response.statusText}`);
    }
  }

  async setUserProfile(
    distinctId: string,
    properties: Record<string, any>
  ): Promise<void> {
    const data: MixpanelUserProfile = {
      $distinct_id: distinctId,
      $token: this.config.token,
      $set: properties,
    };

    const response = await fetch(`${this.baseUrl}/engage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([data]),
    });

    if (!response.ok) {
      throw new Error(`Mixpanel engage failed: ${response.statusText}`);
    }
  }

  async incrementUserProperty(
    distinctId: string,
    property: string,
    value: number = 1
  ): Promise<void> {
    const data: MixpanelUserProfile = {
      $distinct_id: distinctId,
      $token: this.config.token,
      $add: { [property]: value },
    };

    const response = await fetch(`${this.baseUrl}/engage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([data]),
    });

    if (!response.ok) {
      throw new Error(`Mixpanel increment failed: ${response.statusText}`);
    }
  }

  async appendToUserList(
    distinctId: string,
    property: string,
    value: any
  ): Promise<void> {
    const data: MixpanelUserProfile = {
      $distinct_id: distinctId,
      $token: this.config.token,
      $append: { [property]: value },
    };

    const response = await fetch(`${this.baseUrl}/engage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([data]),
    });

    if (!response.ok) {
      throw new Error(`Mixpanel append failed: ${response.statusText}`);
    }
  }

  trackPageView(
    distinctId: string,
    pageName: string,
    properties: Record<string, any> = {}
  ): Promise<void> {
    return this.track('Page View', distinctId, {
      page_name: pageName,
      ...properties,
    });
  }

  trackEnrollment(
    distinctId: string,
    courseId: string,
    courseName: string
  ): Promise<void> {
    return this.track('Course Enrollment', distinctId, {
      course_id: courseId,
      course_name: courseName,
    });
  }

  trackCompletion(
    distinctId: string,
    courseId: string,
    courseName: string
  ): Promise<void> {
    return this.track('Course Completion', distinctId, {
      course_id: courseId,
      course_name: courseName,
    });
  }
}

export function createMixpanelClient(): MixpanelClient | null {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  if (!token) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new MixpanelClient({ token });
}

export const mixpanel = createMixpanelClient();
