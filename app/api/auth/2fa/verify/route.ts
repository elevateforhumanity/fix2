import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { verify2FAToken, verifyBackupCode } from '@/lib/auth/two-factor';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token, backupCode } = await request.json();

    let verified = false;

    if (token) {
      verified = await verify2FAToken(user.id, token);
    } else if (backupCode) {
      verified = await verifyBackupCode(user.id, backupCode);
    } else {
      return NextResponse.json(
        { error: 'Token or backup code required' },
        { status: 400 }
      );
    }

    if (!verified) {
      return NextResponse.json(
        { error: 'Invalid token or backup code' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (error: any) {
    console.error('Error verifying 2FA:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify 2FA' },
      { status: 500 }
    );
  }
}
