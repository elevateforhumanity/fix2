import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Social Media Scheduler - Posts to social platforms 3x daily
 * Run via cron: 0 9,13,17 * * * (9 AM, 1 PM, 5 PM EST)
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
          } catch (error: any) {
            console.error(`Error posting to ${platform}:`, error);
            
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

      } catch (error: any) {
        console.error(`Error processing campaign ${campaign.id}:`, error);
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
  } catch (error: any) {
    console.error('Scheduler error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Post to social media platform
 * TODO: Integrate with actual social media APIs
 */
async function postToSocialMedia(platform: string, content: string, campaign: any) {
  // For now, just log (you'll need to integrate with actual APIs)
  console.log(`Posting to ${platform}:`, content);
  
  // TODO: Integrate with:
  // - Facebook Graph API
  // - Twitter API v2
  // - LinkedIn API
  // - Instagram Graph API
  
  // Example Facebook post:
  // const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message: content,
  //     access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  //   }),
  // });

  // For demo purposes, simulate success
  return { success: true, platform, content };
}

/**
 * Manual trigger for testing
 */
export async function POST(req: Request) {
  return GET(req);
}
