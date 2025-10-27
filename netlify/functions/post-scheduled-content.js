/**
 * Netlify Function: Post Scheduled Content
 * 
 * Finds and posts content scheduled for today to specified platform.
 * Called by GitHub Actions workflow 3x daily.
 * 
 * Endpoint: POST /.netlify/functions/post-scheduled-content
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

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

    const { platform } = JSON.parse(event.body || '{}');

    if (!platform) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Platform is required' }),
      };
    }

    // Get today's scheduled posts for this platform
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const { data: scheduledPosts, error: queryError } = await supabase
      .from('generated_content')
      .select('*')
      .eq('platform', platform)
      .eq('status', 'scheduled')
      .gte('scheduled_date', startOfDay)
      .lte('scheduled_date', endOfDay)
      .order('scheduled_date', { ascending: true })
      .limit(1);

    if (queryError) throw queryError;

    if (!scheduledPosts || scheduledPosts.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `No scheduled posts for ${platform} today`,
          posted: 0,
        }),
      };
    }

    const results = [];

    // Post each scheduled item
    for (const content of scheduledPosts) {
      try {
        const postResponse = await fetch(
          `${process.env.FRONTEND_URL}/.netlify/functions/post-to-social-media`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content_id: content.id,
              platform: platform,
            }),
          }
        );

        const postResult = await postResponse.json();

        results.push({
          content_id: content.id,
          success: postResult.success,
          post_id: postResult.post_id,
          post_url: postResult.post_url,
        });
      } catch (error) {
        console.error(`Failed to post content ${content.id}:`, error);
        results.push({
          content_id: content.id,
          success: false,
          error: error.message,
        });
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        platform,
        posted: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
        results,
      }),
    };
  } catch (error) {
    console.error('Scheduled posting error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to post scheduled content',
      }),
    };
  }
};
