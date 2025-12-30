# Code Conversion Guide - Pages Router → App Router

This project uses **App Router** (Next.js 13+). Use this guide to adapt any Pages Router code.

## Quick Conversion Rules

### 1. File Location

```
❌ pages/example.js
✅ app/example/page.tsx
```

### 2. Dynamic Routes

```
❌ pages/programs/[slug].js
✅ app/programs/[slug]/page.tsx
```

### 3. Getting Route Params

```javascript
// ❌ Pages Router
import { useRouter } from "next/router";
const router = useRouter();
const { slug } = router.query;

// ✅ App Router
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

### 4. Navigation

```javascript
// ❌ Pages Router
import { useRouter } from 'next/router';

// ✅ App Router
('use client');
import { useRouter } from 'next/navigation';
```

### 5. Metadata

```javascript
// ❌ Pages Router
import Head from 'next/head';
<Head>
  <title>Title</title>
</Head>;

// ✅ App Router
export const metadata = {
  title: 'Title',
  description: '...',
};
```

### 6. Client Interactivity

```javascript
// ✅ Add at top of file if using useState, useEffect, onClick, etc.
'use client';
```

### 7. Data Fetching

```javascript
// ❌ Pages Router
export async function getServerSideProps() {}

// ✅ App Router - just fetch directly in component
export default async function Page() {
  const data = await fetch('...');
}
```

## Example Conversion

### Before (Pages Router)

```javascript
import { useRouter } from 'next/router';

export default function ProgramPage() {
  const router = useRouter();
  const { slug } = router.query;

  return <div>{slug}</div>;
}
```

### After (App Router)

```typescript
export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
```

## When to Use 'use client'

Add `'use client'` at the top when you need:

- `useState`, `useEffect`, `useContext`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- Third-party libraries that use client features

## Your Project Structure

```
app/
├── page.tsx                          # Homepage
├── layout.tsx                        # Root layout
├── programs/
│   ├── page.tsx                      # Programs listing
│   ├── [slug]/
│   │   └── page.tsx                  # Dynamic program detail
│   ├── healthcare/page.tsx           # Category page
│   └── skilled-trades/page.tsx       # Category page
├── data/
│   └── programs.ts                   # Program data source
└── components/
    └── programs/
        └── ProgramTemplate.tsx       # Reusable template
```

## Need Help?

Just send any code and I'll automatically convert it to work with your App Router setup!
