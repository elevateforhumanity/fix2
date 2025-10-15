import { useState, useEffect } from 'react';

interface Autopilot {
  name: string;
  endpoint: string;
  capabilities: string[];
  needs: {
    kvNamespaces?: string[];
    r2Buckets?: string[];
    workers?: any[];
  };
}

interface DiagnoseReport {
  token: any;
  resources: {
    kv?: any;
    r2?: any;
    workers?: any;
  };
  timestamp: string;
}

const ORCHESTRATOR_URL = 'https://efh-autopilot-orchestrator.your-subdomain.workers.dev';

export default function OrchestratorAdmin() {
  const [autopilots, setAutopilots] = useState<Autopilot[]>([]);
  const [diagnose, setDiagnose] = useState<DiagnoseReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState('generate_page');

  useEffect(() => {
    loadAutopilots();
    runDiagnose();
  }, []);

  async function loadAutopilots() {
    try {
      const response = await fetch(`${ORCHESTRATOR_URL}/autopilot/list`);
      const data = await response.json();
      setAutopilots(data.autopilots || []);
    } catch (error) {
      console.error('Failed to load autopilots:', error);
    }
  }

  async function runDiagnose() {
    setLoading(true);
    try {
      const response = await fetch(`${ORCHESTRATOR_URL}/autopilot/diagnose`);
      const data = await response.json();
      setDiagnose(data);
    } catch (error) {
      console.error('Failed to diagnose:', error);
    } finally {
      setLoading(false);
    }
  }

  async function ensureInfra() {
    setLoading(true);
    try {
      const response = await fetch(`${ORCHESTRATOR_URL}/autopilot/ensure-infra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          want: {
            kvNamespaces: ['REGISTRY', 'AI_EMPLOYEE_LOGS'],
            r2Buckets: ['efh-assets', 'efh-images', 'efh-pages', 'efh-private']
          }
        })
      });
      const data = await response.json();
      alert(JSON.stringify(data, null, 2));
      runDiagnose();
    } catch (error) {
      console.error('Failed to ensure infra:', error);
      alert('Failed to ensure infrastructure');
    } finally {
      setLoading(false);
    }
  }

  async function runTask() {
    setLoading(true);
    setTaskResult(null);
    try {
      const response = await fetch(`${ORCHESTRATOR_URL}/autopilot/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: selectedTask,
          meta: { pageType: 'home', description: 'Test page' }
        })
      });
      const data = await response.json();
      setTaskResult(data);
    } catch (error) {
      console.error('Failed to run task:', error);
      setTaskResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (hasError: boolean) => {
    return hasError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Autopilot Orchestrator</h1>
        <p className="text-gray-600">Master controller for all AI systems</p>
      </div>

      {/* Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">System Diagnostics</h2>
            <button
              onClick={runDiagnose}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {diagnose ? (
            <div className="space-y-4">
              {/* Token Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">API Token</h3>
                <div className={`px-3 py-2 rounded ${getStatusColor(!!diagnose.token.error)}`}>
                  {diagnose.token.error ? (
                    <span>❌ {JSON.stringify(diagnose.token.error)}</span>
                  ) : (
                    <span>✅ Valid</span>
                  )}
                </div>
              </div>

              {/* KV Namespaces */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">KV Namespaces</h3>
                <div className={`px-3 py-2 rounded ${getStatusColor(!!diagnose.resources.kv?.error)}`}>
                  {diagnose.resources.kv?.error ? (
                    <span>❌ {JSON.stringify(diagnose.resources.kv.error)}</span>
                  ) : (
                    <span>✅ {Array.isArray(diagnose.resources.kv) ? diagnose.resources.kv.length : 0} namespaces</span>
                  )}
                </div>
              </div>

              {/* R2 Buckets */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">R2 Buckets</h3>
                <div className={`px-3 py-2 rounded ${getStatusColor(!!diagnose.resources.r2?.error)}`}>
                  {diagnose.resources.r2?.error ? (
                    <span>❌ {JSON.stringify(diagnose.resources.r2.error)}</span>
                  ) : (
                    <span>✅ {Array.isArray(diagnose.resources.r2) ? diagnose.resources.r2.length : 0} buckets</span>
                  )}
                </div>
              </div>

              {/* Workers */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Workers</h3>
                <div className={`px-3 py-2 rounded ${getStatusColor(!!diagnose.resources.workers?.error)}`}>
                  {diagnose.resources.workers?.error ? (
                    <span>❌ {JSON.stringify(diagnose.resources.workers.error)}</span>
                  ) : (
                    <span>✅ {Array.isArray(diagnose.resources.workers) ? diagnose.resources.workers.length : 0} workers</span>
                  )}
                </div>
              </div>

              <button
                onClick={ensureInfra}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Fixing...' : '🔧 Fix Infrastructure'}
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Loading diagnostics...
            </div>
          )}
        </div>

        {/* Task Runner */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Run Task</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Task
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              <option value="generate_page">Generate Page</option>
              <option value="deploy_page">Deploy Page</option>
              <option value="generate_asset">Generate Asset</option>
              <option value="process_email">Process Email</option>
              <option value="create_lead">Create Lead</option>
              <option value="send_followup">Send Follow-up</option>
              <option value="make_checkout">Make Checkout</option>
              <option value="run_payout_batch">Run Payout Batch</option>
            </select>
          </div>

          <button
            onClick={runTask}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 mb-4"
          >
            {loading ? 'Running...' : 'Run Task'}
          </button>

          {taskResult && (
            <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-64">
              <pre className="text-xs">{JSON.stringify(taskResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Registered Autopilots */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Registered Autopilots ({autopilots.length})</h2>
          <button
            onClick={loadAutopilots}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {autopilots.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No autopilots registered yet. Run the registration script to add them.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {autopilots.map((ap) => (
              <div key={ap.name} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{ap.name}</h3>
                <p className="text-xs text-gray-600 mb-3 truncate">{ap.endpoint}</p>
                
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Capabilities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {ap.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {(ap.needs.kvNamespaces?.length || ap.needs.r2Buckets?.length) && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Needs:</h4>
                    <div className="text-xs text-gray-600">
                      {ap.needs.kvNamespaces?.length && (
                        <div>KV: {ap.needs.kvNamespaces.join(', ')}</div>
                      )}
                      {ap.needs.r2Buckets?.length && (
                        <div>R2: {ap.needs.r2Buckets.join(', ')}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
