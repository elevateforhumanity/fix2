// lib/integrations/sendgrid.ts
import { logger } from '@/lib/logger';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM = process.env.SENDGRID_FROM || 'no-reply@elevateforhumanity.org';

export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  if (!SENDGRID_API_KEY) {
    logger.warn('SendGrid not configured, skipping email');
    return;
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: params.to }] }],
      from: { email: SENDGRID_FROM, name: 'Elevate for Humanity' },
      subject: params.subject,
      content: [
        { type: 'text/html', value: params.html },
        ...(params.text ? [{ type: 'text/plain', value: params.text }] : []),
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    logger.error('SendGrid error:', text);
    throw new Error('Failed to send email');
  }

  return await res.json();
}

// Template helpers
export async function sendWelcomeEmail(to: string, name: string) {
  return sendTransactionalEmail({
    to,
    subject: 'Welcome to Elevate for Humanity',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>Thank you for joining Elevate for Humanity. We're excited to support your learning journey.</p>
      <p><a href="https://elevateconnectsdirectory.org/dashboard">Get Started</a></p>
    `,
  });
}

export async function sendEnrollmentConfirmation(
  to: string,
  courseName: string
) {
  return sendTransactionalEmail({
    to,
    subject: `Enrollment Confirmed: ${courseName}`,
    html: `
      <h1>You're Enrolled!</h1>
      <p>Your enrollment in <strong>${courseName}</strong> has been confirmed.</p>
      <p><a href="https://elevateconnectsdirectory.org/courses">View Course</a></p>
    `,
  });
}
