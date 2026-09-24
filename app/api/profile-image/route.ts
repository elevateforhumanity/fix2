import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req:Request){
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser();
 if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const fd=await req.formData(); const file=fd.get('file'); const kind=String(fd.get('kind')||'');
 if(!(file instanceof File)||!['student','host-shop','program-holder'].includes(kind))return NextResponse.json({error:'Image and profile type are required'},{status:400});
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))return NextResponse.json({error:'Use JPG, PNG, or WebP'},{status:400});
 if(file.size>5*1024*1024)return NextResponse.json({error:'Image must be 5 MB or smaller'},{status:400});
 const ext=file.type==='image/png'?'png':file.type==='image/webp'?'webp':'jpg';
 const bucket=kind==='host-shop'?'images':kind==='program-holder'?'employer-logos':'profile-photos';
 const path=kind==='host-shop'?'host-shops/'+user.id+'/hero.'+ext:kind==='program-holder'?'program-holders/'+user.id+'/logo.'+ext:'apprentices/'+user.id+'/profile.'+ext;
 const {error:uploadError}=await supabase.storage.from(bucket).upload(path,file,{upsert:true,contentType:file.type});
 if(uploadError)return NextResponse.json({error:uploadError.message},{status:500});
 const {data:pub}=supabase.storage.from(bucket).getPublicUrl(path); const url=pub.publicUrl;
 if(kind==='student'){
  const {error}=await supabase.from('profiles').update({avatar_url:url}).eq('id',user.id); if(error)return NextResponse.json({error:error.message},{status:500});
 }else if(kind==='program-holder'){
  const {error}=await supabase.from('profiles').update({company_logo:url}).eq('id',user.id); if(error)return NextResponse.json({error:error.message},{status:500});
 }else{
  const {data:shop}=await supabase.from('host_shops').select('id').eq('owner_id',user.id).limit(1).maybeSingle();
  if(!shop)return NextResponse.json({error:'No host shop is linked to this account'},{status:403});
  const {error}=await supabase.from('host_shops').update({image_url:url}).eq('id',shop.id);if(error)return NextResponse.json({error:error.message},{status:500});
 }
 return NextResponse.json({ok:true,url});
}
