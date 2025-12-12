// Resend Email Service Integration
import { Resend } from 'resend';
let resendClient: Resend | null = null;
export function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
export interface ResendEmailOptions {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  tags?: { name: string; value: string }[];
}
export async function sendResendEmail(options: ResendEmailOptions) {
  const client = getResendClient();
  if (!client) {
    return { success: false, error: 'Resend not configured' };
  }
  try {
    const result = await client.emails.send({
      from: options.from || process.env.EMAIL_FROM || 'noreply@elevateforhumanity.org',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
      tags: options.tags,
    });
    return { success: true, data: result };
  } catch (error: unknown) {
    console.error('Resend error:', error);
    return { success: false, error: error.message };
  }
}
export async function sendWelcomeEmail(to: string, name: string, loginUrl: string) {
  return sendResendEmail({
    to,
    subject: '🎉 Welcome to Elevate For Humanity!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
            .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome ${name}!</h1>
            </div>
            <div class="content">
              <p>Your account has been created successfully at Elevate For Humanity.</p>
              <p>You now have access to 100% free workforce development training programs.</p>
              <a href="${loginUrl}" class="button">Access Your Dashboard</a>
              <p>If you have any questions, please don't hesitate to contact us.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Elevate For Humanity. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}
