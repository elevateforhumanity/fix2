// Slack Integration
export interface SlackMessage {
  text: string;
  blocks?: unknown[];
  channel?: string;
  username?: string;
  icon_emoji?: string;
}

export async function sendSlackMessage(message: SlackMessage) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: 'Slack not configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: unknown) {
    // Error: $1
    // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
    return { success: false, error: error.message };
  }
}

export async function sendEnrollmentAlert(
  studentName: string,
  courseName: string
) {
  return sendSlackMessage({
    text: `🎓 New Enrollment`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎓 New Student Enrollment',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Student:*\n${studentName}`,
          },
          {
            type: 'mrkdwn',
            text: `*Course:*\n${courseName}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Enrolled at ${new Date().toLocaleString()}`,
          },
        ],
      },
    ],
  });
}

export async function sendErrorAlert(error: string, context?: any) {
  return sendSlackMessage({
    text: `🚨 Error Alert`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚨 Application Error',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Error:*\n\`\`\`${error}\`\`\``,
        },
      },
      context && {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Context:*\n\`\`\`${JSON.stringify(context, null, 2)}\`\`\``,
        },
      },
    ].filter(Boolean),
  });
}
