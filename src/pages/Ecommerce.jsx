/*
  Copyright (c) 2025 Elevate for Humanity
  Commercial License. No resale, sublicensing, or redistribution allowed.
  See LICENSE file for details.
*/
import React from "react";
import AppLayout from "../layouts/AppLayout";

export default function Ecommerce() {
  return (
    <AppLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>E-commerce</h1>
        <div style={{ backgroundColor: "#fff", padding: 24, borderRadius: 8, border: "1px solid #e0e0e0" }}>
          <p style={{ fontSize: 16, color: "#666" }}>Manage e-commerce features and transactions.</p>
        </div>
      </div>
    </AppLayout>
  );
}
