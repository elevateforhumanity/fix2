import { redirect } from 'next/navigation';
export default async function CheckoutPage({ searchParams }: { searchParams: { plan?: string } }) {
 const plan=searchParams.plan||'starter';
 redirect('/checkout/payment?name='+encodeURIComponent(plan+' plan')+'&program='+encodeURIComponent(plan));
}
