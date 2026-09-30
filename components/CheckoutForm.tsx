'use client';
import { CommercePayButton } from '@/components/payments/CommercePayButton';

interface CheckoutFormProps {
  courseId:string;
  courseName:string;
  amount:number;
  currency?:string;
  referralCode?:string;
  onSuccess?:(enrollmentId:string)=>void;
}

export default function CheckoutForm({courseId,courseName,amount,referralCode}:CheckoutFormProps){
  return <div className="space-y-6">
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 font-semibold text-gray-900">Order Summary</h3>
      <div className="flex justify-between"><span>{courseName}</span><strong>${amount.toFixed(2){'}'}</strong></div>
      {referralCode&&<p className="mt-2 text-sm text-green-700">Referral code will be validated by the commerce system.</p>}
    </div>
    <CommercePayButton amount={amount} name={courseName} reference={courseId} courseId={courseId} fulfillmentType="course">
      Continue with PayPal
    </CommercePayButton>
    <p className="text-center text-xs text-gray-500">Invoice and payment status are recorded through QuickBooks and your Elevate dashboard.</p>
  </div>;
}
