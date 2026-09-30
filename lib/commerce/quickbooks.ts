import crypto from 'crypto';

const QBO_BASE='https://quickbooks.api.intuit.com';

async function token() {
  const client=process.env.INTUIT_CLIENT_ID;
  const secret=process.env.INTUIT_CLIENT_SECRET;
  const refresh=process.env.QUICKBOOKS_REFRESH_TOKEN;
  if(!client||!secret||!refresh) throw new Error('QuickBooks OAuth credentials are not configured');
  const auth=Buffer.from(client+':'+secret).toString('base64');
  const res=await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',{
    method:'POST',
    headers:{Authorization:'Basic '+auth,'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
    body:new URLSearchParams({grant_type:'refresh_token',refresh_token:refresh}),
    cache:'no-store'
  });
  if(!res.ok) throw new Error('QuickBooks token refresh failed');
  return res.json() as Promise<{access_token:string,refresh_token?:string}>;
}

async function qbo(path:string,init:RequestInit={}) {
  const realm=process.env.QUICKBOOKS_REALM_ID;
  if(!realm) throw new Error('QUICKBOOKS_REALM_ID is not configured');
  const t=await token();
  const res=await fetch(QBO_BASE+'/v3/company/'+realm+path,{
    ...init,
    headers:{Authorization:'Bearer '+t.access_token,Accept:'application/json','Content-Type':'application/json',...(init.headers||{})},
    cache:'no-store'
  });
  if(!res.ok) throw new Error('QuickBooks API request failed');
  return res.json();
}

export async function findOrCreateCustomer(input:{email:string,name?:string}) {
  const safe=input.email.replace(/'/g,"\\'");
  const data=await qbo('/query?query='+encodeURIComponent("select * from Customer where PrimaryEmailAddr = '"+safe+"'"));
  const hit=data?.QueryResponse?.Customer?.[0];
  if(hit) return hit;
  const created=await qbo('/customer',{method:'POST',body:JSON.stringify({DisplayName:input.name||input.email,PrimaryEmailAddr:{Address:input.email}})});
  return created.Customer;
}

export async function findOrCreateService(name:string,unitPrice:number) {
  const safe=name.replace(/'/g,"\\'");
  const data=await qbo('/query?query='+encodeURIComponent("select * from Item where Name = '"+safe+"'"));
  const hit=data?.QueryResponse?.Item?.[0];
  if(hit) return hit;
  const created=await qbo('/item',{method:'POST',body:JSON.stringify({Name:name.slice(0,100),Type:'Service',UnitPrice:unitPrice,IncomeAccountRef:{value:process.env.QUICKBOOKS_INCOME_ACCOUNT_ID||'1'}})});
  return created.Item;
}

export async function createQuickBooksInvoice(input:{email:string,name?:string,description:string,amount:number,dueDate?:string}) {
  const customer=await findOrCreateCustomer({email:input.email,name:input.name});
  const item=await findOrCreateService(input.description,input.amount);
  const body:any={
    CustomerRef:{value:customer.Id},
    Line:[{Amount:input.amount,DetailType:'SalesItemLineDetail',Description:input.description,SalesItemLineDetail:{ItemRef:{value:item.Id},UnitPrice:input.amount,Qty:1}}],
    BillEmail:{Address:input.email}
  };
  if(input.dueDate) body.DueDate=input.dueDate;
  const created=await qbo('/invoice',{method:'POST',body:JSON.stringify(body)});
  return created.Invoice;
}

export async function getQuickBooksInvoice(id:string) {
  const data=await qbo('/invoice/'+id,{method:'GET'});
  return data.Invoice;
}

export function verifyQuickBooksWebhook(rawBody:string,signature:string|null) {
  const verifier=process.env.QUICKBOOKS_WEBHOOK_VERIFIER_TOKEN;
  if(!verifier||!signature) return false;
  const digest=crypto.createHmac('sha256',verifier).update(rawBody).digest('base64');
  const a=Buffer.from(digest);
  const b=Buffer.from(signature);
  return a.length===b.length&&crypto.timingSafeEqual(a,b);
}

export async function createQuickBooksPayment(input:{invoiceId:string,customerId:string,amount:number}) {
  const created=await qbo('/payment',{method:'POST',body:JSON.stringify({
    CustomerRef:{value:input.customerId},
    TotalAmt:input.amount,
    Line:[{Amount:input.amount,LinkedTxn:[{TxnId:input.invoiceId,TxnType:'Invoice'}]}]
  })});
  return created.Payment;
}
