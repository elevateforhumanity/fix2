# Social Media Posting Automation

Automated posting to Facebook, Instagram, and LinkedIn for the 90-day content calendar.

## Overview

This system automatically posts AI-generated content to social media platforms 3 times per day.

**Platforms:**
- ✅ Facebook (Page posts)
- ✅ Instagram (Feed posts with images)
- ✅ LinkedIn (Organization posts)
- ❌ TikTok (Manual posting - no API access)

**Schedule:**
- 9 AM EST - Morning post
- 1 PM EST - Afternoon post
- 7 PM EST - Evening post

## Setup

### 1. Facebook Setup

#### Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Business** type
4. Enter app name: "EFH Social Automation"
5. Click **Create App**

#### Get Page Access Token

1. In your app, go to **Tools** → **Graph API Explorer**
2. Select your Facebook Page
3. Add permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
4. Click **Generate Access Token**
5. Copy the token

#### Get Long-Lived Token

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
```

#### Get Page ID

1. Go to your Facebook Page
2. Click **About**
3. Scroll to **Page ID**
4. Copy the ID

### 2. Instagram Setup

#### Connect Instagram to Facebook

1. Go to [Facebook Business Settings](https://business.facebook.com/settings/)
2. Click **Instagram Accounts**
3. Click **Connect**
4. Log in to Instagram
5. Select your Instagram Business account

#### Get Instagram Account ID

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_PAGE_ACCESS_TOKEN"
```

Look for `instagram_business_account` → `id`

### 3. LinkedIn Setup

#### Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Click **Create app**
3. Enter app details:
   - App name: "EFH Social Automation"
   - LinkedIn Page: Select your organization page
4. Click **Create app**

#### Request API Access

1. In your app, go to **Products**
2. Request access to:
   - **Share on LinkedIn**
   - **Marketing Developer Platform**
3. Wait for approval (usually 1-2 days)

#### Get Access Token

1. Go to **Auth** tab
2. Copy **Client ID** and **Client Secret**
3. Generate access token:

```bash
# Step 1: Get authorization code
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=w_member_social%20r_organization_social%20w_organization_social

# Step 2: Exchange code for token
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=YOUR_AUTH_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=YOUR_REDIRECT_URI"
```

#### Get Organization ID

```bash
curl -X GET "https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&projection=(elements*(organization~(id)))" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Configure Environment Variables

Add to Netlify Dashboard → Site settings → Environment variables:

```bash
# Facebook
FACEBOOK_PAGE_ACCESS_TOKEN=your-long-lived-page-access-token
FACEBOOK_PAGE_ID=your-page-id

# Instagram
INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token
INSTAGRAM_ACCOUNT_ID=your-instagram-business-account-id

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your-linkedin-access-token
LINKEDIN_ORGANIZATION_ID=your-organization-id

# Frontend URL (already configured)
FRONTEND_URL=https://elevateforhumanity.org
```

## Usage

### Manual Post

Post a specific piece of content:

```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/post-to-social-media \
  -H "Content-Type: application/json" \
  -d '{
    "content_id": "uuid-here",
    "platform": "facebook"
  }'
```

### Post Today's Scheduled Content

```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/post-scheduled-content \
  -H "Content-Type: application/json" \
  -d '{"platform": "facebook"}'
```

### Automated Posting

GitHub Actions automatically posts 3x daily:
- 9 AM EST (14:00 UTC)
- 1 PM EST (18:00 UTC)
- 7 PM EST (00:00 UTC)

## Content Requirements

### Facebook
- ✅ Text only
- ✅ Text + image
- ✅ Text + video
- Max: 63,206 characters

### Instagram
- ❌ Text only (requires image)
- ✅ Text + image (required)
- ✅ Text + video
- Max: 2,200 characters

### LinkedIn
- ✅ Text only
- ✅ Text + image
- ✅ Text + video
- Max: 3,000 characters

## Image Generation for Instagram

Since Instagram requires images, you need to either:

1. **Upload images manually** to Supabase Storage
2. **Generate images automatically** using:
   - Canva API
   - Cloudinary
   - ImageMagick (text to image)

Example: Generate image with text overlay

```javascript
// Using Cloudinary
const imageUrl = `https://res.cloudinary.com/your-cloud/image/upload/w_1080,h_1080,c_fill,g_center/l_text:Arial_60_bold:${encodeURIComponent(content)},co_white,g_center/v1/background.jpg`;
```

## Monitoring

### View Posted Content

```sql
-- Recent posts
SELECT 
  id,
  platform,
  content,
  published_date,
  likes,
  comments,
  shares
FROM generated_content
WHERE status = 'published'
ORDER BY published_date DESC
LIMIT 20;

-- Posts by platform
SELECT 
  platform,
  COUNT(*) as total_posts,
  SUM(likes) as total_likes,
  SUM(comments) as total_comments,
  SUM(shares) as total_shares
FROM generated_content
WHERE status = 'published'
GROUP BY platform;
```

### Check Scheduled Posts

```sql
-- Upcoming posts
SELECT 
  platform,
  scheduled_date,
  content,
  status
FROM generated_content
WHERE status = 'scheduled'
  AND scheduled_date >= NOW()
ORDER BY scheduled_date ASC;
```

## Best Practices

### Posting Times

**Facebook:**
- Best: 1-4 PM EST (weekdays)
- Good: 9 AM-12 PM EST
- Avoid: Late night, early morning

**Instagram:**
- Best: 11 AM-1 PM, 7-9 PM EST
- Good: 9-11 AM EST
- Avoid: 3-4 PM EST

**LinkedIn:**
- Best: 7-9 AM, 5-6 PM EST (weekdays)
- Good: 12-1 PM EST
- Avoid: Weekends

### Content Strategy

1. **Vary content types** - Mix success stories, tips, CTAs
2. **Use hashtags** - Platform-specific counts
3. **Include images** - Higher engagement
4. **Post consistently** - Daily on all platforms
5. **Monitor engagement** - Adjust based on performance

### Compliance

1. **Student consent** - Get permission for photos/stories
2. **Accurate information** - Verify statistics
3. **Disclosure** - Mention FREE training, government-funded
4. **Accessibility** - Add alt text for images
5. **Brand guidelines** - Follow EFH standards

## Troubleshooting

### Facebook Errors

**Error:** "Invalid OAuth access token"
- **Solution:** Regenerate long-lived token
- **Solution:** Check token hasn't expired (60 days)

**Error:** "Permissions error"
- **Solution:** Ensure `pages_manage_posts` permission
- **Solution:** Re-authorize app

### Instagram Errors

**Error:** "Media URL is not accessible"
- **Solution:** Ensure image URL is publicly accessible
- **Solution:** Use HTTPS URLs only

**Error:** "Caption is too long"
- **Solution:** Limit to 2,200 characters
- **Solution:** Move hashtags to first comment

### LinkedIn Errors

**Error:** "Access token expired"
- **Solution:** LinkedIn tokens expire after 60 days
- **Solution:** Implement token refresh flow

**Error:** "Organization not found"
- **Solution:** Verify organization ID
- **Solution:** Ensure app has access to organization

## Token Refresh

### Facebook

Facebook Page tokens don't expire if the app is active.

### Instagram

Use same token as Facebook Page.

### LinkedIn

Implement OAuth refresh flow:

```javascript
const refreshToken = async () => {
  const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.LINKEDIN_REFRESH_TOKEN,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  });
  
  const data = await response.json();
  return data.access_token;
};
```

## Rate Limits

### Facebook
- 200 calls per hour per user
- 4,800 calls per day per app

### Instagram
- 200 calls per hour per user
- 4,800 calls per day per app

### LinkedIn
- 100 posts per day per organization
- 500 API calls per day per app

## Analytics Integration

Track engagement metrics:

```javascript
// Update engagement metrics
const updateEngagement = async (contentId, platform) => {
  let metrics;
  
  switch (platform) {
    case 'facebook':
      metrics = await getFacebookMetrics(postId);
      break;
    case 'instagram':
      metrics = await getInstagramMetrics(postId);
      break;
    case 'linkedin':
      metrics = await getLinkedInMetrics(postId);
      break;
  }
  
  await supabase
    .from('generated_content')
    .update({
      likes: metrics.likes,
      comments: metrics.comments,
      shares: metrics.shares,
      views: metrics.views,
    })
    .eq('id', contentId);
};
```

## Resources

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [LinkedIn API](https://docs.microsoft.com/en-us/linkedin/)
- [Social Media Best Times](https://sproutsocial.com/insights/best-times-to-post-on-social-media/)

## Support

For issues:
1. Check Netlify function logs
2. Review platform API status pages
3. Verify access tokens haven't expired
4. Test API calls manually with curl

---

**Social media posting is now automated! Post to Facebook, Instagram, and LinkedIn 3x daily. 🚀**
