import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}

export async function generateChatCompletion(messages: Array<{ role: string; content: string }>) {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error('OpenAI not configured');
  }

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: messages as any,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || '';
}

export async function generateEmbedding(text: string) {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error('OpenAI not configured');
  }

  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0].embedding;
}

export async function generateImage(prompt: string) {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error('OpenAI not configured');
  }

  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  });

  return response.data[0].url;
}
