/**
 * Netlify Function: Sentry Webhook
 * 
 * Receives Sentry error notifications and forwards to Slack.
 * 
 * Endpoint: POST /.netlify/functions/sentry-webhook
 */

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const sentryEvent = JSON.parse(event.body);
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not configured');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Slack webhook not configured' }),
      };
    }

    // Extract relevant information from Sentry event
    const {
      action,
      data,
      actor,
    } = sentryEvent;

    // Only process error events
    if (action !== 'created' && action !== 'resolved') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Event ignored' }),
      };
    }

    const issue = data?.issue || data?.event;
    if (!issue) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'No issue data' }),
      };
    }

    // Build Slack message
    const slackMessage = buildSlackMessage(action, issue, actor);

    // Send to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack API error: ${slackResponse.statusText}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Notification sent to Slack' }),
    };
  } catch (error) {
    console.error('Sentry webhook error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to process Sentry webhook',
      }),
    };
  }
};

/**
 * Build Slack message from Sentry event
 */
function buildSlackMessage(action, issue, actor) {
  const isResolved = action === 'resolved';
  const color = isResolved ? '#36a64f' : '#ff0000';
  const emoji = isResolved ? '✅' : '🚨';
  
  const title = issue.title || issue.message || 'Unknown Error';
  const culprit = issue.culprit || 'Unknown';
  const level = issue.level || 'error';
  const url = issue.web_url || issue.permalink;
  const count = issue.count || 1;
  const userCount = issue.userCount || issue.user_count || 0;

  return {
    text: `${emoji} Sentry Alert: ${isResolved ? 'Issue Resolved' : 'New Error'}`,
    attachments: [
      {
        color,
        title: title.substring(0, 200),
        title_link: url,
        fields: [
          {
            title: 'Level',
            value: level.toUpperCase(),
            short: true,
          },
          {
            title: 'Environment',
            value: issue.environment || 'production',
            short: true,
          },
          {
            title: 'Culprit',
            value: culprit,
            short: false,
          },
          {
            title: 'Occurrences',
            value: `${count} events, ${userCount} users affected`,
            short: false,
          },
        ],
        footer: 'Sentry',
        footer_icon: 'https://sentry.io/favicon.ico',
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  };
}
