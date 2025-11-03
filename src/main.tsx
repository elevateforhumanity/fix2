import './env-guard';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './styles/durable-design.css';
import App from './App';

declare const __APP_VERSION__: string;

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error?: Error }
> {
  state = { error: undefined as Error | undefined };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: unknown) {
    console.error('Root error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
          <h1>Application Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </pre>
          <small style={{ opacity: 0.6 }}>Build: {__APP_VERSION__}</small>
        </div>
      );
    }
    return this.props.children;
  }
}

window.addEventListener('unhandledrejection', (e) =>
  console.error('Unhandled rejection:', (e as any).reason)
);
window.addEventListener('error', (e) =>
  console.error('Global error:', (e as any).error || e.message)
);

console.log('🚀 main.tsx executing...');
console.log('document:', typeof document);
console.log('document.getElementById:', typeof document.getElementById);

const el = document.getElementById('root');
console.log('root element:', el);

if (!el) {
  console.error('#root not found; check index.html');
  // Create a visible error message
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'padding:20px;background:red;color:white;font-size:20px;';
  errorDiv.textContent = '❌ ERROR: #root element not found!';
  document.body.appendChild(errorDiv);
} else {
  console.log('✅ Found root element, creating React root...');
  try {
    const root = createRoot(el);
    console.log('✅ React root created, rendering...');
    
    // Simplest possible render - no wrappers
    root.render(<App />);
    
    console.log('✅ Render called successfully');
  } catch (error) {
    console.error('❌ Error during render:', error);
    // Create a visible error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding:20px;background:red;color:white;font-size:20px;position:fixed;top:0;left:0;right:0;z-index:99999;';
    errorDiv.textContent = '❌ ERROR: ' + (error as Error).message;
    document.body.appendChild(errorDiv);
  }
}
