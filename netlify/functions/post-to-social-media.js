/**
 * Netlify Function: Post to Social Media
 * 
 * Posts generated content to Facebook, Instagram, and LinkedIn.
 * Retrieves scheduled posts from database and publishes them.
 * 
 * Endpoint: POST /.netlify/functions/post-to-social-media
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

    const { content_id, platform } = JSON.parse(event.body || '{}');

    // Get content from database
    const { data: content, error: contentError } = await supabase
      .from('generated_content')
      .select('*')
      .eq('id', content_id)
      .single();

    if (contentError || !content) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Content not found' }),
      };
    }

    // Post to specified platform
    let result;
    const targetPlatform = platform || content.platform;

    switch (targetPlatform.toLowerCase()) {
      case 'facebook':
        result = await postToFacebook(content);
        break;
      case 'instagram':
        result = await postToInstagram(content);
        break;
      case 'linkedin':
        result = await postToLinkedIn(content);
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Unsupported platform: ${targetPlatform}` }),
        };
    }

    // Update content status
    await supabase
      .from('generated_content')
      .update({
        status: 'published',
        published_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', content_id);

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'social_post',
      entity_id: content_id,
      action: 'published',
      details: {
        platform: targetPlatform,
        post_id: result.post_id,
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        platform: targetPlatform,
        post_id: result.post_id,
        post_url: result.post_url,
        message: 'Posted successfully',
      }),
    };
  } catch (error) {
    console.error('Social media posting error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to post to social media',
      }),
    };
  }
};

/**
 * Post to Facebook Page
 */
async function postToFacebook(content) {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    throw new Error('Facebook credentials not configured');
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pageId}/feed`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: content.content,
        access_token: pageAccessToken,
      }),
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`Facebook API error: ${data.error.message}`);
  }

  return {
    post_id: data.id,
    post_url: `https://facebook.com/${data.id}`,
  };
}

/**
 * Post to Instagram (via Facebook Graph API)
 */
async function postToInstagram(content) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    throw new Error('Instagram credentials not configured');
  }

  // Note: Instagram requires an image URL
  // For text-only posts, we'd need to generate an image with the text
  if (!content.image_url) {
    throw new Error('Instagram posts require an image');
  }

  // Step 1: Create media container
  const containerResponse = await fetch(
    `https://graph.facebook.com/v18.0/${accountId}/media`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: content.image_url,
        caption: content.content,
        access_token: accessToken,
      }),
    }
  );

  const containerData = await containerResponse.json();

  if (containerData.error) {
    throw new Error(`Instagram API error: ${containerData.error.message}`);
  }

  // Step 2: Publish media container
  const publishResponse = await fetch(
    `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creation_id: containerData.id,
        access_token: accessToken,
      }),
    }
  );

  const publishData = await publishResponse.json();

  if (publishData.error) {
    throw new Error(`Instagram publish error: ${publishData.error.message}`);
  }

  return {
    post_id: publishData.id,
    post_url: `https://instagram.com/p/${publishData.id}`,
  };
}

/**
 * Post to LinkedIn
 */
async function postToLinkedIn(content) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

  if (!accessToken || !organizationId) {
    throw new Error('LinkedIn credentials not configured');
  }

  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content.content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    }),
  });

  const data = await response.json();

  if (data.status && data.status >= 400) {
    throw new Error(`LinkedIn API error: ${data.message}`);
  }

  const postId = data.id;

  return {
    post_id: postId,
    post_url: `https://linkedin.com/feed/update/${postId}`,
  };
}
