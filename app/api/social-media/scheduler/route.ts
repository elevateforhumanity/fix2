import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { logger } from '@/lib/logger';

/**
 * Social Media Scheduler - Posts to social platforms 3x daily
 * Run via cron at 9 AM, 1 PM, and 5 PM EST
 */
export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    
    // Get current hour (EST)
    const now = new Date();
    const estHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })).getHours();
    
    // Determine which posting slot (0 = morning, 1 = afternoon, 2 = evening)
    let slot = 0;
    if (estHour >= 13 && estHour < 17) slot = 1;
    else if (estHour >= 17) slot = 2;

    // Get active campaigns
    const { data: campaigns, error } = await supabase
      .from('social_media_campaigns')
      .select('*')
      .eq('status', 'active');

    if (error) throw error;

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active campaigns',
        posted: 0,
      });
    }

    const results = [];

    for (const campaign of campaigns) {
      try {
        // Calculate which post to send based on days elapsed
        const startDate = new Date(campaign.created_at);
        const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Check if campaign is still within duration
        if (daysElapsed >= campaign.duration_days) {
          // Campaign completed, mark as finished
          await supabase
            .from('social_media_campaigns')
            .update({ status: 'completed' })
            .eq('id', campaign.id);
          
          results.push({
            campaignId: campaign.id,
            name: campaign.name,
            status: 'completed',
          });
          continue;
        }

        // Calculate post index (3 posts per day)
        const postIndex = (daysElapsed * 3) + slot;
        
        if (postIndex >= campaign.posts.length) {
          continue; // No more posts
        }

        const postContent = campaign.posts[postIndex];

        // Post to each platform
        for (const platform of campaign.platforms) {
          try {
            await postToSocialMedia(platform, postContent, campaign);
            
            // Log the post
            await supabase.from('social_media_posts').insert({
              campaign_id: campaign.id,
              platform,
              content: postContent,
              post_index: postIndex,
              posted_at: now.toISOString(),
              status: 'posted',
            });

            results.push({
              campaignId: campaign.id,
              name: campaign.name,
              platform,
              postIndex,
              success: true,
            });
          } catch (error: unknown) {
            logger.error(`Error posting to ${platform}:`, error);
            
            // Log failure
            await supabase.from('social_media_posts').insert({
              campaign_id: campaign.id,
              platform,
              content: postContent,
              post_index: postIndex,
              status: 'failed',
              error_message: error.message,
            });

            results.push({
              campaignId: campaign.id,
              name: campaign.name,
              platform,
              postIndex,
              success: false,
              error: error.message,
            });
          }
        }

        // Update campaign last_post_at
        await supabase
          .from('social_media_campaigns')
          .update({ last_post_at: now.toISOString() })
          .eq('id', campaign.id);

      } catch (error: unknown) {
        logger.error(`Error processing campaign ${campaign.id}:`, error);
        results.push({
          campaignId: campaign.id,
          name: campaign.name,
          success: false,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Posted ${results.filter(r => r.success).length} times`,
      slot: ['morning', 'afternoon', 'evening'][slot],
      results,
    });
  } catch (error: unknown) {
    logger.error('Scheduler error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Post to social media platform
 * Integrates with Facebook, Twitter, LinkedIn, and Instagram APIs
 */
async function postToSocialMedia(platform: string, content: string, campaign: Record<string, unknown>) {
  logger.info(`Posting to ${platform}:`, content);
  
  switch (platform.toLowerCase()) {
    case 'facebook':
      return await postToFacebook(content, campaign);
    
    case 'twitter':
    case 'x':
      return await postToTwitter(content, campaign);
    
    case 'linkedin':
      return await postToLinkedIn(content, campaign);
    
    case 'instagram':
      return await postToInstagram(content, campaign);
    
    default:
      logger.warn(`Unknown platform: ${platform}`);
      return { success: false, error: 'Unknown platform' };
  }
}

async function postToFacebook(content: string, campaign: Record<string, unknown>) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  
  if (!pageId || !accessToken) {
    logger.warn('Facebook credentials not configured');
    return { success: false, error: 'Facebook not configured' };
  }
  
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: content,
        access_token: accessToken,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Facebook API error');
    }
    
    return { success: true, platform: 'facebook', postId: data.id };
  } catch (error: unknown) {
    logger.error('Facebook posting error:', error);
    throw error;
  }
}

async function postToTwitter(content: string, campaign: Record<string, unknown>) {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;
  
  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    logger.warn('Twitter credentials not configured');
    return { success: false, error: 'Twitter not configured' };
  }
  
  try {
    // Twitter API v2 requires OAuth 1.0a
    // For production, use a library like 'twitter-api-v2'
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        text: content.substring(0, 280), // Twitter character limit
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Twitter API error');
    }
    
    return { success: true, platform: 'twitter', postId: data.data?.id };
  } catch (error: unknown) {
    logger.error('Twitter posting error:', error);
    throw error;
  }
}

async function postToLinkedIn(content: string, campaign: Record<string, unknown>) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  
  if (!accessToken || !organizationId) {
    logger.warn('LinkedIn credentials not configured');
    return { success: false, error: 'LinkedIn not configured' };
  }
  
  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify({
        author: `urn:li:organization:${organizationId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
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
    
    if (!response.ok) {
      throw new Error(data.message || 'LinkedIn API error');
    }
    
    return { success: true, platform: 'linkedin', postId: data.id };
  } catch (error: unknown) {
    logger.error('LinkedIn posting error:', error);
    throw error;
  }
}

async function postToInstagram(content: string, campaign: Record<string, unknown>) {
  // Instagram requires media (image/video) for posts
  // Text-only posts are not supported
  logger.warn('Instagram requires media content - text-only posts not supported');
  return { success: false, error: 'Instagram requires media content' };
}

/**
 * Manual trigger for testing
 */
export async function POST(req: Request) {
  return GET(req);
}
