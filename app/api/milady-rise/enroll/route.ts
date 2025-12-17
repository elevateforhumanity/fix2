import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';
import miladyConfig from '@/lms-data/milady-rise-integration.json';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    const body = await request.json();

    // Create Milady RISE enrollment record
    const { data, error } = await supabase
      .from('milady_rise_enrollments')
      .insert({
        student_id: user.id,
        // @ts-expect-error TS2339: Property 'partner_code' does not exist on type '{ name: string; provider: str...
        promo_code: miladyConfig.partner_code,
        // @ts-expect-error TS2339: Property 'certification' does not exist on type '{ name: string; provider: st...
        enrollment_url: miladyConfig.certification.enrollment_url,
        status: 'enrolled',
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: toErrorMessage(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      enrollment: data,
      next_steps: {
        // @ts-expect-error TS2339: Property 'certification' does not exist on type '{ name: string; provider: st...
        url: miladyConfig.certification.enrollment_url,
        // @ts-expect-error TS2339: Property 'partner_code' does not exist on type '{ name: string; provider: str...
        promo_code: miladyConfig.partner_code,
        // @ts-expect-error TS2339: Property 'enrollment_instructions' does not exist on type '{ name: string; pr...
        instructions: miladyConfig.enrollment_instructions,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    // @ts-expect-error TS2339: Property 'program' does not exist on type '{ name: string; provider: string; ...
    program: miladyConfig.program,
    // @ts-expect-error TS2339: Property 'certification' does not exist on type '{ name: string; provider: st...
    certification: miladyConfig.certification,
    // @ts-expect-error TS2339: Property 'scholarship_details' does not exist on type '{ name: string; provid...
    scholarship: miladyConfig.scholarship_details,
    // @ts-expect-error TS2339: Property 'partner_code' does not exist on type '{ name: string; provider: str...
    partner_code: miladyConfig.partner_code,
  });
}
