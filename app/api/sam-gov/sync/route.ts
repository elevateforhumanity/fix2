import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { searchWorkforceOpportunities } from '@/lib/integrations/sam-gov';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * SAM.gov Sync Job
 * Fetches opportunities from SAM.gov and saves to database
 * Should be called by cron job daily
 */
export async function POST(request: Request) {
  try {
    // Verify authorization (cron secret or admin)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    // Search for workforce-related opportunities
    const opportunities = await searchWorkforceOpportunities({
      state: 'IN', // Indiana
      limit: 100,
    });

    if (!opportunities || opportunities.length === 0) {
      logger.info('SAM.gov sync: No opportunities found');
      return NextResponse.json({ 
        success: true, 
        synced: 0,
        message: 'No opportunities found'
      });
    }

    // Upsert opportunities to database
    const records = opportunities.map((opp: any) => ({
      sam_id: opp.noticeId || opp.opportunityId || opp.id,
      notice_id: opp.noticeId,
      title: opp.title,
      description: opp.description,
      type: opp.type || 'assistance',
      agency: opp.fullParentPathName || opp.organizationName,
      office: opp.officeAddress?.city,
      naics_code: opp.naicsCode,
      cfda_number: opp.cfdaNumber,
      assistance_listing: opp.assistanceListing,
      posted_date: opp.postedDate,
      response_deadline: opp.responseDeadLine || opp.archiveDate,
      archive_date: opp.archiveDate,
      url: opp.uiLink,
      attachment_url: opp.attachmentLink,
      place_of_performance: opp.placeOfPerformance || {},
      set_aside: opp.typeOfSetAside,
      raw_data: opp,
      last_synced_at: new Date().toISOString(),
    }));

    // Use service role for insert
    const { data, error } = await supabase
      .from('sam_opportunities')
      .upsert(records, {
        onConflict: 'sam_id',
        ignoreDuplicates: false,
      });

    if (error) {
      logger.error('SAM.gov sync error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    logger.info(`SAM.gov sync: ${records.length} opportunities synced`);

    return NextResponse.json({
      success: true,
      synced: records.length,
      opportunities: records.map(r => ({
        id: r.sam_id,
        title: r.title,
        agency: r.agency,
        deadline: r.response_deadline,
      })),
    });

  } catch (error: any) {
    logger.error('SAM.gov sync failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// Allow GET for manual trigger (admin only)
export async function GET(request: Request) {
  return POST(request);
}
