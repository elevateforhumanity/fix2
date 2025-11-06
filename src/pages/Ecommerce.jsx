import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '../layouts/AppLayout';

export default function Ecommerce() {
  return (
    <AppLayout>
      <Helmet>
        <title>E-commerce | Elevate for Humanity</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-brown-900 mb-8">E-commerce</h1>
        <div className="card">
          <p className="text-brown-600">
            Manage e-commerce features and transactions.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
