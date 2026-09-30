'use client';
import { CommercePayButton } from '@/components/payments/CommercePayButton';

interface CheckoutFlowProps {courseId:string;courseName:string;price:number;userId:string;onSuccess:(enrollmentId:string)=>void;}
export default function CheckoutFlow({courseId,courseName,price}:CheckoutFlowProps){
  return <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-bold">Review Your Order</h2>
    <div className="mb-6 flex justify-between border-b pb-4"><span>{courseName}</span><strong>${price.toFixed(2){'}'}</strong></div>
    <CommercePayButton amount={price} name={courseName} reference={courseId} courseId={courseId} fulfillmentType="course">Continue to PayPal</CommercePayButton>
  </div>;
}
