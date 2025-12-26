/**
 * Zoom Video API Integration
 */

interface ZoomConfig {
  accountId: string;
  clientId: string;
  clientSecret: string;
}

interface Meeting {
  topic: string;
  startTime: string;
  duration: number;
  timezone: string;
}

export class ZoomClient {
  private config: ZoomConfig;
  private baseUrl = 'https://api.zoom.us/v2';
  private accessToken: string = '';

  constructor(config: ZoomConfig) {
    this.config = config;
  }

  async authenticate(): Promise<void> {
    const response = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=account_credentials&account_id=${this.config.accountId}`,
    });

    const data = await response.json();
    this.accessToken = data.access_token;
  }

  async createMeeting(meeting: Meeting): Promise<any> {
    if (!this.accessToken) await this.authenticate();

    const response = await fetch(`${this.baseUrl}/users/me/meetings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: meeting.topic,
        type: 2,
        start_time: meeting.startTime,
        duration: meeting.duration,
        timezone: meeting.timezone,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Zoom API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createZoomClient(): ZoomClient {
  return new ZoomClient({
    accountId: process.env.ZOOM_ACCOUNT_ID || '',
    clientId: process.env.ZOOM_CLIENT_ID || '',
    clientSecret: process.env.ZOOM_CLIENT_SECRET || '',
  });
}
