# OAuth Configuration - Step by Step

## What We're Configuring

1. **GitHub OAuth** - For code editor commit/push
2. **LinkedIn OAuth** - For social media posting
3. **Facebook OAuth** - For social media posting

---

## 1. GitHub OAuth (5 minutes)

### Step 1: Create OAuth App

1. Open: https://github.com/settings/developers
2. Click: **"New OAuth App"**
3. Fill in:
   ```
   Application name: Elevate for Humanity Code Editor
   Homepage URL: https://elevateforhumanity.org
   Authorization callback URL: https://elevateforhumanity.org/api/auth/callback/github
   ```
4. Click: **"Register application"**

### Step 2: Get Credentials

1. Copy the **Client ID** (looks like: `Iv1.abc123def456`)
2. Click: **"Generate a new client secret"**
3. Copy the **Client Secret** (looks like: `abc123def456...`)
4. **SAVE BOTH** - you can't see the secret again!

### Step 3: Create Personal Access Token

1. Open: https://github.com/settings/tokens
2. Click: **"Generate new token (classic)"**
3. Name: `Elevate Code Editor`
4. Select scopes:
   - ✅ `repo` (Full control of repositories)
   - ✅ `workflow` (Update workflows)
5. Click: **"Generate token"**
6. Copy the token (looks like: `ghp_abc123...`)
7. **SAVE IT** - you can't see it again!

### Step 4: Add to .env.local

```bash
# GitHub OAuth
GITHUB_TOKEN=ghp_your_token_here
GITHUB_CLIENT_ID=Iv1.your_client_id_here
GITHUB_CLIENT_SECRET=your_secret_here
GITHUB_OAUTH_ENABLED=true
NEXT_PUBLIC_GITHUB_ENABLED=true
```

---

## 2. LinkedIn OAuth (10 minutes)

### Step 1: Create LinkedIn App

1. Open: https://www.linkedin.com/developers/apps
2. Click: **"Create app"**
3. Fill in:
   ```
   App name: Elevate for Humanity
   LinkedIn Page: [Select your company page]
   Privacy policy URL: https://elevateforhumanity.org/privacy
   App logo: [Upload your logo]
   ```
4. Click: **"Create app"**

### Step 2: Request API Access

1. Go to **"Products"** tab
2. Request access to: **"Share on LinkedIn"**
3. Wait for approval (usually instant)

### Step 3: Get Credentials

1. Go to **"Auth"** tab
2. Copy **Client ID**
3. Copy **Client Secret**
4. Add redirect URL:
   ```
   https://elevateforhumanity.org/api/auth/callback/linkedin
   ```

### Step 4: Get Access Token

1. Go to **"Auth"** tab
2. Scroll to **"OAuth 2.0 settings"**
3. Click: **"Generate access token"**
4. Select scopes:
   - ✅ `w_member_social` (Share content)
   - ✅ `r_organization_social` (Read org content)
   - ✅ `w_organization_social` (Share org content)
5. Copy the access token

### Step 5: Get Organization ID

1. Go to your LinkedIn company page
2. Look at URL: `linkedin.com/company/YOUR-ORG-ID/`
3. Copy the organization ID

### Step 6: Add to .env.local

```bash
# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_secret_here
LINKEDIN_ACCESS_TOKEN=your_access_token_here
LINKEDIN_ORGANIZATION_ID=your_org_id_here
SOCIAL_MEDIA_LINKEDIN_ENABLED=true
```

---

## 3. Facebook OAuth (10 minutes)

### Step 1: Create Facebook App

1. Open: https://developers.facebook.com/apps
2. Click: **"Create App"**
3. Select: **"Business"** type
4. Fill in:
   ```
   App name: Elevate for Humanity
   Contact email: info@elevateforhumanity.org
   ```
5. Click: **"Create App"**

### Step 2: Add Facebook Login

1. In dashboard, click: **"Add Product"**
2. Find **"Facebook Login"** and click **"Set Up"**
3. Select: **"Web"**
4. Add redirect URL:
   ```
   https://elevateforhumanity.org/api/auth/callback/facebook
   ```

### Step 3: Get App Credentials

1. Go to **"Settings"** → **"Basic"**
2. Copy **App ID**
3. Click **"Show"** next to App Secret
4. Copy **App Secret**

### Step 4: Get Page Access Token

1. Go to: https://developers.facebook.com/tools/explorer/
2. Select your app from dropdown
3. Click **"Generate Access Token"**
4. Select permissions:
   - ✅ `pages_manage_posts`
   - ✅ `pages_read_engagement`
   - ✅ `publish_to_groups`
5. Click **"Generate Access Token"**
6. Copy the token

### Step 5: Get Page ID

1. Go to your Facebook page
2. Click **"About"**
3. Scroll down to find **Page ID**
4. Or use Graph API Explorer: `me/accounts`

### Step 6: Add to .env.local

```bash
# Facebook OAuth
FACEBOOK_APP_ID=your_app_id_here
FACEBOOK_APP_SECRET=your_secret_here
FACEBOOK_ACCESS_TOKEN=your_page_token_here
FACEBOOK_PAGE_ID=your_page_id_here
SOCIAL_MEDIA_FACEBOOK_ENABLED=true
```

---

## 4. Complete .env.local File

Your final `.env.local` should have:

```bash
# GitHub OAuth
GITHUB_TOKEN=ghp_...
GITHUB_CLIENT_ID=Iv1....
GITHUB_CLIENT_SECRET=...
GITHUB_OAUTH_ENABLED=true
NEXT_PUBLIC_GITHUB_ENABLED=true

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_ACCESS_TOKEN=...
LINKEDIN_ORGANIZATION_ID=...
SOCIAL_MEDIA_LINKEDIN_ENABLED=true

# Facebook OAuth
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
FACEBOOK_ACCESS_TOKEN=...
FACEBOOK_PAGE_ID=...
SOCIAL_MEDIA_FACEBOOK_ENABLED=true

# Social Media Settings
SOCIAL_MEDIA_POST_TIMES=09:00,13:00,18:00
SOCIAL_MEDIA_TIMEZONE=America/New_York
SOCIAL_MEDIA_AUTO_POST_BLOG=true
```

---

## 5. Test Everything

### Test GitHub OAuth:

```bash
# Visit code editor
open http://localhost:3000/admin/editor

# Try to commit a file
# Should work without errors
```

### Test Social Media:

```bash
# Test posting
curl -X POST http://localhost:3000/api/social-media/post \
  -H "Content-Type: application/json" \
  -d '{"content":"Test post from Elevate!","platforms":["linkedin","facebook"]}'

# Check response for success
```

---

## 6. Production Deployment

### Add to Vercel:

```bash
# Option 1: CLI
vercel env add GITHUB_TOKEN
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET
vercel env add LINKEDIN_CLIENT_ID
vercel env add LINKEDIN_CLIENT_SECRET
vercel env add LINKEDIN_ACCESS_TOKEN
vercel env add FACEBOOK_APP_ID
vercel env add FACEBOOK_APP_SECRET
vercel env add FACEBOOK_ACCESS_TOKEN

# Option 2: Dashboard
# Go to: https://vercel.com/your-project/settings/environment-variables
# Add each variable manually
```

### Update OAuth Callback URLs:

1. **GitHub:** Change to `https://elevateforhumanity.org/api/auth/callback/github`
2. **LinkedIn:** Change to `https://elevateforhumanity.org/api/auth/callback/linkedin`
3. **Facebook:** Change to `https://elevateforhumanity.org/api/auth/callback/facebook`

---

## Troubleshooting

### GitHub OAuth Issues:

- **"Invalid credentials"**: Check Client ID and Secret match
- **"Callback mismatch"**: Verify callback URL is exact
- **"Token expired"**: Generate new Personal Access Token

### LinkedIn Issues:

- **"Access denied"**: Request "Share on LinkedIn" product access
- **"Invalid token"**: Generate new access token
- **"Organization not found"**: Verify organization ID

### Facebook Issues:

- **"App not approved"**: Submit app for review if needed
- **"Invalid token"**: Generate new page access token
- **"Page not found"**: Verify page ID is correct

---

## Quick Reference

### Where to Get Credentials:

- **GitHub:** https://github.com/settings/developers
- **LinkedIn:** https://www.linkedin.com/developers/apps
- **Facebook:** https://developers.facebook.com/apps

### Where to Test:

- **Code Editor:** http://localhost:3000/admin/editor
- **Social Media:** http://localhost:3000/api/social-media/post

### Documentation:

- **GitHub:** https://docs.github.com/en/developers/apps/building-oauth-apps
- **LinkedIn:** https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication
- **Facebook:** https://developers.facebook.com/docs/facebook-login

---

## Need Help?

1. Check error logs: `tail -f .next/server/app/api/*/route.log`
2. Verify environment variables: `env | grep GITHUB`
3. Test API endpoints individually
4. Check OAuth app settings match exactly

---

**Last Updated:** December 29, 2024  
**Status:** Ready for configuration
