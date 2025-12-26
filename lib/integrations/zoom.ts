export async function createMeeting(params: {
  topic: string;
  startTime: string;
  duration: number;
  agenda?: string;
}) {
  if (!process.env.ZOOM_API_KEY || !process.env.ZOOM_API_SECRET) {
    throw new Error('Zoom API credentials not configured');
  }

  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ZOOM_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      topic: params.topic,
      type: 2,
      start_time: params.startTime,
      duration: params.duration,
      agenda: params.agenda,
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

  return await response.json();
}

export async function getMeeting(meetingId: string) {
  const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    headers: {
      Authorization: `Bearer ${process.env.ZOOM_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Zoom API error: ${response.statusText}`);
  }

  return await response.json();
}
