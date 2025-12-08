'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import Split from 'react-split';
import FileTree from '@/components/editor/FileTree';
import CodeEditor from '@/components/editor/CodeEditor';
import Terminal from '@/components/editor/Terminal';

// Mock file structure
const mockFiles = [
  {
    name: 'app',
    path: '/app',
    type: 'directory' as const,
    children: [
      { name: 'page.tsx', path: '/app/page.tsx', type: 'file' as const },
      { name: 'layout.tsx', path: '/app/layout.tsx', type: 'file' as const },
    ],
  },
  {
    name: 'components',
    path: '/components',
    type: 'directory' as const,
    children: [
      { name: 'Header.tsx', path: '/components/Header.tsx', type: 'file' as const },
      { name: 'Footer.tsx', path: '/components/Footer.tsx', type: 'file' as const },
    ],
  },
  {
    name: 'lib',
    path: '/lib',
    type: 'directory' as const,
    children: [
      { name: 'utils.ts', path: '/lib/utils.ts', type: 'file' as const },
    ],
  },
  { name: 'package.json', path: '/package.json', type: 'file' as const },
  { name: 'README.md', path: '/README.md', type: 'file' as const },
];

// Mock file contents
const mockFileContents: Record<string, string> = {
  '/app/page.tsx': `export default function HomePage() {
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

  return (
    <div>
      <h1>Welcome to EFH</h1>
      <p>Edit this file to see changes</p>
    </div>
  );
}`,
  '/app/layout.tsx': `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
  '/components/Header.tsx': `export default function Header() {
  return <header>Header Component</header>;
}`,
  '/components/Footer.tsx': `export default function Footer() {
  return <footer>Footer Component</footer>;
}`,
  '/lib/utils.ts': `export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}`,
  '/package.json': `{
  "name": "efh-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`,
  '/README.md': `# EFH Project

This is your cloned codebase from Elevate For Humanity.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`
`,
};

export default function EditorPage() {
  const [selectedFile, setSelectedFile] = useState<string>('/app/page.tsx');
  const [fileContent, setFileContent] = useState<string>(mockFileContents['/app/page.tsx'] || '');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleFileSelect = (path: string) => {
    if (unsavedChanges) {
      if (!confirm('You have unsaved changes. Discard them?')) {
        return;
      }
    }
    
    setSelectedFile(path);
    setFileContent(mockFileContents[path] || '// File content not available');
    setUnsavedChanges(false);
  };

  const handleContentChange = (value: string | undefined) => {
    setFileContent(value || '');
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save file locally (GitHub integration can be added later)
    console.log('Saving file:', selectedFile);
    mockFileContents[selectedFile] = fileContent;
    setUnsavedChanges(false);
    alert('File saved successfully!');
  };

  const handleCommand = async (command: string): Promise<string> => {
    // Command execution simulation (actual execution requires backend API)
    if (command.startsWith('npm ')) {
      return `Running: ${command}\n✓ Command completed successfully`;
    }
    
    return `Command not implemented: ${command}`;
  };

  const getLanguage = (path: string): string => {
    if (path.endsWith('.tsx') || path.endsWith('.ts')) return 'typescript';
    if (path.endsWith('.jsx') || path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.json')) return 'json';
    if (path.endsWith('.md')) return 'markdown';
    if (path.endsWith('.css')) return 'css';
    return 'plaintext';
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="h-12 bg-gray-900 text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">EFH Code Editor</h1>
          <span className="text-sm text-gray-400">{selectedFile}</span>
          {unsavedChanges && (
            <span className="text-xs bg-yellow-600 px-2 py-1 rounded">Unsaved</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!unsavedChanges}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-1 rounded text-sm"
          >
            Save
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded text-sm">
            Run
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 overflow-hidden">
        <Split
          className="flex h-full"
          sizes={[20, 80]}
          minSize={150}
          gutterSize={4}
        >
          {/* File Tree */}
          <div className="h-full overflow-hidden">
            <FileTree
              files={mockFiles}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </div>

          {/* Editor and Terminal */}
          <div className="h-full">
            <Split
              className="flex flex-col h-full"
              direction="vertical"
              sizes={[70, 30]}
              minSize={100}
              gutterSize={4}
            >
              {/* Code Editor */}
              <div className="h-full overflow-hidden">
                <CodeEditor
                  value={fileContent}
                  onChange={handleContentChange}
                  language={getLanguage(selectedFile)}
                />
              </div>

              {/* Terminal */}
              <div className="h-full overflow-hidden">
                <Terminal onCommand={handleCommand} />
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </div>
  );
}
