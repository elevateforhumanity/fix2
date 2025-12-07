# Social Media Automation Setup Guide

## Overview

Your social media automation system posts to Facebook, Twitter, LinkedIn, and Instagram **3 times daily** at 9 AM, 1 PM, and 5 PM EST. Content is generated from your blog or AI, and campaigns run automatically for 30+ days.

## Features

✅ **3x Daily Posting** - Automatic posts at 9 AM, 1 PM, 5 PM EST
✅ **AI Content Generation** - GPT-4o-mini creates engaging posts
✅ **Blog Integration** - Pull content from your blog system
✅ **Multi-Platform** - Facebook, Twitter, LinkedIn, Instagram
✅ **Program-Specific** - Target specific training programs
✅ **Engagement Tracking** - Likes, shares, comments
✅ **Campaign Management** - Pause, resume, edit anytime

## Quick Start

### 1. Create Your First Campaign

1. Go to **Admin > Social Media**
2. Click **"Create Campaign"**
3. Fill in details:
   - **Name**: "Barber Program Promotion"
   - **Content Source**: AI Generated
   - **Platforms**: Select Facebook, Twitter, LinkedIn, Instagram
   - **Program**: Barber Program
   - **Duration**: 30 days
4. Click **"Generate Posts"** (creates 90 posts for 30 days)
5. Review generated posts
6. Click **"Activate Campaign"**

**Done!** Your campaign will now post 3x daily automatically.

## Content Sources

### Option 1: AI Generated (Recommended)

**Pros:**
- Instant content creation
- Program-specific messaging
- Optimized for each platform
- Includes hashtags and CTAs
- WIOA/Indianapolis focus

**How it works:**
1. Select "AI Generated"
2. Choose program (or "All Programs")
3. Click "Generate Posts"
4. AI creates 90 posts for 30 days (3 per day)

**Example AI-generated posts:**
```
Morning (9 AM): "🔥 Start your barber career in just 12-18 months! Earn $15-18/hour while learning. 100% free with WIOA funding. Apply now! #WorkforceDevelopment #Indianapolis"

Afternoon (1 PM): "Success Story: Marcus completed our Barber Program and now owns his own shop in Broad Ripple. Your turn! Call (317) 314-3757 #CareerTraining #Indianapolis"

Evening (5 PM): "⏰ Last chance to apply for January cohort! DOL Registered Apprenticeship. State-licensed. Job placement assistance. Apply today! #WIOA #Indianapolis"
```

### Option 2: Blog Integration

**Pros:**
- Leverages existing content
- Consistent with your blog
- SEO benefits

**How it works:**
1. Select "Blog Posts"
2. System pulls from your blog
3. Formats for social media
4. Adds hashtags and links

**Setup required:**
- Configure blog RSS feed or API
- Set content extraction rules

### Option 3: Manual

**Pros:**
- Full control
- Custom messaging
- Brand voice consistency

**How it works:**
1. Select "Manual"
2. Write each post yourself
3. Schedule as needed

## Posting Schedule

### 3x Daily (Default)

**Morning Post (9:00 AM EST)**
- Focus: Program highlights, new opportunities
- Tone: Inspirational, motivational
- Example: "Start your career transformation today!"

**Afternoon Post (1:00 PM EST)**
- Focus: Success stories, student testimonials
- Tone: Authentic, relatable
- Example: "Meet Sarah, who went from unemployed to $50K/year..."

**Evening Post (5:00 PM EST)**
- Focus: Application CTAs, urgency
- Tone: Action-oriented, direct
- Example: "Apply now! Limited spots available."

### Custom Schedules

You can also choose:
- **Daily**: Once per day
- **Weekly**: Once per week

## Platform Setup

### Facebook

1. Create Facebook Page (if not exists)
2. Go to [Facebook Developers](https://developers.facebook.com)
3. Create App
4. Add "Pages" product
5. Generate Page Access Token
6. Add to environment variables:
   ```
   FACEBOOK_PAGE_ID=your_page_id
   FACEBOOK_ACCESS_TOKEN=your_access_token
   ```

**Permissions needed:**
- `pages_manage_posts`
- `pages_read_engagement`

### Twitter

1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create App
3. Enable OAuth 2.0
4. Generate API keys
5. Add to environment variables:
   ```
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   ```

**Permissions needed:**
- Read and write tweets

### LinkedIn

1. Create LinkedIn Company Page (if not exists)
2. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
3. Create App
4. Add "Share on LinkedIn" product
5. Generate Access Token
6. Add to environment variables:
   ```
   LINKEDIN_COMPANY_ID=your_company_id
   LINKEDIN_ACCESS_TOKEN=your_access_token
   ```

**Permissions needed:**
- `w_member_social`
- `r_organization_social`

### Instagram

1. Convert to Instagram Business Account
2. Connect to Facebook Page
3. Use Facebook Graph API
4. Add to environment variables:
   ```
   INSTAGRAM_ACCOUNT_ID=your_account_id
   INSTAGRAM_ACCESS_TOKEN=your_access_token
   ```

**Permissions needed:**
- `instagram_basic`
- `instagram_content_publish`

## Cron Job Setup

### Vercel (Automatic)

Already configured in `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/social-media/scheduler",
      "schedule": "0 9,13,17 * * *"
    }
  ]
}
```

Posts automatically at 9 AM, 1 PM, 5 PM EST.

### Manual Testing

Test the scheduler:
```bash
curl https://yoursite.com/api/social-media/scheduler
```

## Campaign Management

### View Campaigns

Go to **Admin > Social Media** to see:
- Active campaigns
- Posts scheduled
- Next post time
- Platform status
- Engagement metrics

### Pause Campaign

1. Find campaign in list
2. Click pause button (⏸)
3. Campaign stops posting
4. Resume anytime

### Edit Campaign

1. Click edit button (✏️)
2. Modify posts, platforms, schedule
3. Save changes
4. Campaign continues with updates

### Delete Campaign

1. Click delete button (🗑️)
2. Confirm deletion
3. All scheduled posts removed

## Analytics

### View Performance

Go to **Admin > Social Media > Analytics** to see:
- Total posts
- Engagement rate
- Platform performance
- Best performing posts
- Optimal posting times

### Metrics Tracked

- **Likes**: Post likes/reactions
- **Shares**: Post shares/retweets
- **Comments**: Post comments/replies
- **Reach**: Total people reached
- **Clicks**: Link clicks

## Best Practices

### Content Strategy

1. **Mix Content Types**
   - 40% Educational (program info, WIOA eligibility)
   - 30% Success Stories (student testimonials)
   - 20% Promotional (apply now, limited spots)
   - 10% Community (events, partnerships)

2. **Optimize Timing**
   - Morning: Inspirational, new opportunities
   - Afternoon: Success stories, testimonials
   - Evening: CTAs, urgency

3. **Use Hashtags**
   - #WorkforceDevelopment
   - #Indianapolis
   - #WIOA
   - #CareerTraining
   - Program-specific (#BarberProgram, #CNATraining)

4. **Include CTAs**
   - "Apply now"
   - "Call (317) 314-3757"
   - "Learn more"
   - "Limited spots available"

### Platform-Specific Tips

**Facebook:**
- Longer posts (up to 500 characters)
- Use images/videos
- Ask questions to drive engagement
- Share success stories

**Twitter:**
- Keep under 280 characters
- Use 2-3 hashtags
- Tag relevant accounts
- Post frequently

**LinkedIn:**
- Professional tone
- Focus on career outcomes
- Share industry insights
- Tag employers/partners

**Instagram:**
- Visual-first content
- Use Stories
- Multiple hashtags (up to 30)
- Behind-the-scenes content

## Troubleshooting

### Posts Not Going Out

1. **Check campaign status**: Must be "Active"
2. **Verify cron job**: Test `/api/social-media/scheduler`
3. **Check API keys**: Ensure all tokens are valid
4. **Review error logs**: Check `social_media_posts` table

### Low Engagement

1. **Vary content**: Mix educational, promotional, testimonial
2. **Optimize timing**: Test different posting times
3. **Use visuals**: Add images/videos
4. **Engage back**: Respond to comments
5. **A/B test**: Try different messaging

### API Rate Limits

**Facebook:** 200 calls/hour
**Twitter:** 300 tweets/3 hours
**LinkedIn:** 100 posts/day
**Instagram:** 25 posts/day

**Solution:** Spread posts across platforms, use scheduling

## Cost Analysis

### Free Tier (Current Setup)

- **Vercel Cron**: Free on Pro plan ($20/month)
- **OpenAI API**: ~$0.50/month (90 posts)
- **Social Media APIs**: Free
- **Total**: $20.50/month

### Paid Tools (Alternative)

- **Hootsuite**: $99/month
- **Buffer**: $65/month
- **Sprout Social**: $249/month

**Your Savings**: $44.50 - $228.50/month

## Support

For issues or questions:
- **Email**: elevateforhumanity.edu@gmail.com
- **Phone**: (317) 314-3757
- **Documentation**: /docs/social-media

## Next Steps

1. ✅ Set up social media accounts
2. ✅ Generate API keys
3. ✅ Add to environment variables
4. ✅ Create first campaign
5. ✅ Activate and monitor
6. ✅ Review analytics weekly
7. ✅ Optimize based on performance

**Your social media is now on autopilot! 🚀**
