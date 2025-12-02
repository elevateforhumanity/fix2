/**
 * Amplitude Analytics Integration
 * Handles product analytics and user behavior tracking
 */

interface AmplitudeConfig {
  apiKey: string;
}

interface AmplitudeEvent {
  user_id: string;
  event_type: string;
  event_properties?: Record<string, any>;
  user_properties?: Record<string, any>;
  time?: number;
  platform?: string;
  device_id?: string;
  session_id?: number;
}

interface AmplitudeIdentify {
  user_id: string;
  user_properties: {
    $set?: Record<string, any>;
    $setOnce?: Record<string, any>;
    $add?: Record<string, number>;
    $append?: Record<string, any>;
    $unset?: string[];
  };
}

class AmplitudeClient {
  private config: AmplitudeConfig;
  private baseUrl = 'https://api2.amplitude.com/2/httpapi';

  constructor(config: AmplitudeConfig) {
    this.config = config;
  }

  async track(events: AmplitudeEvent | AmplitudeEvent[]): Promise<void> {
    const eventArray = Array.isArray(events) ? events : [events];

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.config.apiKey,
        events: eventArray.map(event => ({
          ...event,
          time: event.time || Date.now(),
          platform: event.platform || 'Web',
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Amplitude track failed: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== 200) {
      throw new Error(`Amplitude error: ${result.error}`);
    }
  }

  async identify(data: AmplitudeIdentify): Promise<void> {
    const identification = {
      user_id: data.user_id,
      user_properties: data.user_properties,
    };

    const response = await fetch('https://api2.amplitude.com/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.config.apiKey,
        identification: JSON.stringify(identification),
      }),
    });

    if (!response.ok) {
      throw new Error(`Amplitude identify failed: ${response.statusText}`);
    }
  }

  async setUserProperties(userId: string, properties: Record<string, any>): Promise<void> {
    return this.identify({
      user_id: userId,
      user_properties: {
        $set: properties,
      },
    });
  }

  async incrementUserProperty(userId: string, property: string, value: number = 1): Promise<void> {
    return this.identify({
      user_id: userId,
      user_properties: {
        $add: { [property]: value },
      },
    });
  }

  trackPageView(userId: string, pageName: string, properties?: Record<string, any>): Promise<void> {
    return this.track({
      user_id: userId,
      event_type: 'Page Viewed',
      event_properties: {
        page_name: pageName,
        ...properties,
      },
    });
  }

  trackEnrollment(userId: string, courseId: string, courseName: string, properties?: Record<string, any>): Promise<void> {
    return this.track({
      user_id: userId,
      event_type: 'Course Enrolled',
      event_properties: {
        course_id: courseId,
        course_name: courseName,
        ...properties,
      },
    });
  }

  trackCompletion(userId: string, courseId: string, courseName: string, properties?: Record<string, any>): Promise<void> {
    return this.track({
      user_id: userId,
      event_type: 'Course Completed',
      event_properties: {
        course_id: courseId,
        course_name: courseName,
        ...properties,
      },
    });
  }

  trackLessonProgress(userId: string, lessonId: string, progress: number, properties?: Record<string, any>): Promise<void> {
    return this.track({
      user_id: userId,
      event_type: 'Lesson Progress',
      event_properties: {
        lesson_id: lessonId,
        progress_percent: progress,
        ...properties,
      },
    });
  }
}

export function createAmplitudeClient(): AmplitudeClient | null {
  const apiKey = process.env.AMPLITUDE_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Amplitude not configured');
    }
    return null;
  }

  return new AmplitudeClient({ apiKey });
}

export const amplitude = createAmplitudeClient();
