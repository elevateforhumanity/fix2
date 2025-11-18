// app/docs/api/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // SwaggerUI will mount itself
    SwaggerUI({
      domNode: ref.current,
      url: '/api/openapi',
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Elevate for Humanity API Documentation
          </h1>
          <p className="text-slate-600">
            REST API documentation for the Elevate workforce training and LMS platform.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </a>
            <a
              href="/api/openapi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View OpenAPI JSON
            </a>
          </div>
        </div>
      </div>

      {/* Swagger UI Container */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div ref={ref} />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
