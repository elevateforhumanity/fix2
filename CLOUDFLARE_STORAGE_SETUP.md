# Cloudflare R2 Storage Configuration Guide

## Overview

Cloudflare R2 provides S3-compatible object storage for the LMS platform to store:

- Course videos and media files
- Student certificates (PDFs)
- User profile images
- Course materials and documents

## Prerequisites

- Cloudflare account with R2 enabled
- Account ID: `6ba1d2a52a3fa230972960db307ac7c0` (already configured)

## Step 1: Create R2 Bucket

1. Log in to Cloudflare Dashboard: https://dash.cloudflare.com/
2. Navigate to **R2** in the left sidebar
3. Click **Create bucket**
4. Bucket name: `elevate-lms-storage`
5. Location: **Automatic** (recommended) or choose closest to your users
6. Click **Create bucket**

## Step 2: Generate R2 API Tokens

### Option A: API Token (Recommended)

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Token name: `elevate-lms-production`
4. Permissions:
   - **Object Read & Write** (for file uploads/downloads)
   - **Bucket Read** (for listing files)
5. TTL: **Forever** (or set expiration as needed)
6. Click **Create API token**
7. **IMPORTANT**: Copy the token immediately (shown only once)
8. Save to GitHub Secrets as `CLOUDFLARE_API_TOKEN`

### Option B: R2 Access Keys (S3-Compatible)

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Select **R2 Token** type
4. Permissions: **Admin Read & Write**
5. Click **Create API token**
6. Copy both:
   - **Access Key ID** → Save as `CLOUDFLARE_R2_ACCESS_KEY_ID`
   - **Secret Access Key** → Save as `CLOUDFLARE_R2_SECRET_ACCESS_KEY`

## Step 3: Configure Custom Domain (Optional but Recommended)

### Why Custom Domain?

- Branded URLs: `https://storage.elevateforhumanity.org/file.pdf`
- Better SEO and user trust
- Consistent with your domain

### Setup Steps:

1. In R2 bucket settings, click **Settings** tab
2. Scroll to **Public access**
3. Click **Connect domain**
4. Enter domain: `storage.elevateforhumanity.org`
5. Cloudflare will create DNS records automatically
6. Wait 5-10 minutes for DNS propagation
7. Test: `https://storage.elevateforhumanity.org/test.txt`

### Alternative: Use R2.dev Domain

If you don't want a custom domain:

1. Enable **Public access** in bucket settings
2. Use auto-generated URL: `https://pub-[hash].r2.dev`
3. Update `.env.local`: `CLOUDFLARE_R2_PUBLIC_URL=https://pub-[hash].r2.dev`

## Step 4: Update Environment Variables

### Local Development (.env.local)

```bash
CLOUDFLARE_ACCOUNT_ID=6ba1d2a52a3fa230972960db307ac7c0
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_R2_BUCKET=elevate-lms-storage
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key_here
CLOUDFLARE_R2_PUBLIC_URL=https://storage.elevateforhumanity.org
```

### GitHub Secrets (Production)

Add these secrets to your repository:

```
CLOUDFLARE_ACCOUNT_ID=6ba1d2a52a3fa230972960db307ac7c0
CLOUDFLARE_API_TOKEN=<your_token>
CLOUDFLARE_R2_BUCKET=elevate-lms-storage
CLOUDFLARE_R2_ACCESS_KEY_ID=<your_access_key>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<your_secret_key>
CLOUDFLARE_R2_PUBLIC_URL=https://storage.elevateforhumanity.org
```

### Netlify Environment Variables

1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add the same variables as above
3. Deploy to apply changes

## Step 5: Configure CORS (Required for Browser Uploads)

1. In R2 bucket settings, click **Settings** tab
2. Scroll to **CORS policy**
3. Click **Add CORS policy**
4. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://www.elevateforhumanity.org",
      "https://www.elevateforhumanity.org",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## Step 6: Test Storage Integration

### Test Upload (Node.js)

```javascript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const command = new PutObjectCommand({
  Bucket: 'elevate-lms-storage',
  Key: 'test.txt',
  Body: 'Hello from Elevate LMS!',
  ContentType: 'text/plain',
});

await s3Client.send(command);
console.log('✅ Upload successful!');
```

### Test from Browser

```javascript
const response = await fetch(
  'https://storage.elevateforhumanity.org/test.txt'
);
const text = await response.text();
console.log('✅ Download successful:', text);
```

## Step 7: Folder Structure

Organize files in R2 bucket:

```
elevate-lms-storage/
├── courses/
│   ├── {course-id}/
│   │   ├── videos/
│   │   │   └── lesson-1.mp4
│   │   ├── materials/
│   │   │   └── syllabus.pdf
│   │   └── thumbnails/
│   │       └── cover.jpg
├── certificates/
│   └── {user-id}/
│       └── {certificate-id}.pdf
├── profiles/
│   └── {user-id}/
│       └── avatar.jpg
└── uploads/
    └── temp/
        └── {upload-id}.tmp
```

## Step 8: Security Best Practices

### 1. Bucket Access Control

- ✅ Keep bucket **private** by default
- ✅ Use signed URLs for sensitive files (certificates, private videos)
- ✅ Only make public: course thumbnails, public materials

### 2. API Token Security

- ✅ Never commit tokens to Git
- ✅ Use GitHub Secrets for CI/CD
- ✅ Rotate tokens every 90 days
- ✅ Use separate tokens for dev/staging/production

### 3. File Validation

- ✅ Validate file types before upload
- ✅ Scan for malware (use Cloudflare Workers)
- ✅ Limit file sizes (videos: 2GB, images: 10MB, PDFs: 50MB)

### 4. Rate Limiting

- ✅ Implement upload rate limits per user
- ✅ Use Cloudflare Workers to add authentication layer
- ✅ Monitor usage in R2 dashboard

## Step 9: Cost Optimization

### R2 Pricing (as of 2024)

- **Storage**: $0.015/GB/month
- **Class A operations** (writes): $4.50/million requests
- **Class B operations** (reads): $0.36/million requests
- **Egress**: **FREE** (no bandwidth charges!)

### Optimization Tips

1. **Use CDN caching**: Cache static files at edge
2. **Compress files**: Use gzip/brotli for text files
3. **Lazy load videos**: Stream instead of full download
4. **Delete old files**: Implement lifecycle policies
5. **Use thumbnails**: Generate smaller preview images

### Estimated Monthly Cost (1000 students)

- Storage (100GB): $1.50
- Uploads (10k/month): $0.05
- Downloads (100k/month): $0.04
- **Total**: ~$2/month (vs $9+ on AWS S3)

## Step 10: Monitoring and Maintenance

### Cloudflare Dashboard Metrics

- Total storage used
- Request count (reads/writes)
- Bandwidth usage
- Error rates

### Set Up Alerts

1. Go to Cloudflare Dashboard → Notifications
2. Create alert for:
   - Storage exceeds 80% of quota
   - Error rate > 5%
   - Unusual traffic spikes

### Regular Maintenance

- [ ] Review storage usage monthly
- [ ] Delete orphaned files (files not in database)
- [ ] Rotate API tokens quarterly
- [ ] Update CORS policy as needed
- [ ] Test backup/restore procedures

## Troubleshooting

### Error: "Access Denied"

- Check API token permissions
- Verify bucket name is correct
- Ensure CORS policy includes your domain

### Error: "Bucket not found"

- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Check bucket name spelling
- Ensure bucket exists in correct account

### Slow Upload Speeds

- Use multipart uploads for files > 100MB
- Enable HTTP/2 in Cloudflare settings
- Consider using Cloudflare Workers for upload optimization

### Files Not Accessible

- Check bucket public access settings
- Verify custom domain DNS records
- Test with R2.dev URL first

## Next Steps

1. ✅ Create R2 bucket: `elevate-lms-storage`
2. ✅ Generate API tokens
3. ✅ Add secrets to GitHub
4. ✅ Configure custom domain (optional)
5. ✅ Set up CORS policy
6. ✅ Test upload/download
7. ✅ Update application code to use R2
8. ✅ Deploy to production

## Support Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [S3 API Compatibility](https://developers.cloudflare.com/r2/api/s3/)
- [R2 Pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

**Status**: ⚠️ Configuration needed - Add API tokens to GitHub Secrets
**Priority**: High - Required for file uploads and certificate generation
**Estimated Setup Time**: 15-20 minutes
