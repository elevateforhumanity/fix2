export type PayPalOrderInput = { invoiceId:string; amount:number; currency?:string; description:string };

function apiBase() {
  return process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';
}

async function accessToken() {
  const id=process.env.PAYPAL_CLIENT_ID;
  const secret=process.env.PAYPAL_CLIENT_SECRET;
  if(!id||!secret) throw new Error('PayPal credentials are not configured');
  const auth=Buffer.from(id+':'+secret).toString('base64');
  const res=await fetch(apiBase()+'/v1/oauth2/token',{
    method:'POST',
    headers:{Authorization:'Basic '+auth,'Content-Type':'application/x-www-form-urlencoded'},
    body:'grant_type=client_credentials',
    cache:'no-store'
  });
  if(!res.ok) throw new Error('PayPal authentication failed');
  return (await res.json()).access_token as string;
}

export async function createPayPalOrder(input:PayPalOrderInput) {
  const token=await accessToken();
  const base=process.env.NEXT_PUBLIC_SITE_URL||'https://www.elevateforhumanity.org';
  const res=await fetch(apiBase()+'/v2/checkout/orders',{
    method:'POST',
    headers:{
      Authorization:'Bearer '+token,
      'Content-Type':'application/json',
      'PayPal-Request-Id':'invoice-'+input.invoiceId
    },
    body:JSON.stringify({
      intent:'CAPTURE',
      purchase_units:[{
        reference_id:input.invoiceId,
        custom_id:input.invoiceId,
        description:input.description,
        amount:{currency_code:(input.currency||'USD').toUpperCase(),value:input.amount.toFixed(2)}
      }],
      payment_source:{paypal:{experience_context:{
        return_url:base+'/api/commerce/paypal/return?invoiceId='+input.invoiceId,
        cancel_url:base+'/checkout/payment?cancelled=1&invoiceId='+input.invoiceId,
        user_action:'PAY_NOW'
      }}}
    })
  });
  if(!res.ok) throw new Error('PayPal order creation failed');
  const order=await res.json();
  return {id:order.id,status:order.status,url:order.links?.find((x:any)=>x.rel==='payer-action'||x.rel==='approve')?.href||null};
}

export async function capturePayPalOrder(orderId:string) {
  const token=await accessToken();
  const res=await fetch(apiBase()+'/v2/checkout/orders/'+orderId+'/capture',{
    method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'}
  });
  if(!res.ok) throw new Error('PayPal capture failed');
  return res.json();
}

export async function verifyPayPalWebhook(headers:Headers,event:any) {
  const webhookId=process.env.PAYPAL_WEBHOOK_ID;
  if(!webhookId) throw new Error('PAYPAL_WEBHOOK_ID is not configured');
  const token=await accessToken();
  const res=await fetch(apiBase()+'/v1/notifications/verify-webhook-signature',{
    method:'POST',
    headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},
    body:JSON.stringify({
      auth_algo:headers.get('paypal-auth-algo'),
      cert_url:headers.get('paypal-cert-url'),
      transmission_id:headers.get('paypal-transmission-id'),
      transmission_sig:headers.get('paypal-transmission-sig'),
      transmission_time:headers.get('paypal-transmission-time'),
      webhook_id:webhookId,
      webhook_event:event
    })
  });
  if(!res.ok) return false;
  return (await res.json()).verification_status==='SUCCESS';
}
