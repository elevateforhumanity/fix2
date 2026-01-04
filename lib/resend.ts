import { Resend } from 'resend';

// Lazy-initialized Resend client to avoid build-time errors
let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY || 're_placeholder';
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Legacy fetch-based client for compatibility
export const resend = {
  emails: {
    send: async (data: Record<string, unknown>) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
  }
};
