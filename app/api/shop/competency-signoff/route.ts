import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req:Request){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await req.json();
  const {apprenticeId,programId,competencyId,supervisorName,supervisorTitle,dateObserved,hoursLogged,notes}=body||{};
  if(!apprenticeId||!programId||!competencyId||!supervisorName||!dateObserved) return NextResponse.json({error:'Missing required fields'},{status:400});

  const {data:shops}=await supabase.from('host_shops').select('id,name').eq('owner_id',user.id);
  const ids=(shops??[]).map(s=>s.id);
  if(!ids.length) return NextResponse.json({error:'No host shop access'},{status:403});
  const {data:assignment}=await supabase.from('host_shop_apprentices').select('id,host_shop_id').eq('apprentice_id',apprenticeId).in('host_shop_id',ids).maybeSingle();
  if(!assignment) return NextResponse.json({error:'Apprentice is not assigned to your host shop'},{status:403});

  const {data:standard}=await supabase.from('apprenticeship_standard_competencies').select('competency_key').eq('competency_key',competencyId).maybeSingle();
  if(!standard) return NextResponse.json({error:'Competency is not in the registered standard'},{status:400});

  const {error}=await supabase.from('ojt_competency_signoffs').insert({
    student_id:apprenticeId,program_id:programId,competency_id:competencyId,
    employer_name:(shops??[]).find(s=>s.id===assignment.host_shop_id)?.name||'Host Shop',
    supervisor_name:supervisorName,supervisor_title:supervisorTitle||null,
    date_observed:dateObserved,date_verified:new Date().toISOString().slice(0,10),
    hours_logged:Number.isFinite(hoursLogged)?hoursLogged:0,status:'verified',notes:notes||null
  });
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({ok:true});
}
