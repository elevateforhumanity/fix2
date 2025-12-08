'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { 
  Zap, 
  Image as ImageIcon, 
  Database, 
  Trash2, 
  Gauge, 
  Search, 
  Rocket,
  BookOpen,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface AutopilotTask {
  id: string;
  name: string;
  description: string;
  icon: any;
  script: string;
  category: 'build' | 'fix' | 'optimize' | 'deploy';
}

const autopilots: AutopilotTask[] = [
  {
    id: 'build-courses',
    name: 'Build Courses',
    description: 'Generate course content from Supabase data with AI',
    icon: BookOpen,
    script: 'build-courses',
    category: 'build'
  },
  {
    id: 'fix-images',
    name: 'Fix Images',
    description: 'Pull missing hero banners and optimize images',
    icon: ImageIcon,
    script: 'fix-images',
    category: 'fix'
  },
  {
    id: 'sync-schema',
    name: 'Sync Database Schema',
    description: 'Update Supabase schema and run migrations',
    icon: Database,
    script: 'sync-schema',
    category: 'fix'
  },
  {
    id: 'clean-repo',
    name: 'Clean Repository',
    description: 'Remove obsolete files and optimize structure',
    icon: Trash2,
    script: 'clean-repo',
    category: 'optimize'
  },
  {
    id: 'performance-audit',
    name: 'Performance Audit',
    description: 'Run Lighthouse and optimize bundle size',
    icon: Gauge,
    script: 'performance-audit',
    category: 'optimize'
  },
  {
    id: 'seo-audit',
    name: 'SEO Audit',
    description: 'Check metadata, sitemaps, and SEO best practices',
    icon: Search,
    script: 'seo-audit',
    category: 'optimize'
  },
  {
    id: 'deploy',
    name: 'Deploy to Production',
    description: 'Build and deploy to Vercel with all checks',
    icon: Rocket,
    script: 'deploy',
    category: 'deploy'
  },
  {
    id: 'clone-repo',
    name: 'Clone Codebase',
    description: 'Create clean repo copy for resale',
    icon: RefreshCw,
    script: 'clone-repo',
    category: 'build'
  }
];

export default function AutopilotsPage() {
  const router = useRouter();

  useEffect(() => {
    // Check admin auth
    fetch('/api/auth/check-admin')
      .then(res => res.json())
      .then(data => {
        if (!data.isAdmin) {
          router.push('/login?redirect=/admin');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const [runningTasks, setRunningTasks] = useState<Set<string>>(new Set());
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [failedTasks, setFailedTasks] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<{ [key: string]: string[] }>({});
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const addLog = (taskId: string, message: string) => {
    setLogs(prev => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), `[${new Date().toLocaleTimeString()}] ${message}`]
    }));
  };

  const runAutopilot = async (task: AutopilotTask) => {
    setRunningTasks(prev => new Set(prev).add(task.id));
    setCompletedTasks(prev => {
      const next = new Set(prev);
      next.delete(task.id);
      return next;
    });
    setFailedTasks(prev => {
      const next = new Set(prev);
      next.delete(task.id);
      return next;
    });
    setSelectedTask(task.id);
    
    addLog(task.id, `Starting ${task.name}...`);

    try {
      const res = await fetch(`/api/autopilots/${task.script}`, {
        method: 'POST'
      });

      if (res.ok) {
        const data = await res.json();
        
        // Stream logs if available
        if (data.logs) {
          data.logs.forEach((log: string) => addLog(task.id, log));
        }
        
        addLog(task.id, `✅ ${task.name} completed successfully`);
        setCompletedTasks(prev => new Set(prev).add(task.id));
      } else {
        const error = await res.json();
        addLog(task.id, `❌ Failed: ${error.message || 'Unknown error'}`);
        setFailedTasks(prev => new Set(prev).add(task.id));
      }
    } catch (error: any) {
      addLog(task.id, `❌ Error: ${error.message}`);
      setFailedTasks(prev => new Set(prev).add(task.id));
    } finally {
      setRunningTasks(prev => {
        const next = new Set(prev);
        next.delete(task.id);
        return next;
      });
    }
  };

  const getTaskStatus = (taskId: string) => {
    if (runningTasks.has(taskId)) return 'running';
    if (completedTasks.has(taskId)) return 'completed';
    if (failedTasks.has(taskId)) return 'failed';
    return 'idle';
  };

  const categories = {
    build: autopilots.filter(a => a.category === 'build'),
    fix: autopilots.filter(a => a.category === 'fix'),
    optimize: autopilots.filter(a => a.category === 'optimize'),
    deploy: autopilots.filter(a => a.category === 'deploy')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Autopilot Control Center</h1>
          <p className="text-gray-600">Run automated tasks to build, fix, optimize, and deploy your platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Autopilot Cards */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(categories).map(([category, tasks]) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map((task) => {
                    const Icon = task.icon;
                    const status = getTaskStatus(task.id);
                    
                    return (
                      <div
                        key={task.id}
                        className={`bg-white rounded-lg border-2 p-6 transition-all ${
                          status === 'running'
                            ? 'border-blue-500 shadow-lg'
                            : status === 'completed'
                            ? 'border-green-500'
                            : status === 'failed'
                            ? 'border-red-500'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              status === 'running'
                                ? 'bg-blue-100'
                                : status === 'completed'
                                ? 'bg-green-100'
                                : status === 'failed'
                                ? 'bg-red-100'
                                : 'bg-gray-100'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                status === 'running'
                                  ? 'text-blue-600'
                                  : status === 'completed'
                                  ? 'text-green-600'
                                  : status === 'failed'
                                  ? 'text-red-600'
                                  : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{task.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            </div>
                          </div>
                          
                          {status === 'running' && (
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                          )}
                          {status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          {status === 'failed' && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>

                        <button
                          onClick={() => runAutopilot(task)}
                          disabled={status === 'running'}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            status === 'running'
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {status === 'running' ? 'Running...' : 'Run Autopilot'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logs Panel */}
          <div className="lg:col-span-1">
            <div className="bg-black text-green-400 rounded-lg p-4 font-mono text-sm h-[600px] overflow-auto sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Terminal Output</h3>
                {selectedTask && (
                  <button
                    onClick={() => setLogs(prev => ({ ...prev, [selectedTask]: [] }))}
                    className="text-gray-400 hover:text-white text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {selectedTask && logs[selectedTask] ? (
                <div className="space-y-1">
                  {logs[selectedTask].map((log, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words">
                      {log}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">
                  $ Select an autopilot to see output...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
