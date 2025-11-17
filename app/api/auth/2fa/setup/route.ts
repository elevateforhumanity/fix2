import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { generate2FASecret } from '@/lib/auth/two-factor';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate 2FA secret and QR code
    const twoFactorData = await generate2FASecret(user.id, user.email || '');

    return NextResponse.json({
      secret: twoFactorData.secret,
      qrCode: twoFactorData.qrCode,
      backupCodes: twoFactorData.backupCodes,
    });
  } catch (error: any) {
    console.error('Error setting up 2FA:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}
