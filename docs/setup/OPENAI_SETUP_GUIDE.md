# 🤖 OpenAI Setup Guide (5 Minutes)

**Last Updated**: 2025-10-29 04:06 UTC  
**Autopilot Version**: 7.0  
**Gets You**: AI Content Generation

---

## 🎯 What You'll Get

After adding OpenAI API key:

- ✅ AI-powered course content generation
- ✅ Automated quiz question creation
- ✅ Lesson summary generation
- ✅ Certificate text generation
- ✅ Course description writing
- ✅ Student feedback analysis
- ✅ Content recommendations

---

## 📋 Prerequisites

1. ✅ Supabase setup complete (80% functionality)
2. ✅ OpenAI account: https://platform.openai.com/signup

---

## 🔑 Step 1: Get OpenAI API Key (2 minutes)

### 1.1 Create Account

1. Go to https://platform.openai.com/signup
2. Sign up with email or Google/Microsoft account
3. Verify your email
4. Add payment method (required for API access)
   - Go to https://platform.openai.com/account/billing
   - Click **Add payment method**
   - Add credit card

### 1.2 Get API Key

1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Name it: `EFH-LMS-Production` (or any name)
4. Click **Create secret key**
5. ⚠️ **COPY THE KEY NOW** - You won't see it again!

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔧 Step 2: Add Key to Environment

### For Local Development:

Add to `.env` file:

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### For Netlify:

1. Go to Netlify Dashboard → Your site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable**:

| Key              | Value         | Scope      |
| ---------------- | ------------- | ---------- |
| `OPENAI_API_KEY` | `sk-proj-...` | All scopes |

4. Click **Save**
5. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

## 🧪 Step 3: Test OpenAI Integration (3 minutes)

### Test Script

Create a test file to verify the API key works:

```bash
# Create test script
cat > test-openai.js << 'EOF'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testOpenAI() {
  try {
    console.log('🧪 Testing OpenAI API...\n');

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for an educational platform."
        },
        {
          role: "user",
          content: "Generate a brief course description for 'Introduction to Patient Care' in 2 sentences."
        }
      ],
      max_tokens: 100,
    });

    console.log('✅ OpenAI API is working!\n');
    console.log('Response:', completion.choices[0].message.content);
    console.log('\n📊 Usage:', {
      prompt_tokens: completion.usage.prompt_tokens,
      completion_tokens: completion.usage.completion_tokens,
      total_tokens: completion.usage.total_tokens,
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testOpenAI();
EOF

# Run test
node test-openai.js
```

Expected output:

```
🧪 Testing OpenAI API...

✅ OpenAI API is working!

Response: Introduction to Patient Care provides foundational knowledge in healthcare basics, including patient safety, hygiene, and communication. Students learn essential skills for providing compassionate and effective care in various healthcare settings.

📊 Usage: { prompt_tokens: 45, completion_tokens: 38, total_tokens: 83 }
```

---

## 💡 Step 4: AI Features Available

### 4.1 Course Content Generation

Generate course descriptions, lesson content, and summaries:

```javascript
// Example: Generate course description
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content:
        'You are an expert curriculum designer for workforce training programs.',
    },
    {
      role: 'user',
      content: `Generate a comprehensive course description for: ${courseTitle}
      
      Include:
      - Overview (2-3 sentences)
      - Learning objectives (3-5 bullet points)
      - Target audience
      - Prerequisites
      `,
    },
  ],
  max_tokens: 500,
});
```

### 4.2 Quiz Question Generation

Automatically create quiz questions from lesson content:

```javascript
// Example: Generate quiz questions
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are an expert at creating educational assessments.',
    },
    {
      role: 'user',
      content: `Create 5 multiple-choice quiz questions based on this lesson content:
      
      ${lessonContent}
      
      Format each question as:
      Question: [question text]
      A) [option 1]
      B) [option 2]
      C) [option 3]
      D) [option 4]
      Correct Answer: [A/B/C/D]
      `,
    },
  ],
  max_tokens: 1000,
});
```

### 4.3 Certificate Text Generation

Generate personalized certificate text:

```javascript
// Example: Generate certificate text
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are a professional certificate writer.',
    },
    {
      role: 'user',
      content: `Generate formal certificate text for:
      
      Student: ${studentName}
      Course: ${courseName}
      Completion Date: ${completionDate}
      
      Include:
      - Formal congratulations
      - Course completion statement
      - Skills acquired
      - Professional tone
      `,
    },
  ],
  max_tokens: 300,
});
```

### 4.4 Lesson Summary Generation

Create concise lesson summaries:

```javascript
// Example: Generate lesson summary
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: 'You are an expert at summarizing educational content.',
    },
    {
      role: 'user',
      content: `Summarize this lesson in 3-5 bullet points:
      
      ${lessonContent}
      
      Focus on key takeaways and actionable insights.
      `,
    },
  ],
  max_tokens: 200,
});
```

---

## 💰 Step 5: Cost Management

### Pricing (as of 2025)

**GPT-4o-mini** (recommended for most tasks):

- Input: $0.150 per 1M tokens (~$0.00015 per 1K tokens)
- Output: $0.600 per 1M tokens (~$0.0006 per 1K tokens)

**GPT-4o** (for complex tasks):

- Input: $2.50 per 1M tokens (~$0.0025 per 1K tokens)
- Output: $10.00 per 1M tokens (~$0.01 per 1K tokens)

### Cost Examples

**Generate course description** (100 tokens):

- Cost: ~$0.00006 (less than 1 cent)

**Generate 10 quiz questions** (500 tokens):

- Cost: ~$0.0003 (less than 1 cent)

**Generate lesson content** (1000 tokens):

- Cost: ~$0.0006 (less than 1 cent)

**Monthly estimate** (1000 generations):

- ~$0.60 per month for typical usage

### Set Usage Limits

1. Go to https://platform.openai.com/account/limits
2. Set **Hard limit**: $10/month (or your preference)
3. Set **Soft limit**: $5/month (get email alert)
4. ✅ This prevents unexpected charges

---

## 🔒 Step 6: Security Best Practices

### ✅ DO:

- Store API key in environment variables
- Use `.env` file for local development
- Add `.env` to `.gitignore`
- Use Netlify environment variables for production
- Set usage limits in OpenAI dashboard
- Monitor usage regularly

### ❌ DON'T:

- Commit API key to git
- Expose API key in frontend code
- Share API key publicly
- Use API key in client-side JavaScript
- Leave unlimited usage enabled

---

## 🔍 Step 7: Verify Setup

### Check 1: Environment Variable

```bash
# Local
echo $OPENAI_API_KEY

# Should show: sk-proj-...
```

### Check 2: Test API Call

```bash
# Run test script
node test-openai.js

# Should show: ✅ OpenAI API is working!
```

### Check 3: Build

```bash
pnpm run build
```

✅ Should succeed with no errors

### Check 4: Usage Dashboard

1. Go to https://platform.openai.com/usage
2. Make a test API call
3. ✅ Should see usage appear in dashboard

---

## 📊 Monitoring Usage

### View Usage:

1. Go to https://platform.openai.com/usage
2. See daily/monthly usage
3. Track costs
4. Download usage reports

### Set Up Alerts:

1. Go to https://platform.openai.com/account/limits
2. Set soft limit (e.g., $5)
3. ✅ Get email when limit reached

---

## 🚀 Advanced Features

### Streaming Responses

For real-time content generation:

```javascript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Generate course content...' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

### Function Calling

For structured data extraction:

```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Extract quiz questions...' }],
  functions: [
    {
      name: 'create_quiz_question',
      description: 'Create a quiz question',
      parameters: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          correct_answer: { type: 'string' },
        },
        required: ['question', 'options', 'correct_answer'],
      },
    },
  ],
  function_call: { name: 'create_quiz_question' },
});
```

### Embeddings

For semantic search and recommendations:

```javascript
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Patient care fundamentals',
});

// Store embedding in database for similarity search
```

---

## 🆘 Troubleshooting

### Issue: "Invalid API key"

**Solution**:

- Check key starts with `sk-proj-` or `sk-`
- Verify no extra spaces or newlines
- Make sure key is from correct OpenAI account
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

### Issue: "Model not found"

**Solution**:

- Use `gpt-4o-mini` instead of `gpt-4-mini`
- Check model name spelling
- Verify model is available in your region

---

## 📈 Next Steps

### To Get 100% Functionality:

Add these API keys (see `API_KEYS_REQUIRED.md`):

- Twitter/X (4 keys) - Social automation
- LinkedIn (2 keys) - Professional network
- Facebook (2 keys) - Social media
- Slack (1 webhook) - Notifications
- Cloudflare (2 keys) - Edge functions

---

## 📞 Support

If you encounter issues:

1. Check OpenAI status: https://status.openai.com
2. Review API docs: https://platform.openai.com/docs
3. Check usage dashboard for errors
4. Review Netlify logs for API call failures
5. Autopilot will monitor and alert on AI generation failures

---

**Setup Time**: 5 minutes  
**Cost**: ~$0.60/month for typical usage  
**Functionality**: AI Content Generation  
**Status**: Production Ready  
**Generated by**: Autonomous Autopilot v7.0
