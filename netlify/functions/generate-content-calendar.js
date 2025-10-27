/**
 * Netlify Function: Generate Content Calendar
 * 
 * Generates a batch of social media posts for the 90-day content calendar.
 * Creates posts for all platforms based on the marketing pipeline.
 * 
 * Endpoint: POST /.netlify/functions/generate-content-calendar
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

    const { days = 7, programs = ['Tax Business', 'Barber', 'Building Tech', 'Healthcare'] } = JSON.parse(event.body || '{}');

    // Content calendar structure (from 90-Day-Content-Pipeline.md)
    const weeklySchedule = {
      monday: { theme: 'Motivation Monday', type: 'motivation-monday' },
      tuesday: { theme: 'Tip Tuesday', type: 'tip-tuesday' },
      wednesday: { theme: 'Success Story', type: 'success-story' },
      thursday: { theme: 'Program Highlight', type: 'program-highlight' },
      friday: { theme: 'Call to Action', type: 'call-to-action' },
    };

    const platforms = ['tiktok', 'facebook', 'instagram', 'linkedin'];
    const generatedPosts = [];

    // Generate posts for each day
    for (let day = 0; day < days; day++) {
      const dayOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'][day % 5];
      const schedule = weeklySchedule[dayOfWeek];
      const program = programs[day % programs.length];

      // Generate for each platform
      for (const platform of platforms) {
        try {
          const prompt = buildDailyPrompt(schedule, platform, program, day);

          const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: `You are a social media content creator for Elevate for Humanity. Create engaging, authentic content that inspires action. Focus on student success, FREE training opportunities, and community impact.`,
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.8,
            max_tokens: 300,
          });

          const content = completion.data.choices[0].message.content.trim();

          // Save to database
          const { data: savedPost } = await supabase
            .from('generated_content')
            .insert({
              content_type: schedule.type,
              platform,
              program,
              theme: schedule.theme,
              content,
              scheduled_date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toISOString(),
              status: 'scheduled',
              generated_at: new Date().toISOString(),
            })
            .select()
            .single();

          generatedPosts.push({
            id: savedPost.id,
            day: day + 1,
            dayOfWeek,
            platform,
            program,
            theme: schedule.theme,
            content,
          });

          // Rate limiting: wait 1 second between API calls
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to generate ${platform} post for day ${day}:`, error);
        }
      }
    }

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'content_calendar',
      entity_id: 'batch',
      action: 'generated',
      details: {
        days,
        posts_generated: generatedPosts.length,
        programs,
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        posts_generated: generatedPosts.length,
        days,
        posts: generatedPosts,
      }),
    };
  } catch (error) {
    console.error('Content calendar generation error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to generate content calendar',
      }),
    };
  }
};

/**
 * Build daily prompt
 */
function buildDailyPrompt(schedule, platform, program, day) {
  const platformSpecs = {
    tiktok: { maxLength: 150, hashtags: 5, style: 'short, punchy, trending' },
    facebook: { maxLength: 300, hashtags: 3, style: 'conversational, community-focused' },
    instagram: { maxLength: 200, hashtags: 10, style: 'visual, inspirational' },
    linkedin: { maxLength: 400, hashtags: 3, style: 'professional, data-driven' },
  };

  const spec = platformSpecs[platform] || platformSpecs.facebook;

  const prompts = {
    'motivation-monday': `Create a motivational ${platform} post for Monday about pursuing ${program} training.
      Inspire people to take action on their career goals. Emphasize that training is FREE through WIOA/WRG.
      Include ${spec.hashtags} hashtags. Max ${spec.maxLength} characters. Style: ${spec.style}.`,

    'tip-tuesday': `Create a "Tip Tuesday" ${platform} post with career advice for ${program} professionals.
      Share one actionable tip. Make it practical and immediately useful.
      Include ${spec.hashtags} hashtags. Max ${spec.maxLength} characters. Style: ${spec.style}.`,

    'success-story': `Create a ${platform} post about a ${program} student success story.
      Focus on transformation: unemployed to employed, low income to $45K+, life changed.
      Make it inspiring and authentic. Include ${spec.hashtags} hashtags.
      Max ${spec.maxLength} characters. Style: ${spec.style}.`,

    'program-highlight': `Create a ${platform} post highlighting the ${program} program.
      Focus on: FREE training, job placement rate (92%), average salary ($45K), career outcomes.
      Include call-to-action to apply. Include ${spec.hashtags} hashtags.
      Max ${spec.maxLength} characters. Style: ${spec.style}.`,

    'call-to-action': `Create a ${platform} post with strong call-to-action for ${program} program.
      Emphasize: FREE training, no cost, government-funded, limited spots.
      Create urgency. Include application link. Include ${spec.hashtags} hashtags.
      Max ${spec.maxLength} characters. Style: ${spec.style}.`,
  };

  return prompts[schedule.type] || prompts['program-highlight'];
}
