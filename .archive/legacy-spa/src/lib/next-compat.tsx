'use client';

// Compatibility layer for Next.js
import { useRouter as useNextRouter } from 'next/navigation';
import { usePathname as useNextPathname } from 'next/navigation';

export function useRouter() {
  const router = useNextRouter();
  const pathname = useNextPathname();

  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    pathname,
    navigate: router.push,
  };
}

export function useNavigate() {
  const router = useNextRouter();
  return router.push;
}

export function useLocation() {
  const pathname = useNextPathname();
  return {
    pathname,
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  };
}

export function useParams() {
  // For Next.js, params come from page props
  return {};
}

// Link component wrapper
export { default as Link } from 'next/link';
