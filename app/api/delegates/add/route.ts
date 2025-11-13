import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized',{status:401});
  
  const { data: prof } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  if (prof?.role !== 'admin') return new Response('Forbidden',{status:403});

  const body = await req.json();
  const { program_holder_id, email } = body;
  
  if (!program_holder_id || !email) {
    return new Response('Missing fields',{status:400});
  }

  // Find user by email
  const { data: u } = await supabase
    .from('auth.users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  
  if (!u) {
    return new Response('User not found (create account first)',{status:400});
  }

  // Create delegate record
  const { error: delError } = await supabase.from('delegates').insert({
    program_holder_id,
    user_id: u.id
  });

  if (delError) {
    return new Response(delError.message, {status:500});
  }

  // Update user profile with program holder and partner role
  await supabase.from('user_profiles').upsert({
    user_id: u.id,
    program_holder_id: program_holder_id,
    role: 'partner'
  }, {
    onConflict: 'user_id'
  });

  return Response.json({ ok:true });
}
