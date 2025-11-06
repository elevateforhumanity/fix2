import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function DurableConsole() {
  const [email, setEmail] = useState('Elevateforhumanity@gmail.com');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  const injectEnrollmentScript = async () => {
    setLoading(true);
    setStatus('Starting injection...');
    addLog('🚀 Starting Durable enrollment injection');

    try {
      // Call Netlify function to trigger Puppeteer
      const response = await fetch('/.netlify/functions/durable-inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('✅ Enrollment script injected successfully!');
        addLog('✅ Script injected to Durable site');
        addLog('✅ Enrollment programs now visible');
        addLog('🔗 Check: https://www.elevateforhumanity.org');
      } else {
        setStatus(`❌ ${data.error}`);
        addLog(`❌ ${data.error}`);

        if (data.scriptTag) {
          addLog('📋 Script to add manually:');
          addLog(data.scriptTag);
        }

        if (data.instructions) {
          addLog('');
          addLog('📝 Manual steps:');
          data.instructions.forEach((instruction: string) => {
            addLog(`   ${instruction}`);
          });
        }

        if (data.screenshot) {
          addLog('');
          addLog('📸 Screenshot saved - check console');
          console.log('Durable editor screenshot:', data.screenshot);
        }
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      addLog(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testEnrollmentScript = () => {
    window.open(
      'https://main--elevateforhumanityfix.netlify.app/enrollment-test.html',
      '_blank'
    );
  };

  return (
    <div>
      <Helmet>
        <title>Durable Integration Console | Elevate for Humanity</title>
        <meta
          name="description"
          content="Automated enrollment program injection for Durable.co integration"
        />
      </Helmet>

      <Navigation />

      <div className="section bg-beige-50">
        <div className="container max-w-4xl">
          <div className="card p-8">
            <h1 className="text-3xl font-bold text-brown-900 mb-2">
              🎓 Durable Integration Console
            </h1>
            <p className="text-brown-600 mb-8">
              Automated enrollment program injection for
              www.elevateforhumanity.org
            </p>
            {/* Credentials Section */}
            <div className="mb-8 p-6 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold text-brown-900 mb-4">
                Durable.co Credentials
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your-email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-brown-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            {/* Actions Section */}
            <div className="mb-8 space-y-4">
              <button
                onClick={injectEnrollmentScript}
                disabled={loading || !password}
                className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Injecting...
                  </span>
                ) : (
                  '🚀 Inject Enrollment Script to Durable'
                )}
              </button>
              <button
                onClick={testEnrollmentScript}
                className="w-full btn-outline py-3"
              >
                👁️ Preview Enrollment Script
              </button>
            </div>
            {/* Status Section */}
            {status && (
              <div
                className={`mb-8 p-4 rounded-xl ${
                  status.includes('✅')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                <p className="font-semibold">{status}</p>
              </div>
            )}
            {/* Logs Section */}
            {logs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-brown-900 mb-3">
                  Activity Log
                </h3>
                <div className="bg-brown-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Info Section */}
            <div className="p-6 bg-beige-100 rounded-lg">
              <h3 className="text-lg font-semibold text-brown-900 mb-3">
                ℹ️ How This Works
              </h3>
              <ul className="space-y-2 text-brown-700">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>
                    Autopilot logs into your Durable.co account using Puppeteer
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>
                    Opens the site editor and finds custom code section
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>
                    Injects enrollment script:{' '}
                    <code className="bg-white px-2 py-1 rounded text-sm">
                      enrollment-injector.js
                    </code>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Publishes changes automatically</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">5.</span>
                  <span>
                    Enrollment programs appear on www.elevateforhumanity.org
                  </span>
                </li>
              </ul>
            </div>
            {/* Script Info */}
            <div className="mt-6 p-4 bg-beige-50 rounded-lg">
              <p className="text-sm text-brown-600">
                <strong>Script URL:</strong>{' '}
                <a
                  href="https://main--elevateforhumanityfix.netlify.app/enrollment-injector.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  enrollment-injector.js
                </a>
              </p>
              <p className="text-sm text-brown-600 mt-2">
                <strong>Test Page:</strong>{' '}
                <a
                  href="https://main--elevateforhumanityfix.netlify.app/enrollment-test.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  enrollment-test.html
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
