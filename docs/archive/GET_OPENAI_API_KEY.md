# 🤖 Get OpenAI API Key (5 Minutes)

**Link**: https://platform.openai.com/api-keys

---

## 🎯 Quick Steps

### Step 1: Create OpenAI Account (2 minutes)

1. Go to: **https://platform.openai.com/signup**
2. Sign up with:
   - Email address, OR
   - Google account, OR
   - Microsoft account
3. Verify your email
4. Complete profile setup

---

### Step 2: Add Payment Method (2 minutes)

⚠️ **Required**: OpenAI requires a payment method for API access

1. Go to: **https://platform.openai.com/account/billing**
2. Click **Add payment method**
3. Add credit card
4. Set usage limits (recommended):
   - **Hard limit**: $10/month
   - **Soft limit**: $5/month (email alert)

**Cost**: ~$0.60/month for typical LMS usage

---

### Step 3: Create API Key (1 minute)

1. Go to: **https://platform.openai.com/api-keys**
2. Click **Create new secret key**
3. Name it: `EFH-LMS-Production`
4. Click **Create secret key**
5. ⚠️ **COPY THE KEY NOW** - You won't see it again!

```
sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🚀 Add to Your LMS

### Option 1: Add to Netlify Dashboard

1. Go to: https://app.netlify.com
2. Select: **elevateforhumanityfix2**
3. Go to: **Site settings** → **Environment variables**
4. Click: **Add a variable**
5. Add:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sk-proj-your-key-here`
6. Click **Save**
7. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Option 2: Add to .env File (Local Development)

```bash
# Edit .env file
nano .env

# Add this line:
OPENAI_API_KEY=sk-proj-your-key-here
```

---

## ✅ What You Get with OpenAI

### AI-Powered Features:

**Content Generation**:

- ✅ Auto-generate course descriptions
- ✅ Create lesson summaries
- ✅ Write certificate text
- ✅ Generate course outlines

**Quiz Creation**:

- ✅ Auto-generate quiz questions from lesson content
- ✅ Create multiple-choice questions
- ✅ Generate answer explanations
- ✅ Difficulty level adjustment

**Social Media**:

- ✅ Auto-generate social media posts
- ✅ Create engaging captions
- ✅ Generate hashtags
- ✅ Schedule content

**Student Support**:

- ✅ AI-powered chatbot
- ✅ Answer student questions
- ✅ Provide learning recommendations
- ✅ Generate feedback

---

## 💰 Pricing (Very Affordable)

### GPT-4o-mini (Recommended):

- **Input**: $0.150 per 1M tokens (~$0.00015 per 1K tokens)
- **Output**: $0.600 per 1M tokens (~$0.0006 per 1K tokens)

### Real-World Costs:

**Generate course description** (100 tokens):

- Cost: ~$0.00006 (less than 1 cent)

**Generate 10 quiz questions** (500 tokens):

- Cost: ~$0.0003 (less than 1 cent)

**Generate lesson content** (1000 tokens):

- Cost: ~$0.0006 (less than 1 cent)

**Monthly estimate** (1000 generations):

- ~$0.60 per month

---

## 🔒 Security Best Practices

### ✅ DO:

- Store API key in environment variables
- Set usage limits ($10/month hard limit)
- Monitor usage regularly
- Use `.env` file for local development
- Add `.env` to `.gitignore` (already done)

### ❌ DON'T:

- Commit API key to git
- Expose API key in frontend code
- Share API key publicly
- Use API key in client-side JavaScript
- Leave unlimited usage enabled

---

## 🧪 Test OpenAI Integration

After adding the key, test it:

```bash
# Create test file
cat > test-openai.js << 'EOF'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: "Generate a 2-sentence course description for 'Patient Care Basics'"
      }
    ],
  });

  console.log('✅ OpenAI working!');
  console.log('Response:', completion.choices[0].message.content);
}

test();
EOF

# Run test
node test-openai.js
```

---

## 📊 Monitor Usage

### View Usage Dashboard:

1. Go to: **https://platform.openai.com/usage**
2. See daily/monthly usage
3. Track costs
4. Download reports

### Set Up Alerts:

1. Go to: **https://platform.openai.com/account/limits**
2. Set soft limit: $5 (email alert)
3. Set hard limit: $10 (stops usage)

---

## 🆘 Troubleshooting

### Issue: "Invalid API key"

**Solution**:

- Check key starts with `sk-proj-` or `sk-`
- Verify no extra spaces or newlines
- Regenerate key if needed

### Issue: "Insufficient quota"

**Solution**:

- Add payment method: https://platform.openai.com/account/billing
- Check usage limits: https://platform.openai.com/account/limits
- Verify payment method is valid

### Issue: "Rate limit exceeded"

**Solution**:

- Wait a few seconds and retry
- Implement exponential backoff
- Upgrade to higher tier if needed

---

## 🎉 You're Done!

After adding OpenAI API key, your LMS will have:

### ✅ 100% Functionality:

- Full LMS features
- Stripe payments
- Social media automation (Facebook, LinkedIn)
- Cloudflare edge functions
- **AI content generation** ← NEW!
- **AI quiz creation** ← NEW!
- **AI chatbot** ← NEW!
- Autonomous monitoring

---

## 📚 Additional Resources

### Documentation:

- OpenAI Docs: https://platform.openai.com/docs
- API Reference: https://platform.openai.com/docs/api-reference
- Pricing: https://openai.com/pricing

### Status:

- OpenAI Status: https://status.openai.com

### Support:

- Help Center: https://help.openai.com
- Community: https://community.openai.com

---

## 🔗 Quick Links

**Get API Key**: https://platform.openai.com/api-keys  
**Add Payment**: https://platform.openai.com/account/billing  
**Set Limits**: https://platform.openai.com/account/limits  
**View Usage**: https://platform.openai.com/usage  
**Documentation**: https://platform.openai.com/docs

---

**Time to Setup**: 5 minutes  
**Monthly Cost**: ~$0.60 (typical usage)  
**Value**: AI-powered content generation, quiz creation, and chatbot  
**Status**: Required for 100% LMS functionality

---

**🚀 GET YOUR KEY NOW: https://platform.openai.com/api-keys 🚀**
