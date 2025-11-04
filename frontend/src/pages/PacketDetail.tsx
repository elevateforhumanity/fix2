import React from 'react';
import { useParams } from 'react-router-dom';

export default function PacketDetail() {
  const { id } = useParams();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Packet Details</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Packet ID: {id}</p>
        <p className="text-sm text-gray-500 mt-2">
          Field editor and file upload will appear here
        </p>
      </div>
    </div>
  );
}
