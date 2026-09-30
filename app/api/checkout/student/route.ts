import { NextResponse } from 'next/server';
export async function POST() {
  return NextResponse.json({ provider: 'commerce', url: '/checkout/payment?program=student-plan' });
}
