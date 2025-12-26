'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

export default function ReferralProgram({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink = `https://www.elevateforhumanity.org/apply?ref=${userId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-8 h-8 text-blue-600" />
        <h3 className="text-2xl font-bold">Refer a Friend</h3>
      </div>
      
      <p className="text-gray-700 mb-6">
        Share Elevate for Humanity with friends and family. When they enroll, you both get rewards!
      </p>

      <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
        <code className="text-sm text-gray-600 flex-1 truncate">{referralLink}</code>
        <button
          onClick={copyLink}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">$50</div>
          <div className="text-sm text-gray-600">You get when they enroll</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">$50</div>
          <div className="text-sm text-gray-600">They get off first month</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
          <div className="text-sm text-gray-600">Unlimited referrals</div>
        </div>
      </div>
    </div>
  );
}
