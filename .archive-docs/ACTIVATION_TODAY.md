# Activate Everything TODAY - 30 Minute Checklist

## 🚀 Everything is Already Built - Just Activate!

**Total Time:** 30-60 minutes
**No Coding Required:** Just configuration

---

## ✅ Step 1: Social Media (10 minutes)

### Add API Keys to .env.local:

```bash
# LinkedIn (5 min to get keys)
LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret
LINKEDIN_ACCESS_TOKEN=your_token
LINKEDIN_ORGANIZATION_ID=your_org_id

# Facebook (5 min to get keys)
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_secret
FACEBOOK_ACCESS_TOKEN=your_page_token
FACEBOOK_PAGE_ID=your_page_id

# YouTube (ALREADY DONE ✅)
YOUTUBE_API_KEY=your_key
YOUTUBE_CLIENT_ID=your_id
YOUTUBE_CLIENT_SECRET=your_secret
YOUTUBE_CHANNEL_ID=your_channel

# Enable platforms
SOCIAL_MEDIA_LINKEDIN_ENABLED=true
SOCIAL_MEDIA_FACEBOOK_ENABLED=true
SOCIAL_MEDIA_YOUTUBE_ENABLED=true
SOCIAL_MEDIA_POST_TIMES=09:00,13:00,18:00
```

### Test It:

```bash
# Start dev server
pnpm dev

# Test post (in another terminal)
curl -X POST http://localhost:3000/api/social-media/post \
  -H "Content-Type: application/json" \
  -d '{"content":"Test from Elevate!","platforms":["youtube","linkedin","facebook"]}'
```

**Result:** Posts to all 3 platforms instantly!

---

## ✅ Step 2: Google Ads Campaign (5 minutes)

### Generate Import Files:

```bash
cd /workspaces/fix2
./scripts/generate-google-ads-import.sh
```

### Import to Google Ads:

1. Download Google Ads Editor: https://ads.google.com/home/tools/ads-editor/
2. Open Google Ads Editor
3. File → Import → From file
4. Select files from `google-ads-import/` folder
5. Review campaigns ($10,000/month budget)
6. Post to Google Ads

**Result:** $10,000/month ad campaign live!

---

## ✅ Step 3: Google My Business (10 minutes)

### Update Your Listing:

1. Go to: https://business.google.com/
2. Find: "Elevate for Humanity"
3. Update:
   - ✅ Business hours
   - ✅ Phone: 317-314-3757
   - ✅ Website: elevateforhumanity.org
   - ✅ Services: Add all programs
   - ✅ Photos: Upload 5-10 from `/public/images/`
4. Enable:
   - ✅ Messaging
   - ✅ Booking (link to /apply)
   - ✅ Posts

**Result:** Professional GMB listing live!

---

## ✅ Step 4: Email System (Already Working!)

### Verify Configuration:

```bash
# Check if Resend key exists
grep RESEND_API_KEY .env.local

# If not, add it (optional - works without):
echo "RESEND_API_KEY=re_your_key" >> .env.local
```

### Test Email:

```bash
curl -X POST http://localhost:3000/api/email/send-welcome \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","name":"Test User"}'
```

**Result:** Email system working!

---

## ✅ Step 5: Verify All Systems (5 minutes)

### Check Each System:

1. **Social Media:**

   ```bash
   # Visit admin panel
   open http://localhost:3000/admin/social-media
   ```

2. **CRM:**

   ```bash
   # Visit CRM dashboard
   open http://localhost:3000/admin/crm
   ```

3. **VITA:**

   ```bash
   # Visit VITA page
   open http://localhost:3000/vita
   ```

4. **Grants:**

   ```bash
   # Visit grants page
   open http://localhost:3000/grants
   ```

5. **Community:**

   ```bash
   # Visit community hub
   open http://localhost:3000/community
   ```

6. **Code Editor:**
   ```bash
   # Visit admin editor
   open http://localhost:3000/admin/editor
   ```

**Result:** All systems accessible!

---

## 📋 Quick Reference

### API Keys You Need:

**Priority 1 (Get Today):**

- [ ] LinkedIn Client ID & Secret
- [ ] Facebook App ID & Secret
- [ ] Facebook Page Access Token

**Priority 2 (This Week):**

- [ ] Instagram Business Account ID
- [ ] Twitter API Keys
- [ ] Resend API Key (email)

**Already Have:**

- [x] YouTube API (configured)
- [x] Supabase (configured)
- [x] Stripe (configured)

### Where to Get Keys:

1. **LinkedIn:** https://www.linkedin.com/developers/apps
2. **Facebook:** https://developers.facebook.com/apps
3. **Instagram:** Use Facebook app
4. **Twitter:** https://developer.twitter.com/
5. **Resend:** https://resend.com/api-keys

---

## 🎯 Success Metrics

After activation, you'll have:

✅ **Social Media:**

- Auto-posting 3x daily
- Cross-platform distribution
- Scheduled content

✅ **Google Ads:**

- $10,000/month campaign
- 6 campaigns running
- Targeting Indianapolis

✅ **Google My Business:**

- Professional listing
- Photos and services
- Messaging enabled

✅ **Email:**

- Automated notifications
- Welcome emails
- Appointment confirmations

✅ **All Features:**

- VITA page live
- CRM operational
- Grants tracker active
- Community hub ready
- Code editor functional

---

## 🚨 If Something Doesn't Work

### Social Media Not Posting?

```bash
# Check API keys
grep LINKEDIN .env.local
grep FACEBOOK .env.local

# Check logs
tail -f .next/server/app/api/social-media/post/route.log
```

### Email Not Sending?

```bash
# Check if in dev mode (logs only)
grep RESEND_API_KEY .env.local

# Dev mode is OK - emails log to console
```

### Google Ads Not Importing?

- Make sure you're using Google Ads Editor
- Check CSV files in `google-ads-import/`
- Verify Google Ad Grant is approved

---

## 📞 Support

**Everything is already built!**

- No coding needed
- Just add API keys
- Test each system
- You're live!

**Time Investment:**

- Social Media: 10 min
- Google Ads: 5 min
- GMB: 10 min
- Email: Already working
- Testing: 5 min
  **Total: 30 minutes**

---

## 🎉 You're Done!

After these 30 minutes:

- ✅ Social media posting 3x daily
- ✅ $10,000/month Google Ads running
- ✅ Professional GMB listing
- ✅ Email notifications working
- ✅ All features operational

**No weeks of development needed - everything is ready NOW!**

---

**Last Updated:** 2025-12-29 23:12 UTC
**Status:** Ready for immediate activation
