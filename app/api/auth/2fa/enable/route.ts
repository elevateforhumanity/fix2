import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { enable2FA } from '@/lib/auth/two-factor';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    const enabled = await enable2FA(user.id, token);

    if (!enabled) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error: any) {
    console.error('Error enabling 2FA:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enable 2FA' },
      { status: 500 }
    );
  }
}
