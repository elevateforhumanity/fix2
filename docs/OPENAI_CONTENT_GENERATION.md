# OpenAI Content Generation System

Automated social media content generation using OpenAI GPT-4 for Elevate for Humanity's 90-day marketing pipeline.

## Overview

This system automatically generates social media posts for TikTok, Facebook, Instagram, and LinkedIn based on the 90-day content calendar strategy.

**Goal:** 270 posts over 90 days (3 posts/day across 4 platforms)

**ROI:** 1,016% (45x return on marketing spend)

**Expected Outcomes:**

- 180 enrollments
- $900K revenue
- $450K net profit

## Features

- ✅ AI-generated content using GPT-4
- ✅ Platform-specific optimization (character limits, hashtags, style)
- ✅ Weekly content themes (Motivation Monday, Tip Tuesday, etc.)
- ✅ Program-specific content (Tax, Barber, Building Tech, Healthcare)
- ✅ Automated scheduling
- ✅ Content calendar management
- ✅ Engagement tracking

## Setup

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)

### 2. Configure Environment Variables

Add to Netlify Dashboard → Site settings → Environment variables:

```bash
# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Supabase (already configured)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Frontend URL (already configured)
FRONTEND_URL=https://www.elevateforhumanity.org
```

### 3. Run Database Migration

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase Dashboard
# Run: supabase/migrations/20250127_create_generated_content.sql
```

### 4. Test Content Generation

```bash
# Generate single post
curl -X POST https://www.elevateforhumanity.org/.netlify/functions/generate-social-content \
  -H "Content-Type: application/json" \
  -d '{
    "content_type": "success-story",
    "platform": "facebook",
    "program": "Tax Business Start-Up"
  }'

# Generate 7-day calendar
curl -X POST https://www.elevateforhumanity.org/.netlify/functions/generate-content-calendar \
  -H "Content-Type: application/json" \
  -d '{
    "days": 7,
    "programs": ["Tax Business", "Barber", "Building Tech", "Healthcare"]
  }'
```

## Usage

### Generate Single Post

**Endpoint:** `POST /.netlify/functions/generate-social-content`

**Request:**

```json
{
  "content_type": "success-story",
  "platform": "tiktok",
  "program": "Barber Apprenticeship",
  "theme": "From unemployed to business owner"
}
```

**Content Types:**

- `success-story` - Student transformation stories
- `program-highlight` - Program features and benefits
- `funding-info` - FREE training through WIOA/WRG
- `community-impact` - Statistics and impact metrics
- `call-to-action` - Apply now, limited spots
- `testimonial` - Student quotes
- `tip-tuesday` - Career advice and tips
- `motivation-monday` - Inspirational messages

**Platforms:**

- `tiktok` - 150 chars, 5 hashtags, short & punchy
- `facebook` - 300 chars, 3 hashtags, conversational
- `instagram` - 200 chars, 10 hashtags, visual & inspirational
- `linkedin` - 400 chars, 3 hashtags, professional & data-driven

**Response:**

```json
{
  "success": true,
  "content_id": "uuid",
  "content": "🎓 From unemployed to business owner! Meet Sarah, who completed our FREE Tax Business program through WIOA. Now she's earning $60K/year and hired 2 employees! 💪 #TaxBusiness #CareerChange #FreeTraining #Indianapolis #WIOA",
  "platform": "tiktok",
  "content_type": "success-story"
}
```

### Generate Content Calendar

**Endpoint:** `POST /.netlify/functions/generate-content-calendar`

**Request:**

```json
{
  "days": 7,
  "programs": ["Tax Business", "Barber", "Building Tech", "Healthcare"]
}
```

**Response:**

```json
{
  "success": true,
  "posts_generated": 28,
  "days": 7,
  "posts": [
    {
      "id": "uuid",
      "day": 1,
      "dayOfWeek": "monday",
      "platform": "tiktok",
      "program": "Tax Business",
      "theme": "Motivation Monday",
      "content": "..."
    },
    ...
  ]
}
```

## Weekly Content Schedule

Based on the 90-Day Content Pipeline:

| Day           | Theme             | Content Type      | Focus                         |
| ------------- | ----------------- | ----------------- | ----------------------------- |
| **Monday**    | Motivation Monday | motivation-monday | Inspire action, career goals  |
| **Tuesday**   | Tip Tuesday       | tip-tuesday       | Career advice, practical tips |
| **Wednesday** | Success Story     | success-story     | Student transformations       |
| **Thursday**  | Program Highlight | program-highlight | Program features, benefits    |
| **Friday**    | Call to Action    | call-to-action    | Apply now, limited spots      |

## Automation

### Daily Content Generation

GitHub Actions workflow runs daily at 6 AM EST:

```yaml
# .github/workflows/daily-content-generation.yml
on:
  schedule:
    - cron: '0 11 * * *' # 6 AM EST (11 AM UTC)
```

Generates 7 days of content in advance (28 posts total).

### Manual Trigger

Trigger manually from GitHub Actions tab:

1. Go to **Actions** → **Daily Content Generation**
2. Click **Run workflow**
3. Enter number of days (default: 7)
4. Click **Run workflow**

## Content Management

### View Generated Content

```sql
-- View all scheduled posts
SELECT
  id,
  platform,
  program,
  theme,
  content,
  scheduled_date,
  status
FROM generated_content
WHERE status = 'scheduled'
ORDER BY scheduled_date ASC;

-- View posts by platform
SELECT
  platform,
  COUNT(*) as post_count,
  MIN(scheduled_date) as first_post,
  MAX(scheduled_date) as last_post
FROM generated_content
WHERE status = 'scheduled'
GROUP BY platform;
```

### Edit Content

Content is saved as `draft` or `scheduled` status. You can edit before publishing:

```sql
-- Update content
UPDATE generated_content
SET
  content = 'Updated content here...',
  status = 'approved'
WHERE id = 'uuid';
```

### Approve Content

```sql
-- Approve for publishing
UPDATE generated_content
SET
  status = 'approved',
  approved_by = 'user-uuid'
WHERE id = 'uuid';
```

### Publish Content

```sql
-- Mark as published
UPDATE generated_content
SET
  status = 'published',
  published_date = NOW()
WHERE id = 'uuid';
```

## Platform Integration

### TikTok

**Specs:**

- Max length: 150 characters
- Hashtags: 5
- Style: Short, punchy, trending
- Best times: 6-10 AM, 7-11 PM EST

**Example:**

```
🔥 FREE Barber training = $45K/year job!
No cost. Government-funded. 92% placement rate.
Apply now! 💈✂️
#BarberLife #FreeTraining #CareerChange #Indianapolis #WIOA
```

### Facebook

**Specs:**

- Max length: 300 characters
- Hashtags: 3
- Style: Conversational, community-focused
- Best times: 1-4 PM EST

**Example:**

```
Meet Marcus! He went from minimum wage to owning his own barber shop after completing our FREE apprenticeship program.

"This program changed my life. I'm now earning $45K/year and giving back to my community."

Ready to start YOUR transformation? Training is 100% FREE through WIOA. Apply today!

#FreeTraining #BarberSuccess #Indianapolis
```

### Instagram

**Specs:**

- Max length: 200 characters
- Hashtags: 10
- Style: Visual, inspirational
- Best times: 11 AM-1 PM, 7-9 PM EST

**Example:**

```
✨ From unemployed to business owner ✨

Sarah completed our FREE Tax Business program and now earns $60K/year!

Your turn. Apply today. 👇

#TaxBusiness #CareerChange #FreeTraining #WomenInBusiness #Indianapolis #WIOA #Success #Transformation #Education #Opportunity
```

### LinkedIn

**Specs:**

- Max length: 400 characters
- Hashtags: 3
- Style: Professional, data-driven
- Best times: 7-9 AM, 5-6 PM EST

**Example:**

```
Workforce Development Success Story

Our Tax Business Start-Up program has achieved:
• 92% job placement rate
• $45K average starting salary
• 85% completion rate
• 100% FREE through WIOA funding

Recent graduate Sarah M. now owns her own tax preparation business, earning $60K annually and employing 2 staff members.

Interested in workforce development partnerships? Let's connect.

#WorkforceDevelopment #WIOA #EconomicMobility
```

## Cost Management

### OpenAI Pricing

**GPT-4:**

- Input: $0.03 per 1K tokens (~750 words)
- Output: $0.06 per 1K tokens (~750 words)

**Estimated Costs:**

- Single post: ~$0.01-0.02
- 7-day calendar (28 posts): ~$0.28-0.56
- 90-day calendar (270 posts): ~$2.70-5.40

**Monthly Budget:** ~$10-20 for daily generation

### Rate Limiting

Built-in rate limiting:

- 1 second delay between API calls
- Prevents hitting OpenAI rate limits
- Ensures stable generation

## Monitoring

### Track Generation

```sql
-- Daily generation stats
SELECT
  DATE(generated_at) as date,
  COUNT(*) as posts_generated,
  COUNT(DISTINCT platform) as platforms,
  COUNT(DISTINCT program) as programs
FROM generated_content
WHERE generated_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(generated_at)
ORDER BY date DESC;
```

### Track Engagement

```sql
-- Engagement metrics by platform
SELECT
  platform,
  AVG(likes) as avg_likes,
  AVG(comments) as avg_comments,
  AVG(shares) as avg_shares,
  AVG(views) as avg_views
FROM generated_content
WHERE status = 'published'
GROUP BY platform;
```

## Best Practices

### Content Quality

1. **Review before publishing** - AI-generated content should be reviewed
2. **Add personal touch** - Edit to match brand voice
3. **Include visuals** - Add images/videos for better engagement
4. **Test different styles** - A/B test content types
5. **Monitor engagement** - Track what works best

### Scheduling

1. **Post at optimal times** - Use platform-specific best times
2. **Maintain consistency** - Post daily on all platforms
3. **Balance content types** - Mix success stories, tips, CTAs
4. **Rotate programs** - Feature all 4 programs equally
5. **Plan ahead** - Generate 7-14 days in advance

### Compliance

1. **Verify facts** - Ensure statistics are accurate
2. **Student consent** - Get permission for success stories
3. **Disclosure** - Mention FREE training, government-funded
4. **Accessibility** - Add alt text for images
5. **Brand guidelines** - Follow EFH brand standards

## Troubleshooting

### OpenAI API Errors

**Error:** "Rate limit exceeded"

- **Solution:** Increase delay between API calls (currently 1 second)
- **Solution:** Upgrade OpenAI plan for higher limits

**Error:** "Invalid API key"

- **Solution:** Verify `OPENAI_API_KEY` in Netlify env vars
- **Solution:** Generate new API key from OpenAI dashboard

**Error:** "Model not found"

- **Solution:** Ensure you have access to GPT-4
- **Solution:** Fallback to GPT-3.5-turbo if needed

### Content Quality Issues

**Problem:** Content too generic

- **Solution:** Add more specific prompts with program details
- **Solution:** Include student names, numbers, locations

**Problem:** Wrong tone/style

- **Solution:** Adjust temperature (0.7-0.9 for creativity)
- **Solution:** Refine system prompt with brand voice

**Problem:** Too long/short

- **Solution:** Adjust max_tokens parameter
- **Solution:** Add character limit to prompt

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [GPT-4 Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)
- [90-Day Content Pipeline](../marketing/content-calendar/90-Day-Content-Pipeline.md)
- [Social Media Best Times](https://sproutsocial.com/insights/best-times-to-post-on-social-media/)

## Support

For issues:

1. Check Netlify function logs
2. Review OpenAI API status
3. Query Supabase `activity_log` table
4. Contact OpenAI support (if API issues)

---

**Content generation is now automated! Generate 270 posts for your 90-day marketing pipeline with AI. 🚀**
