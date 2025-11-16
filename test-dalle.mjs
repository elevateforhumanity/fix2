import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    console.log('Testing DALL-E 3 API...');
    const result = await openai.images.generate({
      model: 'dall-e-3',
      prompt: 'A simple red circle on white background',
      size: '1024x1024',
      n: 1,
    });
    console.log('✅ API works! Image URL:', result.data[0].url);
  } catch (err) {
    console.error('❌ API Error:', err.message);
    if (err.response) {
      console.error('Response:', err.response.data);
    }
  }
}

test();
