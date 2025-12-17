// @ts-nocheck
/**
 * Zoom Integration
 * Meetings, webinars, recordings, attendance tracking
 */

export interface ZoomConfig {
  accountId: string;
  clientId: string;
  clientSecret: string;
}

export interface ZoomMeeting {
  id: string;
  topic: string;
  type: 1 | 2 | 3 | 8; // Instant, Scheduled, Recurring, Recurring with fixed time
  start_time: string;
  duration: number;
  timezone: string;
  join_url: string;
  password?: string;
  settings: {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    waiting_room: boolean;
    auto_recording: 'local' | 'cloud' | 'none';
  };
}

export interface ZoomParticipant {
  id: string;
  user_id: string;
  name: string;
  user_email: string;
  join_time: string;
  leave_time: string;
  duration: number;
  attentiveness_score?: number;
}

export interface ZoomRecording {
  id: string;
  meeting_id: string;
  recording_start: string;
  recording_end: string;
  file_type: 'MP4' | 'M4A' | 'TIMELINE' | 'TRANSCRIPT' | 'CHAT';
  file_size: number;
  play_url: string;
  download_url: string;
  status: 'completed' | 'processing';
}

/**
 * Zoom API Client
 */
export class ZoomIntegration {
  private config: ZoomConfig;
  private accessToken?: string;
  private tokenExpiry?: number;

  constructor(config: ZoomConfig) {
    this.config = config;
  }

  /**
   * Get Server-to-Server OAuth token
   */
  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const credentials = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`
    ).toString('base64');

    const response = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.config.accountId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + data.expires_in * 1000;

    return this.accessToken;
  }

  /**
   * Create meeting
   */
  async createMeeting(meeting: {
    topic: string;
    type: 1 | 2 | 3 | 8;
    start_time?: Date;
    duration?: number;
    timezone?: string;
    password?: string;
    settings?: Partial<ZoomMeeting['settings']>;
  }): Promise<ZoomMeeting> {
    const token = await this.getAccessToken();

    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: meeting.topic,
        type: meeting.type,
        start_time: meeting.start_time?.toISOString(),
        duration: meeting.duration || 60,
        timezone: meeting.timezone || 'America/New_York',
        password: meeting.password,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
          auto_recording: 'cloud',
          ...meeting.settings,
        },
      }),
    });

    return await response.json();
  }

  /**
   * Get meeting
   */
  async getMeeting(meetingId: string): Promise<ZoomMeeting> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `https://api.zoom.us/v2/meetings/${meetingId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return await response.json();
  }

  /**
   * Delete meeting
   */
  async deleteMeeting(meetingId: string): Promise<void> {
    const token = await this.getAccessToken();

    await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  /**
   * Get meeting participants
   */
  async getMeetingParticipants(meetingId: string): Promise<ZoomParticipant[]> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `https://api.zoom.us/v2/report/meetings/${meetingId}/participants`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return data.participants || [];
  }

  /**
   * Get meeting recordings
   */
  async getMeetingRecordings(meetingId: string): Promise<ZoomRecording[]> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return data.recording_files || [];
  }

  /**
   * Create meeting for course session
   */
  async createCourseSession(
    courseId: string,
    session: {
      title: string;
      startTime: Date;
      duration: number;
    }
  ) {
    const meeting = await this.createMeeting({
      topic: session.title,
      type: 2, // Scheduled
      start_time: session.startTime,
      duration: session.duration,
      settings: {
        auto_recording: 'cloud',
        waiting_room: true,
      },
    });

    // Save to database
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    await supabase.from('course_sessions').insert({
      course_id: courseId,
      title: session.title,
      start_time: session.startTime.toISOString(),
      duration: session.duration,
      zoom_meeting_id: meeting.id,
      zoom_join_url: meeting.join_url,
      zoom_password: meeting.password,
    });

    return meeting;
  }

  /**
   * Track attendance from Zoom meeting
   */
  async trackAttendance(meetingId: string) {
    const participants = await this.getMeetingParticipants(meetingId);

    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    // Get session
    const { data: session } = await supabase
      .from('course_sessions')
      .select('*')
      .eq('zoom_meeting_id', meetingId)
      .single();

    if (!session) return;

    // Record attendance
    for (const participant of participants) {
      // Find student by email
      const { data: student } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', participant.user_email)
        .single();

      if (student) {
        await supabase.from('attendance').upsert(
          {
            session_id: session.id,
            student_id: student.id,
            status: 'present',
            join_time: participant.join_time,
            leave_time: participant.leave_time,
            duration: participant.duration,
            zoom_participant_id: participant.id,
          },
          {
            onConflict: 'session_id,student_id',
          }
        );
      }
    }

    return participants.length;
  }

  /**
   * Sync recordings to course
   */
  async syncRecordings(meetingId: string) {
    const recordings = await this.getMeetingRecordings(meetingId);

    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();

    const { data: session } = await supabase
      .from('course_sessions')
      .select('*')
      .eq('zoom_meeting_id', meetingId)
      .single();

    if (!session) return;

    for (const recording of recordings) {
      if (recording.file_type === 'MP4') {
        await supabase.from('course_recordings').upsert(
          {
            session_id: session.id,
            zoom_recording_id: recording.id,
            file_type: recording.file_type,
            file_size: recording.file_size,
            play_url: recording.play_url,
            download_url: recording.download_url,
            recording_start: recording.recording_start,
            recording_end: recording.recording_end,
            status: recording.status,
          },
          {
            onConflict: 'zoom_recording_id',
          }
        );
      }
    }

    return recordings.length;
  }
}

/**
 * Initialize Zoom integration
 */
export function createZoomIntegration(): ZoomIntegration {
  return new ZoomIntegration({
    accountId: process.env.ZOOM_ACCOUNT_ID!,
    clientId: process.env.ZOOM_CLIENT_ID!,
    clientSecret: process.env.ZOOM_CLIENT_SECRET!,
  });
}
