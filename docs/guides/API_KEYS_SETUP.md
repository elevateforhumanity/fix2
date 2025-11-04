# 🔑 API Keys Setup Guide

## Required API Keys for Full Functionality

### 1. SendGrid API Key (Email Functionality)

**What it's for:** Sending emails via the email-dispatch Edge Function

**Get your key:**

1. Go to: https://app.sendgrid.com/signup
2. Sign up for free account (100 emails/day free)
3. After signup, go to: https://app.sendgrid.com/settings/api_keys
4. Click "Create API Key"
5. Name it: "Elevate LMS"
6. Select "Full Access" or "Restricted Access" with Mail Send permissions
7. Click "Create & View"
8. Copy the key (starts with `SG.`)

**Add to Supabase:**

- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/secrets
- Add secret: `SENDGRID_API_KEY` = `SG.your_key_here`

**Alternative: Resend (Simpler)**

- Go to: https://resend.com/signup
- Free tier: 100 emails/day
- Get API key: https://resend.com/api-keys
- Add to Supabase: `RESEND_API_KEY` = `re_your_key_here`

---

### 2. Anthropic API Key (Claude AI)

**What it's for:** AI-powered features using Claude (alternative to OpenAI)

**Get your key:**

1. Go to: https://console.anthropic.com/
2. Sign up for account
3. After signup, go to: https://console.anthropic.com/settings/keys
4. Click "Create Key"
5. Name it: "Elevate LMS"
6. Copy the key (starts with `sk-ant-`)

**Pricing:**

- Pay-as-you-go
- Claude 3.5 Sonnet: $3 per million input tokens
- $5 credit on signup

**Add to Supabase:**

- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/secrets
- Add secret: `ANTHROPIC_API_KEY` = `sk-ant-your_key_here`

---

### 3. OpenAI API Key (Already Configured)

**Status:** ✅ Already in your .env file

**If you need a new one:**

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it: "Elevate LMS"
4. Copy the key (starts with `sk-`)

**Add to Supabase:**

- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/secrets
- Add secret: `OPENAI_API_KEY` = `sk-your_key_here`

---

## Quick Links Summary

| Service       | Signup                             | API Keys                                    | Pricing       |
| ------------- | ---------------------------------- | ------------------------------------------- | ------------- |
| **SendGrid**  | https://app.sendgrid.com/signup    | https://app.sendgrid.com/settings/api_keys  | Free: 100/day |
| **Resend**    | https://resend.com/signup          | https://resend.com/api-keys                 | Free: 100/day |
| **Anthropic** | https://console.anthropic.com/     | https://console.anthropic.com/settings/keys | $5 credit     |
| **OpenAI**    | https://platform.openai.com/signup | https://platform.openai.com/api-keys        | $5 credit     |

---

## Add Keys to Supabase

After getting your keys, add them to Supabase:

**Dashboard URL:**
https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/secrets

**Add these secrets:**

```
SENDGRID_API_KEY=SG.your_sendgrid_key
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key
OPENAI_API_KEY=sk-your_openai_key (if not already set)
```

---

## Which Email Service to Choose?

### SendGrid

- ✅ More established
- ✅ Better deliverability
- ✅ More features (templates, analytics)
- ❌ More complex setup
- Free: 100 emails/day

### Resend (Recommended for getting started)

- ✅ Simpler API
- ✅ Better developer experience
- ✅ Modern interface
- ✅ Easier setup
- Free: 100 emails/day

**Recommendation:** Start with Resend, switch to SendGrid if you need advanced features.

---

## Which AI Service to Choose?

### OpenAI (GPT-4)

- ✅ Already configured in your .env
- ✅ More widely used
- ✅ Better for general tasks
- Cost: ~$0.03 per 1K tokens

### Anthropic (Claude)

- ✅ Better for long-form content
- ✅ More accurate for complex reasoning
- ✅ Better safety features
- Cost: ~$0.003 per 1K tokens (cheaper!)

**Recommendation:** Use both! OpenAI for quick tasks, Claude for complex content generation.

---

## Testing Your Keys

After adding keys to Supabase, test them:

### Test Email

```bash
curl -X POST "https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/email-dispatch" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "text": "This is a test email from your LMS!"
  }'
```

### Test AI

```bash
curl -X POST "https://cuxzzpsyufcewtmicszk.supabase.co/functions/v1/ai-course-create" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Introduction to Python",
    "level": "beginner"
  }'
```

---

## Security Notes

⚠️ **Never commit API keys to git!**

- Keys should only be in Supabase secrets
- Never in .env files that are committed
- Never in frontend code

✅ **Best practices:**

- Rotate keys regularly
- Use different keys for dev/prod
- Monitor usage in each service's dashboard
- Set spending limits

---

## Need Help?

- **SendGrid Docs:** https://docs.sendgrid.com/
- **Resend Docs:** https://resend.com/docs
- **Anthropic Docs:** https://docs.anthropic.com/
- **OpenAI Docs:** https://platform.openai.com/docs
