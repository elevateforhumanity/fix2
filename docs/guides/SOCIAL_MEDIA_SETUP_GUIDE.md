# 📱 Social Media API Setup Guide (15 Minutes)

**Last Updated**: 2025-10-29 04:07 UTC  
**Autopilot Version**: 7.0  
**Gets You**: 100% Functionality (Social Automation)

---

## 🎯 What You'll Get

After adding social media API keys:

- ✅ Auto-post course updates to Twitter/X
- ✅ Share student achievements on LinkedIn
- ✅ Post program announcements to Facebook
- ✅ Automated social media scheduling
- ✅ Cross-platform content distribution
- ✅ Engagement tracking
- ✅ Social proof automation

---

## 📋 Prerequisites

1. ✅ Supabase setup complete (80% functionality)
2. ✅ Social media accounts created
3. ✅ Developer access enabled

---

## 🐦 Part 1: Twitter/X API Setup (5 minutes)

### 1.1 Create Twitter Developer Account

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Sign in with your Twitter/X account
3. Click **Sign up for Free Account**
4. Complete application:
   - **Account name**: Your organization name
   - **Use case**: Education/Training platform
   - **Will you make Twitter content available to government?**: No
5. Agree to terms and submit
6. ✅ Wait for approval (usually instant)

### 1.2 Create Twitter App

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Click **Create Project**
3. Fill in details:
   - **Project name**: EFH-LMS
   - **Use case**: Making a bot
   - **Description**: Educational platform social automation
4. Click **Next**
5. Create app:
   - **App name**: efh-lms-bot (must be unique)
   - **Environment**: Production
6. Click **Complete**

### 1.3 Get Twitter API Keys

1. In your app dashboard, go to **Keys and tokens**
2. Copy these 4 credentials:

#### API Key and Secret

```bash
TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Access Token and Secret

Click **Generate** under "Access Token and Secret":

```bash
TWITTER_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.4 Set Permissions

1. Go to **Settings** tab
2. Under **User authentication settings**, click **Set up**
3. Enable **OAuth 1.0a**
4. Set **App permissions**: Read and write
5. Set **Callback URL**: `https://your-domain.netlify.app/auth/twitter/callback
6. Set **Website URL**: `https://your-domain.netlify.app
7. Click **Save**

---

## 💼 Part 2: LinkedIn API Setup (5 minutes)

### 2.1 Create LinkedIn App

1. Go to https://www.linkedin.com/developers/apps
2. Click **Create app**
3. Fill in details:
   - **App name**: EFH LMS
   - **LinkedIn Page**: Select your company page (or create one)
   - **Privacy policy URL**: `https://your-domain.netlify.app/privacy
   - **App logo**: Upload your logo (400x400px)
4. Check agreement box
5. Click **Create app**

### 2.2 Get LinkedIn API Keys

1. In your app dashboard, go to **Auth** tab
2. Copy these credentials:

```bash
LINKEDIN_CLIENT_ID=xxxxxxxxxxxxxxxx
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxxxxx
```

### 2.3 Request API Access

1. Go to **Products** tab
2. Request access to:
   - ✅ **Share on LinkedIn** (for posting)
   - ✅ **Sign In with LinkedIn** (for authentication)
3. Click **Request access** for each
4. ✅ Usually approved instantly

### 2.4 Set Redirect URLs

1. Go to **Auth** tab
2. Under **Redirect URLs**, add:
   ```
   https://your-domain.netlify.app/auth/linkedin/callback
   ```
3. Click **Update**

---

## 📘 Part 3: Facebook API Setup (5 minutes)

### 3.1 Create Facebook App

1. Go to https://developers.facebook.com/apps
2. Click **Create App**
3. Choose **Business** type
4. Fill in details:
   - **App name**: EFH LMS
   - **App contact email**: your@email.com
   - **Business account**: Select or create
5. Click **Create app**

### 3.2 Get Facebook API Keys

1. In app dashboard, go to **Settings** → **Basic**
2. Copy these credentials:

```bash
FACEBOOK_APP_ID=xxxxxxxxxxxxxxxx
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3.3 Add Facebook Login

1. In app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** platform
4. Set **Site URL**: `https://your-domain.netlify.app
5. Click **Save**

### 3.4 Configure OAuth Settings

1. Go to **Facebook Login** → **Settings**
2. Add **Valid OAuth Redirect URIs**:
   ```
   https://your-domain.netlify.app/auth/facebook/callback
   ```
3. Click **Save Changes**

### 3.5 Request Permissions

1. Go to **App Review** → **Permissions and Features**
2. Request these permissions:
   - ✅ `pages_manage_posts` (for posting to pages)
   - ✅ `pages_read_engagement` (for analytics)
3. Provide use case description
4. Submit for review

---

## 🔧 Step 4: Add Keys to Environment

### For Local Development:

Add to `.env` file:

```bash
# Twitter/X Configuration
TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# LinkedIn Configuration
LINKEDIN_CLIENT_ID=xxxxxxxxxxxxxxxx
LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxxxxx

# Facebook Configuration
FACEBOOK_APP_ID=xxxxxxxxxxxxxxxx
FACEBOOK_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### For Netlify:

1. Go to Netlify Dashboard → Your site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable** and add all 8:

| Key                      | Value    | Scope      |
| ------------------------ | -------- | ---------- |
| `TWITTER_API_KEY`        | `xxx...` | All scopes |
| `TWITTER_API_SECRET`     | `xxx...` | All scopes |
| `TWITTER_ACCESS_TOKEN`   | `xxx...` | All scopes |
| `TWITTER_ACCESS_SECRET`  | `xxx...` | All scopes |
| `LINKEDIN_CLIENT_ID`     | `xxx...` | All scopes |
| `LINKEDIN_CLIENT_SECRET` | `xxx...` | All scopes |
| `FACEBOOK_APP_ID`        | `xxx...` | All scopes |
| `FACEBOOK_APP_SECRET`    | `xxx...` | All scopes |

4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## 🧪 Step 5: Test Social Media Integration

### Test Twitter Posting

```javascript
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Test tweet
await client.v2.tweet('🎓 Testing EFH LMS social automation! #Education');
```

### Test LinkedIn Posting

```javascript
import axios from 'axios';

// Get access token first (OAuth flow)
const response = await axios.post(
  'https://api.linkedin.com/v2/ugcPosts',
  {
    author: `urn:li:person:${personId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: '🎓 Testing EFH LMS social automation! #Education',
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }
);
```

### Test Facebook Posting

```javascript
import axios from 'axios';

// Post to Facebook page
const response = await axios.post(
  `https://graph.facebook.com/v18.0/${pageId}/feed,
  {
    message: '🎓 Testing EFH LMS social automation! #Education',
    access_token: pageAccessToken,
  }
);
```

---

## 📊 What's Enabled Now

With social media APIs configured:

### ✅ Automated Posting

- Course launch announcements
- Student achievement celebrations
- Program updates
- Certificate completions
- Job placement announcements

### ✅ Cross-Platform Distribution

- Post to Twitter, LinkedIn, Facebook simultaneously
- Platform-specific formatting
- Optimal posting times
- Hashtag optimization

### ✅ Engagement Tracking

- Track likes, shares, comments
- Monitor reach and impressions
- Analyze engagement rates
- Generate social media reports

### ✅ Content Scheduling

- Schedule posts in advance
- Queue management
- Automatic posting
- Retry failed posts

---

## 🔒 Security Best Practices

### ✅ DO:

- Store API keys in environment variables
- Use OAuth for user authentication
- Rotate keys periodically
- Monitor API usage
- Set rate limits
- Use HTTPS only

### ❌ DON'T:

- Commit API keys to git
- Expose keys in frontend code
- Share keys publicly
- Use keys in client-side JavaScript
- Exceed rate limits
- Post spam content

---

## 📈 Rate Limits

### Twitter/X

- **Standard**: 300 tweets per 3 hours
- **Elevated**: 500 tweets per 3 hours
- **Read**: 900 requests per 15 minutes

### LinkedIn

- **Posts**: 100 per day per person
- **API calls**: 500 per day per app

### Facebook

- **Posts**: 200 per hour per user
- **API calls**: 200 per hour per user

---

## 🆘 Troubleshooting

### Issue: "Invalid API credentials"

**Solution**:

- Verify all 4 Twitter keys are correct
- Check LinkedIn client ID and secret
- Verify Facebook app ID and secret
- Regenerate keys if needed

### Issue: "Insufficient permissions"

**Solution**:

- Check app permissions in developer dashboard
- Request additional permissions if needed
- Complete app review process
- Verify OAuth scopes

### Issue: "Rate limit exceeded"

**Solution**:

- Implement exponential backoff
- Queue posts for later
- Upgrade to higher tier if available
- Spread posts across time

### Issue: "OAuth callback failed"

**Solution**:

- Verify redirect URLs match exactly
- Check HTTPS is enabled
- Verify domain is correct
- Test OAuth flow manually

---

## 📞 Support

If you encounter issues:

1. Check platform status pages
2. Review API documentation
3. Check developer console for errors
4. Test API calls with Postman
5. Autopilot will monitor and alert on posting failures

---

## 📚 Additional Resources

### Twitter/X

- Docs: https://developer.twitter.com/en/docs
- Status: https://api.twitterstat.us

### LinkedIn

- Docs: https://docs.microsoft.com/en-us/linkedin
- Support: https://www.linkedin.com/help/linkedin

### Facebook

- Docs: https://developers.facebook.com/docs
- Status: https://developers.facebook.com/status

---

**Setup Time**: 15 minutes  
**Functionality**: Social Media Automation  
**Status**: Production Ready  
**Generated by**: Autonomous Autopilot v7.0
