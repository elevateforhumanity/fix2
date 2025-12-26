# Social Media Automation & Monetization Setup

**Status:** Configuration Required  
**Date:** December 26, 2025  
**Purpose:** Full social media automation for monetization, followers, and engagement

---

## Core Requirement

> You are monetized and need followers and likes on social media.  
> Automation must post 3 times daily to LinkedIn, Facebook, and YouTube.  
> Blog content must feed social media automatically.

---

## Social Media Platforms - Monetization Ready

### YouTube
**Status:** ⚠️ Needs Configuration  
**Monetization Requirements:**
- 1,000 subscribers (minimum)
- 4,000 watch hours in past 12 months
- AdSense account linked
- Community Guidelines compliance

**Current Setup:**
- Admin panel: `/admin/social-media`
- YouTube integration exists
- Needs API credentials

**Action Required:**
1. Add YouTube API credentials to Supabase
2. Enable YouTube Data API v3
3. Configure OAuth 2.0
4. Set up video upload automation
5. Link to blog posts (video summaries)

### LinkedIn
**Status:** ⚠️ Needs Configuration  
**Monetization Opportunities:**
- LinkedIn Creator mode
- Sponsored content
- Lead generation
- Professional network growth

**Current Setup:**
- Admin panel: `/admin/social-media`
- LinkedIn integration exists
- Needs API credentials

**Action Required:**
1. Add LinkedIn API credentials to Supabase
2. Enable LinkedIn Marketing API
3. Configure OAuth 2.0
4. Set up post automation
5. Link to blog articles

### Facebook
**Status:** ⚠️ Needs Configuration  
**Monetization Requirements:**
- 10,000 followers (for in-stream ads)
- Facebook Page (not personal profile)
- Content monetization policies compliance
- Ad breaks eligibility

**Current Setup:**
- Admin panel: `/admin/social-media`
- Facebook integration exists
- Needs API credentials

**Action Required:**
1. Add Facebook Graph API credentials to Supabase
2. Create Facebook App
3. Configure OAuth 2.0
4. Set up page posting automation
5. Link to blog content

---

## Blog Integration

### Current Blog Setup
```
✅ Blog exists: /blog
✅ Blog admin: /admin/blog
✅ Blog categories: /blog/category/[category]
✅ Blog authors: /blog/author/[author]
✅ Blog search: /blog/search
✅ Individual posts: /blog/[slug]
```

### Durable Blog DNS Linking
**Status:** ⚠️ Needs Configuration

**What is Durable Blog:**
- Durable.co blog hosting
- Custom domain support
- SEO optimized
- Fast CDN delivery

**DNS Configuration Required:**
```
blog.elevateforhumanity.org → Durable blog
```

**Steps:**
1. Set up Durable blog account
2. Add custom domain in Durable
3. Update DNS records:
   - CNAME: blog → durable.co target
   - Or A record to Durable IP
4. Verify SSL certificate
5. Test blog.elevateforhumanity.org

**Alternative: Keep Internal Blog**
- Current blog at /blog works
- No external dependency
- Full control
- Already integrated

**Recommendation:** Keep internal blog, use Durable as backup/mirror

---

## 3x Daily Posting Automation

### Posting Schedule
```
Morning Post:   9:00 AM EST
Afternoon Post: 1:00 PM EST
Evening Post:   6:00 PM EST
```

### Content Sources (Priority Order)
1. **New Blog Posts** - Auto-post when published
2. **Program Updates** - New programs or changes
3. **Success Stories** - Student achievements
4. **Tips & Advice** - Career/training tips
5. **Announcements** - Events, deadlines, news

### Automation Flow
```
Blog Post Published
    ↓
Supabase Trigger
    ↓
Generate Social Media Content
    ↓
Schedule Posts (3x daily)
    ↓
Post to LinkedIn, Facebook, YouTube
    ↓
Track Engagement
    ↓
Report Analytics
```

---

## Supabase Configuration

### Required Tables

#### social_media_accounts
```sql
CREATE TABLE social_media_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- 'linkedin', 'facebook', 'youtube'
  account_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### social_media_posts
```sql
CREATE TABLE social_media_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  post_type TEXT, -- 'text', 'image', 'video', 'link'
  content TEXT NOT NULL,
  media_url TEXT,
  blog_post_id UUID REFERENCES blog_posts(id),
  scheduled_for TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'posted', 'failed'
  engagement JSONB, -- likes, shares, comments
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### social_media_analytics
```sql
CREATE TABLE social_media_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  date DATE NOT NULL,
  followers_count INTEGER,
  posts_count INTEGER,
  likes_count INTEGER,
  shares_count INTEGER,
  comments_count INTEGER,
  reach INTEGER,
  impressions INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Required Functions

#### Auto-Post on Blog Publish
```sql
CREATE OR REPLACE FUNCTION auto_post_blog_to_social()
RETURNS TRIGGER AS $$
BEGIN
  -- When blog post is published, create social media posts
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    INSERT INTO social_media_posts (platform, post_type, content, blog_post_id, scheduled_for)
    VALUES 
      ('linkedin', 'link', NEW.excerpt, NEW.id, NOW() + INTERVAL '1 hour'),
      ('facebook', 'link', NEW.excerpt, NEW.id, NOW() + INTERVAL '2 hours'),
      ('youtube', 'video', NEW.excerpt, NEW.id, NOW() + INTERVAL '3 hours');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_publish_trigger
AFTER UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION auto_post_blog_to_social();
```

#### Schedule 3x Daily Posts
```sql
CREATE OR REPLACE FUNCTION schedule_daily_posts()
RETURNS void AS $$
BEGIN
  -- Morning post (9 AM)
  INSERT INTO social_media_posts (platform, post_type, content, scheduled_for)
  SELECT 
    platform,
    'text',
    'Morning motivation content',
    (CURRENT_DATE + INTERVAL '9 hours')
  FROM social_media_accounts
  WHERE is_active = true;
  
  -- Afternoon post (1 PM)
  INSERT INTO social_media_posts (platform, post_type, content, scheduled_for)
  SELECT 
    platform,
    'text',
    'Afternoon tips content',
    (CURRENT_DATE + INTERVAL '13 hours')
  FROM social_media_accounts
  WHERE is_active = true;
  
  -- Evening post (6 PM)
  INSERT INTO social_media_posts (platform, post_type, content, scheduled_for)
  SELECT 
    platform,
    'text',
    'Evening success story',
    (CURRENT_DATE + INTERVAL '18 hours')
  FROM social_media_accounts
  WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;
```

---

## API Endpoints

### Social Media Management
```
✅ /admin/social-media - Main dashboard
✅ /admin/social-media/campaigns/new - Create campaign
⚠️ /api/social-media/post - Needs implementation
⚠️ /api/social-media/schedule - Needs implementation
⚠️ /api/social-media/analytics - Needs implementation
```

### Required API Routes

#### POST /api/social-media/post
```typescript
// Post to social media platforms
export async function POST(request: Request) {
  const { platform, content, mediaUrl, scheduledFor } = await request.json();
  
  // Validate credentials
  // Post to platform API
  // Store in database
  // Return success/failure
}
```

#### POST /api/social-media/schedule
```typescript
// Schedule posts for 3x daily
export async function POST(request: Request) {
  const { date, posts } = await request.json();
  
  // Schedule morning, afternoon, evening posts
  // Store in database
  // Return schedule
}
```

#### GET /api/social-media/analytics
```typescript
// Get engagement analytics
export async function GET(request: Request) {
  const { platform, startDate, endDate } = await request.json();
  
  // Fetch from platform APIs
  // Aggregate data
  // Return analytics
}
```

---

## Monetization Strategy

### YouTube Monetization
**Requirements:**
- ✅ 1,000+ subscribers
- ✅ 4,000 watch hours
- ⚠️ AdSense account
- ⚠️ Original content

**Content Strategy:**
- Program overviews (5-10 min)
- Student success stories (3-5 min)
- Career tips (2-3 min)
- Training tutorials (10-15 min)
- Live Q&A sessions (30-60 min)

**Posting Frequency:** 3x per week minimum

### LinkedIn Monetization
**Opportunities:**
- Creator mode (newsletter, live events)
- Sponsored content
- Lead generation
- Professional services

**Content Strategy:**
- Career advice posts
- Industry insights
- Program announcements
- Success stories
- Thought leadership

**Posting Frequency:** 3x daily (automated)

### Facebook Monetization
**Requirements:**
- ✅ 10,000+ followers
- ⚠️ In-stream ads eligibility
- ⚠️ Content monetization policies

**Content Strategy:**
- Community engagement
- Live videos
- Success stories
- Event promotion
- Program updates

**Posting Frequency:** 3x daily (automated)

---

## Engagement Growth Strategy

### Followers Growth
**Tactics:**
1. **Consistent posting** - 3x daily automation
2. **Quality content** - Blog-driven, valuable
3. **Engagement** - Respond to comments
4. **Cross-promotion** - Link platforms
5. **Hashtags** - Relevant, trending
6. **Collaborations** - Partner content
7. **Paid promotion** - Boost top posts

### Likes & Engagement
**Tactics:**
1. **Call-to-action** - Ask for likes/shares
2. **Visual content** - Images, videos
3. **Timing** - Post at peak hours
4. **Trending topics** - Relevant hashtags
5. **User-generated content** - Share student posts
6. **Contests** - Engagement campaigns
7. **Stories** - Behind-the-scenes

---

## Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Create social media accounts (if not exist)
- [ ] Apply for API access (LinkedIn, Facebook, YouTube)
- [ ] Set up OAuth 2.0 for each platform
- [ ] Add credentials to Supabase
- [ ] Create database tables
- [ ] Set up triggers and functions

### Phase 2: Integration (Week 2)
- [ ] Build API endpoints for posting
- [ ] Implement scheduling system
- [ ] Connect blog to social media
- [ ] Test automation flow
- [ ] Set up 3x daily posting
- [ ] Configure DNS for durable blog

### Phase 3: Content (Week 3)
- [ ] Create content calendar
- [ ] Write initial posts (30 days)
- [ ] Create video content for YouTube
- [ ] Design social media graphics
- [ ] Set up hashtag strategy
- [ ] Plan engagement campaigns

### Phase 4: Monetization (Week 4)
- [ ] Apply for YouTube Partner Program
- [ ] Enable LinkedIn Creator mode
- [ ] Apply for Facebook monetization
- [ ] Set up AdSense
- [ ] Configure payment methods
- [ ] Track revenue

### Phase 5: Growth (Ongoing)
- [ ] Monitor analytics daily
- [ ] Adjust posting times
- [ ] A/B test content
- [ ] Engage with followers
- [ ] Run paid campaigns
- [ ] Collaborate with partners

---

## Current Status

### ✅ Exists
- Social media admin panel
- Blog system
- Contact pages
- Refund policy pages
- About pages

### ⚠️ Needs Configuration
- Social media API credentials
- Supabase automation tables
- 3x daily posting automation
- Blog-to-social integration
- Durable blog DNS
- Analytics tracking

### ❌ Missing
- YouTube API integration
- LinkedIn API integration
- Facebook API integration
- Automated posting system
- Engagement tracking
- Monetization setup

---

## Immediate Actions Required

### Today
1. **Verify social media accounts exist**
   - LinkedIn: elevateforhumanity
   - Facebook: elevateforhumanity
   - YouTube: elevateforhumanity

2. **Apply for API access**
   - LinkedIn Marketing API
   - Facebook Graph API
   - YouTube Data API v3

3. **Set up Supabase tables**
   - Run SQL migrations
   - Create triggers
   - Test functions

### This Week
4. **Build automation**
   - Create API endpoints
   - Implement scheduling
   - Connect blog feed

5. **Create content**
   - Write 30 days of posts
   - Create video content
   - Design graphics

6. **Test system**
   - Manual post test
   - Automated post test
   - Analytics test

---

## Success Metrics

### Month 1 Goals
- 1,000 LinkedIn followers
- 5,000 Facebook followers
- 500 YouTube subscribers
- 100 likes per post average
- 10% engagement rate

### Month 3 Goals
- 5,000 LinkedIn followers
- 10,000 Facebook followers (monetization threshold)
- 1,000 YouTube subscribers (monetization threshold)
- 500 likes per post average
- 15% engagement rate

### Month 6 Goals
- 10,000+ LinkedIn followers
- 15,000+ Facebook followers
- 2,000+ YouTube subscribers
- 1,000+ likes per post average
- 20% engagement rate
- Monetization active on all platforms

---

**Status:** Ready for Implementation  
**Priority:** HIGH (Monetization Dependent)  
**Timeline:** 4 weeks to full automation  
**Owner:** Marketing/Engineering Team
