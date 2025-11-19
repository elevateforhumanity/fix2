// lib/integrations/teams.ts
import { logger } from '@/lib/logger';
const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL;

export async function sendTeamsCard(params: {
  title: string;
  text: string;
  facts?: Array<{ name: string; value: string }>;
}) {
  if (!TEAMS_WEBHOOK_URL) {
    logger.warn('TEAMS_WEBHOOK_URL not set, skipping Teams notification');
    return;
  }

  const body = {
    '@type': 'MessageCard',
    '@context': 'http://schema.org/extensions',
    themeColor: 'FF6600',
    summary: params.title,
    sections: [
      {
        activityTitle: params.title,
        text: params.text,
        ...(params.facts && { facts: params.facts }),
      },
    ],
  };

  const res = await fetch(TEAMS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error('Teams webhook error:', text);
  }
}
