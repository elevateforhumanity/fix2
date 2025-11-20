import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/rbac';

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hook = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!hook) {
    return NextResponse.json({ error: 'Deploy hook missing' }, { status: 500 });
  }

  await fetch(hook, { method: 'POST' });

  return NextResponse.json({
    ok: true,
    message: 'Fresh deployment triggered.',
  });
}
