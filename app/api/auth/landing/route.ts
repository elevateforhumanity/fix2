// app/api/auth/landing/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ redirectTo: '/auth/login' });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role as string | undefined;

  let redirectTo = '/';

  switch (role) {
    case 'student':
      redirectTo = '/app/student/dashboard';
      break;
    case 'program_holder':
      redirectTo = '/app/program-holder/dashboard';
      break;
    case 'instructor':
      redirectTo = '/app/program-holder/dashboard';
      break;
    case 'admin':
      redirectTo = '/app/admin/dashboard';
      break;
    case 'grant_client':
      redirectTo = '/app/grants';
      break;
    case 'vita_staff':
      redirectTo = '/app/vita';
      break;
    case 'supersonic_staff':
      redirectTo = '/app/supersonic';
      break;
    default:
      redirectTo = '/app/student/dashboard';
  }

  return NextResponse.json({ redirectTo });
}
