# Social Media Configuration - Elevate for Humanity

## Official Social Media Accounts

### ✅ Active Platforms (Keep & Promote):

**Facebook:**
- URL: https://www.facebook.com/profile.php?id=61571046346179
- Handle: @elevateforhumanity
- Status: ACTIVE

**Instagram:**
- URL: https://instagram.com/elevateforhumanity
- Handle: @elevateforhumanity
- Status: ACTIVE

**LinkedIn:**
- URL: https://www.linkedin.com/in/elevate-for-humanity-b5a2b3339/
- Handle: Elevate for Humanity
- Status: ACTIVE

**YouTube:**
- URL: https://www.youtube.com/@elevateforhumanity
- Handle: @elevateforhumanity
- Status: ACTIVE

### ❌ Remove Completely:

**Twitter/X:**
- URL: https://x.com/Elevate4Humani1
- Handle: @Elevate4Humani1
- Status: **REMOVE FROM ALL CODE**

## Configuration File Location

Primary config: `/workspaces/fix2/lib/social/social-integration.ts`

**Action Required:**
1. Remove Twitter/X from `SOCIAL_ACCOUNTS` object
2. Remove `getTwitterShareUrl()` function
3. Remove Twitter from all share button components
4. Remove Twitter metadata tags from SEO
5. Remove Twitter icons from footer/header

## Content Distribution Strategy

### 3x Daily Posting Schedule:
- **Morning (8-9 AM):** Motivational/Educational
- **Midday (12-1 PM):** Program Spotlight/Success Story
- **Evening (6-7 PM):** Call-to-Action/Enrollment

### Platform-Specific Content:

**Facebook:**
- Post length: 40-80 words
- Image: 1200x630px
- Video: 1-3 minutes
- Tone: Conversational, community-focused

**Instagram:**
- Post length: 125-150 characters
- Image: 1080x1080px (square) or 1080x1350px (portrait)
- Video: 30-60 seconds (Reels)
- Tone: Visual storytelling, inspirational

**LinkedIn:**
- Post length: 150-300 words
- Image: 1200x627px
- Video: 30-90 seconds
- Tone: Professional, data-driven, impact-focused

**YouTube:**
- Video: 15-30 seconds (Shorts) or 3-10 minutes (full videos)
- Tone: Educational, testimonial-driven

## Hashtag Strategy

**Primary:**
- #ElevateForHumanity
- #WorkforceDevelopment
- #CareerTraining

**Programs:**
- #Apprenticeships
- #WIOA
- #JRI
- #CareerPathways
- #SkillsTraining

**Tax Services:**
- #FreeTaxPrep
- #VITA
- #TaxHelp
- #IRSCertified

**Impact:**
- #SecondChances
- #EconomicMobility
- #CommunityImpact
- #WorkforceEquity

## Content Themes (30-Day Rotation)

1. Program Spotlight
2. Student Success Story
3. Funding Friday (WIOA, WRG, JRI)
4. Weekend Motivation
5. Partner Highlight
6. How It Works (Enrollment Process)
7. Tax Tip Tuesday
8. Career Pathways
9. Community Impact
10. FAQ Friday

## Compliance-Safe Captions

**Programs:**
- "Explore training programs designed to help you build a career."
- "Apprenticeships let you earn while you learn. See what is available."
- "WIOA-funded programs may be available at no cost to eligible participants."

**Tax Services:**
- "Free tax preparation through IRS-certified VITA volunteers."
- "Get your taxes done right. Free VITA services available."
- "Professional tax preparation at no cost for eligible filers."

**General:**
- "Connecting people to training, funding, and career opportunities."
- "Your next career step starts here."
- "We coordinate access to workforce programs and support services."

## Tracking & Analytics

**Events to Track:**
- `social_share` - User clicks share button
- `social_follow` - User clicks follow link
- `social_cta_click` - User clicks CTA from social post

**UTM Parameters:**
```
utm_source={platform}
utm_medium=social
utm_campaign={campaign_name}
utm_content={post_id}
```

## API Integration Status

**Current State:**
- ✅ Share buttons implemented (Facebook, LinkedIn, Email, WhatsApp)
- ✅ Social links in footer/header
- ⚠️ Auto-posting API: Needs API keys/tokens
- ⚠️ Scheduler integration: Not yet configured

**Required for Auto-Posting:**
1. Facebook Page Access Token
2. LinkedIn Organization Access Token
3. YouTube Data API Key
4. Buffer/Later/Hootsuite API integration (alternative)

## Next Steps

1. **Remove Twitter/X** (PHASE 6)
2. **Add YouTube to social config** (missing from current config)
3. **Implement posting queue** (PHASE 4)
4. **Add blog share buttons** (PHASE 3)
5. **Set up tracking** (PHASE 3)
6. **Configure scheduler** (PHASE 4)
