# 🤖 AI Integration Guide

**Add ChatGPT-Powered Features to Your Site**

---

## Overview

We're adding 4 AI-powered features:

1. **AI Career Advisor** - Chat with AI about career paths
2. **AI Resume Builder** - Generate professional resumes
3. **AI Course Recommendations** - Personalized program suggestions
4. **AI Interview Prep** - Practice interviews with feedback

**Cost:** ~$10-20/month for OpenAI API  
**Time:** 10-15 hours  
**Difficulty:** Intermediate

---

## Setup

### 1. Install OpenAI SDK

```bash
npm install openai
```

### 2. Add API Key to .env.local

```env
OPENAI_API_KEY=sk-proj-...your-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Create OpenAI Client

```typescript
// lib/openai.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AI_MODELS = {
  GPT4: 'gpt-4-turbo-preview',
  GPT35: 'gpt-3.5-turbo',
} as const;
```

---

## Feature 1: AI Career Advisor

### API Route

```typescript
// app/api/ai/career-advisor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const messages = [
      {
        role: 'system',
        content: `You are a career advisor for Elevate for Humanity, a workforce development platform. 
        
Your role:
- Help users explore career paths
- Recommend training programs
- Provide guidance on skill development
- Answer questions about WIOA funding, apprenticeships, and career transitions

Available programs:
- Healthcare (CNA, Medical Assistant, Direct Support Professional)
- Skilled Trades (HVAC, Electrical, Plumbing, Construction)
- Beauty & Wellness (Barber, Esthetician, Cosmetology)
- Business & Technology (IT, Customer Service, Business Admin)
- Tax Preparation (IRS VITA Certified)

Be encouraging, practical, and specific. Focus on actionable next steps.`,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.GPT4,
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({
      response,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('AI Career Advisor Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}
```

### Frontend Component

```typescript
// app/ai-advisor/page.tsx
'use client';

import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AICareerAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI Career Advisor. I can help you explore career paths, find training programs, and plan your next steps. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/ai/career-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      // Add AI response
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">AI Career Advisor</h1>
                <p className="text-blue-100">Get personalized career guidance</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about career paths, training programs, or next steps..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "What career paths are available in healthcare?",
            "How do I qualify for WIOA funding?",
            "What's the difference between an apprenticeship and traditional training?",
            "I want to change careers but don't know where to start",
          ].map((question, i) => (
            <button
              key={i}
              onClick={() => setInput(question)}
              className="p-3 bg-white rounded-lg shadow hover:shadow-md transition text-left text-sm text-gray-700"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Feature 2: AI Resume Builder

### API Route

```typescript
// app/api/ai/resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { experience, skills, education, targetRole } = await request.json();

    const prompt = `Create a professional resume for someone applying to ${targetRole}.

Experience:
${experience}

Skills:
${skills}

Education:
${education}

Format the resume with:
1. Professional Summary (3-4 sentences)
2. Key Skills (bullet points)
3. Work Experience (with achievements)
4. Education
5. Certifications (if applicable)

Make it ATS-friendly and highlight relevant keywords for ${targetRole}.`;

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.GPT4,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional resume writer with expertise in workforce development and career transitions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const resume = completion.choices[0].message.content;

    return NextResponse.json({ resume });
  } catch (error) {
    console.error('AI Resume Builder Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    );
  }
}
```

### Frontend Component

```typescript
// app/resume-builder/page.tsx
'use client';

import { useState } from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    targetRole: '',
    experience: '',
    skills: '',
    education: '',
  });
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const generateResume = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResume(data.resume);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    const blob = new Blob([resume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">AI Resume Builder</h1>
          </div>
          <p className="text-gray-600">
            Create a professional resume in minutes with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) =>
                    setFormData({ ...formData, targetRole: e.target.value })
                  }
                  placeholder="e.g., Medical Assistant, HVAC Technician"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Work Experience
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  placeholder="List your work experience, including job titles, companies, and key responsibilities..."
                  rows={6}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Skills
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="List your skills (technical, soft skills, certifications)..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Education
                </label>
                <textarea
                  value={formData.education}
                  onChange={(e) =>
                    setFormData({ ...formData, education: e.target.value })
                  }
                  placeholder="List your education (degrees, certifications, training programs)..."
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={generateResume}
                disabled={loading || !formData.targetRole}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
              >
                {loading ? 'Generating...' : 'Generate Resume with AI'}
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Resume</h2>
              {resume && (
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>

            {resume ? (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {resume}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <p>Your AI-generated resume will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Feature 3: AI Course Recommendations

### API Route

```typescript
// app/api/ai/recommend/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/openai';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userProfile, goals, interests } = await request.json();

    // Get available programs from database
    const supabase = createClient();
    const { data: programs } = await supabase
      .from('programs')
      .select('id, title, description, category, duration, cost')
      .eq('status', 'active');

    const prompt = `Based on this user profile, recommend 3 training programs:

User Profile:
${JSON.stringify(userProfile, null, 2)}

Career Goals:
${goals}

Interests:
${interests}

Available Programs:
${JSON.stringify(programs, null, 2)}

For each recommendation, explain:
1. Why this program matches their goals
2. What skills they'll gain
3. Career opportunities after completion
4. Estimated time commitment

Format as JSON array with: programId, title, matchScore (0-100), reasoning`;

    const completion = await openai.chat.completions.create({
      model: AI_MODELS.GPT4,
      messages: [
        {
          role: 'system',
          content:
            'You are a career counselor helping match students with training programs.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const recommendations = JSON.parse(
      completion.choices[0].message.content || '[]'
    );

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
```

---

## Feature 4: AI Interview Prep

### API Route

```typescript
// app/api/ai/interview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { openai, AI_MODELS } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { action, role, question, answer } = await request.json();

    if (action === 'generate_question') {
      // Generate interview question
      const completion = await openai.chat.completions.create({
        model: AI_MODELS.GPT4,
        messages: [
          {
            role: 'system',
            content: `You are an interviewer for ${role} positions. Generate realistic interview questions.`,
          },
          {
            role: 'user',
            content: `Generate a ${role} interview question.`,
          },
        ],
        temperature: 0.8,
        max_tokens: 200,
      });

      return NextResponse.json({
        question: completion.choices[0].message.content,
      });
    } else if (action === 'evaluate_answer') {
      // Evaluate user's answer
      const completion = await openai.chat.completions.create({
        model: AI_MODELS.GPT4,
        messages: [
          {
            role: 'system',
            content:
              'You are an interview coach providing constructive feedback.',
          },
          {
            role: 'user',
            content: `Question: ${question}\n\nCandidate's Answer: ${answer}\n\nProvide feedback on:\n1. Strengths\n2. Areas for improvement\n3. Suggested improvements\n4. Score (1-10)`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return NextResponse.json({
        feedback: completion.choices[0].message.content,
      });
    }
  } catch (error) {
    console.error('AI Interview Prep Error:', error);
    return NextResponse.json(
      { error: 'Failed to process interview prep' },
      { status: 500 }
    );
  }
}
```

---

## Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(identifier: string, limit: number = 10) {
  const key = `rate_limit:${identifier}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 3600); // 1 hour
  }

  return count <= limit;
}

// Usage in API route:
const allowed = await rateLimit(request.ip || 'anonymous');
if (!allowed) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

---

## Cost Management

### Estimate Costs

```typescript
// lib/ai-costs.ts
export function estimateCost(tokens: number, model: string) {
  const costs = {
    'gpt-4-turbo-preview': {
      input: 0.01 / 1000, // $0.01 per 1K tokens
      output: 0.03 / 1000, // $0.03 per 1K tokens
    },
    'gpt-3.5-turbo': {
      input: 0.0005 / 1000,
      output: 0.0015 / 1000,
    },
  };

  const modelCost = costs[model] || costs['gpt-3.5-turbo'];
  return tokens * modelCost.input;
}
```

### Monthly Budget

```
Estimated usage:
- 100 conversations/day
- Average 500 tokens per conversation
- 30 days/month

Cost with GPT-4:
100 * 500 * 0.01/1000 * 30 = $15/month

Cost with GPT-3.5:
100 * 500 * 0.0005/1000 * 30 = $0.75/month

Recommendation: Start with GPT-3.5, upgrade to GPT-4 for better quality
```

---

## Testing

```typescript
// __tests__/ai-career-advisor.test.ts
import { POST } from '@/app/api/ai/career-advisor/route';

describe('AI Career Advisor', () => {
  it('should return career advice', async () => {
    const request = new Request('http://localhost:3000/api/ai/career-advisor', {
      method: 'POST',
      body: JSON.stringify({
        message: 'What career paths are available in healthcare?',
        conversationHistory: [],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.response).toBeDefined();
    expect(typeof data.response).toBe('string');
  });
});
```

---

## Deployment

### Environment Variables

Add to Vercel:

```
OPENAI_API_KEY=sk-proj-...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Deploy

```bash
npm run build
vercel --prod
```

---

## Next Steps

1. [ ] Install OpenAI SDK
2. [ ] Add API key to .env.local
3. [ ] Create AI Career Advisor
4. [ ] Create AI Resume Builder
5. [ ] Create AI Course Recommendations
6. [ ] Create AI Interview Prep
7. [ ] Add rate limiting
8. [ ] Test all features
9. [ ] Deploy to production
10. [ ] Monitor usage and costs

---

## Resources

- OpenAI API Docs: https://platform.openai.com/docs
- OpenAI Pricing: https://openai.com/pricing
- Rate Limiting Guide: https://upstash.com/docs/redis/features/ratelimiting
- Best Practices: https://platform.openai.com/docs/guides/production-best-practices

---

**Ready to add AI to your site? Let's start with the Career Advisor!** 🤖
