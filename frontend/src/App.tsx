import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PacketDetail from './pages/PacketDetail';
import AuditTrail from './pages/AuditTrail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Certification Autopilot</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/packets/:id" element={<PacketDetail />} />
          <Route path="/audit" element={<AuditTrail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
