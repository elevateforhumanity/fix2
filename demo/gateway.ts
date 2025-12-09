import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import 'dotenv/config';

async function main() {
  // Configure OpenAI with AI Gateway
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.AI_GATEWAY_URL || 'https://api.openai.com/v1',
  });

  const result = streamText({
    model: openai('gpt-4-turbo-preview'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log('Streaming response from AI Gateway:\n');

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log('\n');
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
