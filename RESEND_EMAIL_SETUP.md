# Resend Email Service Configuration Guide

## Overview

Resend is the email service provider for the LMS platform, handling:

- Welcome emails for new users
- Course enrollment confirmations
- Certificate delivery emails
- Password reset emails
- Notification emails
- Admin alerts

## Why Resend?

- ✅ **Modern API**: Simple, developer-friendly
- ✅ **High deliverability**: 99%+ inbox placement
- ✅ **React Email support**: Build emails with React components
- ✅ **Generous free tier**: 3,000 emails/month free
- ✅ **Custom domains**: Use your own domain for sending
- ✅ **Analytics**: Track opens, clicks, bounces

## Step 1: Create Resend Account

1. Go to https://resend.com/
2. Click **Sign Up** (free account)
3. Verify your email address
4. Complete onboarding

## Step 2: Get API Key

1. Log in to Resend Dashboard: https://resend.com/api-keys
2. Click **Create API Key**
3. Name: `elevate-lms-production`
4. Permission: **Sending access** (recommended) or **Full access**
5. Click **Create**
6. **IMPORTANT**: Copy the API key immediately (shown only once)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`
7. Save to GitHub Secrets as `RESEND_API_KEY`

## Step 3: Verify Domain (Recommended)

### Why Verify Domain?

- Send from `noreply@elevateconnectsdirectory.org` instead of `onboarding@resend.dev`
- Better deliverability and trust
- Professional appearance
- Required for production use

### Verification Steps:

1. In Resend Dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `elevateconnectsdirectory.org`
4. Resend will provide DNS records to add:

```
Type: TXT
Name: @
Value: resend-verification=xxxxxxxxxxxxxxxx

Type: MX
Name: @
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com

Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

5. Add these records to your DNS provider (Cloudflare):
   - Go to Cloudflare Dashboard → DNS
   - Add each record as shown above
   - Wait 5-10 minutes for propagation

6. Return to Resend Dashboard
7. Click **Verify Domain**
8. Status should change to **Verified** ✅

### Alternative: Use Subdomain

If you want to keep main domain separate:

- Use `mail.elevateconnectsdirectory.org` or `email.elevateconnectsdirectory.org`
- Follow same verification steps
- Send from `noreply@mail.elevateconnectsdirectory.org`

## Step 4: Configure Environment Variables

### Local Development (.env.local)

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@elevateconnectsdirectory.org
RESEND_FROM_NAME=Elevate for Humanity
```

### GitHub Secrets (Production)

Add these secrets to your repository:

```
RESEND_API_KEY=re_your_api_key_here
```

### Netlify Environment Variables

1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add:
   - `RESEND_API_KEY` = your API key
   - `RESEND_FROM_EMAIL` = noreply@elevateconnectsdirectory.org
   - `RESEND_FROM_NAME` = Elevate for Humanity
3. Deploy to apply changes

## Step 5: Install Resend SDK

Already installed in package.json:

```json
{
  "dependencies": {
    "resend": "^4.0.1"
  }
}
```

## Step 6: Create Email Templates

### Example: Welcome Email

Create `lib/emails/welcome.tsx`:

```tsx
import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
} from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  userName,
  loginUrl,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://www.elevateconnectsdirectory.org/logo.png"
            width="150"
            height="50"
            alt="Elevate for Humanity"
            style={logo}
          />
          <Section style={section}>
            <Text style={heading}>Welcome to Elevate for Humanity!</Text>
            <Text style={text}>Hi {userName},</Text>
            <Text style={text}>
              Thank you for joining our learning platform. We're excited to have
              you on board!
            </Text>
            <Button style={button} href={loginUrl}>
              Get Started
            </Button>
            <Text style={text}>
              If you have any questions, feel free to reply to this email.
            </Text>
            <Text style={footer}>
              © 2024 Elevate for Humanity. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const logo = {
  margin: '0 auto',
};

const section = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
```

## Step 7: Create Email Service

Create `lib/email-service.ts`:

```typescript
import { Resend } from 'resend';
import WelcomeEmail from './emails/welcome';
import CertificateEmail from './emails/certificate';
import PasswordResetEmail from './emails/password-reset';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'noreply@elevateconnectsdirectory.org';
const FROM_NAME = process.env.RESEND_FROM_NAME || 'Elevate for Humanity';

export async function sendWelcomeEmail(to: string, userName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: 'Welcome to Elevate for Humanity!',
      react: WelcomeEmail({
        userName,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      }),
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }

    console.log('Welcome email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendCertificateEmail(
  to: string,
  userName: string,
  courseName: string,
  certificateUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `Your ${courseName} Certificate is Ready!`,
      react: CertificateEmail({
        userName,
        courseName,
        certificateUrl,
      }),
      attachments: [
        {
          filename: 'certificate.pdf',
          path: certificateUrl,
        },
      ],
    });

    if (error) {
      console.error('Failed to send certificate email:', error);
      throw error;
    }

    console.log('Certificate email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending certificate email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: 'Reset Your Password',
      react: PasswordResetEmail({
        resetUrl,
      }),
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      throw error;
    }

    console.log('Password reset email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

export async function sendEnrollmentConfirmation(
  to: string,
  userName: string,
  courseName: string,
  courseUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `You're enrolled in ${courseName}!`,
      html: `
        <h1>Congratulations, ${userName}!</h1>
        <p>You've successfully enrolled in <strong>${courseName}</strong>.</p>
        <p><a href="${courseUrl}">Start Learning Now</a></p>
        <p>Best regards,<br>Elevate for Humanity Team</p>
      `,
    });

    if (error) {
      console.error('Failed to send enrollment email:', error);
      throw error;
    }

    console.log('Enrollment email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    throw error;
  }
}
```

## Step 8: Test Email Sending

### Test Script

Create `scripts/test-email.ts`:

```typescript
import { sendWelcomeEmail } from '../lib/email-service';

async function testEmail() {
  try {
    console.log('Sending test email...');

    const result = await sendWelcomeEmail(
      'your-email@example.com',
      'Test User'
    );

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', result?.id);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

testEmail();
```

Run test:

```bash
npx tsx scripts/test-email.ts
```

## Step 9: Email Types and Templates

### Required Email Templates

1. **Welcome Email** (`welcome.tsx`)
   - Sent when user signs up
   - Includes login link
   - Introduces platform features

2. **Certificate Email** (`certificate.tsx`)
   - Sent when certificate is generated
   - Includes PDF attachment
   - Congratulatory message

3. **Password Reset** (`password-reset.tsx`)
   - Sent when user requests password reset
   - Includes secure reset link
   - Expires in 1 hour

4. **Enrollment Confirmation** (`enrollment.tsx`)
   - Sent when user enrolls in course
   - Includes course link
   - Next steps guidance

5. **Course Completion** (`completion.tsx`)
   - Sent when user completes course
   - Includes certificate link
   - Suggests next courses

6. **Payment Receipt** (`receipt.tsx`)
   - Sent after successful payment
   - Includes invoice details
   - Download link

7. **Admin Notification** (`admin-alert.tsx`)
   - Sent to admins for important events
   - New user registrations
   - Payment issues

## Step 10: Email Analytics

### Track Email Performance

1. Go to Resend Dashboard → **Emails**
2. View metrics:
   - **Sent**: Total emails sent
   - **Delivered**: Successfully delivered
   - **Opens**: Email opened (requires tracking pixel)
   - **Clicks**: Links clicked
   - **Bounces**: Failed deliveries
   - **Complaints**: Spam reports

### Enable Click Tracking

```typescript
await resend.emails.send({
  from: FROM_EMAIL,
  to: [to],
  subject: 'Your Subject',
  react: YourEmailTemplate(),
  tags: [
    { name: 'category', value: 'welcome' },
    { name: 'user_id', value: userId },
  ],
  headers: {
    'X-Entity-Ref-ID': userId,
  },
});
```

## Step 11: Best Practices

### 1. Email Deliverability

- ✅ Verify domain (SPF, DKIM, DMARC)
- ✅ Use consistent "From" address
- ✅ Avoid spam trigger words
- ✅ Include unsubscribe link
- ✅ Maintain clean email list

### 2. Content Guidelines

- ✅ Clear subject lines (< 50 characters)
- ✅ Mobile-responsive design
- ✅ Plain text alternative
- ✅ Accessible HTML (semantic markup)
- ✅ Test across email clients

### 3. Security

- ✅ Never expose API key in client code
- ✅ Use environment variables
- ✅ Validate email addresses
- ✅ Rate limit email sending
- ✅ Log all email activity

### 4. Performance

- ✅ Send emails asynchronously
- ✅ Use queue for bulk emails
- ✅ Batch similar emails
- ✅ Cache email templates
- ✅ Monitor send rates

## Step 12: Pricing and Limits

### Resend Pricing (as of 2024)

**Free Tier**:

- 3,000 emails/month
- 100 emails/day
- 1 verified domain
- Email analytics
- API access

**Pro Plan** ($20/month):

- 50,000 emails/month
- Unlimited domains
- Priority support
- Advanced analytics
- Webhooks

**Enterprise** (Custom):

- Custom volume
- Dedicated IP
- SLA guarantees
- White-glove support

### Estimated Monthly Cost (1000 students)

- Welcome emails: 100/month
- Enrollment confirmations: 200/month
- Certificates: 50/month
- Notifications: 150/month
- **Total**: ~500 emails/month = **FREE** ✅

## Step 13: Error Handling

### Common Errors

**Error: "Invalid API key"**

- Check `RESEND_API_KEY` is set correctly
- Verify key hasn't expired
- Ensure key has sending permissions

**Error: "Domain not verified"**

- Complete domain verification in Resend Dashboard
- Check DNS records are correct
- Wait for DNS propagation (up to 24 hours)

**Error: "Rate limit exceeded"**

- Implement exponential backoff
- Use queue for bulk sends
- Upgrade to Pro plan if needed

**Error: "Invalid recipient"**

- Validate email format before sending
- Check for typos in email address
- Remove bounced emails from list

### Retry Logic

```typescript
async function sendEmailWithRetry(emailFn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await emailFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}
```

## Step 14: Monitoring and Maintenance

### Set Up Webhooks (Optional)

1. Go to Resend Dashboard → **Webhooks**
2. Click **Add Webhook**
3. URL: `https://www.elevateconnectsdirectory.org/api/webhooks/resend`
4. Events:
   - `email.sent`
   - `email.delivered`
   - `email.bounced`
   - `email.complained`
5. Save webhook secret to environment variables

### Create Webhook Handler

```typescript
// app/api/webhooks/resend/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const signature = request.headers.get('resend-signature');

  // Verify webhook signature
  // Process event
  switch (body.type) {
    case 'email.bounced':
      // Mark email as bounced in database
      break;
    case 'email.complained':
      // Unsubscribe user
      break;
  }

  return NextResponse.json({ received: true });
}
```

### Regular Maintenance

- [ ] Review bounce rates weekly
- [ ] Clean email list monthly
- [ ] Update email templates quarterly
- [ ] Rotate API keys annually
- [ ] Monitor deliverability metrics

## Troubleshooting

### Emails Not Sending

1. Check API key is valid
2. Verify domain is verified
3. Check rate limits
4. Review error logs
5. Test with simple HTML email first

### Emails Going to Spam

1. Complete domain verification (SPF, DKIM, DMARC)
2. Warm up domain (start with low volume)
3. Avoid spam trigger words
4. Include unsubscribe link
5. Maintain good sender reputation

### Low Open Rates

1. Improve subject lines
2. Send at optimal times
3. Segment email list
4. Personalize content
5. A/B test different approaches

## Next Steps

1. ✅ Create Resend account
2. ✅ Get API key
3. ✅ Verify domain
4. ✅ Add API key to GitHub Secrets
5. ✅ Create email templates
6. ✅ Test email sending
7. ✅ Set up webhooks (optional)
8. ✅ Deploy to production

## Support Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Email Best Practices](https://resend.com/docs/best-practices)
- [Resend Status Page](https://status.resend.com/)

---

**Status**: ⚠️ Configuration needed - Add API key to GitHub Secrets
**Priority**: High - Required for user notifications and certificates
**Estimated Setup Time**: 20-30 minutes (including domain verification)
