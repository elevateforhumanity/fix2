import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '../layouts/AppLayout';

export default function Vids() {
  return (
    <AppLayout>
      <Helmet>
        <title>Videos | Elevate for Humanity</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">Videos</h1>
        <div className="card">
          <p className="text-brown-600">Browse and manage video content.</p>
        </div>
      </div>
    </AppLayout>
  );
}
