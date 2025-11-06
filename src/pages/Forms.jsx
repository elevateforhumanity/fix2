import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '../layouts/AppLayout';

export default function Forms() {
  return (
    <AppLayout>
      <Helmet>
        <title>Form Builder | Elevate for Humanity</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">Form Builder</h1>
        <div className="card">
          <p className="text-brown-600">Create and manage custom forms.</p>
        </div>
      </div>
    </AppLayout>
  );
}
