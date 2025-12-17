// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products', details: toErrorMessage(error) },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error: unknown) {
    logger.error('Get products error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: toErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
