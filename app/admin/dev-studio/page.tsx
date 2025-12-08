'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import FileTree from '@/components/dev-studio/FileTree';
import Terminal from '@/components/dev-studio/Terminal';
import PreviewPanel from '@/components/dev-studio/PreviewPanel';
import { Save, Play, GitBranch, Settings } from 'lucide-react';

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
  )
});

export default function DevStudioPage() {
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

  const router = useRouter();
  
  // GitHub state
  const [token, setToken] = useState<string>('');
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('elevateforhumanity/fix2');
  const [branch, setBranch] = useState<string>('main');
  
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
    '$ Ready to code!'
  ]);
  const [showCourseFilesOnly, setShowCourseFilesOnly] = useState(false);

  // Load GitHub token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('gh_token');
    if (storedToken) {
      setToken(storedToken);
      loadRepos(storedToken);
    } else {
      addTerminalOutput('⚠️  No GitHub token found. Please connect GitHub first.');
    }
  }, []);

  // Load repos when token changes
  useEffect(() => {
    if (token && selectedRepo) {
      loadFileTree();
    }
  }, [token, selectedRepo, branch]);

  const addTerminalOutput = (message: string) => {
    setTerminalOutput(prev => [...prev, `$ ${message}`]);
  };

  const connectGitHub = () => {
    // In production, this would redirect to GitHub OAuth
    // For now, prompt for token
    const newToken = prompt('Enter your GitHub Personal Access Token:');
    if (newToken) {
      localStorage.setItem('gh_token', newToken);
      setToken(newToken);
      addTerminalOutput('✅ GitHub connected successfully');
      loadRepos(newToken);
    }
  };

  const loadRepos = async (ghToken: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/github/repos', {
        headers: { 'x-gh-token': ghToken }
      });
      
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
        addTerminalOutput(`✅ Loaded ${data.length} repositories`);
      } else {
        addTerminalOutput('❌ Failed to load repositories');
      }
    } catch (error) {
      addTerminalOutput('❌ Error loading repositories');
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
      
      const res = await fetch(url, {
        headers: { 'x-gh-token': token }
      });
      
      if (res.ok) {
        const data = await res.json();
        const filePaths = data.files.map((f: any) => f.path);
        setFiles(filePaths);
        addTerminalOutput(`✅ Loaded ${filePaths.length} files`);
      } else {
        addTerminalOutput('❌ Failed to load file tree');
      }
    } catch (error) {
      addTerminalOutput('❌ Error loading file tree');
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
      
      const res = await fetch(url, {
        headers: { 'x-gh-token': token }
      });
      
      if (res.ok) {
        const data = await res.json();
        setSelectedFile(path);
        setFileContent(data.content);
        setFileSha(data.sha);
        setHasChanges(false);
        addTerminalOutput(`✅ Opened ${path}`);
      } else {
        addTerminalOutput(`❌ Failed to open ${path}`);
      }
    } catch (error) {
      addTerminalOutput(`❌ Error opening ${path}`);
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
          'content-type': 'application/json',
          'x-gh-token': token
        },
        body: JSON.stringify({
          repo: selectedRepo,
          path: selectedFile,
          content: fileContent,
          sha: fileSha,
          message: `chore: update ${selectedFile} via Dev Studio`,
          branch
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setFileSha(data.content.sha);
        setHasChanges(false);
        addTerminalOutput(`✅ Saved ${selectedFile}`);
        addTerminalOutput(`   Commit: ${data.commit.substring(0, 7)}`);
      } else {
        const error = await res.json();
        addTerminalOutput(`❌ Failed to save: ${error.message}`);
      }
    } catch (error) {
      addTerminalOutput('❌ Error saving file');
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
          src="/images/gallery/image8.jpg"
          alt="Hero"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome</h1>
          <p className="text-xl mb-8 text-gray-100">Transform your career with free training</p>
        </div>
      </section>


      {/* Header */}
      <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">🚀 Elevate Dev Studio</h1>
          
          {token ? (
            <div className="flex items-center gap-2">
              <select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
                className="bg-slate-700 text-white px-3 py-1 rounded text-sm"
              >
                <option value="elevateforhumanity/fix2">elevateforhumanity/fix2</option>
                {repos.map(repo => (
                  <option key={repo.full_name} value={repo.full_name}>
                    {repo.full_name}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <GitBranch className="w-4 h-4" />
                <span>{branch}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={connectGitHub}
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
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
              onChange={(e) => setShowCourseFilesOnly(e.target.checked)}
              className="rounded"
            />
            <span>Course Files Only</span>
          </label>
          
          <button
            onClick={saveFile}
            disabled={!hasChanges || loading}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              hasChanges && !loading
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
      </div>

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
                  <p className="text-sm">Select a file from the tree to start editing</p>
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
            url="http://localhost:3000"
            filePath={selectedFile}
          />
        </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have launched successful careers through our free training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
              >
                Apply Now - It's Free
              </Link>
              <Link
                href="/programs"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-900 border-2 border-white text-lg shadow-2xl transition-all"
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
