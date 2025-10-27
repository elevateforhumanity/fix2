/**
 * Netlify Function: Generate Social Content
 *
 * Uses OpenAI to generate social media posts for TikTok, Facebook, Instagram, LinkedIn.
 * Based on the 90-day content calendar and program information.
 *
 * Endpoint: POST /.netlify/functions/generate-social-content
 */

const { Configuration, OpenAIApi } = require('openai');
const { createClient } = require('@supabase/supabase-js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { content_type, platform, program, theme, custom_prompt } =
      JSON.parse(event.body);

    // Validate inputs
    if (!content_type || !platform) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: content_type, platform',
        }),
      };
    }

    // Build prompt based on content type and platform
    const prompt = buildPrompt(
      content_type,
      platform,
      program,
      theme,
      custom_prompt
    );

    // Generate content using OpenAI
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a social media content creator for Elevate for Humanity, a workforce development organization. Create engaging, authentic content that inspires and informs. Use a conversational tone and include relevant hashtags. Focus on success stories, program benefits, and community impact.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const generatedContent = completion.data.choices[0].message.content.trim();

    // Save to database
    const { data: savedContent, error: saveError } = await supabase
      .from('generated_content')
      .insert({
        content_type,
        platform,
        program,
        theme,
        content: generatedContent,
        status: 'draft',
        generated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) throw saveError;

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'generated_content',
      entity_id: savedContent.id,
      action: 'created',
      details: {
        content_type,
        platform,
        program,
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        content_id: savedContent.id,
        content: generatedContent,
        platform,
        content_type,
      }),
    };
  } catch (error) {
    console.error('Content generation error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to generate content',
      }),
    };
  }
};

/**
 * Build prompt based on content type and platform
 */
function buildPrompt(contentType, platform, program, theme, customPrompt) {
  if (customPrompt) {
    return customPrompt;
  }

  const platformSpecs = {
    tiktok: {
      maxLength: 150,
      style: 'short, punchy, trending',
      hashtags: 5,
    },
    facebook: {
      maxLength: 300,
      style: 'conversational, community-focused',
      hashtags: 3,
    },
    instagram: {
      maxLength: 200,
      style: 'visual, inspirational',
      hashtags: 10,
    },
    linkedin: {
      maxLength: 400,
      style: 'professional, data-driven',
      hashtags: 3,
    },
  };

  const spec = platformSpecs[platform.toLowerCase()] || platformSpecs.facebook;

  const contentTemplates = {
    'success-story': `Create a ${platform} post about a student success story for ${program || 'our workforce programs'}. 
      Focus on transformation: where they started, what they achieved, and their current success. 
      Make it inspiring and relatable. Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'program-highlight': `Create a ${platform} post highlighting ${program || 'one of our programs'}. 
      Focus on: what students learn, career outcomes, and why it's valuable. 
      Include specific benefits and job placement rates if relevant.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'funding-info': `Create a ${platform} post about FREE training through WIOA/WRG funding for ${program || 'our programs'}. 
      Emphasize: no cost to students, government-funded, eligibility requirements.
      Make it clear and actionable with a call-to-action to apply.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'community-impact': `Create a ${platform} post about our community impact. 
      Focus on: students served, job placements, economic impact, community transformation.
      Use specific numbers and statistics. Make it inspiring.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'call-to-action': `Create a ${platform} post with a strong call-to-action for ${program || 'our programs'}. 
      Encourage people to: apply now, learn more, or share with someone who needs it.
      Create urgency without being pushy. Be helpful and supportive.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    testimonial: `Create a ${platform} post featuring a student testimonial for ${program || 'our programs'}. 
      Use a quote format. Make it authentic and emotional.
      Focus on personal transformation and gratitude.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'tip-tuesday': `Create a ${platform} post for "Tip Tuesday" related to ${program || 'career development'}. 
      Share one actionable tip or piece of advice.
      Make it practical and immediately useful.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,

    'motivation-monday': `Create a ${platform} post for "Motivation Monday" related to ${program || 'career goals'}. 
      Share an inspiring message about pursuing education and career dreams.
      Be uplifting and encouraging.
      Include ${spec.hashtags} relevant hashtags.
      Keep it under ${spec.maxLength} characters. Style: ${spec.style}.`,
  };

  const template =
    contentTemplates[contentType] || contentTemplates['program-highlight'];

  if (theme) {
    return `${template}\n\nAdditional theme/context: ${theme}`;
  }

  return template;
}
