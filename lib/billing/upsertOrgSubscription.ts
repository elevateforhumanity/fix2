import { SupabaseClient } from '@supabase/supabase-js';

export interface SubscriptionPayload {
  provider?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  plan:string;
  status:string;
  seats?:number;
  periodEnd?:string;
}

export async function upsertOrgSubscription(supabase:SupabaseClient,orgId:string,payload:SubscriptionPayload):Promise<void>{
 const {error}=await supabase.from('organization_subscriptions').upsert({
   organization_id:orgId,
   provider:payload.provider||'paypal',
   provider_customer_id:payload.providerCustomerId||null,
   provider_subscription_id:payload.providerSubscriptionId||null,
   plan:payload.plan,status:payload.status,seats:payload.seats,current_period_end:payload.periodEnd
 },{onConflict:'organization_id'});
 if(error) throw new Error('Failed to upsert subscription: '+error.message);
}
