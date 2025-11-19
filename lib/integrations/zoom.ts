// lib/integrations/zoom.ts
import { logger } from '@/lib/logger';
// Zoom API integration for live learning sessions

const ZOOM_API_BASE = 'https://api.zoom.us/v2';

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_JWT_TOKEN = process.env.ZOOM_JWT_TOKEN; // Legacy JWT

type CreateZoomMeetingInput = {
  topic: string;
  startTime: string; // ISO string
  durationMinutes: number;
  timezone?: string;
  agenda?: string;
};

type ZoomMeetingResponse = {
  id: number;
  join_url: string;
  start_url: string;
  password?: string;
  host_email?: string;
};

/**
 * Create a scheduled Zoom meeting
 */
export async function createZoomMeeting(
  userId: string,
  input: CreateZoomMeetingInput
): Promise<ZoomMeetingResponse> {
  if (!ZOOM_JWT_TOKEN) {
    throw new Error('ZOOM_JWT_TOKEN not configured');
  }

  const body = {
    topic: input.topic,
    type: 2, // scheduled meeting
    start_time: input.startTime,
    duration: input.durationMinutes,
    timezone: input.timezone || 'America/New_York',
    agenda: input.agenda || '',
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: true,
      waiting_room: true,
      approval_type: 0, // automatically approve
      audio: 'both',
      auto_recording: 'cloud', // record to cloud
    },
  };

  const res = await fetch(`${ZOOM_API_BASE}/users/${userId}/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ZOOM_JWT_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error('Zoom create meeting error', new Error(text), { topic, startTime });
    throw new Error('Failed to create Zoom meeting');
  }

  return (await res.json()) as ZoomMeetingResponse;
}

/**
 * Delete a Zoom meeting
 */
export async function deleteZoomMeeting(meetingId: number): Promise<void> {
  if (!ZOOM_JWT_TOKEN) {
    throw new Error('ZOOM_JWT_TOKEN not configured');
  }

  const res = await fetch(`${ZOOM_API_BASE}/meetings/${meetingId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${ZOOM_JWT_TOKEN}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error('Zoom delete meeting error:', text);
    throw new Error('Failed to delete Zoom meeting');
  }
}

/**
 * Get meeting details
 */
export async function getZoomMeeting(meetingId: number): Promise<ZoomMeetingResponse> {
  if (!ZOOM_JWT_TOKEN) {
    throw new Error('ZOOM_JWT_TOKEN not configured');
  }

  const res = await fetch(`${ZOOM_API_BASE}/meetings/${meetingId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ZOOM_JWT_TOKEN}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error('Zoom get meeting error:', text);
    throw new Error('Failed to get Zoom meeting');
  }

  return (await res.json()) as ZoomMeetingResponse;
}
