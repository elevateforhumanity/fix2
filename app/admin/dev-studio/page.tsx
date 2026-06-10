'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

export const revalidate = 0;
import FileTree from '@/components/dev-studio/FileTree';
import Terminal from '@/components/dev-studio/Terminal';
import PreviewPanel from '@/components/dev-studio/PreviewPanel';
import {
  AlertTriangle,
  CheckCircle,
  GitBranch,
  Play,
  Rocket,
  Save,
  Settings,
  XCircle,
} from 'lucide-react';

type GitHubRepo = {
  full_name: string;
  default_branch?: string;
};

type GitHubBranch = {
  name: string;
};

type GitHubWorkflow = {
  id: number;
  name: string;
  path: string;
  state: string;
};

type DevStudioStatus = {
  ok: boolean;
  auth?: { ok: boolean; role?: string | null; reason?: string | null };
  integrations?: Record<string, { ok: boolean; required?: string[] }>;
};

export const dynamicParams = true;

// Lazy load Monaco to avoid SSR issues
const CodeEditor = dynamic(() => import('@/components/dev-studio/CodeEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
        <div>Loading Dev Studio...</div>
      </div>
    </div>
  ),
});

export default function DevStudioPage() {
  const router = useRouter();

  useEffect(() => {
    // Check admin auth
    fetch('/api/auth/check-admin')
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) {
          router.push('/login?redirect=/admin');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  // GitHub state
  const [token, setToken] = useState<string>('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>(
    'elevateforhumanity/fix2'
  );
  const [branch, setBranch] = useState<string>('main');
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [workflows, setWorkflows] = useState<GitHubWorkflow[]>([]);
  const [status, setStatus] = useState<DevStudioStatus | null>(null);

  // File state
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [fileSha, setFileSha] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ Elevate Dev Studio initialized',
    '$ Ready to code!',
  ]);
  const [showCourseFilesOnly, setShowCourseFilesOnly] = useState(false);

  const githubHeaders = (ghToken = token) =>
    ghToken ? { 'x-gh-token': ghToken } : {};

  // Load GitHub token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('gh_token');
    if (storedToken) {
      setToken(storedToken);
      loadRepos(storedToken);
    } else {
      addTerminalOutput(
        '<AlertTriangle className="w-5 h-5 inline-block" />  No GitHub token found. Please connect GitHub first.'
      );
    }
  }, []);

  useEffect(() => {
    fetch('/api/dev-studio/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() =>
        setStatus({
          ok: false,
          auth: { ok: false, reason: 'status_check_failed' },
        })
      );
  }, []);

  // Load repos when token changes
  useEffect(() => {
    if (selectedRepo) {
      loadBranches();
      loadWorkflows();
      loadFileTree();
    }
  }, [token, selectedRepo, branch]);

  const addTerminalOutput = (message: string) => {
    setTerminalOutput((prev) => [...prev, `$ ${message}`]);
  };

  const loadBranches = async () => {
    if (!selectedRepo) return;

    try {
      const url = new URL('/api/github/branches', window.location.origin);
      url.searchParams.set('repo', selectedRepo);
      const res = await fetch(url, { headers: githubHeaders() });
      const data = await res.json();

      if (res.ok) {
        setBranches(data);
        if (!data.some((item: GitHubBranch) => item.name === branch)) {
          setBranch(data[0]?.name || 'main');
        }
      } else {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Failed to load branches: ${data.message || data.error}`
        );
      }
    } catch {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error loading branches'
      );
    }
  };

  const loadWorkflows = async () => {
    if (!selectedRepo) return;

    try {
      const url = new URL('/api/github/workflows', window.location.origin);
      url.searchParams.set('repo', selectedRepo);
      const res = await fetch(url, { headers: githubHeaders() });
      const data = await res.json();

      if (res.ok) {
        setWorkflows(data.workflows || []);
      } else {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Failed to load workflows: ${data.message || data.error}`
        );
      }
    } catch {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error loading workflows'
      );
    }
  };

  const dispatchWorkflow = async (workflowPath: string) => {
    if (!selectedRepo || !workflowPath) return;

    setLoading(true);
    addTerminalOutput(`▶ Dispatching ${workflowPath} on ${branch}...`);

    try {
      const res = await fetch('/api/github/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...githubHeaders(),
        },
        body: JSON.stringify({
          repo: selectedRepo,
          workflowId: workflowPath,
          ref: branch,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Workflow dispatched: ${workflowPath}`
        );
      } else {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Workflow failed: ${data.message || data.error}`
        );
      }
    } catch {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error dispatching workflow'
      );
    } finally {
      setLoading(false);
    }
  };

  const dispatchNorthflankWorkflowFromBrowser = async (
    target: 'public' | 'admin' | 'lms'
  ) => {
    if (!token || !selectedRepo) {
      throw new Error(
        'GitHub token and repo are required for browser fallback.'
      );
    }

    const res = await fetch(
      `https://api.github.com/repos/${selectedRepo}/actions/workflows/northflank-deploy.yml/dispatches`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          ref: branch || 'main',
          inputs: { target, branch: branch || 'main' },
        }),
      }
    );

    if (!res.ok) {
      const message = await res.text();
      throw new Error(
        message || `GitHub workflow dispatch failed (${res.status})`
      );
    }
  };

  const triggerNorthflankBuild = async (target: 'public' | 'admin' | 'lms') => {
    setLoading(true);
    addTerminalOutput(
      `🚀 Dispatching Northflank ${target} deploy workflow on ${branch}...`
    );

    try {
      const res = await fetch('/api/dev-studio/northflank/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...githubHeaders() },
        body: JSON.stringify({ target, branch, strategy: 'github' }),
      });
      const data = await res.json();

      if (res.ok) {
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Northflank ${target} deploy dispatched via ${data.strategy || 'workflow'}`
        );
      } else {
        addTerminalOutput(
          `<AlertTriangle className="w-5 h-5 inline-block" /> Server dispatch failed; trying browser GitHub dispatch...`
        );
        await dispatchNorthflankWorkflowFromBrowser(target);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Northflank ${target} deploy dispatched from browser GitHub session`
        );
      }
    } catch (error: unknown) {
      try {
        addTerminalOutput(
          `<AlertTriangle className="w-5 h-5 inline-block" /> Server/container dispatch errored; trying browser GitHub dispatch...`
        );
        await dispatchNorthflankWorkflowFromBrowser(target);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Northflank ${target} deploy dispatched from browser GitHub session`
        );
      } catch (fallbackError: unknown) {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Error triggering Northflank ${target} deploy: ${fallbackError instanceof Error ? fallbackError.message : 'unknown error'}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const connectGitHub = () => {
    // In production, this would redirect to GitHub OAuth
    // For now, prompt for token
    const newToken = prompt('Enter your GitHub Personal Access Token:');
    if (newToken) {
      localStorage.setItem('gh_token', newToken);
      setToken(newToken);
      addTerminalOutput(
        '<CheckCircle className="w-5 h-5 inline-block" /> GitHub connected successfully'
      );
      loadRepos(newToken);
    }
  };

  const loadRepos = async (ghToken: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/github/repos', {
        headers: githubHeaders(ghToken),
      });

      if (res.ok) {
        const data = await res.json();
        setRepos(data);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Loaded ${data.length} repositories`
        );
      } else {
        addTerminalOutput(
          '<XCircle className="w-5 h-5 inline-block" /> Failed to load repositories'
        );
      }
    } catch (error: unknown) {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error loading repositories'
      );
    } finally {
      setLoading(false);
    }
  };

  const loadFileTree = async () => {
    if (!token || !selectedRepo) return;

    setLoading(true);
    addTerminalOutput(`📂 Loading files from ${selectedRepo}...`);

    try {
      const url = new URL('/api/github/tree', window.location.origin);
      url.searchParams.set('repo', selectedRepo);
      url.searchParams.set('ref', branch);

      const res = await fetch(url, { headers: githubHeaders() });
      const data = await res.json();

      if (res.ok) {
        const filePaths = data.files.map(
          (f: Record<string, unknown>) => f.path
        );
        setFiles(filePaths);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Loaded ${filePaths.length} files`
        );
      } else {
        addTerminalOutput(
          '<XCircle className="w-5 h-5 inline-block" /> Failed to load file tree'
        );
      }
    } catch (error: unknown) {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error loading file tree'
      );
    } finally {
      setLoading(false);
    }
  };

  const openFile = async (path: string) => {
    if (!token || !selectedRepo) return;

    setLoading(true);
    addTerminalOutput(`📄 Opening ${path}...`);

    try {
      const url = new URL('/api/github/file', window.location.origin);
      url.searchParams.set('repo', selectedRepo);
      url.searchParams.set('path', path);
      url.searchParams.set('ref', branch);

      const res = await fetch(url, { headers: githubHeaders() });
      const data = await res.json();

      if (res.ok) {
        setSelectedFile(path);
        setFileContent(data.content);
        setFileSha(data.sha);
        setHasChanges(false);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Opened ${path}`
        );
      } else {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Failed to open ${path}`
        );
      }
    } catch (error: unknown) {
      addTerminalOutput(
        `<XCircle className="w-5 h-5 inline-block" /> Error opening ${path}`
      );
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async () => {
    if (!token || !selectedRepo || !selectedFile) return;

    setLoading(true);
    addTerminalOutput(`💾 Saving ${selectedFile}...`);

    try {
      const res = await fetch('/api/github/file', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...githubHeaders(),
        },
        body: JSON.stringify({
          repo: selectedRepo,
          path: selectedFile,
          content: fileContent,
          sha: fileSha,
          message: `Update ${selectedFile}`,
          branch,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setFileSha(data.content.sha);
        setHasChanges(false);
        addTerminalOutput(
          `<CheckCircle className="w-5 h-5 inline-block" /> Saved ${selectedFile}`
        );
        addTerminalOutput(`   Commit: ${data.commit.substring(0, 7)}`);
      } else {
        addTerminalOutput(
          `<XCircle className="w-5 h-5 inline-block" /> Failed to save: ${data.message || data.error}`
        );
      }
    } catch (error: unknown) {
      addTerminalOutput(
        '<XCircle className="w-5 h-5 inline-block" /> Error saving file'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setFileContent(newCode);
    setHasChanges(true);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Hero"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome</h1>
          <p className="text-base md:text-lg mb-8 text-gray-100">
            Transform your career with free training
          </p>
        </div>
      </section>

      {/* Header */}
      <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">
            <Rocket className="w-5 h-5 inline-block" /> Elevate Dev Studio
          </h1>

          {token ? (
            <div className="flex items-center gap-2">
              <select
                value={selectedRepo}
                onChange={(
                  e: React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => setSelectedRepo(e.target.value)}
                className="bg-slate-700 text-white px-3 py-1 rounded text-sm"
              >
                <option value="elevateforhumanity/fix2">
                  elevateforhumanity/fix2
                </option>
                {repos.map((repo) => (
                  <option key={repo.full_name} value={repo.full_name}>
                    {repo.full_name}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-1 text-sm text-gray-300">
                <GitBranch className="w-4 h-4" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="bg-slate-700 text-white px-2 py-1 rounded text-sm"
                >
                  {(branches.length ? branches : [{ name: branch }]).map(
                    (item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
          ) : (
            <button
              onClick={connectGitHub}
              className="px-4 py-1 bg-brand-blue-600 hover:bg-brand-blue-700 rounded text-sm"
            >
              Connect GitHub
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCourseFilesOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShowCourseFilesOnly(e.target.checked)
              }
              className="rounded"
            />
            <span>Course Files Only</span>
          </label>

          <button
            onClick={saveFile}
            disabled={!hasChanges || loading}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              hasChanges && !loading
                ? 'bg-brand-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={() => dispatchWorkflow('.github/workflows/ci-cd.yml')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-blue-600 hover:bg-brand-blue-700 disabled:bg-gray-600 rounded"
          >
            <Play className="w-4 h-4" />
            Run CI
          </button>

          <select
            value=""
            onChange={(e) => {
              if (e.target.value) dispatchWorkflow(e.target.value);
            }}
            className="bg-slate-700 text-white px-3 py-2 rounded text-sm"
          >
            <option value="">Dispatch workflow...</option>
            {workflows.map((workflow) => (
              <option key={workflow.id} value={workflow.path}>
                {workflow.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => triggerNorthflankBuild('public')}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded"
          >
            Deploy Site
          </button>

          <button
            onClick={() => triggerNorthflankBuild('admin')}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded"
          >
            Deploy Admin
          </button>

          <button
            onClick={() => triggerNorthflankBuild('lms')}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded"
          >
            Deploy LMS
          </button>
        </div>
      </div>

      {/* Studio Health */}
      {status && (
        <div className="bg-slate-950 border-b border-slate-700 px-4 py-2 text-xs text-slate-300 flex flex-wrap gap-3">
          <span className={status.auth?.ok ? 'text-green-300' : 'text-red-300'}>
            Auth: {status.auth?.role || status.auth?.reason || 'unknown'}
          </span>
          {Object.entries(status.integrations || {}).map(([name, item]) => (
            <span
              key={name}
              className={item.ok ? 'text-green-300' : 'text-amber-300'}
            >
              {name}:{' '}
              {item.ok
                ? 'ready'
                : `missing ${item.required?.join(', ') || 'config'}`}
            </span>
          ))}
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree */}
        <div className="w-64 border-r border-slate-700">
          <FileTree
            files={files}
            onFileSelect={openFile}
            selectedFile={selectedFile}
            filterCourses={showCourseFilesOnly}
          />
        </div>

        {/* Editor + Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Editor */}
          <div className="flex-1">
            {selectedFile ? (
              <CodeEditor
                value={fileContent}
                onChange={handleCodeChange}
                filePath={selectedFile}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-900 text-gray-400">
                <div className="text-center">
                  <p className="text-lg mb-2">No file selected</p>
                  <p className="text-sm">
                    Select a file from the tree to start editing
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Terminal */}
          <div className="h-48 border-t border-slate-700">
            <Terminal
              output={terminalOutput}
              onClear={() => setTerminalOutput([])}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-96 border-l border-slate-700">
          <PreviewPanel
            url={`/api/preview/render?repo=${encodeURIComponent(
              selectedRepo
            )}&ref=${encodeURIComponent(branch)}&path=${encodeURIComponent(
              selectedFile || 'README.md'
            )}`}
            filePath={selectedFile}
          />
        </div>

        {/* CTA Section */}
        <section className="py-16    text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-base md:text-lg mb-8 text-blue-100">
                Join thousands who have launched successful careers through our
                free training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
                >
                  Apply Now - It's Free
                </Link>
                <Link
                  href="/programs"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 border-2 border-white text-lg shadow-2xl transition-all"
                >
                  Browse All Programs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
