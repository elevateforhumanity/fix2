# 🔑 Get API Keys for Video Generation

## Required: OpenAI API Key (Text-to-Speech)

### Step 1: Create OpenAI Account

**Link:** [https://platform.openai.com/signup](https://platform.openai.com/signup)

1. Click the link above
2. Sign up with email or Google/Microsoft account
3. Verify your email address

### Step 2: Add Payment Method

**Link:** [https://platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview)

1. Go to Billing → Payment methods
2. Add a credit/debit card
3. Add initial credit ($5-10 recommended)

**Cost:** ~$0.04 per video (very cheap!)

- $15 per 1 million characters
- Average video uses ~2,500 characters
- $5 credit = ~125 videos

### Step 3: Create API Key

**Link:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

1. Click "Create new secret key"
2. Name it "Video Generation" or similar
3. Copy the key (starts with `sk-...`)
4. **Save it immediately** - you can't see it again!

### Step 4: Add to Environment

```bash
# Option A: Export in terminal
export OPENAI_API_KEY=sk-your-key-here

# Option B: Add to .env file
echo "OPENAI_API_KEY=sk-your-key-here" >> .env
echo "VITE_OPENAI_API_KEY=sk-your-key-here" >> .env
```

---

## Optional: Cloudflare (Video Hosting)

### For Cloudflare Stream (Recommended)

#### Step 1: Create Cloudflare Account

**Link:** [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

1. Sign up for free account
2. Verify email

#### Step 2: Enable Stream

**Link:** [https://dash.cloudflare.com/stream](https://dash.cloudflare.com/stream)

1. Navigate to Stream in sidebar
2. Click "Get Started"
3. Enable Stream on your account

**Pricing:**

- $5 per 1,000 minutes stored/month
- $1 per 1,000 minutes delivered
- **First 1,000 minutes FREE**

#### Step 3: Create API Token

**Link:** [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

1. Click "Create Token"
2. Use "Edit Cloudflare Stream" template
3. Or create custom token with Stream permissions:
   - Stream: Read
   - Stream: Edit
4. Copy the token

#### Step 4: Get Account ID

**Link:** [https://dash.cloudflare.com/](https://dash.cloudflare.com/)

1. Click on any domain or go to Stream
2. Look in the right sidebar for "Account ID"
3. Copy the Account ID

#### Step 5: Add to Environment

```bash
# Add to .env file
echo "STORAGE_TYPE=cloudflare-stream" >> .env
echo "CLOUDFLARE_ACCOUNT_ID=your-account-id" >> .env
echo "CLOUDFLARE_STREAM_API_TOKEN=your-token" >> .env
```

---

### For Cloudflare R2 (Alternative Storage)

#### Step 1: Enable R2

**Link:** [https://dash.cloudflare.com/r2](https://dash.cloudflare.com/r2)

1. Navigate to R2 in sidebar
2. Click "Get Started"
3. Enable R2 on your account

**Pricing:**

- $0.015 per GB/month storage
- **10 GB free per month**
- No egress fees!

#### Step 2: Create Bucket

1. Click "Create bucket"
2. Name it (e.g., "video-storage")
3. Choose location (automatic recommended)
4. Create bucket

#### Step 3: Create API Token

**Link:** [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

1. Click "Create Token"
2. Use "Edit R2" template
3. Or create custom with R2 permissions:
   - R2: Read
   - R2: Edit
4. Copy Access Key ID and Secret Access Key

#### Step 4: Add to Environment

```bash
# Add to .env file
echo "STORAGE_TYPE=cloudflare-r2" >> .env
echo "CLOUDFLARE_ACCOUNT_ID=your-account-id" >> .env
echo "CLOUDFLARE_R2_BUCKET=your-bucket-name" >> .env
echo "CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key" >> .env
echo "CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key" >> .env
```

---

## Quick Links Summary

### Required

- **OpenAI Signup:** [https://platform.openai.com/signup](https://platform.openai.com/signup)
- **OpenAI API Keys:** [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **OpenAI Billing:** [https://platform.openai.com/account/billing/overview](https://platform.openai.com/account/billing/overview)

### Optional (Cloudflare)

- **Cloudflare Signup:** [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
- **Cloudflare Stream:** [https://dash.cloudflare.com/stream](https://dash.cloudflare.com/stream)
- **Cloudflare R2:** [https://dash.cloudflare.com/r2](https://dash.cloudflare.com/r2)
- **API Tokens:** [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

---

## Complete .env File Example

```env
# Required: OpenAI for Text-to-Speech
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# Optional: Storage Type (default: local)
STORAGE_TYPE=cloudflare-stream

# Optional: Cloudflare Stream (Recommended)
CLOUDFLARE_ACCOUNT_ID=abc123def456
CLOUDFLARE_STREAM_API_TOKEN=xxxxxxxxxxxxxxxxxxxxx

# Optional: Cloudflare R2 (Alternative)
CLOUDFLARE_R2_BUCKET=video-storage
CLOUDFLARE_R2_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_R2_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxx

# Server Port
VIDEO_API_PORT=3001
```

---

## Verify Setup

After adding keys, test the system:

```bash
# Test TTS and video generation
pnpm video:test
```

If successful, you'll see:

```
✅ TTS Configuration
✅ TTS Service
✅ Timeline Validation
✅ Storage Initialization
✅ Video Generation
✅ Video File Access
✅ Metadata Retrieval
✅ Video Listing
```

---

## Cost Calculator

### OpenAI TTS

- **Per video:** ~$0.04 (500 words)
- **10 videos:** ~$0.40
- **100 videos:** ~$4.00
- **1,000 videos:** ~$40.00

### Cloudflare Stream

- **Storage:** $5 per 1,000 minutes/month
- **Delivery:** $1 per 1,000 minutes delivered
- **Example:** 100 videos × 1 min = $0.50 storage + $1.00 delivery = $1.50/month

### Cloudflare R2

- **Storage:** $0.015 per GB/month
- **Example:** 10GB = $0.15/month
- **Egress:** FREE (no bandwidth costs)

### Total Monthly Cost Examples

**Small (10 videos/month):**

- OpenAI: $0.40
- Cloudflare Stream: $0.15
- **Total: ~$0.55/month**

**Medium (100 videos/month):**

- OpenAI: $4.00
- Cloudflare Stream: $1.50
- **Total: ~$5.50/month**

**Large (1,000 videos/month):**

- OpenAI: $40.00
- Cloudflare Stream: $15.00
- **Total: ~$55/month**

---

## Troubleshooting

### "Invalid API key"

- Make sure you copied the entire key (starts with `sk-`)
- Check for extra spaces or quotes
- Verify key is active in OpenAI dashboard

### "Insufficient credits"

- Add payment method in OpenAI billing
- Add at least $5 credit
- Wait a few minutes for activation

### "Cloudflare authentication failed"

- Verify Account ID is correct
- Check API token has correct permissions
- Ensure token is not expired

### "Rate limit exceeded"

- OpenAI: Wait or upgrade plan
- Cloudflare: Check usage limits
- Add delays between requests

---

## Security Best Practices

### ✅ DO:

- Store keys in `.env` file (not committed to git)
- Use environment variables
- Rotate keys periodically
- Set spending limits in OpenAI dashboard
- Use separate keys for dev/production

### ❌ DON'T:

- Commit keys to git
- Share keys publicly
- Use same key across multiple projects
- Hardcode keys in source code
- Expose keys in client-side code

---

## Need Help?

### OpenAI Support

- **Docs:** [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **Help:** [https://help.openai.com](https://help.openai.com)
- **Community:** [https://community.openai.com](https://community.openai.com)

### Cloudflare Support

- **Docs:** [https://developers.cloudflare.com](https://developers.cloudflare.com)
- **Community:** [https://community.cloudflare.com](https://community.cloudflare.com)
- **Support:** [https://dash.cloudflare.com/support](https://dash.cloudflare.com/support)

---

**Ready to start?** Get your OpenAI key first, then optionally add Cloudflare for production hosting!
