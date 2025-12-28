'use client';

import { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [info, setInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    // Capture console errors
    const originalError = console.error;
    console.error = (...args: any[]) => {
      setErrors(prev => [...prev, args.map(a => String(a)).join(' ')]);
      originalError.apply(console, args);
    };

    // Collect diagnostic info
    setInfo({
      userAgent: navigator.userAgent,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    });

    // Listen for unhandled errors
    const errorHandler = (event: ErrorEvent) => {
      setErrors(prev => [...prev, `Unhandled: ${event.message} at ${event.filename}:${event.lineno}`]);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Diagnostic Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">System Info</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(info, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Errors Captured ({errors.length})</h2>
          {errors.length === 0 ? (
            <p className="text-green-600">✅ No errors detected</p>
          ) : (
            <div className="space-y-2">
              {errors.map((error, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                  <pre className="whitespace-pre-wrap">{error}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Components</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Image Test:</h3>
              <img 
                src="/images/heroes/hero-homepage.jpg" 
                alt="Test" 
                className="w-32 h-32 object-cover rounded"
                onError={(e) => setErrors(prev => [...prev, 'Image failed to load'])}
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Link Test:</h3>
              <a href="/" className="text-blue-600 hover:underline">Go to Homepage</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
