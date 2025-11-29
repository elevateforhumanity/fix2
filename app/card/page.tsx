'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CardHolderPortalPage() {
  const [showCardNumber, setShowCardNumber] = useState(false);

  // Mock data - replace with real data from Supabase
  const cardData = {
    holderName: 'JOHN SMITH',
    last4: '4532',
    fullNumber: '4532 1234 5678 4532',
    cvv: '123',
    expiry: '12/27',
    balance: 245.67,
    status: 'active',
    issuedDate: '2024-01-15',
  };

  const recentTransactions = [
    { id: 1, date: '2024-11-28', merchant: 'Walmart', amount: -45.23, type: 'purchase', balance: 245.67 },
    { id: 2, date: '2024-11-27', merchant: 'ATM Withdrawal', amount: -40.00, fee: -2.50, type: 'atm', balance: 290.90 },
    { id: 3, date: '2024-11-26', merchant: 'Payroll Load', amount: 350.00, fee: -1.50, type: 'load', balance: 333.40 },
    { id: 4, date: '2024-11-25', merchant: 'Gas Station', amount: -35.00, type: 'purchase', balance: -15.10 },
    { id: 5, date: '2024-11-24', merchant: 'Grocery Store', amount: -67.89, type: 'purchase', balance: 19.90 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Payroll Card</h1>
            <p className="text-sm text-slate-400">Elevate Prepaid Debit Card</p>
          </div>
          <Link
            href="/card/settings"
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
          >
            Settings
          </Link>
        </div>

        {/* Card Display */}
        <div className="mb-6">
          <div className="relative h-56 w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6 shadow-2xl">
            {/* Card Chip */}
            <div className="mb-4 h-10 w-12 rounded bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80" />
            
            {/* Card Number */}
            <div className="mb-4">
              {showCardNumber ? (
                <div className="font-mono text-xl tracking-wider text-white">
                  {cardData.fullNumber}
                </div>
              ) : (
                <div className="font-mono text-xl tracking-wider text-white">
                  •••• •••• •••• {cardData.last4}
                </div>
              )}
              <button
                onClick={() => setShowCardNumber(!showCardNumber)}
                className="mt-1 text-xs text-white/80 hover:text-white"
              >
                {showCardNumber ? 'Hide' : 'Show'} Number
              </button>
            </div>

            {/* Card Details */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-white/70">CARDHOLDER</div>
                <div className="font-semibold text-white">{cardData.holderName}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/70">EXPIRES</div>
                <div className="font-semibold text-white">{cardData.expiry}</div>
              </div>
            </div>

            {/* Card Logo */}
            <div className="absolute right-6 top-6 text-2xl font-bold text-white">
              ELEVATE
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-600">Available Balance</div>
              <div className="mt-1 text-4xl font-bold text-slate-900">
                ${cardData.balance.toFixed(2)}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/card/load"
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
              >
                Add Money
              </Link>
              <Link
                href="/card/transfer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Transfer
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Link
            href="/card/load"
            className="rounded-lg bg-white p-4 text-center shadow hover:shadow-md"
          >
            <div className="text-3xl">💰</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">Add Money</div>
          </Link>
          <Link
            href="/card/transactions"
            className="rounded-lg bg-white p-4 text-center shadow hover:shadow-md"
          >
            <div className="text-3xl">📊</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">Transactions</div>
          </Link>
          <Link
            href="/card/lock"
            className="rounded-lg bg-white p-4 text-center shadow hover:shadow-md"
          >
            <div className="text-3xl">🔒</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">Lock Card</div>
          </Link>
          <Link
            href="/card/support"
            className="rounded-lg bg-white p-4 text-center shadow hover:shadow-md"
          >
            <div className="text-3xl">💬</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">Support</div>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl bg-white shadow-lg">
          <div className="border-b border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
              <Link
                href="/card/transactions"
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                View All →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      tx.type === 'load' ? 'bg-green-100' :
                      tx.type === 'atm' ? 'bg-blue-100' :
                      'bg-slate-100'
                    }`}>
                      {tx.type === 'load' ? '💰' :
                       tx.type === 'atm' ? '🏧' :
                       '🛒'}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{tx.merchant}</div>
                      <div className="text-xs text-slate-500">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </div>
                    {tx.fee && (
                      <div className="text-xs text-red-600">
                        Fee: ${Math.abs(tx.fee).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Information */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Fee Schedule</h3>
          <div className="mt-3 grid gap-2 text-xs md:grid-cols-3">
            <div>
              <span className="text-slate-600">Monthly Fee:</span>{' '}
              <span className="font-semibold text-slate-900">$4.95</span>
            </div>
            <div>
              <span className="text-slate-600">Load Fee:</span>{' '}
              <span className="font-semibold text-slate-900">$1.50</span>
            </div>
            <div>
              <span className="text-slate-600">ATM Withdrawal:</span>{' '}
              <span className="font-semibold text-slate-900">$2.50</span>
            </div>
            <div>
              <span className="text-slate-600">Balance Inquiry:</span>{' '}
              <span className="font-semibold text-slate-900">$0.50</span>
            </div>
            <div>
              <span className="text-slate-600">Card Replacement:</span>{' '}
              <span className="font-semibold text-slate-900">$5.00</span>
            </div>
            <div>
              <span className="text-slate-600">POS Purchase:</span>{' '}
              <span className="font-semibold text-green-600">FREE</span>
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/card/fees"
              className="text-xs font-medium text-orange-600 hover:text-orange-700"
            >
              View Full Fee Schedule →
            </Link>
          </div>
        </div>

        {/* Card Status */}
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <div className="text-xl">✅</div>
            <div>
              <div className="text-sm font-semibold text-green-900">Card Active</div>
              <div className="text-xs text-green-700">
                Your card is active and ready to use. Issued on {cardData.issuedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
