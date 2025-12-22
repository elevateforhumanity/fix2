# Download Delivery System

## Overview

The download delivery system handles secure distribution of digital products after purchase. It includes:

1. **Webhook Processing** - Stripe webhook triggers after successful payment
2. **Email Delivery** - Sends download links and license keys via email
3. **Secure Downloads** - Token-based download verification
4. **Purchase Tracking** - Records all purchases in database

## Architecture

```
Purchase Flow:
1. Customer completes checkout → Stripe processes payment
2. Stripe sends webhook → /api/store/webhook
3. Webhook verifies signature → Validates payment
4. System generates license key → Stores in database
5. Email sent to customer → Contains download link + license
6. Customer clicks link → /api/store/download/[productId]?token=xxx
7. System verifies token → Delivers file or redirects to storage
```

## Components

### 1. Webhook Handler

**Location**: `/app/api/store/webhook/route.ts`

**Handles**:

- `checkout.session.completed` - One-time purchases
- `customer.subscription.created` - New subscriptions
- `customer.subscription.updated` - Subscription changes
- `customer.subscription.deleted` - Cancellations

**Process**:

```typescript
1. Verify webhook signature (security)
2. Extract payment details (email, product ID, amount)
3. Generate license key
4. Store purchase in database
5. Send confirmation email with download link
6. Return success response
```

### 2. Download Endpoint

**Location**: `/app/api/store/download/[productId]/route.ts`

**Parameters**:

- `productId` - Product slug or ID
- `token` - Verification token from purchase

**Security**:

- Validates token against purchase records
- Checks expiration (optional)
- Limits download attempts (optional)
- Logs all download requests

**Response**:

- Redirects to file storage (S3, R2, etc.)
- Or streams file directly
- Or returns signed URL

### 3. Email Templates

**Location**: `/app/api/email/send/route.ts`

**Templates**:

- `license-delivery` - Sends license key and download link
- `purchase-confirmation` - Order receipt
- `download-ready` - Notification when files are ready

**Variables**:

```typescript
{
  productName: string;
  licenseKey: string;
  downloadUrl: string;
  customerName?: string;
  expiresAt?: string;
}
```

### 4. Database Schema

**purchases table**:

```sql
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  stripe_payment_id TEXT,
  amount INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**licenses table**:

```sql
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  license_key TEXT NOT NULL UNIQUE,
  activated_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**downloads table** (optional):

```sql
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID REFERENCES purchases(id),
  product_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMP DEFAULT NOW()
);
```

## File Storage Options

### Option 1: AWS S3

```typescript
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

async function generateDownloadUrl(productId: string) {
  const command = new GetObjectCommand({
    Bucket: 'efh-digital-products',
    Key: `products/${productId}.zip`,
  });

  // URL expires in 1 hour
  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}
```

### Option 2: Cloudflare R2

```typescript
import { S3Client } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Same API as S3
```

### Option 3: Direct Server Storage

```typescript
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

async function streamFile(productId: string) {
  const filePath = `/var/products/${productId}.zip`;
  const file = await readFile(filePath);

  return new NextResponse(file, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${productId}.zip"`,
    },
  });
}
```

## Security Best Practices

### 1. Token Generation

```typescript
import crypto from 'crypto';

function generateDownloadToken(purchaseId: string, productId: string): string {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET!;
  const data = `${purchaseId}:${productId}:${Date.now()}`;

  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}
```

### 2. Token Verification

```typescript
async function verifyDownloadToken(
  token: string,
  productId: string
): Promise<boolean> {
  const supabase = await createClient();

  // Check if token exists and is valid
  const { data: purchase } = await supabase
    .from('purchases')
    .select('*')
    .eq('download_token', token)
    .eq('product_id', productId)
    .single();

  if (!purchase) return false;

  // Check expiration (optional)
  const expiresAt = new Date(purchase.token_expires_at);
  if (expiresAt < new Date()) return false;

  return true;
}
```

### 3. Rate Limiting

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 downloads per hour
});

async function checkDownloadLimit(email: string): Promise<boolean> {
  const { success } = await ratelimit.limit(email);
  return success;
}
```

### 4. Download Tracking

```typescript
async function trackDownload(
  purchaseId: string,
  productId: string,
  request: Request
) {
  const supabase = await createClient();

  await supabase.from('downloads').insert({
    purchase_id: purchaseId,
    product_id: productId,
    ip_address: request.headers.get('x-forwarded-for'),
    user_agent: request.headers.get('user-agent'),
  });
}
```

## Email Configuration

### Resend Setup

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendDownloadEmail(
  email: string,
  productName: string,
  downloadUrl: string,
  licenseKey: string
) {
  await resend.emails.send({
    from: 'Elevate for Humanity <orders@elevateforhumanity.org>',
    to: email,
    subject: `Your ${productName} is Ready`,
    html: `
      <h1>Thank you for your purchase!</h1>
      <p>Your ${productName} is ready to download.</p>
      
      <h2>Download Link</h2>
      <p><a href="${downloadUrl}">Click here to download</a></p>
      <p>This link expires in 24 hours.</p>
      
      <h2>License Key</h2>
      <p><code>${licenseKey}</code></p>
      
      <p>Questions? Reply to this email or contact support@elevateforhumanity.org</p>
    `,
  });
}
```

## Testing

### Test Webhook Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/store/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

### Test Download Flow

```bash
# 1. Complete test purchase
curl -X POST http://localhost:3000/api/store/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"productId": "tax-toolkit", "amount": 4900}'

# 2. Simulate webhook
curl -X POST http://localhost:3000/api/store/webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: test_signature" \
  -d @webhook-payload.json

# 3. Test download
curl http://localhost:3000/api/store/download/tax-toolkit?token=test_token
```

## Production Checklist

- [ ] Configure file storage (S3/R2)
- [ ] Set up email service (Resend/SendGrid)
- [ ] Create webhook endpoint in Stripe Dashboard
- [ ] Add webhook signing secret to environment
- [ ] Test webhook delivery
- [ ] Configure download token expiration
- [ ] Set up rate limiting
- [ ] Enable download tracking
- [ ] Create email templates
- [ ] Test complete purchase flow
- [ ] Monitor webhook failures
- [ ] Set up alerts for failed deliveries

## Monitoring

### Key Metrics

- Webhook success rate
- Email delivery rate
- Download completion rate
- Average time from purchase to download
- Failed delivery attempts

### Logging

```typescript
logger.info('Purchase completed', {
  email,
  productId,
  amount,
  paymentId,
});

logger.info('Download delivered', {
  email,
  productId,
  downloadToken,
  ipAddress,
});

logger.error('Webhook failed', {
  event: event.type,
  error: error.message,
  paymentId,
});
```

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is accessible
2. Verify webhook signing secret
3. Check Stripe Dashboard → Webhooks → Event logs
4. Ensure endpoint returns 200 status

### Email Not Delivered

1. Check email service API key
2. Verify sender domain is verified
3. Check spam folder
4. Review email service logs
5. Ensure email template is valid

### Download Link Expired

1. Check token expiration settings
2. Verify purchase record exists
3. Generate new token if needed
4. Send new email with fresh link

### File Not Found

1. Verify file exists in storage
2. Check file path/key is correct
3. Ensure storage credentials are valid
4. Check file permissions

## Future Enhancements

- [ ] Automatic retry for failed deliveries
- [ ] Download analytics dashboard
- [ ] Multiple file formats per product
- [ ] Bulk download for bundles
- [ ] Download resume support
- [ ] Mobile app integration
- [ ] Offline download queue
- [ ] Customer download history page
