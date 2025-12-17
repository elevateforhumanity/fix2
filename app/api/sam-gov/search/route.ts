import { NextRequest, NextResponse } from 'next/server';
import { searchWorkforceOpportunities, searchOpportunities } from '@/lib/integrations/sam-gov';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'workforce';
    const state = searchParams.get('state') || 'IN';

    let opportunities;
    
    if (type === 'workforce') {
      opportunities = await searchWorkforceOpportunities(state);
    } else {
      const keyword = searchParams.get('keyword') || '';
      const naics = searchParams.get('naics') || '';
      
      opportunities = await searchOpportunities({
        keyword,
        naics,
        state,
        limit: 25,
      });
    }

    return NextResponse.json({
      ok: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error: unknown) {
    logger.error('SAM.gov search error:', toError(error));
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to search SAM.gov' },
      { status: 500 }
    );
  }
}
