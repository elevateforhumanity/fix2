import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '../layouts/AppLayout';

export default function Integrations() {
  return (
    <AppLayout>
      <Helmet>
        <title>Integrations | Elevate for Humanity</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">Integrations</h1>
        <div className="card">
          <p className="text-brown-600">
            Connect with third-party services and tools.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
