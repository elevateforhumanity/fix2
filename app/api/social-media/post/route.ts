import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/social-media/post
 * Post content to social media platforms
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { platform, content, title, media_url, scheduled_for } = body;

    if (!platform || !content) {
      return NextResponse.json(
        { error: 'Platform and content are required' },
        { status: 400 }
      );
    }

    // Validate platform
    const validPlatforms = ['linkedin', 'facebook', 'youtube', 'instagram', 'twitter'];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    // Check if platform is enabled
    const platformEnabled = process.env[`SOCIAL_MEDIA_${platform.toUpperCase()}_ENABLED`] === 'true';
    if (!platformEnabled) {
      return NextResponse.json(
        { error: `${platform} is not enabled` },
        { status: 400 }
      );
    }

    // Post immediately or schedule
    if (scheduled_for) {
      // Schedule post
      const { data: scheduledPost, error: scheduleError } = await supabase
        .from('social_media_posts')
        .insert({
          platform,
          title,
          content,
          media_url,
          scheduled_for,
          status: 'scheduled'
        })
        .select()
        .single();

      if (scheduleError) {
        return NextResponse.json(
          { error: 'Failed to schedule post', details: scheduleError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Post scheduled successfully',
        post: scheduledPost
      });
    } else {
      // Post immediately
      let result;
      switch (platform) {
        case 'linkedin':
          result = await postToLinkedIn({ title, content, media_url });
          break;
        case 'facebook':
          result = await postToFacebook({ content, media_url });
          break;
        case 'youtube':
          result = await postToYouTube({ title, content, media_url });
          break;
        default:
          return NextResponse.json(
            { error: 'Platform not implemented yet' },
            { status: 501 }
          );
      }

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      // Save to database
      const { data: savedPost } = await supabase
        .from('social_media_posts')
        .insert({
          platform,
          title,
          content,
          media_url,
          posted_at: new Date().toISOString(),
          status: 'posted',
          platform_post_id: result.post_id
        })
        .select()
        .single();

      return NextResponse.json({
        success: true,
        message: 'Posted successfully',
        post: savedPost,
        platform_url: result.url
      });
    }
  } catch (error: any) {
    console.error('Social media post error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Post to LinkedIn
 */
async function postToLinkedIn({ title, content, media_url }: any) {
  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;

    if (!accessToken || !organizationId) {
      return { success: false, error: 'LinkedIn credentials not configured' };
    }

    // LinkedIn API v2
    const postData: any = {
      author: `urn:li:organization:${organizationId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: `${title}\n\n${content}`
          },
          shareMediaCategory: media_url ? 'IMAGE' : 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    if (media_url) {
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
        status: 'READY',
        originalUrl: media_url
      }];
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `LinkedIn API error: ${error}` };
    }

    const result = await response.json();
    return {
      success: true,
      post_id: result.id,
      url: `https://www.linkedin.com/feed/update/${result.id}`
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Post to Facebook
 */
async function postToFacebook({ content, media_url }: any) {
  try {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;

    if (!accessToken || !pageId) {
      return { success: false, error: 'Facebook credentials not configured' };
    }

    const endpoint = media_url
      ? `https://graph.facebook.com/v18.0/${pageId}/photos`
      : `https://graph.facebook.com/v18.0/${pageId}/feed`;

    const params = new URLSearchParams({
      access_token: accessToken,
      message: content
    });

    if (media_url) {
      params.append('url', media_url);
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      method: 'POST'
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: `Facebook API error: ${JSON.stringify(error)}` };
    }

    const result = await response.json();
    return {
      success: true,
      post_id: result.id,
      url: `https://www.facebook.com/${pageId}/posts/${result.id}`
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Post to YouTube (Community Post)
 */
async function postToYouTube({ title, content, media_url }: any) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return { success: false, error: 'YouTube credentials not configured' };
    }

    // Note: YouTube Community Posts require OAuth 2.0
    // This is a simplified version - full implementation needs OAuth flow
    
    return {
      success: false,
      error: 'YouTube posting requires OAuth 2.0 setup. Please configure refresh token.'
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * GET /api/social-media/post
 * Get scheduled and posted content
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');

    let query = supabase
      .from('social_media_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (platform) {
      query = query.eq('platform', platform);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch posts', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
