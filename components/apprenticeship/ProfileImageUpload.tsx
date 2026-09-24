'use client';
import { useState } from 'react';

export default function ProfileImageUpload({ kind, currentUrl }: { kind:'student'|'host-shop'|'program-holder'; currentUrl?:string|null }) {
 const [url,setUrl]=useState(currentUrl||''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 async function upload(file:File){
  setBusy(true);setError('');
  const fd=new FormData();fd.append('file',file);fd.append('kind',kind);
  const res=await fetch('/api/profile-image',{method:'POST',body:fd});
  const json=await res.json().catch(()=>({}));
  if(!res.ok){setError(json.error||'Upload failed');setBusy(false);return;}
  setUrl(json.url);setBusy(false);location.reload();
 }
 return <div className="rounded-xl border bg-white p-5">
  <div className="flex items-center gap-4">
   <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-100">{url?<img src={url} alt={kind==='host-shop'?'Host shop':kind==='program-holder'?'Program holder':'Profile'} className="h-full w-full object-cover"/>:<div className="flex h-full items-center justify-center text-xs text-slate-500">No image</div>}</div>
   <div className="flex-1"><h3 className="font-bold">{kind==='host-shop'?'Shop image or logo':kind==='program-holder'?'Organization logo':'Your profile photo'}</h3><p className="mt-1 text-sm text-slate-600">{kind==='host-shop'?'Upload your shop logo, storefront, team, or professional shop photo. This becomes your dashboard hero image.':kind==='program-holder'?'Upload your organization or training-provider logo. It will identify your program-holder portal.':'Upload a clear, professional photo of yourself for your apprenticeship profile.'}</p>
    <label className="mt-3 inline-flex cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">{busy?'Uploading…':'Choose image'}<input disabled={busy} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)upload(f)}}/></label>{error&&<p className="mt-2 rounded bg-red-50 p-2 text-xs font-medium text-red-700">{error}</p>}<p className="mt-2 text-xs text-slate-500">Images are checked automatically. If an upload is rejected, the reason appears here so you can correct it and upload again.</p></div>
  </div>
 </div>;
}
