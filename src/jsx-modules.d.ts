// Type declarations for JSX/TSX modules
declare module '*.jsx' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

declare module '*.tsx' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}
