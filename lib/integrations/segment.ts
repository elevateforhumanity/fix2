/**
 * Segment Analytics Integration
 * Handles event tracking and customer data platform
 */

interface SegmentConfig {
  writeKey: string;
}

interface SegmentIdentify {
  userId: string;
  traits?: Record<string, any>;
  context?: Record<string, any>;
  timestamp?: string;
}

interface SegmentTrack {
  userId: string;
  event: string;
  properties?: Record<string, any>;
  context?: Record<string, any>;
  timestamp?: string;
}

interface SegmentPage {
  userId: string;
  name?: string;
  properties?: Record<string, any>;
  context?: Record<string, any>;
  timestamp?: string;
}

class SegmentClient {
  private config: SegmentConfig;
  private baseUrl = 'https://api.segment.io/v1';

  constructor(config: SegmentConfig) {
    this.config = config;
  }

  private getAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.config.writeKey}:`).toString('base64')}`;
  }

  async identify(data: SegmentIdentify): Promise<void> {
    const response = await fetch(`${this.baseUrl}/identify`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Segment identify failed: ${response.statusText}`);
    }
  }

  async track(data: SegmentTrack): Promise<void> {
    const response = await fetch(`${this.baseUrl}/track`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Segment track failed: ${response.statusText}`);
    }
  }

  async page(data: SegmentPage): Promise<void> {
    const response = await fetch(`${this.baseUrl}/page`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Segment page failed: ${response.statusText}`);
    }
  }

  async group(userId: string, groupId: string, traits?: Record<string, any>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/group`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        groupId,
        traits,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Segment group failed: ${response.statusText}`);
    }
  }

  async alias(userId: string, previousId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/alias`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        previousId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Segment alias failed: ${response.statusText}`);
    }
  }

  trackEnrollment(userId: string, courseId: string, courseName: string, properties?: Record<string, any>): Promise<void> {
    return this.track({
      userId,
      event: 'Course Enrolled',
      properties: {
        course_id: courseId,
        course_name: courseName,
        ...properties,
      },
    });
  }

  trackCompletion(userId: string, courseId: string, courseName: string, properties?: Record<string, any>): Promise<void> {
    return this.track({
      userId,
      event: 'Course Completed',
      properties: {
        course_id: courseId,
        course_name: courseName,
        ...properties,
      },
    });
  }
}

export function createSegmentClient(): SegmentClient | null {
  const writeKey = process.env.SEGMENT_WRITE_KEY;

  if (!writeKey) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new SegmentClient({ writeKey });
}

export const segment = createSegmentClient();
