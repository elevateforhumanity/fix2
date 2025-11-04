import React from 'react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Certification Packets</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Packet list will appear here</p>
        <p className="text-sm text-gray-500 mt-2">
          Connect to API at /api/packets to load data
        </p>
      </div>
    </div>
  );
}
