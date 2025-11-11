/**
 * Approval Badge Component
 * Displays WRG and ETPL approval status
 */

import React from 'react';

export function ApprovalBadge() {
  return (
    <div className="flex gap-2 flex-wrap justify-center items-center">
      <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        WRG Approved Provider
      </span>
      <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        ETPL Listed Programs
      </span>
    </div>
  );
}

export function ApprovalBanner() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg shadow-lg mb-6 text-center">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="text-2xl">🎉</span>
        <span className="font-bold text-lg">Now Approved:</span>
        <span className="text-lg">Workforce Ready Grant (WRG) & ETPL Provider</span>
        <span className="text-2xl">🎉</span>
      </div>
      <p className="text-sm mt-1 opacity-90">
        100% Funded Training Programs Available Now
      </p>
    </div>
  );
}

export default ApprovalBadge;
