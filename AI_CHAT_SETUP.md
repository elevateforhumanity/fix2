# Elevate AI Chat Setup

## Overview

A standalone AI chat interface integrated into the Elevate for Humanity platform. Users can ask questions about programs, apprenticeships, WIOA, WRG, JRI, and get instant AI-powered responses.

## Features

- ✅ Clean, TikTok-inspired chat UI
- ✅ Elevate brand colors (red/orange gradient)
- ✅ OpenAI GPT-4o-mini integration
- ✅ Context-aware responses about workforce development
- ✅ Suggested prompts for common questions
- ✅ Real-time chat with typing indicators
- ✅ Mobile responsive design

## Setup

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-`)

### 2. Add Environment Variable

#### In Vercel:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `sk-your-api-key-here`
   - **Environment**: Production, Preview, Development
4. Redeploy

#### In Gitpod:
```bash
gp env OPENAI_API_KEY=sk-your-api-key-here
```

#### Locally:
Create `.env.local`:
```
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. Access the Chat

Visit: `https://www.elevateconnectsdirectory.org/ai-chat`

Or click the "💬 Chat with AI Helper" button on the homepage.

## Usage Examples

### For Students
- "What programs do you offer?"
- "How do I qualify for free training?"
- "Tell me about the truck driving program"
- "What certifications can I earn?"

### For Staff
- "Draft a WIOA-friendly program description for HVAC"
- "Explain ETPL + JRI + apprenticeships to a funder"
- "Rewrite this grant paragraph to sound more polished"
- "Help me write a student success story"

### For Partners
- "What is the Modern Apprenticeship program?"
- "How does WIOA funding work?"
- "Explain the WRG partnership model"

## Technical Details

### Files Created
- `/app/ai-chat/page.tsx` - Chat UI component
- `/app/api/ai-chat/route.ts` - API endpoint for OpenAI
- `/AI_CHAT_SETUP.md` - This documentation

### API Endpoint
- **URL**: `/api/ai-chat`
- **Method**: POST
- **Body**: `{ messages: ChatMessage[] }`
- **Response**: `{ reply: string }`

### Model Configuration
- **Model**: gpt-4o-mini
- **Temperature**: 0.7
- **Max Tokens**: 1000
- **System Prompt**: Configured for Elevate context

### System Prompt
The AI is configured to:
- Use encouraging, professional "boss energy" tone
- Focus on workforce development topics
- Understand Indianapolis workforce ecosystem
- Know about WIOA, WRG, JRI, EmployIndy, WorkOne
- Help with program descriptions, grants, communications
- Never invent legal approvals or guarantees

## Customization

### Change AI Behavior
Edit the system prompt in `/app/api/ai-chat/route.ts`:

```typescript
const systemPrompt = `
Your custom instructions here...
`;
```

### Change UI Colors
Edit `/app/ai-chat/page.tsx` and update Tailwind classes:
- User messages: `from-efh-orange to-efh-red`
- Assistant messages: `bg-slate-100`
- Header: `from-efh-orange to-efh-red`

### Add Preset Prompts
Edit the sidebar in `/app/ai-chat/page.tsx`:

```typescript
<ul className="space-y-2 text-slate-600">
  <li>• Your custom prompt here</li>
</ul>
```

## Cost Considerations

### OpenAI Pricing (as of 2024)
- **gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Average conversation**: ~$0.001 - $0.005 per exchange
- **1000 conversations/month**: ~$1-5

### Cost Management
1. Set usage limits in OpenAI dashboard
2. Monitor usage in OpenAI platform
3. Consider caching common responses
4. Add rate limiting if needed

## Security

### API Key Protection
- ✅ API key stored in environment variables
- ✅ Never exposed to client
- ✅ Server-side API calls only

### Input Validation
- ✅ Message content sanitized
- ✅ Role validation (user/assistant only)
- ✅ Error handling for malformed requests

### Rate Limiting
Consider adding rate limiting for production:
```typescript
// Example: Vercel Edge Config or Redis
const rateLimiter = new RateLimiter({
  max: 10, // 10 requests
  window: 60000 // per minute
});
```

## Troubleshooting

### "OPENAI_API_KEY is not set"
- Check environment variable is set in Vercel/Gitpod
- Restart dev server after adding `.env.local`
- Verify key starts with `sk-`

### "OpenAI request failed"
- Check API key is valid
- Verify you have credits in OpenAI account
- Check OpenAI status: https://status.openai.com

### Chat not responding
- Open browser console (F12) for errors
- Check Network tab for failed requests
- Verify `/api/ai-chat` endpoint is accessible

### Slow responses
- Normal: GPT-4o-mini takes 2-5 seconds
- Check your internet connection
- Consider reducing `max_tokens` for faster responses

## Future Enhancements

### Potential Features
- [ ] Conversation history saved to database
- [ ] User authentication for personalized responses
- [ ] File upload for document analysis
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Integration with student portal
- [ ] Admin dashboard for chat analytics
- [ ] Preset conversation templates
- [ ] Export chat transcripts

### Integration Ideas
- Add to student dashboard
- Embed in program pages
- Create mobile app version
- Add to admin tools
- Partner portal integration

## Support

For issues or questions:
1. Check this documentation
2. Review OpenAI API docs: https://platform.openai.com/docs
3. Check Vercel deployment logs
4. Contact development team

---

**Last Updated**: 2025-11-16
**Version**: 1.0.0
**Status**: ✅ Production Ready
