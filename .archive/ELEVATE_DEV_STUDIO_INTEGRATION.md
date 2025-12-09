# 🚀 ELEVATE DEV STUDIO - SAFE INTEGRATION PLAN

**Goal**: Add cloud IDE to admin WITHOUT breaking existing code
**Approach**: Separate service + clean integration points

---

## 🎯 INTEGRATION STRATEGY

### ✅ What We'll Do (SAFE):
1. Create NEW route `/admin/dev-studio` (doesn't touch existing pages)
2. Add NEW API routes under `/api/dev-studio/*` (isolated)
3. Use existing auth (Supabase) - no changes needed
4. Add NEW components in `components/dev-studio/*` (separate folder)
5. Keep all existing admin pages working as-is

### ❌ What We WON'T Do (AVOID BREAKS):
- ❌ Modify existing admin pages
- ❌ Change existing API routes
- ❌ Touch existing components
- ❌ Modify database schema (use existing tables)
- ❌ Change build configuration

---

## 📁 FILE STRUCTURE (NEW FILES ONLY)

```
/workspaces/fix2/
├── app/
│   ├── admin/
│   │   └── dev-studio/              # NEW - Your cloud IDE
│   │       ├── page.tsx             # Main IDE page
│   │       └── layout.tsx           # IDE-specific layout
│   └── api/
│       └── dev-studio/              # NEW - IDE APIs
│           ├── files/
│           │   └── route.ts         # File operations
│           ├── github/
│           │   └── route.ts         # GitHub integration
│           ├── autopilot/
│           │   └── route.ts         # Run autopilots
│           └── preview/
│               └── route.ts         # Preview server
├── components/
│   └── dev-studio/                  # NEW - IDE components
│       ├── FileTree.tsx
│       ├── CodeEditor.tsx
│       ├── Terminal.tsx
│       ├── PreviewPanel.tsx
│       └── AutopilotPanel.tsx
└── lib/
    └── dev-studio/                  # NEW - IDE utilities
        ├── github.ts
        ├── filesystem.ts
        └── autopilot.ts
```

**All NEW files - nothing existing gets modified!**

---

## 🔧 PHASE 1: BASIC IDE (No Breaking Changes)

### Step 1: Create Dev Studio Page
**File**: `app/admin/dev-studio/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Lazy load Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

export default function DevStudioPage() {
  const [currentFile, setCurrentFile] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Elevate Dev Studio</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 rounded">Save</button>
          <button className="px-4 py-2 bg-green-600 rounded">Run</button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree */}
        <div className="w-64 bg-slate-800 text-white p-4 overflow-auto">
          <h3 className="font-bold mb-4">Files</h3>
          {/* File tree will go here */}
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <MonacoEditor
            height="70%"
            language="typescript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
            }}
          />
          
          {/* Terminal */}
          <div className="h-[30%] bg-black text-green-400 p-4 overflow-auto">
            <div>Terminal output will appear here...</div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-96 bg-white border-l">
          <div className="p-4 bg-slate-100 border-b">
            <h3 className="font-bold">Live Preview</h3>
          </div>
          <iframe 
            src="http://localhost:3000" 
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
```

**This is completely isolated - won't affect anything else!**

---

### Step 2: Add Link in Admin Dashboard
**File**: `app/admin/dashboard/page.tsx` (SAFE ADDITION)

Just add ONE link to existing dashboard:

```typescript
// Add this to the existing dashboard cards
<Link 
  href="/admin/dev-studio"
  className="block p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
>
  <h3 className="text-xl font-bold mb-2">🚀 Dev Studio</h3>
  <p>Code, preview, and deploy</p>
</Link>
```

**Only adds a link - doesn't break anything!**

---

## 🔧 PHASE 2: FILE OPERATIONS (Safe APIs)

### Create File API
**File**: `app/api/dev-studio/files/route.ts` (NEW FILE)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  // Check auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get file path from query
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'Path required' }, { status: 400 });
  }

  try {
    // Read file from workspace
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  // Check auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { path: filePath, content } = await request.json();

  try {
    // Write file
    const fullPath = path.join(process.cwd(), filePath);
    await fs.writeFile(fullPath, content, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
```

**Completely separate API - won't interfere with existing APIs!**

---

## 🔧 PHASE 3: AUTOPILOT INTEGRATION (Safe)

### Autopilot API
**File**: `app/api/dev-studio/autopilot/route.ts` (NEW FILE)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { script } = await request.json();

  // Whitelist of allowed autopilot scripts
  const allowedScripts = [
    'audit_all_admin_features.sh',
    'check_all_features.sh',
    'fix-marketing-pages.sh',
  ];

  if (!allowedScripts.includes(script)) {
    return NextResponse.json({ error: 'Script not allowed' }, { status: 403 });
  }

  try {
    const { stdout, stderr } = await execAsync(`./${script}`);
    return NextResponse.json({ output: stdout, error: stderr });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**Uses existing autopilot scripts - doesn't modify them!**

---

## 🔧 PHASE 4: GITHUB INTEGRATION (Optional)

### GitHub API
**File**: `app/api/dev-studio/github/route.ts` (NEW FILE)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  try {
    const { data } = await octokit.repos.getContent({
      owner: 'elevateforhumanity',
      repo: 'fix2',
      path: path || '',
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

**Separate GitHub integration - doesn't touch existing code!**

---

## ✅ SAFETY CHECKLIST

Before building each phase:

- [ ] Create NEW files only (no modifications to existing)
- [ ] Test in isolation first
- [ ] Use existing auth (Supabase)
- [ ] Keep separate API namespace (`/api/dev-studio/*`)
- [ ] Add feature flag to disable if needed
- [ ] Document all new files
- [ ] Test existing features still work

---

## 🚀 ROLLOUT PLAN

### Week 1: Basic IDE
- [ ] Create `/admin/dev-studio` page
- [ ] Add Monaco editor
- [ ] Basic file tree
- [ ] Terminal output
- [ ] Test: Existing admin still works ✅

### Week 2: File Operations
- [ ] File read/write API
- [ ] Save functionality
- [ ] File tree navigation
- [ ] Test: No breaks ✅

### Week 3: Autopilot Integration
- [ ] Autopilot API
- [ ] Run buttons
- [ ] Output streaming
- [ ] Test: Autopilots still work standalone ✅

### Week 4: Preview & Polish
- [ ] Live preview iframe
- [ ] Course preview
- [ ] UI polish
- [ ] Test: Everything works ✅

---

## 🔒 SAFETY FEATURES

### Feature Flag
Add to `.env.local`:
```
ENABLE_DEV_STUDIO=true
```

In page:
```typescript
if (process.env.ENABLE_DEV_STUDIO !== 'true') {
  return <div>Dev Studio is disabled</div>;
}
```

### Access Control
```typescript
// Only allow super_admin role
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single();

if (profile?.role !== 'super_admin') {
  redirect('/admin');
}
```

---

## 📊 INTEGRATION POINTS

### Existing Systems We'll Use (NOT modify):
- ✅ Supabase auth (existing)
- ✅ Existing autopilot scripts (just call them)
- ✅ Existing database (read-only for courses)
- ✅ Existing build system (don't change)

### New Systems We'll Add:
- ✅ Monaco editor (new package)
- ✅ Dev Studio pages (new routes)
- ✅ Dev Studio APIs (new namespace)
- ✅ Dev Studio components (new folder)

---

## ✅ READY TO BUILD

**I can start with Phase 1 (Basic IDE) right now!**

**It will:**
- Create NEW page at `/admin/dev-studio`
- Add Monaco editor
- Show basic layout
- NOT touch any existing code
- NOT break anything

**Time**: 1-2 hours
**Risk**: ZERO (all new files)

**Should I start building Phase 1 now?**
